import * as THREE from 'three';
import { TABLE_HEIGHT, RESOURCES, RESOURCE_LABEL, RESOURCE_COLOR } from '../game/constants.js';
import { dieFace, labelTexture } from './textures.js';

const _handlePos = new THREE.Vector3();

export class BoardHandles {
  constructor(scene, rig) {
    this.rig = rig;
    this.group = new THREE.Group();
    scene.add(this.group);
    this.left = makeOrb('#4db3ff', 'GRAB');
    this.right = makeOrb('#f0c14b', 'GRAB');
    this.stuck = new Map();
    this.linkGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, 1)]);
    this.link = new THREE.Line(this.linkGeo, new THREE.LineBasicMaterial({ color: 0xffe6b0, transparent: true, opacity: 0.7 }));
    this.link.visible = false;
    this.group.add(this.left, this.right, this.link);
    this.group.visible = false;
    this._pulse = 0;
  }

  get move() {
    return this.left;
  }

  get scale() {
    return this.right;
  }

  pickables() {
    return this.group.visible ? [this.left, this.right] : [];
  }

  setVisible(on) {
    this.group.visible = on;
    if (!on) this.stuck.clear();
  }

  stick(handle, source) {
    this.stuck.set(handle, source);
  }

  unstick(handle) {
    this.stuck.delete(handle);
  }

  isStuck(handle) {
    return this.stuck.has(handle);
  }

  setHover(obj) {
    const root = obj?.userData?.handleRoot;
    for (const h of [this.left, this.right]) {
      const hot = root === h || this.stuck.has(h);
      h.userData.halo.material.opacity = hot ? 0.5 : 0.2;
      h.userData.ball.material.color.set(hot ? '#ffffff' : h.userData.baseColor);
    }
  }

  update(dt, camera, sourcePos) {
    if (!this.group.visible) return;
    this._pulse += dt;
    const glow = 0.72 + Math.sin(this._pulse * 2.4) * 0.1;
    this.left.userData.ball.material.opacity = glow;
    this.right.userData.ball.material.opacity = glow;
    this.rig.updateMatrixWorld();
    for (const [handle, local] of [
      [this.left, [-0.18, TABLE_HEIGHT - 0.05, 1.08]],
      [this.right, [0.18, TABLE_HEIGHT - 0.05, 1.08]],
    ]) {
      const src = this.stuck.get(handle);
      if (src && sourcePos) sourcePos(src, handle.position);
      else if (src) src.getWorldPosition(handle.position);
      else placeHandle(handle, this.rig, local[0], local[1], local[2]);
      handle.userData.tag.lookAt(camera.position);
    }
    if (this.stuck.size === 2) {
      const pts = this.linkGeo.attributes.position;
      pts.setXYZ(0, this.left.position.x, this.left.position.y, this.left.position.z);
      pts.setXYZ(1, this.right.position.x, this.right.position.y, this.right.position.z);
      pts.needsUpdate = true;
      this.link.visible = true;
    } else {
      this.link.visible = false;
    }
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
    new THREE.SphereGeometry(0.09, 12, 10),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  );
  g.add(ball, halo, tag, hit);
  const data = { kind: 'handle', handleRoot: g, ball, halo, tag, baseColor: color };
  g.userData = data;
  g.traverse((o) => {
    if (o.isMesh) o.userData = data;
  });
  return g;
}

