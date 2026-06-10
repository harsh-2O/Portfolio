import { useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';

const Banner = styled.div`
  width: 100%;
  height: clamp(64px, 10vw, 120px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--marquee-bg);
  color: #fff;
  margin: 0;
  position: relative;
  isolation: isolate;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(3rem, 10vw, 6rem);
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.45), transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0.45), transparent);
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  flex-shrink: 0;
  animation: marquee-scroll 80s linear infinite;
  -webkit-animation: marquee-scroll 80s linear infinite;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    -webkit-animation: none !important;
    width: 100%;
    justify-content: center;
    padding: 0 var(--section-padding-x);
    transform: none;
  }
`;

const Text = styled.span`
  white-space: nowrap;
  font-size: clamp(0.9rem, 2.8vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  padding-right: 3rem;
  flex-shrink: 0;

  @media (max-width: 480px) {
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

/** Restart animation after lazy mount — Safari/WebKit won't start Emotion/lazy-inserted animations reliably. */
function restartAnimation(el: HTMLElement) {
  el.style.animation = 'none';
  el.style.webkitAnimation = 'none';
  void el.getBoundingClientRect();
  el.style.removeProperty('animation');
  el.style.removeProperty('-webkit-animation');
}

export default function MarqueeBanner() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    restartAnimation(track);

    // Safari sometimes pauses animations for off-screen lazy content until visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) restartAnimation(track);
      },
      { threshold: 0 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <Banner aria-hidden="true">
      <Track ref={trackRef} className="marquee-track">
        <Text>{MARQUEE_TEXT}</Text>
        <Text>{MARQUEE_TEXT}</Text>
      </Track>
    </Banner>
  );
}
