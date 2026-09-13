/** Average adult reading speed for technical prose, words per minute. */
const WPM = 220;

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

/** Estimated minutes to read the given blocks of prose, rounded up, minimum 1. */
export function readTimeMinutes(blocks: readonly string[]): number {
  const words = blocks.reduce((sum, block) => sum + countWords(block), 0);
  return Math.max(1, Math.round(words / WPM));
}
