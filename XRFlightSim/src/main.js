import * as THREE from "three";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.9.1/build/index.module.js";
import { bindControlSurfaces, createSceneObject, FLIGHT_SCENE_URL, loadFlightScene, sceneRole, setSceneMaterialLibrary } from "./scene-format.js?v=0.4.51";
import { createGamePanel, createPauseMenu, createSettingsMenu, createUiButton, findUiButton, loadSettings, saveSettings, setUiButtonHovers } from "./ui-menus.js?v=0.4.51";

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
const balloonPopUrl = assetUrl("audio/BalloonPop.wav");
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
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
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
const OFFSCREEN_LOOK_Z = -1;
const offScreenPlaneLocal = new THREE.Vector3();
const offScreenArrowLocalPos = new THREE.Vector3();
const offScreenArrowPointQuat = new THREE.Quaternion();
const offScreenArrowEuler = new THREE.Euler();
let offScreenArrowShowing = false;

function createOffScreenPlaneArrow() {
  const root = new THREE.Group();
  root.name = "Off Screen Plane Arrow";
  root.visible = false;
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1, 0.9, 0.15),
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const geometry = new THREE.PlaneGeometry(1, 1);
  const spread = THREE.MathUtils.degToRad(28);
  for (const angle of [spread, -spread]) {
    const stroke = new THREE.Mesh(geometry, material);
    stroke.renderOrder = 25;
    stroke.frustumCulled = false;
    stroke.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
    offScreenArrowLocalPos.set(0, -OFFSCREEN_ARROW_LENGTH * 0.5, 0).applyQuaternion(stroke.quaternion);
    stroke.position.copy(offScreenArrowLocalPos);
    stroke.scale.set(OFFSCREEN_ARROW_THICKNESS, OFFSCREEN_ARROW_LENGTH, 1);
    root.add(stroke);
  }
  scene.add(root);
  return root;
}
const offScreenPlaneArrow = createOffScreenPlaneArrow();
scene.add(new THREE.HemisphereLight(0xdceeff, 0x263f24, 3.2));
const sun = new THREE.DirectionalLight(0xfff2d4, 3.2); sun.position.set(25, 55, 10); scene.add(sun);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshStandardMaterial({ color: 0x4c7e42, roughness: 1 }));
ground.rotation.x = -Math.PI / 2; ground.position.y = -3; virtualEnvironment.add(ground);
const grid = new THREE.GridHelper(1000, 100, 0x6ca760, 0x47794a); grid.position.y = -2.98; virtualEnvironment.add(grid);

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
  panel.add(worldText("OK · PRESS RIGHT TRIGGER", new THREE.Vector3(0, -.9, .13), .22));
  return panel;
}
let controlsPanel = createControlsPanel(); controlsPanel.position.set(0, 1.55, -2.8); playSpace.add(controlsPanel);
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
let returnToPauseAfterControls = false;
/** @type {"controls" | "game" | "pause" | "settings"} */
let uiMode = "controls";

