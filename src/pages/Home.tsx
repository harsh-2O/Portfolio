import { lazy, Suspense, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Header from '../components/organisms/Header';
import HeroSection from '../components/organisms/HeroSection';
import SectionFallback from '../components/atoms/SectionFallback';
import { useActiveSection } from '../hooks/useActiveSection';
import { SECTION_SPECS } from '../data/navigation';
import { on } from '../lib/events';

const BelowFold = lazy(() => import('../components/templates/BelowFold'));

const Page = styled.div`
  width: 100%;
  max-width: 100%;
  background: var(--background);
  color: var(--text-primary);
  overflow-x: clip;
`;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBelowFold, setShowBelowFold] = useState(false);
  const activeSection = useActiveSection(SECTION_SPECS, showBelowFold);

  useEffect(() => {
    const reveal = () => setShowBelowFold(true);

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(reveal, { timeout: 2000 })
      : window.setTimeout(reveal, 1200);

    window.addEventListener('scroll', reveal, { passive: true, once: true });
    const off = on('reveal-below-fold', reveal);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId as number);
      else clearTimeout(idleId as number);
      window.removeEventListener('scroll', reveal);
      off();
    };
  }, []);

  return (
    <Page>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header activeSection={activeSection} isMenuOpen={isMenuOpen} onMenuToggle={setIsMenuOpen} />
      <main id="main">
        <HeroSection />
        {showBelowFold ? (
          <Suspense fallback={<SectionFallback minHeight={480} />}>
            <BelowFold />
          </Suspense>
        ) : (
          <SectionFallback minHeight={480} />
        )}
      </main>
    </Page>
  );
}
