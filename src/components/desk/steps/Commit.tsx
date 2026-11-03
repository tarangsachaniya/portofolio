"use client";
import { chapters } from "@/lib/content";
import { hash } from "../timeline";

const BRANCH = ["#ffb547", "#5ee0c1", "#9b8cff", "#ff8a5c", "#7cc4ff"];

/** 10:30: the story as `git log --graph`. HEAD walks through the chapters as you scroll. */
export default function Commit({ t, pick, onPick }: { t: number; pick?: number | null; onPick?: (i: number) => void }) {
  const auto = Math.min(chapters.length - 1, Math.floor(t * chapters.length));
  const head = pick ?? auto;
  const c = chapters[head];
  return (
    <div className="@container grid h-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-[#0f1115] font-mono text-[0.82rem]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#0b0d10] px-4 py-2.5 text-white/50">
        <span className="flex gap-1.5" aria-hidden><i className="size-3 rounded-full bg-[#ff5f57]" /><i className="size-3 rounded-full bg-[#febc2e]" /><i className="size-3 rounded-full bg-[#28c840]" /></span>
        <span className="ml-3">~/tarang — git log</span>
        <span className="ml-auto rounded bg-white/5 px-2 py-0.5 text-[0.7rem] text-[#5ee0c1]">⎇ main · {chapters.length} commits</span>
      </div>
      <div className="grid min-h-0 @[46rem]:grid-cols-[1fr_1.05fr]">
        {/* graph */}
        <div className="flex min-h-0 flex-col p-5 @[46rem]:p-7">
          <p className="text-white/80"><span className="text-[#5ee0c1]">tarang@ahmedabad</span>:<span className="text-[#7cc4ff]">~</span>$ git log --graph --reverse</p>
          <ol className="mt-5 flex flex-1 flex-col justify-between">
            {chapters.map((ch, i) => {
              const on = i === head;
              const seen = i <= head;
              return (
                <li key={ch.n} className="relative flex-1">
                  {i < chapters.length - 1 && <i aria-hidden className="absolute left-[0.6rem] top-5 h-full w-[2px]" style={{ background: `linear-gradient(${BRANCH[i]}, ${BRANCH[i + 1]})`, opacity: i < head ? 0.8 : 0.18 }} />}
                  <button type="button" onClick={() => onPick?.(i)} aria-pressed={on} className={`relative flex w-full items-start gap-4 rounded-xl px-1 py-2 text-left transition-colors ${on ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`}>
                    <span aria-hidden className="mt-0.5 grid size-[1.2rem] shrink-0 place-items-center rounded-full" style={{ border: `2px solid ${BRANCH[i]}`, background: seen ? BRANCH[i] : "#0f1115", boxShadow: on ? `0 0 18px ${BRANCH[i]}` : "none" }} />
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[#ffc46b]">{hash(ch.commit)}</span>
                        {on && <span className="rounded bg-[#5ee0c1]/15 px-1.5 text-[0.7rem] text-[#5ee0c1]">HEAD → main</span>}
                        <span className="text-[0.72rem] text-white/35">{ch.year}</span>
                      </span>
                      <span className={`mt-0.5 block text-[0.95rem] ${seen ? "text-white" : "text-white/40"}`}>{ch.commit}</span>
                      <span className="block text-[0.72rem] text-white/40">{ch.where}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        {/* git show */}
        <div key={head} className="hidden min-h-0 animate-[fadeUp_.45s_ease_both] flex-col border-l border-white/10 bg-white/[0.02] p-7 @[46rem]:flex">
          <p className="text-white/40">$ git show {hash(c.commit)}</p>
          <p className="mt-1 text-[0.72rem] text-white/35">Author: Tarang Sachaniya · {c.year}</p>
          <p className="mt-5 font-display text-[2.3rem] font-bold leading-[1.02] tracking-[-0.035em] text-white">{c.title}</p>
          <p className="mt-2 text-[#b9aeff]">{c.where}</p>
          <p className="mt-4 font-body text-[1.02rem] leading-relaxed text-white/75">{c.story}</p>
          <div className="mt-auto rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-[0.7rem] uppercase tracking-widest text-white/40">files changed</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[0.78rem]">
              {c.learned.map((l) => <li key={l} className="flex gap-2 text-white/70"><span className="text-[#5ee0c1]">+</span><span className="truncate">{l}</span></li>)}
              {c.made.map((l) => <li key={l} className="flex gap-2 text-white/70"><span className="text-[#ffc46b]">+</span><span className="truncate">{l}</span></li>)}
            </ul>
            <p className="mt-3 flex gap-4 text-[0.66rem] text-white/40"><span><span className="text-[#5ee0c1]">+</span> learned</span><span><span className="text-[#ffc46b]">+</span> made</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
