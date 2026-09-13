import { useEffect } from 'react';
import { initSmoothScroll } from '../lib/scroll';

/** Boots the Lenis smooth-scroll singleton for the app lifetime. */
export function useLenis(): void {
  useEffect(() => initSmoothScroll(), []);
}
