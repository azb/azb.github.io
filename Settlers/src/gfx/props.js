import * as THREE from 'three';
import { TABLE_HEIGHT } from '../game/constants.js';
import { dieFace, labelTexture } from './textures.js';

const _handlePos = new THREE.Vector3();

export class BoardHandles {
  constructor(scene, rig) {
    this.rig = rig;
    this.group = new THREE.Group();
    scene.add(this.group);
    this.move = makeOrb('#4db3ff', 'MOVE');
    this.scale = makeOrb('#f0c14b', 'SIZE');
    this.group.add(this.move, this.scale);
    this.group.visible = false;
    this._pulse = 0;
  }

  pickables() {
    return this.group.visible ? [this.move, this.scale] : [];
  }

  setVisible(on) {
    this.group.visible = on;
  }

  setHover(obj) {
    const root = obj?.userData?.handleRoot;
    this.move.scale.setScalar(root === this.move ? 1.28 : 1);
    this.scale.scale.setScalar(root === this.scale ? 1.28 : 1);
  }

  update(dt, camera) {
    if (!this.group.visible) return;
    this._pulse += dt;
    const glow = 0.6 + Math.sin(this._pulse * 3.2) * 0.22;
    this.move.userData.ball.material.opacity = glow;
    this.scale.userData.ball.material.opacity = glow;
    this.rig.updateMatrixWorld();
    placeHandle(this.move, this.rig, -0.2, TABLE_HEIGHT + 0.16, 0.4);
    placeHandle(this.scale, this.rig, 0.2, TABLE_HEIGHT + 0.16, 0.4);
    this.move.lookAt(camera.position);
    this.scale.lookAt(camera.position);
  }
}

function placeHandle(mesh, rig, x, y, z) {
  _handlePos.set(x, y, z).applyMatrix4(rig.matrixWorld);
  mesh.position.copy(_handlePos);
}

function makeOrb(color, label) {
  const g = new THREE.Group();
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 20, 16),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88 }),
  );
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.046, 16, 12),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22, depthWrite: false }),
  );
  const tag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.11, 0.04),
    new THREE.MeshBasicMaterial({
      map: labelTexture(label, { width: 512, height: 256, font: 120, fill: '#1a120c', ink: '#f7efe0' }),
      transparent: true,
    }),
  );
  tag.position.y = 0.058;
  const hit = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 12, 10),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  );
  g.add(ball, halo, tag, hit);
  const data = { kind: 'handle', action: label === 'MOVE' ? 'move' : 'scale', handleRoot: g, ball };
  g.userData = data;
  g.traverse((o) => {
    if (o.isMesh) o.userData = data;
  });
  return g;
}

export class DicePair {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.position.set(0.42, TABLE_HEIGHT + 0.04, 0.42);
    scene.add(this.group);
    this.dice = [makeDie(), makeDie()];
    this.dice[0].position.x = -0.04;
    this.dice[1].position.x = 0.04;
    this.group.add(...this.dice);
    this.t = 0;
    this.rolling = false;
    this.target = [1, 1];
  }

  rollTo(values) {
    this.target = values;
    this.rolling = true;
    this.t = 0;
  }

  update(dt) {
    if (!this.rolling) return;
    this.t += dt;
    const spin = 18;
    for (const d of this.dice) {
      d.rotation.x += dt * spin;
      d.rotation.y += dt * spin * 0.7;
    }
    if (this.t > 0.7) {
      this.rolling = false;
      this.dice[0].rotation.set(...faceRot(this.target[0]));
      this.dice[1].rotation.set(...faceRot(this.target[1]));
    }
  }
}

function makeDie() {
  const mats = [1, 6, 2, 5, 3, 4].map(
    (n) => new THREE.MeshStandardMaterial({ map: dieFace(n), roughness: 0.4 }),
  );
  const m = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.038, 0.038), mats);
  m.castShadow = true;
  return m;
}

