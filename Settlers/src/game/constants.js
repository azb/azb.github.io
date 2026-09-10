export const HEX_SIZE = 0.13;
export const TABLE_HEIGHT = 0.49;
export const VP_TO_WIN = 10;

export const RESOURCE = {
  WOOD: 'wood',
  BRICK: 'brick',
  SHEEP: 'sheep',
  WHEAT: 'wheat',
  ORE: 'ore',
  DESERT: 'desert',
};

export const RESOURCES = ['wood', 'brick', 'sheep', 'wheat', 'ore'];

const RESOURCE_ALIAS = {
  wood: 'wood',
  lumber: 'wood',
  brick: 'brick',
  clay: 'brick',
  sheep: 'sheep',
  wool: 'sheep',
  wheat: 'wheat',
  grain: 'wheat',
  ore: 'ore',
};

export function normalizeResource(id) {
  if (id == null) return null;
  const key = String(id).trim().toLowerCase();
  if (RESOURCE_ALIAS[key]) return RESOURCE_ALIAS[key];
  return RESOURCES.includes(key) ? key : null;
}

export const RESOURCE_LABEL = {
  wood: 'Lumber',
  brick: 'Brick',
  sheep: 'Wool',
  wheat: 'Grain',
  ore: 'Ore',
  desert: 'Desert',
};

export const RESOURCE_COLOR = {
  wood: '#3f8f4c',
  brick: '#c45b32',
  sheep: '#b5d86a',
  wheat: '#e6c24a',
  ore: '#9aa3b0',
  desert: '#e2c48a',
};

export const RESOURCE_COUNTS = {
  wood: 4,
  brick: 3,
  sheep: 4,
  wheat: 4,
  ore: 3,
  desert: 1,
};

export const TOKEN_NUMBERS = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

export const PIPS = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 };

export const BUILD_COST = {
  road: { wood: 1, brick: 1 },
  settlement: { wood: 1, brick: 1, sheep: 1, wheat: 1 },
  city: { wheat: 3, ore: 2 },
  dev: { sheep: 1, wheat: 1, ore: 1 },
};

export function formatCost(cost, sep = ' · ') {
  return Object.entries(cost)
    .filter(([, n]) => n)
    .map(([k, n]) => `${RESOURCE_LABEL[k] || k} ${n}`)
    .join(sep);
}

export function missingResourceNames(hand, cost) {
  return Object.entries(cost || {})
    .filter(([k, n]) => n && (hand[k] || 0) < n)
    .map(([k]) => RESOURCE_LABEL[k] || k);
}

export function formatMissing(hand, cost) {
  const names = missingResourceNames(hand, cost);
  if (!names.length) return null;
  if (names.length === 1) return `Not enough ${names[0]}`;
  if (names.length === 2) return `Not enough ${names[0]} and ${names[1]}`;
  return `Not enough ${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

export const PIECE_LIMIT = { settlement: 5, city: 4, road: 15 };
export const BANK_START = 19;

export const DEV_TYPES = {
  KNIGHT: 'knight',
  VP: 'vp',
  ROAD: 'roadBuilding',
  PLENTY: 'yearOfPlenty',
  MONOPOLY: 'monopoly',
};

export const DEV_DECK = [
  ...Array(14).fill(DEV_TYPES.KNIGHT),
  ...Array(5).fill(DEV_TYPES.VP),
  ...Array(2).fill(DEV_TYPES.ROAD),
  ...Array(2).fill(DEV_TYPES.PLENTY),
  ...Array(2).fill(DEV_TYPES.MONOPOLY),
];

export const HARBOR_TYPES = [
  'generic',
  'generic',
  'generic',
  'generic',
  'wood',
  'brick',
  'sheep',
  'wheat',
  'ore',
];

export const PLAYERS = [
  { id: 0, name: 'Red', color: '#b42318' },
  { id: 1, name: 'Blue', color: '#1f4e8c' },
  { id: 2, name: 'Orange', color: '#d46a1a' },
  { id: 3, name: 'White', color: '#efe7d6' },
];

export const PHASE = {
  SETUP_SETTLEMENT: 'setupSettlement',
  SETUP_ROAD: 'setupRoad',
  ROLL: 'roll',
  MAIN: 'main',
  DISCARD: 'discard',
  ROBBER: 'robber',
  STEAL: 'steal',
  FREE_ROADS: 'freeRoads',
  PLENTY: 'plenty',
  MONOPOLY: 'monopoly',
  GAME_OVER: 'gameOver',
};
