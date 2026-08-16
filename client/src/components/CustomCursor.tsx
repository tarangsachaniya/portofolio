import { useEffect, useState } from "react";
import {
  m,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { spring } from "@/lib/motion";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

/**
 * Desktop-only two-part cursor: a dot that tracks exactly, and a ring that
 * trails on a spring and grows over interactive targets.
 *
 * Everything runs on MotionValues, so there is no React state churn and no
 * manual rAF loop (the spring stops itself once at rest). Hover state comes
 * from mouseover/mouseout, which fire only when the target actually changes —
 * the previous version ran a 6-selector `closest()` walk on every mousemove.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(1);

  const ringX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 });
  const ringScale = useSpring(scale, spring.snappy);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      scale.set(el?.closest?.(INTERACTIVE) ? 1.7 : 1);
    };
    const onLeave = () => opacity.set(0);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [reduced, x, y, opacity, scale]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block"
    >
      <m.div
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <m.div
        style={{ x: ringX, y: ringY, scale: ringScale }}
        className="absolute -ml-3.5 -mt-3.5 h-7 w-7 rounded-full border border-accent/60"
      />
    </m.div>
  );
}
