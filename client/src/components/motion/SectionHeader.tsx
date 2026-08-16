import { m } from "framer-motion";
import { drawX, fadeUp, stagger, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** the mono eyebrow, rendered as a shell-prompt style label */
  eyebrow: string;
  title: string;
  description?: string;
  /** pins the header while the section body scrolls past it */
  sticky?: boolean;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  sticky = false,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <m.div
      variants={stagger(0.09)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(
        sticky && "lg:sticky lg:top-24",
        align === "center" && "text-center",
        className,
      )}
    >
      <m.p
        variants={fadeUp}
        className="mb-3 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent"
      >
        <span aria-hidden className="text-accent/60">
          $
        </span>
        {eyebrow}
      </m.p>

      <m.h2
        variants={fadeUp}
        className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl"
      >
        {title}
      </m.h2>

      <m.div
        variants={drawX}
        style={{ originX: align === "center" ? 0.5 : 0 }}
        className={cn(
          "mt-5 h-px w-24 bg-gradient-to-r from-accent to-transparent",
          align === "center" && "mx-auto from-transparent via-accent to-transparent",
        )}
      />

      {description && (
        <m.p
          variants={fadeUp}
          className={cn(
            "mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </m.p>
      )}
    </m.div>
  );
}
