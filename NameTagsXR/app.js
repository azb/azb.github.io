import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { XRHandModelFactory } from "three/addons/webxr/XRHandModelFactory.js";

const APP_VERSION = "38";

const FB_BASE = "https://www.gstatic.com/firebasejs/12.1.0";
let initializeApp, getApps, getApp;
let initializeAuth, getAuth, inMemoryPersistence, signInAnonymously;
let getFirestore, doc, setDoc, onSnapshot, collection, getDocs, serverTimestamp, deleteDoc;

const firebaseConfig = {
  apiKey: "AIzaSyD9wx0VS7oZLUqB4v5-XEBHGVHom4f7dZM",
  authDomain: "nametagsxr.firebaseapp.com",
  projectId: "nametagsxr",
  storageBucket: "nametagsxr.firebasestorage.app",
  messagingSenderId: "1044217406309",
  appId: "1:1044217406309:web:ca475c4e8441752ca0f78c",
  measurementId: "G-R13NNSLFQ0"
};

let firebaseApp, auth, db, roomRef, playersUnsub, objectsUnsub, sharedRetryTimer;
let uid, roomId, playerName;
let connectionMode = "cloud";
let lanReady = false;
let localWs = null;
let localPeerMap = {};
let calibrated = false;
let calibration = null;
let markersCollapsed = false;
let lastNetworkSend = 0;
let lastPresenceSend = 0;
let sessionStarted = false;
let pruneTimer = null;
let otherPlayerCount = 0;
const POSE_MS = 80;
const HEARTBEAT_MS = 2000;
const STALE_MS = 8000;
const CLOUD_HEARTBEAT_MS = 20000;
const CLOUD_POSE_MS = 400;
const CLOUD_STALE_MS = 45000;
const HAND_JOINTS = [
  "wrist",
  "thumb-metacarpal", "thumb-phalanx-proximal", "thumb-phalanx-distal", "thumb-tip",
  "index-finger-metacarpal", "index-finger-phalanx-proximal", "index-finger-phalanx-intermediate", "index-finger-phalanx-distal", "index-finger-tip",
  "middle-finger-metacarpal", "middle-finger-phalanx-proximal", "middle-finger-phalanx-intermediate", "middle-finger-phalanx-distal", "middle-finger-tip",
  "ring-finger-metacarpal", "ring-finger-phalanx-proximal", "ring-finger-phalanx-intermediate", "ring-finger-phalanx-distal", "ring-finger-tip",
  "pinky-finger-metacarpal", "pinky-finger-phalanx-proximal", "pinky-finger-phalanx-intermediate", "pinky-finger-phalanx-distal", "pinky-finger-tip"
];
const _headEuler = new THREE.Euler();
const _hipOff = new THREE.Vector3();
const _xAxis = new THREE.Vector3(1, 0, 0);
const RTC_CONFIG = {
  iceCandidatePoolSize: 8,
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun.cloudflare.com:3478" }
  ]
};
const rtcPeers = new Map();
const cloudPresence = new Map();
const outgoingOffers = {};
const outgoingAnswers = {};
const outgoingIce = {};
let icePublishTimer = null;
let lastPoseFallbackSend = 0;
let lastHandsPayload = null;
const HAND_STILL_FRAMES = 8;
const HAND_STILL_MS = 100;
const HAND_STILL_M = 0.01;
const HAND_RECOVER_M = 0.03;
const HAND_NEAR_M = 1.15;
const MIN_HAND_JOINTS = 20;
const localHandLost = { left: false, right: false };
const localHandNear = { left: true, right: true };
const localHandStill = {
  left: { pos: new THREE.Vector3(), frames: 0, t: 0, has: false },
  right: { pos: new THREE.Vector3(), frames: 0, t: 0, has: false }
};
const localHands = [];
const _handPos = new THREE.Vector3();
const _handQuat = new THREE.Quaternion();
const _qYaw = new THREE.Quaternion();
const _qDelta = new THREE.Quaternion();
const _jointScale = new THREE.Vector3();
const _yAxis = new THREE.Vector3(0, 1, 0);
const handModelFactory = new XRHandModelFactory(null, obj => {
  obj.traverse(o => {
    if (o.isMesh && o.material) {
      o.material.side = THREE.DoubleSide;
      o.frustumCulled = false;
    }
    if (o.isBone && !o.userData.bindPos) {
      o.userData.bindPos = o.position.clone();
      o.userData.bindQuat = o.quaternion.clone();
    }
  });
});
let lastXRFrame = null;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101015);

const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.01, 500);
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
const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
dirLight.position.set(2.5, 5, 1.5);
scene.add(dirLight);
const grid = new THREE.GridHelper(10, 20, 0x444444, 0x222222);
scene.add(grid);

// Simple room visualizer.
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshBasicMaterial({ color: 0x16161c, transparent: true, opacity: .5 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const GIZMO_AXIS_LEN = .16;
const GIZMO_SHAFT_R = .0045;
const GIZMO_CONE_R = .013;
const GIZMO_CONE_LEN = .04;
const GIZMO_STUB_LEN = .055;
const GIZMO_CENTER = .012;

// Shared calibration landmarks.
// Canonical room coordinates are red=(0,0,0), blue=(1,0,0).
const redDot = makeGizmo(0xff3030, "RED");
const blueDot = makeGizmo(0x3080ff, "BLUE");
redDot.position.set(-0.5, 1, -1.5);
blueDot.position.set(0.5, 1, -1.5);
const doneButton = makeDoneButton();
scene.add(redDot, blueDot, doneButton);
redDot.visible = blueDot.visible = doneButton.visible = false;

const tempMatrix = new THREE.Matrix4();
const _pointerOrigin = new THREE.Vector3();
const _pointerDir = new THREE.Vector3();
const _oc = new THREE.Vector3();
const GRAB_NEAR = .22;
const GRAB_RADIUS = .28;
const GRAB_FAR = 12;
const DOT_SCALE_MINI = .38;
const MAX_MODEL_BYTES = 20 * 1024 * 1024;
const FILE_CHUNK = 48 * 1024;
const MODEL_FIT = .75;
const controllers = [];
const remotePlayers = new Map();
const sharedObjects = new Map();
const incomingFiles = new Map();
const WHITE_PX = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+n2s8AAAAASUVORK5CYII=";
const modelManager = new THREE.LoadingManager();
modelManager.setURLModifier(url => {
  const s = String(url || "");
  if (/^(data:|blob:)/i.test(s)) return s;
  if (/^https?:\/\//i.test(s)) return s;
  return WHITE_PX;
});
const gltfLoader = new GLTFLoader(modelManager);
const objLoader = new OBJLoader(modelManager);
const stlLoader = new STLLoader(modelManager);
const fbxLoader = new FBXLoader(modelManager);
const gltfExporter = new GLTFExporter();
const _raycaster = new THREE.Raycaster();
const _pointerNdc = new THREE.Vector2();
const _fitBox = new THREE.Box3();
const _fitSize = new THREE.Vector3();
const _fitCenter = new THREE.Vector3();
let selectedShared = null;
let lastObjectSend = 0;
let pcPointerDown = null;

const transformControls = new TransformControls(camera, renderer.domElement);
transformControls.setMode("translate");
transformControls.setSpace("world");
transformControls.enabled = false;
const transformHelper = transformControls.getHelper();
transformHelper.visible = false;
scene.add(transformHelper);

const setup = document.getElementById("setup");
const hud = document.getElementById("hud");
const hudToggle = document.getElementById("hudToggle");
const statusEl = document.getElementById("status");
const setupError = document.getElementById("setupError");
const roomLabel = document.getElementById("roomLabel");
const playerListEl = document.getElementById("playerList");
document.querySelectorAll(".appVersion").forEach(el => {
  el.textContent = "v" + APP_VERSION;
});
const startButton = document.getElementById("start");

let arButton = null;
let currentXRSession = null;
let xrSupportedMode = null;
let xrConfigured = false;
let xrDetectDone = false;

(async function detectXRSupport() {
  if (navigator.xr) {
    if (await navigator.xr.isSessionSupported("immersive-ar").catch(() => false)) {
      xrSupportedMode = "immersive-ar";
    } else if (await navigator.xr.isSessionSupported("immersive-vr").catch(() => false)) {
      xrSupportedMode = "immersive-vr";
    }
  }
  xrDetectDone = true;
  if (arButton && !xrSupportedMode) {
    arButton.textContent = "XR NOT SUPPORTED";
    arButton.disabled = true;
  }
})();

function xrInitsFor(mode) {
  const overlay = document.getElementById("overlay");
  if (mode === "immersive-ar") {
    return [
      { optionalFeatures: ["local-floor", "unbounded", "hand-tracking", "dom-overlay"], domOverlay: { root: overlay } },
      { optionalFeatures: ["local-floor", "unbounded", "hand-tracking"] },
      { optionalFeatures: ["hand-tracking"] },
      {}
    ];
  }
  return [
    { optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"] },
    { optionalFeatures: ["hand-tracking"] },
    {}
  ];
}

function requestXRMode(mode) {
  const inits = xrInitsFor(mode);
  let chain = navigator.xr.requestSession(mode, inits[0]);
  for (let i = 1; i < inits.length; i++) {
    const init = inits[i];
    chain = chain.catch(() => navigator.xr.requestSession(mode, init));
  }
  return chain.catch(() => null);
}

function beginXRSessionFromGesture() {
  if (!navigator.xr || currentXRSession) return Promise.resolve(null);
  if (xrDetectDone && !xrSupportedMode) return Promise.resolve(null);
  const first = xrSupportedMode || "immersive-ar";
  const second = first === "immersive-ar" ? "immersive-vr" : "immersive-ar";
  return requestXRMode(first).then(session => session || requestXRMode(second));
}

const NAME_STORE = "nametagsxr.playerName";
const REMEMBER_STORE = "nametagsxr.rememberName";
const CONN_STORE = "nametagsxr.connection";
const nameInput = document.getElementById("name");
const rememberName = document.getElementById("rememberName");
const localHint = document.getElementById("localHint");
const connRadios = document.querySelectorAll('input[name="conn"]');

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

function selectedConnection() {
  const checked = document.querySelector('input[name="conn"]:checked');
  return checked && checked.value === "local" ? "local" : "cloud";
}

function updateConnectionHint() {
  connectionMode = selectedConnection();
  writeStore(CONN_STORE, connectionMode);
  if (connectionMode !== "local") {
    localHint.classList.remove("hidden");
    localHint.textContent = "No PC needed. Open this same HTTPS site on each headset. Tracking goes headset-to-headset; Firebase is only used to join, so it should stay within free limits.";
    startButton.disabled = false;
    return;
  }
  localHint.classList.remove("hidden");
  if (lanReady) {
    localHint.textContent = window.isSecureContext
      ? "This page is served on your Wi-Fi. Open this same URL on every device and use the same Room ID."
      : "This page is not a secure origin, so the headset session will not start. On a USB-connected headset run start-quest.bat and open http://127.0.0.1:8080/ — or add this origin in chrome://flags/#unsafely-treat-insecure-origin-as-secure";
    startButton.disabled = false;
  } else {
    localHint.textContent = "On a computer on this Wi-Fi, run start-server.bat (or start-quest.bat with a USB headset). Open the address it prints on every device — not the GitHub Pages site.";
    startButton.disabled = true;
  }
}

async function probeLanServer() {
  if (/\.github\.io$/i.test(location.hostname)) return false;
  try {
    const res = await fetch(new URL("__lan", location.href), { cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json();
    return !!(data && data.ok);
  } catch {
    return false;
  }
}

(async function initConnectionPicker() {
  lanReady = await probeLanServer();
  const saved = readStore(CONN_STORE);
  if (saved === "local" || saved === "cloud") connectionMode = saved;
  else connectionMode = lanReady ? "local" : "cloud";
  const radio = document.querySelector(`input[name="conn"][value="${connectionMode}"]`);
  if (radio) radio.checked = true;
  updateConnectionHint();
  if (!window.isSecureContext) {
    setupError.textContent = "Not a secure origin — headset XR will not start. Plug in USB, run start-quest.bat, and open http://127.0.0.1:8080/ in the headset browser.";
  }
})();

connRadios.forEach(radio => radio.addEventListener("change", updateConnectionHint));

hudToggle.onclick = () => {
  const minimized = hud.classList.toggle("minimized");
  hudToggle.textContent = minimized ? "+" : "−";
  hudToggle.setAttribute("aria-label", minimized ? "Expand info" : "Minimize info");
  hudToggle.title = minimized ? "Expand" : "Minimize";
};

startButton.onclick = start;
document.getElementById("calibrate").onclick = calibrate;
document.getElementById("recalibrate").onclick = () => {
  calibrated = false;
  calibration = null;
  markersCollapsed = false;
  statusEl.textContent = "Recalibration: place red + blue again";
  syncCalibrationUi();
};
document.getElementById("exit").onclick = () => leaveRoom(true);
document.getElementById("clearModels").onclick = () => removeAllShared();

window.addEventListener("keydown", e => {
  if (e.key !== "Delete") return;
  const el = e.target;
  const tag = el && el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || (el && el.isContentEditable)) return;
  if (!sessionStarted || renderer.xr.isPresenting || !selectedShared) return;
  const rec = sharedObjects.get(selectedShared.userData.sharedId);
  if (!rec) return;
  e.preventDefault();
  const name = rec.name || "model";
  removeSharedById(rec.id);
  statusEl.textContent = "Deleted " + name;
});

window.addEventListener("pagehide", () => leaveRoom(false));
window.addEventListener("beforeunload", () => leaveRoom(false));

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

renderer.setAnimationLoop(render);

function makeGizmo(markerColor, text) {
  const group = new THREE.Group();
  const axes = [
    { dir: new THREE.Vector3(1, 0, 0), color: 0xff3333, letter: "X" },
    { dir: new THREE.Vector3(0, 1, 0), color: 0x33cc55, letter: "Y" },
    { dir: new THREE.Vector3(0, 0, 1), color: 0x3388ff, letter: "Z" }
  ];

  for (const axis of axes) {
    addGizmoAxis(group, axis.dir, axis.color);
    const glyph = makeLetterSprite(axis.letter, axis.color);
    glyph.position.copy(axis.dir).multiplyScalar(GIZMO_AXIS_LEN + .03);
    group.add(glyph);
    if (!group.userData.axisLetters) group.userData.axisLetters = [];
    group.userData.axisLetters.push(glyph);
  }

  const center = new THREE.Mesh(
    new THREE.BoxGeometry(GIZMO_CENTER, GIZMO_CENTER, GIZMO_CENTER),
    new THREE.MeshBasicMaterial({ color: markerColor })
  );
  group.add(center);

  const label = makeTextSprite(text, markerColor);
  label.position.y = GIZMO_AXIS_LEN + .08;
  label.scale.set(.35, .12, 1);
  group.add(label);

  group.userData.grabbable = true;
  group.userData.radius = GIZMO_AXIS_LEN + GIZMO_CONE_LEN;
  group.userData.label = label;
  return group;
}

function addGizmoAxis(parent, dir, color) {
  const mat = new THREE.MeshBasicMaterial({ color });
  const shaftLen = GIZMO_AXIS_LEN - GIZMO_CONE_LEN;

  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(GIZMO_SHAFT_R, GIZMO_SHAFT_R, shaftLen, 10),
    mat
  );
  shaft.quaternion.setFromUnitVectors(_yAxis, dir);
  shaft.position.copy(dir).multiplyScalar(shaftLen * .5);
  parent.add(shaft);

  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(GIZMO_CONE_R, GIZMO_CONE_LEN, 12),
    mat
  );
  cone.quaternion.setFromUnitVectors(_yAxis, dir);
  cone.position.copy(dir).multiplyScalar(shaftLen + GIZMO_CONE_LEN * .5);
  parent.add(cone);

  const stub = new THREE.Mesh(
    new THREE.CylinderGeometry(GIZMO_SHAFT_R * .75, GIZMO_SHAFT_R * .75, GIZMO_STUB_LEN, 8),
    mat
  );
  stub.quaternion.setFromUnitVectors(_yAxis, dir);
  stub.position.copy(dir).multiplyScalar(-GIZMO_STUB_LEN * .5);
  parent.add(stub);
}

function makeLetterSprite(letter, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 90px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "rgba(0,0,0,.85)";
  ctx.lineWidth = 12;
  ctx.strokeText(letter, 64, 68);
  ctx.fillStyle = "#" + new THREE.Color(color).getHexString();
  ctx.fillText(letter, 64, 68);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex, transparent: true, depthTest: false
  }));
  sprite.scale.set(.055, .055, 1);
  return sprite;
}

