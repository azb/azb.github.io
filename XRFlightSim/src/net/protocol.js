/** Peer plane pose snapshot (WebRTC JSON). */
export function makePlaneMessage({ playerId, position, rotation, throttle, t = performance.now() }) {
  return {
    type: "plane",
    playerId,
    t,
    pos: [position.x, position.y, position.z],
    rot: [rotation.x, rotation.y, rotation.z, rotation.w],
    throttle: Number(throttle) || 0,
  };
}

export function makeHelloMessage(playerId) {
  return { type: "hello", playerId };
}

export function makeFireMessage({ playerId, bulletId, position, velocity, rotation }) {
  return {
    type: "fire",
    playerId,
    bulletId,
    pos: [position.x, position.y, position.z],
    vel: [velocity.x, velocity.y, velocity.z],
    rot: [rotation.x, rotation.y, rotation.z, rotation.w],
  };
}

export function makeBalloonSyncMessage(balloons) {
  return {
    type: "balloonSync",
    balloons: balloons.map((b) => ({
      id: b.id,
      pos: [b.pos.x, b.pos.y, b.pos.z],
      active: Boolean(b.active),
      delaySec: Math.max(0, Number(b.delaySec) || 0),
    })),
  };
}

export function makeBalloonPopMessage({ id, by, respawnPos, delaySec = 5 }) {
  return {
    type: "balloonPop",
    id,
    by,
    respawnPos: [respawnPos.x, respawnPos.y, respawnPos.z],
    delaySec,
  };
}

export function parsePlaneMessage(msg) {
  if (!msg || msg.type !== "plane") return null;
  if (!Array.isArray(msg.pos) || msg.pos.length < 3) return null;
  if (!Array.isArray(msg.rot) || msg.rot.length < 4) return null;
  return {
    playerId: String(msg.playerId || ""),
    t: Number(msg.t) || 0,
    pos: vec3FromArr(msg.pos),
    rot: {
      x: Number(msg.rot[0]) || 0,
      y: Number(msg.rot[1]) || 0,
      z: Number(msg.rot[2]) || 0,
      w: Number(msg.rot[3]) || 1,
    },
    throttle: clamp01(Number(msg.throttle) || 0),
  };
}

export function parseFireMessage(msg) {
  if (!msg || msg.type !== "fire") return null;
  if (!Array.isArray(msg.pos) || !Array.isArray(msg.vel)) return null;
  return {
    playerId: String(msg.playerId || ""),
    bulletId: String(msg.bulletId || `${msg.playerId}-${msg.pos[0]}`),
    pos: vec3FromArr(msg.pos),
    vel: vec3FromArr(msg.vel),
    rot: Array.isArray(msg.rot) && msg.rot.length >= 4
      ? {
        x: Number(msg.rot[0]) || 0,
        y: Number(msg.rot[1]) || 0,
        z: Number(msg.rot[2]) || 0,
        w: Number(msg.rot[3]) || 1,
      }
      : { x: 0, y: 0, z: 0, w: 1 },
  };
}

export function parseBalloonSyncMessage(msg) {
  if (!msg || msg.type !== "balloonSync" || !Array.isArray(msg.balloons)) return null;
  return msg.balloons.map((b, i) => ({
    id: Number.isFinite(b.id) ? b.id : i,
    pos: vec3FromArr(b.pos || [0, 2, -8]),
    active: b.active !== false,
    delaySec: Math.max(0, Number(b.delaySec) || 0),
  }));
}

export function parseBalloonPopMessage(msg) {
  if (!msg || msg.type !== "balloonPop") return null;
  if (!Number.isFinite(msg.id)) return null;
  return {
    id: msg.id,
    by: String(msg.by || ""),
    respawnPos: vec3FromArr(msg.respawnPos || [0, 3, -10]),
    delaySec: Math.max(1, Number(msg.delaySec) || 5),
  };
}

function vec3FromArr(arr) {
  return {
    x: Number(arr?.[0]) || 0,
    y: Number(arr?.[1]) || 0,
    z: Number(arr?.[2]) || 0,
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
