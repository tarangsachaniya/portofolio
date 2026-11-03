"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { work } from "@/lib/content";
import { buildGraph, neighbours, type GNode } from "@/lib/graph";
import { Tile } from "../desk/Bento";

const G = buildGraph(work);
const byId = new Map(G.nodes.map((n) => [n.id, n]));
const COL = { tech: 22, project: 50, platform: 80 } as const; // x anchor (%) per column
const PROJ_HALF = 10.5; // project pill half-width (%) for edge anchoring
const ROW = 30; // px per tech row; the graph is as tall as its longest column

function edgePath(a: GNode, b: GNode, h: number) {
  const x1 = a.kind === "tech" ? COL.tech : COL.project + PROJ_HALF;
  const x2 = b.kind === "platform" ? COL.platform : COL.project - PROJ_HALF;
  const y1 = a.y * h;
  const y2 = b.y * h;
  const mx = (x1 + x2) / 2;
  return `M ${x1 * 10} ${y1} C ${mx * 10} ${y1}, ${mx * 10} ${y2}, ${x2 * 10} ${y2}`;
}

const SIZE = (_i: number, featured?: boolean, kind?: string) => (featured ? "2x2" : kind === "Product" ? "2x1" : "1x1") as "2x2" | "2x1" | "1x1";

