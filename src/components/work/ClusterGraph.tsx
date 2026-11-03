"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { work } from "@/lib/content";
import { clusteredTechs, type GEdge } from "@/lib/graph";

const CL = clusteredTechs(work);
const PLATFORMS = [...new Set(work.flatMap((w) => w.platforms))];
const count = (id: string, edges: GEdge[]) => edges.filter((e) => e.from === id || e.to === id).length;

type Anchor = { l: number; r: number; y: number };

/** Projects in the middle, tech clusters on the left, platforms on the right. Edges are measured from the real DOM. */
export default function ClusterGraph({ edges, lit, active, bind }: { edges: GEdge[]; lit: Set<string> | null; active: string | null; bind: (id: string) => Record<string, unknown> }) {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef(new Map<string, HTMLElement>());
  const [pos, setPos] = useState<Record<string, Anchor>>({});
  const [h, setH] = useState(0);
  const reg = (id: string) => (el: HTMLElement | null) => { if (el) els.current.set(id, el); };

  useLayoutEffect(() => {
    const measure = () => {
      const b = box.current?.getBoundingClientRect();
      if (!b) return;
      const next: Record<string, Anchor> = {};
      els.current.forEach((el, id) => { const r = el.getBoundingClientRect(); next[id] = { l: r.left - b.left, r: r.right - b.left, y: r.top - b.top + r.height / 2 }; });
      setPos(next);
      setH(b.height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  const on = (id: string) => !!lit?.has(id);
  const path = (e: GEdge) => {
    const a = pos[e.from];
    const b = pos[e.to];
    if (!a || !b) return "";
    const x1 = a.r + 2, x2 = b.l - 2, mx = (x1 + x2) / 2;
    return `M ${x1} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${x2} ${b.y}`;
  };

  return (
    <div ref={box} className={`relative grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.6fr)] gap-x-[clamp(3rem,7vw,7rem)] ${lit ? "dim" : ""}`}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" style={{ height: h }} aria-hidden>
        <defs>
          <linearGradient id="edge-grad" x1="0" x2="1"><stop offset="0" stopColor="#5ee0c1" /><stop offset="0.5" stopColor="#ffb547" /><stop offset="1" stopColor="#9b8cff" /></linearGradient>
        </defs>
        {edges.map((e) => <path key={e.from + e.to} d={path(e)} className={`edge ${active && (e.from === active || e.to === active || (active.startsWith("c:") && lit?.has(e.from) && lit?.has(e.to) && e.from.startsWith("t:"))) ? "on" : ""}`} />)}
      </svg>

      {/* tech clusters */}
      <div className="relative space-y-2.5">
        {CL.map((c) => {
          const cid = `c:${c.id}`;
          return (
            <div key={c.id} className={`gnode rounded-2xl border bg-[#11141a]/90 p-3 transition-colors ${on(cid) || c.techs.some((t) => on(`t:${t}`)) ? "on border-white/20" : "border-white/[0.07]"}`}>
              <button type="button" {...bind(cid)} className="flex w-full items-center justify-between gap-2 text-left">
                <span className="flex items-center gap-2 text-[0.8rem] font-semibold text-fg"><i className="size-2 rounded-full" style={{ background: c.hue, boxShadow: `0 0 10px ${c.hue}` }} />{c.label}</span>
                <span className="font-mono text-[0.62rem] text-fg-3">{c.techs.length}</span>
              </button>
              <div className="mt-2 flex flex-wrap justify-end gap-1.5">
                {c.techs.map((t) => {
                  const id = `t:${t}`;
                  return (
                    <button key={t} ref={reg(id)} type="button" {...bind(id)} className={`gnode rounded-full border px-2 py-[3px] font-mono text-[0.66rem] transition-colors ${on(id) ? "on text-white" : "border-white/10 text-fg-2 hover:text-white"}`} style={on(id) ? { borderColor: c.hue, background: `${c.hue}22` } : undefined}>
                      {t}{count(id, edges) > 1 && <span className="ml-1 text-fg-3">×{count(id, edges)}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* projects */}
      <div className="relative flex flex-col justify-between gap-2 py-2">
        {work.map((w) => {
          const id = `p:${w.slug}`;
          return (
            <button key={w.slug} ref={reg(id)} type="button" {...bind(id)} className={`gnode flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-[0.85rem] font-semibold transition-all ${on(id) ? "on scale-[1.03] border-[#ffb547]/70 bg-[#ffb547]/12 text-white shadow-[0_0_30px_-6px_rgb(255_181_71/0.6)]" : "border-white/10 bg-[#151820] text-fg hover:border-white/30"}`}>
              <i className="size-2 shrink-0 rounded-full" style={{ background: `hsl(${w.hue} 70% 60%)` }} />
              <span className="truncate">{w.name}</span>
              <span className="ml-auto shrink-0 font-mono text-[0.6rem] font-normal text-fg-3">{w.year}</span>
            </button>
          );
        })}
      </div>

      {/* platforms */}
      <div className="relative flex flex-col justify-center gap-2.5">
        <p className="mb-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fg-3">Runs on</p>
        {PLATFORMS.map((p) => {
          const id = `f:${p}`;
          return (
            <button key={p} ref={reg(id)} type="button" {...bind(id)} className={`gnode flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.72rem] transition-colors ${on(id) ? "on border-[#9b8cff]/70 bg-[#9b8cff]/15 text-white" : "border-white/10 bg-[#11141a] text-fg-2 hover:text-white"}`}>
              ▣ {p}<span className="text-fg-3">×{count(id, edges)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
