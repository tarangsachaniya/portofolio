"use client";

import { CanvasTexture, LinearFilter, RepeatWrapping, SRGBColorSpace, type Texture } from "three";

/**
 * Procedural textures, drawn once on a <canvas>. Nothing to download: the whole
 * desk is code. Cached per session so every mesh shares one GPU upload.
 */
const cache = new Map<string, Texture>();

function make(key: string, w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, opts: { srgb?: boolean; repeat?: [number, number] } = {}) {
  const hit = cache.get(key);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  draw(g, w, h);
  const t = new CanvasTexture(c);
  if (opts.srgb !== false) t.colorSpace = SRGBColorSpace;
  t.anisotropy = 8;
  if (opts.repeat) { t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(...opts.repeat); }
  cache.set(key, t);
  return t;
}

/** Seeded PRNG so textures look the same on every load. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/* ───────── wood: walnut desk top / oak floor planks ───────── */
export function walnut() {
  return make("walnut", 1024, 512, (g, w, h) => {
    const r = rng(7);
    const base = g.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, "#5b3a25"); base.addColorStop(0.5, "#4c2f1d"); base.addColorStop(1, "#573823");
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) {
      const y = r() * h, amp = 2 + r() * 10, f = 0.002 + r() * 0.01, ph = r() * 6;
      g.strokeStyle = `rgba(${r() < 0.5 ? "30,18,10" : "120,80,50"},${0.05 + r() * 0.12})`;
      g.lineWidth = 0.6 + r() * 2.2;
      g.beginPath();
      for (let x = 0; x <= w; x += 8) g.lineTo(x, y + Math.sin(x * f + ph) * amp + Math.sin(x * f * 3.1) * amp * 0.3);
      g.stroke();
    }
    for (let i = 0; i < 6; i++) { // knots
      const x = r() * w, y = r() * h;
      const k = g.createRadialGradient(x, y, 0, x, y, 10 + r() * 16);
      k.addColorStop(0, "rgba(25,14,8,0.5)"); k.addColorStop(1, "rgba(25,14,8,0)");
      g.fillStyle = k; g.beginPath(); g.ellipse(x, y, 30, 8, 0, 0, Math.PI * 2); g.fill();
    }
  }, { repeat: [1.4, 1] });
}

export function planks() {
  return make("planks", 1024, 1024, (g, w, h) => {
    const r = rng(11);
    const rows = 8;
    for (let i = 0; i < rows; i++) {
      const y = (i / rows) * h, ph = (i * h) / rows;
      const tone = 34 + Math.floor(r() * 16);
      g.fillStyle = `rgb(${tone + 14},${tone + 2},${tone - 8})`; g.fillRect(0, y, w, h / rows);
      for (let k = 0; k < 40; k++) {
        g.strokeStyle = `rgba(0,0,0,${0.04 + r() * 0.08})`; g.lineWidth = 1 + r() * 2;
        const yy = y + r() * (h / rows);
        g.beginPath(); g.moveTo(0, yy); g.bezierCurveTo(w * 0.3, yy + r() * 6 - 3, w * 0.7, yy + r() * 6 - 3, w, yy); g.stroke();
      }
      g.fillStyle = "rgba(0,0,0,0.55)"; g.fillRect(0, y, w, 3);
      const cut = (r() * w + ph) % w; g.fillRect(cut, y, 3, h / rows);
    }
  }, { repeat: [3, 3] });
}

/* ───────── plaster wall: subtle bump ───────── */
export function plaster() {
  return make("plaster", 512, 512, (g, w, h) => {
    const r = rng(3);
    g.fillStyle = "#808080"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i++) { const v = 100 + r() * 60; g.fillStyle = `rgba(${v},${v},${v},0.25)`; g.fillRect(r() * w, r() * h, 1 + r() * 3, 1 + r() * 3); }
  }, { srgb: false, repeat: [6, 3] });
}

/* ───────── brushed metal roughness ───────── */
export function brushed() {
  return make("brushed", 256, 256, (g, w, h) => {
    const r = rng(5);
    g.fillStyle = "#6b6b6b"; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y++) { const v = 90 + r() * 60; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(0, y, w, 1); }
  }, { srgb: false, repeat: [1, 4] });
}

