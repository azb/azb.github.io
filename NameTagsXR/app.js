import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { VRButton } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/webxr/VRButton.js";
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { initializeAuth, getAuth, inMemoryPersistence, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore, doc, setDoc, onSnapshot, collection, serverTimestamp,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9wx0VS7oZLUqB4v5-XEBHGVHom4f7dZM",
  authDomain: "nametagsxr.firebaseapp.com",
  projectId: "nametagsxr",
  storageBucket: "nametagsxr.firebasestorage.app",
  messagingSenderId: "1044217406309",
  appId: "1:1044217406309:web:ca475c4e8441752ca0f78c",
  measurementId: "G-R13NNSLFQ0"
};

let firebaseApp, auth, db, roomRef, playersUnsub;
let uid, roomId, playerName;
let calibrated = false;
let calibration = null;
let lastNetworkSend = 0;
let sessionStarted = false;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101015);

const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.01, 100);
camera.position.set(0, 1.6, 2.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType("local-floor");
renderer.domElement.style.zIndex = "0";
document.body.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x333344, 2));
const grid = new THREE.GridHelper(10, 20, 0x444444, 0x222222);
scene.add(grid);

// Simple room visualizer.
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshBasicMaterial({ color: 0x16161c, transparent: true, opacity: .5 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Shared calibration landmarks.
// Canonical room coordinates are red=(0,0,0), blue=(1,0,0).
const redDot = makeDot(0xff3030, "RED");
const blueDot = makeDot(0x3080ff, "BLUE");
redDot.position.set(-0.5, 0.02, -1.5);
blueDot.position.set(0.5, 0.02, -1.5);
scene.add(redDot, blueDot);

const raycaster = new THREE.Raycaster();
const tempMatrix = new THREE.Matrix4();
const controllers = [];
const remotePlayers = new Map();

const setup = document.getElementById("setup");
const hud = document.getElementById("hud");
const statusEl = document.getElementById("status");
const setupError = document.getElementById("setupError");
const roomLabel = document.getElementById("roomLabel");

const startButton = document.getElementById("start");
startButton.onclick = start;
document.getElementById("calibrate").onclick = calibrate;
document.getElementById("recalibrate").onclick = () => {
  calibrated = false;
  calibration = null;
  statusEl.textContent = "Recalibration: place red + blue again";
  redDot.visible = blueDot.visible = true;
};
document.getElementById("exit").onclick = async () => {
  if (playersUnsub) playersUnsub();
  if (uid && roomId) {
    try { await deleteDoc(doc(db, "rooms", roomId, "players", uid)); } catch {}
  }
  location.reload();
};

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

renderer.setAnimationLoop(render);

function makeDot(color, text) {
  const group = new THREE.Group();
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(.09, 24, 16),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: .35 })
  );
  group.add(sphere);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(.12, .14, 32),
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: .75 })
  );
  ring.rotation.x = -Math.PI / 2;
  group.add(ring);

  const label = makeTextSprite(text, color);
  label.position.y = .18;
  label.scale.set(.35, .12, 1);
  group.add(label);

  group.userData.grabbable = true;
  group.userData.radius = .14;
  return group;
}

function makeTextSprite(text, color = 0xffffff) {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 52px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "rgba(0,0,0,.85)";
  ctx.lineWidth = 10;
  ctx.strokeText(text, 256, 64);
  ctx.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  return new THREE.Sprite(mat);
}

function createNameTag(name) {
  const group = new THREE.Group();

  const bg = new THREE.Mesh(
    new THREE.CapsuleGeometry(.28, .05, 4, 16),
    new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: .75 })
  );
  bg.scale.set(1.8, .6, .18);
  group.add(bg);

  const text = makeTextSprite(name);
  text.position.y = .01;
  text.scale.set(.8, .2, 1);
  group.add(text);

  return group;
}

function createRemotePlayer(id, name) {
  const obj = new THREE.Group();
  obj.userData.name = name;
  const tag = createNameTag(name);
  tag.position.y = .15;
  obj.add(tag);
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(.09, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xeeeeee, transparent: true, opacity: .25 })
  );
  head.position.y = -.02;
  obj.add(head);
  scene.add(obj);
  return obj;
}

function updateRemotePlayer(id, p) {
  let obj = remotePlayers.get(id);
  if (!obj) {
    obj = createRemotePlayer(id, p.name || "Player");
    remotePlayers.set(id, obj);
  }
  if (!calibrated) return;

  const local = roomToLocal(new THREE.Vector3(p.x, p.y, p.z));
  obj.position.copy(local);
  obj.visible = true;

  // Make the tag face the local viewer.
  obj.children[0].lookAt(camera.position);
}

function startFirebase(config) {
  firebaseApp = getApps().length ? getApp() : initializeApp(config);
  try {
    auth = initializeAuth(firebaseApp, { persistence: inMemoryPersistence });
  } catch {
    auth = getAuth(firebaseApp);
  }
  db = getFirestore(firebaseApp);
}

function firebaseErrorMessage(e) {
  const code = e && e.code || "";
  const message = e && e.message || "";
  if (code === "auth/configuration-not-found" || /CONFIGURATION_NOT_FOUND/i.test(message)) {
    return "Firebase Authentication is not set up. In Firebase Console open Authentication → Get started, then enable Anonymous under Sign-in method.";
  }
  if (code === "auth/operation-not-allowed") {
    return "Anonymous sign-in is disabled. Enable it in Firebase Console → Authentication → Sign-in method → Anonymous.";
  }
  if (code === "auth/unauthorized-domain") {
    return "This site is not allowed. Add azb.github.io and localhost under Authentication → Settings → Authorized domains.";
  }
  if (code === "permission-denied") {
    return "Firestore blocked the write. Create the database and deploy firebase.rules.";
  }
  return message || "Firebase connection failed.";
}

