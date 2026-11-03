"use client";
import { person, work } from "@/lib/content";

const POST = [
  ["TARANG-OS 6.0 · POST", "ok"],
  ["cpu   curiosity x16 @ 3.6GHz", "ok"],
  ["mem   2021 → 2026 · 5 chapters", "ok"],
  ["disk  /work  " + work.length + " projects mounted", "ok"],
  ["net   ahmedabad.in · ist +05:30", "ok"],
  ["svc   priinteve.service", "running"],
  ["svc   freelance.service", "accepting"],
] as const;

/** 09:00: the monitor wakes. A POST log, then a lock-screen greeting. */
export default function Boot({ t }: { t: number }) {
  const lines = Math.round(Math.max(0, t - 0.25) * 2.4 * POST.length);
  const ready = t > 0.62;
  return (
    <div className="relative grid h-full grid-rows-[1fr_auto] overflow-hidden p-6 font-mono text-[0.78rem] leading-relaxed sm:p-10">
      {/* wallpaper: visible from across the room before the camera pushes in */}
      <div aria-hidden className="pointer-events-none absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 0.35 : 1, background: "radial-gradient(60% 70% at 30% 30%, rgb(255 181 71 / 0.35), transparent 60%), radial-gradient(50% 60% at 75% 70%, rgb(155 140 255 / 0.4), transparent 60%), radial-gradient(40% 50% at 60% 20%, rgb(94 224 193 / 0.25), transparent 60%)" }} />
      <div aria-hidden className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-500 ${t < 0.3 ? "opacity-100" : "opacity-0"}`}>
        <div className="text-center">
          <p className="font-display text-[clamp(4rem,12vw,9rem)] font-semibold leading-none tracking-[-0.04em] text-white/90">09:00</p>
          <p className="mt-2 text-white/60">tarang-os · scroll to wake</p>
        </div>
      </div>
      <div className={`relative space-y-1 transition-opacity ${t < 0.3 ? "opacity-0" : "opacity-100"}`}>
        {POST.slice(0, Math.max(1, lines)).map(([l, s]) => (
          <p key={l} className="flex justify-between gap-6 text-white/70">
            <span>{l}</span>
            <span className={s === "ok" ? "text-[#5ee0c1]" : "text-[#ffc46b]"}>[{s}]</span>
          </p>
        ))}
      </div>
      <div className={`relative transition-all duration-700 ${ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <p className="text-[#5ee0c1]">● login: guest · welcome to {person.first.toLowerCase()}&apos;s desk</p>
        <p className="mt-3 font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.045em] text-white">
          Good morning.<br /><span className="text-glow">Let&apos;s build something.</span>
        </p>
        <p className="mt-4 text-white/50">scroll ↓ to open the day&apos;s first commit</p>
      </div>
    </div>
  );
}
