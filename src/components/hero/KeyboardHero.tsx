"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { playKey } from "../shell/sound";

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const NAME = new Set("TARANG".split(""));
const SECRETS: Record<string, { href: string; msg: string }> = {
  HIRE: { href: "/contact/", msg: "→ opening contact" },
  WORK: { href: "/work/", msg: "→ opening work" },
  STORY: { href: "/about/", msg: "→ opening story" },
  NOW: { href: "/now/", msg: "→ what I'm doing now" },
};

/**
 * A CSS-3D mechanical keyboard. Type on your real keyboard (or tap the keys):
 * keys travel, the OLED strip echoes you, and a few words are shortcuts.
 * Decorative for assistive tech; the same links exist in the page and chrome.
 */
export default function KeyboardHero() {
  const router = useRouter();
  const [down, setDown] = useState<Set<string>>(new Set());
  const [buf, setBuf] = useState("");
  const [msg, setMsg] = useState("type TARANG · or HIRE");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement>(null);
  const demo = useRef(true);

  const press = (k: string) => {
    demo.current = false;
    playKey(k === " " ? "space" : "key");
    setDown((s) => new Set(s).add(k));
    setTimeout(() => setDown((s) => { const n = new Set(s); n.delete(k); return n; }), 140);
    setBuf((b) => {
      const next = (b + k).slice(-14);
      const hit = Object.keys(SECRETS).find((w) => next.endsWith(w));
      if (hit) { setMsg(SECRETS[hit].msg); setTimeout(() => router.push(SECRETS[hit].href), 450); }
      else if (next.endsWith("TARANG")) setMsg("✦ hello, that's me");
      return next;
    });
  };

  // physical keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement)?.closest?.("input, textarea")) return;
      const k = e.key.length === 1 ? e.key.toUpperCase() : e.key === " " ? " " : "";
      if (/^[A-Z ]$/.test(k)) press(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // idle demo: types TARANG once
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = "TARANG";
    const ids = word.split("").map((c, i) =>
      window.setTimeout(() => {
        if (!demo.current) return;
        setDown(new Set([c]));
        setBuf((b) => (b + c).slice(-14));
        setTimeout(() => setDown(new Set()), 130);
      }, 900 + i * 210),
    );
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="relative mx-auto w-full max-w-[52rem] select-none [perspective:1400px]"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = wrap.current!.getBoundingClientRect();
        setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 10 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="rounded-[22px] border border-white/5 bg-[linear-gradient(180deg,#30343c,#1f2227)] p-3 shadow-[0_50px_80px_-40px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.07)] transition-transform duration-300 ease-out sm:p-5"
        style={{ transform: `rotateX(${28 + tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: "preserve-3d" }}
      >
        {/* OLED strip */}
        <div className="mb-4 flex items-center justify-between rounded-md bg-[#0a0b0d] px-3 py-2 font-mono text-[0.72rem] shadow-[inset_0_1px_4px_rgb(0_0_0/0.8)] sm:text-sm">
          <span className="text-[#5ac8b8]">{buf || " "}<span className="animate-blink">▌</span></span>
          <span className="hidden text-[#ff9a6b] sm:inline">{msg}</span>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          {ROWS.map((row, ri) => (
            <div key={row} className="flex justify-center gap-1.5 sm:gap-2" style={{ paddingLeft: `${ri * 1.1}rem` }}>
              {row.split("").map((k) => (
                <button
                  key={k}
                  tabIndex={-1}
                  onClick={() => press(k)}
                  className={`keycap h-9 min-w-0 flex-1 basis-0 items-center justify-center p-0 text-[0.75rem] font-semibold sm:h-12 sm:text-sm ${NAME.has(k) ? "alt" : ""} ${k === "H" ? "hot" : ""} ${down.has(k) ? "down" : ""}`}
                 
                >
                  {k}
                </button>
              ))}
            </div>
          ))}
          <div className="flex justify-center gap-2 pt-0.5">
            <button tabIndex={-1} onClick={() => press(" ")} className={`keycap h-9 w-1/2 items-center justify-center sm:h-11 ${down.has(" ") ? "down" : ""}`}>space</button>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center font-mono text-xs text-fg-3">try typing <b className="text-fg-2">hire</b>, <b className="text-fg-2">work</b> or <b className="text-fg-2">story</b> on your keyboard</p>
    </div>
  );
}
