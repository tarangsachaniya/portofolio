"use client";

import { useTyping } from "./useReveal";
import { Spark } from "../chrome/ChatChrome";

const GREETING = "Hi! I'm Tarang's site, in chat form. The short answer is below; the long answer is every page here. Ask me anything in the box, or tap a suggestion.";

export default function ChatHero() {
  const n = useTyping(GREETING.length, 12, 600);
  return (
    <div aria-hidden className="space-y-6">
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-bg-3 px-4 py-2.5 text-[0.95rem]">Who is Tarang Sachaniya?</p>
      <div>
        <p className="flex items-center gap-2 text-sm text-fg-3"><Spark className={`size-4 text-accent ${n < GREETING.length ? "animate-spin [animation-duration:3s]" : ""}`} /> tarang-5</p>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-fg-2">{GREETING.slice(0, n)}</p>
      </div>
    </div>
  );
}
