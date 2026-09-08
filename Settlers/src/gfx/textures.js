import * as THREE from 'three';

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
  return tex;
}

export function feltMap(color = [22, 70, 92]) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  noise(ctx, 256, 256, (x, y) => {
    const n = (hash(x, y) - 0.5) * 18;
    return color.map((v) => Math.max(0, Math.min(255, v + n)));
  });
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function sharpenTexture(tex) {
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function labelTexture(text, {
  fill = '#f3e2c4',
  ink = '#2a1c12',
  size,
  width = 512,
  height = 256,
  font = 72,
} = {}) {
  const w = size || width;
  const h = size || height;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = ink;
  ctx.font = `700 ${font}px Trebuchet MS, Segoe UI, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lines = String(text).split('\n');
  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, h / 2 + (i - (lines.length - 1) / 2) * font * 1.05);
  });
  return sharpenTexture(new THREE.CanvasTexture(c));
}

export function numberTexture(n, pips) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);
  ctx.fillStyle = '#f4e6c6';
  ctx.beginPath();
  ctx.arc(256, 256, 236, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#5b3418';
  ctx.lineWidth = 14;
  ctx.stroke();
  ctx.fillStyle = n === 6 || n === 8 ? '#b42318' : '#2a1c12';
  ctx.font = '700 220px Trebuchet MS, Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(n), 256, 236);
  const dots = pips || 1;
  ctx.fillStyle = n === 6 || n === 8 ? '#b42318' : '#4a3724';
  const w = (dots - 1) * 28;
  for (let i = 0; i < dots; i++) {
    ctx.beginPath();
    ctx.arc(256 - w / 2 + i * 28, 396, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  return sharpenTexture(new THREE.CanvasTexture(c));
}

export function dieFace(n) {
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
  return sharpenTexture(new THREE.CanvasTexture(c));
}
