import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { XRHandModelFactory } from "three/addons/webxr/XRHandModelFactory.js";
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
let pruneTimer = null;
const POSE_MS = 80;
const HEARTBEAT_MS = 2000;
const STALE_MS = 8000;
const HAND_JOINTS = [
  "wrist",
  "thumb-phalanx-proximal", "thumb-tip",
  "index-finger-phalanx-proximal", "index-finger-tip",
  "middle-finger-phalanx-proximal", "middle-finger-tip",
  "ring-finger-phalanx-proximal", "ring-finger-tip",
  "pinky-finger-phalanx-proximal", "pinky-finger-tip"
];
const FINGER_CHAINS = [
  ["wrist", "thumb-phalanx-proximal", "thumb-tip"],
  ["wrist", "index-finger-phalanx-proximal", "index-finger-tip"],
  ["wrist", "middle-finger-phalanx-proximal", "middle-finger-tip"],
  ["wrist", "ring-finger-phalanx-proximal", "ring-finger-tip"],
  ["wrist", "pinky-finger-phalanx-proximal", "pinky-finger-tip"]
];
const localHands = [];
const _handPos = new THREE.Vector3();
const handModelFactory = new XRHandModelFactory();
let lastXRFrame = null;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101015);

const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.01, 100);
camera.position.set(0, 2.2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x101015, 1);
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType("local-floor");
renderer.domElement.style.zIndex = "0";
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.2, 0);
controls.enableDamping = true;
controls.update();

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
redDot.position.set(-0.5, 1, -1.5);
blueDot.position.set(0.5, 1, -1.5);
scene.add(redDot, blueDot);

const raycaster = new THREE.Raycaster();
const tempMatrix = new THREE.Matrix4();
const controllers = [];
const remotePlayers = new Map();

const setup = document.getElementById("setup");
const hud = document.getElementById("hud");
const hudToggle = document.getElementById("hudToggle");
const statusEl = document.getElementById("status");
const setupError = document.getElementById("setupError");
const roomLabel = document.getElementById("roomLabel");
const playerListEl = document.getElementById("playerList");

let arButton = null;
let currentXRSession = null;
let xrSupportedMode = null;
let xrConfigured = false;

(async function detectXRSupport() {
  if (!navigator.xr) return;
  if (await navigator.xr.isSessionSupported("immersive-ar").catch(() => false)) {
    xrSupportedMode = "immersive-ar";
  } else if (await navigator.xr.isSessionSupported("immersive-vr").catch(() => false)) {
    xrSupportedMode = "immersive-vr";
  }
})();

