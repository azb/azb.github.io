import * as THREE from 'three';

export function isHeadsetUA(ua = typeof navigator !== 'undefined' ? navigator.userAgent : '') {
  if (typeof navigator !== 'undefined' && navigator.userAgentData?.mobile) return true;
  return /Quest|Oculus|OculusBrowser|Mobile VR|Android|Apple Vision|iPhone|iPad/i.test(ua || '');
}

export const HEADSET = isHeadsetUA();

const dpr = typeof devicePixelRatio === 'number' ? devicePixelRatio : 1;

export const QUALITY = {
  headset: HEADSET,
  antialias: !HEADSET,
  pixelRatio: HEADSET ? 1 : Math.min(dpr, 2),
  framebufferScale: 1,
  shadows: !HEADSET,
  shadowSoft: !HEADSET,
  shadowSize: HEADSET ? 512 : 1024,
  xrShadows: false,
  xrShadowSize: 512,
  roomWood: 512,
  floorWood: HEADSET ? 512 : 512,
  feltSize: HEADSET ? 128 : 256,
  claySize: HEADSET ? 256 : 512,
  numberSize: 256,
  harborLabel: 256,
  trayScale: HEADSET ? 0.5 : 1,
  helpW: 512,
  helpH: HEADSET ? 128 : 256,
  floatW: 512,
  floatH: 128,
  avatarLabelW: 256,
  avatarLabelH: 96,
  handleLabelW: 256,
  handleLabelH: 64,
  tableSegments: HEADSET ? 16 : 24,
  rugSegments: HEADSET ? 16 : 24,
  tokenSegments: 12,
  harborDiscSegments: 8,
  harborRingSegments: 8,
  chipSegments: 12,
  anisotropy: HEADSET ? 1 : 4,
};

export function markShared(obj) {
  if (obj) obj.userData.shared = true;
  return obj;
}

export function disposeObject(root, { keepShared = true } = {}) {
  if (!root) return;
  root.traverse((o) => {
    if (o.geometry && !(keepShared && o.geometry.userData?.shared)) o.geometry.dispose();
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const m of mats) {
      if (!m) continue;
      for (const key of ['map', 'alphaMap', 'aoMap', 'bumpMap', 'normalMap', 'emissiveMap']) {
        const tex = m[key];
        if (tex?.dispose && !(keepShared && tex.userData?.shared)) tex.dispose();
      }
      m.dispose();
    }
  });
}

export function disposeChildren(group, opts) {
  if (!group) return;
  for (const child of [...group.children]) {
    disposeObject(child, opts);
    group.remove(child);
  }
}

export function applyShadowMap(renderer, sun, { enabled, size }) {
  renderer.shadowMap.enabled = !!enabled;
  if (!sun) return;
  sun.castShadow = !!enabled;
  const next = Math.max(128, size || 512);
  if (sun.shadow.mapSize.x !== next || sun.shadow.mapSize.y !== next) {
    sun.shadow.mapSize.set(next, next);
    if (sun.shadow.map) {
      sun.shadow.map.dispose();
      sun.shadow.map = null;
    }
  }
}

export function shadowType() {
  return QUALITY.shadowSoft ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
}
