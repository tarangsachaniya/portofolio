"use client";
import { useEffect, useState } from "react";

export function useMedia(q: string, initial = false) {
  const [m, setM] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
/** Phones, small tablets and reduced-motion users get the stacked (unpinned) day. */
export const useCompact = () => {
  const small = useMedia("(max-width: 899px)");
  const reduce = useReducedMotion();
  return small || reduce;
};
