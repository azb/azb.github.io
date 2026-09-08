import { Game } from '../src/game/Game.js';
import { takeAITurn } from '../src/game/ai.js';
import { PHASE } from '../src/game/constants.js';

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

const seeds = [1, 2, 7, 42, 99, 2026, 7777];
for (const s of seeds) {
  const r = play(s);
  console.log(JSON.stringify(r));
  if (r.stuck) process.exitCode = 1;
}
