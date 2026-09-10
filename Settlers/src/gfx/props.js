import * as THREE from 'three';
import { TABLE_HEIGHT, RESOURCES, RESOURCE_LABEL, RESOURCE_COLOR } from '../game/constants.js';
import { dieFace, labelTexture, rewriteLabelTexture } from './textures.js';
import { QUALITY } from './quality.js';

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
    new THREE.SphereGeometry(0.03, 12, 10),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88 }),
  );
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.046, 10, 8),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22, depthWrite: false }),
  );
  const tag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.11, 0.04),
    new THREE.MeshBasicMaterial({
      map: labelTexture(label, { width: QUALITY.handleLabelW, height: QUALITY.handleLabelH, font: 120, fill: '#1a120c', ink: '#f7efe0' }),
      transparent: true,
    }),
  );
  tag.position.y = 0.058;
  const hit = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 8, 6),
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

const DICE_R = 0.82;

export class DicePair {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.position.set(0, TABLE_HEIGHT + 0.045, DICE_R);
    scene.add(this.group);
    this.dice = [makeDie(), makeDie()];
    this.dice[0].position.x = -0.04;
    this.dice[1].position.x = 0.04;
    this.group.add(...this.dice);
    this.t = 0;
    this.rolling = false;
    this.target = [1, 1];
    this.hovered = false;
  }

  pickables() {
    return this.dice;
  }

  setHover(obj) {
    const hot = obj?.userData?.kind === 'dice';
    if (hot === this.hovered) return;
    this.hovered = hot;
    for (const d of this.dice) {
      d.scale.setScalar(hot ? 1.18 : 1);
      const mats = Array.isArray(d.material) ? d.material : [d.material];
      for (const mat of mats) {
        if (!mat?.emissive) continue;
        mat.emissive.set(hot ? '#ffe08a' : '#000000');
        mat.emissiveIntensity = hot ? 0.45 : 0;
      }
    }
  }

  placeFor(index, count) {
    if (index === 0) {
      this.group.position.set(0, TABLE_HEIGHT + 0.045, DICE_R);
      this.group.rotation.y = 0;
      return;
    }
    const a = (index / Math.max(1, count)) * Math.PI * 2;
    const r = DICE_R;
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
  m.userData = { kind: 'dice', action: 'roll' };
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
const LAYOUT_W = 1024;
const LAYOUT_H = 624;

export class Tray {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.position.set(0, TABLE_HEIGHT + 0.78, -0.95);
    this.group.rotation.x = -0.12;
    scene.add(this.group);

    this.canvas = document.createElement('canvas');
    this.texScale = QUALITY.trayScale;
    this.canvas.width = Math.round(LAYOUT_W * this.texScale);
    this.canvas.height = Math.round(LAYOUT_H * this.texScale);
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
    this.headline = '';
    this.headlineColor = '';
    this.scoreRows = [];
    this._scoreKey = '';
    this.hoverAction = null;
    this.pressAction = null;
    this._pressTimer = 0;
    this.draw();
  }

  pxToLocal(px, py, pw, ph) {
    const x = ((px + pw / 2) / LAYOUT_W - 0.5) * PANEL_W;
    const y = (0.5 - (py + ph / 2) / LAYOUT_H) * PANEL_H;
    return {
      x,
      y,
      w: (pw / LAYOUT_W) * PANEL_W,
      h: (ph / LAYOUT_H) * PANEL_H,
    };
  }

  buttonLayout(defs) {
    const pad = 36;
    const inner = LAYOUT_W - pad * 2;
    const gap = 16;
    const stack = this.screen === 'settings' || this.screen === 'pointerTilt' || this.screen === 'restartConfirm'
      || this.screen === 'steal' || this.screen === 'win' || this.screen === 'cards' || this.screen === 'title'
      || this.screen === 'scores';
    if (stack) {
      const n = Math.max(defs.length, 1);
      const settings = this.screen === 'settings' || this.screen === 'pointerTilt';
      const win = this.screen === 'win';
      const scores = this.screen === 'scores';
      const by0 = settings ? 84 : win ? 268 : scores ? 488 : 160;
      const bottom = LAYOUT_H - 24;
      const stackGap = this.screen === 'steal' ? 18 : win ? 20 : settings ? 10 : 14;
      const cap = this.screen === 'steal' ? 110 : win ? 124 : settings ? 82 : 104;
      const bh = Math.min(cap, Math.max(52, Math.floor((bottom - by0 - (n - 1) * stackGap) / n)));
      const layout = defs.map((def, i) => ({
        def,
        px: pad,
        py: by0 + i * (bh + stackGap),
        pw: inner,
        ph: bh,
      }));
      return this.withScoreStrip(layout);
    }
    if (this.screen === 'trade' || this.screen === 'discard' || this.screen === 'plenty' || this.screen === 'monopoly') {
      const give = defs.filter((d) => String(d.action).startsWith('give:'));
      const get = defs.filter((d) => String(d.action).startsWith('get:'));
      const res = defs.filter((d) => /^(discard|plenty|mono):/.test(String(d.action)));
      const extra = defs.filter((d) => {
        const a = String(d.action);
        return !a.startsWith('give:') && !a.startsWith('get:') && !/^(discard|plenty|mono):/.test(a);
      });
      const layout = [];
      const row = (list, y, h) => {
        if (!list.length) return;
        const n = list.length;
        const bw = (inner - gap * (n - 1)) / n;
        list.forEach((def, i) => {
          layout.push({ def, px: pad + i * (bw + gap), py: y, pw: bw, ph: h });
        });
      };
      if (this.screen === 'trade') {
        row(give, 262, 68);
        row(get, 360, 68);
        row(extra, 450, 84);
      } else {
        const bh = this.screen === 'discard' ? 90 : 110;
        row(res, 248, bh);
        row(extra, 248 + bh + 20, 88);
      }
      return this.withScoreStrip(layout);
    }
    const regular = defs.filter((d) => d.action !== 'end' && d.action !== 'settings' && d.action !== 'scores');
    const end = defs.find((d) => d.action === 'end');
    const settings = defs.find((d) => d.action === 'settings');
    const scores = defs.find((d) => d.action === 'scores');
    const cols = 3;
    const bw = (inner - gap * (cols - 1)) / cols;
    const bh = 96;
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
    if (end && settings && scores) {
      const side = 176;
      const endW = inner - gap * 2 - side * 2;
      layout.push({ def: end, px: pad, py: rowY, pw: endW, ph: 92 });
      layout.push({ def: scores, px: pad + endW + gap, py: rowY, pw: side, ph: 92 });
      layout.push({ def: settings, px: pad + endW + gap + side + gap, py: rowY, pw: side, ph: 92 });
    } else if (end && settings) {
      const sw = 280;
      layout.push({ def: end, px: pad, py: rowY, pw: inner - gap - sw, ph: 92 });
      layout.push({ def: settings, px: pad + inner - sw, py: rowY, pw: sw, ph: 92 });
    } else if (end) {
      layout.push({ def: end, px: pad, py: rowY, pw: inner, ph: 92 });
    } else if (settings) {
      layout.push({ def: settings, px: pad, py: rowY, pw: inner, ph: 92 });
    }
    return this.withScoreStrip(layout);
  }

  scoreStripSlot() {
    if (!this.scoreRows?.length) return null;
    if (this.screen === 'scores' || this.screen === 'win' || this.screen === 'title'
      || this.screen === 'settings' || this.screen === 'pointerTilt' || this.screen === 'restartConfirm') {
      return null;
    }
    return {
      def: { label: 'Scores', action: 'scores', strip: true },
      px: 300,
      py: 8,
      pw: LAYOUT_W - 336,
      ph: 56,
    };
  }

  withScoreStrip(layout) {
    const strip = this.scoreStripSlot();
    if (strip) layout.push(strip);
    return layout;
  }

  setButtons(defs, screen = 'actions') {
    this.screen = screen;
    this.buttonDefs = defs;
    const layout = this.buttonLayout(defs);
    while (this.hits.children.length > layout.length) {
      const child = this.hits.children[this.hits.children.length - 1];
      child.geometry.dispose();
      this.hits.remove(child);
    }
    this.buttons = [];
    for (let i = 0; i < layout.length; i++) {
      const slot = layout[i];
      const loc = this.pxToLocal(slot.px, slot.py, slot.pw, slot.ph);
      let mesh = this.hits.children[i];
      if (!mesh) {
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(loc.w, loc.h), this.hitMat);
        this.hits.add(mesh);
      } else {
        const geo = mesh.geometry;
        const same = Math.abs(geo.parameters.width - loc.w) < 1e-6 && Math.abs(geo.parameters.height - loc.h) < 1e-6;
        if (!same) {
          geo.dispose();
          mesh.geometry = new THREE.PlaneGeometry(loc.w, loc.h);
        }
      }
      mesh.position.set(loc.x, loc.y, 0.004);
      mesh.userData = { kind: 'tray', action: slot.def.action, disabled: !!slot.def.disabled };
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

  setPressed(action) {
    const next = action || null;
    if (next === this.pressAction) return;
    this.pressAction = next;
    this.draw();
  }

  flashPress(action) {
    if (!action) return;
    clearTimeout(this._pressTimer);
    this.pressAction = action;
    this.draw();
    this._pressTimer = setTimeout(() => {
      if (this.pressAction === action) {
        this.pressAction = null;
        this.draw();
      }
    }, 140);
  }

  pickables() {
    return this.buttons.map((b) => b.mesh);
  }

  buttonWorldPos(action, target) {
    const hit = this.buttons.find((b) => b.def.action === action);
    const obj = hit?.mesh || this.panel;
    return obj.getWorldPosition(target);
  }

  /** World pos under the action row so steal floats don't cover tray buttons. */
  stealFloatWorldPos(target) {
    this.group.updateMatrixWorld(true);
    target.set(0, -(PANEL_H * 0.5 + 0.22), 0.02);
    return this.group.localToWorld(target);
  }

  setStatus(text) {
    const line = String(text || '');
    if (line === this.status) return;
    this.status = line;
    this.draw();
  }

  setHeadline(text, color) {
    const line = String(text || '');
    const tint = String(color || '');
    if (line === this.headline && tint === this.headlineColor) return;
    this.headline = line;
    this.headlineColor = tint;
    this.draw();
  }

  setResources(hand) {
    this.hand = { ...hand };
    this.draw();
  }

  setScores(rows) {
    const next = Array.isArray(rows) ? rows : [];
    const key = JSON.stringify(next);
    if (key === this._scoreKey) return;
    this._scoreKey = key;
    this.scoreRows = next;
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const w = LAYOUT_W;
    const h = LAYOUT_H;
    ctx.setTransform(this.texScale, 0, 0, this.texScale, 0, 0);
    ctx.clearRect(0, 0, w, h);
    roundRect(ctx, 0, 0, w, h, 36, '#1a120c');
    ctx.fillStyle = '#f3e2c4';
    ctx.font = '700 28px Trebuchet MS, Segoe UI, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const titles = {
      settings: 'Settings',
      pointerTilt: 'Pointer tilt',
      restartConfirm: 'Restart game?',
      steal: 'Steal a card',
      trade: 'Bank trade',
      discard: 'Discard',
      plenty: 'Year of Plenty',
      monopoly: 'Monopoly',
      cards: 'Dev cards',
      win: 'Game over',
      title: 'Settlers of Catan',
      scores: 'Scores',
    };
    ctx.fillText(titles[this.screen] || 'Actions', 36, 40);

    const hideStatus = this.screen === 'settings' || this.screen === 'pointerTilt' || this.screen === 'win'
      || this.screen === 'title' || this.screen === 'scores';
    const hideChips = hideStatus || this.screen === 'steal' || this.screen === 'cards'
      || this.screen === 'restartConfirm' || this.screen === 'title';
    if (this.screen === 'win') {
      const title = this.headline || 'Wins!';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.headlineColor || '#f3e2c4';
      let size = 78;
      while (size > 28) {
        ctx.font = `800 ${size}px Trebuchet MS, Segoe UI, sans-serif`;
        if (ctx.measureText(title).width <= w - 72) break;
        size -= 2;
      }
      ctx.strokeStyle = '#0c0806';
      ctx.lineWidth = Math.max(8, Math.round(size * 0.12));
      ctx.strokeText(title, w / 2, 168);
      ctx.fillText(title, w / 2, 168);
    }
    if (this.screen === 'scores') this.drawScoreBreakdown(ctx, w);
    else this.drawScoreStrip(ctx);
    if (!hideStatus) {
      const lines = String(this.status || 'Sit down to begin')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      roundRect(ctx, 36, 64, w - 72, 72, 16, '#2a1c12');
      ctx.fillStyle = '#ffe08a';
      ctx.textAlign = 'center';
      if (lines.length >= 2) {
        fitText(ctx, lines[0], w / 2, 86, w - 120, 28);
        fitText(ctx, lines.slice(1).join(' · '), w / 2, 114, w - 120, 24);
      } else {
        ctx.font = '700 32px Trebuchet MS, Segoe UI, sans-serif';
        fitText(ctx, lines[0], w / 2, 100, w - 120, 32);
      }

      if (!hideChips) {
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
    }

    if (this.screen === 'trade') {
      ctx.fillStyle = '#ffe08a';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.font = '700 18px Trebuchet MS, Segoe UI, sans-serif';
      ctx.fillText('Give to bank', 36, 250);
      ctx.fillText('Get from bank', 36, 348);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const slot of this.buttonLayout(this.buttonDefs)) {
      if (slot.def.strip) continue;
      const hovered = this.hoverAction === slot.def.action;
      const pressed = this.pressAction === slot.def.action && !slot.def.disabled;
      const hot = hovered && !pressed;
      const act = String(slot.def.action);
      const end = act === 'end';
      const settings = act === 'settings' || act === 'pointerTilt' || act === 'scores';
      const back = act === 'settingsBack' || act === 'pointerTiltBack' || act === 'restartBack' || act === 'cardsBack' || act === 'tradeCancel' || act === 'mainMenu' || act === 'scoresBack';
      const restart = act === 'restart' || act === 'restartAsk' || act === 'titleStart';
      const toggle = act === 'passthrough' || act === 'handles' || act === 'pointer' || act === 'pointerLines';
      const steal = act.startsWith('steal:');
      const tint = slot.def.color && (steal || /^(give|get|discard|plenty|mono):/.test(act));
      const selected = !!slot.def.selected;
      const confirm = act === 'tradeGo' || act === 'discardGo' || restart;
      let fill = '#f3e2c4';
      let ink = '#2a1c12';
      if (slot.def.disabled) {
        fill = hot ? '#6e665c' : '#5c5348';
        ink = '#d0c4b2';
      } else if (tint) {
        fill = pressed ? '#2a1c12' : hot || selected ? '#fff8dc' : slot.def.color;
        ink = pressed ? '#f7efe0' : hot || selected ? '#1a120c' : inkFor(slot.def.color);
      } else if (end || confirm || (toggle && slot.def.on)) {
        fill = pressed ? '#1f6a2c' : hot ? '#4ec45f' : '#2f8a3c';
        ink = '#f7fff4';
      } else if (toggle) {
        fill = pressed ? '#3f382f' : hot ? '#7a6c5a' : '#5c5348';
        ink = '#f3e2c4';
      } else if (settings) {
        fill = pressed ? '#a68630' : hot ? '#e8c86a' : '#c9a44a';
      } else {
        fill = pressed ? '#c4ad82' : hot ? '#fff8dc' : '#f3e2c4';
      }
      roundRect(ctx, slot.px, slot.py, slot.pw, slot.ph, 18, fill);
      if (pressed) {
        ctx.strokeStyle = '#3a1f0c';
        ctx.lineWidth = 6;
        ctx.stroke();
      } else if (hot || steal || selected) {
        ctx.strokeStyle = slot.def.disabled ? '#a09070' : '#ffe08a';
        ctx.lineWidth = slot.def.disabled ? 4 : steal && !hot && !selected ? 6 : 8;
        ctx.stroke();
      }
      ctx.fillStyle = ink;
      const big = end || back || restart || toggle || steal || confirm || this.screen === 'cards' || this.screen === 'win'
        || this.screen === 'pointerTilt' || this.screen === 'restartConfirm' || this.screen === 'title';
      drawSlotLabel(ctx, slot, big);
    }

    this.tex.needsUpdate = true;
  }

  drawScoreStrip(ctx) {
    const slot = this.scoreStripSlot();
    const rows = this.scoreRows;
    if (!slot || !rows.length) return;
    const n = rows.length;
    const gap = 8;
    const cw = (slot.pw - gap * (n - 1)) / n;
    rows.forEach((row, i) => {
      const x = slot.px + i * (cw + gap);
      const hot = this.hoverAction === 'scores' && this.pressAction !== 'scores';
      roundRect(ctx, x, slot.py, cw, slot.ph, 12, row.color);
      if (hot) {
        ctx.strokeStyle = '#ffe08a';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      ctx.fillStyle = inkFor(row.color);
      const mark = `${row.longestRoad ? ' R' : ''}${row.largestArmy ? ' A' : ''}`;
      const extra = row.isYou && row.hiddenVP ? `+${row.hiddenVP}` : '';
      fitText(ctx, `${row.name} ${row.publicVP}${extra}${mark}`, x + cw / 2, slot.py + slot.ph / 2, cw - 8, 22);
    });
  }

  drawScoreBreakdown(ctx, w) {
    const rows = this.scoreRows;
    if (!rows.length) return;
    const top = 72;
    const bottom = 472;
    const block = Math.min(98, Math.floor((bottom - top) / rows.length));
    rows.forEach((row, i) => {
      const y = top + i * block;
      const h = block - 8;
      roundRect(ctx, 36, y, w - 72, h, 14, '#2a1c12');
      ctx.fillStyle = row.color;
      roundRect(ctx, 48, y + 12, 18, 18, 6, row.color);
      ctx.fillStyle = '#f3e2c4';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const mark = `${row.longestRoad ? '  R' : ''}${row.largestArmy ? '  A' : ''}`;
      ctx.font = '800 26px Trebuchet MS, Segoe UI, sans-serif';
      ctx.fillText(`${row.name}${row.isYou ? ' · You' : ''}  ${row.shownVP} VP${mark}`, 78, y + 24);
      ctx.fillStyle = '#ffe08a';
      fitText(ctx, scoreLine(row), w / 2, y + h * 0.68, w - 120, 22);
    });
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

function scoreLine(row) {
  const n = row.settlements;
  const c = row.cities;
  const parts = [
    `${n} settlement${n === 1 ? '' : 's'}`,
    `${c} cit${c === 1 ? 'y' : 'ies'}`,
  ];
  if (row.longestRoad) parts.push('Longest Road +2');
  if (row.largestArmy) parts.push('Largest Army +2');
  if (row.isYou && row.hiddenVP) {
    parts.push(`You: ${row.hiddenVP} VP card${row.hiddenVP > 1 ? 's' : ''}`);
  }
  return parts.join(' · ');
}

function inkFor(hex) {
  const c = String(hex || '').replace('#', '');
  if (c.length < 6) return '#f7efe0';
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? '#1a120c' : '#f7efe0';
}

function fitText(ctx, text, x, y, maxW, font) {
  let size = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  while (size > 14) {
    ctx.font = `700 ${size}px Trebuchet MS, Segoe UI, sans-serif`;
    if (ctx.measureText(text).width <= maxW) break;
    size -= 2;
  }
  ctx.fillText(text, x, y);
}

function wrapJoin(ctx, parts, maxW, startSize, minSize = 13) {
  let size = startSize;
  while (size >= minSize) {
    ctx.font = `700 ${size}px Trebuchet MS, Segoe UI, sans-serif`;
    let ok = true;
    const lines = [];
    let cur = '';
    for (const part of parts) {
      if (ctx.measureText(part).width > maxW) {
        ok = false;
        break;
      }
      const next = cur ? `${cur} · ${part}` : part;
      if (ctx.measureText(next).width <= maxW) cur = next;
      else {
        if (cur) lines.push(cur);
        cur = part;
      }
    }
    if (ok) {
      if (cur) lines.push(cur);
      return { lines, size };
    }
    size -= 1;
  }
  ctx.font = `700 ${minSize}px Trebuchet MS, Segoe UI, sans-serif`;
  return { lines: [parts.join(' · ')], size: minSize };
}

function drawSlotLabel(ctx, slot, big) {
  const title = String(slot.def.label || '');
  const detail = String(slot.def.detail || '').trim();
  const cx = slot.px + slot.pw / 2;
  const cy = slot.py + slot.ph / 2;
  const maxW = slot.pw - 28;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (!detail) {
    fitText(ctx, title, cx, cy, maxW, big ? 40 : 30);
    return;
  }
  const parts = detail.split(' · ').map((s) => s.trim()).filter(Boolean);
  const wrapped = wrapJoin(ctx, parts, maxW, Math.min(18, Math.max(14, Math.floor(slot.ph * 0.2))));
  const titleSize = Math.min(big ? 32 : 26, Math.max(18, Math.floor(slot.ph * 0.3)));
  const gap = 4;
  const block = titleSize + gap + wrapped.lines.length * (wrapped.size + 2);
  let y = cy - block / 2 + titleSize / 2;
  fitText(ctx, title, cx, y, maxW, titleSize);
  y += titleSize / 2 + gap + wrapped.size / 2;
  ctx.font = `700 ${wrapped.size}px Trebuchet MS, Segoe UI, sans-serif`;
  for (const line of wrapped.lines) {
    ctx.fillText(line, cx, y);
    y += wrapped.size + 2;
  }
}

export class HelpBanner {
  constructor(camera) {
    this.opts = {
      width: QUALITY.helpW,
      height: QUALITY.helpH,
      font: QUALITY.headset ? 48 : 72,
      pad: QUALITY.headset ? 16 : 28,
      fill: '#1a120c',
      ink: '#ffe08a',
    };
    this.tex = labelTexture(' ', this.opts);
    this._text = '';
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
    if (!line || line === this._text) return;
    this._text = line;
    this.tex = rewriteLabelTexture(this.tex, line, this.opts);
    this.mesh.material.map = this.tex;
    this.mesh.material.needsUpdate = true;
  }
}
