import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { Game } from './game/Game.js';
import { takeAITurn } from './game/ai.js';
import { PHASE, RESOURCES, RESOURCE_LABEL, RESOURCE_COLOR, DEV_TYPES } from './game/constants.js';
import { createWorld } from './gfx/world.js';
import { BoardView } from './gfx/boardView.js';
import { DicePair, Tray, BoardHandles, HelpBanner } from './gfx/props.js';
import { PlayerAvatars } from './gfx/avatars.js';
import { ProductionFlights } from './gfx/production.js';
import {
  renderHud,
  bindHud,
  showToast,
  trayStatus,
  formatRollResult,
  showDiscard,
  showSteal,
  showTrade,
  showPlenty,
  showMonopoly,
  showWin,
  closeModal,
  viewPlayer,
} from './ui.js';
import { sfx } from './audio.js';

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x1b140f, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.xr.enabled = true;
renderer.xr.setFramebufferScaleFactor(2);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const stage = new THREE.Group();
stage.position.set(0, 0, -1.32);
scene.add(stage);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.05, 30);
camera.position.set(0, 1.17, 0.62);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.57, -1.32);
controls.enableDamping = true;
controls.enablePan = true;
controls.screenSpacePanning = true;
controls.panSpeed = 1.25;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 0.6;
controls.maxDistance = 3.2;
controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY;
controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
controls.touches.ONE = THREE.TOUCH.PAN;
controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
controls.listenToKeyEvents(window);
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

const ROOM_BG = new THREE.Color('#1b140f');
scene.background = ROOM_BG;
scene.fog = new THREE.Fog('#1b140f', 6, 12);
const world = createWorld(stage);
const boardView = new BoardView(stage);
boardView.rebuild(new Game({ seed: 2026 }).board);
const dice = new DicePair(stage);
const tray = new Tray(stage);
const help = new HelpBanner(camera);
const avatars = new PlayerAvatars(stage);
const production = new ProductionFlights(stage);
const handles = new BoardHandles(scene, stage);

const _ctrlPos = new THREE.Vector3();
const _ctrlQuat = new THREE.Quaternion();
const _ctrlEuler = new THREE.Euler();
const _offset = new THREE.Vector3();
const _handA = new THREE.Vector3();
const _handB = new THREE.Vector3();
const _mid = new THREE.Vector3();
const _yAxis = new THREE.Vector3(0, 1, 0);
const _spotPos = new THREE.Vector3();
const grabs = new Map();
let twoHand = null;

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const xrControllers = setupXR();

let game = null;
let intent = null;
let busy = false;
let modalOpen = false;
let playerCount = 3;
let solo = true;
let passthroughOn = false;
let handlesOn = true;
let trayScreen = 'actions';
let tradeGive = null;
let tradeGet = null;
let discardGive = emptyHand();
let discardKey = '';
let plentyPicks = [];
const TRAY_SETTINGS = new Set(['settings', 'settingsBack', 'passthrough', 'handles', 'restart']);
const DEV_NAMES = {
  [DEV_TYPES.KNIGHT]: 'Knight',
  [DEV_TYPES.ROAD]: 'Road Building',
  [DEV_TYPES.PLENTY]: 'Year of Plenty',
  [DEV_TYPES.MONOPOLY]: 'Monopoly',
};

function emptyHand() {
  return Object.fromEntries(RESOURCES.map((r) => [r, 0]));
}

function preferTrayUi() {
  return renderer.xr.isPresenting;
}

function actionArg(action, prefix) {
  if (typeof action !== 'string' || !action.startsWith(prefix)) return null;
  return action.slice(prefix.length);
}

document.getElementById('player-count').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-count]');
  if (!b) return;
  playerCount = Number(b.dataset.count);
  for (const x of document.getElementById('player-count').children) x.classList.toggle('active', x === b);
});

document.getElementById('play-mode').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-mode]');
  if (!b) return;
  solo = b.dataset.mode === 'solo';
  for (const x of document.getElementById('play-mode').children) x.classList.toggle('active', x === b);
});

document.getElementById('start-btn').addEventListener('click', () => {
  sfx.unlock();
  startGame();
});

document.getElementById('new-game-btn').addEventListener('click', () => {
  closeModal();
  game = null;
  modalOpen = false;
  trayScreen = 'actions';
  tradeGive = null;
  tradeGet = null;
  discardGive = emptyHand();
  discardKey = '';
  plentyPicks = [];
  document.getElementById('hud').classList.add('hidden');
  const start = document.getElementById('start-screen');
  start.classList.remove('hidden');
  start.hidden = false;
  start.removeAttribute('inert');
  syncTrayButtons();
});

document.getElementById('vr-btn').addEventListener('click', enterVR);
window.addEventListener('resize', onResize);
canvas.addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  if (pointerDown && tray.pressAction) {
    const dx = e.clientX - pointerDown.x;
    const dy = e.clientY - pointerDown.y;
    if (dx * dx + dy * dy >= 256) tray.setPressed(null);
  }
});
let pointerDown = null;
canvas.addEventListener('pointerdown', (e) => {
  sfx.unlock();
  pointerDown = { x: e.clientX, y: e.clientY };
  if (renderer.xr.isPresenting) return;
  raycaster.setFromCamera(pointer, camera);
  const hit = resolvePick(raycaster.intersectObjects(pickables(), true));
  if (hit?.userData?.kind === 'tray' && !hit.userData.disabled) tray.setPressed(hit.userData.action);
});
canvas.addEventListener('pointerup', (e) => {
  if (!pointerDown || renderer.xr.isPresenting) return;
  const dx = e.clientX - pointerDown.x;
  const dy = e.clientY - pointerDown.y;
  pointerDown = null;
  if (dx * dx + dy * dy < 256) pickFromCamera();
  else tray.setPressed(null);
});

