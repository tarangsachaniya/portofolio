import { useRef, useState } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "@/lib/data";
import { useClock } from "@/hooks/useClock";

/** Display line printed as a faint ghost, then inked left→right as you scroll. */
function FillLine({ text, progress, range }: { text: string; progress: ReturnType<typeof useScroll>["scrollYProgress"]; range: [number, number] }) {
  const reduce = useReducedMotion();
  const pct = useTransform(progress, range, reduce ? [0, 0] : [100, 0]);
  const clipPath = useTransform(pct, (v) => `inset(-25% ${v}% -25% 0)`);
  return (
    <span className="relative block">
      <span className="block text-[color-mix(in_srgb,var(--ink)_13%,transparent)]">{text}</span>
      <m.span aria-hidden className="absolute inset-0 block text-ink" style={{ clipPath }}>
        {text}
      </m.span>
    </span>
  );
}

function Magnetic({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });
  return (
    <m.a
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.a>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const time = useClock(profile.timezone);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 15%"] });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  return (
    <section ref={ref} id="contact" className="relative pt-[clamp(5.5rem,11vw,10rem)]" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="flex items-baseline justify-between border-b border-line pb-3 text-meta text-ink-3">
          <span>
            <span className="text-signal-ink">$</span> ./contact --now
          </span>
          <span>05 / 05</span>
        </div>

        <h2 id="contact-title" className="mt-10 text-display">
          <span className="sr-only">Let's build something.</span>
          <span aria-hidden>
            <FillLine text="Let's build" progress={scrollYProgress} range={[0.1, 0.65]} />
            <FillLine text="something." progress={scrollYProgress} range={[0.35, 1]} />
          </span>
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="max-w-[46ch] text-lead text-ink-2">
              Freelance builds, product collaborations, or a backend problem you want a second brain on. I reply within a day. WhatsApp is fastest.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-3 rounded-full bg-signal px-7 py-4 text-base font-semibold text-on-signal"
              >
                Start a project <span aria-hidden>→</span>
              </Magnetic>
              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-4 text-base font-semibold transition-colors hover:border-ink"
              >
                WhatsApp <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <p className="text-meta text-ink-3">Email</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="ulink break-all text-[clamp(1.1rem,0.9rem+0.9vw,1.6rem)] font-semibold tracking-[-0.02em]">
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="text-meta rounded-full border border-line-strong px-3 py-1 text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
              </button>
            </div>
            <p className="mt-6 text-meta text-ink-3">Elsewhere</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="ulink font-medium">
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a href="https://priinteve.com" target="_blank" rel="noreferrer" className="ulink font-medium">
                  Priinteve ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="mt-[clamp(5rem,10vw,8rem)] border-t border-line">
        <div className="wrap grid gap-3 py-6 text-meta text-ink-3 md:grid-cols-3">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="md:text-center">
            Hand-built in Ahmedabad · <span className="tabular-nums">{time}</span> IST
          </span>
          <a href="#top" className="ulink justify-self-start md:justify-self-end">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