function makeDoneButton() {
  const group = new THREE.Group();
  const plate = new THREE.Mesh(
    new THREE.SphereGeometry(.11, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0x3ddc84 })
  );
  group.add(plate);
  group.userData.plate = plate;

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(.13, .16, 32),
    new THREE.MeshBasicMaterial({ color: 0x9effc2, side: THREE.DoubleSide, transparent: true, opacity: .95 })
  );
  ring.rotation.x = -Math.PI / 2;
  group.add(ring);

  const label = makeTextSprite("DONE");
  label.position.y = .22;
  label.scale.set(.7, .22, 1);
  group.add(label);

  group.userData.pressable = true;
  group.userData.radius = .28;
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

function createRemoteHand(handedness) {
  const hand = new THREE.Group();
  hand.matrixAutoUpdate = false;
  hand.joints = {};
  for (const name of HAND_JOINTS) {
    const joint = new THREE.Group();
    joint.matrixAutoUpdate = false;
    joint.visible = false;
    joint.userData.target = new THREE.Vector3();
    joint.userData.targetQuat = new THREE.Quaternion();
    hand.joints[name] = joint;
    hand.add(joint);
  }
  const model = handModelFactory.createHandModel(hand, "mesh");
  hand.userData.model = model;
  hand.add(model);
  hand.dispatchEvent({
    type: "connected",
    data: { handedness: handedness, hand: { handedness: handedness } }
  });
  hand.visible = false;
  scene.add(hand);
  return hand;
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
  obj.userData.body = body;

  const tag = createNameTag(name);
  tag.position.y = .28;
  obj.add(tag);
  obj.userData.tag = tag;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(.14, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .85 })
  );
  obj.add(head);
  obj.userData.head = head;
  syncSpectatorAvatarMeshes(obj);
  obj.userData.leftHand = createRemoteHand("left");
  obj.userData.rightHand = createRemoteHand("right");
  scene.add(obj);
  return obj;
}

function trimmedName(value) {
  return typeof value === "string" ? value.trim() : "";
}

function resolvePlayerName(id, p) {
  return trimmedName(p && p.name)
    || trimmedName(cloudPresence.get(id) && cloudPresence.get(id).name)
    || trimmedName(remotePlayers.get(id) && remotePlayers.get(id).userData.name);
}

function setRemotePlayerName(obj, name) {
  if (!obj || !name || name === obj.userData.name) return;
  obj.userData.name = name;
  const tag = obj.userData.tag;
  if (!tag) return;
  const sprite = tag.children.find(child => child.isSprite);
  if (!sprite || !sprite.material) return;
  const next = makeTextSprite(name);
  const oldMap = sprite.material.map;
  sprite.material.map = next.material.map;
  sprite.material.needsUpdate = true;
  if (oldMap) oldMap.dispose();
  next.material.dispose();
}

function updateRemotePlayer(id, p) {
  let obj = remotePlayers.get(id);
  if (!p.presenting) {
    if (!obj) return;
    setRemotePlayerName(obj, resolvePlayerName(id, p));
    obj.visible = false;
    obj.userData.tracking = false;
    applyHandJoints(obj.userData.leftHand, null);
    applyHandJoints(obj.userData.rightHand, null);
    return;
  }

  if (!obj) {
    obj = createRemotePlayer(id, resolvePlayerName(id, p) || "Player");
    remotePlayers.set(id, obj);
  }
  setRemotePlayerName(obj, resolvePlayerName(id, p) || obj.userData.name);

  if (typeof p.x !== "number" || typeof p.y !== "number" || typeof p.z !== "number") {
    obj.visible = true;
    obj.userData.tracking = false;
    if (!obj.userData.placed) {
      obj.position.set(0, 1.2, 0);
      obj.userData.target.copy(obj.position);
      obj.userData.placed = true;
      frameSpectatorOn(obj);
    }
    applyHandJoints(obj.userData.leftHand, null);
    applyHandJoints(obj.userData.rightHand, null);
    return;
  }

  const local = roomToLocal(new THREE.Vector3(p.x, p.y, p.z));
  const gainedTracking = !obj.userData.tracking;
  obj.userData.target.copy(local);
  if (!obj.userData.placed) {
    obj.position.copy(local);
    obj.userData.placed = true;
  }
  obj.userData.tracking = true;
  const hands = restHandsForPlayer(p);
  obj.userData.hands = hands;
  obj.visible = true;
  const yaw = typeof p.yaw === "number" ? p.yaw : 0;
  applyHandJoints(obj.userData.leftHand, hands && hands.left, { side: "left", head: local, yaw });
  applyHandJoints(obj.userData.rightHand, hands && hands.right, { side: "right", head: local, yaw });
  if (gainedTracking) frameSpectatorOn(obj);
}

function packedJoints(data) {
  if (!data) return null;
  if (Array.isArray(data) && data.length >= 3) return { wrist: data };
  if (typeof data === "object") return data;
  return null;
}

function flipQuat(q) {
  q.x = -q.x;
  q.y = -q.y;
  q.z = -q.z;
  q.w = -q.w;
  return q;
}

function applyJointPose(joint, arr, snap) {
  const pos = roomToLocal(new THREE.Vector3(arr[0], arr[1], arr[2]));
  joint.userData.target.copy(pos);
  if (arr.length >= 7) {
    _handQuat.set(arr[3], arr[4], arr[5], arr[6]).normalize();
    if (_handQuat.w < 0) flipQuat(_handQuat);
    if (calibration) {
      _qYaw.setFromAxisAngle(_yAxis, -calibration.yaw);
      _handQuat.premultiply(_qYaw);
      _handQuat.normalize();
    }
    joint.userData.targetQuat.copy(_handQuat);
  } else {
    joint.userData.targetQuat.identity();
  }
  const far = snap || !joint.userData.placed || joint.position.distanceToSquared(pos) > 0.04;
  if (far) {
    joint.position.copy(joint.userData.target);
    joint.quaternion.copy(joint.userData.targetQuat);
    joint.userData.placed = true;
  }
  joint.scale.set(1, 1, 1);
  joint.updateMatrix();
  joint.visible = true;
}

function countPackedJoints(packed) {
  if (!packed || typeof packed !== "object") return 0;
  let n = 0;
  for (const name of HAND_JOINTS) {
    if (Array.isArray(packed[name]) && packed[name].length >= 7) n++;
  }
  return n;
}

function fillPackedHoles(packed, fallback) {
  if (!packed || !fallback) return packed;
  const wrist = packed.wrist;
  const fbWrist = fallback.wrist;
  const wristLive = Array.isArray(wrist) && wrist.length >= 7;
  const fbWristOk = Array.isArray(fbWrist) && fbWrist.length >= 7;
  for (const name of HAND_JOINTS) {
    const arr = packed[name];
    if (Array.isArray(arr) && arr.length >= 7) continue;
    const fb = fallback[name];
    if (!Array.isArray(fb) || fb.length < 7) continue;
    if (wristLive && fbWristOk) {
      _qYaw.set(fbWrist[3], fbWrist[4], fbWrist[5], fbWrist[6]).normalize().invert();
      _qDelta.set(wrist[3], wrist[4], wrist[5], wrist[6]).normalize().multiply(_qYaw);
      _handPos.set(fb[0] - fbWrist[0], fb[1] - fbWrist[1], fb[2] - fbWrist[2]).applyQuaternion(_qDelta);
      _handQuat.set(fb[3], fb[4], fb[5], fb[6]).normalize();
      _qYaw.copy(_qDelta).multiply(_handQuat);
      packed[name] = [
        wrist[0] + _handPos.x, wrist[1] + _handPos.y, wrist[2] + _handPos.z,
        _qYaw.x, _qYaw.y, _qYaw.z, _qYaw.w
      ];
    } else {
      packed[name] = fb;
    }
  }
  return packed;
}

function resetHandGroup(hand) {
  hand.position.set(0, 0, 0);
  hand.quaternion.identity();
  hand.scale.set(1, 1, 1);
  hand.updateMatrix();
  hand.matrixWorldNeedsUpdate = true;
}

function hideHandJoints(hand) {
  const joints = hand.joints;
  if (!joints) return;
  for (const name of HAND_JOINTS) {
    const joint = joints[name];
    if (!joint) continue;
    joint.visible = false;
    joint.userData.placed = false;
  }
}

function resetHandBonesToBind(hand) {
  const model = hand.userData.model;
  if (!model) return;
  const apply = bone => {
    if (!bone || !bone.userData.bindPos) return;
    bone.position.copy(bone.userData.bindPos);
    bone.quaternion.copy(bone.userData.bindQuat);
  };
  model.traverse(o => {
    if (o.isBone) apply(o);
  });
  const bones = model.motionController && model.motionController.bones;
  if (bones) {
    for (const bone of bones) apply(bone);
  }
}

function applyBindPoseHandAtHip(hand, ctx) {
  hideHandJoints(hand);
  resetHandBonesToBind(hand);
  const side = ctx && ctx.side;
  const head = ctx && ctx.head;
  if (!head || (side !== "left" && side !== "right")) {
    hand.visible = false;
    return;
  }
  const yaw = calibration
    ? (ctx.yaw || 0) - calibration.yaw
    : (ctx.yaw || 0);
  const sign = side === "left" ? -1 : 1;
  _hipOff.set(sign * 0.22, -0.72, 0.04).applyAxisAngle(_yAxis, yaw).add(head);
  hand.position.copy(_hipOff);
  hand.quaternion.setFromAxisAngle(_yAxis, yaw);
  _qYaw.setFromAxisAngle(_xAxis, Math.PI / 2);
  hand.quaternion.multiply(_qYaw);
  hand.scale.set(1, 1, 1);
  hand.updateMatrix();
  hand.matrixWorldNeedsUpdate = true;
  hand.userData.bindPose = true;
  hand.visible = true;
}