function beginXRSessionFromGesture() {
  if (!navigator.xr || currentXRSession) return Promise.resolve(null);
  const overlay = document.getElementById("overlay");
  const arInits = [
    { optionalFeatures: ["local-floor", "unbounded", "hand-tracking", "dom-overlay"], domOverlay: { root: overlay } },
    { optionalFeatures: ["local-floor", "unbounded", "hand-tracking"] },
    { optionalFeatures: ["hand-tracking"] }
  ];
  const vrInits = [
    { optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"] },
    { optionalFeatures: ["hand-tracking"] }
  ];
  const tries = [];
  if (xrSupportedMode !== "immersive-vr") {
    for (const init of arInits) tries.push(["immersive-ar", init]);
  }
  if (xrSupportedMode !== "immersive-ar") {
    for (const init of vrInits) tries.push(["immersive-vr", init]);
  }
  if (!tries.length) return Promise.resolve(null);
  let chain = navigator.xr.requestSession(tries[0][0], tries[0][1]);
  for (let i = 1; i < tries.length; i++) {
    const [mode, init] = tries[i];
    chain = chain.catch(() => navigator.xr.requestSession(mode, init));
  }
  return chain.catch(() => null);
}

const NAME_STORE = "nametagsxr.playerName";
const REMEMBER_STORE = "nametagsxr.rememberName";
const nameInput = document.getElementById("name");
const rememberName = document.getElementById("rememberName");

function readStore(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function writeStore(key, value) {
  try {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {}
}

function restoreSavedName() {
  if (readStore(REMEMBER_STORE) !== "1") return;
  rememberName.checked = true;
  const saved = readStore(NAME_STORE);
  if (saved) nameInput.value = saved;
}

function persistNamePreference() {
  if (rememberName.checked) {
    writeStore(REMEMBER_STORE, "1");
    writeStore(NAME_STORE, nameInput.value.trim());
  } else {
    writeStore(REMEMBER_STORE, null);
    writeStore(NAME_STORE, null);
  }
}

restoreSavedName();
rememberName.addEventListener("change", persistNamePreference);

hudToggle.onclick = () => {
  const minimized = hud.classList.toggle("minimized");
  hudToggle.textContent = minimized ? "+" : "−";
  hudToggle.setAttribute("aria-label", minimized ? "Expand info" : "Minimize info");
  hudToggle.title = minimized ? "Expand" : "Minimize";
};

const startButton = document.getElementById("start");
startButton.onclick = start;
document.getElementById("calibrate").onclick = calibrate;
document.getElementById("recalibrate").onclick = () => {
  calibrated = false;
  calibration = null;
  statusEl.textContent = "Recalibration: place red + blue again";
  redDot.visible = blueDot.visible = true;
};
document.getElementById("exit").onclick = () => leaveRoom(true);

window.addEventListener("pagehide", () => leaveRoom(false));
window.addEventListener("beforeunload", () => leaveRoom(false));

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

function createRemoteHand(color) {
  const group = new THREE.Group();
  group.userData.points = {};
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: .8,
    roughness: .4,
    metalness: .1
  });
  for (const name of HAND_JOINTS) {
    const r = name === "wrist" ? .04 : name.endsWith("tip") ? .016 : .02;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), mat);
    mesh.visible = false;
    mesh.userData.target = new THREE.Vector3();
    group.add(mesh);
    group.userData.points[name] = mesh;
  }
  const positions = new Float32Array(FINGER_CHAINS.length * 4 * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  lineGeo.setDrawRange(0, 0);
  const line = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: .9 })
  );
  group.add(line);
  group.userData.line = line;
  group.userData.linePos = positions;
  group.visible = false;
  scene.add(group);
  return group;
}

function createRemotePlayer(id, name) {
  const obj = new THREE.Group();
  obj.userData.name = name;
  obj.userData.target = new THREE.Vector3();
  obj.userData.hands = null;

  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(.18, 1.1, 4, 12),
    new THREE.MeshBasicMaterial({ color: 0x7ec8ff, transparent: true, opacity: .55 })
  );
  body.position.y = -.75;
  obj.add(body);

  const tag = createNameTag(name);
  tag.position.y = .28;
  obj.add(tag);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(.14, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .85 })
  );
  obj.add(head);
  obj.userData.leftHand = createRemoteHand(0x9ad4ff);
  obj.userData.rightHand = createRemoteHand(0xffc89a);
  scene.add(obj);
  return obj;
}

function updateRemotePlayer(id, p) {
  let obj = remotePlayers.get(id);
  if (!obj) {
    obj = createRemotePlayer(id, p.name || "Player");
    remotePlayers.set(id, obj);
  }

  if (typeof p.x !== "number" || typeof p.y !== "number" || typeof p.z !== "number") {
    obj.visible = false;
    applyHandJoints(obj.userData.leftHand, null);
    applyHandJoints(obj.userData.rightHand, null);
    return;
  }

  const local = roomToLocal(new THREE.Vector3(p.x, p.y, p.z));
  obj.userData.target.copy(local);
  if (!obj.userData.placed) {
    obj.position.copy(local);
    obj.userData.placed = true;
  }
  obj.userData.tracking = !!p.presenting;
  obj.userData.hands = p.presenting ? p.hands || null : null;
  obj.visible = true;
  applyHandJoints(obj.userData.leftHand, obj.userData.hands && obj.userData.hands.left);
  applyHandJoints(obj.userData.rightHand, obj.userData.hands && obj.userData.hands.right);
}

