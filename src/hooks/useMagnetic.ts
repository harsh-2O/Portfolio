import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from '../lib/motion';
import { magneticSpringOptions } from '../motion/variants';
import { useReducedMotion } from './useReducedMotion';

interface MagneticOptions {
  /** Fraction of the pointer offset the element follows. */
  strength?: number;
}

/**
 * Magnetic hover: the element drifts toward the pointer while hovered and
 * springs back on leave. Disabled for coarse pointers and reduced motion.
 */
export function useMagnetic<T extends HTMLElement>({ strength = 0.28 }: MagneticOptions = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<T>(null);
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, magneticSpringOptions);
  const springY = useSpring(y, magneticSpringOptions);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const enabled = fine && !reduced;

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [enabled, strength, x, y],
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: springX, y: springY, onPointerMove, onPointerLeave, enabled };
}
