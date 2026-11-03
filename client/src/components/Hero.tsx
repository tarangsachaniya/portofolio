import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { chapters, profile } from "@/lib/data";
import GlyphField from "./GlyphField";
import { ease } from "@/lib/motion";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: ease.out },
});

/** Per-letter 3D flip-up. Letters are aria-hidden; the real h1 is sr-only. */
function Word({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.05em] [perspective:900px] ${className ?? ""}`}>
      {text.split("").map((ch, i) => (
        <m.span
          key={i}
          className="inline-block origin-bottom will-change-transform"
          initial={{ y: "110%", rotateX: -85, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: delay + i * 0.045, ease: ease.out }}
        >
          {ch}
        </m.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTop = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-35%"]);
  const yBottom = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const xTop = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-6%"]);
  const xBottom = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "6%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  const first = Number(chapters[0].year);
  const last = Number(chapters[chapters.length - 1].year);
  const pos = (y: number) => ((y - first) / (last - first)) * 88; // leave room for "now"

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-28" aria-labelledby="hero-title">
      <GlyphField />
      <div className="wrap relative flex flex-1 flex-col">
        {/* meta row */}
        <m.div
          {...fade(0.1)}
          className="grid grid-cols-2 gap-y-2 border-b border-line pb-3 text-meta text-ink-3 md:grid-cols-3"
        >
          <span>Portfolio · v5.0 · 2026</span>
          <span className="hidden text-center md:block">{profile.role} · {profile.location}</span>
          <span className="flex items-center justify-end gap-2">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-signal" />
            </span>
            Currently building
          </span>
        </m.div>

        {/* name */}
        <div className="relative mt-[clamp(2.5rem,7vh,5rem)]">
          <h1 id="hero-title" className="sr-only">
            {profile.name} — {profile.role} who learns by making things
          </h1>
          <div aria-hidden className="text-display select-none">
            <m.div style={{ y: yTop, x: xTop }}>
              <Word text="Tarang" delay={0.2} />
            </m.div>
            <m.div style={{ y: yBottom, x: xBottom }}>
              <Word text="Sachaniya" delay={0.42} className="text-right md:pr-[2vw]" />
            </m.div>
          </div>
          <m.p
            {...fade(0.9)}
            aria-hidden
            className="absolute right-0 top-[0.4em] hidden max-w-[16ch] text-right font-serif text-[clamp(1.4rem,2.6vw,2.6rem)] italic leading-[1.05] text-ink-2 md:block"
          >
            learns by
            <br />
            making things.
          </m.p>
        </div>

        {/* intro + ctas */}
        <m.div style={{ opacity: fadeOut }} className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <m.p {...fade(0.55)} className="text-lead text-ink-2 md:col-span-6 lg:col-span-5">
            I'm a <span className="text-ink">full-stack developer</span> with a backend lean. This site is the
            changelog — from a first web page in a college lab to{" "}
            <span className="text-ink">a printing network running five apps on one API.</span>
          </m.p>
          <m.div {...fade(0.7)} className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7">
            <a
              href="#story"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
            >
              Read the story
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold transition-colors hover:border-ink"
            >
              Skip to the work
            </a>
          </m.div>
        </m.div>

        {/* build timeline — real chapters, doubles as wayfinding */}
        <m.nav {...fade(0.85)} aria-label="Story chapters" className="mt-auto pb-8 pt-16">
          <div className="mb-3 flex justify-between text-meta text-ink-3">
            <span>git log --story</span>
            <span className="hidden sm:inline">{chapters.length} chapters · {first} → now</span>
          </div>
          <div className="relative h-14">
            <m.span
              aria-hidden
              className="absolute inset-x-0 top-3 h-px origin-left bg-line-strong"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 0.9, ease: ease.inOut }}
            />
            <ol>
              {chapters.map((c) => (
                <li key={c.n} className="absolute top-0 -translate-x-0" style={{ left: `${pos(Number(c.year))}%` }}>
                  <a href={`#ch-${c.n}`} className="group flex flex-col items-start gap-2">
                    <span className="mt-[9px] block size-[9px] rounded-full border border-ink bg-paper transition-colors group-hover:bg-ink" />
                    <span className="text-meta text-ink-2 group-hover:text-ink">
                      <span className="hidden sm:inline">{c.n} · </span>
                      {c.year}
                    </span>
                  </a>
                </li>
              ))}
              <li className="absolute right-0 top-0 flex flex-col items-end gap-2" aria-label="Now">
                <span className="mt-[7px] block size-[13px] animate-pulse-dot rounded-full bg-signal" />
                <span className="hidden text-meta text-signal-ink sm:inline">now</span>
              </li>
            </ol>
          </div>
        </m.nav>
      </div>
    </section>
  );
}
