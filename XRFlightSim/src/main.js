import * as THREE from "three";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.9.1/build/index.module.js";
import { bindControlSurfaces, createSceneObject, FLIGHT_SCENE_URL, loadFlightScene, sceneRole, setSceneMaterialLibrary } from "./scene-format.js?v=0.5.61";
import { createGamePanel, createMultiplayerMenu, createPauseMenu, createScoreboardMenu, createSettingsMenu, createUiButton, findUiButton, listClickableUiButtons, loadSettings, saveSettings, setUiButtonHovers } from "./ui-menus.js?v=0.5.61";
import { FlightMultiplayerSession, firebaseErrorMessage, normalizeRoomCode } from "./net/session.js?v=0.5.61";
import { createAiFleet, PLANE_MAX_HEALTH } from "./ai-planes.js?v=0.5.61";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const canvas = document.querySelector("#scene");
const speedLabel = document.querySelector("#speed");
const throttleLabel = document.querySelector("#throttle");
const statusLabel = document.querySelector("#status");
const controllerLabel = document.querySelector("#controllers");
const modelLabel = document.querySelector("#model");
const vrButton = document.querySelector("#enter-vr");
const resetButton = document.querySelector("#reset");
const mpHostButton = document.querySelector("#mp-host");
const mpJoinButton = document.querySelector("#mp-join");
const mpLeaveButton = document.querySelector("#mp-leave");
const mpCodeInput = document.querySelector("#mp-code");
const mpStatusLabel = document.querySelector("#mp-status");
const mpHudLabel = document.querySelector("#mp-hud");
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (a, b, t) => a + (b - a) * t;
const assetUrl = (path) => new URL(`../assets/${path}`, import.meta.url).href;
// Spectacles world wingspan (m): mesh 2.84433 × Player 0.296423 × Model 0.005933 × FBX×100
const lensWingspan = 0.500226;
const worldSpeedScale = .05;
let engineContext = null;
let engineGain = null;
let enginePanner = null;
let engineSource = null;
let engineBuffer = null;
let engineLoad = null;
/** Shared spatial engine loops for AI + remote planes (not the local player). */
const OTHER_ENGINE_MAX = 8;
/** Relative loudness vs the local player engine at the same distance. */
const OTHER_ENGINE_LEVEL = 0.62;
/** @type {{ source: AudioBufferSourceNode, gain: GainNode, panner: PannerNode }[]} */
const otherEngineVoices = [];
const otherEnginePos = new THREE.Vector3();
const otherEngineToListener = new THREE.Vector3();
/** @type {{ root: THREE.Object3D, velocity?: THREE.Vector3, throttle: number }[]} */
const otherEngineTargets = [];
const balloonPopUrl = assetUrl("audio/BalloonPop.wav");
const explosionUrl = assetUrl("audio/explosion.wav");
const shootUrl = assetUrl("audio/shoot.wav");
let shootBuffer = null;
let shootLoad = null;
let explosionBuffer = null;
let explosionLoad = null;
const shootWorldPos = new THREE.Vector3();
const explosionWorldPos = new THREE.Vector3();
const inputProfilesBase = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/";
const localControllerModelUrls = {
  left: assetUrl("controllers/meta-quest-touch-pro-left.glb?v=0.4.23"),
  right: assetUrl("controllers/meta-quest-touch-pro-right.glb?v=0.4.23"),
};
const instructionControllerGuideSize = .54;
const instructionControllerSlots = {};
let inputProfilesList = null;

// alpha:true is required for WebXR passthrough (alpha-blend). Without it, clear
// alpha is ignored and AR sessions composite as an opaque black wall (common on AVP).
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType("local-floor");
function syncRendererResolution() {
  // Retina DPR in XR is a common micro-stutter source; keep desktop sharp.
  renderer.setPixelRatio(renderer.xr.isPresenting ? 1 : Math.min(devicePixelRatio, 2));
}
syncRendererResolution();
renderer.setClearColor(0x8ac5ee, 1);
const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.Fog(0x8ac5ee, 70, 350);
const camera = new THREE.PerspectiveCamera(70, 1, .05, 600);
camera.position.set(0, 2.1, 4.8);
// World content that should follow Quest/AVP floor calibration (not real-world meshes).
const playSpace = new THREE.Group();
playSpace.name = "Play Space";
scene.add(playSpace);
const virtualEnvironment = new THREE.Group();
playSpace.add(virtualEnvironment);
// Room props (landing strip) stay visible in passthrough; ground/grid hide with virtualEnvironment.
const roomContent = new THREE.Group();
playSpace.add(roomContent);
const planeRoot = new THREE.Group();
playSpace.add(planeRoot);

// Lens OffScreenPlaneArrow — camera-edge chevron when the plane leaves the FOV.
// Lens units are ~cm (depth 70); WebXR uses meters.
const OFFSCREEN_ARROW_DEPTH = 0.7;
const OFFSCREEN_ARROW_EDGE_INSET = 0.58;
const OFFSCREEN_ARROW_VISIBLE_INSET = 0.08;
const OFFSCREEN_ARROW_LENGTH = 0.055;
const OFFSCREEN_ARROW_THICKNESS = 0.007;
const OFFSCREEN_OTHER_SIZE = 0.55;
const OFFSCREEN_OTHER_POOL = 6;
const OFFSCREEN_LOOK_Z = -1;
const offScreenPlaneLocal = new THREE.Vector3();
const offScreenTargetWorld = new THREE.Vector3();
const offScreenArrowLocalPos = new THREE.Vector3();
const offScreenArrowPointQuat = new THREE.Quaternion();
const offScreenArrowEuler = new THREE.Euler();
let offScreenArrowShowing = false;
const offScreenOtherShowing = [];

function createOffScreenPlaneArrow(color = 0xffe626, sizeScale = 1, name = "Off Screen Plane Arrow") {
  const root = new THREE.Group();
  root.name = name;
  root.visible = false;
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const geometry = new THREE.PlaneGeometry(1, 1);
  const spread = THREE.MathUtils.degToRad(28);
  const length = OFFSCREEN_ARROW_LENGTH * sizeScale;
  const thickness = OFFSCREEN_ARROW_THICKNESS * sizeScale;
  for (const angle of [spread, -spread]) {
    const stroke = new THREE.Mesh(geometry, material);
    stroke.renderOrder = 25;
    stroke.frustumCulled = false;
    stroke.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
    offScreenArrowLocalPos.set(0, -length * 0.5, 0).applyQuaternion(stroke.quaternion);
    stroke.position.copy(offScreenArrowLocalPos);
    stroke.scale.set(thickness, length, 1);
    root.add(stroke);
  }
  scene.add(root);
  return root;
}
const offScreenPlaneArrow = createOffScreenPlaneArrow(0xffe626, 1, "Off Screen Player Arrow");
const offScreenOtherArrows = [];
for (let i = 0; i < OFFSCREEN_OTHER_POOL; i += 1) {
  offScreenOtherArrows.push(
    createOffScreenPlaneArrow(0xff2e1f, OFFSCREEN_OTHER_SIZE, `Off Screen Other Arrow ${i}`),
  );
  offScreenOtherShowing.push(false);
}
scene.add(new THREE.HemisphereLight(0xdceeff, 0x263f24, 3.2));
const sun = new THREE.DirectionalLight(0xfff2d4, 3.2); sun.position.set(25, 55, 10); scene.add(sun);
/** Runway deck height in play-space meters (matches LandingStrip). */
const RUNWAY_Y = 0.3865;
/** Grass slightly below the strip so coplanar meshes don't z-fight. */
const GROUND_DECK_Y = RUNWAY_Y - 0.02;
/** Plane origin sits slightly above the strip when parked. */
const GROUND_CONTACT_Y = 0.5;
const GROUND_BOUNCE_RESTITUTION = 0.55;
const GROUND_HIT_COOLDOWN_SEC = 0.45;
const ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshStandardMaterial({ color: 0x4c7e42, roughness: 1 }));
ground.rotation.x = -Math.PI / 2; ground.position.y = GROUND_DECK_Y; virtualEnvironment.add(ground);
const grid = new THREE.GridHelper(1000, 100, 0x6ca760, 0x47794a); grid.position.y = RUNWAY_Y + 0.02; virtualEnvironment.add(grid);
// Opaque sky fill for passthrough-off. Clear color alone is ignored in AR alpha-blend
// sessions, so the upper hemisphere stays see-through without a real mesh.
const SKY_COLOR = 0x8ac5ee;
const opaqueSky = new THREE.Mesh(
  new THREE.SphereGeometry(450, 24, 16),
  new THREE.MeshBasicMaterial({
    color: SKY_COLOR,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  }),
);
opaqueSky.name = "Opaque Sky";
opaqueSky.renderOrder = -20;
opaqueSky.frustumCulled = false;
opaqueSky.visible = true;
scene.add(opaqueSky);

function createWorldPanel(lines, width, height, accent = "#82cfff") {
  const canvas = document.createElement("canvas");
  canvas.width = 1536; canvas.height = 768;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgba(4, 20, 34, .88)";
  context.strokeStyle = accent;
  context.lineWidth = 6;
  context.beginPath(); context.roundRect(14, 14, canvas.width - 28, canvas.height - 28, 34); context.fill(); context.stroke();
  lines.forEach(({ text, x = 76, y, size = 42, color = "#eaf6ff", align = "left" }) => {
    context.fillStyle = color; context.font = `${size}px system-ui, sans-serif`; context.textAlign = align; context.fillText(text, x, y);
  });
  const material = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthTest: false, depthWrite: false });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  panel.renderOrder = 5;
  return panel;
}
function worldText(text, position, scale = .28) { const canvas = document.createElement("canvas"); canvas.width = 1536; canvas.height = 200; const c = canvas.getContext("2d"); c.fillStyle = "rgba(8, 16, 27, .94)"; c.fillRect(0, 0, canvas.width, canvas.height); c.fillStyle = "#ffffff"; c.font = "bold 78px system-ui"; c.textAlign = "center"; c.fillText(text, 768, 124); const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthTest: false })); sprite.position.copy(position); sprite.scale.set(scale * 5.6, scale, 1); return sprite; }
function callout(group, text, start, end) { group.add(worldText(text, start, .25)); const direction = end.clone().sub(start).normalize(); group.add(new THREE.ArrowHelper(direction, start, end.distanceTo(start), 0x1686ff, .1, .055)); }
function fitInstructionControllerModel(model, hand) {
  const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
  model.scale.setScalar(instructionControllerGuideSize / Math.max(size.x, size.y, size.z, .001));
  model.rotation.set(0, hand === "left" ? -.18 : .18, 0);
}
function loadLocalInstructionController(hand, slot) {
  if (!slot || slot.loaded || slot.loading) return;
  slot.loading = true;
  new GLTFLoader().load(localControllerModelUrls[hand], (gltf) => {
    if (slot.loaded) return;
    const model = gltf.scene;
    fitInstructionControllerModel(model, hand);
    slot.slot.add(model);
    slot.fallback.visible = false;
    slot.loaded = true;
    slot.loading = false;
  }, undefined, (error) => {
    slot.loading = false;
    console.warn(`Local Quest ${hand} controller failed; keeping guide fallback`, error);
  });
}
function questController(hand) {
  const group = new THREE.Group();
  const fallback = new THREE.Group();
  const shell = new THREE.MeshStandardMaterial({ color: 0xe9edf1, roughness: .48, metalness: .12 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b2229, roughness: .35 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(.15, .42, 6, 12), shell);
  body.rotation.z = hand === "left" ? -.18 : .18;
  fallback.add(body);
  const top = new THREE.Mesh(new THREE.SphereGeometry(.2, 16, 12), shell);
  top.position.y = .25; top.scale.set(1, .42, .7); fallback.add(top);
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(.065, .065, .045, 16), dark);
  stick.position.set(hand === "left" ? -.06 : .06, .3, .1); stick.rotation.x = Math.PI / 2; fallback.add(stick);
  const grip = new THREE.Mesh(new THREE.BoxGeometry(.13, .18, .16), dark);
  grip.position.set(hand === "left" ? -.16 : .16, -.08, .05); fallback.add(grip);
  const trigger = new THREE.Mesh(new THREE.BoxGeometry(.12, .07, .13), dark);
  trigger.position.set(0, .43, -.08); fallback.add(trigger);
  const menu = new THREE.Mesh(new THREE.CylinderGeometry(.028, .028, .02, 12), dark);
  menu.position.set(.07, .31, .1); menu.rotation.x = Math.PI / 2;
  if (hand === "left") fallback.add(menu);
  group.add(fallback);
  return { group, fallback, stick: stick.position.clone(), grip: grip.position.clone(), trigger: trigger.position.clone(), menu: menu.position.clone() };
}
function createControlsPanel() {
  const panel = new THREE.Group();
  const backing = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 2.3), new THREE.MeshBasicMaterial({ color: 0x0b1826, depthWrite: false }));
  backing.renderOrder = 3; panel.add(backing);
  panel.add(worldText("CONTROLS", new THREE.Vector3(0, .92, .03), .3));
  const left = questController("left"), right = questController("right");
  left.group.position.set(-.55, -.12, .12); right.group.position.set(.55, -.12, .12);
  panel.add(left.group, right.group);
  instructionControllerSlots.left = { slot: left.group, fallback: left.fallback, loaded: false, loading: false };
  instructionControllerSlots.right = { slot: right.group, fallback: right.fallback, loaded: false, loading: false };
  loadLocalInstructionController("left", instructionControllerSlots.left);
  loadLocalInstructionController("right", instructionControllerSlots.right);
  const L = (v) => v.add(left.group.position), R = (v) => v.add(right.group.position);
  callout(panel, "DECREASE THROTTLE", new THREE.Vector3(-1.04, .55, .13), L(left.grip));
  callout(panel, "STEER LEFT / RIGHT", new THREE.Vector3(-1.03, -.53, .13), L(left.stick));
  callout(panel, "MENU: PAUSE / RESUME", new THREE.Vector3(-1.05, .08, .13), L(left.menu));
  callout(panel, "INCREASE THROTTLE", new THREE.Vector3(1.04, .55, .13), R(right.grip));
  callout(panel, "FIRE", new THREE.Vector3(.94, .79, .13), R(right.trigger));
  callout(panel, "ROLL / PITCH", new THREE.Vector3(1.04, -.53, .13), R(right.stick));
  panel.add(worldText("OK · A OR POINT + TRIGGER", new THREE.Vector3(0, -.9, .13), .22));
  return panel;
}
let controlsPanel = createControlsPanel(); controlsPanel.position.set(0, 0.55, -1.4); playSpace.add(controlsPanel);
async function loadInstructionControllerModels(session) {
  for (const hand of ["left", "right"]) loadLocalInstructionController(hand, instructionControllerSlots[hand]);
  try {
    inputProfilesList ??= await fetch(`${inputProfilesBase}profilesList.json`).then((response) => response.json());
    for (const source of session.inputSources) {
      const hand = source.handedness;
      const slot = instructionControllerSlots[hand];
      if (!slot || slot.loaded || slot.loading) continue;
      const profileId = source.profiles.find((id) => inputProfilesList[id]);
      if (!profileId) continue;
      const profileUrl = new URL(inputProfilesList[profileId], inputProfilesBase).href;
      const profile = await fetch(profileUrl).then((response) => response.json());
      const layout = profile.layouts?.[hand] ?? profile.layouts?.none;
      if (!layout?.assetPath) continue;
      slot.loading = true;
      new GLTFLoader().load(new URL(layout.assetPath, profileUrl).href, (gltf) => {
        if (slot.loaded) return;
        const model = gltf.scene;
        fitInstructionControllerModel(model, hand);
        slot.slot.add(model); slot.fallback.visible = false; slot.loaded = true; slot.loading = false;
      }, undefined, (error) => {
        slot.loading = false;
        console.warn("Controller profile model failed", error);
      });
    }
  } catch (error) { console.warn("Controller profile lookup failed; using guide fallback", error); }
}
const gameSettings = loadSettings();
if (!gameSettings.playerName) gameSettings.playerName = "Player 1";
let returnToPauseAfterControls = false;
/** @type {"controls" | "game" | "pause" | "settings" | "multiplayer" | "scoreboard"} */
let uiMode = "controls";
/** Match length in seconds (dogfight round). */
const MATCH_DURATION_SEC = 180;
let matchActive = false;
let matchEnded = false;
let matchTimeLeft = MATCH_DURATION_SEC;
let localNameTag = null;

/** Controls board stays up while the plane still flies (try-before-OK). */
function isFlightLiveUi() {
  return uiMode === "game" || uiMode === "controls";
}

let bulletCollidersDirty = true;
function markBulletCollidersDirty() {
  bulletCollidersDirty = true;
}
function applyGameSettings() {
  markBulletCollidersDirty();
  saveSettings(gameSettings);
  if (engineGain && engineContext && typeof flight !== "undefined") {
    const time = engineContext.currentTime;
    const base = simulationPaused ? 0 : lerp(0.28, 1, flight.throttle);
    engineGain.gain.setTargetAtTime(
      base * gameSettings.engineVolume * gameSettings.masterVolume,
      time,
      0.04,
    );
  }
}

function dismissControlsToGame() {
  returnToPauseAfterControls = false;
  showUiMode("game");
}

/** Menus sit at tracked hand height, in front of the player (platform-agnostic). */
const UI_MENU_DISTANCE = 1.25;
/** Fallback when no hands/controllers yet: meters below the headset. */
const UI_HEAD_FALLBACK_DROP = 0.45;
/** Keep panel between these offsets below the headset (no absolute floor clamps). */
const UI_BELOW_HEAD_MIN = 0.18;
const UI_BELOW_HEAD_MAX = 0.9;
/** Viewer pose below this (local-floor meters) is treated as not ready yet. */
const UI_HEAD_READY_MIN_Y = 0.35;
/** Re-place once hands/controllers report a pose after XR starts / play-space shifts. */
let uiAwaitingHandAnchor = false;
/** Pause-menu world yaw recenter (align playSpace to headset facing). */
let worldRecenterActive = false;
let worldRecenterEndsAt = 0;
const WORLD_RECENTER_SEC = 5;
const recenterCamFwd = new THREE.Vector3();
const recenterContentFwd = new THREE.Vector3();
const recenterPivot = new THREE.Vector3();
const recenterRel = new THREE.Vector3();
const recenterYawQ = new THREE.Quaternion();
const recenterWorldPos = new THREE.Vector3();
const recenterWorldQuat = new THREE.Quaternion();
const recenterUp = new THREE.Vector3(0, 1, 0);

function showUiMode(mode) {
  if (worldRecenterActive && mode !== "pause") return;
  uiMode = mode;
  const showControls = mode === "controls";
  const showGame = mode === "game";
  const showPause = mode === "pause";
  const showSettings = mode === "settings";
  const showMultiplayer = mode === "multiplayer";
  const showScoreboard = mode === "scoreboard";
  controlsVisible = showControls;
  if (controlsPanel) controlsPanel.visible = showControls;
  if (controlsOkButton) controlsOkButton.visible = showControls;
  if (gamePanel) gamePanel.visible = showGame;
  if (pausePanel) pausePanel.visible = showPause;
  if (settingsPanel) settingsPanel.visible = showSettings;
  if (multiplayerPanel) multiplayerPanel.visible = showMultiplayer;
  if (scoreboardPanel) scoreboardPanel.visible = showScoreboard;
  // Stay live on the controls board so players can test sticks/keys before OK.
  const shouldPause = mode !== "game" && mode !== "controls";
  simulationPaused = shouldPause;
  if (shouldPause) {
    pauseEngineSound();
    statusLabel.textContent = mode === "settings"
      ? "Settings"
      : mode === "multiplayer"
        ? "Multiplayer"
        : mode === "scoreboard"
          ? "Match over · scoreboard"
          : "Simulation paused";
  } else {
    startEngineSound();
    statusLabel.textContent = mode === "controls"
      ? (renderer.xr.isPresenting
        ? "Try controls · OK when ready · X pauses"
        : "Try controls · arrows/WASD · X/Z throttle · OK when ready")
      : (renderer.xr.isPresenting
        ? "Flying · R pinch steer · L pinch fire · menu pauses"
        : "Desktop preview · arrows/WASD · X/Z throttle");
  }
  if (showGame) {
    setUiButtonHovers(draggableUiPanels(), null);
    gamePanel?.userData.setThrottle?.(flight?.throttle ?? 0);
    gamePanel?.userData.setScore?.(killScore);
    gamePanel?.userData.setMatchTime?.(matchTimeLeft);
    ensureBalloonsSeeded();
    if (!matchActive && !matchEnded) startMatch();
  }
  if (showMultiplayer) refreshMultiplayerUi();
  if (showScoreboard) refreshScoreboardPanel();
  // Snap to hand height in front of the player whenever a menu/HUD opens.
  if (
    mode === "controls" || mode === "pause" || mode === "settings"
    || mode === "game" || mode === "multiplayer" || mode === "scoreboard"
  ) {
    placeMenusInFrontOfPlayer();
  }
  applyGameSettings();
}

function beginWorldRecenter() {
  if (worldRecenterActive || !playSpace) return;
  worldRecenterActive = true;
  worldRecenterEndsAt = performance.now() / 1000 + WORLD_RECENTER_SEC;
  showUiMode("pause");
  pausePanel?.userData.setPauseRecentering?.(true, WORLD_RECENTER_SEC);
  applyPlaySpaceRecenterToFacing();
}

function tickWorldRecenter() {
  if (!worldRecenterActive) return;
  const left = Math.max(0, worldRecenterEndsAt - performance.now() / 1000);
  pausePanel?.userData.setPauseRecentering?.(true, left);
  applyPlaySpaceRecenterToFacing();
  if (left > 0) return;
  worldRecenterActive = false;
  pausePanel?.userData.setPauseRecentering?.(false);
  showUiMode("pause");
}

/** Yaw-rotate playSpace around the headset so content forward matches look. */
function applyPlaySpaceRecenterToFacing() {
  if (!playSpace) return;
  const viewCam = typeof engineListenerObject === "function" ? engineListenerObject() : camera;
  if (!viewCam) return;
  viewCam.updateMatrixWorld(true);
  viewCam.getWorldPosition(recenterPivot);
  viewCam.getWorldQuaternion(recenterWorldQuat);
  recenterCamFwd.set(0, 0, -1).applyQuaternion(recenterWorldQuat);
  recenterCamFwd.y = 0;
  if (recenterCamFwd.lengthSq() < 1e-6) return;
  recenterCamFwd.normalize();

  const contentRoot = typeof planeRoot !== "undefined" && planeRoot ? planeRoot : playSpace;
  contentRoot.getWorldQuaternion(recenterWorldQuat);
  recenterContentFwd.set(0, 0, -1).applyQuaternion(recenterWorldQuat);
  recenterContentFwd.y = 0;
  if (recenterContentFwd.lengthSq() < 1e-6) recenterContentFwd.set(0, 0, -1);
  else recenterContentFwd.normalize();

  const crossY = recenterContentFwd.x * recenterCamFwd.z - recenterContentFwd.z * recenterCamFwd.x;
  const dot = THREE.MathUtils.clamp(recenterContentFwd.dot(recenterCamFwd), -1, 1);
  const angle = Math.atan2(crossY, dot);
  if (Math.abs(angle) < 0.002) return;

  recenterYawQ.setFromAxisAngle(recenterUp, angle);
  playSpace.getWorldPosition(recenterWorldPos);
  playSpace.getWorldQuaternion(recenterWorldQuat);
  recenterRel.subVectors(recenterWorldPos, recenterPivot).applyQuaternion(recenterYawQ);
  recenterWorldPos.copy(recenterPivot).add(recenterRel);
  recenterWorldQuat.premultiply(recenterYawQ);
  playSpace.position.copy(recenterWorldPos);
  playSpace.quaternion.copy(recenterWorldQuat);
  placeMenusInFrontOfPlayer();
}

