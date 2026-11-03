"use client";
import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/content";
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
    <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden bg-[#111317] text-[0.9rem]">
      <div className="space-y-2 border-b border-white/10 px-5 py-3 font-mono text-[0.75rem] text-white/50">
        <p className="flex items-center gap-3"><span className="w-14">to</span><span className="rounded-full bg-[#ffb547]/15 px-2 py-0.5 text-[#ffc46b]">{person.name} &lt;{person.email}&gt;</span></p>
        <p className="flex items-center gap-3"><span className="w-14">subject</span><span className="text-white/80">Let&apos;s build something</span></p>
      </div>
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
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-3">
        <a href={mail} className="btn btn-primary !py-2.5 text-sm">Send email <span aria-hidden>↵</span></a>
        <a href={wa} target="_blank" rel="noreferrer" className="btn btn-ghost !py-2.5 text-sm">WhatsApp <span aria-hidden>↗</span></a>
        <span className="ml-auto hidden font-mono text-[0.7rem] text-white/40 sm:inline">⌘↵ to send · {person.whatsappLabel}</span>
      </div>
    </div>
  );
}
