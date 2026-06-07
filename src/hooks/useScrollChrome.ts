import { useEffect, useRef } from 'react';

function fadeElement(el: HTMLElement, show: boolean) {
  el.style.transition = 'opacity 0.3s ease, visibility 0.3s';
  el.style.opacity = show ? '1' : '0';
  el.style.visibility = show ? 'visible' : 'hidden';
}

/**
 * Controls hero scroll hint and scroll-to-top button visibility.
 */
export function useScrollChrome() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const update = () => {
      const indicator = scrollIndicatorRef.current;
      const topBtn = scrollToTopRef.current;
      if (!indicator || !topBtn) return;

      const vh = window.innerHeight;
      const heroBottom = document.getElementById('main-section')?.getBoundingClientRect().bottom ?? 0;
      const footerTop = document.getElementById('footer-section')?.getBoundingClientRect().top ?? 0;

      fadeElement(indicator, heroBottom > vh * 0.55);
      fadeElement(topBtn, footerTop < vh);
    };

    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          update();
          scrollTimeout = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return { scrollIndicatorRef, scrollToTopRef };
}
