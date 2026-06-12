// @vitest-environment nuxt
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { effectScope } from 'vue';

// Stub the active-learner composable so the test doesn't need a Nuxt
// cookie state machine or to issue real fetches. We mock the underlying
// module file rather than rely on @nuxt/test-utils' mockNuxtImport so
// the test compiles from the typing layer (no test-utils dep there).
vi.mock('./useActiveLearner', () => ({
  useActiveLearner: () => ({
    activeLearnerId: { value: 'anon' as const },
    active: { value: null },
    learners: { value: [] },
    setActive: () => {},
    setLearners: () => {},
  }),
}));

const TYPING_BESTS_LOCAL_STORAGE_KEY = 'typing:bests:v1';

type StoreMap = Map<string, string>;

function installLocalStorage(): { store: StoreMap; getItem: ReturnType<typeof vi.fn> } {
  const store: StoreMap = new Map();
  const getItem = vi.fn((key: string) => (store.has(key) ? store.get(key)! : null));
  const setItem = vi.fn((key: string, value: string) => {
    store.set(key, String(value));
  });
  const removeItem = vi.fn((key: string) => {
    store.delete(key);
  });
  const clear = vi.fn(() => {
    store.clear();
  });

  // Replace globalThis.localStorage with a fresh in-memory mock per test
  // so module-level bestsCache state in the composable can be probed
  // through the getItem spy without happy-dom interfering.
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem, setItem, removeItem, clear, key: () => null, length: 0 },
  });

  return { store, getItem };
}

// Force a fresh module copy each test so the module-level `bestsCache`
// resets between cases. Without this the first test poisons every
// subsequent one with its cached entries.
async function loadFreshComposable() {
  vi.resetModules();
  const mod = await import('./useTypingProgress');
  return mod.useTypingProgress;
}

describe('useTypingProgress.recordLessonBest', () => {
  beforeEach(() => {
    installLocalStorage();
  });

  it('records the first attempt as a new best with previous=null', async () => {
    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const result = scope.run(() => {
      const { recordLessonBest } = useFresh();
      return recordLessonBest('foo', { wpm: 10, accuracy: 0.9, durationMs: 1000 });
    })!;

    expect(result.isNewBest).toBe(true);
    expect(result.previous).toBeNull();
    scope.stop();
  });

  it('returns isNewBest=false when wpm ties the existing best', async () => {
    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { recordLessonBest } = useFresh();
      recordLessonBest('foo', { wpm: 10, accuracy: 0.9, durationMs: 1000 });
      return recordLessonBest('foo', { wpm: 10, accuracy: 0.95, durationMs: 900 });
    })!;

    expect(out.isNewBest).toBe(false);
    expect(out.previous).not.toBeNull();
    expect(out.previous?.wpm).toBe(10);
    scope.stop();
  });

  it('records a new best when wpm beats the previous', async () => {
    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { recordLessonBest } = useFresh();
      recordLessonBest('foo', { wpm: 10, accuracy: 0.9, durationMs: 1000 });
      return recordLessonBest('foo', { wpm: 15, accuracy: 0.92, durationMs: 800 });
    })!;

    expect(out.isNewBest).toBe(true);
    expect(out.previous).not.toBeNull();
    expect(out.previous?.wpm).toBe(10);
    scope.stop();
  });

  it('getLessonBest returns null for an unknown slug', async () => {
    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { getLessonBest } = useFresh();
      return getLessonBest('never-seen-this-slug');
    })!;
    expect(out).toBeNull();
    scope.stop();
  });

  it('treats corrupt (non-JSON) localStorage as empty bests', async () => {
    const { store } = installLocalStorage();
    store.set(TYPING_BESTS_LOCAL_STORAGE_KEY, '{not-json');

    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { getLessonBest, recordLessonBest } = useFresh();
      const before = getLessonBest('foo');
      const recorded = recordLessonBest('foo', { wpm: 10, accuracy: 0.9, durationMs: 1000 });
      return { before, recorded };
    })!;

    expect(out.before).toBeNull();
    expect(out.recorded.isNewBest).toBe(true);
    expect(out.recorded.previous).toBeNull();
    scope.stop();
  });

  it('treats non-object JSON (array) as empty bests', async () => {
    const { store } = installLocalStorage();
    store.set(TYPING_BESTS_LOCAL_STORAGE_KEY, JSON.stringify(['not', 'an', 'object']));

    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { getLessonBest } = useFresh();
      return getLessonBest('foo');
    })!;
    expect(out).toBeNull();
    scope.stop();
  });

  it('drops corrupt entries while keeping valid ones (runtime validator)', async () => {
    const { store } = installLocalStorage();
    // Mix one valid entry with a junk entry; readBests should keep the
    // valid one and silently drop the bad one.
    store.set(
      TYPING_BESTS_LOCAL_STORAGE_KEY,
      JSON.stringify({
        good: { wpm: 12, accuracy: 0.95, durationMs: 1200, recordedAt: '2026-01-01T00:00:00Z' },
        bad: { wpm: 'not-a-number', accuracy: null },
        alsoBad: 'just-a-string',
        nullEntry: null,
      }),
    );

    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { getLessonBest } = useFresh();
      return {
        good: getLessonBest('good'),
        bad: getLessonBest('bad'),
        alsoBad: getLessonBest('alsoBad'),
        nullEntry: getLessonBest('nullEntry'),
      };
    })!;

    expect(out.good).not.toBeNull();
    expect(out.good?.wpm).toBe(12);
    expect(out.bad).toBeNull();
    expect(out.alsoBad).toBeNull();
    expect(out.nullEntry).toBeNull();
    scope.stop();
  });

  it('reuses bestsCache — localStorage.getItem fires once across many reads', async () => {
    const { getItem } = installLocalStorage();
    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    scope.run(() => {
      const { getLessonBest } = useFresh();
      getLessonBest('a');
      getLessonBest('b');
      getLessonBest('c');
    });

    const bestsReads = getItem.mock.calls.filter(
      (call) => call[0] === TYPING_BESTS_LOCAL_STORAGE_KEY,
    );
    expect(bestsReads.length).toBe(1);
    scope.stop();
  });
});

