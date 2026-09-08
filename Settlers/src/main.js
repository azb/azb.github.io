import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { Game } from './game/Game.js';
import { takeAITurn } from './game/ai.js';
import { PHASE } from './game/constants.js';
import { createWorld } from './gfx/world.js';
import { BoardView } from './gfx/boardView.js';
import { DicePair, Tray } from './gfx/props.js';
import {
  renderHud,
  bindHud,
  showToast,
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
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.xr.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const stage = new THREE.Group();
stage.position.set(0, 0, -0.72);
scene.add(stage);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.05, 30);
camera.position.set(0, 1.42, 0.62);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.82, -0.72);
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

createWorld(stage);
const boardView = new BoardView(stage);
boardView.rebuild(new Game({ seed: 2026 }).board);
const dice = new DicePair(stage);
const tray = new Tray(stage);

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
  if (dx * dx + dy * dy < 25) pickFromCamera();
});

bindHud((act, extra) => {
  if (!game || busy) return;
  sfx.click();
  if (act === 'roll') {
    const d = game.roll();
    if (d) {
      dice.rollTo(d);
      sfx.dice();
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
});

renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  if (!renderer.xr.isPresenting) controls.update();
  dice.update(dt);
  if (renderer.xr.isPresenting) {
    for (const c of xrControllers) hoverController(c);
  }
  renderer.render(scene, camera);
});

updateVRButton();

function startGame() {
  game = new Game({ playerCount, solo });
  intent = null;
  boardView.rebuild(game.board);
  boardView.syncPieces(game);
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
  tray.setStatus(game.player().name + ' · ' + game.phase);
  tray.setButtons(trayButtons());
  updateHighlights();
}

function trayButtons() {
  if (!game) return [];
  const can = game.isHuman() && !busy;
  return [
    { label: 'Roll', action: 'roll', disabled: !(can && game.phase === PHASE.ROLL) },
    { label: 'Road', action: 'road', disabled: !(can && (game.phase === PHASE.MAIN || game.phase === PHASE.FREE_ROADS)) },
    { label: 'Settle', action: 'settlement', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'City', action: 'city', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Dev', action: 'dev', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'Trade', action: 'trade', disabled: !(can && game.phase === PHASE.MAIN) },
    { label: 'End', action: 'end', disabled: !(can && game.phase === PHASE.MAIN) },
  ];
}

function updateHighlights() {
  if (!game || !humanCanAct()) {
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
  } else {
    boardView.clearHighlights();
  }
}

function pickables() {
  const list = [...tray.buttons.map((b) => b.mesh)];
  for (const m of boardView.vertexMarkers.values()) if (m.visible && m.material.opacity > 0) list.push(m);
  for (const m of boardView.edgeMarkers.values()) if (m.visible && m.material.opacity > 0) list.push(m);
  for (const m of boardView.hexMarkers.values()) if (m.visible && m.material.opacity > 0) list.push(m);
  if (game && currentIntent() === 'robber') {
    for (const m of boardView.hexMeshes.values()) list.push(m);
    for (const m of boardView.tokenMeshes.values()) list.push(m);
  }
  return list;
}

function applyHit(obj) {
  if (!obj || !game) return;
  const data = obj.userData;
  if (data.kind === 'tray' && !data.disabled) {
    document.querySelector(`#action-bar [data-act="${data.action}"]`)?.click();
    return;
  }
  if (!humanCanAct()) return;
  if (data.kind === 'vertex') {
    const mode = currentIntent();
    if (mode === 'city') game.placeCity(data.id);
    else game.placeSettlement(data.id);
    sfx.place();
    intent = null;
    afterAction();
  } else if (data.kind === 'edge') {
    game.placeRoad(data.id);
    sfx.place();
    intent = null;
    afterAction();
  } else if (data.kind === 'hex') {
    game.moveRobber(data.id);
    sfx.place();
    afterAction();
  }
}

function pickFromCamera() {
  if (!game) return;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(pickables(), false);
  applyHit(hits[0]?.object);
}

function hoverController(controller) {
  const origin = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
  const dir = new THREE.Vector3(0, 0, -1).transformDirection(controller.matrixWorld);
  raycaster.set(origin, dir);
}

function setupXR() {
  const factory = new XRControllerModelFactory();
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffe6b0 });
  const controllers = [0, 1].map((i) => {
    const controller = renderer.xr.getController(i);
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1.2)]);
    controller.add(new THREE.Line(geo, lineMat));
    controller.addEventListener('select', () => {
      const origin = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
      const dir = new THREE.Vector3(0, 0, -1).transformDirection(controller.matrixWorld);
      raycaster.set(origin, dir);
      const hits = raycaster.intersectObjects(pickables(), false);
      applyHit(hits[0]?.object);
    });
    scene.add(controller);
    const grip = renderer.xr.getControllerGrip(i);
    grip.add(factory.createControllerModel(grip));
    scene.add(grip);
    return controller;
  });
  return controllers;
}

async function enterVR() {
  sfx.unlock();
  if (!navigator.xr) {
    showToast('WebXR is not available in this browser.');
    return;
  }
  const hud = document.getElementById('hud');
  try {
    const session = await navigator.xr.requestSession('immersive-vr', {
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'dom-overlay'],
      domOverlay: { root: hud },
    });
    renderer.xr.setReferenceSpaceType('local-floor');
    await renderer.xr.setSession(session);
    session.addEventListener('end', () => updateVRButton());
  } catch {
    try {
      const session = await navigator.xr.requestSession('immersive-vr', {
        optionalFeatures: ['local-floor', 'bounded-floor'],
      });
      renderer.xr.setReferenceSpaceType('local-floor');
      await renderer.xr.setSession(session);
    } catch {
      showToast('Could not start a VR session.');
    }
  }
}

async function updateVRButton() {
  const btn = document.getElementById('vr-btn');
  if (!navigator.xr || !(await navigator.xr.isSessionSupported?.('immersive-vr'))) {
    btn.textContent = 'VR unavailable';
    btn.disabled = true;
  } else {
    btn.textContent = 'Enter VR';
    btn.disabled = false;
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
      dice.rollTo(game.dice);
      sfx.dice();
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
