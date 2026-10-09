import {
  APP_ID,
  loadFirebase,
  startFirebase,
  firebaseApi,
  firebaseErrorMessage,
  randomRoomCode,
  normalizeRoomCode,
} from "./firebase.js";
import { createRtcMesh } from "./webrtc.js";
import { makeHelloMessage, makePlaneMessage, parsePlaneMessage } from "./protocol.js";

const HEARTBEAT_MS = 20000;
const STALE_MS = 45000;
const MAX_PLAYERS = 4;

export class FlightMultiplayerSession {
  constructor() {
    this.active = false;
    this.isHost = false;
    this.uid = null;
    this.roomId = null;
    this.hostUid = null;
    this.status = "idle";
    this.roster = [];
    this.room = null;
    this.handlers = {};
    this._unsubRoom = null;
    this._unsubPlayers = null;
    this._pruneTimer = null;
    this._rtc = null;
    this._lastPresence = 0;
  }

  on(handlers) {
    this.handlers = { ...this.handlers, ...handlers };
  }

  linkCount() {
    return this._rtc?.openCount?.() ?? 0;
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
    for (let i = 0; i < 8; i += 1) {
      const ref = fs.doc(db, "rooms", code);
      const snap = await fs.getDoc(ref);
      if (!snap.exists() || snap.data()?.app !== APP_ID || isRoomStale(snap.data())) {
        this.roomId = code;
        this.isHost = true;
        this.hostUid = this.uid;
        await fs.setDoc(ref, {
          app: APP_ID,
          host: this.uid,
          status: "playing",
          playerCount: 1,
          updatedAt: fs.serverTimestamp(),
          lastJoiner: this.uid,
        });
        await this._enterRoom();
        return code;
      }
      code = randomRoomCode();
    }
    throw new Error("Could not allocate a room code. Try again.");
  }

  async joinRoom(rawCode) {
    const code = normalizeRoomCode(rawCode);
    if (code.length < 4) throw new Error("Enter a 4-character room code.");
    await this.ensureAuth();
    const { db, fs } = firebaseApi();
    const ref = fs.doc(db, "rooms", code);
    const snap = await fs.getDoc(ref);
    if (!snap.exists() || snap.data()?.app !== APP_ID) {
      throw new Error("No XRFlightSim room with that code.");
    }
    const data = snap.data();
    const playersSnap = await fs.getDocs(fs.collection(db, "rooms", code, "players"));
    if (playersSnap.size >= MAX_PLAYERS) {
      throw new Error("That room is full (max 4).");
    }
    this.roomId = code;
    this.isHost = data.host === this.uid;
    this.hostUid = data.host;
    await fs.setDoc(
      ref,
      {
        updatedAt: fs.serverTimestamp(),
        lastJoiner: this.uid,
      },
      { merge: true },
    );
    await this._enterRoom();
    return code;
  }

  async _enterRoom() {
    this.active = true;
    this.status = "playing";
    const { db, fs } = firebaseApi();
    this._rtc = createRtcMesh({
      uid: this.uid,
      onMessage: (from, msg) => this._onRtc(from, msg),
      onOpen: (id) => {
        this._rtc?.sendTo(id, makeHelloMessage(this.uid));
        this.handlers.onLink?.(id);
      },
      onClose: (id) => this.handlers.onPeerClose?.(id),
      publishSignal: () => this.publishPresence(true),
    });
    this._unsubRoom = fs.onSnapshot(fs.doc(db, "rooms", this.roomId), (docSnap) => {
      this.room = { id: docSnap.id, ...docSnap.data() };
      this.hostUid = this.room.host;
      this.isHost = this.room.host === this.uid;
      this.status = this.room.status || "playing";
      this.handlers.onRoom?.(this.room);
    });
    this._unsubPlayers = fs.onSnapshot(fs.collection(db, "rooms", this.roomId, "players"), (snap) => {
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
    const live = docs.filter((d) => !isPlayerStale(d.data, now)).slice(0, MAX_PLAYERS);
    live.sort((a, b) => {
      if (a.id === this.hostUid) return -1;
      if (b.id === this.hostUid) return 1;
      return a.id.localeCompare(b.id);
    });
    this.roster = live.map((d) => ({
      uid: d.id,
      name: d.data.name || "Pilot",
      host: d.id === this.hostUid,
    }));
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
      fs.deleteDoc(fs.doc(db, "rooms", this.roomId, "players", id)).catch(() => {});
    }
  }

  async publishPresence(force = false) {
    if (!this.active || !this.uid || !this.roomId) return;
    const now = performance.now();
    if (!force && now - this._lastPresence < HEARTBEAT_MS) return;
    this._lastPresence = now;
    const { db, fs } = firebaseApi();
    const sig = this._rtc?.signalBlob() || {};
    await fs.setDoc(
      fs.doc(db, "rooms", this.roomId, "players", this.uid),
      {
        name: this.handlers.playerName?.() || "Pilot",
        host: this.isHost,
        presenting: !!this.handlers.presenting?.(),
        updatedAt: fs.serverTimestamp(),
        ...sig,
      },
      { merge: true },
    );
  }

  broadcastPlane({ position, rotation, throttle }) {
    if (!this.active || !this.uid || !this._rtc) return;
    this._rtc.broadcast(
      makePlaneMessage({
        playerId: this.uid,
        position,
        rotation,
        throttle,
      }),
    );
  }

  _onRtc(from, msg) {
    if (!msg?.type) return;
    if (msg.type === "hello") {
      this.handlers.onHello?.(from, msg);
      return;
    }
    if (msg.type === "plane") {
      const plane = parsePlaneMessage(msg);
      if (!plane) return;
      if (!plane.playerId) plane.playerId = from;
      this.handlers.onPlane?.(from, plane);
    }
  }

  async leave() {
    const { db, fs } = firebaseApi();
    if (this._unsubRoom) {
      this._unsubRoom();
      this._unsubRoom = null;
    }
    if (this._unsubPlayers) {
      this._unsubPlayers();
      this._unsubPlayers = null;
    }
    if (this._pruneTimer) {
      clearInterval(this._pruneTimer);
      this._pruneTimer = null;
    }
    this._rtc?.closeAll();
    this._rtc = null;
    if (this.uid && this.roomId && db) {
      fs.deleteDoc(fs.doc(db, "rooms", this.roomId, "players", this.uid)).catch(() => {});
    }
    this.active = false;
    this.isHost = false;
    this.roomId = null;
    this.hostUid = null;
    this.roster = [];
    this.room = null;
    this.status = "idle";
    this.handlers.onLeave?.();
  }
}

function isPlayerStale(data, now = Date.now()) {
  const t = data?.updatedAt?.toMillis?.()
    ?? (data?.updatedAt?.seconds ? data.updatedAt.seconds * 1000 : 0);
  return t > 0 && now - t > STALE_MS;
}

function isRoomStale(data) {
  const t = data?.updatedAt?.toMillis?.()
    ?? (data?.updatedAt?.seconds ? data.updatedAt.seconds * 1000 : 0);
  return t > 0 && Date.now() - t > 10 * 60 * 1000;
}

export { firebaseErrorMessage, normalizeRoomCode };
