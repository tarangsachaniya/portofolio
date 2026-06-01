import { useEffect, useRef, useState } from "react";

/**
 * Minimal dot cursor for desktop (fine pointer) devices. A small dot tracks the
 * pointer precisely; a larger ring trails it and grows over interactive targets.
 * Hidden entirely on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let raf = 0;
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setHidden(false);
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest('a, button, [role="button"], input, textarea, select, label')
      );
    };

    const onLeave = () => setHidden(true);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.2s" }}
      aria-hidden
    >
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent-indigo"
      />
      <div
        ref={ringRef}
        className="absolute rounded-full border border-accent-indigo/60 transition-[width,height,margin,background-color] duration-200"
        style={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          marginLeft: hovering ? -22 : -14,
          marginTop: hovering ? -22 : -14,
          backgroundColor: hovering ? "hsl(var(--accent-indigo) / 0.1)" : "transparent",
        }}
      />
    </div>
  );
}
