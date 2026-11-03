"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, person } from "@/lib/content";
import { useTheme } from "../shell/ThemeProvider";
import { useClock } from "../shell/useClock";

/** Desk world chrome: a floating glass dock. The page scrolls under it. */
export default function DeskChrome() {
  const path = usePathname();
  const { openPalette } = useTheme();
  const time = useClock();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const links = nav.slice(1, 7);
  return (
    <header data-chrome="desk" className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border px-2 pl-4 transition-all duration-500 ${
          scrolled ? "border-white/10 bg-[#0b0d11]/70 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl" : "border-white/[0.06] bg-white/[0.03] backdrop-blur-md"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5 font-mono text-sm font-semibold">
          <span aria-hidden className="relative grid size-7 place-items-center rounded-full bg-gradient-to-br from-[#ffb547] to-[#9b8cff] text-[0.8rem] text-[#14100a] shadow-[0_0_20px_-2px_rgb(255_181_71/0.6)] transition-transform group-hover:rotate-180 duration-700">◑</span>
          <span>tarang<span className="text-fg-3">.dev</span></span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((n) => {
            const on = n.href === "/" ? path === "/" : path?.startsWith(n.href);
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={on ? "page" : undefined}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium text-fg-2 transition-colors hover:bg-white/[0.06] hover:text-fg aria-[current=page]:bg-white/[0.08] aria-[current=page]:text-fg"
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <span className="hidden items-center gap-2 px-2 font-mono text-[0.72rem] text-fg-3 xl:flex">
            <span className="live-dot" aria-hidden />
            AMD <span className="tabular-nums text-fg-2">{time}</span>
          </span>
          <button onClick={() => openPalette("worlds")} className="hidden rounded-full border border-white/10 px-3 py-2 font-mono text-[0.72rem] text-fg-2 transition-colors hover:border-white/30 hover:text-fg sm:inline-flex">
            Worlds ◐
          </button>
          <Link href="/contact/" className="hidden rounded-full bg-[#ffb547] px-4 py-2 text-sm font-semibold text-[#14100a] shadow-[0_0_30px_-8px_rgb(255_181_71/0.8)] transition-transform hover:-translate-y-px md:inline-flex">
            Hire me
          </Link>
          <button onClick={() => openPalette("all")} className="rounded-full border border-white/10 px-3 py-2 font-mono text-[0.72rem] text-fg-2 hover:text-fg" aria-label={`Open command menu (${person.first}'s site)`}>
            ⌘K
          </button>
          <button onClick={() => setOpen((o) => !o)} className="grid size-9 place-items-center rounded-full border border-white/10 lg:hidden" aria-expanded={open} aria-controls="desk-menu" aria-label="Menu">
            <span aria-hidden className="relative block h-2.5 w-4">
              <i className={`absolute left-0 h-px w-4 bg-fg transition-all ${open ? "top-1 rotate-45" : "top-0"}`} />
              <i className={`absolute left-0 h-px w-4 bg-fg transition-all ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="desk-menu" className="pointer-events-auto mx-auto mt-2 max-w-5xl rounded-3xl border border-white/10 bg-[#0b0d11]/90 p-3 backdrop-blur-xl lg:hidden">
          <ul className="grid grid-cols-2 gap-1.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block rounded-2xl bg-white/[0.04] px-4 py-3 text-sm font-medium" aria-current={path === n.href ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={() => openPalette("worlds")} className="mt-2 w-full rounded-2xl border border-white/10 py-3 font-mono text-xs text-fg-2">Switch world ◐</button>
        </div>
      )}
    </header>
  );
}
