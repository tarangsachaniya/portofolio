"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, work, notes } from "@/lib/content";
import { routeInfo } from "@/lib/route";
import { useTheme } from "../shell/ThemeProvider";
import { useClock } from "../shell/useClock";

const ext = (f: string) => (f.endsWith(".md") ? "md" : f.endsWith(".json") ? "json" : f.endsWith(".sh") ? "sh" : f.endsWith(".log") ? "log" : "tsx");
const COLORS: Record<string, string> = { md: "#519aba", json: "#cbcb41", sh: "#89e051", log: "#8f8f8f", tsx: "#4ec9b0" };

function FileIcon({ name }: { name: string }) {
  const e = ext(name);
  return (
    <span aria-hidden className="inline-block w-5 shrink-0 text-center font-mono text-[0.6rem] font-bold" style={{ color: COLORS[e] }}>
      {e === "md" ? "M↓" : e === "json" ? "{}" : e === "sh" ? "$" : e === "log" ? "≡" : "⚛"}
    </span>
  );
}

function Row({ href, name, depth = 0, active }: { href: string; name: string; depth?: number; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex h-[22px] items-center gap-1 pr-2 text-[0.8rem] ${active ? "bg-[#37373d] text-white outline outline-1 -outline-offset-1 outline-[#0078d4]" : "text-[#cccccc] hover:bg-[#2a2d2e]"}`}
      style={{ paddingLeft: 12 + depth * 12 }}
    >
      <FileIcon name={name} />
      <span className="truncate">{name}</span>
    </Link>
  );
}

function Folder({ name, depth = 0, children, open: o = true }: { name: string; depth?: number; children: React.ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(o);
  return (
    <div>
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex h-[22px] w-full items-center gap-1 text-left text-[0.8rem] text-[#cccccc] hover:bg-[#2a2d2e]" style={{ paddingLeft: 8 + depth * 12 }}>
        <span aria-hidden className={`inline-block w-4 text-center text-[0.65rem] transition-transform ${open ? "rotate-90" : ""}`}>›</span>
        <span>{name}</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

const Ico = ({ d, label }: { d: string; label: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <title>{label}</title>
    <path d={d} />
  </svg>
);

export default function VSCodeChrome() {
  const path = usePathname();
  const info = routeInfo(path);
  const { openPalette } = useTheme();
  const time = useClock();
  const p = path.endsWith("/") ? path : path + "/";

  const acts = [
    { label: "Explorer", href: "/", d: "M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Zm0 0v5h5M9 13h6M9 17h6" },
    { label: "Search (⌘K)", action: () => openPalette("all"), d: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4" },
    { label: "Source control: story", href: "/about/", d: "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12-12a9 9 0 0 1-9 9" },
    { label: "Run: work", href: "/work/", d: "M7 4v16l13-8L7 4Z" },
    { label: "Extensions: uses", href: "/uses/", d: "M4 4h7v7H4zM13 13h7v7h-7zM4 13h7v7H4zM15 3l5 5-5 5-5-5z" },
  ];

  return (
    <div data-chrome="vscode" className="text-[#cccccc]">
      {/* title bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-[35px] items-center justify-between border-b border-[#2b2b2b] bg-[#181818] px-3 text-[0.78rem]">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1.5"><i className="size-3 rounded-full bg-[#ff5f57]" /><i className="size-3 rounded-full bg-[#febc2e]" /><i className="size-3 rounded-full bg-[#28c840]" /></span>
          <span className="hidden gap-3 text-[#9d9d9d] md:flex" aria-hidden>{["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"].map((m) => <span key={m}>{m}</span>)}</span>
        </div>
        <button onClick={() => openPalette("all")} className="flex h-[24px] w-[min(34rem,50vw)] items-center justify-center gap-2 rounded-md border border-[#3c3c3c] bg-[#222] text-[#9d9d9d] hover:border-[#555]">
          <span aria-hidden>⌕</span> tarang-sachaniya <kbd className="ml-2 hidden font-mono text-[0.68rem] sm:inline">⌘K</kbd>
        </button>
        <span className="hidden w-24 md:block" />
      </div>

      {/* activity bar */}
      <nav aria-label="Activity bar" className="fixed bottom-[22px] left-0 top-[35px] z-40 hidden w-12 flex-col items-center justify-between border-r border-[#2b2b2b] bg-[#181818] py-1 lg:flex">
        <ul className="flex flex-col">
          {acts.map((a) => {
            const active = a.href && (a.href === "/" ? false : p.startsWith(a.href));
            const cls = `relative grid h-12 w-12 place-items-center ${active ? "text-white before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-[#0078d4]" : "text-[#868686] hover:text-white"}`;
            return (
              <li key={a.label}>
                {a.href ? (
                  <Link href={a.href} className={cls} aria-label={a.label} title={a.label}><Ico d={a.d} label={a.label} /></Link>
                ) : (
                  <button onClick={a.action} className={cls} aria-label={a.label} title={a.label}><Ico d={a.d} label={a.label} /></button>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col">
          <Link href="/contact/" className="grid h-12 w-12 place-items-center text-[#868686] hover:text-white" aria-label="Account: contact" title="Contact"><Ico label="Contact" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" /></Link>
          <button onClick={() => openPalette("worlds")} className="grid h-12 w-12 place-items-center text-[#868686] hover:text-white" aria-label="Manage: switch world" title="Switch world"><Ico label="Settings" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z" /></button>
        </div>
      </nav>

      {/* explorer */}
      <aside aria-label="Explorer" className="fixed bottom-[22px] left-12 top-[35px] z-40 hidden w-[260px] overflow-y-auto border-r border-[#2b2b2b] bg-[#181818] lg:block">
        <p className="flex h-[35px] items-center px-5 text-[0.7rem] uppercase tracking-wider text-[#bbbbbb]">Explorer</p>
        <Folder name="TARANG-SACHANIYA">
          {nav.map((n) =>
            n.file === "work/" ? (
              <Folder key={n.href} name="work" depth={1}>
                <Row href="/work/" name="index.tsx" depth={2} active={p === "/work/"} />
                {work.map((w) => <Row key={w.slug} href={`/work/${w.slug}/`} name={`${w.slug}.tsx`} depth={2} active={p === `/work/${w.slug}/`} />)}
              </Folder>
            ) : n.file === "notes/" ? (
              <Folder key={n.href} name="notes" depth={1}>
                <Row href="/notes/" name="index.md" depth={2} active={p === "/notes/"} />
                {notes.map((x) => <Row key={x.slug} href={`/notes/${x.slug}/`} name={`${x.slug}.md`} depth={2} active={p === `/notes/${x.slug}/`} />)}
              </Folder>
            ) : (
              <Row key={n.href} href={n.href} name={n.file} depth={1} active={p === n.href} />
            ),
          )}
        </Folder>
        <div className="mt-4 border-t border-[#2b2b2b] px-5 py-3 text-[0.72rem] leading-relaxed text-[#9d9d9d]">
          <p className="uppercase tracking-wider text-[#bbbbbb]">Outline</p>
          <p className="mt-1">Tip: <kbd className="font-mono">⌘K</kbd> searches everything. <kbd className="font-mono">Alt+0–5</kbd> switches worlds.</p>
        </div>
      </aside>

      {/* tabs + breadcrumbs */}
      <div className="fixed left-0 right-0 top-[35px] z-30 bg-[#181818] lg:left-[308px]">
        <div className="flex h-[35px] items-stretch overflow-x-auto border-b border-[#2b2b2b]" role="presentation">
          {p !== "/" && (
            <Link href="/" className="flex items-center gap-1.5 border-r border-[#2b2b2b] px-3 text-[0.8rem] italic text-[#9d9d9d] hover:bg-[#1f1f1f]"><FileIcon name="README.md" />README.md</Link>
          )}
          <span className="flex items-center gap-1.5 border-r border-[#2b2b2b] border-t-2 border-t-[#0078d4] bg-[#1f1f1f] px-3 text-[0.8rem] text-white">
            <FileIcon name={info.file} />{info.file}
            {p !== "/" && <Link href="/" className="ml-2 text-[#9d9d9d] hover:text-white" aria-label="Close tab">×</Link>}
          </span>
        </div>
        <p className="flex h-[22px] items-center gap-1 border-b border-[#2b2b2b] bg-[#1f1f1f] px-4 text-[0.75rem] text-[#a9a9a9]">
          tarang-sachaniya {info.dir && <><span aria-hidden>›</span> {info.dir}</>} <span aria-hidden>›</span> <span className="text-[#cccccc]">{info.file}</span>
        </p>
      </div>

      {/* status bar */}
      <footer className="fixed inset-x-0 bottom-0 z-50 flex h-[22px] items-center justify-between bg-[#0078d4] px-2 text-[0.72rem] text-white">
        <div className="flex items-center gap-3">
          <span>⎇ main*</span>
          <span className="hidden sm:inline">⊗ 0 ⚠ 0</span>
          <Link href="/now/" className="hidden hover:underline sm:inline">◷ building priinteve</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline">AMD {time} IST</span>
          <span className="hidden md:inline">UTF-8</span>
          <span className="hidden md:inline">{"{ }"} TypeScript React</span>
          <button onClick={() => openPalette("worlds")} className="rounded px-1 hover:bg-white/15">World: VS Code ▴</button>
        </div>
      </footer>

      {/* mobile file switcher */}
      <nav aria-label="Files" className="fixed inset-x-0 bottom-[22px] z-40 flex gap-1 overflow-x-auto border-t border-[#2b2b2b] bg-[#181818] px-2 py-2 lg:hidden">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} aria-current={p === n.href ? "page" : undefined} className="flex shrink-0 items-center gap-1 rounded px-2 py-1.5 text-[0.75rem] text-[#cccccc] aria-[current=page]:bg-[#37373d] aria-[current=page]:text-white">
            <FileIcon name={n.file} />{n.file}
          </Link>
        ))}
      </nav>
    </div>
  );
}
