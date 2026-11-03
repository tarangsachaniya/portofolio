"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { THEMES, type ThemeId } from "@/lib/themes";
import { nav, person, work } from "@/lib/content";
import { useTheme } from "./ThemeProvider";
import { playKey } from "./sound";

type Item = {
  id: string;
  group: "Worlds" | "Go to" | "Projects" | "Actions";
  label: string;
  hint?: string;
  run: (origin: { x: number; y: number }) => void;
};

/** Miniature of each world, drawn in CSS — doubles as the preview in the picker. */
function Mini({ id }: { id: ThemeId }) {
  const base = "relative h-full w-full overflow-hidden rounded-md";
  if (id === "desk")
    return (
      <div className={base} style={{ background: "linear-gradient(180deg,#1a1f3a,#0b0d11 70%)" }}>
        <div className="absolute right-3 top-2 size-3 rounded-full" style={{ background: "#ffe3a3", boxShadow: "0 0 12px #ffb547" }} />
        <div className="absolute left-1/2 top-[22%] h-[46%] w-[62%] -translate-x-1/2 rounded-[4px] border border-white/15 bg-[#0e1116] p-1 font-mono text-[0.42rem] leading-tight text-[#5ee0c1]">
          <div>$ git log</div><div className="text-white/50">boot→ship</div><div className="text-[#ffb547]">✓ deploy</div>
        </div>
        <div className="absolute bottom-2 left-1/2 h-2 w-[70%] -translate-x-1/2 rounded-sm bg-white/10" />
        <div className="absolute bottom-1 left-2 size-6 rounded-full" style={{ background: "radial-gradient(#ffb54766,transparent 70%)" }} />
      </div>
    );
  if (id === "paper")
    return (
      <div className={base} style={{ background: "#f3f0e8", color: "#121211" }}>
        <div className="absolute left-3 top-3 h-1 w-10 bg-black/20" />
        <div className="absolute left-3 top-7 text-[1.6rem] font-extrabold leading-[0.85] tracking-tighter">Tarang</div>
        <div className="absolute right-3 top-14 text-[1.6rem] font-extrabold leading-[0.85] tracking-tighter">Sach.</div>
        <div className="absolute bottom-3 left-3 h-1.5 w-14 rounded-full" style={{ background: "#ff5b1f" }} />
      </div>
    );
  if (id === "vscode")
    return (
      <div className={base + " flex"} style={{ background: "#1f1f1f" }}>
        <div className="w-3" style={{ background: "#181818" }} />
        <div className="w-10 space-y-1 p-1.5" style={{ background: "#181818" }}>
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-1 rounded bg-white/20" style={{ width: `${60 + i * 9}%` }} />)}
        </div>
        <div className="flex-1 space-y-1.5 p-2 font-mono text-[0.5rem]">
          <div style={{ color: "#c586c0" }}>const <span style={{ color: "#9cdcfe" }}>tarang</span> =</div>
          <div className="pl-2" style={{ color: "#ce9178" }}>"full-stack"</div>
          <div className="pl-2" style={{ color: "#4ec9b0" }}>build()</div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1.5" style={{ background: "#0078d4" }} />
      </div>
    );
  if (id === "terminal")
    return (
      <div className={base + " p-2 font-mono text-[0.5rem] leading-relaxed"} style={{ background: "#040704", color: "#a8ffa4", textShadow: "0 0 4px #7ee07a" }}>
        <div>$ whoami</div>
        <div style={{ color: "#57ad54" }}>tarang — full-stack</div>
        <div>$ ls ./work</div>
        <div style={{ color: "#ffc23d" }}>priinteve/ cards/ menu/</div>
        <div>$ <span className="animate-blink">█</span></div>
        <div className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(to bottom, rgb(0 0 0 / .3) 0 1px, transparent 1px 3px)" }} />
      </div>
    );
  if (id === "keyboard")
    return (
      <div className={base + " grid place-items-center"} style={{ background: "#1b1d21" }}>
        <div className="grid grid-cols-5 gap-1 [transform:perspective(200px)_rotateX(28deg)]">
          {"TARANG★".split("").concat(["", "", ""]).map((c, i) => (
            <span
              key={i}
              className="grid h-5 w-5 place-items-center rounded-[4px] text-[0.5rem] font-bold"
              style={{
                background: i === 6 ? "#ff7a3d" : i % 4 === 3 ? "#5ac8b8" : "#e9e4d8",
                color: "#23211d",
                boxShadow: `0 2px 0 ${i === 6 ? "#b44c1c" : i % 4 === 3 ? "#3a8c80" : "#b9b2a2"}`,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    );
  return (
    <div className={base + " space-y-1.5 p-2"} style={{ background: "#f6f3ec" }}>
      <div className="ml-auto w-2/3 rounded-lg px-1.5 py-1 text-[0.5rem]" style={{ background: "#e2ddd0", color: "#1f1e1b" }}>Who is Tarang?</div>
      <div className="font-serif text-[0.62rem] italic leading-tight" style={{ color: "#1f1e1b" }}>A full-stack developer who learns by making things…</div>
      <div className="absolute inset-x-2 bottom-2 h-3 rounded-full border bg-white" style={{ borderColor: "rgb(31 30 27 / .2)" }} />
    </div>
  );
}

export default function CommandPalette() {
  const { palette, closePalette, setTheme, theme, sound, toggleSound } = useTheme();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...THEMES.map((t) => ({
        id: `theme-${t.id}`,
        group: "Worlds" as const,
        label: `Switch to ${t.label}`,
        hint: t.id === theme ? "current" : `Alt+${t.key}`,
        run: (o: { x: number; y: number }) => setTheme(t.id, o),
      })),
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
  }, [router, setTheme, theme, sound, toggleSound]);

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

  const worlds = palette === "worlds";

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-[2px]" onMouseDown={(e) => e.target === e.currentTarget && closePalette()}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label={worlds ? "Choose a world" : "Command palette"}
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#161616] text-[#e8e8e8] shadow-[0_40px_120px_-20px_rgb(0_0_0/0.7)]"
        onKeyDown={(e) => {
          if (e.key === "Escape") closePalette();
          if (worlds) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(filtered.length - 1, v + 1)); playKey(); }
          if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(0, v - 1)); playKey(); }
          if (e.key === "Enter" && filtered[i]) run(filtered[i], dialog.current?.querySelector(`[data-i="${i}"]`));
          if (e.key === "Tab") e.preventDefault();
        }}
      >
        {worlds ? (
          <div className="p-5">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-white/60">Choose a world</p>
              <button onClick={closePalette} className="font-mono text-xs text-white/60 hover:text-white">esc</button>
            </div>
            <p className="mt-2 text-sm text-white/70">One day at the desk, plus five places a developer lives. Alt+0–5 anywhere.</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {THEMES.map((t, idx) => (
                <li key={t.id}>
                  <button
                    ref={idx === 0 ? (el) => { if (el && palette === "worlds") requestAnimationFrame(() => el.focus()); } : undefined}
                    onClick={(e) => run(items.find((x) => x.id === `theme-${t.id}`)!, e.currentTarget)}
                    className={`group w-full rounded-lg border p-1.5 text-left transition-colors ${t.id === theme ? "border-[#ff7a3d]" : "border-white/10 hover:border-white/40"}`}
                    aria-pressed={t.id === theme}
                  >
                    <div className="aspect-[4/3] transition-transform duration-300 group-hover:scale-[1.03]">
                      <Mini id={t.id} />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between px-0.5">
                      <span className="text-sm font-semibold">{t.label}</span>
                      <span className="font-mono text-[0.65rem] text-white/50">{t.key}</span>
                    </div>
                    <span className="px-0.5 text-[0.72rem] text-white/50">{t.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/60">
              <button onClick={toggleSound} className="font-mono hover:text-white" aria-pressed={sound}>
                sound: {sound ? "on" : "off"}
              </button>
              <span className="font-mono">⌘K for everything</span>
            </div>
          </div>
        ) : (
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
