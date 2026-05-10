/**
 * useTypingProgress — anonymous-first progress storage.
 *
 * Wraps localStorage under `typing:progress:v1`. When a learner is active
 * and the user is signed in, future phases will mirror writes to the
 * `/api/typing/progress` route. For now this is anonymous-only.
 *
 * The composable returns refs that consumers can render reactively.
 */
import {
  TYPING_PROGRESS_LOCAL_STORAGE_KEY,
  emptyLocalProgress,
  type LocalAttempt,
  type LocalKeyStat,
  type LocalProgress,
} from '~~/shared/typing-types';

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

export type UseTypingProgress = {
  progress: Ref<LocalProgress>;
  recordAttempt: (attempt: LocalAttempt, perKeyStats?: Record<string, LocalKeyStat>) => void;
  setCurrentStage: (stage: number) => void;
  reset: () => void;
};

export function useTypingProgress(): UseTypingProgress {
  const progress = useState<LocalProgress>('typing:progress', () => readStorage());

  // Re-read on mount in case localStorage was updated by another tab.
  if (import.meta.client) {
    progress.value = readStorage();
  }

  function recordAttempt(attempt: LocalAttempt, perKeyStats?: Record<string, LocalKeyStat>) {
    const next: LocalProgress = {
      ...progress.value,
      attempts: [...progress.value.attempts, attempt].slice(-200),
      keyStats: mergeKeyStats(progress.value.keyStats, perKeyStats ?? {}),
    };
    progress.value = next;
    writeStorage(next);
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

  return { progress, recordAttempt, setCurrentStage, reset };
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