function applyHandJoints(hand, data, ctx) {
  if (!hand) return;
  if (data && data.rest) {
    applyBindPoseHandAtHip(hand, ctx);
    return;
  }
  let packed = packedJoints(data);
  const joints = hand.joints;
  if (!packed || !joints) {
    hideHandJoints(hand);
    resetHandGroup(hand);
    hand.userData.bindPose = false;
    hand.visible = false;
    return;
  }
  packed = fillPackedHoles(packed, hand.userData.lastComplete);
  let n = countPackedJoints(packed);
  if (n < HAND_JOINTS.length) {
    packed = hand.userData.lastComplete;
    n = countPackedJoints(packed);
  }
  if (n < HAND_JOINTS.length) {
    applyBindPoseHandAtHip(hand, ctx);
    return;
  }
  hand.userData.lastComplete = packed;
  const snap = !!hand.userData.bindPose;
  if (snap) {
    resetHandGroup(hand);
    hand.userData.bindPose = false;
  }
  let any = false;
  for (const name of HAND_JOINTS) {
    const joint = joints[name];
    const arr = packed[name];
    if (!joint) continue;
    if (!Array.isArray(arr) || arr.length < 7) {
      joint.visible = false;
      continue;
    }
    any = true;
    applyJointPose(joint, arr, snap);
  }
  hand.visible = any;
}

function updateHandVisual(hand) {
  if (!hand || !hand.visible || !hand.joints || hand.userData.bindPose) return;
  for (const name of HAND_JOINTS) {
    const joint = hand.joints[name];
    if (!joint || !joint.visible) continue;
    if (joint.userData.target) joint.position.lerp(joint.userData.target, 0.55);
    if (joint.userData.targetQuat) {
      if (joint.quaternion.dot(joint.userData.targetQuat) < 0) flipQuat(joint.userData.targetQuat);
      if (joint.quaternion.dot(joint.userData.targetQuat) < 0.35) {
        joint.quaternion.copy(joint.userData.targetQuat);
      } else {
        joint.quaternion.slerp(joint.userData.targetQuat, 0.55);
      }
      joint.quaternion.normalize();
    }
    joint.scale.set(1, 1, 1);
    joint.updateMatrix();
  }
}

function syncSpectatorAvatarMeshes(obj) {
  const show = !renderer.xr.isPresenting;
  if (obj.userData.body) obj.userData.body.visible = show;
  if (obj.userData.head) obj.userData.head.visible = show;
}

function updateRemoteVisuals() {
  const lookAt = new THREE.Vector3();
  if (renderer.xr.isPresenting) renderer.xr.getCamera().getWorldPosition(lookAt);
  else camera.getWorldPosition(lookAt);

  for (const obj of remotePlayers.values()) {
    syncSpectatorAvatarMeshes(obj);
    if (obj.userData.target) obj.position.lerp(obj.userData.target, 0.35);
    const tag = obj.userData.tag;
    if (tag) tag.lookAt(lookAt);
    updateHandVisual(obj.userData.leftHand);
    updateHandVisual(obj.userData.rightHand);
  }
}

function frameSpectatorOn(obj) {
  if (renderer.xr.isPresenting || !obj) return;
  const p = obj.position;
  controls.target.set(p.x, p.y, p.z);
  camera.position.set(p.x + 0.8, p.y + 1.6, p.z + 3.6);
  controls.update();
}

function playerUpdatedAt(p) {
  if (!p || p.updatedAt == null) return 0;
  if (typeof p.updatedAt === "number") return p.updatedAt;
  if (typeof p.updatedAt.toMillis === "function") return p.updatedAt.toMillis();
  return 0;
}

function isPlayerStale(p) {
  const t = playerUpdatedAt(p);
  const limit = connectionMode === "cloud" ? CLOUD_STALE_MS : STALE_MS;
  return t > 0 && Date.now() - t > limit;
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
  } else if (connectionMode !== "cloud") {
    const now = Date.now();
    for (const [id, obj] of remotePlayers) {
      if (now - (obj.userData.lastSeen || 0) > STALE_MS) staleIds.push(id);
    }
  }
  for (const id of staleIds) {
    removeRemote(id);
    closeRtcPeer(id);
    cloudPresence.delete(id);
    if (connectionMode === "cloud" && db && roomId) {
      deleteDoc(doc(db, "rooms", roomId, "players", id)).catch(() => {});
    }
  }
}

function closeLocalSocket() {
  if (!localWs) return;
  try {
    if (localWs.readyState === WebSocket.OPEN && uid && roomId) {
      localWs.send(JSON.stringify({ type: "leave", room: roomId, id: uid }));
    }
  } catch {}
  try { localWs.close(); } catch {}
  localWs = null;
}

function waitIceGathering(pc) {
  if (pc.iceGatheringState === "complete") return Promise.resolve();
  return new Promise(resolve => {
    const t = setTimeout(resolve, 3000);
    const onChange = () => {
      if (pc.iceGatheringState !== "complete") return;
      pc.removeEventListener("icegatheringstatechange", onChange);
      clearTimeout(t);
      resolve();
    };
    pc.addEventListener("icegatheringstatechange", onChange);
  });
}

function rtcOpenCount() {
  let n = 0;
  for (const peer of rtcPeers.values()) {
    if (peer.channel && peer.channel.readyState === "open") n++;
  }
  return n;
}

function rtcBroadcast(payload) {
  const msg = JSON.stringify({ type: "state", data: payload });
  for (const peer of rtcPeers.values()) {
    if (peer.channel && peer.channel.readyState === "open") {
      try { peer.channel.send(msg); } catch {}
    }
  }
}

function queueIcePublish() {
  clearTimeout(icePublishTimer);
  icePublishTimer = setTimeout(() => publishPresence(true).catch(() => {}), 180);
}

function bindRtcChannel(remoteId, channel) {
  const peer = rtcPeers.get(remoteId);
  if (!peer) return;
  peer.channel = channel;
  channel.onmessage = ev => {
    let msg;
    try { msg = JSON.parse(typeof ev.data === "string" ? ev.data : new TextDecoder().decode(ev.data)); } catch { return; }
    if (!msg || !msg.type) return;
    if (msg.type === "state" && msg.data) {
      updateRemotePlayer(remoteId, msg.data);
      const obj = remotePlayers.get(remoteId);
      if (obj) obj.userData.lastSeen = Date.now();
      describeCloudPlayers();
      return;
    }
    handleRtcPayload(remoteId, msg);
  };
  channel.onopen = () => {
    delete outgoingOffers[remoteId];
    delete outgoingAnswers[remoteId];
    delete outgoingIce[remoteId];
    publishPresence(true).catch(() => {});
    publishPlayer(true).catch(() => {});
    describeCloudPlayers();
    syncSharedToPeer(remoteId).catch(err => console.warn("shared sync failed", err));
    if (renderer.xr.isPresenting) {
      statusEl.textContent = "Tracking pose · walking should appear on other devices";
    }
  };
  channel.onclose = () => describeCloudPlayers();
}

function closeRtcPeer(remoteId) {
  const peer = rtcPeers.get(remoteId);
  if (!peer) return;
  try { if (peer.channel) peer.channel.close(); } catch {}
  try { peer.pc.close(); } catch {}
  rtcPeers.delete(remoteId);
  delete outgoingOffers[remoteId];
  delete outgoingAnswers[remoteId];
  delete outgoingIce[remoteId];
}

function ensureRtcPeer(remoteId) {
  if (!uid || remoteId === uid || rtcPeers.has(remoteId) || typeof RTCPeerConnection !== "function") return;
  const offerer = uid < remoteId;
  const pc = new RTCPeerConnection(RTC_CONFIG);
  const peer = {
    pc,
    channel: null,
    offerer,
    appliedRemote: "",
    seenIce: new Set(),
    pendingIce: []
  };
  rtcPeers.set(remoteId, peer);
  try {
    bindRtcChannel(remoteId, pc.createDataChannel("pose", { negotiated: true, id: 1, ordered: true }));
  } catch {
    if (offerer) bindRtcChannel(remoteId, pc.createDataChannel("pose"));
    else pc.ondatachannel = ev => bindRtcChannel(remoteId, ev.channel);
  }
  pc.onicecandidate = ev => {
    if (!ev.candidate) {
      if (pc.localDescription) {
        const blob = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
        if (offerer) outgoingOffers[remoteId] = blob;
        else outgoingAnswers[remoteId] = blob;
      }
      queueIcePublish();
      return;
    }
    if (!outgoingIce[remoteId]) outgoingIce[remoteId] = [];
    if (outgoingIce[remoteId].length >= 24) return;
    outgoingIce[remoteId].push({
      candidate: ev.candidate.candidate,
      sdpMid: ev.candidate.sdpMid == null ? null : ev.candidate.sdpMid,
      sdpMLineIndex: ev.candidate.sdpMLineIndex == null ? 0 : ev.candidate.sdpMLineIndex
    });
    queueIcePublish();
  };
  pc.onconnectionstatechange = () => {
    describeCloudPlayers();
    if (pc.connectionState !== "failed") return;
    closeRtcPeer(remoteId);
    setTimeout(() => {
      if (sessionStarted && cloudPresence.has(remoteId)) ensureRtcPeer(remoteId);
    }, 1200);
  };

  if (!offerer) return;
  (async () => {
    await pc.setLocalDescription(await pc.createOffer());
    outgoingOffers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
    await publishPresence(true);
    await waitIceGathering(pc);
    outgoingOffers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
    await publishPresence(true);
  })().catch(err => console.warn("RTC offer failed", err));
}

async function flushPendingIce(peer) {
  if (!peer || !peer.pc.remoteDescription) return;
  while (peer.pendingIce.length) {
    const c = peer.pendingIce.shift();
    try { await peer.pc.addIceCandidate(c); } catch {}
  }
}

async function applyRemoteIce(remoteId, p) {
  const peer = rtcPeers.get(remoteId);
  if (!peer) return;
  const list = p.ice && p.ice[uid];
  if (!Array.isArray(list)) return;
  for (const c of list) {
    if (!c || !c.candidate || peer.seenIce.has(c.candidate)) continue;
    peer.seenIce.add(c.candidate);
    if (!peer.pc.remoteDescription) {
      peer.pendingIce.push(c);
      continue;
    }
    try { await peer.pc.addIceCandidate(c); } catch {}
  }
}

async function handleIncomingSignal(remoteId, p) {
  const peer = rtcPeers.get(remoteId);
  if (!peer) return;
  const pc = peer.pc;
  const theirOffer = p.offers && p.offers[uid];
  const theirAnswer = p.answers && p.answers[uid];
  try {
    if (theirOffer && !peer.offerer && peer.appliedRemote !== theirOffer.sdp && !peer.busy) {
      peer.busy = true;
      await pc.setRemoteDescription(theirOffer);
      peer.appliedRemote = theirOffer.sdp;
      await flushPendingIce(peer);
      await pc.setLocalDescription(await pc.createAnswer());
      outgoingAnswers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
      await publishPresence(true);
      await waitIceGathering(pc);
      outgoingAnswers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
      await publishPresence(true);
      peer.busy = false;
    }
    if (theirAnswer && peer.offerer && peer.appliedRemote !== theirAnswer.sdp && pc.signalingState === "have-local-offer") {
      await pc.setRemoteDescription(theirAnswer);
      peer.appliedRemote = theirAnswer.sdp;
      await flushPendingIce(peer);
    }
    await applyRemoteIce(remoteId, p);
  } catch (err) {
    peer.busy = false;
    console.warn("RTC signal failed", err);
  }
}

function describeCloudPlayers() {
  const others = [];
  for (const [id, p] of cloudPresence) {
    const obj = remotePlayers.get(id);
    const tracking = obj && obj.visible && obj.userData.tracking;
    const peer = rtcPeers.get(id);
    const linking = peer && (!peer.channel || peer.channel.readyState !== "open");
    others.push((resolvePlayerName(id, p) || "Player") + (tracking ? "" : linking ? " (linking…)" : " (not tracking)"));
  }
  if (!others.length) {
    playerListEl.textContent = renderer.xr.isPresenting
      ? "Broadcasting your pose · no other players yet."
      : "No other players yet. On another XR device, enter the room, then walk.";
    return;
  }
  playerListEl.textContent = others.join(" · ");
}

