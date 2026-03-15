import { describe, it, expect } from 'vitest';
import { validateWord, calculateDecodability } from './phonics-validator';

describe('phonics-validator', () => {
  const knownPatterns = ['CVC-short-a', 'CVC-short-i', 'DG-sh'];
  const sightWords = ['the', 'a', 'is'];

  describe('validateWord', () => {
    it('recognizes CVC short-a words', () => {
      const result = validateWord('cat', knownPatterns);
      expect(result.decodable).toBe(true);
      expect(result.pattern).toBe('CVC-short-a');
    });

    it('recognizes sight words', () => {
      const result = validateWord('the', knownPatterns, sightWords);
      expect(result.sightWord).toBe(true);
    });

    it('rejects words with unknown patterns', () => {
      const result = validateWord('tree', knownPatterns);
      expect(result.decodable).toBe(false);
    });
  });

  describe('calculateDecodability', () => {
    it('returns 1.0 for all decodable words', () => {
      const words = ['cat', 'sat', 'the'];
      const score = calculateDecodability(words, knownPatterns, sightWords);
      expect(score).toBe(1.0);
    });

    it('returns correct ratio with unknown words', () => {
      const words = ['cat', 'tree', 'the'];
      const score = calculateDecodability(words, knownPatterns, sightWords);
      expect(score).toBeCloseTo(0.67, 1);
    });
  });
});
