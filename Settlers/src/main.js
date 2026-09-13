import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { Game } from './game/Game.js';
import { takeAITurn } from './game/ai.js';
import { PHASE, RESOURCES, RESOURCE_LABEL, RESOURCE_COLOR, DEV_TYPES, BUILD_COST, formatCost, TABLE_HEIGHT, normalizeResource } from './game/constants.js';
import { createWorld } from './gfx/world.js';
import { BoardView } from './gfx/boardView.js';
import { DicePair, Tray, BoardHandles, HelpBanner } from './gfx/props.js';
import { PlayerAvatars } from './gfx/avatars.js';
import { ProductionFlights } from './gfx/production.js';
import { FloatLabels, STEAL_FLOAT_LIFE } from './gfx/floatText.js';
import {
  renderHud,
  bindHud,
  showToast,
  TOAST_LONG_MS,
  trayStatus,
  formatRollResult,
  formatStealResult,
  formatTradeResult,
  showDiscard,
  showSteal,
  showTrade,
  showPlenty,
  showMonopoly,
  showWin,
  showScores,
  showRestartConfirm,
  showSettings,
  showPointerTilt,
  closeModal,
  viewPlayer,
  scoreRows,
} from './ui.js';
import { sfx } from './audio.js';
import { QUALITY, applyShadowMap, shadowType } from './gfx/quality.js';

let antialiasOn = QUALITY.antialias;
try {
  const storedAa = localStorage.getItem('catan-antialias');
  if (storedAa === '1') antialiasOn = true;
  else if (storedAa === '0') antialiasOn = false;
} catch { /* ignore */ }
QUALITY.antialias = antialiasOn;

const xrGlAttrs = { antialias: antialiasOn };
function patchGlAntialiasAttr() {
  const wrap = (proto) => {
    if (!proto?.getContextAttributes || proto.getContextAttributes.__catanAa) return;
    const orig = proto.getContextAttributes;
    proto.getContextAttributes = function getContextAttributesAa() {
      const attrs = orig.call(this);
      if (!attrs) return attrs;
      Object.assign(xrGlAttrs, attrs, { antialias: antialiasOn });
      return xrGlAttrs;
    };
    proto.getContextAttributes.__catanAa = true;
  };
  wrap(WebGLRenderingContext.prototype);
  if (typeof WebGL2RenderingContext !== 'undefined') wrap(WebGL2RenderingContext.prototype);
}
patchGlAntialiasAttr();

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: antialiasOn, alpha: true });
renderer.setPixelRatio(QUALITY.pixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x1b140f, 1);
renderer.shadowMap.enabled = QUALITY.shadows;
renderer.shadowMap.type = shadowType();
renderer.xr.enabled = true;
renderer.xr.setFramebufferScaleFactor(QUALITY.framebufferScale);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const stage = new THREE.Group();
stage.name = 'stage';
const STAGE_FORWARD_Z = -1.32;
/** Preferred table-top drop below the headset (seated, in front of the player). */
const TABLE_BELOW_EYES = 0.4;
/** Hard cap: table top must never sit more than this far below the headset. */
const TABLE_BELOW_EYES_MAX = 0.5;
/** Treat near-origin viewer poses as untracked (identity / not ready). */
const XR_POSE_EPS = 0.05;
/** Wait up to ~1s (90fps) for a real headset pose before snapping anyway. */
const XR_SNAP_WAIT_FRAMES = 90;
stage.position.set(0, 0, STAGE_FORWARD_Z);
scene.add(stage);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.05, 30);
camera.position.set(0, 1.17, 0.62);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.57, STAGE_FORWARD_Z);
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
applyPresentingQuality(false);
const boardView = new BoardView(stage);
boardView.rebuild(new Game({ seed: 2026 }).board);
const dice = new DicePair(stage);
const tray = new Tray(stage);
const help = new HelpBanner(camera);
const gazeReticle = createGazeReticle();
const gazeHitDot = createGazeHitDot();
const avatars = new PlayerAvatars(stage);
const production = new ProductionFlights(stage);
const floatLabels = new FloatLabels(stage);
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
const _rayOrigin = new THREE.Vector3();
const _rayDir = new THREE.Vector3();
const _gazeRight = new THREE.Vector3();
const _hitN = new THREE.Vector3();
const grabs = new Map();
let twoHand = null;
let sawTransientPointer = false;
let xrSessionBound = null;
let xrRefSpaceType = 'local-floor';
let xrStageSnapPending = false;
let xrStageSnapTries = 0;
let xrStageUserMoved = false;
const xrEventGuard = { select: false, selectstart: false, selectend: false };
// Spectacles often double-fires one pinch (session select + controller/transient/gaze, or selectstart + select).
// visionOS may fire only one of those; both session and input-source events must be able to activate.
const XR_SELECT_DEBOUNCE_MS = 320;
let lastXRSelectAt = 0;
let lastXRHover = null;
const XR_CONTROLLER_SLOTS = 4;
// visionOS pinch is a transient-pointer; request it or look+pinch may never emit select.
const XR_OPTIONAL_FEATURES = ['local-floor', 'bounded-floor', 'hand-tracking', 'transient-pointer', 'unbounded'];
const LASER_MAX = 4;
const LASER_EPS = 0.003;
const GAZE_HIT_LIFT = 0.004;

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let pointerMode = 'controller';
try {
  const stored = localStorage.getItem('catan-pointer-mode');
  if (stored === 'gaze' || stored === 'controller') pointerMode = stored;
} catch { /* ignore */ }
const POINTER_TILT_STEP = 2;
const POINTER_TILT_MAX = 20;
let pointerPitchDeg = 0;
try {
  const storedTilt = localStorage.getItem('catan-pointer-tilt');
  if (storedTilt != null) pointerPitchDeg = clampPointerTilt(storedTilt);
} catch { /* ignore */ }
let pointerLinesOn = true;
try {
  const storedLines = localStorage.getItem('catan-pointer-lines');
  if (storedLines === '0') pointerLinesOn = false;
  else if (storedLines === '1') pointerLinesOn = true;
} catch { /* ignore */ }
const xrControllers = setupXR();
applyPointerVisuals();

let game = null;
applyWorldUiVisibility();
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
const TRAY_SETTINGS = new Set([
  'settings',
  'settingsBack',
  'passthrough',
  'handles',
  'restart',
  'restartAsk',
  'restartBack',
  'pointer',
  'pointerLines',
  'antialias',
  'pointerTilt',
  'pointerTiltUp',
  'pointerTiltDown',
  'pointerTiltBack',
]);
const BUILD_TRAY = new Set(['road', 'settlement', 'city', 'dev', 'cards']);
const _floatPos = new THREE.Vector3();
const DEV_NAMES = {
  [DEV_TYPES.KNIGHT]: 'Knight',
  [DEV_TYPES.ROAD]: 'Road Building',
  [DEV_TYPES.PLENTY]: 'Year of Plenty',
  [DEV_TYPES.MONOPOLY]: 'Monopoly',
};

function emptyHand() {
  return Object.fromEntries(RESOURCES.map((r) => [r, 0]));
}

function clampPointerTilt(n) {
  const v = Math.round(Number(n) / POINTER_TILT_STEP) * POINTER_TILT_STEP;
  if (!Number.isFinite(v)) return 0;
  return Math.max(-POINTER_TILT_MAX, Math.min(POINTER_TILT_MAX, v));
}

function formatPointerTilt() {
  return pointerPitchDeg > 0 ? `+${pointerPitchDeg}°` : `${pointerPitchDeg}°`;
}

function setPointerTilt(deg) {
  pointerPitchDeg = clampPointerTilt(deg);
  try {
    localStorage.setItem('catan-pointer-tilt', String(pointerPitchDeg));
  } catch { /* ignore */ }
}

function preferTrayUi() {
  return renderer.xr.isPresenting;
}

function applyWorldUiVisibility() {
  const xr = preferTrayUi();
  tray.setVisible(xr);
  if (!xr) help.mesh.visible = false;
  document.documentElement.classList.toggle('xr-presenting', xr);
  syncDesktopHud();
}

