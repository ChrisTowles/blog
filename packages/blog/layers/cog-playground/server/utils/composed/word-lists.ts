/**
 * Five-word recall lists for the composed screen.
 *
 * These are custom lists assembled for this demo — semantically
 * unrelated, concrete nouns, mixed syllable counts. NOT the CERAD
 * 10-word list, NOT MoCA's five-word list (both embedded in proprietary
 * batteries). One list is chosen at random per attempt so a returning
 * user can't pre-memorize.
 */
import type { ComposedWordList } from '../../../../../shared/cog-playground/composed-types';

export const COMPOSED_WORD_LISTS: readonly ComposedWordList[] = [
  ['River', 'Honest', 'Tunnel', 'Eagle', 'Garden'],
  ['Lantern', 'Quiet', 'Cabin', 'Mountain', 'Cotton'],
  ['Anchor', 'Modern', 'Pebble', 'Lemon', 'Ladder'],
  ['Compass', 'Brave', 'Pillow', 'Harbor', 'Marble'],
  ['Window', 'Patient', 'Carpet', 'Whistle', 'Forest'],
  ['Saddle', 'Steady', 'Velvet', 'Otter', 'Castle'],
] as const;

const FALLBACK: ComposedWordList = ['River', 'Honest', 'Tunnel', 'Eagle', 'Garden'];

/** Pick a random list. `rng` is injectable for deterministic tests. */
export function pickComposedWordList(rng: () => number = Math.random): ComposedWordList {
  const idx = Math.floor(rng() * COMPOSED_WORD_LISTS.length);
  return COMPOSED_WORD_LISTS[idx] ?? FALLBACK;
}
