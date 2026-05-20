/**
 * GET /api/cog-playground/mini-cog/words
 *
 * Returns one randomly-chosen recall triplet for a fresh attempt. No
 * auth, no state, nothing stored.
 */
import { pickWordList } from '../../../utils/mini-cog/word-lists';

export default defineEventHandler(() => {
  return { words: pickWordList() };
});
