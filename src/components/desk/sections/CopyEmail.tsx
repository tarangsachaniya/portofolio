"use client";
import { useState } from "react";
import { person } from "@/lib/content";

export default function CopyEmail() {
  const [done, setDone] = useState(false);
  return (
    <span className="flex items-center gap-2">
      <a className="ulink" href={`mailto:${person.email}`}>{person.email}</a>
      <button type="button" onClick={() => navigator.clipboard?.writeText(person.email).then(() => { setDone(true); setTimeout(() => setDone(false), 1600); }).catch(() => {})} className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[0.65rem] text-fg-3 hover:text-fg">
        {done ? "copied ✓" : "copy"}
      </button>
    </span>
  );
}
