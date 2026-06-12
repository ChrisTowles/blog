// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  CONSOLIDATION_STAGES,
  MIN_GATE_ATTEMPT_CHARS,
  attemptPassesStageGate,
  shouldAdvanceStage,
  stageTargetWpm,
  type AttemptLessonContext,
  type LocalAttempt,
} from './typing-types';

describe('stageTargetWpm', () => {
  it('returns 5 WPM for stages 1-3', () => {
    expect(stageTargetWpm(1)).toBe(5);
    expect(stageTargetWpm(2)).toBe(5);
    expect(stageTargetWpm(3)).toBe(5);
  });

  it('returns 8 WPM for stages 4-6', () => {
    expect(stageTargetWpm(4)).toBe(8);
    expect(stageTargetWpm(5)).toBe(8);
    expect(stageTargetWpm(6)).toBe(8);
  });

  it('returns 12 WPM for stages 7-9', () => {
    expect(stageTargetWpm(7)).toBe(12);
    expect(stageTargetWpm(8)).toBe(12);
    expect(stageTargetWpm(9)).toBe(12);
  });

  it('returns 16 WPM for stages 10-12', () => {
    expect(stageTargetWpm(10)).toBe(16);
    expect(stageTargetWpm(11)).toBe(16);
    expect(stageTargetWpm(12)).toBe(16);
  });

  it('returns 20 WPM for stages 13-15', () => {
    expect(stageTargetWpm(13)).toBe(20);
    expect(stageTargetWpm(14)).toBe(20);
    expect(stageTargetWpm(15)).toBe(20);
  });

  it('returns 25 WPM for stages 16-18', () => {
    expect(stageTargetWpm(16)).toBe(25);
    expect(stageTargetWpm(17)).toBe(25);
    expect(stageTargetWpm(18)).toBe(25);
  });

  it('returns 30 WPM for stages 19-20', () => {
    expect(stageTargetWpm(19)).toBe(30);
    expect(stageTargetWpm(20)).toBe(30);
  });
});

// --- Mastery gate -----------------------------------------------------------

function makeAttempt(
  overrides: Partial<LocalAttempt> & { lesson?: AttemptLessonContext },
): LocalAttempt {
  return {
    lessonId: null,
    gameSlug: null,
    wpm: 30,
    netWpm: 30,
    accuracy: 1,
    durationMs: 60_000,
    errorsByKey: {},
    completedAt: '2026-06-12T00:00:00Z',
    ...overrides,
  };
}

function lessonCtx(overrides: Partial<AttemptLessonContext> = {}): AttemptLessonContext {
  return { slug: 'stage-2-drill', stage: 2, kind: 'drill', textLength: 80, ...overrides };
}

describe('attemptPassesStageGate', () => {
  it('passes a stage-matched, long-enough, accurate, fast-enough attempt', () => {
    expect(attemptPassesStageGate(makeAttempt({ lesson: lessonCtx() }), 2)).toBe(true);
  });

  it('rejects attempts without lesson context (games, legacy attempts)', () => {
    expect(attemptPassesStageGate(makeAttempt({}), 2)).toBe(false);
    expect(
      attemptPassesStageGate(makeAttempt({ gameSlug: 'letter-rain', lesson: lessonCtx() }), 2),
    ).toBe(false);
  });

  it('rejects attempts on lessons from a different stage', () => {
    expect(attemptPassesStageGate(makeAttempt({ lesson: lessonCtx({ stage: 1 }) }), 2)).toBe(false);
    expect(attemptPassesStageGate(makeAttempt({ lesson: lessonCtx({ stage: 9 }) }), 2)).toBe(false);
  });

  it('rejects attempts on texts shorter than MIN_GATE_ATTEMPT_CHARS', () => {
    const short = makeAttempt({ lesson: lessonCtx({ textLength: MIN_GATE_ATTEMPT_CHARS - 1 }) });
    expect(attemptPassesStageGate(short, 2)).toBe(false);
  });

  it('rejects low accuracy and low NET wpm (gross wpm is ignored)', () => {
    expect(attemptPassesStageGate(makeAttempt({ accuracy: 0.9, lesson: lessonCtx() }), 2)).toBe(
      false,
    );
    // Gross 30 but net 3 — fast-and-sloppy must not pass (stage 2 target is 5).
    expect(
      attemptPassesStageGate(makeAttempt({ wpm: 30, netWpm: 3, lesson: lessonCtx() }), 2),
    ).toBe(false);
  });
});

describe('shouldAdvanceStage', () => {
  it('requires passes on at least two distinct lessons', () => {
    const onePass = [makeAttempt({ lesson: lessonCtx() })];
    expect(shouldAdvanceStage(onePass, 2)).toBe(false);

    const sameLessonTwice = [
      makeAttempt({ lesson: lessonCtx() }),
      makeAttempt({ lesson: lessonCtx() }),
    ];
    expect(shouldAdvanceStage(sameLessonTwice, 2)).toBe(false);

    const twoLessons = [
      makeAttempt({ lesson: lessonCtx() }),
      makeAttempt({ lesson: lessonCtx({ slug: 'stage-2-words', kind: 'word' }) }),
    ];
    expect(shouldAdvanceStage(twoLessons, 2)).toBe(true);
  });

  it('ignores failing attempts and other-stage passes', () => {
    const attempts = [
      makeAttempt({ accuracy: 0.8, lesson: lessonCtx() }),
      makeAttempt({ lesson: lessonCtx({ slug: 'stage-1-drill', stage: 1 }) }),
      makeAttempt({ lesson: lessonCtx({ slug: 'stage-2-words', kind: 'word' }) }),
    ];
    expect(shouldAdvanceStage(attempts, 2)).toBe(false);
  });

  it('requires a consolidation pass at row-boundary stages', () => {
    for (const stage of CONSOLIDATION_STAGES) {
      const withoutConsolidation = [
        makeAttempt({ lesson: lessonCtx({ slug: `stage-${stage}-drill`, stage }) }),
        makeAttempt({
          lesson: lessonCtx({ slug: `stage-${stage}-words`, stage, kind: 'word' }),
        }),
      ];
      expect(shouldAdvanceStage(withoutConsolidation, stage), `stage ${stage}`).toBe(false);

      const withConsolidation = [
        makeAttempt({ lesson: lessonCtx({ slug: `stage-${stage}-drill`, stage }) }),
        makeAttempt({
          lesson: lessonCtx({
            slug: `stage-${stage}-consolidation`,
            stage,
            kind: 'consolidation',
            textLength: 200,
          }),
        }),
      ];
      expect(shouldAdvanceStage(withConsolidation, stage), `stage ${stage}`).toBe(true);
    }
  });
});