let pausePanel = createPauseMenu({
  onResume: () => {
    if (worldRecenterActive) return;
    showUiMode("game");
  },
  onRecenterView: () => beginWorldRecenter(),
  onControls: () => {
    if (worldRecenterActive) return;
    returnToPauseAfterControls = true;
    showUiMode("controls");
  },
  onSettings: () => {
    if (worldRecenterActive) return;
    settingsPanel.userData.refreshSettingsLabels?.();
    showUiMode("settings");
  },
  onMultiplayer: () => {
    if (worldRecenterActive) return;
    showUiMode("multiplayer");
  },
  onRestart: () => {
    if (worldRecenterActive) return;
    resetPlayerFlight();
    showUiMode("game");
  },
});
pausePanel.position.set(0, 0.55, -1.4);
pausePanel.visible = false;
playSpace.add(pausePanel);

const gamePanel = createGamePanel({
  onMenu: () => showUiMode("pause"),
});
gamePanel.position.set(0, 0.55, -1.4);
gamePanel.visible = false;
playSpace.add(gamePanel);

let xrSessionHasMeshDetection = false;
/** @type {string | null} */
let xrSessionMode = null;
/** @type {string | null | undefined} */
let xrSessionBlend = null;
const settingsPanel = createSettingsMenu(gameSettings, {
  onBack: () => showUiMode("pause"),
  onChange: () => {
    applyGameSettings();
    updateLocalNameTag();
    if (renderer.xr.isPresenting && xrSessionMode) {
      applySessionPresentation(xrSessionMode, xrSessionBlend);
      const canPassthrough = xrSessionMode === "immersive-ar" || isPassthroughBlend(xrSessionBlend);
      if (gameSettings.passthrough && !canPassthrough) {
        statusLabel.textContent = "Passthrough on · re-enter XR for camera";
      }
    }
    // mesh-detection is only requested at session start.
    if (
      renderer.xr.isPresenting
      && (gameSettings.meshVisual || gameSettings.meshCollision)
      && !xrSessionHasMeshDetection
    ) {
      statusLabel.textContent = "Mesh on - re-enter XR to enable detection";
    }
  },
});
settingsPanel.position.set(0, 0.55, -1.4);
settingsPanel.visible = false;
playSpace.add(settingsPanel);

const multiplayerPanel = createMultiplayerMenu({
  onHost: () => hostMultiplayerRoom(),
  onJoin: () => joinMultiplayerRoom(),
  onLeave: () => leaveMultiplayerRoom(),
  onBack: () => showUiMode("pause"),
});
multiplayerPanel.position.set(0, 0.55, -1.4);
multiplayerPanel.visible = false;
playSpace.add(multiplayerPanel);

const scoreboardPanel = createScoreboardMenu({
  onPlayAgain: () => {
    startMatch();
    resetPlayerFlight({ keepScore: false });
    showUiMode("game");
  },
  onMenu: () => showUiMode("pause"),
});
scoreboardPanel.position.set(0, 0.55, -1.4);
scoreboardPanel.visible = false;
playSpace.add(scoreboardPanel);

const controlsOkButton = createUiButton("OK · A", 1.35, 0.32);
controlsOkButton.position.set(0, -1.2, 0.06);
controlsOkButton.userData.uiButton.onClick = () => {
  if (returnToPauseAfterControls) {
    returnToPauseAfterControls = false;
    showUiMode("pause");
    return;
  }
  dismissControlsToGame();
};
let controlsOkButtonWasPressed = false;

/** Right-controller A (xr-standard button 4) confirms the controls screen. */
function pollControlsOkShortcut() {
  if (uiMode !== "controls") {
    controlsOkButtonWasPressed = false;
    return;
  }
  // Bluetooth pad uses Cross/A via pollGamepadMenuNavigation instead.
  if (findBrowserGamepad(renderer.xr.getSession()?.inputSources ?? [])) return;
  let aDown = false;
  const session = renderer.xr.getSession();
  if (session) {
    for (const source of session.inputSources) {
      if (source.hand || source.handedness !== "right") continue;
      const button = source.gamepad?.buttons?.[4];
      aDown ||= Boolean(button?.pressed) || (button?.value ?? 0) > 0.5;
    }
  }
  if (aDown && !controlsOkButtonWasPressed) {
    controlsOkButton.userData.uiButton.onClick?.();
  }
  controlsOkButtonWasPressed = aDown;
}

/** Gamepad D-pad / left-stick focus + A confirm for menu screens. */
let gamepadMenuFocusIndex = 0;
let gamepadMenuFocusMode = "";
/** @type {THREE.Object3D | null} */
let gamepadMenuFocusedButton = null;
/** @type {THREE.Object3D | null} */
let gamepadMenuPressedButton = null;
let gamepadMenuConfirmHeld = false;
let gamepadMenuBackHeld = false;
let gamepadMenuNavDir = 0;
let gamepadMenuNavNextMs = 0;

function activeMenuRoot() {
  if (uiMode === "pause") return pausePanel;
  if (uiMode === "settings") return settingsPanel;
  if (uiMode === "multiplayer") return multiplayerPanel;
  if (uiMode === "scoreboard") return scoreboardPanel;
  if (uiMode === "controls") return controlsPanel;
  return null;
}

function clearGamepadMenuNav() {
  if (gamepadMenuPressedButton?.userData?.uiButton) {
    gamepadMenuPressedButton.userData.uiButton.setPressed(false);
  }
  gamepadMenuPressedButton = null;
  gamepadMenuFocusedButton = null;
  gamepadMenuConfirmHeld = false;
  gamepadMenuBackHeld = false;
  gamepadMenuNavDir = 0;
}

function pollGamepadMenuNavigation() {
  if (uiMode === "game") {
    if (gamepadMenuFocusedButton || gamepadMenuPressedButton) clearGamepadMenuNav();
    gamepadMenuFocusMode = "";
    return;
  }
  const xrSources = renderer.xr.getSession()?.inputSources ?? [];
  const pad = findBrowserGamepad(xrSources);
  if (!pad) {
    if (gamepadMenuFocusedButton || gamepadMenuPressedButton) {
      clearGamepadMenuNav();
      if (!renderer.xr.isPresenting) setUiButtonHovers(draggableUiPanels(), null);
    }
    return;
  }

  const panel = activeMenuRoot();
  if (!panel?.visible) {
    clearGamepadMenuNav();
    return;
  }
  const buttons = listClickableUiButtons(panel);
  if (!buttons.length) {
    clearGamepadMenuNav();
    return;
  }

  if (gamepadMenuFocusMode !== uiMode) {
    gamepadMenuFocusMode = uiMode;
    gamepadMenuFocusIndex = 0;
    if (gamepadMenuPressedButton?.userData?.uiButton) {
      gamepadMenuPressedButton.userData.uiButton.setPressed(false);
    }
    gamepadMenuPressedButton = null;
    gamepadMenuConfirmHeld = false;
  }
  gamepadMenuFocusIndex = Math.max(0, Math.min(buttons.length - 1, gamepadMenuFocusIndex));

  const stickY = pad.axes[1] ?? 0;
  const dpadUp = Boolean(pad.buttons[12]?.pressed);
  const dpadDown = Boolean(pad.buttons[13]?.pressed);
  let nav = 0;
  if (dpadUp || stickY < -0.55) nav = -1;
  else if (dpadDown || stickY > 0.55) nav = 1;

  const now = performance.now();
  if (nav === 0) {
    gamepadMenuNavDir = 0;
  } else if (nav !== gamepadMenuNavDir) {
    gamepadMenuFocusIndex = Math.max(0, Math.min(buttons.length - 1, gamepadMenuFocusIndex + nav));
    gamepadMenuNavDir = nav;
    gamepadMenuNavNextMs = now + 320;
  } else if (now >= gamepadMenuNavNextMs) {
    gamepadMenuFocusIndex = Math.max(0, Math.min(buttons.length - 1, gamepadMenuFocusIndex + nav));
    gamepadMenuNavNextMs = now + 140;
  }

  const focused = buttons[gamepadMenuFocusIndex];
  gamepadMenuFocusedButton = focused;

  // A / Cross — press on down, click on release (same as ray UX).
  const confirm = Boolean(pad.buttons[0]?.pressed);
  if (confirm && !gamepadMenuConfirmHeld) {
    gamepadMenuPressedButton = focused;
    focused.userData.uiButton.setPressed(true);
  }
  if (!confirm && gamepadMenuConfirmHeld) {
    const pressed = gamepadMenuPressedButton;
    if (pressed?.userData?.uiButton) pressed.userData.uiButton.setPressed(false);
    if (pressed && pressed === focused) pressed.userData.uiButton.onClick?.();
    gamepadMenuPressedButton = null;
  }
  gamepadMenuConfirmHeld = confirm;
  if (gamepadMenuConfirmHeld && gamepadMenuPressedButton?.userData?.uiButton) {
    gamepadMenuPressedButton.userData.uiButton.setPressed(
      gamepadMenuPressedButton === focused,
    );
  }

  // B / Circle — back from settings (or controls opened from pause).
  const back = Boolean(pad.buttons[1]?.pressed);
  if (back && !gamepadMenuBackHeld) {
    if (uiMode === "settings") {
      showUiMode("pause");
    } else if (uiMode === "controls" && returnToPauseAfterControls) {
      returnToPauseAfterControls = false;
      showUiMode("pause");
    }
  }
  gamepadMenuBackHeld = back;

  if (!renderer.xr.isPresenting) {
    setUiButtonHovers(draggableUiPanels(), focused);
  }
}
function attachControlsOkButton(panel) {
  if (!panel || controlsOkButton.parent === panel) return;
  if (controlsOkButton.parent) controlsOkButton.parent.remove(controlsOkButton);
  panel.add(controlsOkButton);
  controlsOkButton.visible = panel.visible;
}
attachControlsOkButton(controlsPanel);

/** XR distance-drag for floating UI panels (Lens Floating UI / ContainerFrame translation). */
const uiRaycaster = new THREE.Raycaster();
uiRaycaster.far = 12;
const uiRayOrigin = new THREE.Vector3();
const uiRayDir = new THREE.Vector3();
const uiRayQuat = new THREE.Quaternion();
const uiHitPoint = new THREE.Vector3();
const uiPanelWorld = new THREE.Vector3();
const uiGrabOffset = new THREE.Vector3();
const uiTempWorld = new THREE.Vector3();
const uiParentQuat = new THREE.Quaternion();
const uiFaceQuat = new THREE.Quaternion();
const uiFaceLocalZ = new THREE.Vector3(0, 0, 1);
const uiFaceTowardPlayer = new THREE.Vector3();
const uiFaceRight = new THREE.Vector3();
const uiFaceUp = new THREE.Vector3();
const uiFaceMatrix = new THREE.Matrix4();
const uiWorldUp = new THREE.Vector3(0, 1, 0);
/** @type {{ controller: THREE.Object3D, panel: THREE.Object3D, distance: number, offsetWorld: THREE.Vector3 } | null} */
let uiDrag = null;
let uiPointerBlocksFire = false;

/** True when a tracked pose looks usable (not stuck at the origin). */
function isPlausibleTrackedPose(worldPos, headY) {
  if (!Number.isFinite(worldPos.y)) return false;
  if (Math.abs(worldPos.y - headY) > 1.5) return false;
  // Reject the default zero pose before XR joints/controllers stream.
  const awayFromOrigin = worldPos.lengthSq() > 0.01;
  const notCoincidentWithHead = Math.abs(worldPos.y - headY) > 0.04
    || Math.hypot(worldPos.x - uiPanelWorld.x, worldPos.z - uiPanelWorld.z) > 0.08;
  return awayFromOrigin && notCoincidentWithHead;
}

/** Average Y of tracked controllers / hand wrists near the headset. */
function sampleTrackedHandHeight(headY) {
  let sumY = 0;
  let count = 0;
  for (let i = 0; i < 2; i += 1) {
    // Prefer grip; fall back to target-ray. Do not require inputSource — Quest
    // often has a pose a frame or two before the connected event lands.
    const grip = renderer.xr.getControllerGrip?.(i) ?? renderer.xr.getController(i);
    if (grip) {
      grip.updateMatrixWorld(true);
      grip.getWorldPosition(uiHitPoint);
      if (isPlausibleTrackedPose(uiHitPoint, headY)) {
        sumY += uiHitPoint.y;
        count += 1;
      }
    }
    const hand = renderer.xr.getHand(i);
    if (!hand) continue;
    const wrist = hand.joints?.wrist ?? hand.joints?.["index-finger-metacarpal"];
    if (!wrist) continue;
    wrist.updateMatrixWorld?.(true);
    wrist.getWorldPosition(uiHitPoint);
    if (isPlausibleTrackedPose(uiHitPoint, headY)) {
      sumY += uiHitPoint.y;
      count += 1;
    }
  }
  return count > 0 ? sumY / count : null;
}

function placeMenusInFrontOfPlayer() {
  const viewCam = typeof engineListenerObject === "function" ? engineListenerObject() : camera;
  if (!viewCam || !playSpace) return;

  viewCam.updateMatrixWorld(true);
  viewCam.getWorldPosition(uiPanelWorld);
  viewCam.getWorldQuaternion(uiFaceQuat);

  // Horizontal forward from headset yaw.
  uiRayDir.set(0, 0, -1).applyQuaternion(uiFaceQuat);
  uiRayDir.y = 0;
  if (uiRayDir.lengthSq() < 1e-8) uiRayDir.set(0, 0, -1);
  else uiRayDir.normalize();

  const headY = uiPanelWorld.y;
  // Wait for a real viewer pose — placing against the pre-XR origin puts menus underground.
  if (renderer.xr.isPresenting && headY < UI_HEAD_READY_MIN_Y) {
    uiAwaitingHandAnchor = true;
    return;
  }

  const trackedHandY = sampleTrackedHandHeight(headY);
  // Prefer real hand/controller height so Quest / Vision Pro match; never use
  // absolute floor clamps (AVP local space often puts those under the floor).
  let panelY = trackedHandY != null ? trackedHandY : headY - UI_HEAD_FALLBACK_DROP;
  panelY = clamp(panelY, headY - UI_BELOW_HEAD_MAX, headY - UI_BELOW_HEAD_MIN);
  // Keep refining until hands/controllers report; head fallback is only temporary.
  if (trackedHandY != null) uiAwaitingHandAnchor = false;
  else if (renderer.xr.isPresenting) uiAwaitingHandAnchor = true;

  uiHitPoint.copy(uiPanelWorld).addScaledVector(uiRayDir, UI_MENU_DISTANCE);
  uiHitPoint.y = panelY;

  // Pitch toward the headset but keep world-up so the panel stays level (no roll).
  uiFaceTowardPlayer.subVectors(uiPanelWorld, uiHitPoint);
  if (uiFaceTowardPlayer.lengthSq() < 1e-8) {
    uiFaceTowardPlayer.copy(uiRayDir).multiplyScalar(-1);
  } else {
    uiFaceTowardPlayer.normalize();
  }
  uiFaceRight.crossVectors(uiWorldUp, uiFaceTowardPlayer);
  if (uiFaceRight.lengthSq() < 1e-8) {
    uiFaceRight.set(1, 0, 0);
  } else {
    uiFaceRight.normalize();
  }
  uiFaceUp.crossVectors(uiFaceTowardPlayer, uiFaceRight).normalize();
  uiFaceMatrix.makeBasis(uiFaceRight, uiFaceUp, uiFaceTowardPlayer);
  uiFaceQuat.setFromRotationMatrix(uiFaceMatrix);
  if (playSpace.parent) {
    playSpace.getWorldQuaternion(uiParentQuat).invert();
    uiFaceQuat.premultiply(uiParentQuat);
  }

  // Convert with the current playSpace shift so later floor calibration cannot
  // leave menus stranded under the floor.
  uiTempWorld.copy(uiHitPoint);
  playSpace.worldToLocal(uiTempWorld);

  for (const panel of [controlsPanel, pausePanel, settingsPanel, multiplayerPanel, gamePanel]) {
    if (!panel) continue;
    panel.position.copy(uiTempWorld);
    panel.quaternion.copy(uiFaceQuat);
  }
}
const uiControllerEntries = [0, 1].map((index) => {
  const controller = renderer.xr.getController(index);
  scene.add(controller);
  const laser = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1),
    ]),
    new THREE.LineBasicMaterial({
      color: 0x7fd4ff,
      transparent: true,
      opacity: 0.45,
      depthTest: false,
      depthWrite: false,
    }),
  );
  laser.name = "UiLaser";
  // Draw after UI panels (renderOrder 6–8) so the ray isn't hidden behind them.
  laser.renderOrder = 100;
  laser.scale.z = 3;
  laser.visible = false;
  laser.frustumCulled = false;
  controller.add(laser);
  const entry = {
    index,
    controller,
    laser,
    triggerWasDown: false,
    selectHeld: false,
    /** @type {THREE.Object3D | null} */
    pressedButton: null,
  };

  // Three.js dispatches these on the target-ray group; inputSource is NOT auto-copied to userData.
  controller.addEventListener("connected", (event) => {
    controller.userData.inputSource = event.data ?? null;
    // Controllers often connect after the first menu place — re-anchor to hand height.
    if (uiMode !== "game") placeMenusInFrontOfPlayer();
  });
  controller.addEventListener("disconnected", () => {
    controller.userData.inputSource = null;
    entry.selectHeld = false;
    entry.triggerWasDown = false;
    clearUiButtonPress(entry);
    if (uiDrag?.controller === controller) uiDrag = null;
  });
  controller.addEventListener("selectstart", () => {
    entry.selectHeld = true;
    // In-flight: no UI rays/clicks — use the controller menu button to pause.
    if (uiMode === "game") return;
    // Bluetooth pad owns menus — ignore hand/controller ray clicks.
    if (findBrowserGamepad(renderer.xr.getSession()?.inputSources ?? [])) return;
    // Press on down; click action runs on selectend if still aimed at the button.
    if (tryUiButtonPress(controller, entry)) return;
    tryStartUiDrag(controller);
  });
  controller.addEventListener("selectend", () => {
    entry.selectHeld = false;
    if (findBrowserGamepad(renderer.xr.getSession()?.inputSources ?? [])) {
      clearUiButtonPress(entry);
      if (uiDrag?.controller === controller) uiDrag = null;
      return;
    }
    tryUiButtonRelease(controller, entry);
    if (uiDrag?.controller === controller) uiDrag = null;
  });

  return entry;
});

/** Hand tracking: right pinch = virtual stick, left pinch = fire. */
const HAND_JOYSTICK_RADIUS = 0.12;
const handPinchTip = new THREE.Vector3();
const handJoystickDelta = new THREE.Vector3();
const handSteer = {
  active: false,
  hand: null,
  origin: new THREE.Vector3(),
  pitch: 0,
  roll: 0,
  /** Absolute 0–1 throttle from pinch distance (null when inactive). */
  throttle: null,
  /** World-space aim direction from pinch origin ? tip (null near origin). */
  aimDirection: null,
  aimWorld: new THREE.Vector3(),
};
const handAimRight = new THREE.Vector3();
const handAimUp = new THREE.Vector3();
const handAimForward = new THREE.Vector3();
const handAimMatrix = new THREE.Matrix4();
const handAimQuat = new THREE.Quaternion();
const handWorldUp = new THREE.Vector3(0, 1, 0);
let handFirePinching = false;

const handJoystickVisual = new THREE.Group();
handJoystickVisual.name = "HandJoystick";
handJoystickVisual.visible = false;
scene.add(handJoystickVisual);
const handJoystickOriginMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.018, 16, 12),
  new THREE.MeshBasicMaterial({
    color: 0x7fd4ff,
    transparent: true,
    opacity: 0.55,
    depthTest: false,
  }),
);
handJoystickOriginMesh.renderOrder = 40;
handJoystickVisual.add(handJoystickOriginMesh);
const handJoystickTipMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.012, 12, 10),
  new THREE.MeshBasicMaterial({
    color: 0xffe626,
    transparent: true,
    opacity: 0.9,
    depthTest: false,
  }),
);
handJoystickTipMesh.renderOrder = 41;
handJoystickVisual.add(handJoystickTipMesh);
const handJoystickLine = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(),
    new THREE.Vector3(0, 0, 0),
  ]),
  new THREE.LineBasicMaterial({
    color: 0xa9dbff,
    transparent: true,
    opacity: 0.85,
    depthTest: false,
  }),
);
handJoystickLine.renderOrder = 42;
handJoystickVisual.add(handJoystickLine);

function handHandedness(hand) {
  return hand?.userData?.inputSource?.handedness || hand?.userData?.handedness || "";
}

function getHandPinchPoint(hand, target) {
  const tip = hand?.joints?.["index-finger-tip"];
  if (tip) {
    tip.getWorldPosition(target);
    return true;
  }
  if (hand) {
    hand.getWorldPosition(target);
    return true;
  }
  return false;
}

function onHandPinchStart(hand) {
  const handedness = handHandedness(hand);
  if (handedness === "right") {
    if (!getHandPinchPoint(hand, handSteer.origin)) return;
    handSteer.active = true;
    handSteer.hand = hand;
    handSteer.pitch = 0;
    handSteer.roll = 0;
    handSteer.throttle = 0;
    handSteer.aimDirection = null;
    handJoystickVisual.visible = !simulationPaused && isFlightLiveUi();
    handJoystickOriginMesh.position.copy(handSteer.origin);
    handJoystickTipMesh.position.copy(handSteer.origin);
  } else if (handedness === "left") {
    handFirePinching = true;
  }
}

function onHandPinchEnd(hand) {
  const handedness = handHandedness(hand);
  if (handedness === "right" || hand === handSteer.hand) {
    handSteer.active = false;
    handSteer.hand = null;
    handSteer.pitch = 0;
    handSteer.roll = 0;
    handSteer.throttle = null;
    handSteer.aimDirection = null;
    handJoystickVisual.visible = false;
  }
  if (handedness === "left") {
    handFirePinching = false;
  }
}

