import { useCallback, useEffect, useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";
import { spring } from "@/lib/motion";

interface TiltOptions {
  /** max rotation per axis, degrees */
  max?: number;
  /** lower perspective = more dramatic */
  perspective?: number;
  /** hover lift, px */
  lift?: number;
}

/**
 * Pointer tilt driven entirely by MotionValues — zero React re-renders.
 * (The previous implementation called setState on every mousemove, which
 * re-rendered the whole card subtree ~120x/second per card.)
 *
 * The DOMRect is cached on enter and invalidated on scroll/resize so the
 * move handler never forces a synchronous layout.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  max = 8,
  perspective = 900,
  lift = 6,
}: TiltOptions = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<T>(null);
  const rect = useRef<DOMRect | null>(null);
  const active = useRef(false);

  const px = useMotionValue(0); // -0.5 … 0.5
  const py = useMotionValue(0);
  const hover = useMotionValue(0);

  const sx = useSpring(px, spring.tilt);
  const sy = useSpring(py, spring.tilt);
  const sh = useSpring(hover, spring.snappy);

  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const y = useTransform(sh, [0, 1], [0, -lift]);

  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(sh, [0, 1], [0, 0.16]);

  useEffect(() => {
    const invalidate = () => {
      rect.current = null;
    };
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    return () => {
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
    };
  }, []);

  const onPointerEnter = useCallback(
    (e: React.PointerEvent<T>) => {
      if (reduced || e.pointerType === "touch") return;
      active.current = true;
      rect.current = e.currentTarget.getBoundingClientRect();
      hover.set(1);
    },
    [reduced, hover],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (!active.current) return;
      const r =
        rect.current ?? (rect.current = e.currentTarget.getBoundingClientRect());
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [px, py],
  );

  const onPointerLeave = useCallback(() => {
    active.current = false;
    rect.current = null;
    px.set(0);
    py.set(0);
    hover.set(0);
  }, [px, py, hover]);

  const style: MotionStyle = reduced
    ? {}
    : {
        rotateX,
        rotateY,
        y,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      };

  return {
    ref,
    style,
    glare: { x: glareX, y: glareY, opacity: glareOpacity },
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
    reduced,
  };
}
