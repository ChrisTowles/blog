/**
 * Typing curriculum: 20-stage progression from home-row keys to full prose.
 *
 * Stage definitions describe which keys are introduced at that stage and
 * the cumulative unlocked set including all prior stages. Built-in lessons
 * use only ASCII printable chars within the unlocked set for that stage.
 *
 * The seed endpoint upserts these lessons by `slug` so re-running is
 * idempotent.
 */
import {
  stageTargetWpm,
  type LessonKind,
  type StageDefinition,
} from '../../../../../blog/shared/typing-types';

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
      targetAccuracy: 0.95,
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

/**
 * Build the deterministic 20-stage curriculum lesson set. Each stage gets
 * 3-5 lessons covering: pure drill, bigrams, words, sentence (and a short
 * paragraph from stage 11+).
 */
export function getBuiltInLessons(): BuiltInLesson[] {
  const lessons: BuiltInLesson[] = [];

  for (const def of STAGES) {
    const targetWpm = def.targetWpm;
    const targetAccuracy = def.targetAccuracy;
    const stage = def.stage;

    const drillText = drillForStage(def);
    if (drillText) {
      lessons.push({
        slug: `stage-${stage}-drill`,
        stage,
        kind: 'drill',
        title: `Stage ${stage}: ${def.name} drill`,
        text: drillText,
        targetWpm,
        targetAccuracy,
      });
    }

    const bigramText = bigramForStage(def);
    if (bigramText) {
      lessons.push({
        slug: `stage-${stage}-bigram`,
        stage,
        kind: 'bigram',
        title: `Stage ${stage}: ${def.name} bigrams`,
        text: bigramText,
        targetWpm,
        targetAccuracy,
      });
    }

    const wordText = wordForStage(stage);
    if (wordText) {
      lessons.push({
        slug: `stage-${stage}-words`,
        stage,
        kind: 'word',
        title: `Stage ${stage}: ${def.name} words`,
        text: wordText,
        targetWpm,
        targetAccuracy,
      });
    }

    const sentenceText = sentenceForStage(stage);
    if (sentenceText) {
      lessons.push({
        slug: `stage-${stage}-sentence`,
        stage,
        kind: 'sentence',
        title: `Stage ${stage}: ${def.name} sentence`,
        text: sentenceText,
        targetWpm,
        targetAccuracy,
      });
    }

    if (stage >= 11) {
      const paragraphText = paragraphForStage(stage);
      if (paragraphText) {
        lessons.push({
          slug: `stage-${stage}-paragraph`,
          stage,
          kind: 'paragraph',
          title: `Stage ${stage}: ${def.name} paragraph`,
          text: paragraphText,
          targetWpm,
          targetAccuracy,
        });
      }
    }

    // Mixed real-word practice that blends ALL prior keys, not just the
    // newest pair. Inserted at odd stages from 5 onward to address the
    // blocked-practice gap (motor-learning literature on interleaving
    // shows blocked drills produce brittle skill that doesn't transfer
    // to mixed input).
    const accumulationText = accumulationForStage(stage);
    if (accumulationText) {
      lessons.push({
        slug: `stage-${stage}-accumulation`,
        stage,
        kind: 'accumulation',
        title: `Stage ${stage}: mixed practice`,
        text: accumulationText,
        targetWpm,
        targetAccuracy,
      });
    }

    // Row-boundary consolidation passages. After completing a full row
    // (home row at s5, top row at s10), the kid has a long passage that
    // uses every key learned so far. Passing it at >= 95% accuracy +
    // target WPM advances them — the existing mastery gate enforces
    // this naturally. Mirrors Peter's Online Typing Course "Whole
    // Shebang" / "Row by Row Combined" structure.
    const consolidationText = consolidationForStage(stage);
    if (consolidationText) {
      lessons.push({
        slug: `stage-${stage}-consolidation`,
        stage,
        kind: 'consolidation',
        title: `Stage ${stage}: row review`,
        text: consolidationText,
        targetWpm,
        targetAccuracy,
      });
    }
  }

  return lessons;
}

// ---------------------------------------------------------------------------
// Lesson text generators (deterministic, only use unlocked chars).
// ---------------------------------------------------------------------------

function repeat(s: string, n: number): string {
  let out = '';
  for (let i = 0; i < n; i++) out += s;
  return out;
}

function drillForStage(def: StageDefinition): string {
  // Pure repetition of newly introduced keys (or, for the no-new-keys
  // capital stage, the home-row letters in upper case).
  if (def.stage === 16) {
    return 'Asdf Jkl; Asdf Jkl; The Big Cat. The Red Hen. Owl And Mole.';
  }
  if (def.keys.length === 0) return '';
  const groups = def.keys.map((k) => repeat(k, 4)).join(' ');
  return `${groups} ${groups} ${groups}`;
}