function updateHandJoystickVisual() {
  if (!handSteer.active || simulationPaused || !isFlightLiveUi()) {
    handJoystickVisual.visible = false;
    return;
  }
  if (!getHandPinchPoint(handSteer.hand, handPinchTip)) {
    handJoystickVisual.visible = false;
    return;
  }
  handJoystickVisual.visible = true;
  handJoystickOriginMesh.position.copy(handSteer.origin);
  handJoystickTipMesh.position.copy(handPinchTip);
  const positions = handJoystickLine.geometry.attributes.position;
  positions.setXYZ(0, handSteer.origin.x, handSteer.origin.y, handSteer.origin.z);
  positions.setXYZ(1, handPinchTip.x, handPinchTip.y, handPinchTip.z);
  positions.needsUpdate = true;
}

function updateHandSteerAxes() {
  if (!handSteer.active || !handSteer.hand) {
    handSteer.pitch = 0;
    handSteer.roll = 0;
    handSteer.throttle = null;
    handSteer.aimDirection = null;
    return;
  }
  if (!getHandPinchPoint(handSteer.hand, handPinchTip)) {
    handSteer.pitch = 0;
    handSteer.roll = 0;
    handSteer.throttle = 0;
    handSteer.aimDirection = null;
    return;
  }

  handJoystickDelta.subVectors(handPinchTip, handSteer.origin);
  const distance = handJoystickDelta.length();
  // Absolute throttle from how far the pinch is from the start point.
  handSteer.throttle = stick(clamp(distance / HAND_JOYSTICK_RADIUS, 0, 1));
  handSteer.pitch = 0;
  handSteer.roll = 0;
  // Near the origin there is no clear aim — keep current heading.
  if (distance < HAND_JOYSTICK_RADIUS * 0.08) {
    handSteer.aimDirection = null;
    return;
  }
  // Flight direction = pinch pull vector (origin ? tip) in world space.
  handSteer.aimWorld.copy(handJoystickDelta).multiplyScalar(1 / distance);
  handSteer.aimDirection = handSteer.aimWorld;
}

function applyHandControls(value, readout) {
  updateHandSteerAxes();
  updateHandJoystickVisual();
  if (handSteer.active) {
    if (handSteer.aimDirection) {
      // Stable vector on controlState — avoid per-frame allocation.
      value.aimDirection = controlAimDirection.copy(handSteer.aimDirection);
    }
    if (handSteer.throttle != null) {
      value.throttleAbsolute = handSteer.throttle;
    }
    readout.push(
      `R aim thr ${Math.round((handSteer.throttle ?? 0) * 100)}%`,
    );
  }
  if (handFirePinching) {
    value.fire = true;
    readout.push("L pinch fire");
  }
}

const xrHands = [0, 1].map((index) => {
  const hand = renderer.xr.getHand(index);
  scene.add(hand);
  hand.addEventListener("connected", (event) => {
    hand.userData.inputSource = event.data ?? null;
    hand.userData.handedness = event.data?.handedness || "";
    if (uiMode !== "game") placeMenusInFrontOfPlayer();
  });
  hand.addEventListener("disconnected", () => {
    if (handSteer.hand === hand) onHandPinchEnd(hand);
    if (handHandedness(hand) === "left") handFirePinching = false;
    hand.userData.inputSource = null;
    hand.userData.handedness = "";
  });
  hand.addEventListener("pinchstart", () => onHandPinchStart(hand));
  hand.addEventListener("pinchend", () => onHandPinchEnd(hand));
  return hand;
});

function draggableUiPanels() {
  const panels = [];
  if (controlsPanel?.visible) panels.push(controlsPanel);
  if (gamePanel?.visible) panels.push(gamePanel);
  if (pausePanel?.visible) panels.push(pausePanel);
  if (settingsPanel?.visible) panels.push(settingsPanel);
  if (multiplayerPanel?.visible) panels.push(multiplayerPanel);
  if (scoreboardPanel?.visible) panels.push(scoreboardPanel);
  return panels;
}

function uiRootFromHit(object) {
  let node = object;
  while (node) {
    if (
      node === controlsPanel ||
      node === gamePanel ||
      node === pausePanel ||
      node === settingsPanel ||
      node === multiplayerPanel ||
      node === scoreboardPanel
    ) {
      return node;
    }
    node = node.parent;
  }
  return null;
}

function findUiButtonUnderController(controller) {
  getControllerAimRay(controller, uiRayOrigin, uiRayDir);
  uiRaycaster.set(uiRayOrigin, uiRayDir);
  const panels = draggableUiPanels();
  if (!panels.length) return null;
  const hits = uiRaycaster.intersectObjects(panels, true);
  for (const hit of hits) {
    const button = findUiButton(hit.object);
    if (button) return button;
  }
  return null;
}

function clearUiButtonPress(entry) {
  const button = entry.pressedButton;
  if (button?.userData?.uiButton) {
    button.userData.uiButton.setPressed?.(false);
  }
  entry.pressedButton = null;
}

/** Depress the aimed button; click is deferred until selectend. */
function tryUiButtonPress(controller, entry) {
  const button = findUiButtonUnderController(controller);
  if (!button?.userData?.uiButton?.onClick) return false;
  clearUiButtonPress(entry);
  entry.pressedButton = button;
  button.userData.uiButton.setPressed?.(true);
  return true;
}

/** Fire click only if the ray is still on the pressed button at release. */
function tryUiButtonRelease(controller, entry) {
  const pressed = entry.pressedButton;
  if (!pressed) return;
  const stillOn = findUiButtonUnderController(controller);
  clearUiButtonPress(entry);
  if (stillOn === pressed) {
    pressed.userData.uiButton.onClick?.();
  }
}

function getControllerAimRay(controller, origin, direction) {
  controller.getWorldPosition(origin);
  controller.getWorldQuaternion(uiRayQuat);
  direction.set(0, 0, -1).applyQuaternion(uiRayQuat);
}

function inputSourceForController(entry) {
  const fromEvent = entry.controller.userData?.inputSource;
  if (fromEvent) return fromEvent;
  const session = renderer.xr.getSession();
  if (!session) return null;
  const tracked = [...session.inputSources].filter((source) => (
    source.targetRayMode === "tracked-pointer" && source.gamepad
  ));
  return tracked[entry.index] ?? null;
}

function isControllerTriggerDown(entry) {
  if (entry.selectHeld) return true;
  const button = inputSourceForController(entry)?.gamepad?.buttons?.[0];
  if (!button) return false;
  return Boolean(button.pressed) || (button.value ?? 0) > 0.55;
}

function tryStartUiDrag(controller) {
  const panels = draggableUiPanels();
  if (!panels.length) return false;
  getControllerAimRay(controller, uiRayOrigin, uiRayDir);
  uiRaycaster.set(uiRayOrigin, uiRayDir);
  const hits = uiRaycaster.intersectObjects(panels, true);
  for (const hit of hits) {
    const panel = uiRootFromHit(hit.object);
    if (!panel) continue;
    panel.getWorldPosition(uiPanelWorld);
    uiGrabOffset.copy(uiPanelWorld).sub(hit.point);
    uiDrag = {
      controller,
      panel,
      distance: hit.distance,
      offsetWorld: uiGrabOffset.clone(),
    };
    return true;
  }
  return false;
}

function updateUiPanelInteraction() {
  uiPointerBlocksFire = false;
  const presenting = renderer.xr.isPresenting;
  if (!presenting) {
    uiDrag = null;
    uiAwaitingHandAnchor = false;
    // Gamepad focus owns hover on desktop; don't wipe it here.
    if (!gamepadMenuFocusedButton) setUiButtonHovers(draggableUiPanels(), null);
    for (const entry of uiControllerEntries) {
      entry.laser.visible = false;
      entry.triggerWasDown = false;
      entry.selectHeld = false;
    }
    return;
  }

  // Session often starts before hand poses exist — re-anchor when they appear.
  if (uiAwaitingHandAnchor && uiMode !== "game") {
    placeMenusInFrontOfPlayer();
  }

  // Flying HUD only: hide interaction rays. Controls board keeps rays so OK works.
  if (uiMode === "game") {
    uiDrag = null;
    for (const entry of uiControllerEntries) {
      entry.laser.visible = false;
      entry.triggerWasDown = isControllerTriggerDown(entry);
    }
    uiPointerBlocksFire = false;
    return;
  }

  // Gamepad menu nav — hide hand/controller pointer rays.
  const usingBrowserPad = Boolean(
    findBrowserGamepad(renderer.xr.getSession()?.inputSources ?? []),
  );
  if (usingBrowserPad) {
    uiDrag = null;
    for (const entry of uiControllerEntries) {
      entry.laser.visible = false;
      entry.triggerWasDown = false;
      if (entry.pressedButton) clearUiButtonPress(entry);
    }
    setUiButtonHovers(draggableUiPanels(), gamepadMenuFocusedButton);
    // On controls, only block fire when a UI button is focused/pressed.
    uiPointerBlocksFire = uiMode !== "controls"
      || Boolean(gamepadMenuFocusedButton);
    return;
  }

  if (uiDrag) {
    const dragEntry = uiControllerEntries.find((entry) => entry.controller === uiDrag.controller);
    if (!uiDrag.panel.parent || (dragEntry && !isControllerTriggerDown(dragEntry))) {
      uiDrag = null;
    } else {
      uiPointerBlocksFire = true;
      getControllerAimRay(uiDrag.controller, uiRayOrigin, uiRayDir);
      uiHitPoint.copy(uiRayOrigin).addScaledVector(uiRayDir, uiDrag.distance);
      uiTempWorld.copy(uiHitPoint).add(uiDrag.offsetWorld);
      playSpace.worldToLocal(uiTempWorld);
      uiDrag.panel.position.copy(uiTempWorld);
      // Scene UI puts labels/controllers on local +Z. Yaw only toward the headset so the
      // panel stays upright / flat with the ground (no pitch or roll from head tilt).
      const viewCam = engineListenerObject();
      if (viewCam && uiDrag.panel.parent) {
        uiDrag.panel.getWorldPosition(uiPanelWorld);
        viewCam.getWorldPosition(uiTempWorld);
        uiRayDir.subVectors(uiTempWorld, uiPanelWorld);
        uiRayDir.y = 0;
        if (uiRayDir.lengthSq() > 1e-8) {
          uiRayDir.normalize();
          uiFaceQuat.setFromUnitVectors(uiFaceLocalZ, uiRayDir);
          uiDrag.panel.parent.getWorldQuaternion(uiParentQuat).invert();
          uiDrag.panel.quaternion.copy(uiParentQuat).multiply(uiFaceQuat);
        }
      }
      for (const entry of uiControllerEntries) {
        entry.laser.visible = entry.controller === uiDrag.controller;
        if (entry.laser.visible) {
          entry.laser.scale.z = Math.max(uiDrag.distance, 0.05);
          entry.laser.material.color.setHex(0xffe626);
          entry.laser.material.opacity = 0.95;
        }
        entry.triggerWasDown = isControllerTriggerDown(entry);
      }
      return;
    }
  }

  let hovered = false;
  /** @type {THREE.Object3D | null} */
  let hoveredButton = null;
  const panels = draggableUiPanels();
  for (const entry of uiControllerEntries) {
    entry.laser.visible = true;
    getControllerAimRay(entry.controller, uiRayOrigin, uiRayDir);
    uiRaycaster.set(uiRayOrigin, uiRayDir);
    const hits = panels.length ? uiRaycaster.intersectObjects(panels, true) : [];
    const hit = hits.find((entryHit) => uiRootFromHit(entryHit.object)) ?? null;
    /** @type {THREE.Object3D | null} */
    let entryHoveredButton = null;
    if (hit) {
      hovered = true;
      entry.laser.scale.z = Math.max(hit.distance, 0.05);
      entry.laser.material.color.setHex(0xffe626);
      entry.laser.material.opacity = 0.95;
      for (const entryHit of hits) {
        const button = findUiButton(entryHit.object);
        if (button) {
          entryHoveredButton = button;
          if (!hoveredButton) hoveredButton = button;
          break;
        }
      }
    } else {
      entry.laser.scale.z = 3;
      entry.laser.material.color.setHex(0x7fd4ff);
      entry.laser.material.opacity = 0.45;
    }

    // Keep the depress pose only while the ray stays on the pressed button.
    if (entry.selectHeld && entry.pressedButton?.userData?.uiButton) {
      entry.pressedButton.userData.uiButton.setPressed(
        entryHoveredButton === entry.pressedButton,
      );
    }

    // Clicks/drags are handled on selectstart/selectend (release-to-click).
    entry.triggerWasDown = isControllerTriggerDown(entry);
  }
  // Keep gamepad focus in sync when a ray is pointing at a button.
  if (hoveredButton) {
    const buttons = listClickableUiButtons(activeMenuRoot());
    const idx = buttons.indexOf(hoveredButton);
    if (idx >= 0) {
      gamepadMenuFocusIndex = idx;
      gamepadMenuFocusedButton = hoveredButton;
    }
  }
  setUiButtonHovers(panels, hoveredButton || gamepadMenuFocusedButton);
  // Pause/settings always block fire; controls only blocks when aiming at UI.
  uiPointerBlocksFire = hovered || Boolean(uiDrag)
    || (uiMode !== "game" && uiMode !== "controls");
}

function createAircraft() {
  const plane = new THREE.Group();
  const blue = new THREE.MeshStandardMaterial({ color: 0x1c5f9e, metalness: .35, roughness: .38 });
  const white = new THREE.MeshStandardMaterial({ color: 0xeaf5ff, metalness: .2, roughness: .45 });
  const red = new THREE.MeshStandardMaterial({ color: 0xd53f45, roughness: .4 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(.38, .55, 3.7, 16), blue); body.rotation.x = Math.PI / 2; plane.add(body);
  const wing = new THREE.Mesh(new THREE.BoxGeometry(5.2, .12, 1), white); wing.position.z = -.15; plane.add(wing);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(2.1, .1, .48), white); tail.position.set(0, .28, 1.5); plane.add(tail);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(.12, .8, .75), red); fin.position.set(0, .42, 1.35); plane.add(fin);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(.55, 1.15, 16), red); nose.rotation.x = -Math.PI / 2; nose.position.z = -2.35; plane.add(nose);
  return plane;
}
let aircraft = createAircraft(); aircraft.position.y = -1.25; planeRoot.add(aircraft);
const animatedParts = { propeller: null, leftAileron: null, rightAileron: null, elevator: null, rudder: null, neutral: new Map() };
const fighterModelUrl = assetUrl("FighterPlaneWithControls.glb?v=0.4.23");

/** @type {Map<string, { root: THREE.Group, targetPos: THREE.Vector3, targetQuat: THREE.Quaternion, throttle: number, propeller: THREE.Object3D | null }>} */
const remotePlanes = new Map();
const remoteForwardScratch = new THREE.Vector3();
const remoteBullets = [];
const seenRemoteBulletIds = new Set();
const PLANE_NET_INTERVAL_MS = 66;
let lastPlaneNetMs = 0;
let nextNetBulletId = 0;
const net = new FlightMultiplayerSession();

const BALLOON_COUNT = 8;
const BALLOON_HIT_RADIUS = 0.45;
const BALLOON_RESPAWN_SEC = 5;
/** Match Lens balloon visual size (~0.9 m tall in playSpace meters). */
const BALLOON_TARGET_HEIGHT = 0.9;
const balloonModelUrl = assetUrl("balloon.fbx?v=0.5.61");
const balloonMat = new THREE.MeshStandardMaterial({
  color: 0xff4d6d,
  roughness: 0.35,
  metalness: 0.05,
});
const balloonKnotMat = new THREE.MeshStandardMaterial({
  color: 0x2a2a2a,
  roughness: 0.65,
  metalness: 0.05,
});
const balloonGeom = new THREE.SphereGeometry(BALLOON_HIT_RADIUS, 16, 12);
/** @type {THREE.Object3D | null} */
let balloonTemplate = null;
/** @type {Promise<THREE.Object3D | null> | null} */
let balloonLoadPromise = null;
/** @type {{ id: number, mesh: THREE.Object3D, active: boolean, respawnAt: number, respawnPos: THREE.Vector3 }[]} */
const balloons = [];
let balloonsSeeded = false;
let balloonsSeeding = false;

function randomBalloonPosition(target = new THREE.Vector3()) {
  // Flight-area field in playSpace meters — new spot each respawn.
  return target.set(
    (Math.random() * 2 - 1) * 14,
    1.5 + Math.random() * 8,
    -4 - Math.random() * 22,
  );
}

function normalizeBalloonTemplate(source) {
  const root = new THREE.Group();
  root.name = "BalloonTemplate";
  root.add(source);
  // Lens FBX is authored in cm-scale units; fit to WebXR meters.
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z, 1e-4);
  source.scale.multiplyScalar(BALLOON_TARGET_HEIGHT / maxDim);
  root.updateMatrixWorld(true);
  const centered = new THREE.Box3().setFromObject(root);
  const center = new THREE.Vector3();
  centered.getCenter(center);
  // Root stays at the balloon center so hit tests use mesh.position.
  source.position.sub(center);
  root.traverse((node) => {
    if (!node.isMesh) return;
    node.castShadow = false;
    node.receiveShadow = false;
  });
  return root;
}

function loadBalloonTemplate() {
  if (balloonTemplate) return Promise.resolve(balloonTemplate);
  if (balloonLoadPromise) return balloonLoadPromise;
  balloonLoadPromise = new Promise((resolve) => {
    new FBXLoader().load(
      balloonModelUrl,
      (fbx) => {
        balloonTemplate = normalizeBalloonTemplate(fbx);
        resolve(balloonTemplate);
      },
      undefined,
      (error) => {
        console.error("Balloon FBX failed to load", error);
        resolve(null);
      },
    );
  });
  return balloonLoadPromise;
}

function createFallbackBalloonMesh(id) {
  const mesh = new THREE.Mesh(balloonGeom, balloonMat.clone());
  mesh.name = `Balloon:${id}`;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.material.color.offsetHSL((id * 0.11) % 1, 0, 0);
  return mesh;
}

function createBalloonMesh(id) {
  if (!balloonTemplate) return createFallbackBalloonMesh(id);
  const mesh = balloonTemplate.clone(true);
  mesh.name = `Balloon:${id}`;
  mesh.traverse((node) => {
    if (!node.isMesh) return;
    const name = String(node.name || "").toLowerCase();
    const isKnot = name.includes("cube") || name.includes("knot") || name.includes("tie");
    const mat = (isKnot ? balloonKnotMat : balloonMat).clone();
    if (!isKnot && mat.color) mat.color.offsetHSL((id * 0.11) % 1, 0, 0);
    node.material = mat;
    node.castShadow = false;
    node.receiveShadow = false;
  });
  return mesh;
}

function seedBalloonsNow() {
  if (balloonsSeeded) return;
  balloonsSeeded = true;
  balloonsSeeding = false;
  for (let id = 0; id < BALLOON_COUNT; id += 1) {
    const mesh = createBalloonMesh(id);
    const pos = randomBalloonPosition();
    mesh.position.copy(pos);
    playSpace.add(mesh);
    balloons.push({
      id,
      mesh,
      active: true,
      respawnAt: -1,
      respawnPos: pos.clone(),
    });
  }
}

function ensureBalloonsSeeded() {
  if (balloonsSeeded || balloonsSeeding) return;
  balloonsSeeding = true;
  loadBalloonTemplate().then(() => seedBalloonsNow());
}

function getBalloonSyncPayload() {
  ensureBalloonsSeeded();
  const now = performance.now();
  return balloons.map((b) => ({
    id: b.id,
    pos: b.active ? b.mesh.position : b.respawnPos,
    active: b.active,
    delaySec: !b.active && b.respawnAt >= 0
      ? Math.max(0, (b.respawnAt - now) / 1000)
      : 0,
  }));
}

function applyBalloonSync(list) {
  if (!list?.length) return;
  ensureBalloonsSeeded();
  const now = performance.now();
  for (const spec of list) {
    const balloon = balloons[spec.id];
    if (!balloon) continue;
    if (spec.active !== false) {
      balloon.active = true;
      balloon.mesh.visible = true;
      balloon.mesh.position.set(spec.pos.x, spec.pos.y, spec.pos.z);
      balloon.respawnPos.copy(balloon.mesh.position);
      balloon.respawnAt = -1;
      continue;
    }
    balloon.active = false;
    balloon.mesh.visible = false;
    balloon.respawnPos.set(spec.pos.x, spec.pos.y, spec.pos.z);
    const delay = Number(spec.delaySec);
    if (Number.isFinite(delay) && delay > 0) {
      balloon.respawnAt = now + delay * 1000;
    } else if (balloon.respawnAt < 0) {
      balloon.respawnAt = now + BALLOON_RESPAWN_SEC * 1000;
    }
  }
}

function popBalloon(id, respawnPos, delaySec = BALLOON_RESPAWN_SEC, fromNet = false) {
  ensureBalloonsSeeded();
  const balloon = balloons[id];
  if (!balloon || !balloon.active) return false;
  const wait = Number.isFinite(delaySec) && delaySec > 0 ? delaySec : BALLOON_RESPAWN_SEC;
  const next = respawnPos || randomBalloonPosition();
  balloon.active = false;
  balloon.mesh.visible = false;
  balloon.respawnPos.set(next.x, next.y, next.z);
  balloon.respawnAt = performance.now() + wait * 1000;
  playBalloonPop();
  if (!fromNet && net.active) {
    net.broadcastBalloonPop({ id, respawnPos: balloon.respawnPos, delaySec: wait });
  }
  if (net.active && net.isHost) {
    net.broadcastBalloonSync(getBalloonSyncPayload());
  }
  return true;
}

function updateBalloons() {
  if (!balloonsSeeded) return;
  const now = performance.now();
  for (const balloon of balloons) {
    if (balloon.active || balloon.respawnAt < 0) continue;
    if (now < balloon.respawnAt) continue;
    balloon.respawnAt = -1;
    balloon.active = true;
    balloon.mesh.visible = true;
    balloon.mesh.position.copy(balloon.respawnPos);
    if (net.active && net.isHost) net.broadcastBalloonSync(getBalloonSyncPayload());
  }
}

function bulletHitsBalloon(prevLocal, nextLocal) {
  ensureBalloonsSeeded();
  for (const balloon of balloons) {
    if (!balloon.active) continue;
    const dist = distPointToSegment(balloon.mesh.position, prevLocal, nextLocal);
    if (dist <= BALLOON_HIT_RADIUS + 0.06) return balloon;
  }
  return null;
}

const balloonSegAb = new THREE.Vector3();
const balloonSegClosest = new THREE.Vector3();
function distPointToSegment(point, a, b) {
  balloonSegAb.subVectors(b, a);
  const lenSq = balloonSegAb.lengthSq();
  if (lenSq < 1e-10) return point.distanceTo(a);
  let t = (
    (point.x - a.x) * balloonSegAb.x
    + (point.y - a.y) * balloonSegAb.y
    + (point.z - a.z) * balloonSegAb.z
  ) / lenSq;
  t = clamp(t, 0, 1);
  balloonSegClosest.copy(a).addScaledVector(balloonSegAb, t);
  return point.distanceTo(balloonSegClosest);
}

