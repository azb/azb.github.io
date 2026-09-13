import {
  loadFirebase,
  startFirebase,
  firebaseApi,
  firebaseErrorMessage,
  randomRoomCode,
  normalizeRoomCode,
} from './firebase.js';
import { createRtcMesh } from './webrtc.js';
import { applyNetAction, actionAllowed } from './actions.js';

const HEARTBEAT_MS = 20000;
const STALE_MS = 45000;

export class MultiplayerSession {
  constructor() {
    this.active = false;
    this.isHost = false;
    this.uid = null;
    this.roomId = null;
    this.seat = null;
    this.hostUid = null;
    this.status = 'idle';
    this.roster = [];
    this.room = null;
    this.handlers = {};
    this._unsubRoom = null;
    this._unsubPlayers = null;
    this._pruneTimer = null;
    this._rtc = null;
    this._seq = 0;
    this._lastPresence = 0;
  }

  on(handlers) {
    this.handlers = { ...this.handlers, ...handlers };
  }

  async ensureAuth() {
    await loadFirebase();
    const { auth, authApi } = startFirebase();
    const cred = await authApi.signInAnonymously(auth);
    this.uid = cred.user.uid;
    return this.uid;
  }

  async createRoom() {
    await this.ensureAuth();
    const { db, fs } = firebaseApi();
    let code = randomRoomCode();
    for (let i = 0; i < 8; i++) {
      const ref = fs.doc(db, 'rooms', code);
      const snap = await fs.getDoc(ref);
      if (!snap.exists() || snap.data()?.app !== 'settlers' || isRoomStale(snap.data())) {
        this.roomId = code;
        this.isHost = true;
        this.hostUid = this.uid;
        await fs.setDoc(ref, {
          app: 'settlers',
          host: this.uid,
          status: 'lobby',
          playerCount: 1,
          updatedAt: fs.serverTimestamp(),
          lastJoiner: this.uid,
        });
        await this._enterRoom();
        return code;
      }
      code = randomRoomCode();
    }
    throw new Error('Could not allocate a room code. Try again.');
  }

  async joinRoom(rawCode) {
    const code = normalizeRoomCode(rawCode);
    if (code.length < 4) throw new Error('Enter a 4-character room code.');
    await this.ensureAuth();
    const { db, fs } = firebaseApi();
    const ref = fs.doc(db, 'rooms', code);
    const snap = await fs.getDoc(ref);
    if (!snap.exists() || snap.data()?.app !== 'settlers') {
      throw new Error('No Settlers table with that code.');
    }
    const data = snap.data();
    if (data.status === 'playing') throw new Error('That table already started.');
    this.roomId = code;
    this.isHost = data.host === this.uid;
    this.hostUid = data.host;
    await fs.setDoc(ref, { updatedAt: fs.serverTimestamp(), lastJoiner: this.uid }, { merge: true });
    await this._enterRoom();
    return code;
  }

  async _enterRoom() {
    this.active = true;
    this.status = 'lobby';
    const { db, fs } = firebaseApi();
    this._rtc = createRtcMesh({
      uid: this.uid,
      onMessage: (from, msg) => this._onRtc(from, msg),
      onOpen: (id) => {
        this.handlers.onLink?.();
        if (this.isHost && this.handlers.getGame && this.room?.status === 'playing') {
          this.broadcastState(this.handlers.getGame());
        }
      },
      publishSignal: () => this.publishPresence(true),
    });
    this._unsubRoom = fs.onSnapshot(fs.doc(db, 'rooms', this.roomId), (docSnap) => {
      this.room = { id: docSnap.id, ...docSnap.data() };
      this.hostUid = this.room.host;
      this.isHost = this.room.host === this.uid;
      this.status = this.room.status || 'lobby';
      this.handlers.onRoom?.(this.room);
    });
    this._unsubPlayers = fs.onSnapshot(fs.collection(db, 'rooms', this.roomId, 'players'), (snap) => {
      const docs = [];
      snap.forEach((d) => docs.push({ id: d.id, data: d.data() }));
      this._applyPlayers(docs);
      this._pruneStale(snap);
    });
    this._pruneTimer = setInterval(() => this._pruneStale(), HEARTBEAT_MS);
    await this.publishPresence(true);
    this.handlers.onRoster?.(this.roster);
  }

  _applyPlayers(docs) {
    const now = Date.now();
    const live = docs.filter((d) => !isPlayerStale(d.data, now));
    live.sort((a, b) => {
      if (a.id === this.hostUid) return -1;
      if (b.id === this.hostUid) return 1;
      return a.id.localeCompare(b.id);
    });
    this.roster = live.map((d, i) => ({
      uid: d.id,
      name: d.data.name || 'Player',
      seat: d.data.seat ?? i,
      host: d.id === this.hostUid,
      presenting: !!d.data.presenting,
    }));
    const me = this.roster.find((p) => p.uid === this.uid);
    if (me && me.seat != null) this.seat = me.seat;
    this._rtc?.syncPresence(live);
    this.handlers.onRoster?.(this.roster);
  }