function runHudAction(act, extra) {
  if (!game || busy) return;
  if (act === 'steal') {
    trySteal(extra);
    return;
  }
  sfx.click();
  if (act === 'roll') {
    const d = game.roll();
    if (d) {
      dice.placeFor(game.current, game.playerCount);
      dice.rollTo(d);
      sfx.dice();
      playProduction();
    }
    afterAction();
    return;
  }
  if (act === 'end') {
    game.endTurn();
    afterAction();
    return;
  }
  if (act === 'dev') {
    game.buyDev(viewPlayer(game).id);
    afterAction();
    return;
  }
  if (act === 'trade') {
    openTradeUi();
    return;
  }
  if (act === 'playDev') {
    game.playDev(extra);
    afterAction();
    return;
  }
  intent = act;
  refresh();
}

bindHud(runHudAction);
document.getElementById('spot-layer')?.addEventListener('click', (e) => {
  const b = e.target.closest('[data-vertex]');
  if (!b) return;
  applyHit({ userData: { kind: 'vertex', id: b.dataset.vertex } });
});

renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  if (!renderer.xr.isPresenting) controls.update();
  dice.update(dt);
  production.update(dt, renderer.xr.isPresenting ? renderer.xr.getCamera?.() || camera : camera);
  boardView.pulseMarkers(clock.elapsedTime);
  avatars.update(dt, renderer.xr.isPresenting ? renderer.xr.getCamera?.() || camera : camera);
  if (renderer.xr.isPresenting) {
    help.attach(renderer.xr.getCamera?.() || camera);
    updateGrabs();
    handles.update(dt, renderer.xr.getCamera?.() || camera, sourcePos);
  } else {
    help.attach(camera);
  }
  hoverPickables();
  syncSpotOverlay();
  renderer.render(scene, camera);
});

updateVRButton();

function startGame() {
  game = new Game({ playerCount, solo });
  intent = null;
  modalOpen = false;
  trayScreen = 'actions';
  tradeGive = null;
  tradeGet = null;
  discardGive = emptyHand();
  discardKey = '';
  plentyPicks = [];
  boardView.rebuild(game.board);
  boardView.syncPieces(game);
  avatars.rebuild(game.players);
  production.clear();
  dice.placeFor(game.current, game.playerCount);
  const start = document.getElementById('start-screen');
  start.classList.add('hidden');
  start.hidden = true;
  start.setAttribute('inert', '');
  document.getElementById('hud').classList.remove('hidden');
  refresh();
  afterAction();
}

function humanCanAct() {
  if (!game || busy) return false;
  if (modalOpen && game.phase !== PHASE.STEAL) return false;
  if (game.phase === PHASE.DISCARD) return game.discardQueue.some((d) => !game.player(d.player).isAI);
  return game.isHuman();
}

function currentIntent() {
  if (!game) return null;
  if (game.phase === PHASE.SETUP_SETTLEMENT) return 'settlement';
  if (game.phase === PHASE.SETUP_ROAD || game.phase === PHASE.FREE_ROADS) return 'road';
  if (game.phase === PHASE.ROBBER) return 'robber';
  return intent;
}

function refresh() {
  if (!game) return;
  boardView.syncPieces(game);
  renderHud(game, currentIntent());
  updateHighlights();
  const disc = humanDiscardEntry();
  tray.setResources((disc ? game.player(disc.player) : viewPlayer(game)).resources);
  syncTrayButtons();
  applyPanelStatus();
  avatars.setCurrent(game.current);
  avatars.setStealTargets(game.phase === PHASE.STEAL && game.isHuman() ? game.stealCandidates : null);
  dice.placeFor(game.current, game.playerCount);
}

