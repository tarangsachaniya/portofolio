import { useRef } from "react";
import {
  m,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Endless text band. Drifts on its own; scrolling speeds it up, reverses it
 * with scroll direction, and skews it with velocity. Static for reduced motion.
 */
export default function VelocityBand({
  words,
  base = 2.4,
  tone = "ink",
}: {
  words: string[];
  base?: number;
  tone?: "ink" | "signal";
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(vel, [-2500, 2500], [10, -10]);
  const dir = useRef(1);
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * base * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    x.set(x.get() - move);
  });

  const line = words.join("  ·  ") + "  ·  ";
  return (
    <div
      aria-hidden
      className={
        tone === "signal"
          ? "overflow-hidden bg-signal py-5 text-on-signal md:py-7"
          : "overflow-hidden border-y border-line py-5 md:py-7"
      }
    >
      <m.div className="flex w-max whitespace-nowrap" style={{ x: pos, skewX: reduce ? 0 : skew }}>
        {[0, 1].map((k) => (
          <span key={k} className="pr-[0.5em] text-[clamp(2.75rem,2rem+5vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em]">
            {line.repeat(2)}
          </span>
        ))}
      </m.div>
    </div>
  );
}
