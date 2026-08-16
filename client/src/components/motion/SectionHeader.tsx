import { m } from "framer-motion";
import { drawX, fadeUp, stagger, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Accent = "emerald" | "amber" | "violet";

const ACCENT_TEXT: Record<Accent, string> = {
  emerald: "text-accent",
  amber: "text-accent-amber",
  violet: "text-accent-violet",
};

const ACCENT_TEXT_DIM: Record<Accent, string> = {
  emerald: "text-accent/60",
  amber: "text-accent-amber/60",
  violet: "text-accent-violet/60",
};

const ACCENT_FROM: Record<Accent, string> = {
  emerald: "from-accent",
  amber: "from-accent-amber",
  violet: "from-accent-violet",
};

const ACCENT_VIA: Record<Accent, string> = {
  emerald: "via-accent",
  amber: "via-accent-amber",
  violet: "via-accent-violet",
};

interface SectionHeaderProps {
  /** the mono eyebrow, rendered as a shell-prompt style label */
  eyebrow: string;
  title: string;
  description?: string;
  /** pins the header while the section body scrolls past it */
  sticky?: boolean;
  align?: "left" | "center";
  /**
   * Signature color for this section's eyebrow/underline. Emerald is the
   * brand default for connective sections; amber and violet mark the
   * narrative pillars (Projects, Experience) so the page reads as more than
   * one long uniform scroll.
   */
  accent?: Accent;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  sticky = false,
  align = "left",
  accent = "emerald",
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
        className={cn(
          "mb-3 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em]",
          ACCENT_TEXT[accent],
        )}
      >
        <span aria-hidden className={ACCENT_TEXT_DIM[accent]}>
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
          "mt-5 h-px w-24 bg-gradient-to-r to-transparent",
          ACCENT_FROM[accent],
          align === "center" && cn("mx-auto from-transparent to-transparent", ACCENT_VIA[accent]),
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
