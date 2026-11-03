"use client";

import Link from "next/link";
import { chapters, notes, now, person, services, uses, work } from "@/lib/content";
import { Faq } from "../ui/Page";
import Worlds from "../ui/Worlds";
import { useClock } from "../shell/useClock";
import { Bento, Counter, Tile } from "./Bento";

const products = work.filter((w) => w.kind === "Product");
const platforms = new Set(work.flatMap((w) => w.platforms));
const stack = Array.from(new Set([...uses.groups.flatMap((g) => g.items).filter((s) => s.length < 22), ...work.flatMap((w) => w.stack)]));

const mins = (t: string) => { const [h, m] = t.split(":").map(Number); return Number.isFinite(h) ? h * 60 + (m || 0) : 12 * 60; };
const dayPart = (t: string) => { const h = mins(t) / 60; return h < 5 ? "probably asleep" : h < 12 ? "morning" : h < 17 ? "afternoon" : h < 21 ? "evening" : "late night"; };

/** 24-hour ring: the arc is how much of Tarang's day has gone, the dot is the sun (or moon). */
function DayRing({ time }: { time: string }) {
  const k = mins(time) / 1440;
  const r = 26, c = 2 * Math.PI * r;
  const a = k * 2 * Math.PI - Math.PI / 2;
  const night = k < 6 / 24 || k > 19 / 24;
  return (
    <svg viewBox="0 0 64 64" className="size-16 shrink-0" aria-hidden>
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="4" />
      <circle cx="32" cy="32" r={r} fill="none" stroke="url(#ring)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${c * k} ${c}`} transform="rotate(-90 32 32)" />
      <defs><linearGradient id="ring" x1="0" x2="1"><stop offset="0" stopColor="#9b8cff" /><stop offset="1" stopColor="#ffb547" /></linearGradient></defs>
      <circle cx={32 + Math.cos(a) * r} cy={32 + Math.sin(a) * r} r="4.5" fill={night ? "#e9ecf5" : "#ffe3a3"} style={{ filter: `drop-shadow(0 0 4px ${night ? "#b9c4ff" : "#ffb547"})` }} />
    </svg>
  );
}

