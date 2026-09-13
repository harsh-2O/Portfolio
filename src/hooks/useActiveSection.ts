import { useEffect, useState } from 'react';
import type { SectionSpec } from '../data/navigation';
import type { NavSection } from '../types';

/** Viewport band (from the top) that decides the active section. */
const BAND_ROOT_MARGIN = '-40% 0px -55% 0px';
const RETRY_MS = 500;
const MAX_RETRIES = 12;

/**
 * IntersectionObserver scroll-spy. A section is active while it crosses a thin
 * band 40% down the viewport. Sections that mount late (lazy below-fold content)
 * are picked up by retrying; `refreshKey` forces a re-attach.
 */
export function useActiveSection(specs: SectionSpec[], refreshKey: unknown): NavSection {
  const [active, setActive] = useState<NavSection>('home');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const navById = new Map(specs.map((s) => [s.id, s.nav]));
    let observer: IntersectionObserver | null = null;
    let retryTimer: number | undefined;
    let attempts = 0;

    const attach = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const nav = navById.get(entry.target.id);
            if (nav) setActive(nav);
          }
        },
        { rootMargin: BAND_ROOT_MARGIN, threshold: 0 },
      );

      let missing = 0;
      for (const id of navById.keys()) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
        else missing += 1;
      }
      if (missing > 0 && attempts < MAX_RETRIES) {
        attempts += 1;
        retryTimer = window.setTimeout(attach, RETRY_MS);
      }
    };

    // Short final sections may never reach the band; treat page bottom as the last section.
    const last = specs[specs.length - 1];
    const onScroll = () => {
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom && last) setActive(last.nav);
    };

    attach();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.clearTimeout(retryTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [specs, refreshKey]);

  return active;
}