function findNamedPropeller(root) {
  let found = null;
  root.traverse((node) => {
    if (found) return;
    if (node.name === "Propeller") found = node;
  });
  return found;
}

function createRemotePlaneMesh() {
  const mesh = aircraft.clone(true);
  // Keep the same authored scale / local offset as the player's fighter.
  mesh.scale.copy(aircraft.scale);
  mesh.position.copy(aircraft.position);
  mesh.rotation.copy(aircraft.rotation);
  mesh.traverse((node) => {
    if (!node.isMesh) return;
    node.castShadow = false;
    node.receiveShadow = false;
    if (node.material) {
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      const next = mats.map((mat) => {
        const copy = mat.clone();
        if (copy.color) copy.color.offsetHSL(0.08, 0.15, 0.08);
        return copy;
      });
      node.material = Array.isArray(node.material) ? next : next[0];
    }
  });
  return mesh;
}

/** World-space height of nametags above the plane origin (meters). Matches Specs 45 cm. */
const NAME_TAG_WORLD_HEIGHT = 0.45;
/** Seconds of invulnerability after leaving the runway. */
const TAKEOFF_INVULN_SEC = 3;
/** Brief red flash when a plane takes damage. */
const HIT_FLASH_SEC = 0.4;
const nameTagWorldPos = new THREE.Vector3();

function createNameTagSprite(label, color = "#eaf6ff") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    }),
  );
  sprite.position.set(0, NAME_TAG_WORLD_HEIGHT, 0);
  sprite.scale.set(1.6, 0.4, 1);
  sprite.renderOrder = 35;
  sprite.userData.nameTagLabel = "";
  sprite.userData.nameTagColor = color;
  sprite.userData.nameTagCanvas = canvas;
  setNameTagLabel(sprite, label || "Player 1");
  return sprite;
}

/** Keep the tag directly above the plane in world-up, not plane-local up. */
function placeNameTagAboveWorld(tag, anchorObject) {
  if (!tag || !anchorObject) return;
  anchorObject.getWorldPosition(nameTagWorldPos);
  nameTagWorldPos.y += NAME_TAG_WORLD_HEIGHT;
  if (tag.parent) {
    tag.parent.worldToLocal(nameTagWorldPos);
    tag.position.copy(nameTagWorldPos);
  } else {
    tag.position.copy(nameTagWorldPos);
  }
}

function setNameTagLabel(sprite, label) {
  if (!sprite?.userData?.nameTagCanvas) return;
  const text = String(label || "Player 1").slice(0, 24);
  if (sprite.userData.nameTagLabel === text) return;
  sprite.userData.nameTagLabel = text;
  const canvas = sprite.userData.nameTagCanvas;
  const c = canvas.getContext("2d");
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.font = "bold 64px system-ui, sans-serif";
  c.textAlign = "center";
  c.textBaseline = "middle";
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  c.lineJoin = "round";
  c.miterLimit = 2;
  c.lineWidth = 10;
  c.strokeStyle = "#000000";
  c.strokeText(text, x, y);
  c.fillStyle = sprite.userData.nameTagColor || "#eaf6ff";
  c.fillText(text, x, y);
  sprite.material.map.needsUpdate = true;
}

function disposeNameTag(sprite) {
  if (!sprite) return;
  sprite.parent?.remove(sprite);
  sprite.material?.map?.dispose();
  sprite.material?.dispose();
}

function updateLocalNameTag() {
  if (!planeRoot) return;
  if (!localNameTag) {
    localNameTag = createNameTagSprite(gameSettings.playerName || "Player 1", "#7fd4ff");
    planeRoot.add(localNameTag);
  } else {
    setNameTagLabel(localNameTag, gameSettings.playerName || "Player 1");
  }
}

function billboardNameTags(_viewCam) {
  // Sprites already face the camera; only pin position to world-up above each plane.
  if (localNameTag && planeRoot) placeNameTagAboveWorld(localNameTag, planeRoot);
  for (const entry of remotePlanes.values()) {
    if (entry.nameTag && entry.root) placeNameTagAboveWorld(entry.nameTag, entry.root);
  }
  const fleet = typeof ensureAiFleet === "function" ? ensureAiFleet() : null;
  fleet?.forEachNameTag?.((tag, root) => {
    placeNameTagAboveWorld(tag, root);
  });
}

function startMatch() {
  matchActive = true;
  matchEnded = false;
  matchTimeLeft = MATCH_DURATION_SEC;
  killScore = 0;
  gamePanel?.userData.setScore?.(0);
  gamePanel?.userData.setMatchTime?.(matchTimeLeft);
  for (const entry of remotePlanes.values()) entry.score = 0;
  ensureAiFleet()?.resetMatchScores?.();
}

function endMatch() {
  if (matchEnded) return;
  matchActive = false;
  matchEnded = true;
  matchTimeLeft = 0;
  gamePanel?.userData.setMatchTime?.(0);
  refreshScoreboardPanel();
  showUiMode("scoreboard");
}

function refreshScoreboardPanel() {
  const entries = [
    {
      name: gameSettings.playerName || "Player 1",
      score: killScore,
      isLocal: true,
    },
  ];
  let humanIndex = 2;
  for (const entry of remotePlanes.values()) {
    entries.push({
      name: entry.name || `Player ${humanIndex}`,
      score: entry.score || 0,
      isLocal: false,
    });
    humanIndex += 1;
  }
  const aiEntries = ensureAiFleet()?.getScoreboardEntries?.() || [];
  for (const row of aiEntries) entries.push(row);
  entries.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  scoreboardPanel?.userData.setEntries?.(entries);
}

function tickMatchTimer(dt) {
  if (!matchActive || matchEnded || simulationPaused) return;
  if (uiMode !== "game" && uiMode !== "controls") return;
  matchTimeLeft = Math.max(0, matchTimeLeft - dt);
  gamePanel?.userData.setMatchTime?.(matchTimeLeft);
  if (matchTimeLeft <= 0) endMatch();
}

function ensureRemotePlane(playerId) {
  let entry = remotePlanes.get(playerId);
  if (entry) return entry;
  const root = new THREE.Group();
  root.name = `RemotePlane:${playerId.slice(0, 6)}`;
  const mesh = createRemotePlaneMesh();
  root.add(mesh);
  playSpace.add(root);
  entry = {
    root,
    targetPos: new THREE.Vector3(),
    targetQuat: new THREE.Quaternion(),
    throttle: 0,
    propeller: findNamedPropeller(mesh),
    name: `Player ${remotePlanes.size + 2}`,
    score: 0,
    nameTag: null,
  };
  entry.nameTag = createNameTagSprite(entry.name);
  root.add(entry.nameTag);
  remotePlanes.set(playerId, entry);
  return entry;
}

function removeRemotePlane(playerId) {
  const entry = remotePlanes.get(playerId);
  if (!entry) return;
  disposeNameTag(entry.nameTag);
  playSpace.remove(entry.root);
  remotePlanes.delete(playerId);
}

function clearRemotePlanes() {
  for (const id of [...remotePlanes.keys()]) removeRemotePlane(id);
  for (const shot of remoteBullets) playSpace.remove(shot);
  remoteBullets.length = 0;
  seenRemoteBulletIds.clear();
}

function applyRemotePlanePose(playerId, plane) {
  if (!playerId || playerId === net.uid) return;
  const entry = ensureRemotePlane(playerId);
  entry.targetPos.set(plane.pos.x, plane.pos.y, plane.pos.z);
  entry.targetQuat.set(plane.rot.x, plane.rot.y, plane.rot.z, plane.rot.w).normalize();
  entry.throttle = clamp(Number(plane.throttle) || 0, 0, 1);
  if (plane.name) entry.name = String(plane.name).slice(0, 24);
  else {
    const rosterHit = net.roster?.find((p) => p.uid === playerId);
    if (rosterHit?.name) entry.name = rosterHit.name;
  }
  if (Number.isFinite(plane.score)) entry.score = Math.max(0, plane.score | 0);
  setNameTagLabel(entry.nameTag, entry.name);
  if (!entry.root.userData.placed) {
    entry.root.position.copy(entry.targetPos);
    entry.root.quaternion.copy(entry.targetQuat);
    entry.root.userData.placed = true;
  }
}

function updateRemotePlanes(dt) {
  const step = clamp(dt, 0, 0.1);
  const alpha = 1 - Math.exp(-12 * step);
  for (const entry of remotePlanes.values()) {
    // Coast with synced throttle so remotes don't stall between pose packets.
    const speed = lerp(0, 100, entry.throttle) * worldSpeedScale;
    if (speed > 0.01) {
      remoteForwardScratch.set(0, 0, -1).applyQuaternion(entry.targetQuat).normalize();
      entry.targetPos.addScaledVector(remoteForwardScratch, speed * step);
    }
    entry.root.position.lerp(entry.targetPos, alpha);
    entry.root.quaternion.slerp(entry.targetQuat, alpha);
    if (entry.propeller) {
      entry.propeller.rotateY(-step * (4 + entry.throttle * 38));
    }
  }
}

function spawnRemoteBullet(fire) {
  if (!fire || seenRemoteBulletIds.has(fire.bulletId)) return;
  seenRemoteBulletIds.add(fire.bulletId);
  if (seenRemoteBulletIds.size > 200) {
    const first = seenRemoteBulletIds.values().next().value;
    seenRemoteBulletIds.delete(first);
  }
  const shot = new THREE.Mesh(bulletGeom, bulletMat);
  shot.scale.set(0.03, 0.03, 0.12);
  shot.position.set(fire.pos.x, fire.pos.y, fire.pos.z);
  shot.quaternion.set(fire.rot.x, fire.rot.y, fire.rot.z, fire.rot.w);
  shot.userData.velocity = new THREE.Vector3(fire.vel.x, fire.vel.y, fire.vel.z);
  shot.userData.age = 0;
  shot.userData.traveled = 0;
  shot.userData.prevPosition = shot.position.clone();
  shot.userData.remote = true;
  shot.userData.ownerId = fire.playerId;
  playSpace.add(shot);
  remoteBullets.push(shot);
  const remoteFwd = fire.vel
    ? new THREE.Vector3(fire.vel.x, fire.vel.y, fire.vel.z)
    : null;
  spawnMuzzleSparks(shot.position, remoteFwd);
  playSpatialShoot(shot.position);
}

function updateRemoteBullets(dt) {
  if (!remoteBullets.length) return;
  collectBulletColliders();
  for (let i = remoteBullets.length - 1; i >= 0; i -= 1) {
    const shot = remoteBullets[i];
    bulletNextLocal.copy(shot.position).addScaledVector(shot.userData.velocity, dt);
    // Balloon pops are owned by the shooter (broadcast); don't re-roll here.
    const hit = bulletHitsEnvironment(shot, bulletNextLocal);
    if (hit) {
      spawnBulletImpact(hit.point);
      playSpace.remove(shot);
      remoteBullets.splice(i, 1);
      continue;
    }
    if (shot.userData.prevPosition) shot.userData.prevPosition.copy(shot.position);
    shot.position.copy(bulletNextLocal);
    shot.userData.traveled = (shot.userData.traveled ?? 0) + shot.userData.velocity.length() * dt;
    shot.userData.age += dt;
    if (shot.userData.age > bulletLifetimeSec) {
      playSpace.remove(shot);
      remoteBullets.splice(i, 1);
    }
  }
}

function broadcastLocalPlane(time) {
  // Keep publishing while paused/on menus so peers still see you.
  if (!net.active) return;
  if (time - lastPlaneNetMs < PLANE_NET_INTERVAL_MS) return;
  lastPlaneNetMs = time;
  net.broadcastPlane({
    position: flight.position,
    rotation: flight.rotation,
    throttle: flight.throttle,
    name: gameSettings.playerName || "Player 1",
    score: killScore,
  });
}

function multiplayerStatusText() {
  if (!net.active) return "Multiplayer: solo";
  const links = net.linkCount();
  const peers = Math.max(0, net.roster.length - 1);
  const path = links > 0 ? "webrtc" : "relay";
  return `MP ${net.roomId}${net.isHost ? " (host)" : ""} · ${peers} peer${peers === 1 ? "" : "s"} · ${path}`;
}

function refreshMultiplayerUi() {
  const text = multiplayerStatusText();
  if (mpStatusLabel) mpStatusLabel.textContent = text;
  if (mpHudLabel) mpHudLabel.textContent = text;
  multiplayerPanel?.userData.setStatus?.(text);
  if (mpLeaveButton) mpLeaveButton.disabled = !net.active;
  if (mpHostButton) mpHostButton.disabled = net.active;
  if (mpJoinButton) mpJoinButton.disabled = net.active;
  if (mpCodeInput && net.roomId) mpCodeInput.value = net.roomId;
}

async function hostMultiplayerRoom() {
  try {
    refreshMultiplayerUi();
    const pending = "Hosting...";
    if (mpStatusLabel) mpStatusLabel.textContent = pending;
    multiplayerPanel?.userData.setStatus?.(pending);
    ensureBalloonsSeeded();
    const code = await net.createRoom();
    if (mpCodeInput) mpCodeInput.value = code;
    try {
      const url = new URL(location.href);
      url.searchParams.set("room", code);
      history.replaceState(null, "", url);
    } catch { /* ignore */ }
    net.broadcastBalloonSync(getBalloonSyncPayload());
    refreshMultiplayerUi();
    const ok = `Hosted room ${code}`;
    statusLabel.textContent = ok;
    multiplayerPanel?.userData.setStatus?.(ok);
  } catch (error) {
    const msg = firebaseErrorMessage(error);
    if (mpStatusLabel) mpStatusLabel.textContent = msg;
    multiplayerPanel?.userData.setStatus?.(msg);
    statusLabel.textContent = msg;
  }
}

async function joinMultiplayerRoom(rawCode) {
  const fromInput = mpCodeInput?.value;
  const fromUrl = new URL(location.href).searchParams.get("room");
  const code = normalizeRoomCode(rawCode || fromInput || fromUrl || "");
  if (code.length < 4) {
    const msg = "Type a 4-digit code in the box, then Join";
    if (mpStatusLabel) mpStatusLabel.textContent = msg;
    multiplayerPanel?.userData.setStatus?.(msg);
    statusLabel.textContent = msg;
    return;
  }
  try {
    const pending = `Joining ${code}...`;
    if (mpStatusLabel) mpStatusLabel.textContent = pending;
    multiplayerPanel?.userData.setStatus?.(pending);
    statusLabel.textContent = pending;
    await net.joinRoom(code);
    if (mpCodeInput) mpCodeInput.value = code;
    try {
      const url = new URL(location.href);
      url.searchParams.set("room", code);
      history.replaceState(null, "", url);
    } catch { /* ignore */ }
    refreshMultiplayerUi();
    const ok = `Joined room ${code}`;
    statusLabel.textContent = ok;
    multiplayerPanel?.userData.setStatus?.(ok);
  } catch (error) {
    const msg = firebaseErrorMessage(error);
    if (mpStatusLabel) mpStatusLabel.textContent = msg;
    multiplayerPanel?.userData.setStatus?.(msg);
    statusLabel.textContent = msg;
  }
}

async function leaveMultiplayerRoom() {
  await net.leave();
  clearRemotePlanes();
  try {
    const url = new URL(location.href);
    url.searchParams.delete("room");
    history.replaceState(null, "", url);
  } catch { /* ignore */ }
  refreshMultiplayerUi();
  statusLabel.textContent = "Left multiplayer room";
}

net.on({
  playerName: () => gameSettings.playerName || "Player 1",
  presenting: () => renderer.xr.isPresenting,
  getBalloonSync: () => getBalloonSyncPayload(),
  onRoster: () => refreshMultiplayerUi(),
  onRoom: () => refreshMultiplayerUi(),
  onLink: () => {
    refreshMultiplayerUi();
    if (net.isHost) {
      ensureBalloonsSeeded();
      net.broadcastBalloonSync(getBalloonSyncPayload());
    }
  },
  onPeerClose: (id) => {
    removeRemotePlane(id);
    refreshMultiplayerUi();
  },
  onPlane: (from, plane) => applyRemotePlanePose(plane.playerId || from, plane),
  onFire: (_from, fire) => spawnRemoteBullet(fire),
  onBalloonSync: (list) => {
    // Host is authority; applying our own Firestore echo used to revive pops instantly.
    if (net.isHost) return;
    applyBalloonSync(list);
  },
  onBalloonPop: (_from, pop) => {
    popBalloon(pop.id, pop.respawnPos ?? randomBalloonPosition(), pop.delaySec ?? BALLOON_RESPAWN_SEC, true);
  },
  onLeave: () => {
    clearRemotePlanes();
    refreshMultiplayerUi();
  },
});

mpHostButton?.addEventListener("click", () => hostMultiplayerRoom());
mpJoinButton?.addEventListener("click", () => joinMultiplayerRoom());
mpLeaveButton?.addEventListener("click", () => leaveMultiplayerRoom());
mpCodeInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") joinMultiplayerRoom();
});
// Best-effort seat cleanup so hard-refresh does not leave ghost players.
addEventListener("pagehide", () => {
  if (net.active) net.leave().catch(() => {});
});
addEventListener("beforeunload", () => {
  if (net.active) net.leave().catch(() => {});
});
const bootRoom = new URL(location.href).searchParams.get("room");
if (bootRoom) {
  if (mpCodeInput) mpCodeInput.value = normalizeRoomCode(bootRoom);
  joinMultiplayerRoom(bootRoom).catch(() => {});
}
refreshMultiplayerUi();

/** Matches flight-sim-scene FighterPlane; rebuilt again in useSpawn when the scene loads. */
const spawnPosition = new THREE.Vector3(0, GROUND_CONTACT_Y, -3.2323);
const flightForwardScratch = new THREE.Vector3();
const flightAxisScratch = new THREE.Vector3();
const flightQuatScratch = new THREE.Quaternion();
const bulletNextLocal = new THREE.Vector3();
const bulletFireVelocity = new THREE.Vector3();
const playVolumeReturnDir = new THREE.Vector3();
/** Stick/throttle can wiggle control surfaces below this; plane won't steer or move. */
const TAKEOFF_THROTTLE = 0.25;
/** How quickly airspeed eases toward the throttle target (higher = snappier). */
const AIRSPEED_SMOOTH_RATE = 2.2;
/** Fixed cubic flight area ahead of spawn (meters). */
const PLAY_VOLUME_SIZE = 30;
/** How much of the cube sits behind spawn so the runway is inside (near face stays fixed when size changes). */
const PLAY_VOLUME_BEHIND = 3.5;
const PLAY_VOLUME_RETURN_RATE = 1.8;
const playVolumeMin = new THREE.Vector3();
const playVolumeMax = new THREE.Vector3();
const playVolumeCenter = new THREE.Vector3();
let playVolumeMesh = null;

function setupPlayVolume() {
  const half = PLAY_VOLUME_SIZE * 0.5;
  const forward = new THREE.Vector3(0, 0, -1);
  // Near face used to sit exactly on spawn — pull the cube back so takeoff works.
  playVolumeCenter.copy(spawnPosition).addScaledVector(forward, half - PLAY_VOLUME_BEHIND);
  playVolumeCenter.y = spawnPosition.y + half * 0.35;
  playVolumeMin.set(
    playVolumeCenter.x - half,
    playVolumeCenter.y - half,
    playVolumeCenter.z - half,
  );
  playVolumeMax.set(
    playVolumeCenter.x + half,
    playVolumeCenter.y + half,
    playVolumeCenter.z + half,
  );
  if (playVolumeMesh) playSpace.remove(playVolumeMesh);
  const box = new THREE.BoxGeometry(PLAY_VOLUME_SIZE, PLAY_VOLUME_SIZE, PLAY_VOLUME_SIZE);
  const edges = new THREE.EdgesGeometry(box);
  playVolumeMesh = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: 0x7fd4ff,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    }),
  );
  playVolumeMesh.position.copy(playVolumeCenter);
  playVolumeMesh.renderOrder = 2;
  playSpace.add(playVolumeMesh);
  box.dispose();
}

function isInsidePlayVolume(pos) {
  return pos.x >= playVolumeMin.x && pos.x <= playVolumeMax.x
    && pos.y >= playVolumeMin.y && pos.y <= playVolumeMax.y
    && pos.z >= playVolumeMin.z && pos.z <= playVolumeMax.z;
}

setupPlayVolume();

