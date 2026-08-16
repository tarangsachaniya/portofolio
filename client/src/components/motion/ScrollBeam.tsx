import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked progress beam for the experience timeline.
 *
 * Adapted from the unused aceternity/timeline.tsx, which never rendered:
 * it measured height with getBoundingClientRect() during render, had an
 * `?? 0 + "px"` precedence bug, and bound a 0…1 MotionValue to `height` —
 * where a unitless number means pixels, so the beam grew from 0px to 1px.
 *
 * The rail fill uses scaleY from the top: composited, no layout during scroll,
 * and no measurement needed. The travelling head DOES need a pixel height,
 * because a percentage `y` in Framer Motion resolves against the element's own
 * box (8px), not its container — so height comes from a ResizeObserver.
 */
export default function ScrollBeam({
  children,
  className,
  railClassName,
}: {
  children: ReactNode;
  className?: string;
  /** positioning for the rail, e.g. "left-4 md:left-5" */
  railClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [height, setHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });

  const smooth = useSpring(scrollYProgress, spring.beam);
  const scaleY = useTransform(smooth, [0, 1], [0, 1]);
  const opacity = useTransform(smooth, [0, 0.04], [0, 1]);
  const headY = useTransform(smooth, [0, 1], [0, height]);
  const headOpacity = useTransform(smooth, [0, 0.04, 0.97, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ro = new ResizeObserver(([entry]) =>
      setHeight(entry.contentRect.height),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute inset-y-0 w-px overflow-hidden bg-border mask-fade-y",
          railClassName,
        )}
      >
        <m.div
          style={
            reduced ? { scaleY: 1, opacity: 1 } : { scaleY, opacity, originY: 0 }
          }
          className="h-full w-px bg-gradient-to-b from-accent-bright via-accent to-accent/0"
        />
      </div>

      {!reduced && height > 0 && (
        <m.span
          aria-hidden
          style={{ y: headY, opacity: headOpacity }}
          className={cn(
            "pointer-events-none absolute top-0 -ml-[3.5px] block h-2 w-2 rounded-full bg-accent-bright",
            "shadow-[0_0_12px_3px_hsl(var(--accent)/0.6)]",
            railClassName,
          )}
        />
      )}

      {children}
    </div>
  );
}
