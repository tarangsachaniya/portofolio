"use client";
import { work } from "@/lib/content";

const PROJECTS = work;
const C = { key: "#c586c0", str: "#ce9178", fn: "#dcdcaa", type: "#4ec9b0", var: "#9cdcfe", com: "#6a9955", num: "#b5cea8", dim: "#808080" };
const camel = (s: string) => s.replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase()).replace(/^./, (c) => c.toLowerCase());
const cut = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
function wrap(s: string, n: number, max: number) {
  const out: string[] = [];
  let line = "";
  for (const w of s.split(" ")) {
    if ((line + " " + w).trim().length > n) { out.push(line.trim()); line = w; } else line += " " + w;
    if (out.length === max) break;
  }
  if (out.length < max && line.trim()) out.push(line.trim());
  return out.slice(0, max);
}
const S = ({ c, children }: { c: string; children: React.ReactNode }) => <span style={{ color: c }}>{children}</span>;
const Str = ({ v }: { v: string }) => <S c={C.str}>&quot;{v}&quot;</S>;
const list = (xs: string[], color: string) => xs.map((x, k) => <span key={x}><S c={color}>{color === C.str ? `"${x}"` : x.replace(/[^a-zA-Z0-9]/g, "")}</S>{k < xs.length - 1 ? ", " : ""}</span>);

function codeFor(w: (typeof PROJECTS)[number]): React.ReactNode[] {
  const doc = wrap(w.summary, 74, 3);
  return [
    <S c={C.com}>/**</S>,
    <S c={C.com}> * {w.name}: {w.what}</S>,
    ...doc.map((l) => <S c={C.com}> * {l}</S>),
    <S c={C.com}> */</S>,
    <><S c={C.key}>import type</S> {"{ "}<S c={C.type}>Product</S>{" }"} <S c={C.key}>from</S> <Str v="@tarang/work" />;</>,
    <></>,
    <><S c={C.key}>export const</S> <S c={C.var}>{camel(w.slug)}</S> = {"{"}</>,
    <>{"  "}<S c={C.var}>name</S>: <Str v={w.name} />, <S c={C.var}>status</S>: <Str v={w.status} />, <S c={C.var}>since</S>: <S c={C.num}>{w.year}</S>,</>,
    <>{"  "}<S c={C.var}>role</S>: <Str v={cut(w.role, 58)} />,</>,
    <>{"  "}<S c={C.var}>platforms</S>: [{list(w.platforms, C.str)}],</>,
    w.stack.length ? <>{"  "}<S c={C.var}>stack</S>: [{list(w.stack.slice(0, 7), C.type)}],</> : <>{"  "}<S c={C.var}>stack</S>: [], <S c={C.com}>{"// in the case study"}</S></>,
    <>{"  "}<S c={C.var}>problem</S>: <Str v={cut(w.problem, 66)} />,</>,
    <>{"  "}<S c={C.var}>build</S>: [</>,
    ...w.build.slice(0, 3).map((b) => <>{"    "}<Str v={cut(b, 72)} />,</>),
    <>{"  "}],</>,
    <>{"  "}<S c={C.fn}>ship</S>: () =&gt; <Str v={w.domain ?? "localhost"} />,</>,
    <>{"}"} <S c={C.key}>satisfies</S> <S c={C.type}>Product</S>;</>,
  ];
}

