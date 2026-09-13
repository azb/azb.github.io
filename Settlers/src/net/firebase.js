/**
 * Firebase client for Settlers multiplayer.
 * Same public web config as NameTagsXR (nametagsxr project).
 *
 * Firestore paths (existing NameTagsXR rules already allow authenticated
 * read/write on these; no new deploy required if you reuse `rooms`):
 *   rooms/{roomId}                      — lobby metadata (app: "settlers")
 *   rooms/{roomId}/players/{uid}        — presence + WebRTC offer/answer/ICE
 *
 * Room ids are 4-char codes (e.g. K7MQ). Prefix collision with NameTagsXR
 * rooms is unlikely; metadata.app === "settlers" identifies this game.
 *
 * Console (already needed for NameTagsXR):
 *   Authentication → Anonymous enabled
 *   Authorized domains: azb.github.io, localhost
 *   Firestore database + firebase.rules from NameTagsXR
 */

export const firebaseConfig = {
  apiKey: 'AIzaSyD9wx0VS7oZLUqB4v5-XEBHGVHom4f7dZM',
  authDomain: 'nametagsxr.firebaseapp.com',
  projectId: 'nametagsxr',
  storageBucket: 'nametagsxr.firebasestorage.app',
  messagingSenderId: '1044217406309',
  appId: '1:1044217406309:web:ca475c4e8441752ca0f78c',
  measurementId: 'G-R13NNSLFQ0',
};

let appMod;
let authMod;
let fsMod;
let app;
let auth;
let db;

export async function loadFirebase() {
  if (appMod) return;
  [appMod, authMod, fsMod] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
    import('firebase/firestore'),
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
  const code = e && e.code || '';
  const message = e && e.message || '';
  if (code === 'auth/configuration-not-found' || /CONFIGURATION_NOT_FOUND/i.test(message)) {
    return 'Firebase Authentication is not set up. In Firebase Console open Authentication → Get started, then enable Anonymous under Sign-in method.';
  }
  if (code === 'auth/operation-not-allowed' || code === 'auth/admin-restricted-operation') {
    return 'Anonymous sign-in is disabled. In Firebase Console go to Authentication → Sign-in method → Anonymous → Enable.';
  }
  if (code === 'auth/unauthorized-domain') {
    return 'This site is not allowed. Add azb.github.io and localhost under Authentication → Settings → Authorized domains.';
  }
  if (code === 'permission-denied') {
    return 'Firestore blocked the write. Deploy NameTagsXR/firebase.rules (rooms/* and rooms/*/players/*).';
  }
  return message || 'Firebase connection failed.';
}

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function randomRoomCode() {
  let s = '';
  const buf = new Uint32Array(4);
  crypto.getRandomValues(buf);
  for (let i = 0; i < 4; i++) s += CODE_CHARS[buf[i] % CODE_CHARS.length];
  return s;
}

export function normalizeRoomCode(raw) {
  return String(raw || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
}