function applyCloudPresence(docs) {
  const seen = new Set();
  for (const d of docs) {
    if (d.id === uid) continue;
    const p = d.data;
    if (isPlayerStale(p)) continue;
    seen.add(d.id);
    cloudPresence.set(d.id, p);
    ensureRtcPeer(d.id);
    handleIncomingSignal(d.id, p);
    const peer = rtcPeers.get(d.id);
    const live = peer && peer.channel && peer.channel.readyState === "open";
    if (!live) updateRemotePlayer(d.id, p);
    else setRemotePlayerName(remotePlayers.get(d.id), resolvePlayerName(d.id, p));
  }
  for (const id of [...cloudPresence.keys()]) {
    if (!seen.has(id)) cloudPresence.delete(id);
  }
  for (const id of [...rtcPeers.keys()]) {
    if (!seen.has(id)) closeRtcPeer(id);
  }
  for (const [id] of remotePlayers) {
    if (!seen.has(id)) removeRemote(id);
  }
  otherPlayerCount = seen.size;
  describeCloudPlayers();
}

async function publishPresence(force = false) {
  if (connectionMode !== "cloud" || !db || !uid || !roomId) return;
  const now = performance.now();
  if (!force && now - lastPresenceSend < CLOUD_HEARTBEAT_MS) return;
  lastPresenceSend = now;
  const data = {
    name: playerName,
    presenting: renderer.xr.isPresenting,
    calibrated,
    updatedAt: serverTimestamp(),
    offers: outgoingOffers,
    answers: outgoingAnswers,
    ice: outgoingIce
  };
  fillHeadPose(data);
  if (renderer.xr.isPresenting && lastHandsPayload) data.hands = lastHandsPayload;
  await setDoc(doc(db, "rooms", roomId, "players", uid), data, { merge: true });
}

async function publishCloudPoseFallback() {
  if (connectionMode !== "cloud" || !db || !uid || !roomId) return;
  if (!renderer.xr.isPresenting || rtcOpenCount() > 0) return;
  const now = performance.now();
  if (now - lastPoseFallbackSend < CLOUD_POSE_MS) return;
  const data = { name: playerName, presenting: true, updatedAt: serverTimestamp() };
  if (!fillHeadPose(data)) return;
  data.hands = lastHandsPayload || captureHands(lastXRFrame);
  lastPoseFallbackSend = now;
  await setDoc(doc(db, "rooms", roomId, "players", uid), data, { merge: true });
}

function closeAllRtc() {
  for (const id of [...rtcPeers.keys()]) closeRtcPeer(id);
  cloudPresence.clear();
  for (const key of Object.keys(outgoingOffers)) delete outgoingOffers[key];
  for (const key of Object.keys(outgoingAnswers)) delete outgoingAnswers[key];
  for (const key of Object.keys(outgoingIce)) delete outgoingIce[key];
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
  if (objectsUnsub) {
    objectsUnsub();
    objectsUnsub = null;
  }
  if (sharedRetryTimer) {
    clearInterval(sharedRetryTimer);
    sharedRetryTimer = null;
  }
  sessionStarted = false;
  otherPlayerCount = 0;
  clearSharedObjects();
  closeLocalSocket();
  closeAllRtc();
  if (connectionMode === "cloud" && uid && roomId && db) {
    deleteDoc(doc(db, "rooms", roomId, "players", uid)).catch(() => {});
  }
  if (reload) location.reload();
}

function describePlayers(docs) {
  const others = [];
  for (const d of docs) {
    if (d.id === uid) continue;
    const p = d.data;
    if (isPlayerStale(p)) continue;
    const tracking = typeof p.x === "number" && p.presenting;
    others.push((resolvePlayerName(d.id, p) || "Player") + (tracking ? "" : " (not tracking)"));
  }
  if (!others.length) {
    playerListEl.textContent = renderer.xr.isPresenting
      ? "Broadcasting your pose · no other players yet."
      : "No other players yet. On another XR device, enter the room, then walk.";
    return;
  }
  playerListEl.textContent = others.join(" · ");
}

function applyRemoteDocs(docs) {
  const seen = new Set();
  for (const d of docs) {
    if (d.id === uid) continue;
    const p = d.data;
    if (isPlayerStale(p)) continue;
    seen.add(d.id);
    updateRemotePlayer(d.id, p);
    const obj = remotePlayers.get(d.id);
    if (obj) obj.userData.lastSeen = playerUpdatedAt(p) || Date.now();
  }
  for (const [id] of remotePlayers) {
    if (!seen.has(id)) removeRemote(id);
  }
  describePlayers(docs);
  const nextCount = seen.size;
  const gainedPeer = otherPlayerCount === 0 && nextCount > 0;
  otherPlayerCount = nextCount;
  if (gainedPeer) publishPlayer(true).catch(console.error);
}

function applyLocalPeerMap() {
  applyRemoteDocs(Object.entries(localPeerMap).map(([id, data]) => ({ id, data })));
}

function newLocalId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "p-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function connectLocalRoom() {
  return new Promise((resolve, reject) => {
    const proto = location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${proto}//${location.host}/ws`);
    localWs = ws;
    localPeerMap = {};
    uid = newLocalId();
    let settled = false;
    const fail = err => {
      if (settled) return;
      settled = true;
      reject(err);
    };
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", room: roomId, id: uid, name: playerName }));
    };
    ws.onmessage = ev => {
      let msg;
      try { msg = JSON.parse(ev.data); } catch { return; }
      if (!msg || !msg.type) return;
      if (msg.type === "peers") {
        localPeerMap = msg.peers && typeof msg.peers === "object" ? msg.peers : {};
        applyLocalPeerMap();
        if (Array.isArray(msg.objects)) {
          for (const meta of msg.objects) applySharedMeta(meta);
        }
        if (!settled) {
          settled = true;
          resolve();
        }
        return;
      }
      if (msg.type === "object") {
        handleSharedMessage(msg);
        return;
      }
      if (msg.type === "file-meta" || msg.type === "file-chunk" || msg.type === "file-request") {
        handleRtcPayload(uid, msg);
        return;
      }
      if (msg.type === "objects" && Array.isArray(msg.objects)) {
        for (const meta of msg.objects) applySharedMeta(meta);
        return;
      }
      if (msg.type === "state" && msg.id && msg.data) {
        localPeerMap[msg.id] = msg.data;
        applyLocalPeerMap();
        return;
      }
      if (msg.type === "leave" && msg.id) {
        delete localPeerMap[msg.id];
        applyLocalPeerMap();
        return;
      }
      if (msg.type === "error") {
        fail(new Error(msg.message || "Local room error."));
      }
    };
    ws.onerror = () => fail(new Error("Local network connection failed."));
    ws.onclose = () => {
      if (!settled) {
        fail(new Error("Local network connection closed."));
        return;
      }
      if (sessionStarted) statusEl.textContent = "Local connection lost";
    };
  });
}

async function loadFirebase() {
  if (initializeApp) return;
  const [appMod, authMod, fsMod] = await Promise.all([
    import(`${FB_BASE}/firebase-app.js`),
    import(`${FB_BASE}/firebase-auth.js`),
    import(`${FB_BASE}/firebase-firestore.js`)
  ]);
  initializeApp = appMod.initializeApp;
  getApps = appMod.getApps;
  getApp = appMod.getApp;
  initializeAuth = authMod.initializeAuth;
  getAuth = authMod.getAuth;
  inMemoryPersistence = authMod.inMemoryPersistence;
  signInAnonymously = authMod.signInAnonymously;
  getFirestore = fsMod.getFirestore;
  doc = fsMod.doc;
  setDoc = fsMod.setDoc;
  onSnapshot = fsMod.onSnapshot;
  collection = fsMod.collection;
  getDocs = fsMod.getDocs;
  serverTimestamp = fsMod.serverTimestamp;
  deleteDoc = fsMod.deleteDoc;
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
  connectionMode = selectedConnection();

  const xrPromise = navigator.xr ? beginXRSessionFromGesture() : Promise.resolve(null);
  setupXR();
  const xrAttach = xrPromise.then(session => session && enterXRSession(session)).catch(err => {
    console.warn("XR session not started", err);
    return null;
  });

  try {
    if (connectionMode === "local") {
      lanReady = await probeLanServer();
      if (!lanReady) {
        throw new Error("Local network needs the LAN server. Run python server.py in the NameTagsXR folder and open the HTTPS URL it prints on every device.");
      }
      await connectLocalRoom();
    } else {
      await loadFirebase();
      startFirebase(firebaseConfig);
      const cred = await signInAnonymously(auth);
      uid = cred.user.uid;

      roomRef = doc(db, "rooms", roomId);
      await setDoc(roomRef, {
        updatedAt: serverTimestamp(),
        lastJoiner: uid
      }, { merge: true });

      playersUnsub = onSnapshot(collection(db, "rooms", roomId, "players"), snap => {
        const docs = [];
        snap.forEach(d => docs.push({ id: d.id, data: d.data() }));
        applyCloudPresence(docs);
        pruneStalePlayers(snap);
      });
      objectsUnsub = onSnapshot(collection(db, "rooms", roomId, "objects"), snap => {
        snap.docChanges().forEach(ch => {
          if (ch.type === "removed") {
            handleSharedMessage({ action: "remove", object: { id: ch.doc.id } });
            return;
          }
          applySharedMeta({ id: ch.doc.id, ...ch.doc.data() });
        });
      });
    }

    setup.classList.add("hidden");
    hud.classList.remove("hidden");
    roomLabel.textContent = connectionMode === "local"
      ? `Room: ${roomId} · local`
      : `Room: ${roomId} · p2p`;
    sessionStarted = true;
    if (!sharedRetryTimer) {
      sharedRetryTimer = setInterval(() => {
        if (!sessionStarted) return;
        for (const rec of sharedObjects.values()) {
          if (rec.ready || rec.unreadable || !rec.fromNetwork || rec.bytes) continue;
          requestSharedFile(rec.id);
        }
      }, 4000);
    }
    statusEl.textContent = "Connected";
    syncCalibrationUi();
    pruneTimer = setInterval(() => pruneStalePlayers(), connectionMode === "cloud" ? CLOUD_HEARTBEAT_MS : HEARTBEAT_MS);
    await publishPlayer(true);
    try {
      await xrAttach;
    } catch (err) {
      console.warn("XR session not started", err);
    }
    syncCalibrationUi();
    if (renderer.xr.isPresenting) {
      statusEl.textContent = "Tracking pose · walking should appear on other devices";
    } else {
      statusEl.textContent = "Connected";
    }
  } catch (e) {
    console.error(e);
    if (currentXRSession) currentXRSession.end();
    closeLocalSocket();
    closeAllRtc();
    setupError.textContent = connectionMode === "local"
      ? (e && e.message) || "Local network connection failed."
      : firebaseErrorMessage(e);
    startButton.disabled = false;
    startButton.textContent = "Enter Room";
    updateConnectionHint();
  }
}

function syncCalibrationUi() {
  const xr = renderer.xr.isPresenting;
  const ui = document.getElementById("xrCalibrateUi");
  if (ui) ui.classList.toggle("hidden", !xr);
  redDot.visible = blueDot.visible = xr;
  doneButton.visible = xr && !markersCollapsed;
  const s = markersCollapsed ? DOT_SCALE_MINI : 1;
  redDot.scale.setScalar(s);
  blueDot.scale.setScalar(s);
  setGizmoChromeVisible(redDot, !markersCollapsed);
  setGizmoChromeVisible(blueDot, !markersCollapsed);
}

function setGizmoChromeVisible(gizmo, show) {
  if (gizmo.userData.label) gizmo.userData.label.visible = show;
  if (gizmo.userData.axisLetters) {
    for (const letter of gizmo.userData.axisLetters) letter.visible = show;
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
  syncCalibrationUi();
  syncPcGizmos();
  publishPlayer(true).catch(console.error);
}

function onXRSessionEnded() {
  currentXRSession = null;
  if (arButton) arButton.textContent = xrSupportedMode ? "START XR" : "XR NOT SUPPORTED";
  controls.enabled = true;
  setPassthrough(false);
  statusEl.textContent = "XR stopped · pose is no longer broadcasting";
  syncCalibrationUi();
  syncPcGizmos();
  publishPlayer(true).catch(() => {});
}

function setupXR() {
  if (xrConfigured) return;
  xrConfigured = true;
  if (lanReady) handModelFactory.setPath("/cdn/hands/");

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
      else statusEl.textContent = "No XR headset available on this device";
    } catch (err) {
      console.warn(err);
      statusEl.textContent = "No XR headset available on this device";
    }
  };

  if (!navigator.xr || (xrDetectDone && !xrSupportedMode)) {
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
    const handModel = handModelFactory.createHandModel(hand, "mesh");
    hand.userData.model = handModel;
    hand.add(handModel);
    hand.addEventListener("connected", e => {
      hand.userData.handedness = e.data.handedness;
      setLocalHandMeshVisible(hand, !localHandLost[e.data.handedness]);
    });
    hand.addEventListener("disconnected", () => {
      const side = hand.userData.handedness;
      if (side === "left" || side === "right") localHandLost[side] = true;
      hand.userData.handedness = null;
      setLocalHandMeshVisible(hand, false);
    });
    scene.add(hand);
    localHands.push(hand);

    const grabFromController = { target: controller };
    hand.addEventListener("pinchstart", () => onSelectStart(grabFromController));
    hand.addEventListener("pinchend", () => onSelectEnd(grabFromController));
  }

  controllers.forEach(c => {
    const ray = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1)]),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .85 })
    );
    ray.scale.z = GRAB_FAR;
    c.add(ray);
    c.userData.rayLine = ray;
  });

  renderer.setAnimationLoop(render);
}

