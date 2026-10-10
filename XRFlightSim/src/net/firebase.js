/**
 * Firebase client for XRFlightSim multiplayer.
 * Same public web config as NameTagsXR / Settlers (nametagsxr project).
 *
 * Firestore paths:
 *   rooms/{roomId}                      — lobby metadata (app: "xrflightsim")
 *   rooms/{roomId}/players/{uid}        — presence + WebRTC offer/answer/ICE
 */

const FIREBASE_VERSION = "11.6.0";
const FIREBASE_CDN = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;

export const firebaseConfig = {
  apiKey: "AIzaSyD9wx0VS7oZLUqB4v5-XEBHGVHom4f7dZM",
  authDomain: "nametagsxr.firebaseapp.com",
  projectId: "nametagsxr",
  storageBucket: "nametagsxr.firebasestorage.app",
  messagingSenderId: "1044217406309",
  appId: "1:1044217406309:web:ca475c4e8441752ca0f78c",
  measurementId: "G-R13NNSLFQ0",
};

export const APP_ID = "xrflightsim";

/**
 * Cloudflare Worker WSS relay (pose / fire / balloons).
 * Deploy: `cd relay && npm i && npm run deploy` — then paste the workers.dev URL here.
 * Empty string disables the socket (Firestore + WebRTC only).
 */
export const WS_RELAY_URL = "wss://xrflightsim-relay.lean-poppyseed.workers.dev";

let appMod;
let authMod;
let fsMod;
let app;
let auth;
let db;

export async function loadFirebase() {
  if (appMod) return;
  [appMod, authMod, fsMod] = await Promise.all([
    import(`${FIREBASE_CDN}/firebase-app.js`),
    import(`${FIREBASE_CDN}/firebase-auth.js`),
    import(`${FIREBASE_CDN}/firebase-firestore.js`),
  ]);
}

export function startFirebase() {
  const { initializeApp, getApps, getApp } = appMod;
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  try {
    auth = authMod.initializeAuth(app, { persistence: authMod.inMemoryPersistence });
  } catch {
    auth = authMod.getAuth(app);
  }
  db = fsMod.getFirestore(app);
  return { app, auth, db, fs: fsMod, authApi: authMod };
}

export function firebaseApi() {
  return { app, auth, db, fs: fsMod, authApi: authMod };
}

export function firebaseErrorMessage(e) {
  const code = (e && e.code) || "";
  const message = (e && e.message) || "";
  if (code === "auth/configuration-not-found" || /CONFIGURATION_NOT_FOUND/i.test(message)) {
    return "Firebase Authentication is not set up. Enable Anonymous sign-in in the Firebase Console.";
  }
  if (code === "auth/operation-not-allowed" || code === "auth/admin-restricted-operation") {
    return "Anonymous sign-in is disabled. Enable it under Authentication → Sign-in method.";
  }
  if (code === "auth/unauthorized-domain") {
    return "This site is not allowed. Add azb.github.io and localhost under Authentication → Authorized domains.";
  }
  if (code === "permission-denied") {
    return "Firestore blocked the write. Deploy NameTagsXR firebase.rules for rooms/*.";
  }
  return message || "Firebase connection failed.";
}

/** Digits only — easier to type on Quest / VR keyboards. */
const CODE_CHARS = "0123456789";

export function randomRoomCode() {
  let s = "";
  const buf = new Uint32Array(4);
  crypto.getRandomValues(buf);
  for (let i = 0; i < 4; i += 1) s += CODE_CHARS[buf[i] % CODE_CHARS.length];
  return s;
}

export function normalizeRoomCode(raw) {
  return String(raw || "")
    .trim()
    .replace(/\D/g, "")
    .slice(0, 6);
}
