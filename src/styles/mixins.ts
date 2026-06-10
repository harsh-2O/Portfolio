export const breakpoints = {
  xxs: '374px',
  xs: '374px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
  ultra: '2000px',
} as const;

/** Mobile-first max-width queries */
export const media = {
  xxs: `@media (max-width: ${breakpoints.xxs})`,
  xs: `@media (max-width: ${breakpoints.xs})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  xl: `@media (max-width: ${breakpoints.xl})`,
  smUp: `@media (min-width: 481px)`,
  mdUp: `@media (min-width: 769px)`,
  lgUp: `@media (min-width: 1025px)`,
  xlUp: `@media (min-width: 1281px)`,
  xxlUp: `@media (min-width: 1537px)`,
  ultraUp: `@media (min-width: 2001px)`,
  hover: `@media (hover: hover)`,
  touch: `@media (hover: none)`,
} as const;
