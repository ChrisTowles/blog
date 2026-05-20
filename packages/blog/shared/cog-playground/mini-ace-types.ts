/**
 * Types for `/cog-playground/mini-ace` — a Mini-ACE-inspired screen
 * built under Hodges's explicit digital-format grant. Attribution and
 * "must remain free" framing are baked into the result page.
 *
 * Not the canonical Mini-ACE items (we use our own 3-word lists and
 * 7-element addresses) — the *structure* tracks the published
 * instrument, the *stimuli* are ours.
 */

export type MiniAcePhase =
  | 'idle'
  | 'intro'
  | 'registration_present'
  | 'registration_repeat'
  | 'time_orientation'
  | 'address_present'
  | 'fluency'
  | 'clock_drawing'
  | 'address_recall'
  | 'scoring'
  | 'result';

/** Three short, semantically unrelated nouns. */
export type MiniAceWordTriplet = readonly [string, string, string];

/** A seven-element fictional address. Elements are graded individually. */
export type MiniAceAddress = {
  name: string;
  houseNumber: string;
  street: string;
  area: string;
  city: string;
  state: string;
  country: string;
};

export type TimeOrientationAnswers = {
  /** Day of the week the user reports — free text. */
  dayOfWeek: string;
  /** ISO YYYY-MM-DD from <input type="date">. */
  date: string;
  /** Northern-hemisphere season label, free text. */
  season: string;
};

export type TimeOrientationScore = {
  fields: {
    dayOfWeek: { correct: boolean; given: string; expected: string };
    date: { correct: boolean; given: string; expected: string };
    month: { correct: boolean; given: string; expected: string };
    year: { correct: boolean; given: string; expected: string };
    season: { correct: boolean; given: string; expected: string };
  };
  /** 0–5 across the five fields. */
  total: number;
};

export type WordRecallScore = {
  word: string;
  recalled: boolean;
  evidence: string;
};

export type MiniAceRegistrationScore = {
  scores: WordRecallScore[];
  /** Count of recalled=true at immediate-repeat time, 0–3. */
  totalRecalled: number;
};

export type AddressFieldScore = {
  field: keyof MiniAceAddress;
  recalled: boolean;
  evidence: string;
};

export type AddressRecallScore = {
  scores: AddressFieldScore[];
  /** 0–7 across the seven address elements. */
  totalRecalled: number;
};

export type MiniAceFluencyScore = {
  validAnimals: string[];
  rejected: { word: string; reason: string }[];
  duplicates: string[];
  uniqueCount: number;
  /** 0–7 banded — Mini-ACE-inspired wider spread for the fluency subscore. */
  bandedScore: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

export type MiniAceClockCriteria = {
  closedCircle: boolean;
  allNumbersPresent: boolean;
  numbersCorrectlyPositioned: boolean;
  twoHands: boolean;
  hourHandAt11: boolean;
  minuteHandAt2: boolean;
};

export type MiniAceClockScore = {
  criteria: MiniAceClockCriteria;
  normal: boolean;
  /** 0/2 (Shulman binary, same as the Mini-Cog clock). */
  score: 0 | 2;
  explanation: string;
};

export type MiniAceResultData = {
  registration: MiniAceRegistrationScore;
  timeOrientation: TimeOrientationScore;
  fluency: MiniAceFluencyScore;
  clock: MiniAceClockScore;
  addressRecall: AddressRecallScore;
  /** 3 + 5 + 7 + 2 + 7 = 24 max. */
  total: number;
  maxTotal: number;
};

/** Soft cutoff for surfacing the "talk to a clinician" prompt. */
export const MINI_ACE_FOLLOW_UP_THRESHOLD = 19;

/**
 * Canonical Mini-ACE / ACE-III home. Hodges's FAQ explicitly grants
 * digital reimplementation provided it remains free; attribution is on
 * the result screen.
 */
export const MINI_ACE_REFERENCE_URL = 'https://camcops.readthedocs.io/en/latest/tasks/ace3.html';
