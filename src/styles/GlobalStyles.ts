import { css } from '@emotion/react';
import { dark, light, paletteToCss, staticTokensToCss } from '../theme/tokens';

export const GlobalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Tokens ─────────────────────────────────────────────────────── */
  :root {
    ${staticTokensToCss()}
    ${paletteToCss(light)}

    /* fluid layout scale */
    --header-height: 60px;
    --text-nav: 1.125rem;
    --content-max: 100%;
    --section-padding-x: clamp(1.25rem, 3vw, 2.5rem);
    --section-padding-top: clamp(3rem, 5.5vw, 4.5rem);
    --section-padding-bottom: clamp(2.25rem, 4vw, 3.25rem);
    --section-padding-y-md: clamp(2.5rem, 4vw, 3.25rem);
    --section-header-space: clamp(1.5rem, 3vw, 2.5rem);
    --section-inner-gap: clamp(1.25rem, 2.5vw, 1.75rem);
    --section-gap: clamp(1.25rem, 2.5vw, 2rem);
    --block-gap: clamp(1rem, 2vw, 1.35rem);
    --footer-padding-top: clamp(2.5rem, 4.5vw, 3.75rem);
    --footer-padding-bottom: clamp(1.75rem, 3vw, 2.5rem);
    --text-hero: clamp(2.75rem, calc(6vw + 1.75rem), 8.5rem);
    --text-h1: clamp(1.875rem, calc(2.2vw + 1.35rem), 3.25rem);
    --text-h2: clamp(1.375rem, calc(1.75vw + 1rem), 2.5rem);
    --text-body: clamp(1rem, calc(0.55vw + 0.9rem), 1.1875rem);
    --text-small: clamp(0.875rem, calc(0.45vw + 0.8rem), 1rem);
  }

  :root.dark {
    ${paletteToCss(dark)}
  }

  /* ── Base ───────────────────────────────────────────────────────── */
  html {
    font-size: 16px;
    width: 100%;
    overflow-x: clip;
    -webkit-text-size-adjust: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  html::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  body {
    font-family: var(--font-primary);
    background-color: var(--background);
    color: var(--text-primary);
    line-height: 1.5;
    width: 100%;
    max-width: 100%;
    overflow-x: clip;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.01em;
    transition: background-color var(--transition), color var(--transition);
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  body::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  /* Theme switch: transition every colour once, then the class is removed. */
  html.theme-transition *,
  html.theme-transition *::before,
  html.theme-transition *::after {
    transition:
      background-color var(--transition),
      color var(--transition),
      border-color var(--transition),
      fill var(--transition),
      stroke var(--transition),
      box-shadow var(--transition) !important;
  }

  /* Custom cursor active: hide the native pointer except on text fields. */
  html.has-cursor,
  html.has-cursor * {
    cursor: none !important;
  }

  html.has-cursor input,
  html.has-cursor textarea,
  html.has-cursor select,
  html.has-cursor [contenteditable] {
    cursor: auto !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-display);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  code,
  kbd,
  samp,
  pre {
    font-family: var(--font-mono);
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color var(--transition);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-primary);
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: var(--radius-xs);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ::selection {
    background-color: rgba(var(--accent-rgb), 0.28);
  }

  /* Inner panes: thin scrollbar, visible on hover */
  * {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  *:hover {
    scrollbar-color: var(--scrollbar-thumb) transparent;
  }

  *::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: var(--radius-pill);
  }

  *:hover::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
  }

  *::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    z-index: 1000;
    padding: 0.75rem 1.25rem;
    background: var(--ink);
    color: var(--ink-text);
    border-radius: var(--radius-sm);
    font-weight: 500;
  }

  .skip-link:focus {
    top: 1rem;
  }

  /* Global marquee keyframes — Safari needs a document-level name, not Emotion-scoped hashes */
  @keyframes marquee-scroll {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  #root {
    width: 100%;
    min-height: 100dvh;
    overflow-x: clip;
  }

  @media (max-width: 1024px) {
    :root {
      --text-hero: clamp(2.5rem, calc(5.5vw + 1.5rem), 3.5rem);
      --text-nav: 1rem;
    }
  }

  @media (max-width: 768px) {
    :root {
      --header-height: calc(56px + env(safe-area-inset-top, 0px));
      --text-hero: clamp(2.375rem, calc(7.5vw + 1.25rem), 3rem);
      --text-h1: clamp(1.5rem, calc(4vw + 1rem), 2rem);
      --text-h2: clamp(1.125rem, calc(2vw + 0.9rem), 1.5rem);
      --text-body: 1rem;
      --section-padding-x: 1rem;
      --section-padding-top: clamp(2.5rem, 6vw, 3.25rem);
      --section-padding-bottom: clamp(2rem, 5vw, 2.75rem);
      --section-padding-y-md: clamp(2.25rem, 5vw, 3rem);
      --section-header-space: clamp(1.25rem, 3.5vw, 2rem);
      --section-inner-gap: 1.25rem;
      --section-gap: clamp(1rem, 3vw, 1.5rem);
      --block-gap: 1rem;
      --footer-padding-top: clamp(2rem, 5vw, 2.5rem);
      --footer-padding-bottom: clamp(1.5rem, 4vw, 2rem);
    }
  }

  @media (max-width: 480px) {
    :root {
      --text-hero: clamp(1.875rem, calc(8vw + 0.85rem), 2.25rem);
      --text-h1: clamp(1.375rem, calc(5vw + 0.85rem), 1.75rem);
      --section-padding-x: 0.875rem;
      --section-padding-top: 2.25rem;
      --section-padding-bottom: 2rem;
      --section-padding-y-md: 2rem;
      --section-header-space: 1.25rem;
      --section-inner-gap: 1rem;
      --section-gap: 1.125rem;
      --block-gap: 0.875rem;
      --footer-padding-top: 2rem;
      --footer-padding-bottom: 1.5rem;
    }
  }

  @media (min-width: 1536px) {
    :root {
      --section-padding-x: clamp(3rem, 5vw, 6rem);
    }
  }

  @media (min-width: 1920px) {
    :root {
      --section-padding-x: clamp(4rem, 6vw, 8rem);
    }
  }

  @media (min-width: 2560px) {
    :root {
      --section-padding-x: clamp(6rem, 8vw, 12rem);
    }
  }
`;
