/**
 * Typing curriculum: 20-stage progression from home-row keys to full prose.
 *
 * Stage definitions describe which keys are introduced at that stage and
 * the cumulative unlocked set including all prior stages. Lesson texts are
 * procedurally generated (see lesson-texts.ts) from the unlocked set — a
 * seed of 0 yields the canonical curriculum (used for the DB seed and the
 * lesson cards), other seeds give a kid fresh text on retry.
 *
 * The seed endpoint upserts these lessons by `slug` so re-running is
 * idempotent.
 */
import {
  CONSOLIDATION_STAGES,
  STAGE_TARGET_ACCURACY,
  stageTargetWpm,
  type LessonKind,
  type StageDefinition,
} from '../../../../../blog/shared/typing-types';
import {
  accumulationText,
  bigramText,
  consolidationText,
  drillText,
  paragraphText,
  sentenceText,
  wordText,
} from './lesson-texts';

const SPACE = ' ';

/**
 * Per-stage key introductions (lowercase). Capitals come at stage 16,
 * numbers at 17, etc. Each stage's `keys` are added to all prior stages'
 * keys to form the cumulative `unlocked` set.
 */
const STAGE_INTRODUCTIONS: Array<{ stage: number; name: string; keys: string[] }> = [
  { stage: 1, name: 'Home row index', keys: ['f', 'j'] },
  { stage: 2, name: 'Home row middle', keys: ['d', 'k'] },
  { stage: 3, name: 'Home row ring', keys: ['s', 'l'] },
  { stage: 4, name: 'Home row pinky', keys: ['a', ';'] },
  { stage: 5, name: 'Home row inner reach', keys: ['g', 'h'] },
  { stage: 6, name: 'Top row R/U', keys: ['r', 'u'] },
  { stage: 7, name: 'Top row E/I', keys: ['e', 'i'] },
  { stage: 8, name: 'Top row W/O', keys: ['w', 'o'] },
  { stage: 9, name: 'Top row Q/P', keys: ['q', 'p'] },
  { stage: 10, name: 'Top row T/Y', keys: ['t', 'y'] },
  { stage: 11, name: 'Bottom row V/M', keys: ['v', 'm'] },
  { stage: 12, name: 'Bottom row C/comma', keys: ['c', ','] },
  { stage: 13, name: 'Bottom row X/period', keys: ['x', '.'] },
  { stage: 14, name: 'Bottom row Z/slash', keys: ['z', '/'] },
  { stage: 15, name: 'Bottom row B/N', keys: ['b', 'n'] },
  { stage: 16, name: 'Capitals', keys: [] /* shifted variants of letters */ },
  { stage: 17, name: 'Numbers row', keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
  { stage: 18, name: 'Common punctuation', keys: ["'", '"', '!', '?'] },
  { stage: 19, name: 'Symbols', keys: ['@', '#', '$', '%', '&', '*', '(', ')'] },
  { stage: 20, name: 'Mixed prose at speed', keys: [':', '-'] },
];

const STAGES: StageDefinition[] = (() => {
  const out: StageDefinition[] = [];
  const cumulative: string[] = [];
  for (const s of STAGE_INTRODUCTIONS) {
    cumulative.push(...s.keys);
    // Stage 16 unlocks shifted letters; we don't enumerate them in `keys`
    // but the unlocked set tracks lowercase glyphs (the engine handles
    // shift state separately). Space is unlocked from stage 1.
    const unlocked = [...cumulative];
    if (!unlocked.includes(SPACE)) unlocked.unshift(SPACE);
    out.push({
      stage: s.stage,
      name: s.name,
      keys: s.keys,
      unlocked: [...unlocked].sort(),
      targetWpm: stageTargetWpm(s.stage),
      targetAccuracy: STAGE_TARGET_ACCURACY,
    });
  }
  return out;
})();

export function getStages(): StageDefinition[] {
  return STAGES;
}

export function getStage(stage: number): StageDefinition | undefined {
  return STAGES.find((s) => s.stage === stage);
}

/**
 * Returns the cumulative unlocked character set for a given stage.
 * Includes space, all lowercase letters introduced so far, and any
 * punctuation/numbers introduced in stages 17-20.
 */
export function unlockedKeysForStage(stage: number): string[] {
  return getStage(stage)?.unlocked ?? [];
}

// ---------------------------------------------------------------------------
// Built-in lessons
// ---------------------------------------------------------------------------

export type BuiltInLesson = {
  slug: string;
  stage: number;
  kind: LessonKind;
  title: string;
  text: string;
  targetWpm: number;
  targetAccuracy: number;
};

type LessonSpec = {
  kind: LessonKind;
  slugSuffix: string;
  titleSuffix: string;
  text: (def: StageDefinition, seed: number) => string;
};

/**
 * Per-stage lesson plan. A spec whose generator returns '' for a stage is
 * skipped — that's how sentence lessons are absent from stages 1-3,
 * paragraphs start at 11, accumulation hits odd stages 5-15, and
 * consolidation appears only at row boundaries (CONSOLIDATION_STAGES).
 */
const LESSON_SPECS: LessonSpec[] = [
  { kind: 'drill', slugSuffix: 'drill', titleSuffix: 'drill', text: drillText },
  { kind: 'bigram', slugSuffix: 'bigram', titleSuffix: 'pairs', text: bigramText },
  { kind: 'word', slugSuffix: 'words', titleSuffix: 'words', text: wordText },
  {
    kind: 'sentence',
    slugSuffix: 'sentence',
    titleSuffix: 'sentence',
    text: (def, seed) => sentenceText(def.stage, seed),
  },
  {
    kind: 'paragraph',
    slugSuffix: 'paragraph',
    titleSuffix: 'paragraph',
    text: (def, seed) => paragraphText(def.stage, seed),
  },
  {
    kind: 'accumulation',
    slugSuffix: 'accumulation',
    titleSuffix: 'mixed practice',
    text: accumulationText,
  },
  {
    kind: 'consolidation',
    slugSuffix: 'consolidation',
    titleSuffix: 'row review',
    text: consolidationText,
  },
];

/**
 * Build the 20-stage curriculum lesson set for a seed. Seed 0 is the
 * canonical curriculum; any other seed regenerates drill/word/bigram/
 * accumulation/consolidation text and re-picks sentence/paragraph variants
 * so retries don't reward memorizing one string.
 */
export function getBuiltInLessons(seed = 0): BuiltInLesson[] {
  const lessons: BuiltInLesson[] = [];

  for (const def of STAGES) {
    for (const spec of LESSON_SPECS) {
      const text = spec.text(def, seed);
      if (!text) continue;
      lessons.push({
        slug: `stage-${def.stage}-${spec.slugSuffix}`,
        stage: def.stage,
        kind: spec.kind,
        title:
          spec.kind === 'accumulation'
            ? `Stage ${def.stage}: mixed practice`
            : spec.kind === 'consolidation'
              ? `Stage ${def.stage}: row review`
              : `Stage ${def.stage}: ${def.name} ${spec.titleSuffix}`,
        text,
        targetWpm: def.targetWpm,
        targetAccuracy: def.targetAccuracy,
      });
    }
  }

  return lessons;
}

/**
 * Sanity check kept close to the data: every consolidation stage must
 * actually produce a consolidation lesson, since the mastery gate requires
 * passing it to advance. Verified by tests.
 */
export function consolidationStages(): readonly number[] {
  return CONSOLIDATION_STAGES;
}
