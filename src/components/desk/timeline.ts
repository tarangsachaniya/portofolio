/** The working day the home page scrolls through. Bands are fractions of the pinned scroll. */
export const STEPS = [
  { id: "boot", label: "Boot", time: "09:00", h: 9, at: 0, verb: "Monitor wakes up" },
  { id: "commit", label: "Commit", time: "10:30", h: 10.5, at: 0.14, verb: "The story, as git log" },
  { id: "build", label: "Build", time: "12:30", h: 12.5, at: 0.31, verb: "Projects in the editor" },
  { id: "review", label: "Review", time: "15:00", h: 15, at: 0.48, verb: "Ask about Tarang" },
  { id: "deploy", label: "Deploy", time: "18:00", h: 18, at: 0.65, verb: "What's live in production" },
  { id: "ship", label: "Ship", time: "21:30", h: 21.5, at: 0.82, verb: "Say hello" },
] as const;
export type StepId = (typeof STEPS)[number]["id"];

/** Hour of day (9 → 23.98) for scroll progress p. Piecewise so each step lands on its clock time. */
export function hourAt(p: number) {
  const pts = [...STEPS.map((s) => [s.at, s.h] as const), [1, 23 + 59 / 60] as const];
  if (p <= 0) return 9;
  for (let i = 1; i < pts.length; i++) {
    const [a, ha] = pts[i - 1];
    const [b, hb] = pts[i];
    if (p <= b) return ha + ((p - a) / (b - a)) * (hb - ha);
  }
  return 23 + 59 / 60;
}

export function stepAt(p: number) {
  let i = 0;
  for (let k = 0; k < STEPS.length; k++) if (p >= STEPS[k].at) i = k;
  return i;
}

/** 0..1 progress inside step i. */
export function localAt(p: number, i: number) {
  const a = STEPS[i].at;
  const b = i + 1 < STEPS.length ? STEPS[i + 1].at : 1;
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}

export function fmtHour(h: number) {
  const hh = Math.floor(h);
  const mm = Math.min(59, Math.floor((h - hh) * 60));
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

/** Deterministic short hash for fake commit ids / build ids. */
export function hash(s: string, n = 7) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, n);
}

/** Reveal a string progressively for t in 0..1 (finishes at `end`). */
export function reveal(text: string, t: number, end = 0.85) {
  return text.slice(0, Math.round(text.length * Math.min(1, Math.max(0, t / end))));
}
