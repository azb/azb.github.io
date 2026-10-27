/**
 * Local AI dogfight planes — chase/shoot the player; player can shoot them.
 * Client-side only (not networked). Each session gets its own fleet.
 */

import * as THREE from "three";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;

export const PLANE_MAX_HEALTH = 5;

const AI_COUNT = 3;
const AI_HIT_RADIUS = 0.55;
const AI_RESPAWN_SEC = 5;
const ENGAGE_RANGE = 45;
const FIRE_RANGE = 28;
/** ~39° half-angle — “roughly ahead” is enough to open fire. */
const FIRE_ALIGN_DOT = 0.78;
/** Cooldown when barely aligned vs locked on (seconds). */
const FIRE_COOLDOWN_MAX = 0.45;
const FIRE_COOLDOWN_MIN = 0.2;
/** Cap live AI rounds — mesh moves + hit tests scale with count. */
const MAX_AI_BULLETS = 18;
const TURN_RATE = 1.8;
/** Chance to pick chase when rolling a new mood (patrol otherwise). */
const CHASE_MOOD_CHANCE = 0.2;
const MOOD_MIN_SEC = 5;
const MOOD_MAX_SEC = 12;
/** Keep AI in a shallow cone ahead of the player (comfort / less head-turning). */
const FRONT_DIST_MIN = 2.5;
const FRONT_DIST_MAX = 6;
const FRONT_HALF_WIDTH = 5;
const FRONT_VERT = 1.2;
/** Absolute world altitude band — do not track player Y as a rising floor. */
/** Matches player GROUND_CONTACT_Y / runway deck after strip lowered 1m. */
const GROUND_CONTACT_Y = 0.5;
const MIN_FLY_ALT = GROUND_CONTACT_Y;
const MAX_FLY_ALT = 45;
const GROUND_BOUNCE_RESTITUTION = 0.55;
const GROUND_HIT_COOLDOWN_SEC = 0.45;
/** Soft climb cue near the real ground — not a hard invisible floor (m). */
const GROUND_AVOID_MARGIN = 2.2;
const GROUND_AVOID_CLIMB = 0.9;
const WALL_AVOID_MARGIN = 4.2;
const CEILING_AVOID_MARGIN = 3.5;
/** Max |y| of unit look dir (~20°) — avoids nose-down sliding on the floor clamp. */
const MAX_LOOK_PITCH = 0.35;
/** Bank into turns (radians). */
const MAX_BANK = 0.85;
const BANK_GAIN = 1.55;
const BANK_SMOOTH = 4.2;
/** Fixed play-space forward — cone does not rotate with head or plane. */
const WORLD_FORWARD = new THREE.Vector3(0, 0, -1);

const _fwd = new THREE.Vector3();
const _to = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _right = new THREE.Vector3();
const _aimUp = new THREE.Vector3();
const _mat = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _seg = new THREE.Vector3();
const _closest = new THREE.Vector3();
const _tumbleQ = new THREE.Quaternion();
const _down = new THREE.Vector3(0, -1, 0);
const _worldFwd = WORLD_FORWARD.clone();
const _playerPos = new THREE.Vector3();
const _frontal = new THREE.Vector3();

function distPointToSegment(point, a, b) {
  _seg.subVectors(b, a);
  const lenSq = _seg.lengthSq();
  if (lenSq < 1e-10) return point.distanceTo(a);
  const t = clamp(
    ((point.x - a.x) * _seg.x + (point.y - a.y) * _seg.y + (point.z - a.z) * _seg.z) / lenSq,
    0,
    1,
  );
  _closest.copy(a).addScaledVector(_seg, t);
  return point.distanceTo(_closest);
}

function lookRotation(forward, outQuat, bankRad = 0) {
  _fwd.copy(forward).normalize();
  if (_fwd.lengthSq() < 1e-8) {
    outQuat.identity();
    return outQuat;
  }
  // Cap pitch so altitude clamps don't turn into "sliding while nose-down".
  _fwd.y = clamp(_fwd.y, -MAX_LOOK_PITCH, MAX_LOOK_PITCH);
  if (_fwd.lengthSq() < 1e-8) _fwd.copy(WORLD_FORWARD);
  else _fwd.normalize();
  _right.crossVectors(_fwd, _up);
  if (_right.lengthSq() < 1e-8) {
    _right.set(1, 0, 0);
  } else {
    _right.normalize();
  }
  _aimUp.crossVectors(_right, _fwd).normalize();
  if (Math.abs(bankRad) > 1e-4) {
    _tumbleQ.setFromAxisAngle(_fwd, bankRad);
    _aimUp.applyQuaternion(_tumbleQ).normalize();
    _right.crossVectors(_fwd, _aimUp);
    if (_right.lengthSq() > 1e-8) {
      _right.normalize();
      _aimUp.crossVectors(_right, _fwd).normalize();
    }
  }
  _mat.makeBasis(_right, _aimUp, _fwd.clone().negate());
  return outQuat.setFromRotationMatrix(_mat);
}

