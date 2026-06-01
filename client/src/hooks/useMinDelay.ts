import { useEffect, useState } from "react";

/**
 * Returns `loading` that stays true for at least `ms` milliseconds, even if the
 * page is ready sooner. Used to keep skeletons on screen long enough to read as
 * intentional (spec: minimum 800ms).
 */
export function useMinDelay(ms = 800): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const timer = window.setTimeout(() => setLoading(false), prefersReduced ? 0 : ms);
    return () => window.clearTimeout(timer);
  }, [ms]);

  return loading;
}
