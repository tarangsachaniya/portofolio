"use client";
import { chapters, person, work } from "@/lib/content";

const POST = [
  ["TARANG-OS 8.0 · POST", "ok"],
  ["cpu   curiosity x16 @ 3.6GHz", "ok"],
  ["mem   2021 → 2026 · 5 chapters", "ok"],
  ["disk  /work  " + work.length + " projects mounted", "ok"],
  ["net   ahmedabad.in · ist +05:30", "ok"],
  ["svc   priinteve.service", "running"],
  ["svc   freelance.service", "accepting"],
] as const;

const INFO: [string, string][] = [
  ["user", person.name],
  ["role", `${person.jobTitle} · ${person.title}`],
  ["host", `${person.city}, ${person.region}, ${person.country}`],
  ["uptime", `${new Date().getFullYear() - Number(chapters[0].year)} years (since ${chapters[0].year})`],
  ["products", String(work.filter((w) => w.kind === "Product").length) + " live or launching"],
  ["shell", person.knowsAbout.slice(0, 6).join(", ")],
  ["status", person.status],
];
const PALETTE = ["#ffb547", "#ff8a5c", "#5ee0c1", "#7cc4ff", "#9b8cff", "#e9e4d8"];

/** 09:00: the monitor wakes. Lock screen, POST log, a neofetch of Tarang, then the greeting. */
export default function Boot({ t }: { t: number }) {
  const lines = Math.round(Math.max(0, t - 0.2) * 3 * POST.length);
  const info = Math.round(Math.max(0, t - 0.4) * 3.2 * INFO.length);
  const ready = t > 0.7;
  return (
    <div className="@container relative grid h-full grid-rows-[auto_1fr_auto] gap-5 overflow-hidden p-7 font-mono text-[0.84rem] leading-relaxed @[46rem]:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 transition-opacity duration-700" style={{ opacity: t > 0.25 ? 0.3 : 1, background: "radial-gradient(60% 70% at 30% 30%, rgb(255 181 71 / 0.35), transparent 60%), radial-gradient(50% 60% at 75% 70%, rgb(155 140 255 / 0.4), transparent 60%), radial-gradient(40% 50% at 60% 20%, rgb(94 224 193 / 0.25), transparent 60%)" }} />
      <div aria-hidden className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-500 ${t < 0.22 ? "opacity-100" : "opacity-0"}`}>
        <div className="text-center">
          <p className="font-display text-[clamp(4rem,14cqw,9rem)] font-semibold leading-none tracking-[-0.04em] text-white/90">09:00</p>
          <p className="mt-2 text-white/60">tarang-os · scroll to wake</p>
        </div>
      </div>

      {/* POST */}
      <div className={`relative grid gap-x-10 gap-y-0.5 transition-opacity @[46rem]:grid-cols-2 ${t < 0.22 ? "opacity-0" : "opacity-100"}`}>
        {POST.slice(0, Math.max(1, lines)).map(([l, s]) => (
          <p key={l} className="flex justify-between gap-6 text-white/65">
            <span className="truncate">{l}</span>
            <span className={s === "ok" ? "text-[#5ee0c1]" : "text-[#ffc46b]"}>[{s}]</span>
          </p>
        ))}
      </div>

      {/* neofetch */}
      <div className={`relative grid min-h-0 items-center gap-8 transition-opacity duration-500 @[46rem]:grid-cols-[13rem_1fr] ${info > 0 ? "opacity-100" : "opacity-0"}`}>
        <div className="hidden aspect-square place-items-center rounded-3xl bg-gradient-to-br from-[#ffb547]/25 via-[#ff8a5c]/15 to-[#9b8cff]/25 ring-1 ring-white/10 @[46rem]:grid">
          <span className="font-display text-[6.5rem] font-bold leading-none tracking-[-0.06em] text-white/90">TS</span>
        </div>
        <div>
          <p className="text-[#ffc46b]">tarang@ahmedabad</p>
          <p className="text-white/30">────────────────</p>
          {INFO.slice(0, info).map(([k, v]) => (
            <p key={k} className="truncate"><span className="inline-block w-24 text-[#7cc4ff]">{k}</span><span className="text-white/80">{v}</span></p>
          ))}
          <p className="mt-3 flex gap-1.5">{PALETTE.map((c) => <i key={c} className="h-3 w-7 rounded-sm" style={{ background: c }} />)}</p>
        </div>
      </div>

      {/* greeting */}
      <div className={`relative transition-all duration-700 ${ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <p className="font-display text-[clamp(1.8rem,5cqw,3.2rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white">
          Good morning. <span className="text-glow">Let&apos;s build something.</span>
        </p>
        <p className="mt-2 text-white/50">scroll ↓ for standup at 09:30</p>
      </div>
    </div>
  );
}
