import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export const ROLE_TEXTS = [
  'Quant Tools Developer',
  'AI/ML Engineer',
  'Full Stack Developer',
  'Low-latency Systems',
];

function fadeIn(el: HTMLElement, delay = 0) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  window.setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, delay);
}

/**
 * Hero role crossfade — keeps LCP text visible immediately (no typewriter wipe).
 */
export function useHeroAnimation() {
  const titleSpanRef = useRef<HTMLSpanElement>(null);
  const plusSignRef = useRef<HTMLSpanElement>(null);
  const changingTextRef = useRef<HTMLSpanElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const changingEl = changingTextRef.current;
    const contactEl = contactInfoRef.current;
    const descEl = descriptionRef.current;
    const badgesEl = badgesRef.current;

    if (!changingEl) return;

    if (reducedMotion) return;

    let roleIndex = 0;
    let roleTimeout: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const cycleRole = () => {
      if (cancelled) return;
      changingEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      changingEl.style.opacity = '0';
      changingEl.style.transform = 'translateY(-8px)';

      window.setTimeout(() => {
        if (cancelled) return;
        roleIndex = (roleIndex + 1) % ROLE_TEXTS.length;
        changingEl.textContent = ROLE_TEXTS[roleIndex];
        changingEl.style.opacity = '1';
        changingEl.style.transform = 'translateY(0)';
        roleTimeout = window.setTimeout(cycleRole, 3000);
      }, 350);
    };

    if (badgesEl) fadeIn(badgesEl, 200);
    if (contactEl) fadeIn(contactEl, 400);
    if (descEl) fadeIn(descEl, 550);

    roleTimeout = window.setTimeout(cycleRole, 3000);

    return () => {
      cancelled = true;
      if (roleTimeout) clearTimeout(roleTimeout);
    };
  }, [reducedMotion]);

  return { titleSpanRef, plusSignRef, changingTextRef, contactInfoRef, descriptionRef, badgesRef };
}
