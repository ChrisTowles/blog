/**
 * Shared types for the typing app — used by both client and server.
 */

// --- Database row mirrors -------------------------------------------------

export type TypingGroupKind = 'family' | 'classroom';

export type TypingGroup = {
  id: number;
  /** Public URL handle: <first-6-of-creator-userId>-<slugified-name>. */
  slug: string;
  name: string;
  kind: TypingGroupKind;
  createdAt: string;
  updatedAt: string;
};

export type GuardianRole = 'guardian';

export type Guardian = {
  groupId: number;
  userId: string;
  role: GuardianRole;
  invitedBy: string | null;
  joinedAt: string;
};

export type Learner = {
  id: number;
  groupId: number;
  displayName: string;
  avatarUrl: string | null;
  birthYear: number | null;
  currentStage: number;
  preferredVoice: string;
  createdAt: string;
  updatedAt: string;
};

export type LessonKind =
  | 'drill'
  | 'bigram'
  | 'word'
  | 'sentence'
  | 'paragraph'
  | 'topic'
  | 'spelling-drill'
  | 'spelling-sentence'
  // Mixed real-word practice using every key learned so far. Inserted at
  // odd stages from 5 onward so a kid blends prior keys into fluid skill
  // instead of always drilling the newest two in isolation.
  | 'accumulation'
  // Mandatory "use all keys from the row block" passage that gates
  // moving into the next row (stages 5 -> 6, 10 -> 11). Mirrors Peter's
  // Online Typing Course row-boundary review structure.
  | 'consolidation';

export type LessonRow = {
  id: number;
  slug: string;
  stage: number;
  kind: LessonKind;
  title: string;
  text: string;
  targetWpm: number;
  targetAccuracy: number;
  topic: string | null;
  spellingListId: number | null;
  generatedBy: 'system' | 'ai';
  createdAt: string;
};

export type ErrorsByKeyMap = Record<string, number>;

export type AttemptRow = {
  id: number;
  learnerId: number;
  lessonId: number | null;
  gameSlug: string | null;
  wpm: number;
  netWpm: number;
  accuracy: number;
  durationMs: number;
  errorsByKey: ErrorsByKeyMap;
  completedAt: string;
};

export type KeyStat = {
  key: string;
  attempts: number;
  errors: number;
  avgMs: number;
};

