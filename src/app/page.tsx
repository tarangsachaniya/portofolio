import Link from "next/link";
import { chapters, person, services, work } from "@/lib/content";
import { meta, faqNode, graph } from "@/lib/seo";
import HeroStage, { HeroBackdrop } from "@/components/hero/HeroStage";
import Worlds from "@/components/ui/Worlds";
import WorkCard from "@/components/ui/WorkCard";
import { Faq, SectionTitle } from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";
import { Spark } from "@/components/chrome/ChatChrome";
import DeskScene from "@/components/desk/DeskScene";
import AfterHours from "@/components/desk/AfterHours";

export const metadata = meta({
  title: `${person.name} | Full-stack developer in Ahmedabad`,
  description: person.summary,
  path: "/",
});

const homeFaq = [
  { q: "Who is Tarang Sachaniya?", a: person.summary },
  { q: "What has Tarang Sachaniya built?", a: "Priinteve's on-demand printing network (five apps on one Bun and Hono API), Priinteve Cards (NFC digital business cards), Priinteve Menu (QR restaurant ordering), Zerox Buddy (web and Windows app for print shops), Salonly (salon bookings with an Android app), client websites, and the otp-forge npm package." },
  { q: "Where is Tarang Sachaniya based?", a: "Ahmedabad, Gujarat, India. He works with clients remotely and in person around Ahmedabad." },
  { q: "Is Tarang available for freelance projects?", a: services.faq[0].a },
];

export default function Home() {
  const featured = work.filter((w) => w.featured);
  const products = work.filter((w) => w.kind === "Product" && !w.featured);
  return (
    <>
      {/* ── DESK (default world): the pinned day + the after-hours bento ── */}
      <div className="only only-desk">
        <DeskScene />
        <AfterHours faq={homeFaq} />
      </div>

      {/* ── HERO ── */}
      <section className="hide-desk relative overflow-hidden" aria-labelledby="hero-title">
        <div className="pointer-events-none absolute inset-0"><HeroBackdrop /></div>
        <div className="wrap relative grid gap-10 pb-16 pt-10 md:pt-16 keyboard:pt-6 lg:grid-cols-12 lg:items-center">
          {/* text column */}
          <div className="min-w-0 lg:col-span-12 vscode:lg:col-span-5 terminal:lg:col-span-12 keyboard:lg:col-span-12 keyboard:order-2 keyboard:text-center chat:lg:col-span-12 chat:order-2">
            <p className="t-meta text-fg-3 keyboard:mx-auto">
              <span className="mr-2 inline-block size-2 animate-pulse-dot rounded-full bg-accent align-middle" aria-hidden />
              {person.status}
            </p>
            <div className="only only-chat mt-2 mb-2">
              <p className="flex items-center gap-2 text-sm text-fg-3"><Spark className="size-4 text-accent" /> Short answer</p>
            </div>
            <h1 id="hero-title" className="mt-5 hero-name">
              <span className="block">{person.first}</span>
              <span className="block paper:text-right">Sachaniya</span>
            </h1>
            <p className="mt-6 max-w-[58ch] t-lead text-fg-2 keyboard:mx-auto" data-answer>
              {person.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 keyboard:justify-center">
              <Link href="/work/" className="btn btn-primary">See the work <span aria-hidden>→</span></Link>
              <Link href="/services/" className="btn btn-ghost">Hire me</Link>
            </div>
          </div>
          {/* world-specific stage */}
          <div className="hide-paper min-w-0 lg:col-span-7 vscode:lg:col-span-7 terminal:order-first terminal:lg:col-span-12 keyboard:order-1 keyboard:lg:col-span-12 chat:order-1 chat:lg:col-span-12">
            <HeroStage />
          </div>
        </div>
      </section>

      {/* ── WORLDS ── */}
      <section className="hide-desk section border-y border-line bg-bg-2 keyboard:bg-transparent" aria-labelledby="worlds-title">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="t-meta text-accent-ink">Six worlds, one story</p>
            <h2 id="worlds-title" className="mt-3 t-h3 h-pre">This site lives where I do.</h2>
            <p className="mt-3 text-fg-2">The editor, the terminal, the keyboard, the AI chat and the printed page. Same facts, different worlds. Switch any time with <kbd className="font-mono">⌘K</kbd> or <kbd className="font-mono">Alt+0–5</kbd>.</p>
          </div>
          <div className="lg:col-span-8"><Worlds /></div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="hide-desk section" aria-labelledby="work-title">
        <div className="wrap">
          <SectionTitle kicker="ls ./work --featured" id="work-title">Selected work</SectionTitle>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((w) => <WorkCard key={w.slug} w={w} big />)}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {products.map((w) => (
              <Link key={w.slug} href={`/work/${w.slug}/`} className="card flex items-center justify-between gap-4 p-5">
                <span>
                  <span className="block text-lg font-semibold">{w.name}</span>
                  <span className="block text-sm text-fg-2">{w.what}</span>
                </span>
                <span className="flex shrink-0 gap-1.5">{w.platforms.map((p) => <span key={p} className="tag">{p}</span>)}</span>
              </Link>
            ))}
          </div>
          <Link href="/work/" className="mt-8 inline-flex items-center gap-2 font-semibold"><span className="ulink">All {work.length} projects</span> <span aria-hidden>→</span></Link>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="hide-desk section bg-bg-2 keyboard:bg-transparent" aria-labelledby="story-title">
        <div className="wrap">
          <SectionTitle kicker="git log --oneline --reverse" id="story-title">How I got here</SectionTitle>
          <ol className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-5">
            {chapters.map((c) => (
              <li key={c.n} className="bg-bg p-5 keyboard:bg-bg-2">
                <p className="font-mono text-xs text-fg-3">{c.year}</p>
                <p className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight">{c.title}</p>
                <p className="mt-3 font-mono text-[0.75rem] text-accent-ink">{c.commit}</p>
              </li>
            ))}
          </ol>
          <Link href="/about/" className="mt-8 inline-flex items-center gap-2 font-semibold"><span className="ulink">Read the full story</span> <span aria-hidden>→</span></Link>
        </div>
      </section>

      {/* ── SERVICES + FAQ ── */}
      <section className="hide-desk section" aria-labelledby="faq-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle kicker="man services">What I can build for you</SectionTitle>
            <ul className="space-y-4">
              {services.offers.map((o) => (
                <li key={o.title}>
                  <p className="font-semibold">{o.title}</p>
                  <p className="text-fg-2">{o.body}</p>
                </li>
              ))}
            </ul>
            <Link href="/services/" className="btn btn-primary mt-8">How I work <span aria-hidden>→</span></Link>
          </div>
          <div className="lg:col-span-7">
            <SectionTitle kicker="faq" id="faq-title">Quick answers</SectionTitle>
            <Faq items={homeFaq} />
          </div>
        </div>
      </section>

      <JsonLd data={graph(faqNode(homeFaq))} />
    </>
  );
}