/* ───────── keycap legends: one atlas, 8×8 cells ───────── */
export const LEGEND_CELLS = 8;
export function legendAtlas(chars: string[]) {
  return make(`legends:${chars.join("")}`, 1024, 1024, (g, w) => {
    const cell = w / LEGEND_CELLS;
    g.clearRect(0, 0, w, w);
    g.textAlign = "center"; g.textBaseline = "middle";
    chars.forEach((ch, i) => {
      const x = (i % LEGEND_CELLS) * cell + cell / 2, y = Math.floor(i / LEGEND_CELLS) * cell + cell / 2;
      const long = ch.length > 1;
      g.font = `600 ${long ? 30 : 54}px "JetBrains Mono", ui-monospace, monospace`;
      g.fillStyle = "rgba(235,232,224,0.92)";
      g.fillText(ch, x, y);
    });
  });
}

/* ───────── book spines ───────── */
export function spine(label: string, bg: string, fg: string) {
  return make(`spine:${label}:${bg}`, 512, 96, (g, w, h) => {
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(0, 0, w, 6); g.fillRect(0, h - 6, w, 6);
    g.fillStyle = fg; g.font = `700 44px "Bricolage Grotesque Variable", system-ui, sans-serif`; g.textBaseline = "middle";
    g.fillText(label, 26, h / 2 + 2);
    g.fillRect(w - 60, h / 2 - 10, 20, 20);
  });
}

/* ───────── notebook page ───────── */
export function ruled() {
  return make("ruled", 256, 512, (g, w, h) => {
    g.fillStyle = "#efe9dc"; g.fillRect(0, 0, w, h);
    g.strokeStyle = "rgba(90,120,170,0.35)"; g.lineWidth = 2;
    for (let y = 60; y < h; y += 26) { g.beginPath(); g.moveTo(14, y); g.lineTo(w - 14, y); g.stroke(); }
    g.strokeStyle = "rgba(220,90,80,0.45)"; g.beginPath(); g.moveTo(44, 0); g.lineTo(44, h); g.stroke();
    g.fillStyle = "rgba(40,40,60,0.7)"; g.font = `500 22px "JetBrains Mono", monospace`;
    ["todo:", "- ship deploy", "- reply leads", "- lamp ✓"].forEach((t, i) => g.fillText(t, 54, 82 + i * 26));
  });
}

/* ───────── small label (npm cube etc.) ───────── */
export function label(text: string, bg: string, fg: string) {
  return make(`label:${text}:${bg}`, 256, 256, (g, w, h) => {
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.fillStyle = fg; g.font = `800 92px "JetBrains Mono", monospace`; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(text, w / 2, h / 2 + 4);
  });
}

/* ───────── steam puff sprite ───────── */
export function puff() {
  return make("puff", 128, 128, (g, w) => {
    const k = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    k.addColorStop(0, "rgba(255,255,255,0.55)"); k.addColorStop(0.5, "rgba(255,255,255,0.18)"); k.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = k; g.fillRect(0, 0, w, w);
  });
}

/* ───────── phone lock screen: redrawn when the notification changes ───────── */
export function phoneScreen(time: string, app: string, msg: string) {
  const key = `phone:${time}:${app}`;
  return make(key, 256, 512, (g, w, h) => {
    const bg = g.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#232a52"); bg.addColorStop(1, "#0d0f1a");
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.fillStyle = "rgba(255,255,255,0.92)"; g.textAlign = "center";
    g.font = `600 64px "Bricolage Grotesque Variable", system-ui, sans-serif`; g.fillText(time, w / 2, 120);
    g.fillStyle = "rgba(255,255,255,0.14)";
    const y = 170; g.beginPath(); g.roundRect(16, y, w - 32, 104, 18); g.fill();
    g.textAlign = "left"; g.fillStyle = "rgba(255,255,255,0.55)"; g.font = `500 17px "JetBrains Mono", monospace`; g.fillText(app.toUpperCase(), 32, y + 30);
    g.fillStyle = "rgba(255,255,255,0.92)"; g.font = `500 20px "Bricolage Grotesque Variable", system-ui, sans-serif`;
    const words = msg.split(" "); let line = "", ly = y + 60;
    for (const wd of words) { if (g.measureText(line + wd).width > w - 64) { g.fillText(line, 32, ly); line = ""; ly += 24; } line += wd + " "; }
    g.fillText(line, 32, ly);
  });
}

export function ready() {
  // Canvas text uses whatever webfonts are loaded; wait for them before the first draw.
  return document.fonts?.ready ?? Promise.resolve();
}

export { LinearFilter };
