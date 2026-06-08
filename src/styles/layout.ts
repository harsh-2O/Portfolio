import { css } from '@emotion/react';

/** Shared horizontal padding + max-width container used by every section. */
export const sectionContainer = css`
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding-left: max(var(--section-padding-x), env(safe-area-inset-left, 0px));
  padding-right: max(var(--section-padding-x), env(safe-area-inset-right, 0px));
`;

/** Standard section with vertical rhythm — no forced viewport heights on mobile/tablet. */
export const sectionCentered = css`
  ${sectionContainer};
  display: flex;
  flex-direction: column;
  padding-top: var(--section-padding-y);
  padding-bottom: var(--section-padding-y);
  position: relative;
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
`;

/** Alternating subtle band — gives light mode visual rhythm between sections. */
export const sectionBand = css`
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: var(--section-band);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(480px, 80%);
    height: 1px;
    background: var(--divider);
    pointer-events: none;
    z-index: 0;
    opacity: 0.7;
  }
`;

/** Shared elevated card surface — glass highlight + shadow */
export const cardSurface = css`
  background: var(--surface-elevated);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow), var(--card-highlight);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

/** Responsive heading scale — display serif for editorial luxury feel */
export const headingHero = css`
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.03em;
`;

/** Hero role subline */
export const headingRole = css`
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 4.5vw, 2.75rem);
  font-weight: 500;
  font-style: italic;
  line-height: 1.25;
  letter-spacing: -0.01em;
`;

export const headingSection = css`
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.08;
`;

export const bodyText = css`
  font-size: var(--text-body);
  line-height: 1.65;
`;
