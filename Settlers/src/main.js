import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { Game } from './game/Game.js';
import { takeAITurn } from './game/ai.js';
import { PHASE } from './game/constants.js';
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
stage.position.set(0, 0, -0.72);
scene.add(stage);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.05, 30);
camera.position.set(0, 1.17, 0.62);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.57, -0.72);
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
const TRAY_SETTINGS = new Set(['settings', 'settingsBack', 'passthrough', 'handles']);

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
  document.getElementById('hud').classList.add('hidden');
  const start = document.getElementById('start-screen');
  start.classList.remove('hidden');
  start.hidden = false;
  start.removeAttribute('inert');
});

document.getElementById('vr-btn').addEventListener('click', enterVR);
window.addEventListener('resize', onResize);
canvas.addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
});
let pointerDown = null;
canvas.addEventListener('pointerdown', (e) => {
  sfx.unlock();
  pointerDown = { x: e.clientX, y: e.clientY };
});
canvas.addEventListener('pointerup', (e) => {
  if (!pointerDown || renderer.xr.isPresenting) return;
  const dx = e.clientX - pointerDown.x;
  const dy = e.clientY - pointerDown.y;
  pointerDown = null;
  if (dx * dx + dy * dy < 256) pickFromCamera();
});

function runHudAction(act, extra) {
  if (!game || busy) return;
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
    modalOpen = true;
    showTrade(game, (give, get) => {
      modalOpen = false;
      game.bankTrade(viewPlayer(game).id, give, get);
      afterAction();
    });
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
  if (!game || busy || modalOpen) return false;
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
  tray.setStatus(trayStatus(game));
  help.set(trayStatus(game));
  tray.setResources(viewPlayer(game).resources);
  syncTrayButtons();
  avatars.setCurrent(game.current);
  dice.placeFor(game.current, game.playerCount);
}

function trayButtons() {
  if (!game) return [{ label: 'Settings', action: 'settings' }];
  const can = game.isHuman() && !busy;
  return [
    { label: 'Roll', action: 'roll', disabled: !(can && game.phase === PHASE.ROLL) },
    { label: 'Road', action: 'road', disabled: !(can && ((game.phase === PHASE.MAIN && game.canAfford(game.current, 'road')) || game.phase === PHASE.FREE_ROADS)) },
    { label: 'Settle', action: 'settlement', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'City', action: 'city', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Dev', action: 'dev', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Trade', action: 'trade', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'End Turn', action: 'end', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Settings', action: 'settings' },
  ];
}

function settingsButtons() {
  return [
    { label: passthroughOn ? 'Passthrough ON' : 'Passthrough OFF', action: 'passthrough', on: passthroughOn },
    { label: handlesOn ? 'Handles ON' : 'Handles OFF', action: 'handles', on: handlesOn },
    { label: 'Back', action: 'settingsBack' },
  ];
}

function syncTrayButtons() {
  if (trayScreen === 'settings') tray.setButtons(settingsButtons(), 'settings');
  else tray.setButtons(trayButtons(), 'actions');
}

function runTraySettings(act) {
  if (act === 'settings') trayScreen = 'settings';
  else if (act === 'settingsBack') trayScreen = 'actions';
  else if (act === 'passthrough') setPassthrough(!passthroughOn);
  else if (act === 'handles') {
    handlesOn = !handlesOn;
    applyHandleVisibility();
  }
  syncTrayButtons();
  sfx.click();
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
  const list = [...handles.pickables(), ...tray.pickables()];
  for (const m of boardView.vertexMarkers.values()) if (m.visible) list.push(m);
  for (const m of boardView.edgeMarkers.values()) if (m.visible && m.material.opacity > 0) list.push(m);
  for (const m of boardView.hexMarkers.values()) if (m.visible && m.material.opacity > 0) list.push(m);
  if (game && currentIntent() === 'robber') {
    for (const m of boardView.hexMeshes.values()) list.push(m);
    for (const m of boardView.tokenMeshes.values()) list.push(m);
  }
  return list;
}

function applyHit(obj) {
  if (!obj) return;
  const data = obj.userData;
  if (data.kind === 'tray') {
    if (TRAY_SETTINGS.has(data.action)) {
      runTraySettings(data.action);
      return;
    }
    if (!game || data.disabled) return;
    runHudAction(data.action);
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
    game.moveRobber(data.id);
    sfx.place();
    afterAction();
  }
}

function resolvePick(hits) {
  if (!hits.length) return null;
  const trayHit = hits.find((h) => h.object.userData?.kind === 'tray');
  if (trayHit) return trayHit.object;
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
  await pumpAI();
  refresh();
  presentModals();
}

async function pumpAI() {
  if (!game) return;
  busy = true;
  let guard = 0;
  while (needsAI() && guard++ < 60) {
    await sleep(game.phase === PHASE.MAIN || game.phase === PHASE.ROLL ? 700 : 320);
    const ok = takeAITurn(game);
    if (game.lastAction?.type === 'roll') {
      dice.placeFor(game.current, game.playerCount);
      dice.rollTo(game.dice);
      sfx.dice();
      playProduction();
      await sleep(Math.max(750, Math.ceil(production.timeLeft() * 1000)));
    }
    refresh();
    if (!ok) break;
  }
  busy = false;
}

function presentModals() {
  if (!game) return;
  if (game.phase === PHASE.GAME_OVER) {
    sfx.win();
    showWin(game);
    modalOpen = true;
    return;
  }
  if (game.phase === PHASE.DISCARD && game.discardQueue.some((d) => !game.player(d.player).isAI)) {
    modalOpen = true;
    showDiscard(game, (id, give) => {
      modalOpen = false;
      game.discard(id, give);
      afterAction();
    });
    return;
  }
  if (game.phase === PHASE.STEAL && game.isHuman()) {
    modalOpen = true;
    showSteal(game, (id) => {
      modalOpen = false;
      game.steal(id);
      afterAction();
    });
    return;
  }
  if (game.phase === PHASE.PLENTY && game.isHuman()) {
    modalOpen = true;
    showPlenty((a, b) => {
      modalOpen = false;
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

function onResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

function playProduction() {
  if (!game || game.lastAction?.type !== 'roll') return;
  production.play(game.lastAction.production, {
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
  afterAction,
  refresh,
};
