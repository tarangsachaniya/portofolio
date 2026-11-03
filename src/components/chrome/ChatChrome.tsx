"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { nav, person, work } from "@/lib/content";
import { resolveIntent } from "@/lib/route";
import { THEME_IDS, type ThemeId } from "@/lib/themes";
import { useTheme } from "../shell/ThemeProvider";

export function Spark({ className = "" }: { className?: string }) {
  // An original 8-point asterisk mark — not any company's logo.
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {[0, 45, 90, 135].map((r) => (
        <rect key={r} x="10.6" y="2" width="2.8" height="20" rx="1.4" fill="currentColor" transform={`rotate(${r} 12 12)`} />
      ))}
    </svg>
  );
}

export default function ChatChrome() {
  const path = usePathname();
  const router = useRouter();
  const { openPalette, setTheme } = useTheme();
  const [q, setQ] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const p = path.endsWith("/") ? path : path + "/";

  const ask = (text: string) => {
    const r = resolveIntent(text);
    setQ("");
    if (r.theme && (THEME_IDS as string[]).includes(r.theme)) return setTheme(r.theme as ThemeId);
    if (r.href) {
      setThinking(true);
      setReply(null);
      setTimeout(() => { setThinking(false); router.push(r.href!); }, 450);
      return;
    }
    setReply(r.reply ?? null);
  };

  const suggestions = nav.filter((n) => n.href !== p).slice(0, 4);

  return (
    <div data-chrome="chat">
      <aside aria-label="Conversations" className="fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col border-r border-line bg-bg-2 lg:flex">
        <div className="flex items-center justify-between px-4 pb-2 pt-4">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl"><Spark className="size-4 text-accent" />tarang</Link>
          <button onClick={() => openPalette("all")} className="rounded-md px-1.5 py-0.5 font-mono text-[0.7rem] text-fg-3 hover:bg-bg-3">⌘K</button>
        </div>
        <Link href="/" className="mx-3 mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-bg-3"><span aria-hidden className="text-lg leading-none">+</span> New chat</Link>
        <p className="px-6 pb-1 pt-5 text-xs font-medium text-fg-3">Recents</p>
        <ul className="flex-1 space-y-0.5 overflow-y-auto px-3">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} aria-current={p === n.href ? "page" : undefined} className="block truncate rounded-lg px-3 py-2 text-[0.88rem] text-fg-2 hover:bg-bg-3 aria-[current=page]:bg-bg-3 aria-[current=page]:text-fg">
                {n.prompt}
              </Link>
            </li>
          ))}
          <li className="px-3 pb-1 pt-4 text-xs font-medium text-fg-3">Projects</li>
          {work.filter((w) => w.featured).map((w) => (
            <li key={w.slug}>
              <Link href={`/work/${w.slug}/`} aria-current={p === `/work/${w.slug}/` ? "page" : undefined} className="block truncate rounded-lg px-3 py-2 text-[0.88rem] text-fg-2 hover:bg-bg-3 aria-[current=page]:bg-bg-3 aria-[current=page]:text-fg">
                Tell me about {w.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 border-t border-line p-4">
          <span className="grid size-8 place-items-center rounded-full bg-fg font-serif text-sm text-bg">TS</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{person.name}</p>
            <p className="truncate text-xs text-fg-3">Full-stack · Ahmedabad</p>
          </div>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between bg-bg/90 px-4 backdrop-blur-sm lg:left-[272px]">
        <button onClick={() => openPalette("worlds")} className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium hover:bg-bg-2">
          tarang-5 <span className="text-fg-3">· world: chat</span> <span aria-hidden className="text-fg-3">⌄</span>
        </button>
        <button onClick={() => openPalette("all")} className="rounded-lg px-2 py-1 text-sm text-fg-2 hover:bg-bg-2 lg:hidden">Menu</button>
      </header>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-bg via-bg to-transparent pb-4 pt-6 lg:left-[272px]">
        <div className="wrap">
          {(reply || thinking) && (
            <p role="status" className="mb-2 text-sm text-fg-2">{thinking ? <span className="animate-pulse">Thinking…</span> : reply}</p>
          )}
          <ul className="mb-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Suggested questions">
            {suggestions.map((n) => (
              <li key={n.href} className="shrink-0">
                <Link href={n.href} className="block rounded-full border border-line-2 bg-bg px-3 py-1.5 text-[0.8rem] text-fg-2 hover:border-fg hover:text-fg">{n.prompt}</Link>
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="flex items-end gap-2 rounded-2xl border border-line-2 bg-[#fffdf8] p-2 pl-4 shadow-[0_4px_20px_-8px_rgb(0_0_0/0.12)]">
            <label htmlFor="chat-in" className="sr-only">Ask about Tarang</label>
            <input id="chat-in" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything about Tarang…" autoComplete="off" className="h-10 flex-1 bg-transparent text-[0.95rem] outline-none placeholder:text-fg-3" />
            <button type="submit" aria-label="Send" className="grid size-9 place-items-center rounded-xl bg-accent text-accent-fg disabled:opacity-40" disabled={!q.trim()}>↑</button>
          </form>
          <p className="mt-1.5 text-center text-[0.7rem] text-fg-3">Scripted answers from this site's own pages. No live AI, no data collected.</p>
        </div>
      </div>
    </div>
  );
}
