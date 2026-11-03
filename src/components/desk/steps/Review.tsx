"use client";
import { person, services, work } from "@/lib/content";
import { reveal } from "../timeline";

export const QA = [
  { q: "Who is Tarang?", a: person.summary },
  { q: "What has he shipped?", a: `${work.filter((w) => w.kind === "Product").length} Priinteve products: an on-demand print network on one Bun + Hono API, Nectcard NFC business cards, VentaDot QR ordering with desktop, Android and TV apps, Zerox Buddy for print shops, and Salonly for salon bookings. Plus client sites and the otp-forge npm package.` },
  { q: "What's his stack?", a: services.faq[2].a },
  { q: "Can I hire him?", a: `${services.faq[0].a} Email ${person.email}.` },
];

const Spark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden><path fill="currentColor" d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" /></svg>
);

/** 15:00: code review, but the thing under review is Tarang. Answers stream as you scroll. */
export default function Review({ t, pick, onPick }: { t: number; pick?: number | null; onPick?: (i: number) => void }) {
  const seg = 1 / QA.length;
  const auto = Math.min(QA.length - 1, Math.floor(t / seg));
  const i = pick ?? auto;
  const local = pick != null ? 1 : (t - auto * seg) / seg;
  const text = reveal(QA[i].a, local, 0.75);
  const typing = text.length < QA[i].a.length;
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden bg-[#141416] text-[0.92rem]">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <Spark className="size-4 text-[#ff8a5c]" />
        <span className="font-semibold text-white">Review</span>
        <span className="font-mono text-[0.7rem] text-white/40">· ask anything about Tarang</span>
        <span className="ml-auto font-mono text-[0.68rem] text-white/40">PR #2026 · tarang.dev</span>
      </div>
      <div className="min-h-0 space-y-5 overflow-hidden px-5 py-6 sm:px-10">
        {(pick == null ? QA.slice(0, i) : []).map((x) => (
          <p key={x.q} className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-white/[0.04] px-4 py-2 text-white/40">{x.q}</p>
        ))}
        <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-white/10 px-4 py-2.5 text-white">{QA[i].q}</p>
        <div className="flex gap-3">
          <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff8a5c] to-[#9b8cff]"><Spark className="size-3.5 text-white" /></span>
          <p className="max-w-[62ch] font-serif text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-white/90">
            {text}
            {typing && <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-blink bg-[#ff8a5c]" />}
          </p>
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
  );
}