/** After hours: everything else about Tarang, as one pointer-lit bento grid. */
export default function AfterHours({ faq }: { faq: { q: string; a: string }[] }) {
  const time = useClock();
  const hero = products[0];
  return (
    <section id="after-hours" aria-labelledby="after-title" className="wrap scroll-mt-24 py-[clamp(4rem,8vw,7rem)]">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#ffc46b]">23:59 · after hours</p>
          <h2 id="after-title" className="mt-3 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.6rem)] font-bold leading-[0.92] tracking-[-0.045em]">
            The day&apos;s shipped. <span className="text-glow">Here&apos;s the rest.</span>
          </h2>
        </div>
        <p className="max-w-[38ch] text-fg-2">Projects, stack, what I&apos;m up to now and quick answers, all in one grid. Hover around; it follows you.</p>
      </div>

      <Bento>
        {/* featured */}
        <Tile size="2x2" href={`/work/${hero.slug}/`} className="group min-h-[26rem]">
          <div className="flex h-full flex-col p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="t-kicker">Featured · {hero.status}</p>
              <span className="grid size-9 place-items-center rounded-full border border-white/15 transition-transform duration-500 group-hover:-rotate-45" aria-hidden>→</span>
            </div>
            <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[0.95] tracking-[-0.04em]">{hero.name}</h3>
            <p className="mt-2 max-w-[44ch] text-fg-2">{hero.what}. Five apps on one Bun + Hono API.</p>
            <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.shots[0].src} alt={hero.shots[0].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">{hero.stack.slice(0, 5).map((s) => <span key={s} className="tag !bg-black/50 backdrop-blur">{s}</span>)}</div>
            </div>
          </div>
        </Tile>

        {/* clock */}
        <Tile size="1x1">
          <div className="flex h-full flex-col justify-between p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="t-kicker">Local time</p>
              <DayRing time={time} />
            </div>
            <div>
              <p className="font-mono text-[2.6rem] font-medium leading-none tabular-nums tracking-tight">{time}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-fg-2"><span className="live-dot" /> {person.city}, IST · {dayPart(time)}</p>
            </div>
          </div>
        </Tile>

        {/* counters */}
        <Tile size="1x1">
          <div className="grid h-full grid-cols-2 gap-3 p-5">
            {[[products.length, "products"], [work.length, "projects"], [platforms.size, "platforms"], [new Date().getFullYear() - 2021, "years"]].map(([n, l]) => (
              <div key={l as string}>
                <p className="font-display text-[2rem] font-bold leading-none tracking-tight text-glow"><Counter to={n as number} /></p>
                <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-widest text-fg-3">{l}</p>
              </div>
            ))}
          </div>
        </Tile>

        {/* now */}
        <Tile size="2x1" href="/now/">
          <div className="h-full p-5 sm:p-6">
            <p className="t-kicker flex items-center gap-2"><span className="live-dot warn" /> Now · {now.updated}</p>
            <ul className="mt-4 space-y-2">
              {now.items.slice(0, 3).map((n) => <li key={n} className="flex gap-3 text-[0.98rem] text-fg-2"><span aria-hidden className="font-mono text-[#ffc46b]">›</span>{n}</li>)}
            </ul>
          </div>
        </Tile>

        {/* stack marquee */}
        <Tile size="4x1" tilt={false}>
          <div className="flex h-full flex-col justify-center gap-4 overflow-hidden py-6">
            <p className="t-kicker px-6">Daily stack · {stack.length} tools</p>
            {[0, 1].map((row) => (
              <div key={row} className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
                <div className="marquee" style={{ animationDirection: row ? "reverse" : "normal", animationDuration: row ? "46s" : "38s" }}>
                  {(() => { const r = stack.filter((_, k) => k % 2 === row); return [...r, ...r]; })().map((s, k) => (
                    <span key={k} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.78rem] text-fg-2">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Tile>

        {/* learning */}
        <Tile size="3x1">
          <div className="h-full p-5 sm:p-6">
            <p className="t-kicker">Currently learning</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {now.learning.map((l, i) => <span key={l} className="rounded-full px-3 py-1.5 text-sm font-medium" style={{ background: ["#ffb54722", "#9b8cff22", "#5ee0c122", "#ff8a5c22", "#7cc4ff22"][i % 5], color: ["#ffc46b", "#b9aeff", "#5ee0c1", "#ffa784", "#9fd3ff"][i % 5] }}>{l}</span>)}
            </div>
          </div>
        </Tile>

        {/* products list */}
        <Tile size="3x2">
          <div className="flex h-full flex-col p-5 sm:p-6">
            <p className="t-kicker">Priinteve products</p>
            <ul className="mt-3 flex-1 divide-y divide-white/[0.07]">
              {products.map((w) => (
                <li key={w.slug}>
                  <Link href={`/work/${w.slug}/`} className="group/r flex items-center justify-between gap-3 py-3">
                    <span>
                      <span className="block font-semibold group-hover/r:text-[#ffc46b]">{w.name}</span>
                      <span className="block text-[0.82rem] text-fg-3">{w.platforms.join(" · ")}</span>
                    </span>
                    <span className={`live-dot ${w.status === "Live" ? "" : "warn"}`} title={w.status} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/work/" className="mt-3 font-mono text-[0.75rem] text-fg-2 hover:text-fg">→ all {work.length} projects as a graph</Link>
          </div>
        </Tile>

        {/* services */}
        <Tile size="3x2" href="/services/">
          <div className="flex h-full flex-col p-5 sm:p-6">
            <p className="t-kicker">What I build for you</p>
            <ul className="mt-4 flex-1 space-y-4">
              {services.offers.map((o, i) => (
                <li key={o.title} className="flex gap-3">
                  <span className="font-mono text-[0.72rem] text-[#ffc46b]">0{i + 1}</span>
                  <span><span className="block font-semibold">{o.title}</span><span className="block text-[0.85rem] leading-snug text-fg-3">{o.body}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </Tile>

        {/* story */}
        <Tile size="3x2" href="/about/">
          <div className="flex h-full flex-col p-5 sm:p-6">
            <p className="t-kicker">git log --oneline</p>
            <ol className="relative mt-4 flex-1 space-y-3 border-l border-white/10 pl-4">
              {chapters.map((c) => (
                <li key={c.n} className="relative">
                  <i className="absolute -left-[1.32rem] top-1.5 size-2 rounded-full bg-gradient-to-br from-[#ffb547] to-[#9b8cff]" />
                  <p className="font-mono text-[0.7rem] text-fg-3">{c.year}</p>
                  <p className="font-semibold leading-tight">{c.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </Tile>

        {/* notes */}
        {notes.map((n) => (
          <Tile key={n.slug} size="2x1" href={`/notes/${n.slug}/`}>
            <div className="flex h-full flex-col justify-between p-5 sm:p-6">
              <p className="t-kicker">Note · {n.date}</p>
              <div>
                <p className="mt-3 font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.02em]">{n.title}</p>
                <p className="mt-2 line-clamp-2 text-[0.88rem] leading-snug text-fg-3">{n.summary}</p>
              </div>
            </div>
          </Tile>
        ))}

        {/* faq */}
        <Tile size="4x2" tilt={false}>
          <div className="h-full p-5 sm:p-7">
            <p className="t-kicker">Quick answers</p>
            <div className="mt-3"><Faq items={faq} /></div>
          </div>
        </Tile>

        {/* socials */}
        <Tile size="3x1">
          <div className="flex h-full flex-col justify-between p-5">
            <p className="t-kicker">Elsewhere</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {person.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="me noreferrer" className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-sm hover:border-[#ffb547]/60 hover:text-[#ffc46b]">{s.label} ↗</a></li>)}
            </ul>
          </div>
        </Tile>

        {/* cta */}
        <Tile size="3x1" href="/contact/" className="!border-[#ffb547]/30 bg-[radial-gradient(120%_120%_at_100%_0%,rgb(255_181_71/0.25),transparent_60%)]">
          <div className="flex h-full flex-col justify-between p-5">
            <p className="t-kicker !text-[#ffc46b]">Open for freelance</p>
            <p className="font-display text-[1.9rem] font-bold leading-none tracking-[-0.04em]">Let&apos;s build it →</p>
          </div>
        </Tile>

        {/* worlds */}
        <Tile size="4x1" tilt={false} className="lg:!col-span-12">
          <div className="grid h-full gap-5 p-5 sm:p-6 lg:grid-cols-[16rem_1fr] lg:items-center">
            <div>
              <p className="t-kicker">Five more worlds</p>
              <p className="mt-2 text-fg-2">Same story as an editor, a terminal, a keyboard, a chat or a printed page. <kbd className="font-mono text-fg">Alt+0–5</kbd></p>
            </div>
            <Worlds />
          </div>
        </Tile>
      </Bento>
    </section>
  );
}
