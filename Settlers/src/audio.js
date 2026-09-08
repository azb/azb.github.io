let ctx;

function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, dur = 0.12, type = 'sine', gain = 0.06) {
  const a = audio();
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
  o.connect(g).connect(a.destination);
  o.start();
  o.stop(a.currentTime + dur);
}

export const sfx = {
  unlock: () => audio(),
  dice: () => {
    tone(180, 0.05, 'square', 0.04);
    setTimeout(() => tone(140, 0.08, 'triangle', 0.05), 80);
    setTimeout(() => tone(90, 0.12, 'sawtooth', 0.03), 160);
  },
  place: () => tone(220, 0.1, 'triangle', 0.05),
  click: () => tone(520, 0.05, 'square', 0.03),
  win: () => {
    [262, 330, 392, 523].forEach((f, i) => setTimeout(() => tone(f, 0.28, 'sine', 0.07), i * 140));
  },
  bad: () => tone(90, 0.16, 'sawtooth', 0.04),
};
