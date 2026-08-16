import { useRef } from "react";
import {
  m,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Instagram,
  Linkedin,
  MapPin,
} from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { priinteveProducts, profile, statsData } from "@/lib/data";

const liveProductCount = priinteveProducts.filter((p) => p.status === "live").length;
import { blurIn, dur, ease, fadeUp, fadeUpSm, stagger } from "@/lib/motion";

const socialIcons = { github: Github, linkedin: Linkedin, instagram: Instagram };

export default function Hero() {
  const typed = useTypewriter([...profile.roles]);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  /*
   * Progress runs 0 → 1 over exactly one viewport height. The animated nodes
   * are all DESCENDANTS of `ref` — never transform the useScroll target
   * itself, since its own rect feeds the progress calculation.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  /** drop a scroll binding entirely when the user asked for reduced motion */
  const p = <T,>(v: MotionValue<T>) => (reduced ? undefined : v);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden bg-background pt-16"
    >
      {/* backdrop layers */}
      <m.div
        aria-hidden
        style={{ y: p(gridY) }}
        className="pointer-events-none absolute inset-0 -top-24 bg-grid text-foreground/[0.045] mask-fade-y"
      />
      <m.div
        aria-hidden
        style={{ y: p(glowY) }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[62%] top-[-18%] h-[520px] w-[520px] rounded-full bg-accent/[0.10] blur-[110px]" />
        <div className="absolute -left-24 bottom-[-10%] h-[420px] w-[420px] rounded-full bg-accent/[0.06] blur-[110px]" />
      </m.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_400px]">
          {/* ── copy ── */}
          <m.div
            style={{ y: p(copyY), opacity: p(fade) }}
            className="order-1 text-center lg:text-left"
          >
            <m.div
              variants={stagger(0.08)}
              initial="hidden"
              animate="show"
            >
              <m.div
                variants={fadeUpSm}
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] px-4 py-1.5"
              >
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  Available for work
                </span>
              </m.div>

              <m.h1
                variants={blurIn}
                className="font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-tighter text-foreground sm:text-6xl lg:text-7xl"
              >
                <span className="block text-muted-foreground/70">
                  <span aria-hidden className="text-accent">
                    &gt;{" "}
                  </span>
                  Hi, I&apos;m
                </span>
                <span className="text-gradient block">Tarang.</span>
              </m.h1>

              {/* fixed height stops the caret line reflowing as text types */}
              <m.div
                variants={fadeUpSm}
                className="mt-5 flex h-8 items-center justify-center font-mono text-lg text-accent sm:text-xl lg:justify-start"
              >
                <span aria-live="off">{typed}</span>
                <span className="animate-blink ml-1 inline-block h-5 w-[3px] rounded-sm bg-accent" />
              </m.div>

              <m.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground lg:mx-0 lg:text-base"
              >
                {profile.blurb}
              </m.p>

              <m.div
                variants={fadeUpSm}
                className="mt-4 flex items-center justify-center gap-2 font-mono text-[13px] text-muted-foreground lg:justify-start"
              >
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {profile.location}
              </m.div>

              {/* stats */}
              <m.dl
                variants={fadeUp}
                className="mt-8 flex items-center justify-center gap-8 lg:justify-start"
              >
                {statsData.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-2xl font-bold text-foreground">
                        {stat.value}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </m.dl>

              <m.div
                variants={fadeUp}
                className="mt-9 flex flex-col items-center gap-2 sm:flex-row lg:justify-start"
              >
                <MagneticButton
                  onClick={() => scrollTo("work")}
                  className="group inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 font-mono text-sm font-semibold text-accent-foreground transition-shadow hover:shadow-[0_0_30px_-6px_hsl(var(--accent)/0.7)]"
                >
                  View my work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </MagneticButton>
                <MagneticButton
                  onClick={() => scrollTo("contact")}
                  cap={8}
                  className="rounded-lg border border-border px-7 py-3 font-mono text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                >
                  Get in touch
                </MagneticButton>
              </m.div>

              <m.div
                variants={fadeUpSm}
                className="mt-8 flex items-center justify-center gap-2 lg:justify-start"
              >
                {profile.socials.map((social) => {
                  const Icon =
                    socialIcons[social.icon as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </m.div>
            </m.div>
          </m.div>

          {/* ── portrait ── */}
          <m.div
            style={{ y: p(portraitY), opacity: p(fade) }}
            className="order-2 flex justify-center"
          >
            <div className="relative w-[300px] md:w-[360px]">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full bg-accent/10 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-xl border border-border bg-card">
                {/*
                 * The LCP element renders at full opacity with explicit
                 * dimensions. Chrome excludes opacity:0 nodes from LCP
                 * candidacy, so fading the image in would add the animation's
                 * duration to the reported LCP. The entrance comes from the
                 * overlay below, which wipes off — occlusion doesn't disqualify
                 * an LCP candidate.
                 */}
                <picture>
                  <source srcSet="/img/hero-760.avif" type="image/avif" />
                  <img
                    src="/img/hero-760.webp"
                    alt={`${profile.name}, ${profile.headline}`}
                    width={760}
                    height={950}
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </picture>

                <m.div
                  aria-hidden
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.7, ease: ease.inOut, delay: 0.15 }}
                  style={{ originY: 1 }}
                  className="absolute inset-0 z-10 bg-background"
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/85 to-transparent"
                />

                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-md border border-border/70 bg-background/80 px-3 py-2 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="truncate font-mono text-[11px] text-muted-foreground">
                    {profile.secondary}
                  </span>
                </div>
              </div>

              <m.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: dur.base, delay: 0.8, ease: ease.out }}
                className="absolute -right-4 top-10 rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-xl md:-right-8"
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Products live
                </div>
                <div className="font-display text-xl font-bold text-accent">
                  {liveProductCount}
                </div>
              </m.div>
            </div>
          </m.div>
        </div>
      </div>

      <m.button
        style={{ opacity: p(cueOpacity) }}
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-accent"
      >
        <ChevronDown className="animate-bounce-arrow h-5 w-5" />
      </m.button>
    </section>
  );
}
