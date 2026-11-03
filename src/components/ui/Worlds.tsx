"use client";

import { THEMES } from "@/lib/themes";
import { useTheme } from "../shell/ThemeProvider";

/** Inline world switcher used on the home page: the site's party trick, explained. */
export default function Worlds() {
  const { theme, setTheme } = useTheme();
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {THEMES.map((t) => (
        <li key={t.id}>
          <button
            onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTheme(t.id, { x: r.left + r.width / 2, y: r.top + r.height / 2 }); }}
            aria-pressed={theme === t.id}
            className="card group flex w-full flex-col items-start gap-6 p-4 text-left aria-pressed:border-accent"
          >
            <span className="font-mono text-2xl text-accent-ink transition-transform duration-300 group-hover:-translate-y-1">{t.glyph}</span>
            <span>
              <span className="block font-semibold">{t.label}</span>
              <span className="block text-sm text-fg-3">{t.hint} · Alt+{t.key}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
