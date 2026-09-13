import { durations, easings, fonts, radii, space } from '../theme/tokens';

/** Emotion theme object kept for the provider; components should prefer CSS variables. */
export const theme = { fonts, durations, easings, radii, space } as const;
