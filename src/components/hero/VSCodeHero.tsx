"use client";

import { useTyping } from "./useReveal";

const CODE = `// tarang.ts: the short version
import { learn, make, ship } from "./life";

export const tarang = {
  role: "full-stack developer",
  base: "Ahmedabad, India",
  lean: "backend",
  stack: ["Bun", "Hono", "Next.js", "PostgreSQL", "Laravel"],
  building: "Priinteve Innovations",
};

while (alive) ship(make(learn()));`;

const KW = /\b(import|from|export|const|while)\b/;

function paint(line: string) {
  if (line.trim().startsWith("//")) return <span style={{ color: "var(--syn-com)" }}>{line}</span>;
  const parts = line.split(/("[^"]*"?|\b(?:import|from|export|const|while)\b|\b[a-zA-Z_]+(?=\()|\b[a-zA-Z_]+(?=:))/g);
  return parts.map((p, i) => {
    if (!p) return null;
    if (p.startsWith('"')) return <span key={i} style={{ color: "var(--syn-str)" }}>{p}</span>;
    if (KW.test(p)) return <span key={i} style={{ color: "var(--syn-key)" }}>{p}</span>;
    if (/^[a-zA-Z_]+$/.test(p) && line.includes(p + "(")) return <span key={i} style={{ color: "var(--syn-fn)" }}>{p}</span>;
    if (/^[a-zA-Z_]+$/.test(p) && line.includes(p + ":")) return <span key={i} style={{ color: "var(--syn-var)" }}>{p}</span>;
    return <span key={i}>{p}</span>;
  });
}

export default function VSCodeHero() {
  const n = useTyping(CODE.length, 14, 250);
  const shown = CODE.slice(0, n);
  const lines = shown.split("\n");
  const done = n >= CODE.length;
  return (
    <div aria-hidden className="overflow-hidden rounded-md border border-[#2b2b2b] bg-[#1f1f1f] font-mono text-[0.82rem] leading-[1.7] shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] md:text-[0.9rem]">
      <div className="flex h-8 items-center gap-2 border-b border-[#2b2b2b] bg-[#181818] px-3 text-[0.75rem] text-[#cccccc]">
        <span style={{ color: "#4ec9b0" }}>TS</span> tarang.ts <span className="ml-auto text-[#8f8f8f]">● unsaved</span>
      </div>
      <div className="flex">
        <ol className="select-none py-3 pl-4 pr-4 text-right text-[#6e7681]">
          {CODE.split("\n").map((_, i) => <li key={i}>{i + 1}</li>)}
        </ol>
        <pre className="min-h-[19rem] flex-1 overflow-x-auto py-3 pr-4 text-[#d4d4d4]">
          {lines.map((l, i) => (
            <div key={i}>
              {paint(l)}
              {i === lines.length - 1 && !done && <span className="animate-blink border-l-2 border-[#aeafad]">&#8203;</span>}
            </div>
          ))}
        </pre>
      </div>
      <div className="border-t border-[#2b2b2b] bg-[#181818] px-4 py-2 text-[0.78rem]">
        <div className="mb-1 flex gap-4 text-[0.68rem] uppercase tracking-wider text-[#8f8f8f]"><span className="border-b border-[#0078d4] text-[#e4e4e4]">Terminal</span><span>Problems</span><span>Output</span></div>
        <p className="text-[#cccccc]"><span className="text-[#89e051]">➜</span> <span className="text-[#4daafc]">~</span> bun run tarang.ts</p>
        <p className={`transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
          <span className="text-[#89e051]">✓</span> 5 products · 6 client &amp; open-source builds · learning since 2021
        </p>
      </div>
    </div>
  );
}
