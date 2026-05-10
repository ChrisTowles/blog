import { describe, expect, it } from 'vitest';
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

  it('lesson text only uses chars from the unlocked set for the stage', () => {
    // Capitals (stage 16+) and spelling-list / topic lessons can break this
    // rule; the curriculum lessons must not.
    const lessons = getBuiltInLessons();
    for (const lesson of lessons) {
      if (lesson.stage >= 16) continue; // capitals + numbers + symbols stages allowed
      const unlocked = new Set(unlockedKeysForStage(lesson.stage));
      for (const ch of lesson.text) {
        expect(unlocked.has(ch), `lesson ${lesson.slug} contains forbidden char "${ch}"`).toBe(
          true,
        );
      }
    }
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
    ]);
    for (const lesson of getBuiltInLessons()) {
      expect(allowedKinds.has(lesson.kind)).toBe(true);
    }
  });
});
