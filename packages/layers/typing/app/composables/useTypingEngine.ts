/**
 * useTypingEngine — an `idle → running → done` state machine for typing input. It never
 * touches the DOM, so LessonRunner feeds it keystrokes and tests need no browser. A wrong
 * key doesn't advance the cursor (kid-friendly: keep trying) but still counts toward
 * errors and accuracy, which is measured over chars typed rather than lesson length.
 */
import type { ErrorsByKeyMap, LessonCompleteResult } from '~~/shared/typing-types';

export type EngineState = 'idle' | 'running' | 'done';

export type EngineKeyEvent = {
  key: string;
  /** ms since UNIX epoch. */
  at: number;
};

export type UseTypingEngineOptions = {
  text: string;
  onComplete?: (result: LessonCompleteResult) => void;
  /** Inject a clock for tests; defaults to Date.now */
  clock?: () => number;
  /**
   * A 250ms ticker re-evaluates `durationMs`/`wpm`/`netWpm` as wall-clock time passes.
   * Injecting `clock` opts out automatically — a real ticker races fake timers.
   */
  ticker?: boolean;
  /**
   * The lesson page sets this for stages 1-15, where capitals aren't taught yet and
   * kids leave caps lock on. Off by default so capital drills stay strict.
   */
  caseInsensitive?: boolean;
};

export type UseTypingEngine = {
  state: Ref<EngineState>;
  cursor: Ref<number>;
  totalTyped: Ref<number>;
  /** Correct chars *typed*, not lesson chars covered. */
  correctTyped: Ref<number>;
  errors: Ref<number>;
  errorsByKey: Ref<ErrorsByKeyMap>;
  perKeyAttempts: Ref<Record<string, number>>;
  perKeyErrorAttempts: Ref<Record<string, number>>;
  perKeyAvgMs: Ref<Record<string, number>>;
  startedAt: Ref<number | null>;
  endedAt: Ref<number | null>;
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
  const usingDefaultClock = options.clock === undefined;
  const clock = options.clock ?? (() => Date.now());
  const tickerEnabled = options.ticker ?? usingDefaultClock;

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
  // Without a reactive "now", `durationMs` only recomputes when state/startedAt/endedAt
  // change, freezing WPM at its first-keystroke value — think 120000 WPM.
  const nowRef = ref<number>(clock());
  let tickerHandle: ReturnType<typeof setInterval> | null = null;

  function startTicker() {
    if (!tickerEnabled || tickerHandle !== null) return;
    tickerHandle = setInterval(() => {
      nowRef.value = clock();
    }, 250);
  }

  function stopTicker() {
    if (tickerHandle === null) return;
    clearInterval(tickerHandle);
    tickerHandle = null;
  }

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
    nowRef.value = clock();
    stopTicker();
  }

  function complete(now: number, opts: { cancelled?: boolean } = {}) {
    if (state.value === 'done') return;
    state.value = 'done';
    endedAt.value = now;
    stopTicker();
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
      nowRef.value = e.at;
      startTicker();
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

    const matches = options.caseInsensitive
      ? e.key.toLowerCase() === expected.toLowerCase()
      : e.key === expected;
    if (matches) {
      // Timing only from correct keys: otherwise "kid pauses, then mistypes" lands in
      // the heatmap as fast time on the letter they never hit.
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
      // No advance — the kid keeps trying until they hit the expected character.
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
    // `clock()` gives the freshest reading, but the reactive dep on `nowRef` is what
    // makes this recompute at all — reading it here is load-bearing, not redundant.
    const tick = nowRef.value;
    const end = endedAt.value ?? (state.value === 'running' ? Math.max(tick, clock()) : start);
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

  // Guarded on `getCurrentScope` so bare unit tests, which have no effect scope, don't
  // trip Vue's "onScopeDispose() is called when there is no active effect scope".
  if (getCurrentScope()) {
    onScopeDispose(() => {
      stopTicker();
    });
  }

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
