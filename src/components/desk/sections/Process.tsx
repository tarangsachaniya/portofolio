"use client";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/content";

/** The four steps of a project as a pipeline that fills in as it scrolls into view. */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const k = (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.35);
      setN(Math.max(0, Math.min(services.process.length, Math.floor(k * (services.process.length + 0.5)))));
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, []);
  return (
    <ol ref={ref} className="relative grid gap-4 md:grid-cols-4">
      <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[1.35rem] hidden h-[2px] bg-white/10 md:block" />
      <span aria-hidden className="absolute left-[12.5%] top-[1.35rem] hidden h-[2px] bg-gradient-to-r from-[#5ee0c1] via-[#ffb547] to-[#9b8cff] transition-[width] duration-700 md:block" style={{ width: `${Math.max(0, (n - 1) / (services.process.length - 1)) * 75}%` }} />
      {services.process.map((s, i) => {
        const done = i < n;
        return (
          <li key={s.n} className="relative text-center">
            <span className={`relative mx-auto grid size-11 place-items-center rounded-full border-2 font-mono text-sm transition-all duration-500 ${done ? "border-[#ffb547] bg-[#ffb547] text-[#14100a] shadow-[0_0_24px_rgb(255_181_71/0.6)]" : "border-white/20 bg-[#0b0d11] text-fg-3"}`}>
              {done ? "✓" : s.n}
            </span>
            <div className={`tile !col-auto mt-4 p-5 text-left transition-opacity duration-500 ${done ? "" : "opacity-55"}`}>
              <p className="font-mono text-[0.7rem] text-[#ffc46b]">stage {s.n}</p>
              <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-fg-2">{s.b}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