function pointerFrom(controller, origin, dir) {
  origin.setFromMatrixPosition(controller.matrixWorld);
  tempMatrix.identity().extractRotation(controller.matrixWorld);
  dir.set(0, 0, -1).applyMatrix4(tempMatrix);
}

function rayHitSphere(origin, dir, center, radius, maxDist) {
  _oc.copy(origin).sub(center);
  const b = _oc.dot(dir);
  const c = _oc.dot(_oc) - radius * radius;
  const disc = b * b - c;
  if (disc < 0) return null;
  const s = Math.sqrt(disc);
  let t = -b - s;
  if (t < .03) t = -b + s;
  if (t < .03 || t > maxDist) return null;
  return t;
}

function modelExt(name) {
  const m = /\.(glb|gltf|obj|stl|fbx)$/i.exec(name || "");
  return m ? m[1].toLowerCase() : "";
}

function newSharedId() {
  return crypto.randomUUID ? crypto.randomUUID() : "o-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function asArrayBuffer(bytes) {
  if (bytes instanceof ArrayBuffer) return bytes;
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

function bytesToB64(u8) {
  let s = "";
  const n = u8.length;
  for (let i = 0; i < n; i++) s += String.fromCharCode(u8[i]);
  return btoa(s);
}

function b64ToBytes(b64) {
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8;
}

function defaultRoomDropPos() {
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  dir.y = 0;
  if (dir.lengthSq() < 1e-6) dir.set(0, 0, -1);
  else dir.normalize();
  const p = camera.position.clone().addScaledVector(dir, 2.2);
  p.y = .7;
  return localToRoom(p);
}

function sharedPayload(rec) {
  return {
    id: rec.id,
    name: rec.name,
    ext: rec.ext,
    x: rec.roomPos.x,
    y: rec.roomPos.y,
    z: rec.roomPos.z,
    heldBy: rec.heldBy || "",
    seq: rec.seq || 0,
    size: rec.bytes ? rec.bytes.byteLength : rec.size || 0,
    fitted: !!rec.fitted,
    chunkCount: rec.chunkCount || 0
  };
}

function makePlaceholder() {
  return new THREE.Mesh(
    new THREE.BoxGeometry(.28, .28, .28),
    new THREE.MeshBasicMaterial({ color: 0x88c4ff, wireframe: true })
  );
}

function fitSharedModel(object) {
  object.updateMatrixWorld(true);
  _fitBox.setFromObject(object);
  if (_fitBox.isEmpty()) return;
  _fitBox.getSize(_fitSize);
  const max = Math.max(_fitSize.x, _fitSize.y, _fitSize.z, 1e-5);
  object.scale.multiplyScalar(MODEL_FIT / max);
  object.updateMatrixWorld(true);
  _fitBox.setFromObject(object);
  _fitBox.getCenter(_fitCenter);
  object.position.sub(_fitCenter);
}

function cacheSharedRadius(rec) {
  if (!rec.root) return;
  rec.root.updateMatrixWorld(true);
  _fitBox.setFromObject(rec.root);
  if (_fitBox.isEmpty()) {
    rec.radius = .18;
    return;
  }
  rec.radius = Math.max(.08, _fitBox.getSize(_fitSize).length() * .5);
}

function ensureShared(id, meta = {}, fromNetwork = false) {
  let rec = sharedObjects.get(id);
  if (rec) {
    if (fromNetwork) rec.fromNetwork = true;
    return rec;
  }
  rec = {
    id,
    name: meta.name || "model",
    ext: meta.ext || "",
    roomPos: new THREE.Vector3(
      typeof meta.x === "number" ? meta.x : 0,
      typeof meta.y === "number" ? meta.y : .7,
      typeof meta.z === "number" ? meta.z : 0
    ),
    root: new THREE.Group(),
    bytes: null,
    ready: false,
    heldBy: meta.heldBy || "",
    seq: meta.seq || 0,
    size: meta.size || 0,
    fitted: !!meta.fitted,
    fromNetwork,
    radius: .2
  };
  rec.root.userData.sharedId = id;
  rec.root.position.copy(roomToLocal(rec.roomPos));
  rec.placeholder = makePlaceholder();
  rec.root.add(rec.placeholder);
  scene.add(rec.root);
  sharedObjects.set(id, rec);
  return rec;
}

function applySharedTransform(rec, meta, force) {
  if (!rec || !meta) return;
  const seq = typeof meta.seq === "number" ? meta.seq : rec.seq;
  if (!force && rec.heldBy === uid) return;
  if (!force && seq < rec.seq) return;
  rec.seq = seq;
  if (typeof meta.x === "number") rec.roomPos.set(meta.x, meta.y, meta.z);
  rec.heldBy = meta.heldBy || "";
  rec.root.position.copy(roomToLocal(rec.roomPos));
}

function markSharedMeshes(root, wrapper) {
  root.traverse(o => {
    if (!o.isMesh) return;
    o.frustumCulled = false;
    o.userData.sharedRoot = wrapper;
    if (Array.isArray(o.material)) {
      for (const mat of o.material) {
        if (mat) mat.side = THREE.DoubleSide;
      }
    } else if (o.material) {
      o.material.side = THREE.DoubleSide;
    }
  });
}

function sniffModelExt(bytes, fallback) {
  if (bytes && bytes.length >= 4) {
    if (bytes[0] === 0x4E && bytes[1] === 0x54 && bytes[2] === 0x58 && bytes[3] === 0x31) return "ntx";
    if (bytes[0] === 0x67 && bytes[1] === 0x6C && bytes[2] === 0x54 && bytes[3] === 0x46) return "glb";
  }
  return fallback;
}

function meshColor(mat) {
  if (Array.isArray(mat)) mat = mat[0];
  if (mat && mat.color && typeof mat.color.getHex === "function") return mat.color.getHex();
  return 0xc5cdd6;
}

function packSharedGeometry(object) {
  object.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(object.matrixWorld).invert();
  const world = new THREE.Matrix4();
  const v = new THREE.Vector3();
  const parts = [];
  object.traverse(o => {
    if (!o.isMesh || !o.geometry) return;
    const attr = o.geometry.attributes.position;
    if (!attr || !attr.count) return;
    world.multiplyMatrices(inv, o.matrixWorld);
    const pos = new Float32Array(attr.count * 3);
    for (let i = 0; i < attr.count; i++) {
      v.fromBufferAttribute(attr, i).applyMatrix4(world);
      pos[i * 3] = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;
    }
    const idx = o.geometry.index && o.geometry.index.count
      ? Uint32Array.from(o.geometry.index.array)
      : null;
    parts.push({ pos, idx, color: meshColor(o.material) });
  });
  if (!parts.length) return null;
  let size = 8;
  for (const p of parts) size += 16 + p.pos.byteLength + (p.idx ? p.idx.byteLength : 0);
  const buf = new ArrayBuffer(size);
  const view = new DataView(buf);
  const out = new Uint8Array(buf);
  let o = 0;
  out[0] = 0x4E; out[1] = 0x54; out[2] = 0x58; out[3] = 0x31;
  o = 4;
  view.setUint16(o, 1, true); o += 2;
  view.setUint16(o, parts.length, true); o += 2;
  for (const p of parts) {
    view.setUint32(o, p.color >>> 0, true); o += 4;
    view.setUint32(o, p.pos.length / 3, true); o += 4;
    view.setUint32(o, p.idx ? p.idx.length : 0, true); o += 4;
    view.setUint32(o, 0, true); o += 4;
    out.set(new Uint8Array(p.pos.buffer, p.pos.byteOffset, p.pos.byteLength), o);
    o += p.pos.byteLength;
    if (p.idx && p.idx.length) {
      out.set(new Uint8Array(p.idx.buffer, p.idx.byteOffset, p.idx.byteLength), o);
      o += p.idx.byteLength;
    }
  }
  return out.subarray(0, o);
}

function unpackSharedGeometry(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (bytes[0] !== 0x4E || bytes[1] !== 0x54 || bytes[2] !== 0x58 || bytes[3] !== 0x31) {
    throw new Error("not a packed mesh");
  }
  let o = 4;
  view.getUint16(o, true); o += 2;
  const n = view.getUint16(o, true); o += 2;
  const group = new THREE.Group();
  for (let p = 0; p < n; p++) {
    const color = view.getUint32(o, true); o += 4;
    const vtx = view.getUint32(o, true); o += 4;
    const idxn = view.getUint32(o, true); o += 4;
    o += 4;
    const pos = new Float32Array(vtx * 3);
    for (let i = 0; i < pos.length; i++) {
      pos[i] = view.getFloat32(o, true);
      o += 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    if (idxn) {
      const idx = [];
      for (let i = 0; i < idxn; i++) {
        idx.push(view.getUint32(o, true));
        o += 4;
      }
      geo.setIndex(idx);
    }
    geo.computeVertexNormals();
    group.add(new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    ));
  }
  if (!group.children.length) throw new Error("packed mesh was empty");
  return group;
}

function meshOnlyClone(object) {
  const group = new THREE.Group();
  object.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(object.matrixWorld).invert();
  const local = new THREE.Matrix4();
  object.traverse(o => {
    if (!o.isMesh || !o.geometry) return;
    const mesh = new THREE.Mesh(o.geometry, o.material);
    local.multiplyMatrices(inv, o.matrixWorld);
    local.decompose(mesh.position, mesh.quaternion, mesh.scale);
    group.add(mesh);
  });
  return group;
}

function exportSharedGlb(object) {
  return new Promise((resolve, reject) => {
    const clone = meshOnlyClone(object);
    if (!clone.children.length) {
      reject(new Error("no mesh to export"));
      return;
    }
    gltfExporter.parse(clone, result => {
      if (result instanceof ArrayBuffer) resolve(result);
      else reject(new Error("GLB export did not return binary"));
    }, reject, { binary: true, embedImages: true });
  });
}

function loadSharedMesh(rec) {
  if (rec.loadPromise) return rec.loadPromise;
  rec.loadPromise = new Promise((resolve, reject) => {
    if (rec.ready && rec.mesh) {
      resolve(rec.mesh);
      return;
    }
    if (!rec.bytes) {
      rec.loadPromise = null;
      reject(new Error("no bytes"));
      return;
    }
    const ext = sniffModelExt(rec.bytes, rec.ext || modelExt(rec.name));
    rec.ext = ext;
    const onReady = object => {
      if (!object) {
        rec.loadPromise = null;
        reject(new Error("empty model"));
        return;
      }
      if (!rec.fitted) fitSharedModel(object);
      markSharedMeshes(object, rec.root);
      if (rec.placeholder) {
        rec.root.remove(rec.placeholder);
        rec.placeholder.geometry?.dispose();
        rec.placeholder.material?.dispose();
        rec.placeholder = null;
      }
      rec.root.add(object);
      rec.mesh = object;
      rec.ready = true;
      cacheSharedRadius(rec);
      resolve(object);
    };
    const fail = err => {
      rec.loadPromise = null;
      console.warn("Shared model failed", rec.name, ext, err);
      if (rec.fromNetwork && rec.root) rec.root.visible = false;
      statusEl.textContent = rec.fromNetwork
        ? "Waiting for a rebuild of " + (rec.name || "model") + " — drop it again on the PC"
        : "Could not load " + (rec.name || "model");
      reject(err || new Error("parse failed"));
    };
    try {
      if (ext === "ntx") {
        onReady(unpackSharedGeometry(rec.bytes));
        return;
      }
      if (rec.fromNetwork && (ext === "fbx" || ext === "gltf")) {
        rec.bytes = null;
        rec.unreadable = true;
        fail(new Error("raw " + ext + " cannot be parsed on headset"));
        return;
      }
      if (ext === "glb" || ext === "gltf") {
        gltfLoader.parse(asArrayBuffer(rec.bytes), "", gltf => {
          onReady(gltf.scene || (gltf.scenes && gltf.scenes[0]));
        }, fail);
        return;
      }
      if (ext === "obj") {
        onReady(objLoader.parse(new TextDecoder().decode(rec.bytes)));
        return;
      }
      if (ext === "stl") {
        const geo = stlLoader.parse(asArrayBuffer(rec.bytes));
        geo.computeVertexNormals();
        onReady(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xcfd6de, side: THREE.DoubleSide })));
        return;
      }
      if (ext === "fbx") {
        onReady(fbxLoader.parse(asArrayBuffer(rec.bytes), ""));
        return;
      }
      fail(new Error("unsupported"));
    } catch (err) {
      fail(err);
    }
  });
  return rec.loadPromise;
}

