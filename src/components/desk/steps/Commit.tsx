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
    <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden font-mono text-[0.8rem]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-white/50">
        <span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" /></span>
        <span className="ml-3">~/tarang — zsh</span>
        <span className="ml-auto hidden sm:inline">main</span>
      </div>
      <div className="grid min-h-0 gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="min-h-0 overflow-hidden p-4 sm:p-6">
          <p className="text-white/80"><span className="text-[#5ee0c1]">tarang@ahmedabad</span>:<span className="text-[#7cc4ff]">~</span>$ git log --graph --reverse</p>
          <ol className="mt-4 space-y-0">
            {chapters.map((ch, i) => {
              const on = i === head;
              const seen = i <= head;
              return (
                <li key={ch.n}>
                  <button
                    type="button"
                    onClick={() => onPick?.(i)}
                    className={`group flex w-full items-start gap-3 rounded-md px-2 py-1.5 text-left transition-colors ${on ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}`}
                    aria-pressed={on}
                  >
                    <span aria-hidden className="relative mt-1 flex w-4 shrink-0 justify-center">
                      <i className="block size-2.5 rounded-full transition-all" style={{ background: seen ? BRANCH[i] : "transparent", border: `1.5px solid ${BRANCH[i]}`, boxShadow: on ? `0 0 14px ${BRANCH[i]}` : "none" }} />
                      {i < chapters.length - 1 && <i className="absolute top-3.5 h-[calc(100%+0.6rem)] w-px bg-white/15" />}
                    </span>
                    <span className="min-w-0">
                      <span className="text-[#ffc46b]">{hash(ch.commit)}</span>{" "}
                      {on && <span className="rounded bg-[#5ee0c1]/15 px-1 text-[#5ee0c1]">HEAD → main</span>}{" "}
                      <span className={seen ? "text-white/90" : "text-white/35"}>{ch.commit}</span>
                      <span className="block text-[0.7rem] text-white/40">{ch.year} · {ch.where}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div key={head} className="hidden min-h-0 animate-[fadeUp_.5s_ease_both] border-l border-white/10 bg-white/[0.02] p-6 md:block">
          <p className="text-white/40">$ git show {hash(c.commit)} --stat</p>
          <p className="mt-4 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-bold leading-tight tracking-[-0.03em] text-white">{c.title}</p>
          <p className="mt-1 text-[#9b8cff]">{c.year} · {c.where}</p>
          <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-white/75">{c.story}</p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-[0.72rem]">
            <div>
              <p className="text-[#5ee0c1]">+ learned</p>
              <ul className="mt-1 space-y-0.5 text-white/60">{c.learned.map((l) => <li key={l}>+ {l}</li>)}</ul>
            </div>
            <div>
              <p className="text-[#ffc46b]">+ made</p>
              <ul className="mt-1 space-y-0.5 text-white/60">{c.made.map((l) => <li key={l}>+ {l}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
