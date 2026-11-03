import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

const LINES = [
  "$ git log --story tarang",
  "> 2021  hello, world",
  "> 2023  first users",
  "> 2025  started priinteve",
  "> 2026  building systems_",
];
const KEY = "booted";

/**
 * A ~1.3s boot sequence, once per browser session. Purely decorative:
 * the page underneath is already rendered and readable (aria-hidden),
 * and it never runs for reduced-motion users.
 */
export default function Boot() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY);
    } catch {
      return false;
    }
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    if (reduce) {
      setShow(false);
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
      else setTimeout(() => setShow(false), 180);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && !reduce && (
        <m.div
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-paper md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: ease.inOut }}
        >
          <div className="space-y-1.5 font-mono text-sm">
            {LINES.map((l, i) => (
              <m.p
                key={l}
                initial={{ opacity: 0 }}
                animate={{ opacity: count > i * 18 ? 1 : 0 }}
                transition={{ duration: 0.12 }}
                className={i === 0 ? "text-paper" : "text-paper/60"}
              >
                {l}
              </m.p>
            ))}
          </div>
          <div className="flex items-end justify-between">
            <span className="text-meta text-paper/60">compiling tarang.dev</span>
            <span className="font-sans text-[22vw] font-extrabold leading-[0.8] tracking-[-0.06em] tabular-nums md:text-[14vw]">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
