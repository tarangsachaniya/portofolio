import TechIcon from "@/components/TechIcon";
import type { Tech } from "@/lib/data";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: Tech[];
  /** seconds for one full loop — err slow; too fast reads as noise */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * CSS-only infinite marquee. Two requirements make the -50% loop seamless:
 *   1. exactly two identical copies of the row
 *   2. the gap lives INSIDE each copy (trailing padding), not on the track
 *
 * Putting `gap` on the flex track adds one extra gap between copy 1 and copy 2
 * that -50% doesn't account for, which shows up as a visible jump every cycle.
 */
export default function Marquee({
  items,
  duration = 45,
  reverse = false,
  className,
}: MarqueeProps) {
  const Row = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-3 pr-3"
    >
      {items.map((tech) => (
        <li
          key={tech.name}
          className={cn(
            "group/item flex items-center gap-2.5 whitespace-nowrap",
            "rounded-lg border border-border/70 bg-card/60 px-4 py-2.5",
            "transition-colors duration-200 hover:border-accent/50 hover:bg-elevated",
          )}
        >
          <TechIcon
            name={tech.name}
            slug={tech.slug}
            size={18}
            className="opacity-60 grayscale transition duration-200 group-hover/item:opacity-100 group-hover/item:grayscale-0"
          />
          <span className="font-mono text-[13px] text-muted-foreground transition-colors duration-200 group-hover/item:text-foreground">
            {tech.name}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("group relative overflow-hidden mask-fade-x", className)}>
      <div
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
        className={cn(
          "marquee-track flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          // pointer sits over the static viewport, so pause stays stable
          "group-hover:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
      >
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
