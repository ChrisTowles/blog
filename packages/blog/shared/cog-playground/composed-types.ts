/**
 * Types for `/cog-playground/composed` — a custom AI-scored cognitive
 * screen composed of public-domain task paradigms. No instrument-name
 * claims; not tied to any branded screener.
 */

export type ComposedPhase =
  | 'idle'
  | 'intro'
  | 'presenting_words'
  | 'orientation'
  | 'fluency'
  | 'clock_drawing'
  | 'digit_span'
  | 'recall'
  | 'scoring'
  | 'result';

/** Five-word recall list. Strings are presented and scored case-insensitively. */
export type ComposedWordList = readonly [string, string, string, string, string];

export type OrientationAnswers = {
  /** ISO YYYY-MM-DD as the user typed it (we don't enforce real dates client-side). */
  date: string;
  /** Free-text — country / state / city / building, whatever the user names. */
  place: string;
};

export type OrientationScore = {
  /** Field-by-field grading. 0–4 total (date day + month + year + place). */
  fields: {
    day: { correct: boolean; given: string; expected: string };
    month: { correct: boolean; given: string; expected: string };
    year: { correct: boolean; given: string; expected: string };
    place: { provided: boolean; given: string };
  };
  /** 0–4; place counts if a non-empty answer is given. */
  total: number;
};

export type RecallWordScore = {
  word: string;
  recalled: boolean;
  evidence: string;
};

export type ComposedRecallScore = {
  scores: RecallWordScore[];
  /** Count of `recalled: true`, 0–5. */
  totalRecalled: number;
};

export type FluencyScore = {
  /** Words the model accepted as valid, deduplicated, lowercase. */
  validAnimals: string[];
  /** Words rejected as non-animals or unclear (with a short reason). */
  rejected: { word: string; reason: string }[];
  /** Words that appeared more than once in the response (only first counts). */
  duplicates: string[];
  /** `validAnimals.length`. */
  uniqueCount: number;
  /** 0–3 banded per common community norms (≥15→3, ≥10→2, ≥5→1, else 0). */
  bandedScore: 0 | 1 | 2 | 3;
};

export type DigitSpanScore = {
  /** Longest forward span correctly repeated. */
  forwardSpan: number;
  /** Longest backward span correctly repeated. */
  backwardSpan: number;
  /** 0–3: forward ≥6 → 2, ≥4 → 1; plus backward ≥4 → +1. Capped at 3. */
  total: number;
};

export type ClockCriteria = {
  closedCircle: boolean;
  allNumbersPresent: boolean;
  numbersCorrectlyPositioned: boolean;
  twoHands: boolean;
  hourHandAt11: boolean;
  minuteHandAt2: boolean;
};

export type ComposedClockScore = {
  criteria: ClockCriteria;
  normal: boolean;
  score: 0 | 2;
  explanation: string;
};

/** Aggregated 5-task result. */
export type ComposedResultData = {
  orientation: OrientationScore;
  recall: ComposedRecallScore;
  fluency: FluencyScore;
  clock: ComposedClockScore;
  digitSpan: DigitSpanScore;
  /** Sum across the 5 subscores, max 18 (4 + 5 + 3 + 2 + 3 + 1 buffer = 18). */
  total: number;
  /** Sum's maximum for the screen as currently weighted; surfaces on the UI. */
  maxTotal: number;
};

/**
 * If the composite total is at or below this threshold, the result
 * page surfaces the "consider talking to a clinician" prompt. Chosen as
 * a soft signal, not a clinical cutoff (this screen is not a validated
 * instrument). Roughly two-thirds of the max.
 */
export const COMPOSED_FOLLOW_UP_THRESHOLD = 12;
