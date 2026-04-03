import { describe, it, expect } from 'vitest';
import { extractCharacters, buildCharacterPrompt, CHARACTER_DESCRIPTIONS } from './image-generator';

describe('extractCharacters', () => {
  it('finds a single character', () => {
    expect(extractCharacters('The cat sat on a mat.')).toContain('cat');
  });

  it('finds multiple characters', () => {
    const chars = extractCharacters('The cat and the dog played.');
    expect(chars).toContain('cat');
    expect(chars).toContain('dog');
  });

  it('is case-insensitive', () => {
    expect(extractCharacters('The Cat sat.')).toContain('cat');
    expect(extractCharacters('A BIG DOG ran.')).toContain('dog');
  });

  it('returns empty array when no known characters found', () => {
    expect(extractCharacters('The tree swayed in the wind.')).toEqual([]);
  });

  it('prefers longer key "red hen" over "hen" to avoid duplicates', () => {
    const chars = extractCharacters('The red hen found some grain.');
    expect(chars).toContain('red hen');
    // Should not have duplicate descriptions
    expect(chars).toHaveLength(1);
  });

  it('finds characters across multiple sentences', () => {
    const chars = extractCharacters('The cat ran fast. Then the fish jumped. Dan smiled.');
    expect(chars).toContain('cat');
    expect(chars).toContain('fish');
    expect(chars).toContain('dan');
  });

  it('handles empty string', () => {
    expect(extractCharacters('')).toEqual([]);
  });
});

describe('buildCharacterPrompt', () => {
  it('returns empty string for no characters', () => {
    expect(buildCharacterPrompt([])).toBe('');
  });

  it('returns empty string for unknown characters', () => {
    expect(buildCharacterPrompt(['unicorn', 'dragon'])).toBe('');
  });

  it('builds prompt for known character', () => {
    const result = buildCharacterPrompt(['cat']);
    expect(result).toContain('Characters in the scene:');
    expect(result).toContain(CHARACTER_DESCRIPTIONS['cat']);
  });

  it('builds prompt for multiple known characters', () => {
    const result = buildCharacterPrompt(['cat', 'dog']);
    expect(result).toContain(CHARACTER_DESCRIPTIONS['cat']);
    expect(result).toContain(CHARACTER_DESCRIPTIONS['dog']);
  });

  it('filters out unknown characters and includes known ones', () => {
    const result = buildCharacterPrompt(['cat', 'unicorn', 'fish']);
    expect(result).toContain(CHARACTER_DESCRIPTIONS['cat']);
    expect(result).toContain(CHARACTER_DESCRIPTIONS['fish']);
    expect(result).not.toContain('unicorn');
  });
});
