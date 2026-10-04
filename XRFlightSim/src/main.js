import * as THREE from "three";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

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
let engineContext = null;
let engineGain = null;
let engineSource = null;
let engineBuffer = null;
let engineLoad = null;
const balloonPopUrl = assetUrl("audio/BalloonPop.wav");

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
function createControlsPanel() {
  const canvas = document.createElement("canvas");
  canvas.width = 1600; canvas.height = 1050;
  const context = canvas.getContext("2d");
  const rounded = (x, y, width, height, radius, fill, stroke = null) => {
    context.beginPath(); context.roundRect(x, y, width, height, radius);
    if (fill) { context.fillStyle = fill; context.fill(); }
    if (stroke) { context.strokeStyle = stroke; context.lineWidth = 7; context.stroke(); }
  };
  const label = (text, x, y, size = 42, align = "left", color = "#f4f7fb") => {
    context.fillStyle = color; context.font = `${size}px system-ui, sans-serif`; context.textAlign = align; context.fillText(text, x, y);
  };
  const arrow = (fromX, fromY, toX, toY) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    context.strokeStyle = "#0636ec"; context.fillStyle = "#0636ec"; context.lineWidth = 15; context.lineCap = "round";
    context.beginPath(); context.moveTo(fromX, fromY); context.lineTo(toX, toY); context.stroke();
    context.beginPath(); context.moveTo(toX, toY); context.lineTo(toX - 34 * Math.cos(angle - .55), toY - 34 * Math.sin(angle - .55)); context.lineTo(toX - 34 * Math.cos(angle + .55), toY - 34 * Math.sin(angle + .55)); context.closePath(); context.fill();
  };
  rounded(28, 28, 1544, 994, 80, "rgba(10, 17, 25, .88)", "rgba(235, 245, 255, .72)");
  label("Controls", 800, 135, 58, "center");
  // A simplified controller illustration preserves the Lens panel's visual hierarchy.
  context.save(); context.translate(800, 555);
  context.fillStyle = "#eef1f4"; context.strokeStyle = "#b7bdc5"; context.lineWidth = 8;
  context.beginPath(); context.moveTo(-280, -115); context.bezierCurveTo(-385, -115, -410, 38, -348, 128); context.bezierCurveTo(-310, 187, -225, 146, -150, 95); context.lineTo(150, 95); context.bezierCurveTo(225, 146, 310, 187, 348, 128); context.bezierCurveTo(410, 38, 385, -115, 280, -115); context.lineTo(160, -90); context.lineTo(-160, -90); context.closePath(); context.fill(); context.stroke();
  [[-168, -10], [150, 28]].forEach(([x, y]) => { context.beginPath(); context.fillStyle = "#343b43"; context.arc(x, y, 50, 0, Math.PI * 2); context.fill(); context.strokeStyle = "#11161b"; context.lineWidth = 10; context.stroke(); context.beginPath(); context.fillStyle = "#555e68"; context.arc(x, y, 33, 0, Math.PI * 2); context.fill(); });
  rounded(-63, -6, 24, 88, 5, "#252b31"); rounded(-96, 26, 88, 24, 5, "#252b31");
  [[230, -22, "A", "#54a846"], [272, -66, "B", "#d14343"], [188, -66, "X", "#2b83d4"], [230, -110, "Y", "#e7c43c"]].forEach(([x, y, text, color]) => { context.beginPath(); context.fillStyle = color; context.arc(x, y, 24, 0, Math.PI * 2); context.fill(); label(text, x, y + 13, 24, "center", "#111820"); });
  context.restore();
  label("Decrease Throttle", 200, 290, 43); label("Fire", 800, 244, 43, "center"); label("Increase Throttle", 1400, 290, 43, "right");
  label("Steer", 170, 625, 43); label("Left / Right", 170, 690, 43); label("Roll  Left / Right", 1410, 585, 39, "right"); label("Pitch  Up / Down", 1410, 650, 39, "right");
  arrow(415, 305, 565, 430); arrow(800, 266, 810, 408); arrow(1190, 305, 1035, 430); arrow(435, 640, 625, 545); arrow(1180, 605, 975, 570);
  rounded(585, 820, 430, 105, 52, "rgba(15, 19, 26, .94)", "rgba(235, 245, 255, .7)"); label("OK · press right trigger", 800, 888, 35, "center");
  const material = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthTest: false, depthWrite: false });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(3.55, 2.33), material); panel.renderOrder = 5;
  return panel;
}
const controlsPanel = createControlsPanel(); controlsPanel.position.set(0, 1.55, -2.8); scene.add(controlsPanel);
const pausePanel = createWorldPanel([
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
modelLabel.textContent = "Fighter model: loading GLB…";
new GLTFLoader().load(fighterModelUrl, (gltf) => {
  const model = gltf.scene;
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  model.scale.setScalar(lensWingspan / Math.max(size.x, .001));
  model.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
      const applyLensMaterial = (sourceMaterial) => {
        const lensMaterial = sourceMaterial.clone();
        if (sourceMaterial.name === "tires") {
          lensMaterial.map = null;
          lensMaterial.color.setRGB(.03, .035, .04);
          lensMaterial.metalness = .03;
          lensMaterial.roughness = .92;
        } else if (sourceMaterial.name === "teamcolor") {
          // Lens Studio's blue accent material: solid paint, not the fuselage sheet metal.
          lensMaterial.map = null;
          lensMaterial.color.setRGB(0, .149, 1);
          lensMaterial.metalness = .35;
          lensMaterial.roughness = .58;
        } else {
          // The source Blender body material has no image texture; it is smooth aluminum.
          lensMaterial.map = null;
          lensMaterial.color.setRGB(.78, .8, .82);
          lensMaterial.metalness = .5;
          lensMaterial.roughness = .6;
        }
        lensMaterial.needsUpdate = true;
        return lensMaterial;
      };
      if (node.name === "Windshield") {
        node.material = new THREE.MeshStandardMaterial({ color: 0x090d12, metalness: .25, roughness: .18 });
      } else {
        node.material = Array.isArray(node.material) ? node.material.map(applyLensMaterial) : applyLensMaterial(node.material);
      }
    }
    const key = ({ LeftAileron: "leftAileron", RightAileron: "rightAileron", Elevator: "elevator", Rudder: "rudder", Propeller: "propeller" })[node.name];
    if (key) { animatedParts[key] = node; animatedParts.neutral.set(node, node.quaternion.clone()); }
  });
  planeRoot.remove(aircraft);
  aircraft = model;
  planeRoot.add(aircraft);
  modelLabel.textContent = "Fighter model: GLB loaded";
  statusLabel.textContent = "Lens fighter model loaded · third-person RC view";
}, undefined, (error) => {
  console.error("Fighter GLB failed to load", error);
  const detail = String(error?.message ?? error).replace(/\s+/g, " ").slice(0, 90);
  modelLabel.textContent = `Fighter model: load failed — ${detail}`;
  statusLabel.textContent = "Fighter model could not load · using the backup aircraft";
});
for (let i = 0; i < 14; i += 1) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2, .12, 10, 28), new THREE.MeshStandardMaterial({ color: 0xffc447, emissive: 0x5b3700, emissiveIntensity: .7 }));
  ring.position.set((i % 2 ? -1 : 1) * 3.8, 1.3 + (i % 3) * .65, -7 - i * 3.5); virtualEnvironment.add(ring);
}

