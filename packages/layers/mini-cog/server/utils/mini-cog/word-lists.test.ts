import { describe, it, expect } from 'vitest';
import { WORD_LISTS, pickWordList } from './word-lists';

describe('WORD_LISTS', () => {
  it('every triplet has exactly three non-empty words', () => {
    for (const triplet of WORD_LISTS) {
      expect(triplet).toHaveLength(3);
      for (const w of triplet) expect(w.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('pickWordList', () => {
  it('returns the first triplet when rng -> 0', () => {
    expect(pickWordList(() => 0)).toEqual(WORD_LISTS[0]);
  });

  it('returns the last triplet when rng -> ~1', () => {
    expect(pickWordList(() => 0.999)).toEqual(WORD_LISTS[WORD_LISTS.length - 1]);
  });

  it('stays in range for any rng value', () => {
    for (const r of [0, 0.2, 0.5, 0.8, 0.99]) {
      expect(WORD_LISTS).toContainEqual(pickWordList(() => r));
    }
  });
});
