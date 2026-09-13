/**
 * Smooth scroll (Lenis) singleton plus the helpers every scroll consumer uses.
 * Under `prefers-reduced-motion` Lenis is never created and jumps are instant.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { emit } from './events';

let lenis: Lenis | null = null;
let lockCount = 0;

/** Pending drift-correction timers for the current programmatic scroll. */
let pendingTimers: number[] = [];

const DRIFT_TOLERANCE_PX = 4;
const VERIFY_DELAYS_MS = [120, 600];
const MAX_CORRECTIONS = 3;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Creates the Lenis instance. Returns a disposer. No-op under reduced motion. */
export function initSmoothScroll(): () => void {
  if (lenis || prefersReducedMotion()) return () => {};
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    anchors: false,
  });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

export const getLenis = () => lenis;

/** Current fixed-header height in px (from the CSS variable). */
export function headerOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 60;
}

function clearPending() {
  pendingTimers.forEach((t) => window.clearTimeout(t));
  pendingTimers = [];
}

interface ScrollOptions {
  /** Pixel offset applied to element targets. Defaults to the negative header height. */
  offset?: number;
  immediate?: boolean;
}

/**
 * Scrolls an element into position. Lazy sections can mount mid-flight and move
 * the target, so after settling we re-measure and correct any drift.
 */
function scrollElement(el: HTMLElement, offset: number, immediate: boolean, correction = 0) {
  const verify = () => {
    if (correction >= MAX_CORRECTIONS) return;
    VERIFY_DELAYS_MS.forEach((delay) => {
      pendingTimers.push(
        window.setTimeout(() => {
          const drift = el.getBoundingClientRect().top + offset;
          if (Math.abs(drift) > DRIFT_TOLERANCE_PX) {
            clearPending();
            scrollElement(el, offset, immediate, correction + 1);
          }
        }, delay),
      );
    });
  };

  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      immediate,
      // Corrections use a quicker lerp so they read as a settle, not a second journey.
      lerp: immediate ? undefined : correction > 0 ? 0.18 : 0.1,
      onComplete: verify,
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
  // Native smooth scroll has no completion callback; verify after a generous settle.
  pendingTimers.push(window.setTimeout(verify, immediate ? 0 : 700));
}

/** Scrolls to a pixel position, element, or element id. Returns false if the element is missing. */
export function scrollToTarget(
  target: number | string | HTMLElement,
  { offset, immediate }: ScrollOptions = {},
): boolean {
  clearPending();
  const instant = immediate || prefersReducedMotion();

  if (typeof target === 'number') {
    if (lenis) lenis.scrollTo(target, { immediate: instant });
    else window.scrollTo({ top: target, behavior: instant ? 'auto' : 'smooth' });
    return true;
  }

  const el =
    typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target;
  if (!el) return false;

  scrollElement(el, offset ?? -headerOffset(), instant);
  return true;
}

/**
 * Scrolls to a section that may not be mounted yet (below-fold content is lazy).
 * Mounts every lazy wrapper first so heights stabilise, then retries until the id exists.
 */
export function scrollToSection(id: string): void {
  if (id === 'main-section') {
    scrollToTarget(0);
    return;
  }
  emit('reveal-below-fold');
  emit('mount-all');
  let tries = 0;
  const attempt = () => {
    if (scrollToTarget(id)) return;
    if (++tries < 90) requestAnimationFrame(attempt);
  };
  attempt();
}

/** Reference-counted scroll lock for menus, modals and the command palette. */
export function lockScroll(): void {
  lockCount += 1;
  if (lockCount > 1) return;
  if (lenis) lenis.stop();
  else document.documentElement.style.overflow = 'hidden';
}

export function unlockScroll(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;
  if (lenis) lenis.start();
  else document.documentElement.style.overflow = '';
}
