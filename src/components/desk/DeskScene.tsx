"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { chapters, person } from "@/lib/content";
import { useTheme } from "../shell/ThemeProvider";
import { useClock } from "../shell/useClock";
import { STEPS, fmtHour, hourAt, localAt, stepAt } from "./timeline";
import { useCompact } from "./hooks";
import { Lamp, Mug, Phone, Plant, Room } from "./Room";
import DeskKeyboard from "./DeskKeyboard";
import Rail from "./Rail";
import Boot from "./steps/Boot";
import Commit from "./steps/Commit";
import Build from "./steps/Build";
import Review from "./steps/Review";
import Deploy from "./steps/Deploy";
import Ship from "./steps/Ship";

type Pick = { step: number; i: number; at: number } | null;

function Screen({ step, t, pick, onPick }: { step: number; t: number; pick: number | null; onPick: (i: number) => void }) {
  const id = STEPS[step].id;
  if (id === "boot") return <Boot t={t} />;
  if (id === "commit") return <Commit t={t} pick={pick} onPick={onPick} />;
  if (id === "build") return <Build t={t} pick={pick} onPick={onPick} />;
  if (id === "review") return <Review t={t} pick={pick} onPick={onPick} />;
  if (id === "deploy") return <Deploy t={t} />;
  return <Ship t={t} />;
}

function Intro({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "max-w-[34rem]"}>
      <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white/60">
        <span className="live-dot" aria-hidden /> {person.status}
      </p>
      <h1 className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.05em] text-white">
        Tarang<br /><span className="text-glow">Sachaniya</span>
      </h1>
      <p className="mt-5 max-w-[46ch] text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-white/70" data-answer>{person.summary}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/work/" className="btn btn-primary">See the work <span aria-hidden>→</span></Link>
        <Link href="/contact/" className="btn btn-ghost">Hire me</Link>
      </div>
    </div>
  );
}