function syncDesktopHud() {
  const hud = document.getElementById('hud');
  const start = document.getElementById('start-screen');
  if (!hud || !start) return;
  if (game) {
    hud.classList.remove('hidden');
    start.classList.add('hidden');
    start.hidden = true;
    start.setAttribute('inert', '');
  } else {
    hud.classList.add('hidden');
    start.classList.remove('hidden');
    start.hidden = false;
    start.removeAttribute('inert');
  }
}

function actionArg(action, prefix) {
  if (typeof action !== 'string' || !action.startsWith(prefix)) return null;
  return action.slice(prefix.length);
}

function syncStartControls() {
  const counts = document.getElementById('player-count');
  if (counts) {
    for (const x of counts.children) x.classList.toggle('active', Number(x.dataset.count) === playerCount);
  }
  const modes = document.getElementById('play-mode');
  if (modes) {
    for (const x of modes.children) x.classList.toggle('active', (x.dataset.mode === 'solo') === solo);
  }
}

document.getElementById('player-count').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-count]');
  if (!b) return;
  playerCount = Number(b.dataset.count);
  syncStartControls();
  if (!game) syncTrayButtons();
});

document.getElementById('play-mode').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-mode]');
  if (!b) return;
  solo = b.dataset.mode === 'solo';
  syncStartControls();
  if (!game) syncTrayButtons();
});

document.getElementById('start-btn').addEventListener('click', () => {
  sfx.unlock();
  startGame();
});

