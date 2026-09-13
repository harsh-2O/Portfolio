/** Column count of the bento grid. Every row must sum to this. */
export const BENTO_COLUMNS = 12;

/** Repeating row shapes: a wide-plus-narrow row, then a row of three. */
const ROW_PATTERNS: number[][] = [
  [8, 4],
  [4, 4, 4],
];

/**
 * Column spans for `count` cards so every row fills exactly, including the last.
 * A trailing partial row splits the width evenly (1, 2 or 3 cards → 12, 6, 4).
 */
export function bentoSpans(count: number): number[] {
  const spans: number[] = [];
  let row = 0;

  while (spans.length < count) {
    const pattern = ROW_PATTERNS[row % ROW_PATTERNS.length];
    const remaining = count - spans.length;

    if (remaining >= pattern.length) {
      spans.push(...pattern);
    } else {
      const each = BENTO_COLUMNS / remaining;
      for (let i = 0; i < remaining; i++) spans.push(each);
    }
    row += 1;
  }

  return spans;
}
