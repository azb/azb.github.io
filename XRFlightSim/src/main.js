import * as THREE from "three";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/FBXLoader.js";

const canvas = document.querySelector("#scene");
const speedLabel = document.querySelector("#speed");
const throttleLabel = document.querySelector("#throttle");
const statusLabel = document.querySelector("#status");
const vrButton = document.querySelector("#enter-vr");
const resetButton = document.querySelector("#reset");
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (a, b, t) => a + (b - a) * t;

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
new FBXLoader().load("../assets/FighterPlaneWithControls.fbx", (model) => {
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  model.scale.setScalar(3.8 / Math.max(size.x, size.y, size.z, .001));
  model.rotation.y = Math.PI;
  model.traverse((node) => { if (node.isMesh) { node.castShadow = true; node.receiveShadow = true; } });
  planeRoot.remove(aircraft);
  aircraft = model;
  planeRoot.add(aircraft);
  statusLabel.textContent = "Lens fighter model loaded · third-person RC view";
}, undefined, () => { statusLabel.textContent = "Fighter model could not load · using the backup aircraft"; });
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
    const speed = lerp(0, 100, this.throttle); const rate = clamp(speed / 30, .5, 1.25) * dt * Math.PI / 180;
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, -1), input.roll * 110 * rate));
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -input.pitch * 70 * rate));
    this.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -input.yaw * 45 * rate)).normalize();
    if (speed > .01) this.position.add(this.forward().multiplyScalar(speed * dt * .05));
  }
}
const flight = new FlightModel(); const keys = new Set(); const bullets = []; let lastFire = -Infinity;
addEventListener("keydown", (event) => { if (["Space", "ArrowUp", "ArrowDown"].includes(event.code)) event.preventDefault(); keys.add(event.code); if (event.code === "KeyR") flight.reset(); });
addEventListener("keyup", (event) => keys.delete(event.code));
function controls() {
  const value = { pitch: 0, roll: 0, yaw: 0, throttle: 0, fire: false };
  const xrSources = renderer.xr.getSession()?.inputSources ?? [];
  for (const source of xrSources) {
    const gamepad = source.gamepad;
    if (!gamepad) continue;
    if (source.handedness === "left") {
      value.yaw += gamepad.axes[0] || 0;
      value.throttle -= gamepad.buttons[0]?.value || 0;
    }
    if (source.handedness === "right") {
      value.roll += gamepad.axes[0] || 0;
      value.pitch -= gamepad.axes[1] || 0;
      value.throttle += gamepad.buttons[0]?.value || 0;
      value.fire ||= Boolean(gamepad.buttons[1]?.pressed);
    }
  }
  const pad = [...navigator.getGamepads()].filter(Boolean).find((item) => item.axes.length >= 4);
  if (pad) { value.yaw = pad.axes[0] || 0; value.roll = pad.axes[2] || 0; value.pitch = -(pad.axes[3] || 0); value.throttle = (pad.buttons[7]?.value || 0) - (pad.buttons[6]?.value || 0); value.fire = Boolean(pad.buttons[5]?.pressed || pad.buttons[0]?.pressed); }
  value.pitch += (keys.has("KeyW") ? 1 : 0) - (keys.has("KeyS") ? 1 : 0); value.roll += (keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0); value.yaw += (keys.has("KeyE") ? 1 : 0) - (keys.has("KeyQ") ? 1 : 0); value.throttle += (keys.has("ArrowUp") ? 1 : 0) - (keys.has("ArrowDown") ? 1 : 0); value.fire ||= keys.has("Space");
  for (const key of ["pitch", "roll", "yaw", "throttle"]) value[key] = clamp(value[key], -1, 1); return value;
}
function fire() { const shot = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfff1a8 })); shot.position.copy(flight.position).add(flight.forward().multiplyScalar(2)); shot.userData.velocity = flight.forward().multiplyScalar(95); shot.userData.age = 0; scene.add(shot); bullets.push(shot); }
function resize() { renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); camera.aspect = canvas.clientWidth / canvas.clientHeight; camera.updateProjectionMatrix(); }
addEventListener("resize", resize); resize(); let previous = performance.now();
renderer.setAnimationLoop((time) => { const dt = (time - previous) / 1000; previous = time; const input = controls(); flight.step(input, dt); planeRoot.position.copy(flight.position); planeRoot.quaternion.copy(flight.rotation); if (!renderer.xr.isPresenting) camera.lookAt(planeRoot.position); if (input.fire && time - lastFire > 160) { fire(); lastFire = time; } for (let i = bullets.length - 1; i >= 0; i -= 1) { const shot = bullets[i]; shot.position.addScaledVector(shot.userData.velocity, dt); shot.userData.age += dt; if (shot.userData.age > 2.5) { scene.remove(shot); bullets.splice(i, 1); } } speedLabel.textContent = `Speed ${Math.round(lerp(0, 100, flight.throttle))}`; throttleLabel.textContent = `Throttle ${Math.round(flight.throttle * 100)}%`; renderer.render(scene, camera); });
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
  vrButton.addEventListener("click", async () => { try { vrButton.disabled = true; vrButton.textContent = "Starting…"; const session = await Promise.race([navigator.xr.requestSession(mode, { optionalFeatures: ["local-floor"] }), new Promise((_, reject) => setTimeout(() => reject(new Error("XR session timed out")), 8000))]); if (mode === "immersive-ar") { renderer.setClearColor(0x000000, 0); scene.fog = null; virtualEnvironment.visible = false; } await renderer.xr.setSession(session); statusLabel.textContent = mode === "immersive-ar" ? "Passthrough · third-person RC flight" : "Quest Link VR · third-person RC flight"; vrButton.textContent = "XR active"; session.addEventListener("end", () => { renderer.setClearColor(0x8ac5ee); scene.fog = new THREE.Fog(0x8ac5ee, 70, 350); virtualEnvironment.visible = true; vrButton.disabled = false; vrButton.textContent = mode === "immersive-ar" ? "Start passthrough" : "Enter VR"; statusLabel.textContent = "Desktop preview · controller or keyboard"; }); } catch (error) { vrButton.disabled = false; vrButton.textContent = mode === "immersive-ar" ? "Start passthrough" : "Retry VR"; statusLabel.textContent = error.message === "XR session timed out" ? "Quest Link did not start the session · wait a moment, then retry" : error.name === "InvalidStateError" ? "An immersive session is already active · exit it from the headset first" : "Could not start XR · wait a moment, then retry"; } });
}
configureVR().catch((error) => { console.error(error); vrButton.textContent = "Unable to start VR"; vrButton.disabled = true; });
