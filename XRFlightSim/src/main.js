import * as THREE from "three";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
import { bindControlSurfaces, createSceneObject, FLIGHT_SCENE_URL, loadFlightScene, sceneRole } from "./scene-format.js?v=0.4.6";

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
const lensWingspan = 2.84433;
const worldSpeedScale = .05;
let engineContext = null;
let engineGain = null;
let engineSource = null;
let engineBuffer = null;
let engineLoad = null;
const balloonPopUrl = assetUrl("audio/BalloonPop.wav");
const inputProfilesBase = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/";
const instructionControllerSlots = {};
let inputProfilesList = null;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.xr.enabled = true;
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x8ac5ee);
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x8ac5ee, 70, 350);
const camera = new THREE.PerspectiveCamera(70, 1, .05, 600);
camera.position.set(0, 2.1, 4.8);
const virtualEnvironment = new THREE.Group();
scene.add(virtualEnvironment);
const planeRoot = new THREE.Group();
scene.add(planeRoot);
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
function questController(hand) { const group = new THREE.Group(); const shell = new THREE.MeshStandardMaterial({ color: 0xe9edf1, roughness: .48, metalness: .12 }); const dark = new THREE.MeshStandardMaterial({ color: 0x1b2229, roughness: .35 }); const body = new THREE.Mesh(new THREE.CapsuleGeometry(.15, .42, 6, 12), shell); body.rotation.z = hand === "left" ? -.18 : .18; group.add(body); const top = new THREE.Mesh(new THREE.SphereGeometry(.2, 16, 12), shell); top.position.y = .25; top.scale.set(1, .42, .7); group.add(top); const stick = new THREE.Mesh(new THREE.CylinderGeometry(.065, .065, .045, 16), dark); stick.position.set(hand === "left" ? -.06 : .06, .3, .1); stick.rotation.x = Math.PI / 2; group.add(stick); const grip = new THREE.Mesh(new THREE.BoxGeometry(.13, .18, .16), dark); grip.position.set(hand === "left" ? -.16 : .16, -.08, .05); group.add(grip); const trigger = new THREE.Mesh(new THREE.BoxGeometry(.12, .07, .13), dark); trigger.position.set(0, .43, -.08); group.add(trigger); const menu = new THREE.Mesh(new THREE.CylinderGeometry(.028, .028, .02, 12), dark); menu.position.set(.07, .31, .1); menu.rotation.x = Math.PI / 2; if (hand === "left") group.add(menu); return { group, stick: stick.position.clone(), grip: grip.position.clone(), trigger: trigger.position.clone(), menu: menu.position.clone() }; }
function createControlsPanel() { const panel = new THREE.Group(); const backing = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 2.3), new THREE.MeshBasicMaterial({ color: 0x0b1826, depthWrite: false })); backing.renderOrder = 3; panel.add(backing); panel.add(worldText("CONTROLS", new THREE.Vector3(0, .92, .03), .3)); const left = questController("left"), right = questController("right"); left.group.position.set(-.55, -.12, .12); right.group.position.set(.55, -.12, .12); panel.add(left.group, right.group); const L = (v) => v.add(left.group.position), R = (v) => v.add(right.group.position); callout(panel, "DECREASE THROTTLE", new THREE.Vector3(-1.04, .55, .13), L(left.grip)); callout(panel, "STEER LEFT / RIGHT", new THREE.Vector3(-1.03, -.53, .13), L(left.stick)); callout(panel, "MENU: PAUSE / RESUME", new THREE.Vector3(-1.05, .08, .13), L(left.menu)); callout(panel, "INCREASE THROTTLE", new THREE.Vector3(1.04, .55, .13), R(right.grip)); callout(panel, "FIRE", new THREE.Vector3(.94, .79, .13), R(right.trigger)); callout(panel, "ROLL / PITCH", new THREE.Vector3(1.04, -.53, .13), R(right.stick)); panel.add(worldText("OK · PRESS RIGHT TRIGGER", new THREE.Vector3(0, -.9, .13), .22)); return panel; }
let controlsPanel = createControlsPanel(); controlsPanel.position.set(0, 1.55, -2.8); scene.add(controlsPanel);
async function loadInstructionControllerModels(session) {
  try {
    inputProfilesList ??= await fetch(`${inputProfilesBase}profilesList.json`).then((response) => response.json());
    for (const source of session.inputSources) {
      const hand = source.handedness;
      const slot = instructionControllerSlots[hand];
      if (!slot || slot.loaded) continue;
      const profileId = source.profiles.find((id) => inputProfilesList[id]);
      if (!profileId) continue;
      const profileUrl = new URL(inputProfilesList[profileId], inputProfilesBase).href;
      const profile = await fetch(profileUrl).then((response) => response.json());
      const layout = profile.layouts?.[hand] ?? profile.layouts?.none;
      if (!layout?.assetPath) continue;
      new GLTFLoader().load(new URL(layout.assetPath, profileUrl).href, (gltf) => {
        const model = gltf.scene;
        const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
        model.scale.setScalar(.54 / Math.max(size.x, size.y, size.z, .001));
        model.rotation.set(0, hand === "left" ? -.18 : .18, 0);
        slot.slot.add(model); slot.fallback.visible = false; slot.loaded = true;
      }, undefined, (error) => console.warn("Controller profile model failed", error));
    }
  } catch (error) { console.warn("Controller profile lookup failed; using guide fallback", error); }
}
let pausePanel = createWorldPanel([
  { text: "SIMULATION PAUSED", x: 768, y: 290, size: 72, color: "#a9dbff", align: "center" },
  { text: "Press the left controller Menu button to resume", x: 768, y: 425, size: 39, align: "center" },
], 2.9, 1.05);
pausePanel.position.set(0, 1.6, -2.55); pausePanel.visible = false; scene.add(pausePanel);

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
const fighterModelUrl = assetUrl("FighterPlaneWithControls.glb");

