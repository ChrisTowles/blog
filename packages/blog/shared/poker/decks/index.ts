import type { DeckTheme } from './types';
import { classicDeck } from './classic';
import { minimalDeck } from './minimal';
import { neonDeck } from './neon';

export const DECKS: DeckTheme[] = [classicDeck, minimalDeck, neonDeck];

export const DEFAULT_DECK_ID = 'classic';

export function getDeck(id: string): DeckTheme {
  return DECKS.find((d) => d.id === id) ?? DECKS[0]!;
}

export type { DeckTheme } from './types';
export { cardCode, parseCardCode } from './types';
