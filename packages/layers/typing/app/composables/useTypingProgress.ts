/**
 * useTypingProgress — anonymous-first progress storage.
 *
 * Wraps localStorage under `typing:progress:v1` for anonymous users.
 * When the active learner is a real DB row, attempts are also POSTed to
 * `/api/typing/progress` (best-effort; localStorage is the source of
 * truth for the UI even when logged in so we never block on the network).
 *
 * Game attempts call `recordGameAttempt({ gameSlug, ... })` so attempts get
 * tagged.
 */
import {
  TYPING_PROGRESS_LOCAL_STORAGE_KEY,
  emptyLocalProgress,
  stageTargetWpm,
  type LocalAttempt,
  type LocalKeyStat,
  type LocalProgress,
} from '~~/shared/typing-types';

const TYPING_BESTS_LOCAL_STORAGE_KEY = 'typing:bests:v1';

export type LessonBest = {
  wpm: number;
  accuracy: number;
  durationMs: number;
  recordedAt: string;
};

type LessonBestMap = Record<string, LessonBest>;

let bestsCache: LessonBestMap | null = null;

function readBests(): LessonBestMap {
  if (bestsCache) return bestsCache;
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(TYPING_BESTS_LOCAL_STORAGE_KEY);
    bestsCache = raw && typeof raw === 'string' ? (JSON.parse(raw) as LessonBestMap) : {};
    if (!bestsCache || typeof bestsCache !== 'object') bestsCache = {};
  } catch {
    bestsCache = {};
  }
  return bestsCache;
}

function writeBests(b: LessonBestMap) {
  bestsCache = b;
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(TYPING_BESTS_LOCAL_STORAGE_KEY, JSON.stringify(b));
  } catch {
    // best-effort; lessons still work without PR tracking.
  }
}

function readStorage(): LocalProgress {
  if (typeof localStorage === 'undefined') return emptyLocalProgress();
  try {
    const raw = localStorage.getItem(TYPING_PROGRESS_LOCAL_STORAGE_KEY);
    if (!raw) return emptyLocalProgress();
    const parsed = JSON.parse(raw) as Partial<LocalProgress>;
    if (parsed.schemaVersion !== 1) return emptyLocalProgress();
    return {
      schemaVersion: 1,
      currentStage: parsed.currentStage ?? 1,
      attempts: parsed.attempts ?? [],
      keyStats: parsed.keyStats ?? {},
    };
  } catch {
    return emptyLocalProgress();
  }
}

function writeStorage(p: LocalProgress) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(TYPING_PROGRESS_LOCAL_STORAGE_KEY, JSON.stringify(p));
  } catch {
    // Ignore quota errors — anonymous progress is best-effort.
  }
}

export type RecordAttemptInput = LocalAttempt;

export type RecordGameAttemptInput = {
  gameSlug: string;
  wpm: number;
  netWpm: number;
  accuracy: number;
  durationMs: number;
  errorsByKey: Record<string, number>;
  completedAt?: string;
  /** Spelling list this attempt is associated with, if any (Lake Leap spelling mode). */
  spellingListId?: number | null;
  /** Words cleared during the round; feeds the spelling-mastery hook. */
  wordsCleared?: string[];
  /** Words errored during the round; resets streak in the spelling-mastery hook. */
  wordsErrored?: string[];
};

export type RecordAttemptResult = {
  /** True when this attempt cleared the stage's mastery gate. */
  stageAdvanced: boolean;
  previousStage: number;
  currentStage: number;
};

export type UseTypingProgress = {
  progress: Ref<LocalProgress>;
  recordAttempt: (
    attempt: RecordAttemptInput,
    perKeyStats?: Record<string, LocalKeyStat>,
  ) => RecordAttemptResult;
  recordGameAttempt: (
    attempt: RecordGameAttemptInput,
    perKeyStats?: Record<string, LocalKeyStat>,
  ) => RecordAttemptResult;
  /** Read the personal best for a lesson slug, or null if none yet. */
  getLessonBest: (slug: string) => LessonBest | null;
  /**
   * Save a new best if `wpm` beats the existing one. Returns whether it
   * was a new best plus the previous record (or null when first attempt).
   */
  recordLessonBest: (
    slug: string,
    attempt: { wpm: number; accuracy: number; durationMs: number },
  ) => { isNewBest: boolean; previous: LessonBest | null };
  setCurrentStage: (stage: number) => void;
  reset: () => void;
};

