import * as THREE from 'three';
import { HEX_SIZE, TABLE_HEIGHT, RESOURCE_COLOR, PIPS } from '../game/constants.js';
import { feltMap, woodMap, numberTexture, labelTexture } from './textures.js';
import { QUALITY, markShared, disposeChildren } from './quality.js';

const TILE_HEIGHT = 0.036;
const HARBOR_SIGN = '#efe0bc';
const HARBOR_BEAM = '#f4d27a';
const HARBOR_GLOW = '#fff6dc';

function seeded(q, r, i = 0) {
  const s = Math.sin(q * 12.9898 + r * 78.233 + i * 3.1) * 43758.5453;
  return s - Math.floor(s);
}

function tree(scale = 1) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.007, 0.018, 5),
    new THREE.MeshStandardMaterial({ color: '#5a3418', roughness: 0.9 }),
  );
  trunk.position.y = 0.009;
  const leaves = new THREE.Mesh(
    new THREE.ConeGeometry(0.02 * scale, 0.038 * scale, 6),
    new THREE.MeshStandardMaterial({ color: '#1f5a2c', roughness: 0.8 }),
  );
  leaves.position.y = 0.026 * scale;
  g.add(trunk, leaves);
  return g;
}

function sheep() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.016, 8, 6),
    new THREE.MeshStandardMaterial({ color: '#f2f0e8', roughness: 0.95 }),
  );
  body.scale.set(1.3, 0.9, 1);
  body.position.y = 0.016;
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.008, 6, 6),
    new THREE.MeshStandardMaterial({ color: '#2a1c12' }),
  );
  head.position.set(0.018, 0.018, 0);
  g.add(body, head);
  return g;
}

function cactus() {
  const mat = new THREE.MeshStandardMaterial({ color: '#3d7a3a', roughness: 0.7 });
  const g = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.05, 6), mat);
  stem.position.y = 0.025;
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.03, 6), mat);
  arm.rotation.z = Math.PI / 2;
  arm.position.set(0.015, 0.03, 0);
  g.add(stem, arm);
  return g;
}

