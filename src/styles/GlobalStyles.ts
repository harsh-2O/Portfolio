import { css } from '@emotion/react';

export const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --accent: #0071e3;
    --accent-purple: #5856d6;
    --accent-teal: #32ade6;
    --accent-violet: #af52de;
    --accent-green: #34c759;
    --accent-gradient: linear-gradient(135deg, #0071e3 0%, #5856d6 55%, #af52de 100%);
    --primary: #1d1d1f;
    --primary-rgb: 29, 29, 31;
    --secondary: #fbfbfd;
    --text-primary: #1d1d1f;
    --text-secondary: #f5f5f7;
    --text-muted: #6e6e73;
    --background: #f5f5f7;
    --background-top: #fbfbfd;
    --surface: rgba(255, 255, 255, 0.78);
    --surface-elevated: rgba(255, 255, 255, 0.92);
    --glow-color: rgba(0, 113, 227, 0.08);
    --accent-subtle: rgba(0, 113, 227, 0.07);
    --accent-line: rgba(0, 113, 227, 0.28);
    --header-bg: rgba(251, 251, 253, 0.82);
    --header-shadow: rgba(0, 0, 0, 0.06);
    --nav-bg: #1d1d1f;
    --nav-text: #f5f5f7;
    --transition: 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    --transition-fast: 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    --font-display: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
    --font-primary: 'Inter', 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --header-height: 60px;
    --header-height-scrolled: 56px;
    --text-nav: 0.9375rem;
    --hamburger-color: var(--text-primary);
    --content-max: 1120px;
    --section-padding-x: clamp(1.25rem, 5vw, 3.5rem);
    --section-padding-top: clamp(3.5rem, 6vw, 5rem);
    --section-padding-bottom: clamp(2.5rem, 4.5vw, 3.5rem);
    --section-padding-y-md: clamp(2.5rem, 4vw, 3.25rem);
    --section-header-space: clamp(1.75rem, 3.5vw, 2.75rem);
    --section-inner-gap: clamp(1.25rem, 2.5vw, 1.75rem);
    --section-gap: clamp(1.25rem, 2.5vw, 2rem);
    --block-gap: clamp(1rem, 2vw, 1.35rem);
    --footer-padding-top: clamp(3rem, 5vw, 4.5rem);
    --footer-padding-bottom: clamp(2rem, 3.5vw, 3rem);
    --text-hero: clamp(2.5rem, calc(5vw + 1.5rem), 7rem);
    --text-h1: clamp(1.625rem, calc(1.8vw + 1.15rem), 2.75rem);
    --text-h2: clamp(1.25rem, calc(1.4vw + 0.9rem), 2rem);
    --text-body: clamp(0.9375rem, calc(0.3vw + 0.875rem), 1.0625rem);
    --text-small: clamp(0.8125rem, calc(0.25vw + 0.75rem), 0.9375rem);
    --tech-item-bg: rgba(0, 0, 0, 0.04);
    --tech-item-hover-bg: rgba(0, 0, 0, 0.07);
    --card-radius: 1.25rem;
    --card-shadow: 0 1px 4px rgba(0, 0, 0, 0.03), 0 6px 24px rgba(0, 0, 0, 0.05);
    --card-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.06), 0 16px 48px rgba(0, 113, 227, 0.1);
    --card-border: rgba(0, 0, 0, 0.08);
    --card-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.85);
    --section-band: linear-gradient(
      135deg,
      rgba(0, 113, 227, 0.03) 0%,
      rgba(88, 86, 214, 0.025) 45%,
      rgba(50, 173, 230, 0.02) 100%
    );
    --marquee-bg: linear-gradient(135deg, #0071e3 0%, #5856d6 50%, #1d1d1f 100%);
    --divider: linear-gradient(90deg, transparent, var(--accent-line) 20%, var(--accent-line) 80%, transparent);
    --focus-ring: 0 0 0 3px rgba(0, 113, 227, 0.4);
    --scrollbar-thumb: rgba(0, 0, 0, 0.18);
    --scrollbar-thumb-hover: rgba(0, 0, 0, 0.32);
  }

  :root.dark {
    --primary: #f5f5f7;
    --primary-rgb: 245, 245, 247;
    --secondary: #000000;
    --text-primary: #f5f5f7;
    --text-secondary: #1d1d1f;
    --text-muted: #98989d;
    --background: #000000;
    --background-top: #000000;
    --surface: rgba(28, 28, 30, 0.72);
    --surface-elevated: rgba(38, 38, 40, 0.9);
    --glow-color: rgba(0, 113, 227, 0.1);
    --accent-subtle: rgba(0, 113, 227, 0.1);
    --accent-line: rgba(0, 113, 227, 0.3);
    --header-bg: rgba(0, 0, 0, 0.8);
    --header-shadow: rgba(255, 255, 255, 0.04);
    --nav-bg: #f5f5f7;
    --nav-text: #1d1d1f;
    --tech-item-bg: rgba(255, 255, 255, 0.06);
    --tech-item-hover-bg: rgba(255, 255, 255, 0.1);
    --card-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    --card-shadow-hover: 0 12px 40px rgba(0, 113, 227, 0.15), 0 6px 20px rgba(0, 0, 0, 0.25);
    --card-border: rgba(255, 255, 255, 0.08);
    --card-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    --section-band: linear-gradient(
      135deg,
      rgba(0, 113, 227, 0.05) 0%,
      rgba(88, 86, 214, 0.04) 45%,
      rgba(175, 82, 222, 0.03) 100%
    );
    --marquee-bg: linear-gradient(135deg, #0071e3 0%, #5856d6 45%, #000000 100%);
    --divider: linear-gradient(90deg, transparent, var(--accent-line) 20%, var(--accent-line) 80%, transparent);
    --focus-ring: 0 0 0 3px rgba(0, 113, 227, 0.5);
    --scrollbar-thumb: rgba(255, 255, 255, 0.18);
    --scrollbar-thumb-hover: rgba(255, 255, 255, 0.32);
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
      radial-gradient(ellipse 80% 60% at 50% -10%, var(--glow-color), transparent 55%),
      radial-gradient(ellipse 40% 30% at 0% 30%, rgba(88, 86, 214, 0.035), transparent 50%),
      radial-gradient(ellipse 35% 25% at 100% 55%, rgba(0, 113, 227, 0.03), transparent 45%),
      linear-gradient(180deg, var(--background-top) 0%, var(--background) 50%, var(--background) 100%);
    background-attachment: fixed;
    color: var(--text-primary);
    line-height: 1.6;
    width: 100%;
    max-width: 100%;
    overflow-x: clip;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color var(--transition), color var(--transition);
    letter-spacing: -0.011em;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  body::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  /* Noise texture overlay for premium depth */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
  }

  :root.dark body::before {
    opacity: 0.035;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
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
    border-radius: 4px;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ::selection {
    background-color: var(--accent);
    color: #fff;
  }

  /* Subtle scrollbars — thin, fade-in on hover */
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
    background: var(--accent);
    color: #fff;
    border-radius: 0.5rem;
    font-weight: 500;
  }

  .skip-link:focus {
    top: 1rem;
  }

  /* Scroll progress bar at the top */
  #scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: var(--accent-gradient);
    z-index: 200;
    pointer-events: none;
    transition: none;
    will-change: width;
  }

  @keyframes marquee-scroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }

  @-webkit-keyframes marquee-scroll {
    0% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
    100% { -webkit-transform: translate3d(-50%, 0, 0); transform: translate3d(-50%, 0, 0); }
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
      --text-nav: 0.875rem;
    }
  }

  @media (max-width: 768px) {
    :root {
      --header-height: calc(56px + env(safe-area-inset-top, 0px));
      --text-hero: clamp(2rem, calc(6vw + 1rem), 2.75rem);
      --text-h1: clamp(1.375rem, calc(3vw + 0.9rem), 1.75rem);
      --text-h2: clamp(1.0625rem, calc(1.5vw + 0.85rem), 1.375rem);
      --text-body: 0.9375rem;
      --section-padding-x: 1.25rem;
      --section-padding-top: clamp(2.75rem, 6vw, 3.5rem);
      --section-padding-bottom: clamp(2rem, 5vw, 2.75rem);
      --section-padding-y-md: clamp(2.25rem, 5vw, 3rem);
      --section-header-space: clamp(1.5rem, 3.5vw, 2rem);
      --section-inner-gap: 1.25rem;
      --section-gap: clamp(1rem, 3vw, 1.5rem);
      --block-gap: 1rem;
      --footer-padding-top: clamp(2.5rem, 5vw, 3rem);
      --footer-padding-bottom: clamp(1.75rem, 4vw, 2.25rem);
    }
  }

  @media (max-width: 480px) {
    :root {
      --text-hero: clamp(1.75rem, calc(7vw + 0.75rem), 2.125rem);
      --text-h1: clamp(1.25rem, calc(4vw + 0.8rem), 1.5rem);
      --section-padding-x: 1rem;
      --section-padding-top: 2.5rem;
      --section-padding-bottom: 2rem;
      --section-padding-y-md: 2rem;
      --section-header-space: 1.25rem;
      --section-inner-gap: 1rem;
      --section-gap: 1.125rem;
      --block-gap: 0.875rem;
      --footer-padding-top: 2.25rem;
      --footer-padding-bottom: 1.75rem;
      --card-radius: 1rem;
    }
  }

  @media (max-width: 374px) {
    :root {
      --text-hero: clamp(1.5rem, calc(6vw + 0.65rem), 1.875rem);
      --text-h1: clamp(1.125rem, calc(3.5vw + 0.75rem), 1.375rem);
      --text-h2: clamp(0.9375rem, calc(1.5vw + 0.8rem), 1.125rem);
      --section-padding-x: 0.875rem;
      --card-radius: 0.875rem;
    }
  }

  @media (min-width: 1536px) {
    :root {
      --content-max: 1240px;
      --section-padding-x: 3.5rem;
    }
  }

  @media (min-width: 2000px) {
    :root {
      --content-max: 1360px;
      --section-padding-x: 4rem;
      --text-hero: clamp(3.5rem, 5.5vw, 8rem);
      --text-h1: clamp(2rem, 2.2vw, 3.25rem);
      --text-body: 1.0625rem;
    }
  }
`;
