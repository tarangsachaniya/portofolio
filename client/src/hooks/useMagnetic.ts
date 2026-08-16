import { useCallback, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { spring } from "@/lib/motion";

/**
 * Magnetic pull toward the pointer. The listener belongs on a padded wrapper
 * (so the pull starts before the pointer reaches the element) while the inner
 * element is the thing that translates.
 *
 * Keep `cap` small on anything clickable — more than ~14px of drift and the
 * visual target stops matching the hit target.
 */
export function useMagnetic({ strength = 0.35, cap = 14 } = {}) {
  const reduced = useReducedMotion();
  const rect = useRef<DOMRect | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring.snappy);
  const y = useSpring(my, spring.snappy);

  const clamp = (v: number) => Math.max(-cap, Math.min(cap, v));

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced || e.pointerType === "touch") return;
      const r =
        rect.current ?? (rect.current = e.currentTarget.getBoundingClientRect());
      mx.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
      my.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reduced, strength, cap, mx, my],
  );

  const onPointerLeave = useCallback(() => {
    rect.current = null;
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return {
    style: reduced ? {} : { x, y },
    handlers: { onPointerMove, onPointerLeave },
  };
}