export class BoardView {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.position.y = TABLE_HEIGHT;
    scene.add(this.group);
    this.hexMeshes = new Map();
    this.tokenMeshes = new Map();
    this.vertexMarkers = new Map();
    this.edgeMarkers = new Map();
    this.hexMarkers = new Map();
    this.pieceLayer = new THREE.Group();
    this.markerLayer = new THREE.Group();
    this.group.add(this.pieceLayer, this.markerLayer);
    this.robber = null;
    this.hoverObj = null;
    this._flashTimer = 0;
    this.felt = feltMap([48, 110, 255]);
    this.wood = woodMap(QUALITY.claySize, QUALITY.claySize);
    this.clay = woodMap(QUALITY.claySize, QUALITY.claySize, [176, 158, 132]);
    this.seaGeo = markShared(new THREE.CylinderGeometry(HEX_SIZE * 0.98, HEX_SIZE * 0.98, 0.02, 6));
    this.landGeo = markShared(new THREE.CylinderGeometry(HEX_SIZE * 0.96, HEX_SIZE * 0.96, TILE_HEIGHT, 6));
    this.tokenGeo = markShared(new THREE.CylinderGeometry(0.038, 0.038, 0.004, QUALITY.tokenSegments));
    this.hexGlowGeo = markShared(new THREE.CylinderGeometry(HEX_SIZE * 0.9, HEX_SIZE * 0.9, 0.004, 6));
    this.harborDiscGeo = markShared(new THREE.CylinderGeometry(0.018, 0.018, 0.004, QUALITY.harborDiscSegments));
    this.harborRingGeo = markShared(new THREE.TorusGeometry(0.024, 0.0036, 6, QUALITY.harborRingSegments));
    this.harborHaloGeo = markShared(new THREE.TorusGeometry(0.03, 0.0022, 6, QUALITY.harborRingSegments));
    this.pinGeo = markShared(new THREE.SphereGeometry(0.018, 8, 6));
    this.harborTex = new Map();
  }

  rebuild(board) {
    this.restoreHover(this.hoverObj);
    this.hoverObj = null;
    disposeChildren(this.group);
    this.pieceLayer = new THREE.Group();
    this.markerLayer = new THREE.Group();
    this.group.add(this.pieceLayer, this.markerLayer);
    this.hexMeshes.clear();
    this.tokenMeshes.clear();
    this.vertexMarkers.clear();
    this.edgeMarkers.clear();
    this.hexMarkers.clear();

    const seaMat = new THREE.MeshStandardMaterial({
      map: this.felt,
      color: '#6aaee6',
      roughness: 0.96,
      metalness: 0,
      emissive: '#1568d4',
      emissiveIntensity: 0.06,
    });
    for (const h of board.sea) {
      const mesh = new THREE.Mesh(this.seaGeo, seaMat);
      mesh.rotation.y = Math.PI / 3;
      mesh.position.set(h.x, 0.01, h.z);
      mesh.receiveShadow = true;
      this.group.add(mesh);
    }

    for (const h of board.land) {
      const height = TILE_HEIGHT;
      const mat = new THREE.MeshStandardMaterial({
        map: this.clay,
        color: RESOURCE_COLOR[h.resource],
        roughness: 1,
        metalness: 0,
        envMapIntensity: 0,
      });
      const mesh = new THREE.Mesh(this.landGeo, mat);
      mesh.rotation.y = Math.PI / 3;
      mesh.position.set(h.x, height / 2, h.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { kind: 'hex', id: h.id };
      this.group.add(mesh);
      this.hexMeshes.set(h.id, mesh);
      this.decorate(h, height);
      if (h.number) {
        const tok = new THREE.Mesh(
          this.tokenGeo,
          new THREE.MeshStandardMaterial({ map: numberTexture(h.number, PIPS[h.number]), roughness: 0.45 }),
        );
        tok.position.set(h.x, height + 0.0022, h.z);
        tok.renderOrder = 2;
        tok.userData = { kind: 'hex', id: h.id };
        this.group.add(tok);
        this.tokenMeshes.set(h.id, tok);
      }
      const glow = new THREE.Mesh(
        this.hexGlowGeo,
        new THREE.MeshBasicMaterial({ color: '#ffcc66', transparent: true, opacity: 0.0 }),
      );
      glow.rotation.y = Math.PI / 3;
      glow.position.set(h.x, height + 0.01, h.z);
      glow.userData = { kind: 'hex', id: h.id };
      this.markerLayer.add(glow);
      this.hexMarkers.set(h.id, glow);
    }

    const pinMat = new THREE.MeshBasicMaterial({
      color: 0xffc400,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    for (const v of board.vertices.values()) {
      const g = new THREE.Group();
      const bulb = new THREE.Mesh(this.pinGeo, pinMat.clone());
      bulb.position.y = 0.018;
      g.add(bulb);
      g.position.set(v.x, TILE_HEIGHT, v.z);
      g.visible = false;
      g.frustumCulled = false;
      g.userData = { kind: 'vertex', id: v.id };
      g.traverse((o) => {
        o.frustumCulled = false;
        o.renderOrder = 30;
        o.userData = g.userData;
      });
      this.group.add(g);
      this.vertexMarkers.set(v.id, g);
    }

    for (const e of board.edges.values()) {
      const a = board.vertices.get(e.a);
      const b = board.vertices.get(e.b);
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.028, 0.018, len * 0.82),
        new THREE.MeshBasicMaterial({
          color: '#9ee7ff',
          transparent: true,
          opacity: 0,
          depthTest: false,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      m.position.set((a.x + b.x) / 2, TILE_HEIGHT + 0.01, (a.z + b.z) / 2);
      m.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
      m.renderOrder = 4;
      m.visible = false;
      m.userData = { kind: 'edge', id: e.id, waterOnly: !e.touchesLand };
      this.markerLayer.add(m);
      this.edgeMarkers.set(e.id, m);
    }

    for (const harbor of board.harbors) {
      this.addHarbor(board, harbor);
    }

    this.robber = this.makeRobber();
    this.group.add(this.robber);
    this.setRobber(board);
  }

  addHarbor(board, harbor) {
    const nodes = (harbor.vertices || [])
      .map((id) => board.vertices.get(id))
      .filter(Boolean);
    if (!nodes.length) {
      const e = board.edges.get(harbor.edge);
      if (e) {
        const a = board.vertices.get(e.a);
        const b = board.vertices.get(e.b);
        if (a) nodes.push(a);
        if (b) nodes.push(b);
      }
    }
    if (!nodes.length) return;

    const mx = nodes.reduce((s, v) => s + v.x, 0) / nodes.length;
    const mz = nodes.reduce((s, v) => s + v.z, 0) / nodes.length;
    const out = Math.hypot(mx, mz) || 1;
    const nx = mx / out;
    const nz = mz / out;
    const px = mx + nx * 0.1;
    const pz = mz + nz * 0.1;
    const signY = 0.078;
    const woodMat = new THREE.MeshStandardMaterial({ map: this.wood, color: '#8a5a32' });
    const beamMat = unlitMat(HARBOR_BEAM, 0.98);
    const glowMat = unlitMat(HARBOR_GLOW, 0.9);
    const haloMat = unlitMat(HARBOR_SIGN, 0.7);

    const dock = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.008, 0.11), woodMat);
    dock.position.set((px + mx) * 0.5, 0.021, (pz + mz) * 0.5);
    orientZ(dock, px, 0.021, pz, mx, 0.021, mz);

    const post = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.005, 0.09), woodMat);
    post.position.set(px, 0.028, pz);
    post.lookAt(new THREE.Vector3(mx, 0.028, mz));

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.005, 0.055, 8), woodMat);
    pole.position.set(px, 0.05, pz);

    const tag = new THREE.Mesh(
      new THREE.PlaneGeometry(0.072, 0.072),
      new THREE.MeshBasicMaterial({
        map: this.harborLabel(harbor),
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    tag.position.set(px, signY, pz);
    tag.lookAt(new THREE.Vector3(mx, 0.38, mz));
    tag.renderOrder = 8;

    this.group.add(dock, post, pole, tag);

    for (const v of nodes) {
      const disc = new THREE.Mesh(this.harborDiscGeo, beamMat);
      disc.position.set(v.x, TILE_HEIGHT + 0.003, v.z);
      disc.renderOrder = 7;
      const ring = new THREE.Mesh(this.harborRingGeo, glowMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(v.x, TILE_HEIGHT + 0.008, v.z);
      ring.renderOrder = 7;
      const halo = new THREE.Mesh(this.harborHaloGeo, haloMat);
      halo.rotation.x = Math.PI / 2;
      halo.position.set(v.x, TILE_HEIGHT + 0.01, v.z);
      halo.renderOrder = 7;

      this.group.add(disc, ring, halo);
    }
  }

  harborLabel(harbor) {
    const text = harbor.type === 'generic' ? '3:1' : `2:1\n${harbor.type}`;
    let tex = this.harborTex.get(text);
    if (tex) return tex;
    tex = markShared(labelTexture(text, {
      width: QUALITY.harborLabel,
      height: QUALITY.harborLabel,
      font: 110,
      fill: HARBOR_SIGN,
    }));
    this.harborTex.set(text, tex);
    return tex;
  }

  decorate(h, height) {
    const top = height;
    const ring = (i, n, minR = 0.082, maxR = 0.104) => {
      const a = (i / n) * Math.PI * 2 + seeded(h.q, h.r, i + 11) * 0.28;
      const d = minR + seeded(h.q, h.r, i + 4) * (maxR - minR);
      return { x: h.x + Math.cos(a) * d, z: h.z + Math.sin(a) * d };
    };
    if (h.resource === 'wood') {
      for (let i = 0; i < 5; i++) {
        const t = tree(0.7 + seeded(h.q, h.r, i) * 0.25);
        const p = ring(i, 5, 0.084, 0.105);
        t.position.set(p.x, top, p.z);
        t.traverse((o) => {
          if (o.isMesh) o.castShadow = true;
        });
        this.group.add(t);
      }
    } else if (h.resource === 'sheep') {
      for (let i = 0; i < 3; i++) {
        const s = sheep();
        const p = ring(i, 3, 0.082, 0.1);
        s.position.set(p.x, top, p.z);
        s.rotation.y = seeded(h.q, h.r, i + 2) * Math.PI * 2;
        this.group.add(s);
      }
    } else if (h.resource === 'wheat') {
      const mat = new THREE.MeshStandardMaterial({ color: '#c9a227', roughness: 0.8 });
      for (let i = 0; i < 6; i++) {
        const side = i < 3 ? -1 : 1;
        const k = i % 3;
        const row = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.016, 0.008), mat);
        row.position.set(h.x + side * 0.08, top + 0.008, h.z + (k - 1) * 0.022);
        row.rotation.y = 0.15 * side;
        this.group.add(row);
      }
    } else if (h.resource === 'ore') {
      const mat = new THREE.MeshStandardMaterial({ color: '#8b909a', roughness: 0.7 });
      for (let i = 0; i < 3; i++) {
        const rock = new THREE.Mesh(new THREE.ConeGeometry(0.02 + i * 0.004, 0.028 + i * 0.008, 5), mat);
        const p = ring(i, 3, 0.084, 0.1);
        rock.position.set(p.x, top + 0.012, p.z);
        rock.castShadow = true;
        this.group.add(rock);
      }
    } else if (h.resource === 'brick') {
      const mat = new THREE.MeshStandardMaterial({ color: '#9a4a2c', roughness: 0.9 });
      for (let i = 0; i < 4; i++) {
        const slab = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.012, 0.02), mat);
        const p = ring(i, 4, 0.082, 0.1);
        slab.position.set(p.x, top + 0.008, p.z);
        slab.rotation.y = i * 0.4;
        this.group.add(slab);
      }
    } else if (h.resource === 'desert') {
      const c = cactus();
      const p = ring(0, 1, 0.08, 0.09);
      c.position.set(p.x, top, p.z);
      this.group.add(c);
    }
  }

  makeRobber() {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: '#1a1a1e', roughness: 0.45, metalness: 0.2 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.022, 0.05, 8), mat);
    body.position.y = 0.03;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.016, 10, 8), mat);
    head.position.y = 0.062;
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.004, 10), mat);
    brim.position.y = 0.07;
    g.add(body, head, brim);
    g.traverse((o) => {
      if (o.isMesh) o.castShadow = true;
    });
    return g;
  }

  setRobber(board) {
    const h = board.hexes.get(board.robberHex);
    const mesh = this.hexMeshes.get(h.id);
    const top = mesh ? mesh.position.y * 2 : 0.04;
    this.robber.position.set(h.x - 0.04, top, h.z + 0.02);
  }

  syncPieces(game) {
    disposeChildren(this.pieceLayer);
    for (const e of game.board.edges.values()) {
      if (!e.road && e.road !== 0) continue;
      if (e.road == null) continue;
      const p = game.players[e.road];
      const a = game.board.vertices.get(e.a);
      const b = game.board.vertices.get(e.b);
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      const road = new THREE.Mesh(
        new THREE.BoxGeometry(0.016, 0.012, len * 0.78),
        new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.5 }),
      );
      road.position.set((a.x + b.x) / 2, TILE_HEIGHT + 0.007, (a.z + b.z) / 2);
      road.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
      road.castShadow = true;
      this.pieceLayer.add(road);
    }
    for (const v of game.board.vertices.values()) {
      if (!v.building) continue;
      const p = game.players[v.building.player];
      this.pieceLayer.add(v.building.type === 'city' ? cityMesh(v, p.color) : houseMesh(v, p.color));
    }
    this.setRobber(game.board);
  }

  showVertices(ids) {
    this.restoreHover(this.hoverObj);
    const set = new Set(ids);
    for (const [id, m] of this.vertexMarkers) {
      m.visible = set.has(id);
      m.scale.setScalar(1);
    }
    this.repaintHover();
  }

  pulseMarkers(t) {
    const s = 1 + Math.sin(t * 5) * 0.12;
    for (const m of this.vertexMarkers.values()) {
      if (m.visible) m.scale.setScalar(m === this.hoverObj ? s * 1.2 : s);
    }
  }

  showEdges(ids) {
    this.restoreHover(this.hoverObj);
    const set = new Set(ids);
    const picking = ids.length > 0;
    for (const [id, m] of this.edgeMarkers) {
      const on = set.has(id);
      m.material.opacity = on ? 0.8 : 0;
      m.visible = on || (picking && m.userData.waterOnly);
    }
    this.repaintHover();
  }

  showHexes(ids) {
    this.restoreHover(this.hoverObj);
    for (const [id, m] of this.hexMarkers) {
      m.material.opacity = ids.includes(id) ? 0.45 : 0;
      m.visible = ids.includes(id);
    }
    this.repaintHover();
  }

  clearHighlights() {
    this.showVertices([]);
    this.showEdges([]);
    this.showHexes([]);
  }

  setHover(obj) {
    const target = this.hoverTarget(obj);
    if (target === this.hoverObj) return;
    this.restoreHover(this.hoverObj);
    this.hoverObj = target;
    this.paintHover(target, false);
  }

  flashPick(obj) {
    const target = this.hoverTarget(obj) || this.hoverObj;
    if (!target) return;
    if (target !== this.hoverObj) {
      this.restoreHover(this.hoverObj);
      this.hoverObj = target;
    }
    this.paintHover(target, true);
    clearTimeout(this._flashTimer);
    this._flashTimer = setTimeout(() => {
      if (this.hoverObj !== target) return;
      this.restoreHover(target);
      this.paintHover(target, false);
    }, 120);
  }

  hoverTarget(obj) {
    if (!obj) return null;
    const { kind, id } = obj.userData || {};
    if (kind === 'vertex') {
      const m = this.vertexMarkers.get(id);
      return m?.visible ? m : null;
    }
    if (kind === 'edge') {
      const m = this.edgeMarkers.get(id);
      return m?.visible && m.material.opacity > 0 ? m : null;
    }
    if (kind === 'hex') {
      const m = this.hexMarkers.get(id);
      return m?.visible && m.material.opacity > 0 ? m : null;
    }
    return null;
  }

  markerMats(obj) {
    const mats = [];
    obj.traverse((o) => {
      if (o.material && !mats.includes(o.material)) mats.push(o.material);
    });
    return mats;
  }

  restoreHover(m) {
    if (!m) return;
    const rest = m.userData._hoverRest;
    if (!rest) return;
    for (const entry of rest) {
      entry.mat.color.setHex(entry.color);
      entry.mat.opacity = entry.opacity;
    }
    m.userData._hoverRest = null;
  }

  paintHover(m, flash) {
    if (!m) return;
    const mats = this.markerMats(m);
    if (!m.userData._hoverRest) {
      m.userData._hoverRest = mats.map((mat) => ({
        mat,
        color: mat.color.getHex(),
        opacity: mat.opacity,
      }));
    }
    const kind = m.userData.kind;
    for (const mat of mats) {
      if (flash) {
        mat.color.set('#ffffff');
        mat.opacity = 1;
      } else if (kind === 'vertex') {
        mat.color.set('#fff6c8');
        mat.opacity = 1;
      } else if (kind === 'edge') {
        mat.color.set('#f4ffff');
        mat.opacity = 1;
      } else {
        mat.color.set('#ffe9a0');
        mat.opacity = 0.88;
      }
    }
  }

  repaintHover() {
    const t = this.hoverObj;
    if (!t) return;
    if (!this.hoverTarget(t)) {
      this.hoverObj = null;
      return;
    }
    this.paintHover(t, false);
  }
}

