import { css } from '@emotion/react';

export const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* ── Ash Light (default) ────────────────────────────────────────── */
  :root {
    --accent: #C06000;
    --accent-gradient: linear-gradient(135deg, #C06000 0%, #767676 55%, #111111 100%);
    --primary: #111111;
    --primary-rgb: 17, 17, 17;
    --secondary: #FFFFFF;
    --text-primary: #111111;
    --text-secondary: #F7F7F7;
    --text-muted: #767676;
    --background: #F7F7F7;
    --background-top: #FFFFFF;
    --surface: rgba(255, 255, 255, 0.85);
    --surface-elevated: rgba(255, 255, 255, 0.95);
    --glow-color: rgba(192, 96, 0, 0.08);
    --accent-subtle: rgba(192, 96, 0, 0.06);
    --accent-line: rgba(192, 96, 0, 0.22);
    --header-bg: rgba(255, 255, 255, 0.88);
    --header-shadow: rgba(17, 17, 17, 0.05);
    --nav-bg: #111111;
    --nav-text: #F7F7F7;
    --transition: 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    --transition-fast: 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    --font-display: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
    --font-primary: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --header-height: 60px;
    --header-height-scrolled: 56px;
    --text-nav: 1.125rem;
    --hamburger-color: var(--text-primary);
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
    --tech-item-bg: rgba(17, 17, 17, 0.03);
    --tech-item-hover-bg: rgba(17, 17, 17, 0.06);
    --card-shadow: 0 2px 8px rgba(17, 17, 17, 0.03), 0 8px 32px rgba(192, 96, 0, 0.06);
    --card-shadow-hover: 0 4px 16px rgba(17, 17, 17, 0.04), 0 16px 48px rgba(192, 96, 0, 0.1);
    --card-border: #E0E0E0;
    --card-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.9);
    --card-radius: 1.25rem;
    --section-band: linear-gradient(135deg, rgba(192, 96, 0, 0.035) 0%, rgba(118, 118, 118, 0.025) 100%);
    --marquee-bg: linear-gradient(135deg, #C06000 0%, #111111 100%);
    --divider: linear-gradient(90deg, transparent, #E0E0E0 20%, #E0E0E0 80%, transparent);
    --focus-ring: 0 0 0 3px rgba(192, 96, 0, 0.35);
    --scrollbar-thumb: rgba(17, 17, 17, 0.14);
    --scrollbar-thumb-hover: rgba(17, 17, 17, 0.28);
  }

  /* ── Ash Dark ─────────────────────────────────────────────────── */
  :root.dark {
    --primary: #F7F7F7;
    --primary-rgb: 247, 247, 247;
    --secondary: #111111;
    --text-primary: #F7F7F7;
    --text-secondary: #111111;
    --text-muted: #999999;
    --background: #111111;
    --background-top: #181818;
    --surface: rgba(32, 32, 32, 0.78);
    --surface-elevated: rgba(40, 40, 40, 0.92);
    --glow-color: rgba(192, 96, 0, 0.1);
    --accent-subtle: rgba(192, 96, 0, 0.08);
    --accent-line: rgba(192, 96, 0, 0.3);
    --header-bg: rgba(17, 17, 17, 0.85);
    --header-shadow: rgba(247, 247, 247, 0.04);
    --nav-bg: #F7F7F7;
    --nav-text: #111111;
    --tech-item-bg: rgba(247, 247, 247, 0.06);
    --tech-item-hover-bg: rgba(247, 247, 247, 0.1);
    --card-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
    --card-shadow-hover: 0 12px 40px rgba(192, 96, 0, 0.15);
    --card-border: rgba(247, 247, 247, 0.08);
    --card-highlight: inset 0 1px 0 rgba(247, 247, 247, 0.05);
    --section-band: linear-gradient(135deg, rgba(192, 96, 0, 0.06) 0%, rgba(40, 40, 40, 0.04) 100%);
    --marquee-bg: linear-gradient(135deg, #C06000 0%, #111111 100%);
    --divider: linear-gradient(90deg, transparent, rgba(192, 96, 0, 0.2) 20%, rgba(192, 96, 0, 0.2) 80%, transparent);
    --focus-ring: 0 0 0 3px rgba(192, 96, 0, 0.45);
    --scrollbar-thumb: rgba(247, 247, 247, 0.16);
    --scrollbar-thumb-hover: rgba(247, 247, 247, 0.3);
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
      radial-gradient(ellipse 100% 70% at 50% -15%, var(--glow-color), transparent 60%),
      radial-gradient(ellipse 45% 35% at 0% 30%, rgba(88, 86, 214, 0.05), transparent 55%),
      radial-gradient(ellipse 40% 30% at 100% 60%, rgba(0, 113, 227, 0.04), transparent 50%),
      linear-gradient(180deg, var(--background-top) 0%, var(--background) 55%, var(--background) 100%);
    background-attachment: fixed;
    color: var(--text-primary);
    line-height: 1.5;
    width: 100%;
    max-width: 100%;
    overflow-x: clip;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color var(--transition), color var(--transition);
    letter-spacing: -0.02em;
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
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
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

  /* Global marquee keyframes — Safari/WebKit needs a document-level name, not Emotion-scoped hashes */
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