/** 12:30: the editor. The open file follows your scroll through the products and types itself in. */
export default function Build({ t, pick, onPick }: { t: number; pick?: number | null; onPick?: (i: number) => void }) {
  const n = PROJECTS.length;
  const i = pick ?? Math.min(n - 1, Math.floor(t * n));
  const w = PROJECTS[i];
  const lt = pick != null || t >= 1 ? 1 : Math.min(1, (t * n - i) * 1.7 + 0.15);
  const code = codeFor(w);
  const shown = Math.max(1, Math.ceil(code.length * lt));
  const term = [
    <><S c="#5ee0c1">$</S> bun run build</>,
    <>{"  "}<S c={C.dim}>▲</S> {w.name} <S c={C.dim}>· {w.stack[0] ?? w.platforms[0]}</S></>,
    <>{"  "}<S c="#5ee0c1">✓</S> Compiled successfully in {(0.6 + (i % 4) * 0.37).toFixed(2)}s</>,
    <>{"  "}<S c="#5ee0c1">✓</S> Types and lint clean</>,
    <>{"  "}<S c="#5ee0c1">✓</S> Built {w.platforms.length} target{w.platforms.length > 1 ? "s" : ""}: {w.platforms.join(", ")}</>,
    <>{"  "}<S c="#ffc46b">↗</S> {w.domain ? <>shipped to <S c="#9cdcfe">https://{w.domain}</S></> : "ready to ship"}</>,
  ];
  const termShown = Math.round(term.length * Math.max(0, (lt - 0.45) / 0.55));

  return (
    <div className="@container grid h-full grid-rows-[2.25rem_minmax(0,1fr)_auto_1.5rem] overflow-hidden bg-[#1e1e1e] font-mono text-[0.8rem] text-[#d4d4d4]">
      {/* tabs */}
      <div className="flex items-stretch border-b border-black/50 bg-[#181818] text-[0.74rem]">
        <span className="hidden w-11 shrink-0 @[40rem]:block" />
        <span className="hidden w-[12.5rem] shrink-0 items-center px-4 text-[0.66rem] tracking-widest text-white/45 @[40rem]:flex">EXPLORER</span>
        <span className="flex items-center gap-2 border-t-2 border-[#0078d4] bg-[#1e1e1e] px-4 text-white"><S c="#3178c6">TS</S> {w.slug}.ts <span className="text-white/40">×</span></span>
        <span className="hidden items-center gap-2 px-4 text-white/40 @[50rem]:flex"><S c="#519aba">M↓</S> README.md</span>
        <span className="hidden items-center gap-2 px-4 text-white/40 @[60rem]:flex"><S c="#cbcb41">{"{}"}</S> package.json</span>
      </div>

      {/* body */}
      <div className="grid min-h-0 grid-cols-[minmax(0,1fr)] @[40rem]:grid-cols-[2.75rem_12.5rem_minmax(0,1fr)] @[60rem]:grid-cols-[2.75rem_12.5rem_minmax(0,1fr)_20rem]">
        {/* activity bar */}
        <div className="hidden flex-col items-center gap-4 border-r border-black/50 bg-[#181818] pt-3 text-[1.05rem] text-white/35 @[40rem]:flex" aria-hidden>
          <span className="border-l-2 border-white pl-2 text-white/90">⎘</span><span>⌕</span><span>⑂</span><span>▷</span><span>⊞</span>
        </div>
        {/* explorer */}
        <div className="hidden min-h-0 flex-col overflow-hidden border-r border-black/50 bg-[#181818] text-[0.76rem] @[40rem]:flex">
          <p className="px-3 pb-1 pt-2 text-[0.66rem] font-semibold tracking-wider text-white/60">⌄ TARANG</p>
          <p className="px-5 py-0.5 text-white/55">› .github</p>
          <p className="px-5 py-0.5 text-white/75">⌄ work</p>
          <ul>
            {PROJECTS.map((p, k) => (
              <li key={p.slug}>
                <button type="button" onClick={() => onPick?.(k)} className={`flex w-full items-center gap-1.5 truncate py-[3px] pl-9 pr-2 text-left ${k === i ? "bg-[#04395e] text-white outline outline-1 -outline-offset-1 outline-[#0078d4]" : "text-white/65 hover:bg-white/5"}`}>
                  <S c="#3178c6"><span className="text-[0.6rem]">TS</span></S> <span className="truncate">{p.slug}.ts</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="px-5 py-0.5 text-white/55">› notes</p>
          <p className="px-5 py-0.5 text-white/55"><S c="#cbcb41">{"{}"}</S> package.json</p>
          <p className="px-5 py-0.5 text-white/55"><S c="#519aba">M↓</S> README.md</p>
          <div className="mt-auto border-t border-black/50">
            <p className="px-3 py-2 text-[0.66rem] font-semibold tracking-wider text-white/60">⌄ OUTLINE</p>
            {["name", "status", "platforms", "stack", "problem", "build", "ship"].map((k) => <p key={k} className="truncate px-5 py-[2px] text-white/50"><S c="#75beff">◇</S> {k}</p>)}
            <div className="h-2" />
          </div>
        </div>
        {/* code */}
        <div className="relative min-h-0 overflow-hidden">
          <p className="truncate px-4 pt-2 text-[0.7rem] text-white/40">work › {w.slug}.ts › <S c={C.var}>{camel(w.slug)}</S></p>
          <pre key={w.slug} className="animate-[fadeUp_.35s_ease_both] overflow-hidden whitespace-pre px-0 pt-2 leading-[1.72]">
            {code.slice(0, shown).map((l, k) => (
              <div key={k} className={`flex pr-16 ${k === shown - 1 && lt < 1 ? "bg-white/[0.04]" : ""}`}>
                <span className="mr-5 inline-block w-10 shrink-0 select-none text-right text-white/25">{k + 1}</span>
                <span className="min-w-0 truncate">{l}{k === shown - 1 && <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.2em] animate-blink bg-[#aeafad]" />}</span>
              </div>
            ))}
          </pre>
          {/* minimap */}
          <div aria-hidden className="absolute right-3 top-8 hidden w-12 space-y-[3px] @[50rem]:block">
            {code.map((_, k) => <i key={k} className="block h-[2px] rounded-full" style={{ width: `${30 + ((k * 37) % 60)}%`, background: k < shown ? ["#6a9955", "#9cdcfe", "#ce9178", "#c586c0"][k % 4] : "#ffffff14", opacity: 0.55 }} />)}
            <i className="absolute -inset-x-1 top-0 block h-16 rounded-sm bg-white/[0.06]" />
          </div>
        </div>
        {/* preview */}
        <div className="hidden min-h-0 flex-col gap-3 border-l border-black/50 bg-[#181818] p-3 @[60rem]:flex">
          <div key={w.slug + "p"} className="animate-[fadeUp_.45s_ease_both] overflow-hidden rounded-lg border border-white/10 bg-black/40">
            <div className="flex items-center gap-2 border-b border-white/10 px-2.5 py-1.5">
              <span className="flex gap-1" aria-hidden><i className="size-2 rounded-full bg-white/20" /><i className="size-2 rounded-full bg-white/20" /><i className="size-2 rounded-full bg-white/20" /></span>
              <span className="truncate rounded bg-white/5 px-2 py-0.5 text-[0.62rem] text-white/55">{w.domain ?? "localhost:3000"}</span>
            </div>
            <div className="aspect-[16/10] overflow-hidden">
              {w.shots[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.shots[0].src} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
              ) : (
                <div className="grid h-full place-items-center p-4 text-center font-display text-2xl font-bold text-white/85" style={{ background: `linear-gradient(135deg,hsl(${w.hue} 45% 22%),hsl(${(w.hue + 40) % 360} 40% 12%))` }}>{w.name}</div>
              )}
            </div>
          </div>
          <p className="font-body text-[0.95rem] font-semibold text-white">{w.name}</p>
          <dl className="space-y-1.5 text-[0.7rem]">
            {w.facts.slice(0, 4).map((f) => (
              <div key={f.k} className="flex justify-between gap-3 border-b border-white/5 pb-1.5">
                <dt className="shrink-0 text-white/40">{f.k}</dt><dd className="truncate text-right text-white/75">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto flex flex-wrap gap-1">{w.platforms.map((p) => <span key={p} className="rounded border border-white/10 px-1.5 py-0.5 text-[0.62rem] text-white/60">{p}</span>)}</div>
        </div>
      </div>

      {/* terminal */}
      <div className="border-t border-black/50 bg-[#181818]">
        <div className="flex gap-5 px-4 pt-1.5 text-[0.64rem] tracking-wider text-white/40"><span className="border-b border-white/70 pb-1 text-white/80">TERMINAL</span><span>PROBLEMS</span><span className="hidden @[40rem]:inline">OUTPUT</span></div>
        <div className="h-[7.6rem] space-y-0.5 overflow-hidden px-4 py-2 text-[0.74rem] text-white/75">
          {term.slice(0, Math.max(1, termShown)).map((l, k) => <p key={k} className="animate-[fadeUp_.25s_ease_both] whitespace-pre">{l}</p>)}
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#0078d4] px-3 text-[0.68rem] text-white">
        <span>⎇ main  ✓ 0 problems</span><span className="hidden @[30rem]:inline">Ln {shown}, Col 1 · UTF-8 · TypeScript</span>
      </div>
    </div>
  );
}
