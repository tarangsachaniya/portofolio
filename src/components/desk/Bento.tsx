"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type Size = "1x1" | "2x1" | "2x2" | "3x1" | "3x2" | "4x1" | "4x2" | "1x2";

/** Pointer-reactive bento tile: a spotlight that follows the cursor, a lit border, and a gentle 3D tilt. */
export function Tile({ size = "1x1", href, className = "", children, tilt = true, delay = 0, label }: { size?: Size; href?: string; className?: string; children: ReactNode; tilt?: boolean; delay?: number; label?: string }) {
  const ref = useRef<HTMLDivElement & HTMLAnchorElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt && e.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--rx", `${(0.5 - py) * 5}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
    }
  };
  const leave = () => { ref.current?.style.setProperty("--rx", "0deg"); ref.current?.style.setProperty("--ry", "0deg"); };
  const cls = `tile s-${size} ${className}`;
  const inner = (
    <motion.div className="h-full" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
  if (href) {
    const ext = href.startsWith("http");
    return ext ? (
      <a ref={ref} href={href} target="_blank" rel="noreferrer" className={cls} onPointerMove={move} onPointerLeave={leave} aria-label={label}>{inner}</a>
    ) : (
      <Link ref={ref} href={href} className={cls} onPointerMove={move} onPointerLeave={leave} aria-label={label}>{inner}</Link>
    );
  }
  return <div ref={ref} className={cls} onPointerMove={move} onPointerLeave={leave}>{inner}</div>;
}

export function Bento({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="bento">{children}</div>
    </div>
  );
}

/** Counts up once when scrolled into view. Shows the final number to crawlers and reduced motion. */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}