const spawnPosition = new THREE.Vector3(0, 1.5, -7);
class FlightModel {
  constructor() { this.reset(); }
  reset() { this.position = spawnPosition.clone(); this.rotation = new THREE.Quaternion(); this.throttle = 0; this.velocity = new THREE.Vector3(); }
  forward() { return new THREE.Vector3(0, 0, -1).applyQuaternion(this.rotation).normalize(); }
  step(input, seconds) {
    const dt = clamp(seconds, 0, .1); this.throttle = clamp(this.throttle + input.throttle * .5 * dt, 0, 1);
    // Keep the WebXR aircraft stationary at idle, but retain Lens Studio's control authority.
    const speed = lerp(0, 100, this.throttle);
    const controlAirspeed = lerp(30, 100, this.throttle);
    const rate = clamp(controlAirspeed / 30, .5, 1.25) * dt * Math.PI / 180;
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, -1), input.roll * 110 * rate));
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -input.pitch * 70 * rate));
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -input.yaw * 45 * rate)).normalize();
    const worldSpeed = speed * worldSpeedScale;
    this.velocity.copy(this.forward()).multiplyScalar(speed > .01 ? worldSpeed : 0);
    if (speed > .01) this.position.addScaledVector(this.velocity, dt);
  }
}
const flight = new FlightModel(); const keys = new Set(); const bullets = []; let lastFire = -Infinity; let simulationPaused = false; let pauseButtonWasPressed = false; let controlsVisible = true; let controlsDismissWasPressed = false;
function setSimulationPaused(paused) {
  simulationPaused = paused;
  pausePanel.visible = paused;
  if (paused) {
    pauseEngineSound();
    statusLabel.textContent = "Simulation paused · left Menu resumes";
  } else {
    startEngineSound();
    statusLabel.textContent = renderer.xr.isPresenting ? "Third-person RC flight" : "Desktop preview · controller or keyboard";
  }
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
  const previous = role === "controls" ? controlsPanel : pausePanel;
  scene.remove(previous);
  if (role === "controls") {
    controlsPanel = next;
    controlsPanel.visible = controlsVisible;
  } else {
    pausePanel = next;
    pausePanel.visible = simulationPaused;
  }
  scene.add(next);
}
function clearVirtualEnvironment() {
  while (virtualEnvironment.children.length) virtualEnvironment.remove(virtualEnvironment.children[0]);
}
let desktopCameraRig = null;
async function mountFlightScene() {
  modelLabel.textContent = "Fighter model: loading scene…";
  try {
    const data = await loadFlightScene(`${FLIGHT_SCENE_URL}?v=0.4.6`);
    let fighterFromScene = false;
    const environment = [];
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
      else environment.push(object);
    }
    clearVirtualEnvironment();
    for (const object of environment) virtualEnvironment.add(object);
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
function stick(value) { return Math.abs(value) < .12 ? 0 : value; }
function activeStick(gamepad) {
  const axisPairs = [[0, 1], [2, 3], [4, 5]];
  return axisPairs.map(([x, y]) => [gamepad.axes[x] ?? 0, gamepad.axes[y] ?? 0])
    .reduce((best, pair) => pair[0] ** 2 + pair[1] ** 2 > best[0] ** 2 + best[1] ** 2 ? pair : best, [0, 0]);
}
function gamepadForSource(source, connectedPads) {
  if (source.gamepad) return source.gamepad;
  const hand = source.handedness;
  return connectedPads.find((pad) => pad && pad.id.toLowerCase().includes(hand)) ?? null;
}
function controls() {
  const value = { pitch: 0, roll: 0, yaw: 0, throttle: 0, fire: false, pause: false };
  const xrSources = renderer.xr.getSession()?.inputSources ?? [];
  const connectedPads = [...navigator.getGamepads()].filter(Boolean);
  let hasXRControllers = false;
  const controllerReadout = [];
  for (const source of xrSources) {
    const gamepad = gamepadForSource(source, connectedPads);
    if (!gamepad) continue;
    hasXRControllers = true;
    const [rawX, rawY] = activeStick(gamepad);
    const x = stick(rawX);
    const y = stick(rawY);
    const indexTrigger = gamepad.buttons[0]?.value ?? 0;
    const grip = gamepad.buttons[1]?.value ?? 0;
    controllerReadout.push(`${source.handedness[0].toUpperCase()}: ${x.toFixed(2)}, ${y.toFixed(2)}`);
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
  // Ignore XR controllers here: their axes are already read through XR input sources.
  const pad = !hasXRControllers ? connectedPads.filter((item) => item.mapping === "standard" && item.axes.length >= 4).find(Boolean) : null;
  if (pad) { value.yaw = stick(pad.axes[0] || 0); value.roll = stick(pad.axes[2] || 0); value.pitch = -stick(pad.axes[3] || 0); value.throttle = (pad.buttons[5]?.value || 0) - (pad.buttons[4]?.value || 0); value.fire = Boolean(pad.buttons[7]?.pressed || pad.buttons[0]?.pressed); }
  value.pitch += (keys.has("KeyW") ? 1 : 0) - (keys.has("KeyS") ? 1 : 0); value.roll += (keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0); value.yaw += (keys.has("KeyE") ? 1 : 0) - (keys.has("KeyQ") ? 1 : 0); value.throttle += (keys.has("ArrowUp") ? 1 : 0) - (keys.has("ArrowDown") ? 1 : 0); value.fire ||= keys.has("Space");
  controllerLabel.textContent = controllerReadout.length ? `Sticks ${controllerReadout.join(" · ")}` : "Sticks: waiting for XR controllers";
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
async function startEngineSound() {
  try {
    if (!engineContext) {
      engineContext = new AudioContext();
      engineGain = engineContext.createGain();
      engineGain.gain.value = .28;
      engineGain.connect(engineContext.destination);
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
  } catch (error) { console.warn("Engine audio could not start", error); }
}
function pauseEngineSound() {
  if (engineContext?.state === "running") engineContext.suspend();
}
function updateEngineSound() {
  if (!engineContext || !engineGain || !engineSource) return;
  const time = engineContext.currentTime;
  engineSource.playbackRate.setTargetAtTime(enginePlaybackRate(), time, .125);
  engineGain.gain.setTargetAtTime(lerp(.28, 1, flight.throttle), time, .04);
}
function playBalloonPop() {
  const pop = new Audio(balloonPopUrl);
  pop.volume = .45;
  pop.play().catch(() => {});
}
function fire() { const shot = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfff1a8 })); shot.position.copy(flight.position).add(flight.forward().multiplyScalar(2)); shot.userData.velocity = flight.forward().multiplyScalar(95); shot.userData.age = 0; scene.add(shot); bullets.push(shot); }
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
renderer.setAnimationLoop((time) => { const dt = (time - previous) / 1000; previous = time; const input = controls(); if (controlsVisible && input.fire && !controlsDismissWasPressed) { controlsVisible = false; controlsPanel.visible = false; statusLabel.textContent = "Controls confirmed · third-person RC flight"; } controlsDismissWasPressed = input.fire; if (input.pause && !pauseButtonWasPressed) setSimulationPaused(!simulationPaused); pauseButtonWasPressed = input.pause; if (!simulationPaused) { flight.step(input, dt); animateAircraft(input, dt); if (!controlsVisible && input.fire && time - lastFire > 160) { fire(); lastFire = time; } for (let i = bullets.length - 1; i >= 0; i -= 1) { const shot = bullets[i]; shot.position.addScaledVector(shot.userData.velocity, dt); shot.userData.age += dt; if (shot.userData.age > 2.5) { scene.remove(shot); bullets.splice(i, 1); } } } planeRoot.position.copy(flight.position); planeRoot.quaternion.copy(flight.rotation); applyDesktopCamera(); speedLabel.textContent = `Speed ${Math.round(lerp(0, 100, flight.throttle))}${simulationPaused ? " · paused" : ""}`; throttleLabel.textContent = `Throttle ${Math.round(flight.throttle * 100)}%`; if (!simulationPaused) updateEngineSound(); renderer.render(scene, camera); });
resetButton.addEventListener("click", () => flight.reset());
async function configureVR() {
  if (!navigator.xr) { vrButton.textContent = "WebXR unavailable"; vrButton.disabled = true; return; }
  const arProbe = Promise.race([navigator.xr.isSessionSupported("immersive-ar"), new Promise((resolve) => setTimeout(() => resolve(false), 2500))]);
  const vrProbe = Promise.race([navigator.xr.isSessionSupported("immersive-vr"), new Promise((resolve) => setTimeout(() => resolve(false), 3500))]);
  const [arSupported, vrSupported] = await Promise.all([arProbe, vrProbe]);
  const isDesktopLink = /Windows|Macintosh|Linux/.test(navigator.userAgent);
  const mode = !isDesktopLink && arSupported ? "immersive-ar" : "immersive-vr";
  vrButton.textContent = mode === "immersive-ar" ? "Start passthrough" : "Enter VR";
  statusLabel.textContent = mode === "immersive-ar" ? "Passthrough ready · the aircraft stays in your room" : vrSupported ? "Quest Link VR · third-person RC flight" : "Quest Link is restarting · you can still retry VR";
  vrButton.addEventListener("click", async () => { try { startEngineSound(); vrButton.disabled = true; vrButton.textContent = "Starting…"; const session = await Promise.race([navigator.xr.requestSession(mode, { optionalFeatures: ["local-floor"] }), new Promise((_, reject) => setTimeout(() => reject(new Error("XR session timed out")), 8000))]); if (mode === "immersive-ar") { renderer.setClearColor(0x000000, 0); scene.fog = null; virtualEnvironment.visible = false; } await renderer.xr.setSession(session); statusLabel.textContent = mode === "immersive-ar" ? "Passthrough · third-person RC flight" : "Quest Link VR · third-person RC flight"; vrButton.textContent = "XR active"; session.addEventListener("end", () => { pauseEngineSound(); renderer.setClearColor(0x8ac5ee); scene.fog = new THREE.Fog(0x8ac5ee, 70, 350); virtualEnvironment.visible = true; vrButton.disabled = false; vrButton.textContent = mode === "immersive-ar" ? "Start passthrough" : "Enter VR"; statusLabel.textContent = "Desktop preview · controller or keyboard"; }); } catch (error) { vrButton.disabled = false; vrButton.textContent = mode === "immersive-ar" ? "Start passthrough" : "Retry VR"; statusLabel.textContent = error.message === "XR session timed out" ? "Quest Link did not start the session · wait a moment, then retry" : error.name === "InvalidStateError" ? "An immersive session is already active · exit it from the headset first" : "Could not start XR · wait a moment, then retry"; } });
}
configureVR().catch((error) => { console.error(error); vrButton.textContent = "Unable to start VR"; vrButton.disabled = true; });