class FlightModel {
  constructor() { this.reset(); }
  reset() {
    this.position = spawnPosition.clone();
    this.rotation = new THREE.Quaternion();
    this.throttle = 0;
    this.velocity = new THREE.Vector3();
    this.airspeed = 0;
    this.throttleCommitted = false;
    this.outsidePlayVolume = false;
    this.groundHitCooldown = 0;
    this.groundHitThisFrame = false;
  }
  forward(target = flightForwardScratch) {
    return target.set(0, 0, -1).applyQuaternion(this.rotation).normalize();
  }
  step(input, seconds) {
    const dt = clamp(seconds, 0, .1);
    this.outsidePlayVolume = !isInsidePlayVolume(this.position);

    if (!this.outsidePlayVolume) {
      if (typeof input.throttleAbsolute === "number") {
        // Hand pinch: distance from origin sets throttle directly.
        this.throttle = clamp(input.throttleAbsolute, 0, 1);
      } else {
        this.throttle = clamp(this.throttle + input.throttle * .5 * dt, 0, 1);
      }
      if (!this.throttleCommitted && this.throttle >= TAKEOFF_THROTTLE) {
        this.throttleCommitted = true;
      }
      if (this.throttleCommitted) {
        this.throttle = clamp(this.throttle, TAKEOFF_THROTTLE, 1);
      }
    }

    // Once airborne, throttle maps directly to speed (25% throttle ? 25% speed).
    const targetSpeed = this.throttleCommitted ? lerp(0, 100, this.throttle) : 0;
    const blend = 1 - Math.exp(-AIRSPEED_SMOOTH_RATE * dt);
    this.airspeed = lerp(this.airspeed, targetSpeed, blend);

    let handAiming = false;
    if (this.outsidePlayVolume) {
      // Controls locked — yaw/pitch the nose back toward the play cube.
      playVolumeReturnDir.subVectors(playVolumeCenter, this.position);
      if (playVolumeReturnDir.lengthSq() > 1e-6) {
        playVolumeReturnDir.normalize();
        handAimRight.crossVectors(playVolumeReturnDir, handWorldUp);
        if (handAimRight.lengthSq() < 1e-8) handAimRight.set(1, 0, 0);
        else handAimRight.normalize();
        handAimUp.crossVectors(handAimRight, playVolumeReturnDir).normalize();
        handJoystickDelta.copy(playVolumeReturnDir).negate();
        handAimMatrix.makeBasis(handAimRight, handAimUp, handJoystickDelta);
        handAimQuat.setFromRotationMatrix(handAimMatrix);
        this.rotation.slerp(handAimQuat, clamp(PLAY_VOLUME_RETURN_RATE * dt, 0, 1));
      }
    } else if (this.throttleCommitted) {
      // Below takeoff: control surfaces still animate, but body does not rotate.
      if (input.aimDirection && input.aimDirection.lengthSq() > 1e-8) {
        handAimForward.copy(input.aimDirection).normalize();
        handAimRight.crossVectors(handAimForward, handWorldUp);
        if (handAimRight.lengthSq() < 1e-8) {
          handAimRight.set(1, 0, 0).applyQuaternion(this.rotation);
        } else {
          handAimRight.normalize();
        }
        handAimUp.crossVectors(handAimRight, handAimForward).normalize();
        handJoystickDelta.copy(handAimForward).negate();
        handAimMatrix.makeBasis(handAimRight, handAimUp, handJoystickDelta);
        handAimQuat.setFromRotationMatrix(handAimMatrix);
        this.rotation.copy(handAimQuat);
        handAiming = true;
      } else {
        const controlAirspeed = lerp(0, 500, this.throttle);
        const referenceSpeed = Math.max(500 * .25, 1);
        const authority = clamp(controlAirspeed / referenceSpeed, .5, 1.25);
        const controlScale = 240 / 120;
        const rate = controlScale * authority * dt * Math.PI / 180;
        this.rotation.multiply(
          flightQuatScratch.setFromAxisAngle(flightAxisScratch.set(0, 0, -1), input.roll * 70 * rate),
        );
        this.rotation.multiply(
          flightQuatScratch.setFromAxisAngle(flightAxisScratch.set(1, 0, 0), -input.pitch * 70 * rate),
        );
        this.rotation.multiply(
          flightQuatScratch.setFromAxisAngle(flightAxisScratch.set(0, 1, 0), -input.yaw * 70 * rate),
        ).normalize();
      }
    }

    const worldSpeed = this.airspeed * worldSpeedScale;
    if (handAiming) {
      this.velocity.copy(handAimForward).multiplyScalar(this.airspeed > .01 ? worldSpeed : 0);
    } else {
      this.velocity.copy(this.forward()).multiplyScalar(this.airspeed > .01 ? worldSpeed : 0);
    }
    if (this.airspeed > .01) this.position.addScaledVector(this.velocity, dt);
    this.groundHitThisFrame = false;
    this.groundHitCooldown = Math.max(0, this.groundHitCooldown - dt);
    this.resolveGroundContact(dt);
    this.outsidePlayVolume = !isInsidePlayVolume(this.position);
  }
  resolveGroundContact(dt) {
    // Parked / taxiing: stay on the deck without bounce damage.
    if (!this.throttleCommitted) {
      if (this.position.y < GROUND_CONTACT_Y) this.position.y = GROUND_CONTACT_Y;
      return;
    }
    const fwd = this.forward(flightForwardScratch);
    const hitting = this.position.y <= GROUND_CONTACT_Y && (fwd.y < -0.02 || this.velocity.y < -0.05);
    if (!hitting) {
      if (this.position.y < GROUND_CONTACT_Y) this.position.y = GROUND_CONTACT_Y;
      return;
    }
    this.position.y = GROUND_CONTACT_Y;
    // Reflect dive into a bounce and re-aim along the new flight path.
    fwd.y = Math.max(-fwd.y * GROUND_BOUNCE_RESTITUTION, 0.18);
    fwd.normalize();
    handAimRight.crossVectors(fwd, handWorldUp);
    if (handAimRight.lengthSq() < 1e-8) handAimRight.set(1, 0, 0);
    else handAimRight.normalize();
    handAimUp.crossVectors(handAimRight, fwd).normalize();
    handJoystickDelta.copy(fwd).negate();
    handAimMatrix.makeBasis(handAimRight, handAimUp, handJoystickDelta);
    this.rotation.setFromRotationMatrix(handAimMatrix);
    this.velocity.copy(fwd).multiplyScalar(this.airspeed * worldSpeedScale);
    if (this.groundHitCooldown <= 0) {
      this.groundHitThisFrame = true;
      this.groundHitCooldown = GROUND_HIT_COOLDOWN_SEC;
    }
  }
}
const flight = new FlightModel(); const keys = new Set(); const bullets = []; let lastFire = -Infinity; let nextBulletSpawnIndex = 0; let simulationPaused = false; let pauseButtonWasPressed = false; let controlsVisible = true;
// Controls board is live from the start — fly while reading the diagram, then OK.
showUiMode("controls");
// Lens BulletSpawnPoint1/2 under Player (scale 0.296423). Scene units are cm ? meters; flip Z for THREE -forward.
const lensPlayerScale = 0.296423;
const lensLocalToThree = (p) => new THREE.Vector3(
  p.x * lensPlayerScale * 0.01,
  p.y * lensPlayerScale * 0.01,
  -p.z * lensPlayerScale * 0.01,
);
const bulletSpawnLocal = [
  new THREE.Vector3(-38.559101, -9.386186, 36.82412),
  new THREE.Vector3(38.559086, -9.386186, 36.82412),
].map(lensLocalToThree);
// Lens LeftWingTip / RightWingTip under Player (Scene.scene); +0.02 m local Z = aft (THREE -forward).
const wingTipLocal = [
  lensLocalToThree(new THREE.Vector3(81.310097, -7.972565, 24.621162)).add(new THREE.Vector3(0, 0, 0.02)),
  lensLocalToThree(new THREE.Vector3(-81.310097, -7.972565, 24.621147)).add(new THREE.Vector3(0, 0, 0.02)),
];
// Lens WingtipVortexFX defaults / scene overrides.
const vortexMinAirspeedRatio = 0.45;
const vortexMaxSpawnsPerSecond = 14;
const vortexWispLifetime = 0.65;
// Lens wispLength/width are cm world scale ? meters.
const vortexWispLength = 5 * 0.01;
const vortexWispWidth = 0.35 * 0.01;
const vortexPoolSize = Math.max(Math.ceil(vortexMaxSpawnsPerSecond * vortexWispLifetime * 2), 36);
// Lens GameControllerMovement: Unit Sphere setWorldScale(3,3,12) cm, speed 800 + planeVelocity, lifetime 3, cooldown 0.15.
const bulletMuzzleSpeed = 800 * worldSpeedScale;
const bulletLifetimeSec = 3;
const fireCooldownMs = 150;
const bulletGeom = new THREE.SphereGeometry(0.5, 8, 8);
const bulletMat = new THREE.MeshBasicMaterial({ color: 0xfff1a8 });
const fireHapticIntensity = 20 / 255;
const fireHapticDurationMs = 10;
/** Local AI dogfighters — chase/shoot you; you can shoot them back. */
let aiFleet = null;
let playerHealth = PLANE_MAX_HEALTH;
let playerInvulnUntil = 0;
let playerWasThrottleCommitted = false;
let playerHitFlashUntil = 0;
let killScore = 0;
/** @type {{ sprite: THREE.Sprite, expiresAt: number }[]} */
const killPopups = [];
const KILL_POPUP_MS = 3000;
let playerDamageSmokeAcc = 0;
/** @type {{ tumble: THREE.Vector3, tumbleRate: number, fallSpeed: number, smokeAcc: number } | null} */
let playerCrash = null;
const crashFlameParticles = [];
const crashFlameGeom = new THREE.SphereGeometry(0.04, 6, 6);
const crashFlameMat = new THREE.MeshBasicMaterial({
  color: 0xff6a00,
  transparent: true,
  opacity: 0.95,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
const crashSmokeMat = new THREE.MeshBasicMaterial({
  color: 0x333333,
  transparent: true,
  opacity: 0.55,
  depthWrite: false,
});
const muzzleSparkMat = new THREE.MeshBasicMaterial({
  color: 0xffe28a,
  transparent: true,
  opacity: 1,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
const crashTumbleQuat = new THREE.Quaternion();
const crashAxisScratch = new THREE.Vector3();
const muzzleFwdScratch = new THREE.Vector3();

function spawnPlaneFx(origin, kind = "flame") {
  if (kind === "spark") {
    spawnMuzzleSparks(origin);
    return;
  }
  if (kind === "explosion") {
    spawnCrashExplosion(origin);
    return;
  }
  const count = kind === "smoke" ? 2 : 4;
  for (let i = 0; i < count; i += 1) {
    const isSmoke = kind === "smoke" || i % 3 === 0;
    const mat = (isSmoke ? crashSmokeMat : crashFlameMat).clone();
    const spark = new THREE.Mesh(crashFlameGeom, mat);
    spark.position.copy(origin).add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.25,
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.25,
    ));
    spark.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * (isSmoke ? 0.6 : 1.2),
      (isSmoke ? 0.4 : 0.8) + Math.random() * (isSmoke ? 0.8 : 1.6),
      (Math.random() - 0.5) * (isSmoke ? 0.6 : 1.2),
    );
    spark.userData.age = 0;
    spark.userData.lifetime = (isSmoke ? 0.55 : 0.35) + Math.random() * 0.45;
    spark.userData.isSmoke = isSmoke;
    spark.userData.baseScale = isSmoke ? 1.0 : 0.55;
    spark.scale.setScalar(spark.userData.baseScale);
    playSpace.add(spark);
    crashFlameParticles.push(spark);
  }
}

/** Big ground-impact burst when a crashing plane hits. */
function spawnCrashExplosion(origin) {
  playSpace.localToWorld(explosionWorldPos.copy(origin));
  playExplosionSound(explosionWorldPos);
  // Bright core flash
  for (let i = 0; i < 5; i += 1) {
    const mat = muzzleSparkMat.clone();
    const flash = new THREE.Mesh(crashFlameGeom, mat);
    flash.position.copy(origin).add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.2,
      Math.random() * 0.15,
      (Math.random() - 0.5) * 0.2,
    ));
    flash.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 1.5,
      1.5 + Math.random() * 2.5,
      (Math.random() - 0.5) * 1.5,
    );
    flash.userData.age = 0;
    flash.userData.lifetime = 0.45 + Math.random() * 0.35;
    flash.userData.isSmoke = false;
    flash.userData.baseScale = 2.2 + Math.random() * 1.4;
    flash.scale.setScalar(flash.userData.baseScale);
    playSpace.add(flash);
    crashFlameParticles.push(flash);
  }
  // Fireball + lingering smoke column
  for (let i = 0; i < 36; i += 1) {
    const isSmoke = i % 3 === 0;
    const mat = (isSmoke ? crashSmokeMat : crashFlameMat).clone();
    const spark = new THREE.Mesh(crashFlameGeom, mat);
    spark.position.copy(origin).add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.5,
      Math.random() * 0.2,
      (Math.random() - 0.5) * 0.5,
    ));
    const dir = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 1.2 + 0.35,
      Math.random() * 2 - 1,
    ).normalize();
    spark.userData.velocity = dir.multiplyScalar(
      (isSmoke ? 1.8 : 4.5) + Math.random() * (isSmoke ? 2.5 : 6.5),
    );
    spark.userData.age = 0;
    spark.userData.lifetime = (isSmoke ? 2.4 : 1.1) + Math.random() * (isSmoke ? 1.6 : 0.9);
    spark.userData.isSmoke = isSmoke;
    spark.userData.baseScale = isSmoke ? 2.0 + Math.random() * 1.6 : 0.7 + Math.random() * 1.1;
    spark.scale.setScalar(spark.userData.baseScale);
    playSpace.add(spark);
    crashFlameParticles.push(spark);
  }
}

/** Quick bright muzzle flash when a gun fires. */
function spawnMuzzleSparks(origin, forward = null) {
  const fwd = forward
    ? muzzleFwdScratch.copy(forward).normalize()
    : muzzleFwdScratch.set(0, 0, -1);
  const count = 5;
  for (let i = 0; i < count; i += 1) {
    const mat = muzzleSparkMat.clone();
    const spark = new THREE.Mesh(crashFlameGeom, mat);
    spark.position.copy(origin).add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.06,
      (Math.random() - 0.5) * 0.06,
      (Math.random() - 0.5) * 0.06,
    ));
    spark.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2.4,
      (Math.random() - 0.5) * 2.0,
      (Math.random() - 0.5) * 2.4,
    ).addScaledVector(fwd, 3.5 + Math.random() * 4.5);
    spark.userData.age = 0;
    spark.userData.lifetime = 0.06 + Math.random() * 0.1;
    spark.userData.isSmoke = false;
    spark.userData.baseScale = 0.28 + Math.random() * 0.22;
    spark.scale.setScalar(spark.userData.baseScale);
    playSpace.add(spark);
    crashFlameParticles.push(spark);
  }
}

function ensureAiFleet() {
  // Only spawn after the real fighter GLB is hooked — placeholder mesh is huge.
  if (!fighterHooked) return null;
  if (aiFleet) return aiFleet;
  if (!bulletSpawnLocal?.length) return null;
  aiFleet = createAiFleet({
    playSpace,
    createMesh: createRemotePlaneMesh,
    findPropeller: findNamedPropeller,
    sourceAircraft: () => aircraft,
    meshReady: () => fighterHooked,
    worldSpeedScale,
    bulletGeom,
    bulletMat,
    bulletMuzzleSpeed,
    bulletLifetimeSec,
    bulletSpawnLocal,
    boundsMin: playVolumeMin,
    boundsMax: playVolumeMax,
    takeoffInvulnSec: TAKEOFF_INVULN_SEC,
    takeoffThrottle: TAKEOFF_THROTTLE,
    runwayOrigin: () => spawnPosition.clone(),
    createNameTag: (label) => createNameTagSprite(label, "#ff8a80"),
    spawnFx: (origin, kind) => {
      spawnPlaneFx(origin, kind);
      if (kind === "spark") playSpatialShoot(origin);
    },
    onBotDamaged: (botRoot) => beginHitFlash(botRoot),
  });
  return aiFleet;
}

function isPlayerInvulnerable(nowSec = performance.now() / 1000) {
  return nowSec < playerInvulnUntil;
}

function beginHitFlash(root) {
  if (!root) return;
  const until = performance.now() + HIT_FLASH_SEC * 1000;
  root.userData.hitFlashUntil = until;
  root.traverse((node) => {
    if (!node.isMesh || !node.material) return;
    const mats = Array.isArray(node.material) ? node.material : [node.material];
    for (const mat of mats) {
      if (!mat?.color) continue;
      if (!mat.userData._baseColor) mat.userData._baseColor = mat.color.clone();
      mat.userData.hitFlashUntil = until;
    }
  });
}

function updateHitFlashes() {
  const now = performance.now();
  const roots = [planeRoot];
  ensureAiFleet()?.forEachBotRoot?.((root) => roots.push(root));
  for (const root of roots) {
    if (!root) continue;
    root.traverse((node) => {
      if (!node.isMesh || !node.material) return;
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      for (const mat of mats) {
        const base = mat.userData?._baseColor;
        if (!base || !mat.color) continue;
        const until = mat.userData.hitFlashUntil || 0;
        if (now < until) {
          const pulse = 0.55 + 0.45 * Math.sin(now * 0.045);
          mat.color.setRGB(
            base.r * (1 - pulse) + pulse,
            base.g * (1 - pulse) * 0.15,
            base.b * (1 - pulse) * 0.15,
          );
        } else if (mat.userData.hitFlashUntil) {
          mat.color.copy(base);
          mat.userData.hitFlashUntil = 0;
        }
      }
    });
  }
}

function beginPlayerCrash() {
  if (playerCrash) return;
  // Carry current flight velocity so the plane keeps going the same way.
  const coast = flight.velocity.clone();
  if (coast.lengthSq() < 1e-4) {
    flight.forward(crashAxisScratch);
    const speed = Math.max(lerp(0, 100, Math.max(flight.throttle, 0.45)) * worldSpeedScale, 1.5);
    coast.copy(crashAxisScratch).multiplyScalar(speed);
  }
  playerCrash = {
    velocity: coast,
    // Roll around the nose; tip gradually toward world-down.
    spinSign: Math.random() < 0.5 ? -1 : 1,
    spinRate: 1.2,
    spinAccel: 3.5,
    maxSpinRate: 9,
    noseDownRate: 0.55,
    gravity: 0.4,
    gravityAccel: 3.2,
    smokeAcc: 0,
  };
  flight.throttle = 0;
  if (statusLabel) statusLabel.textContent = "Critical! Spinning out…";
}

function onAiHitPlayer() {
  if (playerCrash || isPlayerInvulnerable()) return;
  playerHealth -= 1;
  beginHitFlash(planeRoot);
  if (playerHealth <= 0) {
    playerHealth = 0;
    beginPlayerCrash();
    return;
  }
  spawnPlaneFx(flight.position, "smoke");
  if (statusLabel) {
    statusLabel.textContent = `Hit! Health ${playerHealth}/${PLANE_MAX_HEALTH}`;
  }
}

function onPlayerGroundHit() {
  if (playerCrash || isPlayerInvulnerable()) return;
  playerHealth -= 1;
  beginHitFlash(planeRoot);
  spawnPlaneFx(flight.position, "smoke");
  if (playerHealth <= 0) {
    playerHealth = 0;
    beginPlayerCrash();
    return;
  }
  if (statusLabel) {
    statusLabel.textContent = `Ground hit! Health ${playerHealth}/${PLANE_MAX_HEALTH}`;
  }
}

function spawnCrashFlameBurst() {
  spawnPlaneFx(flight.position, "flame");
}

function updatePlayerDamageSmoke(dt) {
  if (playerCrash || playerHealth >= PLANE_MAX_HEALTH) return;
  playerDamageSmokeAcc += dt;
  if (playerDamageSmokeAcc < 0.08) return;
  playerDamageSmokeAcc = 0;
  spawnPlaneFx(flight.position, "smoke");
}

function updateCrashFlames(dt) {
  for (let i = crashFlameParticles.length - 1; i >= 0; i -= 1) {
    const spark = crashFlameParticles[i];
    spark.userData.age += dt;
    if (spark.userData.age >= spark.userData.lifetime) {
      playSpace.remove(spark);
      crashFlameParticles.splice(i, 1);
      continue;
    }
    spark.userData.velocity.y += 1.5 * dt;
    spark.position.addScaledVector(spark.userData.velocity, dt);
    const life = 1 - spark.userData.age / spark.userData.lifetime;
    const base = spark.userData.baseScale
      ?? (spark.userData.isSmoke ? 1.2 : 0.7);
    spark.scale.setScalar(Math.max(0.05, life * base));
    spark.material.opacity = life * 0.9;
  }
}

function clearCrashFlames() {
  for (const spark of crashFlameParticles) playSpace.remove(spark);
  crashFlameParticles.length = 0;
}

/** Tip nose toward world-down, then spin around local forward (-Z). */
function applyCrashAttitude(rotation, c, step) {
  flightForwardScratch.set(0, 0, -1).applyQuaternion(rotation).normalize();
  // forward · down = -forward.y; 1 means already pointed straight down.
  const alignDot = -flightForwardScratch.y;
  if (alignDot < 0.95) {
    // forward × world-down (0,-1,0)
    crashAxisScratch.set(
      -flightForwardScratch.z,
      0,
      flightForwardScratch.x,
    );
    if (crashAxisScratch.lengthSq() < 1e-8) {
      crashAxisScratch.set(1, 0, 0).applyQuaternion(rotation).normalize();
    } else {
      crashAxisScratch.normalize();
    }
    const angle = Math.acos(clamp(alignDot, -1, 1));
    const pitchStep = Math.min(angle, c.noseDownRate * step);
    crashTumbleQuat.setFromAxisAngle(crashAxisScratch, pitchStep);
    rotation.premultiply(crashTumbleQuat);
  }
  c.spinRate = Math.min(c.maxSpinRate, c.spinRate + c.spinAccel * step);
  crashTumbleQuat.setFromAxisAngle(
    crashAxisScratch.set(0, 0, -1),
    c.spinRate * step * c.spinSign,
  );
  rotation.multiply(crashTumbleQuat).normalize();
}

/** @returns {boolean} true while crash is active (caller should skip normal flight.step) */
function updatePlayerCrash(dt) {
  if (!playerCrash) return false;
  const step = clamp(dt, 0, 0.1);
  const c = playerCrash;
  flight.throttle = 0;
  applyCrashAttitude(flight.rotation, c, step);
  // Keep coasting in the crash-start direction; gravity ramps in over time.
  c.gravity += c.gravityAccel * step;
  c.velocity.y -= c.gravity * step;
  c.velocity.multiplyScalar(Math.exp(-0.12 * step));
  flight.position.addScaledVector(c.velocity, step);
  flight.velocity.copy(c.velocity);
  c.smokeAcc += step;
  if (c.smokeAcc >= 0.06) {
    c.smokeAcc = 0;
    spawnCrashFlameBurst();
  }
  if (flight.position.y <= GROUND_CONTACT_Y) {
    const boomAt = flight.position.clone();
    flight.reset();
    playerCrash = null;
    playerHealth = PLANE_MAX_HEALTH;
    playerDamageSmokeAcc = 0;
    clearCrashFlames();
    spawnCrashExplosion(boomAt);
    if (statusLabel) statusLabel.textContent = "Crashed — ready to fly";
  }
  return true;
}

// Lightweight Lens-style wingtip vapor: pooled InstancedMesh wisps (white elongated quads).
const vortexGeom = new THREE.BoxGeometry(1, 1, 1);
const vortexMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.55,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
const vortexMesh = new THREE.InstancedMesh(vortexGeom, vortexMat, vortexPoolSize);
vortexMesh.frustumCulled = false;
vortexMesh.count = vortexPoolSize;
vortexMesh.renderOrder = 3;
playSpace.add(vortexMesh);
const vortexDummy = new THREE.Object3D();
const vortexForward = new THREE.Vector3();
const vortexUp = new THREE.Vector3();
const vortexRight = new THREE.Vector3();
const vortexOutward = new THREE.Vector3();
const vortexTrailDir = new THREE.Vector3();
const vortexSpawnPos = new THREE.Vector3();
const vortexLookTarget = new THREE.Vector3();
const vortexVelocity = new THREE.Vector3();
const vortexActive = [];
const vortexFree = [];
const vortexSpawnTimers = [0, 0];
function hideVortexInstance(instanceId) {
  vortexDummy.position.set(0, -999, 0);
  vortexDummy.scale.set(0, 0, 0);
  vortexDummy.quaternion.identity();
  vortexDummy.updateMatrix();
  vortexMesh.setMatrixAt(instanceId, vortexDummy.matrix);
}
for (let i = 0; i < vortexPoolSize; i += 1) {
  hideVortexInstance(i);
  vortexFree.push(i);
}
vortexMesh.instanceMatrix.needsUpdate = true;

function airspeedIntensity() {
  // Lens getCurrentAirspeedRatio with minSpeed 0, maxSpeed 500 ? ref = 125.
  const controlAirspeed = lerp(0, 500, flight.throttle);
  return clamp(controlAirspeed / Math.max(500 * 0.25, 1), 0, 1);
}