export function useTypingProgress(): UseTypingProgress {
  const progress = useState<LocalProgress>('typing:progress', () => readStorage());

  // Re-read on mount in case localStorage was updated by another tab.
  if (import.meta.client) {
    progress.value = readStorage();
  }

  const { activeLearnerId } = useActiveLearner();

  type ServerExtras = {
    spellingListId?: number | null;
    wordsCleared?: string[];
    wordsErrored?: string[];
  };

  function maybePushToServer(
    attempt: LocalAttempt,
    perKeyStats: Record<string, LocalKeyStat>,
    extras: ServerExtras = {},
  ) {
    if (!import.meta.client) return;
    const id = activeLearnerId.value;
    if (id === 'anon' || typeof id !== 'number') return;
    // Fire-and-forget; localStorage remains the UI source of truth.
    void $fetch('/api/typing/progress', {
      method: 'POST',
      body: {
        learnerId: id,
        lessonId: attempt.lessonId,
        gameSlug: attempt.gameSlug,
        wpm: attempt.wpm,
        netWpm: attempt.netWpm,
        accuracy: attempt.accuracy,
        durationMs: attempt.durationMs,
        errorsByKey: attempt.errorsByKey,
        perKeyStats,
        spellingListId: extras.spellingListId ?? null,
        wordsCleared: extras.wordsCleared ?? [],
        wordsErrored: extras.wordsErrored ?? [],
      },
    }).catch(() => {
      // Network failures fall through silently.
    });
  }

  function recordAttempt(
    attempt: RecordAttemptInput,
    perKeyStats?: Record<string, LocalKeyStat>,
    extras: ServerExtras = {},
  ): RecordAttemptResult {
    const stats = perKeyStats ?? {};
    const nextAttempts = [...progress.value.attempts, attempt].slice(-200);
    const previousStage = progress.value.currentStage;
    let nextStage = previousStage;

    // Mastery gating — advance the stage when the latest attempt clears
    // 95% accuracy + the stage's target WPM. The lesson runner reports
    // gross WPM in `attempt.wpm`. We apply this only to drill / sentence
    // attempts; game attempts use their own pacing rules.
    if (attempt.gameSlug === null && attempt.lessonId !== null) {
      const target = stageTargetWpm(previousStage);
      if (attempt.accuracy >= 0.95 && attempt.wpm >= target) {
        nextStage = Math.min(20, previousStage + 1);
      }
    }

    const next: LocalProgress = {
      ...progress.value,
      currentStage: nextStage,
      attempts: nextAttempts,
      keyStats: mergeKeyStats(progress.value.keyStats, stats),
    };
    progress.value = next;
    writeStorage(next);
    maybePushToServer(attempt, stats, extras);

    return {
      stageAdvanced: nextStage > previousStage,
      previousStage,
      currentStage: nextStage,
    };
  }

  function recordGameAttempt(
    attempt: RecordGameAttemptInput,
    perKeyStats?: Record<string, LocalKeyStat>,
  ): RecordAttemptResult {
    return recordAttempt(
      {
        lessonId: null,
        gameSlug: attempt.gameSlug,
        wpm: attempt.wpm,
        netWpm: attempt.netWpm,
        accuracy: attempt.accuracy,
        durationMs: attempt.durationMs,
        errorsByKey: attempt.errorsByKey,
        completedAt: attempt.completedAt ?? new Date().toISOString(),
      },
      perKeyStats,
      {
        spellingListId: attempt.spellingListId ?? null,
        wordsCleared: attempt.wordsCleared ?? [],
        wordsErrored: attempt.wordsErrored ?? [],
      },
    );
  }

  function setCurrentStage(stage: number) {
    const next = { ...progress.value, currentStage: Math.max(1, Math.min(20, stage)) };
    progress.value = next;
    writeStorage(next);
  }

  function reset() {
    const next = emptyLocalProgress();
    progress.value = next;
    writeStorage(next);
  }

  function getLessonBest(slug: string): LessonBest | null {
    return readBests()[slug] ?? null;
  }

  function recordLessonBest(
    slug: string,
    attempt: { wpm: number; accuracy: number; durationMs: number },
  ): { isNewBest: boolean; previous: LessonBest | null } {
    const bests = readBests();
    const previous = bests[slug] ?? null;
    const isNewBest = previous === null || attempt.wpm > previous.wpm;
    if (isNewBest) {
      bests[slug] = {
        wpm: attempt.wpm,
        accuracy: attempt.accuracy,
        durationMs: attempt.durationMs,
        recordedAt: new Date().toISOString(),
      };
      writeBests(bests);
    }
    return { isNewBest, previous };
  }

  return {
    progress,
    recordAttempt,
    recordGameAttempt,
    getLessonBest,
    recordLessonBest,
    setCurrentStage,
    reset,
  };
}

function mergeKeyStats(
  existing: Record<string, LocalKeyStat>,
  incoming: Record<string, LocalKeyStat>,
): Record<string, LocalKeyStat> {
  const out: Record<string, LocalKeyStat> = { ...existing };
  for (const [key, inc] of Object.entries(incoming)) {
    const prev = out[key] ?? { attempts: 0, errors: 0, avgMs: 0 };
    const totalAttempts = prev.attempts + inc.attempts;
    const totalErrors = prev.errors + inc.errors;
    const weightedAvg =
      totalAttempts > 0
        ? (prev.avgMs * prev.attempts + inc.avgMs * inc.attempts) / totalAttempts
        : 0;
    out[key] = {
      attempts: totalAttempts,
      errors: totalErrors,
      avgMs: weightedAvg,
    };
  }
  return out;
}
