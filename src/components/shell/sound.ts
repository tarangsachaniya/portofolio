/**
 * Tiny synthesized UI sounds (no audio files). Off by default; the user opts in.
 * Each sound is a few ms of filtered noise + a pitched thump.
 */
let ctx: AudioContext | null = null;

function ac() {
  if (typeof window === "undefined") return null;
  if (document.documentElement.dataset.sound !== "on") return null;
  ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  return ctx;
}

export function playKey(kind: "key" | "space" | "enter" | "switch" = "key") {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  // click: band-passed noise burst
  const len = kind === "space" ? 0.06 : 0.035;
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * len), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = kind === "space" ? 1800 : 3200 + Math.random() * 900;
  bp.Q.value = 1.4;
  const g = c.createGain();
  g.gain.value = kind === "switch" ? 0.18 : 0.32;
  src.connect(bp).connect(g).connect(c.destination);
  src.start(t);
  // thump
  const o = c.createOscillator();
  const og = c.createGain();
  o.frequency.setValueAtTime(kind === "enter" || kind === "space" ? 140 : 210, t);
  o.frequency.exponentialRampToValueAtTime(60, t + 0.05);
  og.gain.setValueAtTime(0.16, t);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
  o.connect(og).connect(c.destination);
  o.start(t);
  o.stop(t + 0.08);
}
