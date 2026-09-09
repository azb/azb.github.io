import {
  RESOURCES,
  RESOURCE_LABEL,
  BUILD_COST,
  PIECE_LIMIT,
  BANK_START,
  DEV_DECK,
  DEV_TYPES,
  PLAYERS,
  PHASE,
  VP_TO_WIN,
  formatMissing,
} from './constants.js';
import { createBoard, vertexScore } from './board.js';
import { shuffle, hasCost, payCost, addResource, mulberry32 } from './hex.js';

function emptyHand() {
  return Object.fromEntries(RESOURCES.map((r) => [r, 0]));
}

function totalCards(hand) {
  return RESOURCES.reduce((n, r) => n + hand[r], 0);
}

export class Game {
  constructor({ playerCount = 3, solo = true, seed = Date.now() } = {}) {
    this.seed = seed >>> 0;
    this.rand = mulberry32(this.seed);
    this.board = createBoard(this.seed);
    this.playerCount = playerCount;
    this.players = PLAYERS.slice(0, playerCount).map((p, i) => ({
      ...p,
      isAI: solo ? i !== 0 : false,
      resources: emptyHand(),
      roads: [],
      settlements: [],
      cities: [],
      devCards: [],
      knightsPlayed: 0,
      lastSettlement: null,
    }));
    this.bank = Object.fromEntries(RESOURCES.map((r) => [r, BANK_START]));
    this.devDeck = shuffle(DEV_DECK, this.rand);
    this.current = 0;
    this.setupIndex = 0;
    this.phase = PHASE.SETUP_SETTLEMENT;
    this.dice = [0, 0];
    this.log = [];
    this.listeners = new Set();
    this.playedDevThisTurn = false;
    this.freeRoads = 0;
    this.discardQueue = [];
    this.stealCandidates = [];
    this.longestRoad = { player: null, length: 0 };
    this.largestArmy = { player: null, size: 0 };
    this.winner = null;
    this.lastAction = null;
    this.lastRoll = null;
    this.lastSteal = null;
    this.afterRobber = PHASE.MAIN;
    this.note(`Island seed ${this.seed}. ${playerCount} captains set sail.`);
  }

