import {
  RESOURCES,
  RESOURCE_LABEL,
  RESOURCE_COLOR,
  PHASE,
  BUILD_COST,
  DEV_TYPES,
  formatCost,
} from './game/constants.js';

const $ = (id) => document.getElementById(id);

export function phaseText(game) {
  switch (game.phase) {
    case PHASE.SETUP_SETTLEMENT:
      return 'Place a settlement (distance rule applies).';
    case PHASE.SETUP_ROAD:
      return 'Place a road touching that settlement.';
    case PHASE.ROLL:
      return 'Roll the dice — or play a knight first.';
    case PHASE.MAIN:
      return 'Build, trade, play a card, or end your turn. Trade and Dev are on the panel.';
    case PHASE.DISCARD:
      return `${discardLine(game)}. Tap resources on the panel, then confirm.`;
    case PHASE.ROBBER:
      return 'Move the robber onto a land hex.';
    case PHASE.STEAL:
      return 'Choose a player to steal from — click their name, figure, or a tray button.';
    case PHASE.FREE_ROADS:
      return `Place ${game.freeRoads} free road${game.freeRoads > 1 ? 's' : ''}.`;
    case PHASE.PLENTY:
      return 'Take any two resources from the bank — use the panel buttons.';
    case PHASE.MONOPOLY:
      return 'Name a resource on the panel. Everyone else must give you theirs.';
    case PHASE.GAME_OVER:
      return `${game.player(game.winner).name} Wins!`;
    default:
      return '';
  }
}

export function formatStealResult(game) {
  const s = game.lastSteal;
  if (!s?.resource) return null;
  const thief = game.player(s.playerId);
  const victim = game.player(s.fromId);
  if (!thief || !victim) return null;
  const label = RESOURCE_LABEL[s.resource] || s.resource;
  const view = viewPlayer(game);
  if (thief.id === view.id) return `You stole ${label} from ${victim.name}`;
  if (victim.id === view.id) return `${thief.name} stole ${label} from you`;
  return `${thief.name} stole ${label} from ${victim.name}`;
}

export function formatRollResult(game) {
  const roll = game.lastRoll;
  if (!roll?.dice) return null;
  const [a, b] = roll.dice;
  const sum = a + b;
  const diceLine = `${a} + ${b} = ${sum}`;
  const stealLine = formatStealResult(game);
  if (roll.seven || sum === 7) {
    const gainsLine = stealLine || 'Robber — discard if 8+ cards';
    return { diceLine, gainsLine, seven: true, banner: `${diceLine} · ${gainsLine}` };
  }
  const view = viewPlayer(game);
  const gained = Object.fromEntries(RESOURCES.map((r) => [r, 0]));
  for (const ev of roll.production || []) {
    if (ev.playerId !== view.id) continue;
    gained[ev.resource] = (gained[ev.resource] || 0) + (ev.amount || 1);
  }
  const parts = RESOURCES.filter((r) => gained[r] > 0).map(
    (r) => `${gained[r]} ${RESOURCE_LABEL[r]}`,
  );
  const gainsLine = parts.length ? `You gained ${parts.join(', ')}` : 'No resources';
  return { diceLine, gainsLine, seven: false, banner: `${diceLine} · ${gainsLine}` };
}

