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
