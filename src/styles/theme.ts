export const theme = {
  colors: {
    accent: '#0071e3',
    primary: '#1d1d1f',
    secondary: '#fbfbfd',
    text: {
      primary: '#1d1d1f',
      secondary: '#f5f5f7',
      muted: '#86868b',
    },
    background: {
      light: '#fbfbfd',
      dark: '#000000',
    },
  },
  typography: {
    fontFamily: {
      primary: 'Labil Grotesk, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    fontSize: {
      h1: 'clamp(3rem, 10vw, 7.5rem)',
      h2: 'clamp(2rem, 5vw, 4rem)',
      h3: 'clamp(1.5rem, 3vw, 2.5rem)',
      body: '1.125rem',
      small: '0.875rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.1,
      normal: 1.5,
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
    small: '0.75rem',
    medium: '1.25rem',
    large: '1.75rem',
    pill: '100px',
  },
  transitions: {
    fast: '0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
    normal: '0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
    slow: '0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.04)',
    medium: '0 4px 24px rgba(0, 0, 0, 0.06)',
    large: '0 8px 32px rgba(0, 0, 0, 0.08)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
};