/** Small screens and reduced motion: the same day, stacked as cards. No pinning, no scrubbing. */
function CompactDay() {
  const now = useClock();
  const [picks, setPicks] = useState<Record<number, number | null>>({ 1: chapters.length - 1, 3: 0 });
  return (
    <section aria-labelledby="day-title" className="wrap pb-6 pt-4">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 p-6 sm:p-10" style={{ background: "linear-gradient(160deg,#1a2244,#0b0d11 65%)" }}>
        <div aria-hidden className="absolute -right-6 -top-6 size-24 rounded-full bg-[#fff1c9]/90 shadow-[0_0_80px_30px_rgb(255_210_120/0.3)]" />
        <p className="font-mono text-xs text-white/50">Ahmedabad · {now} IST</p>
        <div className="mt-6"><Intro compact /></div>
      </div>
      <h2 id="day-title" className="sr-only">A day at the desk</h2>
      <ol className="mt-4 grid gap-4">
        {STEPS.map((s, i) => (
          <li key={s.id} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0e1116]">
            <p className="flex items-baseline justify-between gap-3 border-b border-white/10 px-5 py-3 font-mono text-xs">
              <span className="text-white"><span className="text-[#ffc46b]">{s.time}</span> · {s.label.toLowerCase()}</span>
              <span className="text-white/45">{s.verb}</span>
            </p>
            <div className={s.id === "deploy" ? "" : s.id === "build" ? "h-[34rem]" : s.id === "boot" ? "h-[22rem]" : "h-[30rem]"}>
              <Screen step={i} t={1} pick={picks[i] ?? null} onPick={(k) => setPicks((p) => ({ ...p, [i]: k }))} />
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4 hidden sm:block"><DeskKeyboard /></div>
    </section>
  );
}

export default function DeskScene() {
  const compact = useCompact();
  return compact ? <CompactDay /> : <PinnedDay />;
}

function PinnedDay() {
  const ref = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const hour = useTransform(p, hourAt);

  const [state, setState] = useState({ step: 0, t: 0, time: "09:00" });
  const [pick, setPick] = useState<Pick>(null);
  const [lampOverride, setLampOverride] = useState<boolean | null>(null);

  useMotionValueEvent(p, "change", (v) => {
    const step = stepAt(v);
    const t = Math.round(localAt(v, step) * 200) / 200;
    const time = fmtHour(hourAt(v));
    setState((s) => (s.step === step && s.t === t && s.time === time ? s : { step, t, time }));
  });
  // Clear a manual pick once the visitor scrolls on, so the day resumes.
  useEffect(() => {
    if (pick && (pick.step !== state.step || Math.abs(state.t - pick.at) > 0.18)) setPick(null);
  }, [state.step, state.t, pick]);
  useEffect(() => setLampOverride(null), [state.step]);

  const autoLamp = state.step >= 4;
  const lampOn = lampOverride ?? autoLamp;

  // Camera: wide desk → push into the monitor → tilt down to the keyboard.
  const scale = useTransform(p, [0, 0.025, 0.12, 0.8, 0.88, 1], [0.5, 0.5, 1, 1, 0.55, 0.55]);
  const x = useTransform(p, [0, 0.025, 0.12], ["13vw", "13vw", "0vw"]);
  const y = useTransform(p, [0, 0.12, 0.8, 0.88, 1], ["4svh", "0svh", "0svh", "-16svh", "-16svh"]);
  const rx = useTransform(p, [0, 0.12, 0.8, 0.88], [6, 0, 0, 8]);
  const introO = useTransform(p, [0, 0.03, 0.07], [1, 1, 0]);
  const introY = useTransform(p, [0, 0.07], [0, -40]);
  const railO = useTransform(p, [0.04, 0.1], [0, 1]);
  const hintO = useTransform(p, [0, 0.02], [1, 0]);
  const glow = ["#5ee0c1", "#ffb547", "#0078d4", "#ff8a5c", "#5ee0c1", "#ffb547"][state.step];

  // Smooth scroll for the desk world only.
  useEffect(() => {
    if (theme !== "desk") return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let id = 0;
    let dead = false;
    import("lenis").then(({ default: Lenis }) => {
      if (dead) return;
      lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: true });
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      const raf = (t: number) => { lenis?.raf(t); id = requestAnimationFrame(raf); };
      id = requestAnimationFrame(raf);
    });
    return () => { dead = true; cancelAnimationFrame(id); lenis?.destroy(); delete (window as unknown as { __lenis?: unknown }).__lenis; };
  }, [theme]);

  const jump = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const target = top + span * Math.min(0.999, STEPS[i].at + (i === 0 ? 0 : 0.03));
    const l = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
    if (l) l.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  return (
    <section ref={ref} aria-labelledby="day-heading" className="relative -mt-[5.5rem]" style={{ height: "720svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden [perspective:1600px]">
        <Room hour={hour} zoom={scale} />

        {/* the desk, through the camera */}
        <motion.div className="absolute inset-0 origin-[50%_50%] will-change-transform" style={{ scale, x, y, rotateX: rx }}>
          {/* desk surface */}
          <div aria-hidden className="absolute left-[-60vw] right-[-60vw] top-[calc(100svh-2.5rem)] h-[120svh] bg-gradient-to-b from-[#1b1712] via-[#120f0c] to-[#0a0908] shadow-[0_-1px_0_rgb(255_255_255/0.05)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <motion.div className="absolute left-1/2 top-0 h-[40svh] w-[110vw] -translate-x-1/2 transition-opacity duration-700" style={{ background: `radial-gradient(ellipse 50% 60% at 50% 0%, ${glow}22, transparent 70%)` }} />
            <div className={`absolute left-[calc(50%+min(50vw-7.5rem,620px))] top-0 h-[60svh] w-[70vw] -translate-x-1/3 transition-opacity duration-700 ${lampOn ? "opacity-100" : "opacity-0"}`} style={{ background: "radial-gradient(ellipse 40% 50% at 40% 10%, rgb(255 180 90 / 0.28), transparent 70%)" }} />
          </div>

          {/* props behind the monitor: anchored to the desk line */}
          <div className="absolute left-[calc(50%-min(50vw-max(11rem,13vw),620px)-20svh)] top-[calc(100svh-2.5rem)]"><Plant /></div>
          <div className="absolute left-[calc(50%+min(50vw-max(11rem,13vw),620px)-2rem)] top-[calc(100svh-2.5rem)] w-[22svh]"><Lamp on={lampOn} onToggle={() => setLampOverride(!lampOn)} /></div>

          {/* monitor */}
          <div className="absolute left-1/2 top-[5.5rem] h-[calc(100svh-8rem)] w-[min(calc(100vw-2*max(11rem,13vw)),1240px)] -translate-x-1/2">
            <div aria-hidden className="absolute -inset-10 -z-10 rounded-[40px] opacity-60 blur-3xl transition-colors duration-700" style={{ background: `${glow}26` }} />
            <div className="absolute inset-0 rounded-[18px] border border-white/10 bg-[#07080b] p-[10px] shadow-[0_50px_120px_-30px_rgb(0_0_0/0.95),inset_0_1px_0_rgb(255_255_255/0.08)]">
              <div className="relative h-full overflow-hidden rounded-[9px] bg-[#0e1116]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={state.step}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Screen step={state.step} t={state.t} pick={pick?.step === state.step ? pick.i : null} onPick={(i) => setPick({ step: state.step, i, at: state.t })} />
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.05),transparent_35%)]" />
              </div>
              <span aria-hidden className="absolute bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#5ee0c1] shadow-[0_0_6px_#5ee0c1]" />
            </div>
            {/* sticky note on the bezel */}
            <span aria-hidden className="absolute -right-6 top-10 rotate-6 bg-[#ffe27a] px-3 py-2 font-mono text-[0.7rem] font-semibold text-[#3a2f00] shadow-[0_10px_20px_-8px_rgb(0_0_0/0.7)]">ship it ✓</span>
            {/* stand */}
            <div aria-hidden className="absolute left-1/2 top-full h-[3rem] w-[9%] -translate-x-1/2 bg-gradient-to-b from-[#1a1d23] to-[#0d0f12]" />
            <div aria-hidden className="absolute left-1/2 top-[calc(100%+2.6rem)] h-3 w-[26%] -translate-x-1/2 rounded-[50%] bg-[#15181d] shadow-[0_10px_20px_rgb(0_0_0/0.7)]" />
          </div>

          {/* keyboard */}
          <div className="absolute left-1/2 top-[calc(100svh+4.5rem)] w-[min(70vw,880px)] [transform:translateX(-50%)_rotateX(28deg)] origin-top">
            <DeskKeyboard listen={state.step === 5} />
          </div>
          <div className="absolute left-[calc(50%-min(35vw,440px)-9rem)] top-[calc(100svh+5rem)]"><Phone step={state.step} /></div>
          <div className="absolute left-[calc(50%+min(35vw,440px)+3rem)] top-[calc(100svh+5rem)]"><div className="relative h-[11svh] w-[9svh]"><Mug /></div></div>
        </motion.div>

        {/* lamp + night wash over everything */}
        <div aria-hidden className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${lampOn ? "opacity-100" : "opacity-0"}`} style={{ background: "radial-gradient(60% 50% at 96% 88%, rgb(255 170 80 / 0.07), transparent 70%)", mixBlendMode: "screen" }} />

        {/* intro overlay (wide shot) */}
        <motion.div className="absolute inset-y-0 left-0 flex w-full items-center px-[clamp(1.25rem,5vw,4rem)] pt-16" style={{ opacity: introO, y: introY }}>
          <div className="rounded-[28px] bg-[#0b0d11]/55 p-7 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_40px_100px_-30px_rgb(0_0_0/0.9)] sm:p-9">
            <Intro />
          </div>
        </motion.div>
        <motion.p aria-hidden className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/50" style={{ opacity: hintO }}>
          scroll to start the day <span className="inline-block animate-bounce">↓</span>
        </motion.p>

        {/* rail */}
        <motion.div className="absolute left-[clamp(0.75rem,1.4vw,1.5rem)] top-[55%] -translate-y-1/2" style={{ opacity: railO }}>
          <div className="w-[clamp(9.5rem,11vw,11.5rem)] rounded-[22px] bg-[#0b0d11]/60 p-4 ring-1 ring-white/10 backdrop-blur-xl">
            <Rail step={state.step} progress={scrollYProgress} time={state.time} onJump={jump} />
            <h2 id="day-heading" className="mt-4 border-t border-white/10 pt-3 text-[0.82rem] font-medium leading-snug text-white/80">
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">step {state.step + 1}/6</span>
              {STEPS[state.step].verb}
            </h2>
            <a href="#after-hours" className="mt-2 inline-block font-mono text-[0.64rem] text-white/45 underline-offset-4 hover:text-white hover:underline">skip the day ↓</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