function applyGameSettings() {
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

function showUiMode(mode) {
  uiMode = mode;
  const showControls = mode === "controls";
  const showGame = mode === "game";
  const showPause = mode === "pause";
  const showSettings = mode === "settings";
  controlsVisible = showControls;
  if (controlsPanel) controlsPanel.visible = showControls;
  if (controlsOkButton) controlsOkButton.visible = showControls;
  if (gamePanel) gamePanel.visible = showGame;
  if (pausePanel) pausePanel.visible = showPause;
  if (settingsPanel) settingsPanel.visible = showSettings;
  const shouldPause = mode !== "game";
  if (shouldPause !== simulationPaused) {
    simulationPaused = shouldPause;
    if (shouldPause) {
      pauseEngineSound();
      statusLabel.textContent = mode === "settings"
        ? "Settings"
        : mode === "controls"
          ? "Controls"
          : "Simulation paused";
    } else {
      startEngineSound();
      statusLabel.textContent = renderer.xr.isPresenting
        ? "Third-person RC flight"
        : "Desktop preview · controller or keyboard";
    }
  }
  if (showGame) {
    gamePanel?.userData.setThrottle?.(flight?.throttle ?? 0);
  }
  applyGameSettings();
}

let pausePanel = createPauseMenu({
  onResume: () => showUiMode("game"),
  onControls: () => {
    returnToPauseAfterControls = true;
    showUiMode("controls");
  },
  onSettings: () => {
    settingsPanel.userData.refreshSettingsLabels?.();
    showUiMode("settings");
  },
  onRestart: () => {
    flight.reset();
    showUiMode("game");
  },
});
pausePanel.position.set(0, 1.55, -2.4);
pausePanel.visible = false;
playSpace.add(pausePanel);

const gamePanel = createGamePanel({
  onMenu: () => showUiMode("pause"),
});
gamePanel.position.set(0, 1.55, -2.4);
gamePanel.visible = false;
playSpace.add(gamePanel);

const settingsPanel = createSettingsMenu(gameSettings, {
  onBack: () => showUiMode("pause"),
  onChange: () => applyGameSettings(),
});
settingsPanel.position.set(0, 1.55, -2.4);
settingsPanel.visible = false;
playSpace.add(settingsPanel);

const controlsOkButton = createUiButton("OK", 1.35, 0.32);
controlsOkButton.position.set(0, -1.2, 0.06);
controlsOkButton.userData.uiButton.onClick = () => {
  if (returnToPauseAfterControls) {
    returnToPauseAfterControls = false;
    showUiMode("pause");
    return;
  }
  dismissControlsToGame();
};
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
/** @type {{ controller: THREE.Object3D, panel: THREE.Object3D, distance: number, offsetWorld: THREE.Vector3 } | null} */
let uiDrag = null;
let uiPointerBlocksFire = false;
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
  const entry = { index, controller, laser, triggerWasDown: false, selectHeld: false };

  // Three.js dispatches these on the target-ray group; inputSource is NOT auto-copied to userData.
  controller.addEventListener("connected", (event) => {
    controller.userData.inputSource = event.data ?? null;
  });
  controller.addEventListener("disconnected", () => {
    controller.userData.inputSource = null;
    entry.selectHeld = false;
    entry.triggerWasDown = false;
    if (uiDrag?.controller === controller) uiDrag = null;
  });
  controller.addEventListener("selectstart", () => {
    entry.selectHeld = true;
    // In-flight: no UI rays/clicks — use the controller menu button to pause.
    if (uiMode === "game") return;
    if (tryUiButtonClick(controller)) return;
    tryStartUiDrag(controller);
  });
  controller.addEventListener("selectend", () => {
    entry.selectHeld = false;
    if (uiDrag?.controller === controller) uiDrag = null;
  });

  return entry;
});

function draggableUiPanels() {
  const panels = [];
  if (controlsPanel?.visible) panels.push(controlsPanel);
  if (gamePanel?.visible) panels.push(gamePanel);
  if (pausePanel?.visible) panels.push(pausePanel);
  if (settingsPanel?.visible) panels.push(settingsPanel);
  return panels;
}

function uiRootFromHit(object) {
  let node = object;
  while (node) {
    if (
      node === controlsPanel ||
      node === gamePanel ||
      node === pausePanel ||
      node === settingsPanel
    ) {
      return node;
    }
    node = node.parent;
  }
  return null;
}

