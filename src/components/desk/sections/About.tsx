import Link from "next/link";
import { chapters, person } from "@/lib/content";
import { hash } from "../timeline";

/** The person behind the desk: photo, summary and the five chapters at a glance. */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="wrap scroll-mt-24 py-[clamp(4rem,8vw,7rem)]">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <figure className="relative lg:col-span-5">
          <div className="tile !col-auto overflow-hidden p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero-760.webp" alt="Tarang Sachaniya standing outdoors, arms crossed, smiling" width={760} height={950} loading="lazy" className="aspect-[4/5] w-full rounded-[16px] object-cover object-top" />
            <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between rounded-2xl bg-[#0b0d11]/70 px-4 py-3 backdrop-blur-md">
              <span><span className="block font-semibold">{person.name}</span><span className="block text-sm text-fg-3">{person.jobTitle} · {person.city}</span></span>
              <span className="flex items-center gap-2 font-mono text-[0.7rem] text-[#5ee0c1]"><span className="live-dot" /> available</span>
            </figcaption>
          </div>
        </figure>
        <div className="lg:col-span-7 lg:pt-6">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#ffc46b]">git blame · the person behind the desk</p>
          <h2 id="about-title" className="mt-3 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            A developer who <span className="text-glow">learns by making things.</span>
          </h2>
          <p className="mt-6 max-w-[60ch] text-[1.12rem] leading-relaxed text-fg-2">{person.summary}</p>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-fg-3">{person.oneLiner}</p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {chapters.map((c, i) => (
              <li key={c.n} className={`tile !col-auto p-5 ${i === chapters.length - 1 ? "sm:col-span-2 xl:col-span-1" : ""}`}>
                <p className="flex items-center justify-between font-mono text-[0.7rem] text-fg-3"><span className="text-[#ffc46b]">{hash(c.commit)}</span><span>{c.year}</span></p>
                <p className="mt-3 font-display text-[1.25rem] font-semibold leading-tight tracking-tight">{c.title}</p>
                <p className="mt-1 text-[0.85rem] text-fg-3">{c.where}</p>
                <p className="mt-3 font-mono text-[0.74rem] text-[#9fd3ff]">{c.commit}</p>
              </li>
            ))}
          </ol>
          <Link href="/about/" className="btn btn-ghost mt-8">Read the full story <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  );
}
