import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { XRHandModelFactory } from "three/addons/webxr/XRHandModelFactory.js";

const FB_BASE = "https://www.gstatic.com/firebasejs/12.1.0";
let initializeApp, getApps, getApp;
let initializeAuth, getAuth, inMemoryPersistence, signInAnonymously;
let getFirestore, doc, setDoc, onSnapshot, collection, serverTimestamp, deleteDoc;

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
let connectionMode = "cloud";
let lanReady = false;
let localWs = null;
let localPeerMap = {};
let calibrated = false;
let calibration = null;
let lastNetworkSend = 0;
let lastPresenceSend = 0;
let sessionStarted = false;
let pruneTimer = null;
let otherPlayerCount = 0;
const POSE_MS = 80;
const HEARTBEAT_MS = 2000;
const STALE_MS = 8000;
const CLOUD_HEARTBEAT_MS = 20000;
const CLOUD_STALE_MS = 45000;
const HAND_JOINTS = [
  "wrist",
  "thumb-metacarpal", "thumb-phalanx-proximal", "thumb-phalanx-distal", "thumb-tip",
  "index-finger-metacarpal", "index-finger-phalanx-proximal", "index-finger-phalanx-intermediate", "index-finger-phalanx-distal", "index-finger-tip",
  "middle-finger-metacarpal", "middle-finger-phalanx-proximal", "middle-finger-phalanx-intermediate", "middle-finger-phalanx-distal", "middle-finger-tip",
  "ring-finger-metacarpal", "ring-finger-phalanx-proximal", "ring-finger-phalanx-intermediate", "ring-finger-phalanx-distal", "ring-finger-tip",
  "pinky-finger-metacarpal", "pinky-finger-phalanx-proximal", "pinky-finger-phalanx-intermediate", "pinky-finger-phalanx-distal", "pinky-finger-tip"
];
const RTC_CONFIG = {
  iceCandidatePoolSize: 4,
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }]
};
const rtcPeers = new Map();
const cloudPresence = new Map();
const outgoingOffers = {};
const outgoingAnswers = {};
const localHands = [];
const _handPos = new THREE.Vector3();
const _handQuat = new THREE.Quaternion();
const _qYaw = new THREE.Quaternion();
const _yAxis = new THREE.Vector3(0, 1, 0);
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
const controllers = [];
const remotePlayers = new Map();

