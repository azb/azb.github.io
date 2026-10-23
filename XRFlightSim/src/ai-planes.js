/**
 * Local AI dogfight planes — chase/shoot the player; player can shoot them.
 * Client-side only (not networked). Each session gets its own fleet.
 */

import * as THREE from "three";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;

const AI_COUNT = 3;
const AI_HIT_RADIUS = 0.55;
const AI_RESPAWN_SEC = 5;
const ENGAGE_RANGE = 45;
const FIRE_RANGE = 28;
const FIRE_ALIGN_DOT = 0.88;
const FIRE_COOLDOWN = 0.35;
const PATROL_RADIUS = 18;
const TURN_RATE = 1.8;

const _fwd = new THREE.Vector3();
const _to = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _right = new THREE.Vector3();
const _aimUp = new THREE.Vector3();
const _mat = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _seg = new THREE.Vector3();
const _closest = new THREE.Vector3();

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
  // Local forward is -Z: basis columns = right, up, -forward
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
 *   worldSpeedScale: number,
 *   bulletGeom: THREE.BufferGeometry,
 *   bulletMat: THREE.Material,
 *   bulletMuzzleSpeed: number,
 *   bulletLifetimeSec: number,
 *   bulletSpawnLocal: THREE.Vector3[],
 * }} opts
 */
export function createAiFleet(opts) {
  const bots = [];
  const bullets = [];
  let nextBulletId = 0;
  let meshReady = false;

  function ensureBots() {
    if (meshReady || typeof opts.createMesh !== "function") return;
    // Aircraft may not be loaded yet — retry until clone works.
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
      // Tint AI planes slightly red so they're distinct from peer remotes.
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
        alive: true,
        respawnAt: -1,
        lastFire: -Infinity,
        patrolAngle: Math.random() * Math.PI * 2,
        spawnIndex: 0,
      };
      lookRotation(new THREE.Vector3(Math.sin(bot.patrolAngle), 0, -Math.cos(bot.patrolAngle)), bot.rotation);
      root.quaternion.copy(bot.rotation);
      bots.push(bot);
    }
  }

  function killBot(bot, nowSec) {
    if (!bot.alive) return;
    bot.alive = false;
    bot.root.visible = false;
    bot.respawnAt = nowSec + AI_RESPAWN_SEC;
    bot.throttle = 0;
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
    bot.alive = true;
    bot.respawnAt = -1;
    bot.root.visible = true;
    bot.root.position.copy(bot.position);
    bot.root.quaternion.copy(bot.rotation);
  }

  function fireFrom(bot, nowSec) {
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
  }

  function steerBot(bot, targetPos, dt) {
    _to.subVectors(targetPos, bot.position);
    const dist = _to.length();
    if (dist > 0.01) _to.multiplyScalar(1 / dist);
    else _to.set(0, 0, -1);
    lookRotation(_to, _quat);
    bot.rotation.slerp(_quat, clamp(TURN_RATE * dt, 0, 1));
    // Close in: more throttle when far, ease when close.
    const desired = clamp(0.4 + dist / 40, 0.35, 0.95);
    bot.throttle = lerp(bot.throttle, desired, clamp(2 * dt, 0, 1));
    return dist;
  }

  function updateBots(dt, nowSec, playerPos) {
    ensureBots();
    for (const bot of bots) {
      if (!bot.alive) {
        if (bot.respawnAt > 0 && nowSec >= bot.respawnAt) respawnBot(bot);
        continue;
      }
      const toPlayer = bot.position.distanceTo(playerPos);
      let aim = null;
      if (toPlayer < ENGAGE_RANGE) {
        aim = playerPos;
      } else {
        bot.patrolAngle += dt * 0.35;
        aim = _to.set(
          Math.sin(bot.patrolAngle) * PATROL_RADIUS * 0.6,
          3 + Math.sin(bot.patrolAngle * 0.7) * 2,
          -10 + Math.cos(bot.patrolAngle) * PATROL_RADIUS * 0.4,
        );
      }
      const dist = steerBot(bot, aim, dt);
      const speed = lerp(0, 100, bot.throttle) * opts.worldSpeedScale;
      _fwd.set(0, 0, -1).applyQuaternion(bot.rotation).normalize();
      bot.velocity.copy(_fwd).multiplyScalar(speed);
      bot.position.addScaledVector(bot.velocity, dt);
      // Soft floor / ceiling
      bot.position.y = clamp(bot.position.y, 0.8, 16);
      bot.root.position.copy(bot.position);
      bot.root.quaternion.copy(bot.rotation);
      if (bot.propeller) {
        bot.propeller.rotateY(-dt * (4 + bot.throttle * 38));
      }
      if (toPlayer < FIRE_RANGE) {
        _fwd.set(0, 0, -1).applyQuaternion(bot.rotation);
        _to.subVectors(playerPos, bot.position).normalize();
        if (_fwd.dot(_to) >= FIRE_ALIGN_DOT) fireFrom(bot, nowSec);
      }
      void dist;
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
   * Test a player bullet segment against alive AI planes.
   * @returns {boolean} true if a bot was hit
   */
  function hitTestPlayerBullet(prev, next, nowSec) {
    for (const bot of bots) {
      if (!bot.alive) continue;
      if (distPointToSegment(bot.position, prev, next) <= AI_HIT_RADIUS) {
        killBot(bot, nowSec);
        return true;
      }
    }
    return false;
  }

  return {
    update(dt, playerPos, { paused = false, nowSec = performance.now() / 1000, onPlayerHit } = {}) {
      if (paused) return;
      updateBots(dt, nowSec, playerPos);
      updateBullets(dt, playerPos, onPlayerHit);
    },
    hitTestPlayerBullet,
    aliveCount() {
      return bots.filter((b) => b.alive).length;
    },
  };
}
