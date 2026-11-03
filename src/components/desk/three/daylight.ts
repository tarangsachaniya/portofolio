import { Color } from "three";

/** Piecewise colour/number curves over the hour of day (9 → 24). */
const H = [9, 12, 15, 17.5, 19, 21, 24];
const hex = (a: string[]) => a.map((c) => new Color(c));

const SKY_TOP = hex(["#5d9fe0", "#3b82d9", "#4a84cf", "#d86f45", "#3a2c6a", "#0e1438", "#03050d"]);
const SKY_BOT = hex(["#f6cf9a", "#a9d4f2", "#cfe2f1", "#ffb766", "#d4664f", "#241d49", "#090c1e"]);
const SUN = hex(["#ffd9a8", "#fff6e8", "#fff1dc", "#ff9a52", "#ff6a3d", "#5a6fd8", "#4a5ec8"]);
const WALL = hex(["#3b3a40", "#43434b", "#3f3f48", "#463a3a", "#25242e", "#16161d", "#101016"]);
const HEMI = hex(["#ffe6c7", "#dfeaff", "#e4ecff", "#ffbd8a", "#6b4f8f", "#1c2448", "#0d1230"]);

function at(h: number) {
  const x = Math.min(24, Math.max(9, h));
  let i = 0;
  while (i < H.length - 2 && x > H[i + 1]) i++;
  const k = (x - H[i]) / (H[i + 1] - H[i]);
  return { i, k: Math.min(1, Math.max(0, k)) };
}
const lerpC = (arr: Color[], h: number, out: Color) => { const { i, k } = at(h); return out.copy(arr[i]).lerp(arr[i + 1], k); };
const lerpN = (arr: number[], h: number) => { const { i, k } = at(h); return arr[i] + (arr[i + 1] - arr[i]) * k; };

export const daylight = {
  skyTop: (h: number, o: Color) => lerpC(SKY_TOP, h, o),
  skyBot: (h: number, o: Color) => lerpC(SKY_BOT, h, o),
  sun: (h: number, o: Color) => lerpC(SUN, h, o),
  wall: (h: number, o: Color) => lerpC(WALL, h, o),
  hemi: (h: number, o: Color) => lerpC(HEMI, h, o),
  sunI: (h: number) => lerpN([2.6, 3.2, 3.0, 2.2, 0.9, 0.35, 0.25], h),
  ambient: (h: number) => lerpN([0.5, 0.6, 0.55, 0.42, 0.22, 0.1, 0.07], h),
  stars: (h: number) => Math.min(1, Math.max(0, (h - 19.5) / 2)),
  cityLights: (h: number) => Math.min(1, Math.max(0, (h - 18) / 2)),
  /** sun position in window uv, and its visibility */
  sunUv: (h: number): [number, number, number] => {
    const k = Math.min(1, Math.max(0, (h - 6) / 13.5));
    return [0.05 + k * 0.9, 0.2 + Math.sin(Math.PI * k) * 0.65, 1 - Math.min(1, Math.max(0, (h - 18) / 1.2))];
  },
  moonUv: (h: number): [number, number, number] => {
    const k = Math.min(1, Math.max(0, (h - 18.5) / 5.5));
    return [0.15 + k * 0.6, 0.25 + Math.sin(Math.PI * (0.25 + k * 0.6)) * 0.55, Math.min(1, Math.max(0, (h - 18.8) / 1.2))];
  },
};
