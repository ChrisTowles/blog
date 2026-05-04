import type { Card, Rank, Suit } from '../../../app/utils/poker/types';

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

export function parseCardCode(code: string): Card {
  const suit = code[0] as Suit;
  const rankCh = code[1]!;
  const rank: Rank =
    rankCh === 'A'
      ? 14
      : rankCh === 'K'
        ? 13
        : rankCh === 'Q'
          ? 12
          : rankCh === 'J'
            ? 11
            : rankCh === 'T'
              ? 10
              : (parseInt(rankCh, 10) as Rank);
  return { rank, suit };
}
