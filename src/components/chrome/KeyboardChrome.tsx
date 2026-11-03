"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";
import { useTheme } from "../shell/ThemeProvider";
import { playKey } from "../shell/sound";

export default function KeyboardChrome() {
  const path = usePathname();
  const { openPalette, sound, toggleSound } = useTheme();
  return (
    <header data-chrome="keyboard" className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-2 w-[min(100%-1rem,78rem)] rounded-2xl border border-white/5 bg-[linear-gradient(180deg,#2c3037,#202328)] px-3 pb-4 pt-3 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.06)]">
        <nav aria-label="Primary" className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 [scrollbar-width:none]">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => playKey(i === 0 ? "enter" : "key")}
              aria-current={path === n.href ? "page" : undefined}
              className={`keycap shrink-0 flex-col justify-between ${i === 0 ? "alt" : ""} ${n.href === "/contact/" ? "hot min-w-[5.5rem]" : "min-w-[4.2rem]"}`}
            >
              <span className="opacity-60">{n.key}</span>
              <span className="text-[0.72rem] font-semibold">{n.label}</span>
            </Link>
          ))}
          <span className="mx-1 h-8 w-px shrink-0 bg-white/10" aria-hidden />
          <button onClick={() => { playKey("space"); openPalette("worlds"); }} className="keycap alt shrink-0 flex-col justify-between min-w-[4.2rem]">
            <span className="opacity-60">Fn</span><span className="text-[0.72rem] font-semibold">Worlds</span>
          </button>
          <button onClick={toggleSound} aria-pressed={sound} className={`keycap shrink-0 flex-col justify-between min-w-[4.2rem] ${sound ? "down" : ""}`}>
            <span className="opacity-60">{sound ? "♪ on" : "♪ off"}</span><span className="text-[0.72rem] font-semibold">Sound</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
