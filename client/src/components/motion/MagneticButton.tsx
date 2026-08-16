import { m } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

/**
 * React's drag/animation handlers collide with Framer Motion's same-named
 * props, so they are omitted rather than fought with.
 */
type Conflicting =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "style";

type Props = Omit<React.ComponentPropsWithoutRef<"button">, Conflicting> & {
  strength?: number;
  cap?: number;
  wrapperClassName?: string;
};

/**
 * The wrapper carries the listener with negative-margin padding, so the pull
 * begins slightly before the pointer reaches the button. Drift is capped so
 * the visual target never drifts away from the hit target.
 */
export function MagneticButton({
  children,
  className,
  wrapperClassName,
  strength = 0.4,
  cap = 12,
  ...props
}: Props) {
  const { style, handlers } = useMagnetic({ strength, cap });

  return (
    <span
      className={cn("inline-block p-3 -m-3", wrapperClassName)}
      {...handlers}
    >
      <m.button style={style} className={className} {...props}>
        {children}
      </m.button>
    </span>
  );
}

type LinkProps = Omit<React.ComponentPropsWithoutRef<"a">, Conflicting> & {
  strength?: number;
  cap?: number;
  wrapperClassName?: string;
};

export function MagneticLink({
  children,
  className,
  wrapperClassName,
  strength = 0.4,
  cap = 12,
  ...props
}: LinkProps) {
  const { style, handlers } = useMagnetic({ strength, cap });

  return (
    <span
      className={cn("inline-block p-3 -m-3", wrapperClassName)}
      {...handlers}
    >
      <m.a style={style} className={className} {...props}>
        {children}
      </m.a>
    </span>
  );
}
