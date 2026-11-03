"use client";
import { motion, type MotionValue } from "framer-motion";
import { STEPS } from "./timeline";

/** The day's pipeline: boot → commit → build → review → deploy → ship. Click to jump. */
export default function Rail({ step, progress, time, onJump }: { step: number; progress: MotionValue<number>; time: string; onJump: (i: number) => void }) {
  return (
    <nav aria-label="The day's pipeline" className="pointer-events-auto">
      <p className="font-mono text-[clamp(1.5rem,2.1vw,2.1rem)] font-medium leading-none tabular-nums tracking-tight text-white">{time}</p>
      <p className="mt-1 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/40">IST · ahmedabad</p>
      <ol className="relative mt-4 space-y-0.5">
        <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10" />
        <motion.span aria-hidden className="absolute left-[7px] top-3 w-px origin-top bg-gradient-to-b from-[#ffb547] to-[#9b8cff]" style={{ height: "calc(100% - 1.5rem)", scaleY: progress }} />
        {STEPS.map((s, i) => {
          const on = i === step;
          const done = i < step;
          return (
            <li key={s.id}>
              <button type="button" onClick={() => onJump(i)} aria-current={on ? "step" : undefined} className="group relative flex items-center gap-3 rounded-full py-1.5 pr-3 text-left">
                <span className={`relative z-10 grid size-[15px] place-items-center rounded-full border transition-all duration-300 ${on ? "border-[#ffb547] bg-[#ffb547] shadow-[0_0_16px_rgb(255_181_71/0.8)]" : done ? "border-[#9b8cff] bg-[#0b0d11]" : "border-white/25 bg-[#0b0d11]"}`}>
                  {done && <svg viewBox="0 0 10 10" className="size-2 text-[#9b8cff]"><path d="M2 5.2l2 2 4-4.4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>}
                </span>
                <span className={`font-mono text-[0.72rem] transition-colors ${on ? "text-white" : "text-white/45 group-hover:text-white/80"}`}>
                  <span className="text-white/30">{s.time}</span> {s.label.toLowerCase()}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
