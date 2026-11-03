"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { chapters, person } from "@/lib/content";
import { useTheme } from "../shell/ThemeProvider";
import { STEPS, fmtHour, hourAt, localAt, stepAt } from "./timeline";
import { useMedia, useReducedMotion } from "./hooks";
import Rail from "./Rail";
import Boot from "./steps/Boot";
import Commit from "./steps/Commit";
import Build from "./steps/Build";
import Review from "./steps/Review";
import Deploy from "./steps/Deploy";
import Ship from "./steps/Ship";

const DeskWorld = dynamic(() => import("./three/Scene"), { ssr: false });

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

function Intro({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <div>
      <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/65">
        <span className="live-dot" aria-hidden /> {person.status}
      </p>
      <h1 className={`mt-4 font-display font-bold leading-[0.86] tracking-[-0.055em] text-white ${size === "lg" ? "text-[clamp(3.4rem,7.6vw,7.8rem)]" : "text-[clamp(2.8rem,13vw,4.2rem)]"}`}>
        Tarang<br /><span className="text-glow">Sachaniya</span>
      </h1>
      <p className={`mt-5 max-w-[40ch] leading-relaxed text-white/72 ${size === "lg" ? "text-[clamp(1rem,1.15vw,1.12rem)]" : "text-[0.98rem]"}`} data-answer>
        Full-stack developer in Ahmedabad. I co-founded Priinteve and build its print network, NFC cards, QR ordering and the apps that run them.
        <span className="sr-only"> {person.summary}</span>
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/work/" className="btn btn-primary">See the work <span aria-hidden>→</span></Link>
        <Link href="/contact/" className="btn btn-ghost">Hire me</Link>
      </div>
    </div>
  );
}

function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

export default function DeskScene() {
  const small = useMedia("(max-width: 899px)");
  const reduce = useReducedMotion();
  const [gl, setGl] = useState(true);
  useEffect(() => setGl(hasWebGL()), []);
  if (reduce || !gl) return <StackedDay />;
  return small ? <MobileDay /> : <PinnedDay />;
}

