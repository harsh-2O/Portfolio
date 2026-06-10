import { lazy, Suspense, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Header from '../components/organisms/Header';
import ScrollChrome from '../components/organisms/ScrollChrome';
import HeroSection from '../components/organisms/HeroSection';
import SectionFallback from '../components/atoms/SectionFallback';
import { useHeroAnimation } from '../hooks/useHeroAnimation';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrollChrome } from '../hooks/useScrollChrome';

const BelowFold = lazy(() => import('../components/templates/BelowFold'));

const Page = styled.div`
  width: 100%;
  max-width: 100%;
  background: var(--background);
  color: var(--text-primary);
  transition: background-color var(--transition), color var(--transition);
  overflow-x: clip;
`;

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    let ticking = false;
    const update = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollH > 0 ? (window.scrollY / scrollH) * 100 : 0;
      bar.style.width = `${pct}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBelowFold, setShowBelowFold] = useState(false);
  const heroRefs = useHeroAnimation();
  const activeSection = useScrollSpy(isMenuOpen);
  const chromeRefs = useScrollChrome();
  useScrollProgress();

  useEffect(() => {
    const reveal = () => setShowBelowFold(true);

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(reveal, { timeout: 2000 })
      : window.setTimeout(reveal, 1200);

    const onScroll = () => {
      reveal();
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as number);
      }
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" />
      <Page>
        <Header
          activeSection={activeSection}
          isMenuOpen={isMenuOpen}
          onMenuToggle={setIsMenuOpen}
        />
        <HeroSection {...heroRefs} />
        {showBelowFold ? (
          <Suspense fallback={<SectionFallback minHeight={480} />}>
            <BelowFold />
          </Suspense>
        ) : (
          <SectionFallback minHeight={480} />
        )}
      </Page>
      <ScrollChrome
        scrollIndicatorRef={chromeRefs.scrollIndicatorRef}
        scrollToTopRef={chromeRefs.scrollToTopRef}
        onScrollToTop={scrollToTop}
      />
    </>
  );
}
