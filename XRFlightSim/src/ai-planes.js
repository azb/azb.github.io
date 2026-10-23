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
const FIRE_ALIGN_DOT = 0.88;
const FIRE_COOLDOWN = 0.35;
const PATROL_RADIUS = 18;
const TURN_RATE = 1.8;
/** Chance to pick chase when rolling a new mood (patrol otherwise). */
const CHASE_MOOD_CHANCE = 0.2;
const MOOD_MIN_SEC = 5;
const MOOD_MAX_SEC = 12;

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

function lookRotation(forward, outQuat) {
  _fwd.copy(forward).normalize();
  if (_fwd.lengthSq() < 1e-8) {
    outQuat.identity();
    return outQuat;
  }
  _right.crossVectors(_fwd, _up);
  if (_right.lengthSq() < 1e-8) {
    _right.set(1, 0, 0);
  } else {
    _right.normalize();
  }
  _aimUp.crossVectors(_right, _fwd).normalize();
  _mat.makeBasis(_right, _aimUp, _fwd.clone().negate());
  return outQuat.setFromRotationMatrix(_mat);
}

function randomSpawn(out) {
  return out.set(
    (Math.random() * 2 - 1) * PATROL_RADIUS,
    2 + Math.random() * 8,
    -6 - Math.random() * 22,
  );
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
 * }} opts
 */
