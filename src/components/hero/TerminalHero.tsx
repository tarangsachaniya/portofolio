"use client";

import { useTyping } from "./useReveal";

// 5-row bitmap font, just the letters we need.
const F: Record<string, string[]> = {
  T: ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
  A: [" ### ", "#   #", "#####", "#   #", "#   #"],
  R: ["#### ", "#   #", "#### ", "#  # ", "#   #"],
  N: ["#   #", "##  #", "# # #", "#  ##", "#   #"],
  G: [" ####", "#    ", "#  ##", "#   #", " ### "],
};
const banner = [0, 1, 2, 3, 4].map((r) => "TARANG".split("").map((c) => F[c][r].replace(/#/g, "█")).join(" ")).join("\n");

const BOOT = [
  "[  0.000] booting tarang.dev …",
  "[  0.112] mounting /home/tarang/projects",
  "[  0.207] loading modules: node bun hono next postgres laravel",
  "[  0.341] starting priinteve.service … ok",
  "[  0.402] 5 worlds available · type `theme vscode`",
];

export default function TerminalHero() {
  const lines = useTyping(BOOT.length + 3, 160, 150);
  return (
    <div aria-hidden className="font-mono text-[0.78rem] leading-relaxed text-fg-2 md:text-[0.85rem]">
      {BOOT.slice(0, lines).map((l) => <p key={l}>{l}</p>)}
      {lines > BOOT.length && (
        <pre className="my-4 overflow-x-auto text-[0.42rem] leading-[1.05] text-fg sm:text-[0.6rem] md:text-[0.8rem]">{banner}</pre>
      )}
      {lines > BOOT.length + 1 && <p><span className="text-fg">tarang@ahmedabad:~$</span> whoami</p>}
      {lines > BOOT.length + 2 && <p className="text-accent-ink">full-stack developer · backend lean · co-founder @ priinteve</p>}
    </div>
  );
}
