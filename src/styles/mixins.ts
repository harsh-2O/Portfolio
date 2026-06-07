export const breakpoints = {
  xs: '374px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
} as const;

/** Mobile-first max-width queries */
export const media = {
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
} as const;
