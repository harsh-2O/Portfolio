/**
 * Small subsequence fuzzy matcher for the command palette.
 * Scores consecutive runs and word starts higher; returns matched indices for highlighting.
 */
export interface FuzzyResult {
  score: number;
  indices: number[];
}

const isWordStart = (text: string, i: number) =>
  i === 0 || /[\s\-_/·.]/.test(text[i - 1]);

export function fuzzyMatch(query: string, text: string): FuzzyResult | null {
  const q = query.trim().toLowerCase();
  if (!q) return { score: 0, indices: [] };

  const t = text.toLowerCase();
  const indices: number[] = [];
  let score = 0;
  let ti = 0;
  let lastMatch = -2;

  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi];
    if (ch === ' ') continue;
    const found = t.indexOf(ch, ti);
    if (found === -1) return null;

    score += 10;
    if (found === lastMatch + 1) score += 15;
    if (isWordStart(text, found)) score += 10;
    score -= Math.min(found - ti, 8);

    indices.push(found);
    lastMatch = found;
    ti = found + 1;
  }

  if (t.startsWith(q)) score += 25;
  return { score, indices };
}
