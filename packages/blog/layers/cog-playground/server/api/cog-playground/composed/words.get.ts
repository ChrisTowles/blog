/**
 * GET /api/cog-playground/composed/words
 *
 * Returns one randomly-chosen 5-word recall list. No auth, no state,
 * nothing stored.
 */
import { pickComposedWordList } from '../../../utils/composed/word-lists';

export default defineEventHandler(() => {
  return { words: pickComposedWordList() };
});
