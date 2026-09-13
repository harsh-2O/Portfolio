/**
 * Hero — h1 in Cormorant, decoded role line, lede, magnetic CTAs, copy chips,
 * status chip and a mono facts row, over a lazy WebGL market-data backdrop.
 */
import { lazy, Suspense, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from '../../lib/motion';
import { heroContainer, heroItem } from '../../motion/variants';
import { CONTACT, HERO, HERO_FACTS, STATUS } from '../../config/site';
import { useIntro } from '../../context/IntroContext';
import { useTextScramble } from '../../hooks/useTextScramble';
import { scrollToSection } from '../../lib/scroll';
import { GRID_STEP } from '../../lib/marketLayout';
import { sectionContainer, headingHero, motifMask } from '../../styles/layout';
import { media } from '../../styles/mixins';
import ErrorBoundary from '../atoms/ErrorBoundary';
import MagneticButton from '../atoms/MagneticButton';
import CopyChip from '../atoms/CopyChip';
import StatusChip from '../molecules/StatusChip';

const MarketCanvas = lazy(() => import('../molecules/MarketCanvas'));

/* ── Layout ──────────────────────────────────────────────────────── */

const Section = styled.section`
  ${sectionContainer};
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  margin-top: var(--header-height);
  padding-top: clamp(2.5rem, 6vh, 5rem);
  padding-bottom: clamp(1.75rem, 3.5vw, 2.75rem);
  overflow: hidden;

  ${media.lgUp} {
    min-height: calc(100dvh - var(--header-height));
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

/* The grid is CSS so it paints instantly and survives a missing WebGL context. */
const GridLines = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: ${GRID_STEP}px ${GRID_STEP}px;
  opacity: 0.7;
  ${motifMask};
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(1.1rem, 2.2vw, 1.75rem);
  max-width: 60rem;
  min-width: 0;
`;

const Name = styled(motion.h1)`
  ${headingHero};
  color: var(--text-primary);
  overflow-wrap: anywhere;
  padding-bottom: 0.04em;
  margin-top: 0.25rem;
`;

const Role = styled(motion.p)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 1.6em;
  font-family: var(--font-mono);
  font-size: clamp(0.85rem, 0.5vw + 0.72rem, 1.05rem);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-primary);

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: var(--accent);
    flex-shrink: 0;
  }
`;

const Caret = styled.span<{ $on: boolean }>`
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  background: var(--accent);
  opacity: ${({ $on }) => ($on ? 1 : 0)};
  transition: opacity var(--transition-fast);
`;

const Lede = styled(motion.p)`
  max-width: 36rem;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 1vw + 0.9rem, 1.75rem);
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.015em;
  color: var(--text-muted);
`;

const Actions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-top: 0.25rem;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  ${media.mdUp} {
    margin-left: 0.5rem;
  }
`;

const Facts = styled(motion.dl)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2.5rem;
  margin-top: clamp(2.5rem, 6vh, 4rem);
  padding-top: 1.1rem;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;

  ${media.lgUp} {
    margin-top: auto;
  }
`;

const Fact = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.6rem;

  dt {
    text-transform: uppercase;
    color: var(--text-faint);
  }

  dd {
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
`;

/* ── Component ───────────────────────────────────────────────────── */

export default function HeroSection() {
  const { introDone } = useIntro();
  const { text: role, done: roleDone } = useTextScramble(HERO.role, { start: introDone, delay: 380 });
  const [mountCanvas, setMountCanvas] = useState(false);
  // If no intro plays (repeat visit, reduced motion) render the settled state at once for LCP.
  const [skipEntrance] = useState(introDone);

  useEffect(() => {
    if (!introDone) return;
    const start = () => setMountCanvas(true);
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 300);
    return () => window.clearTimeout(id);
  }, [introDone]);

  return (
    <Section id="main-section" aria-labelledby="hero-title">
      <Backdrop aria-hidden="true">
        <GridLines />
        {mountCanvas && (
          <ErrorBoundary>
            <Suspense fallback={null}>
              <MarketCanvas />
            </Suspense>
          </ErrorBoundary>
        )}
      </Backdrop>

      <Content
        variants={heroContainer}
        initial={skipEntrance ? false : 'hidden'}
        animate={introDone ? 'visible' : 'hidden'}
      >
        <motion.div variants={heroItem}>
          <StatusChip label={STATUS.label} now={STATUS.now} next={STATUS.next} />
        </motion.div>

        <Name id="hero-title" variants={heroItem}>
          Harsh Mehta
        </Name>

        <Role variants={heroItem}>
          <span aria-hidden="true">{role}</span>
          <Caret aria-hidden="true" $on={!roleDone} />
          <span className="sr-only">{HERO.role}</span>
        </Role>

        <Lede variants={heroItem}>{HERO.lede}</Lede>

        <Actions variants={heroItem}>
          <MagneticButton onClick={() => scrollToSection('footer-section')} data-cursor="Talk">
            Let&apos;s talk
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToSection('projects-section')} data-cursor="Work">
            View work
          </MagneticButton>
          <Chips>
            <CopyChip value={CONTACT.email} label="Email address" />
            <CopyChip value={CONTACT.phone} label="Phone number" />
          </Chips>
        </Actions>
      </Content>

      <Facts
        variants={heroItem}
        initial={skipEntrance ? false : 'hidden'}
        animate={introDone ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
      >
        {HERO_FACTS.map((f) => (
          <Fact key={f.key}>
            <dt>{f.key}</dt>
            <dd>{f.value}</dd>
          </Fact>
        ))}
      </Facts>
    </Section>
  );
}
