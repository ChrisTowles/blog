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
 * Wrong-key behavior: the cursor does NOT advance on a mismatch. The
 * lesson is kid-friendly — a learner keeps trying until they hit the
 * expected key. We still count the wrong attempt in totalTyped, errors,
 * errorsByKey, and perKeyErrorAttempts so the heatmap and accuracy
 * metrics reflect reality.
 *
 * WPM definitions:
 *   gross WPM = (chars typed / 5) / minutes elapsed
 *   net WPM   = gross - (errors / minutes)
 *
 * Accuracy = correctChars / totalCharsTyped (NOT lesson length).
 *
 * Backspace rewinds a previously correct character by one position.
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
  }

  function complete(now: number, opts: { cancelled?: boolean } = {}) {
    if (state.value === 'done') return;
    state.value = 'done';
    endedAt.value = now;
    options.onComplete?.({
      wpm: wpm.value,
      netWpm: netWpm.value,
      accuracy: accuracy.value,
      durationMs: durationMs.value,
      errorsByKey: errorsByKey.value,
      cancelled: opts.cancelled ?? false,
    });
  }

  function feed(e: EngineKeyEvent) {
    if (state.value === 'done') return;

    if (state.value === 'idle') {
      state.value = 'running';
      startedAt.value = e.at;
    }

    // Backspace: rewind one previously-correct char if any.
    if (e.key === 'Backspace') {
      if (cursor.value > 0) {
        cursor.value--;
        if (correctTyped.value > 0) correctTyped.value--;
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

    if (e.key === expected) {
      // Attribute attempt count + inter-press time only to correct keys.
      // Wrong-key inter-press deltas should not pollute the expected
      // key's avgMs (we'd otherwise count "kid pauses, then mistypes"
      // toward the heatmap as fast time on the correct letter).
      const attemptsForKey = perKeyAttempts.value[expected] ?? 0;
      perKeyAttempts.value[expected] = attemptsForKey + 1;

      if (lastKeyAt.value !== null) {
        const dt = e.at - lastKeyAt.value;
        const prior = perKeyAvgMs.value[expected] ?? 0;
        const newCount = perKeyAttempts.value[expected];
        perKeyAvgMs.value[expected] = (prior * (newCount - 1) + dt) / newCount;
      }
      lastKeyAt.value = e.at;

      correctTyped.value++;
      cursor.value++;
      if (cursor.value >= text.length) {
        complete(e.at);
      }
    } else {
      // Wrong key: don't advance. Kid keeps trying until they hit
      // the expected character.
      errors.value++;
      errorsByKey.value[expected] = (errorsByKey.value[expected] ?? 0) + 1;
      perKeyErrorAttempts.value[expected] = (perKeyErrorAttempts.value[expected] ?? 0) + 1;
      lastKeyAt.value = e.at;
    }
  }

  function cancel() {
    complete(clock(), { cancelled: true });
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
