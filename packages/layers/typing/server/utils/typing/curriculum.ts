/**
 * Typing curriculum: a 20-stage progression from home-row keys to full prose. Each
 * stage introduces keys and inherits every earlier stage's, and its lessons may use
 * only that cumulative unlocked set — so the per-stage text below is constrained by
 * STAGE_INTRODUCTIONS, not free-form. The seed endpoint upserts by `slug`.
 */
import {
  stageTargetWpm,
  type LessonKind,
  type StageDefinition,
} from '../../../../../blog/shared/typing-types';

const SPACE = ' ';

/** Per-stage key introductions (lowercase); capitals land at 16, numbers at 17. */
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
    // Stage 16's shifted letters stay out of `unlocked` — the engine tracks shift itself.
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

export function unlockedKeysForStage(stage: number): string[] {
  return getStage(stage)?.unlocked ?? [];
}

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
 * The deterministic lesson set — 3-5 per stage across drill, bigrams, words and a
 * sentence, plus a paragraph from stage 11 up.
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

    // Blends every prior key rather than the newest pair: blocked drills alone
    // produce brittle skill that doesn't transfer to mixed input.
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

    // Row-boundary review. The 95%-accuracy + target-WPM mastery gate already forces
    // a pass before advancing, so this needs no extra progression logic.
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

function repeat(s: string, n: number): string {
  let out = '';
  for (let i = 0; i < n; i++) out += s;
  return out;
}

function drillForStage(def: StageDefinition): string {
  // Stage 16 introduces no new keys, so it drills home-row capitals instead.
  if (def.stage === 16) {
    return 'Asdf Jkl; Asdf Jkl; The Big Cat. The Red Hen. Owl And Mole.';
  }
  if (def.keys.length === 0) return '';
  const groups = def.keys.map((k) => repeat(k, 4)).join(' ');
  return `${groups} ${groups} ${groups}`;
}

function bigramForStage(def: StageDefinition): string {
  if (def.keys.length < 2) return '';
  const [a, b] = def.keys;
  if (a === undefined || b === undefined) return '';
  const prior = def.unlocked.filter((c) => c !== ' ' && !def.keys.includes(c));
  const partner = prior.find((c) => /[a-z]/.test(c)) ?? a;
  const bigrams = [a + b, b + a, a + partner, partner + b];
  return bigrams.join(' ').repeat(3).trim();
}

// Every string below is limited to its stage's cumulative unlocked set, so the
// omissions are deliberate: capitals only from 16, digits 17, punctuation 18, symbols 19.
const STAGE_WORDS: Record<number, string> = {
  1: 'fjf jfj fjj jff jjj fff',
  2: 'jjd ddk fjk kjd dfk kfj',
  3: 'sls lsl jsl ksd dlk fls',
  4: 'a;a ;a; ask add all fall',
  5: 'has had gag gas flag fall',
  6: 'rug ugh ruff guru sash hush',
  7: 'fire here dies dire fries firs',
  8: 'wow row sow word woods foods',
  9: 'pop pup quip pip pep papa',
  10: 'try yet tip toy type teary',
  11: 'vim warm move time mate vow',
  12: 'cat car cot cake comes, comes,',
  13: 'fox six exit fix. exit. fixes.',
  14: 'zip zoo. fizz. quiz. zest.',
  15: 'big bun ban ben nib nan',
  16: 'Cat Dog Owl Pig Bee Ant',
  17: '1 2 3 4 5 6 7 8 9 10',
  18: "don't can't won't 'why?' 'wow!'",
  19: 'a@b #1 $5 50% (six) & * (cat)',
  20: 'today: nine-pin marble-run high-five',
};

function wordForStage(stage: number): string {
  return STAGE_WORDS[stage] ?? '';
}

