"use client";
import { useEffect, useState } from "react";
import { playKey } from "../shell/sound";

const ROWS = ["1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const NAME = new Set("TARANG");

/** The keyboard in front of the monitor. Keys light up for every character typed in Ship. */
export default function DeskKeyboard({ listen = false }: { listen?: boolean }) {
  const [down, setDown] = useState<Record<string, number>>({});
  useEffect(() => {
    const light = (k: string) => {
      const key = k === " " ? "SPACE" : k.toUpperCase();
      setDown((d) => ({ ...d, [key]: Date.now() }));
      setTimeout(() => setDown((d) => { const n = { ...d }; if (Date.now() - (n[key] ?? 0) >= 150) delete n[key]; return n; }), 160);
    };
    const onBus = (e: Event) => { light((e as CustomEvent<string>).detail); playKey((e as CustomEvent<string>).detail === " " ? "space" : "key"); };
    const onKey = (e: KeyboardEvent) => { if (e.key.length === 1) light(e.key); };
    window.addEventListener("desk:key", onBus);
    if (listen) window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("desk:key", onBus); window.removeEventListener("keydown", onKey); };
  }, [listen]);

  const Key = ({ k, w = 1 }: { k: string; w?: number }) => {
    const on = !!down[k];
    return (
      <span
        className={`relative grid h-[min(4.2svh,2.6rem)] place-items-center rounded-[6px] font-mono text-[min(1.3svh,0.72rem)] transition-all duration-75 ${on ? "translate-y-[2px] text-[#14100a]" : "text-white/55"}`}
        style={{
          flex: w,
          background: on ? "linear-gradient(180deg,#ffd38a,#ffb547)" : NAME.has(k) ? "linear-gradient(180deg,#2c303a,#22252d)" : "linear-gradient(180deg,#22252c,#1a1c22)",
          boxShadow: on ? "0 1px 0 #a8701f, 0 0 24px rgb(255 181 71 / 0.7)" : "0 3px 0 #0b0c0f, inset 0 1px 0 rgb(255 255 255 / 0.06)",
        }}
      >
        {k === "SPACE" ? "" : k}
        {NAME.has(k) && !on && <i className="absolute bottom-1 h-px w-2 bg-[#ffb547]/60" />}
      </span>
    );
  };
  return (
    <div aria-hidden className="rounded-[18px] border border-white/5 bg-gradient-to-b from-[#16181d] to-[#0f1115] p-[min(1.4svh,0.8rem)] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.05)]">
      <div className="space-y-[min(0.8svh,0.4rem)]">
        {ROWS.map((r, i) => (
          <div key={r} className="flex gap-[min(0.8svh,0.4rem)]" style={{ paddingLeft: `${i * 2.2}%`, paddingRight: `${(3 - i) * 1.2}%` }}>
            {i === 0 && <Key k="ESC" w={1.3} />}
            {r.split("").map((k) => <Key key={k} k={k} />)}
            {i === 0 && <Key k="⌫" w={1.6} />}
            {i === 2 && <Key k="↵" w={1.8} />}
          </div>
        ))}
        <div className="flex gap-[min(0.8svh,0.4rem)] px-[14%]"><Key k="⌘" w={1.2} /><Key k="SPACE" w={7} /><Key k="⌥" w={1.2} /></div>
      </div>
    </div>
  );
}