describe('useTypingProgress.recordAttempt mastery gate', () => {
  beforeEach(() => {
    installLocalStorage();
  });

  function passingAttempt(slug: string, overrides: Record<string, unknown> = {}) {
    return {
      lessonId: null,
      gameSlug: null,
      lesson: { slug, stage: 1, kind: 'drill' as const, textLength: 80 },
      wpm: 30,
      netWpm: 30,
      accuracy: 1,
      durationMs: 60_000,
      errorsByKey: {},
      completedAt: '2026-06-12T00:00:00Z',
      ...overrides,
    };
  }

  it('advances only after passing two DISTINCT lessons at the current stage', async () => {
    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { recordAttempt, progress } = useFresh();
      const first = recordAttempt(passingAttempt('stage-1-drill'));
      const repeat = recordAttempt(passingAttempt('stage-1-drill'));
      const second = recordAttempt(passingAttempt('stage-1-words'));
      return { first, repeat, second, stage: progress.value.currentStage };
    })!;

    expect(out.first.stageAdvanced).toBe(false);
    expect(out.repeat.stageAdvanced).toBe(false);
    expect(out.second.stageAdvanced).toBe(true);
    expect(out.second.previousStage).toBe(1);
    expect(out.second.currentStage).toBe(2);
    expect(out.stage).toBe(2);
    scope.stop();
  });

  it('never advances from failing attempts, short texts, or game attempts', async () => {
    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { recordAttempt, progress } = useFresh();
      recordAttempt(passingAttempt('stage-1-drill', { accuracy: 0.9 }));
      recordAttempt(passingAttempt('stage-1-words', { netWpm: 2 }));
      recordAttempt(
        passingAttempt('stage-1-bigram', {
          lesson: { slug: 'stage-1-bigram', stage: 1, kind: 'bigram' as const, textLength: 20 },
        }),
      );
      recordAttempt(passingAttempt('ignored', { gameSlug: 'letter-rain', lesson: undefined }));
      return progress.value.currentStage;
    })!;

    expect(out).toBe(1);
    scope.stop();
  });

  it('ignores passes on lessons from a different stage', async () => {
    const useFresh = await loadFreshComposable();
    const scope = effectScope();
    const out = scope.run(() => {
      const { recordAttempt, progress } = useFresh();
      recordAttempt(
        passingAttempt('stage-3-drill', {
          lesson: { slug: 'stage-3-drill', stage: 3, kind: 'drill' as const, textLength: 80 },
        }),
      );
      recordAttempt(
        passingAttempt('stage-3-words', {
          lesson: { slug: 'stage-3-words', stage: 3, kind: 'word' as const, textLength: 80 },
        }),
      );
      return progress.value.currentStage;
    })!;

    expect(out).toBe(1);
    scope.stop();
  });
});
