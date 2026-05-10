/**
 * useTypingFeedback — central place for the right/wrong reactions every
 * typing surface should share.
 *
 * General rules (apply everywhere a learner is typing):
 *   - Correct keystroke: play the per-key sound (`playKey`).
 *   - Wrong keystroke: play a short low buzz (`playWrong`) and surface a
 *     visual flash via `wrongFlash`. Components decide what red looks
 *     like — the cursor cell, a screen shake, a game-specific blip — but
 *     they all read the same signal.
 *   - Lesson completion: handled by the engine's `onComplete` (the
 *     consumer plays an encouragement phrase).
 *
 * Pass `lessonText` whenever the engine is running over a known string
 * (lessons, drills, sentence games). Game scenes that drive the engine
 * key-by-key without a single source text can omit it — the wrong-key
 * cue still fires.
 */
import type { UseTypingEngine } from './useTypingEngine';
import type { useTypingAudio } from './useTypingAudio';

export type UseTypingFeedbackOptions = {
  lessonText?: string;
  /** Hook for additional visual side-effects on wrong (e.g. screen shake). */
  onWrong?: () => void;
  /** How long the wrong flash stays high before resetting (ms). */
  flashMs?: number;
};

export type UseTypingFeedback = {
  /** Briefly true after every wrong keystroke. Bind to a CSS class. */
  wrongFlash: Ref<boolean>;
  /**
   * Increments on every correct keystroke — bind via `:key="pressTick"`
   * on animated nodes so a CSS keyframe re-runs even when the displayed
   * letter is the same as the previous one (typing "ffff").
   */
  pressTick: Ref<number>;
  /** Consecutive correct keystroke count. Resets to 0 on a wrong press. */
  streak: Ref<number>;
  /** Streak tier (every 3 correct presses bumps it). 0 below the badge threshold. */
  streakTier: ComputedRef<number>;
  /** Increments each time `streakTier` crosses a higher tier. Bind via `:key`
   *  to a celebration burst so it replays on every milestone. */
  tierUp: Ref<number>;
};

export function useTypingFeedback(
  engine: UseTypingEngine,
  audio: ReturnType<typeof useTypingAudio>,
  options: UseTypingFeedbackOptions = {},
): UseTypingFeedback {
  const wrongFlash = ref(false);
  const pressTick = ref(0);
  const streak = ref(0);
  const tierUp = ref(0);
  // 0 below 3 in a row, then 1, 2, 3, ... per cohort of three correct presses.
  const streakTier = computed(() => (streak.value < 3 ? 0 : Math.floor(streak.value / 3)));
  let flashTimer: ReturnType<typeof setTimeout> | null = null;

  watch(streakTier, (next, prev) => {
    if (next > prev && next > 0) tierUp.value++;
  });

  function clearFlash() {
    if (flashTimer) {
      clearTimeout(flashTimer);
      flashTimer = null;
    }
  }

  watch(
    () => engine.correctTyped.value,
    (next, prev) => {
      if (next > prev) {
        pressTick.value++;
        streak.value++;
        if (options.lessonText) {
          const justTyped = options.lessonText[engine.cursor.value - 1];
          if (justTyped) audio.playKey(justTyped.toLowerCase());
        }
      }
    },
  );

  watch(
    () => engine.errors.value,
    (next, prev) => {
      if (next > prev) {
        streak.value = 0;
        audio.playWrong();
        options.onWrong?.();
        clearFlash();
        wrongFlash.value = true;
        flashTimer = setTimeout(() => {
          wrongFlash.value = false;
          flashTimer = null;
        }, options.flashMs ?? 240);
      }
    },
  );

  onUnmounted(clearFlash);

  return { wrongFlash, pressTick, streak, streakTier, tierUp };
}
