import { useCallback, useRef, useState } from 'react';
import { useMotionValue, useSpring } from '../lib/motion';
import { useReducedMotion } from './useReducedMotion';

interface TiltOptions {
  /** Maximum rotation in degrees on each axis. */
  max?: number;
}

/**
 * Pointer-driven 3D tilt with a specular highlight position.
 * Disabled under reduced motion and for non-mouse pointers.
 */
export function useTilt<T extends HTMLElement>({ max = 6 }: TiltOptions = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(rx, spring);
  const rotateY = useSpring(ry, spring);

  // Highlight centre in percent, tracked separately so it can lag-free follow.
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      rx.set((0.5 - ny) * 2 * max);
      ry.set((nx - 0.5) * 2 * max);
      setGlow({ x: nx * 100, y: ny * 100 });
      setActive(true);
    },
    [reduced, max, rx, ry],
  );

  const onPointerLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
    setActive(false);
  }, [rx, ry]);

  return { ref, rotateX, rotateY, glow, active, onPointerMove, onPointerLeave, enabled: !reduced };
}