function trayButtons() {
  if (!game) return [{ label: 'Settings', action: 'settings' }];
  const can = game.isHuman() && !busy;
  const playable = can && game.playableCards(game.current).length > 0;
  return [
    { label: 'Roll', action: 'roll', disabled: !(can && game.phase === PHASE.ROLL) },
    { label: 'Road', action: 'road', disabled: !(can && ((game.phase === PHASE.MAIN && game.canAfford(game.current, 'road')) || game.phase === PHASE.FREE_ROADS)) },
    { label: 'Settle', action: 'settlement', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'City', action: 'city', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Dev', action: 'cards', disabled: !((can && game.phase === PHASE.MAIN) || playable) },
    { label: 'Trade', action: 'trade', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'End Turn', action: 'end', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Settings', action: 'settings' },
  ];
}

function stealButtons() {
  return game.stealCandidates.map((id) => {
    const p = game.player(id);
    return { label: p.name, action: `steal:${id}`, color: p.color };
  });
}

function settingsButtons() {
  return [
    { label: passthroughOn ? 'Passthrough ON' : 'Passthrough OFF', action: 'passthrough', on: passthroughOn },
    { label: handlesOn ? 'Handles ON' : 'Handles OFF', action: 'handles', on: handlesOn },
    { label: 'Restart game', action: 'restart' },
    { label: 'Back', action: 'settingsBack' },
  ];
}

function cardButtons() {
  const can = game.isHuman() && !busy;
  const playable = game.playableCards(game.current);
  return [
    {
      label: 'Buy card',
      action: 'dev',
      disabled: !(can && game.phase === PHASE.MAIN && game.canAfford(game.current, 'dev') && game.devDeck.length),
    },
    ...playable.map((c) => ({
      label: DEV_NAMES[c.type] || c.type,
      action: `playDev:${c.id}`,
    })),
    { label: 'Back', action: 'cardsBack' },
  ];
}

function tradeButtons() {
  const p = viewPlayer(game);
  return [
    ...RESOURCES.map((r) => {
      const rate = game.tradeRate(p, r);
      return {
        label: RESOURCE_LABEL[r],
        action: `give:${r}`,
        color: RESOURCE_COLOR[r],
        selected: tradeGive === r,
        disabled: p.resources[r] < rate,
      };
    }),
    ...RESOURCES.map((r) => ({
      label: RESOURCE_LABEL[r],
      action: `get:${r}`,
      color: RESOURCE_COLOR[r],
      selected: tradeGet === r,
      disabled: r === tradeGive || game.bank[r] < 1,
    })),
    {
      label: tradeGive ? `Trade ${game.tradeRate(p, tradeGive)}:1` : 'Trade',
      action: 'tradeGo',
      disabled: !(
        tradeGive
        && tradeGet
        && tradeGive !== tradeGet
        && p.resources[tradeGive] >= game.tradeRate(p, tradeGive)
        && game.bank[tradeGet] >= 1
      ),
    },
    { label: 'Cancel', action: 'tradeCancel' },
  ];
}

function discardButtons() {
  const entry = ensureDiscardState();
  if (!entry) return [{ label: 'Waiting', action: 'discardGo', disabled: true }];
  const p = game.player(entry.player);
  const n = RESOURCES.reduce((s, r) => s + (discardGive[r] || 0), 0);
  return [
    ...RESOURCES.map((r) => ({
      label: `${RESOURCE_LABEL[r]} ${discardGive[r]}/${p.resources[r]}`,
      action: `discard:${r}`,
      color: RESOURCE_COLOR[r],
      disabled: !p.resources[r] || discardGive[r] >= p.resources[r] || n >= entry.must,
    })),
    { label: n === entry.must ? 'Discard' : `Discard ${n}/${entry.must}`, action: 'discardGo', disabled: n !== entry.must },
    { label: 'Clear', action: 'discardClear', disabled: n === 0 },
  ];
}

function plentyButtons() {
  return RESOURCES.map((r) => ({
    label: RESOURCE_LABEL[r],
    action: `plenty:${r}`,
    color: RESOURCE_COLOR[r],
    selected: plentyPicks.includes(r),
  }));
}

function monopolyButtons() {
  return RESOURCES.map((r) => ({
    label: RESOURCE_LABEL[r],
    action: `mono:${r}`,
    color: RESOURCE_COLOR[r],
  }));
}

function winButtons() {
  return [
    { label: 'New island', action: 'restart' },
    { label: 'Settings', action: 'settings' },
  ];
}

function humanDiscardEntry() {
  if (!game) return null;
  return game.discardQueue.find((d) => !game.player(d.player).isAI) || null;
}

function ensureDiscardState() {
  const entry = humanDiscardEntry();
  const key = entry ? `${entry.player}:${entry.must}` : '';
  if (key !== discardKey) {
    discardKey = key;
    discardGive = emptyHand();
  }
  return entry;
}

function panelStatus() {
  if (trayScreen === 'trade' && game) {
    const p = viewPlayer(game);
    if (!tradeGive) return `${p.name} · Pick a resource to give, then one to get`;
    const rate = game.tradeRate(p, tradeGive);
    const giveLabel = `${rate} ${RESOURCE_LABEL[tradeGive]}`;
    if (!tradeGet) return `${p.name} · Give ${giveLabel} — pick what to get`;
    return `${p.name} · Give ${giveLabel} for ${RESOURCE_LABEL[tradeGet]}`;
  }
  if (trayScreen === 'cards' && game) {
    return `${game.player().name} · Play a card or buy one`;
  }
  const entry = game?.phase === PHASE.DISCARD ? humanDiscardEntry() : null;
  if (entry) {
    const n = RESOURCES.reduce((s, r) => s + (discardGive[r] || 0), 0);
    const p = game.player(entry.player);
    const roll = formatRollResult(game);
    const line = `${p.name} · discard ${n} / ${entry.must} on the panel`;
    return roll ? `${roll.diceLine}\n${line}` : line;
  }
  if (game?.phase === PHASE.PLENTY && game.isHuman()) {
    const names = plentyPicks.map((r) => RESOURCE_LABEL[r]).join(', ');
    return names
      ? `${game.player().name} · Picked ${names} (${plentyPicks.length}/2)`
      : `${game.player().name} · Pick two resources on the panel`;
  }
  if (game?.phase === PHASE.MONOPOLY && game.isHuman()) {
    return `${game.player().name} · Name a resource on the panel`;
  }
  return game ? trayStatus(game) : '';
}

function applyPanelStatus() {
  if (!game) {
    tray.setStatus('');
    return;
  }
  const status = panelStatus();
  const roll = formatRollResult(game);
  tray.setStatus(status);
  help.set(roll ? roll.banner : status);
}

function syncTrayButtons() {
  if (!game) {
    tray.setButtons(trayButtons(), 'actions');
    return;
  }
  if (game.phase !== PHASE.MAIN && trayScreen === 'trade') trayScreen = 'actions';
  if (![PHASE.MAIN, PHASE.ROLL].includes(game.phase) && trayScreen === 'cards') trayScreen = 'actions';

  if (game.phase === PHASE.STEAL && game.isHuman()) {
    tray.setButtons(stealButtons(), 'steal');
    return;
  }
  if (game.phase === PHASE.DISCARD && humanDiscardEntry()) {
    tray.setButtons(discardButtons(), 'discard');
    return;
  }
  if (game.phase === PHASE.PLENTY && game.isHuman()) {
    tray.setButtons(plentyButtons(), 'plenty');
    return;
  }
  if (game.phase === PHASE.MONOPOLY && game.isHuman()) {
    tray.setButtons(monopolyButtons(), 'monopoly');
    return;
  }
  if (trayScreen === 'settings') {
    tray.setButtons(settingsButtons(), 'settings');
    return;
  }
  if (game.phase === PHASE.GAME_OVER) {
    tray.setButtons(winButtons(), 'win');
    return;
  }
  if (trayScreen === 'trade') {
    tray.setButtons(tradeButtons(), 'trade');
    return;
  }
  if (trayScreen === 'cards') {
    tray.setButtons(cardButtons(), 'cards');
    return;
  }
  tray.setButtons(trayButtons(), 'actions');
}

function runTraySettings(act) {
  if (act === 'settings') trayScreen = 'settings';
  else if (act === 'settingsBack') trayScreen = 'actions';
  else if (act === 'passthrough') setPassthrough(!passthroughOn);
  else if (act === 'handles') {
    handlesOn = !handlesOn;
    applyHandleVisibility();
  } else if (act === 'restart') {
    trayScreen = 'actions';
    document.getElementById('new-game-btn').click();
  }
  syncTrayButtons();
  applyPanelStatus();
  sfx.click();
}

function openTradeUi() {
  trayScreen = 'trade';
  tradeGive = null;
  tradeGet = null;
  modalOpen = true;
  syncTrayButtons();
  applyPanelStatus();
  if (preferTrayUi()) return;
  showTrade(game, (give, get) => {
    modalOpen = false;
    trayScreen = 'actions';
    tradeGive = tradeGet = null;
    if (!give || !get) {
      refresh();
      return;
    }
    game.bankTrade(viewPlayer(game).id, give, get);
    afterAction();
  });
}

function closeTradeUi() {
  tradeGive = tradeGet = null;
  trayScreen = 'actions';
  modalOpen = false;
  closeModal();
  syncTrayButtons();
  applyPanelStatus();
  sfx.click();
}

function confirmTrade() {
  if (busy || !tradeGive || !tradeGet) return;
  if (!game.bankTrade(viewPlayer(game).id, tradeGive, tradeGet)) {
    showToast('Cannot make that trade.');
    return;
  }
  tradeGive = tradeGet = null;
  trayScreen = 'actions';
  modalOpen = false;
  closeModal();
  sfx.click();
  afterAction();
}

function tapDiscard(r) {
  if (busy) return;
  const entry = ensureDiscardState();
  if (!entry) return;
  const p = game.player(entry.player);
  const n = RESOURCES.reduce((s, x) => s + (discardGive[x] || 0), 0);
  if (discardGive[r] >= p.resources[r] || n >= entry.must) return;
  discardGive[r] += 1;
  syncTrayButtons();
  applyPanelStatus();
  tray.setResources(p.resources);
  sfx.click();
}

function confirmDiscard() {
  if (busy) return;
  const entry = ensureDiscardState();
  if (!entry) return;
  const n = RESOURCES.reduce((s, r) => s + (discardGive[r] || 0), 0);
  if (n !== entry.must) return;
  if (!game.discard(entry.player, { ...discardGive })) return;
  discardGive = emptyHand();
  discardKey = '';
  modalOpen = false;
  closeModal();
  sfx.click();
  afterAction();
}

function tapPlenty(r) {
  if (busy || !game || game.phase !== PHASE.PLENTY || !game.isHuman()) return;
  plentyPicks.push(r);
  if (plentyPicks.length >= 2) {
    const [a, b] = plentyPicks;
    plentyPicks = [];
    if (!game.yearOfPlenty(a, b)) return;
    modalOpen = false;
    closeModal();
    sfx.click();
    afterAction();
    return;
  }
  syncTrayButtons();
  applyPanelStatus();
  sfx.click();
}

function confirmMonopoly(r) {
  if (busy || !game || game.phase !== PHASE.MONOPOLY || !game.isHuman()) return;
  if (!game.monopoly(r)) return;
  modalOpen = false;
  closeModal();
  sfx.click();
  afterAction();
}

function handleTrayAction(act) {
  if (TRAY_SETTINGS.has(act)) {
    runTraySettings(act);
    return true;
  }
  if (act === 'cards') {
    trayScreen = 'cards';
    syncTrayButtons();
    applyPanelStatus();
    sfx.click();
    return true;
  }
  if (act === 'cardsBack') {
    trayScreen = 'actions';
    syncTrayButtons();
    applyPanelStatus();
    sfx.click();
    return true;
  }
  if (act === 'tradeCancel') {
    closeTradeUi();
    return true;
  }
  if (act === 'tradeGo') {
    confirmTrade();
    return true;
  }
  const giveRes = actionArg(act, 'give:');
  if (giveRes) {
    if (!busy) {
      tradeGive = giveRes;
      if (tradeGet === giveRes) tradeGet = null;
      syncTrayButtons();
      applyPanelStatus();
      sfx.click();
    }
    return true;
  }
  const getRes = actionArg(act, 'get:');
  if (getRes) {
    if (!busy) {
      tradeGet = getRes;
      syncTrayButtons();
      applyPanelStatus();
      sfx.click();
    }
    return true;
  }
  const discRes = actionArg(act, 'discard:');
  if (discRes) {
    tapDiscard(discRes);
    return true;
  }
  if (act === 'discardGo') {
    confirmDiscard();
    return true;
  }
  if (act === 'discardClear') {
    if (!busy) {
      discardGive = emptyHand();
      syncTrayButtons();
      applyPanelStatus();
      sfx.click();
    }
    return true;
  }
  const plentyRes = actionArg(act, 'plenty:');
  if (plentyRes) {
    tapPlenty(plentyRes);
    return true;
  }
  const monoRes = actionArg(act, 'mono:');
  if (monoRes) {
    confirmMonopoly(monoRes);
    return true;
  }
  const devId = actionArg(act, 'playDev:');
  if (devId != null) {
    trayScreen = 'actions';
    runHudAction('playDev', devId);
    return true;
  }
  const stealId = stealActionId(act);
  if (stealId != null) {
    trySteal(stealId);
    return true;
  }
  return false;
}

function updateHighlights() {
  if (!game || !game.isHuman()) {
    boardView.clearHighlights();
    return;
  }
  const pid = game.current;
  const mode = currentIntent();
  if (mode === 'settlement') {
    const setup = game.phase === PHASE.SETUP_SETTLEMENT;
    boardView.showVertices(game.validSettlements(pid, { setup }));
    boardView.showEdges([]);
    boardView.showHexes([]);
  } else if (mode === 'city') {
    boardView.showVertices(game.validCities(pid));
    boardView.showEdges([]);
    boardView.showHexes([]);
  } else if (mode === 'road') {
    boardView.showVertices([]);
    boardView.showEdges(game.validRoads(pid, { setup: game.phase === PHASE.SETUP_ROAD, free: game.phase === PHASE.FREE_ROADS }));
    boardView.showHexes([]);
  } else if (mode === 'robber') {
    boardView.showVertices([]);
    boardView.showEdges([]);
    boardView.showHexes(game.board.land.filter((h) => h.id !== game.board.robberHex).map((h) => h.id));
  } else if (game.phase === PHASE.MAIN) {
    const verts = [];
    if (game.canAfford(pid, 'settlement')) verts.push(...game.validSettlements(pid));
    if (game.canAfford(pid, 'city')) verts.push(...game.validCities(pid));
    boardView.showVertices(verts);
    boardView.showEdges(game.canAfford(pid, 'road') ? game.validRoads(pid) : []);
    boardView.showHexes([]);
  } else {
    boardView.clearHighlights();
  }
}

function controllerYaw(controller) {
  _ctrlQuat.setFromRotationMatrix(controller.matrixWorld);
  _ctrlEuler.setFromQuaternion(_ctrlQuat, 'YXZ');
  return _ctrlEuler.y;
}

function sourcePos(source, out = _ctrlPos) {
  const tip = source.joints?.['index-finger-tip'];
  if (tip) tip.getWorldPosition(out);
  else source.getWorldPosition(out);
  return out;
}

function nearestFreeHandle(source, maxDist = 0.16) {
  sourcePos(source, _ctrlPos);
  let best = null;
  let bestD = maxDist;
  for (const h of [handles.left, handles.right]) {
    if (handles.isStuck(h)) continue;
    const d = _ctrlPos.distanceTo(h.position);
    if (d < bestD) {
      bestD = d;
      best = h;
    }
  }
  return best;
}

function tryGrab(source) {
  if (grabs.has(source)) return true;
  let root = nearestFreeHandle(source);
  if (!root) {
    const origin = new THREE.Vector3().setFromMatrixPosition(source.matrixWorld);
    const dir = new THREE.Vector3(0, 0, -1).transformDirection(source.matrixWorld);
    raycaster.set(origin, dir);
    const hits = raycaster.intersectObjects(handles.pickables(), true);
    root = hits[0]?.object?.userData?.handleRoot;
    if (root && handles.isStuck(root)) root = null;
  }
  if (!root) return false;
  sourcePos(source, _ctrlPos);
  grabs.set(source, {
    handle: root,
    offset: stage.position.clone().sub(_ctrlPos),
    yaw0: controllerYaw(source),
    stageYaw0: stage.rotation.y,
  });
  handles.stick(root, source);
  twoHand = grabs.size === 2 ? captureTwoHand() : null;
  sfx.click();
  return true;
}

function captureTwoHand() {
  const [c0, c1] = grabs.keys();
  sourcePos(c0, _handA);
  sourcePos(c1, _handB);
  return {
    startDist: Math.max(0.08, _handA.distanceTo(_handB)),
    startScale: stage.scale.x,
    startYaw: Math.atan2(_handB.x - _handA.x, _handB.z - _handA.z),
    startStageYaw: stage.rotation.y,
    startMid: _handA.clone().add(_handB).multiplyScalar(0.5),
    startPos: stage.position.clone(),
  };
}

function releaseGrab(source) {
  const held = grabs.get(source);
  if (held) handles.unstick(held.handle);
  grabs.delete(source);
  twoHand = null;
  if (grabs.size === 1) {
    const [c, grab] = grabs.entries().next().value;
    sourcePos(c, _ctrlPos);
    grab.offset = stage.position.clone().sub(_ctrlPos);
    grab.yaw0 = controllerYaw(c);
    grab.stageYaw0 = stage.rotation.y;
  }
}

function updateGrabs() {
  if (grabs.size === 2) {
    if (!twoHand) twoHand = captureTwoHand();
    const [c0, c1] = grabs.keys();
    sourcePos(c0, _handA);
    sourcePos(c1, _handB);
    const dist = Math.max(0.08, _handA.distanceTo(_handB));
    const yaw = Math.atan2(_handB.x - _handA.x, _handB.z - _handA.z);
    const dyaw = yaw - twoHand.startYaw;
    const s = Math.min(2.4, Math.max(0.45, twoHand.startScale * (dist / twoHand.startDist)));
    const scaleRatio = s / twoHand.startScale;
    stage.scale.setScalar(s);
    stage.rotation.y = twoHand.startStageYaw + dyaw;
    _mid.copy(_handA).add(_handB).multiplyScalar(0.5);
    _offset.copy(twoHand.startPos).sub(twoHand.startMid).multiplyScalar(scaleRatio).applyAxisAngle(_yAxis, dyaw);
    stage.position.copy(_mid).add(_offset);
    return;
  }
  for (const [source, grab] of grabs) {
    sourcePos(source, _ctrlPos);
    const dyaw = controllerYaw(source) - grab.yaw0;
    _offset.copy(grab.offset).applyAxisAngle(_yAxis, dyaw);
    stage.position.copy(_ctrlPos).add(_offset);
    stage.rotation.y = grab.stageYaw0 + dyaw;
  }
}

function syncSpotOverlay() {
  const layer = document.getElementById('spot-layer');
  if (!layer) return;
  const xr = renderer.xr.isPresenting;
  for (const m of boardView.vertexMarkers.values()) {
    for (const child of m.children) child.visible = xr && m.visible;
  }
  if (!game || xr) {
    if (layer.childElementCount) layer.replaceChildren();
    return;
  }
  const needed = [];
  for (const [id, m] of boardView.vertexMarkers) {
    if (m.visible) needed.push([id, m]);
  }
  if (layer.childElementCount !== needed.length) {
    layer.replaceChildren(
      ...needed.map(([id]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'spot';
        b.dataset.vertex = id;
        b.setAttribute('aria-label', 'Place here');
        return b;
      }),
    );
  }
  const w = innerWidth;
  const h = innerHeight;
  const kids = layer.children;
  for (let i = 0; i < needed.length; i++) {
    const [id, m] = needed[i];
    m.getWorldPosition(_spotPos);
    _spotPos.project(camera);
    const el = kids[i];
    if (el.dataset.vertex !== id) el.dataset.vertex = id;
    const onScreen = _spotPos.z > -1 && _spotPos.z < 1 && Math.abs(_spotPos.x) <= 1.2 && Math.abs(_spotPos.y) <= 1.2;
    el.style.display = onScreen ? 'block' : 'none';
    el.style.transform = `translate(${_spotPos.x * 0.5 * w + w * 0.5 - 9}px, ${-_spotPos.y * 0.5 * h + h * 0.5 - 9}px)`;
  }
}

function pickables() {
  const list = [...handles.pickables(), ...tray.pickables(), ...avatars.pickables()];
  for (const m of boardView.vertexMarkers.values()) if (m.visible) list.push(m);
  for (const m of boardView.edgeMarkers.values()) if (m.visible && m.material.opacity > 0) list.push(m);
  for (const m of boardView.hexMarkers.values()) if (m.visible && m.material.opacity > 0) list.push(m);
  if (game && currentIntent() === 'robber') {
    for (const m of boardView.hexMeshes.values()) list.push(m);
    for (const m of boardView.tokenMeshes.values()) list.push(m);
  }
  return list;
}

function stealActionId(action) {
  if (typeof action !== 'string' || !action.startsWith('steal:')) return null;
  return Number(action.slice(6));
}

function trySteal(fromId) {
  if (!game || busy || game.phase !== PHASE.STEAL || !game.isHuman()) return false;
  if (!game.steal(Number(fromId))) return false;
  closeModal();
  modalOpen = false;
  sfx.click();
  afterAction();
  return true;
}

function applyHit(obj) {
  if (!obj) return;
  const data = obj.userData;
  if (data.kind === 'tray') {
    if (data.disabled && !TRAY_SETTINGS.has(data.action)) return;
    tray.flashPress(data.action);
    if (handleTrayAction(data.action)) return;
    if (!game || data.disabled) return;
    runHudAction(data.action);
    return;
  }
  if (data.kind === 'avatar') {
    trySteal(data.id);
    return;
  }
  if (!game) return;
  if (!humanCanAct()) return;
  if (data.kind === 'vertex') {
    const mode = currentIntent();
    const ok = mode === 'city'
      ? game.placeCity(data.id)
      : mode === 'settlement'
        ? game.placeSettlement(data.id)
        : game.placeCity(data.id) || game.placeSettlement(data.id);
    if (!ok) return;
    sfx.place();
    intent = null;
    afterAction();
  } else if (data.kind === 'edge') {
    if (!game.placeRoad(data.id)) return;
    sfx.place();
    intent = null;
    afterAction();
  } else if (data.kind === 'hex') {
    if (!game.moveRobber(data.id)) return;
    sfx.place();
    if (game.phase !== PHASE.STEAL) showToast('No neighbor to steal from.');
    afterAction();
  }
}

function resolvePick(hits) {
  if (!hits.length) return null;
  const trayHit = hits.find((h) => h.object.userData?.kind === 'tray');
  if (trayHit) return trayHit.object;
  const avatarHit = hits.find((h) => h.object.userData?.kind === 'avatar');
  if (avatarHit) return avatarHit.object;
  const handleHit = hits.find((h) => h.object.userData?.handleRoot);
  if (handleHit) return handleHit.object;
  return hits[0].object;
}

function pickFromCamera() {
  raycaster.setFromCamera(pointer, camera);
  applyHit(resolvePick(raycaster.intersectObjects(pickables(), true)));
}

function hoverFromRay(origin, dir) {
  raycaster.set(origin, dir);
  return resolvePick(raycaster.intersectObjects(pickables(), true));
}

function hoverPickables() {
  let obj = null;
  if (renderer.xr.isPresenting) {
    const origin = new THREE.Vector3();
    const dir = new THREE.Vector3();
    for (const c of xrControllers) {
      origin.setFromMatrixPosition(c.matrixWorld);
      dir.set(0, 0, -1).transformDirection(c.matrixWorld);
      const hit = hoverFromRay(origin, dir);
      if (hit?.userData?.kind === 'tray' || hit?.userData?.handleRoot) {
        obj = hit;
        break;
      }
      if (hit && !obj) obj = hit;
    }
  } else {
    raycaster.setFromCamera(pointer, camera);
    obj = resolvePick(raycaster.intersectObjects(pickables(), true));
  }
  tray.setHover(obj);
  handles.setHover(obj);
  avatars.setHover(obj);
}

function setupXR() {
  const factory = new XRControllerModelFactory();
  const handFactory = new XRHandModelFactory();
  handFactory.setPath('https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles');
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffe6b0 });
  const controllers = [0, 1].map((i) => {
    const controller = renderer.xr.getController(i);
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -4)]);
    controller.add(new THREE.Line(geo, lineMat));
    controller.addEventListener('selectstart', () => {
      tryGrab(controller);
      if (grabs.has(controller)) return;
      const origin = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
      const dir = new THREE.Vector3(0, 0, -1).transformDirection(controller.matrixWorld);
      const hit = hoverFromRay(origin, dir);
      if (hit?.userData?.kind === 'tray' && !hit.userData.disabled) tray.setPressed(hit.userData.action);
    });
    controller.addEventListener('selectend', () => {
      releaseGrab(controller);
    });
    controller.addEventListener('select', () => {
      if (grabs.has(controller)) return;
      const origin = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
      const dir = new THREE.Vector3(0, 0, -1).transformDirection(controller.matrixWorld);
      raycaster.set(origin, dir);
      applyHit(resolvePick(raycaster.intersectObjects(pickables(), true)));
    });
    controller.addEventListener('squeezestart', () => {
      if (tryGrab(controller)) return;
      if (game?.phase === PHASE.MAIN && game.isHuman() && !busy) runHudAction('end');
    });
    controller.addEventListener('squeezeend', () => {
      releaseGrab(controller);
    });
    scene.add(controller);
    const grip = renderer.xr.getControllerGrip(i);
    grip.add(factory.createControllerModel(grip));
    scene.add(grip);
    const hand = renderer.xr.getHand(i);
    hand.add(handFactory.createHandModel(hand, 'mesh'));
    hand.addEventListener('pinchstart', () => {
      if (tryGrab(hand)) return;
      const origin = new THREE.Vector3().setFromMatrixPosition(hand.matrixWorld);
      const tip = hand.joints?.['index-finger-tip'];
      if (tip) tip.getWorldPosition(origin);
      const dir = new THREE.Vector3(0, 0, -1).transformDirection(hand.matrixWorld);
      raycaster.set(origin, dir);
      applyHit(resolvePick(raycaster.intersectObjects(pickables(), true)));
    });
    hand.addEventListener('pinchend', () => releaseGrab(hand));
    scene.add(hand);
    return controller;
  });
  return controllers;
}