function applyHandJoints(hand, joints) {
  if (!hand) return;
  if (!joints || !joints.wrist) {
    hand.visible = false;
    return;
  }
  hand.visible = true;
  for (const name of HAND_JOINTS) {
    const mesh = hand.userData.points[name];
    const arr = joints[name];
    if (!mesh) continue;
    if (!Array.isArray(arr) || arr.length < 3) {
      mesh.visible = false;
      continue;
    }
    mesh.userData.target.copy(roomToLocal(new THREE.Vector3(arr[0], arr[1], arr[2])));
    if (!mesh.userData.placed) {
      mesh.position.copy(mesh.userData.target);
      mesh.userData.placed = true;
    }
    mesh.visible = true;
  }
}

function updateHandVisual(hand) {
  if (!hand || !hand.visible) return;
  let segs = 0;
  const pos = hand.userData.linePos;
  for (const name of HAND_JOINTS) {
    const mesh = hand.userData.points[name];
    if (mesh && mesh.visible && mesh.userData.target) mesh.position.lerp(mesh.userData.target, 0.4);
  }
  for (const chain of FINGER_CHAINS) {
    for (let i = 0; i < chain.length - 1; i++) {
      const a = hand.userData.points[chain[i]];
      const b = hand.userData.points[chain[i + 1]];
      if (!a || !b || !a.visible || !b.visible) continue;
      pos[segs * 6] = a.position.x;
      pos[segs * 6 + 1] = a.position.y;
      pos[segs * 6 + 2] = a.position.z;
      pos[segs * 6 + 3] = b.position.x;
      pos[segs * 6 + 4] = b.position.y;
      pos[segs * 6 + 5] = b.position.z;
      segs++;
    }
  }
  const line = hand.userData.line;
  line.geometry.attributes.position.needsUpdate = true;
  line.geometry.setDrawRange(0, segs * 2);
}

function updateRemoteVisuals() {
  const lookAt = new THREE.Vector3();
  if (renderer.xr.isPresenting) renderer.xr.getCamera().getWorldPosition(lookAt);
  else camera.getWorldPosition(lookAt);

  for (const obj of remotePlayers.values()) {
    if (obj.userData.target) obj.position.lerp(obj.userData.target, 0.35);
    const tag = obj.children.find(c => c.type === "Group");
    if (tag) tag.lookAt(lookAt);
    updateHandVisual(obj.userData.leftHand);
    updateHandVisual(obj.userData.rightHand);
  }
}

function playerUpdatedAt(p) {
  if (p && p.updatedAt && typeof p.updatedAt.toMillis === "function") return p.updatedAt.toMillis();
  return 0;
}

function isPlayerStale(p) {
  const t = playerUpdatedAt(p);
  return t > 0 && Date.now() - t > STALE_MS;
}

function removeRemote(id) {
  const obj = remotePlayers.get(id);
  if (!obj) return;
  scene.remove(obj);
  if (obj.userData.leftHand) scene.remove(obj.userData.leftHand);
  if (obj.userData.rightHand) scene.remove(obj.userData.rightHand);
  remotePlayers.delete(id);
}

function pruneStalePlayers(snap) {
  const staleIds = [];
  if (snap) {
    snap.forEach(d => {
      if (d.id === uid) return;
      if (isPlayerStale(d.data())) staleIds.push(d.id);
    });
  } else {
    const now = Date.now();
    for (const [id, obj] of remotePlayers) {
      if (now - (obj.userData.lastSeen || 0) > STALE_MS) staleIds.push(id);
    }
  }
  for (const id of staleIds) {
    removeRemote(id);
    if (db && roomId) deleteDoc(doc(db, "rooms", roomId, "players", id)).catch(() => {});
  }
}