function spawnVortexWisp(side, intensity) {
  if (vortexFree.length === 0) return;
  const instanceId = vortexFree.pop();
  vortexForward.set(0, 0, -1).applyQuaternion(flight.rotation).normalize();
  vortexUp.set(0, 1, 0).applyQuaternion(flight.rotation).normalize();
  vortexRight.set(1, 0, 0).applyQuaternion(flight.rotation).normalize();
  // Match Lens WingtipVortexFX: Left uses -right, Right uses +right.
  if (side === 0) vortexOutward.copy(vortexRight).multiplyScalar(-1);
  else vortexOutward.copy(vortexRight);
  vortexSpawnPos.copy(wingTipLocal[side]).applyQuaternion(flight.rotation).add(flight.position);
  const length = vortexWispLength * (0.65 + intensity * 0.8);
  const width = vortexWispWidth * (0.7 + intensity * 0.5);
  vortexTrailDir.copy(vortexForward).multiplyScalar(-1).addScaledVector(vortexOutward, 0.18).normalize();
  const airspeed = lerp(0, 500, flight.throttle) * 0.01;
  vortexVelocity.copy(vortexTrailDir).multiplyScalar(airspeed * 0.35).addScaledVector(vortexUp, airspeed * 0.03);
  vortexDummy.position.copy(vortexSpawnPos);
  vortexDummy.up.copy(vortexUp);
  vortexLookTarget.copy(vortexSpawnPos).add(vortexTrailDir);
  vortexDummy.lookAt(vortexLookTarget);
  vortexDummy.scale.set(width, width, length);
  vortexDummy.updateMatrix();
  vortexMesh.setMatrixAt(instanceId, vortexDummy.matrix);
  vortexActive.push({
    id: instanceId,
    x: vortexDummy.position.x,
    y: vortexDummy.position.y,
    z: vortexDummy.position.z,
    qx: vortexDummy.quaternion.x,
    qy: vortexDummy.quaternion.y,
    qz: vortexDummy.quaternion.z,
    qw: vortexDummy.quaternion.w,
    velocityX: vortexVelocity.x,
    velocityY: vortexVelocity.y,
    velocityZ: vortexVelocity.z,
    age: 0,
    lifetime: vortexWispLifetime * (0.75 + intensity * 0.35),
    startLength: length,
    startWidth: width,
  });
}

function updateWingVortex(dt) {
  let matricesDirty = false;
  for (let i = vortexActive.length - 1; i >= 0; i -= 1) {
    const wisp = vortexActive[i];
    wisp.age += dt;
    if (wisp.age >= wisp.lifetime) {
      hideVortexInstance(wisp.id);
      vortexFree.push(wisp.id);
      vortexActive.splice(i, 1);
      matricesDirty = true;
      continue;
    }
    const lifeRatio = 1 - wisp.age / wisp.lifetime;
    const width = wisp.startWidth * (0.2 + lifeRatio * 0.8);
    const length = wisp.startLength * (0.35 + lifeRatio * 0.65);
    wisp.x += wisp.velocityX * dt;
    wisp.y += wisp.velocityY * dt;
    wisp.z += wisp.velocityZ * dt;
    vortexDummy.position.set(wisp.x, wisp.y, wisp.z);
    vortexDummy.quaternion.set(wisp.qx, wisp.qy, wisp.qz, wisp.qw);
    vortexDummy.scale.set(width, width, length);
    vortexDummy.updateMatrix();
    vortexMesh.setMatrixAt(wisp.id, vortexDummy.matrix);
    matricesDirty = true;
  }

  if (!simulationPaused) {
    const intensity = airspeedIntensity();
    if (intensity >= vortexMinAirspeedRatio) {
      const spawnRate =
        vortexMaxSpawnsPerSecond *
        ((intensity - vortexMinAirspeedRatio) / (1 - vortexMinAirspeedRatio));
      const spawnInterval = 1 / Math.max(spawnRate, 0.001);
      for (let side = 0; side < 2; side += 1) {
        vortexSpawnTimers[side] += dt;
        if (vortexSpawnTimers[side] >= spawnInterval) {
          vortexSpawnTimers[side] = 0;
          spawnVortexWisp(side, intensity);
          matricesDirty = true;
        }
      }
    }
  }

  if (matricesDirty) vortexMesh.instanceMatrix.needsUpdate = true;
}
function setSimulationPaused(paused) {
  if (paused) {
    if (uiMode === "game" || uiMode === "controls") showUiMode("pause");
    return;
  }
  showUiMode("game");
}
function notePreviewStatus(text) {
  if (renderer.xr.isPresenting || simulationPaused) return;
  const current = statusLabel.textContent;
  if (current.startsWith("Desktop preview") || current.startsWith("Flight scene") || current.startsWith("Lens fighter") || current.startsWith("Fighter model could not") || current.startsWith("Scene file")) statusLabel.textContent = text;
}
function useSpawn(position) {
  if (!position) return;
  const next = new THREE.Vector3().fromArray(position);
  const parked = flight.position.distanceToSquared(spawnPosition) < 1e-6;
  spawnPosition.copy(next);
  if (parked) flight.position.copy(spawnPosition);
  // Play volume is anchored to spawn — rebuild so the runway isn't outside the cube.
  setupPlayVolume();
  aiFleet?.setPlayBounds?.(playVolumeMin, playVolumeMax);
}
let fighterHooked = false;
let fallbackStarted = false;
function hookFighterModel(model, item, statusText) {
  if (fighterHooked) return;
  fighterHooked = true;
  if (model.parent) model.parent.remove(model);
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  if (Array.isArray(item?.scale)) model.scale.multiply(new THREE.Vector3(item.scale[0] ?? 1, item.scale[1] ?? 1, item.scale[2] ?? 1));
  model.traverse((node) => {
    if (!node.isMesh) return;
    // Shadows are unused — keep draw cheap on headset GPUs.
    node.castShadow = false;
    node.receiveShadow = false;
  });
  bindControlSurfaces(model, animatedParts);
  planeRoot.remove(aircraft);
  aircraft = model;
  planeRoot.add(aircraft);
  modelLabel.textContent = "Fighter model: GLB loaded";
  if (statusText) notePreviewStatus(statusText);
  // Rebuild AI fleet from the real fighter (they must not keep the huge placeholder).
  if (aiFleet) {
    aiFleet.rebuild();
  }
}
function loadFallbackFighter() {
  if (fighterHooked || fallbackStarted) return;
  fallbackStarted = true;
  modelLabel.textContent = "Fighter model: loading GLB…";
  const item = { type: "asset", name: "FighterPlane", url: fighterModelUrl, wingspan: lensWingspan, scale: [1, 1, 1] };
  createSceneObject(item, {
    onAssetLoaded: (_wrapper, model) => hookFighterModel(model, item, "Lens fighter model loaded · third-person RC view"),
    onAssetError: (error) => {
      console.error("Fighter GLB failed to load", error);
      const detail = String(error?.message ?? error).replace(/\s+/g, " ").slice(0, 90);
      modelLabel.textContent = `Fighter model: load failed — ${detail}`;
      notePreviewStatus("Fighter model could not load · using the backup aircraft");
    },
  });
}
function replacePanel(next, role) {
  if (!next) return;
  // Keep the interactive pause/settings menus; only swap the controls board from the scene.
  if (role !== "controls") return;
  const previous = controlsPanel;
  if (uiDrag?.panel === previous) uiDrag = null;
  playSpace.remove(previous);
  controlsPanel = next;
  controlsPanel.visible = controlsVisible;
  playSpace.add(next);
  attachControlsOkButton(controlsPanel);
}
function clearGroup(group) {
  while (group.children.length) group.remove(group.children[0]);
}
function clearVirtualEnvironment() {
  clearGroup(virtualEnvironment);
}
function clearRoomContent() {
  clearGroup(roomContent);
}
let desktopCameraRig = null;
async function mountFlightScene() {
  modelLabel.textContent = "Fighter model: loading scene…";
  try {
    const data = await loadFlightScene(`${FLIGHT_SCENE_URL}?v=0.5.61`);
    loadBalloonTemplate();
    setSceneMaterialLibrary(data.materials || []);
    let fighterFromScene = false;
    const environment = [];
    const room = [];
    let nextControls = null;
    let nextPause = null;
    if (desktopCameraRig) scene.remove(desktopCameraRig);
    desktopCameraRig = null;
    for (const item of data.objects) {
      const role = sceneRole(item);
      if (role === "course") continue;
      if (role === "camera") {
        if (!desktopCameraRig) {
          desktopCameraRig = createSceneObject(item);
          const view = new THREE.PerspectiveCamera(70, 1, .05, 600);
          view.name = "Desktop Camera";
          desktopCameraRig.add(view);
          scene.add(desktopCameraRig);
        }
        continue;
      }
      if (role === "fighter") {
        fighterFromScene = true;
        useSpawn(item.position);
        modelLabel.textContent = "Fighter model: loading GLB…";
        createSceneObject(item, {
          onAssetLoaded: (_wrapper, model) => hookFighterModel(model, item, "Flight scene loaded · third-person RC flight"),
          onAssetError: (error) => {
            console.error("Scene fighter failed to load", error);
            loadFallbackFighter();
          },
        });
        continue;
      }
      const isLandingStrip = role === "room" && /LandingStrip/i.test(`${item.name || ""} ${item.url || ""}`);
      const object = createSceneObject(item, isLandingStrip ? {
        onAssetLoaded: (wrapper) => {
          wrapper.traverse((node) => {
            if (!node.isMesh || !node.material) return;
            const mats = Array.isArray(node.material) ? node.material : [node.material];
            for (const mat of mats) {
              if (!mat) continue;
              mat.polygonOffset = true;
              mat.polygonOffsetFactor = -1;
              mat.polygonOffsetUnits = -1;
              mat.needsUpdate = true;
            }
          });
        },
      } : undefined);
      if (role === "controls") nextControls = object;
      else if (role === "pause") nextPause = object;
      else if (role === "room") room.push(object);
      else environment.push(object);
    }
    clearVirtualEnvironment();
    clearRoomContent();
    for (const object of environment) virtualEnvironment.add(object);
    for (const object of room) roomContent.add(object);
    replacePanel(nextControls, "controls");
    replacePanel(nextPause, "pause");
    if (!fighterFromScene) loadFallbackFighter();
  } catch (error) {
    console.error("Flight scene failed to load", error);
    modelLabel.textContent = "Fighter model: loading GLB…";
    notePreviewStatus("Scene file unavailable · built-in layout");
    loadFallbackFighter();
  }
}
mountFlightScene();
addEventListener("keydown", (event) => {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
    event.preventDefault();
  }
  keys.add(event.code);
  if (event.code === "KeyR") resetPlayerFlight();
  if (event.code === "Escape" && !event.repeat) setSimulationPaused(!simulationPaused);
});
addEventListener("keyup", (event) => keys.delete(event.code));
// Lens GameControllerMovement.applyJoystickDeadzone (joystickDeadzone 0.1).
function stick(value) {
  const deadzone = .1;
  const magnitude = Math.abs(value);
  if (magnitude <= deadzone) return 0;
  const scaled = Math.sign(value) * (magnitude - deadzone) / (1 - deadzone);
  return scaled * (gameSettings.stickSensitivity ?? 1);
}
function activeStick(gamepad) {
  const axisPairs = [[0, 1], [2, 3], [4, 5]];
  return axisPairs.map(([x, y]) => [gamepad.axes[x] ?? 0, gamepad.axes[y] ?? 0])
    .reduce((best, pair) => pair[0] ** 2 + pair[1] ** 2 > best[0] ** 2 + best[1] ** 2 ? pair : best, [0, 0]);
}
function isXrStandardGamepad(gamepad) {
  return Boolean(gamepad && gamepad.mapping === "xr-standard");
}
function isBrowserGamepad(gamepad) {
  if (!gamepad || gamepad.axes.length < 4) return false;
  // XR controllers must never be treated as a Bluetooth pad.
  if (gamepad.mapping === "xr-standard") return false;
  const id = gamepad.id || "";
  if (/oculus|meta quest|\bhand\b|openxr/i.test(id)) return false;
  // DualSense / Xbox / etc. Safari on visionOS often leaves mapping "" instead of
  // "standard", which previously made Bluetooth pads invisible.
  return gamepad.mapping === "standard" || gamepad.mapping === "" || gamepad.mapping == null;
}
function gamepadLabel(gamepad) {
  const id = (gamepad?.id || "Gamepad").replace(/\s+/g, " ").trim();
  if (/dualsense|dualshock|playstation|wireless controller/i.test(id)) return "PlayStation";
  if (/xbox|xinput/i.test(id)) return "Xbox";
  return id.slice(0, 28) || "Gamepad";
}
function applyBrowserGamepad(value, pad) {
  value.yaw = stick(pad.axes[0] || 0);
  value.roll = stick(pad.axes[2] || 0);
  value.pitch = -stick(pad.axes[3] || 0);
  // Standard mapping: 6/7 = L2/R2 analog triggers, 4/5 = L1/R1 bumpers.
  // Vision Pro DualSense was previously reversed (bumpers throttle, triggers fire).
  value.throttle = (pad.buttons[7]?.value || 0) - (pad.buttons[6]?.value || 0);
  value.fire = Boolean(pad.buttons[5]?.pressed || pad.buttons[0]?.pressed);
  // Options / Start-style buttons when present.
  value.pause ||= Boolean(pad.buttons[9]?.pressed || pad.buttons[8]?.pressed);
}
/** Prefer a real Bluetooth pad from navigator or XR inputSources (AVP). */
function findBrowserGamepad(xrSources) {
  const candidates = [];
  for (const pad of navigator.getGamepads()) {
    if (pad && isBrowserGamepad(pad)) candidates.push(pad);
  }
  for (const source of xrSources) {
    if (source.hand) continue;
    if (source.gamepad && isBrowserGamepad(source.gamepad)) {
      candidates.push(source.gamepad);
    }
  }
  if (!candidates.length) return null;
  if (candidates.length === 1) return candidates[0];
  // Most recently updated pad wins (Safari keeps stale slots around).
  let best = candidates[0];
  for (let i = 1; i < candidates.length; i += 1) {
    if ((candidates[i].timestamp || 0) > (best.timestamp || 0)) best = candidates[i];
  }
  return best;
}
const controlState = {
  pitch: 0,
  roll: 0,
  yaw: 0,
  throttle: 0,
  fire: false,
  pause: false,
  throttleAbsolute: undefined,
  aimDirection: null,
};
const controlAimDirection = new THREE.Vector3();
const controllerReadout = [];
let lastControllerHudMs = 0;
let lastControllerHudText = "";
function controls() {
  const value = controlState;
  value.pitch = 0;
  value.roll = 0;
  value.yaw = 0;
  value.throttle = 0;
  value.fire = false;
  value.pause = false;
  value.throttleAbsolute = undefined;
  value.aimDirection = null;
  controllerReadout.length = 0;
  const xrSources = renderer.xr.getSession()?.inputSources ?? [];
  // Prefer DualSense/Xbox whenever present. On Vision Pro, Safari may expose the
  // pad via getGamepads() and/or XR inputSources with a blank mapping.
  const browserPad = findBrowserGamepad(xrSources);
  if (browserPad) {
    applyBrowserGamepad(value, browserPad);
    controllerReadout.push(`${gamepadLabel(browserPad)} pad`);
  } else {
    for (const source of xrSources) {
      // Hands use pinch joystick / fire below — skip emulated hand gamepads here.
      if (source.hand) continue;
      const gamepad = source.gamepad;
      if (!isXrStandardGamepad(gamepad)) continue;
      const [rawX, rawY] = activeStick(gamepad);
      const x = stick(rawX);
      const y = stick(rawY);
      const indexTrigger = gamepad.buttons[0]?.value ?? 0;
      const grip = gamepad.buttons[1]?.value ?? 0;
      const handKey = source.handedness?.[0]?.toUpperCase?.() || "?";
      controllerReadout.push(`${handKey}: ${x.toFixed(2)}, ${y.toFixed(2)}`);
      if (source.handedness === "left") {
        value.yaw += x;
        value.throttle -= grip;
        value.fire ||= indexTrigger > .55;
        // Pause on left X only (digital .pressed). Do not scan buttons[6+] — on Quest
        // that is the thumbrest and it fires while using the trigger/grip.
        value.pause ||= Boolean(gamepad.buttons[4]?.pressed);
      }
      if (source.handedness === "right") {
        value.roll += x;
        value.pitch -= y;
        value.throttle += grip;
        value.fire ||= indexTrigger > .55;
      }
    }
    // Hands must not override an active Bluetooth pad (common AVP regression).
    applyHandControls(value, controllerReadout);
  }
  // Desktop: arrows or WASD steer; X/Z (or PgUp/PgDn / +/-) throttle; Space fires.
  value.pitch += (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0)
    - (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0);
  value.roll += (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0)
    - (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0);
  value.yaw += (keys.has("KeyE") ? 1 : 0) - (keys.has("KeyQ") ? 1 : 0);
  value.throttle += (
    keys.has("KeyX") || keys.has("PageUp") || keys.has("Equal") || keys.has("NumpadAdd") ? 1 : 0
  ) - (
    keys.has("KeyZ") || keys.has("PageDown") || keys.has("Minus") || keys.has("NumpadSubtract") ? 1 : 0
  );
  value.fire ||= keys.has("Space");
  // DOM HUD updates are relatively expensive in XR — refresh stick readout ~8 Hz.
  const now = performance.now();
  if (now - lastControllerHudMs > 120) {
    lastControllerHudMs = now;
    const next = controllerReadout.length
      ? `Sticks ${controllerReadout.join(" · ")}`
      : "Sticks: waiting for controller";
    if (next !== lastControllerHudText) {
      lastControllerHudText = next;
      controllerLabel.textContent = next;
    }
  }
  for (const key of ["pitch", "roll", "yaw", "throttle"]) value[key] = clamp(value[key], -1, 1); return value;
}
const deflectQuatScratch = new THREE.Quaternion();
const deflectAxisX = new THREE.Vector3(1, 0, 0);
const deflectAxisY = new THREE.Vector3(0, 1, 0);
function deflect(part, degrees, axis) {
  if (!part) return;
  part.quaternion.copy(animatedParts.neutral.get(part)).multiply(
    deflectQuatScratch.setFromAxisAngle(axis, THREE.MathUtils.degToRad(degrees)),
  );
}
function animateAircraft(input, seconds) {
  // These pivots and axes match the control objects in the Lens Studio fighter scene.
  deflect(animatedParts.leftAileron, -input.roll * 25, deflectAxisX);
  deflect(animatedParts.rightAileron, input.roll * 25, deflectAxisX);
  deflect(animatedParts.elevator, input.pitch * 25, deflectAxisX);
  deflect(animatedParts.rudder, input.yaw * 25, deflectAxisY);
  if (animatedParts.propeller) animatedParts.propeller.rotateY(-seconds * (4 + flight.throttle * 38));
}
const minEnginePitch = .55;
const maxEnginePitch = 1.65;
const dopplerAmount = .35;
const maxPlaneSpeed = 100 * worldSpeedScale;
const listenerPosition = new THREE.Vector3();
const sourcePosition = new THREE.Vector3();
const toListener = new THREE.Vector3();
const listenerQuaternion = new THREE.Quaternion();
const listenerForward = new THREE.Vector3();
const listenerUp = new THREE.Vector3();
function engineListenerObject() {
  if (renderer.xr.isPresenting) {
    const xrCamera = renderer.xr.getCamera();
    if (xrCamera) return xrCamera;
  }
  const namedRig = scene.getObjectByName("Camera Rig") ?? scene.getObjectByName("CameraRig");
  const rig = namedRig ?? (typeof cameraRig !== "undefined" ? cameraRig : null);
  if (rig) {
    if (rig.isCamera) return rig;
    const nested = typeof rig.getObjectByProperty === "function" ? rig.getObjectByProperty("isCamera", true) : null;
    if (nested) return nested;
  }
  return camera;
}
function getOffScreenHalfExtents(viewCam) {
  const halfExtentsCam = viewCam.isArrayCamera ? viewCam.cameras?.[0] : viewCam;
  const proj = halfExtentsCam?.projectionMatrix?.elements;
  if (proj && Math.abs(proj[5]) > 1e-6 && Math.abs(proj[0]) > 1e-6) {
    return {
      halfHeight: OFFSCREEN_ARROW_DEPTH / proj[5],
      halfWidth: OFFSCREEN_ARROW_DEPTH / proj[0],
    };
  }
  const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * OFFSCREEN_ARROW_DEPTH;
  return {
    halfHeight,
    halfWidth: halfHeight * Math.max(camera.aspect, 0.01),
  };
}

/** @returns {boolean} true if arrow is shown */
function placeOffScreenArrow(viewCam, worldPos, arrow, showingFlag, setShowing) {
  viewCam.worldToLocal(offScreenPlaneLocal.copy(worldPos));

  const inFront = offScreenPlaneLocal.z * OFFSCREEN_LOOK_Z > 0.01;
  let dirX = offScreenPlaneLocal.x;
  let dirY = offScreenPlaneLocal.y;
  const dirLength = Math.hypot(dirX, dirY);
  if (dirLength < 0.001) {
    dirX = 0;
    dirY = -1;
  } else {
    dirX /= dirLength;
    dirY /= dirLength;
  }

  const { halfHeight, halfWidth } = getOffScreenHalfExtents(viewCam);
  const inset = showingFlag
    ? OFFSCREEN_ARROW_VISIBLE_INSET
    : OFFSCREEN_ARROW_VISIBLE_INSET + 0.04;
  const planeDepth = Math.max(offScreenPlaneLocal.z * OFFSCREEN_LOOK_Z, 0.01);
  const depthScale = planeDepth / OFFSCREEN_ARROW_DEPTH;
  const inView = inFront
    && Math.abs(offScreenPlaneLocal.x) < halfWidth * (1 - inset) * depthScale
    && Math.abs(offScreenPlaneLocal.y) < halfHeight * (1 - inset) * depthScale;

  if (inView) {
    arrow.visible = false;
    setShowing(false);
    return false;
  }

  setShowing(true);
  arrow.visible = true;

  const maxX = halfWidth * (1 - OFFSCREEN_ARROW_EDGE_INSET);
  const maxY = halfHeight * (1 - OFFSCREEN_ARROW_EDGE_INSET);
  const hitX = Math.abs(dirX) > 0.001 ? maxX / Math.abs(dirX) : Number.POSITIVE_INFINITY;
  const hitY = Math.abs(dirY) > 0.001 ? maxY / Math.abs(dirY) : Number.POSITIVE_INFINITY;
  const edgeScale = Math.min(hitX, hitY);

  offScreenArrowLocalPos.set(
    dirX * edgeScale,
    dirY * edgeScale,
    OFFSCREEN_LOOK_Z * OFFSCREEN_ARROW_DEPTH,
  );
  offScreenArrowEuler.set(0, 0, -Math.atan2(dirX, dirY));
  offScreenArrowPointQuat.setFromEuler(offScreenArrowEuler);

  offScreenArrowLocalPos.applyMatrix4(viewCam.matrixWorld);
  arrow.position.copy(offScreenArrowLocalPos);
  arrow.quaternion.copy(viewCam.quaternion).multiply(offScreenArrowPointQuat);
  return true;
}

