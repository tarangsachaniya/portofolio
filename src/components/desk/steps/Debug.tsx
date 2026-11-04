"use client";
import { chapters, workBySlug } from "@/lib/content";

const venta = workBySlug("ventadot")!;
const prime = chapters[2];

/** Two real fixes. The outcomes are from the record; the diffs are simplified sketches of the change. */
const FIXES = [
  {
    id: "mysql",
    where: `${prime.where} · ${prime.year}`,
    title: "Slow MySQL queries under real traffic",
    symptom: "API responses dragged as data grew; the hot paths were scanning far more rows than they returned.",
    file: "api/reports.sql",
    diff: [
      [" ", "-- read path behind the busiest endpoints"],
      ["-", "SELECT * FROM events WHERE DATE(created_at) = ? ORDER BY created_at;"],
      ["+", "SELECT id, type, payload FROM events"],
      ["+", "WHERE created_at >= ? AND created_at < ?   -- sargable range"],
      ["+", "ORDER BY created_at;"],
      ["+", "CREATE INDEX idx_events_created ON events (created_at);"],
    ],
    result: "Query times cut by more than 40%.",
    lesson: prime.learned.find((l) => /quer/i.test(l)) ?? prime.learned[0],
  },
  {
    id: "ws",
    where: `${venta.name} · ${venta.year}`,
    title: "Kitchen board lagging behind orders",
    symptom: "At peak hours the kitchen screen showed new orders late because it asked the server every few seconds.",
    file: "kitchen/board.ts",
    diff: [
      [" ", "// kitchen + pickup board"],
      ["-", "setInterval(() => fetchOrders().then(render), POLL_MS);"],
      ["+", "const socket = connect(`/outlets/${outletId}/orders`);"],
      ["+", "socket.on(\"order:new\", (o) => store.upsert(o));"],
      ["+", "socket.on(\"order:status\", (o) => store.upsert(o));"],
      ["+", "store.subscribe(render);   // one source of truth"],
    ],
    result: venta.build.find((b) => /WebSocket/i.test(b)) ?? "Moved to WebSocket push.",
    lesson: venta.learned[0],
  },
];

const ROW: Record<string, string> = { "-": "bg-[#ff5f57]/12 text-[#ffb3ad]", "+": "bg-[#28c840]/12 text-[#b6f5c0]", " ": "text-white/50" };

/** 16:30: debugging. Two fixes from the record, as an issue, a diff and a result. */
export default function Debug({ t, pick, onPick }: { t: number; pick?: number | null; onPick?: (i: number) => void }) {
  const i = pick ?? (t < 0.5 ? 0 : 1);
  const f = FIXES[i];
  const lt = pick != null || t >= 1 ? 1 : Math.min(1, ((t - i * 0.5) / 0.5) * 1.5);
  const lines = Math.max(1, Math.ceil(f.diff.length * Math.min(1, lt * 1.3)));
  const solved = lt > 0.75;
  return (
    <div className="@container grid h-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-[#0f1115] font-mono text-[0.86rem]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
        <span className={`rounded-full px-2.5 py-0.5 text-[0.72rem] ${solved ? "bg-[#28c840]/15 text-[#7ee7a0]" : "bg-[#ff5f57]/15 text-[#ff9d96]"}`}>{solved ? "● resolved" : "● open"}</span>
        <span className="truncate font-body text-[1rem] font-semibold text-white">{f.title}</span>
        <span className="ml-auto flex gap-1.5">
          {FIXES.map((x, k) => (
            <button key={x.id} type="button" onClick={() => onPick?.(k)} aria-pressed={k === i} className={`rounded-full border px-2.5 py-1 text-[0.7rem] ${k === i ? "border-[#ff8a5c]/60 text-white" : "border-white/10 text-white/45 hover:text-white"}`}>fix {k + 1}</button>
          ))}
        </span>
      </div>
      <div key={f.id} className="grid min-h-0 animate-[fadeUp_.4s_ease_both] @[46rem]:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="hidden min-h-0 flex-col gap-4 border-r border-white/10 bg-white/[0.02] p-5 font-body @[46rem]:flex">
          <div><p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/40">where</p><p className="mt-1 text-white/85">{f.where}</p></div>
          <div><p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/40">symptom</p><p className="mt-1 leading-relaxed text-white/75">{f.symptom}</p></div>
          <div className={`mt-auto rounded-xl border p-3 transition-all duration-500 ${solved ? "border-[#28c840]/40 bg-[#28c840]/10" : "border-white/10 opacity-40"}`}>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-[#7ee7a0]">lesson</p>
            <p className="mt-1 leading-snug text-white/85">{f.lesson}</p>
          </div>
        </aside>
        <div className="min-h-0 overflow-hidden p-5">
          <p className="text-white/45">$ git diff {f.file} <span className="text-white/25">· simplified sketch</span></p>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <p className="border-b border-white/10 bg-white/[0.03] px-4 py-2 text-[0.75rem] text-white/50">{f.file}</p>
            {f.diff.slice(0, lines).map(([m, l], k) => (
              <p key={k} className={`flex whitespace-pre px-4 py-[3px] ${ROW[m]}`}><span className="mr-4 w-3 select-none text-white/35">{m}</span><span className="truncate">{l}</span></p>
            ))}
          </div>
          <p className="mt-5 text-white/45">$ npm test && npm run bench</p>
          {solved && <p className="mt-1 animate-[fadeUp_.3s_ease_both] text-[#7ee7a0]">✓ {f.result}</p>}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 bg-[#0b0d10] px-5 py-2 text-[0.72rem] text-white/45">
        <span>debugger · breakpoints cleared</span><span>fix {i + 1} of {FIXES.length}</span>
      </div>
    </div>
  );
}