function tryUiButtonClick(controller) {
  getControllerAimRay(controller, uiRayOrigin, uiRayDir);
  uiRaycaster.set(uiRayOrigin, uiRayDir);
  const panels = draggableUiPanels();
  if (!panels.length) return false;
  const hits = uiRaycaster.intersectObjects(panels, true);
  for (const hit of hits) {
    const button = findUiButton(hit.object);
    if (!button) continue;
    button.userData.uiButton.onClick?.();
    return true;
  }
  return false;
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
    setUiButtonHovers(draggableUiPanels(), null);
    for (const entry of uiControllerEntries) {
      entry.laser.visible = false;
      entry.triggerWasDown = false;
      entry.selectHeld = false;
    }
    return;
  }

  // Flying: hide interaction rays. Pause/resume with the controller menu button.
  if (uiMode === "game") {
    uiDrag = null;
    setUiButtonHovers(draggableUiPanels(), null);
    for (const entry of uiControllerEntries) {
      entry.laser.visible = false;
      entry.triggerWasDown = isControllerTriggerDown(entry);
    }
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
    if (hit) {
      hovered = true;
      entry.laser.scale.z = Math.max(hit.distance, 0.05);
      entry.laser.material.color.setHex(0xffe626);
      entry.laser.material.opacity = 0.95;
      if (!hoveredButton) {
        for (const entryHit of hits) {
          const button = findUiButton(entryHit.object);
          if (button) {
            hoveredButton = button;
            break;
          }
        }
      }
    } else {
      entry.laser.scale.z = 3;
      entry.laser.material.color.setHex(0x7fd4ff);
      entry.laser.material.opacity = 0.45;
    }

    // Clicks/drags are handled only on selectstart — polling here double-fired
    // settings toggles (On→Off→On in one press).
    entry.triggerWasDown = isControllerTriggerDown(entry);
  }
  setUiButtonHovers(panels, hoveredButton);
  uiPointerBlocksFire = hovered || Boolean(uiDrag) || uiMode !== "game";
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

