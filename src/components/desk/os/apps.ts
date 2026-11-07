import type { StepId } from "../timeline";

/** Each stop of the day is an app on the desk's little OS. */
export const APPS: Record<StepId, { name: string; title: string; glyph: string; from: string; to: string }> = {
  boot: { name: "System", title: "tarang-os", glyph: "◑", from: "#ffb547", to: "#9b8cff" },
  plan: { name: "Board", title: "Standup · today", glyph: "▦", from: "#9b8cff", to: "#5b4fd6" },
  commit: { name: "Terminal", title: "~/tarang — git log", glyph: ">_", from: "#2a2e36", to: "#0e1014" },
  build: { name: "Code", title: "work — editor", glyph: "{ }", from: "#3b8eea", to: "#1d5fb3" },
  learn: { name: "Browser", title: "~/learning", glyph: "◎", from: "#f6cf9a", to: "#d9893b" },
  review: { name: "Assistant", title: "Review", glyph: "✦", from: "#ff8a5c", to: "#c2577a" },
  debug: { name: "Debugger", title: "Issues", glyph: "⚑", from: "#ff5f57", to: "#a8322d" },
  deploy: { name: "Deploy", title: "Deployments", glyph: "▲", from: "#5ee0c1", to: "#1f8f74" },
  ship: { name: "Mail", title: "New message", glyph: "✉", from: "#7cc4ff", to: "#3a7bd5" },
};
