import { css } from '@emotion/react';

/** Shared horizontal padding + max-width container used by every section. */
export const sectionContainer = css`
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding-left: max(var(--section-padding-x), env(safe-area-inset-left, 0px));
  padding-right: max(var(--section-padding-x), env(safe-area-inset-right, 0px));
`;

/** Standard section with vertical rhythm — asymmetric padding avoids double gaps between sections. */
export const sectionCentered = css`
  ${sectionContainer};
  display: flex;
  flex-direction: column;
  gap: var(--section-inner-gap);
  padding-top: var(--section-padding-top);
  padding-bottom: var(--section-padding-bottom);
  position: relative;
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
    background: var(--band-tint);
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
    background: var(--border);
    pointer-events: none;
    z-index: 0;
    opacity: 0.7;
  }
`;

/** Responsive heading scale */
export const headingHero = css`
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.045em;
`;

/** Hero role subline — extra line-height for descenders + gradient text clip */
export const headingRole = css`
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 4vw, 2.5rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
`;

export const headingSection = css`
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
`;

export const bodyText = css`
  font-size: var(--text-body);
  line-height: 1.65;
`;

/** Mask for the hero market motif: strongest top-right, receding toward the copy. */
export const motifMask = css`
  mask-image: radial-gradient(140% 110% at 88% 30%, #000 25%, transparent 78%);
  -webkit-mask-image: radial-gradient(140% 110% at 88% 30%, #000 25%, transparent 78%);

  @media (max-width: 768px) {
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 45%, #000 70%, #000 100%);
    -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 45%, #000 70%, #000 100%);
  }
`;
