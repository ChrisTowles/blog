export type Suit = 'h' | 'd' | 'c' | 's';
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Card {
  rank: Rank;
  suit: Suit;
}

export const SUITS: Suit[] = ['h', 'd', 'c', 's'];
export const RANKS: Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const SUIT_GLYPH: Record<Suit, string> = {
  h: '♥',
  d: '♦',
  c: '♣',
  s: '♠',
};

export const SUIT_NAME: Record<Suit, string> = {
  h: 'Hearts',
  d: 'Diamonds',
  c: 'Clubs',
  s: 'Spades',
};

export function rankLabel(r: Rank): string {
  if (r === 14) return 'A';
  if (r === 13) return 'K';
  if (r === 12) return 'Q';
  if (r === 11) return 'J';
  if (r === 10) return '10';
  return String(r);
}

export function cardLabel(c: Card): string {
  return `${rankLabel(c.rank)}${SUIT_GLYPH[c.suit]}`;
}

export function isRedSuit(s: Suit): boolean {
  return s === 'h' || s === 'd';
}

export type HandCategory =
  | 'high-card'
  | 'pair'
  | 'two-pair'
  | 'three-of-a-kind'
  | 'straight'
  | 'flush'
  | 'full-house'
  | 'four-of-a-kind'
  | 'straight-flush';

export const HAND_CATEGORY_LABEL: Record<HandCategory, string> = {
  'high-card': 'High Card',
  pair: 'Pair',
  'two-pair': 'Two Pair',
  'three-of-a-kind': 'Three of a Kind',
  straight: 'Straight',
  flush: 'Flush',
  'full-house': 'Full House',
  'four-of-a-kind': 'Four of a Kind',
  'straight-flush': 'Straight Flush',
};

export interface HandRank {
  category: HandCategory;
  /**
   * Numeric score where higher beats lower. Encodes category and tiebreakers.
   * Compare two HandRanks by their `score` directly.
   */
  score: number;
  /** The 5 cards that make the best hand, for highlighting. */
  bestFive: Card[];
}

export type Stage = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';
export type Actor = 'player' | 'ai';

export interface PlayerState {
  chips: number;
  hole: Card[];
  /** Chips committed in current betting round. */
  committed: number;
  hasFolded: boolean;
  isAllIn: boolean;
}

export type ActionLogEntry = {
  who: Actor | 'system';
  text: string;
};

export interface GameState {
  player: PlayerState;
  ai: PlayerState;
  community: Card[];
  pot: number;
  /** Highest committed amount this round; players need to match to call. */
  currentBet: number;
  stage: Stage;
  /** Whose turn it is during a betting round. Null when round is settling. */
  toAct: Actor | null;
  /** Who is the dealer / button (also small blind in heads-up). */
  dealer: Actor;
  smallBlind: number;
  bigBlind: number;
  log: ActionLogEntry[];
  handNumber: number;
  /** True when the hand is over and we're showing the result. */
  handOver: boolean;
  result?: {
    winner: Actor | 'split';
    playerHand?: HandRank;
    aiHand?: HandRank;
    /** Reveal the AI's hole cards at showdown. */
    revealAi: boolean;
    chipsWon: number;
    summary: string;
  };
}

export type PlayerAction =
  | { kind: 'fold' }
  | { kind: 'check' }
  | { kind: 'call' }
  | { kind: 'bet'; amount: number }
  | { kind: 'raise'; toAmount: number };
