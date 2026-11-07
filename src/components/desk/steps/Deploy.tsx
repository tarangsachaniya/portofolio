"use client";
import { person, work } from "@/lib/content";
import { hash } from "../timeline";

const LIVE = work.filter((w) => w.kind === "Product");
const SIZE = ["@[46rem]:col-span-4 @[46rem]:row-span-2", "@[46rem]:col-span-2", "@[46rem]:col-span-2", "@[46rem]:col-span-2", "@[46rem]:col-span-2"];

/** 18:00: the lamp is on, the deploy board fills in. One bento tile per live product. */
export default function Deploy({ t }: { t: number }) {
  return (
    <div className="@container grid h-full grid-rows-[auto_auto_minmax(0,1fr)_auto] overflow-hidden bg-[#0d0f13] font-mono">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-white/10 px-5 py-3 text-[0.72rem] text-white/50">
        <span className="font-body text-[0.95rem] font-semibold text-white">Deployments</span>
        <span>production · bom1</span>
        <span className="ml-auto flex items-center gap-2"><span className="live-dot" /> {LIVE.filter((_, k) => t > (k + 1) / (LIVE.length + 2)).length}/{LIVE.length} ready</span>
      </div>
      <div className="hidden grid-cols-4 gap-px border-b border-white/10 bg-white/10 text-[0.7rem] @[46rem]:grid">
        {[["products", String(LIVE.length)], ["live", String(LIVE.filter((w) => w.status === "Live").length)], ["platforms", String(new Set(LIVE.flatMap((w) => w.platforms)).size)], ["region", "ap-south · bom1"]].map(([k, v]) => (
          <div key={k} className="bg-[#0d0f13] px-5 py-2.5"><p className="text-white/40">{k}</p><p className="mt-0.5 font-body text-[1.1rem] font-semibold text-white">{v}</p></div>
        ))}
      </div>
      <ul className="grid min-h-0 auto-rows-[5.4rem] grid-cols-1 gap-2 overflow-hidden p-2.5 @[46rem]:auto-rows-[minmax(0,1fr)] @[46rem]:grid-cols-6 @[46rem]:grid-rows-3 @[46rem]:gap-2.5 @[46rem]:p-4">
        {LIVE.map((w, k) => {
          const start = k / (LIVE.length + 2);
          const done = t > (k + 1) / (LIVE.length + 2);
          const building = !done && t > start;
          const state = done ? (w.status === "Live" ? "Ready" : "Preview") : building ? "Building" : "Queued";
          return (
            <li key={w.slug} className={`group relative min-h-0 overflow-hidden rounded-2xl border @[46rem]:min-h-[7rem] transition-all duration-500 ${SIZE[k] ?? "@[46rem]:col-span-2"} ${done ? "border-white/15" : "border-white/5 opacity-60"}`}>
              {w.shots[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.shots[0].src} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ${done ? "scale-100 opacity-90 group-hover:scale-[1.03]" : "scale-105 opacity-0"}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f13] via-[#0d0f13]/55 to-transparent to-70%" />
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
        <li className="col-span-2 hidden @[46rem]:block">
          <a href={`mailto:${person.email}?subject=${encodeURIComponent("Next deploy")}`} className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-[#ffb547]/35 bg-[radial-gradient(120%_100%_at_100%_0%,rgb(255_181_71/0.16),transparent_60%)] p-3.5 text-[0.7rem] text-white/50 transition-colors hover:border-[#ffb547]/70">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full border border-[#ffb547]/70" /> queued · next deploy</span>
            <span><span className="block font-body text-[1.25rem] font-semibold text-white">Your project?</span><span className="mt-1 block text-[#ffc46b]">→ {person.email}</span></span>
          </a>
        </li>
      </ul>
      <div className="hidden items-center gap-2 overflow-hidden border-t border-white/10 px-4 py-2.5 text-[0.72rem] @[46rem]:flex">
        <span className="shrink-0 text-white/40">artifacts</span>
        {LIVE.flatMap((w) => (w.downloads ?? []).map((d) => ({ ...d, app: w.name }))).map((d) => (
          <a key={d.label} href={d.href} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-white/70 hover:border-[#ffb547]/50 hover:text-white">
            <span className="text-[#ffc46b]">{d.platform === "Windows" ? "⊞" : d.platform === "macOS" ? "⌘" : d.platform === "Android TV" ? "▭" : "▲"}</span>{d.app} · {d.platform}
          </a>
        ))}
      </div>
    </div>
  );
}