/* ═══════════════ desktop: the pinned day ═══════════════ */
function PinnedDay() {
  const ref = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const visible = useInView(ref, { margin: "200px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.35 });

  const [state, setState] = useState({ step: 0, t: 0, time: "09:00" });
  const [pick, setPick] = useState<Pick>(null);
  const [lampOverride, setLampOverride] = useState<boolean | null>(null);

  useMotionValueEvent(p, "change", (v) => {
    const step = stepAt(v);
    const t = Math.round(localAt(v, step) * 200) / 200;
    const time = fmtHour(hourAt(v));
    setState((s) => (s.step === step && s.t === t && s.time === time ? s : { step, t, time }));
  });
  useEffect(() => { if (pick && (pick.step !== state.step || Math.abs(state.t - pick.at) > 0.2)) setPick(null); }, [state.step, state.t, pick]);
  useEffect(() => setLampOverride(null), [state.step]);
  const lampOn = lampOverride ?? state.step >= 4;

  const introO = useTransform(p, [0, 0.025, 0.06], [1, 1, 0]);
  const introY = useTransform(p, [0, 0.06], [0, -30]);
  const railO = useTransform(p, [0.05, 0.1], [0, 1]);
  const hintO = useTransform(p, [0, 0.02], [1, 0]);

  const anchor = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const at = i === 0 ? 0 : i === 1 ? 0.15 : STEPS[i].at + 0.04;
    return top + span * at;
  }, []);

  // Lenis smooth scroll + soft snapping to each step: one flick = one step.
  useEffect(() => {
    if (theme !== "desk") return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let snap: { destroy: () => void; add: (v: number) => () => void } | null = null;
    let id = 0;
    let dead = false;
    Promise.all([import("lenis"), import("lenis/snap")]).then(([{ default: Lenis }, { default: Snap }]) => {
      if (dead) return;
      const l = new Lenis({ lerp: 0.12, smoothWheel: true, anchors: true });
      lenis = l;
      (window as unknown as { __lenis?: unknown }).__lenis = l;
      const s = new Snap(l, { type: "proximity", distanceThreshold: "35%", duration: 0.9, debounce: 220 });
      snap = s;
      const add = () => STEPS.forEach((_, i) => s.add(anchor(i)));
      add();
      const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf); };
      id = requestAnimationFrame(raf);
    });
    return () => { dead = true; cancelAnimationFrame(id); snap?.destroy(); lenis?.destroy(); delete (window as unknown as { __lenis?: unknown }).__lenis; };
  }, [theme, anchor]);

  const jump = useCallback((i: number) => {
    const target = anchor(i);
    const l = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
    if (l) l.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }, [anchor]);

  const screen = (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div key={state.step} className="absolute inset-0" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
        <Screen step={state.step} t={state.t} pick={pick?.step === state.step ? pick.i : null} onPick={(i) => setPick({ step: state.step, i, at: state.t })} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section ref={ref} aria-labelledby="day-heading" className="relative -mt-[5.5rem]" style={{ height: "500svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-[#0b0d11]">
        <div className="absolute inset-0 z-0">
          <DeskWorld mode="pinned" progress={p} step={state.step} lampOn={lampOn} onLamp={() => setLampOverride(!lampOn)} screen={screen} listenKeys={state.step === 5} active={visible} />
        </div>

        {/* intro: the first frame */}
        <motion.div className="pointer-events-none absolute inset-0 z-30 flex items-end px-[clamp(1.25rem,4.5vw,4rem)] pb-[clamp(2rem,7svh,5rem)]" style={{ opacity: introO, y: introY }}>
          <div className="pointer-events-auto max-w-[min(40rem,52vw)] [text-shadow:0_2px_30px_rgb(0_0_0/0.6)]"><Intro /></div>
        </motion.div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#0b0d11]/85 via-[#0b0d11]/35 to-transparent" style={{ opacity: introO }} />
        <motion.p aria-hidden className="absolute bottom-6 right-8 z-30 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-white/55" style={{ opacity: hintO }}>
          scroll to start the day <span className="inline-block animate-bounce">↓</span>
        </motion.p>

        {/* rail */}
        <motion.div className="absolute left-[clamp(0.75rem,1.4vw,1.5rem)] top-1/2 z-30 -translate-y-1/2" style={{ opacity: railO }}>
          <div className="w-[clamp(9.5rem,11vw,11.5rem)] rounded-[22px] bg-[#0b0d11]/55 p-4 ring-1 ring-white/10 backdrop-blur-xl">
            <Rail step={state.step} progress={scrollYProgress} time={state.time} onJump={jump} />
            <h2 id="day-heading" className="mt-4 border-t border-white/10 pt-3 text-[0.82rem] font-medium leading-snug text-white/85">
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">step {state.step + 1}/6</span>
              {STEPS[state.step].verb}
            </h2>
            <a href="#after-hours" className="mt-2 inline-block font-mono text-[0.64rem] text-white/45 underline-offset-4 hover:text-white hover:underline">skip the day ↓</a>
          </div>
        </motion.div>
        {state.step === 4 && <p className="pointer-events-none absolute bottom-6 right-8 z-30 font-mono text-[0.66rem] text-white/45">psst · the lamp is clickable</p>}
      </div>
    </section>
  );
}

/* ═══════════════ phones: mini 3D desk + swipeable day ═══════════════ */
function istHour() {
  const parts = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).formatToParts(new Date());
  const h = Number(parts.find((x) => x.type === "hour")?.value ?? 12) + Number(parts.find((x) => x.type === "minute")?.value ?? 0) / 60;
  return h < 9 ? (h < 5 ? 23.5 : 9) : Math.min(23.98, h);
}

function MobileDay() {
  const box = useRef<HTMLDivElement>(null);
  const visible = useInView(box, { margin: "100px" });
  const [hour, setHour] = useState(12);
  useEffect(() => setHour(istHour()), []);
  const step = useMemo(() => { let i = 0; STEPS.forEach((s, k) => { if (hour >= s.h) i = k; }); return i; }, [hour]);

  return (
    <section aria-labelledby="day-title" className="-mt-[5.5rem]">
      <div ref={box} className="relative h-[100svh] min-h-[38rem] overflow-hidden bg-[#0b0d11]">
        <div className="absolute inset-0"><DeskWorld mode="mini" hour={hour} step={step} lampOn={hour >= 18} active={visible} /></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0b0d11] via-[#0b0d11]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
          <Intro size="sm" />
          <label className="mt-6 block rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10 backdrop-blur">
            <span className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
              <span>drag the day</span><span className="text-[0.9rem] tracking-normal text-white">{fmtHour(hour)} · {STEPS[step].label.toLowerCase()}</span>
            </span>
            <input type="range" min={9} max={23.98} step={0.05} value={hour} onChange={(e) => setHour(Number(e.target.value))} className="desk-range mt-3 w-full" aria-label="Time of day" />
          </label>
        </div>
      </div>
      <SwipeDay />
    </section>
  );
}

