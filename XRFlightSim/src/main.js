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
const engineSound = new Audio(assetUrl("audio/PlaneEngineNoise.wav"));
engineSound.loop = true;
engineSound.preload = "auto";
engineSound.volume = .12;
const balloonPopUrl = assetUrl("audio/BalloonPop.wav");
const aluminumTexture = new THREE.TextureLoader().load(assetUrl("textures/seamless-aluminum.jpg"));
aluminumTexture.colorSpace = THREE.SRGBColorSpace;
aluminumTexture.wrapS = aluminumTexture.wrapT = THREE.RepeatWrapping;

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
scene.add(new THREE.HemisphereLight(0xdceeff, 0x263f24, 2.2));
const sun = new THREE.DirectionalLight(0xfff2d4, 2.5); sun.position.set(25, 55, 10); scene.add(sun);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshStandardMaterial({ color: 0x4c7e42, roughness: 1 }));
ground.rotation.x = -Math.PI / 2; ground.position.y = -3; virtualEnvironment.add(ground);
const grid = new THREE.GridHelper(1000, 100, 0x6ca760, 0x47794a); grid.position.y = -2.98; virtualEnvironment.add(grid);

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
      const lensMaterial = node.material.clone();
      lensMaterial.map = aluminumTexture;
      lensMaterial.color.setRGB(0, .149, 1);
      lensMaterial.metalness = 1;
      lensMaterial.roughness = .41;
      lensMaterial.needsUpdate = true;
      node.material = lensMaterial;
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
const flight = new FlightModel(); const keys = new Set(); const bullets = []; let lastFire = -Infinity;
addEventListener("keydown", (event) => { if (["Space", "ArrowUp", "ArrowDown"].includes(event.code)) event.preventDefault(); keys.add(event.code); if (event.code === "KeyR") flight.reset(); });
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
  const value = { pitch: 0, roll: 0, yaw: 0, throttle: 0, fire: false };
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
function startEngineSound() {
  engineSound.play().catch(() => { /* The browser may require a later headset interaction. */ });
}
function updateEngineSound() {
  engineSound.playbackRate = lerp(.55, 1.45, flight.throttle);
  engineSound.volume = lerp(.07, .28, flight.throttle);
}
function playBalloonPop() {
  const pop = new Audio(balloonPopUrl);
  pop.volume = .45;
  pop.play().catch(() => {});
}
function fire() { const shot = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfff1a8 })); shot.position.copy(flight.position).add(flight.forward().multiplyScalar(2)); shot.userData.velocity = flight.forward().multiplyScalar(95); shot.userData.age = 0; scene.add(shot); bullets.push(shot); }
function resize() { renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); camera.aspect = canvas.clientWidth / canvas.clientHeight; camera.updateProjectionMatrix(); }
addEventListener("resize", resize); resize(); let previous = performance.now();
renderer.setAnimationLoop((time) => { const dt = (time - previous) / 1000; previous = time; const input = controls(); flight.step(input, dt); animateAircraft(input, dt); updateEngineSound(); planeRoot.position.copy(flight.position); planeRoot.quaternion.copy(flight.rotation); if (!renderer.xr.isPresenting) camera.lookAt(planeRoot.position); if (input.fire && time - lastFire > 160) { fire(); lastFire = time; } for (let i = bullets.length - 1; i >= 0; i -= 1) { const shot = bullets[i]; shot.position.addScaledVector(shot.userData.velocity, dt); shot.userData.age += dt; if (shot.userData.age > 2.5) { scene.remove(shot); bullets.splice(i, 1); } } speedLabel.textContent = `Speed ${Math.round(lerp(0, 100, flight.throttle))}`; throttleLabel.textContent = `Throttle ${Math.round(flight.throttle * 100)}%`; renderer.render(scene, camera); });
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
  vrButton.addEventListener("click", async () => { try { startEngineSound(); vrButton.disabled = true; vrButton.textContent = "Starting…"; const session = await Promise.race([navigator.xr.requestSession(mode, { optionalFeatures: ["local-floor"] }), new Promise((_, reject) => setTimeout(() => reject(new Error("XR session timed out")), 8000))]); if (mode === "immersive-ar") { renderer.setClearColor(0x000000, 0); scene.fog = null; virtualEnvironment.visible = false; } await renderer.xr.setSession(session); statusLabel.textContent = mode === "immersive-ar" ? "Passthrough · third-person RC flight" : "Quest Link VR · third-person RC flight"; vrButton.textContent = "XR active"; session.addEventListener("end", () => { engineSound.pause(); renderer.setClearColor(0x8ac5ee); scene.fog = new THREE.Fog(0x8ac5ee, 70, 350); virtualEnvironment.visible = true; vrButton.disabled = false; vrButton.textContent = mode === "immersive-ar" ? "Start passthrough" : "Enter VR"; statusLabel.textContent = "Desktop preview · controller or keyboard"; }); } catch (error) { vrButton.disabled = false; vrButton.textContent = mode === "immersive-ar" ? "Start passthrough" : "Retry VR"; statusLabel.textContent = error.message === "XR session timed out" ? "Quest Link did not start the session · wait a moment, then retry" : error.name === "InvalidStateError" ? "An immersive session is already active · exit it from the headset first" : "Could not start XR · wait a moment, then retry"; } });
}
configureVR().catch((error) => { console.error(error); vrButton.textContent = "Unable to start VR"; vrButton.disabled = true; });
