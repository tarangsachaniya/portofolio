"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: a quiet dot grid that wakes up into code glyphs
 * wherever the cursor passes (and in a slow sweep on touch devices).
 * - Canvas 2D, DPR capped at 2, dot grid pre-rendered once per resize.
 * - Only "energised" cells are drawn per frame.
 * - Paused offscreen / tab hidden; never runs with reduced motion.
 */
const GLYPHS = "{}[]<>/;=+*#$_01λ→".split("");
const CELL = 22;

export default function GlyphField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let w = 0,
      h = 0,
      cols = 0,
      rows = 0;
    let energy = new Float32Array(0);
    let glyph = new Uint8Array(0);
    let dots: HTMLCanvasElement | null = null;
    let ink = "#121211";
    let signal = "#ff5b1f";
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;
    let t0 = performance.now();

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      ink = cs.getPropertyValue("--fg").trim() || ink;
      signal = cs.getPropertyValue("--accent").trim() || signal;
      buildDots();
    };

    const buildDots = () => {
      dots = document.createElement("canvas");
      dots.width = w * dpr;
      dots.height = h * dpr;
      const d = dots.getContext("2d")!;
      d.scale(dpr, dpr);
      d.fillStyle = ink;
      d.globalAlpha = 0.13;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) d.fillRect(c * CELL + CELL / 2, r * CELL + CELL / 2, 1.2, 1.2);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      energy = new Float32Array(cols * rows);
      glyph = new Uint8Array(cols * rows).map(() => (Math.random() * GLYPHS.length) | 0);
      buildDots();
    };

    const excite = (x: number, y: number, radius: number, amount: number) => {
      const c0 = Math.max(0, Math.floor((x - radius) / CELL));
      const c1 = Math.min(cols - 1, Math.ceil((x + radius) / CELL));
      const r0 = Math.max(0, Math.floor((y - radius) / CELL));
      const r1 = Math.min(rows - 1, Math.ceil((y + radius) / CELL));
      for (let r = r0; r <= r1; r++)
        for (let c = c0; c <= c1; c++) {
          const dx = c * CELL + CELL / 2 - x;
          const dy = r * CELL + CELL / 2 - y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < radius) {
            const i = r * cols + c;
            const v = (1 - d / radius) * amount;
            if (v > energy[i]) energy[i] = v;
          }
        }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (now - t0) / 1000;

      if (mouse.active) excite(mouse.x, mouse.y, 150, 1);
      else {
        // idle sweep: a slow lissajous so touch users still see it breathe
        const sx = w * (0.5 + 0.42 * Math.sin(t * 0.35));
        const sy = h * (0.5 + 0.38 * Math.sin(t * 0.52 + 1.2));
        excite(sx, sy, 120, fine ? 0.55 : 0.42);
      }

      ctx.clearRect(0, 0, w, h);
      if (dots) ctx.drawImage(dots, 0, 0, w, h);
      ctx.font = `500 12px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < energy.length; i++) {
        const e = energy[i];
        if (e < 0.02) continue;
        energy[i] = e * 0.955;
        if (Math.random() < 0.06 * e) glyph[i] = (Math.random() * GLYPHS.length) | 0;
        const c = i % cols;
        const r = (i / cols) | 0;
        ctx.globalAlpha = Math.min(0.85, e * 0.9);
        ctx.fillStyle = e > 0.82 ? signal : ink;
        ctx.fillText(GLYPHS[glyph[i]], c * CELL + CELL / 2, r * CELL + CELL / 2);
      }
      ctx.globalAlpha = 1;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => (mouse.active = false);
    const onVis = () => (visible = !document.hidden);

    resize();
    readColors();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting && !document.hidden));
    io.observe(canvas);
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVis);
    t0 = performance.now();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 size-full" />;
}
