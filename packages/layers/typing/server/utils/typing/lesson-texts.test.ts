/**
 * Property tests for the procedural lesson-text generators: for every
 * stage and a spread of seeds, generated text must stay within the
 * stage's unlocked character set (uppercase allowed from the capitals
 * stage on), be long enough to be a meaningful run, and actually vary
 * across seeds. Hand-curated sentence/paragraph variants are validated
 * the same way — a letter slip in curated content fails here, not in
 * front of a kid.
 */
import { describe, expect, it } from 'vitest';
import { CAPITALS_STAGE, MIN_GATE_ATTEMPT_CHARS } from '../../../../../blog/shared/typing-types';
import { getStage, getStages, unlockedKeysForStage } from './curriculum';
import {
  COMMON_BIGRAMS,
  KID_WORDS,
  bigramText,
  drillText,
  mulberry32,
  trickyKeysText,
  wordPoolForStage,
  wordText,
} from './lesson-texts';

const SEEDS = Array.from({ length: 26 }, (_, i) => i);

function allowedSetForStage(stage: number): Set<string> {
  const allowed = new Set(unlockedKeysForStage(stage));
  if (stage >= CAPITALS_STAGE) {
    for (let c = 65; c <= 90; c++) allowed.add(String.fromCharCode(c));
  }
  return allowed;
}

function expectWithinUnlocked(text: string, stage: number, label: string) {
  const allowed = allowedSetForStage(stage);
  for (const ch of text) {
    expect(
      allowed.has(ch),
      `${label} (stage ${stage}) contains forbidden char ${JSON.stringify(ch)} in: ${text}`,
    ).toBe(true);
  }
}

describe('mulberry32', () => {
  it('is deterministic and varies by seed', () => {
    const a1 = mulberry32(42);
    const a2 = mulberry32(42);
    const b = mulberry32(43);
    const seqA1 = [a1(), a1(), a1()];
    const seqA2 = [a2(), a2(), a2()];
    const seqB = [b(), b(), b()];
    expect(seqA1).toEqual(seqA2);
    expect(seqA1).not.toEqual(seqB);
  });
});

describe('KID_WORDS', () => {
  it('contains only lowercase a-z words', () => {
    for (const w of KID_WORDS) {
      expect(/^[a-z]+$/.test(w), `bad word: ${JSON.stringify(w)}`).toBe(true);
    }
  });

  it('has a usable pool from stage 4 on, growing with stages', () => {
    let prev = 0;
    for (let stage = 4; stage <= 15; stage++) {
      const pool = wordPoolForStage(unlockedKeysForStage(stage));
      expect(pool.length, `stage ${stage} pool too small`).toBeGreaterThanOrEqual(8);
      expect(pool.length).toBeGreaterThanOrEqual(prev);
      prev = pool.length;
    }
  });

  it('never includes a word with locked letters in a stage pool', () => {
    for (let stage = 4; stage <= 15; stage++) {
      const unlocked = new Set(unlockedKeysForStage(stage));
      for (const w of wordPoolForStage(unlockedKeysForStage(stage))) {
        for (const ch of w) {
          expect(unlocked.has(ch), `stage ${stage} pool word "${w}"`).toBe(true);
        }
      }
    }
  });
});

describe('COMMON_BIGRAMS', () => {
  it('are all two lowercase letters', () => {
    for (const bg of COMMON_BIGRAMS) expect(/^[a-z]{2}$/.test(bg)).toBe(true);
  });
});

describe('drillText / bigramText / wordText across all stages and seeds', () => {
  it('stays within the unlocked set and meets minimum length', () => {
    for (const def of getStages()) {
      for (const seed of SEEDS) {
        const drill = drillText(def, seed);
        expect(drill.length, `drill stage ${def.stage}`).toBeGreaterThanOrEqual(
          MIN_GATE_ATTEMPT_CHARS,
        );
        expectWithinUnlocked(drill, def.stage, 'drill');

        const word = wordText(def, seed);
        expect(word.length, `words stage ${def.stage}`).toBeGreaterThanOrEqual(
          MIN_GATE_ATTEMPT_CHARS,
        );
        expectWithinUnlocked(word, def.stage, 'words');

        const bigram = bigramText(def, seed);
        if (def.stage <= 15) {
          expect(bigram.length, `bigram stage ${def.stage}`).toBeGreaterThanOrEqual(
            MIN_GATE_ATTEMPT_CHARS,
          );
          expectWithinUnlocked(bigram, def.stage, 'bigram');
        } else {
          expect(bigram).toBe('');
        }
      }
    }
  });

  it('varies across seeds (no single memorizable string)', () => {
    const def = getStage(6)!;
    const drills = new Set(SEEDS.map((s) => drillText(def, s)));
    const words = new Set(SEEDS.map((s) => wordText(def, s)));
    expect(drills.size).toBeGreaterThan(1);
    expect(words.size).toBeGreaterThan(1);
  });

  it('is deterministic for a given seed', () => {
    const def = getStage(8)!;
    expect(drillText(def, 7)).toBe(drillText(def, 7));
    expect(wordText(def, 7)).toBe(wordText(def, 7));
    expect(bigramText(def, 7)).toBe(bigramText(def, 7));
  });

  it('bigram lessons use real high-frequency bigrams once enough letters exist', () => {
    const def = getStage(10)!;
    const text = bigramText(def, 0);
    const tokens = new Set(text.split(' ').filter((t) => t.length === 2));
    const common = new Set(COMMON_BIGRAMS);
    const hits = [...tokens].filter((t) => common.has(t));
    expect(hits.length, `expected common bigrams in: ${text}`).toBeGreaterThan(0);
  });
});

describe('trickyKeysText', () => {
  it('features the tricky keys, stays unlocked, and is gate-length', () => {
    for (const stage of [1, 4, 7, 10, 15, 20]) {
      const unlocked = unlockedKeysForStage(stage);
      const letters = unlocked.filter((c) => /[a-z]/.test(c)).slice(0, 2);
      for (const seed of [0, 1, 2, 3]) {
        const text = trickyKeysText(letters, unlocked, seed);
        expect(text.length, `stage ${stage}`).toBeGreaterThanOrEqual(MIN_GATE_ATTEMPT_CHARS);
        expectWithinUnlocked(text, stage, 'tricky');
        for (const k of letters) {
          expect(text.includes(k), `tricky key ${k} missing at stage ${stage}`).toBe(true);
        }
      }
    }
  });

  it('returns empty for no keys', () => {
    expect(trickyKeysText([], unlockedKeysForStage(10), 1)).toBe('');
  });
});
