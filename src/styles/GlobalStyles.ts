import { css } from '@emotion/react';

export const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* Old-money palette — parchment, charcoal, champagne gold */
    --gold: #b8956a;
    --gold-light: #d4b87a;
    --gold-muted: rgba(184, 149, 106, 0.55);
    --navy: #1a2744;
    --navy-deep: #0f1829;

    --accent: var(--gold);
    --accent-light: var(--gold-light);
    --accent-purple: #4a5568;
    --accent-teal: #5c6b7a;
    --accent-violet: #6b5b4f;
    --accent-green: #5a7a62;
    --accent-gradient: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 55%, #8a7048 100%);

    --primary: #141210;
    --primary-rgb: 20, 18, 16;
    --secondary: #f5f0e8;
    --text-primary: #141210;
    --text-secondary: #f5f0e8;
    --text-muted: #6b6560;
    --background: #f3ede4;
    --background-top: #faf7f2;
    --surface: rgba(255, 252, 247, 0.82);
    --surface-elevated: rgba(255, 253, 249, 0.94);
    --glow-color: rgba(184, 149, 106, 0.1);
    --accent-subtle: rgba(184, 149, 106, 0.08);
    --accent-line: rgba(184, 149, 106, 0.35);
    --header-bg: rgba(250, 247, 242, 0.88);
    --header-shadow: rgba(20, 18, 16, 0.08);
    --nav-bg: var(--navy-deep);
    --nav-text: #f5f0e8;
    --transition: 0.45s cubic-bezier(0.25, 0.1, 0.25, 1);

    --font-display: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
    --font-primary: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

    --header-height: 52px;
    --header-height-scrolled: 48px;
    --hamburger-color: var(--text-primary);
    --content-max: 1200px;
    --section-padding-x: clamp(1rem, 4vw, 3rem);
    --section-padding-y: clamp(2.5rem, 7vw, 6rem);
    --section-padding-y-md: clamp(2rem, 5vw, 3.5rem);
    --section-gap: clamp(1.5rem, 4vw, 4rem);
    --text-hero: clamp(2.5rem, calc(5.5vw + 1.5rem), 7.5rem);
    --text-h1: clamp(1.875rem, calc(2vw + 1.25rem), 3.25rem);
    --text-h2: clamp(1.25rem, calc(1.5vw + 1rem), 2.25rem);
    --text-body: clamp(0.9375rem, calc(0.5vw + 0.875rem), 1.0625rem);
    --text-small: clamp(0.75rem, calc(0.4vw + 0.7rem), 0.8125rem);
    --text-label: 0.6875rem;

    --tech-item-bg: rgba(20, 18, 16, 0.03);
    --tech-item-hover-bg: rgba(20, 18, 16, 0.06);
    --card-shadow: 0 1px 2px rgba(20, 18, 16, 0.04), 0 8px 32px rgba(20, 18, 16, 0.06);
    --card-shadow-hover: 0 4px 16px rgba(20, 18, 16, 0.06), 0 16px 48px rgba(184, 149, 106, 0.12);
    --card-border: rgba(20, 18, 16, 0.09);
    --card-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.9);
    --section-band: linear-gradient(
      135deg,
      rgba(184, 149, 106, 0.04) 0%,
      rgba(26, 39, 68, 0.03) 50%,
      rgba(184, 149, 106, 0.025) 100%
    );
    --marquee-bg: linear-gradient(180deg, #0f0e0c 0%, #141210 100%);
    --divider: linear-gradient(90deg, transparent, var(--accent-line) 15%, var(--accent-line) 85%, transparent);
    --focus-ring: 0 0 0 2px rgba(184, 149, 106, 0.45);
    --scrollbar-thumb: rgba(20, 18, 16, 0.18);
    --scrollbar-thumb-hover: rgba(20, 18, 16, 0.32);
    --radius-sharp: 2px;
    --radius-soft: 0.5rem;
  }

  :root.dark {
    --primary: #f5f0e8;
    --primary-rgb: 245, 240, 232;
    --secondary: #080808;
    --text-primary: #f5f0e8;
    --text-secondary: #141210;
    --text-muted: #9a948c;
    --background: #080808;
    --background-top: #0a0a0a;
    --surface: rgba(18, 17, 15, 0.85);
    --surface-elevated: rgba(24, 22, 19, 0.94);
    --glow-color: rgba(212, 184, 122, 0.08);
    --accent-subtle: rgba(212, 184, 122, 0.1);
    --accent-line: rgba(212, 184, 122, 0.32);
    --header-bg: rgba(8, 8, 8, 0.92);
    --header-shadow: rgba(212, 184, 122, 0.12);
    --nav-bg: #f5f0e8;
    --nav-text: #141210;
    --tech-item-bg: rgba(245, 240, 232, 0.04);
    --tech-item-hover-bg: rgba(245, 240, 232, 0.07);
    --card-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
    --card-shadow-hover: 0 8px 32px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(212, 184, 122, 0.15);
    --card-border: rgba(212, 184, 122, 0.12);
    --card-highlight: inset 0 1px 0 rgba(212, 184, 122, 0.08);
    --section-band: linear-gradient(
      135deg,
      rgba(212, 184, 122, 0.04) 0%,
      rgba(26, 39, 68, 0.06) 50%,
      rgba(212, 184, 122, 0.03) 100%
    );
    --marquee-bg: linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
    --divider: linear-gradient(90deg, transparent, var(--accent-line) 15%, var(--accent-line) 85%, transparent);
    --focus-ring: 0 0 0 2px rgba(212, 184, 122, 0.5);
    --scrollbar-thumb: rgba(245, 240, 232, 0.16);
    --scrollbar-thumb-hover: rgba(245, 240, 232, 0.28);
  }

  html {
    scroll-behavior: smooth;
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
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E"),
      radial-gradient(ellipse 90% 60% at 50% -10%, var(--glow-color), transparent 55%),
      radial-gradient(ellipse 40% 30% at 100% 20%, rgba(26, 39, 68, 0.06), transparent 50%),
      linear-gradient(180deg, var(--background-top) 0%, var(--background) 60%, var(--background) 100%);
    background-attachment: fixed;
    color: var(--text-primary);
    line-height: 1.55;
    width: 100%;
    max-width: 100%;
    overflow-x: clip;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color var(--transition), color var(--transition);
    letter-spacing: 0.01em;
    font-weight: 400;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  body::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.02em;
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
    transition: all var(--transition);
  }

  button:focus-visible,
  a:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: var(--radius-sharp);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ::selection {
    background-color: var(--gold);
    color: #141210;
  }

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
    border-radius: 100px;
    transition: background 0.3s ease;
  }

  *:hover::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
  }

  *::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    z-index: 1000;
    padding: 0.75rem 1.25rem;
    background: var(--gold);
    color: #141210;
    border-radius: var(--radius-sharp);
    font-weight: 500;
    font-size: var(--text-small);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .skip-link:focus {
    top: 1rem;
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
      --text-hero: clamp(2.25rem, calc(5vw + 1.25rem), 3.25rem);
    }
  }

  @media (max-width: 768px) {
    :root {
      --header-height: calc(48px + env(safe-area-inset-top, 0px));
      --text-hero: clamp(2.125rem, calc(7vw + 1.1rem), 2.75rem);
      --text-h1: clamp(1.625rem, calc(4vw + 1rem), 2rem);
      --text-h2: clamp(1.125rem, calc(2vw + 0.9rem), 1.5rem);
      --text-body: 1rem;
      --section-padding-x: 1.125rem;
      --section-padding-y: clamp(2rem, 6vw, 2.75rem);
      --section-gap: clamp(1.25rem, 4vw, 2rem);
    }
  }

  @media (max-width: 480px) {
    :root {
      --text-hero: clamp(2rem, calc(8vw + 0.85rem), 2.25rem);
      --text-h1: clamp(1.5rem, calc(5vw + 0.85rem), 1.75rem);
      --section-padding-x: 1rem;
      --section-padding-y: 2rem;
      --section-gap: 1.25rem;
    }
  }

  @media (min-width: 1536px) {
    :root {
      --content-max: 1320px;
      --section-padding-x: 3rem;
    }
  }
`;