const setup = document.getElementById("setup");
const hud = document.getElementById("hud");
const hudToggle = document.getElementById("hudToggle");
const statusEl = document.getElementById("status");
const setupError = document.getElementById("setupError");
const roomLabel = document.getElementById("roomLabel");
const playerListEl = document.getElementById("playerList");
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
  const first = xrSupportedMode || "immersive-vr";
  const second = first === "immersive-ar" ? "immersive-vr" : null;
  return requestXRMode(first).then(session => session || (second ? requestXRMode(second) : null));
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
  try {
    const res = await fetch("/__lan", { cache: "no-store" });
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
  statusEl.textContent = "Recalibration: place red + blue again";
  syncCalibrationUi();
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
  hand.joints = {};
  for (const name of HAND_JOINTS) {
    const joint = new THREE.Group();
    joint.visible = false;
    joint.userData.target = new THREE.Vector3();
    joint.userData.targetQuat = new THREE.Quaternion();
    hand.joints[name] = joint;
  }
  const model = handModelFactory.createHandModel(hand, "mesh");
  hand.add(model);
  hand.dispatchEvent({
    type: "connected",
    data: { handedness, hand: { handedness } }
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

  const tag = createNameTag(name);
  tag.position.y = .28;
  obj.add(tag);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(.14, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .85 })
  );
  obj.add(head);
  obj.userData.leftHand = createRemoteHand("left");
  obj.userData.rightHand = createRemoteHand("right");
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

function packedJoints(data) {
  if (!data) return null;
  if (Array.isArray(data) && data.length >= 3) return { wrist: data };
  if (typeof data === "object") return data;
  return null;
}

function applyJointPose(joint, arr) {
  const pos = roomToLocal(new THREE.Vector3(arr[0], arr[1], arr[2]));
  joint.userData.target.copy(pos);
  if (arr.length >= 7) {
    _handQuat.set(arr[3], arr[4], arr[5], arr[6]).normalize();
    if (calibration) {
      _qYaw.setFromAxisAngle(_yAxis, -calibration.yaw);
      _handQuat.premultiply(_qYaw);
    }
    joint.userData.targetQuat.copy(_handQuat);
  } else {
    joint.userData.targetQuat.identity();
  }
  if (!joint.userData.placed) {
    joint.position.copy(joint.userData.target);
    joint.quaternion.copy(joint.userData.targetQuat);
    joint.userData.placed = true;
  }
  joint.visible = true;
}

function applyHandJoints(hand, data) {
  if (!hand) return;
  const packed = packedJoints(data);
  const joints = hand.joints;
  if (!packed || !joints) {
    hand.visible = false;
    return;
  }
  let any = false;
  for (const name of HAND_JOINTS) {
    const joint = joints[name];
    const arr = packed[name];
    if (!joint) continue;
    if (!Array.isArray(arr) || arr.length < 3) {
      joint.visible = false;
      continue;
    }
    any = true;
    applyJointPose(joint, arr);
  }
  hand.visible = any;
}

function updateHandVisual(hand) {
  if (!hand || !hand.visible || !hand.joints) return;
  for (const name of HAND_JOINTS) {
    const joint = hand.joints[name];
    if (!joint || !joint.visible) continue;
    if (joint.userData.target) joint.position.lerp(joint.userData.target, 0.4);
    if (joint.userData.targetQuat) joint.quaternion.slerp(joint.userData.targetQuat, 0.4);
  }
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

function bindRtcChannel(remoteId, channel) {
  const peer = rtcPeers.get(remoteId);
  if (!peer) return;
  peer.channel = channel;
  channel.onmessage = ev => {
    let msg;
    try { msg = JSON.parse(typeof ev.data === "string" ? ev.data : new TextDecoder().decode(ev.data)); } catch { return; }
    if (!msg || msg.type !== "state" || !msg.data) return;
    updateRemotePlayer(remoteId, msg.data);
    const obj = remotePlayers.get(remoteId);
    if (obj) obj.userData.lastSeen = Date.now();
    describeCloudPlayers();
  };
  channel.onopen = () => {
    delete outgoingOffers[remoteId];
    delete outgoingAnswers[remoteId];
    publishPresence(true).catch(() => {});
    publishPlayer(true).catch(() => {});
    describeCloudPlayers();
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
}

function ensureRtcPeer(remoteId) {
  if (!uid || remoteId === uid || rtcPeers.has(remoteId) || typeof RTCPeerConnection !== "function") return;
  const offerer = uid < remoteId;
  const pc = new RTCPeerConnection(RTC_CONFIG);
  const peer = { pc, channel: null, offerer, appliedRemote: "" };
  rtcPeers.set(remoteId, peer);

  pc.ondatachannel = ev => bindRtcChannel(remoteId, ev.channel);
  pc.onconnectionstatechange = () => {
    if (pc.connectionState !== "failed") return;
    closeRtcPeer(remoteId);
    setTimeout(() => {
      if (sessionStarted && cloudPresence.has(remoteId)) ensureRtcPeer(remoteId);
    }, 1200);
  };

  if (!offerer) return;
  bindRtcChannel(remoteId, pc.createDataChannel("pose"));
  (async () => {
    await pc.setLocalDescription(await pc.createOffer());
    await waitIceGathering(pc);
    outgoingOffers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
    await publishPresence(true);
  })().catch(err => console.warn("RTC offer failed", err));
}

async function handleIncomingSignal(remoteId, p) {
  const peer = rtcPeers.get(remoteId);
  if (!peer) return;
  const pc = peer.pc;
  const theirOffer = p.offers && p.offers[uid];
  const theirAnswer = p.answers && p.answers[uid];
  try {
    if (theirOffer && !peer.offerer && peer.appliedRemote !== theirOffer.sdp) {
      peer.appliedRemote = theirOffer.sdp;
      await pc.setRemoteDescription(theirOffer);
      await pc.setLocalDescription(await pc.createAnswer());
      await waitIceGathering(pc);
      outgoingAnswers[remoteId] = { type: pc.localDescription.type, sdp: pc.localDescription.sdp };
      await publishPresence(true);
    }
    if (theirAnswer && peer.offerer && peer.appliedRemote !== theirAnswer.sdp && pc.signalingState === "have-local-offer") {
      peer.appliedRemote = theirAnswer.sdp;
      await pc.setRemoteDescription(theirAnswer);
    }
  } catch (err) {
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
    others.push(`${p.name || "Player"}${tracking ? "" : linking ? " (linking…)" : " (not tracking)"}`);
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
  await setDoc(doc(db, "rooms", roomId, "players", uid), {
    name: playerName,
    presenting: renderer.xr.isPresenting,
    calibrated,
    updatedAt: serverTimestamp(),
    offers: outgoingOffers,
    answers: outgoingAnswers
  });
}

function closeAllRtc() {
  for (const id of [...rtcPeers.keys()]) closeRtcPeer(id);
  cloudPresence.clear();
  for (const key of Object.keys(outgoingOffers)) delete outgoingOffers[key];
  for (const key of Object.keys(outgoingAnswers)) delete outgoingAnswers[key];
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
  otherPlayerCount = 0;
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
    others.push(`${p.name || "Player"}${tracking ? "" : " (not tracking)"}`);
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
        if (!settled) {
          settled = true;
          resolve();
        }
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
    }

    setup.classList.add("hidden");
    hud.classList.remove("hidden");
    roomLabel.textContent = connectionMode === "local"
      ? `Room: ${roomId} · local`
      : `Room: ${roomId} · p2p`;
    sessionStarted = true;
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

function syncCalibrationUi(forceMarkers) {
  const xr = renderer.xr.isPresenting;
  const ui = document.getElementById("xrCalibrateUi");
  if (ui) ui.classList.toggle("hidden", !xr);
  const showMarkers = xr && (forceMarkers != null ? forceMarkers : !calibrated);
  redDot.visible = blueDot.visible = doneButton.visible = showMarkers;
}
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
  publishPlayer(true).catch(console.error);
}

function onXRSessionEnded() {
  currentXRSession = null;
  if (arButton) arButton.textContent = xrSupportedMode ? "START XR" : "XR NOT SUPPORTED";
  controls.enabled = true;
  setPassthrough(false);
  statusEl.textContent = "XR stopped · pose is no longer broadcasting";
  syncCalibrationUi();
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
    hand.addEventListener("connected", e => {
      hand.userData.handedness = e.data.handedness;
      hand.visible = true;
    });
    hand.addEventListener("disconnected", () => {
      hand.userData.handedness = null;
    });
    hand.add(handModelFactory.createHandModel(hand, "mesh"));
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

function findDoneHit(controller) {
  if (!doneButton.visible) return null;
  pointerFrom(controller, _pointerOrigin, _pointerDir);
  if (_pointerOrigin.distanceTo(doneButton.position) < GRAB_NEAR) return true;
  return rayHitSphere(_pointerOrigin, _pointerDir, doneButton.position, .28, GRAB_FAR) != null;
}

function findGrabbable(controller) {
  pointerFrom(controller, _pointerOrigin, _pointerDir);

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
  if (near) return { target: near, mode: "near" };

  let best = null;
  let bestT = GRAB_FAR;
  for (const dot of [redDot, blueDot]) {
    if (!dot.visible) continue;
    const t = rayHitSphere(_pointerOrigin, _pointerDir, dot.position, GRAB_RADIUS, GRAB_FAR);
    if (t != null && t < bestT) {
      bestT = t;
      best = dot;
    }
  }
  if (best) return { target: best, mode: "ray", distance: bestT };
  return null;
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
  controller.userData.selecting = false;
  controller.userData.grabbed = null;
  controller.userData.grabMode = null;
}

function updateGrab() {
  let aimingDoneAny = false;
  for (const c of controllers) {
    const hover = c.userData.grabbed ? { target: c.userData.grabbed } : findGrabbable(c);
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
      if (!pose) continue;
      const p = pose.transform.position;
      const o = pose.transform.orientation;
      packed[name] = packPose(p.x, p.y, p.z, o.x, o.y, o.z, o.w);
      any = true;
    }
  }
  return any ? packed : null;
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
        out[side] = captureHandJoints(source.hand, frame, refSpace);
        continue;
      }
      const space = source.gripSpace || source.targetRaySpace;
      if (!space) continue;
      const pose = frame.getPose(space, refSpace);
      if (!pose) continue;
      const p = pose.transform.position;
      const o = pose.transform.orientation;
      out[side] = { wrist: packPose(p.x, p.y, p.z, o.x, o.y, o.z, o.w) };
    }
    if (out.left || out.right) return out;
  }

  for (const hand of localHands) {
    const side = hand.userData.handedness;
    if (side !== "left" && side !== "right") continue;
    const joints = hand.joints;
    if (!joints) continue;
    const packed = {};
    let any = false;
    for (const name of HAND_JOINTS) {
      const joint = joints[name];
      if (!joint) continue;
      packed[name] = worldToRoomPose(joint);
      any = true;
    }
    if (any) out[side] = packed;
  }
  for (const c of controllers) {
    const side = c.userData.handedness;
    if ((side !== "left" && side !== "right") || out[side]) continue;
    out[side] = { wrist: worldToRoomPose(c) };
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
  syncCalibrationUi();

  statusEl.textContent = "Calibrated · looking for other players";
  publishPlayer(true);
}

function hideCalibrationDots() {
  syncCalibrationUi(false);
  for (const c of controllers) {
    if (c.userData.grabbed === redDot || c.userData.grabbed === blueDot) {
      c.userData.grabbed = null;
      c.userData.grabMode = null;
    }
  }
  const red = redDot.position.clone();
  const blue = blueDot.position.clone();
  const flat = new THREE.Vector3(blue.x - red.x, 0, blue.z - red.z);
  if (flat.length() >= .15) {
    const localAngle = Math.atan2(flat.z, flat.x);
    calibration = { origin: red, yaw: -localAngle };
    calibrated = true;
    statusEl.textContent = "Calibrated · looking for other players";
    publishPlayer(true);
  } else {
    statusEl.textContent = "Markers hidden";
  }
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
    : connectionMode === "cloud" ? CLOUD_HEARTBEAT_MS : HEARTBEAT_MS;
  if (!force && now - lastNetworkSend < interval) return;
  lastNetworkSend = now;

  const payload = {
    name: playerName,
    presenting: renderer.xr.isPresenting,
    calibrated,
    updatedAt: Date.now()
  };

  if (syncing && renderer.xr.isPresenting) {
    const localHead = getLocalHeadPosition();
    if (Number.isFinite(localHead.x + localHead.y + localHead.z)) {
      const roomHead = localToRoom(localHead);
      payload.x = roomHead.x;
      payload.y = roomHead.y;
      payload.z = roomHead.z;
    }
    payload.hands = captureHands(lastXRFrame);
  }

  if (connectionMode === "local") {
    if (localWs && localWs.readyState === WebSocket.OPEN) {
      localWs.send(JSON.stringify({ type: "state", room: roomId, id: uid, data: payload }));
    }
    return;
  }

  if (syncing) rtcBroadcast(payload);
  await publishPresence(force);
}

function render(time, frame) {
  lastXRFrame = frame || null;
  updateDoneButton();
  updateGrab();
  renderer.render(scene, camera);
  if (!renderer.xr.isPresenting) controls.update();
  updateRemoteVisuals();
  publishPlayer(false).catch(console.error);
}
