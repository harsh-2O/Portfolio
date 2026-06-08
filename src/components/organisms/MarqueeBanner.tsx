import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const marqueeScroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Banner = styled.div`
  width: 100%;
  height: clamp(56px, 8vw, 88px);
  display: flex;
  align-items: center;
  overflow: hidden;
  overflow-x: clip;
  background: var(--marquee-bg);
  color: var(--accent-light);
  margin: 0;
  position: relative;
  isolation: isolate;
  border-top: 1px solid var(--card-border);
  border-bottom: 1px solid var(--card-border);

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
    background: linear-gradient(90deg, var(--marquee-bg), transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(270deg, var(--marquee-bg), transparent);
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${marqueeScroll} 90s linear infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: 100%;
    justify-content: center;
    padding: 0 var(--section-padding-x);
  }
`;

const Text = styled.span`
  white-space: nowrap;
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vw, 2.25rem);
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.02em;
  padding-right: 4rem;
  flex-shrink: 0;
  opacity: 0.92;

  @media (max-width: 480px) {
    font-size: clamp(0.95rem, 3vw, 1.15rem);
    padding-right: 2.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    white-space: normal;
    text-align: center;
    font-size: var(--text-small);
    font-style: normal;
    line-height: 1.4;
    padding-right: 0;
  }
`;

const MARQUEE_TEXT =
  'Market data infrastructure · Alpha frameworks · Production RAG · Global exchange integrations · AI/ML pipelines · Quant tooling · ';

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
