import * as THREE from 'three';
import { TABLE_HEIGHT, RESOURCE_COLOR } from '../game/constants.js';
import { seatPose } from './avatars.js';

const TILE_TOP = 0.048;
const DICE_WAIT = 0.74;
const FLIGHT = 0.92;
const STAGGER = 0.055;
const CHIP_GEO = new THREE.CircleGeometry(0.026, 24);
const CHIP_RIM = new THREE.RingGeometry(0.024, 0.031, 24);

const LETTER = { wood: 'L', brick: 'B', sheep: 'W', wheat: 'G', ore: 'O' };
const INK = { wood: '#f4efe4', brick: '#f7efe6', sheep: '#243018', wheat: '#3a2a10', ore: '#1c1a18' };

export class ProductionFlights {
  constructor(scene) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.flights = [];
    this.maps = new Map();
  }

  play(events, { board, players, playerCount }) {
    this.clear();
    if (!events?.length) return 0;
    const hexCounts = new Map();
    let i = 0;
    for (const ev of events) {
      const hex = board.hexes.get(ev.hexId);
      const vert = board.vertices.get(ev.vertexId);
      const player = players[ev.playerId];
      if (!hex || !player) continue;
      const n = ev.amount || 1;
      for (let k = 0; k < n; k++) {
        const slot = hexCounts.get(ev.hexId) || 0;
        hexCounts.set(ev.hexId, slot + 1);
        this.spawn({
          hex,
          vert,
          player,
          playerCount,
          resource: ev.resource,
          slot,
          delay: DICE_WAIT + i * STAGGER,
        });
        i += 1;
      }
    }
    return this.timeLeft();
  }

  timeLeft() {
    if (!this.flights.length) return 0;
    return Math.max(0, ...this.flights.map((f) => f.wait + FLIGHT - f.t));
  }

  spawn({ hex, vert, player, playerCount, resource, slot, delay }) {
    const from = spawnPoint(hex, vert, slot);
    const to = landPoint(player, playerCount);
    const mesh = makeChip(resource, player.color, this.letterMap(resource));
    mesh.position.copy(from);
    mesh.visible = false;
    this.group.add(mesh);
    this.flights.push({
      mesh,
      from,
      to,
      wait: delay,
      t: 0,
      spin: (slot % 2 ? 1 : -1) * (1.8 + slot * 0.15),
      arc: 0.16 + (slot % 3) * 0.03,
    });
  }

  letterMap(resource) {
    let tex = this.maps.get(resource);
    if (tex) return tex;
    tex = chipTexture(resource);
    this.maps.set(resource, tex);
    return tex;
  }

  update(dt, camera) {
    for (let i = this.flights.length - 1; i >= 0; i--) {
      const f = this.flights[i];
      f.wait -= dt;
      if (f.wait > 0) continue;
      f.t += dt;
      const u = Math.min(1, f.t / FLIGHT);
      const e = 1 - (1 - u) ** 3;
      f.mesh.visible = true;
      f.mesh.position.lerpVectors(f.from, f.to, e);
      f.mesh.position.y += Math.sin(u * Math.PI) * f.arc;
      const pop = u < 0.12 ? 0.7 + u * 2.5 : u > 0.82 ? 1 - (u - 0.82) * 2.2 : 1;
      f.mesh.scale.setScalar(Math.max(0.15, pop));
      f.mesh.rotation.z = u * f.spin;
      if (camera) f.mesh.lookAt(camera.position);
      const fade = u > 0.78 ? 1 - (u - 0.78) / 0.22 : 1;
      for (const mat of f.mesh.userData.fadeMats) mat.opacity = fade;
      if (u >= 1) {
        this.disposeFlight(f);
        this.flights.splice(i, 1);
      }
    }
  }

  disposeFlight(f) {
    this.group.remove(f.mesh);
    for (const mat of f.mesh.userData.fadeMats) mat.dispose();
  }

  clear() {
    for (const f of this.flights) this.disposeFlight(f);
    this.flights = [];
  }
}

function spawnPoint(hex, vert, slot) {
  const p = new THREE.Vector3(hex.x, TABLE_HEIGHT + TILE_TOP, hex.z);
  if (vert) {
    const dx = vert.x - hex.x;
    const dz = vert.z - hex.z;
    const len = Math.hypot(dx, dz) || 1;
    p.x += (dx / len) * 0.042;
    p.z += (dz / len) * 0.042;
    const px = -dz / len;
    const pz = dx / len;
    const spread = (slot - (slot > 0 ? 0.5 : 0)) * 0.028;
    p.x += px * spread;
    p.z += pz * spread;
  } else {
    const a = slot * 1.2;
    p.x += Math.cos(a) * 0.03;
    p.z += Math.sin(a) * 0.03;
  }
  return p;
}

function landPoint(player, count) {
  const ai = !!player.isAI;
  const pose = seatPose(player.id, count, ai ? 1.12 : 0.9);
  return new THREE.Vector3(pose.x, ai ? 0.74 : TABLE_HEIGHT + 0.11, pose.z);
}

function makeChip(resource, playerColor, map) {
  const g = new THREE.Group();
  const face = new THREE.Mesh(
    CHIP_GEO,
    new THREE.MeshBasicMaterial({
      map,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    }),
  );
  const rim = new THREE.Mesh(
    CHIP_RIM,
    new THREE.MeshBasicMaterial({
      color: playerColor,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    }),
  );
  face.renderOrder = 40;
  rim.renderOrder = 41;
  g.add(rim, face);
  g.frustumCulled = false;
  face.frustumCulled = false;
  rim.frustumCulled = false;
  g.userData.fadeMats = [face.material, rim.material];
  return g;
}

function chipTexture(resource) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.beginPath();
  ctx.arc(64, 64, 58, 0, Math.PI * 2);
  ctx.fillStyle = RESOURCE_COLOR[resource];
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#f3ead6';
  ctx.stroke();
  ctx.fillStyle = INK[resource] || '#2a1c12';
  ctx.font = '700 62px Trebuchet MS, Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(LETTER[resource] || '?', 64, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}