const STAGE_SENTENCES: Record<number, string> = {
  1: 'fff jjj fjf jfj fjj jff fjf',
  2: 'jjd ddk fjk kjd dfk kfj jdk',
  3: 'sls lsl ksd dlk fls jsk lds',
  4: 'a sad lad asks all alaska;',
  5: 'a glass had a glass; a flask had a flag',
  6: 'a flush has all glass; gulls hush;',
  7: 'a fish dish here is a fresh dish;',
  8: 'a fresh wood; folks see a wee owl;',
  9: 'a pup quips; a paper popper; a paper popper;',
  10: 'try a toy yet; type a paper too;',
  11: 'mom moves a warm vim; a vim warms a mat;',
  12: 'a cat, a car, a cake, a cot, comes home,',
  13: 'fix six fox. fix six. fix it. fix it.',
  14: 'zip a zoo, fizz a quiz, zest a / zest.',
  15: 'a big bun, a big ben, a big nib;',
  16: 'A Big Cat Sat On A Mat.',
  17: 'I have 12 cats and 3 dogs.',
  18: "Don't worry, why not? Wow! Yes!",
  19: 'Buy 5 apples for $1 (a # of them).',
  20: 'Today: nine-pin, high-five, marble-run.',
};

function sentenceForStage(stage: number): string {
  return STAGE_SENTENCES[stage] ?? '';
}

const STAGE_PARAGRAPHS: Record<number, string> = {
  11:
    'mom moves a warm vim; a vim warms a mat; mom moves it; ' +
    'a warm vim makes fires warm too; mom moves a warm vim',
  12:
    'a cat, a car, a cake, a cot, come here, come too, ' +
    'a cat came, a car came, a cake came too',
  13: 'fix six fox. exit, exit, exit. fixes the room. six fox exits. fix six fox too.',
  14: 'zip the zoo. fizz, fizz, the zest is fixed. a zip, a zoo, a fizz, a quiz, a zest. / / /',
  15:
    'a big bun, a big ben, a big nib. ben can run, nan can run. ' +
    'big buns, big nibs, big bens, big nans run by.',
  16:
    'A Big Cat Sat On A Big Mat. A Red Hen Saw A Big Owl. ' +
    'Owls Are Wise And Big. Cats Are Soft And Quick.',
  17:
    'I have 12 cats and 3 dogs. There are 5 birds in the tree. ' +
    'It is now 7 30 in the morning. I see 9 stars at night.',
  18:
    "Don't worry, why not try? Wow! Yes! Why not? It's okay. " +
    "Don't fall, can't stop, won't quit, that's why!",
  19:
    'Buy 5 apples for $1 (a fair price). Use & save (#cool & #fun). ' +
    'A * marks a star (every * counts).',
  20:
    'Today the weather is fine: a nine-pin bowling game, a high-five from a friend, ' +
    'a marble-run that loops and turns. Practice, practice, then practice some more.',
};

function paragraphForStage(stage: number): string {
  return STAGE_PARAGRAPHS[stage] ?? '';
}

// Odd stages from 5 up only — below that the unlocked set is too sparse for real English.
const STAGE_ACCUMULATIONS: Record<number, string> = {
  5: 'a sad lad has a flask; a flag has a glass; dad asks all glad lads; a hall has half a flag',
  7: 'she hides her fresh red fries; his idea is here; jade fled; she sells sails; sad deer flees',
  9: 'our wise pup wishes; she shows her queer papers; he hops up; we used proud quails; fresh frog spoke up',
  11: 'the merry team types my story; we try every vivid happy poem; she sees my pretty puppy; have a steady ride',
  13: 'the cat sat. six cats came home. exit, fox. quick fix. extra credit, mr. cute code crews.',
  15: 'the big brown box ran. zip, nine balloons zoom. zebras nod. brave bunnies in barns. quick zigzag.',
};

function accumulationForStage(stage: number): string {
  return STAGE_ACCUMULATIONS[stage] ?? '';
}

// Long passages at the row boundaries: home row completes at 5, top row at 10, which
// is where the text first reads like prose. Both predate the comma and period.
const STAGE_CONSOLIDATIONS: Record<number, string> = {
  5:
    'a sad lad had a flask; a glass had a flag; dad asks all glad lads; ' +
    'half a glass falls; all gas falls; half a slash; a lass has a sash; ' +
    'ask dad; lads ask all sad dads; glass has a flag; half glass falls; ' +
    'all lads gag; ask half; a sash had a flag',
  10:
    'the two writers type their stories; we wait quietly today; ' +
    'your fresh idea fits us; the puppy paws at her ride; ' +
    'quiet group sits here; their party is ready; we type pretty poetry; ' +
    'our story has a swift frog; today we ride;',
};

function consolidationForStage(stage: number): string {
  return STAGE_CONSOLIDATIONS[stage] ?? '';
}