document.getElementById('new-game-btn').addEventListener('click', () => {
  requestRestart({ fromHud: true });
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
  if (act === 'scores') {
    openScoresUi();
    return;
  }
  if (act === 'settings') {
    openSettingsUi();
    return;
  }
  if (act === 'failBuild') {
    if (!game) return;
    const why = extra === 'roll'
      ? rollFailReason()
      : extra === 'end'
        ? 'Finish your turn from the panel when it is Main.'
        : extra === 'trade'
          ? 'Bank trades are on your turn after rolling.'
          : trayBuildFail(extra);
    showBuildFail(why, { userData: { kind: 'tray', action: extra } });
    return;
  }
  if (!game || busy) return;
  if (act === 'steal') {
    trySteal(extra);
    return;
  }
  if (act === 'dev') {
    const pid = viewPlayer(game).id;
    if (!game.buyDev(pid)) {
      showBuildFail(game.whyNotDev(pid), { userData: { kind: 'tray', action: 'dev' } });
      return;
    }
    sfx.click();
    afterAction();
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
let hoverSpotId = null;
document.getElementById('spot-layer')?.addEventListener('pointerover', (e) => {
  const b = e.target.closest('[data-vertex]');
  hoverSpotId = b?.dataset.vertex ?? null;
});
document.getElementById('spot-layer')?.addEventListener('pointerout', (e) => {
  const b = e.target.closest('[data-vertex]');
  if (b && hoverSpotId === b.dataset.vertex) hoverSpotId = null;
});
document.getElementById('spot-layer')?.addEventListener('click', (e) => {
  const b = e.target.closest('[data-vertex]');
  if (!b) return;
  applyHit({ userData: { kind: 'vertex', id: b.dataset.vertex } });
});

renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  if (!renderer.xr.isPresenting) controls.update();
  dice.update(dt);
  const viewCam = renderer.xr.isPresenting ? renderer.xr.getCamera?.() || camera : camera;
  production.update(dt, viewCam);
  floatLabels.update(dt, viewCam);
  boardView.pulseMarkers(clock.elapsedTime);
  avatars.update(dt, renderer.xr.isPresenting ? renderer.xr.getCamera?.() || camera : camera);
  if (renderer.xr.isPresenting) {
    const xrCam = renderer.xr.getCamera?.() || camera;
    help.attach(xrCam);
    attachGazeReticle(xrCam);
    updateGrabs();
    maybeSnapStageToTable();
    handles.update(dt, xrCam, sourcePos);
  } else {
    help.mesh.visible = false;
    attachGazeReticle(camera);
  }
  hoverPickables();
  syncSpotOverlay();
  world.syncBoardLight(stage.scale.x);
  renderer.render(scene, camera);
});

applyWorldUiVisibility();
updateVRButton();

function startGame() {
  closeModal();
  // Keep the grabbed/snapped stage pose. Table-height snap is only for first XR
  // session start — restart / new island must not move, rotate, or rescale it.
  game = new Game({ playerCount, solo });
  busy = false;
  intent = null;
  modalOpen = false;
  trayScreen = 'actions';
  tradeGive = null;
  tradeGet = null;
  discardGive = emptyHand();
  discardKey = '';
  plentyPicks = [];
  tray.setHeadline('');
  tray.setScores(scoreRows(game));
  boardView.rebuild(game.board);
  boardView.syncPieces(game);
  avatars.rebuild(game.players);
  production.clear();
  floatLabels.clear();
  dice.placeFor(game.current, game.playerCount);
  applyWorldUiVisibility();
  refresh();
  afterAction();
}

function showTitleScreen() {
  closeModal();
  game = null;
  busy = false;
  intent = null;
  modalOpen = false;
  trayScreen = 'actions';
  tradeGive = null;
  tradeGet = null;
  discardGive = emptyHand();
  discardKey = '';
  plentyPicks = [];
  production.clear();
  floatLabels.clear();
  tray.setHeadline('');
  tray.setScores([]);
  avatars.setCelebrating(null);
  tray.setResources(emptyHand());
  applyWorldUiVisibility();
  syncStartControls();
  syncTrayButtons();
  applyPanelStatus();
}

function gameInProgress() {
  return !!game && game.phase !== PHASE.GAME_OVER;
}

function requestRestart({ fromHud = false } = {}) {
  if (fromHud && !gameInProgress()) {
    startGame();
    return;
  }
  if (preferTrayUi()) {
    trayScreen = 'restartConfirm';
    syncTrayButtons();
    applyPanelStatus();
    sfx.click();
    return;
  }
  const returnToSettings = trayScreen === 'settings' || trayScreen === 'pointerTilt' || trayScreen === 'restartConfirm';
  trayScreen = 'restartConfirm';
  modalOpen = true;
  showRestartConfirm((ok) => {
    modalOpen = false;
    if (ok) {
      startGame();
      return;
    }
    if (returnToSettings) {
      trayScreen = 'settings';
      paintDesktopTrayScreen();
      return;
    }
    trayScreen = 'actions';
  });
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
  tray.setScores(scoreRows(game));
  syncTrayButtons();
  if (trayScreen === 'scores' && modalOpen && !preferTrayUi()) paintScoresModal();
  applyPanelStatus();
  avatars.setCurrent(game.current);
  avatars.setStealTargets(game.phase === PHASE.STEAL && game.isHuman() ? game.stealCandidates : null);
  avatars.setCelebrating(game.phase === PHASE.GAME_OVER ? game.winner : null);
  dice.placeFor(game.current, game.playerCount);
}

function trayButtons() {
  if (!game) return [{ label: 'Settings', action: 'settings' }];
  const can = game.isHuman() && !busy;
  const playable = can && game.playableCards(game.current).length > 0;
  const freeRoad = game.phase === PHASE.FREE_ROADS;
  return [
    { label: 'Roll', action: 'roll', disabled: !(can && game.phase === PHASE.ROLL) },
    {
      label: 'Road',
      detail: freeRoad ? 'Free' : formatCost(BUILD_COST.road),
      action: 'road',
      disabled: !(can && ((game.phase === PHASE.MAIN && game.canAfford(game.current, 'road')) || freeRoad)),
    },
    { label: 'Settle', detail: formatCost(BUILD_COST.settlement), action: 'settlement', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'City', detail: formatCost(BUILD_COST.city), action: 'city', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Dev', detail: formatCost(BUILD_COST.dev), action: 'cards', disabled: !((can && game.phase === PHASE.MAIN) || playable) },
    { label: 'Bank', detail: '4:1', action: 'trade', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'End Turn', action: 'end', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Scores', action: 'scores' },
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
    { label: pointerMode === 'gaze' ? 'Pointer: Face' : 'Pointer: Hand', action: 'pointer', on: pointerMode === 'gaze' },
    { label: 'Pointer tilt', detail: formatPointerTilt(), action: 'pointerTilt' },
    { label: pointerLinesOn ? 'Pointer lines ON' : 'Pointer lines OFF', action: 'pointerLines', on: pointerLinesOn },
    { label: antialiasOn ? 'Antialias ON' : 'Antialias OFF', action: 'antialias', on: antialiasOn },
    { label: passthroughOn ? 'Passthrough ON' : 'Passthrough OFF', action: 'passthrough', on: passthroughOn },
    { label: handlesOn ? 'Handles ON' : 'Handles OFF', action: 'handles', on: handlesOn },
    ...(game ? [{ label: 'Restart game', action: 'restartAsk' }] : []),
    { label: 'Back', action: 'settingsBack' },
  ];
}

function pointerTiltButtons() {
  return [
    { label: '▲ Up', action: 'pointerTiltUp' },
    { label: formatPointerTilt(), action: 'pointerTiltValue', disabled: true },
    { label: '▼ Down', action: 'pointerTiltDown' },
    { label: 'Back', action: 'pointerTiltBack' },
  ];
}

function restartConfirmButtons() {
  return [
    { label: 'Restart', action: 'restart' },
    { label: 'Back', action: 'restartBack' },
  ];
}

function cardButtons() {
  const can = game.isHuman() && !busy;
  const playable = game.playableCards(game.current);
  return [
    {
      label: 'Buy card',
      detail: formatCost(BUILD_COST.dev),
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
        detail: `Give ${rate}:1`,
        action: `give:${r}`,
        color: RESOURCE_COLOR[r],
        selected: tradeGive === r,
        disabled: (p.resources[r] || 0) < rate,
      };
    }),
    ...RESOURCES.map((r) => ({
      label: RESOURCE_LABEL[r],
      detail: 'Get',
      action: `get:${r}`,
      color: RESOURCE_COLOR[r],
      selected: tradeGet === r,
      disabled: r === tradeGive || (game.bank[r] || 0) < 1,
    })),
    {
      label: tradeGive ? `Bank ${game.tradeRate(p, tradeGive)}:1` : 'Bank 4:1',
      action: 'tradeGo',
      disabled: !game.canBankTrade(p.id, tradeGive, tradeGet),
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

function scoreButtons() {
  return [{ label: 'Back', action: 'scoresBack' }];
}

function winButtons() {
  return [
    { label: 'Play Again', action: 'restart' },
    { label: 'Main Menu', action: 'mainMenu' },
  ];
}

function titleButtons() {
  return [
    { label: `Players: ${playerCount}`, action: 'titlePlayers' },
    { label: solo ? 'You vs AI' : 'Hotseat', action: 'titleMode' },
    { label: 'Begin the voyage', action: 'titleStart' },
    { label: 'Settings', action: 'settings' },
  ];
}

function applyWinHeadline() {
  if (game?.phase !== PHASE.GAME_OVER || game.winner == null) {
    tray.setHeadline('');
    return;
  }
  const p = game.player(game.winner);
  tray.setHeadline(`${p.name} Wins!`, p.color);
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
  if (trayScreen === 'restartConfirm') {
    return 'This starts a new island (same player count and mode).';
  }
  if (trayScreen === 'scores' && game) {
    return 'Public VP hides opponents’ victory-point cards.';
  }
  if (trayScreen === 'trade' && game) {
    const p = viewPlayer(game);
    if (!tradeGive) return `${p.name} · Bank 4:1 — pick what to give, then Grain or another to get`;
    const rate = game.tradeRate(p, tradeGive);
    const giveLabel = `${rate} ${RESOURCE_LABEL[tradeGive]}`;
    if (!tradeGet) return `${p.name} · Give ${giveLabel} to the bank — pick what to get`;
    return `${p.name} · Bank ${rate}:1 · ${giveLabel} → 1 ${RESOURCE_LABEL[tradeGet]}`;
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
  const headHint = useHeadHover();
  if (!game) {
    tray.setStatus('');
    if (preferTrayUi() && headHint) help.set('Point with your view, pinch to select.');
    else if (!preferTrayUi()) help.mesh.visible = false;
    return;
  }
  const status = panelStatus();
  const roll = formatRollResult(game);
  const stealLine = formatStealResult(game);
  const tradeLine = formatTradeResult(game);
  const eventBanner = stealLine
    ? roll
      ? `${roll.diceLine} · ${stealLine}`
      : stealLine
    : tradeLine
      ? roll
        ? `${roll.banner} · ${tradeLine}`
        : tradeLine
      : roll?.banner;
  tray.setStatus(status);
  if (!preferTrayUi()) {
    help.mesh.visible = false;
    return;
  }
  if (headHint) {
    help.set(eventBanner || 'Point with your view, pinch to select.');
  } else {
    help.set(eventBanner || status);
  }
}

function syncTrayButtons() {
  if (!game) {
    if (trayScreen === 'settings') {
      tray.setButtons(settingsButtons(), 'settings');
      return;
    }
    if (trayScreen === 'pointerTilt') {
      tray.setButtons(pointerTiltButtons(), 'pointerTilt');
      return;
    }
    if (preferTrayUi()) {
      tray.setButtons(titleButtons(), 'title');
      return;
    }
    tray.setButtons(trayButtons(), 'actions');
    return;
  }
  if (game.phase !== PHASE.MAIN && trayScreen === 'trade') trayScreen = 'actions';
  if (![PHASE.MAIN, PHASE.ROLL].includes(game.phase) && trayScreen === 'cards') trayScreen = 'actions';
  if (scoresBlocked() && trayScreen === 'scores') trayScreen = 'actions';

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
  if (game.phase === PHASE.GAME_OVER) {
    applyWinHeadline();
    tray.setButtons(winButtons(), 'win');
    return;
  }
  if (trayScreen === 'settings') {
    tray.setButtons(settingsButtons(), 'settings');
    return;
  }
  if (trayScreen === 'pointerTilt') {
    tray.setButtons(pointerTiltButtons(), 'pointerTilt');
    return;
  }
  if (trayScreen === 'restartConfirm') {
    tray.setButtons(restartConfirmButtons(), 'restartConfirm');
    return;
  }
  if (trayScreen === 'scores') {
    tray.setButtons(scoreButtons(), 'scores');
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
  else if (act === 'pointerTilt') trayScreen = 'pointerTilt';
  else if (act === 'pointerTiltBack') trayScreen = 'settings';
  else if (act === 'pointerTiltUp') setPointerTilt(pointerPitchDeg + POINTER_TILT_STEP);
  else if (act === 'pointerTiltDown') setPointerTilt(pointerPitchDeg - POINTER_TILT_STEP);
  else if (act === 'restartAsk') {
    if (preferTrayUi()) trayScreen = 'restartConfirm';
    else {
      requestRestart();
      return;
    }
  }
  else if (act === 'restartBack') trayScreen = 'settings';
  else if (act === 'passthrough') setPassthrough(!passthroughOn);
  else if (act === 'pointer') setPointerMode(pointerMode === 'gaze' ? 'controller' : 'gaze');
  else if (act === 'pointerLines') setPointerLines(!pointerLinesOn);
  else if (act === 'antialias') setAntialias(!antialiasOn);
  else if (act === 'handles') {
    handlesOn = !handlesOn;
    applyHandleVisibility();
  } else if (act === 'restart') {
    sfx.click();
    startGame();
    return;
  }
  if (act === 'settingsBack' && !preferTrayUi()) {
    modalOpen = false;
    closeModal();
    syncTrayButtons();
    applyPanelStatus();
    sfx.click();
    return;
  }
  syncTrayButtons();
  applyPanelStatus();
  sfx.click();
  paintDesktopTrayScreen();
}

function scoresBlocked() {
  if (!game) return true;
  if (game.phase === PHASE.GAME_OVER) return true;
  if (!game.isHuman()) return false;
  return game.phase === PHASE.STEAL
    || game.phase === PHASE.DISCARD
    || game.phase === PHASE.PLENTY
    || game.phase === PHASE.MONOPOLY;
}

function settingsBlocked() {
  if (!game) return false;
  return scoresBlocked();
}

function settingsModalOpts() {
  return {
    gaze: pointerMode === 'gaze',
    tiltLabel: formatPointerTilt(),
    lines: pointerLinesOn,
    antialias: antialiasOn,
    passthrough: passthroughOn,
    handles: handlesOn,
    canRestart: !!game,
  };
}

function paintDesktopTrayScreen() {
  if (preferTrayUi()) return;
  if (trayScreen === 'settings') {
    modalOpen = true;
    showSettings(settingsModalOpts(), (act) => runTraySettings(act));
    return;
  }
  if (trayScreen === 'pointerTilt') {
    modalOpen = true;
    showPointerTilt({ tiltLabel: formatPointerTilt() }, (act) => runTraySettings(act));
  }
}

function openSettingsUi() {
  if (settingsBlocked()) return;
  if (preferTrayUi()) {
    trayScreen = 'settings';
    modalOpen = false;
    closeModal();
    syncTrayButtons();
    applyPanelStatus();
    sfx.click();
    return;
  }
  trayScreen = 'settings';
  paintDesktopTrayScreen();
  sfx.click();
}

function paintScoresModal() {
  showScores(game, () => {
    modalOpen = false;
    if (trayScreen === 'scores') trayScreen = 'actions';
    syncTrayButtons();
    applyPanelStatus();
  });
}

function openScoresUi() {
  if (!game || scoresBlocked()) return;
  if (preferTrayUi()) {
    trayScreen = 'scores';
    modalOpen = false;
    closeModal();
    syncTrayButtons();
    applyPanelStatus();
    sfx.click();
    return;
  }
  trayScreen = 'scores';
  modalOpen = true;
  paintScoresModal();
  sfx.click();
}

function closeScoresUi() {
  if (trayScreen === 'scores') trayScreen = 'actions';
  modalOpen = false;
  closeModal();
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
    if (!game.bankTrade(viewPlayer(game).id, give, get)) {
      showToast(game.whyNotBankTrade(viewPlayer(game).id, give, get) || 'Cannot make that trade.');
      refresh();
      return;
    }
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
    showToast(game.whyNotBankTrade(viewPlayer(game).id, tradeGive, tradeGet) || 'Cannot make that trade.');
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
  if (act === 'mainMenu') {
    sfx.click();
    showTitleScreen();
    return true;
  }
  if (act === 'titleStart') {
    sfx.unlock();
    sfx.click();
    startGame();
    return true;
  }
  if (act === 'titlePlayers') {
    playerCount = playerCount >= 4 ? 2 : playerCount + 1;
    syncStartControls();
    syncTrayButtons();
    sfx.click();
    return true;
  }
  if (act === 'titleMode') {
    solo = !solo;
    syncStartControls();
    syncTrayButtons();
    sfx.click();
    return true;
  }
  if (TRAY_SETTINGS.has(act)) {
    runTraySettings(act);
    return true;
  }
  if (act === 'scores') {
    openScoresUi();
    return true;
  }
  if (act === 'scoresBack') {
    closeScoresUi();
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
  const giveRes = normalizeResource(actionArg(act, 'give:'));
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
  const getRes = normalizeResource(actionArg(act, 'get:'));
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
    for (const child of m.children) child.visible = m.visible && (xr || m === boardView.hoverObj);
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

function canRollNow() {
  return !!(game && !busy && game.isHuman() && game.phase === PHASE.ROLL);
}

function rollFailReason() {
  if (!game || busy || !game.isHuman()) return 'Not your roll';
  if (game.phase === PHASE.SETUP_SETTLEMENT || game.phase === PHASE.SETUP_ROAD) return 'Not your roll';
  return 'Already rolled';
}

function pickables() {
  const list = [...handles.pickables(), ...avatars.pickables(), ...dice.pickables()];
  if (preferTrayUi()) list.push(...tray.pickables());
  for (const m of boardView.vertexMarkers.values()) if (m.visible) list.push(m);
  for (const m of boardView.edgeMarkers.values()) if (m.visible) list.push(m);
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

function announceSteal() {
  const line = formatStealResult(game);
  if (!line) return;
  showToast(line, TOAST_LONG_MS, { low: true });
  if (preferTrayUi()) floatLabels.spawn(line, tray.stealFloatWorldPos(_floatPos), STEAL_FLOAT_LIFE);
}

function trySteal(fromId) {
  if (!game || busy || game.phase !== PHASE.STEAL || !game.isHuman()) return false;
  if (!game.steal(Number(fromId))) return false;
  closeModal();
  modalOpen = false;
  sfx.click();
  announceSteal();
  afterAction();
  return true;
}

function applyHit(obj) {
  if (!obj) return;
  const data = obj.userData;
  if (data.kind === 'dice' || (data.kind === 'tray' && data.action === 'roll')) {
    if (canRollNow()) {
      if (data.kind === 'tray') tray.flashPress('roll');
      runHudAction('roll');
    } else {
      showBuildFail(rollFailReason(), obj);
    }
    return;
  }
  if (data.kind === 'tray') {
    if (data.disabled && !TRAY_SETTINGS.has(data.action)) {
      if (game && humanCanAct() && BUILD_TRAY.has(data.action)) {
        tray.flashPress(data.action);
        showBuildFail(trayBuildFail(data.action), obj);
      }
      return;
    }
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
    if (!ok) {
      showBuildFail(vertexBuildFail(data.id, mode), obj);
      return;
    }
    boardView.flashPick(obj);
    sfx.place();
    intent = null;
    afterAction();
  } else if (data.kind === 'edge') {
    if (!game.placeRoad(data.id)) {
      showBuildFail(game.whyNotRoad(data.id), obj);
      return;
    }
    boardView.flashPick(obj);
    sfx.place();
    intent = null;
    afterAction();
  } else if (data.kind === 'hex') {
    if (!game.moveRobber(data.id)) return;
    boardView.flashPick(obj);
    sfx.place();
    if (game.phase !== PHASE.STEAL) showToast('No neighbor to steal from.', TOAST_LONG_MS);
    afterAction();
  }
}

function trayBuildFail(act) {
  if (act === 'road') return game.whyNotRoad();
  if (act === 'settlement') return game.whyNotSettlement();
  if (act === 'city') return game.whyNotCity();
  if (act === 'dev' || act === 'cards') return game.whyNotDev();
  return "Can't build";
}

function vertexBuildFail(id, mode) {
  if (mode === 'city') return game.whyNotCity(id);
  if (mode === 'settlement') return game.whyNotSettlement(id);
  const v = game.board.vertices.get(id);
  if (v?.building?.player === game.current && v.building.type === 'settlement') {
    return game.whyNotCity(id);
  }
  return game.whyNotSettlement(id);
}

function hitWorldPos(obj, target) {
  const data = obj?.userData || {};
  if (data.kind === 'vertex') {
    const m = boardView.vertexMarkers.get(data.id);
    if (m) return m.getWorldPosition(target);
  }
  if (data.kind === 'edge') {
    const m = boardView.edgeMarkers.get(data.id);
    if (m) return m.getWorldPosition(target);
  }
  if (data.kind === 'hex') {
    const m = boardView.hexMarkers.get(data.id) || boardView.hexMeshes.get(data.id);
    if (m) return m.getWorldPosition(target);
  }
  if (data.kind === 'dice') {
    return (obj?.isObject3D ? obj : dice.group).getWorldPosition(target);
  }
  if (data.kind === 'tray' || data.action) {
    return tray.buttonWorldPos(data.action, target);
  }
  if (obj?.isObject3D) return obj.getWorldPosition(target);
  return tray.group.getWorldPosition(target);
}

function showBuildFail(message, obj) {
  const line = String(message || '').trim();
  if (!line) return;
  sfx.bad();
  if (preferTrayUi()) floatLabels.spawn(line, hitWorldPos(obj, _floatPos));
  else showToast(line);
}

function resolvePick(hits) {
  if (!hits.length) return null;
  if (hits[0].object.userData?.kind === 'dice') return hits[0].object;
  const trayHit = hits.find((h) => h.object.userData?.kind === 'tray');
  if (trayHit) return trayHit.object;
  const avatarHit = hits.find((h) => h.object.userData?.kind === 'avatar');
  if (avatarHit) return avatarHit.object;
  const handleHit = hits.find((h) => h.object.userData?.handleRoot);
  if (handleHit) return handleHit.object;
  const vertexHit = hits.find((h) => h.object.userData?.kind === 'vertex');
  if (vertexHit) return vertexHit.object;
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

function xrInputSources() {
  const session = renderer.xr.getSession?.();
  return session ? [...session.inputSources] : [];
}

function isTransientAim(inputSource) {
  const mode = inputSource?.targetRayMode;
  return mode === 'transient-pointer' || mode === 'gaze';
}

function isHandAimSource(inputSource) {
  const mode = inputSource?.targetRayMode;
  return mode === 'tracked-pointer' || mode === 'transient-pointer';
}

function handAimFromObject(source) {
  if (!source) return false;
  const src = source.userData?.inputSource;
  return !src || isHandAimSource(src);
}

function isLikelyVisionOS() {
  if (sawTransientPointer) return true;
  const ua = navigator.userAgent || '';
  if (/visionOS|Apple Vision/i.test(ua)) return true;
  const safari = /Safari/.test(ua) && !/Chrome|Chromium|Android|Edg|Firefox|OPR/.test(ua);
  return !!(navigator.xr && safari && /Macintosh|Apple Vision|iPad|iPhone/.test(ua));
}

function hasPersistentPointer() {
  return xrInputSources().some((src) => src.targetRayMode === 'tracked-pointer');
}

function isTrackedController(src) {
  if (!src || src.targetRayMode !== 'tracked-pointer') return false;
  const profiles = src.profiles || [];
  if (profiles.some((p) => /oculus|meta|quest/i.test(p))) return true;
  const pad = src.gamepad;
  if (pad && (pad.mapping === 'xr-standard' || pad.axes?.length || pad.buttons?.length)) return true;
  return false;
}

function hasTrackedController() {
  return xrInputSources().some(isTrackedController);
}

// Face mode always looks. Look+pinch (Vision Pro / no laser) also hovers from the head ray.
// Quest Hand with a tracked Meta/Oculus controller stays laser-only.
function useHeadHover() {
  if (!renderer.xr.isPresenting) return false;
  if (pointerMode === 'gaze') return true;
  if (hasTrackedController()) return false;
  if (hasPersistentPointer() && !isLikelyVisionOS()) return false;
  return true;
}

function xrEventFrame(event) {
  return event?.frame || renderer.xr.getFrame?.() || null;
}

function xrEventInputSource(event) {
  return event?.inputSource || event?.data || null;
}

function fillGazeRay(origin, dir) {
  const cam = renderer.xr.getCamera?.() || camera;
  cam.updateMatrixWorld();
  cam.getWorldPosition(origin);
  cam.getWorldDirection(dir);
  if (!pointerPitchDeg) return;
  _gazeRight.setFromMatrixColumn(cam.matrixWorld, 0).normalize();
  dir.applyAxisAngle(_gazeRight, THREE.MathUtils.degToRad(pointerPitchDeg)).normalize();
}

function fillControllerRay(origin, dir, source) {
  origin.setFromMatrixPosition(source.matrixWorld);
  const tip = source.joints?.['index-finger-tip'];
  if (tip) tip.getWorldPosition(origin);
  dir.set(0, 0, -1).transformDirection(source.matrixWorld);
}

function fillRayFromTargetRay(origin, dir, inputSource, frame) {
  const refSpace = renderer.xr.getReferenceSpace?.();
  if (!frame || !inputSource?.targetRaySpace || !refSpace) return false;
  let pose = null;
  try {
    pose = frame.getPose(inputSource.targetRaySpace, refSpace);
  } catch {
    return false;
  }
  if (!pose) return false;
  const { position, orientation } = pose.transform;
  origin.set(position.x, position.y, position.z);
  dir.set(0, 0, -1).applyQuaternion(_ctrlQuat.set(orientation.x, orientation.y, orientation.z, orientation.w));
  dir.normalize();
  return true;
}

function fillPickRay(origin, dir, event, fallbackSource) {
  // Face: look+pinch uses the head ray even when pinch arrives on a transient-pointer.
  if (useHeadHover()) {
    fillGazeRay(origin, dir);
    return true;
  }
  const inputSource = xrEventInputSource(event);
  if (isHandAimSource(inputSource) && fillRayFromTargetRay(origin, dir, inputSource, xrEventFrame(event))) {
    return true;
  }
  if (fallbackSource && handAimFromObject(fallbackSource)) {
    fillControllerRay(origin, dir, fallbackSource);
    return true;
  }
  return false;
}

function hitFromXREvent(event, fallbackSource) {
  if (!fillPickRay(_rayOrigin, _rayDir, event, fallbackSource)) {
    return useHeadHover() ? lastXRHover : null;
  }
  const hit = hoverFromRay(_rayOrigin, _rayDir);
  if (hit) return hit;
  if (useHeadHover()) return lastXRHover;
  return null;
}

function withXREventGuard(type, fn) {
  if (xrEventGuard[type]) return;
  xrEventGuard[type] = true;
  try {
    fn();
  } finally {
    queueMicrotask(() => {
      xrEventGuard[type] = false;
    });
  }
}

function shouldDebounceXRSelect(inputSource) {
  if (useHeadHover() || pointerMode === 'gaze') return true;
  if (isTransientAim(inputSource)) return true;
  if (!hasPersistentPointer()) return true;
  return false;
}

function isDuplicateXRSelect(inputSource) {
  const dt = performance.now() - lastXRSelectAt;
  if (dt < 80) return true;
  if (!shouldDebounceXRSelect(inputSource)) return false;
  return dt < XR_SELECT_DEBOUNCE_MS;
}

function markXRSelectHandled() {
  lastXRSelectAt = performance.now();
}

function shouldTryGrab(inputSource, source) {
  if (!source) return false;
  if (isTransientAim(inputSource)) return false;
  if (!hasPersistentPointer() && (sawTransientPointer || isLikelyVisionOS())) return false;
  return true;
}

function applyXRSelect(event, fallbackSource) {
  const inputSource = xrEventInputSource(event);
  if (!useHeadHover() && !isHandAimSource(inputSource) && !handAimFromObject(fallbackSource)) return false;
  if (isDuplicateXRSelect(inputSource)) return false;
  if (fallbackSource && grabs.has(fallbackSource) && !isTransientAim(inputSource)) return false;
  markXRSelectHandled();
  applyHit(hitFromXREvent(event, fallbackSource));
  return true;
}

function handleXRSelectStart(event, fallbackSource) {
  withXREventGuard('selectstart', () => {
    const inputSource = xrEventInputSource(event);
    if (!useHeadHover() && !isHandAimSource(inputSource) && !handAimFromObject(fallbackSource)) return;
    if (shouldTryGrab(inputSource, fallbackSource)) {
      tryGrab(fallbackSource);
      if (grabs.has(fallbackSource)) return;
    }
    const hit = hitFromXREvent(event, fallbackSource);
    if (hit?.userData?.kind === 'tray' && !hit.userData.disabled) tray.setPressed(hit.userData.action);
    // visionOS often fires selectstart without select; pinch-like gestures activate here too.
    if (shouldDebounceXRSelect(inputSource)) applyXRSelect(event, fallbackSource);
  });
}

function handleXRSelect(event, fallbackSource) {
  withXREventGuard('select', () => {
    applyXRSelect(event, fallbackSource);
  });
}

function handleXRSelectEnd(fallbackSource) {
  withXREventGuard('selectend', () => {
    if (fallbackSource) releaseGrab(fallbackSource);
    tray.setPressed(null);
  });
}

function onXRSessionSelectStart(event) {
  // Session + transient-pointer/controller must both activate Face-mode gaze targets on visionOS:
  // Safari may deliver only XRSession select, only a short-lived transient-pointer select, or only selectstart.
  handleXRSelectStart(event, null);
}

function onXRSessionSelect(event) {
  // Same as selectstart: do not wait for the session to "own" the pinch; debounce collapses duplicates.
  handleXRSelect(event, null);
}

function onXRSessionSelectEnd() {
  handleXRSelectEnd(null);
}

function onXRInputSourcesChange(event) {
  const session = event?.target || renderer.xr.getSession?.();
  if (!session) return;
  for (const src of session.inputSources) {
    if (isTransientAim(src)) sawTransientPointer = true;
  }
  const n = Math.max(XR_CONTROLLER_SLOTS, session.inputSources.length);
  for (let i = 0; i < n; i++) renderer.xr.getController(i);
  applyPointerVisuals();
}

function bindXRSession(session) {
  if (!session || xrSessionBound === session) return;
  unbindXRSession();
  session.addEventListener('select', onXRSessionSelect);
  session.addEventListener('selectstart', onXRSessionSelectStart);
  session.addEventListener('selectend', onXRSessionSelectEnd);
  session.addEventListener('inputsourceschange', onXRInputSourcesChange);
  xrSessionBound = session;
  onXRInputSourcesChange({ target: session });
}

function unbindXRSession() {
  const session = xrSessionBound;
  if (!session) return;
  session.removeEventListener('select', onXRSessionSelect);
  session.removeEventListener('selectstart', onXRSessionSelectStart);
  session.removeEventListener('selectend', onXRSessionSelectEnd);
  session.removeEventListener('inputsourceschange', onXRInputSourcesChange);
  xrSessionBound = null;
}

function laserBlockers() {
  const list = [stage];
  if (handles.group.visible) list.push(handles.group);
  return list;
}

function ignoreLaserHit(obj) {
  if (!obj || obj.isLine || obj.isPoints || obj.isSprite) return true;
  if (obj.userData?.pointerLaser) return true;
  const mat = obj.material;
  if (mat) {
    const mats = Array.isArray(mat) ? mat : [mat];
    if (mats.every((m) => m && m.transparent && m.opacity < 0.02)) return true;
  }
  if (obj.userData?.gazeHitDot) return true;
  for (let p = obj; p; p = p.parent) {
    if (p === gazeReticle || p === gazeHitDot || p === help.mesh || p.userData?.pointerLaser) return true;
  }
  return false;
}

function setLaserLength(laser, distance) {
  const z = -Math.min(LASER_MAX, Math.max(0.02, distance));
  const attr = laser.geometry.attributes.position;
  if (attr.getZ(1) === z) return;
  attr.setZ(1, z);
  attr.needsUpdate = true;
  laser.geometry.computeBoundingSphere();
}

function firstWorldHit(origin, dir, far = LASER_MAX) {
  const prevNear = raycaster.near;
  const prevFar = raycaster.far;
  raycaster.near = 0;
  raycaster.far = far;
  raycaster.set(origin, dir);
  const hits = raycaster.intersectObjects(laserBlockers(), true);
  raycaster.near = prevNear;
  raycaster.far = prevFar;
  for (const hit of hits) {
    if (ignoreLaserHit(hit.object)) continue;
    return hit;
  }
  return null;
}

function pointerLaserHitDistance(origin, dir) {
  const hit = firstWorldHit(origin, dir);
  return hit ? Math.max(0.02, hit.distance - LASER_EPS) : LASER_MAX;
}

function updatePointerLasers() {
  if (!pointerLinesOn) return;
  for (const c of xrControllers) {
    const laser = c.userData.laser;
    if (!laser) continue;
    _rayOrigin.setFromMatrixPosition(c.matrixWorld);
    _rayDir.set(0, 0, -1).transformDirection(c.matrixWorld).normalize();
    setLaserLength(laser, pointerLaserHitDistance(_rayOrigin, _rayDir));
  }
}

function preferHandHover(hit, obj) {
  if (hit?.userData?.kind === 'tray' || hit?.userData?.kind === 'dice' || hit?.userData?.handleRoot) {
    return { obj: hit, done: true };
  }
  if (hit && !obj) return { obj: hit, done: false };
  return { obj, done: false };
}

function hoverPickables() {
  let obj = null;
  if (renderer.xr.isPresenting) {
    updatePointerLasers();
    if (useHeadHover()) {
      fillGazeRay(_rayOrigin, _rayDir);
      obj = hoverFromRay(_rayOrigin, _rayDir);
    } else {
      const frame = renderer.xr.getFrame?.() || null;
      for (const src of xrInputSources()) {
        if (!isHandAimSource(src)) continue;
        if (!fillRayFromTargetRay(_rayOrigin, _rayDir, src, frame)) continue;
        const next = preferHandHover(hoverFromRay(_rayOrigin, _rayDir), obj);
        obj = next.obj;
        if (next.done) break;
      }
      if (!obj) {
        for (const c of xrControllers) {
          if (!c.visible || !handAimFromObject(c)) continue;
          fillControllerRay(_rayOrigin, _rayDir, c);
          const next = preferHandHover(hoverFromRay(_rayOrigin, _rayDir), obj);
          obj = next.obj;
          if (next.done) break;
        }
      }
    }
    lastXRHover = obj;
  } else {
    raycaster.setFromCamera(pointer, camera);
    obj = resolvePick(raycaster.intersectObjects(pickables(), true));
    if (hoverSpotId) obj = { userData: { kind: 'vertex', id: hoverSpotId } };
  }
  updateGazeHitDot();
  tray.setHover(obj);
  handles.setHover(obj);
  avatars.setHover(obj);
  boardView.setHover(obj);
  dice.setHover(obj);
}

function setupXR() {
  const factory = new XRControllerModelFactory();
  const handFactory = new XRHandModelFactory();
  handFactory.setPath('https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles');
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffe6b0 });
  const controllers = [];
  for (let i = 0; i < XR_CONTROLLER_SLOTS; i++) {
    const controller = renderer.xr.getController(i);
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -LASER_MAX),
    ]);
    const laser = new THREE.Line(geo, lineMat);
    laser.userData.pointerLaser = true;
    controller.userData.laser = laser;
    controller.add(laser);
    controller.addEventListener('selectstart', (event) => {
      handleXRSelectStart(event, controller);
    });
    controller.addEventListener('selectend', () => {
      handleXRSelectEnd(controller);
    });
    // Transient-pointer select on visionOS is dispatched here; Face hover still uses the gaze target.
    controller.addEventListener('select', (event) => {
      handleXRSelect(event, controller);
    });
    controller.addEventListener('squeezestart', () => {
      if (tryGrab(controller)) return;
      if (game?.phase === PHASE.MAIN && game.isHuman() && !busy) runHudAction('end');
    });
    controller.addEventListener('squeezeend', () => {
      releaseGrab(controller);
    });
    scene.add(controller);
    if (i < 2) {
      const grip = renderer.xr.getControllerGrip(i);
      grip.add(factory.createControllerModel(grip));
      scene.add(grip);
      const hand = renderer.xr.getHand(i);
      hand.add(handFactory.createHandModel(hand, 'mesh'));
      hand.addEventListener('pinchstart', () => {
        const src = hand.userData?.inputSource || null;
        const fake = { inputSource: src, frame: renderer.xr.getFrame?.() };
        handleXRSelectStart(fake, hand);
        // visionOS may omit pinchstart; if it does fire, still apply once (debounce skips a later session select).
        handleXRSelect(fake, hand);
      });
      hand.addEventListener('pinchend', () => handleXRSelectEnd(hand));
      scene.add(hand);
    }
    controllers.push(controller);
  }
  return controllers;
}

function createGazeReticle() {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.0055, 0.0088, 16),
    new THREE.MeshBasicMaterial({
      color: 0xffe08a,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  const dot = new THREE.Mesh(
    new THREE.CircleGeometry(0.0032, 8),
    new THREE.MeshBasicMaterial({
      color: 0xfff8dc,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  ring.renderOrder = 26;
  dot.renderOrder = 27;
  group.add(ring, dot);
  group.position.set(0, 0, -0.5);
  group.renderOrder = 25;
  group.frustumCulled = false;
  group.visible = false;
  camera.add(group);
  return group;
}

function createGazeHitDot() {
  const group = new THREE.Group();
  group.userData.gazeHitDot = true;
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.005, 8, 6),
    new THREE.MeshBasicMaterial({
      color: 0xfff8dc,
      toneMapped: false,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(0.009, 8, 6),
    new THREE.MeshBasicMaterial({
      color: 0xffe08a,
      toneMapped: false,
      depthWrite: false,
      transparent: true,
      opacity: 0.9,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  core.renderOrder = 29;
  shell.renderOrder = 28;
  core.frustumCulled = false;
  shell.frustumCulled = false;
  group.add(shell, core);
  group.frustumCulled = false;
  group.visible = false;
  scene.add(group);
  return group;
}

function placeGazeHitDot(hit) {
  if (!hit) {
    gazeHitDot.visible = false;
    return false;
  }
  gazeHitDot.position.copy(hit.point);
  if (hit.normal && hit.normal.lengthSq() > 1e-8) {
    _hitN.copy(hit.normal).normalize();
    if (_hitN.dot(_rayDir) > 0) _hitN.negate();
    gazeHitDot.position.addScaledVector(_hitN, GAZE_HIT_LIFT);
  } else {
    gazeHitDot.position.addScaledVector(_rayDir, -GAZE_HIT_LIFT);
  }
  gazeHitDot.visible = true;
  return true;
}

function updateGazeHitDot() {
  if (!renderer.xr.isPresenting || !useHeadHover()) {
    gazeHitDot.visible = false;
    return;
  }
  placeGazeHitDot(firstWorldHit(_rayOrigin, _rayDir));
}

function attachGazeReticle(parent) {
  if (!parent || gazeReticle.parent === parent) {
    applyPointerVisuals();
    return;
  }
  parent.add(gazeReticle);
  applyPointerVisuals();
}

function setPointerMode(mode) {
  pointerMode = mode === 'gaze' ? 'gaze' : 'controller';
  try {
    localStorage.setItem('catan-pointer-mode', pointerMode);
  } catch { /* ignore */ }
  applyPointerVisuals();
  if (useHeadHover() || pointerMode === 'gaze') {
    showToast('Point with your view, pinch to select.');
    if (renderer.xr.isPresenting) help.set('Point with your view, pinch to select.');
  }
}

function applyPointerVisuals() {
  const head = useHeadHover();
  if (gazeReticle) gazeReticle.visible = false;
  if (!renderer.xr.isPresenting || !head) gazeHitDot.visible = false;
  for (const c of xrControllers) {
    const laser = c.userData.laser;
    if (laser) {
      laser.visible = pointerLinesOn && pointerMode !== 'gaze' && !head && !!c.visible && handAimFromObject(c);
    }
  }
}

function setPointerLines(on) {
  pointerLinesOn = !!on;
  try {
    localStorage.setItem('catan-pointer-lines', pointerLinesOn ? '1' : '0');
  } catch { /* ignore */ }
  applyPointerVisuals();
}

function setAntialias(on) {
  antialiasOn = !!on;
  QUALITY.antialias = antialiasOn;
  xrGlAttrs.antialias = antialiasOn;
  try {
    localStorage.setItem('catan-antialias', antialiasOn ? '1' : '0');
  } catch { /* ignore */ }
  applyXrAntialias();
}

function applyXrAntialias() {
  try {
    const current = renderer.getRenderTarget();
    if (current && 'samples' in current) current.samples = antialiasOn ? 4 : 0;
  } catch {
    /* Next XR session start reads patched context attributes. */
  }
}

function setPassthrough(on) {
  passthroughOn = !!on;
  world.room.visible = !passthroughOn;
  scene.background = passthroughOn ? null : ROOM_BG;
  scene.fog = passthroughOn ? null : new THREE.Fog('#1b140f', 6, 12);
  renderer.setClearColor(passthroughOn ? 0x000000 : 0x1b140f, passthroughOn ? 0 : 1);
  renderer.setClearAlpha(passthroughOn ? 0 : 1);
}

function applyPresentingQuality(on) {
  renderer.xr.setFramebufferScaleFactor(QUALITY.framebufferScale);
  xrGlAttrs.antialias = antialiasOn;
  applyShadowMap(renderer, world.sun, {
    enabled: on ? QUALITY.xrShadows : QUALITY.shadows,
    size: on ? QUALITY.xrShadowSize : QUALITY.shadowSize,
  });
}

function applyHandleVisibility() {
  handles.setVisible(handlesOn && renderer.xr.isPresenting);
}

function resetStageHome() {
  stage.position.set(0, 0, STAGE_FORWARD_Z);
}

function armXrTableSnap() {
  xrStageSnapPending = true;
  xrStageSnapTries = 0;
  xrStageUserMoved = false;
}

function stageTableTopY() {
  return stage.position.y + TABLE_HEIGHT * Math.max(1e-4, stage.scale.y);
}

function desiredTableTopY(headY) {
  const below = Math.min(TABLE_BELOW_EYES_MAX, Math.max(0.35, TABLE_BELOW_EYES));
  return Math.max(headY - below, headY - TABLE_BELOW_EYES_MAX);
}

function applyStageTableSnap(headY) {
  const scaleY = Math.max(1e-4, stage.scale.y);
  const top = desiredTableTopY(headY);
  stage.position.set(0, top - TABLE_HEIGHT * scaleY, STAGE_FORWARD_Z);
}

function raiseStageToHead(headY) {
  const minTop = headY - TABLE_BELOW_EYES_MAX;
  const top = stageTableTopY();
  if (top + 1e-4 >= minTop) return false;
  stage.position.y += desiredTableTopY(headY) - top;
  return true;
}

function readViewerPose() {
  const frame = renderer.xr.getFrame?.();
  const refSpace = renderer.xr.getReferenceSpace?.();
  if (frame && refSpace) {
    try {
      const pose = frame.getViewerPose(refSpace);
      if (pose) {
        const p = pose.transform.position;
        return { x: p.x, y: p.y, z: p.z };
      }
    } catch {
      /* pose not ready */
    }
  }
  return null;
}

function poseLooksTracked(pose) {
  if (!pose || !Number.isFinite(pose.y)) return false;
  const ax = Math.abs(pose.x);
  const ay = Math.abs(pose.y);
  const az = Math.abs(pose.z);
  if (ax < XR_POSE_EPS && ay < XR_POSE_EPS && az < XR_POSE_EPS) return false;
  return true;
}

function headsetY(pose) {
  if (pose && Number.isFinite(pose.y)) return pose.y;
  const xrCam = renderer.xr.getCamera?.();
  if (xrCam?.position && Number.isFinite(xrCam.position.y)) return xrCam.position.y;
  return 0;
}

function maybeSnapStageToTable() {
  if (!renderer.xr.isPresenting || xrStageUserMoved) return;
  if (grabs.size) {
    xrStageUserMoved = true;
    xrStageSnapPending = false;
    return;
  }
  xrStageSnapTries++;
  const pose = readViewerPose();
  const tracked = poseLooksTracked(pose);
  if (!tracked && xrStageSnapTries < XR_SNAP_WAIT_FRAMES) return;

  const headY = headsetY(pose);
  if (xrStageSnapPending) {
    applyStageTableSnap(headY);
    if (tracked || xrStageSnapTries >= XR_SNAP_WAIT_FRAMES) xrStageSnapPending = false;
  } else {
    raiseStageToHead(headY);
  }
}

async function configureXrReferenceSpace(session) {
  const types = ['local-floor', 'bounded-floor', 'local'];
  for (const type of types) {
    try {
      await session.requestReferenceSpace(type);
      xrRefSpaceType = type;
      renderer.xr.setReferenceSpaceType(type);
      return type;
    } catch {
      /* try next */
    }
  }
  xrRefSpaceType = 'local';
  renderer.xr.setReferenceSpaceType('local');
  return 'local';
}

renderer.xr.addEventListener('sessionstart', () => {
  armXrTableSnap();
  applyWorldUiVisibility();
  syncTrayButtons();
  applyPanelStatus();
});
renderer.xr.addEventListener('sessionend', () => {
  xrStageSnapPending = false;
  xrStageSnapTries = 0;
  xrStageUserMoved = false;
  lastXRHover = null;
  resetStageHome();
  applyWorldUiVisibility();
});

function resumeDesktopUi() {
  applyWorldUiVisibility();
  if (preferTrayUi()) return;
  if (trayScreen === 'settings' || trayScreen === 'pointerTilt') {
    paintDesktopTrayScreen();
    return;
  }
  if (trayScreen === 'restartConfirm') {
    modalOpen = true;
    showRestartConfirm((ok) => {
      modalOpen = false;
      if (ok) {
        startGame();
        return;
      }
      trayScreen = 'settings';
      paintDesktopTrayScreen();
    });
    return;
  }
  if (trayScreen === 'scores' && game && !scoresBlocked()) {
    modalOpen = true;
    paintScoresModal();
    return;
  }
  if (game?.phase === PHASE.GAME_OVER) {
    modalOpen = true;
    showWin(game, {
      onPlayAgain: () => startGame(),
      onMainMenu: () => showTitleScreen(),
    });
    return;
  }
  reopenDesktopModals();
}

function reopenDesktopModals() {
  if (!game || preferTrayUi()) return;
  if (game.phase === PHASE.DISCARD && humanDiscardEntry()) {
    modalOpen = true;
    const opened = showDiscard(game, (id, give) => {
      modalOpen = false;
      discardGive = emptyHand();
      discardKey = '';
      game.discard(id, give);
      afterAction();
    });
    if (!opened) modalOpen = false;
    return;
  }
  if (game.phase === PHASE.STEAL && game.isHuman()) {
    modalOpen = true;
    showSteal(game, (id) => {
      trySteal(id);
    });
    return;
  }
  if (game.phase === PHASE.PLENTY && game.isHuman()) {
    modalOpen = true;
    showPlenty((a, b) => {
      modalOpen = false;
      plentyPicks = [];
      game.yearOfPlenty(a, b);
      afterAction();
    });
    return;
  }
  if (game.phase === PHASE.MONOPOLY && game.isHuman()) {
    modalOpen = true;
    showMonopoly((r) => {
      modalOpen = false;
      game.monopoly(r);
      afterAction();
    });
  }
}

async function requestXRSession(mode, hud) {
  const withOverlay = {
    requiredFeatures: ['local-floor'],
    optionalFeatures: [...XR_OPTIONAL_FEATURES, 'dom-overlay', 'hit-test', 'plane-detection'],
    domOverlay: { root: hud },
  };
  const lite = {
    optionalFeatures: [...XR_OPTIONAL_FEATURES],
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
  const overlay = document.getElementById('overlay-root') || document.getElementById('hud');
  const arOk = await navigator.xr.isSessionSupported?.('immersive-ar');
  const vrOk = await navigator.xr.isSessionSupported?.('immersive-vr');
  try {
    let session = null;
    let passthrough = false;
    if (arOk) {
      try {
        session = await requestXRSession('immersive-ar', overlay);
        passthrough = true;
      } catch {
        session = null;
      }
    }
    if (!session && vrOk) session = await requestXRSession('immersive-vr', overlay);
    if (!session) {
      showToast('This browser has no AR or VR session.');
      return;
    }
    await configureXrReferenceSpace(session);
    applyPresentingQuality(true);
    setPassthrough(passthrough);
    handles.setVisible(handlesOn);
    document.documentElement.classList.add('xr-presenting');
    closeModal();
    bindXRSession(session);
    await renderer.xr.setSession(session);
    applyWorldUiVisibility();
    syncTrayButtons();
    applyPanelStatus();
    applyPointerVisuals();
    if (useHeadHover() || pointerMode === 'gaze') showToast('Point with your view, pinch to select.');
    session.addEventListener('end', () => {
      unbindXRSession();
      sawTransientPointer = false;
      grabs.clear();
      xrStageSnapPending = false;
      xrStageSnapTries = 0;
      xrStageUserMoved = false;
      resetStageHome();
      handles.setVisible(false);
      applyPresentingQuality(false);
      setPassthrough(false);
      document.documentElement.classList.remove('xr-presenting');
      applyPointerVisuals();
      resumeDesktopUi();
      updateVRButton();
    });
  } catch {
    unbindXRSession();
    sawTransientPointer = false;
    showToast('Could not start a mixed-reality session.');
    handles.setVisible(false);
    applyPresentingQuality(false);
    setPassthrough(false);
    document.documentElement.classList.remove('xr-presenting');
    applyPointerVisuals();
    applyWorldUiVisibility();
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
  const g = game;
  refresh();
  try {
    await pumpAI();
  } finally {
    if (game !== g) return;
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
  const g = game;
  if (!g) return;
  busy = true;
  try {
    flushAIDiscards();
    let guard = 0;
    let seenRoll = null;
    while (needsAI() && guard++ < 80) {
      await sleep(g.phase === PHASE.MAIN || g.phase === PHASE.ROLL ? 700 : 220);
      if (game !== g) return;
      const ok = takeAITurn(g);
      const action = g.lastAction;
      if (action?.type === 'roll' && action !== seenRoll) {
        seenRoll = action;
        dice.placeFor(g.current, g.playerCount);
        dice.rollTo(g.dice);
        sfx.dice();
        if (action.production?.length) playProduction(action.production);
        flushAIDiscards();
        refresh();
        const waitMs = action.production?.length
          ? Math.min(4500, Math.max(750, Math.ceil(production.timeLeft() * 1000)))
          : 650;
        await sleep(waitMs);
        if (game !== g) return;
      } else {
        flushAIDiscards();
        refresh();
        if (action?.type === 'steal' && g.lastSteal) {
          announceSteal();
          await sleep(1800);
          if (game !== g) return;
        }
      }
      if (!ok) break;
    }
  } finally {
    if (game === g) busy = false;
  }
}

function presentModals() {
  if (!game) return;
  const trayOnly = preferTrayUi();
  if (game.phase === PHASE.GAME_OVER) {
    sfx.win();
    modalOpen = true;
    applyWinHeadline();
    if (!trayOnly) {
      showWin(game, {
        onPlayAgain: () => startGame(),
        onMainMenu: () => showTitleScreen(),
      });
    }
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
  get pointerMode() {
    return pointerMode;
  },
  get pointerPitchDeg() {
    return pointerPitchDeg;
  },
  get gazeReticle() {
    return gazeReticle;
  },
  get gazeHitDot() {
    return gazeHitDot;
  },
  fillGazeRay,
  firstWorldHit,
  placeGazeHitDot,
  get xrOptionalFeatures() {
    return XR_OPTIONAL_FEATURES;
  },
  get xrSessionBound() {
    return xrSessionBound;
  },
  get quality() {
    return QUALITY;
  },
  fillPickRay,
  isDuplicateXRSelect,
  markXRSelectHandled,
  applyStageTableSnap,
  maybeSnapStageToTable,
  pointerLaserHitDistance,
  setLaserLength,
  useHeadHover,
  hasPersistentPointer,
  hasTrackedController,
  afterAction,
  refresh,
  presentModals,
  trySteal,
  formatRollResult,
  formatStealResult,
};
