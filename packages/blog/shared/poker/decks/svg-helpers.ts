/**
 * Pure helpers for composing card SVGs. No PIXI, no DOM — these run in Node
 * (build-time generation) and in tests.
 */
import type { Card, Rank, Suit } from '../../../app/utils/poker/types';
import { rankLabel } from '../../../app/utils/poker/types';

/**
 * Vector path data for the four suits, normalized to a 100×100 viewBox.
 * Drawn as filled paths so they look identical across browsers and OSes —
 * no font-glyph dependency.
 */
export const SUIT_PATHS: Record<Suit, string> = {
  h:
    'M50 88 ' +
    'C 18 65, 5 44, 5 28 ' +
    'C 5 14, 16 5, 28 5 ' +
    'C 38 5, 46 12, 50 22 ' +
    'C 54 12, 62 5, 72 5 ' +
    'C 84 5, 95 14, 95 28 ' +
    'C 95 44, 82 65, 50 88 Z',
  d: 'M50 4 L92 50 L50 96 L8 50 Z',
  s:
    'M50 5 ' +
    'C 50 5, 95 38, 95 64 ' +
    'C 95 78, 84 86, 73 86 ' +
    'C 64 86, 56 81, 53 73 ' +
    'C 53 73, 53 80, 60 90 ' +
    'L 40 90 ' +
    'C 47 80, 47 73, 47 73 ' +
    'C 44 81, 36 86, 27 86 ' +
    'C 16 86, 5 78, 5 64 ' +
    'C 5 38, 50 5, 50 5 Z',
  c:
    // Three lobes (top, lower-left, lower-right) + tapered stem.
    // Each lobe is drawn as M(top of circle) → 2 half-arcs → close, so the
    // shape stays inside the 0..100 viewBox (avoids the arc-direction trap
    // where M+A+Z draws a circle whose center is *outside* the box).
    // Top lobe: circle center (50, 22) r=20  → spans y=2..42
    // Left lobe: circle center (28, 46) r=20 → spans y=26..66
    // Right lobe: circle center (72, 46) r=20 → spans y=26..66
    // Stem: tapered triangle from (40, 60) to (66, 92).
    'M 50 2 a 20 20 0 1 0 0 40 a 20 20 0 1 0 0 -40 Z ' +
    'M 28 26 a 20 20 0 1 0 0 40 a 20 20 0 1 0 0 -40 Z ' +
    'M 72 26 a 20 20 0 1 0 0 40 a 20 20 0 1 0 0 -40 Z ' +
    'M 40 60 L 60 60 L 66 94 L 34 94 Z',
};

export function suitColor(suit: Suit, palette: { red: string; black: string }): string {
  return suit === 'h' || suit === 'd' ? palette.red : palette.black;
}

/**
 * Pip positions (col 0..2, row 0..6) for ranks 2-10. Pips placed below row 3.5
 * are drawn upside-down so the card looks identical when flipped.
 */
export const PIP_LAYOUTS: Record<number, Array<[number, number]>> = {
  2: [
    [1, 0],
    [1, 6],
  ],
  3: [
    [1, 0],
    [1, 3],
    [1, 6],
  ],
  4: [
    [0, 0],
    [2, 0],
    [0, 6],
    [2, 6],
  ],
  5: [
    [0, 0],
    [2, 0],
    [1, 3],
    [0, 6],
    [2, 6],
  ],
  6: [
    [0, 0],
    [2, 0],
    [0, 3],
    [2, 3],
    [0, 6],
    [2, 6],
  ],
  7: [
    [0, 0],
    [2, 0],
    [1, 1.5],
    [0, 3],
    [2, 3],
    [0, 6],
    [2, 6],
  ],
  8: [
    [0, 0],
    [2, 0],
    [1, 1.5],
    [0, 3],
    [2, 3],
    [1, 4.5],
    [0, 6],
    [2, 6],
  ],
  // Standard reference 9 layout: tight 2x2 cluster at top (rows 0/1),
  // center pip, tight 2x2 cluster at bottom (rows 5/6). Inner pairs hug
  // the corner pairs with a wide center divider — matches the reference deck.
  9: [
    [0, 0],
    [2, 0],
    [0, 1],
    [2, 1],
    [1, 3],
    [0, 5],
    [2, 5],
    [0, 6],
    [2, 6],
  ],
  // Reference 10 layout: top corners + singleton at 25% + inner pair just
  // above center, mirrored. Inner pairs are CLOSE TO CENTER (rows 2.5/3.5)
  // with a clear divider, NOT close to the top/bottom corners.
  10: [
    [0, 0],
    [2, 0],
    [1, 1.5],
    [0, 2.5],
    [2, 2.5],
    [0, 3.5],
    [2, 3.5],
    [1, 4.5],
    [0, 6],
    [2, 6],
  ],
};

export interface PipFrame {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Emit `<use href="#suit-X" />` (or path-fill) elements at every pip
 * position for a number-card face, scaled into `frame`.
 */
export function pipUseElements(
  card: Card,
  frame: PipFrame,
  pipScale: number,
  suitSymbolId: string,
): string {
  const layout = PIP_LAYOUTS[card.rank as keyof typeof PIP_LAYOUTS];
  if (!layout) return '';
  const out: string[] = [];
  for (const [col, row] of layout) {
    const cx = frame.x + (col / 2) * frame.w;
    const cy = frame.y + (row / 6) * frame.h;
    const flipped = row > 3.5;
    const halfSize = (pipScale * 100) / 2;
    const transform = flipped
      ? `translate(${cx + halfSize} ${cy + halfSize}) rotate(180) scale(${pipScale})`
      : `translate(${cx - halfSize} ${cy - halfSize}) scale(${pipScale})`;
    out.push(`<use href="#${suitSymbolId}" transform="${transform}" />`);
  }
  return out.join('');
}

/** Escape `<`, `>`, `&` for safe SVG text content. */
export function escapeSvgText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function rankToLabel(r: Rank): string {
  return rankLabel(r);
}
