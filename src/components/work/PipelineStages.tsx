"use client";

import { useEffect, useRef, useState } from "react";

type Status = "queued" | "running" | "passed";
export interface Stage { key: string; label: string; body: string | string[] }

const elapsed = (s: Stage, i: number) => `${(0.6 + i * 0.9 + (JSON.stringify(s.body).length % 9) / 10).toFixed(1)}s`;

/** A case study as a CI pipeline: problem → constraints → build → learned. Stages tick off as you read. */
export default function PipelineStages({ stages, run }: { stages: Stage[]; run: string }) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [status, setStatus] = useState<Status[]>(() => stages.map(() => "queued"));

  useEffect(() => {
    const tick = () => {
      const vh = window.innerHeight;
      const end = window.scrollY + vh >= document.documentElement.scrollHeight - 160;
      setStatus((prev) => {
        const next = refs.current.map((el): Status => {
          if (!el) return "queued";
          const r = el.getBoundingClientRect();
          if (end && r.top < vh) return "passed";
          return r.bottom < vh * 0.55 ? "passed" : r.top < vh * 0.62 ? "running" : "queued";
        });
        return next.every((s, i) => s === prev[i]) ? prev : next;
      });
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => { window.removeEventListener("scroll", tick); window.removeEventListener("resize", tick); };
  }, []);

  const passed = status.filter((s) => s === "passed").length;
  const go = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* pipeline rail */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="tile !col-auto !transform-none p-5">
          <p className="t-kicker">Pipeline · #{run}</p>
          <p className="mt-2 flex items-center gap-2 font-mono text-sm">
            {passed === stages.length ? <><span className="live-dot" /> <span className="text-[#5ee0c1]">all checks passed</span></> : <><span className="spin" /> <span className="text-fg-2">{passed}/{stages.length} passed</span></>}
          </p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-[#5ee0c1] via-[#ffb547] to-[#9b8cff] transition-[width] duration-700" style={{ width: `${(passed / stages.length) * 100}%` }} />
          </div>
          <ol className="relative mt-5 space-y-1">
            {stages.map((s, i) => (
              <li key={s.key}>
                <button type="button" onClick={() => go(i)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/[0.04]" aria-current={status[i] === "running" ? "step" : undefined}>
                  <StatusIcon s={status[i]} />
                  <span className="flex-1">
                    <span className={`block text-sm font-medium ${status[i] === "queued" ? "text-fg-3" : "text-fg"}`}>{s.label}</span>
                    <span className="block font-mono text-[0.66rem] text-fg-3">{status[i] === "passed" ? `passed in ${elapsed(s, i)}` : status[i] === "running" ? "running…" : "queued"}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {/* stage logs */}
      <div className="space-y-5">
        {stages.map((s, i) => (
          <section key={s.key} ref={(el) => { refs.current[i] = el; }} aria-labelledby={`st-${s.key}`} className={`tile !col-auto !transform-none scroll-mt-28 transition-[border-color,opacity] duration-500 ${status[i] === "queued" ? "opacity-60" : ""} ${status[i] === "running" ? "!border-[#ffb547]/40" : ""}`}>
            <header className="flex items-center gap-3 border-b border-white/10 px-5 py-3 font-mono text-xs">
              <StatusIcon s={status[i]} />
              <span className="text-fg-3">stage 0{i + 1}</span>
              <h2 id={`st-${s.key}`} className="font-body text-base font-semibold text-fg">{s.label}</h2>
              <span className="ml-auto text-fg-3">{status[i] === "passed" ? elapsed(s, i) : status[i] === "running" ? "…" : ""}</span>
            </header>
            <div className="p-5 sm:p-7">
              {typeof s.body === "string" ? (
                <p className="max-w-[62ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-fg-2">{s.body}</p>
              ) : (
                <ul className="space-y-3">
                  {s.body.map((x, k) => (
                    <li key={x} className="flex gap-3 text-[1.02rem] leading-relaxed text-fg-2 transition-all duration-500" style={{ transitionDelay: `${k * 90}ms`, opacity: status[i] === "queued" ? 0.4 : 1, transform: status[i] === "queued" ? "translateY(6px)" : "none" }}>
                      <span aria-hidden className={`mt-0.5 font-mono text-sm ${status[i] === "queued" ? "text-fg-3" : s.key === "learned" ? "text-[#9b8cff]" : "text-[#5ee0c1]"}`}>{status[i] === "queued" ? "○" : s.key === "learned" ? "~" : "✓"}</span>
                      <span className="max-w-[64ch]">{x}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function StatusIcon({ s }: { s: Status }) {
  if (s === "running") return <span className="spin shrink-0" aria-label="running" />;
  if (s === "passed")
    return (
      <span className="grid size-[0.95rem] shrink-0 place-items-center rounded-full bg-[#5ee0c1]" aria-label="passed">
        <svg viewBox="0 0 10 10" className="size-2.5 text-[#0b0d11]"><path d="M2 5.2l2 2 4-4.4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
      </span>
    );
  return <span className="size-[0.95rem] shrink-0 rounded-full border border-white/25" aria-label="queued" />;
}
