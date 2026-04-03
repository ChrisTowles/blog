import { describe, it, expect } from 'vitest';
import { PHONICS_SEED, SIGHT_WORDS_BY_PHASE } from './phonics-seed';
import type { PhonicsPhase } from '../../../shared/reading-types';

describe('PHONICS_SEED', () => {
  it('contains units for all 4 phases', () => {
    const phases = new Set(PHONICS_SEED.map((u) => u.phase));
    expect(phases).toEqual(new Set([1, 2, 3, 4]));
  });

  it('has unique orderIndex within each phase', () => {
    const byPhase = new Map<number, number[]>();
    for (const unit of PHONICS_SEED) {
      const indices = byPhase.get(unit.phase) ?? [];
      indices.push(unit.orderIndex);
      byPhase.set(unit.phase, indices);
    }
    for (const [phase, indices] of byPhase) {
      const unique = new Set(indices);
      expect(unique.size, `Phase ${phase} has duplicate orderIndex`).toBe(indices.length);
    }
  });

  it('every unit has non-empty patterns array', () => {
    for (const unit of PHONICS_SEED) {
      expect(unit.patterns.length, `${unit.name} has empty patterns`).toBeGreaterThan(0);
    }
  });

  it('every unit has a non-empty name and description', () => {
    for (const unit of PHONICS_SEED) {
      expect(unit.name.length).toBeGreaterThan(0);
      expect(unit.description.length).toBeGreaterThan(0);
    }
  });

  it('has no duplicate pattern names across all units', () => {
    const allPatterns = PHONICS_SEED.flatMap((u) => u.patterns);
    const unique = new Set(allPatterns);
    expect(unique.size).toBe(allPatterns.length);
  });

  it('orderIndex values are sequential starting from 1 within each phase', () => {
    const byPhase = new Map<number, number[]>();
    for (const unit of PHONICS_SEED) {
      const indices = byPhase.get(unit.phase) ?? [];
      indices.push(unit.orderIndex);
      byPhase.set(unit.phase, indices);
    }
    for (const [phase, indices] of byPhase) {
      const sorted = [...indices].sort((a, b) => a - b);
      expect(sorted[0], `Phase ${phase} should start at 1`).toBe(1);
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i], `Phase ${phase} gap at index ${i}`).toBe(sorted[i - 1]! + 1);
      }
    }
  });
});

describe('SIGHT_WORDS_BY_PHASE', () => {
  it('has entries for all 4 phases', () => {
    const phases: PhonicsPhase[] = [1, 2, 3, 4];
    for (const phase of phases) {
      expect(SIGHT_WORDS_BY_PHASE[phase].length).toBeGreaterThan(0);
    }
  });

  it('all sight words are lowercase (except I)', () => {
    for (const phase of [1, 2, 3, 4] as PhonicsPhase[]) {
      for (const word of SIGHT_WORDS_BY_PHASE[phase]) {
        if (word !== 'I') {
          expect(word, `"${word}" in phase ${phase} should be lowercase`).toBe(word.toLowerCase());
        }
      }
    }
  });

  it('has no duplicate sight words within a phase', () => {
    for (const phase of [1, 2, 3, 4] as PhonicsPhase[]) {
      const words = SIGHT_WORDS_BY_PHASE[phase];
      const unique = new Set(words);
      expect(unique.size, `Phase ${phase} has duplicate sight words`).toBe(words.length);
    }
  });
});
