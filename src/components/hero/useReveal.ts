"use client";
import { useEffect, useState } from "react";

/** Reveals `total` units over time (typing). Instant for reduced motion. */
export function useTyping(total: number, speed = 18, delay = 300) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(total); return; }
    let i = 0;
    let id: number;
    const start = window.setTimeout(function tick() {
      i += 1 + (Math.random() < 0.15 ? 1 : 0);
      setN(Math.min(total, i));
      if (i < total) id = window.setTimeout(tick, speed + Math.random() * speed);
    }, delay);
    return () => { clearTimeout(start); clearTimeout(id); };
  }, [total, speed, delay]);
  return n;
}
