import type { StoryWord } from '~~/shared/reading-types';

// Phonics rules: maps pattern names to regex matchers
// This is a simplified engine — real implementation will need more rules
const PATTERN_RULES: Record<string, RegExp> = {
  'CVC-short-a': /^[bcdfghjklmnpqrstvwxyz]a[bcdfghjklmnpqrstvwxyz]$/i,
  'CVC-short-i': /^[bcdfghjklmnpqrstvwxyz]i[bcdfghjklmnpqrstvwxyz]$/i,
  'CVC-short-o': /^[bcdfghjklmnpqrstvwxyz]o[bcdfghjklmnpqrstvwxyz]$/i,
  'CVC-short-u': /^[bcdfghjklmnpqrstvwxyz]u[bcdfghjklmnpqrstvwxyz]$/i,
  'CVC-short-e': /^[bcdfghjklmnpqrstvwxyz]e[bcdfghjklmnpqrstvwxyz]$/i,
  'DG-sh': /sh/i,
  'DG-th': /th/i,
  'DG-ch': /ch/i,
  'DG-ck': /ck$/i,
  'VCe-a': /^[bcdfghjklmnpqrstvwxyz]a[bcdfghjklmnpqrstvwxyz]e$/i,
  'VCe-i': /^[bcdfghjklmnpqrstvwxyz]i[bcdfghjklmnpqrstvwxyz]e$/i,
  'VCe-o': /^[bcdfghjklmnpqrstvwxyz]o[bcdfghjklmnpqrstvwxyz]e$/i,
  'VT-ee': /ee/i,
  'VT-ea': /ea/i,
  'VT-ai': /ai/i,
  'VT-ay': /ay/i,
  'VT-oa': /oa/i,
  'RC-ar': /ar/i,
  'RC-or': /or/i,
  'RC-er': /er/i,
  'RC-ir': /ir/i,
  'RC-ur': /ur/i,
};

export function validateWord(
  word: string,
  knownPatterns: string[],
  sightWords: string[] = [],
): StoryWord {
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');

  if (sightWords.includes(cleanWord)) {
    return { text: word, decodable: false, pattern: null, sightWord: true };
  }

  for (const pattern of knownPatterns) {
    const rule = PATTERN_RULES[pattern];
    if (rule && rule.test(cleanWord)) {
      return { text: word, decodable: true, pattern, sightWord: false };
    }
  }

  return { text: word, decodable: false, pattern: null, sightWord: false };
}

export function calculateDecodability(
  words: string[],
  knownPatterns: string[],
  sightWords: string[] = [],
): number {
  if (words.length === 0) return 1.0;

  const validated = words.map((w) => validateWord(w, knownPatterns, sightWords));
  const decodableCount = validated.filter((w) => w.decodable || w.sightWord).length;

  return decodableCount / words.length;
}

export function annotateWords(
  text: string,
  knownPatterns: string[],
  sightWords: string[] = [],
): StoryWord[] {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => validateWord(word, knownPatterns, sightWords));
}
