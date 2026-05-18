/**
 * Validated three-word recall triplets for the Mini-Cog demo.
 *
 * These are the standard Mini-Cog word lists (semantically unrelated,
 * concrete, two-syllable-ish nouns). One triplet is chosen at random per
 * session so a returning visitor can't trivially pre-memorise.
 */
import type { WordTriplet } from '../../../../../blog/shared/mini-cog-types';

export const WORD_LISTS: readonly WordTriplet[] = [
  ['Banana', 'Sunrise', 'Chair'],
  ['Leader', 'Season', 'Table'],
  ['Village', 'Kitchen', 'Baby'],
  ['River', 'Nation', 'Finger'],
  ['Captain', 'Garden', 'Picture'],
  ['Daughter', 'Heaven', 'Mountain'],
] as const;

/** Pick a random triplet. `rng` is injectable for deterministic tests. */
export function pickWordList(rng: () => number = Math.random): WordTriplet {
  const idx = Math.floor(rng() * WORD_LISTS.length) % WORD_LISTS.length;
  return WORD_LISTS[idx] ?? (['Banana', 'Sunrise', 'Chair'] as const);
}
