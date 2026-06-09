import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SplashProps {
  /** Called once the splash has fully faded out. */
  onDone: () => void;
  /** How long the branded screen stays before fading (ms). */
  duration?: number;
}

/**
 * Branded full-screen loader showing the "TS" mark, ~1s, then fades away.
 */
export default function Splash({ onDone, duration = 350 }: SplashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisible(false), reduced ? 200 : duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-6 rounded-3xl bg-accent-indigo/30 blur-2xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-accent-indigo/40 bg-surface">
              <span className="font-display text-4xl font-extrabold tracking-tight text-gradient">
                TS
              </span>
              {/* Draw line under the mark */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
                className="absolute bottom-4 left-1/2 h-0.5 w-10 -translate-x-1/2 origin-left rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Tarang Sachaniya
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