export function trayStatus(game) {
  const roll = formatRollResult(game);
  const stealLine = formatStealResult(game);
  if (game.phase === PHASE.DISCARD) {
    const line = discardLine(game);
    const hint = `${line}\nTap resources on the panel`;
    return roll ? `${roll.diceLine} · ${hint}` : hint;
  }
  const name = game.player().name;
  const line = {
    [PHASE.SETUP_SETTLEMENT]: 'Place a settlement',
    [PHASE.SETUP_ROAD]: 'Place a road',
    [PHASE.ROLL]: 'Roll the dice',
    [PHASE.MAIN]: 'Build, trade, or end turn',
    [PHASE.DISCARD]: discardLine(game),
    [PHASE.ROBBER]: 'Move the robber',
    [PHASE.STEAL]: 'Click a neighbor to steal',
    [PHASE.FREE_ROADS]: `Place ${game.freeRoads} free road${game.freeRoads > 1 ? 's' : ''}`,
    [PHASE.PLENTY]: 'Pick two resources on the panel',
    [PHASE.MONOPOLY]: 'Name a resource on the panel',
    [PHASE.GAME_OVER]: game.winner != null ? `${game.player(game.winner).name} wins` : 'Game over',
  }[game.phase] || String(game.phase);
  const extra = game.phase === PHASE.MAIN && game.isHuman()
    ? '\nPoint at END TURN or squeeze grip'
    : game.phase === PHASE.STEAL && game.isHuman()
      ? '\nClick a neighbor or tray button'
      : game.phase === PHASE.GAME_OVER
        ? '\nPlay Again or Main Menu'
        : '';
  const phaseStatus = `${name} · ${line}${extra}`;
  const showSteal =
    stealLine && game.phase !== PHASE.STEAL && game.phase !== PHASE.ROBBER;
  if (showSteal) {
    if (roll?.seven) return `${roll.diceLine} · ${stealLine}\n${phaseStatus}`;
    if (roll) return `${roll.banner}\n${stealLine}`;
    return `${stealLine}\n${phaseStatus}`;
  }
  if (!roll) return phaseStatus;
  if (roll.seven) return `${roll.diceLine} · ${phaseStatus}`;
  return `${roll.banner}\n${phaseStatus}`;
}