function unlitMat(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
}

function orientZ(mesh, ax, ay, az, bx, by, bz) {
  const dx = bx - ax;
  const dy = by - ay;
  const dz = bz - az;
  const len = Math.hypot(dx, dy, dz) || 1;
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(dx / len, dy / len, dz / len),
  );
}

function houseMesh(v, color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.024, 0.028), mat);
  base.position.y = TILE_HEIGHT + 0.012;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.026, 0.022, 4),
    new THREE.MeshStandardMaterial({ color: '#3b2414', roughness: 0.7 }),
  );
  roof.position.y = TILE_HEIGHT + 0.034;
  roof.rotation.y = Math.PI / 4;
  g.add(base, roof);
  g.position.set(v.x, 0, v.z);
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  return g;
}

function cityMesh(v, color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.4 });
  const keep = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.036), mat);
  keep.position.y = TILE_HEIGHT + 0.02;
  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.055, 0.018), mat);
  tower.position.set(0.016, TILE_HEIGHT + 0.03, 0.01);
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.016, 0.02, 4),
    new THREE.MeshStandardMaterial({ color: '#3b2414' }),
  );
  roof.position.set(0.016, TILE_HEIGHT + 0.068, 0.01);
  g.add(keep, tower, roof);
  g.position.set(v.x, 0, v.z);
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  return g;
}
