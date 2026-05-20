import { describe, expect, it } from 'vitest';
import { MINI_ACE_WORD_LISTS, pickMiniAceWords } from './word-lists';

describe('pickMiniAceWords', () => {
  it('returns first list when rng=0 and last when rng≈1', () => {
    expect(pickMiniAceWords(() => 0)).toBe(MINI_ACE_WORD_LISTS[0]);
    expect(pickMiniAceWords(() => 0.9999)).toBe(
      MINI_ACE_WORD_LISTS[MINI_ACE_WORD_LISTS.length - 1],
    );
  });

  it('every list has three unique words', () => {
    for (const list of MINI_ACE_WORD_LISTS) {
      expect(list).toHaveLength(3);
      expect(new Set(list)).toHaveProperty('size', 3);
    }
  });
});