function buildWorldBasis() {
  _worldFwd.copy(WORLD_FORWARD);
  _right.crossVectors(_worldFwd, _up);
  if (_right.lengthSq() < 1e-8) _right.set(1, 0, 0);
  else _right.normalize();
  _aimUp.crossVectors(_right, _worldFwd).normalize();
}

/** Point ahead of the player along world forward, with a gentle side/height weave. */
function frontalPoint(playerPos, bot, dt, out) {
  buildWorldBasis();
  bot.patrolAngle += dt * 0.4;
  const t = bot.patrolAngle;
  const ahead = lerp(FRONT_DIST_MIN, FRONT_DIST_MAX, 0.4 + 0.6 * (0.5 + 0.5 * Math.cos(t)));
  const side = Math.sin(t) * FRONT_HALF_WIDTH;
  const lift = Math.sin(t * 0.65) * FRONT_VERT;
  // Note: play-volume clamp applied by caller after frontalPoint/randomSpawn.
  return out.copy(playerPos)
    .addScaledVector(_worldFwd, ahead)
    .addScaledVector(_right, side)
    .addScaledVector(_aimUp, lift)
    .setY(Math.max(out.y, MIN_FLY_ALT));
}

function randomSpawn(out, playerPos) {
  buildWorldBasis();
  const ahead = FRONT_DIST_MIN + Math.random() * (FRONT_DIST_MAX - FRONT_DIST_MIN);
  const side = (Math.random() * 2 - 1) * FRONT_HALF_WIDTH * 0.85;
  const lift = (Math.random() * 2 - 1) * FRONT_VERT;
  return out.copy(playerPos)
    .addScaledVector(_worldFwd, ahead)
    .addScaledVector(_right, side)
    .addScaledVector(_aimUp, lift)
    .setY(Math.max(out.y, MIN_FLY_ALT));
}

/** Park on the runway beside the player pad (index 0 = first AI slot). */
function runwaySpawn(out, origin, index) {
  buildWorldBasis();
  const side = (index + 1) * 2.4 * (index % 2 === 0 ? 1 : -1);
  const ahead = -0.4 * index;
  return out.copy(origin)
    .addScaledVector(_right, side)
    .addScaledVector(_worldFwd, ahead)
    .setY(GROUND_CONTACT_Y);
}

/**
 * @param {{
 *   playSpace: THREE.Object3D,
 *   createMesh: () => THREE.Object3D,
 *   findPropeller?: (root: THREE.Object3D) => THREE.Object3D | null,
 *   sourceAircraft?: (() => THREE.Object3D) | THREE.Object3D,
 *   meshReady?: () => boolean,
 *   worldSpeedScale: number,
 *   bulletGeom: THREE.BufferGeometry,
 *   bulletMat: THREE.Material,
 *   bulletMuzzleSpeed: number,
 *   bulletLifetimeSec: number,
 *   bulletSpawnLocal: THREE.Vector3[],
 *   spawnFx?: (origin: THREE.Vector3, kind: "smoke" | "flame") => void,
 *   runwayOrigin?: () => THREE.Vector3,
 *   takeoffInvulnSec?: number,
 *   takeoffThrottle?: number,
 *   onBotDamaged?: (root: THREE.Object3D) => void,
 * }} opts
 */
