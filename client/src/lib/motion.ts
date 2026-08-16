import type { Transition, Variants } from "framer-motion";

/**
 * Single source of truth for motion. Components import prop bundles from here
 * instead of hand-writing initial/whileInView/viewport/transition on every node.
 *
 * Stagger rule: a staggered child declares `variants` and MUST NOT declare
 * initial/animate/whileInView — any explicit prop severs variant propagation
 * from the parent and silently breaks the stagger.
 */

/* ── easing ─────────────────────────────────────────────── */
export const ease = {
  /** expo-out — default for entrances */
  out: [0.16, 1, 0.3, 1],
  /** symmetric — wipes, beams, draws */
  inOut: [0.65, 0, 0.35, 1],
  /** slight overshoot — badges, pills, carets */
  back: [0.34, 1.4, 0.64, 1],
} as const;

/* ── durations (seconds) ────────────────────────────────── */
export const dur = {
  xs: 0.18,
  fast: 0.28,
  base: 0.5,
  slow: 0.8,
  wipe: 1.1,
} as const;

/* ── springs ────────────────────────────────────────────── */
export const spring = {
  /** cards, section blocks */
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 0.6 },
  /** buttons, cursor, magnetic */
  snappy: { type: "spring", stiffness: 380, damping: 30, mass: 0.5 },
  /** 3D tilt — must settle fast or it feels rubbery */
  tilt: { type: "spring", stiffness: 220, damping: 22, mass: 0.4 },
  /** scroll-linked smoothing */
  beam: { type: "spring", stiffness: 120, damping: 30, restDelta: 0.001 },
} satisfies Record<string, Transition>;

export const t = (duration: number = dur.base, delay = 0): Transition => ({
  duration,
  delay,
  ease: ease.out,
});

/* ── viewport presets ───────────────────────────────────── */
export const viewport = { once: true, amount: 0.25 } as const;
/** for tall blocks that would otherwise trigger too late */
export const viewportEarly = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -12% 0px",
} as const;

/* ── entrance variants ──────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: t() },
};

export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: t(dur.fast) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t() },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: spring.soft },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: dur.fast, ease: ease.back },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: t() },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: t() },
};

/** signature Terminal reveal — a horizontal wipe */
export const wipeIn: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: dur.wipe, ease: ease.inOut },
  },
};

/** rule/underline draw — scaleX is composited; never animate `width` */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: dur.slow, ease: ease.inOut },
  },
};

/** blur is paint-heavy — use on display type only, never many nodes at once */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 12 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: t(dur.slow),
  },
};

/* ── stagger containers ─────────────────────────────────── */
/** `hidden: {}` is required — without it children never inherit the label. */
export const stagger = (each = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

export const staggerReverse = (each = 0.07): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, staggerDirection: -1 } },
});

/* ── prop bundles ───────────────────────────────────────── */
export const reveal = {
  variants: fadeUp,
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport,
};

/**
 * Budget: children * each <= ~0.5s. A 20+ item grid wants each ≈ 0.02,
 * not 0.08 — otherwise the last item lands nearly two seconds late.
 */
export const revealGroup = (each = 0.08) => ({
  variants: stagger(each),
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport,
});

/** on-mount, for above-the-fold content with no scroll trigger */
export const enter = {
  variants: fadeUp,
  initial: "hidden" as const,
  animate: "show" as const,
};

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: dur.xs, ease: ease.out } },
  whileTap: { scale: 0.985 },
};
