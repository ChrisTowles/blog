import { describe, it, expect } from 'vitest';
import { validateWord, calculateDecodability, annotateWords } from './phonics-validator';

describe('phonics-validator', () => {
  const knownPatterns = ['CVC-short-a', 'CVC-short-i', 'DG-sh'];
  const sightWords = ['the', 'a', 'is'];

  describe('validateWord', () => {
    it('recognizes CVC short-a words', () => {
      const result = validateWord('cat', knownPatterns);
      expect(result.decodable).toBe(true);
      expect(result.pattern).toBe('CVC-short-a');
    });

    it('recognizes CVC short-i words', () => {
      const result = validateWord('sit', knownPatterns);
      expect(result.decodable).toBe(true);
      expect(result.pattern).toBe('CVC-short-i');
    });

    it('recognizes sight words', () => {
      const result = validateWord('the', knownPatterns, sightWords);
      expect(result.sightWord).toBe(true);
      expect(result.decodable).toBe(false);
    });

    it('rejects words with unknown patterns', () => {
      const result = validateWord('tree', knownPatterns);
      expect(result.decodable).toBe(false);
      expect(result.sightWord).toBe(false);
    });

    it('preserves original text in result', () => {
      const result = validateWord('Cat!', knownPatterns);
      expect(result.text).toBe('Cat!');
      expect(result.decodable).toBe(true);
    });

    it('strips punctuation for matching', () => {
      const result = validateWord('cat.', knownPatterns);
      expect(result.decodable).toBe(true);
      expect(result.pattern).toBe('CVC-short-a');
    });

    it('is case-insensitive', () => {
      const result = validateWord('CAT', knownPatterns);
      expect(result.decodable).toBe(true);
    });

    it('matches digraph pattern', () => {
      const result = validateWord('ship', knownPatterns);
      expect(result.decodable).toBe(true);
      expect(result.pattern).toBe('DG-sh');
    });

    it('defaults sightWords to empty array', () => {
      const result = validateWord('the', knownPatterns);
      expect(result.sightWord).toBe(false);
      expect(result.decodable).toBe(false);
    });

    it('handles empty string', () => {
      const result = validateWord('', knownPatterns);
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

    it('returns 1.0 for empty word list', () => {
      expect(calculateDecodability([], knownPatterns, sightWords)).toBe(1.0);
    });

    it('returns 0 when no words are decodable', () => {
      const words = ['tree', 'blue', 'green'];
      expect(calculateDecodability(words, knownPatterns, sightWords)).toBe(0);
    });
  });

  describe('annotateWords', () => {
    it('annotates a simple sentence', () => {
      const result = annotateWords('the cat sat', knownPatterns, sightWords);
      expect(result).toHaveLength(3);
      expect(result[0]!.sightWord).toBe(true);
      expect(result[0]!.text).toBe('the');
      expect(result[1]!.decodable).toBe(true);
      expect(result[1]!.text).toBe('cat');
      expect(result[2]!.decodable).toBe(true);
      expect(result[2]!.text).toBe('sat');
    });

    it('returns empty array for empty string', () => {
      expect(annotateWords('', knownPatterns, sightWords)).toEqual([]);
    });

    it('handles multiple spaces between words', () => {
      const result = annotateWords('cat   sat', knownPatterns, sightWords);
      expect(result).toHaveLength(2);
    });

    it('marks unknown words correctly', () => {
      const result = annotateWords('the tree is tall', knownPatterns, sightWords);
      expect(result[1]!.decodable).toBe(false);
      expect(result[1]!.sightWord).toBe(false);
      expect(result[3]!.decodable).toBe(false);
    });
  });

  describe('pattern coverage', () => {
    it('validates VCe patterns', () => {
      const patterns = ['VCe-a', 'VCe-i', 'VCe-o'];
      expect(validateWord('cake', patterns).decodable).toBe(true);
      expect(validateWord('ride', patterns).decodable).toBe(true);
      expect(validateWord('bone', patterns).decodable).toBe(true);
    });

    it('validates vowel team patterns', () => {
      const patterns = ['VT-ee', 'VT-ea', 'VT-ai', 'VT-ay', 'VT-oa'];
      expect(validateWord('tree', patterns).decodable).toBe(true);
      expect(validateWord('read', patterns).decodable).toBe(true);
      expect(validateWord('rain', patterns).decodable).toBe(true);
      expect(validateWord('play', patterns).decodable).toBe(true);
      expect(validateWord('boat', patterns).decodable).toBe(true);
    });

    it('validates r-controlled patterns', () => {
      const patterns = ['RC-ar', 'RC-or', 'RC-er', 'RC-ir', 'RC-ur'];
      expect(validateWord('car', patterns).decodable).toBe(true);
      expect(validateWord('for', patterns).decodable).toBe(true);
      expect(validateWord('her', patterns).decodable).toBe(true);
      expect(validateWord('bird', patterns).decodable).toBe(true);
      expect(validateWord('burn', patterns).decodable).toBe(true);
    });

    it('validates digraph ck pattern', () => {
      expect(validateWord('back', ['DG-ck']).decodable).toBe(true);
      expect(validateWord('kick', ['DG-ck']).decodable).toBe(true);
      // ck not at end should not match
      expect(validateWord('ckab', ['DG-ck']).decodable).toBe(false);
    });
  });
});
