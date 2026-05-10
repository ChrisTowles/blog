/**
 * useTypingEngine — pure-TS typing-input state machine.
 *
 * The engine is consumed by a Vue component (LessonRunner) which feeds it
 * keystroke events. The engine itself does NOT touch the DOM. This makes
 * it trivial to unit test without a browser environment.
 *
 * State machine: idle -> running -> done
 * - First valid keypress transitions idle -> running and starts the clock.
 * - cursor reaching the end of `text` transitions running -> done.
 * - `cancel()` transitions running -> done early.
 *
 * WPM definitions:
 *   gross WPM = (chars typed / 5) / minutes elapsed
 *   net WPM   = gross - (errors / minutes)
 *
 * Accuracy = correctChars / totalCharsTyped (NOT lesson length).
 *
 * Backspace counts as a typed char only if it corrects a wrong char (no
 * penalty for self-correction).
 */
import type { ErrorsByKeyMap, LessonCompleteResult } from '~~/shared/typing-types';

export type EngineState = 'idle' | 'running' | 'done';

export type EngineKeyEvent = {
  key: string;
  /** ms since UNIX epoch — caller passes Date.now() */
  at: number;
};

export type UseTypingEngineOptions = {
  text: string;
  onComplete?: (result: LessonCompleteResult) => void;
  /** Inject a clock for tests; defaults to Date.now */
  clock?: () => number;
};

export type UseTypingEngine = {
  state: Ref<EngineState>;
  cursor: Ref<number>;
  /** chars typed (correct + incorrect). */
  totalTyped: Ref<number>;
  /** correct chars typed (not lesson chars covered). */
  correctTyped: Ref<number>;
  errors: Ref<number>;
  errorsByKey: Ref<ErrorsByKeyMap>;
  perKeyAttempts: Ref<Record<string, number>>;
  perKeyErrorAttempts: Ref<Record<string, number>>;
  perKeyAvgMs: Ref<Record<string, number>>;
  startedAt: Ref<number | null>;
  endedAt: Ref<number | null>;
  /** Current gross WPM (live). */
  wpm: ComputedRef<number>;
  netWpm: ComputedRef<number>;
  accuracy: ComputedRef<number>;
  durationMs: ComputedRef<number>;
  /** The next character the user should type. Empty string when done. */
  nextChar: ComputedRef<string>;
  feed: (e: EngineKeyEvent) => void;
  reset: () => void;
  cancel: () => void;
};

export function useTypingEngine(options: UseTypingEngineOptions): UseTypingEngine {
  const clock = options.clock ?? (() => Date.now());

  const state = ref<EngineState>('idle');
  const cursor = ref(0);
  const totalTyped = ref(0);
  const correctTyped = ref(0);
  const errors = ref(0);
  const errorsByKey = ref<ErrorsByKeyMap>({});
  const perKeyAttempts = ref<Record<string, number>>({});
  const perKeyErrorAttempts = ref<Record<string, number>>({});
  const perKeyAvgMs = ref<Record<string, number>>({});
  const lastKeyAt = ref<number | null>(null);
  const startedAt = ref<number | null>(null);
  const endedAt = ref<number | null>(null);
  // Track which positions in the lesson text are wrong (for backspace correction logic).
  const errorMarks = ref<boolean[]>([]);

  const text = options.text;

  function reset() {
    state.value = 'idle';
    cursor.value = 0;
    totalTyped.value = 0;
    correctTyped.value = 0;
    errors.value = 0;
    errorsByKey.value = {};
    perKeyAttempts.value = {};
    perKeyErrorAttempts.value = {};
    perKeyAvgMs.value = {};
    startedAt.value = null;
    endedAt.value = null;
    lastKeyAt.value = null;
    errorMarks.value = [];
  }

  function complete(now: number) {
    if (state.value === 'done') return;
    state.value = 'done';
    endedAt.value = now;
    options.onComplete?.({
      wpm: wpm.value,
      netWpm: netWpm.value,
      accuracy: accuracy.value,
      durationMs: durationMs.value,
      errorsByKey: errorsByKey.value,
    });
  }

  function feed(e: EngineKeyEvent) {
    if (state.value === 'done') return;

    if (state.value === 'idle') {
      state.value = 'running';
      startedAt.value = e.at;
    }

    // Backspace: rewind cursor by one if possible.
    if (e.key === 'Backspace') {
      if (cursor.value > 0) {
        cursor.value--;
        const wasError = errorMarks.value[cursor.value];
        errorMarks.value[cursor.value] = false;
        // Backspace counts as a typed char only if it corrects an error
        // (no penalty for self-correction beyond the original error).
        if (wasError) {
          // We do not increment totalTyped — the original wrong key already
          // contributed to totalTyped. Backspace just resets the position.
        }
      }
      lastKeyAt.value = e.at;
      return;
    }

    // Ignore non-character keys (Shift, Ctrl, arrows, function keys, etc.).
    if (e.key.length !== 1) {
      return;
    }

    const expected = text[cursor.value];
    if (expected === undefined) return;

    totalTyped.value++;

    const attemptsForKey = perKeyAttempts.value[expected] ?? 0;
    perKeyAttempts.value[expected] = attemptsForKey + 1;

    // Track per-key avg time (using last key timing).
    if (lastKeyAt.value !== null) {
      const dt = e.at - lastKeyAt.value;
      const prior = perKeyAvgMs.value[expected] ?? 0;
      // Running mean.
      const newCount = perKeyAttempts.value[expected];
      perKeyAvgMs.value[expected] = (prior * (newCount - 1) + dt) / newCount;
    }
    lastKeyAt.value = e.at;

    if (e.key === expected) {
      correctTyped.value++;
      errorMarks.value[cursor.value] = false;
      cursor.value++;
    } else {
      errors.value++;
      errorMarks.value[cursor.value] = true;
      errorsByKey.value[expected] = (errorsByKey.value[expected] ?? 0) + 1;
      perKeyErrorAttempts.value[expected] = (perKeyErrorAttempts.value[expected] ?? 0) + 1;
      cursor.value++;
    }

    if (cursor.value >= text.length) {
      complete(e.at);
    }
  }

  function cancel() {
    complete(clock());
  }

  const durationMs = computed(() => {
    const start = startedAt.value;
    const end = endedAt.value ?? (state.value === 'running' ? clock() : start);
    if (start === null || end === null) return 0;
    return Math.max(0, end - start);
  });

  const wpm = computed(() => {
    const minutes = durationMs.value / 60000;
    if (minutes <= 0) return 0;
    return correctTyped.value / 5 / minutes;
  });

  const netWpm = computed(() => {
    const minutes = durationMs.value / 60000;
    if (minutes <= 0) return 0;
    return Math.max(0, wpm.value - errors.value / minutes);
  });

  const accuracy = computed(() => {
    if (totalTyped.value === 0) return 1;
    return correctTyped.value / totalTyped.value;
  });

  const nextChar = computed(() => {
    if (cursor.value >= text.length) return '';
    return text[cursor.value] ?? '';
  });

  return {
    state,
    cursor,
    totalTyped,
    correctTyped,
    errors,
    errorsByKey,
    perKeyAttempts,
    perKeyErrorAttempts,
    perKeyAvgMs,
    startedAt,
    endedAt,
    wpm,
    netWpm,
    accuracy,
    durationMs,
    nextChar,
    feed,
    reset,
    cancel,
  };
}
