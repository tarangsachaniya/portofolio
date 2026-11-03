"use client";
import { work } from "@/lib/content";

const PROJECTS = work.filter((w) => w.kind === "Product" || w.kind === "Open source");
const C = { key: "#c586c0", str: "#ce9178", fn: "#dcdcaa", type: "#4ec9b0", var: "#9cdcfe", com: "#6a9955", num: "#b5cea8", punc: "#d4d4d4" };
const camel = (s: string) => s.replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase()).replace(/^./, (c) => c.toLowerCase());

/** 12:30: the editor. The open file follows your scroll through the products. */
export default function Build({ t, pick, onPick }: { t: number; pick?: number | null; onPick?: (i: number) => void }) {
  const i = pick ?? Math.min(PROJECTS.length - 1, Math.floor(t * PROJECTS.length));
  const w = PROJECTS[i];
  const file = `${w.slug}.ts`;
  const lines: React.ReactNode[] = [
    <><span style={{ color: C.com }}>{"// "}{w.what}</span></>,
    <><span style={{ color: C.key }}>export const</span> <span style={{ color: C.var }}>{camel(w.slug)}</span> <span style={{ color: C.punc }}>=</span> {"{"}</>,
    <>  <span style={{ color: C.var }}>name</span>: <span style={{ color: C.str }}>&quot;{w.name}&quot;</span>,</>,
    <>  <span style={{ color: C.var }}>status</span>: <span style={{ color: C.str }}>&quot;{w.status}&quot;</span>, <span style={{ color: C.var }}>since</span>: <span style={{ color: C.num }}>{w.year}</span>,</>,
    <>  <span style={{ color: C.var }}>platforms</span>: [{w.platforms.map((p, k) => <span key={p}><span style={{ color: C.str }}>&quot;{p}&quot;</span>{k < w.platforms.length - 1 ? ", " : ""}</span>)}],</>,
    <>  <span style={{ color: C.var }}>stack</span>: [{(w.stack.length ? w.stack.slice(0, 6) : ["…"]).map((p, k, a) => <span key={p}><span style={{ color: C.type }}>{p.replace(/[^a-zA-Z0-9]/g, "")}</span>{k < a.length - 1 ? ", " : ""}</span>)}],</>,
    <>  <span style={{ color: C.var }}>role</span>: <span style={{ color: C.str }}>&quot;{w.role.split("·")[0].trim()}&quot;</span>,</>,
    <>  <span style={{ color: C.fn }}>ship</span>() {"{"} <span style={{ color: C.key }}>return</span> <span style={{ color: C.str }}>&quot;{w.domain ?? "soon"}&quot;</span> {"}"},</>,
    <>{"}"} <span style={{ color: C.key }}>satisfies</span> <span style={{ color: C.type }}>Product</span>;</>,
  ];
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden bg-[#1e1e1e] font-mono text-[0.78rem] text-[#d4d4d4]">
      <div className="flex h-9 items-center border-b border-black/40 bg-[#181818] text-[0.72rem]">
        <span className="px-4 text-white/40">EXPLORER</span>
        <span className="flex h-full items-center gap-2 border-t-2 border-[#0078d4] bg-[#1e1e1e] px-4 text-white"><span style={{ color: "#3178c6" }}>TS</span> {file}</span>
        <span className="hidden h-full items-center px-4 text-white/40 md:flex">README.md</span>
      </div>
      <div className="grid min-h-0 grid-cols-[minmax(0,11rem)_1fr] lg:grid-cols-[12rem_1fr_minmax(0,22rem)]">
        <ul className="min-h-0 overflow-hidden border-r border-black/40 bg-[#181818] py-2 text-[0.74rem]">
          <li className="px-3 pb-1 text-white/50">⌄ work</li>
          {PROJECTS.map((p, k) => (
            <li key={p.slug}>
              <button type="button" onClick={() => onPick?.(k)} className={`flex w-full items-center gap-1.5 truncate py-1 pl-6 pr-2 text-left ${k === i ? "bg-[#37373d] text-white" : "text-white/60 hover:bg-white/5"}`}>
                <span style={{ color: "#3178c6" }} className="text-[0.62rem]">TS</span> {p.slug}.ts
              </button>
            </li>
          ))}
        </ul>
        <pre key={w.slug} className="min-h-0 animate-[fadeUp_.45s_ease_both] overflow-hidden p-4 leading-[1.75]">
          {lines.map((l, k) => (
            <div key={k} className="flex whitespace-pre-wrap"><span className="mr-5 inline-block w-5 shrink-0 select-none text-right text-white/25">{k + 1}</span><span className="min-w-0">{l}</span></div>
          ))}
          <div className="flex"><span className="mr-5 inline-block w-5 text-right text-white/25">{lines.length + 1}</span><span className="animate-blink text-[#aeafad]">▍</span></div>
        </pre>
        <div className="hidden min-h-0 flex-col border-l border-black/40 bg-[#181818] p-3 lg:flex">
          <p className="text-[0.66rem] uppercase tracking-widest text-white/40">Preview · {w.domain ?? "local"}</p>
          <div key={w.slug + "p"} className="mt-2 flex-1 animate-[fadeUp_.5s_ease_both] overflow-hidden rounded-md border border-white/10 bg-black/40">
            {w.shots[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={w.shots[0].src} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
            ) : (
              <div className="grid h-full place-items-center p-4 text-center font-display text-2xl font-bold text-white/80" style={{ background: `linear-gradient(135deg,hsl(${w.hue} 45% 22%),hsl(${(w.hue + 40) % 360} 40% 12%))` }}>{w.name}</div>
            )}
          </div>
          <p className="mt-2 line-clamp-3 font-body text-[0.78rem] leading-snug text-white/60">{w.summary}</p>
        </div>
      </div>
      <div className="border-t border-black/40 bg-[#181818]">
        <p className="px-4 py-2 text-[0.72rem] text-white/60"><span className="text-[#5ee0c1]">$</span> bun run build <span className="text-white/30">·</span> <span className="text-[#5ee0c1]">✓ compiled {w.name}</span> <span className="text-white/30">in {(0.6 + (i % 4) * 0.37).toFixed(2)}s</span></p>
        <div className="flex h-6 items-center justify-between bg-[#0078d4] px-3 text-[0.68rem] text-white">
          <span>⎇ main · ✓ 0 problems</span><span>Ln {lines.length}, Col 1 · TypeScript</span>
        </div>
      </div>
    </div>
  );
}