async function prepareSharedBytes(rec) {
  if (!rec.mesh) throw new Error("model has no mesh");
  const packed = packSharedGeometry(rec.mesh);
  if (packed && packed.byteLength > 0 && packed.byteLength <= MAX_MODEL_BYTES) {
    rec.bytes = packed;
    rec.ext = "ntx";
    rec.size = packed.byteLength;
    rec.fitted = true;
    return;
  }
  try {
    const glb = await exportSharedGlb(rec.mesh);
    if (glb && glb.byteLength > 0 && glb.byteLength <= MAX_MODEL_BYTES) {
      rec.bytes = new Uint8Array(glb);
      rec.ext = "glb";
      rec.size = rec.bytes.byteLength;
      rec.fitted = true;
      return;
    }
  } catch (err) {
    console.warn("GLB export failed", err);
  }
  throw new Error("could not pack model for headset");
}

function relocalizeSharedObjects() {
  for (const rec of sharedObjects.values()) {
    if (!rec.root) continue;
    if (rec.heldBy === uid) rec.roomPos.copy(localToRoom(rec.root.position));
    else rec.root.position.copy(roomToLocal(rec.roomPos));
  }
}

function clearSharedObjects() {
  deselectShared();
  for (const rec of sharedObjects.values()) {
    scene.remove(rec.root);
  }
  sharedObjects.clear();
  incomingFiles.clear();
}

function removeSharedById(id) {
  const rec = sharedObjects.get(id);
  if (!rec) return false;
  if (selectedShared === rec.root) deselectShared();
  scene.remove(rec.root);
  sharedObjects.delete(id);
  incomingFiles.delete(id);
  sendSharedMessage("remove", rec, true);
  return true;
}

function removeAllShared() {
  const ids = [...sharedObjects.keys()];
  for (const id of ids) removeSharedById(id);
  statusEl.textContent = ids.length ? "Cleared shared models" : "No models to clear";
}

function selectShared(root) {
  selectedShared = root;
  syncPcGizmos();
}

function deselectShared() {
  selectedShared = null;
  syncPcGizmos();
}

function syncPcGizmos() {
  const show = sessionStarted && !renderer.xr.isPresenting && selectedShared;
  transformControls.enabled = !!show;
  transformHelper.visible = !!show;
  if (show) transformControls.attach(selectedShared);
  else transformControls.detach();
}

function sendSharedMessage(action, rec, persist) {
  const object = sharedPayload(rec);
  if (connectionMode === "local") {
    if (localWs && localWs.readyState === WebSocket.OPEN) {
      localWs.send(JSON.stringify({ type: "object", action, object }));
    }
    return;
  }
  rtcSend({ type: "object", action, object });
  if (persist && db && roomId) {
    const ref = doc(db, "rooms", roomId, "objects", rec.id);
    if (action === "remove") deleteDoc(ref).catch(err => console.warn("object delete failed", err));
    else {
      setDoc(ref, { ...object, updatedAt: serverTimestamp() })
        .catch(err => console.warn("object persist failed", err));
    }
  }
}

function publishSharedMove(root, force) {
  const rec = sharedObjects.get(root && root.userData.sharedId);
  if (!rec) return;
  rec.roomPos.copy(localToRoom(root.position));
  rec.heldBy = uid;
  rec.seq = (rec.seq || 0) + 1;
  const now = performance.now();
  if (!force && now - lastObjectSend < POSE_MS) return;
  lastObjectSend = now;
  sendSharedMessage("move", rec, force);
}

function beginSharedHold(root) {
  const rec = sharedObjects.get(root.userData.sharedId);
  if (!rec) return;
  rec.heldBy = uid;
  sendSharedMessage("hold", rec, false);
}

function endSharedHold(root) {
  const rec = sharedObjects.get(root && root.userData.sharedId);
  if (!rec) return;
  rec.roomPos.copy(localToRoom(root.position));
  rec.seq = (rec.seq || 0) + 1;
  rec.heldBy = "";
  lastObjectSend = 0;
  sendSharedMessage("move", rec, true);
}

function handleSharedMessage(msg) {
  if (!msg || !msg.object || !msg.object.id) return;
  if (msg.action === "remove") {
    const rec = sharedObjects.get(msg.object.id);
    if (!rec) return;
    if (selectedShared === rec.root) deselectShared();
    scene.remove(rec.root);
    sharedObjects.delete(msg.object.id);
    incomingFiles.delete(msg.object.id);
    return;
  }
  const rec = ensureShared(msg.object.id, msg.object, true);
  if (msg.object.fitted) rec.fitted = true;
  if (msg.object.ext) rec.ext = msg.object.ext;
  applySharedTransform(rec, msg.object, false);
  if (!rec.ready && !rec.bytes) requestSharedFile(rec.id);
}

function applySharedMeta(meta) {
  if (!meta || !meta.id) return;
  handleSharedMessage({ action: "add", object: meta });
}

function requestSharedFile(id) {
  if (connectionMode === "local") {
    fetchLocalModel(id);
    if (localWs && localWs.readyState === WebSocket.OPEN) {
      try { localWs.send(JSON.stringify({ type: "file-request", id })); } catch {}
    }
    return;
  }
  rtcSend({ type: "file-request", id });
  fetchCloudChunks(id).catch(err => console.warn("cloud chunks failed", err));
}

async function publishCloudMesh(rec) {
  if (!db || !roomId || !rec.bytes) return;
  const chunk = 500 * 1024;
  const bytes = rec.bytes instanceof Uint8Array ? rec.bytes : new Uint8Array(rec.bytes);
  const total = Math.max(1, Math.ceil(bytes.byteLength / chunk));
  rec.chunkCount = total;
  await setDoc(doc(db, "rooms", roomId, "objects", rec.id), {
    ...sharedPayload(rec),
    chunkCount: total,
    updatedAt: serverTimestamp()
  });
  for (let i = 0; i < total; i++) {
    await setDoc(doc(db, "rooms", roomId, "objects", rec.id, "chunks", String(i)), {
      data: bytesToB64(bytes.subarray(i * chunk, (i + 1) * chunk))
    });
  }
}

async function fetchCloudChunks(id) {
  const rec = sharedObjects.get(id);
  if (!rec || rec.ready || rec.bytes || rec.fetchingCloud || !db || !roomId) return;
  rec.fetchingCloud = true;
  try {
    const snap = await getDocs(collection(db, "rooms", roomId, "objects", id, "chunks"));
    if (snap.empty) return;
    const parts = [];
    snap.forEach(d => {
      const data = d.data();
      if (data && typeof data.data === "string") parts.push({ i: Number(d.id), b64: data.data });
    });
    parts.sort((a, b) => a.i - b.i);
    if (!parts.length) return;
    let size = 0;
    const chunks = parts.map(p => b64ToBytes(p.b64));
    for (const c of chunks) size += c.length;
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const c of chunks) {
      bytes.set(c, offset);
      offset += c.length;
    }
    rec.bytes = bytes;
    rec.ext = sniffModelExt(bytes, rec.ext);
    rec.loadPromise = null;
    rec.fromNetwork = true;
    statusEl.textContent = "Loading " + (rec.name || "model") + "…";
    await loadSharedMesh(rec);
  } finally {
    rec.fetchingCloud = false;
  }
}

async function fetchLocalModel(id) {
  const rec = sharedObjects.get(id);
  if (!rec || rec.bytes || !roomId) return;
  for (let i = 0; i < 8; i++) {
    try {
      const res = await fetch(`/models/${encodeURIComponent(roomId)}/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("missing");
      rec.bytes = new Uint8Array(await res.arrayBuffer());
      rec.ext = sniffModelExt(rec.bytes, rec.ext);
      rec.loadPromise = null;
      statusEl.textContent = "Loading " + (rec.name || "model") + "…";
      await loadSharedMesh(rec);
      return;
    } catch {
      await new Promise(r => setTimeout(r, 250 * (i + 1)));
    }
  }
  statusEl.textContent = "Waiting for " + (rec.name || "model") + " from the host";
}

function rtcSend(msg, remoteId) {
  const raw = JSON.stringify(msg);
  if (remoteId) {
    const peer = rtcPeers.get(remoteId);
    if (peer && peer.channel && peer.channel.readyState === "open") {
      try { peer.channel.send(raw); } catch {}
    }
    return;
  }
  for (const peer of rtcPeers.values()) {
    if (peer.channel && peer.channel.readyState === "open") {
      try { peer.channel.send(raw); } catch {}
    }
  }
}

async function rtcWaitDrain(channel) {
  while (channel && channel.readyState === "open" && channel.bufferedAmount > 512 * 1024) {
    await new Promise(r => setTimeout(r, 25));
  }
}

async function rtcSendFileTo(remoteId, rec) {
  if (!rec.bytes) return;
  const bytes = rec.bytes instanceof Uint8Array ? rec.bytes : new Uint8Array(rec.bytes);
  const total = Math.max(1, Math.ceil(bytes.byteLength / FILE_CHUNK));
  rtcSend({
    type: "file-meta",
    id: rec.id,
    name: rec.name,
    ext: rec.ext,
    size: bytes.byteLength,
    total
  }, remoteId);
  for (let i = 0; i < total; i++) {
    const peer = remoteId ? rtcPeers.get(remoteId) : null;
    const channel = remoteId ? peer && peer.channel : null;
    if (remoteId && (!channel || channel.readyState !== "open")) return;
    if (channel) await rtcWaitDrain(channel);
    else {
      for (const p of rtcPeers.values()) {
        if (p.channel && p.channel.readyState === "open") await rtcWaitDrain(p.channel);
      }
    }
    rtcSend({
      type: "file-chunk",
      id: rec.id,
      i,
      data: bytesToB64(bytes.subarray(i * FILE_CHUNK, (i + 1) * FILE_CHUNK))
    }, remoteId);
    if (i % 3 === 2) await new Promise(r => setTimeout(r, 0));
  }
}

async function syncSharedToPeer(remoteId) {
  for (const rec of sharedObjects.values()) {
    rtcSend({ type: "object", action: "add", object: sharedPayload(rec) }, remoteId);
    if (rec.bytes) await rtcSendFileTo(remoteId, rec);
  }
}

function handleRtcPayload(remoteId, msg) {
  if (msg.type === "object") {
    handleSharedMessage(msg);
    return;
  }
  if (msg.type === "file-request" && msg.id) {
    const rec = sharedObjects.get(msg.id);
    if (rec && rec.bytes && !rec.fromNetwork) {
      if (connectionMode === "local") sendLocalFile(rec);
      else rtcSendFileTo(remoteId, rec);
    }
    return;
  }
  if (msg.type === "file-meta" && msg.id) {
    incomingFiles.set(msg.id, {
      name: msg.name,
      ext: msg.ext,
      size: msg.size || 0,
      total: msg.total || 1,
      chunks: []
    });
    ensureShared(msg.id, { name: msg.name, ext: msg.ext, size: msg.size }, true);
    return;
  }
  if (msg.type === "file-chunk" && msg.id && typeof msg.data === "string") {
    const incoming = incomingFiles.get(msg.id) || { chunks: [], total: 1, name: "model", ext: "" };
    incoming.chunks[msg.i] = b64ToBytes(msg.data);
    incomingFiles.set(msg.id, incoming);
    if (incoming.chunks.filter(Boolean).length < incoming.total) return;
    let size = 0;
    for (const part of incoming.chunks) size += part.length;
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const part of incoming.chunks) {
      bytes.set(part, offset);
      offset += part.length;
    }
    incomingFiles.delete(msg.id);
    const rec = ensureShared(msg.id, { name: incoming.name, ext: incoming.ext, size }, true);
    if (rec.ready) return;
    rec.bytes = bytes;
    rec.ext = sniffModelExt(bytes, rec.ext || incoming.ext);
    rec.name = rec.name || incoming.name;
    rec.loadPromise = null;
    loadSharedMesh(rec).catch(() => {});
  }
}

async function sendLocalFile(rec) {
  if (!localWs || localWs.readyState !== WebSocket.OPEN || !rec.bytes) return;
  const bytes = rec.bytes instanceof Uint8Array ? rec.bytes : new Uint8Array(rec.bytes);
  const total = Math.max(1, Math.ceil(bytes.byteLength / FILE_CHUNK));
  const send = msg => localWs.send(JSON.stringify(msg));
  send({ type: "file-meta", id: rec.id, name: rec.name, ext: rec.ext, size: bytes.byteLength, total });
  for (let i = 0; i < total; i++) {
    send({
      type: "file-chunk",
      id: rec.id,
      i,
      data: bytesToB64(bytes.subarray(i * FILE_CHUNK, (i + 1) * FILE_CHUNK))
    });
    if (i % 3 === 2) await new Promise(r => setTimeout(r, 0));
  }
}

function findSharedHit(controller) {
  pointerFrom(controller, _pointerOrigin, _pointerDir);
  let near = null;
  let nearDist = .35;
  for (const rec of sharedObjects.values()) {
    if (!rec.root) continue;
    const reach = Math.max(GRAB_NEAR, rec.radius * .65);
    const d = _pointerOrigin.distanceTo(rec.root.position);
    if (d < reach && d < nearDist) {
      nearDist = d;
      near = rec.root;
    }
  }
  if (near) return { target: near, mode: "near", kind: "shared" };

  let best = null;
  let bestT = GRAB_FAR;
  for (const rec of sharedObjects.values()) {
    if (!rec.root) continue;
    const t = rayHitSphere(_pointerOrigin, _pointerDir, rec.root.position, Math.max(rec.radius, .1), GRAB_FAR);
    if (t != null && t < bestT) {
      bestT = t;
      best = rec.root;
    }
  }
  if (best) return { target: best, mode: "ray", distance: bestT, kind: "shared" };
  return null;
}

function pickSharedAt(e) {
  if (!sessionStarted || renderer.xr.isPresenting) return;
  if (transformControls.dragging || transformControls.axis) return;
  const rect = renderer.domElement.getBoundingClientRect();
  _pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  _pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  _raycaster.setFromCamera(_pointerNdc, camera);
  const meshes = [];
  for (const rec of sharedObjects.values()) {
    if (!rec.root) continue;
    rec.root.traverse(o => { if (o.isMesh) meshes.push(o); });
  }
  const hits = meshes.length ? _raycaster.intersectObjects(meshes, false) : [];
  if (!hits.length) {
    deselectShared();
    return;
  }
  let root = hits[0].object;
  while (root && !root.userData.sharedId) root = root.parent;
  if (root) selectShared(root);
}

async function addSharedFromFile(file) {
  const ext = modelExt(file.name);
  if (!ext) {
    statusEl.textContent = "Use a .glb, .gltf, .obj, .stl, or .fbx file";
    return;
  }
  if (file.size > MAX_MODEL_BYTES) {
    statusEl.textContent = "Model is too large (max 20 MB)";
    return;
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const id = newSharedId();
  const pos = defaultRoomDropPos();
  const rec = ensureShared(id, {
    name: file.name,
    ext,
    x: pos.x,
    y: pos.y,
    z: pos.z,
    seq: 1
  });
  rec.bytes = bytes;
  rec.size = bytes.byteLength;
  statusEl.textContent = "Loading " + file.name + "…";
  try {
    await loadSharedMesh(rec);
    await prepareSharedBytes(rec);
  } catch (err) {
    console.warn(err);
    statusEl.textContent = "Could not load " + file.name;
    return;
  }
  selectShared(rec.root);
  statusEl.textContent = "Shared " + file.name + " · others can move it";
  if (connectionMode === "local") {
    try {
      const q = `name=${encodeURIComponent(file.name)}&ext=${encodeURIComponent(rec.ext || "ntx")}`;
      const res = await fetch(`/models/${encodeURIComponent(roomId)}/${encodeURIComponent(id)}?${q}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: rec.bytes
      });
      if (!res.ok) throw new Error("upload failed");
    } catch (err) {
      console.warn(err);
      statusEl.textContent = "Saved locally, but LAN upload failed";
    }
    sendLocalFile(rec).catch(err => console.warn("local file push failed", err));
  }
  if (connectionMode === "cloud") {
    try {
      await publishCloudMesh(rec);
    } catch (err) {
      console.warn(err);
      statusEl.textContent = "Model is local, but cloud upload failed";
    }
    sendSharedMessage("add", rec, false);
    for (const [peerId] of rtcPeers) rtcSendFileTo(peerId, rec);
  } else {
    sendSharedMessage("add", rec, true);
  }
}

