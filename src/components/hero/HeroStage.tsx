"use client";

import dynamic from "next/dynamic";
import { useTheme } from "../shell/ThemeProvider";

// Each world's hero is its own chunk: you only download the one you're in.
const VSCodeHero = dynamic(() => import("./VSCodeHero"), { ssr: false });
const TerminalHero = dynamic(() => import("./TerminalHero"), { ssr: false });
const KeyboardHero = dynamic(() => import("./KeyboardHero"), { ssr: false });
const ChatHero = dynamic(() => import("./ChatHero"), { ssr: false });
const GlyphField = dynamic(() => import("./GlyphField"), { ssr: false });

export function HeroBackdrop() {
  const { theme } = useTheme();
  return theme === "paper" ? <GlyphField /> : null;
}

export default function HeroStage() {
  const { theme } = useTheme();
  if (theme === "vscode") return <VSCodeHero />;
  if (theme === "terminal") return <TerminalHero />;
  if (theme === "keyboard") return <KeyboardHero />;
  if (theme === "chat") return <ChatHero />;
  return null;
}
