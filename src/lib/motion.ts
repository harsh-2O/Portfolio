/**
 * LazyMotion-compatible motion primitives — use `m` under the hood for tree-shaking.
 * Import from here instead of 'framer-motion' directly.
 */
export {
  m as motion,
  AnimatePresence,
  useAnimation,
  LazyMotion,
  domAnimation,
} from 'framer-motion';

export type { Variants } from 'framer-motion';
