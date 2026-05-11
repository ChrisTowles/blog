/**
 * useTypingProgress — per-learner progress storage.
 *
 * Each active learner gets their own localStorage namespace so switching
 * between siblings shows distinct WPM, PRs, and current stage. The
 * anonymous "Acting as You" user keeps the legacy unsuffixed key so any
 * pre-existing local progress stays attached to them.
 *
 * When the active learner is a real DB row, attempts are also POSTed to
 * `/api/typing/progress` (best-effort; localStorage is the source of
 * truth for the UI even when logged in so we never block on the network).
 */
import {
  MAX_STAGE,
  TYPING_PROGRESS_LOCAL_STORAGE_KEY,
  emptyLocalProgress,
  stageTargetWpm,
  type LocalAttempt,
  type LocalKeyStat,
  type LocalProgress,
} from '~~/shared/typing-types';
import type { ActiveLearnerId } from './useActiveLearner';

const TYPING_BESTS_LOCAL_STORAGE_KEY = 'typing:bests:v1';

export type LessonBest = {
  wpm: number;
  accuracy: number;
  durationMs: number;
  recordedAt: string;
};

type LessonBestMap = Record<string, LessonBest>;

function progressKeyFor(id: ActiveLearnerId): string {
  return id === 'anon'
    ? TYPING_PROGRESS_LOCAL_STORAGE_KEY
    : `${TYPING_PROGRESS_LOCAL_STORAGE_KEY}:learner:${id}`;
}

function bestsKeyFor(id: ActiveLearnerId): string {
  return id === 'anon'
    ? TYPING_BESTS_LOCAL_STORAGE_KEY
    : `${TYPING_BESTS_LOCAL_STORAGE_KEY}:learner:${id}`;
}

// Per-learner bests cache keyed by full storage key. A naive module-level
// cache would leak one learner's PRs into another.
const bestsCacheByKey = new Map<string, LessonBestMap>();

function isLessonBest(val: unknown): val is LessonBest {
  if (!val || typeof val !== 'object') return false;
  const v = val as Record<string, unknown>;
  return (
    typeof v.wpm === 'number' &&
    typeof v.accuracy === 'number' &&
    typeof v.durationMs === 'number' &&
    typeof v.recordedAt === 'string'
  );
}

function readBests(id: ActiveLearnerId): LessonBestMap {
  const key = bestsKeyFor(id);
  const cached = bestsCacheByKey.get(key);
  if (cached) return cached;
  if (typeof localStorage === 'undefined') return {};
  let out: LessonBestMap = {};
  try {
    const raw = localStorage.getItem(key);
    if (raw && typeof raw === 'string') {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        // Drop any entries that don't match the LessonBest shape — guards
        // against half-written rows or older schema leaking in.
        for (const [slug, entry] of Object.entries(parsed as Record<string, unknown>)) {
          if (isLessonBest(entry)) out[slug] = entry;
        }
      }
    }
  } catch {
    out = {};
  }
  bestsCacheByKey.set(key, out);
  return out;
}

function writeBests(id: ActiveLearnerId, b: LessonBestMap) {
  const key = bestsKeyFor(id);
  bestsCacheByKey.set(key, b);
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(b));
  } catch {
    // best-effort; lessons still work without PR tracking.
  }
}

function readStorage(id: ActiveLearnerId): LocalProgress {
  if (typeof localStorage === 'undefined') return emptyLocalProgress();
  try {
    const raw = localStorage.getItem(progressKeyFor(id));
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

function writeStorage(id: ActiveLearnerId, p: LocalProgress) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(progressKeyFor(id), JSON.stringify(p));
  } catch {
    // Ignore quota errors — progress writes are best-effort.
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
  const { activeLearnerId, active } = useActiveLearner();

  const progress = useState<LocalProgress>('typing:progress', () =>
    readStorage(activeLearnerId.value),
  );

  // Re-read whenever the active learner changes so switching siblings
  // shows that learner's distinct attempts and current stage. For a
  // real learner we also seed currentStage from the server-tracked
  // value so a fresh device respects progress made elsewhere; the kid
  // is never demoted (local may be ahead from offline practice).
  if (import.meta.client) {
    watch(
      activeLearnerId,
      (id) => {
        const next = readStorage(id);
        if (id !== 'anon' && active.value) {
          next.currentStage = Math.max(next.currentStage, active.value.currentStage);
        }
        progress.value = next;
      },
      { immediate: true },
    );
  }

  // Cross-tab sync — when another tab writes to either keyed slot for
  // the current learner, invalidate our caches and refresh reactive
  // state so the kid sees their PR / current-stage update without a
  // reload.
  if (import.meta.client) {
    const onStorage = (e: StorageEvent) => {
      const id = activeLearnerId.value;
      if (!e.key) return;
      if (e.key === bestsKeyFor(id)) {
        bestsCacheByKey.delete(e.key);
      } else if (e.key === progressKeyFor(id)) {
        progress.value = readStorage(id);
      }
    };
    window.addEventListener('storage', onStorage);
    onScopeDispose(() => {
      window.removeEventListener('storage', onStorage);
    });
  }

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
        nextStage = Math.min(MAX_STAGE, previousStage + 1);
      }
    }

    const next: LocalProgress = {
      ...progress.value,
      currentStage: nextStage,
      attempts: nextAttempts,
      keyStats: mergeKeyStats(progress.value.keyStats, stats),
    };
    const id = activeLearnerId.value;
    progress.value = next;
    writeStorage(id, next);
    maybePushToServer(attempt, stats, extras);
    // If a real learner just cleared the mastery gate, persist the new
    // stage on the learner row so the next sign-in / device respects it.
    if (nextStage > previousStage && id !== 'anon') {
      void $fetch(`/api/typing/learners/${id}/stage`, {
        method: 'PUT',
        body: { currentStage: nextStage },
      }).catch(() => {
        // Network failure: localStorage still has the new stage. The
        // next stage advance or explicit setCurrentStage will retry.
      });
    }

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
    const clamped = Math.max(1, Math.min(MAX_STAGE, stage));
    const id = activeLearnerId.value;
    const next = { ...progress.value, currentStage: clamped };
    progress.value = next;
    writeStorage(id, next);
    if (id !== 'anon') {
      void $fetch(`/api/typing/learners/${id}/stage`, {
        method: 'PUT',
        body: { currentStage: clamped },
      }).catch(() => {
        // best-effort
      });
    }
  }

  function reset() {
    const id = activeLearnerId.value;
    const next = emptyLocalProgress();
    progress.value = next;
    writeStorage(id, next);
  }

  function getLessonBest(slug: string): LessonBest | null {
    return readBests(activeLearnerId.value)[slug] ?? null;
  }

  function recordLessonBest(
    slug: string,
    attempt: { wpm: number; accuracy: number; durationMs: number },
  ): { isNewBest: boolean; previous: LessonBest | null } {
    const id = activeLearnerId.value;
    const bests = readBests(id);
    const previous = bests[slug] ?? null;
    const isNewBest = previous === null || attempt.wpm > previous.wpm;
    if (isNewBest) {
      bests[slug] = {
        wpm: attempt.wpm,
        accuracy: attempt.accuracy,
        durationMs: attempt.durationMs,
        recordedAt: new Date().toISOString(),
      };
      writeBests(id, bests);
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
