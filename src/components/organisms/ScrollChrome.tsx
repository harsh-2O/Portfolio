import styled from '@emotion/styled';

interface ScrollChromeProps {
  scrollIndicatorRef: React.RefObject<HTMLDivElement | null>;
  scrollToTopRef: React.RefObject<HTMLButtonElement | null>;
  onScrollToTop: () => void;
}

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 42px;
  border: 2px solid var(--text-primary);
  border-radius: 20px;
  opacity: 0;
  visibility: hidden;
  z-index: 40;
  pointer-events: none;
  transition: opacity var(--transition), visibility var(--transition);

  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: var(--text-primary);
    border-radius: 2px;
    animation: scrollDot 2s infinite;
  }

  @keyframes scrollDot {
    0% { top: 6px; opacity: 1; }
    50% { top: 24px; opacity: 0.5; }
    100% { top: 6px; opacity: 1; }
  }

  @media (max-width: 768px) {
    bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; }
  }
`;

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--nav-bg);
  color: var(--nav-text);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 50;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }

  svg { width: 20px; height: 20px; }

  @media (max-width: 768px) {
    bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
    right: max(1rem, env(safe-area-inset-right, 0px));
    width: 44px;
    height: 44px;
  }
`;

export default function ScrollChrome({
  scrollIndicatorRef,
  scrollToTopRef,
  onScrollToTop,
}: ScrollChromeProps) {
  return (
    <>
      <ScrollIndicator ref={scrollIndicatorRef} aria-hidden="true" />
      <ScrollToTop
        ref={scrollToTopRef}
        onClick={onScrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="36 30 24 18 12 30" />
        </svg>
      </ScrollToTop>
    </>
  );
}
