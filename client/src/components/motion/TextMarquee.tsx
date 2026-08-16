import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Oversized scrolling type band used between sections.
 * Same two-identical-copies / gap-inside-the-copy rule as Marquee — see there.
 */
export default function TextMarquee({
  items,
  duration = 38,
  reverse = false,
  className,
}: TextMarqueeProps) {
  const Row = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-8">
          <span className="font-display text-4xl font-bold uppercase tracking-tight text-foreground/[0.22] md:text-6xl">
            {item}
          </span>
          <span aria-hidden className="text-2xl text-accent/40 md:text-3xl">
            ◆
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group relative overflow-hidden border-y border-border/60 bg-surface py-6 mask-fade-x",
        className,
      )}
    >
      <div
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
        className={cn(
          "marquee-track flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
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