function handleDroppedFiles(fileList) {
  if (!sessionStarted) {
    const el = setupError || statusEl;
    if (el) el.textContent = "Enter a room first, then drop a 3D model.";
    return;
  }
  if (renderer.xr.isPresenting) {
    statusEl.textContent = "Drop models on the PC browser, not in the headset.";
    return;
  }
  for (const file of fileList) addSharedFromFile(file);
}

transformControls.addEventListener("dragging-changed", e => {
  controls.enabled = !e.value && !renderer.xr.isPresenting;
  const root = transformControls.object;
  if (!root || !root.userData.sharedId) return;
  if (e.value) beginSharedHold(root);
  else endSharedHold(root);
});
transformControls.addEventListener("objectChange", () => {
  const root = transformControls.object;
  if (root && root.userData.sharedId) publishSharedMove(root, false);
});

renderer.domElement.addEventListener("pointerdown", e => {
  if (e.button !== 0 || renderer.xr.isPresenting) return;
  pcPointerDown = { x: e.clientX, y: e.clientY };
});
renderer.domElement.addEventListener("pointerup", e => {
  if (!pcPointerDown || e.button !== 0) return;
  const dx = e.clientX - pcPointerDown.x;
  const dy = e.clientY - pcPointerDown.y;
  pcPointerDown = null;
  if (dx * dx + dy * dy > 16) return;
  pickSharedAt(e);
});

(function setupModelDrop() {
  const overlay = document.getElementById("dropOverlay");
  let depth = 0;
  const modelFile = document.getElementById("modelFile");
  if (modelFile) {
    modelFile.addEventListener("change", () => {
      handleDroppedFiles(modelFile.files);
      modelFile.value = "";
    });
  }
  const hasFiles = e => e.dataTransfer && (e.dataTransfer.files.length > 0 || [...(e.dataTransfer.types || [])].includes("Files"));
  window.addEventListener("dragenter", e => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    depth++;
    if (overlay) overlay.classList.remove("hidden");
  });
  window.addEventListener("dragover", e => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  });
  window.addEventListener("dragleave", e => {
    if (!hasFiles(e)) return;
    depth = Math.max(0, depth - 1);
    if (!depth && overlay) overlay.classList.add("hidden");
  });
  window.addEventListener("drop", e => {
    depth = 0;
    if (overlay) overlay.classList.add("hidden");
    if (!hasFiles(e)) return;
    e.preventDefault();
    handleDroppedFiles(e.dataTransfer.files);
  });
})();

function findDoneHit(controller) {
  if (!doneButton.visible) return null;
  pointerFrom(controller, _pointerOrigin, _pointerDir);
  if (_pointerOrigin.distanceTo(doneButton.position) < GRAB_NEAR) return true;
  return rayHitSphere(_pointerOrigin, _pointerDir, doneButton.position, .28, GRAB_FAR) != null;
}

function markerGrabRadius() {
  return markersCollapsed ? GRAB_RADIUS * DOT_SCALE_MINI : GRAB_RADIUS;
}

function findGrabbable(controller) {
  pointerFrom(controller, _pointerOrigin, _pointerDir);
  const radius = markerGrabRadius();

  let near = null;
  let nearDist = GRAB_NEAR;
  for (const dot of [redDot, blueDot]) {
    if (!dot.visible) continue;
    const d = _pointerOrigin.distanceTo(dot.position);
    if (d < nearDist) {
      nearDist = d;
      near = dot;
    }
  }
  if (near) return { target: near, mode: "near", kind: "marker" };

  let best = null;
  let bestT = GRAB_FAR;
  for (const dot of [redDot, blueDot]) {
    if (!dot.visible) continue;
    const t = rayHitSphere(_pointerOrigin, _pointerDir, dot.position, radius, GRAB_FAR);
    if (t != null && t < bestT) {
      bestT = t;
      best = dot;
    }
  }
  if (best) return { target: best, mode: "ray", distance: bestT, kind: "marker" };
  return findSharedHit(controller);
}

function onSelectStart(e) {
  const controller = e.target;
  controller.userData.selecting = true;
  if (findDoneHit(controller)) {
    hideCalibrationDots();
    return;
  }
  const hit = findGrabbable(controller);
  if (!hit) return;
  if (hit.kind === "marker") {
    if (markersCollapsed) {
      expandCalibrationMarkers();
      return;
    }
  } else if (hit.kind === "shared") {
    beginSharedHold(hit.target);
  }
  controller.userData.grabbed = hit.target;
  controller.userData.grabMode = hit.mode;
  if (hit.mode === "ray") {
    controller.userData.grabDistance = hit.distance;
  } else {
    const cp = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
    controller.userData.grabOffset = hit.target.position.clone().sub(cp);
  }
}

function onSelectEnd(e) {
  const controller = e.target;
  const grabbed = controller.userData.grabbed;
  controller.userData.selecting = false;
  controller.userData.grabbed = null;
  controller.userData.grabMode = null;
  if (grabbed && grabbed.userData.sharedId) endSharedHold(grabbed);
}

function updateGrab() {
  let aimingDoneAny = false;
  for (const c of controllers) {
    const hover = c.userData.grabbed ? { target: c.userData.grabbed, kind: c.userData.grabbed.userData.sharedId ? "shared" : "marker" } : findGrabbable(c);
    const aimingDone = !c.userData.grabbed && findDoneHit(c);
    if (aimingDone) aimingDoneAny = true;
    if (c.userData.rayLine) {
      const aiming = aimingDone || (hover && (c.userData.grabbed || hover.mode === "ray"));
      c.userData.rayLine.material.color.set(aimingDone ? 0x3ddc84 : aiming ? 0xffff66 : 0xffffff);
    }

    const g = c.userData.grabbed;
    if (!g) continue;
    if (c.userData.grabMode === "ray") {
      pointerFrom(c, _pointerOrigin, _pointerDir);
      g.position.copy(_pointerOrigin).addScaledVector(_pointerDir, c.userData.grabDistance);
    } else {
      const p = new THREE.Vector3().setFromMatrixPosition(c.matrixWorld);
      g.position.copy(p.add(c.userData.grabOffset));
    }
    g.position.y = Math.max(.01, g.position.y);
    if (g.userData.sharedId) publishSharedMove(g, false);
  }
  if (doneButton.userData.plate) {
    doneButton.userData.plate.material.color.set(aimingDoneAny ? 0xb6ffd4 : 0x3ddc84);
  }
}

function getLocalHeadPosition() {
  const p = new THREE.Vector3();
  if (renderer.xr.isPresenting) renderer.xr.getCamera().getWorldPosition(p);
  else camera.getWorldPosition(p);
  return p;
}

function getLocalHeadYaw() {
  const q = new THREE.Quaternion();
  if (renderer.xr.isPresenting) renderer.xr.getCamera().getWorldQuaternion(q);
  else camera.getWorldQuaternion(q);
  _headEuler.setFromQuaternion(q, "YXZ");
  return _headEuler.y;
}

function fillHeadPose(target) {
  if (!renderer.xr.isPresenting) return false;
  const localHead = getLocalHeadPosition();
  if (!Number.isFinite(localHead.x + localHead.y + localHead.z)) return false;
  const roomHead = localToRoom(localHead);
  target.x = roomHead.x;
  target.y = roomHead.y;
  target.z = roomHead.z;
  target.yaw = compact(localYawToRoom(getLocalHeadYaw()));
  return true;
}

function localYawToRoom(yaw) {
  return calibration ? yaw + calibration.yaw : yaw;
}

function hasHandData(data) {
  if (!data) return false;
  if (data.rest) return true;
  if (Array.isArray(data) && data.length >= 3) return true;
  if (typeof data !== "object") return false;
  for (const name of HAND_JOINTS) {
    if (Array.isArray(data[name]) && data[name].length >= 3) return true;
  }
  return false;
}

function translateHandToHip(src, head, yaw, side) {
  const wristArr = src && src.wrist;
  if (!Array.isArray(wristArr) || wristArr.length < 7) return { rest: true };
  const sign = side === "left" ? -1 : 1;
  _hipOff.set(sign * 0.23, -0.7, 0.06).applyAxisAngle(_yAxis, yaw).add(head);
  const dx = _hipOff.x - wristArr[0];
  const dy = _hipOff.y - wristArr[1];
  const dz = _hipOff.z - wristArr[2];
  const packed = {};
  for (const name of HAND_JOINTS) {
    const arr = src[name];
    if (!Array.isArray(arr) || arr.length < 7) continue;
    packed[name] = [
      compact(arr[0] + dx), compact(arr[1] + dy), compact(arr[2] + dz),
      arr[3], arr[4], arr[5], arr[6]
    ];
  }
  return countPackedJoints(packed) >= MIN_HAND_JOINTS ? packed : { rest: true };
}

function lastPackedForSide(side) {
  for (const hand of localHands) {
    if (hand.userData.handedness === side && hand.userData.lastPacked) {
      return hand.userData.lastPacked;
    }
  }
  const src = lastHandsPayload && lastHandsPayload[side];
  if (src && !src.rest && countPackedJoints(src) >= MIN_HAND_JOINTS) return src;
  return null;
}

function restHandsForPlayer(p) {
  const src = p.hands || {};
  return {
    left: hasHandData(src.left) ? src.left : { rest: true },
    right: hasHandData(src.right) ? src.right : { rest: true }
  };
}

function fillRestHands(out) {
  const head = localToRoom(getLocalHeadPosition());
  const yaw = localYawToRoom(getLocalHeadYaw());
  for (const side of ["left", "right"]) {
    if (hasHandData(out[side]) || !handAbandoned(side)) continue;
    const last = lastPackedForSide(side);
    out[side] = last ? translateHandToHip(last, head, yaw, side) : { rest: true };
  }
  return out;
}

