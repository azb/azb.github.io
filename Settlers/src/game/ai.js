import { RESOURCES, BUILD_COST, PHASE, DEV_TYPES } from './constants.js';
import { vertexScore } from './board.js';
import { hasCost } from './hex.js';

function handTotal(p) {
  return RESOURCES.reduce((n, r) => n + p.resources[r], 0);
}

function missingFor(hand, cost) {
  const miss = {};
  for (const [r, n] of Object.entries(cost)) {
    const d = n - (hand[r] || 0);
    if (d > 0) miss[r] = d;
  }
  return miss;
}

function snapshot(p) {
  return RESOURCES.map((r) => p.resources[r]).join(',') + `:${p.roads.length}:${p.settlements.length}:${p.cities.length}`;
}

export function takeAITurn(game) {
  const p = game.player();
  if (game.phase === PHASE.GAME_OVER) return false;
  if (game.phase !== PHASE.DISCARD && !p.isAI) return false;

  if (game.phase === PHASE.SETUP_SETTLEMENT) {
    return game.placeSettlement(game.suggestSetupVertex(p.id), p.id);
  }

  if (game.phase === PHASE.SETUP_ROAD) {
    const roads = game.validRoads(p.id, { setup: true });
    const scored = roads.map((eid) => {
      const e = game.board.edges.get(eid);
      const other = e.a === p.lastSettlement ? e.b : e.a;
      return { eid, s: vertexScore(game.board, other) };
    });
    scored.sort((a, b) => b.s - a.s);
    return game.placeRoad(scored[0]?.eid || roads[0], p.id);
  }

  if (game.phase === PHASE.DISCARD) {
    const entry = game.discardQueue.find((d) => game.player(d.player).isAI);
    if (!entry) return false;
    const who = game.player(entry.player);
    const give = { wood: 0, brick: 0, sheep: 0, wheat: 0, ore: 0 };
    const bag = [];
    for (const r of RESOURCES) for (let i = 0; i < who.resources[r]; i++) bag.push(r);
    bag.sort((a, b) => who.resources[b] - who.resources[a]);
    for (let i = 0; i < entry.must; i++) give[bag[i]] += 1;
    return game.discard(who.id, give);
  }

  if (game.phase === PHASE.ROBBER) {
    return game.moveRobber(chooseRobberHex(game, p.id), p.id);
  }

  if (game.phase === PHASE.STEAL) {
    const target = game.stealCandidates
      .slice()
      .sort((a, b) => game.publicVP(game.player(b)) - game.publicVP(game.player(a)))[0];
    return game.steal(target, p.id);
  }

  if (game.phase === PHASE.FREE_ROADS) {
    const roads = game.validRoads(p.id, { free: true });
    if (!roads.length) {
      game.freeRoads = 0;
      game.phase = PHASE.MAIN;
      return true;
    }
    return game.placeRoad(bestRoad(game, p.id, roads), p.id);
  }

  if (game.phase === PHASE.PLENTY) {
    const need = mostNeeded(game, p);
    return game.yearOfPlenty(need[0], need[1] || need[0], p.id);
  }

  if (game.phase === PHASE.MONOPOLY) {
    const r = RESOURCES.slice().sort((a, b) => othersHave(game, p.id, b) - othersHave(game, p.id, a))[0];
    return game.monopoly(r, p.id);
  }

  if (game.phase === PHASE.ROLL) {
    const knight = p.devCards.find((c) => c.playable && c.type === DEV_TYPES.KNIGHT);
    const onMe = robberHurts(game, p.id);
    if (knight && (onMe || p.knightsPlayed === 2)) {
      game.playDev(knight.id);
      return true;
    }
    return !!game.roll();
  }

  if (game.phase === PHASE.MAIN) {
    for (let i = 0; i < 8; i++) {
      const before = snapshot(p);
      maybeTrade(game, p);
      tryBuild(game, p);
      if (game.phase !== PHASE.MAIN) return true;
      if (snapshot(p) === before) break;
    }
    maybeDev(game, p);
    if (game.phase !== PHASE.MAIN) return true;
    tryBuild(game, p);
    return game.endTurn();
  }

  return false;
}

function othersHave(game, id, r) {
  return game.players.reduce((n, p) => n + (p.id === id ? 0 : p.resources[r]), 0);
}

function mostNeeded(game, p) {
  const targets = [BUILD_COST.city, BUILD_COST.settlement, BUILD_COST.dev, BUILD_COST.road];
  const scores = Object.fromEntries(RESOURCES.map((r) => [r, 0]));
  for (const cost of targets) {
    for (const [r, n] of Object.entries(missingFor(p.resources, cost))) scores[r] += n;
  }
  return RESOURCES.slice().sort((a, b) => scores[b] - scores[a]);
}