export function createAiFleet(opts) {
  const bots = [];
  const bullets = [];
  let nextBulletId = 0;
  let meshReady = false;

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
          if (copy.color) copy.color.offsetHSL(-0.02, 0.35, -0.05);
          return copy;
        });
        node.material = Array.isArray(node.material) ? next : next[0];
      });
      root.add(mesh);
      opts.playSpace.add(root);
      const pos = randomSpawn(new THREE.Vector3());
      root.position.copy(pos);
      const bot = {
        id: `ai-${i + 1}`,
        root,
        propeller: opts.findPropeller?.(mesh) ?? null,
        position: pos.clone(),
        rotation: new THREE.Quaternion(),
        throttle: 0.55 + Math.random() * 0.2,
        velocity: new THREE.Vector3(),
        health: PLANE_MAX_HEALTH,
        alive: true,
        crashing: false,
        crash: null,
        smokeAcc: 0,
        respawnAt: -1,
        lastFire: -Infinity,
        patrolAngle: Math.random() * Math.PI * 2,
        spawnIndex: 0,
        chasing: Math.random() < CHASE_MOOD_CHANCE,
        moodTimer: MOOD_MIN_SEC + Math.random() * (MOOD_MAX_SEC - MOOD_MIN_SEC),
      };
      lookRotation(new THREE.Vector3(Math.sin(bot.patrolAngle), 0, -Math.cos(bot.patrolAngle)), bot.rotation);
      root.quaternion.copy(bot.rotation);
      bots.push(bot);
    }
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
      tumble: new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 0.35 + 0.15,
        Math.random() * 2 - 1,
      ).normalize(),
      tumbleRate: 0.4,
      tumbleAccel: 2.2,
      maxTumbleRate: 7.5,
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
    randomSpawn(bot.position);
    bot.rotation.identity();
    bot.patrolAngle = Math.random() * Math.PI * 2;
    lookRotation(
      new THREE.Vector3(Math.sin(bot.patrolAngle), 0, -Math.cos(bot.patrolAngle)),
      bot.rotation,
    );
    bot.throttle = 0.55 + Math.random() * 0.2;
    bot.health = PLANE_MAX_HEALTH;
    bot.alive = true;
    bot.crashing = false;
    bot.crash = null;
    bot.smokeAcc = 0;
    bot.respawnAt = -1;
    bot.chasing = Math.random() < CHASE_MOOD_CHANCE;
    bot.moodTimer = MOOD_MIN_SEC + Math.random() * (MOOD_MAX_SEC - MOOD_MIN_SEC);
    bot.root.visible = true;
    bot.root.position.copy(bot.position);
    bot.root.quaternion.copy(bot.rotation);
  }

  function rollMood(bot) {
    bot.chasing = Math.random() < CHASE_MOOD_CHANCE;
    bot.moodTimer = MOOD_MIN_SEC + Math.random() * (MOOD_MAX_SEC - MOOD_MIN_SEC);
  }

  function patrolAim(bot, dt, out) {
    bot.patrolAngle += dt * 0.35;
    return out.set(
      Math.sin(bot.patrolAngle) * PATROL_RADIUS * 0.6,
      3 + Math.sin(bot.patrolAngle * 0.7) * 2,
      -10 + Math.cos(bot.patrolAngle) * PATROL_RADIUS * 0.4,
    );
  }

  function emitFx(origin, kind) {
    opts.spawnFx?.(origin, kind);
  }

  function fireFrom(bot, nowSec) {
    if (bot.crashing) return;
    if (nowSec - bot.lastFire < FIRE_COOLDOWN) return;
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
    opts.playSpace.add(shot);
    bullets.push(shot);
    emitFx(shot.position, "spark");
  }

  function steerBot(bot, targetPos, dt) {
    _to.subVectors(targetPos, bot.position);
    const dist = _to.length();
    if (dist > 0.01) _to.multiplyScalar(1 / dist);
    else _to.set(0, 0, -1);
    lookRotation(_to, _quat);
    bot.rotation.slerp(_quat, clamp(TURN_RATE * dt, 0, 1));
    const desired = clamp(0.4 + dist / 40, 0.35, 0.95);
    bot.throttle = lerp(bot.throttle, desired, clamp(2 * dt, 0, 1));
    return dist;
  }

  function updateCrash(bot, dt, nowSec) {
    const c = bot.crash;
    if (!c) return;
    const step = clamp(dt, 0, 0.1);
    bot.throttle = 0;
    c.tumbleRate = Math.min(c.maxTumbleRate, c.tumbleRate + c.tumbleAccel * step);
    _tumbleQ.setFromAxisAngle(c.tumble, c.tumbleRate * step);
    bot.rotation.premultiply(_tumbleQ).normalize();
    c.gravity += c.gravityAccel * step;
    c.velocity.y -= c.gravity * step;
    c.velocity.multiplyScalar(Math.exp(-0.12 * step));
    bot.position.addScaledVector(c.velocity, step);
    bot.velocity.copy(c.velocity);
    c.smokeAcc += step;
    if (c.smokeAcc >= 0.06) {
      c.smokeAcc = 0;
      emitFx(bot.position, "flame");
    }
    bot.root.position.copy(bot.position);
    bot.root.quaternion.copy(bot.rotation);
    if (bot.position.y <= 0.12) {
      finishCrash(bot, nowSec);
    }
  }

  function updateBots(dt, nowSec, playerPos, playerAirborne) {
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

      bot.moodTimer -= dt;
      if (bot.moodTimer <= 0) rollMood(bot);

      // Damage smoke while flying damaged.
      if (bot.health < PLANE_MAX_HEALTH) {
        bot.smokeAcc += dt;
        if (bot.smokeAcc >= 0.08) {
          bot.smokeAcc = 0;
          emitFx(bot.position, "smoke");
        }
      }

      const toPlayer = bot.position.distanceTo(playerPos);
      const shouldChase = playerAirborne
        && bot.chasing
        && toPlayer < ENGAGE_RANGE;
      const aim = shouldChase ? playerPos : patrolAim(bot, dt, _to);
      steerBot(bot, aim, dt);
      const speed = lerp(0, 100, bot.throttle) * opts.worldSpeedScale;
      _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
      bot.velocity.copy(_fwd).multiplyScalar(speed);
      bot.position.addScaledVector(bot.velocity, dt);
      bot.position.y = clamp(bot.position.y, 0.8, 16);
      bot.root.position.copy(bot.position);
      bot.root.quaternion.copy(bot.rotation);
      if (bot.propeller) {
        bot.propeller.rotateY(-dt * (4 + bot.throttle * 38));
      }
      if (shouldChase && toPlayer < FIRE_RANGE) {
        _fwd.set(0, 0, -1).applyQuaternion(bot.rotation);
        _to.subVectors(playerPos, bot.position).normalize();
        if (_fwd.dot(_to) >= FIRE_ALIGN_DOT) fireFrom(bot, nowSec);
      }
    }
  }

  function updateBullets(dt, playerPos, onPlayerHit) {
    for (let i = bullets.length - 1; i >= 0; i -= 1) {
      const shot = bullets[i];
      const prev = shot.userData.prevPosition || shot.position.clone();
      if (!shot.userData.prevPosition) shot.userData.prevPosition = shot.position.clone();
      const next = shot.position.clone().addScaledVector(shot.userData.velocity, dt);
      if (playerPos && distPointToSegment(playerPos, prev, next) <= AI_HIT_RADIUS) {
        opts.playSpace.remove(shot);
        bullets.splice(i, 1);
        onPlayerHit?.();
        continue;
      }
      shot.userData.prevPosition.copy(shot.position);
      shot.position.copy(next);
      shot.userData.age += dt;
      if (shot.userData.age > opts.bulletLifetimeSec) {
        opts.playSpace.remove(shot);
        bullets.splice(i, 1);
      }
    }
  }

  /**
   * @returns {{ hit: boolean, health: number, destroyed: boolean } | null}
   */
  function hitTestPlayerBullet(prev, next, _nowSec) {
    for (const bot of bots) {
      if (!bot.alive || bot.crashing) continue;
      if (distPointToSegment(bot.position, prev, next) <= AI_HIT_RADIUS) {
        bot.health -= 1;
        if (bot.health <= 0) {
          bot.health = 0;
          beginCrash(bot);
          return { hit: true, health: 0, destroyed: true };
        }
        emitFx(bot.position, "smoke");
        return { hit: true, health: bot.health, destroyed: false };
      }
    }
    return null;
  }

  return {
    update(dt, playerPos, {
      paused = false,
      nowSec = performance.now() / 1000,
      onPlayerHit,
      playerAirborne = false,
    } = {}) {
      if (paused) return;
      updateBots(dt, nowSec, playerPos, playerAirborne);
      updateBullets(dt, playerPos, onPlayerHit);
    },
    hitTestPlayerBullet,
    collectAliveWorldPositions(out) {
      for (const bot of bots) {
        if (!bot.alive && !bot.crashing) continue;
        if (!bot.root?.visible) continue;
        out.push(bot.position.clone());
      }
    },
    aliveCount() {
      return bots.filter((b) => b.alive && !b.crashing).length;
    },
    rebuild() {
      disposeBots();
    },
    dispose() {
      disposeBots();
    },
  };
}
