import {
  HEX_SIZE,
  RESOURCE,
  RESOURCE_COUNTS,
  TOKEN_NUMBERS,
  HARBOR_TYPES,
  PIPS,
} from './constants.js';
import {
  hexesInRadius,
  hexKey,
  hexToPixel,
  hexCorner,
  vertKey,
  edgeKey,
  neighborsOf,
  mulberry32,
  shuffle,
} from './hex.js';

function sixAndEightAdjacent(hexes) {
  const byKey = new Map(hexes.map((h) => [hexKey(h.q, h.r), h]));
  for (const h of hexes) {
    if (h.number !== 6 && h.number !== 8) continue;
    for (const n of neighborsOf(h.q, h.r)) {
      const other = byKey.get(hexKey(n.q, n.r));
      if (other && (other.number === 6 || other.number === 8)) return true;
    }
  }
  return false;
}

export function createBoard(seed = Date.now()) {
  const rand = mulberry32(seed >>> 0);
  const landCoords = hexesInRadius(2);
  const seaCoords = hexesInRadius(3).filter(
    (h) => Math.max(Math.abs(h.q), Math.abs(h.r), Math.abs(h.q + h.r)) === 3,
  );

  let land = null;
  for (let attempt = 0; attempt < 80; attempt++) {
    const bag = [];
    for (const [res, n] of Object.entries(RESOURCE_COUNTS)) {
      for (let i = 0; i < n; i++) bag.push(res);
    }
    const resources = shuffle(bag, rand);
    const numbers = shuffle(TOKEN_NUMBERS, rand);
    let ni = 0;
    land = landCoords.map((c, i) => {
      const resource = resources[i];
      const number = resource === RESOURCE.DESERT ? null : numbers[ni++];
      const pos = hexToPixel(c.q, c.r, HEX_SIZE);
      return {
        id: hexKey(c.q, c.r),
        q: c.q,
        r: c.r,
        x: pos.x,
        z: pos.z,
        resource,
        number,
        isLand: true,
      };
    });
    if (!sixAndEightAdjacent(land)) break;
  }

  const sea = seaCoords.map((c) => {
    const pos = hexToPixel(c.q, c.r, HEX_SIZE);
    return {
      id: hexKey(c.q, c.r),
      q: c.q,
      r: c.r,
      x: pos.x,
      z: pos.z,
      resource: 'sea',
      number: null,
      isLand: false,
    };
  });

  const hexes = new Map();
  for (const h of [...land, ...sea]) hexes.set(h.id, h);

  const vertices = new Map();
  const edges = new Map();

  function ensureVertex(q, r, i) {
    const p = hexCorner(q, r, i, HEX_SIZE);
    const id = vertKey(p.x, p.z);
    if (!vertices.has(id)) {
      vertices.set(id, {
        id,
        x: p.x,
        z: p.z,
        hexes: [],
        neighbors: new Set(),
        edges: [],
        building: null,
        harbor: null,
      });
    }
    const v = vertices.get(id);
    const hid = hexKey(q, r);
    if (!v.hexes.includes(hid)) v.hexes.push(hid);
    return v;
  }

  for (const h of hexes.values()) {
    const corners = [];
    for (let i = 0; i < 6; i++) corners.push(ensureVertex(h.q, h.r, i));
    for (let i = 0; i < 6; i++) {
      const a = corners[i];
      const b = corners[(i + 1) % 6];
      a.neighbors.add(b.id);
      b.neighbors.add(a.id);
      const eid = edgeKey(a.id, b.id);
      if (!edges.has(eid)) {
        edges.set(eid, {
          id: eid,
          a: a.id,
          b: b.id,
          hexes: [],
          road: null,
          coastal: false,
        });
      }
      const e = edges.get(eid);
      if (!e.hexes.includes(h.id)) e.hexes.push(h.id);
      if (!a.edges.includes(eid)) a.edges.push(eid);
      if (!b.edges.includes(eid)) b.edges.push(eid);
    }
  }

  for (const v of vertices.values()) v.neighbors = [...v.neighbors];

  const coastal = [...edges.values()].filter((e) => {
    const lands = e.hexes.filter((id) => hexes.get(id).isLand).length;
    const seas = e.hexes.filter((id) => !hexes.get(id).isLand).length;
    e.coastal = lands > 0 && seas > 0;
    return e.coastal;
  });

  coastal.sort((a, b) => {
    const va = vertices.get(a.a);
    const vb = vertices.get(b.a);
    return Math.atan2(va.z, va.x) - Math.atan2(vb.z, vb.x);
  });

  const harbors = [];
  const usedVerts = new Set();
  const types = shuffle(HARBOR_TYPES, rand);
  const step = Math.max(1, Math.floor(coastal.length / types.length));
  let ti = 0;
  for (let i = 0; i < coastal.length && ti < types.length; i += step) {
    const e = coastal[i];
    if (usedVerts.has(e.a) || usedVerts.has(e.b)) continue;
    const type = types[ti++];
    const harbor = { id: `h${ti}`, type, edge: e.id, vertices: [e.a, e.b] };
    harbors.push(harbor);
    vertices.get(e.a).harbor = type;
    vertices.get(e.b).harbor = type;
    usedVerts.add(e.a);
    usedVerts.add(e.b);
  }

  const desert = land.find((h) => h.resource === RESOURCE.DESERT);

  return {
    seed,
    hexes,
    land,
    sea,
    vertices,
    edges,
    harbors,
    robberHex: desert.id,
  };
}

export function pipValue(number) {
  return PIPS[number] || 0;
}

export function vertexScore(board, vertexId) {
  const v = board.vertices.get(vertexId);
  let pips = 0;
  const seen = new Set();
  for (const hid of v.hexes) {
    const h = board.hexes.get(hid);
    if (!h.isLand) continue;
    pips += pipValue(h.number);
    if (h.resource !== RESOURCE.DESERT) seen.add(h.resource);
  }
  return pips + seen.size * 0.35 + (v.harbor ? 0.8 : 0);
}
