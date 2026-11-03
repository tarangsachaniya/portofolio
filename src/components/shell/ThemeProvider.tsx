"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { THEMES, THEME_IDS, STORAGE_KEY, DEFAULT_THEME, type ThemeId } from "@/lib/themes";
import { playKey } from "./sound";

interface Ctx {
  theme: ThemeId;
  setTheme: (t: ThemeId, origin?: { x: number; y: number }) => void;
  cycle: (dir?: 1 | -1) => void;
  sound: boolean;
  toggleSound: () => void;
  palette: null | "all" | "worlds";
  openPalette: (mode?: "all" | "worlds") => void;
  closePalette: () => void;
}

const ThemeCtx = createContext<Ctx | null>(null);

export const useTheme = () => {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("useTheme outside ThemeProvider");
  return c;
};

function read(): ThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const t = document.documentElement.dataset.theme as ThemeId;
  return THEME_IDS.includes(t) ? t : DEFAULT_THEME;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [sound, setSound] = useState(false);
  const [palette, setPalette] = useState<Ctx["palette"]>(null);

  useEffect(() => {
    setThemeState(read());
    setSound(document.documentElement.dataset.sound === "on");
  }, []);

  const setTheme = useCallback((t: ThemeId, origin?: { x: number; y: number }) => {
    const root = document.documentElement;
    if (root.dataset.theme === t) return;
    const apply = () => {
      root.dataset.theme = t;
      try {
        localStorage.setItem(STORAGE_KEY, t);
      } catch {}
      flushSync(() => setThemeState(t));
    };
    playKey("switch");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vt = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
    if (!vt || reduce) return apply();
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);
    vt.call(document, apply);
  }, []);

  const cycle = useCallback(
    (dir: 1 | -1 = 1) => {
      const i = THEME_IDS.indexOf(read());
      setTheme(THEME_IDS[(i + dir + THEME_IDS.length) % THEME_IDS.length]);
    },
    [setTheme],
  );

  const toggleSound = useCallback(() => {
    const next = document.documentElement.dataset.sound !== "on";
    document.documentElement.dataset.sound = next ? "on" : "off";
    try {
      localStorage.setItem("tarang-sound", next ? "on" : "off");
    } catch {}
    setSound(next);
    if (next) playKey("enter");
  }, []);

  // Global shortcuts: ⌘K / Ctrl+K palette, Alt+1..5 worlds, Alt+T cycle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => (p ? null : "all"));
        return;
      }
      if (typing) return;
      if (e.altKey && /^[1-5]$/.test(e.key)) {
        e.preventDefault();
        setTheme(THEMES[Number(e.key) - 1].id);
      } else if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        cycle(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setTheme, cycle]);

  return (
    <ThemeCtx.Provider
      value={{
        theme,
        setTheme,
        cycle,
        sound,
        toggleSound,
        palette,
        openPalette: (m = "all") => setPalette(m),
        closePalette: () => setPalette(null),
      }}
    >
      {children}
    </ThemeCtx.Provider>
  );
}
