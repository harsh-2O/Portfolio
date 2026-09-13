/**
 * Centralised framer-motion variants and transitions.
 * Every duration and easing references `theme/tokens` — no magic numbers here.
 */
import type { Transition, Variants } from '../lib/motion';
import { durations, easings, springs } from '../theme/tokens';

export const transitions = {
  fast: { duration: durations.fast, ease: easings.standard },
  base: { duration: durations.base, ease: easings.standard },
  out: { duration: durations.slow, ease: easings.out },
  slow: { duration: durations.slower, ease: easings.out },
} satisfies Record<string, Transition>;

/* ── Section / list entrances ────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.out },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.out },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitions.out },
};

/* ── Disclosure ──────────────────────────────────────────────────── */

export const expandHeight: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: durations.base, ease: easings.inOut },
      opacity: { duration: durations.fast },
    },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: durations.base, ease: easings.out },
      opacity: { duration: durations.base, delay: 0.05 },
    },
  },
};

/* ── Overlays ────────────────────────────────────────────────────── */

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
  exit: { opacity: 0, transition: transitions.fast },
};

export const panelIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: durations.base, ease: easings.out } },
  exit: { opacity: 0, y: 8, scale: 0.985, transition: transitions.fast },
};

/* ── Shared transitions ──────────────────────────────────────────── */

export const navIndicator: Transition = springs.snappy;
export const cursorSpring: Transition = springs.cursor;
export const softSpring: Transition = springs.soft;
export const magneticSpring: Transition = springs.magnetic;

/** `useSpring` takes bare spring options (no `type`). */
export const cursorSpringOptions = {
  stiffness: springs.cursor.stiffness,
  damping: springs.cursor.damping,
  mass: springs.cursor.mass,
};

/* ── Hero ────────────────────────────────────────────────────────── */

export const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: easings.out } },
};

export const magneticSpringOptions = {
  stiffness: springs.magnetic.stiffness,
  damping: springs.magnetic.damping,
  mass: springs.magnetic.mass,
};

/** Icon swap used by copy chips: copy glyph out, check glyph in. */
export const iconSwap: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -45 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: durations.base, ease: easings.out } },
  exit: { opacity: 0, scale: 0.6, rotate: 45, transition: transitions.fast },
};
