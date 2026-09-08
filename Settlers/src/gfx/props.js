import * as THREE from 'three';
import { TABLE_HEIGHT } from '../game/constants.js';
import { dieFace, labelTexture } from './textures.js';

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
    this.group.position.set(0, TABLE_HEIGHT + 0.02, 0.72);
    this.group.rotation.x = -0.35;
    scene.add(this.group);
    this.buttons = [];
    this.status = makeStatus();
    this.status.mesh.position.set(0, 0.09, 0);
    this.group.add(this.status.mesh);
  }

  setButtons(defs) {
    for (const b of this.buttons) this.group.remove(b.mesh);
    this.buttons = [];
    const n = defs.length;
    defs.forEach((def, i) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.11, 0.03, 0.06),
        new THREE.MeshBasicMaterial({
          map: labelTexture(def.label, {
            width: 1024,
            height: 512,
            font: 160,
            fill: def.disabled ? '#b9a88c' : '#f3e2c4',
          }),
        }),
      );
      const col = i % 4;
      const row = Math.floor(i / 4);
      mesh.position.set((col - (Math.min(4, n) - 1) / 2) * 0.125, 0.02 - row * 0.07, 0);
      mesh.userData = { kind: 'tray', action: def.action, disabled: !!def.disabled };
      this.group.add(mesh);
      this.buttons.push({ mesh, def });
    });
  }

  setStatus(text) {
    this.status.set(text);
  }
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
