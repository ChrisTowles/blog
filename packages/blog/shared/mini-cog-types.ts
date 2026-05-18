/**
 * Shared types for the Mini-Cog AI screener demo — used by both client
 * and server.
 *
 * NOTE: This is an educational demonstration. The Mini-Cog© is © 2000,
 * 2004 Soo Borson & James Scanlan. This project is not affiliated with
 * or endorsed by the test's authors. It is not a medical device and
 * produces no diagnosis.
 */

export type MiniCogPhase =
  | 'idle'
  | 'intro'
  | 'presenting_words'
  | 'registration_check'
  | 'clock_drawing'
  | 'delayed_recall'
  | 'scoring'
  | 'result';

/** A validated three-word recall triplet. */
export type WordTriplet = readonly [string, string, string];

export type ClockCriteria = {
  closedCircle: boolean;
  allNumbersPresent: boolean;
  numbersCorrectlyPositioned: boolean;
  twoHands: boolean;
  hourHandAt11: boolean;
  minuteHandAt2: boolean;
};

export type ClockScore = {
  criteria: ClockCriteria;
  /** All criteria pass. */
  normal: boolean;
  /** Clock Drawing Test contributes 0 or 2 to the Mini-Cog total. */
  score: 0 | 2;
  explanation: string;
};

export type RecallWordScore = {
  word: string;
  recalled: boolean;
  evidence: string;
};

export type RecallScore = {
  scores: RecallWordScore[];
  /** Number of target words recalled, 0–3. */
  totalRecalled: number;
};

export type MiniCogResultData = {
  recall: RecallScore;
  clock: ClockScore;
  /** Combined Mini-Cog score, 0–5 (recall 0–3 + clock 0 or 2). */
  total: number;
};

export const MINI_COG_REFER_THRESHOLD = 3;
