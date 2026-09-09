import * as THREE from 'three';
import { labelTexture } from './textures.js';
import { QUALITY } from './quality.js';

const LIFE = 1.7;
const LIFT = 0.055;
const RISE = 0.07;
const MAX_ALIVE = 6;
const TEX_OPTS = { width: QUALITY.floatW, height: QUALITY.floatH, font: QUALITY.headset ? 64 : 92, pad: 24, fill: '#1a120c', ink: '#ffe08a' };

export class FloatLabels {
  constructor(parent) {
    this.group = new THREE.Group();
    parent.add(this.group);
    this.items = [];
    this._cam = new THREE.Vector3();
  }

  spawn(text, worldPos) {
    const line = String(text || '').trim();
    if (!line || !worldPos) return;
    if (this.items.length >= MAX_ALIVE) this.disposeItem(this.items.shift());

    const tex = labelTexture(line, TEX_OPTS);
    const w = Math.min(0.46, 0.11 + line.length * 0.011);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, w * 0.25),
      new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
        side: THREE.DoubleSide,
      }),
    );
    mesh.renderOrder = 50;
    mesh.frustumCulled = false;
    this.group.updateMatrixWorld(true);
    const local = worldPos.clone();
    this.group.worldToLocal(local);
    local.y += LIFT;
    mesh.position.copy(local);
    mesh.scale.setScalar(0.72);
    this.group.add(mesh);
    this.items.push({ mesh, tex, t: 0, y0: local.y });
  }

  update(dt, camera) {
    if (!this.items.length) return;
    if (camera) camera.getWorldPosition(this._cam);
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.t += dt;
      const u = Math.min(1, item.t / LIFE);
      const fadeIn = Math.min(1, u / 0.12);
      const fadeOut = u > 0.58 ? 1 - (u - 0.58) / 0.42 : 1;
      item.mesh.material.opacity = Math.max(0, fadeIn * fadeOut);
      item.mesh.position.y = item.y0 + RISE * (1 - (1 - u) ** 2);
      const pop = u < 0.14 ? 0.72 + u * 2.1 : 1;
      item.mesh.scale.setScalar(pop);
      if (camera) item.mesh.lookAt(this._cam);
      if (u >= 1) {
        this.disposeItem(item);
        this.items.splice(i, 1);
      }
    }
  }

  disposeItem(item) {
    this.group.remove(item.mesh);
    item.mesh.geometry.dispose();
    item.mesh.material.dispose();
    item.tex.dispose();
  }

  clear() {
    for (const item of this.items) this.disposeItem(item);
    this.items = [];
  }
}
