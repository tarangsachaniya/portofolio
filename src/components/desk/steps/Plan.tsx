"use client";
import { chapters, now } from "@/lib/content";

const COLS = [
  { id: "doing", label: "Doing", dot: "#ffb547", items: now.items.slice(0, 2) },
  { id: "next", label: "Up next", dot: "#7cc4ff", items: now.items.slice(2) },
  { id: "done", label: "Shipped this year", dot: "#5ee0c1", items: chapters[chapters.length - 1].made },
];

/** 09:30: standup. The day's board fills in card by card. */
export default function Plan({ t }: { t: number }) {
  const total = COLS.reduce((n, c) => n + c.items.length, 0) + 1;
  let k = 0;
  const shown = Math.max(1, Math.ceil(total * Math.min(1, t * 1.4 + 0.1)));
  return (
    <div className="@container grid h-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-[#111317] text-[0.95rem]">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-3.5">
        <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-[#ffb547] to-[#9b8cff] font-mono text-xs font-bold text-[#14100a]">TS</span>
        <span>
          <span className="block font-semibold text-white">Standup · today</span>
          <span className="block font-mono text-[0.72rem] text-white/45">board: priinteve + freelance · updated {now.updated}</span>
        </span>
        <span className="ml-auto hidden rounded-full border border-white/10 px-3 py-1 font-mono text-[0.72rem] text-white/55 @[40rem]:inline">09:30 IST · 15 min</span>
      </div>
      <div className="grid min-h-0 gap-4 overflow-hidden p-5 @[44rem]:grid-cols-[1fr_1fr_1fr_0.85fr]">
        {COLS.map((c) => (
          <section key={c.id} className="flex min-h-0 flex-col rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/[0.06]">
            <p className="flex items-center gap-2 px-1 pb-2 font-mono text-[0.72rem] uppercase tracking-widest text-white/55">
              <i className="size-2 rounded-full" style={{ background: c.dot }} /> {c.label} <span className="ml-auto text-white/30">{c.items.length}</span>
            </p>
            <ul className="space-y-2">
              {c.items.map((it) => {
                const on = k++ < shown;
                return (
                  <li key={it} className={`rounded-xl border border-white/10 bg-[#171a20] p-3 leading-snug text-white/85 shadow-[0_8px_20px_-14px_rgb(0_0_0/0.9)] transition-all duration-500 ${on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                    {c.id === "done" && <span className="mr-1.5 text-[#5ee0c1]">✓</span>}{it}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        <section className="hidden min-h-0 flex-col rounded-2xl bg-gradient-to-b from-[#9b8cff]/12 to-transparent p-4 ring-1 ring-[#9b8cff]/20 @[44rem]:flex">
          <p className="font-mono text-[0.72rem] uppercase tracking-widest text-[#b9aeff]">Learning</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {now.learning.map((l, i) => <li key={l} className={`rounded-full bg-white/[0.06] px-3 py-1.5 text-[0.85rem] text-white/85 transition-opacity duration-500 ${k + i < shown + 2 ? "opacity-100" : "opacity-30"}`}>{l}</li>)}
          </ul>
          <p className="mt-auto font-mono text-[0.72rem] leading-relaxed text-white/45">blockers: none<br />next sync: 18:00 deploy</p>
        </section>
      </div>
    </div>
  );
}