function leaveRoom(reload) {
  if (pruneTimer) {
    clearInterval(pruneTimer);
    pruneTimer = null;
  }
  if (playersUnsub) {
    playersUnsub();
    playersUnsub = null;
  }
  sessionStarted = false;
  if (uid && roomId && db) {
    deleteDoc(doc(db, "rooms", roomId, "players", uid)).catch(() => {});
  }
  if (reload) location.reload();
}

function describePlayers(snap) {
  const others = [];
  snap.forEach(d => {
    if (d.id === uid) return;
    const p = d.data();
    if (isPlayerStale(p)) return;
    const tracking = typeof p.x === "number" && p.presenting;
    others.push(`${p.name || "Player"}${tracking ? "" : " (not tracking)"}`);
  });
  if (!others.length) {
    playerListEl.textContent = renderer.xr.isPresenting
      ? "Broadcasting your pose · no other players yet."
      : "No other players yet. On another XR device, enter the room, then walk.";
    return;
  }
  playerListEl.textContent = others.join(" · ");
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
  if (code === "auth/operation-not-allowed" || code === "auth/admin-restricted-operation") {
    return "Anonymous sign-in is disabled. In Firebase Console go to Authentication → Sign-in method → Anonymous → Enable.";
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
  playerName = nameInput.value.trim() || "Player";
  persistNamePreference();
  roomId = document.getElementById("room").value.trim() || "demo-room";

  const xrPromise = beginXRSessionFromGesture();
  setupXR();
  const xrAttach = xrPromise.then(session => session && enterXRSession(session)).catch(err => {
    console.warn(err);
    return null;
  });

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
        if (isPlayerStale(p)) return;
        seen.add(d.id);
        updateRemotePlayer(d.id, p);
        const obj = remotePlayers.get(d.id);
        if (obj) obj.userData.lastSeen = playerUpdatedAt(p) || Date.now();
      });
      for (const [id, obj] of remotePlayers) {
        if (!seen.has(id)) removeRemote(id);
      }
      pruneStalePlayers(snap);
      describePlayers(snap);
    });

    setup.classList.add("hidden");
    hud.classList.remove("hidden");
    roomLabel.textContent = `Room: ${roomId}`;
    sessionStarted = true;
    statusEl.textContent = "Connected";
    pruneTimer = setInterval(() => pruneStalePlayers(), HEARTBEAT_MS);
    await publishPlayer(true);
    await xrAttach;
    if (renderer.xr.isPresenting) {
      statusEl.textContent = "Tracking pose · walking should appear on other devices";
    } else if (xrSupportedMode) {
      statusEl.textContent = "Connected · tap START XR to enter the headset session";
    } else {
      statusEl.textContent = "Connected · start XR on a headset to broadcast walking";
    }
  } catch (e) {
    console.error(e);
    if (currentXRSession) currentXRSession.end();
    setupError.textContent = firebaseErrorMessage(e);
    startButton.disabled = false;
    startButton.textContent = "Enter Room";
  }
}

function setPassthrough(on) {
  if (on) {
    scene.background = null;
    renderer.setClearColor(0x000000, 0);
    grid.visible = false;
    floor.visible = false;
  } else {
    scene.background = new THREE.Color(0x101015);
    renderer.setClearColor(0x101015, 1);
    grid.visible = true;
    floor.visible = true;
  }
}

function applySessionAppearance(session) {
  const blend = session && session.environmentBlendMode;
  setPassthrough(blend === "alpha-blend" || blend === "additive");
}

