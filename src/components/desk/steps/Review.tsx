"use client";
import { person, services, work } from "@/lib/content";
import { reveal } from "../timeline";

export const QA = [
  { q: "Who is Tarang?", a: "A full-stack developer in Ahmedabad with a backend lean: Node.js, TypeScript, Bun, Hono, Next.js, PostgreSQL and Laravel. He co-founded Priinteve Innovations, where he builds an on-demand printing network, NFC business cards, QR restaurant ordering and tools for print shops and salons.", src: ["Story", "/about/"] },
  { q: "What has he shipped?", a: `${work.filter((w) => w.kind === "Product").length} Priinteve products: a print network on one Bun + Hono API, Nectcard NFC business cards, VentaDot QR ordering with desktop, Android and TV apps, Zerox Buddy for print shops, and Salonly for salon bookings. Plus client sites and the otp-forge npm package.`, src: ["Work", "/work/"] },
  { q: "What's his stack?", a: services.faq[2].a, src: ["Uses", "/uses/"] },
  { q: "Can I hire him?", a: `${services.faq[0].a} Email ${person.email}.`, src: ["Services", "/services/"] },
];

const Spark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden><path fill="currentColor" d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" /></svg>
);

/** 15:00: code review, except the thing under review is Tarang. Answers stream as you scroll. */
export default function Review({ t, pick, onPick }: { t: number; pick?: number | null; onPick?: (i: number) => void }) {
  const seg = 1 / QA.length;
  const auto = Math.min(QA.length - 1, Math.floor(t / seg));
  const i = pick ?? auto;
  const local = pick != null || t >= 1 ? 1 : (t - auto * seg) / seg;
  const text = reveal(QA[i].a, local, 0.7);
  const typing = text.length < QA[i].a.length;
  return (
    <div className="@container grid h-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-[#141416] text-[0.92rem]">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <Spark className="size-4 text-[#ff8a5c]" />
        <span className="font-semibold text-white">Review</span>
        <span className="font-mono text-[0.7rem] text-white/40">· ask anything about Tarang</span>
        <span className="ml-auto font-mono text-[0.68rem] text-white/40">answers from this site&apos;s pages</span>
      </div>
      <div className="grid min-h-0 @[52rem]:grid-cols-[minmax(0,1fr)_17rem]">
        {/* chat */}
        <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
          <div className="flex min-h-0 flex-col justify-end gap-5 overflow-hidden px-5 py-6 @[52rem]:px-10">
            {(pick == null ? QA.slice(Math.max(0, i - 1), i) : []).map((x) => (
              <div key={x.q} className="opacity-45">
                <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-white/[0.06] px-4 py-2 text-white">{x.q}</p>
                <p className="mt-3 line-clamp-2 max-w-[60ch] font-serif text-[1.05rem] text-white/80">{x.a}</p>
              </div>
            ))}
            <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-white/10 px-4 py-2.5 text-[1rem] text-white">{QA[i].q}</p>
            <div className="flex gap-3">
              <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff8a5c] to-[#9b8cff]"><Spark className="size-4 text-white" /></span>
              <div>
                <p className="max-w-[56ch] font-serif text-[clamp(1.15rem,2.6cqw,1.6rem)] leading-[1.45] text-white/92">
                  {text}
                  {typing && <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-blink bg-[#ff8a5c]" />}
                </p>
                {!typing && (
                  <p className="mt-3 flex animate-[fadeUp_.3s_ease_both] items-center gap-2 font-mono text-[0.7rem] text-white/45">
                    source <a href={QA[i].src[1]} className="rounded-full border border-white/15 px-2 py-0.5 text-white/75 hover:border-[#ff8a5c]/60">{QA[i].src[0]} ↗</a>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="flex flex-wrap gap-2">
              {QA.map((x, k) => (
                <button key={x.q} type="button" onClick={() => onPick?.(k)} aria-pressed={k === i} className={`rounded-full border px-3 py-1.5 text-[0.8rem] transition-colors ${k === i ? "border-[#ff8a5c]/60 bg-[#ff8a5c]/10 text-white" : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}>
                  {x.q}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* context panel */}
        <aside className="hidden min-h-0 flex-col border-l border-white/10 bg-white/[0.02] p-5 @[52rem]:flex">
          <p className="font-mono text-[0.66rem] uppercase tracking-widest text-white/40">Context</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/about-560.webp" alt="" className="mt-3 aspect-[4/3] w-full rounded-xl object-cover object-top" loading="lazy" />
          <p className="mt-3 font-semibold text-white">{person.name}</p>
          <p className="text-[0.82rem] text-white/55">{person.jobTitle} · {person.city}</p>
          <p className="mt-3 flex items-center gap-2 text-[0.78rem] text-[#5ee0c1]"><span className="live-dot" /> open to freelance builds</p>
          <dl className="mt-4 space-y-2 font-mono text-[0.7rem]">
            <div className="flex justify-between"><dt className="text-white/40">products</dt><dd className="text-white/80">{work.filter((w) => w.kind === "Product").length}</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">projects</dt><dd className="text-white/80">{work.length}</dd></div>
            <div className="flex justify-between"><dt className="text-white/40">timezone</dt><dd className="text-white/80">IST +05:30</dd></div>
          </dl>
          <div className="mt-auto flex flex-wrap gap-1.5">{person.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/12 px-2.5 py-1 text-[0.72rem] text-white/70 hover:text-white">{s.label}</a>)}</div>
        </aside>
      </div>
    </div>
  );
}
