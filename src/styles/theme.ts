export const theme = {
  colors: {
    accent: '#b8956a',
    gold: '#d4b87a',
    navy: '#1a2744',
    primary: '#141210',
    secondary: '#f5f0e8',
    text: {
      primary: '#141210',
      secondary: '#f5f0e8',
      muted: '#6b6560',
    },
    background: {
      light: '#f3ede4',
      dark: '#080808',
    },
  },
  typography: {
    fontFamily: {
      display: "'Cormorant Garamond', Georgia, serif",
      primary: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    fontSize: {
      h1: 'clamp(1.875rem, calc(2vw + 1.25rem), 3.25rem)',
      h2: 'clamp(1.25rem, calc(1.5vw + 1rem), 2.25rem)',
      h3: 'clamp(1.125rem, calc(1vw + 1rem), 1.75rem)',
      body: '1.0625rem',
      small: '0.8125rem',
      label: '0.6875rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeight: {
      tight: 1.08,
      normal: 1.55,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '8rem',
  },
  borderRadius: {
    sharp: '2px',
    small: '0.5rem',
    medium: '0.75rem',
    large: '1rem',
    pill: '100px',
  },
  transitions: {
    fast: '0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
    normal: '0.45s cubic-bezier(0.25, 0.1, 0.25, 1)',
    slow: '0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  shadows: {
    small: '0 1px 2px rgba(20, 18, 16, 0.04)',
    medium: '0 4px 24px rgba(20, 18, 16, 0.06)',
    large: '0 8px 32px rgba(20, 18, 16, 0.08)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
};