function updateOffScreenPlaneArrow() {
  const viewCam = engineListenerObject();
  if (!viewCam || !planeRoot) {
    offScreenPlaneArrow.visible = false;
    for (const arrow of offScreenOtherArrows) arrow.visible = false;
    return;
  }

  viewCam.updateMatrixWorld(true);
  planeRoot.getWorldPosition(offScreenTargetWorld);
  placeOffScreenArrow(
    viewCam,
    offScreenTargetWorld,
    offScreenPlaneArrow,
    offScreenArrowShowing,
    (v) => { offScreenArrowShowing = v; },
  );

  const targets = [];
  const fleet = ensureAiFleet();
  if (fleet?.collectAliveWorldPositions) {
    fleet.collectAliveWorldPositions(targets);
  }
  for (const entry of remotePlanes.values()) {
    if (!entry?.root?.visible) continue;
    targets.push(entry.root.getWorldPosition(new THREE.Vector3()));
  }

  for (let i = 0; i < offScreenOtherArrows.length; i += 1) {
    const arrow = offScreenOtherArrows[i];
    if (i < targets.length) {
      const idx = i;
      placeOffScreenArrow(
        viewCam,
        targets[i],
        arrow,
        offScreenOtherShowing[idx],
        (v) => { offScreenOtherShowing[idx] = v; },
      );
    } else {
      arrow.visible = false;
      offScreenOtherShowing[i] = false;
    }
  }
}
function setAudioVector(node, xName, yName, zName, x, y, z, time) {
  const xParam = node[xName];
  const yParam = node[yName];
  const zParam = node[zName];
  if (xParam?.setValueAtTime && yParam?.setValueAtTime && zParam?.setValueAtTime) {
    xParam.setValueAtTime(x, time);
    yParam.setValueAtTime(y, time);
    zParam.setValueAtTime(z, time);
    return true;
  }
  return false;
}
function updateSpatialEngineAudio(time) {
  if (!engineContext || !enginePanner || !planeRoot) return;
  if (!engineListenerObject()) return;
  planeRoot.getWorldPosition(sourcePosition);
  if (!setAudioVector(enginePanner, "positionX", "positionY", "positionZ", sourcePosition.x, sourcePosition.y, sourcePosition.z, time)
    && enginePanner.setPosition) {
    enginePanner.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z);
  }
  updateSpatialListener(time);
}
function dopplerPitchScaleFor(velocity, worldPos) {
  // Lens GameControllerMovement.getDopplerPitchScale: airplane velocity dotted with
  // the direction from the plane to the listener, divided by max speed.
  if (dopplerAmount <= 0 || !velocity) return 1;
  const listener = engineListenerObject();
  if (!listener || !worldPos) return 1;
  listener.getWorldPosition(listenerPosition);
  otherEngineToListener.copy(listenerPosition).sub(worldPos);
  const distance = otherEngineToListener.length();
  if (distance < 1) return 1;
  otherEngineToListener.multiplyScalar(1 / distance);
  const closingSpeed = velocity.dot(otherEngineToListener);
  const closingRatio = clamp(closingSpeed / Math.max(Math.abs(maxPlaneSpeed), 1), -1, 1);
  return clamp(1 + closingRatio * dopplerAmount, .55, 1.6);
}
function dopplerPitchScale() {
  if (!planeRoot || !flight.velocity) return 1;
  planeRoot.getWorldPosition(sourcePosition);
  return dopplerPitchScaleFor(flight.velocity, sourcePosition);
}
function enginePlaybackRateFor(throttle, velocity, worldPos, detune = 0) {
  const speedRatio = clamp(throttle, 0, 1);
  const throttlePitch = lerp(minEnginePitch, maxEnginePitch, speedRatio);
  return clamp(throttlePitch * dopplerPitchScaleFor(velocity, worldPos) * (1 + detune), .25, 3);
}
function enginePlaybackRate() {
  if (!planeRoot) {
    const speedRatio = clamp(flight.throttle, 0, 1);
    return clamp(lerp(minEnginePitch, maxEnginePitch, speedRatio), .25, 3);
  }
  planeRoot.getWorldPosition(sourcePosition);
  return enginePlaybackRateFor(flight.throttle, flight.velocity, sourcePosition);
}
function ensureOtherEngineVoices() {
  if (!engineContext || !engineBuffer) return;
  while (otherEngineVoices.length < OTHER_ENGINE_MAX) {
    const gain = engineContext.createGain();
    gain.gain.value = 0;
    const panner = createEnginePanner();
    const source = engineContext.createBufferSource();
    source.buffer = engineBuffer;
    source.loop = true;
    // Slight detune so stacked loops don't phase-lock into one tone.
    source.playbackRate.value = 1 + (otherEngineVoices.length % 5) * 0.015;
    source.connect(gain);
    gain.connect(panner);
    panner.connect(engineContext.destination);
    source.start();
    otherEngineVoices.push({ source, gain, panner });
  }
}
function collectOtherEngineTargets() {
  otherEngineTargets.length = 0;
  const fleet = ensureAiFleet();
  fleet?.collectEngineSources?.(otherEngineTargets);
  for (const entry of remotePlanes.values()) {
    if (!entry?.root?.visible) continue;
    otherEngineTargets.push({
      root: entry.root,
      throttle: entry.throttle ?? 0.55,
    });
  }
  return otherEngineTargets;
}
function updateOtherEngineSounds(time) {
  if (!engineContext || !engineBuffer) return;
  if (simulationPaused) {
    for (const voice of otherEngineVoices) {
      voice.gain.gain.setTargetAtTime(0, time, 0.04);
    }
    return;
  }
  ensureOtherEngineVoices();
  const targets = collectOtherEngineTargets();
  const volumeScale = gameSettings.engineVolume * gameSettings.masterVolume * OTHER_ENGINE_LEVEL;
  for (let i = 0; i < otherEngineVoices.length; i += 1) {
    const voice = otherEngineVoices[i];
    const target = targets[i];
    if (!target?.root) {
      voice.gain.gain.setTargetAtTime(0, time, 0.05);
      continue;
    }
    target.root.getWorldPosition(otherEnginePos);
    if (!setAudioVector(
      voice.panner,
      "positionX",
      "positionY",
      "positionZ",
      otherEnginePos.x,
      otherEnginePos.y,
      otherEnginePos.z,
      time,
    ) && voice.panner.setPosition) {
      voice.panner.setPosition(otherEnginePos.x, otherEnginePos.y, otherEnginePos.z);
    }
    const detune = (i % 5) * 0.015;
    const rate = enginePlaybackRateFor(
      target.throttle,
      target.velocity,
      otherEnginePos,
      detune,
    );
    voice.source.playbackRate.setTargetAtTime(rate, time, 0.125);
    voice.gain.gain.setTargetAtTime(
      lerp(0.22, 0.9, clamp(target.throttle, 0, 1)) * volumeScale,
      time,
      0.04,
    );
  }
}
function createEnginePanner() {
  const panner = engineContext.createPanner();
  panner.panningModel = "HRTF";
  panner.distanceModel = "inverse";
  // Flight-sim distances: keep idle audible nearby, roll off gently over tens of meters.
  panner.refDistance = 12;
  panner.maxDistance = 400;
  panner.rolloffFactor = .55;
  panner.coneInnerAngle = 360;
  panner.coneOuterAngle = 360;
  panner.coneOuterGain = 0;
  return panner;
}
function createShotPanner() {
  const panner = engineContext.createPanner();
  panner.panningModel = "HRTF";
  panner.distanceModel = "inverse";
  panner.refDistance = 2.5;
  panner.maxDistance = 140;
  panner.rolloffFactor = 1.1;
  panner.coneInnerAngle = 360;
  panner.coneOuterAngle = 360;
  panner.coneOuterGain = 0;
  return panner;
}
function createExplosionPanner() {
  const panner = engineContext.createPanner();
  panner.panningModel = "HRTF";
  panner.distanceModel = "inverse";
  panner.refDistance = 4;
  panner.maxDistance = 180;
  panner.rolloffFactor = 1.0;
  panner.coneInnerAngle = 360;
  panner.coneOuterAngle = 360;
  panner.coneOuterGain = 0;
  return panner;
}
function ensureSharedAudioContext() {
  if (!engineContext) {
    engineContext = new AudioContext();
    engineGain = engineContext.createGain();
    engineGain.gain.value = .28;
    enginePanner = createEnginePanner();
    engineGain.connect(enginePanner);
    enginePanner.connect(engineContext.destination);
  }
  if (engineContext.state !== "running") engineContext.resume().catch(() => {});
  return engineContext;
}
function updateSpatialListener(time) {
  const listenerObject = engineListenerObject();
  if (!listenerObject || !engineContext) return;
  listenerObject.getWorldPosition(listenerPosition);
  listenerObject.getWorldQuaternion(listenerQuaternion);
  listenerForward.set(0, 0, -1).applyQuaternion(listenerQuaternion);
  listenerUp.set(0, 1, 0).applyQuaternion(listenerQuaternion);
  const audioListener = engineContext.listener;
  if (!setAudioVector(audioListener, "positionX", "positionY", "positionZ", listenerPosition.x, listenerPosition.y, listenerPosition.z, time)
    && audioListener.setPosition) {
    audioListener.setPosition(listenerPosition.x, listenerPosition.y, listenerPosition.z);
  }
  if (audioListener.forwardX?.setValueAtTime) {
    audioListener.forwardX.setValueAtTime(listenerForward.x, time);
    audioListener.forwardY.setValueAtTime(listenerForward.y, time);
    audioListener.forwardZ.setValueAtTime(listenerForward.z, time);
    audioListener.upX.setValueAtTime(listenerUp.x, time);
    audioListener.upY.setValueAtTime(listenerUp.y, time);
    audioListener.upZ.setValueAtTime(listenerUp.z, time);
  } else if (audioListener.setOrientation) {
    audioListener.setOrientation(
      listenerForward.x, listenerForward.y, listenerForward.z,
      listenerUp.x, listenerUp.y, listenerUp.z
    );
  }
}
async function ensureShootBuffer() {
  ensureSharedAudioContext();
  if (!shootLoad) {
    shootLoad = fetch(shootUrl)
      .then((response) => response.arrayBuffer())
      .then((data) => engineContext.decodeAudioData(data));
  }
  shootBuffer = await shootLoad;
  return shootBuffer;
}
/** Spatial gunshot at a play-space-local position (muzzle). */
function playSpatialShoot(localPosition) {
  playSpace.localToWorld(shootWorldPos.copy(localPosition));
  playSpatialShootWorld(shootWorldPos);
}
function playSpatialShootWorld(worldPosition) {
  // Fire-and-forget; overlap is fine for rapid fire.
  ensureShootBuffer().then((buffer) => {
    if (!buffer || !engineContext) return;
    const time = engineContext.currentTime;
    updateSpatialListener(time);
    const source = engineContext.createBufferSource();
    const gain = engineContext.createGain();
    const panner = createShotPanner();
    source.buffer = buffer;
    gain.gain.value = 0.8 * gameSettings.masterVolume;
    source.connect(gain);
    gain.connect(panner);
    panner.connect(engineContext.destination);
    if (!setAudioVector(panner, "positionX", "positionY", "positionZ", worldPosition.x, worldPosition.y, worldPosition.z, time)
      && panner.setPosition) {
      panner.setPosition(worldPosition.x, worldPosition.y, worldPosition.z);
    }
    source.start();
    source.onended = () => {
      try {
        source.disconnect();
        gain.disconnect();
        panner.disconnect();
      } catch (_) { /* already torn down */ }
    };
  }).catch((error) => {
    console.warn("[WebXR] shoot sound failed", error);
  });
}
async function startEngineSound() {
  try {
    ensureSharedAudioContext();
    // Resume immediately while this call still originates from a controller/button action.
    // Waiting for the fetch first can cause headset browsers to reject audio playback.
    if (!engineLoad) engineLoad = fetch(assetUrl("audio/PlaneEngineNoise.wav"))
      .then((response) => response.arrayBuffer())
      .then((data) => engineContext.decodeAudioData(data));
    engineBuffer = await engineLoad;
    // Prefetch gunshot / explosion so first play isn't delayed by decode.
    ensureShootBuffer().catch(() => {});
    ensureExplosionBuffer().catch(() => {});
    await engineContext.resume();
    if (!engineSource) {
      engineSource = engineContext.createBufferSource();
      engineSource.buffer = engineBuffer;
      engineSource.loop = true;
      engineSource.playbackRate.value = enginePlaybackRate();
      engineSource.connect(engineGain);
      engineSource.start();
    }
    ensureOtherEngineVoices();
    updateSpatialEngineAudio(engineContext.currentTime);
    updateOtherEngineSounds(engineContext.currentTime);
  } catch (error) { console.warn("Engine audio could not start", error); }
}
function pauseEngineSound() {
  if (engineContext?.state === "running") engineContext.suspend();
}
let lastEngineAudioMs = 0;
function updateEngineSound() {
  if (!engineContext || !engineGain || !engineSource) return;
  // AudioParam writes every frame show up as XR micro-hitches; 20 Hz is plenty.
  const now = performance.now();
  if (now - lastEngineAudioMs < 50) return;
  lastEngineAudioMs = now;
  const time = engineContext.currentTime;
  engineSource.playbackRate.setTargetAtTime(enginePlaybackRate(), time, .125);
  engineGain.gain.setTargetAtTime(
    lerp(.28, 1, flight.throttle) * gameSettings.engineVolume * gameSettings.masterVolume,
    time,
    .04,
  );
  updateSpatialEngineAudio(time);
  updateOtherEngineSounds(time);
}
function playBalloonPop() {
  const pop = new Audio(balloonPopUrl);
  pop.volume = .45 * gameSettings.masterVolume;
  pop.play().catch(() => {});
}
function playImpactSound() {
  const pop = new Audio(balloonPopUrl);
  pop.volume = .28 * gameSettings.masterVolume;
  pop.playbackRate = 1.35;
  pop.play().catch(() => {});
}
async function ensureExplosionBuffer() {
  ensureSharedAudioContext();
  if (!explosionLoad) {
    explosionLoad = fetch(explosionUrl)
      .then((response) => response.arrayBuffer())
      .then((data) => engineContext.decodeAudioData(data));
  }
  explosionBuffer = await explosionLoad;
  return explosionBuffer;
}
/** Spatial ground-crash boom at a world position (quieter than the old 2D blast). */
function playExplosionSound(worldPosition) {
  ensureExplosionBuffer().then((buffer) => {
    if (!buffer || !engineContext || !worldPosition) return;
    const time = engineContext.currentTime;
    updateSpatialListener(time);
    const source = engineContext.createBufferSource();
    const gain = engineContext.createGain();
    const panner = createExplosionPanner();
    source.buffer = buffer;
    gain.gain.value = 0.32 * gameSettings.masterVolume;
    source.connect(gain);
    gain.connect(panner);
    panner.connect(engineContext.destination);
    if (!setAudioVector(
      panner, "positionX", "positionY", "positionZ",
      worldPosition.x, worldPosition.y, worldPosition.z, time,
    ) && panner.setPosition) {
      panner.setPosition(worldPosition.x, worldPosition.y, worldPosition.z);
    }
    source.start();
    source.onended = () => {
      try {
        source.disconnect();
        gain.disconnect();
        panner.disconnect();
      } catch (_) { /* already torn down */ }
    };
  }).catch((error) => {
    console.warn("[WebXR] explosion sound failed", error);
  });
}

const impactRaycaster = new THREE.Raycaster();
const impactPrevWorld = new THREE.Vector3();
const impactCurrWorld = new THREE.Vector3();
const impactDirection = new THREE.Vector3();
const impactParticles = [];
const impactParticleGeom = new THREE.SphereGeometry(0.018, 6, 6);
const impactParticleMat = new THREE.MeshBasicMaterial({
  color: 0xffb347,
  transparent: true,
  opacity: 0.95,
  depthWrite: false,
});

function spawnBulletImpact(worldPoint) {
  try {
    playImpactSound();
    const localPoint = playSpace.worldToLocal(worldPoint.clone());
    for (let i = 0; i < 10; i += 1) {
      const spark = new THREE.Mesh(impactParticleGeom, impactParticleMat);
      spark.position.copy(localPoint);
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 1.4 + 0.15,
        Math.random() * 2 - 1,
      ).normalize();
      // ~1/4 prior spread; particle size kept readable at headset distance.
      spark.userData.velocity = dir.multiplyScalar(0.45 + Math.random() * 0.75);
      spark.userData.age = 0;
      spark.userData.lifetime = 0.28 + Math.random() * 0.28;
      spark.scale.setScalar(0.4 + Math.random() * 0.55);
      playSpace.add(spark);
      impactParticles.push(spark);
    }
  } catch (error) {
    console.warn("[WebXR] impact spawn failed", error);
  }
}

function updateImpactParticles(dt) {
  for (let i = impactParticles.length - 1; i >= 0; i -= 1) {
    const spark = impactParticles[i];
    spark.userData.age += dt;
    if (spark.userData.age >= spark.userData.lifetime) {
      playSpace.remove(spark);
      impactParticles.splice(i, 1);
      continue;
    }
    spark.userData.velocity.y -= 3.2 * dt;
    spark.position.addScaledVector(spark.userData.velocity, dt);
    const life = 1 - spark.userData.age / spark.userData.lifetime;
    spark.scale.setScalar(Math.max(0.04, life * 0.55));
  }
}

const bulletColliders = [];
/** Ignore hits until the shot has traveled this far (m) so muzzle/spawn doesn't self-hit. */
const bulletMuzzleIgnoreM = 0.4;

function disposeMeshGeometry(geometry) {
  if (!geometry) return;
  geometry.disposeBoundsTree?.();
  geometry.dispose();
}

function ensureBoundsTree(mesh) {
  const geometry = mesh?.geometry;
  if (!geometry || geometry.boundsTree) return;
  try {
    geometry.computeBoundsTree();
  } catch (error) {
    console.warn("[WebXR] BVH build failed", error);
  }
}

function collectBulletColliders() {
  if (!bulletCollidersDirty) return;
  bulletColliders.length = 0;
  if (!gameSettings.meshCollision) {
    roomContent.traverse((node) => {
      if (!node.isMesh || !node.visible) return;
      ensureBoundsTree(node);
      bulletColliders.push(node);
    });
    bulletCollidersDirty = false;
    return;
  }
  for (const entry of environmentMeshes.values()) {
    if (!entry.collider || !entry.mesh) continue;
    ensureBoundsTree(entry.collider);
    bulletColliders.push(entry.collider);
  }
  roomContent.traverse((node) => {
    if (!node.isMesh || !node.visible) return;
    ensureBoundsTree(node);
    bulletColliders.push(node);
  });
  bulletCollidersDirty = false;
}