export class DicePair {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.position.set(0, TABLE_HEIGHT + 0.045, 0.95);
    scene.add(this.group);
    this.dice = [makeDie(), makeDie()];
    this.dice[0].position.x = -0.04;
    this.dice[1].position.x = 0.04;
    this.group.add(...this.dice);
    this.t = 0;
    this.rolling = false;
    this.target = [1, 1];
  }

  placeFor(index, count) {
    if (index === 0) {
      this.group.position.set(0, TABLE_HEIGHT + 0.045, 0.95);
      this.group.rotation.y = 0;
      return;
    }
    const a = (index / Math.max(1, count)) * Math.PI * 2;
    const r = 0.95;
    this.group.position.set(Math.sin(a) * r, TABLE_HEIGHT + 0.045, Math.cos(a) * r);
    this.group.rotation.y = a;
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

const PANEL_W = 0.82;
const PANEL_H = 0.5;
const TEX_W = 1024;
const TEX_H = 624;

export class Tray {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.position.set(0, TABLE_HEIGHT + 0.78, -0.95);
    this.group.rotation.x = -0.12;
    scene.add(this.group);

    this.canvas = document.createElement('canvas');
    this.canvas.width = TEX_W;
    this.canvas.height = TEX_H;
    this.ctx = this.canvas.getContext('2d');
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.tex.minFilter = THREE.LinearFilter;
    this.tex.magFilter = THREE.LinearFilter;
    this.tex.generateMipmaps = false;

    const frame = new THREE.Mesh(
      new THREE.PlaneGeometry(PANEL_W + 0.028, PANEL_H + 0.028),
      new THREE.MeshBasicMaterial({ color: 0xc9a44a, toneMapped: false }),
    );
    frame.position.z = -0.003;
    this.panel = new THREE.Mesh(
      new THREE.PlaneGeometry(PANEL_W, PANEL_H),
      new THREE.MeshBasicMaterial({ map: this.tex, toneMapped: false }),
    );
    this.hits = new THREE.Group();
    this.hitMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.group.add(frame, this.panel, this.hits);

    this.buttons = [];
    this.buttonDefs = [];
    this.screen = 'actions';
    this.hand = Object.fromEntries(RESOURCES.map((r) => [r, 0]));
    this.status = '';
    this.hoverAction = null;
    this.draw();
  }

  pxToLocal(px, py, pw, ph) {
    const x = ((px + pw / 2) / TEX_W - 0.5) * PANEL_W;
    const y = (0.5 - (py + ph / 2) / TEX_H) * PANEL_H;
    return {
      x,
      y,
      w: (pw / TEX_W) * PANEL_W,
      h: (ph / TEX_H) * PANEL_H,
    };
  }

  buttonLayout(defs) {
    const pad = 36;
    const inner = TEX_W - pad * 2;
    const gap = 16;
    if (this.screen === 'settings') {
      const bh = 128;
      const by0 = 112;
      return defs.map((def, i) => ({
        def,
        px: pad,
        py: by0 + i * (bh + 22),
        pw: inner,
        ph: bh,
      }));
    }
    const regular = defs.filter((d) => d.action !== 'end' && d.action !== 'settings');
    const end = defs.find((d) => d.action === 'end');
    const settings = defs.find((d) => d.action === 'settings');
    const cols = 3;
    const bw = (inner - gap * (cols - 1)) / cols;
    const bh = 88;
    const by0 = 248;
    const layout = [];
    regular.forEach((def, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      layout.push({
        def,
        px: pad + col * (bw + gap),
        py: by0 + row * (bh + gap),
        pw: bw,
        ph: bh,
      });
    });
    const rowY = by0 + 2 * (bh + gap) + 8;
    if (end && settings) {
      const sw = 280;
      layout.push({ def: end, px: pad, py: rowY, pw: inner - gap - sw, ph: 92 });
      layout.push({ def: settings, px: pad + inner - sw, py: rowY, pw: sw, ph: 92 });
    } else if (end) {
      layout.push({ def: end, px: pad, py: rowY, pw: inner, ph: 92 });
    } else if (settings) {
      layout.push({ def: settings, px: pad, py: rowY, pw: inner, ph: 92 });
    }
    return layout;
  }

  setButtons(defs, screen = 'actions') {
    this.screen = screen;
    this.buttonDefs = defs;
    for (const child of [...this.hits.children]) {
      child.geometry.dispose();
      this.hits.remove(child);
    }
    this.buttons = [];
    for (const slot of this.buttonLayout(defs)) {
      const loc = this.pxToLocal(slot.px, slot.py, slot.pw, slot.ph);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(loc.w, loc.h), this.hitMat);
      mesh.position.set(loc.x, loc.y, 0.004);
      mesh.userData = { kind: 'tray', action: slot.def.action, disabled: !!slot.def.disabled };
      this.hits.add(mesh);
      this.buttons.push({ mesh, def: slot.def });
    }
    this.draw();
  }

  setHover(mesh) {
    const action = mesh?.userData?.kind === 'tray' ? mesh.userData.action : null;
    if (action === this.hoverAction) return;
    this.hoverAction = action;
    this.draw();
  }

  pickables() {
    return this.buttons.map((b) => b.mesh);
  }

  setStatus(text) {
    const line = String(text || '');
    if (line === this.status) return;
    this.status = line;
    this.draw();
  }

  setResources(hand) {
    this.hand = { ...hand };
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const w = TEX_W;
    const h = TEX_H;
    ctx.clearRect(0, 0, w, h);
    roundRect(ctx, 0, 0, w, h, 36, '#1a120c');
    ctx.fillStyle = '#f3e2c4';
    ctx.font = '700 28px Trebuchet MS, Segoe UI, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.screen === 'settings' ? 'Settings' : 'Actions', 36, 40);

    if (this.screen !== 'settings') {
      const status = this.status.replace(/\n/g, ' · ') || 'Sit down to begin';
      roundRect(ctx, 36, 64, w - 72, 72, 16, '#2a1c12');
      ctx.fillStyle = '#ffe08a';
      ctx.font = '700 32px Trebuchet MS, Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      fitText(ctx, status, w / 2, 100, w - 120, 32);

      const pad = 36;
      const inner = w - pad * 2;
      const gap = 14;
      const cw = (inner - gap * 4) / 5;
      ctx.textAlign = 'center';
      RESOURCES.forEach((r, i) => {
        const x = pad + i * (cw + gap);
        const dark = r === 'wood' || r === 'brick' || r === 'ore';
        roundRect(ctx, x, 152, cw, 80, 14, RESOURCE_COLOR[r]);
        ctx.fillStyle = dark ? '#f7efe0' : '#1a120c';
        ctx.font = '700 34px Trebuchet MS, Segoe UI, sans-serif';
        ctx.fillText(String(this.hand[r] ?? 0), x + cw / 2, 178);
        ctx.font = '700 20px Trebuchet MS, Segoe UI, sans-serif';
        ctx.fillText(RESOURCE_LABEL[r], x + cw / 2, 210);
      });
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const slot of this.buttonLayout(this.buttonDefs)) {
      const hot = this.hoverAction === slot.def.action && !slot.def.disabled;
      const end = slot.def.action === 'end';
      const settings = slot.def.action === 'settings';
      const back = slot.def.action === 'settingsBack';
      const toggle = slot.def.action === 'passthrough' || slot.def.action === 'handles';
      let fill = '#f3e2c4';
      let ink = '#2a1c12';
      if (slot.def.disabled) {
        fill = '#5c5348';
        ink = '#d0c4b2';
      } else if (end) {
        fill = hot ? '#3aaa4c' : '#2f8a3c';
        ink = '#f7fff4';
      } else if (toggle && slot.def.on) {
        fill = hot ? '#3aaa4c' : '#2f8a3c';
        ink = '#f7fff4';
      } else if (toggle) {
        fill = hot ? '#6a5c4c' : '#5c5348';
        ink = '#f3e2c4';
      } else if (settings) {
        fill = hot ? '#e8d4a8' : '#c9a44a';
      } else if (hot) {
        fill = '#fff6e0';
      }
      roundRect(ctx, slot.px, slot.py, slot.pw, slot.ph, 18, fill);
      if (hot) {
        ctx.strokeStyle = '#c9a44a';
        ctx.lineWidth = 6;
        ctx.stroke();
      }
      ctx.fillStyle = ink;
      const big = end || back || toggle;
      ctx.font = big ? '700 40px Trebuchet MS, Segoe UI, sans-serif' : '700 34px Trebuchet MS, Segoe UI, sans-serif';
      ctx.fillText(slot.def.label, slot.px + slot.pw / 2, slot.py + slot.ph / 2);
    }

    this.tex.needsUpdate = true;
  }
}

