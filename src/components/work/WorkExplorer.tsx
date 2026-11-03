"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { work } from "@/lib/content";
import { buildGraph, clusteredTechs, neighbours } from "@/lib/graph";
import ClusterGraph from "./ClusterGraph";
import { Tile } from "../desk/Bento";

const G = buildGraph(work);
const byId = new Map(G.nodes.map((n) => [n.id, n]));
const CL = clusteredTechs(work);
const clusterOf = (id: string) => CL.find((c) => `c:${c.id}` === id);
function litFor(id: string) {
  const c = clusterOf(id);
  if (!c) return neighbours(id, G.edges);
  const s = new Set<string>([id]);
  c.techs.forEach((t) => neighbours(`t:${t}`, G.edges).forEach((x) => s.add(x)));
  return s;
}

const SIZE = (_i: number, featured?: boolean, kind?: string) => (featured ? "2x2" : kind === "Product" ? "2x1" : "1x1") as "2x2" | "2x1" | "1x1";

/** Projects page (desk world): a dependency graph of projects ↔ tech ↔ platforms, then a filterable bento of every project. */
export default function WorkExplorer() {
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hover ?? pinned;
  const lit = useMemo(() => (active ? litFor(active) : null), [active]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && (setPinned(null), setHover(null));
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const cl = active ? clusterOf(active) : undefined;
  const node = active ? (cl ? { id: active, kind: "tech" as const, label: cl.label } : byId.get(active)) : null;
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
          <div className="tile !col-auto !transform-none relative hidden overflow-hidden p-5 md:block" role="img" aria-describedby="graph-desc">
            <div className="mb-4 grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.6fr)] gap-x-[clamp(3rem,7vw,7rem)] font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fg-3">
              <span>Stack · {G.techCount} tools in {CL.length} groups</span><span>Projects · {work.length}</span><span />
            </div>
            <ClusterGraph edges={G.edges} lit={lit} active={active} bind={bind} />
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
                <p className="t-kicker">{cl ? "Stack group" : node.kind === "tech" ? "Technology" : "Platform"}</p>
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
          {[...CL.map((c) => ({ id: `c:${c.id}`, label: c.label, count: c.techs.length })), ...G.nodes.filter((n) => n.kind === "platform")].map((n) => (
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
