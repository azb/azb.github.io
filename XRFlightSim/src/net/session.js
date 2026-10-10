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
import {
  makeBalloonPopMessage,
  makeBalloonSyncMessage,
  makeFireMessage,
  makeHelloMessage,
  makePlaneMessage,
  parseBalloonPopMessage,
  parseBalloonSyncMessage,
  parseFireMessage,
  parsePlaneMessage,
} from "./protocol.js";

const HEARTBEAT_MS = 20000;
const SIGNAL_HEARTBEAT_MS = 2500;
const POSE_FIRESTORE_MS = 100;
/** Drop ghost seats after this (refresh creates a new anonymous uid each time). */
const STALE_MS = 20000;
/** Join/create prune — Firestore rules allow deleting others after ~8s. */
const JOIN_STALE_MS = 10000;
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
    this._lastPosePublish = 0;
    this._localPose = null;
    this._evtSeq = 0;
    this._lastBalloonsKey = "";
    /** @type {Map<string, number>} */
    this._lastRtcPlaneMs = new Map();
    /** @type {Map<string, number>} */
    this._lastEvtSeq = new Map();
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
        // Wipe leftover player docs from abandoned refreshes before reclaiming.
        await this._pruneStalePlayers(code, 0);
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
    if (code.length < 4) throw new Error("Enter a 4-digit room code.");
    await this.ensureAuth();
    const { db, fs } = firebaseApi();
    const ref = fs.doc(db, "rooms", code);
    const snap = await fs.getDoc(ref);
    if (!snap.exists() || snap.data()?.app !== APP_ID) {
      throw new Error("No XRFlightSim room with that code.");
    }
    const data = snap.data();
    // Refresh-ghosts inflate the seat count — prune before enforcing the cap.
    await this._pruneStalePlayers(code, JOIN_STALE_MS);
    const playersSnap = await fs.getDocs(fs.collection(db, "rooms", code, "players"));
    const now = Date.now();
    const liveOthers = playersSnap.docs.filter(
      (d) => d.id !== this.uid && !isPlayerStale(d.data(), now, JOIN_STALE_MS),
    );
    if (liveOthers.length >= MAX_PLAYERS) {
      throw new Error("That room is full (max 4). Wait a few seconds and retry, or Host a new room.");
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

  /** Delete abandoned player seats. staleMs=0 removes everyone except the caller. */
  async _pruneStalePlayers(roomId, staleMs = STALE_MS) {
    const { db, fs } = firebaseApi();
    if (!db || !roomId) return;
    const snap = await fs.getDocs(fs.collection(db, "rooms", roomId, "players"));
    const now = Date.now();
    const deletes = [];
    snap.forEach((d) => {
      if (d.id === this.uid) return;
      if (staleMs <= 0 || isPlayerStale(d.data(), now, staleMs)) {
        deletes.push(fs.deleteDoc(d.ref).catch(() => {}));
      }
    });
    if (deletes.length) await Promise.all(deletes);
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
        if (this._localPose) {
          this._rtc?.sendTo(
            id,
            makePlaneMessage({
              playerId: this.uid,
              position: {
                x: this._localPose.pos[0],
                y: this._localPose.pos[1],
                z: this._localPose.pos[2],
              },
              rotation: {
                x: this._localPose.rot[0],
                y: this._localPose.rot[1],
                z: this._localPose.rot[2],
                w: this._localPose.rot[3],
              },
              throttle: this._localPose.throttle,
            }),
          );
        }
        if (this.isHost) {
          const balloons = this.handlers.getBalloonSync?.();
          if (balloons?.length) {
            this._rtc?.sendTo(id, makeBalloonSyncMessage(balloons));
          }
        }
        this.handlers.onLink?.(id);
      },
      onClose: (id) => {
        this._lastRtcPlaneMs.delete(id);
        this.handlers.onPeerClose?.(id);
      },
      publishSignal: () => this.publishPresence(true),
    });
    this._unsubRoom = fs.onSnapshot(fs.doc(db, "rooms", this.roomId), (docSnap) => {
      this.room = { id: docSnap.id, ...docSnap.data() };
      this.hostUid = this.room.host;
      this.isHost = this.room.host === this.uid;
      this.status = this.room.status || "playing";
      this.handlers.onRoom?.(this.room);
      // Apply balloons only when the room field changes — not on every player heartbeat.
      const balloonsKey = JSON.stringify(this.room.balloons ?? null);
      if (balloonsKey !== this._lastBalloonsKey) {
        this._lastBalloonsKey = balloonsKey;
        if (Array.isArray(this.room.balloons)) {
          this.handlers.onBalloonSync?.(parseBalloonSyncMessage({
            type: "balloonSync",
            balloons: this.room.balloons,
          }));
        }
      }
    });
    this._unsubPlayers = fs.onSnapshot(fs.collection(db, "rooms", this.roomId, "players"), (snap) => {
      const docs = [];
      snap.forEach((d) => docs.push({ id: d.id, data: d.data() }));
      this._applyPlayers(docs);
      this._pruneStale(snap);
    });
    this._pruneTimer = setInterval(() => {
      this._pruneStale();
      // Keep ICE/signaling alive while waiting for a data channel.
      if (this.linkCount() === 0) this.publishPresence(true).catch(() => {});
    }, SIGNAL_HEARTBEAT_MS);
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

    // Firestore pose / event relay — works when Quest Browser WebRTC never opens.
    for (const d of live) {
      if (d.id === this.uid) continue;
      const pose = d.data?.pose;
      if (pose) {
        const lastRtc = this._lastRtcPlaneMs.get(d.id) || 0;
        if (performance.now() - lastRtc >= 400) {
          const plane = parsePlaneMessage({
            type: "plane",
            playerId: d.id,
            t: pose.t,
            pos: pose.pos,
            rot: pose.rot,
            throttle: pose.throttle,
          });
          if (plane) this.handlers.onPlane?.(d.id, plane);
        }
      }
      const evt = d.data?.evt;
      if (evt?.seq != null) {
        const prev = this._lastEvtSeq.get(d.id) ?? -1;
        if (evt.seq > prev) {
          this._lastEvtSeq.set(d.id, evt.seq);
          this._dispatchEvent(d.id, evt);
        }
      }
    }

    this.handlers.onRoster?.(this.roster);
  }

  _pruneStale(snap) {
    const { db, fs } = firebaseApi();
    if (!db || !this.roomId) return;
    const stale = [];
    if (snap) {
      snap.forEach((d) => {
        if (d.id === this.uid) return;
        if (isPlayerStale(d.data(), Date.now(), STALE_MS)) stale.push(d.id);
      });
    }
    for (const id of stale) {
      fs.deleteDoc(fs.doc(db, "rooms", this.roomId, "players", id)).catch(() => {});
    }
  }

  async publishPresence(force = false) {
    if (!this.active || !this.uid || !this.roomId) return;
    const now = performance.now();
    const interval = this.linkCount() === 0 ? SIGNAL_HEARTBEAT_MS : HEARTBEAT_MS;
    if (!force && now - this._lastPresence < interval) return;
    this._lastPresence = now;
    const { db, fs } = firebaseApi();
    const sig = this._rtc?.signalBlob() || {};
    const doc = {
      name: this.handlers.playerName?.() || "Pilot",
      host: this.isHost,
      presenting: !!this.handlers.presenting?.(),
      updatedAt: fs.serverTimestamp(),
    };
    if (this._localPose) doc.pose = this._localPose;
    // Do not publish empty maps — merge:true would wipe in-flight SDP/ICE.
    if (sig.offers && Object.keys(sig.offers).length) doc.offers = sig.offers;
    if (sig.answers && Object.keys(sig.answers).length) doc.answers = sig.answers;
    if (sig.ice && Object.keys(sig.ice).length) doc.ice = sig.ice;
    await fs.setDoc(fs.doc(db, "rooms", this.roomId, "players", this.uid), doc, { merge: true });
  }

  broadcastPlane({ position, rotation, throttle }) {
    if (!this.active || !this.uid) return;
    this._localPose = {
      t: performance.now(),
      pos: [position.x, position.y, position.z],
      rot: [rotation.x, rotation.y, rotation.z, rotation.w],
      throttle: Number(throttle) || 0,
    };
    this._rtc?.broadcast(
      makePlaneMessage({
        playerId: this.uid,
        position,
        rotation,
        throttle,
      }),
    );
    this._publishPoseRelay();
  }

  _publishPoseRelay() {
    if (!this.active || !this.uid || !this.roomId || !this._localPose) return;
    const now = performance.now();
    if (now - this._lastPosePublish < POSE_FIRESTORE_MS) return;
    this._lastPosePublish = now;
    const { db, fs } = firebaseApi();
    if (!db) return;
    fs.setDoc(
      fs.doc(db, "rooms", this.roomId, "players", this.uid),
      {
        pose: this._localPose,
        updatedAt: fs.serverTimestamp(),
      },
      { merge: true },
    ).catch(() => {});
  }

  broadcastFire({ bulletId, position, velocity, rotation }) {
    if (!this.active || !this.uid) return;
    const msg = makeFireMessage({
      playerId: this.uid,
      bulletId,
      position,
      velocity,
      rotation,
    });
    this._rtc?.broadcast(msg);
    this._publishEvent(msg);
  }

  broadcastBalloonSync(balloons) {
    if (!this.active || !this.isHost) return;
    const msg = makeBalloonSyncMessage(balloons);
    this._rtc?.broadcast(msg);
    const { db, fs } = firebaseApi();
    if (!db || !this.roomId) return;
    fs.setDoc(
      fs.doc(db, "rooms", this.roomId),
      {
        balloons: msg.balloons,
        updatedAt: fs.serverTimestamp(),
      },
      { merge: true },
    ).catch(() => {});
  }

  broadcastBalloonPop({ id, respawnPos, delaySec = 5 }) {
    if (!this.active || !this.uid) return;
    const msg = makeBalloonPopMessage({
      id,
      by: this.uid,
      respawnPos,
      delaySec,
    });
    this._rtc?.broadcast(msg);
    this._publishEvent(msg);
  }

  _publishEvent(msg) {
    if (!this.active || !this.uid || !this.roomId) return;
    this._evtSeq += 1;
    const { db, fs } = firebaseApi();
    if (!db) return;
    fs.setDoc(
      fs.doc(db, "rooms", this.roomId, "players", this.uid),
      {
        evt: { seq: this._evtSeq, ...msg },
        updatedAt: fs.serverTimestamp(),
      },
      { merge: true },
    ).catch(() => {});
  }

  _dispatchEvent(from, msg) {
    if (!msg?.type) return;
    if (msg.type === "fire") {
      const fire = parseFireMessage(msg);
      if (fire) {
        if (!fire.playerId) fire.playerId = from;
        this.handlers.onFire?.(from, fire);
      }
      return;
    }
    if (msg.type === "balloonPop") {
      const pop = parseBalloonPopMessage(msg);
      if (pop) this.handlers.onBalloonPop?.(from, pop);
      return;
    }
    if (msg.type === "balloonSync") {
      const balloons = parseBalloonSyncMessage(msg);
      if (balloons) this.handlers.onBalloonSync?.(balloons);
    }
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
      this._lastRtcPlaneMs.set(from, performance.now());
      this.handlers.onPlane?.(from, plane);
      return;
    }
    this._dispatchEvent(from, msg);
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
    this._localPose = null;
    this._lastBalloonsKey = "";
    this._lastRtcPlaneMs.clear();
    this._lastEvtSeq.clear();
    this.handlers.onLeave?.();
  }
}

function isPlayerStale(data, now = Date.now(), staleMs = STALE_MS) {
  const t = data?.updatedAt?.toMillis?.()
    ?? (data?.updatedAt?.seconds ? data.updatedAt.seconds * 1000 : 0);
  // Missing timestamp = abandoned / never heartbeated — treat as stale.
  if (!(t > 0)) return true;
  return now - t > staleMs;
}

function isRoomStale(data) {
  const t = data?.updatedAt?.toMillis?.()
    ?? (data?.updatedAt?.seconds ? data.updatedAt.seconds * 1000 : 0);
  return t > 0 && Date.now() - t > 10 * 60 * 1000;
}

export { firebaseErrorMessage, normalizeRoomCode };
