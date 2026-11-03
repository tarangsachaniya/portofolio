import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { profile } from "@/lib/data";
import { useTheme } from "@/hooks/useTheme";
import { useClock } from "@/hooks/useClock";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { n: "01", label: "Readme", href: "#readme" },
  { n: "02", label: "Story", href: "#story" },
  { n: "03", label: "Work", href: "#work" },
  { n: "04", label: "Bench", href: "#bench" },
  { n: "05", label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const time = useClock(profile.timezone);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled || open ? "border-line bg-paper" : "border-transparent bg-transparent",
        )}
      >
        <nav className="wrap flex h-16 items-center justify-between gap-6" aria-label="Primary">
          <a href="#top" className="font-mono text-sm font-semibold tracking-tight" aria-label="Tarang Sachaniya — home">
            {profile.handle}
            <span className="animate-blink text-signal" aria-hidden>
              _
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group text-sm font-medium text-ink-2 transition-colors hover:text-ink">
                  <span className="mr-1.5 font-mono text-[0.7rem] text-ink-3 group-hover:text-signal-ink">{l.n}</span>
                  <span className="ulink">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="hidden text-meta text-ink-3 md:inline" title="Local time in Ahmedabad">
              AMD <time className="tabular-nums text-ink-2">{time}</time> IST
            </span>
            <button
              type="button"
              onClick={toggle}
              className="text-meta rounded-full border border-line-strong px-3 py-1.5 text-ink-2 transition-colors hover:border-ink hover:text-ink"
              aria-label={`Switch to ${theme === "dark" ? "day" : "night"} mode`}
            >
              {theme === "dark" ? "Day" : "Night"}
            </button>
            <button
              type="button"
              className="text-meta rounded-full bg-ink px-3.5 py-1.5 text-paper lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-5 pb-8 pt-24 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: ease.inOut }}
          >
            <ul className="space-y-1">
              {LINKS.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: ease.out }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-3 text-[2.6rem] font-bold leading-none tracking-[-0.04em]"
                  >
                    <span className="font-mono text-xs font-normal text-ink-3">{l.n}</span>
                    {l.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="flex justify-between text-meta text-ink-3">
              <span>{profile.location}</span>
              <span className="tabular-nums">{time} IST</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
