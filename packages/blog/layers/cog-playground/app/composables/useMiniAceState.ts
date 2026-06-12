/**
 * useMiniAceState — state machine for the Mini-ACE-inspired screen.
 *
 * Phases:
 *   idle → intro → registration_present → registration_repeat
 *        → time_orientation → address_present → fluency
 *        → clock_drawing → address_recall → scoring → result
 *
 * Registration is scored at the repeat step (immediate). Time
 * orientation is scored locally. Fluency, clock, and address-recall
 * are scored in parallel after the user submits the delayed address
 * recall — same Promise.all pattern as the Mini-Cog and composed screens.
 *
 * Everything is in-memory and session-scoped; a reload starts over.
 */
import { MINI_ACE_FOLLOW_UP_THRESHOLD } from '~~/shared/cog-playground/mini-ace-types';
import type {
  AddressRecallScore,
  MiniAceAddress,
  MiniAceClockScore,
  MiniAceFluencyScore,
  MiniAcePhase,
  MiniAceRegistrationScore,
  MiniAceResultData,
  MiniAceWordTriplet,
  TimeOrientationAnswers,
  TimeOrientationScore,
} from '~~/shared/cog-playground/mini-ace-types';

function scoreTimeOrientationLocal(
  answers: TimeOrientationAnswers,
  now: Date,
): TimeOrientationScore {
  const expectedDayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const expectedDate = String(now.getDate());
  const expectedMonth = String(now.getMonth() + 1);
  const expectedYear = String(now.getFullYear());
  // Northern-hemisphere season from month — for a kid-or-elder-friendly demo
  // this is the common usage. (User can be in southern hemisphere; this is
  // explicitly an educational demo and they can re-take it.)
  const m = now.getMonth();
  const expectedSeason =
    m >= 2 && m <= 4
      ? 'spring'
      : m >= 5 && m <= 7
        ? 'summer'
        : m >= 8 && m <= 10
          ? 'fall'
          : 'winter';

  const [givenYear = '', givenMonth = '', givenDay = ''] = answers.date.split('-');

  const dayOfWeekCorrect = answers.dayOfWeek.trim().toLowerCase() === expectedDayOfWeek;
  const dateCorrect = parseInt(givenDay, 10) === now.getDate();
  const monthCorrect = parseInt(givenMonth, 10) === now.getMonth() + 1;
  const yearCorrect = parseInt(givenYear, 10) === now.getFullYear();
  // Accept "fall" or "autumn" interchangeably; case-insensitive.
  const givenSeason = answers.season.trim().toLowerCase();
  const seasonCorrect =
    givenSeason === expectedSeason || (expectedSeason === 'fall' && givenSeason === 'autumn');

  const total =
    (dayOfWeekCorrect ? 1 : 0) +
    (dateCorrect ? 1 : 0) +
    (monthCorrect ? 1 : 0) +
    (yearCorrect ? 1 : 0) +
    (seasonCorrect ? 1 : 0);

  return {
    fields: {
      dayOfWeek: {
        correct: dayOfWeekCorrect,
        given: answers.dayOfWeek.trim(),
        expected: expectedDayOfWeek,
      },
      date: { correct: dateCorrect, given: givenDay, expected: expectedDate },
      month: { correct: monthCorrect, given: givenMonth, expected: expectedMonth },
      year: { correct: yearCorrect, given: givenYear, expected: expectedYear },
      season: { correct: seasonCorrect, given: answers.season.trim(), expected: expectedSeason },
    },
    total,
  };
}

export function useMiniAceState() {
  const phase = ref<MiniAcePhase>('idle');
  const words = ref<MiniAceWordTriplet | null>(null);
  const address = ref<MiniAceAddress | null>(null);

  const registration = ref<MiniAceRegistrationScore | null>(null);
  const timeOrientation = ref<TimeOrientationScore | null>(null);
  const fluencyText = ref<string>('');
  const clockImage = ref<string | null>(null);
  const fluency = ref<MiniAceFluencyScore | null>(null);
  const clock = ref<MiniAceClockScore | null>(null);
  const addressRecall = ref<AddressRecallScore | null>(null);

  const error = ref<string | null>(null);
  const scoring = ref(false);

  const result = computed<MiniAceResultData | null>(() => {
    if (
      !registration.value ||
      !timeOrientation.value ||
      !fluency.value ||
      !clock.value ||
      !addressRecall.value
    ) {
      return null;
    }
    const total =
      registration.value.totalRecalled +
      timeOrientation.value.total +
      fluency.value.bandedScore +
      clock.value.score +
      addressRecall.value.totalRecalled;
    return {
      registration: registration.value,
      timeOrientation: timeOrientation.value,
      fluency: fluency.value,
      clock: clock.value,
      addressRecall: addressRecall.value,
      total,
      maxTotal: 3 + 5 + 7 + 2 + 7, // = 24
    };
  });

  const suggestsFollowUp = computed(
    () => result.value !== null && result.value.total <= MINI_ACE_FOLLOW_UP_THRESHOLD,
  );

  function reset() {
    phase.value = 'idle';
    words.value = null;
    address.value = null;
    registration.value = null;
    timeOrientation.value = null;
    fluencyText.value = '';
    clockImage.value = null;
    fluency.value = null;
    clock.value = null;
    addressRecall.value = null;
    error.value = null;
    scoring.value = false;
  }

  function startIntro() {
    reset();
    phase.value = 'intro';
  }

  function beginAssessment(triplet: MiniAceWordTriplet, addr: MiniAceAddress) {
    words.value = triplet;
    address.value = addr;
    phase.value = 'registration_present';
  }

  function toRegistrationRepeat() {
    phase.value = 'registration_repeat';
  }

  function setRegistrationResult(r: MiniAceRegistrationScore) {
    registration.value = r;
    phase.value = 'time_orientation';
  }

  function submitTimeOrientation(answers: TimeOrientationAnswers, now: Date = new Date()) {
    timeOrientation.value = scoreTimeOrientationLocal(answers, now);
    phase.value = 'address_present';
  }

  function toFluency() {
    phase.value = 'fluency';
  }

  function submitFluencyText(text: string) {
    fluencyText.value = text;
    phase.value = 'clock_drawing';
  }

  function submitClock(imageBase64: string) {
    clockImage.value = imageBase64;
    phase.value = 'address_recall';
  }

  function setScoring(v: boolean) {
    scoring.value = v;
    if (v) phase.value = 'scoring';
  }

  function setFluencyResult(f: MiniAceFluencyScore) {
    fluency.value = f;
  }
  function setClockResult(c: MiniAceClockScore) {
    clock.value = c;
  }
  function setAddressResult(a: AddressRecallScore) {
    addressRecall.value = a;
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
    address,
    registration,
    timeOrientation,
    fluencyText,
    clockImage,
    fluency,
    clock,
    addressRecall,
    error,
    scoring,
    result,
    suggestsFollowUp,
    // transitions
    reset,
    startIntro,
    beginAssessment,
    toRegistrationRepeat,
    setRegistrationResult,
    submitTimeOrientation,
    toFluency,
    submitFluencyText,
    submitClock,
    setScoring,
    setFluencyResult,
    setClockResult,
    setAddressResult,
    toResult,
    setError,
  };
}
