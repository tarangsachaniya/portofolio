"use client";
import { now, uses, work } from "@/lib/content";

/** Which tools each topic grows out of (all from the toolbox / project stacks), and keywords to find related work. */
const MAP: Record<string, { builds: string[]; find: string[]; next: string }> = {
  Kubernetes: { builds: ["Docker", "Linux VPS with Nginx", "Bun", "Hono"], find: ["Bun", "Nginx"], next: "Run the Priinteve API as more than one box when the printer network grows." },
  Terraform: { builds: ["AWS EC2 and S3", "Cloudflare R2", "Vercel"], find: ["Cloudflare R2"], next: "Describe servers, buckets and DNS as code instead of clicking them together." },
  "ESP32 and NFC": { builds: ["IoT", "NFC", "OpenCV"], find: ["NFC", "IoT"], next: "A small terminal that taps an NFC card and verifies it on the spot." },
  "AI agents": { builds: ["Claude and Claude Code for design docs, reviews and pair programming", "TypeScript"], find: [], next: "Agents that do real work inside products, not just chat." },
  "React Native": { builds: ["React", "Next.js", "TypeScript"], find: ["React", "Next.js"], next: "One codebase for the Android and iOS apps the products already need." },
};

/** 13:30: lunch at the desk. One tab per thing I'm learning, with what it builds on and where it'll be used. */
export default function Learn({ t, pick, onPick }: { t: number; pick?: number | null; onPick?: (i: number) => void }) {
  const n = now.learning.length;
  const i = pick ?? Math.min(n - 1, Math.floor(t * n));
  const topic = now.learning[i];
  const m = MAP[topic] ?? { builds: [], find: [], next: "On the list because the next systems I build will need it." };
  const related = now.items.find((x) => topic.split(/[ ,]+/).some((w) => w.length > 3 && x.toLowerCase().includes(w.toLowerCase())));
  const projects = work.filter((w) => m.find.some((f) => w.stack.includes(f))).slice(0, 3);
  return (
    <div className="@container grid h-full grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden bg-[#f4f1ea] text-[#1d1c19]">
      <div className="flex items-end gap-1 overflow-hidden bg-[#dcd7cc] px-3 pt-2">
        {now.learning.map((l, k) => (
          <button key={l} type="button" onClick={() => onPick?.(k)} className={`max-w-[12rem] truncate rounded-t-xl px-4 py-2 text-[0.84rem] ${k === i ? "bg-[#f4f1ea] font-semibold" : "text-black/55 hover:bg-black/5"}`}>{l}</button>
        ))}
      </div>
      <div className="flex items-center gap-3 border-b border-black/10 px-4 py-2">
        <span className="flex gap-2 text-black/35" aria-hidden>‹ › ↻</span>
        <span className="flex-1 truncate rounded-full bg-black/[0.06] px-4 py-1.5 font-mono text-[0.8rem] text-black/60">~/learning/{topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}</span>
      </div>
      <div className="grid min-h-0 @[46rem]:grid-cols-[minmax(0,1fr)_18rem]">
        <article key={topic} className="flex min-h-0 animate-[fadeUp_.4s_ease_both] flex-col overflow-hidden px-8 py-7">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#b86a12]">13:30 · lunch · currently learning · {i + 1}/{n}</p>
          <h3 className="mt-2 font-display text-[clamp(2.4rem,6.5cqw,3.8rem)] font-bold leading-[0.95] tracking-[-0.045em]">{topic}</h3>
          <p className="mt-3 max-w-[54ch] text-[1.05rem] leading-relaxed text-black/70">{related ? <>Why now: <span className="text-black">{related}</span></> : <>Why: <span className="text-black">{m.next}</span></>}</p>

          <div className="mt-5 grid gap-3 @[40rem]:grid-cols-2">
            <section className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-black/45">Builds on what I use</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">{(m.builds.length ? m.builds : ["the daily stack"]).map((b) => <li key={b} className="max-w-full truncate rounded-full bg-[#b86a12]/10 px-2.5 py-1 text-[0.8rem] text-[#7a4a10]">{b.length > 34 ? b.split(" for ")[0] : b}</li>)}</ul>
            </section>
            <section className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-black/45">Where it shows up</p>
              {projects.length ? (
                <ul className="mt-2 space-y-1">{projects.map((w) => <li key={w.slug} className="flex justify-between gap-2 text-[0.86rem]"><span className="font-semibold">{w.name}</span><span className="truncate text-black/50">{w.status}</span></li>)}</ul>
              ) : <p className="mt-2 text-[0.86rem] leading-snug text-black/65">{m.next}</p>}
            </section>
          </div>

          {/* the whole reading list */}
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-widest text-black/45">The reading list</p>
          <ol className="mt-2 grid flex-1 grid-cols-2 gap-2 @[46rem]:grid-cols-5">
            {now.learning.map((l, k) => (
              <li key={l}>
                <button type="button" onClick={() => onPick?.(k)} className={`flex h-full w-full flex-col justify-between rounded-xl p-3 text-left ring-1 transition-colors ${k === i ? "bg-[#1d1c19] text-white ring-black" : k < i ? "bg-white/70 ring-black/5" : "bg-transparent ring-black/10"}`}>
                  <span className={`font-mono text-[0.66rem] ${k === i ? "text-[#ffc46b]" : "text-black/40"}`}>{k < i ? "✓ read" : k === i ? "● now" : `0${k + 1}`}</span>
                  <span className="mt-3 font-semibold leading-tight">{l}</span>
                </button>
              </li>
            ))}
          </ol>
        </article>
        <aside className="hidden min-h-0 flex-col gap-4 overflow-hidden border-l border-black/10 bg-[#ebe7dd] p-5 @[46rem]:flex">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-black/45">Already in the toolbox</p>
          {uses.groups.map((g) => (
            <div key={g.label}>
              <p className="text-[0.8rem] font-semibold text-black/75">{g.label}</p>
              <p className="mt-1 text-[0.8rem] leading-snug text-black/55">{g.items.slice(0, 7).join(" · ")}</p>
            </div>
          ))}
          <p className="mt-auto rounded-xl bg-black/[0.05] p-3 font-mono text-[0.7rem] leading-relaxed text-black/55">rule: learn it by building it</p>
        </aside>
      </div>
    </div>
  );
}