async function enterXRSession(session) {
  if (!session || currentXRSession) return;
  session.addEventListener("end", onXRSessionEnded);
  let lastErr;
  for (const space of ["local-floor", "unbounded", "local"]) {
    renderer.xr.setReferenceSpaceType(space);
    try {
      await renderer.xr.setSession(session);
      lastErr = null;
      break;
    } catch (err) {
      lastErr = err;
    }
  }
  if (lastErr) throw lastErr;
  currentXRSession = session;
  applySessionAppearance(session);
  if (arButton) arButton.textContent = "STOP XR";
  controls.enabled = false;
  statusEl.textContent = "Tracking pose · walking should appear on other devices";
  publishPlayer(true).catch(console.error);
}

function onXRSessionEnded() {
  currentXRSession = null;
  if (arButton) arButton.textContent = xrSupportedMode ? "START XR" : "XR NOT SUPPORTED";
  controls.enabled = true;
  setPassthrough(false);
  statusEl.textContent = "XR stopped · pose is no longer broadcasting";
  if (uid && roomId && db) {
    setDoc(doc(db, "rooms", roomId, "players", uid), { presenting: false }, { merge: true }).catch(() => {});
  }
}

function setupXR() {
  if (xrConfigured) return;
  xrConfigured = true;

  const overlay = document.getElementById("overlay");
  arButton = document.createElement("button");
  arButton.id = "ARButton";
  arButton.textContent = "START XR";
  overlay.appendChild(arButton);

  arButton.onclick = async () => {
    if (currentXRSession) {
      currentXRSession.end();
      return;
    }
    try {
      const session = await beginXRSessionFromGesture();
      if (session) await enterXRSession(session);
      else statusEl.textContent = "Could not start XR on this device";
    } catch (err) {
      console.error(err);
      statusEl.textContent = err.message || "Failed to start XR";
    }
  };

  if (!navigator.xr) {
    arButton.textContent = "XR NOT SUPPORTED";
    arButton.disabled = true;
    document.getElementById("desktopHint").classList.remove("hidden");
  }

  renderer.xr.addEventListener("sessionend", () => {
    setPassthrough(false);
    controls.enabled = true;
  });

  for (let i = 0; i < 2; i++) {
    const controller = renderer.xr.getController(i);
    controller.userData.selecting = false;
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.addEventListener("squeezestart", onSelectStart);
    controller.addEventListener("squeezeend", onSelectEnd);
    controller.addEventListener("connected", e => {
      controller.userData.handedness = e.data.handedness;
    });
    controller.addEventListener("disconnected", () => {
      controller.userData.handedness = null;
    });

    const grip = renderer.xr.getControllerGrip(i);
    scene.add(controller, grip);
    controllers.push(controller);

    const hand = renderer.xr.getHand(i);
    hand.userData.handedness = null;
    hand.addEventListener("connected", e => {
      hand.userData.handedness = e.data.handedness;
      hand.visible = true;
    });
    hand.addEventListener("disconnected", () => {
      hand.userData.handedness = null;
    });
    hand.add(handModelFactory.createHandModel(hand, "spheres"));
    scene.add(hand);
    localHands.push(hand);
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

function findGrabbable(controller) {
  const origin = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
  for (const dot of [redDot, blueDot]) {
    if (dot.visible && origin.distanceTo(dot.position) < .18) return dot;
  }

  tempMatrix.identity().extractRotation(controller.matrixWorld);
  raycaster.ray.origin.copy(origin);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
  const hits = raycaster.intersectObjects([redDot, blueDot], true);
  if (!hits.length) return null;
  let root = hits[0].object;
  while (root.parent && !root.userData.grabbable) root = root.parent;
  return root.userData.grabbable ? root : null;
}

function onSelectStart(e) {
  const controller = e.target;
  controller.userData.selecting = true;
  const grabbed = findGrabbable(controller);
  if (!grabbed) return;
  const cp = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
  controller.userData.grabbed = grabbed;
  controller.userData.grabOffset = grabbed.position.clone().sub(cp);
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
  if (renderer.xr.isPresenting) renderer.xr.getCamera().getWorldPosition(p);
  else camera.getWorldPosition(p);
  return p;
}

function compact(n) {
  return Math.round(n * 1000) / 1000;
}

function worldToRoomArray(obj) {
  obj.getWorldPosition(_handPos);
  const room = localToRoom(_handPos);
  return [compact(room.x), compact(room.y), compact(room.z)];
}

function captureHands(frame) {
  const out = { left: null, right: null };
  if (!renderer.xr.isPresenting) return out;
  const session = renderer.xr.getSession();
  const refSpace = renderer.xr.getReferenceSpace();
  if (session && refSpace && frame) {
    let unnamed = 0;
    for (const source of session.inputSources) {
      let side = source.handedness;
      if (side !== "left" && side !== "right") {
        side = unnamed === 0 ? "left" : "right";
        unnamed++;
      }
      if (source.hand) {
        const packed = {};
        for (const name of HAND_JOINTS) {
          const jointSpace = source.hand.get ? source.hand.get(name) : null;
          if (!jointSpace) continue;
          const pose = frame.getJointPose(jointSpace, refSpace);
          if (!pose) continue;
          const p = pose.transform.position;
          const room = localToRoom(_handPos.set(p.x, p.y, p.z));
          packed[name] = [compact(room.x), compact(room.y), compact(room.z)];
        }
        if (packed.wrist) out[side] = packed;
        continue;
      }
      const space = source.gripSpace || source.targetRaySpace;
      if (!space) continue;
      const pose = frame.getPose(space, refSpace);
      if (!pose) continue;
      const p = pose.transform.position;
      const room = localToRoom(_handPos.set(p.x, p.y, p.z));
      out[side] = { wrist: [compact(room.x), compact(room.y), compact(room.z)] };
    }
    if (out.left || out.right) return out;
  }

  for (const hand of localHands) {
    const side = hand.userData.handedness;
    if (side !== "left" && side !== "right") continue;
    const joints = hand.joints;
    const wrist = joints && joints.wrist;
    if (!wrist) continue;
    const packed = {};
    for (const name of HAND_JOINTS) {
      const joint = joints[name];
      if (!joint) continue;
      packed[name] = worldToRoomArray(joint);
    }
    if (packed.wrist) out[side] = packed;
  }
  for (const c of controllers) {
    const side = c.userData.handedness;
    if ((side !== "left" && side !== "right") || out[side]) continue;
    out[side] = { wrist: worldToRoomArray(c) };
  }
  return out;
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

  redDot.position.set(0, 1, -1.5);
  blueDot.position.set(1, 1, -1.5);
  // Once calibrated, show canonical dots as a visual reference.
  redDot.visible = blueDot.visible = false;

  statusEl.textContent = "Calibrated · looking for other players";
  publishPlayer(true);
}

async function publishPlayer(force = false) {
  if (!sessionStarted || !uid) return;
  const now = performance.now();
  const interval = renderer.xr.isPresenting ? POSE_MS : HEARTBEAT_MS;
  if (!force && now - lastNetworkSend < interval) return;
  lastNetworkSend = now;

  const payload = {
    name: playerName,
    presenting: renderer.xr.isPresenting,
    calibrated,
    updatedAt: serverTimestamp()
  };

  if (renderer.xr.isPresenting) {
    const localHead = getLocalHeadPosition();
    if (Number.isFinite(localHead.x + localHead.y + localHead.z)) {
      const roomHead = localToRoom(localHead);
      payload.x = roomHead.x;
      payload.y = roomHead.y;
      payload.z = roomHead.z;
    }
    payload.hands = captureHands(lastXRFrame);
  }

  await setDoc(doc(db, "rooms", roomId, "players", uid), payload, { merge: !renderer.xr.isPresenting });
}

function render(time, frame) {
  lastXRFrame = frame || null;
  updateGrab();
  renderer.render(scene, camera);
  if (!renderer.xr.isPresenting) controls.update();
  updateRemoteVisuals();
  publishPlayer(false).catch(console.error);
}
