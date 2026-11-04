"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { playKey } from "./sound";

interface Ctx {
  sound: boolean;
  toggleSound: () => void;
  palette: boolean;
  openPalette: () => void;
  closePalette: () => void;
}

const ShellCtx = createContext<Ctx | null>(null);

export const useShell = () => {
  const c = useContext(ShellCtx);
  if (!c) throw new Error("useShell outside ShellProvider");
  return c;
};

/** Site-wide UI state: the ⌘K command palette and opt-in keyboard sounds. */
export default function ShellProvider({ children }: { children: ReactNode }) {
  const [sound, setSound] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => setSound(document.documentElement.dataset.sound === "on"), []);

  const toggleSound = useCallback(() => {
    const next = document.documentElement.dataset.sound !== "on";
    document.documentElement.dataset.sound = next ? "on" : "off";
    try { localStorage.setItem("tarang-sound", next ? "on" : "off"); } catch {}
    setSound(next);
    if (next) playKey("enter");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ShellCtx.Provider value={{ sound, toggleSound, palette, openPalette: () => setPalette(true), closePalette: () => setPalette(false) }}>
      {children}
    </ShellCtx.Provider>
  );
}

/** Runs before first paint: restores the sound preference. */
export const soundBootScript = `try{document.documentElement.dataset.sound=localStorage.getItem('tarang-sound')==='on'?'on':'off'}catch(e){}`;