function setPassthrough(on) {
  passthroughOn = !!on;
  world.room.visible = !passthroughOn;
  scene.background = passthroughOn ? null : ROOM_BG;
  scene.fog = passthroughOn ? null : new THREE.Fog('#1b140f', 6, 12);
  renderer.setClearColor(passthroughOn ? 0x000000 : 0x1b140f, passthroughOn ? 0 : 1);
}

function applyHandleVisibility() {
  handles.setVisible(handlesOn && renderer.xr.isPresenting);
}

async function requestXRSession(mode, hud) {
  const withOverlay = {
    requiredFeatures: ['local-floor'],
    optionalFeatures: ['bounded-floor', 'hand-tracking', 'dom-overlay', 'unbounded', 'hit-test', 'plane-detection'],
    domOverlay: { root: hud },
  };
  const lite = {
    optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'unbounded'],
  };
  try {
    return await navigator.xr.requestSession(mode, withOverlay);
  } catch {
    return navigator.xr.requestSession(mode, lite);
  }
}

async function enterVR() {
  sfx.unlock();
  if (!navigator.xr) {
    showToast('WebXR is not available in this browser.');
    return;
  }
  const hud = document.getElementById('hud');
  const arOk = await navigator.xr.isSessionSupported?.('immersive-ar');
  const vrOk = await navigator.xr.isSessionSupported?.('immersive-vr');
  try {
    let session = null;
    let passthrough = false;
    if (arOk) {
      try {
        session = await requestXRSession('immersive-ar', hud);
        passthrough = true;
      } catch {
        session = null;
      }
    }
    if (!session && vrOk) session = await requestXRSession('immersive-vr', hud);
    if (!session) {
      showToast('This browser has no AR or VR session.');
      return;
    }
    renderer.xr.setReferenceSpaceType('local-floor');
    setPassthrough(passthrough);
    handles.setVisible(handlesOn);
    document.documentElement.classList.add('xr-presenting');
    closeModal();
    syncTrayButtons();
    applyPanelStatus();
    await renderer.xr.setSession(session);
    session.addEventListener('end', () => {
      grabs.clear();
      handles.setVisible(false);
      setPassthrough(false);
      document.documentElement.classList.remove('xr-presenting');
      if (trayScreen === 'settings') syncTrayButtons();
      updateVRButton();
    });
  } catch {
    showToast('Could not start a mixed-reality session.');
    handles.setVisible(false);
    setPassthrough(false);
    document.documentElement.classList.remove('xr-presenting');
  }
}

