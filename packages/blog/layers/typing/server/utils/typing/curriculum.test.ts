import { describe, expect, it } from 'vitest';
import {
  CAPITALS_STAGE,
  CONSOLIDATION_STAGES,
  MIN_GATE_ATTEMPT_CHARS,
} from '../../../../../shared/typing-types';
import { getBuiltInLessons, getStage, getStages, unlockedKeysForStage } from './curriculum';

describe('typing curriculum', () => {
  it('exposes 20 stages with cumulative unlocked keys', () => {
    const stages = getStages();
    expect(stages).toHaveLength(20);

    const stage1 = stages[0];
    expect(stage1?.unlocked).toContain('f');
    expect(stage1?.unlocked).toContain('j');
    expect(stage1?.unlocked).toContain(' ');
    expect(stage1?.unlocked).not.toContain('e');

    const stage7 = stages[6];
    // Cumulative: should include keys from stages 1-7
    expect(stage7?.unlocked).toEqual(
      expect.arrayContaining([
        'f',
        'j',
        'd',
        'k',
        's',
        'l',
        'a',
        ';',
        'g',
        'h',
        'r',
        'u',
        'e',
        'i',
      ]),
    );
  });

  it('targetWpm increases with stage', () => {
    const earlyTarget = getStage(1)?.targetWpm ?? 0;
    const lateTarget = getStage(20)?.targetWpm ?? 0;
    expect(lateTarget).toBeGreaterThan(earlyTarget);
    expect(lateTarget).toBeGreaterThanOrEqual(30);
    expect(getStage(1)?.targetAccuracy).toBe(0.95);
  });

  it('returns the unlocked set for a given stage', () => {
    expect(unlockedKeysForStage(1)).toContain('f');
    expect(unlockedKeysForStage(1)).not.toContain('p');
    expect(unlockedKeysForStage(9)).toContain('p');
  });

  it('built-in lessons cover every stage with deterministic slugs', () => {
    const lessons = getBuiltInLessons();
    expect(lessons.length).toBeGreaterThan(0);

    const slugs = new Set(lessons.map((l) => l.slug));
    // Slugs are unique (idempotent upsert key).
    expect(slugs.size).toBe(lessons.length);

    // Every stage 1..20 has at least one lesson.
    for (let stage = 1; stage <= 20; stage++) {
      const hasLesson = lessons.some((l) => l.stage === stage);
      expect(hasLesson, `stage ${stage} should have at least one lesson`).toBe(true);
    }
  });

  it('lesson text only uses chars from the unlocked set, across many seeds', () => {
    // Stage 16+ additionally allows uppercase letters (the capitals stage
    // makes the engine case-sensitive); everything else must be unlocked.
    for (let seed = 0; seed < 12; seed++) {
      for (const lesson of getBuiltInLessons(seed)) {
        const allowed = new Set(unlockedKeysForStage(lesson.stage));
        if (lesson.stage >= CAPITALS_STAGE) {
          for (let c = 65; c <= 90; c++) allowed.add(String.fromCharCode(c));
        }
        for (const ch of lesson.text) {
          expect(
            allowed.has(ch),
            `lesson ${lesson.slug} (seed ${seed}) contains forbidden char ${JSON.stringify(ch)}`,
          ).toBe(true);
        }
      }
    }
  });

  it('every lesson is long enough to be gate-eligible', () => {
    for (const lesson of getBuiltInLessons()) {
      expect(
        lesson.text.length,
        `lesson ${lesson.slug} too short (${lesson.text.length})`,
      ).toBeGreaterThanOrEqual(MIN_GATE_ATTEMPT_CHARS);
    }
  });

  it('has a consolidation lesson at exactly the row-boundary stages', () => {
    const lessons = getBuiltInLessons();
    const consolidationStages = lessons
      .filter((l) => l.kind === 'consolidation')
      .map((l) => l.stage)
      .sort((a, b) => a - b);
    expect(consolidationStages).toEqual([...CONSOLIDATION_STAGES]);
  });

  it('has accumulation (mixed practice) lessons at odd stages 5-15', () => {
    const stages = getBuiltInLessons()
      .filter((l) => l.kind === 'accumulation')
      .map((l) => l.stage)
      .sort((a, b) => a - b);
    expect(stages).toEqual([5, 7, 9, 11, 13, 15]);
  });

  it('skips sentence lessons for stages 1-3 (too few letters for meaning)', () => {
    const lessons = getBuiltInLessons();
    for (const stage of [1, 2, 3]) {
      expect(lessons.some((l) => l.stage === stage && l.kind === 'sentence')).toBe(false);
    }
    for (const stage of [4, 10, 20]) {
      expect(lessons.some((l) => l.stage === stage && l.kind === 'sentence')).toBe(true);
    }
  });

  it('regenerates different text for a different seed, same slugs', () => {
    const canonical = getBuiltInLessons(0);
    const reseeded = getBuiltInLessons(99);
    expect(reseeded.map((l) => l.slug)).toEqual(canonical.map((l) => l.slug));
    const changed = canonical.filter((l, i) => l.text !== reseeded[i]?.text);
    expect(changed.length).toBeGreaterThan(10);
  });

  it('is deterministic for a given seed', () => {
    expect(getBuiltInLessons(5)).toEqual(getBuiltInLessons(5));
  });

  it('lesson kinds are within the allowed enum', () => {
    const allowedKinds = new Set([
      'drill',
      'bigram',
      'word',
      'sentence',
      'paragraph',
      'topic',
      'spelling-drill',
      'spelling-sentence',
      'accumulation',
      'consolidation',
    ]);
    for (const lesson of getBuiltInLessons()) {
      expect(allowedKinds.has(lesson.kind)).toBe(true);
    }
  });
});
