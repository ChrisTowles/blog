import type { Card, Rank } from '../../../app/utils/poker/types';
import { SUITS } from '../../../app/utils/poker/types';

export interface DeckTheme {
  /** Stable id used in URLs and filenames. */
  id: string;
  /** Human-readable name for the picker. */
  name: string;
  /** Short tagline for the picker. */
  tagline: string;
  /** Lucide icon name for the picker preview. */
  icon: string;
  /** SVG viewBox dimensions used by every card in the deck. */
  width: number;
  height: number;
  /**
   * Render a card face as an SVG string (full <svg> element).
   * `opts.portraits` maps card codes (e.g. "hK") to a ready-to-embed image
   * URL or `data:` URI. The deck chooses how to use the portrait.
   */
  generateFace(card: Card, opts?: { portraits?: Map<string, string> }): string;
  /** Render the card back as an SVG string. */
  generateBack(): string;
}

/**
 * Stable filename code for a card. Suit letter (h/d/c/s) + rank letter
 * (2-9, T, J, Q, K, A). Case-sensitive so a tape-archived deck doesn't
 * change its hashes.
 */
export function cardCode(card: Card): string {
  const r = card.rank;

  const rankCh =
    r === 14 ? 'A' : r === 13 ? 'K' : r === 12 ? 'Q' : r === 11 ? 'J' : r === 10 ? 'T' : String(r);

  return `${card.suit}${rankCh}`;
}

const RANK_BY_CODE = new Map<string, Rank>([
  ['A', 14],
  ['K', 13],
  ['Q', 12],
  ['J', 11],
  ['T', 10],
  ['9', 9],
  ['8', 8],
  ['7', 7],
  ['6', 6],
  ['5', 5],
  ['4', 4],
  ['3', 3],
  ['2', 2],
]);

export function parseCardCode(code: string): Card {
  const suit = SUITS.find((candidate) => candidate === code[0]);
  const rank = RANK_BY_CODE.get(code[1] ?? '');

  if (!suit || !rank) throw new Error(`Invalid card code: ${code}`);

  return { rank, suit };
}