export type SpellingList = {
  id: number;
  learnerId: number;
  weekOf: string; // ISO date (YYYY-MM-DD)
  words: string[];
  source: 'paste' | 'type' | 'image';
  sourceImageUrl: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type SpellingProgress = {
  word: string;
  consecutiveCorrect: number;
  mastered: boolean;
  masteredAt: string | null;
};

// --- Curriculum -----------------------------------------------------------

export type Finger = 'lp' | 'lr' | 'lm' | 'li' | 'thumb' | 'ri' | 'rm' | 'rr' | 'rp';

export type Hand = 'left' | 'right';

export type StageDefinition = {
  stage: number;
  name: string;
  /** Keys introduced in this stage (lowercase printable). */
  keys: string[];
  /** Cumulative unlocked set including all prior stages. */
  unlocked: string[];
  targetWpm: number;
  targetAccuracy: number;
};

// --- Anonymous progress (localStorage) ------------------------------------

export const TYPING_PROGRESS_LOCAL_STORAGE_KEY = 'typing:progress:v1';
export const TYPING_MERGED_LOCAL_STORAGE_KEY = 'typing:merged:v1';

/**
 * Stages 1-9 don't unlock enough letters to spell most kid-friendly
 * topics (no t/y until stage 10). Both the topic-game form and the
 * generate API gate on this minimum.
 */
export const MIN_TOPIC_STAGE = 10;
export const MAX_STAGE = 20;

/**
 * The first stage where capital letters become part of the curriculum.
 * Stages before this run case-insensitive (kids fumble shift / leave
 * caps lock on). Stage 16 onward requires correct capitalization
 * because capitals practice is the point of the stage.
 */
export const CAPITALS_STAGE = 16;

/**
 * Returns true when the engine should accept either case for this stage's
 * lesson. Callers (pages, AI lesson generator) thread this through to
 * `useTypingEngine`'s `caseInsensitive` option.
 */
export function isCaseInsensitiveStage(stage: number): boolean {
  return stage < CAPITALS_STAGE;
}

/**
 * Per-stage target WPM, mirrored on server (curriculum.ts) and client
 * (useTypingProgress mastery gate). Kept as a single source of truth in
 * shared so the two can't drift.
 */
export function stageTargetWpm(stage: number): number {
  if (stage <= 3) return 5;
  if (stage <= 6) return 8;
  if (stage <= 9) return 12;
  if (stage <= 12) return 16;
  if (stage <= 15) return 20;
  if (stage <= 18) return 25;
  return 30;
}

// --- Stage-mastery gate -----------------------------------------------------

/** Accuracy required on a gate-eligible attempt. Mirrored in curriculum.ts. */
export const STAGE_TARGET_ACCURACY = 0.95;

/**
 * Attempts on texts shorter than this can't trip the gate — on a 30-char
 * drill a single typo still reads as ~97% accuracy, so short texts are
 * statistically meaningless as a mastery signal.
 */
export const MIN_GATE_ATTEMPT_CHARS = 40;

/**
 * Passing attempts (on distinct lessons) required to advance a stage. One
 * lucky run shouldn't promote; two clean runs on different lessons is a
 * legible bar for a kid ("two green checks and you level up").
 */
export const STAGE_PASSES_TO_ADVANCE = 2;

/**
 * Row-boundary stages whose consolidation ("row review") lesson must be
 * passed before advancing: home row (5), top row (10), bottom row (15),
 * and the final mixed-prose stage (20). curriculum.ts generates a
 * consolidation lesson for exactly these stages.
 */
export const CONSOLIDATION_STAGES: readonly number[] = [5, 10, 15, 20];

/**
 * True when a single attempt counts as a passing run toward advancing
 * `stage`. Requires lesson context (game attempts never gate), a
 * stage-matched lesson, a long-enough text, and accuracy + NET WPM at
 * target — net so fast-and-sloppy doesn't pay.
 */
export function attemptPassesStageGate(attempt: LocalAttempt, stage: number): boolean {
  const ctx = attempt.lesson;
  if (!ctx || attempt.gameSlug !== null) return false;
  if (ctx.stage !== stage) return false;
  if (ctx.textLength < MIN_GATE_ATTEMPT_CHARS) return false;
  return attempt.accuracy >= STAGE_TARGET_ACCURACY && attempt.netWpm >= stageTargetWpm(stage);
}

/** All attempts in history that count as passing runs for `stage`. */
export function stagePassingAttempts(attempts: LocalAttempt[], stage: number): LocalAttempt[] {
  return attempts.filter((a) => attemptPassesStageGate(a, stage));
}

/**
 * Whether the attempt history (including the just-recorded attempt) clears
 * the mastery gate for `stage`: at least STAGE_PASSES_TO_ADVANCE passing
 * runs across distinct lessons, and — at row-boundary stages — at least
 * one passing run on the consolidation lesson.
 */
export function shouldAdvanceStage(attempts: LocalAttempt[], stage: number): boolean {
  const passes = stagePassingAttempts(attempts, stage);
  const distinctLessons = new Set(passes.map((a) => a.lesson?.slug));
  if (distinctLessons.size < STAGE_PASSES_TO_ADVANCE) return false;
  if (CONSOLIDATION_STAGES.includes(stage)) {
    return passes.some((a) => a.lesson?.kind === 'consolidation');
  }
  return true;
}

/**
 * What the attempt was typed against. Recorded so the stage-mastery gate
 * can verify the attempt belongs to the learner's current stage and was
 * long enough to be a meaningful accuracy sample. Built-in lessons have
 * no client-side DB id, so the gate keys off this context, never `lessonId`.
 */
export type AttemptLessonContext = {
  slug: string;
  stage: number;
  kind: LessonKind;
  /** Character count of the text actually typed (varies per seeded run). */
  textLength: number;
};

export type LocalAttempt = {
  lessonId: number | null;
  gameSlug: string | null;
  /** Absent on game attempts and on attempts recorded before this field existed. */
  lesson?: AttemptLessonContext;
  wpm: number;
  netWpm: number;
  accuracy: number;
  durationMs: number;
  errorsByKey: ErrorsByKeyMap;
  /** ISO timestamp */
  completedAt: string;
};

export type LocalKeyStat = {
  attempts: number;
  errors: number;
  avgMs: number;
};

export type LocalProgress = {
  schemaVersion: 1;
  currentStage: number;
  attempts: LocalAttempt[];
  keyStats: Record<string, LocalKeyStat>;
};

export function emptyLocalProgress(): LocalProgress {
  return {
    schemaVersion: 1,
    currentStage: 1,
    attempts: [],
    keyStats: {},
  };
}

// --- API DTOs -------------------------------------------------------------

export type LessonCompleteResult = {
  /** Gross WPM */
  wpm: number;
  /** Net WPM (gross minus errors per minute) */
  netWpm: number;
  accuracy: number;
  durationMs: number;
  errorsByKey: ErrorsByKeyMap;
  /**
   * True when the lesson was cancelled (e.g. Escape pressed) rather than
   * typed to completion. Callers should treat cancelled results as
   * informational only — don't record attempts, don't update PRs, don't
   * auto-advance.
   */
  cancelled: boolean;
};

export type GenerateTopicLessonRequest = {
  stage: number;
  topic: string;
  kind: 'sentence' | 'paragraph';
  length: 'short' | 'medium';
};

export type GenerateTopicLessonResponse = {
  lesson: LessonRow;
};

export type SpellingExtractResponse =
  | { ok: true; words: string[] }
  | { ok: false; reason: string; raw?: string };
