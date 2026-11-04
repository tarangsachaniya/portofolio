"use client";
import { useEffect, useRef, useState } from "react";
import { person, services } from "@/lib/content";
import { reveal } from "../timeline";

const DRAFT = "Hi Tarang, I have an idea and I'd like you to build it. Free for a call this week?";

export const emitKey = (k: string) => window.dispatchEvent(new CustomEvent("desk:key", { detail: k.toUpperCase() }));

/** 21:30: ship. The draft types itself as you scroll; take over any time and send it for real. */
export default function Ship({ t }: { t: number }) {
  const [mine, setMine] = useState<string | null>(null);
  const auto = reveal(DRAFT, t, 0.7);
  const msg = mine ?? auto;
  const prev = useRef(auto);
  useEffect(() => {
    if (mine == null && auto.length > prev.current.length) emitKey(auto[auto.length - 1]);
    prev.current = auto;
  }, [auto, mine]);

  const mail = `mailto:${person.email}?subject=${encodeURIComponent("Let's build something")}&body=${encodeURIComponent(msg)}`;
  const wa = `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(msg)}`;
  return (
    <div className="@container grid h-full grid-rows-[auto_1fr_auto] overflow-hidden bg-[#111317] text-[0.9rem]">
      <div className="space-y-2 border-b border-white/10 px-5 py-3 font-mono text-[0.75rem] text-white/50">
        <p className="flex items-center gap-3"><span className="w-14">to</span><span className="rounded-full bg-[#ffb547]/15 px-2 py-0.5 text-[#ffc46b]">{person.name} &lt;{person.email}&gt;</span></p>
        <p className="flex items-center gap-3"><span className="w-14">subject</span><span className="text-white/80">Let&apos;s build something</span></p>
      </div>
      <div className="grid min-h-0 @[46rem]:grid-cols-[minmax(0,1fr)_18rem]">
      <label className="relative block min-h-0 p-5">
        <span className="sr-only">Your message to Tarang</span>
        <textarea
          value={msg}
          onChange={(e) => { setMine(e.target.value); const c = e.target.value.slice(-1); if (c) emitKey(c); }}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) window.location.href = mail; if (e.key === " ") emitKey(" "); }}
          onFocus={() => setMine((m) => m ?? auto)}
          className="h-full min-h-[6rem] w-full resize-none bg-transparent font-serif text-[clamp(1.4rem,3vw,2.6rem)] leading-snug text-white outline-none placeholder:text-white/30"
          placeholder="Type your message…"
        />
      </label>
        <aside className="hidden min-h-0 flex-col gap-4 overflow-hidden border-l border-white/10 bg-white/[0.02] p-5 @[46rem]:flex">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/40">Start from</p>
            <ul className="mt-2 space-y-1.5">
              {services.offers.map((o) => (
                <li key={o.title}>
                  <button type="button" onClick={() => setMine(`Hi Tarang, I need help with ${o.title.toLowerCase()}: `)} className="w-full rounded-lg border border-white/10 px-3 py-2 text-left text-[0.82rem] text-white/75 hover:border-[#ffb547]/50 hover:text-white">
                    {o.title}<span className="block truncate text-[0.7rem] text-white/40">{o.tags.join(" · ")}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto">
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/40">What happens next</p>
            <ol className="mt-2 space-y-1.5 text-[0.78rem] leading-snug text-white/65">
              {services.process.slice(0, 3).map((p) => <li key={p.n} className="flex gap-2"><span className="font-mono text-[#ffc46b]">{p.n}</span><span><span className="text-white">{p.t}.</span> {p.b}</span></li>)}
            </ol>
          </div>
        </aside>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-3">
        <a href={mail} className="btn btn-primary !py-2.5 text-sm">Send email <span aria-hidden>↵</span></a>
        <a href={wa} target="_blank" rel="noreferrer" className="btn btn-ghost !py-2.5 text-sm">WhatsApp <span aria-hidden>↗</span></a>
        <span className="ml-auto hidden font-mono text-[0.7rem] text-white/40 sm:inline">⌘↵ to send · {person.whatsappLabel}</span>
      </div>
    </div>
  );
}
