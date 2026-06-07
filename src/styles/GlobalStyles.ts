import { css } from '@emotion/react';

export const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --accent: #0071e3;
    --primary: #1d1d1f;
    --primary-rgb: 29, 29, 31;
    --secondary: #fbfbfd;
    --text-primary: #1d1d1f;
    --text-secondary: #f5f5f7;
    --text-muted: #86868b;
    --background: #f5f5f7;
    --background-top: #fbfbfd;
    --surface: rgba(255, 255, 255, 0.78);
    --surface-elevated: rgba(255, 255, 255, 0.92);
    --glow-color: rgba(0, 113, 227, 0.12);
    --accent-subtle: rgba(0, 113, 227, 0.07);
    --accent-line: rgba(0, 113, 227, 0.28);
    --header-bg: rgba(251, 251, 253, 0.82);
    --header-shadow: rgba(0, 0, 0, 0.06);
    --nav-bg: #1d1d1f;
    --nav-text: #f5f5f7;
    --transition: 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --header-height: 52px;
    --header-height-scrolled: 48px;
    --hamburger-color: var(--text-primary);
    --content-max: 1200px;
    --section-padding-x: clamp(1rem, 4vw, 3rem);
    --section-padding-y: clamp(2.5rem, 7vw, 6rem);
    --section-padding-y-md: clamp(2rem, 5vw, 3.5rem);
    --section-gap: clamp(1.5rem, 4vw, 4rem);
    --text-hero: clamp(2.25rem, calc(5vw + 1.5rem), 7rem);
    --text-h1: clamp(1.75rem, calc(2vw + 1.25rem), 3rem);
    --text-h2: clamp(1.25rem, calc(1.5vw + 1rem), 2.25rem);
    --text-body: clamp(0.9375rem, calc(0.5vw + 0.875rem), 1.125rem);
    --text-small: clamp(0.8125rem, calc(0.4vw + 0.75rem), 0.9375rem);
    --tech-item-bg: rgba(0, 0, 0, 0.03);
    --tech-item-hover-bg: rgba(0, 0, 0, 0.06);
    --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.03), 0 8px 32px rgba(0, 113, 227, 0.07);
    --card-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.04), 0 16px 48px rgba(0, 113, 227, 0.12);
    --card-border: rgba(0, 0, 0, 0.07);
    --card-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.85);
    --section-band: rgba(0, 113, 227, 0.035);
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
    --text-muted: #a1a1a6;
    --background: #000000;
    --background-top: #000000;
    --surface: rgba(28, 28, 30, 0.72);
    --surface-elevated: rgba(38, 38, 40, 0.9);
    --glow-color: rgba(0, 113, 227, 0.12);
    --accent-subtle: rgba(0, 113, 227, 0.1);
    --accent-line: rgba(0, 113, 227, 0.35);
    --header-bg: rgba(0, 0, 0, 0.8);
    --header-shadow: rgba(255, 255, 255, 0.04);
    --nav-bg: #f5f5f7;
    --nav-text: #1d1d1f;
    --tech-item-bg: rgba(255, 255, 255, 0.06);
    --tech-item-hover-bg: rgba(255, 255, 255, 0.1);
    --card-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    --card-shadow-hover: 0 12px 40px rgba(0, 113, 227, 0.15);
    --card-border: rgba(255, 255, 255, 0.08);
    --card-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    --section-band: rgba(0, 113, 227, 0.05);
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
    font-family: var(--font-primary);
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
      --text-hero: clamp(2rem, calc(5vw + 1.25rem), 3rem);
    }
  }

  @media (max-width: 768px) {
    :root {
      --header-height: calc(48px + env(safe-area-inset-top, 0px));
      --text-hero: clamp(2.125rem, calc(7vw + 1.1rem), 2.75rem);
      --text-h1: clamp(1.5rem, calc(4vw + 1rem), 2rem);
      --text-h2: clamp(1.125rem, calc(2vw + 0.9rem), 1.5rem);
      --text-body: 1rem;
      --section-padding-x: 1.125rem;
      --section-padding-y: clamp(2rem, 6vw, 2.75rem);
      --section-gap: clamp(1.25rem, 4vw, 2rem);
    }
  }

  @media (max-width: 480px) {
    :root {
      --text-hero: clamp(1.875rem, calc(8vw + 0.85rem), 2.25rem);
      --text-h1: clamp(1.375rem, calc(5vw + 0.85rem), 1.75rem);
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
