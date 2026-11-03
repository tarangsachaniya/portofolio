"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, person } from "@/lib/content";
import { useTheme } from "../shell/ThemeProvider";
import { useClock } from "../shell/useClock";

export default function PaperChrome() {
  const path = usePathname();
  const { openPalette } = useTheme();
  const time = useClock();
  return (
    <header data-chrome="paper" className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-sm">
      <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-mono text-sm font-semibold">
          tarang.dev<span className="animate-blink text-accent" aria-hidden>_</span>
        </Link>
        <ul className="hidden items-center gap-6 lg:flex">
          {nav.slice(1).map((n, i) => (
            <li key={n.href}>
              <Link href={n.href} aria-current={path === n.href ? "page" : undefined} className="group text-sm font-medium text-fg-2 hover:text-fg aria-[current=page]:text-fg">
                <span className="mr-1 font-mono text-[0.68rem] text-fg-3 group-hover:text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="ulink">{n.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <span className="hidden t-meta text-fg-3 xl:inline">AMD <span className="tabular-nums text-fg-2">{time}</span> IST</span>
          <button onClick={() => openPalette("worlds")} className="t-meta rounded-full border border-line-2 px-3 py-1.5 text-fg-2 hover:border-fg hover:text-fg">
            Worlds <span aria-hidden>◐</span>
          </button>
          <button onClick={() => openPalette("all")} className="t-meta rounded-full bg-fg px-3 py-1.5 text-bg" aria-label={`Open command menu (${person.first}'s site)`}>
            <span className="lg:hidden">Menu</span><span className="hidden lg:inline">⌘K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
