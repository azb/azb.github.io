const SQRT3 = Math.sqrt(3);

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(list, rand = Math.random) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function hexesInRadius(radius) {
  const hexes = [];
  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) hexes.push({ q, r });
  }
  return hexes;
}

export function hexKey(q, r) {
  return `${q},${r}`;
}

export function hexToPixel(q, r, size) {
  return {
    x: size * (SQRT3 * q + (SQRT3 / 2) * r),
    z: size * (1.5 * r),
  };
}

export function hexCorner(q, r, i, size) {
  const c = hexToPixel(q, r, size);
  const angle = (Math.PI / 180) * (60 * i - 30);
  return {
    x: c.x + size * Math.cos(angle),
    z: c.z + size * Math.sin(angle),
  };
}

export function vertKey(x, z) {
  return `${Math.round(x * 1000)}_${Math.round(z * 1000)}`;
}

export function edgeKey(a, b) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

export function neighborsOf(q, r) {
  return [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
  ].map(([dq, dr]) => ({ q: q + dq, r: r + dr }));
}

export function countResources(map) {
  return RESOURCES_SUM(map);
}

function RESOURCES_SUM(map) {
  return Object.values(map).reduce((n, v) => n + v, 0);
}

export function cloneCounts(src, keys) {
  const out = {};
  for (const k of keys) out[k] = src[k] || 0;
  return out;
}

export function hasCost(hand, cost) {
  return Object.entries(cost).every(([k, n]) => (hand[k] || 0) >= n);
}

export function payCost(hand, cost) {
  for (const [k, n] of Object.entries(cost)) hand[k] -= n;
}

export function addResource(hand, type, n = 1) {
  hand[type] = (hand[type] || 0) + n;
}
