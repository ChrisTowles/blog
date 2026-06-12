/**
 * GET /api/cog-playground/mini-ace/words
 *
 * One randomly-chosen 3-word triplet for registration. Custom lists —
 * not the canonical ACE-III items.
 */
import { pickMiniAceWords } from '../../../utils/mini-ace/word-lists';

export default defineEventHandler(() => {
  return { words: pickMiniAceWords() };
});