async function start() {
  setupError.textContent = "";
  startButton.disabled = true;
  startButton.textContent = "Connecting…";
  playerName = document.getElementById("name").value.trim() || "Player";
  roomId = document.getElementById("room").value.trim() || "demo-room";

  try {
    startFirebase(firebaseConfig);
    const cred = await signInAnonymously(auth);
    uid = cred.user.uid;

    roomRef = doc(db, "rooms", roomId);
    await setDoc(roomRef, {
      updatedAt: serverTimestamp(),
      lastJoiner: uid
    }, { merge: true });

    playersUnsub = onSnapshot(collection(db, "rooms", roomId, "players"), snap => {
      const seen = new Set();
      snap.forEach(d => {
        if (d.id === uid) return;
        const p = d.data();
        seen.add(d.id);
        if (p.calibrated) updateRemotePlayer(d.id, p);
      });
      for (const [id, obj] of remotePlayers) {
        if (!seen.has(id)) {
          scene.remove(obj);
          remotePlayers.delete(id);
        }
      }
    });

    setup.classList.add("hidden");
    hud.classList.remove("hidden");
    roomLabel.textContent = `Room: ${roomId}`;
    sessionStarted = true;
    statusEl.textContent = "Connected · calibrate the two dots";

    setupXR();
  } catch (e) {
    console.error(e);
    setupError.textContent = firebaseErrorMessage(e);
    startButton.disabled = false;
    startButton.textContent = "Enter Room";
  }
}

function setupXR() {
  if (!navigator.xr) {
    document.getElementById("desktopHint").classList.remove("hidden");
  }
  const vrButton = VRButton.createButton(renderer);
  vrButton.style.bottom = "16px";
  vrButton.style.left = "auto";
  vrButton.style.right = "16px";
  document.body.appendChild(vrButton);

  for (let i = 0; i < 2; i++) {
    const controller = renderer.xr.getController(i);
    controller.userData.selecting = false;
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.addEventListener("squeezestart", onSelectStart);
    controller.addEventListener("squeezeend", onSelectEnd);

    const grip = renderer.xr.getControllerGrip(i);
    scene.add(controller, grip);
    controllers.push(controller);
  }

  // Pointer-like controller rays.
  controllers.forEach(c => {
    const ray = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1)]),
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    ray.scale.z = 4;
    c.add(ray);
  });

  renderer.setAnimationLoop(render);
}

function onSelectStart(e) {
  const controller = e.target;
  controller.userData.selecting = true;

  tempMatrix.identity().extractRotation(controller.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0,0,-1).applyMatrix4(tempMatrix);

  const hits = raycaster.intersectObjects([redDot, blueDot], true);
  if (!hits.length) return;

  let root = hits[0].object;
  while (root.parent && !root.userData.grabbable) root = root.parent;
  if (!root.userData.grabbable) return;

  controller.userData.grabbed = root;
  controller.userData.grabOffset = root.position.clone().sub(controller.position);
}

function onSelectEnd(e) {
  const controller = e.target;
  controller.userData.selecting = false;
  controller.userData.grabbed = null;
}

function updateGrab() {
  for (const c of controllers) {
    const g = c.userData.grabbed;
    if (!g) continue;
    // Controller position is in the renderer's XR reference space.
    const p = new THREE.Vector3().setFromMatrixPosition(c.matrixWorld);
    g.position.copy(p.add(c.userData.grabOffset));
    g.position.y = Math.max(.01, g.position.y);
  }
}

function getLocalHeadPosition() {
  const p = new THREE.Vector3();
  camera.getWorldPosition(p);
  return p;
}

// local point -> canonical room point.
// Canonical red = (0,0,0), canonical blue = (1,0,0).
function localToRoom(local) {
  if (!calibration) return local.clone();
  return local.clone().sub(calibration.origin).applyAxisAngle(new THREE.Vector3(0,1,0), calibration.yaw);
}

// canonical room point -> local point.
function roomToLocal(room) {
  if (!calibration) return room.clone();
  return room.clone().applyAxisAngle(new THREE.Vector3(0,1,0), -calibration.yaw).add(calibration.origin);
}

function calibrate() {
  const red = redDot.position.clone();
  const blue = blueDot.position.clone();
  const v = blue.clone().sub(red);
  const flat = new THREE.Vector3(v.x, 0, v.z);

  if (flat.length() < .15) {
    statusEl.textContent = "Move red and blue farther apart before calibrating.";
    return;
  }

  // Rotation that maps local red->blue direction onto canonical +X.
  const localAngle = Math.atan2(flat.z, flat.x);
  const yaw = -localAngle;

  calibration = {
    origin: red,
    yaw
  };
  calibrated = true;

  redDot.position.set(0, .02, -1.5);
  blueDot.position.set(1, .02, -1.5);
  // Once calibrated, show canonical dots as a visual reference.
  redDot.visible = blueDot.visible = false;

  statusEl.textContent = "Calibrated · looking for other players";
  publishPlayer(true);
}

async function publishPlayer(force = false) {
  if (!sessionStarted || !uid || !calibrated) return;
  const now = performance.now();
  if (!force && now - lastNetworkSend < 65) return;
  lastNetworkSend = now;

  const localHead = getLocalHeadPosition();
  const roomHead = localToRoom(localHead);

  await setDoc(doc(db, "rooms", roomId, "players", uid), {
    name: playerName,
    x: roomHead.x,
    y: roomHead.y,
    z: roomHead.z,
    calibrated: true,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

function render() {
  updateGrab();

  // Publish after XR pose has updated the camera.
  if (calibrated) publishPlayer(false).catch(console.error);

  renderer.render(scene, camera);
}
