import { describe, expect, it } from 'vitest';
import { COMPOSED_WORD_LISTS, pickComposedWordList } from './word-lists';

describe('pickComposedWordList', () => {
  it('returns the first list when rng is 0', () => {
    expect(pickComposedWordList(() => 0)).toBe(COMPOSED_WORD_LISTS[0]);
  });

  it('returns the last list when rng is just under 1', () => {
    const last = COMPOSED_WORD_LISTS[COMPOSED_WORD_LISTS.length - 1];
    expect(pickComposedWordList(() => 0.9999)).toBe(last);
  });

  it('every list has exactly five unique words', () => {
    for (const list of COMPOSED_WORD_LISTS) {
      expect(list).toHaveLength(5);
      expect(new Set(list)).toHaveProperty('size', 5);
    }
  });
});