const spawnPosition = new THREE.Vector3(0, 1.5, -7);
class FlightModel {
  constructor() { this.reset(); }
  reset() { this.position = spawnPosition.clone(); this.rotation = new THREE.Quaternion(); this.throttle = 0; this.velocity = new THREE.Vector3(); }
  forward() { return new THREE.Vector3(0, 0, -1).applyQuaternion(this.rotation).normalize(); }
  step(input, seconds) {
    const dt = clamp(seconds, 0, .1); this.throttle = clamp(this.throttle + input.throttle * .5 * dt, 0, 1);
    // Match Lens Scene.scene GameControllerMovement: minSpeed 0, maxSpeed 500,
    // turnSpeed 240, pitch/roll/yaw 70. Keep WebXR translation at 0..100 * scale
    // (Lens cm-ish 500 ≈ same feel after worldSpeedScale), but use the Lens
    // authority curve: referenceSpeed = maxSpeed * 0.25 when minSpeed is 0.
    const speed = lerp(0, 100, this.throttle);
    const controlAirspeed = lerp(0, 500, this.throttle);
    const referenceSpeed = Math.max(500 * .25, 1);
    const authority = clamp(controlAirspeed / referenceSpeed, .5, 1.25);
    const controlScale = 240 / 120;
    const rate = controlScale * authority * dt * Math.PI / 180;
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, -1), input.roll * 70 * rate));
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -input.pitch * 70 * rate));
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -input.yaw * 70 * rate)).normalize();
    const worldSpeed = speed * worldSpeedScale;
    this.velocity.copy(this.forward()).multiplyScalar(speed > .01 ? worldSpeed : 0);
    if (speed > .01) this.position.addScaledVector(this.velocity, dt);
  }
}
const flight = new FlightModel(); const keys = new Set(); const bullets = []; let lastFire = -Infinity; let nextBulletSpawnIndex = 0; let simulationPaused = true; let pauseButtonWasPressed = false; let controlsVisible = true;
// Lens BulletSpawnPoint1/2 under Player (scale 0.296423). Scene units are cm → meters; flip Z for THREE -forward.
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
const vortexMaxSpawnsPerSecond = 28;
const vortexWispLifetime = 0.65;
// Lens wispLength/width are cm world scale → meters.
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
  // Lens getCurrentAirspeedRatio with minSpeed 0, maxSpeed 500 → ref = 125.
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
    vortexMesh.getMatrixAt(wisp.id, vortexDummy.matrix);
    vortexDummy.matrix.decompose(vortexDummy.position, vortexDummy.quaternion, vortexDummy.scale);
    vortexDummy.position.x += wisp.velocityX * dt;
    vortexDummy.position.y += wisp.velocityY * dt;
    vortexDummy.position.z += wisp.velocityZ * dt;
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
    if (uiMode === "game") showUiMode("pause");
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
    node.castShadow = true;
    node.receiveShadow = true;
  });
  bindControlSurfaces(model, animatedParts);
  planeRoot.remove(aircraft);
  aircraft = model;
  planeRoot.add(aircraft);
  modelLabel.textContent = "Fighter model: GLB loaded";
  if (statusText) notePreviewStatus(statusText);
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
    const data = await loadFlightScene(`${FLIGHT_SCENE_URL}?v=0.4.51`);
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
      const object = createSceneObject(item);
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
addEventListener("keydown", (event) => { if (["Space", "ArrowUp", "ArrowDown"].includes(event.code)) event.preventDefault(); keys.add(event.code); if (event.code === "KeyR") flight.reset(); if (event.code === "Escape" && !event.repeat) setSimulationPaused(!simulationPaused); });
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
  // DualSense / Xbox / etc. use the browser Gamepad API ("standard").
  // XR controllers use "xr-standard" and must not mute Bluetooth pads on AVP.
  return Boolean(gamepad && gamepad.mapping === "standard" && gamepad.axes.length >= 4);
}
function gamepadLabel(gamepad) {
  const id = (gamepad?.id || "Gamepad").replace(/\s+/g, " ").trim();
  if (/dualsense|dualshock|playstation|wireless controller/i.test(id)) return "PlayStation";
  if (/xbox|xinput/i.test(id)) return "Xbox";
  return id.slice(0, 28);
}
function applyBrowserGamepad(value, pad) {
  value.yaw = stick(pad.axes[0] || 0);
  value.roll = stick(pad.axes[2] || 0);
  value.pitch = -stick(pad.axes[3] || 0);
  value.throttle = (pad.buttons[5]?.value || 0) - (pad.buttons[4]?.value || 0);
  value.fire = Boolean(pad.buttons[7]?.pressed || pad.buttons[0]?.pressed);
  // Options / Start-style buttons when present.
  value.pause ||= Boolean(pad.buttons[9]?.pressed || pad.buttons[8]?.pressed);
}
function controls() {
  const value = { pitch: 0, roll: 0, yaw: 0, throttle: 0, fire: false, pause: false };
  const xrSources = renderer.xr.getSession()?.inputSources ?? [];
  const connectedPads = [...navigator.getGamepads()].filter(Boolean);
  // Prefer DualSense/Xbox whenever present. On Vision Pro, Safari may also expose the
  // pad (or empty hand sources) through XR inputSources; the old hasXRControllers gate
  // then skipped the standard pad and made input intermittent.
  const browserPad = connectedPads.find(isBrowserGamepad) || null;
  const controllerReadout = [];
  if (browserPad) {
    applyBrowserGamepad(value, browserPad);
    controllerReadout.push(`${gamepadLabel(browserPad)} pad`);
  } else {
    for (const source of xrSources) {
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
        // Meta's Quest Touch profile exposes Menu at button 6. Some older profiles omit
        // empty button entries, so button 5 is retained as a compatibility fallback.
        const menu = gamepad.buttons[6] ?? gamepad.buttons[5];
        value.pause ||= Boolean(menu?.pressed);
      }
      if (source.handedness === "right") {
        value.roll += x;
        value.pitch -= y;
        value.throttle += grip;
        value.fire ||= indexTrigger > .55;
      }
    }
  }
  value.pitch += (keys.has("KeyW") ? 1 : 0) - (keys.has("KeyS") ? 1 : 0); value.roll += (keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0); value.yaw += (keys.has("KeyE") ? 1 : 0) - (keys.has("KeyQ") ? 1 : 0); value.throttle += (keys.has("ArrowUp") ? 1 : 0) - (keys.has("ArrowDown") ? 1 : 0); value.fire ||= keys.has("Space");
  controllerLabel.textContent = controllerReadout.length
    ? `Sticks ${controllerReadout.join(" · ")}`
    : "Sticks: waiting for controller";
  for (const key of ["pitch", "roll", "yaw", "throttle"]) value[key] = clamp(value[key], -1, 1); return value;
}
function deflect(part, degrees, axis) {
  if (!part) return;
  part.quaternion.copy(animatedParts.neutral.get(part)).multiply(new THREE.Quaternion().setFromAxisAngle(axis, THREE.MathUtils.degToRad(degrees)));
}
function animateAircraft(input, seconds) {
  // These pivots and axes match the control objects in the Lens Studio fighter scene.
  deflect(animatedParts.leftAileron, -input.roll * 25, new THREE.Vector3(1, 0, 0));
  deflect(animatedParts.rightAileron, input.roll * 25, new THREE.Vector3(1, 0, 0));
  deflect(animatedParts.elevator, input.pitch * 25, new THREE.Vector3(1, 0, 0));
  deflect(animatedParts.rudder, input.yaw * 25, new THREE.Vector3(0, 1, 0));
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
function updateOffScreenPlaneArrow() {
  const viewCam = engineListenerObject();
  if (!viewCam || !planeRoot) {
    offScreenPlaneArrow.visible = false;
    return;
  }

  viewCam.updateMatrixWorld(true);
  planeRoot.getWorldPosition(offScreenPlaneLocal);
  viewCam.worldToLocal(offScreenPlaneLocal);

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

  const halfExtentsCam = viewCam.isArrayCamera ? viewCam.cameras?.[0] : viewCam;
  let halfHeight;
  let halfWidth;
  const proj = halfExtentsCam?.projectionMatrix?.elements;
  if (proj && Math.abs(proj[5]) > 1e-6 && Math.abs(proj[0]) > 1e-6) {
    halfHeight = OFFSCREEN_ARROW_DEPTH / proj[5];
    halfWidth = OFFSCREEN_ARROW_DEPTH / proj[0];
  } else {
    halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * OFFSCREEN_ARROW_DEPTH;
    halfWidth = halfHeight * Math.max(camera.aspect, 0.01);
  }
  const inset = offScreenArrowShowing
    ? OFFSCREEN_ARROW_VISIBLE_INSET
    : OFFSCREEN_ARROW_VISIBLE_INSET + 0.04;
  const planeDepth = Math.max(offScreenPlaneLocal.z * OFFSCREEN_LOOK_Z, 0.01);
  const depthScale = planeDepth / OFFSCREEN_ARROW_DEPTH;
  const inView = inFront
    && Math.abs(offScreenPlaneLocal.x) < halfWidth * (1 - inset) * depthScale
    && Math.abs(offScreenPlaneLocal.y) < halfHeight * (1 - inset) * depthScale;

  if (inView) {
    offScreenPlaneArrow.visible = false;
    offScreenArrowShowing = false;
    return;
  }

  offScreenArrowShowing = true;
  offScreenPlaneArrow.visible = true;

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
  offScreenPlaneArrow.position.copy(offScreenArrowLocalPos);
  offScreenPlaneArrow.quaternion.copy(viewCam.quaternion).multiply(offScreenArrowPointQuat);
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
  const listenerObject = engineListenerObject();
  if (!listenerObject) return;
  planeRoot.getWorldPosition(sourcePosition);
  listenerObject.getWorldPosition(listenerPosition);
  listenerObject.getWorldQuaternion(listenerQuaternion);
  listenerForward.set(0, 0, -1).applyQuaternion(listenerQuaternion);
  listenerUp.set(0, 1, 0).applyQuaternion(listenerQuaternion);
  if (!setAudioVector(enginePanner, "positionX", "positionY", "positionZ", sourcePosition.x, sourcePosition.y, sourcePosition.z, time)
    && enginePanner.setPosition) {
    enginePanner.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z);
  }
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
function dopplerPitchScale() {
  // Lens GameControllerMovement.getDopplerPitchScale: airplane velocity dotted with
  // the direction from the plane to the listener, divided by max speed.
  if (dopplerAmount <= 0 || !flight.velocity) return 1;
  const listener = engineListenerObject();
  if (!listener || !planeRoot) return 1;
  listener.getWorldPosition(listenerPosition);
  planeRoot.getWorldPosition(sourcePosition);
  toListener.copy(listenerPosition).sub(sourcePosition);
  const distance = toListener.length();
  if (distance < 1) return 1;
  toListener.multiplyScalar(1 / distance);
  const closingSpeed = flight.velocity.dot(toListener);
  const closingRatio = clamp(closingSpeed / Math.max(Math.abs(maxPlaneSpeed), 1), -1, 1);
  return clamp(1 + closingRatio * dopplerAmount, .55, 1.6);
}
function enginePlaybackRate() {
  const speedRatio = clamp(flight.throttle, 0, 1);
  const throttlePitch = lerp(minEnginePitch, maxEnginePitch, speedRatio);
  return clamp(throttlePitch * dopplerPitchScale(), .25, 3);
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
async function startEngineSound() {
  try {
    if (!engineContext) {
      engineContext = new AudioContext();
      engineGain = engineContext.createGain();
      engineGain.gain.value = .28;
      enginePanner = createEnginePanner();
      engineGain.connect(enginePanner);
      enginePanner.connect(engineContext.destination);
    }
    // Resume immediately while this call still originates from a controller/button action.
    // Waiting for the fetch first can cause headset browsers to reject audio playback.
    if (engineContext.state !== "running") engineContext.resume().catch(() => {});
    if (!engineLoad) engineLoad = fetch(assetUrl("audio/PlaneEngineNoise.wav"))
      .then((response) => response.arrayBuffer())
      .then((data) => engineContext.decodeAudioData(data));
    engineBuffer = await engineLoad;
    await engineContext.resume();
    if (!engineSource) {
      engineSource = engineContext.createBufferSource();
      engineSource.buffer = engineBuffer;
      engineSource.loop = true;
      engineSource.playbackRate.value = enginePlaybackRate();
      engineSource.connect(engineGain);
      engineSource.start();
    }
    updateSpatialEngineAudio(engineContext.currentTime);
  } catch (error) { console.warn("Engine audio could not start", error); }
}
function pauseEngineSound() {
  if (engineContext?.state === "running") engineContext.suspend();
}
function updateEngineSound() {
  if (!engineContext || !engineGain || !engineSource) return;
  const time = engineContext.currentTime;
  engineSource.playbackRate.setTargetAtTime(enginePlaybackRate(), time, .125);
  engineGain.gain.setTargetAtTime(
    lerp(.28, 1, flight.throttle) * gameSettings.engineVolume * gameSettings.masterVolume,
    time,
    .04,
  );
  updateSpatialEngineAudio(time);
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
  bulletColliders.length = 0;
  if (!gameSettings.meshCollision) {
    roomContent.traverse((node) => {
      if (!node.isMesh || !node.visible) return;
      ensureBoundsTree(node);
      bulletColliders.push(node);
    });
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
    environmentMeshRoot.updateMatrixWorld(true);
    roomContent.updateMatrixWorld(true);

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
    const browserPad = [...navigator.getGamepads()].find(isBrowserGamepad);
    const sources = renderer.xr.getSession()?.inputSources ?? [];
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
  // Lens Unit Sphere diameter 1 × world scale (3,3,12) cm → meters.
  shot.scale.set(0.03, 0.03, 0.12);
  shot.position.copy(flight.position).add(offset);
  shot.quaternion.copy(flight.rotation);
  shot.userData.velocity = flight.forward().multiplyScalar(bulletMuzzleSpeed).add(flight.velocity);
  shot.userData.age = 0;
  shot.userData.traveled = 0;
  shot.userData.prevPosition = shot.position.clone();
  playSpace.add(shot);
  bullets.push(shot);
  vibrateFireController();
}
function resize() { renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); camera.aspect = canvas.clientWidth / canvas.clientHeight; camera.updateProjectionMatrix(); }
function applyDesktopCamera() {
  // Authored rig rotation is the desktop aim. lookAt(plane) would discard it.
  // Scenes without a rig keep the old tripod that tracks the aircraft.
  if (renderer.xr.isPresenting) return;
  if (!desktopCameraRig) {
    camera.position.set(0, 2.1, 4.8);
    camera.lookAt(planeRoot.position);
    return;
  }
  desktopCameraRig.updateWorldMatrix(true, false);
  desktopCameraRig.getWorldPosition(camera.position);
  desktopCameraRig.getWorldQuaternion(camera.quaternion);
}
addEventListener("resize", resize); resize(); let previous = performance.now();
renderer.setAnimationLoop((time, frame) => {
  const dt = (time - previous) / 1000;
  previous = time;
  updateUiPanelInteraction();
  const input = controls();
  if (input.pause && !pauseButtonWasPressed) setSimulationPaused(!simulationPaused);
  pauseButtonWasPressed = input.pause;
  if (!simulationPaused) {
    flight.step(input, dt);
    animateAircraft(input, dt);
    if (input.fire && !uiPointerBlocksFire && time - lastFire > fireCooldownMs) {
      fire();
      lastFire = time;
    }
    for (let i = bullets.length - 1; i >= 0; i -= 1) {
      const shot = bullets[i];
      const nextPosition = shot.position.clone().addScaledVector(shot.userData.velocity, dt);
      const stepDistance = shot.position.distanceTo(nextPosition);
      const hit = bulletHitsEnvironment(shot, nextPosition);
      if (hit) {
        spawnBulletImpact(hit.point);
        playSpace.remove(shot);
        bullets.splice(i, 1);
        continue;
      }
      if (shot.userData.prevPosition) shot.userData.prevPosition.copy(shot.position);
      shot.position.copy(nextPosition);
      shot.userData.traveled = (shot.userData.traveled ?? 0) + stepDistance;
      shot.userData.age += dt;
      if (shot.userData.age > bulletLifetimeSec) {
        playSpace.remove(shot);
        bullets.splice(i, 1);
      }
    }
    updateImpactParticles(dt);
  }
  planeRoot.position.copy(flight.position);
  planeRoot.quaternion.copy(flight.rotation);
  updateWingVortex(dt);
  applyDesktopCamera();
  updateOffScreenPlaneArrow();
  updateEnvironmentMeshes(frame);
  calibratePlaySpaceHeight(frame);
  speedLabel.textContent = `Speed ${Math.round(lerp(0, 100, flight.throttle))}${simulationPaused ? " · paused" : ""}`;
  throttleLabel.textContent = `Throttle ${Math.round(flight.throttle * 100)}%`;
  if (uiMode === "game") {
    gamePanel?.userData.setThrottle?.(flight.throttle);
  }
  if (!simulationPaused) updateEngineSound();
  renderer.render(scene, camera);
});
resetButton.addEventListener("click", () => flight.reset());
const xrOptionalFeatures = ["local-floor", "bounded-floor", "hand-tracking", "mesh-detection"];

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
  // local (y≈0 at the head). Force local-floor, or emulate floor from local.
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
  if (!frame?.detectedMeshes) {
    environmentMeshRoot.visible = false;
    return;
  }
  const referenceSpace = renderer.xr.getReferenceSpace();
  if (!referenceSpace) return;

  for (const [xrMesh, entry] of [...environmentMeshes]) {
    if (!frame.detectedMeshes.has(xrMesh)) {
      environmentMeshRoot.remove(entry.mesh);
      environmentMeshRoot.remove(entry.collider);
      disposeMeshGeometry(entry.mesh.geometry);
      environmentMeshes.delete(xrMesh);
    }
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
    } else if (entry.lastChangedTime < xrMesh.lastChangedTime) {
      entry.lastChangedTime = xrMesh.lastChangedTime;
      const geometry = createEnvironmentMeshGeometry(xrMesh.vertices, xrMesh.indices);
      disposeMeshGeometry(entry.mesh.geometry);
      entry.mesh.geometry = geometry;
      entry.collider.geometry = geometry;
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
    navigator.xr.requestSession(mode, { optionalFeatures: xrOptionalFeatures }),
    new Promise((_, reject) => setTimeout(() => reject(new Error("XR session timed out")), timeoutMs)),
  ]);
}
function restoreDesktopPresentation() {
  renderer.setClearColor(0x8ac5ee, 1);
  scene.background = null;
  scene.fog = new THREE.Fog(0x8ac5ee, 70, 350);
  virtualEnvironment.visible = true;
}
function applyPassthroughPresentation() {
  renderer.setClearColor(0x000000, 0);
  renderer.setClearAlpha(0);
  scene.background = null;
  scene.fog = null;
  virtualEnvironment.visible = false;
}
function applyOpaqueXrPresentation() {
  renderer.setClearColor(0x8ac5ee, 1);
  scene.background = null;
  scene.fog = new THREE.Fog(0x8ac5ee, 70, 350);
  virtualEnvironment.visible = true;
}
function applySessionPresentation(mode, blend) {
  const passthroughSession = mode === "immersive-ar" || isPassthroughBlend(blend);
  console.info(`[WebXR] mode=${mode} environmentBlendMode=${blend ?? "unknown"}`);
  if (passthroughSession && blend === "opaque") {
    // Granted AR (or claimed AR) but compositing opaque — keep a visible world.
    console.warn("[WebXR] session granted opaque blend; passthrough unavailable on this device/browser");
    applyOpaqueXrPresentation();
    statusLabel.textContent = "AR session · opaque blend (no passthrough)";
    return;
  }
  if (passthroughSession && blend === "additive") {
    applyPassthroughPresentation();
    renderer.setClearColor(0x000000, 1);
    statusLabel.textContent = "Passthrough · third-person RC flight";
    return;
  }
  if (passthroughSession) {
    applyPassthroughPresentation();
    statusLabel.textContent = "Passthrough · third-person RC flight";
    return;
  }
  applyOpaqueXrPresentation();
  statusLabel.textContent = "VR · third-person RC flight";
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
  const offerPassthrough = arSupported || appleVision;
  let preferredMode = arSupported ? "immersive-ar" : "immersive-vr";
  const labelFor = () => (offerPassthrough ? "Start passthrough" : "Enter VR");
  vrButton.textContent = labelFor();
  statusLabel.textContent = offerPassthrough
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
      if (offerPassthrough) {
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
      if (mode === "immersive-ar") applyPassthroughPresentation();
      else applyOpaqueXrPresentation();
      await renderer.xr.setSession(session);
      resetPlaySpaceHeight();
      await ensureXrReferenceSpace(session);
      const blend = session.environmentBlendMode ?? renderer.xr.getEnvironmentBlendMode?.();
      applySessionPresentation(mode, blend);
      vrButton.textContent = "XR active";
      session.addEventListener("end", () => {
        pauseEngineSound();
        clearEnvironmentMeshes();
        resetPlaySpaceHeight();
        restoreDesktopPresentation();
        vrButton.disabled = false;
        vrButton.textContent = labelFor();
        statusLabel.textContent = "Desktop preview · controller or keyboard";
      });
    } catch (error) {
      vrButton.disabled = false;
      vrButton.textContent = offerPassthrough ? "Start passthrough" : "Retry VR";
      statusLabel.textContent = error.message === "XR session timed out"
        ? "XR session did not start · wait a moment, then retry"
        : error.name === "InvalidStateError"
          ? "An immersive session is already active · exit it from the headset first"
          : "Could not start XR · wait a moment, then retry";
    }
  });
}
configureVR().catch((error) => { console.error(error); vrButton.textContent = "Unable to start VR"; vrButton.disabled = true; });