export function renderHud(game, intent) {
  const p = game.player();
  $('turn-banner').textContent = `${p.name}'s turn`;
  $('turn-banner').style.color = p.color;
  const helpCopy = phaseText(game);
  $('phase-label').textContent = helpCopy;
  const roll = formatRollResult(game);
  const stealLine = formatStealResult(game);
  const eventLine = stealLine
    ? roll
      ? `${roll.diceLine} · ${stealLine}`
      : stealLine
    : roll
      ? roll.banner
      : helpCopy;
  const tableHelp = $('table-help');
  if (tableHelp) {
    tableHelp.textContent = eventLine;
    tableHelp.classList.toggle('hidden', !eventLine);
  }
  const strip = $('roll-result');
  if (strip) {
    strip.textContent = stealLine ? eventLine : roll ? roll.banner : '';
    strip.classList.toggle('hidden', !strip.textContent);
  }

  const view = viewPlayer(game);
  const rows = scoreRows(game);
  const scoreStrip = $('score-strip');
  if (scoreStrip) {
    scoreStrip.innerHTML = rows
      .map((row) => `<button type="button" class="score-chip ${row.id === game.current ? 'active' : ''}" data-scores="1" style="--chip:${row.color};color:${bannerInk(row.color)}">
        <i class="swatch" style="background:${row.color}"></i>
        <span class="score-name">${row.name}</span>
        <span class="score-vp">${row.publicVP}${row.isYou && row.hiddenVP ? `+${row.hiddenVP}` : ''}</span>
        ${row.longestRoad ? '<span class="award" title="Longest Road +2">R</span>' : ''}
        ${row.largestArmy ? '<span class="award" title="Largest Army +2">A</span>' : ''}
      </button>`)
      .join('');
  }
  const stealing = game.phase === PHASE.STEAL && game.isHuman();
  const stealIds = new Set(game.stealCandidates);
  $('players-panel').innerHTML = rows
    .map((row) => {
      const pl = game.player(row.id);
      const cards = RESOURCES.reduce((n, r) => n + pl.resources[r], 0);
      const roads = pl.roads.length;
      const steal = stealing && stealIds.has(pl.id);
      return `<article class="player-card ${pl.id === game.current ? 'active' : ''} ${steal ? 'steal-target' : ''}" ${steal ? `data-steal="${pl.id}"` : ''}>
        <div class="player-head">
          <span><i class="swatch" style="background:${pl.color}"></i>${pl.name}${pl.isAI ? ' · AI' : ''}${row.isYou ? ' · You' : ''}${steal ? ' · steal' : ''}</span>
          <span>${row.shownVP} VP${row.longestRoad ? '<span class="award" title="Longest Road +2">R</span>' : ''}${row.largestArmy ? '<span class="award" title="Largest Army +2">A</span>' : ''}</span>
        </div>
        <div class="player-break">${scoreBreakdownLine(row)}</div>
        <div class="player-meta">${cards} cards · ${roads} roads · ${pl.knightsPlayed} knights</div>
        ${row.isYou ? `<div class="player-res">${RESOURCES.map((r) => `${RESOURCE_LABEL[r]} ${pl.resources[r]}`).join(' · ')}</div>` : ''}
      </article>`;
    })
    .join('');

  $('resource-bar').innerHTML = RESOURCES.map(
    (r) => `<div class="resource-chip" style="border-color:${RESOURCE_COLOR[r]};--chip:${RESOURCE_COLOR[r]}">
      <div class="n">${view.resources[r]}</div>
      <div class="k">${RESOURCE_LABEL[r]}</div>
    </div>`,
  ).join('');

  const human = view;
  const canAct = !human.isAI && human.id === game.current;
  const cards = human.devCards
    .filter((c) => c.type !== DEV_TYPES.VP)
    .map((c) => {
      const names = {
        [DEV_TYPES.KNIGHT]: 'Knight',
        [DEV_TYPES.ROAD]: 'Road Building',
        [DEV_TYPES.PLENTY]: 'Year of Plenty',
        [DEV_TYPES.MONOPOLY]: 'Monopoly',
      };
      const ready = game.playableCards(human.id).some((x) => x.id === c.id);
      return `<button data-dev="${c.id}" ${ready && canAct ? '' : 'disabled'}>${names[c.type]}${c.playable ? '' : ' (hold)'}</button>`;
    });
  const vp = human.devCards.filter((c) => c.type === DEV_TYPES.VP).length;
  if (vp) cards.push(`<button disabled>${vp} VP card${vp > 1 ? 's' : ''}</button>`);
  $('dev-bar').innerHTML = cards.join('') || '<button disabled>No development cards</button>';

  const btn = (id, title, on, detail) =>
    `<button data-act="${id}" class="${intent === id ? 'primary' : ''}" ${on ? '' : 'disabled'}>${
      detail
        ? `<span class="act-name">${title}</span><span class="act-cost">${detail}</span>`
        : title
    }</button>`;

  const main = game.phase === PHASE.MAIN && canAct;
  const freeRoad = game.phase === PHASE.FREE_ROADS && canAct;
  $('action-bar').innerHTML = [
    btn('roll', 'Roll dice', game.phase === PHASE.ROLL && canAct),
    btn('road', 'Road', (main && game.canAfford(human.id, 'road')) || freeRoad, freeRoad ? 'Free' : formatCost(BUILD_COST.road)),
    btn('settlement', 'Settlement', main && game.canAfford(human.id, 'settlement'), formatCost(BUILD_COST.settlement)),
    btn('city', 'City', main && game.canAfford(human.id, 'city'), formatCost(BUILD_COST.city)),
    btn('dev', 'Dev', main && game.canAfford(human.id, 'dev') && game.devDeck.length, formatCost(BUILD_COST.dev)),
    btn('trade', 'Trade', main, 'Bank'),
    btn('end', 'End turn', main),
  ].join('');

  $('log').innerHTML = [...game.log].slice(-12).reverse().map((t) => `<li>${t}</li>`).join('');
}

function discardLine(game) {
  const names = game.discardQueue.map((d) => game.player(d.player).name);
  if (!names.length) return 'Discard half your cards';
  return `${names.join(', ')} must discard half`;
}

export function scoreRows(game) {
  if (!game) return [];
  const view = viewPlayer(game);
  return game.players.map((pl) => {
    const facts = game.scoreFacts(pl);
    const isYou = pl.id === view.id;
    return {
      id: pl.id,
      name: pl.name,
      color: pl.color,
      isYou,
      settlements: facts.settlements,
      cities: facts.cities,
      longestRoad: facts.longestRoad,
      largestArmy: facts.largestArmy,
      hiddenVP: isYou ? facts.hiddenVP : 0,
      publicVP: facts.publicVP,
      shownVP: isYou ? facts.totalVP : facts.publicVP,
    };
  });
}

