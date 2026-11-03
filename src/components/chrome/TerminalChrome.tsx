"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { nav, person } from "@/lib/content";
import { THEME_IDS, type ThemeId } from "@/lib/themes";
import { resolveIntent, routeInfo } from "@/lib/route";
import { useTheme } from "../shell/ThemeProvider";
import { playKey } from "../shell/sound";

const HELP = "commands: ls · cd <page> · cat story · man services · ./contact · theme <paper|vscode|terminal|keyboard|chat> · whoami · clear";

export default function TerminalChrome() {
  const path = usePathname();
  const router = useRouter();
  const { setTheme, openPalette } = useTheme();
  const [val, setVal] = useState("");
  const [out, setOut] = useState<string>("type `help`, or click a command below");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const info = routeInfo(path);
  const cwd = info.dir ? `~/${info.dir}` : "~";

  const exec = (raw: string, origin?: { x: number; y: number }) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHist((h) => [cmd, ...h].slice(0, 30));
    setHi(-1);
    setVal("");
    const lc = cmd.toLowerCase();
    if (lc === "help" || lc === "?") return setOut(HELP);
    if (lc === "clear") return setOut("");
    if (lc === "whoami") return setOut(`${person.name.toLowerCase().replace(" ", "_")} — ${person.oneLiner}`);
    if (lc === "sudo hire tarang" || lc.startsWith("sudo")) { setOut("[sudo] permission granted. opening ./contact.sh…"); return router.push("/contact/"); }
    if (lc === "exit") { setOut("logout. switching to paper…"); return setTheme("paper", origin); }
    const r = resolveIntent(lc.replace(/^(cd|cat|open|less|man|tail)\s+/, ""));
    if (r.theme) {
      if ((THEME_IDS as string[]).includes(r.theme)) { setOut(`switching world → ${r.theme}`); return setTheme(r.theme as ThemeId, origin); }
      return setOut(`theme: unknown world '${r.theme}'. try: ${THEME_IDS.join(" ")}`);
    }
    if (r.href) { setOut(`→ ${r.href}`); return router.push(r.href); }
    setOut(`${cmd.split(" ")[0]}: command not found. ${r.reply ?? HELP}`);
  };

  return (
    <div data-chrome="terminal">
      <div className="crt" aria-hidden />
      <header className="fixed inset-x-0 top-0 z-50 flex h-[3.25rem] items-center justify-between border-b border-line bg-bg px-4 font-mono text-[0.8rem] text-fg-2">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1.5"><i className="size-2.5 rounded-full border border-fg-3" /><i className="size-2.5 rounded-full border border-fg-3" /><i className="size-2.5 rounded-full bg-fg-3" /></span>
          <Link href="/" className="text-fg">tarang@ahmedabad: <span className="text-accent-ink">{cwd}</span></Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">tty1 · 80×24 · bash</span>
          <button onClick={() => openPalette("worlds")} className="border border-line-2 px-2 py-0.5 hover:bg-fg hover:text-bg">[ worlds ]</button>
        </div>
      </header>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/95 font-mono text-[0.85rem]">
        <div className="wrap py-2">
          <p role="log" aria-live="polite" className="min-h-[1.2em] truncate text-[0.78rem] text-fg-3">{out}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              playKey("enter");
              const r = inputRef.current?.getBoundingClientRect();
              exec(val, r ? { x: r.left + 40, y: r.top } : undefined);
            }}
            className="flex items-center gap-2"
          >
            <label htmlFor="term-in" className="shrink-0 text-fg">tarang@ahmedabad:<span className="text-accent-ink">{cwd}</span>$</label>
            <input
              id="term-in"
              ref={inputRef}
              value={val}
              onChange={(e) => { setVal(e.target.value); playKey(); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(hist.length - 1, hi + 1); if (hist[n]) { setHi(n); setVal(hist[n]); } }
                if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; setHi(n); setVal(n >= 0 ? hist[n] : ""); }
                if (e.key === "Tab") {
                  e.preventDefault();
                  const m = nav.map((x) => x.cmd).find((c) => c.startsWith(val) && val);
                  if (m) setVal(m);
                }
              }}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-fg caret-transparent outline-none"
              aria-describedby="term-help"
            />
            <span aria-hidden className="-ml-2 animate-blink text-fg">█</span>
          </form>
          <ul id="term-help" aria-label="Commands" className="mt-1.5 flex gap-2 overflow-x-auto pb-0.5 text-[0.75rem]">
            {nav.map((n) => (
              <li key={n.href} className="shrink-0">
                <button
                  type="button"
                  onClick={(e) => { playKey(); const r = e.currentTarget.getBoundingClientRect(); setOut(`$ ${n.cmd}`); router.push(n.href); void r; }}
                  aria-current={path === n.href ? "page" : undefined}
                  className="border border-line px-2 py-0.5 text-fg-2 hover:border-fg hover:text-fg aria-[current=page]:bg-fg aria-[current=page]:text-bg"
                >
                  {n.cmd}
                </button>
              </li>
            ))}
            <li className="shrink-0"><button type="button" onClick={() => setOut(HELP)} className="border border-line px-2 py-0.5 text-accent-ink hover:border-accent">help</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
