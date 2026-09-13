/**
 * LazyMotion-compatible motion primitives — `m` under the hood for tree-shaking.
 * Import from here instead of 'framer-motion' directly.
 */
export {
  m as motion,
  AnimatePresence,
  LazyMotion,
  LayoutGroup,
  MotionConfig,
  domAnimation,
  domMax,
  useAnimation,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

export type { MotionValue, Transition, Variants } from 'framer-motion';