function SwipeDay() {
  const track = useRef<HTMLOListElement>(null);
  const [cur, setCur] = useState(0);
  const [picks, setPicks] = useState<Record<number, number | null>>({ 1: chapters.length - 1, 3: 0 });
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setCur(Math.round(el.scrollLeft / (el.firstElementChild as HTMLElement).offsetWidth));
  };
  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
  };
  return (
    <div className="pt-10">
      <h2 id="day-title" className="px-5 font-display text-[2rem] font-bold leading-none tracking-[-0.04em]">A day at the desk</h2>
      <p className="mt-2 px-5 text-sm text-fg-3">Swipe through it: six stops from boot to ship.</p>
      <div className="sticky top-[4.6rem] z-10 mt-5 flex gap-1.5 overflow-x-auto px-5 py-2 [scrollbar-width:none]">
        {STEPS.map((s, i) => (
          <button key={s.id} onClick={() => go(i)} aria-current={cur === i ? "step" : undefined} className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-[0.72rem] transition-colors ${cur === i ? "bg-[#ffb547] text-[#14100a]" : "bg-white/[0.06] text-white/60"}`}>
            {s.time} {s.label.toLowerCase()}
          </button>
        ))}
      </div>
      <ol ref={track} onScroll={onScroll} className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none]">
        {STEPS.map((s, i) => (
          <li key={s.id} className="w-[86vw] max-w-[30rem] shrink-0 snap-start overflow-hidden rounded-[24px] border border-white/10 bg-[#0e1116] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
            <p className="flex items-baseline justify-between gap-3 border-b border-white/10 px-4 py-3 font-mono text-[0.7rem]">
              <span className="text-white"><span className="text-[#ffc46b]">{s.time}</span> · {s.label.toLowerCase()}</span>
              <span className="text-white/45">{i + 1}/6</span>
            </p>
            <div className={s.id === "deploy" ? "max-h-[34rem] overflow-y-auto" : s.id === "build" ? "h-[30rem]" : s.id === "boot" ? "h-[20rem]" : "h-[28rem]"}>
              <Screen step={i} t={1} pick={picks[i] ?? null} onPick={(k) => setPicks((p) => ({ ...p, [i]: k }))} />
            </div>
          </li>
        ))}
      </ol>
      <div className="flex justify-center gap-1.5 pb-4" aria-hidden>{STEPS.map((s, i) => <i key={s.id} className={`h-1 rounded-full transition-all ${cur === i ? "w-6 bg-[#ffb547]" : "w-1.5 bg-white/20"}`} />)}</div>
    </div>
  );
}

/* ═══════════════ reduced motion / no WebGL: stacked, static ═══════════════ */
function StackedDay() {
  return (
    <section aria-labelledby="day-title-s" className="wrap pb-6 pt-4">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 p-6 sm:p-10" style={{ background: "linear-gradient(160deg,#1a2244,#0b0d11 65%)" }}>
        <Intro size="sm" />
      </div>
      <h2 id="day-title-s" className="sr-only">A day at the desk</h2>
      <ol className="mt-4 grid gap-4 lg:grid-cols-2">
        {STEPS.map((s, i) => (
          <li key={s.id} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0e1116]">
            <p className="flex items-baseline justify-between gap-3 border-b border-white/10 px-5 py-3 font-mono text-xs">
              <span className="text-white"><span className="text-[#ffc46b]">{s.time}</span> · {s.label.toLowerCase()}</span>
              <span className="text-white/45">{s.verb}</span>
            </p>
            <div className={s.id === "deploy" ? "" : s.id === "build" ? "h-[32rem]" : s.id === "boot" ? "h-[22rem]" : "h-[30rem]"}>
              <Screen step={i} t={1} pick={i === 3 ? 0 : i === 1 ? chapters.length - 1 : null} onPick={() => {}} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
