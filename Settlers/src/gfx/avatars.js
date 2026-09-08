import * as THREE from 'three';
import { TABLE_HEIGHT } from '../game/constants.js';
import { labelTexture } from './textures.js';

const SEAT_R = 1.22;
const DICE_R = 0.95;

export function seatPose(index, count, radius = SEAT_R) {
  const a = (index / Math.max(1, count)) * Math.PI * 2;
  return { x: Math.sin(a) * radius, z: Math.cos(a) * radius, yaw: a };
}

export class PlayerAvatars {
  constructor(scene) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.figures = [];
    this.t = 0;
    this.currentId = null;
    this.stealIds = null;
    this.hoverId = null;
  }

  rebuild(players) {
    this.group.clear();
    this.figures = [];
    const n = players.length;
    players.forEach((p, i) => {
      if (!p.isAI) return;
      const seat = seatPose(i, n);
      const fig = makeSettler(p);
      fig.position.set(seat.x, 0, seat.z);
      fig.rotation.y = seat.yaw;
      this.group.add(fig);
      this.figures.push({ id: p.id, group: fig, glow: fig.userData.glow, hit: fig.userData.hit });
    });
    this.applyHighlights();
  }

  setCurrent(id) {
    this.currentId = id;
    if (!this.stealIds) this.applyHighlights();
  }

  setStealTargets(ids) {
    this.stealIds = ids?.length ? [...ids] : null;
    this.applyHighlights();
  }

  setHover(obj) {
    const id = obj?.userData?.kind === 'avatar' ? obj.userData.id : null;
    if (id === this.hoverId) return;
    this.hoverId = id;
    this.applyHighlights();
  }

  pickables() {
    if (!this.stealIds) return [];
    const set = new Set(this.stealIds);
    return this.figures.filter((f) => set.has(f.id)).map((f) => f.hit || f.group);
  }

  applyHighlights() {
    const steal = this.stealIds ? new Set(this.stealIds) : null;
    for (const f of this.figures) {
      const on = steal ? steal.has(f.id) : f.id === this.currentId;
      f.glow.visible = on;
      f.group.userData.active = on;
      const hot = steal && this.hoverId === f.id && on;
      f.glow.scale.setScalar(hot ? 1.55 : steal && on ? 1.28 : 1);
    }
  }

  update(dt, camera) {
    this.t += dt;
    const steal = Boolean(this.stealIds);
    for (const f of this.figures) {
      const bob = Math.sin(this.t * 1.6 + f.id) * 0.008;
      f.group.position.y = bob;
      if (f.group.userData.active) {
        const pulse = steal ? 0.55 + Math.sin(this.t * 5.5) * 0.28 : 0.35 + Math.sin(this.t * 4) * 0.12;
        f.glow.material.opacity = this.hoverId === f.id ? Math.min(1, pulse + 0.25) : pulse;
      }
      if (camera) f.group.userData.tag.lookAt(camera.position);
    }
  }
}

function makeSettler(player) {
  const g = new THREE.Group();
  const cloth = new THREE.MeshStandardMaterial({ color: player.color, roughness: 0.7 });
  const skin = new THREE.MeshStandardMaterial({ color: '#e0b089', roughness: 0.65 });
  const dark = new THREE.MeshStandardMaterial({ color: '#3b2418', roughness: 0.85 });
  const wood = new THREE.MeshStandardMaterial({ color: '#6a4024', roughness: 0.8 });

  const chair = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.24), wood);
  chair.position.y = 0.4;
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 0.05), wood);
  back.position.set(0, 0.58, 0.11);
  const leg = (x, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.4, 0.04), wood);
    m.position.set(x, 0.2, z);
    return m;
  };

  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.16), cloth);
  hips.position.y = 0.48;
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.26, 0.12), cloth);
  torso.position.set(0, 0.68, -0.01);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.072, 16, 12), skin);
  head.position.set(0, 0.9, 0);
  const eye = (side) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), dark);
    m.position.set(side * 0.025, 0.91, -0.058);
    return m;
  };
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.076, 12, 10),
    new THREE.MeshStandardMaterial({ color: darken(player.color, 0.45), roughness: 0.9 }),
  );
  hair.scale.set(1, 0.55, 1);
  hair.position.set(0, 0.94, 0);

  const arm = (side) => {
    const a = new THREE.Group();
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.05), cloth);
    upper.position.set(side * 0.12, 0.7, 0);
    upper.rotation.z = side * 0.35;
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), skin);
    hand.position.set(side * 0.16, 0.58, -0.08);
    a.add(upper, hand);
    return a;
  };

  const glow = new THREE.Mesh(
    new THREE.RingGeometry(0.16, 0.22, 24),
    new THREE.MeshBasicMaterial({ color: player.color, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.02;
  glow.visible = false;

  const tag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.22, 0.06),
    new THREE.MeshBasicMaterial({
      map: labelTexture(player.name, { width: 512, height: 192, font: 110, fill: '#1a120c', ink: '#f7efe0' }),
      transparent: true,
    }),
  );
  tag.position.set(0, 1.08, 0);

  const hit = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 1.12, 12),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  );
  hit.position.y = 0.56;

  g.add(chair, back, leg(-0.08, 0.08), leg(0.08, 0.08), leg(-0.08, -0.08), leg(0.08, -0.08));
  g.add(hips, torso, head, hair, eye(-1), eye(1), arm(-1), arm(1), glow, tag, hit);
  const data = { glow, tag, hit, active: false, kind: 'avatar', id: player.id };
  g.userData = data;
  g.traverse((o) => {
    o.userData = { ...o.userData, kind: 'avatar', id: player.id };
    if (o.isMesh) o.castShadow = true;
  });
  glow.castShadow = false;
  tag.castShadow = false;
  hit.castShadow = false;
  return g;
}

function darken(hex, amt) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, -amt);
  return `#${c.getHexString()}`;
}

export function diceSpot(index, count) {
  return seatPose(index, count, DICE_R);
}