function faceRot(n) {
  switch (n) {
    case 1:
      return [0, 0, 0];
    case 6:
      return [Math.PI, 0, 0];
    case 2:
      return [0, 0, Math.PI / 2];
    case 5:
      return [0, 0, -Math.PI / 2];
    case 3:
      return [0, -Math.PI / 2, 0];
    case 4:
      return [0, Math.PI / 2, 0];
    default:
      return [0, 0, 0];
  }
}

export class Tray {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.position.set(0, TABLE_HEIGHT + 0.03, 0.52);
    this.group.rotation.x = -0.55;
    scene.add(this.group);
    this.buttons = [];
    this.handButtons = [];
    this.status = makeStatus();
    this.status.mesh.position.set(0, 0.12, 0);
    this.group.add(this.status.mesh);
  }

  attachHandButton(parent) {
    const mesh = makeButtonMesh('END TURN', { width: 0.14, height: 0.04, depth: 0.05, font: 140, fill: '#3d8f4a', ink: '#f7fff4' });
    mesh.position.set(0, 0.07, -0.16);
    mesh.rotation.x = -0.55;
    mesh.userData = { kind: 'tray', action: 'end', disabled: true };
    parent.add(mesh);
    this.handButtons.push(mesh);
    return mesh;
  }

  setButtons(defs) {
    for (const b of this.buttons) this.group.remove(b.mesh);
    this.buttons = [];
    const regular = defs.filter((d) => d.action !== 'end');
    const end = defs.find((d) => d.action === 'end');
    regular.forEach((def, i) => {
      const mesh = makeButtonMesh(def.label, {
        width: 0.13,
        height: 0.035,
        depth: 0.07,
        font: 150,
        fill: def.disabled ? '#8a7a64' : '#f3e2c4',
      });
      const col = i % 3;
      const row = Math.floor(i / 3);
      mesh.position.set((col - 1) * 0.15, 0.03 - row * 0.08, 0);
      mesh.userData = { kind: 'tray', action: def.action, disabled: !!def.disabled };
      this.group.add(mesh);
      this.buttons.push({ mesh, def });
    });
    if (end) {
      const mesh = makeButtonMesh('END TURN', {
        width: 0.4,
        height: 0.045,
        depth: 0.085,
        font: 150,
        fill: end.disabled ? '#5a6a55' : '#2f8a3c',
        ink: '#f7fff4',
      });
      mesh.position.set(0, -0.14, 0);
      mesh.userData = { kind: 'tray', action: 'end', disabled: !!end.disabled };
      this.group.add(mesh);
      this.buttons.push({ mesh, def: end });
      for (const hand of this.handButtons) {
        hand.userData.disabled = !!end.disabled;
        hand.material.map?.dispose();
        hand.material.map = labelTexture('END TURN', {
          width: 1024,
          height: 512,
          font: 150,
          fill: end.disabled ? '#5a6a55' : '#2f8a3c',
          ink: '#f7fff4',
        });
        hand.material.needsUpdate = true;
      }
    }
  }

  setHover(mesh) {
    const all = [...this.buttons.map((b) => b.mesh), ...this.handButtons];
    for (const m of all) m.scale.setScalar(m === mesh && !m.userData.disabled ? 1.12 : 1);
  }

  pickables() {
    return [...this.buttons.map((b) => b.mesh), ...this.handButtons];
  }

  setStatus(text) {
    this.status.set(text);
  }
}

function makeButtonMesh(label, { width, height, depth, font, fill, ink = '#2a1c12' }) {
  return new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshBasicMaterial({
      map: labelTexture(label, { width: 1024, height: 512, font, fill, ink }),
    }),
  );
}

function makeStatus() {
  const opts = { width: 1024, height: 256, font: 72, fill: '#2a1c12', ink: '#f3e2c4' };
  let tex = labelTexture(' ', opts);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.08),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true }),
  );
  return {
    mesh,
    set(text) {
      tex.dispose();
      tex = labelTexture(text, opts);
      mesh.material.map = tex;
      mesh.material.needsUpdate = true;
    },
  };
}
