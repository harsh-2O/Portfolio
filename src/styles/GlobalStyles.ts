import { css } from '@emotion/react';

export const GlobalStyles = css`
  @import url('/src/styles/fonts.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: #000000;
    --primary-rgb: 0, 0, 0;
    --secondary: #FFFFFF;
    --text-primary: #000000;
    --text-secondary: #FFFFFF;
    --background: #FFFFFF;
    --header-bg: rgba(255, 255, 255, 0.95);
    --header-shadow: rgba(0, 0, 0, 0.05);
    --nav-bg: #000000;
    --nav-text: #FFFFFF;
    --transition: 0.3s ease;
    --font-primary: 'Labil Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    --header-height: 100px;
    --hamburger-color: var(--text-primary);
    --section-spacing: 80vh;
    --section-padding-x: 0.5rem;
    --section-padding-x-md: 1.5rem;
    --section-padding-x-sm: 1rem;
    --tech-item-bg: transparent;
    --tech-item-hover-bg: transparent;
  }

  :root.dark {
    --primary: #FFFFFF;
    --primary-rgb: 255, 255, 255;
    --secondary: #000000;
    --text-primary: #FFFFFF;
    --text-secondary: #000000;
    --background: #000000;
    --header-bg: rgba(0, 0, 0, 0.95);
    --header-shadow: rgba(255, 255, 255, 0.05);
    --nav-bg: #FFFFFF;
    --nav-text: #000000;
    --hamburger-color: var(--text-primary);
    --tech-item-bg: rgba(255, 255, 255, 0.15);
    --tech-item-hover-bg: rgba(255, 255, 255, 0.10);
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: var(--font-primary);
    background-color: var(--background);
    color: var(--text-primary);
    line-height: 1.5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color var(--transition), color var(--transition);
    letter-spacing: -0.02em;
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

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ::selection {
    background-color: var(--primary);
    color: var(--secondary);
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  & body, & html, & {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  & body::-webkit-scrollbar, 
  & html::-webkit-scrollbar, 
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`; 