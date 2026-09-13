/**
 * Design tokens — the single source of truth for colour, typography, spacing,
 * radii, shadows and motion. `GlobalStyles` turns these into CSS custom
 * properties; components consume the variables, never the raw values.
 */

export type Easing4 = [number, number, number, number];

export const fonts = {
  display: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  sans: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
} as const;

/** Seconds (framer-motion units). CSS receives millisecond equivalents. */
export const durations = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  slower: 0.9,
  intro: 1.1,
} as const;

export const easings: Record<'standard' | 'out' | 'inOut' | 'in', Easing4> = {
  standard: [0.25, 0.1, 0.25, 1],
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  in: [0.7, 0, 0.84, 0],
};

export const springs = {
  snappy: { type: 'spring', stiffness: 420, damping: 32, mass: 0.8 },
  soft: { type: 'spring', stiffness: 170, damping: 26 },
  magnetic: { type: 'spring', stiffness: 160, damping: 16, mass: 0.2 },
  cursor: { type: 'spring', stiffness: 260, damping: 24, mass: 0.5 },
} as const;

export const space = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.5rem',
  6: '2rem',
  7: '3rem',
  8: '4rem',
  9: '6rem',
} as const;

export const radii = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  pill: '999px',
} as const;

/** Contrast notes: every text token clears 4.5:1 on `bg` and `surface`. */
export interface Palette {
  bg: string;
  bgTop: string;
  surface: string;
  surfaceElevated: string;
  surfaceSunken: string;
  bandTint: string;
  text: string;
  textRgb: string;
  textMuted: string;
  textFaint: string;
  textOnAccent: string;
  textInverse: string;
  accent: string;
  accentText: string;
  accentSubtle: string;
  accentLine: string;
  accentRgb: string;
  border: string;
  borderStrong: string;
  ink: string;
  inkText: string;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  scrollbar: string;
  scrollbarHover: string;
  headerBg: string;
  overlay: string;
  cursorRing: string;
  grainOpacity: string;
  codeBg: string;
  codeText: string;
}

/** Ash light — warm-neutral greys, one burnt-orange accent. */
export const light: Palette = {
  bg: '#F7F7F7',
  bgTop: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceSunken: '#EFEFEF',
  bandTint: 'rgba(17, 17, 17, 0.018)',
  text: '#111111',
  textRgb: '17, 17, 17',
  textMuted: '#6A6A6A',
  textFaint: '#78736C',
  textOnAccent: '#FFFFFF',
  textInverse: '#F7F7F7',
  accent: '#C06000',
  accentText: '#9A4C00',
  accentSubtle: 'rgba(192, 96, 0, 0.07)',
  accentLine: 'rgba(192, 96, 0, 0.28)',
  accentRgb: '192, 96, 0',
  border: '#E2E2E2',
  borderStrong: '#CFCFCF',
  ink: '#111111',
  inkText: '#F7F7F7',
  shadowSm: '0 1px 2px rgba(17, 17, 17, 0.04)',
  shadowMd: '0 12px 32px -16px rgba(17, 17, 17, 0.18)',
  shadowLg: '0 32px 64px -24px rgba(17, 17, 17, 0.28)',
  scrollbar: 'rgba(17, 17, 17, 0.16)',
  scrollbarHover: 'rgba(17, 17, 17, 0.3)',
  headerBg: 'rgba(247, 247, 247, 0.88)',
  overlay: 'rgba(17, 17, 17, 0.42)',
  cursorRing: 'rgba(17, 17, 17, 0.45)',
  grainOpacity: '0.035',
  codeBg: '#111111',
  codeText: '#F2EDE6',
};