  _pruneStale(snap) {
    const { db, fs } = firebaseApi();
    if (!db || !this.roomId) return;
    const stale = [];
    if (snap) {
      snap.forEach((d) => {
        if (d.id === this.uid) return;
        if (isPlayerStale(d.data())) stale.push(d.id);
      });
    }
    for (const id of stale) {
      fs.deleteDoc(fs.doc(db, 'rooms', this.roomId, 'players', id)).catch(() => {});
    }
  }

  async publishPresence(force = false) {
    if (!this.active || !this.uid || !this.roomId) return;
    const now = performance.now();
    if (!force && now - this._lastPresence < HEARTBEAT_MS) return;
    this._lastPresence = now;
    const { db, fs } = firebaseApi();
    const sig = this._rtc?.signalBlob() || {};
    await fs.setDoc(fs.doc(db, 'rooms', this.roomId, 'players', this.uid), {
      name: this.handlers.playerName?.() || 'Player',
      host: this.isHost,
      seat: this.seat,
      presenting: !!this.handlers.presenting?.(),
      updatedAt: fs.serverTimestamp(),
      ...sig,
    }, { merge: true });
  }

  async startTable(playerCount) {
    if (!this.isHost) throw new Error('Only the host can start.');
    const n = Math.max(2, Math.min(4, playerCount || this.roster.length));
    if (this.roster.length < 2) throw new Error('Need at least two players.');
    const seats = {};
    this.roster.slice(0, n).forEach((p, i) => { seats[p.uid] = i; });
    this.seat = seats[this.uid] ?? 0;
    const { db, fs } = firebaseApi();
    await fs.setDoc(fs.doc(db, 'rooms', this.roomId), {
      status: 'playing',
      playerCount: n,
      seats,
      updatedAt: fs.serverTimestamp(),
    }, { merge: true });
    await this.publishPresence(true);
  }

  async setPlayingSeed(seed) {
    if (!this.isHost) return;
    const { db, fs } = firebaseApi();
    await fs.setDoc(fs.doc(db, 'rooms', this.roomId), {
      seed,
      updatedAt: fs.serverTimestamp(),
    }, { merge: true });
  }

  broadcastState(game) {
    if (!this.isHost || !game) return;
    this._seq += 1;
    this._rtc?.broadcast({ type: 'state', seq: this._seq, snap: game.toSnapshot() });
  }

  sendAction(action) {
    if (this.isHost) return false;
    const host = this.hostUid;
    if (!host || !this._rtc) {
      this.handlers.onNeedLink?.();
      return false;
    }
    const ok = this._rtc.sendTo(host, { type: 'act', action, seat: this.seat });
    if (!ok) this.handlers.onNeedLink?.();
    return ok;
  }

  requestRestart() {
    if (this.isHost) return true;
    this.sendAction({ k: 'restart' });
    return false;
  }

  _onRtc(from, msg) {
    if (!msg?.type) return;
    if (msg.type === 'state' && msg.snap && !this.isHost) {
      this.handlers.onState?.(msg.snap, msg.seq);
      return;
    }
    if (msg.type === 'act' && this.isHost) {
      if (msg.action?.k === 'restart') return;
      const seat = this.roster.find((p) => p.uid === from)?.seat ?? msg.seat;
      const game = this.handlers.getGame?.();
      if (!game || !actionAllowed(game, msg.action, seat)) return;
      if (applyNetAction(game, msg.action, seat)) this.handlers.onHostApplied?.();
    }
    if (msg.type === 'pose') this.handlers.onPose?.(from, msg);
  }

  broadcastPose(pose) {
    this._rtc?.broadcast({ type: 'pose', ...pose });
  }

  async leave() {
    const { db, fs } = firebaseApi();
    if (this._unsubRoom) { this._unsubRoom(); this._unsubRoom = null; }
    if (this._unsubPlayers) { this._unsubPlayers(); this._unsubPlayers = null; }
    if (this._pruneTimer) { clearInterval(this._pruneTimer); this._pruneTimer = null; }
    this._rtc?.closeAll();
    this._rtc = null;
    if (this.uid && this.roomId && db) {
      fs.deleteDoc(fs.doc(db, 'rooms', this.roomId, 'players', this.uid)).catch(() => {});
    }
    this.active = false;
    this.isHost = false;
    this.roomId = null;
    this.seat = null;
    this.roster = [];
    this.room = null;
    this.status = 'idle';
  }
}

function isPlayerStale(data, now = Date.now()) {
  const t = data?.updatedAt?.toMillis?.() ?? (data?.updatedAt?.seconds ? data.updatedAt.seconds * 1000 : 0);
  return t > 0 && now - t > STALE_MS;
}

function isRoomStale(data) {
  const t = data?.updatedAt?.toMillis?.() ?? (data?.updatedAt?.seconds ? data.updatedAt.seconds * 1000 : 0);
  return t > 0 && Date.now() - t > 10 * 60 * 1000;
}

export { firebaseErrorMessage, normalizeRoomCode };