export function createAiFleet(opts) {
  const takeoffInvulnSec = opts.takeoffInvulnSec ?? 3;
  const takeoffThrottle = opts.takeoffThrottle ?? 0.25;
  const bots = [];
  const bullets = [];
  let nextBulletId = 0;
  let meshReady = false;
  /** @type {THREE.Vector3 | null} */
  let boundsMin = opts.boundsMin ? opts.boundsMin.clone() : null;
  /** @type {THREE.Vector3 | null} */
  let boundsMax = opts.boundsMax ? opts.boundsMax.clone() : null;

  function clampToPlayVolume(pos) {
    if (!boundsMin || !boundsMax) return pos;
    pos.x = clamp(pos.x, boundsMin.x, boundsMax.x);
    pos.y = clamp(pos.y, boundsMin.y, boundsMax.y);
    pos.z = clamp(pos.z, boundsMin.z, boundsMax.z);
    return pos;
  }

  function disposeBots() {
    for (const bot of bots) {
      opts.playSpace.remove(bot.root);
    }
    bots.length = 0;
    for (const shot of bullets) {
      opts.playSpace.remove(shot);
    }
    bullets.length = 0;
    meshReady = false;
  }

  function ensureBots() {
    if (meshReady || typeof opts.createMesh !== "function") return;
    if (opts.meshReady && !opts.meshReady()) return;
    let probe = null;
    try {
      probe = opts.createMesh();
    } catch {
      return;
    }
    if (!probe) return;
    meshReady = true;
    for (let i = 0; i < AI_COUNT; i += 1) {
      const root = new THREE.Group();
      root.name = `AiPlane:${i + 1}`;
      const mesh = opts.createMesh();
      const src = typeof opts.sourceAircraft === "function"
        ? opts.sourceAircraft()
        : opts.sourceAircraft;
      if (src) {
        mesh.scale.copy(src.scale);
        mesh.position.copy(src.position);
        mesh.rotation.copy(src.rotation);
      }
      mesh.traverse((node) => {
        if (!node.isMesh || !node.material) return;
        const mats = Array.isArray(node.material) ? node.material : [node.material];
        const next = mats.map((mat) => {
          const copy = mat.clone();
          // Player uses blue "teamcolor" accents — AI get red.
          const name = String(mat.name || copy.name || "").toLowerCase();
          if (name.includes("teamcolor") && copy.color) {
            copy.color.setRGB(0.84, 0.12, 0.14);
            copy.needsUpdate = true;
          }
          return copy;
        });
        node.material = Array.isArray(node.material) ? next : next[0];
      });
      root.add(mesh);
      opts.playSpace.add(root);
      const origin = opts.runwayOrigin?.() || _playerPos;
      const pos = clampToPlayVolume(runwaySpawn(new THREE.Vector3(), origin, i));
      root.position.copy(pos);
      const displayName = `AI Player ${i + 1}`;
      const nameTag = opts.createNameTag?.(displayName) ?? null;
      if (nameTag) root.add(nameTag);
      const bot = {
        id: `ai-${i + 1}`,
        root,
        name: displayName,
        nameTag,
        propeller: opts.findPropeller?.(mesh) ?? null,
        position: pos.clone(),
        rotation: new THREE.Quaternion(),
        bank: 0,
        throttle: 0,
        velocity: new THREE.Vector3(),
        health: PLANE_MAX_HEALTH,
        score: 0,
        groundHitCooldown: 0,
        alive: true,
        crashing: false,
        crash: null,
        smokeAcc: 0,
        respawnAt: -1,
        lastFire: -Infinity,
        patrolAngle: Math.random() * Math.PI * 2,
        spawnIndex: 0,
        chasing: false,
        chaseTargetId: null,
        moodTimer: MOOD_MIN_SEC + Math.random() * (MOOD_MAX_SEC - MOOD_MIN_SEC),
        takingOff: true,
        invulnerableUntil: 0,
        runwaySlot: i,
      };
      lookRotation(WORLD_FORWARD.clone(), bot.rotation);
      root.quaternion.copy(bot.rotation);
      bots.push(bot);
    }
  }

  function isBotInvulnerable(bot, nowSec) {
    return nowSec < (bot.invulnerableUntil || 0);
  }

  function beginCrash(bot) {
    bot.crashing = true;
    bot.alive = true;
    bot.throttle = 0;
    // Keep current travel direction; spin/dive ramp in over time.
    const coast = bot.velocity.clone();
    if (coast.lengthSq() < 1e-4) {
      _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
      coast.copy(_fwd).multiplyScalar(lerp(0, 100, 0.55) * opts.worldSpeedScale);
    }
    bot.crash = {
      velocity: coast,
      spinSign: Math.random() < 0.5 ? -1 : 1,
      spinRate: 1.2,
      spinAccel: 3.5,
      maxSpinRate: 9,
      noseDownRate: 0.55,
      gravity: 0.4,
      gravityAccel: 3.2,
      smokeAcc: 0,
    };
    bot.root.visible = true;
  }

  function finishCrash(bot, nowSec) {
    emitFx(bot.position, "explosion");
    bot.crashing = false;
    bot.crash = null;
    bot.alive = false;
    bot.root.visible = false;
    bot.respawnAt = nowSec + AI_RESPAWN_SEC;
    bot.throttle = 0;
    bot.health = 0;
  }

  function respawnBot(bot) {
    const origin = opts.runwayOrigin?.() || _playerPos;
    runwaySpawn(bot.position, origin, bot.runwaySlot ?? 0);
    clampToPlayVolume(bot.position);
    bot.patrolAngle = Math.random() * Math.PI * 2;
    bot.bank = 0;
    lookRotation(WORLD_FORWARD.clone(), bot.rotation, 0);
    bot.throttle = 0;
    bot.health = PLANE_MAX_HEALTH;
    bot.alive = true;
    bot.crashing = false;
    bot.crash = null;
    bot.smokeAcc = 0;
    bot.respawnAt = -1;
    bot.chasing = false;
    bot.chaseTargetId = null;
    bot.takingOff = true;
    bot.invulnerableUntil = 0;
    bot.moodTimer = MOOD_MIN_SEC + Math.random() * (MOOD_MAX_SEC - MOOD_MIN_SEC);
    bot.root.visible = true;
    bot.root.position.copy(bot.position);
    bot.root.quaternion.copy(bot.rotation);
  }

  function updateTakeoff(bot, dt, nowSec) {
    bot.throttle = clamp(bot.throttle + 0.4 * dt, 0, 0.85);
    const speed = lerp(0, 100, bot.throttle) * opts.worldSpeedScale;
    _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
    bot.velocity.copy(_fwd).multiplyScalar(speed);
    bot.position.addScaledVector(bot.velocity, dt);
    bot.position.y = GROUND_CONTACT_Y;
    clampToPlayVolume(bot.position);
    bot.root.position.copy(bot.position);
    bot.root.quaternion.copy(bot.rotation);
    if (bot.propeller) bot.propeller.rotateY(-dt * (4 + bot.throttle * 38));
    if (bot.throttle >= takeoffThrottle) {
      bot.takingOff = false;
      bot.invulnerableUntil = nowSec + takeoffInvulnSec;
      bot.chasing = Math.random() < CHASE_MOOD_CHANCE;
      bot.moodTimer = MOOD_MIN_SEC + Math.random() * (MOOD_MAX_SEC - MOOD_MIN_SEC);
    }
  }

  function rollMood(bot) {
    bot.chasing = Math.random() < CHASE_MOOD_CHANCE;
    bot.chaseTargetId = null;
    bot.moodTimer = MOOD_MIN_SEC + Math.random() * (MOOD_MAX_SEC - MOOD_MIN_SEC);
  }

  function findBotById(id) {
    for (const bot of bots) {
      if (bot.id === id) return bot;
    }
    return null;
  }

  function creditKill(ownerId) {
    const shooter = findBotById(ownerId);
    if (shooter) shooter.score = (shooter.score || 0) + 1;
  }

  /** Nearest engageable target: player and/or other living AI. */
  function pickChaseTarget(bot, playerPos, playerAirborne) {
    let bestId = null;
    let bestDist = ENGAGE_RANGE;
    if (playerAirborne) {
      const d = bot.position.distanceTo(playerPos);
      if (d < bestDist) {
        bestDist = d;
        bestId = "player";
      }
    }
    for (const other of bots) {
      if (other === bot || !other.alive || other.crashing) continue;
      const d = bot.position.distanceTo(other.position);
      if (d < bestDist) {
        bestDist = d;
        bestId = other.id;
      }
    }
    return bestId;
  }

  function resolveChaseTarget(bot, playerPos, playerAirborne) {
    if (!bot.chasing) {
      bot.chaseTargetId = null;
      return null;
    }
    const current = bot.chaseTargetId;
    if (current === "player") {
      if (playerAirborne && bot.position.distanceTo(playerPos) < ENGAGE_RANGE) {
        return { id: "player", position: playerPos, isPlayer: true };
      }
    } else if (current) {
      const other = findBotById(current);
      if (other?.alive && !other.crashing
        && bot.position.distanceTo(other.position) < ENGAGE_RANGE) {
        return { id: other.id, position: other.position, isPlayer: false };
      }
    }
    bot.chaseTargetId = pickChaseTarget(bot, playerPos, playerAirborne);
    if (!bot.chaseTargetId) return null;
    if (bot.chaseTargetId === "player") {
      return { id: "player", position: playerPos, isPlayer: true };
    }
    const other = findBotById(bot.chaseTargetId);
    if (!other) return null;
    return { id: other.id, position: other.position, isPlayer: false };
  }

  function emitFx(origin, kind) {
    opts.spawnFx?.(origin, kind);
  }

  function fireFrom(bot, nowSec, alignDot = FIRE_ALIGN_DOT) {
    if (bot.crashing) return;
    const alignT = clamp(
      (alignDot - FIRE_ALIGN_DOT) / Math.max(1e-3, 1 - FIRE_ALIGN_DOT),
      0,
      1,
    );
    // Dead-ahead → burst; edge of cone → slower.
    const cooldown = lerp(FIRE_COOLDOWN_MAX, FIRE_COOLDOWN_MIN, alignT * alignT);
    if (nowSec - bot.lastFire < cooldown) return;
    if (bullets.length >= MAX_AI_BULLETS) return;
    bot.lastFire = nowSec;
    const locals = opts.bulletSpawnLocal;
    const local = locals[bot.spawnIndex % locals.length];
    bot.spawnIndex += 1;
    const offset = local.clone().applyQuaternion(bot.rotation);
    const shot = new THREE.Mesh(opts.bulletGeom, opts.bulletMat);
    shot.scale.set(0.03, 0.03, 0.12);
    shot.position.copy(bot.position).add(offset);
    shot.quaternion.copy(bot.rotation);
    _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
    const speed = lerp(0, 100, bot.throttle) * opts.worldSpeedScale;
    shot.userData.velocity = _fwd
      .clone()
      .multiplyScalar(opts.bulletMuzzleSpeed)
      .addScaledVector(_fwd, speed);
    shot.userData.age = 0;
    shot.userData.ai = true;
    shot.userData.ownerId = bot.id;
    shot.userData.bulletId = `${bot.id}-${(nextBulletId += 1)}`;
    shot.userData.prevPosition = shot.position.clone();
    opts.playSpace.add(shot);
    bullets.push(shot);
    // Audio only — spark meshes every AI shot hitch under recording.
    emitFx(shot.position, "gun");
  }

  function applyBoundaryAvoidance(bot, aim) {
    const p = bot.position;
    // Measure from the real runway deck — a raised hard floor caused pitch wobble.
    const headroom = p.y - GROUND_CONTACT_Y;
    if (headroom < GROUND_AVOID_MARGIN) {
      const w = 1 - Math.max(0, headroom) / GROUND_AVOID_MARGIN;
      const ww = w * w;
      const shallow = p.y + GROUND_AVOID_CLIMB * (0.35 + 0.65 * ww);
      aim.y = lerp(aim.y, Math.max(aim.y, shallow), ww * 0.9);
      _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
      if (_fwd.y < -0.06) {
        const dive = clamp(-_fwd.y, 0, 1);
        aim.y = lerp(aim.y, p.y + GROUND_AVOID_CLIMB * (1 + dive), ww * dive);
      }
    }
    if (boundsMin && boundsMax) {
      const pushAxis = (distToMin, distToMax, margin, towardMax, towardMin, cur) => {
        let out = cur;
        if (distToMin < margin) {
          const w = 1 - Math.max(0, distToMin) / margin;
          out = lerp(out, towardMax, w * w);
        }
        if (distToMax < margin) {
          const w = 1 - Math.max(0, distToMax) / margin;
          out = lerp(out, towardMin, w * w);
        }
        return out;
      };
      const cx = (boundsMin.x + boundsMax.x) * 0.5;
      const cy = (boundsMin.y + boundsMax.y) * 0.5;
      const cz = (boundsMin.z + boundsMax.z) * 0.5;
      aim.x = pushAxis(
        p.x - boundsMin.x,
        boundsMax.x - p.x,
        WALL_AVOID_MARGIN,
        p.x + WALL_AVOID_MARGIN * 2,
        p.x - WALL_AVOID_MARGIN * 2,
        aim.x,
      );
      aim.z = pushAxis(
        p.z - boundsMin.z,
        boundsMax.z - p.z,
        WALL_AVOID_MARGIN,
        p.z + WALL_AVOID_MARGIN * 2,
        p.z - WALL_AVOID_MARGIN * 2,
        aim.z,
      );
      aim.y = pushAxis(
        p.y - Math.max(boundsMin.y, GROUND_CONTACT_Y),
        boundsMax.y - p.y,
        CEILING_AVOID_MARGIN,
        p.y + CEILING_AVOID_MARGIN,
        p.y - CEILING_AVOID_MARGIN,
        aim.y,
      );
      const edge = Math.min(
        p.x - boundsMin.x,
        boundsMax.x - p.x,
        p.z - boundsMin.z,
        boundsMax.z - p.z,
      ) / WALL_AVOID_MARGIN;
      if (edge < 1) {
        _to.set(cx - p.x, cy - p.y, cz - p.z);
        if (_to.lengthSq() > 1) {
          const t = (1 - Math.max(0, edge)) * 0.65;
          _to.normalize().multiplyScalar(WALL_AVOID_MARGIN * 2);
          aim.x = lerp(aim.x, p.x + _to.x, t);
          aim.y = lerp(aim.y, p.y + _to.y, t * 0.5);
          aim.z = lerp(aim.z, p.z + _to.z, t);
        }
      }
    }
    aim.y = clamp(aim.y, GROUND_CONTACT_Y, MAX_FLY_ALT);
    return clampToPlayVolume(aim);
  }

  function steerBot(bot, targetPos, dt) {
    _to.subVectors(targetPos, bot.position);
    const dist = _to.length();
    if (dist > 0.01) _to.multiplyScalar(1 / dist);
    else _to.set(0, 0, -1);
    _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
    const curFlatX = _fwd.x;
    const curFlatZ = _fwd.z;
    const curFlatLen = Math.hypot(curFlatX, curFlatZ);
    const wantFlatX = _to.x;
    const wantFlatZ = _to.z;
    const wantFlatLen = Math.hypot(wantFlatX, wantFlatZ);
    let wantBank = 0;
    if (curFlatLen > 0.05 && wantFlatLen > 0.05) {
      const ax = curFlatX / curFlatLen;
      const az = curFlatZ / curFlatLen;
      const bx = wantFlatX / wantFlatLen;
      const bz = wantFlatZ / wantFlatLen;
      const crossY = ax * bz - az * bx;
      const flatDot = clamp(ax * bx + az * bz, -1, 1);
      const yawErr = Math.atan2(crossY, flatDot);
      wantBank = clamp(yawErr * BANK_GAIN, -MAX_BANK, MAX_BANK);
    }
    bot.bank = lerp(bot.bank || 0, wantBank, clamp(BANK_SMOOTH * dt, 0, 1));
    lookRotation(_to, _quat, bot.bank);
    bot.rotation.slerp(_quat, clamp(TURN_RATE * dt, 0, 1));
    const desired = clamp(0.4 + dist / 40, 0.35, 0.95);
    bot.throttle = lerp(bot.throttle, desired, clamp(2 * dt, 0, 1));
    return dist;
  }

  function applyCrashAttitude(rotation, c, step) {
    _fwd.set(0, 0, -1).applyQuaternion(rotation).normalize();
    const alignDot = -_fwd.y; // 1 = nose already down
    if (alignDot < 0.95) {
      _right.crossVectors(_fwd, _down);
      if (_right.lengthSq() < 1e-8) {
        _right.set(1, 0, 0).applyQuaternion(rotation).normalize();
      } else {
        _right.normalize();
      }
      const angle = Math.acos(clamp(alignDot, -1, 1));
      const pitchStep = Math.min(angle, c.noseDownRate * step);
      _tumbleQ.setFromAxisAngle(_right, pitchStep);
      rotation.premultiply(_tumbleQ);
    }
    c.spinRate = Math.min(c.maxSpinRate, c.spinRate + c.spinAccel * step);
    _tumbleQ.setFromAxisAngle(_fwd.set(0, 0, -1), c.spinRate * step * c.spinSign);
    rotation.multiply(_tumbleQ).normalize();
  }

  function updateCrash(bot, dt, nowSec) {
    const c = bot.crash;
    if (!c) return;
    const step = clamp(dt, 0, 0.1);
    bot.throttle = 0;
    applyCrashAttitude(bot.rotation, c, step);
    c.gravity += c.gravityAccel * step;
    c.velocity.y -= c.gravity * step;
    c.velocity.multiplyScalar(Math.exp(-0.12 * step));
    bot.position.addScaledVector(c.velocity, step);
    bot.velocity.copy(c.velocity);
    c.smokeAcc += step;
    // Match Specs cadence — 0.06 spawned a mesh every few frames while crashing.
    if (c.smokeAcc >= 0.4) {
      c.smokeAcc = 0;
      emitFx(bot.position, "flame");
    }
    bot.root.position.copy(bot.position);
    bot.root.quaternion.copy(bot.rotation);
    if (bot.position.y <= GROUND_CONTACT_Y) {
      finishCrash(bot, nowSec);
    }
  }

  function bounceOffGround(bot) {
    _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
    _fwd.y = Math.max(-_fwd.y * GROUND_BOUNCE_RESTITUTION, 0.18);
    _fwd.normalize();
    lookRotation(_fwd, bot.rotation);
    const speed = bot.velocity.length();
    bot.velocity.copy(_fwd).multiplyScalar(speed > 1e-3 ? speed : lerp(0, 100, bot.throttle) * opts.worldSpeedScale);
    bot.position.y = GROUND_CONTACT_Y;
  }

  function updateBots(dt, nowSec, playerPos, playerAirborne) {
    _playerPos.copy(playerPos);
    buildWorldBasis();
    ensureBots();
    for (const bot of bots) {
      if (!bot.alive && !bot.crashing) {
        if (bot.respawnAt > 0 && nowSec >= bot.respawnAt) respawnBot(bot);
        continue;
      }
      if (bot.crashing) {
        updateCrash(bot, dt, nowSec);
        continue;
      }
      if (bot.takingOff) {
        updateTakeoff(bot, dt, nowSec);
        continue;
      }

      bot.moodTimer -= dt;
      if (bot.moodTimer <= 0) rollMood(bot);

      // Sparse damage smoke — dense trails hitch while recording.
      if (bot.health < PLANE_MAX_HEALTH) {
        bot.smokeAcc += dt;
        if (bot.smokeAcc >= 0.55) {
          bot.smokeAcc = 0;
          emitFx(bot.position, "smoke");
        }
      }

      const chase = resolveChaseTarget(bot, playerPos, playerAirborne);
      let aim;
      if (chase) {
        if (chase.isPlayer) {
          // Attack from world-ahead — don't orbit behind the player.
          aim = _frontal.copy(playerPos).addScaledVector(_worldFwd, 1.2);
        } else {
          aim = _frontal.copy(chase.position);
        }
      } else {
        aim = frontalPoint(playerPos, bot, dt, _frontal);
      }
      // Absolute altitude only — don't shove bots up when the player climbs.
      aim.y = clamp(aim.y, GROUND_CONTACT_Y, MAX_FLY_ALT);
      clampToPlayVolume(aim);
      applyBoundaryAvoidance(bot, aim);
      steerBot(bot, aim, dt);
      const speed = lerp(0, 100, bot.throttle) * opts.worldSpeedScale;
      _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
      bot.velocity.copy(_fwd).multiplyScalar(speed);
      bot.position.addScaledVector(bot.velocity, dt);
      bot.groundHitCooldown = Math.max(0, (bot.groundHitCooldown || 0) - dt);
      if (bot.position.y <= GROUND_CONTACT_Y) {
        const diving = _fwd.y < -0.02 || bot.velocity.y < -0.05;
        bot.position.y = GROUND_CONTACT_Y;
        if (diving) {
          bot.bank = 0;
          bounceOffGround(bot);
          if (bot.groundHitCooldown <= 0 && !isBotInvulnerable(bot, nowSec)) {
            bot.groundHitCooldown = GROUND_HIT_COOLDOWN_SEC;
            bot.health -= 1;
            opts.onBotDamaged?.(bot.root);
            emitFx(bot.position, "smoke");
            if (bot.health <= 0) {
              bot.health = 0;
              beginCrash(bot);
            }
          }
        }
      } else if (bot.position.y > MAX_FLY_ALT) {
        bot.position.y = MAX_FLY_ALT;
      }
      if (bot.crashing) continue;
      clampToPlayVolume(bot.position);
      bot.root.position.copy(bot.position);
      bot.root.quaternion.copy(bot.rotation);
      if (bot.propeller) {
        bot.propeller.rotateY(-dt * (4 + bot.throttle * 38));
      }
      if (chase) {
        const toTarget = bot.position.distanceTo(chase.position);
        if (toTarget < FIRE_RANGE) {
          _fwd.set(0, 0, -1).applyQuaternion(bot.rotation);
          _to.subVectors(chase.position, bot.position).normalize();
          const align = _fwd.dot(_to);
          if (align >= FIRE_ALIGN_DOT) fireFrom(bot, nowSec, align);
        }
      }
    }
  }

  function updateBullets(dt, playerPos, onPlayerHit, _nowSec) {
    for (let i = bullets.length - 1; i >= 0; i -= 1) {
      const shot = bullets[i];
      if (!shot.userData.prevPosition) {
        shot.userData.prevPosition = shot.position.clone();
      }
      const prev = shot.userData.prevPosition;
      prev.copy(shot.position);
      shot.position.addScaledVector(shot.userData.velocity, dt);
      const ownerId = shot.userData.ownerId;
      // AI rounds only hit the player — skip AI↔AI (O(bullets×bots)).
      if (playerPos && distPointToSegment(playerPos, prev, shot.position) <= AI_HIT_RADIUS) {
        opts.playSpace.remove(shot);
        bullets.splice(i, 1);
        if (onPlayerHit) {
          creditKill(ownerId);
          onPlayerHit();
        }
        continue;
      }
      shot.userData.age += dt;
      if (shot.userData.age > opts.bulletLifetimeSec) {
        opts.playSpace.remove(shot);
        bullets.splice(i, 1);
      }
    }
  }

  /**
   * @returns {{ hit: boolean, health: number, destroyed: boolean, position?: THREE.Vector3 } | null}
   */
  function hitTestPlayerBullet(prev, next, nowSec = 0) {
    for (const bot of bots) {
      if (!bot.alive || bot.crashing || bot.takingOff) continue;
      if (isBotInvulnerable(bot, nowSec)) continue;
      if (distPointToSegment(bot.position, prev, next) <= AI_HIT_RADIUS) {
        bot.health -= 1;
        opts.onBotDamaged?.(bot.root);
        if (bot.health <= 0) {
          bot.health = 0;
          const at = bot.position.clone();
          beginCrash(bot);
          return { hit: true, health: 0, destroyed: true, position: at };
        }
        // Non-lethal: hit flash only (damage smoke is rate-limited separately).
        return {
          hit: true,
          health: bot.health,
          destroyed: false,
          position: bot.position.clone(),
        };
      }
    }
    return null;
  }

  return {
    setPlayBounds(min, max) {
      boundsMin = min ? min.clone() : null;
      boundsMax = max ? max.clone() : null;
      for (const bot of bots) {
        if (bot.alive || bot.crashing) clampToPlayVolume(bot.position);
      }
    },
    update(dt, playerPos, {
      paused = false,
      nowSec = performance.now() / 1000,
      onPlayerHit,
      playerAirborne = false,
    } = {}) {
      if (paused) return;
      updateBots(dt, nowSec, playerPos, playerAirborne);
      updateBullets(dt, playerPos, onPlayerHit, nowSec);
    },
    hitTestPlayerBullet,
    forEachBotRoot(fn) {
      for (const bot of bots) {
        if (bot.root) fn(bot.root);
      }
    },
    collectAliveWorldPositions(out) {
      for (const bot of bots) {
        if (!bot.alive && !bot.crashing) continue;
        if (!bot.root?.visible) continue;
        out.push(bot.position.clone());
      }
    },
    /** Roots + throttle/velocity for spatial engine loops. */
    collectEngineSources(out) {
      for (const bot of bots) {
        if (!bot.alive && !bot.crashing) continue;
        if (!bot.root?.visible) continue;
        out.push({
          root: bot.root,
          velocity: bot.velocity,
          throttle: bot.throttle,
        });
      }
    },
    forEachNameTag(fn) {
      for (const bot of bots) {
        if (!bot.nameTag) continue;
        bot.nameTag.visible = Boolean(bot.alive || bot.crashing);
        fn(bot.nameTag, bot.root, bot.health);
      }
    },
    aliveCount() {
      return bots.filter((b) => b.alive && !b.crashing).length;
    },
    /** Scoreboard rows for AI bandits. */
    getScoreboardEntries() {
      return bots.map((b) => ({
        name: b.name,
        score: b.score || 0,
        isAi: true,
        isLocal: false,
      }));
    },
    resetMatchScores() {
      for (const bot of bots) bot.score = 0;
    },
    rebuild() {
      disposeBots();
    },
    dispose() {
      disposeBots();
    },
  };
}
