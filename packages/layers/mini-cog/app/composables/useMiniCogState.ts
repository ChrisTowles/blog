/**
 * useMiniCogState — the assessment state machine.
 *
 * Drives: idle → intro → presenting_words → registration_check
 *   → clock_drawing → delayed_recall → scoring → result.
 *
 * All state is in-memory and session-scoped. Nothing is persisted; a
 * reload starts over by design (no patient data, ever).
 */
import type {
  ClockScore,
  MiniCogPhase,
  MiniCogResultData,
  RecallScore,
  WordTriplet,
} from '../../../../blog/shared/mini-cog-types';
import { MINI_COG_REFER_THRESHOLD } from '../../../../blog/shared/mini-cog-types';

const MAX_REGISTRATION_ATTEMPTS = 3;

export function useMiniCogState() {
  const phase = ref<MiniCogPhase>('idle');
  const words = ref<WordTriplet | null>(null);
  const registrationAttempts = ref(0);
  const clockImage = ref<string | null>(null);
  const recall = ref<RecallScore | null>(null);
  const clock = ref<ClockScore | null>(null);
  const error = ref<string | null>(null);
  const scoring = ref(false);

  const result = computed<MiniCogResultData | null>(() => {
    if (!recall.value || !clock.value) return null;
    return {
      recall: recall.value,
      clock: clock.value,
      total: recall.value.totalRecalled + clock.value.score,
    };
  });

  const suggestsFollowUp = computed(
    () => result.value !== null && result.value.total < MINI_COG_REFER_THRESHOLD,
  );

  function reset() {
    phase.value = 'idle';
    words.value = null;
    registrationAttempts.value = 0;
    clockImage.value = null;
    recall.value = null;
    clock.value = null;
    error.value = null;
    scoring.value = false;
  }

  function startIntro() {
    reset();
    phase.value = 'intro';
  }

  /** Begin the assessment with a server-picked triplet. */
  function beginAssessment(triplet: WordTriplet) {
    words.value = triplet;
    registrationAttempts.value = 0;
    phase.value = 'presenting_words';
  }

  function toRegistrationCheck() {
    phase.value = 'registration_check';
  }

  /**
   * Record a registration attempt. The original Mini-Cog allows up to
   * three presentations; we always proceed to the clock afterward
   * (registration is not itself scored).
   */
  function registrationAttempt(): { proceed: boolean; attemptsLeft: number } {
    registrationAttempts.value++;
    const proceed = registrationAttempts.value >= MAX_REGISTRATION_ATTEMPTS;
    return {
      proceed,
      attemptsLeft: Math.max(0, MAX_REGISTRATION_ATTEMPTS - registrationAttempts.value),
    };
  }

  function toClockDrawing() {
    phase.value = 'clock_drawing';
  }

  function submitClock(imageBase64: string) {
    clockImage.value = imageBase64;
    phase.value = 'delayed_recall';
  }

  function setScoring(v: boolean) {
    scoring.value = v;
    if (v) phase.value = 'scoring';
  }

  function setRecall(r: RecallScore) {
    recall.value = r;
  }

  function setClock(c: ClockScore) {
    clock.value = c;
  }

  function toResult() {
    phase.value = 'result';
  }

  function setError(msg: string | null) {
    error.value = msg;
  }

  return {
    // state
    phase,
    words,
    registrationAttempts,
    clockImage,
    recall,
    clock,
    error,
    scoring,
    result,
    suggestsFollowUp,
    MAX_REGISTRATION_ATTEMPTS,
    // transitions
    reset,
    startIntro,
    beginAssessment,
    toRegistrationCheck,
    registrationAttempt,
    toClockDrawing,
    submitClock,
    setScoring,
    setRecall,
    setClock,
    toResult,
    setError,
  };
}
