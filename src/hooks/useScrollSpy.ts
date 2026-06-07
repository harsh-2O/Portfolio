import { useEffect, useState } from 'react';
import type { NavSection } from '../types';

const SECTION_IDS: { id: string; section: NavSection }[] = [
  { id: 'footer-section', section: 'contact' },
  { id: 'blog-section', section: 'blog' },
  { id: 'projects-section', section: 'projects' },
  { id: 'resume-section', section: 'resume' },
];

/**
 * Tracks which nav section is active based on scroll position.
 * Uses viewport midpoint (innerHeight / 2) as the activation threshold —
 * a section is "active" once its top crosses above the screen center.
 */
export function useScrollSpy(isMenuOpen: boolean) {
  const [activeSection, setActiveSection] = useState<NavSection>('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isMenuOpen || ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const threshold = window.innerHeight / 2;

        for (const { id, section } of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < threshold) {
            setActiveSection(section);
            ticking = false;
            return;
          }
        }
        setActiveSection('home');
        ticking = false;
      });
    };

    const attach = () => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    };

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(attach, { timeout: 1500 })
      : window.setTimeout(attach, 300);

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as number);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return activeSection;
}
