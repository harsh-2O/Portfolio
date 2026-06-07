import styled from '@emotion/styled';
import { media } from '../../styles/mixins';

const Banner = styled.div`
  width: 100%;
  height: clamp(64px, 10vw, 120px);
  display: flex;
  align-items: center;
  overflow: hidden;
  overflow-x: clip;
  background: var(--text-primary);
  color: var(--background);
  margin: 0;
  position: relative;
  isolation: isolate;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(2rem, 8vw, 5rem);
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, var(--text-primary), transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(270deg, var(--text-primary), transparent);
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: marquee 80s linear infinite;
  will-change: transform;

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: 100%;
    justify-content: center;
    padding: 0 var(--section-padding-x);
  }
`;

const Text = styled.span`
  white-space: nowrap;
  font-size: clamp(0.9rem, 2.8vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  padding-right: 3rem;
  flex-shrink: 0;

  ${media.sm} {
    font-size: clamp(0.85rem, 3.5vw, 1.1rem);
    padding-right: 2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    white-space: normal;
    text-align: center;
    font-size: var(--text-small);
    font-weight: 500;
    line-height: 1.4;
    padding-right: 0;
  }
`;

const MARQUEE_TEXT =
  'Low-latency market data · Production RAG systems · C++ alpha frameworks · Global exchange integrations · AI/ML pipelines · Quant tooling · ';

export default function MarqueeBanner() {
  return (
    <Banner aria-hidden="true">
      <Track>
        <Text>{MARQUEE_TEXT}</Text>
        <Text>{MARQUEE_TEXT}</Text>
      </Track>
    </Banner>
  );
}
