import {
  RESOURCES,
  RESOURCE_LABEL,
  RESOURCE_COLOR,
  PHASE,
  BUILD_COST,
  DEV_TYPES,
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
      return 'Build, trade, play a card, or end your turn.';
    case PHASE.DISCARD:
      return 'Discard half your hand (rounded down).';
    case PHASE.ROBBER:
      return 'Move the robber onto a land hex.';
    case PHASE.STEAL:
      return 'Steal a random card from a neighbor.';
    case PHASE.FREE_ROADS:
      return `Place ${game.freeRoads} free road${game.freeRoads > 1 ? 's' : ''}.`;
    case PHASE.PLENTY:
      return 'Take any two resources from the bank.';
    case PHASE.MONOPOLY:
      return 'Name a resource. Everyone else must give you theirs.';
    case PHASE.GAME_OVER:
      return `${game.player(game.winner).name} wins the island!`;
    default:
      return '';
  }
}

export function trayStatus(game) {
  const name = game.player().name;
  const line = {
    [PHASE.SETUP_SETTLEMENT]: 'Place a settlement',
    [PHASE.SETUP_ROAD]: 'Place a road',
    [PHASE.ROLL]: 'Roll the dice',
    [PHASE.MAIN]: 'Build, trade, or end turn',
    [PHASE.DISCARD]: 'Discard half your cards',
    [PHASE.ROBBER]: 'Move the robber',
    [PHASE.STEAL]: 'Steal from a neighbor',
    [PHASE.FREE_ROADS]: `Place ${game.freeRoads} free road${game.freeRoads > 1 ? 's' : ''}`,
    [PHASE.PLENTY]: 'Take two resources',
    [PHASE.MONOPOLY]: 'Name a resource',
    [PHASE.GAME_OVER]: `${game.player(game.winner).name} wins`,
  }[game.phase] || String(game.phase);
  const extra = game.phase === PHASE.MAIN && game.isHuman() ? '\nPoint at END TURN or squeeze grip' : '';
  return `${name} · ${line}${extra}`;
}

export function renderHud(game, intent) {
  const p = game.player();
  $('turn-banner').textContent = `${p.name}'s turn`;
  $('turn-banner').style.color = p.color;
  const helpCopy = phaseText(game);
  $('phase-label').textContent = helpCopy;
  const tableHelp = $('table-help');
  if (tableHelp) {
    tableHelp.textContent = helpCopy;
    tableHelp.classList.toggle('hidden', !helpCopy);
  }

  const view = viewPlayer(game);
  $('players-panel').innerHTML = game.players
    .map((pl) => {
      const cards = RESOURCES.reduce((n, r) => n + pl.resources[r], 0);
      const roads = pl.roads.length;
      return `<article class="player-card ${pl.id === game.current ? 'active' : ''}">
        <div class="player-head">
          <span><i class="swatch" style="background:${pl.color}"></i>${pl.name}${pl.isAI ? ' · AI' : ''}</span>
          <span>${game.publicVP(pl)} VP</span>
        </div>
        <div class="player-meta">${cards} cards · ${roads} roads · ${pl.knightsPlayed} knights
          ${game.longestRoad.player === pl.id ? ' · Road' : ''}
          ${game.largestArmy.player === pl.id ? ' · Army' : ''}
        </div>
        ${pl.id === view.id ? `<div class="player-res">${RESOURCES.map((r) => `${RESOURCE_LABEL[r][0]}${pl.resources[r]}`).join(' · ')}</div>` : ''}
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

  const btn = (id, label, on) =>
    `<button data-act="${id}" class="${intent === id ? 'primary' : ''}" ${on ? '' : 'disabled'}>${label}</button>`;

  const main = game.phase === PHASE.MAIN && canAct;
  $('action-bar').innerHTML = [
    btn('roll', 'Roll dice', game.phase === PHASE.ROLL && canAct),
    btn('road', `Road (${cost(BUILD_COST.road)})`, (main && game.canAfford(human.id, 'road')) || (game.phase === PHASE.FREE_ROADS && canAct)),
    btn('settlement', `Settlement (${cost(BUILD_COST.settlement)})`, main && game.canAfford(human.id, 'settlement')),
    btn('city', `City (${cost(BUILD_COST.city)})`, main && game.canAfford(human.id, 'city')),
    btn('dev', 'Buy dev card', main && game.canAfford(human.id, 'dev') && game.devDeck.length),
    btn('trade', 'Bank trade', main),
    btn('end', 'End turn', main),
  ].join('');

  $('log').innerHTML = [...game.log].slice(-12).reverse().map((t) => `<li>${t}</li>`).join('');
}

export function viewPlayer(game) {
  if (game.players.some((p) => !p.isAI) === false) return game.player();
  const humans = game.players.filter((p) => !p.isAI);
  if (humans.length === 1) return humans[0];
  return game.player();
}

const COST_ABBR = { wood: 'L', brick: 'B', sheep: 'W', wheat: 'G', ore: 'O' };

function cost(map) {
  return Object.entries(map)
    .map(([k, n]) => `${n}${COST_ABBR[k] || k[0].toUpperCase()}`)
    .join(' ');
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
}

export function showToast(text) {
  const el = $('toast');
  el.textContent = text;
  el.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.add('hidden'), 2200);
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
      <p>Selected ${n} / ${entry.must}</p>
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
  openModal(`<h2>Steal a card</h2><p>Choose a player adjacent to the robber.</p>
    ${game.stealCandidates.map((id) => {
      const p = game.player(id);
      return `<button data-steal="${id}"><i class="swatch" style="background:${p.color}"></i>${p.name}</button>`;
    }).join(' ')}`);
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
      <p>Give ${give ? `${rate} ${RESOURCE_LABEL[give]}` : 'a resource'} for one of another.</p>
      <p>Give</p>${resourcePicker('give-p')}
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
    $('trade-cancel').onclick = closeModal;
  };
  paint();
}

export function showPlenty(onDone) {
  const pick = [];
  const paint = () => {
    openModal(`<h2>Year of Plenty</h2><p>Pick two resources (${pick.length}/2)</p>
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
  openModal(`<h2>Monopoly</h2><p>Name a resource.</p>${resourcePicker('mo')}`);
  $('mo').onclick = (e) => {
    const r = e.target.dataset.res;
    if (!r) return;
    closeModal();
    onDone(r);
  };
}

export function showWin(game) {
  const p = game.player(game.winner);
  openModal(`<h2>${p.name} wins!</h2>
    <p>${game.totalVP(p)} victory points. The island is theirs.</p>
    <button id="again" class="primary">New island</button>`);
  $('again').onclick = () => {
    closeModal();
    $('new-game-btn').click();
  };
}