export function scoreBreakdownLine(row) {
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

export function viewPlayer(game) {
  if (game.players.some((p) => !p.isAI) === false) return game.player();
  const humans = game.players.filter((p) => !p.isAI);
  if (humans.length === 1) return humans[0];
  return game.player();
}

export function bindHud(onAction) {
  $('action-bar').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-act]');
    if (b) onAction(b.dataset.act);
  });
  $('dev-bar').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-dev]');
    if (b) onAction('playDev', b.dataset.dev);
  });
  $('players-panel').addEventListener('click', (e) => {
    const card = e.target.closest('[data-steal]');
    if (card) onAction('steal', Number(card.dataset.steal));
  });
  $('score-strip')?.addEventListener('click', (e) => {
    if (e.target.closest('[data-scores]')) onAction('scores');
  });
  $('scores-btn')?.addEventListener('click', () => onAction('scores'));
}

export const TOAST_MS = 2200;
export const TOAST_LONG_MS = 5200;

export function showToast(text, ms = TOAST_MS, opts = null) {
  const el = $('toast');
  el.textContent = text;
  el.classList.toggle('toast-low', !!opts?.low);
  el.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.add('hidden'), ms);
}

export function closeModal() {
  $('modal').classList.add('hidden');
}

export function openModal(html) {
  $('modal-body').innerHTML = html;
  $('modal').classList.remove('hidden');
}

export function resourcePicker(ids, extra = '') {
  return `<div class="picker" id="${ids}">${RESOURCES.map(
    (r) => `<button type="button" data-res="${r}" style="border-color:${RESOURCE_COLOR[r]}">${RESOURCE_LABEL[r]}</button>`,
  ).join('')}</div>${extra}`;
}

export function showDiscard(game, onDone) {
  const humans = game.discardQueue.filter((d) => !game.player(d.player).isAI);
  if (!humans.length) return false;
  const entry = humans[0];
  const p = game.player(entry.player);
  const give = Object.fromEntries(RESOURCES.map((r) => [r, 0]));
  const draw = () => {
    const n = RESOURCES.reduce((s, r) => s + give[r], 0);
    openModal(`<h2>${p.name}, discard ${entry.must}</h2>
      <p>Selected ${n} / ${entry.must}. You can also tap resources on the table panel.</p>
      ${RESOURCES.map((r) => `<button data-r="${r}">${RESOURCE_LABEL[r]} ${give[r]}/${p.resources[r]}</button>`).join(' ')}
      <p><button id="discard-go" class="primary" ${n === entry.must ? '' : 'disabled'}>Discard</button></p>`);
    $('modal-body').onclick = (e) => {
      const r = e.target.dataset.r;
      if (r && give[r] < p.resources[r] && n < entry.must) {
        give[r] += 1;
        draw();
      }
      if (e.target.id === 'discard-go' && n === entry.must) {
        closeModal();
        onDone(p.id, give);
      }
    };
  };
  draw();
  return true;
}

export function showSteal(game, onDone) {
  const picks = game.stealCandidates
    .map((id) => {
      const p = game.player(id);
      return `<button type="button" class="steal-pick" data-steal="${id}" style="--steal:${p.color}">
        <i class="swatch" style="background:${p.color}"></i>${p.name}
      </button>`;
    })
    .join('');
  openModal(`<h2>Steal a card</h2>
    <p>Choose a neighbor. You can also click their figure at the table or a tray button.</p>
    <div class="picker steal-picker">${picks}</div>`);
  $('modal-body').onclick = (e) => {
    const id = e.target.closest('button[data-steal]')?.dataset.steal;
    if (id != null) {
      closeModal();
      onDone(Number(id));
    }
  };
}