  on(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit(action = null) {
    this.lastAction = action;
    for (const fn of this.listeners) fn(this, action);
  }

  note(text) {
    this.log.push(text);
    if (this.log.length > 80) this.log.shift();
  }

  player(id = this.current) {
    return this.players[id];
  }

  isHuman(id = this.current) {
    return !this.player(id).isAI;
  }

  setupOrder() {
    const n = this.playerCount;
    const forward = Array.from({ length: n }, (_, i) => i);
    const back = [...forward].reverse();
    return [...forward, ...back];
  }

  setupPlayer() {
    return this.setupOrder()[this.setupIndex];
  }

  publicVP(p) {
    let vp = p.settlements.length + p.cities.length * 2;
    if (this.longestRoad.player === p.id) vp += 2;
    if (this.largestArmy.player === p.id) vp += 2;
    return vp;
  }

  hiddenVP(p) {
    return p.devCards.filter((c) => c.type === DEV_TYPES.VP).length;
  }

  totalVP(p) {
    return this.publicVP(p) + this.hiddenVP(p);
  }

  checkWin(id = this.current) {
    const p = this.player(id);
    if (this.totalVP(p) >= VP_TO_WIN) {
      this.winner = p.id;
      this.phase = PHASE.GAME_OVER;
      this.note(`${p.name} reaches ${this.totalVP(p)} victory points and claims the island!`);
      return true;
    }
    return false;
  }

  tradeRate(player, resource) {
    let rate = 4;
    const spots = [...player.settlements, ...player.cities];
    for (const vid of spots) {
      const h = this.board.vertices.get(vid).harbor;
      if (!h) continue;
      if (h === 'generic') rate = Math.min(rate, 3);
      if (h === resource) rate = Math.min(rate, 2);
    }
    return rate;
  }

  validSettlements(playerId, { setup = false } = {}) {
    const p = this.player(playerId);
    const out = [];
    if (!setup && p.settlements.length >= PIECE_LIMIT.settlement) return out;
    for (const v of this.board.vertices.values()) {
      if (v.building) continue;
      const landTouch = v.hexes.some((id) => this.board.hexes.get(id).isLand);
      if (!landTouch) continue;
      const tooClose = v.neighbors.some((nid) => this.board.vertices.get(nid).building);
      if (tooClose) continue;
      if (!setup) {
        const connected = v.edges.some((eid) => this.board.edges.get(eid).road === playerId);
        if (!connected) continue;
      }
      out.push(v.id);
    }
    return out;
  }

  validRoads(playerId, { setup = false, free = false } = {}) {
    const p = this.player(playerId);
    const out = [];
    if (!free && !setup && p.roads.length >= PIECE_LIMIT.road) return out;
    for (const e of this.board.edges.values()) {
      if (e.road != null) continue;
      if (!e.touchesLand) continue;
      const va = this.board.vertices.get(e.a);
      const vb = this.board.vertices.get(e.b);
      if (setup) {
        const last = p.lastSettlement;
        if (e.a !== last && e.b !== last) continue;
        out.push(e.id);
        continue;
      }
      if (this.roadConnects(va, playerId) || this.roadConnects(vb, playerId)) out.push(e.id);
    }
    return out;
  }

  roadConnects(vertex, playerId) {
    if (vertex.building && vertex.building.player !== playerId) return false;
    if (vertex.building?.player === playerId) return true;
    return vertex.edges.some((eid) => this.board.edges.get(eid).road === playerId);
  }

  validCities(playerId) {
    const p = this.player(playerId);
    if (p.cities.length >= PIECE_LIMIT.city) return [];
    return p.settlements.filter((id) => this.board.vertices.get(id).building?.type === 'settlement');
  }

  canAfford(playerId, kind) {
    return hasCost(this.player(playerId).resources, BUILD_COST[kind]);
  }

  missingCostLabel(playerId, kind) {
    return formatMissing(this.player(playerId).resources, BUILD_COST[kind]);
  }

  whyNotSettlement(vertexId, playerId = this.current) {
    const setup = this.phase === PHASE.SETUP_SETTLEMENT;
    const p = this.player(playerId);
    if (vertexId == null) {
      if (!setup && this.phase !== PHASE.MAIN) return "Can't settle now";
      if (!setup) {
        const miss = this.missingCostLabel(playerId, 'settlement');
        if (miss) return miss;
      }
      if (!setup && p.settlements.length >= PIECE_LIMIT.settlement) return 'No settlements left';
      return "Can't settle now";
    }
    if (this.validSettlements(playerId, { setup }).includes(vertexId)) {
      if (!setup) {
        const miss = this.missingCostLabel(playerId, 'settlement');
        if (miss) return miss;
      }
      return "Can't settle here";
    }
    const v = this.board.vertices.get(vertexId);
    if (!v) return "Can't settle here";
    if (v.building) return 'Already occupied';
    const landTouch = v.hexes.some((id) => this.board.hexes.get(id).isLand);
    if (!landTouch) return "Can't settle here";
    if (v.neighbors.some((nid) => this.board.vertices.get(nid).building)) {
      return 'Too close to another settlement';
    }
    if (!setup) {
      const connected = v.edges.some((eid) => this.board.edges.get(eid).road === playerId);
      if (!connected) return 'Need a road connection';
    }
    if (!setup && p.settlements.length >= PIECE_LIMIT.settlement) return 'No settlements left';
    return "Can't settle here";
  }

  whyNotRoad(edgeId, playerId = this.current) {
    const setup = this.phase === PHASE.SETUP_ROAD;
    const free = this.phase === PHASE.FREE_ROADS;
    const p = this.player(playerId);
    if (edgeId == null) {
      if (!setup && !free && this.phase !== PHASE.MAIN) return "Can't build a road now";
      if (!setup && !free) {
        const miss = this.missingCostLabel(playerId, 'road');
        if (miss) return miss;
      }
      if (!free && !setup && p.roads.length >= PIECE_LIMIT.road) return 'No roads left';
      return "Can't build a road now";
    }
    const e = this.board.edges.get(edgeId);
    if (!e) return "Can't build here";
    if (e.road != null) return 'Already occupied';
    if (this.validRoads(playerId, { setup, free }).includes(edgeId)) {
      if (!setup && !free) {
        const miss = this.missingCostLabel(playerId, 'road');
        if (miss) return miss;
      }
      return "Can't build here";
    }
    if (!e.touchesLand) return "Can't build on water";
    const va = this.board.vertices.get(e.a);
    const vb = this.board.vertices.get(e.b);
    if (setup) {
      const last = p.lastSettlement;
      if (e.a !== last && e.b !== last) return 'Must touch your new settlement';
    } else if (!this.roadConnects(va, playerId) && !this.roadConnects(vb, playerId)) {
      return 'Need a road connection';
    }
    if (!free && !setup && p.roads.length >= PIECE_LIMIT.road) return 'No roads left';
    return "Can't build here";
  }

  whyNotCity(vertexId, playerId = this.current) {
    const p = this.player(playerId);
    if (vertexId == null) {
      if (this.phase !== PHASE.MAIN) return "Can't build a city now";
      const miss = this.missingCostLabel(playerId, 'city');
      if (miss) return miss;
      if (p.cities.length >= PIECE_LIMIT.city) return 'No cities left';
      if (!this.validCities(playerId).length) return 'Need a settlement here';
      return "Can't build a city now";
    }
    if (this.phase !== PHASE.MAIN) return "Can't build a city now";
    if (p.cities.length >= PIECE_LIMIT.city) return 'No cities left';
    const v = this.board.vertices.get(vertexId);
    if (v?.building?.type === 'city') return 'Already a city';
    if (!v?.building) return 'Need a settlement here';
    if (v.building.player !== playerId) return 'Already occupied';
    if (v.building.type !== 'settlement') return 'Need a settlement here';
    const miss = this.missingCostLabel(playerId, 'city');
    if (miss) return miss;
    return "Can't build a city now";
  }

  whyNotDev(playerId = this.current) {
    if (this.phase !== PHASE.MAIN) return "Can't buy a card now";
    const miss = this.missingCostLabel(playerId, 'dev');
    if (miss) return miss;
    if (!this.devDeck.length) return 'No development cards left';
    return "Can't buy a card now";
  }

  takeFromBank(type, n, player) {
    const got = Math.min(n, this.bank[type]);
    this.bank[type] -= got;
    addResource(player.resources, type, got);
    return got;
  }

  returnToBank(player, type, n) {
    const give = Math.min(n, player.resources[type]);
    player.resources[type] -= give;
    this.bank[type] += give;
  }

  placeSettlement(vertexId, playerId = this.current) {
    const setup = this.phase === PHASE.SETUP_SETTLEMENT;
    if (!this.validSettlements(playerId, { setup }).includes(vertexId)) return false;
    const p = this.player(playerId);
    if (!setup) {
      if (!this.canAfford(playerId, 'settlement')) return false;
      payCost(p.resources, BUILD_COST.settlement);
      for (const [r, n] of Object.entries(BUILD_COST.settlement)) this.bank[r] += n;
    }
    const v = this.board.vertices.get(vertexId);
    v.building = { player: playerId, type: 'settlement' };
    p.settlements.push(vertexId);
    p.lastSettlement = vertexId;
    this.note(`${p.name} founds a settlement.`);
    this.updateLongestRoad();
    if (setup) {
      if (this.setupIndex >= this.playerCount) {
        for (const hid of v.hexes) {
          const h = this.board.hexes.get(hid);
          if (h.isLand && h.resource !== 'desert') this.takeFromBank(h.resource, 1, p);
        }
      }
      this.phase = PHASE.SETUP_ROAD;
      this.current = playerId;
    } else {
      this.checkWin(playerId);
    }
    this.emit({ type: 'settlement', vertexId, playerId });
    return true;
  }

  placeRoad(edgeId, playerId = this.current) {
    const setup = this.phase === PHASE.SETUP_ROAD;
    const free = this.phase === PHASE.FREE_ROADS;
    if (!this.validRoads(playerId, { setup, free }).includes(edgeId)) return false;
    if (this.board.edges.get(edgeId).road != null) return false;
    const p = this.player(playerId);
    if (!setup && !free) {
      if (!this.canAfford(playerId, 'road')) return false;
      payCost(p.resources, BUILD_COST.road);
      for (const [r, n] of Object.entries(BUILD_COST.road)) this.bank[r] += n;
    }
    this.board.edges.get(edgeId).road = playerId;
    p.roads.push(edgeId);
    this.note(`${p.name} builds a road.`);
    this.updateLongestRoad();
    if (setup) {
      this.setupIndex += 1;
      if (this.setupIndex >= this.playerCount * 2) {
        this.current = 0;
        this.phase = PHASE.ROLL;
        this.note('The island is claimed. Red rolls first.');
      } else {
        this.current = this.setupPlayer();
        this.phase = PHASE.SETUP_SETTLEMENT;
      }
    } else if (free) {
      this.freeRoads -= 1;
      if (this.freeRoads <= 0) this.phase = PHASE.MAIN;
      this.checkWin(playerId);
    } else {
      this.checkWin(playerId);
    }
    this.emit({ type: 'road', edgeId, playerId });
    return true;
  }

  placeCity(vertexId, playerId = this.current) {
    if (this.phase !== PHASE.MAIN) return false;
    if (!this.validCities(playerId).includes(vertexId)) return false;
    if (!this.canAfford(playerId, 'city')) return false;
    const p = this.player(playerId);
    payCost(p.resources, BUILD_COST.city);
    for (const [r, n] of Object.entries(BUILD_COST.city)) this.bank[r] += n;
    this.board.vertices.get(vertexId).building.type = 'city';
    p.settlements = p.settlements.filter((id) => id !== vertexId);
    p.cities.push(vertexId);
    this.note(`${p.name} upgrades to a city.`);
    this.checkWin(playerId);
    this.emit({ type: 'city', vertexId, playerId });
    return true;
  }

  roll() {
    if (this.phase !== PHASE.ROLL) return null;
    this.lastSteal = null;
    const a = 1 + Math.floor(this.rand() * 6);
    const b = 1 + Math.floor(this.rand() * 6);
    this.dice = [a, b];
    const sum = a + b;
    this.note(`${this.player().name} rolls ${a} + ${b} = ${sum}.`);
    let production = [];
    if (sum === 7) {
      this.startRobber();
    } else {
      production = this.produce(sum);
      this.phase = PHASE.MAIN;
    }
    this.lastRoll = {
      dice: [a, b],
      production,
      seven: sum === 7,
      playerId: this.current,
    };
    this.emit({ type: 'roll', dice: this.dice, production });
    return this.dice;
  }

  produce(number) {
    const grant = this.players.map(() => emptyHand());
    const sources = [];
    for (const h of this.board.land) {
      if (h.number !== number || h.id === this.board.robberHex) continue;
      if (!RESOURCES.includes(h.resource)) continue;
      for (const v of this.board.vertices.values()) {
        if (!v.building || !v.hexes.includes(h.id)) continue;
        const n = v.building.type === 'city' ? 2 : 1;
        grant[v.building.player][h.resource] += n;
        sources.push({
          hexId: h.id,
          vertexId: v.id,
          playerId: v.building.player,
          resource: h.resource,
          amount: n,
        });
      }
    }
    const paid = [];
    for (const r of RESOURCES) {
      const need = grant.reduce((n, g) => n + g[r], 0);
      if (need === 0) continue;
      if (need > this.bank[r]) {
        this.note(`The ${RESOURCE_LABEL[r] || r} supply is too scarce to pay everyone.`);
        continue;
      }
      for (let i = 0; i < this.players.length; i++) {
        if (grant[i][r]) this.takeFromBank(r, grant[i][r], this.players[i]);
      }
      for (const s of sources) if (s.resource === r) paid.push(s);
    }
    return paid;
  }

  startRobber() {
    this.lastSteal = null;
    this.discardQueue = this.players
      .filter((p) => totalCards(p.resources) >= 8)
      .map((p) => ({
        player: p.id,
        must: Math.floor(totalCards(p.resources) / 2),
      }));
    if (this.discardQueue.length) {
      this.phase = PHASE.DISCARD;
      this.afterRobber = PHASE.MAIN;
      this.note('A seven! Hands of eight or more must discard half.');
    } else {
      this.afterRobber = PHASE.MAIN;
      this.phase = PHASE.ROBBER;
      this.note(`${this.player().name} must move the robber.`);
    }
  }

  discard(playerId, give) {
    const entry = this.discardQueue.find((d) => d.player === playerId);
    if (!entry) return false;
    const p = this.player(playerId);
    let n = 0;
    for (const r of RESOURCES) n += give[r] || 0;
    if (n !== entry.must) return false;
    if (!hasCost(p.resources, give)) return false;
    for (const r of RESOURCES) {
      const amt = give[r] || 0;
      if (amt) this.returnToBank(p, r, amt);
    }
    this.discardQueue = this.discardQueue.filter((d) => d.player !== playerId);
    this.note(`${p.name} discards ${n} cards.`);
    if (!this.discardQueue.length) this.phase = PHASE.ROBBER;
    this.emit({ type: 'discard', playerId });
    return true;
  }

  moveRobber(hexId, playerId = this.current) {
    if (this.phase !== PHASE.ROBBER) return false;
    this.lastSteal = null;
    const h = this.board.hexes.get(hexId);
    if (!h?.isLand || hexId === this.board.robberHex) return false;
    this.board.robberHex = hexId;
    this.note(`${this.player(playerId).name} moves the robber.`);
    const victims = new Set();
    for (const v of this.board.vertices.values()) {
      if (v.building && v.hexes.includes(hexId) && v.building.player !== playerId) {
        const other = this.player(v.building.player);
        if (totalCards(other.resources) > 0) victims.add(other.id);
      }
    }
    this.stealCandidates = [...victims];
    this.phase = this.stealCandidates.length ? PHASE.STEAL : this.afterRobber;
    if (!this.stealCandidates.length) this.note('No neighbor to steal from.');
    this.emit({ type: 'robber', hexId });
    return true;
  }

  steal(fromId, playerId = this.current) {
    if (this.phase !== PHASE.STEAL) return false;
    if (!this.stealCandidates.includes(fromId)) return false;
    const from = this.player(fromId);
    const bag = [];
    for (const r of RESOURCES) for (let i = 0; i < from.resources[r]; i++) bag.push(r);
    if (!bag.length) {
      this.lastSteal = null;
      this.phase = this.afterRobber;
      this.emit({ type: 'steal', fromId, playerId, resource: null });
      return true;
    }
    const take = bag[Math.floor(this.rand() * bag.length)];
    from.resources[take] -= 1;
    this.player(playerId).resources[take] += 1;
    this.lastSteal = { playerId, fromId, resource: take };
    this.note(
      `${this.player(playerId).name} steals ${RESOURCE_LABEL[take] || take} from ${from.name}.`,
    );
    this.phase = this.afterRobber;
    this.emit({ type: 'steal', fromId, playerId, resource: take });
    return true;
  }

  bankTrade(playerId, giveType, getType) {
    if (this.phase !== PHASE.MAIN) return false;
    if (giveType === getType) return false;
    const p = this.player(playerId);
    const rate = this.tradeRate(p, giveType);
    if (p.resources[giveType] < rate || this.bank[getType] < 1) return false;
    this.returnToBank(p, giveType, rate);
    this.takeFromBank(getType, 1, p);
    this.note(`${p.name} trades ${rate} ${RESOURCE_LABEL[giveType] || giveType} to the bank for ${RESOURCE_LABEL[getType] || getType}.`);
    this.emit({ type: 'trade' });
    return true;
  }

  buyDev(playerId = this.current) {
    if (this.phase !== PHASE.MAIN) return false;
    if (!this.devDeck.length || !this.canAfford(playerId, 'dev')) return false;
    const p = this.player(playerId);
    payCost(p.resources, BUILD_COST.dev);
    for (const [r, n] of Object.entries(BUILD_COST.dev)) this.bank[r] += n;
    const type = this.devDeck.pop();
    p.devCards.push({ type, playable: false, id: `${playerId}-${p.devCards.length}-${this.rand()}` });
    this.note(`${p.name} buys a development card.`);
    this.checkWin(playerId);
    this.emit({ type: 'buyDev' });
    return true;
  }

  playableCards(playerId) {
    const p = this.player(playerId);
    if (this.playedDevThisTurn) return [];
    if (![PHASE.ROLL, PHASE.MAIN].includes(this.phase)) return [];
    return p.devCards.filter((c) => c.playable && c.type !== DEV_TYPES.VP);
  }

  playDev(cardId, extra = {}) {
    const p = this.player();
    const card = p.devCards.find((c) => c.id === cardId);
    if (!card || !this.playableCards(p.id).some((c) => c.id === cardId)) return false;
    this.playedDevThisTurn = true;
    p.devCards = p.devCards.filter((c) => c.id !== cardId);
    if (card.type === DEV_TYPES.KNIGHT) {
      p.knightsPlayed += 1;
      this.updateArmy();
      this.lastSteal = null;
      this.note(`${p.name} plays a knight.`);
      this.afterRobber = this.phase === PHASE.ROLL ? PHASE.ROLL : PHASE.MAIN;
      this.phase = PHASE.ROBBER;
    } else if (card.type === DEV_TYPES.ROAD) {
      this.freeRoads = Math.min(2, PIECE_LIMIT.road - p.roads.length);
      this.phase = this.freeRoads ? PHASE.FREE_ROADS : PHASE.MAIN;
      this.note(`${p.name} plays Road Building.`);
    } else if (card.type === DEV_TYPES.PLENTY) {
      this.phase = PHASE.PLENTY;
      this.note(`${p.name} plays Year of Plenty.`);
    } else if (card.type === DEV_TYPES.MONOPOLY) {
      this.phase = PHASE.MONOPOLY;
      this.note(`${p.name} plays Monopoly.`);
    }
    this.checkWin(p.id);
    this.emit({ type: 'dev', card });
    return true;
  }

  yearOfPlenty(r1, r2, playerId = this.current) {
    if (this.phase !== PHASE.PLENTY) return false;
    const p = this.player(playerId);
    this.takeFromBank(r1, 1, p);
    this.takeFromBank(r2, 1, p);
    this.phase = PHASE.MAIN;
    this.note(`${p.name} takes ${RESOURCE_LABEL[r1] || r1} and ${RESOURCE_LABEL[r2] || r2} from the bank.`);
    this.emit({ type: 'plenty' });
    return true;
  }

  monopoly(resource, playerId = this.current) {
    if (this.phase !== PHASE.MONOPOLY) return false;
    const p = this.player(playerId);
    let n = 0;
    for (const other of this.players) {
      if (other.id === playerId) continue;
      n += other.resources[resource];
      other.resources[resource] = 0;
    }
    p.resources[resource] += n;
    this.phase = PHASE.MAIN;
    this.note(`${p.name} monopolizes ${RESOURCE_LABEL[resource] || resource} (${n} cards).`);
    this.emit({ type: 'monopoly' });
    return true;
  }

  endTurn() {
    if (this.phase !== PHASE.MAIN) return false;
    if (this.checkWin(this.current)) {
      this.emit({ type: 'end' });
      return true;
    }
    const p = this.player();
    for (const c of p.devCards) c.playable = true;
    this.playedDevThisTurn = false;
    this.current = (this.current + 1) % this.playerCount;
    this.phase = PHASE.ROLL;
    this.note(`${this.player().name}'s turn.`);
    this.emit({ type: 'end' });
    return true;
  }

  updateArmy() {
    let best = this.largestArmy;
    for (const p of this.players) {
      if (p.knightsPlayed >= 3 && p.knightsPlayed > best.size) {
        best = { player: p.id, size: p.knightsPlayed };
      }
    }
    if (best.player !== this.largestArmy.player && best.player != null) {
      this.note(`${this.player(best.player).name} claims Largest Army.`);
    }
    this.largestArmy = best;
  }

  roadLength(playerId) {
    const owned = [...this.board.edges.values()].filter((e) => e.road === playerId);
    const adj = new Map();
    for (const e of owned) {
      const blocked = (vid) => {
        const b = this.board.vertices.get(vid).building;
        return b && b.player !== playerId;
      };
      if (!blocked(e.a)) {
        if (!adj.has(e.a)) adj.set(e.a, []);
        adj.get(e.a).push(e);
      }
      if (!blocked(e.b)) {
        if (!adj.has(e.b)) adj.set(e.b, []);
        adj.get(e.b).push(e);
      }
    }

    let best = 0;
    const edgeIds = owned.map((e) => e.id);
    for (const start of edgeIds) {
      const stack = [{ eid: start, from: null, path: new Set([start]) }];
      while (stack.length) {
        const { eid, from, path } = stack.pop();
        best = Math.max(best, path.size);
        const e = this.board.edges.get(eid);
        for (const vid of [e.a, e.b]) {
          if (vid === from) continue;
          const b = this.board.vertices.get(vid).building;
          if (b && b.player !== playerId) continue;
          for (const nid of this.board.vertices.get(vid).edges) {
            if (path.has(nid)) continue;
            if (this.board.edges.get(nid).road !== playerId) continue;
            const next = new Set(path);
            next.add(nid);
            const other = this.board.edges.get(nid).a === vid ? this.board.edges.get(nid).b : this.board.edges.get(nid).a;
            stack.push({ eid: nid, from: vid, path: next });
          }
        }
      }
    }
    return best;
  }

  updateLongestRoad() {
    const lengths = this.players.map((p) => ({ id: p.id, n: this.roadLength(p.id) }));
    let holder = this.longestRoad;
    for (const L of lengths) {
      if (L.n >= 5 && L.n > holder.length) holder = { player: L.id, length: L.n };
    }
    if (holder.player != null) {
      const still = lengths.find((L) => L.id === holder.player);
      if (!still || still.n < 5) {
        const next = lengths.filter((L) => L.n >= 5).sort((a, b) => b.n - a.n);
        holder = next.length ? { player: next[0].id, length: next[0].n } : { player: null, length: 0 };
      } else {
        holder.length = still.n;
      }
    }
    if (holder.player !== this.longestRoad.player && holder.player != null) {
      this.note(`${this.player(holder.player).name} claims Longest Road.`);
    }
    this.longestRoad = holder;
  }

  suggestSetupVertex(playerId) {
    const opts = this.validSettlements(playerId, { setup: true });
    opts.sort((a, b) => vertexScore(this.board, b) - vertexScore(this.board, a));
    return opts[0];
  }
}
