/**
 * Renderer-neutral layout for the hero market motif. Coordinates are in CSS
 * pixels with the origin at the hero's centre, y up. Both the WebGL scene and
 * the CSS grid read from here so they always line up.
 */
export const GRID_STEP = 96;

export interface MarketLayout {
  /** Sparkline baseline (y) and amplitude scale. */
  sparkline: { baseY: number; amplitude: number; points: number; speedPxPerSec: number };
  /** Order-book ladder: right edge x, top y, rows, spacing and bar width range. */
  ladder: { right: number; top: number; rows: number; gap: number; min: number; max: number };
  /** Global alpha multiplier so the motif recedes further on small screens. */
  alpha: number;
  /** Idle alpha for unlit tick points. */
  tickAlpha: number;
}

export function layoutMarket(width: number, height: number): MarketLayout {
  const halfW = width / 2;
  const halfH = height / 2;
  const compact = width < 768;

  if (compact) {
    return {
      // low in the hero, beneath the CTA row
      sparkline: { baseY: -halfH * 0.42, amplitude: 0.6, points: 120, speedPxPerSec: 10 },
      // top-right, beside the name
      ladder: { right: halfW - 16, top: halfH * 0.56, rows: 8, gap: 12, min: 20, max: 96 },
      alpha: 0.7,
      tickAlpha: 0.22,
    };
  }

  return {
    sparkline: { baseY: halfH * 0.22, amplitude: 1, points: 180, speedPxPerSec: 14 },
    ladder: { right: halfW - 28, top: halfH * 0.36 + (12 * 14) / 2, rows: 12, gap: 14, min: 32, max: 180 },
    alpha: 1,
    tickAlpha: 0.28,
  };
}