export function showTrade(game, onDone) {
  let give = null;
  let get = null;
  const p = viewPlayer(game);
  const paint = () => {
    const rate = give ? game.tradeRate(p, give) : 4;
    openModal(`<h2>Bank trade</h2>
      <p>Give ${give ? `${rate} ${RESOURCE_LABEL[give]}` : 'a resource'} for one of another. In VR, use the panel buttons.</p>
      <p>Give</p>
      <div class="picker" id="give-p">${RESOURCES.map(
        (r) => `<button type="button" data-res="${r}" style="border-color:${RESOURCE_COLOR[r]}">${RESOURCE_LABEL[r]} ${game.tradeRate(p, r)}:1</button>`,
      ).join('')}</div>
      <p>Get</p>${resourcePicker('get-p')}
      <button id="trade-go" class="primary">Trade</button>
      <button id="trade-cancel">Cancel</button>`);
    if (give) $('give-p').querySelector(`[data-res="${give}"]`)?.classList.add('selected');
    if (get) $('get-p').querySelector(`[data-res="${get}"]`)?.classList.add('selected');
    $('give-p').onclick = (e) => {
      give = e.target.dataset.res || give;
      paint();
    };
    $('get-p').onclick = (e) => {
      get = e.target.dataset.res || get;
      paint();
    };
    $('trade-go').onclick = () => {
      if (give && get) {
        closeModal();
        onDone(give, get);
      }
    };
    $('trade-cancel').onclick = () => {
      closeModal();
      onDone(null, null);
    };
  };
  paint();
}

export function showPlenty(onDone) {
  const pick = [];
  const paint = () => {
    openModal(`<h2>Year of Plenty</h2><p>Pick two resources (${pick.length}/2) — use the panel in VR.</p>
      ${resourcePicker('pl')}
      <p>${pick.map((r) => RESOURCE_LABEL[r]).join(', ')}</p>`);
    $('pl').onclick = (e) => {
      const r = e.target.dataset.res;
      if (!r) return;
      pick.push(r);
      if (pick.length >= 2) {
        closeModal();
        onDone(pick[0], pick[1]);
      } else paint();
    };
  };
  paint();
}

export function showMonopoly(onDone) {
  openModal(`<h2>Monopoly</h2><p>Name a resource on the panel or below.</p>${resourcePicker('mo')}`);
  $('mo').onclick = (e) => {
    const r = e.target.dataset.res;
    if (!r) return;
    closeModal();
    onDone(r);
  };
}

function bannerInk(hex) {
  const c = String(hex || '').replace('#', '');
  if (c.length < 6) return '#f7efe0';
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? '#1a120c' : '#f7efe0';
}

export function showScores(game, onClose) {
  const rows = scoreRows(game);
  openModal(`<h2>Scores</h2>
    <p class="score-note">Public totals are settlements, cities, Longest Road, and Largest Army. Victory-point cards stay private except on your row.</p>
    ${rows
      .map(
        (row) => `<article class="score-break">
        <div class="player-head">
          <span><i class="swatch" style="background:${row.color}"></i>${row.name}${row.isYou ? ' · You' : ''}</span>
          <span>${row.shownVP} VP${row.longestRoad ? '<span class="award" title="Longest Road +2">R</span>' : ''}${row.largestArmy ? '<span class="award" title="Largest Army +2">A</span>' : ''}</span>
        </div>
        <div class="player-break">${scoreBreakdownLine(row)}</div>
      </article>`,
      )
      .join('')}
    <button id="scores-back" class="primary" type="button">Back</button>`);
  $('scores-back').onclick = () => {
    closeModal();
    onClose?.();
  };
}

export function showWin(game, { onPlayAgain, onMainMenu } = {}) {
  const p = game.player(game.winner);
  const ink = bannerInk(p.color);
  openModal(`<h2 class="win-title" style="background:${p.color};color:${ink}">${p.name} Wins!</h2>
    <p>${game.totalVP(p)} victory points. The island is theirs.</p>
    <div class="win-actions">
      <button id="again" class="primary">Play Again</button>
      <button id="win-menu" type="button">Main Menu</button>
    </div>`);
  $('again').onclick = () => {
    closeModal();
    onPlayAgain?.();
  };
  $('win-menu').onclick = () => {
    closeModal();
    onMainMenu?.();
  };
}

export function showRestartConfirm(onDone) {
  openModal(`<h2>Restart game?</h2>
    <p>This starts a new island (same player count and mode).</p>
    <button id="restart-go" class="primary">Restart</button>
    <button id="restart-back">Back</button>`);
  $('restart-go').onclick = () => {
    closeModal();
    onDone(true);
  };
  $('restart-back').onclick = () => {
    closeModal();
    onDone(false);
  };
}