function roundRect(ctx, x, y, w, h, r, fill) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function fitText(ctx, text, x, y, maxW, font) {
  let size = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  while (size > 18) {
    ctx.font = `700 ${size}px Trebuchet MS, Segoe UI, sans-serif`;
    if (ctx.measureText(text).width <= maxW) break;
    size -= 2;
  }
  ctx.fillText(text, x, y);
}

export class HelpBanner {
  constructor(camera) {
    this.opts = { width: 1024, height: 256, font: 72, pad: 28, fill: '#1a120c', ink: '#ffe08a' };
    this.tex = labelTexture(' ', this.opts);
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.065),
      new THREE.MeshBasicMaterial({
        map: this.tex,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        toneMapped: false,
      }),
    );
    this.mesh.position.set(0, -0.22, -0.52);
    this.mesh.renderOrder = 20;
    this.mesh.frustumCulled = false;
    this.mesh.visible = false;
    camera.add(this.mesh);
  }

  attach(parent) {
    if (!parent || this.mesh.parent === parent) return;
    parent.add(this.mesh);
  }

  set(text) {
    const line = String(text || '').trim();
    this.mesh.visible = Boolean(line);
    if (!line) return;
    this.tex.dispose();
    this.tex = labelTexture(line, this.opts);
    this.mesh.material.map = this.tex;
    this.mesh.material.needsUpdate = true;
  }
}
