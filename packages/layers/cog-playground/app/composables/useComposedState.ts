/**
 * useComposedState — state machine for the composed screen.
 *
 * Phases:
 *   idle → intro → presenting_words → orientation → fluency
 *        → clock_drawing → digit_span → recall → scoring → result
 *
 * Tasks between word-present and recall double as the distractor — the
 * user can't rehearse the 5 words while spending ~3 min on orientation,
 * fluency, clock, and digit span.
 *
 * Orientation + digit span are scored locally; recall, fluency, and
 * clock are scored by Claude after the user submits the recall (same
 * Promise.all pattern as the Mini-Cog screen).
 *
 * Everything is in-memory and session-scoped; a reload starts over.
 */
import type {
  ComposedClockScore,
  ComposedPhase,
  ComposedRecallScore,
  ComposedResultData,
  ComposedWordList,
  DigitSpanScore,
  FluencyScore,
  OrientationAnswers,
  OrientationScore,
} from '~~/shared/cog-playground/composed-types';
import { COMPOSED_FOLLOW_UP_THRESHOLD } from '~~/shared/cog-playground/composed-types';

/**
 * Score the orientation locally. We have ground truth client-side (the
 * current date and the user's submitted answers), no model needed.
 *
 * Date is graded field-by-field — day, month, year — so a near-miss
 * partially counts. Place is "did they provide anything specific" only
 * — we can't validate truth without geolocation, which is out of scope.
 *
 * Expects `answers.date` in `YYYY-MM-DD` form, as produced by
 * `<input type="date">`. Anything else parses to NaN and grades 0.
 */
function scoreOrientationLocal(answers: OrientationAnswers, now: Date): OrientationScore {
  const expectedDay = String(now.getDate());
  const expectedMonth = String(now.getMonth() + 1);
  const expectedYear = String(now.getFullYear());

  const [givenYear = '', givenMonth = '', givenDay = ''] = answers.date.split('-');

  const dayCorrect = parseInt(givenDay, 10) === now.getDate();
  const monthCorrect = parseInt(givenMonth, 10) === now.getMonth() + 1;
  const yearCorrect = parseInt(givenYear, 10) === now.getFullYear();
  const placeProvided = answers.place.trim().length >= 2;

  const total =
    (dayCorrect ? 1 : 0) + (monthCorrect ? 1 : 0) + (yearCorrect ? 1 : 0) + (placeProvided ? 1 : 0);

  return {
    fields: {
      day: { correct: dayCorrect, given: givenDay, expected: expectedDay },
      month: { correct: monthCorrect, given: givenMonth, expected: expectedMonth },
      year: { correct: yearCorrect, given: givenYear, expected: expectedYear },
      place: { provided: placeProvided, given: answers.place.trim() },
    },
    total,
  };
}

/** Local 0–3 digit-span score from longest correct forward + backward spans. */
function scoreDigitSpanLocal(forwardSpan: number, backwardSpan: number): DigitSpanScore {
  let total = 0;
  if (forwardSpan >= 6) total += 2;
  else if (forwardSpan >= 4) total += 1;
  if (backwardSpan >= 4) total += 1;
  return { forwardSpan, backwardSpan, total: Math.min(total, 3) };
}

export function useComposedState() {
  const phase = ref<ComposedPhase>('idle');
  const words = ref<ComposedWordList | null>(null);

  const orientation = ref<OrientationScore | null>(null);
  const fluencyText = ref<string>(''); // captured at fluency submit; scored later
  const clockImage = ref<string | null>(null);
  const digitSpan = ref<DigitSpanScore | null>(null);
  const fluency = ref<FluencyScore | null>(null);
  const clock = ref<ComposedClockScore | null>(null);
  const recall = ref<ComposedRecallScore | null>(null);

  const error = ref<string | null>(null);
  const scoring = ref(false);

  const result = computed<ComposedResultData | null>(() => {
    if (!orientation.value || !recall.value || !fluency.value || !clock.value || !digitSpan.value) {
      return null;
    }
    const total =
      orientation.value.total +
      recall.value.totalRecalled +
      fluency.value.bandedScore +
      clock.value.score +
      digitSpan.value.total;
    // Max: 4 (orientation) + 5 (recall) + 3 (fluency) + 2 (clock) + 3 (digit span) = 17.
    return {
      orientation: orientation.value,
      recall: recall.value,
      fluency: fluency.value,
      clock: clock.value,
      digitSpan: digitSpan.value,
      total,
      maxTotal: 17,
    };
  });

  const suggestsFollowUp = computed(
    () => result.value !== null && result.value.total <= COMPOSED_FOLLOW_UP_THRESHOLD,
  );

  function reset() {
    phase.value = 'idle';
    words.value = null;
    orientation.value = null;
    fluencyText.value = '';
    clockImage.value = null;
    digitSpan.value = null;
    fluency.value = null;
    clock.value = null;
    recall.value = null;
    error.value = null;
    scoring.value = false;
  }

  function startIntro() {
    reset();
    phase.value = 'intro';
  }

  function beginAssessment(triplet: ComposedWordList) {
    words.value = triplet;
    phase.value = 'presenting_words';
  }

  function toOrientation() {
    phase.value = 'orientation';
  }

  function submitOrientation(answers: OrientationAnswers, now: Date = new Date()) {
    orientation.value = scoreOrientationLocal(answers, now);
    phase.value = 'fluency';
  }

  function submitFluencyText(text: string) {
    fluencyText.value = text;
    phase.value = 'clock_drawing';
  }

  function submitClock(imageBase64: string) {
    clockImage.value = imageBase64;
    phase.value = 'digit_span';
  }

  function submitDigitSpan(forwardSpan: number, backwardSpan: number) {
    digitSpan.value = scoreDigitSpanLocal(forwardSpan, backwardSpan);
    phase.value = 'recall';
  }

  function setScoring(v: boolean) {
    scoring.value = v;
    if (v) phase.value = 'scoring';
  }

  function setFluencyResult(f: FluencyScore) {
    fluency.value = f;
  }
  function setClockResult(c: ComposedClockScore) {
    clock.value = c;
  }
  function setRecallResult(r: ComposedRecallScore) {
    recall.value = r;
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
    orientation,
    fluencyText,
    clockImage,
    digitSpan,
    fluency,
    clock,
    recall,
    error,
    scoring,
    result,
    suggestsFollowUp,
    // transitions
    reset,
    startIntro,
    beginAssessment,
    toOrientation,
    submitOrientation,
    submitFluencyText,
    submitClock,
    submitDigitSpan,
    setScoring,
    setFluencyResult,
    setClockResult,
    setRecallResult,
    toResult,
    setError,
  };
}
