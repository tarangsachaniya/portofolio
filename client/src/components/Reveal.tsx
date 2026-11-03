import type { ReactNode } from "react";
import { m } from "framer-motion";
import { ease } from "@/lib/motion";

/** Fade-up on enter. One-shot; reduced motion handled by MotionConfig. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: ease.out }}
    >
      {children}
    </m.div>
  );
}

/**
 * Masked line reveal for display type: each line slides up from behind
 * its own overflow mask. The trigger lives on the (unclipped) parent -
 * observing the translated child would read as 0% visible.
 */
export function Lines({
  lines,
  className,
  delay = 0,
  as = "h2",
  onMount = false,
  id,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  onMount?: boolean;
  id?: string;
}) {
  const Tag = m[as];
  const trigger = onMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.4 } };
  return (
    <Tag id={id} className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <m.span
            className="block will-change-transform"
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 0.95, delay: delay + i * 0.09, ease: ease.out } },
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
