/**
 * useTypingFeedback — central audio + visual reactions every typing
 * surface shares. Increments pressTick/streak/tierUp on correct keys,
 * sets wrongFlash and runs an optional onWrong hook on mistakes.
 */
import type { UseTypingEngine } from './useTypingEngine';
import type { useTypingAudio } from './useTypingAudio';

export type UseTypingFeedbackOptions = {
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
  /** Increments each time the streak crosses a higher tier (3, 6, 9, ...).
   *  Bind via `:key` to a celebration burst so it replays on every milestone. */
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
    if (next > prev && next > 0) {
      tierUp.value++;
      audio.playStreakDing(next);
    }
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
        audio.playClick();
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

  return { wrongFlash, pressTick, streak, tierUp };
}
