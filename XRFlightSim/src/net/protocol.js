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

export function parsePlaneMessage(msg) {
  if (!msg || msg.type !== "plane") return null;
  if (!Array.isArray(msg.pos) || msg.pos.length < 3) return null;
  if (!Array.isArray(msg.rot) || msg.rot.length < 4) return null;
  return {
    playerId: String(msg.playerId || ""),
    t: Number(msg.t) || 0,
    pos: {
      x: Number(msg.pos[0]) || 0,
      y: Number(msg.pos[1]) || 0,
      z: Number(msg.pos[2]) || 0,
    },
    rot: {
      x: Number(msg.rot[0]) || 0,
      y: Number(msg.rot[1]) || 0,
      z: Number(msg.rot[2]) || 0,
      w: Number(msg.rot[3]) || 1,
    },
    throttle: clamp01(Number(msg.throttle) || 0),
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