async function updateVRButton() {
  const btn = document.getElementById('vr-btn');
  const arOk = navigator.xr && (await navigator.xr.isSessionSupported?.('immersive-ar'));
  const vrOk = navigator.xr && (await navigator.xr.isSessionSupported?.('immersive-vr'));
  if (arOk) {
    btn.textContent = 'Enter MR';
    btn.disabled = false;
  } else if (vrOk) {
    btn.textContent = 'Enter VR';
    btn.disabled = false;
  } else {
    btn.textContent = 'MR unavailable';
    btn.disabled = true;
  }
}

function needsAI() {
  if (!game || game.phase === PHASE.GAME_OVER) return false;
  if (game.phase === PHASE.DISCARD) return game.discardQueue.some((d) => game.player(d.player).isAI);
  return game.player().isAI;
}

async function afterAction() {
  refresh();
  try {
    await pumpAI();
  } finally {
    refresh();
    presentModals();
  }
}

function flushAIDiscards() {
  if (!game || game.phase !== PHASE.DISCARD) return;
  let n = 0;
  while (game.discardQueue.some((d) => game.player(d.player).isAI) && n++ < 8) {
    if (!takeAITurn(game)) break;
  }
}

async function pumpAI() {
  if (!game) return;
  busy = true;
  try {
    flushAIDiscards();
    let guard = 0;
    let seenRoll = null;
    while (needsAI() && guard++ < 80) {
      await sleep(game.phase === PHASE.MAIN || game.phase === PHASE.ROLL ? 700 : 220);
      const ok = takeAITurn(game);
      const action = game.lastAction;
      if (action?.type === 'roll' && action !== seenRoll) {
        seenRoll = action;
        dice.placeFor(game.current, game.playerCount);
        dice.rollTo(game.dice);
        sfx.dice();
        if (action.production?.length) playProduction(action.production);
        flushAIDiscards();
        refresh();
        const waitMs = action.production?.length
          ? Math.min(4500, Math.max(750, Math.ceil(production.timeLeft() * 1000)))
          : 650;
        await sleep(waitMs);
      } else {
        flushAIDiscards();
        refresh();
      }
      if (!ok) break;
    }
  } finally {
    busy = false;
  }
}