/** Projects page (desk world): a dependency graph of projects ↔ tech ↔ platforms, then a filterable bento of every project. */
export default function WorkExplorer() {
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hover ?? pinned;
  const lit = useMemo(() => (active ? neighbours(active, G.edges) : null), [active]);
  const h = Math.max(G.techCount, 11) * ROW;

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && (setPinned(null), setHover(null));
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const node = active ? byId.get(active) : null;
  const proj = node?.kind === "project" ? work.find((w) => `p:${w.slug}` === node.id) : null;
  const users = node && node.kind !== "project" ? work.filter((w) => lit?.has(`p:${w.slug}`)) : [];
  const matches = (slug: string) => !lit || lit.has(`p:${slug}`);

  const bind = (id: string) => ({
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    onClick: () => setPinned((p) => (p === id ? null : id)),
    "aria-pressed": pinned === id,
  });

  return (
    <div className="wrap">
      {/* ── graph ── */}
      <section aria-labelledby="graph-title" className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#ffc46b]">package.json, for a career</p>
            <h2 id="graph-title" className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.04em]">Dependency graph</h2>
          </div>
          <p className="max-w-[46ch] text-sm text-fg-2">
            Hover a project to light up what it runs on. Hover a technology to see every project that uses it. Click to pin, <kbd className="font-mono">Esc</kbd> to clear.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="tile !col-auto !transform-none relative hidden overflow-hidden p-4 md:block" role="img" aria-describedby="graph-desc">
            <div className="mb-3 grid grid-cols-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-3">
              <span className="text-right pr-[28%]">Tech · {G.techCount}</span><span className="text-center">Projects · {work.length}</span><span className="pl-[30%]">Platforms · {G.platCount}</span>
            </div>
            <div className={`relative ${lit ? "dim" : ""}`} style={{ height: h }}>
              <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 1000 ${h}`} preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="edge-grad" x1="0" x2="1">
                    <stop offset="0" stopColor="#5ee0c1" /><stop offset="0.5" stopColor="#ffb547" /><stop offset="1" stopColor="#9b8cff" />
                  </linearGradient>
                </defs>
                {G.edges.map((e) => {
                  const on = !!active && (e.from === active || e.to === active);
                  return <path key={e.from + e.to} d={edgePath(byId.get(e.from)!, byId.get(e.to)!, h)} className={`edge ${on ? "on" : ""}`} vectorEffect="non-scaling-stroke" />;
                })}
              </svg>
              {G.nodes.map((n) => {
                const on = !!lit?.has(n.id);
                const style: React.CSSProperties = { top: `${n.y * 100}%` };
                if (n.kind === "tech") return (
                  <button key={n.id} type="button" {...bind(n.id)} style={{ ...style, right: `${100 - COL.tech}%` }} className={`gnode absolute -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-[3px] font-mono text-[0.68rem] transition-colors ${on ? "on border-[#5ee0c1]/70 bg-[#5ee0c1]/15 text-white" : "border-white/10 bg-[#11141a] text-fg-2 hover:text-white"}`}>
                    {n.label}<span className="ml-1.5 text-fg-3">{n.count}</span>
                  </button>
                );
                if (n.kind === "platform") return (
                  <button key={n.id} type="button" {...bind(n.id)} style={{ ...style, left: `${COL.platform}%` }} className={`gnode absolute -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[0.72rem] transition-colors ${on ? "on border-[#9b8cff]/70 bg-[#9b8cff]/15 text-white" : "border-white/10 bg-[#11141a] text-fg-2 hover:text-white"}`}>
                    ▣ {n.label}<span className="ml-1.5 text-fg-3">{n.count}</span>
                  </button>
                );
                return (
                  <button key={n.id} type="button" {...bind(n.id)} style={{ ...style, left: `${COL.project - PROJ_HALF}%`, width: `${PROJ_HALF * 2}%` }} className={`gnode absolute flex -translate-y-1/2 items-center gap-2 overflow-hidden rounded-xl border px-3 py-1.5 text-left text-[0.82rem] font-semibold transition-all ${on ? "on scale-[1.04] border-[#ffb547]/70 bg-[#ffb547]/12 text-white shadow-[0_0_30px_-6px_rgb(255_181_71/0.6)]" : "border-white/12 bg-[#151820] text-fg hover:border-white/30"}`}>
                    <i className="size-2 shrink-0 rounded-full" style={{ background: `hsl(${n.hue} 70% 60%)` }} />
                    <span className="truncate">{n.label}</span>
                  </button>
                );
              })}
            </div>
            <p id="graph-desc" className="sr-only">
              {work.map((w) => `${w.name} runs on ${[...w.stack, ...w.platforms].join(", ") || "its platforms"}.`).join(" ")}
            </p>
          </div>

          {/* inspector */}
          <aside className="tile !col-auto !transform-none hidden p-5 md:block lg:sticky lg:top-24 lg:self-start" aria-live="polite">
            {proj ? (
              <div key={proj.slug} className="animate-[fadeUp_.35s_ease_both]">
                <p className="t-kicker">{proj.kind} · {proj.status} · {proj.year}</p>
                <p className="mt-2 font-display text-2xl font-bold tracking-[-0.03em]">{proj.name}</p>
                <p className="mt-1 text-sm text-fg-2">{proj.what}</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                  {proj.shots[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={proj.shots[0].src} alt="" className="aspect-[16/10] w-full object-cover object-top" />
                  ) : (
                    <div className="grid aspect-[16/10] place-items-center font-display text-xl font-bold text-white/85" style={{ background: `linear-gradient(135deg,hsl(${proj.hue} 45% 22%),hsl(${(proj.hue + 40) % 360} 40% 12%))` }}>{proj.name}</div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">{[...proj.stack, ...proj.platforms].map((s) => <span key={s} className="tag">{s}</span>)}</div>
                <Link href={`/work/${proj.slug}/`} className="btn btn-primary mt-5 w-full justify-center !py-2.5 text-sm">Open case study →</Link>
              </div>
            ) : node ? (
              <div key={node.id} className="animate-[fadeUp_.35s_ease_both]">
                <p className="t-kicker">{node.kind === "tech" ? "Technology" : "Platform"}</p>
                <p className="mt-2 font-display text-2xl font-bold tracking-[-0.03em]">{node.label}</p>
                <p className="mt-1 text-sm text-fg-2">Used by {users.length} {users.length === 1 ? "project" : "projects"}</p>
                <ul className="mt-4 space-y-1.5">
                  {users.map((w) => (
                    <li key={w.slug}><Link href={`/work/${w.slug}/`} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-[#ffb547]/50"><span>{w.name}</span><span className="font-mono text-[0.7rem] text-fg-3">{w.year}</span></Link></li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p className="t-kicker">Inspector</p>
                <p className="mt-3 font-display text-xl font-semibold leading-snug">Hover anything in the graph.</p>
                <p className="mt-2 text-sm text-fg-2">Projects light up their stack and platforms. Technologies light up every project that depends on them.</p>
                <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
                  {[[work.length, "projects"], [G.techCount, "tech"], [G.edges.length, "edges"]].map(([v, l]) => (
                    <div key={l} className="rounded-xl border border-white/10 py-3"><dt className="sr-only">{l}</dt><dd className="font-display text-2xl font-bold text-glow">{v}</dd><p className="font-mono text-[0.6rem] uppercase tracking-widest text-fg-3">{l}</p></div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>

        {/* mobile: graph collapses to filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:hidden" aria-label="Filter projects by technology or platform">
          {G.nodes.filter((n) => n.kind !== "project" && n.count > 1).map((n) => (
            <button key={n.id} type="button" onClick={() => setPinned((p) => (p === n.id ? null : n.id))} aria-pressed={pinned === n.id} className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-xs ${pinned === n.id ? "border-[#ffb547] bg-[#ffb547]/15 text-white" : "border-white/15 text-fg-2"}`}>
              {n.label} <span className="text-fg-3">{n.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── every project, as a bento ── */}
      <section aria-labelledby="all-title" className="section !pt-16">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="all-title" className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.04em]">Every project</h2>
          <p className="font-mono text-xs text-fg-3">{lit && node ? `filtered by ${node.label} · ` : ""}{work.length} total</p>
        </div>
        <div className="bento">
          {work.map((w, i) => {
            const size = SIZE(i, w.featured, w.kind);
            const on = matches(w.slug);
            return (
              <Tile key={w.slug} size={size} href={`/work/${w.slug}/`} className={`group transition-[opacity,filter] duration-300 ${on ? "" : "pointer-events-none opacity-25 grayscale"}`} label={`${w.name}: ${w.what}`}>
                <div className="flex h-full flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="t-kicker">{w.kind} · {w.year}</p>
                    <span className={`flex items-center gap-1.5 font-mono text-[0.66rem] ${w.status === "Live" ? "text-[#5ee0c1]" : "text-fg-3"}`}>{w.status === "Live" && <span className="live-dot" />}{w.status}</span>
                  </div>
                  <h3 className={`mt-3 font-display font-bold tracking-[-0.03em] ${size === "2x2" ? "text-[clamp(1.6rem,2.6vw,2.4rem)]" : "text-xl"}`}>{w.name}</h3>
                  <p className="mt-1 text-sm text-fg-2">{w.what}</p>
                  {size === "2x2" && (
                    <div className="relative mt-4 min-h-[12rem] flex-1 overflow-hidden rounded-xl border border-white/10">
                      {w.shots[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={w.shots[0].src} alt={w.shots[0].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.04]" />
                      ) : (
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,hsl(${w.hue} 45% 22%),hsl(${(w.hue + 40) % 360} 40% 12%))` }} />
                      )}
                    </div>
                  )}
                  <div className="mt-auto flex flex-wrap gap-1 pt-4">{w.platforms.map((p) => <span key={p} className="tag !text-[0.66rem]">{p}</span>)}</div>
                </div>
              </Tile>
            );
          })}
        </div>
      </section>
    </div>
  );
}
