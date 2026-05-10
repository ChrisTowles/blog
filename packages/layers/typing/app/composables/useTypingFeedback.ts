/**
 * useTypingFeedback — central audio + visual reactions every typing
 * surface shares. Increments pressTick/streak/tierUp on correct keys,
 * sets wrongFlash and runs an optional onWrong hook on mistakes.
 *
 * Remount-key pattern: pressTick (per keystroke) and tierUp (per
 * streak milestone) are monotonically-increasing counters. Bind them
 * via `:key` on a Vue node and the node is destroyed + recreated each
 * time the counter changes, which restarts any one-shot CSS keyframe
 * tied to that node. This is how we replay the letter pop and the
 * streak burst even when the displayed letter doesn't change.
 * runnerKey in pages/typing/lesson/[slug].vue is the same idea at a
 * coarser grain — it forces a fresh TypingLessonRunner when the kid
 * picks "Try again."
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
      } else if (next < prev) {
        // Backspace rewound a previously correct keystroke. Reset the
        // streak so a kid can't backspace + retype to game the badge
        // tier-up animation.
        streak.value = 0;
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
