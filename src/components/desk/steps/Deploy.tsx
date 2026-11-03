"use client";
import { work } from "@/lib/content";
import { hash } from "../timeline";

const LIVE = work.filter((w) => w.kind === "Product");
const SIZE = ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"];

/** 18:00: the lamp is on, the deploy board fills in. One bento tile per live product. */
export default function Deploy({ t }: { t: number }) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden bg-[#0d0f13] font-mono">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-white/10 px-5 py-3 text-[0.72rem] text-white/50">
        <span className="font-body text-[0.95rem] font-semibold text-white">Deployments</span>
        <span>production · bom1</span>
        <span className="ml-auto flex items-center gap-2"><span className="live-dot" /> {LIVE.filter((_, k) => t > (k + 1) / (LIVE.length + 2)).length}/{LIVE.length} ready</span>
      </div>
      <ul className="grid min-h-0 auto-rows-[minmax(0,1fr)] grid-cols-2 gap-2.5 p-3 sm:p-4 md:grid-cols-6 md:grid-rows-3">
        {LIVE.map((w, k) => {
          const start = k / (LIVE.length + 2);
          const done = t > (k + 1) / (LIVE.length + 2);
          const building = !done && t > start;
          const state = done ? (w.status === "Live" ? "Ready" : "Preview") : building ? "Building" : "Queued";
          return (
            <li key={w.slug} className={`group relative col-span-2 min-h-[7rem] overflow-hidden rounded-2xl border transition-all duration-500 ${SIZE[k] ?? "md:col-span-2"} ${done ? "border-white/15" : "border-white/5 opacity-60"}`}>
              {w.shots[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.shots[0].src} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ${done ? "scale-100 opacity-45 group-hover:opacity-70" : "scale-105 opacity-0"}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f13] via-[#0d0f13]/70 to-transparent" />
              {building && <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-white/5"><div className="h-full w-1/3 animate-[scan_1.1s_ease-in-out_infinite] bg-[#ffb547]" /></div>}
              <a href={`/work/${w.slug}/`} className="relative flex h-full flex-col justify-between p-3.5 text-[0.7rem]">
                <span className="flex items-center justify-between gap-2">
                  <span className={`flex items-center gap-1.5 ${done ? (w.status === "Live" ? "text-[#5ee0c1]" : "text-[#ffc46b]") : "text-white/40"}`}>
                    {done ? <span className={`live-dot ${w.status === "Live" ? "" : "warn"}`} /> : building ? <span className="spin" /> : <span className="size-2 rounded-full border border-white/30" />}
                    {state}
                  </span>
                  <span className="text-white/35">{hash(w.slug)} · {20 + ((k * 17) % 40)}s</span>
                </span>
                <span>
                  <span className="block font-body text-[clamp(0.95rem,1.4vw,1.25rem)] font-semibold text-white">{w.name}</span>
                  <span className="mt-0.5 block truncate text-white/50">{w.domain}</span>
                  <span className="mt-2 flex flex-wrap gap-1">{w.platforms.map((p) => <span key={p} className="rounded-full border border-white/15 bg-black/30 px-1.5 py-0.5 text-[0.6rem] text-white/70">{p}</span>)}</span>
                </span>
              </a>
            </li>
          );
        })}
        <li className="col-span-2 hidden flex-col justify-between rounded-2xl border border-dashed border-white/10 p-3.5 text-[0.7rem] text-white/40 md:col-span-2 md:flex">
          <span>+ next deploy</span>
          <span className="font-body text-[0.95rem] text-white/70">Your project?</span>
        </li>
      </ul>
    </div>
  );
}