/** Ash dark — deep warm charcoal, warm off-white text, the same accent lifted for contrast. */
export const dark: Palette = {
  bg: '#151413',
  bgTop: '#1A1917',
  surface: '#1C1B19',
  surfaceElevated: '#201F1C',
  surfaceSunken: '#111110',
  bandTint: 'rgba(242, 237, 230, 0.02)',
  text: '#F2EDE6',
  textRgb: '242, 237, 230',
  textMuted: '#A39E96',
  textFaint: '#8E8880',
  textOnAccent: '#151413',
  textInverse: '#151413',
  accent: '#E07A2E',
  accentText: '#E8934F',
  accentSubtle: 'rgba(224, 122, 46, 0.1)',
  accentLine: 'rgba(224, 122, 46, 0.35)',
  accentRgb: '224, 122, 46',
  border: 'rgba(242, 237, 230, 0.1)',
  borderStrong: 'rgba(242, 237, 230, 0.18)',
  ink: '#F2EDE6',
  inkText: '#151413',
  shadowSm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  shadowMd: '0 12px 32px -16px rgba(0, 0, 0, 0.6)',
  shadowLg: '0 32px 64px -24px rgba(0, 0, 0, 0.7)',
  scrollbar: 'rgba(242, 237, 230, 0.16)',
  scrollbarHover: 'rgba(242, 237, 230, 0.3)',
  headerBg: 'rgba(21, 20, 19, 0.88)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  cursorRing: 'rgba(242, 237, 230, 0.5)',
  grainOpacity: '0.05',
  codeBg: '#0F0E0D',
  codeText: '#F2EDE6',
};

const cssEase = (e: Easing4) => `cubic-bezier(${e.join(', ')})`;
const ms = (s: number) => `${Math.round(s * 1000)}ms`;

/** Theme-independent tokens: type, motion, spacing, radii. */
export function staticTokensToCss(): string {
  return `
    --font-display: ${fonts.display};
    --font-primary: ${fonts.sans};
    --font-mono: ${fonts.mono};

    --dur-fast: ${ms(durations.fast)};
    --dur-base: ${ms(durations.base)};
    --dur-slow: ${ms(durations.slow)};
    --dur-slower: ${ms(durations.slower)};
    --dur-intro: ${ms(durations.intro)};

    --ease-standard: ${cssEase(easings.standard)};
    --ease-out: ${cssEase(easings.out)};
    --ease-in-out: ${cssEase(easings.inOut)};
    --ease-in: ${cssEase(easings.in)};

    --transition: var(--dur-base) var(--ease-standard);
    --transition-fast: var(--dur-fast) var(--ease-standard);

    ${Object.entries(space).map(([k, v]) => `--space-${k}: ${v};`).join('\n    ')}
    ${Object.entries(radii).map(([k, v]) => `--radius-${k}: ${v};`).join('\n    ')}
    --card-radius: ${radii.lg};
  `;
}

/** Theme-dependent tokens. Legacy names are kept so existing sections keep rendering. */
export function paletteToCss(p: Palette): string {
  return `
    --background: ${p.bg};
    --background-top: ${p.bgTop};
    --surface: ${p.surface};
    --surface-elevated: ${p.surfaceElevated};
    --surface-sunken: ${p.surfaceSunken};
    --band-tint: ${p.bandTint};

    --text-primary: ${p.text};
    --text-rgb: ${p.textRgb};
    --text-muted: ${p.textMuted};
    --text-faint: ${p.textFaint};
    --text-on-accent: ${p.textOnAccent};
    --text-inverse: ${p.textInverse};

    --accent: ${p.accent};
    --accent-text: ${p.accentText};
    --accent-subtle: ${p.accentSubtle};
    --accent-line: ${p.accentLine};
    --accent-rgb: ${p.accentRgb};

    --border: ${p.border};
    --border-strong: ${p.borderStrong};
    --card-border: ${p.border};

    --ink: ${p.ink};
    --ink-text: ${p.inkText};

    --shadow-sm: ${p.shadowSm};
    --shadow-md: ${p.shadowMd};
    --shadow-lg: ${p.shadowLg};

    --scrollbar-thumb: ${p.scrollbar};
    --scrollbar-thumb-hover: ${p.scrollbarHover};
    --header-bg: ${p.headerBg};
    --overlay: ${p.overlay};
    --cursor-ring: ${p.cursorRing};
    --grain-opacity: ${p.grainOpacity};
    --code-bg: ${p.codeBg};
    --code-text: ${p.codeText};
    --focus-ring: 0 0 0 2px ${p.bg}, 0 0 0 4px ${p.accent};

  `;
}
