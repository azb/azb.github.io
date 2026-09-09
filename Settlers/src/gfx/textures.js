import * as THREE from 'three';
import { QUALITY, markShared } from './quality.js';

function noise(ctx, w, h, fn) {
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const [r, g, b] = fn(x, y);
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function woodMap(width = 512, height = 512, tint = [120, 72, 38]) {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');
  noise(ctx, width, height, (x, y) => {
    const grain = Math.sin(x * 0.08 + hash(x, y) * 3) * 18;
    const ring = Math.sin((x * 0.35 + y * 0.02) * 0.2) * 10;
    const n = hash(x * 0.5, y * 2) * 22;
    return tint.map((v) => Math.max(0, Math.min(255, v + grain + ring + n - 20)));
  });
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = QUALITY.anisotropy;
  return markShared(tex);
}

export function feltMap(color = [22, 70, 92], size = QUALITY.feltSize) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  noise(ctx, size, size, (x, y) => {
    const n = (hash(x, y) - 0.5) * 18;
    return color.map((v) => Math.max(0, Math.min(255, v + n)));
  });
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = QUALITY.anisotropy;
  return markShared(tex);
}

export function sharpenTexture(tex) {
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = QUALITY.anisotropy;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function wrapLabelLines(ctx, text, maxW) {
  const lines = [];
  for (const para of String(text).split('\n')) {
    const words = para.split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push('');
      continue;
    }
    let cur = words[0];
    for (let i = 1; i < words.length; i++) {
      const next = `${cur} ${words[i]}`;
      if (ctx.measureText(next).width > maxW) {
        lines.push(cur);
        cur = words[i];
      } else {
        cur = next;
      }
    }
    lines.push(cur);
  }
  return lines;
}

export function paintLabel(ctx, text, {
  fill = '#f3e2c4',
  ink = '#2a1c12',
  width,
  height,
  font = 72,
  pad = 40,
} = {}) {
  const w = width || ctx.canvas.width;
  const h = height || ctx.canvas.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const maxW = Math.max(32, w - pad * 2);
  let fontSize = font;
  const fit = (fs) => {
    ctx.font = `700 ${fs}px Trebuchet MS, Segoe UI, sans-serif`;
    return wrapLabelLines(ctx, text, maxW);
  };
  let lines = fit(fontSize);
  while (fontSize > 28) {
    const tooWide = lines.some((line) => ctx.measureText(line).width > maxW);
    const tooTall = lines.length * fontSize * 1.12 > h - pad;
    if (!tooWide && !tooTall) break;
    fontSize -= 4;
    lines = fit(fontSize);
  }
  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, h / 2 + (i - (lines.length - 1) / 2) * fontSize * 1.12);
  });
}

export function labelTexture(text, {
  fill = '#f3e2c4',
  ink = '#2a1c12',
  size,
  width = 512,
  height = 256,
  font = 72,
  pad = 40,
} = {}) {
  const w = size || width;
  const h = size || height;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  paintLabel(c.getContext('2d'), text, { fill, ink, width: w, height: h, font, pad });
  return sharpenTexture(new THREE.CanvasTexture(c));
}

export function rewriteLabelTexture(tex, text, opts = {}) {
  const c = tex?.image;
  if (!c?.getContext) {
    tex?.dispose?.();
    return labelTexture(text, opts);
  }
  paintLabel(c.getContext('2d'), text, { ...opts, width: c.width, height: c.height });
  tex.needsUpdate = true;
  return tex;
}

const numberCache = new Map();

export function numberTexture(n, pips) {
  const size = QUALITY.numberSize;
  const dots = pips || 1;
  const key = `${n}:${dots}:${size}`;
  const hit = numberCache.get(key);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const s = size / 512;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = '#f4e6c6';
  ctx.beginPath();
  ctx.arc(256 * s, 256 * s, 236 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#5b3418';
  ctx.lineWidth = 14 * s;
  ctx.stroke();
  ctx.fillStyle = n === 6 || n === 8 ? '#b42318' : '#2a1c12';
  ctx.font = `700 ${Math.round(220 * s)}px Trebuchet MS, Segoe UI, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(n), 256 * s, 236 * s);
  ctx.fillStyle = n === 6 || n === 8 ? '#b42318' : '#4a3724';
  const w = (dots - 1) * 28 * s;
  for (let i = 0; i < dots; i++) {
    ctx.beginPath();
    ctx.arc(256 * s - w / 2 + i * 28 * s, 396 * s, 10 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = markShared(sharpenTexture(new THREE.CanvasTexture(c)));
  numberCache.set(key, tex);
  return tex;
}

const dieCache = new Map();

export function dieFace(n) {
  const hit = dieCache.get(n);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f7f0e4';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#5b3418';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 122, 122);
  ctx.fillStyle = '#2a1c12';
  const spots = {
    1: [[64, 64]],
    2: [[36, 36], [92, 92]],
    3: [[36, 36], [64, 64], [92, 92]],
    4: [[36, 36], [92, 36], [36, 92], [92, 92]],
    5: [[36, 36], [92, 36], [64, 64], [36, 92], [92, 92]],
    6: [[36, 36], [92, 36], [36, 64], [92, 64], [36, 92], [92, 92]],
  };
  for (const [x, y] of spots[n]) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = markShared(sharpenTexture(new THREE.CanvasTexture(c)));
  dieCache.set(n, tex);
  return tex;
}