function bigramForStage(def: StageDefinition): string {
  // Combine new keys with prior unlocked keys to form bigrams.
  if (def.keys.length < 2) return '';
  const [a, b] = def.keys;
  if (a === undefined || b === undefined) return '';
  const prior = def.unlocked.filter((c) => c !== ' ' && !def.keys.includes(c));
  const partner = prior.find((c) => /[a-z]/.test(c)) ?? a;
  const bigrams = [a + b, b + a, a + partner, partner + b];
  return bigrams.join(' ').repeat(3).trim();
}

// For each stage, words/sentences must use only the cumulative unlocked
// character set for that stage. Stage 16+ allow capitals; 17+ allow digits;
// 18+ allow common punctuation; 19+ allow symbols.
const STAGE_WORDS: Record<number, string> = {
  // s1 unlocked: f j space
  1: 'fjf jfj fjj jff jjj fff',
  // s2 adds d k: f j d k
  2: 'jjd ddk fjk kjd dfk kfj',
  // s3 adds s l: f j d k s l
  3: 'sls lsl jsl ksd dlk fls',
  // s4 adds a ; (full home row)
  4: 'a;a ;a; ask add all fall',
  // s5 adds g h
  5: 'has had gag gas flag fall',
  // s6 adds r u (no e yet)
  6: 'rug ugh ruff guru sash hush',
  // s7 adds e i
  7: 'fire here dies dire fries firs',
  // s8 adds w o
  8: 'wow row sow word woods foods',
  // s9 adds q p (no z yet)
  9: 'pop pup quip pip pep papa',
  // s10 adds t y
  10: 'try yet tip toy type teary',
  // s11 adds v m
  11: 'vim warm move time mate vow',
  // s12 adds c , (no n yet)
  12: 'cat car cot cake comes, comes,',
  // s13 adds x . (no b yet)
  13: 'fox six exit fix. exit. fixes.',
  // s14 adds z /
  14: 'zip zoo. fizz. quiz. zest.',
  // s15 adds b n
  15: 'big bun ban ben nib nan',
  // s16 capitals
  16: 'Cat Dog Owl Pig Bee Ant',
  // s17 numbers
  17: '1 2 3 4 5 6 7 8 9 10',
  // s18 common punct (' " ! ?)
  18: "don't can't won't 'why?' 'wow!'",
  // s19 symbols (@ # $ % & * ( ))
  19: 'a@b #1 $5 50% (six) & * (cat)',
  // s20 mixed
  20: 'today: nine-pin marble-run high-five',
};

function wordForStage(stage: number): string {
  return STAGE_WORDS[stage] ?? '';
}

const STAGE_SENTENCES: Record<number, string> = {
  // s1 (f j)
  1: 'fff jjj fjf jfj fjj jff fjf',
  // s2 (f j d k)
  2: 'jjd ddk fjk kjd dfk kfj jdk',
  // s3 (f j d k s l)
  3: 'sls lsl ksd dlk fls jsk lds',
  // s4 (full home row a s d f j k l ;)
  4: 'a sad lad asks all alaska;',
  // s5 add g h
  5: 'a glass had a glass; a flask had a flag',
  // s6 add r u (no e yet)
  6: 'a flush has all glass; gulls hush;',
  // s7 add e i
  7: 'a fish dish here is a fresh dish;',
  // s8 add w o
  8: 'a fresh wood; folks see a wee owl;',
  // s9 add q p (no z, no comma)
  9: 'a pup quips; a paper popper; a paper popper;',
  // s10 add t y (no n yet)
  10: 'try a toy yet; type a paper too;',
  // s11 add v m (no c yet — c is s12)
  11: 'mom moves a warm vim; a vim warms a mat;',
  // s12 add c , (still no b n, no period yet)
  12: 'a cat, a car, a cake, a cot, comes home,',
  // s13 add x . (no b yet)
  13: 'fix six fox. fix six. fix it. fix it.',
  // s14 add z /
  14: 'zip a zoo, fizz a quiz, zest a / zest.',
  // s15 add b n
  15: 'a big bun, a big ben, a big nib;',
  // s16 capitals
  16: 'A Big Cat Sat On A Mat.',
  // s17 numbers
  17: 'I have 12 cats and 3 dogs.',
  // s18 punct
  18: "Don't worry, why not? Wow! Yes!",
  // s19 symbols
  19: 'Buy 5 apples for $1 (a # of them).',
  // s20 mixed
  20: 'Today: nine-pin, high-five, marble-run.',
};

function sentenceForStage(stage: number): string {
  return STAGE_SENTENCES[stage] ?? '';
}

