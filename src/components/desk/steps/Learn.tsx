"use client";
import { now, uses } from "@/lib/content";

/** 13:30: lunch at the desk. One tab per thing I'm learning; the toolbox I already use alongside. */
export default function Learn({ t, pick, onPick }: { t: number; pick?: number | null; onPick?: (i: number) => void }) {
  const n = now.learning.length;
  const i = pick ?? Math.min(n - 1, Math.floor(t * n));
  const topic = now.learning[i];
  const related = now.items.find((x) => topic.split(/[ ,]+/).some((w) => w.length > 3 && x.toLowerCase().includes(w.toLowerCase())));
  return (
    <div className="@container grid h-full grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden bg-[#f4f1ea] text-[#1d1c19]">
      {/* tabs */}
      <div className="flex items-end gap-1 overflow-hidden bg-[#dcd7cc] px-3 pt-2">
        {now.learning.map((l, k) => (
          <button key={l} type="button" onClick={() => onPick?.(k)} className={`max-w-[12rem] truncate rounded-t-xl px-4 py-2 text-[0.82rem] ${k === i ? "bg-[#f4f1ea] font-semibold" : "text-black/55 hover:bg-black/5"}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 border-b border-black/10 px-4 py-2">
        <span className="flex gap-2 text-black/35" aria-hidden>‹ › ↻</span>
        <span className="flex-1 truncate rounded-full bg-black/[0.06] px-4 py-1.5 font-mono text-[0.78rem] text-black/60">~/learning/{topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}</span>
      </div>
      <div className="grid min-h-0 gap-0 @[46rem]:grid-cols-[minmax(0,1fr)_19rem]">
        <article key={topic} className="min-h-0 animate-[fadeUp_.4s_ease_both] overflow-hidden p-8 @[46rem]:p-10">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#b86a12]">13:30 · lunch · currently learning</p>
          <h3 className="mt-3 font-display text-[clamp(2.4rem,7cqw,4.2rem)] font-bold leading-[0.95] tracking-[-0.045em]">{topic}</h3>
          <p className="mt-5 max-w-[46ch] text-[1.1rem] leading-relaxed text-black/70">
            {related ? <>Why now: <span className="text-black">{related}</span></> : "On the list because the next systems I build will need it."}
          </p>
          <div className="mt-8 grid max-w-[34rem] grid-cols-5 gap-2">
            {now.learning.map((l, k) => (
              <div key={l} className={`h-1.5 rounded-full ${k <= i ? "bg-[#b86a12]" : "bg-black/10"}`} title={l} />
            ))}
          </div>
          <p className="mt-2 font-mono text-[0.72rem] text-black/45">{i + 1} of {n} topics on the reading list</p>
        </article>
        <aside className="hidden min-h-0 flex-col gap-4 overflow-hidden border-l border-black/10 bg-[#ebe7dd] p-5 @[46rem]:flex">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-black/45">Already in the toolbox</p>
          {uses.groups.slice(0, 4).map((g) => (
            <div key={g.label}>
              <p className="text-[0.78rem] font-semibold text-black/70">{g.label}</p>
              <p className="mt-1 text-[0.8rem] leading-snug text-black/55">{g.items.slice(0, 6).join(" · ")}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
