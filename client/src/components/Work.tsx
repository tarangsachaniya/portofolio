import { useMemo, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { featured, work, workKinds, type Work as WorkItem, type WorkStatus } from "@/lib/data";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { ease } from "@/lib/motion";
import { asset, cn } from "@/lib/utils";

function StatusTag({ status }: { status: WorkStatus }) {
  const live = status === "Live";
  const pre = status === "Pre-launch";
  return (
    <span className="inline-flex items-center gap-1.5 text-meta text-ink-2">
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          live ? "bg-signal" : pre ? "border border-signal" : "bg-ink-3/50",
        )}
      />
      {status}
    </span>
  );
}

/** Browser frame whose screenshot un-masks and settles as it scrolls in. */
function Frame({ src, domain, alt }: { src: string; domain: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}% round ${v / 2}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);
  return (
    <m.div ref={ref} style={{ clipPath }} className="overflow-hidden border border-line-strong bg-paper">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </span>
        <span className="ml-2 truncate font-mono text-[0.7rem] text-ink-3">{domain}</span>
      </div>
      <div className="overflow-hidden">
        <m.img
          style={{ scale }}
          src={asset(src)}
          alt={alt}
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full origin-top object-cover object-top"
        />
      </div>
    </m.div>
  );
}

function Featured() {
  const f = featured;
  return (
    <article className="border-t border-ink pt-8" aria-labelledby="featured-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-meta text-signal-ink">{f.eyebrow}</p>
          <h3 id="featured-title" className="mt-4 text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            {f.name}
          </h3>
          <p className="mt-6 text-lead text-ink-2">{f.pitch}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-4">
            <div>
              <dt className="text-meta text-ink-3">Role</dt>
              <dd className="mt-1 text-sm">{f.role}</dd>
            </div>
            <div>
              <dt className="text-meta text-ink-3">Status · Year</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                <StatusTag status={f.status} /> <span className="text-ink-3">·</span> {f.year}
              </dd>
            </div>
          </dl>
          <a href={f.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
            <span className="ulink">{f.domain}</span> <span aria-hidden>↗</span>
          </a>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <Frame src={f.image} domain={f.domain} alt="Priinteve customer website homepage" />
        </Reveal>
      </div>

      {/* how it works */}
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="text-meta text-ink-3">Architecture</p>
          <div className="mt-4 grid gap-3">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {f.surfaces.map((s) => (
                <li key={s.name} className="border border-line-strong px-3 py-3">
                  <p className="text-sm font-semibold leading-tight">{s.name}</p>
                  <p className="mt-1 font-mono text-[0.7rem] leading-snug text-ink-3">{s.note}</p>
                </li>
              ))}
            </ul>
            <div aria-hidden className="flex justify-center font-mono text-ink-3">↓ ↓ ↓</div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 bg-ink px-4 py-4 text-paper">
              <p className="font-semibold">{f.core.name}</p>
              <p className="font-mono text-xs text-paper/70">{f.core.note}</p>
            </div>
            <ul className="flex flex-wrap gap-2 pt-1">
              {f.infra.map((i) => (
                <li key={i} className="rounded-full border border-line px-3 py-1 font-mono text-[0.72rem] text-ink-2">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <p className="text-meta text-ink-3">Order allocation · weighted score</p>
          <ul className="mt-4 space-y-4">
            {f.allocation.map((a, i) => (
              <li key={a.label}>
                <div className="flex justify-between text-sm">
                  <span>{a.label}</span>
                  <span className="font-mono tabular-nums">{a.weight}%</span>
                </div>
                <div className="mt-1.5 h-2 bg-paper-3">
                  <m.div
                    className="h-full origin-left bg-signal"
                    style={{ width: `${a.weight * 2}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1, delay: 0.15 * i, ease: ease.out }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-8 space-y-3 border-t border-line pt-4 text-[0.95rem] leading-relaxed text-ink-2">
            {f.notes.map((n) => (
              <li key={n} className="flex gap-3">
                <span aria-hidden className="font-mono text-signal-ink">→</span>
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}

function Row({
  item,
  index,
  open,
  onToggle,
  onHover,
}: {
  item: WorkItem;
  index: number;
  open: boolean;
  onToggle: () => void;
  onHover: (img?: string) => void;
}) {
  const panel = `work-${item.id}`;
  return (
    <li className="border-b border-line" onMouseEnter={() => onHover(item.image)} onMouseLeave={() => onHover(undefined)}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panel}
        className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 py-5 text-left md:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)_7rem_5rem_2rem] md:py-6"
      >
        <span className="font-mono text-xs text-ink-3 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span>
          <span className="block text-[clamp(1.35rem,1.1rem+1vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1.5">
            {item.name}
          </span>
          <span className="mt-1 block text-sm text-ink-3 md:hidden">{item.what}</span>
        </span>
        <span className="hidden text-[0.95rem] text-ink-2 md:block">{item.what}</span>
        <span className="hidden md:block">
          <StatusTag status={item.status} />
        </span>
        <span className="hidden font-mono text-xs text-ink-3 tabular-nums md:block">{item.year}</span>
        <span aria-hidden className={cn("font-mono text-lg text-ink-3 transition-transform duration-300", open && "rotate-45 text-signal-ink")}>
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: ease.out }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 md:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)] md:gap-x-4">
              <span className="hidden md:block" />
              <div className="md:col-span-1">
                {item.image && (
                  <img
                    src={asset(item.image)}
                    alt={`${item.name} homepage`}
                    width={1280}
                    height={800}
                    loading="lazy"
                    className="mb-5 aspect-[16/10] w-full border border-line object-cover object-top [@media(hover:hover)]:hidden"
                  />
                )}
                <p className="max-w-[56ch] text-body text-ink-2">{item.detail}</p>
              </div>
              <div className="space-y-4">
                <p className="text-meta text-ink-3">
                  {item.kind} · {item.role}
                  <span className="md:hidden"> · {item.status} · {item.year}</span>
                </p>
                {item.stack.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {item.stack.map((s) => (
                      <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.72rem] text-ink-2">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {item.href && (
                  <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold">
                    <span className="ulink">{item.domain ?? "Visit"}</span> <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Work() {
  const [kind, setKind] = useState<(typeof workKinds)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | undefined>();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  const list = useMemo(() => (kind === "All" ? work : work.filter((w) => w.kind === kind)), [kind]);

  return (
    <section id="work" className="section-y" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead
          id="work"
          index="03"
          path="ls ~/work --sort=recent"
          title={["Selected work,", "2023 to now."]}
          aside="Products I run, sites I've built for clients, and the early projects that taught me the basics."
        />

        <Featured />

        <div className="mt-24 md:mt-32">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
            <h3 className="text-h3">Everything else</h3>
            <div role="group" aria-label="Filter work" className="flex flex-wrap gap-1.5">
              {workKinds.map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={kind === k}
                  onClick={() => {
                    setKind(k);
                    setOpen(null);
                  }}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-meta transition-colors",
                    kind === k ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-2 hover:border-ink",
                  )}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div
            className="relative"
            onMouseMove={(e) => {
              x.set(e.clientX);
              y.set(e.clientY);
            }}
          >
            <ul aria-live="polite">
              {list.map((item, i) => (
                <Row
                  key={item.id}
                  item={item}
                  index={i}
                  open={open === item.id}
                  onToggle={() => setOpen((o) => (o === item.id ? null : item.id))}
                  onHover={setPreview}
                />
              ))}
            </ul>
            <p className="mt-4 text-meta text-ink-3">
              Showing {list.length} of {work.length}
            </p>

            {/* cursor-following preview: fine pointers only, decorative */}
            <AnimatePresence>
              {preview && !open && (
                <m.div
                  aria-hidden
                  className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[22rem] [@media(hover:hover)]:block"
                  style={{ x: sx, y: sy, translateX: "24px", translateY: "-50%" }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, ease: ease.out }}
                >
                  <img src={asset(preview)} alt="" className="aspect-[16/10] w-full border border-line-strong object-cover object-top shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]" />
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
