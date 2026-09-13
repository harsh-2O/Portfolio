import { useEffect, useState } from 'react';

/**
 * Generic IntersectionObserver spy: returns the id of the element currently
 * crossing a horizontal band of the viewport. Elements are looked up by id on
 * each attach so late-mounting content is fine.
 */
export function useActiveId(ids: string[], rootMargin = '-35% 0px -55% 0px'): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || ids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin, threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