function compact(n) {
  return Math.round(n * 1000) / 1000;
}

function compact4(n) {
  return Math.round(n * 10000) / 10000;
}

function packPose(px, py, pz, qx, qy, qz, qw) {
  const room = localToRoom(_handPos.set(px, py, pz));
  _handQuat.set(qx, qy, qz, qw).normalize();
  if (calibration) {
    _qYaw.setFromAxisAngle(_yAxis, calibration.yaw);
    _handQuat.premultiply(_qYaw);
  }
  return [
    compact(room.x), compact(room.y), compact(room.z),
    compact4(_handQuat.x), compact4(_handQuat.y), compact4(_handQuat.z), compact4(_handQuat.w)
  ];
}

function worldToRoomPose(obj) {
  obj.getWorldPosition(_handPos);
  obj.getWorldQuaternion(_handQuat);
  return packPose(_handPos.x, _handPos.y, _handPos.z, _handQuat.x, _handQuat.y, _handQuat.z, _handQuat.w);
}

function captureHandJoints(hand, frame, refSpace) {
  const packed = {};
  let any = false;
  if (hand && hand.get && frame && refSpace) {
    for (const name of HAND_JOINTS) {
      const jointSpace = hand.get(name);
      if (!jointSpace) continue;
      const pose = frame.getJointPose(jointSpace, refSpace);
      if (!pose || pose.emulatedPosition) continue;
      const p = pose.transform.position;
      const o = pose.transform.orientation;
      packed[name] = packPose(p.x, p.y, p.z, o.x, o.y, o.z, o.w);
      any = true;
    }
  }
  return any ? packed : null;
}

function readWristSample(side, frame) {
  const session = renderer.xr.isPresenting && renderer.xr.getSession();
  const refSpace = session && renderer.xr.getReferenceSpace();
  if (session && refSpace && frame) {
    for (const source of session.inputSources) {
      if (source.handedness !== side || !source.hand) continue;
      const space = source.hand.get && source.hand.get("wrist");
      if (!space) continue;
      const pose = frame.getJointPose(space, refSpace);
      if (!pose) return { found: false, emulated: false };
      return {
        found: true,
        emulated: !!pose.emulatedPosition,
        x: pose.transform.position.x,
        y: pose.transform.position.y,
        z: pose.transform.position.z
      };
    }
  }
  for (const hand of localHands) {
    if (hand.userData.handedness !== side) continue;
    const joint = hand.joints && hand.joints.wrist;
    if (!joint || !joint.visible) continue;
    joint.getWorldPosition(_handPos);
    return { found: true, emulated: false, x: _handPos.x, y: _handPos.y, z: _handPos.z };
  }
  return { found: false, emulated: false };
}

function wristNearPlayer(x, y, z) {
  const head = getLocalHeadPosition();
  return Math.hypot(x - head.x, y - head.y, z - head.z) <= HAND_NEAR_M;
}

function handAbandoned(side) {
  return localHandLost[side] && !localHandNear[side];
}

function setLocalHandMeshVisible(hand, on) {
  const model = hand.userData.model;
  if (model) model.visible = on;
  hand.traverse(obj => {
    if (obj.isSkinnedMesh || (obj.isMesh && obj !== model)) obj.visible = on;
  });
}

function ensureJointSnap(hand) {
  let snap = hand.userData.lastJoints;
  if (snap) return snap;
  snap = { abs: {}, rel: {} };
  for (const name of HAND_JOINTS) {
    snap.abs[name] = { p: new THREE.Vector3(), q: new THREE.Quaternion() };
    snap.rel[name] = { p: new THREE.Vector3(), q: new THREE.Quaternion() };
  }
  return snap;
}

function snapshotHandJoints(hand) {
  const wrist = hand.joints.wrist;
  if (!wrist || !wrist.visible) return null;
  const snap = ensureJointSnap(hand);
  _handQuat.copy(wrist.quaternion).invert();
  for (const name of HAND_JOINTS) {
    const j = hand.joints[name];
    if (!j || !j.visible) return null;
    snap.abs[name].p.copy(j.position);
    snap.abs[name].q.copy(j.quaternion);
    snap.rel[name].p.copy(j.position).sub(wrist.position).applyQuaternion(_handQuat);
    snap.rel[name].q.copy(_handQuat).multiply(j.quaternion);
  }
  return snap;
}

function writeJointSnap(joint, p, q) {
  joint.position.copy(p);
  joint.quaternion.copy(q);
  joint.scale.set(1, 1, 1);
  joint.visible = true;
  joint.updateMatrix();
}

function restoreHandJointsAbs(hand, snap) {
  for (const name of HAND_JOINTS) {
    const j = hand.joints[name];
    const s = snap.abs[name];
    if (j && s) writeJointSnap(j, s.p, s.q);
  }
}

function restoreMissingHandJointsRel(hand, snap) {
  const wrist = hand.joints.wrist;
  for (const name of HAND_JOINTS) {
    const j = hand.joints[name];
    const s = snap.rel[name];
    if (!j || !s || j.visible) continue;
    _handPos.copy(s.p).applyQuaternion(wrist.quaternion).add(wrist.position);
    _handQuat.copy(wrist.quaternion).multiply(s.q);
    writeJointSnap(j, _handPos, _handQuat);
  }
}

function stabilizeLocalHands() {
  if (!renderer.xr.isPresenting) return;
  for (const hand of localHands) {
    const joints = hand.joints;
    if (!joints) continue;
    let n = 0;
    let wristVisible = false;
    for (const name of HAND_JOINTS) {
      const joint = joints[name];
      if (!joint || !joint.visible) continue;
      n++;
      if (name === "wrist") wristVisible = true;
      joint.matrix.decompose(joint.position, joint.quaternion, _jointScale);
      joint.scale.set(1, 1, 1);
      if (joint.quaternion.w < 0) flipQuat(joint.quaternion);
      joint.updateMatrix();
    }
    const snap = hand.userData.lastJoints;
    if (n >= HAND_JOINTS.length) {
      const next = snapshotHandJoints(hand);
      if (next) hand.userData.lastJoints = next;
    } else if (snap) {
      if (n < MIN_HAND_JOINTS || !wristVisible) restoreHandJointsAbs(hand, snap);
      else restoreMissingHandJointsRel(hand, snap);
    }
  }
}

function updateLocalHandLost(frame) {
  const now = performance.now();
  if (!renderer.xr.isPresenting) {
    localHandLost.left = localHandLost.right = false;
    localHandNear.left = localHandNear.right = true;
    localHandStill.left.has = localHandStill.right.has = false;
    return;
  }

  for (const side of ["left", "right"]) {
    const sample = readWristSample(side, frame);
    const st = localHandStill[side];

    if (!sample.found) {
      localHandLost[side] = true;
      st.frames = 0;
      localHandNear[side] = st.has && wristNearPlayer(st.pos.x, st.pos.y, st.pos.z);
      continue;
    }

    localHandNear[side] = wristNearPlayer(sample.x, sample.y, sample.z);
    if (sample.emulated) {
      localHandLost[side] = true;
      st.pos.set(sample.x, sample.y, sample.z);
      st.has = true;
      st.frames = 0;
      continue;
    }
    if (!st.has) {
      st.pos.set(sample.x, sample.y, sample.z);
      st.t = now;
      st.frames = 0;
      st.has = true;
      localHandLost[side] = false;
      continue;
    }
    const dist = Math.hypot(sample.x - st.pos.x, sample.y - st.pos.y, sample.z - st.pos.z);
    if (localHandLost[side]) {
      if (dist >= HAND_RECOVER_M) {
        localHandLost[side] = false;
        st.pos.set(sample.x, sample.y, sample.z);
        st.t = now;
        st.frames = 0;
      }
      continue;
    }
    if (dist < HAND_STILL_M) {
      st.frames++;
      if (st.frames >= HAND_STILL_FRAMES && now - st.t >= HAND_STILL_MS) localHandLost[side] = true;
    } else {
      st.pos.set(sample.x, sample.y, sample.z);
      st.t = now;
      st.frames = 0;
    }
  }

  for (const hand of localHands) {
    const side = hand.userData.handedness;
    if (side !== "left" && side !== "right") continue;
    setLocalHandMeshVisible(hand, !localHandLost[side] || localHandNear[side]);
  }
}

function captureHands(frame) {
  const out = { left: null, right: null };
  if (!renderer.xr.isPresenting) return out;

  for (const hand of localHands) {
    const side = hand.userData.handedness;
    if (side !== "left" && side !== "right") continue;
    if (handAbandoned(side)) continue;
    const joints = hand.joints;
    if (!joints) continue;
    const packed = {};
    let any = false;
    for (const name of HAND_JOINTS) {
      const joint = joints[name];
      if (!joint || !joint.visible) continue;
      packed[name] = worldToRoomPose(joint);
      any = true;
    }
    if (any) {
      const complete = countPackedJoints(packed) >= MIN_HAND_JOINTS ? packed : null;
      if (complete) {
        out[side] = complete;
        hand.userData.lastPacked = complete;
      }
    }
  }

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
      if (handAbandoned(side) || hasHandData(out[side])) continue;
      if (source.hand) {
        const joints = captureHandJoints(source.hand, frame, refSpace);
        if (joints && countPackedJoints(joints) >= MIN_HAND_JOINTS) {
          out[side] = joints;
          for (const hand of localHands) {
            if (hand.userData.handedness === side) hand.userData.lastPacked = joints;
          }
        }
      }
    }
  }

  return fillRestHands(out);
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

function applyCalibrationFromDots() {
  const red = redDot.position.clone();
  const blue = blueDot.position.clone();
  const flat = new THREE.Vector3(blue.x - red.x, 0, blue.z - red.z);

  if (flat.length() < .15) {
    statusEl.textContent = "Move red and blue farther apart before calibrating.";
    return false;
  }

  // Rotation that maps local red->blue direction onto canonical +X.
  const localAngle = Math.atan2(flat.z, flat.x);
  calibration = { origin: red, yaw: -localAngle };
  calibrated = true;
  relocalizeSharedObjects();
  statusEl.textContent = "Calibrated · looking for other players";
  publishPlayer(true);
  return true;
}

function expandCalibrationMarkers() {
  markersCollapsed = false;
  syncCalibrationUi();
}

function collapseCalibrationMarkers() {
  markersCollapsed = true;
  for (const c of controllers) {
    if (c.userData.grabbed === redDot || c.userData.grabbed === blueDot) {
      c.userData.grabbed = null;
      c.userData.grabMode = null;
    }
  }
  syncCalibrationUi();
}

function calibrate() {
  if (!applyCalibrationFromDots()) return;
  collapseCalibrationMarkers();
}

function hideCalibrationDots() {
  applyCalibrationFromDots();
  collapseCalibrationMarkers();
}

function updateDoneButton() {
  if (!doneButton.visible) return;
  doneButton.position.lerpVectors(redDot.position, blueDot.position, .5);
  if (renderer.xr.isPresenting) renderer.xr.getCamera().getWorldPosition(_oc);
  else camera.getWorldPosition(_oc);
  _oc.sub(doneButton.position);
  _oc.y = 0;
  if (_oc.lengthSq() < 1e-6) _oc.set(0, 0, 1);
  else _oc.normalize();
  doneButton.position.addScaledVector(_oc, .15);
  doneButton.position.y += .2;
}

async function publishPlayer(force = false) {
  if (!sessionStarted || !uid) return;
  const now = performance.now();
  const rtcOpen = connectionMode === "cloud" ? rtcOpenCount() : 0;
  const syncing = connectionMode === "cloud" ? rtcOpen > 0 : otherPlayerCount > 0;
  const interval = syncing && renderer.xr.isPresenting
    ? POSE_MS
    : renderer.xr.isPresenting && connectionMode === "cloud"
      ? CLOUD_POSE_MS
      : connectionMode === "cloud" ? CLOUD_HEARTBEAT_MS : HEARTBEAT_MS;
  if (!force && now - lastNetworkSend < interval) return;
  lastNetworkSend = now;

  const payload = {
    name: playerName,
    presenting: renderer.xr.isPresenting,
    calibrated,
    updatedAt: Date.now()
  };

  if (renderer.xr.isPresenting) {
    fillHeadPose(payload);
    lastHandsPayload = captureHands(lastXRFrame);
    payload.hands = lastHandsPayload;
  }

  if (connectionMode === "local") {
    if (localWs && localWs.readyState === WebSocket.OPEN) {
      localWs.send(JSON.stringify({ type: "state", room: roomId, id: uid, data: payload }));
    }
    return;
  }

  if (syncing) rtcBroadcast(payload);
  else await publishCloudPoseFallback();
  await publishPresence(force);
}

function render(time, frame) {
  lastXRFrame = frame || null;
  updateLocalHandLost(lastXRFrame);
  stabilizeLocalHands();
  updateDoneButton();
  updateGrab();
  renderer.render(scene, camera);
  if (!renderer.xr.isPresenting) controls.update();
  updateRemoteVisuals();
  publishPlayer(false).catch(console.error);
}
