import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/=+-*';
const FLICKER_EVERY_FRAMES = 3;

interface ScrambleOptions {
  /** Begin decoding when true (e.g. once the intro has finished). */
  start: boolean;
  /** Total decode time in ms. */
  duration?: number;
  /** Delay before the first character resolves, in ms. */
  delay?: number;
}

/**
 * Decode effect: characters flicker through glyphs and resolve left to right,
 * once. Under reduced motion the target renders immediately.
 */
export function useTextScramble(target: string, { start, duration = 1100, delay = 0 }: ScrambleOptions) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(() => (reduced ? target : ''));
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setText(target);
      setDone(true);
      return;
    }
    if (!start) return;

    const n = target.length;
    const resolveAt = Array.from(
      { length: n },
      (_, i) => delay + (i / Math.max(1, n - 1)) * duration * 0.7 + Math.random() * duration * 0.3,
    );
    const t0 = performance.now();
    let frame = 0;
    let raf = 0;

    const tick = (now: number) => {
      const t = now - t0;
      frame += 1;
      const flicker = Math.floor(frame / FLICKER_EVERY_FRAMES);
      let out = '';
      let allDone = true;

      for (let i = 0; i < n; i++) {
        const ch = target[i];
        if (ch === ' ') {
          out += ' ';
          continue;
        }
        if (t >= resolveAt[i]) {
          out += ch;
        } else {
          allDone = false;
          out += t < delay ? ' ' : GLYPHS[(i * 7 + flicker * 13) % GLYPHS.length];
        }
      }

      setText(out);
      if (allDone) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, reduced, duration, delay]);

  return { text, done };
}
