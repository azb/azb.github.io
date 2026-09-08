import { Game } from '../src/game/Game.js';
import { takeAITurn } from '../src/game/ai.js';
import { PHASE } from '../src/game/constants.js';
import { formatRollResult, trayStatus } from '../src/ui.js';

function play(seed) {
  const g = new Game({ playerCount: 4, solo: true, seed });
  for (const p of g.players) p.isAI = true;
  let i = 0;
  while (g.phase !== PHASE.GAME_OVER && i++ < 1200) {
    const before = `${g.phase}:${g.current}:${g.setupIndex}:${g.log.length}`;
    const ok = takeAITurn(g);
    if (!ok) {
      return { seed, stuck: true, i, phase: g.phase, log: g.log.slice(-10), before };
    }
  }
  return {
    seed,
    stuck: g.phase !== PHASE.GAME_OVER,
    i,
    winner: g.winner,
    vp: g.winner != null ? g.totalVP(g.player(g.winner)) : null,
    phase: g.phase,
  };
}

function forceSeven(g) {
  const seq = [0.01, 0.9];
  let i = 0;
  const prev = g.rand;
  g.rand = () => (i < seq.length ? seq[i++] : prev());
}

function flushAIDiscards(g) {
  let n = 0;
  while (g.phase === PHASE.DISCARD && g.discardQueue.some((d) => g.player(d.player).isAI) && n++ < 8) {
    if (!takeAITurn(g)) break;
  }
}

function sevenDiscard() {
  const g = new Game({ playerCount: 3, solo: true, seed: 7 });
  g.phase = PHASE.ROLL;
  g.current = 1;
  g.players[1].resources = { wood: 4, brick: 4, sheep: 0, wheat: 0, ore: 0 };
  g.players[2].resources = { wood: 0, brick: 0, sheep: 5, wheat: 5, ore: 0 };
  forceSeven(g);
  if (!takeAITurn(g)) return { stuck: true, why: 'roll' };
  if (g.phase !== PHASE.DISCARD) return { stuck: true, why: 'not-discard', phase: g.phase };
  flushAIDiscards(g);
  if (g.discardQueue.some((d) => g.player(d.player).isAI)) {
    return { stuck: true, why: 'ai-still-queued', queue: g.discardQueue, phase: g.phase };
  }
  if (g.phase !== PHASE.ROBBER) return { stuck: true, why: 'no-robber', phase: g.phase, queue: g.discardQueue };
  return { stuck: false, phase: g.phase, seven: true };
}

function rollResultCheck() {
  const g = new Game({ playerCount: 3, solo: true, seed: 1 });
  g.phase = PHASE.MAIN;
  g.lastRoll = {
    dice: [3, 2],
    production: [
      { playerId: 0, resource: 'wood', amount: 2 },
      { playerId: 0, resource: 'sheep', amount: 1 },
      { playerId: 1, resource: 'ore', amount: 1 },
    ],
    seven: false,
    playerId: 1,
  };
  const gained = formatRollResult(g);
  if (gained?.banner !== '3 + 2 = 5 · You gained 2 Lumber, 1 Wool') {
    return { stuck: true, why: 'gains', got: gained?.banner };
  }
  const tray = trayStatus(g);
  if (!tray.includes('3 + 2 = 5') || !tray.includes('You gained 2 Lumber')) {
    return { stuck: true, why: 'tray', tray };
  }

  g.lastRoll = {
    dice: [5, 3],
    production: [{ playerId: 1, resource: 'ore', amount: 2 }],
    seven: false,
    playerId: 0,
  };
  const none = formatRollResult(g);
  if (none?.banner !== '5 + 3 = 8 · No resources') {
    return { stuck: true, why: 'none', got: none?.banner };
  }

  g.lastRoll = { dice: [6, 1], production: [], seven: true, playerId: 0 };
  g.phase = PHASE.ROBBER;
  const sev = formatRollResult(g);
  if (!sev?.seven || !sev.banner.includes('6 + 1 = 7') || !/robber|discard/i.test(sev.banner) || /gained/i.test(sev.banner)) {
    return { stuck: true, why: 'seven', got: sev?.banner };
  }

  const live = new Game({ playerCount: 3, solo: true, seed: 2 });
  live.phase = PHASE.ROLL;
  live.current = 0;
  const seq = [0.5, 0.5];
  let i = 0;
  const prev = live.rand;
  live.rand = () => (i < seq.length ? seq[i++] : prev());
  if (!live.roll()) return { stuck: true, why: 'noroll' };
  if (!live.lastRoll || live.lastRoll.dice[0] + live.lastRoll.dice[1] !== 8 || live.lastRoll.seven) {
    return { stuck: true, why: 'lastdice', lastRoll: live.lastRoll };
  }
  const banner = formatRollResult(live)?.banner || '';
  if (!banner.includes('4 + 4 = 8') || (!banner.includes('You gained') && !banner.includes('No resources'))) {
    return { stuck: true, why: 'live-banner', banner };
  }
  return { stuck: false, rollResult: true, banner };
}

const rollUi = rollResultCheck();
console.log(JSON.stringify(rollUi));
if (rollUi.stuck) process.exitCode = 1;

const seven = sevenDiscard();
console.log(JSON.stringify(seven));
if (seven.stuck) process.exitCode = 1;

const seeds = [1, 2, 7, 42, 99, 2026, 7777];
for (const s of seeds) {
  const r = play(s);
  console.log(JSON.stringify(r));
  if (r.stuck) process.exitCode = 1;
}