function bulletHitsEnvironment(shot, nextLocalPosition) {
  try {
    collectBulletColliders();
    if (!bulletColliders.length) return null;
    playSpace.localToWorld(impactPrevWorld.copy(shot.position));
    playSpace.localToWorld(impactCurrWorld.copy(nextLocalPosition));
    impactDirection.subVectors(impactCurrWorld, impactPrevWorld);
    const distance = impactDirection.length();
    if (distance < 1e-5) return null;
    impactDirection.multiplyScalar(1 / distance);

    impactRaycaster.set(impactPrevWorld, impactDirection);
    impactRaycaster.far = distance + 0.02;
    const hits = impactRaycaster.intersectObjects(bulletColliders, false);
    const traveled = shot.userData.traveled ?? 0;
    for (const hit of hits) {
      if (traveled + hit.distance >= bulletMuzzleIgnoreM) return hit;
    }
    return null;
  } catch (error) {
    console.warn("[WebXR] bullet collision failed", error);
    return null;
  }
}
function vibrateFireController() {
  try {
    const sources = renderer.xr.getSession()?.inputSources ?? [];
    const browserPad = findBrowserGamepad(sources);
    const xrPad = sources.find((item) => item.handedness === "right" && isXrStandardGamepad(item.gamepad))?.gamepad
      ?? sources.find((item) => isXrStandardGamepad(item.gamepad))?.gamepad;
    const gamepad = browserPad || xrPad;
    if (!gamepad) return;
    const actuator = gamepad.hapticActuators?.[0];
    if (actuator?.pulse) {
      Promise.resolve(actuator.pulse(fireHapticIntensity, fireHapticDurationMs)).catch(() => {});
      return;
    }
    if (gamepad.vibrationActuator?.playEffect) {
      Promise.resolve(gamepad.vibrationActuator.playEffect("dual-rumble", {
        duration: fireHapticDurationMs,
        strongMagnitude: fireHapticIntensity,
        weakMagnitude: fireHapticIntensity,
      })).catch(() => {});
    }
  } catch (_) { /* haptics unavailable on desktop / unsupported pads */ }
}
function fire() {
  const local = bulletSpawnLocal[nextBulletSpawnIndex % bulletSpawnLocal.length];
  nextBulletSpawnIndex += 1;
  const offset = local.clone().applyQuaternion(flight.rotation);
  const shot = new THREE.Mesh(bulletGeom, bulletMat);
  // Lens Unit Sphere diameter 1 x world scale (3,3,12) cm -> meters.
  shot.scale.set(0.03, 0.03, 0.12);
  shot.position.copy(flight.position).add(offset);
  shot.quaternion.copy(flight.rotation);
  // Own vector — do not alias the shared forward scratch.
  shot.userData.velocity = bulletFireVelocity
    .copy(flight.forward())
    .multiplyScalar(bulletMuzzleSpeed)
    .add(flight.velocity)
    .clone();
  shot.userData.age = 0;
  shot.userData.traveled = 0;
  shot.userData.prevPosition = shot.position.clone();
  playSpace.add(shot);
  bullets.push(shot);
  spawnMuzzleSparks(shot.position, shot.userData.velocity);
  playSpatialShoot(shot.position);
  vibrateFireController();
  if (net.active) {
    nextNetBulletId += 1;
    net.broadcastFire({
      bulletId: `${net.uid}-${nextNetBulletId}`,
      position: shot.position,
      velocity: shot.userData.velocity,
      rotation: shot.quaternion,
    });
  }
}
function resize() { renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); camera.aspect = canvas.clientWidth / canvas.clientHeight; camera.updateProjectionMatrix(); }
function applyDesktopCamera() {
  // Outside XR, keep the authored rig position (or a default tripod) and always
  // aim at the local aircraft so desktop preview tracks the flight.
  if (renderer.xr.isPresenting) return;
  if (!desktopCameraRig) {
    camera.position.set(0, 2.1, 4.8);
  } else {
    desktopCameraRig.updateWorldMatrix(true, false);
    desktopCameraRig.getWorldPosition(camera.position);
  }
  camera.lookAt(planeRoot.position);
}
addEventListener("resize", resize); resize(); let previous = performance.now();
renderer.setAnimationLoop((time, frame) => {
  const dt = (time - previous) / 1000;
  previous = time;
  pollGamepadMenuNavigation();
  updateUiPanelInteraction();
  pollControlsOkShortcut();
  const input = controls();
  if (input.pause && !pauseButtonWasPressed) setSimulationPaused(!simulationPaused);
  pauseButtonWasPressed = input.pause;
  if (!simulationPaused) {
    const crashing = updatePlayerCrash(dt);
    if (!crashing) {
      flight.step(input, dt);
      if (flight.groundHitThisFrame) onPlayerGroundHit();
      const surfaceInput = flight.outsidePlayVolume
        ? { pitch: 0, roll: 0, yaw: 0, throttle: flight.throttle }
        : input;
      animateAircraft(surfaceInput, dt);
      if (
        !flight.outsidePlayVolume
        && input.fire
        && !uiPointerBlocksFire
        && time - lastFire > fireCooldownMs
      ) {
        fire();
        lastFire = time;
      }
      if (flight.outsidePlayVolume && statusLabel) {
        statusLabel.textContent = "Return to play space";
      }
    } else {
      animateAircraft({ pitch: 0, roll: 0, yaw: 0, throttle: 0 }, dt);
    }
    if (bullets.length) {
      collectBulletColliders();
      environmentMeshRoot.updateMatrixWorld(true);
      roomContent.updateMatrixWorld(true);
    }
    for (let i = bullets.length - 1; i >= 0; i -= 1) {
      const shot = bullets[i];
      bulletNextLocal.copy(shot.position).addScaledVector(shot.userData.velocity, dt);
      const stepDistance = shot.position.distanceTo(bulletNextLocal);
      const balloon = bulletHitsBalloon(shot.position, bulletNextLocal);
      if (balloon) {
        const respawn = randomBalloonPosition();
        popBalloon(balloon.id, respawn, BALLOON_RESPAWN_SEC, false);
        playSpace.remove(shot);
        bullets.splice(i, 1);
        continue;
      }
      const fleet = ensureAiFleet();
      const aiHit = fleet?.hitTestPlayerBullet(shot.position, bulletNextLocal, time / 1000);
      if (aiHit?.hit) {
        playSpace.remove(shot);
        bullets.splice(i, 1);
        if (aiHit.destroyed) {
          registerKill(aiHit.position);
          if (statusLabel) statusLabel.textContent = "AI spinning out!";
        } else if (statusLabel) {
          statusLabel.textContent = `AI hit — ${aiHit.health}/${PLANE_MAX_HEALTH}`;
        }
        continue;
      }
      const hit = bulletHitsEnvironment(shot, bulletNextLocal);
      if (hit) {
        spawnBulletImpact(hit.point);
        playSpace.remove(shot);
        bullets.splice(i, 1);
        continue;
      }
      if (shot.userData.prevPosition) shot.userData.prevPosition.copy(shot.position);
      shot.position.copy(bulletNextLocal);
      shot.userData.traveled = (shot.userData.traveled ?? 0) + stepDistance;
      shot.userData.age += dt;
      if (shot.userData.age > bulletLifetimeSec) {
        playSpace.remove(shot);
        bullets.splice(i, 1);
      }
    }
    updateImpactParticles(dt);
  }
  // Rising edge of takeoff ? brief invulnerability.
  if (flight.throttleCommitted && !playerWasThrottleCommitted) {
    playerInvulnUntil = time / 1000 + TAKEOFF_INVULN_SEC;
  }
  playerWasThrottleCommitted = flight.throttleCommitted;
  planeRoot.position.copy(flight.position);
  planeRoot.quaternion.copy(flight.rotation);
  broadcastLocalPlane(time);
  updateRemotePlanes(dt);
  updateRemoteBullets(dt);
  ensureAiFleet()?.update(dt, flight.position, {
    paused: simulationPaused,
    nowSec: time / 1000,
    onPlayerHit:
      playerCrash || isPlayerInvulnerable(time / 1000) ? null : onAiHitPlayer,
    // Grounded at spawn / no throttle — AI patrols only until you take off.
    playerAirborne: flight.throttleCommitted
      || flight.position.distanceToSquared(spawnPosition) > 2.25,
  });
  updateHitFlashes();
  if (!simulationPaused) updatePlayerDamageSmoke(dt);
  updateCrashFlames(dt);
  updateBalloons();
  updateWingVortex(dt);
  applyDesktopCamera();
  updateOffScreenPlaneArrow();
  tickMatchTimer(dt);
  tickWorldRecenter();
  updateLocalNameTag();
  billboardNameTags(renderer.xr.isPresenting ? renderer.xr.getCamera() : camera);
  updateEnvironmentMeshes(frame);
  calibratePlaySpaceHeight(frame);
  const speedValue = Math.round(flight.airspeed);
  const throttlePct = Math.round(flight.throttle * 100);
  const speedText = `Speed ${speedValue}${simulationPaused ? " - paused" : ""}`;
  if (speedLabel.textContent !== speedText) speedLabel.textContent = speedText;
  const throttleText = `Throttle ${throttlePct}%`;
  if (throttleLabel.textContent !== throttleText) throttleLabel.textContent = throttleText;
  if (uiMode === "game") {
    gamePanel?.userData.setThrottle?.(flight.throttle);
    gamePanel?.userData.setScore?.(killScore);
    gamePanel?.userData.setMatchTime?.(matchTimeLeft);
  }
  updateKillPopups(time);
  if (!simulationPaused) updateEngineSound();
  renderer.render(scene, camera);
});
function registerKill(atPosition) {
  if (matchEnded) return;
  killScore += 1;
  gamePanel?.userData.setScore?.(killScore);
  spawnKillPopup(atPosition);
}
function spawnKillPopup(atPosition) {
  if (!atPosition) return;
  const pos = atPosition.clone
    ? atPosition.clone()
    : new THREE.Vector3(atPosition.x, atPosition.y, atPosition.z);
  pos.y += 0.85;
  // Same canvas metrics / outline stroke as nametags (createNameTagSprite).
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const c = canvas.getContext("2d");
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.font = "bold 64px system-ui, sans-serif";
  c.textAlign = "center";
  c.textBaseline = "middle";
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  c.lineJoin = "round";
  c.miterLimit = 2;
  c.lineWidth = 10;
  c.strokeStyle = "#000000";
  c.strokeText("+1 Kill", x, y);
  c.fillStyle = "#ffe626";
  c.fillText("+1 Kill", x, y);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    }),
  );
  sprite.position.copy(pos);
  sprite.scale.set(1.6, 0.4, 1);
  sprite.renderOrder = 40;
  playSpace.add(sprite);
  killPopups.push({ sprite, expiresAt: performance.now() + KILL_POPUP_MS });
}
function updateKillPopups(nowMs) {
  const cam = renderer.xr.isPresenting ? renderer.xr.getCamera() : camera;
  for (let i = killPopups.length - 1; i >= 0; i -= 1) {
    const entry = killPopups[i];
    const life = entry.expiresAt - nowMs;
    if (life <= 0) {
      playSpace.remove(entry.sprite);
      entry.sprite.material.map?.dispose();
      entry.sprite.material.dispose();
      killPopups.splice(i, 1);
      continue;
    }
    // Billboard toward the view; stay fixed in world (do not follow the wreck).
    if (cam) entry.sprite.quaternion.copy(cam.quaternion);
    entry.sprite.material.opacity = Math.min(1, life / 450);
  }
}
function clearKillPopups() {
  for (const entry of killPopups) {
    playSpace.remove(entry.sprite);
    entry.sprite.material.map?.dispose();
    entry.sprite.material.dispose();
  }
  killPopups.length = 0;
}
function resetPlayerFlight({ keepScore = true } = {}) {
  flight.reset();
  playerCrash = null;
  playerHealth = PLANE_MAX_HEALTH;
  playerInvulnUntil = 0;
  playerWasThrottleCommitted = false;
  playerHitFlashUntil = 0;
  if (!keepScore) {
    killScore = 0;
    gamePanel?.userData.setScore?.(0);
  }
  playerDamageSmokeAcc = 0;
  clearCrashFlames();
  clearKillPopups();
  updateLocalNameTag();
}
resetButton.addEventListener("click", () => resetPlayerFlight());
function xrOptionalFeatures() {
  const features = ["local-floor", "bounded-floor", "hand-tracking"];
  // Only ask for mesh-detection when a mesh setting is on (avoids headset mesh work).
  if (gameSettings.meshVisual || gameSettings.meshCollision) {
    features.push("mesh-detection");
  }
  return features;
}

/** Scene Y of the controls panel / strip — authored for Quest local-floor standing. */
const playSpaceAnchorY = 1.48;
let playSpaceHeightReady = false;
let playSpaceEyeSamples = [];

function resetPlaySpaceHeight() {
  playSpace.position.y = 0;
  playSpaceHeightReady = false;
  playSpaceEyeSamples = [];
}

async function ensureXrReferenceSpace(session) {
  // Three.js requests local-floor by default; on some AVP paths it can end up with
  // local (y˜0 at the head). Force local-floor, or emulate floor from local.
  try {
    const floor = await session.requestReferenceSpace("local-floor");
    renderer.xr.setReferenceSpace(floor);
    console.info("[WebXR] reference space: local-floor");
    return "local-floor";
  } catch (floorError) {
    console.warn("[WebXR] local-floor unavailable; emulating from local", floorError);
    const local = await session.requestReferenceSpace("local");
    const emulated = local.getOffsetReferenceSpace(new XRRigidTransform({ x: 0, y: -1.55, z: 0 }));
    renderer.xr.setReferenceSpace(emulated);
    return "local-emulated-floor";
  }
}

function calibratePlaySpaceHeight(frame) {
  if (playSpaceHeightReady || !renderer.xr.isPresenting || !frame?.getViewerPose) return;
  const referenceSpace = renderer.xr.getReferenceSpace();
  if (!referenceSpace) return;
  let pose = null;
  try {
    pose = frame.getViewerPose(referenceSpace);
  } catch (_) {
    return;
  }
  const eyeY = pose?.transform?.position?.y;
  if (!Number.isFinite(eyeY)) return;
  playSpaceEyeSamples.push(eyeY);
  if (playSpaceEyeSamples.length < 8) return;
  const samples = playSpaceEyeSamples.slice(-8);
  const avgEyeY = samples.reduce((sum, value) => sum + value, 0) / samples.length;
  // Keep the controls panel a little below eye height so AVP seated / odd floors
  // don't leave the strip and UI floating above the user.
  const targetPanelY = avgEyeY - 0.1;
  const shift = targetPanelY - playSpaceAnchorY;
  if (Math.abs(shift) >= 0.18) {
    playSpace.position.y = shift;
    console.info(`[WebXR] play-space height eyeY=${avgEyeY.toFixed(2)} shift=${shift.toFixed(2)}`);
  } else {
    playSpace.position.y = 0;
  }
  playSpaceHeightReady = true;
  // Play-space Y shift moves every child — re-anchor menus to hand/head height.
  uiAwaitingHandAnchor = true;
  if (uiMode !== "game") placeMenusInFrontOfPlayer();
}

/** Wireframe overlay for WebXR environment meshes (Quest Space Setup). */
const environmentMeshRoot = new THREE.Group();
environmentMeshRoot.name = "Environment Mesh Grid";
environmentMeshRoot.visible = false;
scene.add(environmentMeshRoot);
const environmentMeshWireMaterial = new THREE.MeshBasicMaterial({
  color: 0x7fd4ff,
  wireframe: true,
  transparent: true,
  opacity: 0.85,
  depthWrite: false,
});
/** Invisible solid mesh used for bullet collision against the room mesh. */
const environmentMeshColliderMaterial = new THREE.MeshBasicMaterial({
  visible: false,
  side: THREE.DoubleSide,
});
/** @type {Map<XRMesh, { mesh: THREE.Mesh, collider: THREE.Mesh, lastChangedTime: number }>} */
const environmentMeshes = new Map();

function createEnvironmentMeshGeometry(vertices, indices) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  if (indices) geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  try {
    geometry.computeBoundsTree();
  } catch (error) {
    console.warn("[WebXR] env mesh BVH failed", error);
  }
  return geometry;
}

function clearEnvironmentMeshes() {
  for (const entry of environmentMeshes.values()) {
    environmentMeshRoot.remove(entry.mesh);
    environmentMeshRoot.remove(entry.collider);
    disposeMeshGeometry(entry.mesh.geometry);
  }
  environmentMeshes.clear();
  environmentMeshRoot.visible = false;
}

function updateEnvironmentMeshes(frame) {
  // Skip all mesh-detection work when both overlays/colliders are off.
  if (!gameSettings.meshVisual && !gameSettings.meshCollision) {
    if (environmentMeshes.size) {
      clearEnvironmentMeshes();
      markBulletCollidersDirty();
    }
    environmentMeshRoot.visible = false;
    return;
  }
  if (!frame?.detectedMeshes) {
    environmentMeshRoot.visible = false;
    return;
  }
  const referenceSpace = renderer.xr.getReferenceSpace();
  if (!referenceSpace) return;

  const staleMeshes = [];
  for (const xrMesh of environmentMeshes.keys()) {
    if (!frame.detectedMeshes.has(xrMesh)) staleMeshes.push(xrMesh);
  }
  for (const xrMesh of staleMeshes) {
    const entry = environmentMeshes.get(xrMesh);
    if (!entry) continue;
    environmentMeshRoot.remove(entry.mesh);
    environmentMeshRoot.remove(entry.collider);
    disposeMeshGeometry(entry.mesh.geometry);
    environmentMeshes.delete(xrMesh);
    markBulletCollidersDirty();
  }

  frame.detectedMeshes.forEach((xrMesh) => {
    let entry = environmentMeshes.get(xrMesh);
    if (!entry) {
      const geometry = createEnvironmentMeshGeometry(xrMesh.vertices, xrMesh.indices);
      const mesh = new THREE.Mesh(geometry, environmentMeshWireMaterial);
      mesh.matrixAutoUpdate = false;
      mesh.frustumCulled = false;
      mesh.renderOrder = 1;
      const collider = new THREE.Mesh(geometry, environmentMeshColliderMaterial);
      collider.matrixAutoUpdate = false;
      collider.frustumCulled = false;
      collider.visible = true;
      environmentMeshRoot.add(mesh);
      environmentMeshRoot.add(collider);
      entry = { mesh, collider, lastChangedTime: xrMesh.lastChangedTime };
      environmentMeshes.set(xrMesh, entry);
      markBulletCollidersDirty();
    } else if (entry.lastChangedTime < xrMesh.lastChangedTime) {
      entry.lastChangedTime = xrMesh.lastChangedTime;
      const geometry = createEnvironmentMeshGeometry(xrMesh.vertices, xrMesh.indices);
      disposeMeshGeometry(entry.mesh.geometry);
      entry.mesh.geometry = geometry;
      entry.collider.geometry = geometry;
      markBulletCollidersDirty();
    }

    const pose = frame.getPose(xrMesh.meshSpace, referenceSpace);
    if (pose) {
      entry.mesh.visible = Boolean(gameSettings.meshVisual);
      entry.mesh.matrix.fromArray(pose.transform.matrix);
      entry.collider.visible = Boolean(gameSettings.meshCollision);
      entry.collider.matrix.fromArray(pose.transform.matrix);
    } else {
      entry.mesh.visible = false;
      entry.collider.visible = false;
    }
  });

  environmentMeshRoot.visible = environmentMeshes.size > 0
    && (gameSettings.meshVisual || gameSettings.meshCollision);
}
// AVP Safari often omits "Vision" from UA; Macintosh + 5 touch points is the usual heuristic.
// Also match explicit visionOS / AppleVision tokens when present.
function isLikelyAppleVision() {
  const ua = navigator.userAgent || "";
  if (/VisionOS|visionOS|AppleVision|Vision Pro/i.test(ua)) return true;
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints === 5) return true;
  if (/Macintosh/i.test(ua) && /iOS\/\d/i.test(ua) && !/Oculus|Quest|Android/i.test(ua)) return true;
  return false;
}
function isPassthroughBlend(blend) {
  return blend === "alpha-blend" || blend === "additive";
}
function probeSessionSupport(mode, timeoutMs = 0) {
  const support = navigator.xr.isSessionSupported(mode).catch(() => false);
  if (!timeoutMs) return support;
  return Promise.race([
    support,
    new Promise((resolve) => setTimeout(() => resolve(false), timeoutMs)),
  ]);
}
async function requestXrSession(mode, timeoutMs = 12000) {
  return Promise.race([
    navigator.xr.requestSession(mode, { optionalFeatures: xrOptionalFeatures() }),
    new Promise((_, reject) => setTimeout(() => reject(new Error("XR session timed out")), timeoutMs)),
  ]);
}
function restoreDesktopPresentation() {
  renderer.setClearColor(SKY_COLOR, 1);
  renderer.setClearAlpha(1);
  scene.background = null;
  scene.fog = new THREE.Fog(SKY_COLOR, 70, 350);
  virtualEnvironment.visible = true;
  opaqueSky.visible = true;
}
function applyPassthroughPresentation() {
  renderer.setClearColor(0x000000, 0);
  renderer.setClearAlpha(0);
  scene.background = null;
  scene.fog = null;
  virtualEnvironment.visible = false;
  opaqueSky.visible = false;
}
function applyOpaqueXrPresentation() {
  // AR/alpha-blend sessions still show camera where nothing is drawn — sky mesh
  // + opaque clear cover the upper half that ground alone can't fill.
  renderer.setClearColor(SKY_COLOR, 1);
  renderer.setClearAlpha(1);
  scene.background = new THREE.Color(SKY_COLOR);
  scene.fog = new THREE.Fog(SKY_COLOR, 70, 350);
  virtualEnvironment.visible = true;
  opaqueSky.visible = true;
}
function applySessionPresentation(mode, blend) {
  const canPassthrough = mode === "immersive-ar" || isPassthroughBlend(blend);
  const wantPassthrough = Boolean(gameSettings.passthrough) && canPassthrough;
  console.info(`[WebXR] mode=${mode} environmentBlendMode=${blend ?? "unknown"} passthrough=${wantPassthrough ? "on" : "off"}`);
  if (wantPassthrough && blend === "opaque") {
    // Granted AR (or claimed AR) but compositing opaque — keep a visible world.
    console.warn("[WebXR] session granted opaque blend; passthrough unavailable on this device/browser");
    applyOpaqueXrPresentation();
    statusLabel.textContent = "AR session · opaque blend (no passthrough)";
    return;
  }
  if (wantPassthrough && blend === "additive") {
    applyPassthroughPresentation();
    renderer.setClearColor(0x000000, 1);
    statusLabel.textContent = "Passthrough · third-person RC flight";
    return;
  }
  if (wantPassthrough) {
    applyPassthroughPresentation();
    statusLabel.textContent = "Passthrough · third-person RC flight";
    return;
  }
  applyOpaqueXrPresentation();
  statusLabel.textContent = canPassthrough && !gameSettings.passthrough
    ? "VR sky · passthrough off"
    : "VR · third-person RC flight";
}
async function configureVR() {
  if (!navigator.xr) { vrButton.textContent = "WebXR unavailable"; vrButton.disabled = true; return; }
  const appleVision = isLikelyAppleVision();
  // Avoid the old 4–5s AR race that false-negatived on slow Safari. Use a long
  // safety timeout only; Apple still reports immersive-ar=false on Vision Pro.
  const [arSupported, vrSupported] = await Promise.all([
    probeSessionSupport("immersive-ar", 20000),
    probeSessionSupport("immersive-vr", appleVision ? 0 : 5000),
  ]);
  // Prefer real AR when advertised (Quest). On Vision Pro, immersive-ar is usually
  // false — still offer a passthrough path (try AR on click, else VR + blend check).
  const canOfferPassthrough = arSupported || appleVision;
  let preferredMode = arSupported ? "immersive-ar" : "immersive-vr";
  const labelFor = () => (
    canOfferPassthrough && gameSettings.passthrough ? "Start passthrough" : "Enter VR"
  );
  vrButton.textContent = labelFor();
  statusLabel.textContent = canOfferPassthrough && gameSettings.passthrough
    ? "Passthrough ready · the aircraft stays in your room"
    : vrSupported
      ? "Quest Link VR · third-person RC flight"
      : "Quest Link is restarting · you can still retry VR";
  vrButton.addEventListener("click", async () => {
    try {
      startEngineSound();
      vrButton.disabled = true;
      vrButton.textContent = "Starting…";
      let session = null;
      let mode = preferredMode;
      const wantPassthrough = canOfferPassthrough && gameSettings.passthrough;
      if (wantPassthrough) {
        // Always attempt AR first when passthrough is the intended UX (Quest + AVP).
        // Skip isSessionSupported gating — it false-negatives on Vision Pro.
        try {
          session = await requestXrSession("immersive-ar");
          mode = "immersive-ar";
        } catch (arError) {
          console.info("[WebXR] immersive-ar request failed; falling back to immersive-vr", arError);
          session = null;
        }
      }
      if (!session) {
        mode = "immersive-vr";
        session = await requestXrSession("immersive-vr");
      }
      preferredMode = mode;
      // Optimistic clear for AR / known blend passthrough; refined after setSession.
      if (mode === "immersive-ar" && gameSettings.passthrough) applyPassthroughPresentation();
      else applyOpaqueXrPresentation();
      await renderer.xr.setSession(session);
      xrSessionHasMeshDetection = gameSettings.meshVisual || gameSettings.meshCollision;
      syncRendererResolution();
      resetPlaySpaceHeight();
      await ensureXrReferenceSpace(session);
      const blend = session.environmentBlendMode ?? renderer.xr.getEnvironmentBlendMode?.();
      xrSessionMode = mode;
      xrSessionBlend = blend;
      applySessionPresentation(mode, blend);
      uiAwaitingHandAnchor = true;
      placeMenusInFrontOfPlayer();
      vrButton.textContent = "XR active";
      session.addEventListener("end", () => {
        pauseEngineSound();
        clearEnvironmentMeshes();
        resetPlaySpaceHeight();
        uiAwaitingHandAnchor = false;
        xrSessionHasMeshDetection = false;
        xrSessionMode = null;
        xrSessionBlend = null;
        restoreDesktopPresentation();
        syncRendererResolution();
        vrButton.disabled = false;
        vrButton.textContent = labelFor();
        statusLabel.textContent = "Desktop preview - controller or keyboard";
      });
    } catch (error) {
      vrButton.disabled = false;
      vrButton.textContent = canOfferPassthrough && gameSettings.passthrough
        ? "Start passthrough"
        : "Retry VR";
      statusLabel.textContent = error.message === "XR session timed out"
        ? "XR session did not start · wait a moment, then retry"
        : error.name === "InvalidStateError"
          ? "An immersive session is already active · exit it from the headset first"
          : "Could not start XR · wait a moment, then retry";
    }
  });
}
configureVR().catch((error) => { console.error(error); vrButton.textContent = "Unable to start VR"; vrButton.disabled = true; });
