/**
 * Three-word registration lists for the Mini-ACE-inspired screen.
 *
 * Custom lists — NOT the canonical ACE-III items. Mixed-syllable
 * concrete nouns, semantically unrelated. One list is chosen at random
 * per attempt.
 */
import type { MiniAceWordTriplet } from '../../../../../blog/shared/cog-playground/mini-ace-types';

export const MINI_ACE_WORD_LISTS: readonly MiniAceWordTriplet[] = [
  ['Compass', 'Lemon', 'Pillow'],
  ['Anchor', 'Velvet', 'Castle'],
  ['Window', 'Saddle', 'Marble'],
  ['Lantern', 'Otter', 'Cotton'],
  ['Pebble', 'Whistle', 'Ladder'],
] as const;

const FALLBACK: MiniAceWordTriplet = ['Compass', 'Lemon', 'Pillow'];

export function pickMiniAceWords(rng: () => number = Math.random): MiniAceWordTriplet {
  const idx = Math.floor(rng() * MINI_ACE_WORD_LISTS.length);
  return MINI_ACE_WORD_LISTS[idx] ?? FALLBACK;
}
