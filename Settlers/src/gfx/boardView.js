import * as THREE from 'three';
import { HEX_SIZE, TABLE_HEIGHT, RESOURCE_COLOR, PIPS } from '../game/constants.js';
import { feltMap, woodMap, numberTexture, labelTexture } from './textures.js';

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
    this.felt = feltMap();
    this.wood = woodMap();
  }

  rebuild(board) {
    this.group.clear();
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
      color: '#1a5c78',
      roughness: 0.55,
      metalness: 0.05,
    });
    for (const h of board.sea) {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(HEX_SIZE * 0.98, HEX_SIZE * 0.98, 0.02, 6), seaMat);
      mesh.rotation.y = Math.PI / 6;
      mesh.position.set(h.x, 0.01, h.z);
      mesh.receiveShadow = true;
      this.group.add(mesh);
    }

    for (const h of board.land) {
      const height = { desert: 0.03, sheep: 0.032, wheat: 0.034, wood: 0.038, brick: 0.05, ore: 0.07 }[h.resource] || 0.035;
      const mat = new THREE.MeshStandardMaterial({
        color: RESOURCE_COLOR[h.resource],
        roughness: 0.78,
        metalness: 0.04,
      });
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(HEX_SIZE * 0.96, HEX_SIZE * 0.96, height, 6), mat);
      mesh.rotation.y = Math.PI / 6;
      mesh.position.set(h.x, height / 2, h.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { kind: 'hex', id: h.id };
      this.group.add(mesh);
      this.hexMeshes.set(h.id, mesh);
      this.decorate(h, height);
      if (h.number) {
        const tok = new THREE.Mesh(
          new THREE.CylinderGeometry(0.038, 0.038, 0.01, 24),
          new THREE.MeshStandardMaterial({ map: numberTexture(h.number, PIPS[h.number]), roughness: 0.45 }),
        );
        tok.position.set(h.x, height + 0.042, h.z);
        tok.renderOrder = 2;
        tok.userData = { kind: 'hex', id: h.id };
        this.group.add(tok);
        this.tokenMeshes.set(h.id, tok);
      }
      const glow = new THREE.Mesh(
        new THREE.CylinderGeometry(HEX_SIZE * 0.9, HEX_SIZE * 0.9, 0.004, 6),
        new THREE.MeshBasicMaterial({ color: '#ffcc66', transparent: true, opacity: 0.0 }),
      );
      glow.rotation.y = Math.PI / 6;
      glow.position.set(h.x, height + 0.01, h.z);
      glow.userData = { kind: 'hex', id: h.id };
      this.markerLayer.add(glow);
      this.hexMarkers.set(h.id, glow);
    }

    for (const v of board.vertices.values()) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 12, 10),
        new THREE.MeshStandardMaterial({
          color: '#ffe08a',
          emissive: '#c9a44a',
          emissiveIntensity: 0.35,
          transparent: true,
          opacity: 0,
        }),
      );
      m.position.set(v.x, 0.08, v.z);
      m.userData = { kind: 'vertex', id: v.id };
      this.markerLayer.add(m);
      this.vertexMarkers.set(v.id, m);
    }

    for (const e of board.edges.values()) {
      const a = board.vertices.get(e.a);
      const b = board.vertices.get(e.b);
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, 0.01, len * 0.72),
        new THREE.MeshStandardMaterial({
          color: '#9ee7ff',
          emissive: '#3aa0c8',
          transparent: true,
          opacity: 0,
        }),
      );
      m.position.set((a.x + b.x) / 2, 0.055, (a.z + b.z) / 2);
      m.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
      m.userData = { kind: 'edge', id: e.id };
      this.markerLayer.add(m);
      this.edgeMarkers.set(e.id, m);
    }

    for (const harbor of board.harbors) {
      const e = board.edges.get(harbor.edge);
      const a = board.vertices.get(e.a);
      const b = board.vertices.get(e.b);
      const mx = (a.x + b.x) / 2;
      const mz = (a.z + b.z) / 2;
      const out = Math.hypot(mx, mz) || 1;
      const px = mx + (mx / out) * 0.08;
      const pz = mz + (mz / out) * 0.08;
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.004, 0.09),
        new THREE.MeshStandardMaterial({ map: this.wood, color: '#8a5a32' }),
      );
      post.position.set(px, 0.024, pz);
      post.lookAt(new THREE.Vector3(0, 0.024, 0));
      const tag = new THREE.Mesh(
        new THREE.PlaneGeometry(0.07, 0.07),
        new THREE.MeshBasicMaterial({
          map: labelTexture(harbor.type === 'generic' ? '3:1' : `2:1\n${harbor.type}`, {
            width: 512,
            height: 512,
            font: 110,
            fill: '#efe0bc',
          }),
        }),
      );
      tag.position.set(px, 0.07, pz);
      tag.lookAt(new THREE.Vector3(px, 0.2, pz + 0.4));
      this.group.add(post, tag);
    }

    this.robber = this.makeRobber();
    this.group.add(this.robber);
    this.setRobber(board);
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
    this.pieceLayer.clear();
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
      road.position.set((a.x + b.x) / 2, 0.048, (a.z + b.z) / 2);
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
    for (const [id, m] of this.vertexMarkers) {
      m.material.opacity = ids.includes(id) ? 0.85 : 0;
      m.visible = ids.includes(id);
    }
  }

  showEdges(ids) {
    for (const [id, m] of this.edgeMarkers) {
      m.material.opacity = ids.includes(id) ? 0.8 : 0;
      m.visible = ids.includes(id);
    }
  }

  showHexes(ids) {
    for (const [id, m] of this.hexMarkers) {
      m.material.opacity = ids.includes(id) ? 0.45 : 0;
      m.visible = ids.includes(id);
    }
  }

  clearHighlights() {
    this.showVertices([]);
    this.showEdges([]);
    this.showHexes([]);
  }
}

function houseMesh(v, color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.024, 0.028), mat);
  base.position.y = 0.06;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.026, 0.022, 4),
    new THREE.MeshStandardMaterial({ color: '#3b2414', roughness: 0.7 }),
  );
  roof.position.y = 0.082;
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
  keep.position.y = 0.07;
  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.055, 0.018), mat);
  tower.position.set(0.016, 0.08, 0.01);
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.016, 0.02, 4),
    new THREE.MeshStandardMaterial({ color: '#3b2414' }),
  );
  roof.position.set(0.016, 0.118, 0.01);
  g.add(keep, tower, roof);
  g.position.set(v.x, 0, v.z);
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  return g;
}