function tryBuild(game, p) {
  if (game.canAfford(p.id, 'city')) {
    const cities = game.validCities(p.id).sort((a, b) => vertexScore(game.board, b) - vertexScore(game.board, a));
    if (cities[0]) game.placeCity(cities[0], p.id);
  }
  if (game.canAfford(p.id, 'settlement')) {
    const spots = game.validSettlements(p.id).sort((a, b) => vertexScore(game.board, b) - vertexScore(game.board, a));
    if (spots[0]) game.placeSettlement(spots[0], p.id);
  }
  if (game.canAfford(p.id, 'road')) {
    const roads = game.validRoads(p.id);
    const needPath = game.validSettlements(p.id).length === 0 && p.settlements.length < 5;
    if (roads.length && (needPath || p.roads.length < 3 || game.roadLength(p.id) < 5)) {
      game.placeRoad(roadToward(game, p.id, roads), p.id);
    }
  }
}

function maybeDev(game, p) {
  const knight = p.devCards.find((c) => c.playable && c.type === DEV_TYPES.KNIGHT);
  if (knight && (robberHurts(game, p.id) || p.knightsPlayed >= 2)) game.playDev(knight.id);
  const plenty = p.devCards.find((c) => c.playable && c.type === DEV_TYPES.PLENTY);
  if (plenty && Object.keys(missingFor(p.resources, BUILD_COST.settlement)).length) game.playDev(plenty.id);
  const mono = p.devCards.find((c) => c.playable && c.type === DEV_TYPES.MONOPOLY);
  if (mono && RESOURCES.some((r) => othersHave(game, p.id, r) >= 3)) game.playDev(mono.id);
  const rb = p.devCards.find((c) => c.playable && c.type === DEV_TYPES.ROAD);
  if (rb && game.validSettlements(p.id).length === 0) game.playDev(rb.id);
  const savingSettle = p.settlements.length < 5 && missCount(p.resources, BUILD_COST.settlement) <= 2;
  if (game.canAfford(p.id, 'dev') && !savingSettle && handTotal(p) >= 6 && game.devDeck.length) game.buyDev(p.id);
}

function maybeTrade(game, p) {
  const goals = [];
  if (p.cities.length < 4 && p.settlements.length) goals.push(BUILD_COST.city);
  if (p.settlements.length < 5) goals.push(BUILD_COST.settlement);
  goals.push(BUILD_COST.road, BUILD_COST.dev);
  for (const cost of goals) {
    if (hasCost(p.resources, cost)) continue;
    const miss = missingFor(p.resources, cost);
    for (const want of Object.keys(miss)) {
      for (const give of RESOURCES) {
        if (give === want) continue;
        const rate = game.tradeRate(p, give);
        if ((p.resources[give] || 0) < rate || game.bank[want] < 1) continue;
        if ((p.resources[give] - rate) < (cost[give] || 0)) continue;
        game.bankTrade(p.id, give, want);
        return true;
      }
    }
  }
  return false;
}

function missCount(hand, cost) {
  return Object.values(missingFor(hand, cost)).reduce((a, b) => a + b, 0);
}

function openSites(game) {
  const spots = [];
  for (const v of game.board.vertices.values()) {
    if (v.building) continue;
    if (!v.hexes.some((id) => game.board.hexes.get(id).isLand)) continue;
    if (v.neighbors.some((nid) => game.board.vertices.get(nid).building)) continue;
    spots.push(v);
  }
  spots.sort((a, b) => vertexScore(game.board, b.id) - vertexScore(game.board, a.id));
  return spots;
}

function roadToward(game, playerId, roads) {
  const target = openSites(game)[0];
  if (!target) return roads[0];
  let best = roads[0];
  let score = 1e9;
  for (const eid of roads) {
    const e = game.board.edges.get(eid);
    const a = game.board.vertices.get(e.a);
    const b = game.board.vertices.get(e.b);
    const d = Math.min(Math.hypot(a.x - target.x, a.z - target.z), Math.hypot(b.x - target.x, b.z - target.z));
    if (d < score) {
      score = d;
      best = eid;
    }
  }
  return best;
}

function robberHurts(game, playerId) {
  const hid = game.board.robberHex;
  for (const v of game.board.vertices.values()) {
    if (v.building?.player === playerId && v.hexes.includes(hid)) return true;
  }
  return false;
}

function chooseRobberHex(game, playerId) {
  let best = null;
  let score = -999;
  for (const h of game.board.land) {
    if (h.id === game.board.robberHex || h.resource === 'desert') continue;
    let s = (h.number ? 6 - Math.abs(7 - h.number) : 0);
    let hitsMe = false;
    let hitsLead = false;
    for (const v of game.board.vertices.values()) {
      if (!v.building || !v.hexes.includes(h.id)) continue;
      if (v.building.player === playerId) hitsMe = true;
      else {
        s += 2 + game.publicVP(game.player(v.building.player));
        const leader = Math.max(...game.players.map((p) => game.publicVP(p)));
        if (game.publicVP(game.player(v.building.player)) === leader) hitsLead = true;
      }
    }
    if (hitsMe) s -= 8;
    if (hitsLead) s += 3;
    if (s > score) {
      score = s;
      best = h.id;
    }
  }
  return best || game.board.land.find((h) => h.id !== game.board.robberHex).id;
}
