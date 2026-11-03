import { work, type Work } from "./content";

export type NodeKind = "project" | "tech" | "platform";
export interface GNode { id: string; kind: NodeKind; label: string; y: number; count: number; hue?: number }
export interface GEdge { from: string; to: string }

/** Project ↔ tech/platform graph with a deterministic three-column layout (y in 0..1). */
export function buildGraph(list: Work[] = work) {
  const techCount = new Map<string, number>();
  const platCount = new Map<string, number>();
  for (const w of list) {
    w.stack.forEach((t) => techCount.set(t, (techCount.get(t) ?? 0) + 1));
    w.platforms.forEach((p) => platCount.set(p, (platCount.get(p) ?? 0) + 1));
  }
  // Most-shared tech in the middle of the column, so the busiest edges stay short.
  const centre = <T,>(arr: T[]) => { const out: T[] = []; arr.forEach((x, i) => (i % 2 ? out.push(x) : out.unshift(x))); return out; };
  const techs = centre([...techCount.entries()].sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0])));
  const plats = centre([...platCount.entries()].sort((a, b) => a[1] - b[1]));
  const spread = (i: number, n: number) => (n === 1 ? 0.5 : 0.03 + (0.94 * i) / (n - 1));

  const nodes: GNode[] = [
    ...list.map((w, i) => ({ id: `p:${w.slug}`, kind: "project" as const, label: w.name, y: spread(i, list.length), count: w.stack.length + w.platforms.length, hue: w.hue })),
    ...techs.map(([t, c], i) => ({ id: `t:${t}`, kind: "tech" as const, label: t, y: spread(i, techs.length), count: c })),
    ...plats.map(([p, c], i) => ({ id: `f:${p}`, kind: "platform" as const, label: p, y: spread(i, plats.length), count: c })),
  ];
  const edges: GEdge[] = list.flatMap((w) => [
    ...w.stack.map((t) => ({ from: `t:${t}`, to: `p:${w.slug}` })),
    ...w.platforms.map((p) => ({ from: `p:${w.slug}`, to: `f:${p}` })),
  ]);
  return { nodes, edges, techCount: techs.length, platCount: plats.length };
}

/** Everything directly wired to `id`, including itself. */
export function neighbours(id: string, edges: GEdge[]) {
  const s = new Set([id]);
  for (const e of edges) {
    if (e.from === id) s.add(e.to);
    if (e.to === id) s.add(e.from);
  }
  return s;
}

/** Tech grouped by domain, so the graph reads as a stack rather than a list. */
export const CLUSTERS: { id: string; label: string; hue: string; techs: string[] }[] = [
  { id: "frontend", label: "Frontend", hue: "#7cc4ff", techs: ["Next.js", "React", "TypeScript"] },
  { id: "runtime", label: "Runtime & API", hue: "#ffb547", techs: ["Bun", "Hono", "Node.js", "WebSockets"] },
  { id: "data", label: "Data", hue: "#5ee0c1", techs: ["PostgreSQL", "Drizzle", "Redis", "MongoDB"] },
  { id: "ops", label: "Cloud & ops", hue: "#9b8cff", techs: ["Nginx", "Cloudflare R2", "Cloudinary", "npm"] },
  { id: "comms", label: "Payments & messaging", hue: "#ff8a5c", techs: ["Razorpay", "FCM", "Resend"] },
  { id: "ds", label: "Data science", hue: "#e7a6ff", techs: ["Python", "Pandas", "Matplotlib", "scikit-learn"] },
  { id: "hw", label: "Hardware", hue: "#c9e265", techs: ["OpenCV", "IoT", "NFC"] },
];

/** Clusters with only the techs actually used, plus any unclustered tech under "Other". */
export function clusteredTechs(list: Work[] = work) {
  const used = new Set(list.flatMap((w) => w.stack));
  const known = new Set(CLUSTERS.flatMap((c) => c.techs));
  const out = CLUSTERS.map((c) => ({ ...c, techs: c.techs.filter((t) => used.has(t)) })).filter((c) => c.techs.length);
  const other = [...used].filter((t) => !known.has(t));
  if (other.length) out.push({ id: "other", label: "Other", hue: "#b9bfcb", techs: other });
  return out;
}
