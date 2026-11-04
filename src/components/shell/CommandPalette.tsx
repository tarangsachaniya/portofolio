"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { nav, person, work } from "@/lib/content";
import { useShell } from "./ShellProvider";
import { playKey } from "./sound";

type Item = {
  id: string;
  group: "Go to" | "Projects" | "Actions";
  label: string;
  hint?: string;
  run: (origin: { x: number; y: number }) => void;
};

export default function CommandPalette() {
  const { palette, closePalette, sound, toggleSound } = useShell();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...nav.map((n) => ({ id: `nav-${n.href}`, group: "Go to" as const, label: n.label, hint: n.file, run: go(n.href) })),
      ...work.map((w) => ({ id: `w-${w.slug}`, group: "Projects" as const, label: w.name, hint: w.what, run: go(`/work/${w.slug}/`) })),
      {
        id: "copy-email",
        group: "Actions" as const,
        label: "Copy email address",
        hint: person.email,
        run: () => navigator.clipboard?.writeText(person.email).catch(() => {}),
      },
      { id: "sound", group: "Actions" as const, label: sound ? "Turn sound off" : "Turn sound on", hint: "keyboard clicks", run: () => toggleSound() },
      { id: "resume", group: "Actions" as const, label: "Open plain-text résumé", hint: "/resume.txt", run: () => window.open("/resume.txt", "_self") },
    ];
  }, [router, sound, toggleSound]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => (it.label + " " + (it.hint ?? "") + " " + it.group).toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    if (!palette) return;
    setQ("");
    setI(0);
    const prev = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => input.current?.focus());
    return () => prev?.focus?.();
  }, [palette]);

  if (!palette) return null;

  const run = (it: Item, el?: Element | null) => {
    const r = el?.getBoundingClientRect();
    const o = r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: innerWidth / 2, y: innerHeight / 2 };
    playKey("enter");
    closePalette();
    it.run(o);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-[2px]" onMouseDown={(e) => e.target === e.currentTarget && closePalette()}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#161616] text-[#e8e8e8] shadow-[0_40px_120px_-20px_rgb(0_0_0/0.7)]"
        onKeyDown={(e) => {
          if (e.key === "Escape") closePalette();
          if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(filtered.length - 1, v + 1)); playKey(); }
          if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(0, v - 1)); playKey(); }
          if (e.key === "Enter" && filtered[i]) run(filtered[i], dialog.current?.querySelector(`[data-i="${i}"]`));
          if (e.key === "Tab") e.preventDefault();
        }}
      >
        {(
          <>
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <span className="font-mono text-sm text-white/50" aria-hidden>{">"}</span>
              <label htmlFor="cmdk" className="sr-only">Search pages, projects, worlds and actions</label>
              <input
                id="cmdk"
                ref={input}
                autoFocus
                value={q}
                onChange={(e) => { setQ(e.target.value); setI(0); playKey(); }}
                placeholder="Search pages, projects, worlds…"
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-white/40"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={filtered[i] ? `cmdk-${filtered[i].id}` : undefined}
                autoComplete="off"
              />
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[0.65rem] text-white/50">esc</kbd>
            </div>
            <ul id="cmdk-list" role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-white/50">No match. Try “work”, “terminal” or “hire”.</li>}
              {filtered.map((it, idx) => (
                <li key={it.id}>
                  {(idx === 0 || filtered[idx - 1].group !== it.group) && (
                    <p className="px-3 pb-1 pt-3 font-mono text-[0.65rem] uppercase tracking-widest text-white/40">{it.group}</p>
                  )}
                  <div
                    id={`cmdk-${it.id}`}
                    data-i={idx}
                    role="option"
                    aria-selected={idx === i}
                    onMouseEnter={() => setI(idx)}
                    onClick={(e) => run(it, e.currentTarget)}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2.5 text-sm ${idx === i ? "bg-white/10" : ""}`}
                  >
                    <span>{it.label}</span>
                    {it.hint && <span className="truncate font-mono text-[0.7rem] text-white/45">{it.hint}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
