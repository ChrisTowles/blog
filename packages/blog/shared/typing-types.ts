/**
 * Shared types for the typing app — used by both client and server.
 */

// --- Database row mirrors -------------------------------------------------

export type TypingGroupKind = 'family' | 'classroom';

export type TypingGroup = {
  id: number;
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
  | 'spelling-sentence';

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

export type LocalAttempt = {
  lessonId: number | null;
  gameSlug: string | null;
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