const STAGE_PARAGRAPHS: Record<number, string> = {
  // s11 add v m (no b/n, no x/z, no comma or period — those start at s12/s13)
  11:
    'mom moves a warm vim; a vim warms a mat; mom moves it; ' +
    'a warm vim makes fires warm too; mom moves a warm vim',
  // s12 add c , (no period or b/n yet)
  12:
    'a cat, a car, a cake, a cot, come here, come too, ' +
    'a cat came, a car came, a cake came too',
  // s13 add x . (no b yet)
  13: 'fix six fox. exit, exit, exit. fixes the room. six fox exits. fix six fox too.',
  // s14 add z / (no b/n yet)
  14: 'zip the zoo. fizz, fizz, the zest is fixed. a zip, a zoo, a fizz, a quiz, a zest. / / /',
  // s15 add b n (full lowercase alpha)
  15:
    'a big bun, a big ben, a big nib. ben can run, nan can run. ' +
    'big buns, big nibs, big bens, big nans run by.',
  // s16 capitals
  16:
    'A Big Cat Sat On A Big Mat. A Red Hen Saw A Big Owl. ' +
    'Owls Are Wise And Big. Cats Are Soft And Quick.',
  // s17 numbers
  17:
    'I have 12 cats and 3 dogs. There are 5 birds in the tree. ' +
    'It is now 7 30 in the morning. I see 9 stars at night.',
  // s18 punct
  18:
    "Don't worry, why not try? Wow! Yes! Why not? It's okay. " +
    "Don't fall, can't stop, won't quit, that's why!",
  // s19 symbols
  19:
    'Buy 5 apples for $1 (a fair price). Use & save (#cool & #fun). ' +
    'A * marks a star (every * counts).',
  // s20 mixed
  20:
    'Today the weather is fine: a nine-pin bowling game, a high-five from a friend, ' +
    'a marble-run that loops and turns. Practice, practice, then practice some more.',
};

function paragraphForStage(stage: number): string {
  return STAGE_PARAGRAPHS[stage] ?? '';
}

// ---------------------------------------------------------------------------
// Accumulation lessons — mixed real-word practice using EVERY key learned so
// far. Inserted at odd stages from 5 onward. Skips stages 1-3 because the
// unlocked set is too sparse to form meaningful English (f/j only at s1,
// f/j/d/k/s/l only at s3).
// ---------------------------------------------------------------------------

const STAGE_ACCUMULATIONS: Record<number, string> = {
  // s5 unlocked: a d f g h j k l s ; (full home row) + space
  5: 'a sad lad has a flask; a flag has a glass; dad asks all glad lads; a hall has half a flag',
  // s7 adds e i r u
  7: 'she hides her fresh red fries; his idea is here; jade fled; she sells sails; sad deer flees',
  // s9 adds o p q w
  9: 'our wise pup wishes; she shows her queer papers; he hops up; we used proud quails; fresh frog spoke up',
  // s11 adds m t v y
  11: 'the merry team types my story; we try every vivid happy poem; she sees my pretty puppy; have a steady ride',
  // s13 adds c x , .
  13: 'the cat sat. six cats came home. exit, fox. quick fix. extra credit, mr. cute code crews.',
  // s15 adds b n z /
  15: 'the big brown box ran. zip, nine balloons zoom. zebras nod. brave bunnies in barns. quick zigzag.',
};

function accumulationForStage(stage: number): string {
  return STAGE_ACCUMULATIONS[stage] ?? '';
}

// ---------------------------------------------------------------------------
// Consolidation lessons — long passages at row boundaries. Stage 5 = home
// row complete, stage 10 = top row complete. The existing 95% accuracy +
// target WPM mastery gate means the kid has to nail this lesson to advance
// — that's the gate by construction, no extra UI logic needed.
// ---------------------------------------------------------------------------

const STAGE_CONSOLIDATIONS: Record<number, string> = {
  // s5: home row only (a d f g h j k l s ; + space). No period, no comma —
  // those don't unlock until s12/s13. Separator is ';'.
  5:
    'a sad lad had a flask; a glass had a flag; dad asks all glad lads; ' +
    'half a glass falls; all gas falls; half a slash; a lass has a sash; ' +
    'ask dad; lads ask all sad dads; glass has a flag; half glass falls; ' +
    'all lads gag; ask half; a sash had a flag',
  // s10: home row + top row (adds e i o p q r t u w y). Still no period
  // or comma (s12/s13). Real prose unlocks at s10 — this is the first
  // lesson that actually feels like reading.
  10:
    'the two writers type their stories; we wait quietly today; ' +
    'your fresh idea fits us; the puppy paws at her ride; ' +
    'quiet group sits here; their party is ready; we type pretty poetry; ' +
    'our story has a swift frog; today we ride;',
};

function consolidationForStage(stage: number): string {
  return STAGE_CONSOLIDATIONS[stage] ?? '';
}
