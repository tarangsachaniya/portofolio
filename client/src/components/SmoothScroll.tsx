import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inertial scrolling for wheel/trackpad. Native on touch, off entirely for
 * reduced motion. Anchor links are routed through Lenis so they glide too.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -72 } });
    document.documentElement.style.scrollBehavior = "auto";
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
  return null;
}