function presentModals() {
  if (!game) return;
  const trayOnly = preferTrayUi();
  if (game.phase === PHASE.GAME_OVER) {
    sfx.win();
    modalOpen = true;
    if (!trayOnly) showWin(game);
    syncTrayButtons();
    applyPanelStatus();
    return;
  }
  if (game.phase === PHASE.DISCARD && humanDiscardEntry()) {
    modalOpen = true;
    ensureDiscardState();
    if (!trayOnly) {
      const opened = showDiscard(game, (id, give) => {
        modalOpen = false;
        discardGive = emptyHand();
        discardKey = '';
        game.discard(id, give);
        afterAction();
      });
      if (!opened) modalOpen = false;
    }
    syncTrayButtons();
    applyPanelStatus();
    return;
  }
  if (game.phase === PHASE.STEAL && game.isHuman()) {
    modalOpen = true;
    if (!trayOnly) {
      showSteal(game, (id) => {
        trySteal(id);
      });
    }
    return;
  }
  if (game.phase === PHASE.PLENTY && game.isHuman()) {
    modalOpen = true;
    plentyPicks = [];
    if (!trayOnly) {
      showPlenty((a, b) => {
        modalOpen = false;
        plentyPicks = [];
        game.yearOfPlenty(a, b);
        afterAction();
      });
    }
    syncTrayButtons();
    applyPanelStatus();
    return;
  }
  if (game.phase === PHASE.MONOPOLY && game.isHuman()) {
    modalOpen = true;
    if (!trayOnly) {
      showMonopoly((r) => {
        modalOpen = false;
        game.monopoly(r);
        afterAction();
      });
    }
    syncTrayButtons();
    applyPanelStatus();
  }
}

function onResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

function playProduction(events) {
  const list = events ?? (game?.lastAction?.type === 'roll' ? game.lastAction.production : null);
  if (!game || !list?.length) return;
  production.play(list, {
    board: game.board,
    players: game.players,
    playerCount: game.playerCount,
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

window.__catan = {
  get game() {
    return game;
  },
  get tray() {
    return tray;
  },
  get trayScreen() {
    return trayScreen;
  },
  afterAction,
  refresh,
  presentModals,
  trySteal,
  formatRollResult,
};