class FlightModel {
  constructor() { this.reset(); }
  reset() { this.position = new THREE.Vector3(0, 1.5, -7); this.rotation = new THREE.Quaternion(); this.throttle = 0; }
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
    if (speed > .01) this.position.add(this.forward().multiplyScalar(speed * dt * .05));
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
      engineSource.playbackRate.value = lerp(.55, 1.45, flight.throttle);
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
  engineSource.playbackRate.setTargetAtTime(lerp(.55, 1.45, flight.throttle), time, .04);
  engineGain.gain.setTargetAtTime(lerp(.28, 1, flight.throttle), time, .04);
}
function playBalloonPop() {
  const pop = new Audio(balloonPopUrl);
  pop.volume = .45;
  pop.play().catch(() => {});
}
function fire() { const shot = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfff1a8 })); shot.position.copy(flight.position).add(flight.forward().multiplyScalar(2)); shot.userData.velocity = flight.forward().multiplyScalar(95); shot.userData.age = 0; scene.add(shot); bullets.push(shot); }
function resize() { renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); camera.aspect = canvas.clientWidth / canvas.clientHeight; camera.updateProjectionMatrix(); }
addEventListener("resize", resize); resize(); let previous = performance.now();
renderer.setAnimationLoop((time) => { const dt = (time - previous) / 1000; previous = time; const input = controls(); if (controlsVisible && input.fire && !controlsDismissWasPressed) { controlsVisible = false; controlsPanel.visible = false; statusLabel.textContent = "Controls confirmed · third-person RC flight"; } controlsDismissWasPressed = input.fire; if (input.pause && !pauseButtonWasPressed) setSimulationPaused(!simulationPaused); pauseButtonWasPressed = input.pause; if (!simulationPaused) { flight.step(input, dt); animateAircraft(input, dt); updateEngineSound(); if (!controlsVisible && input.fire && time - lastFire > 160) { fire(); lastFire = time; } for (let i = bullets.length - 1; i >= 0; i -= 1) { const shot = bullets[i]; shot.position.addScaledVector(shot.userData.velocity, dt); shot.userData.age += dt; if (shot.userData.age > 2.5) { scene.remove(shot); bullets.splice(i, 1); } } } planeRoot.position.copy(flight.position); planeRoot.quaternion.copy(flight.rotation); if (!renderer.xr.isPresenting) camera.lookAt(planeRoot.position); speedLabel.textContent = `Speed ${Math.round(lerp(0, 100, flight.throttle))}${simulationPaused ? " · paused" : ""}`; throttleLabel.textContent = `Throttle ${Math.round(flight.throttle * 100)}%`; renderer.render(scene, camera); });
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
