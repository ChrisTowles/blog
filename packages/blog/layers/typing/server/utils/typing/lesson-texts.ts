/**
 * Procedural lesson-text generators for the typing curriculum.
 *
 * Every generator is a pure function of (stage definition, seed) so lesson
 * text is deterministic for a given seed but varies across seeds — a kid
 * retrying a lesson gets fresh text instead of memorizing one string. The
 * canonical curriculum (DB seed, lesson cards) uses seed 0.
 *
 * Hard rule, enforced by tests across many seeds: generated text for a
 * stage only uses that stage's cumulative unlocked character set (plus
 * uppercase letters from stage 16 on, when the capitals stage makes the
 * engine case-sensitive).
 */
import type { StageDefinition } from '../../../../../shared/typing-types';

// --- Seeded RNG -------------------------------------------------------------

/** mulberry32 — tiny deterministic PRNG, good enough for text shuffling. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)] as T;
}

function shuffle<T>(rng: () => number, arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const a = out[i] as T;
    out[i] = out[j] as T;
    out[j] = a;
  }
  return out;
}

/** Sample up to n distinct items; returns fewer when arr is small. */
function sample<T>(rng: () => number, arr: readonly T[], n: number): T[] {
  return shuffle(rng, arr).slice(0, Math.min(n, arr.length));
}

/**
 * Accumulate tokens (cycling a shuffled pool) until the joined text reaches
 * minLen. Never exceeds minLen by more than one token.
 */
function fillTokens(rng: () => number, pool: readonly string[], minLen: number): string {
  if (pool.length === 0) return '';
  let order = shuffle(rng, pool);
  const tokens: string[] = [];
  let len = 0;
  let i = 0;
  while (len < minLen) {
    if (i >= order.length) {
      order = shuffle(rng, pool);
      i = 0;
    }
    const t = order[i++] as string;
    tokens.push(t);
    len += t.length + 1;
  }
  return tokens.join(' ');
}

// --- Word pool --------------------------------------------------------------

/**
 * Kid-friendly word list (Dolch/Fry sight words + concrete nouns, verbs,
 * adjectives a 6-9 year old knows). Pools per stage are derived by
 * filtering against the stage's unlocked letters, so a word is only ever
 * shown once every letter in it has been taught.
 */
export const KID_WORDS: readonly string[] = [
  // home-row friendly (stages 4-5)
  'a',
  'as',
  'all',
  'ask',
  'asks',
  'add',
  'adds',
  'dad',
  'dads',
  'sad',
  'lad',
  'lads',
  'lass',
  'fall',
  'falls',
  'flask',
  'flasks',
  'salad',
  'salads',
  'alas',
  'fad',
  'gas',
  'glad',
  'glass',
  'flag',
  'flags',
  'has',
  'had',
  'hall',
  'halls',
  'half',
  'lash',
  'dash',
  'gash',
  'sash',
  'slash',
  'flash',
  'shall',
  'gala',
  // + r u (stage 6)
  'rug',
  'rugs',
  'jug',
  'jugs',
  'hug',
  'hugs',
  'full',
  'dull',
  'gull',
  'gulls',
  'rush',
  'hush',
  'lush',
  'gush',
  'surf',
  'sugar',
  'guard',
  'guards',
  'hard',
  'dark',
  'shark',
  'sharks',
  'lark',
  'dusk',
  'husk',
  'fur',
  'shrug',
  'shrugs',
  'grass',
  'gruff',
  'us',
  'sags',
  'drags',
  // + e i (stage 7)
  'he',
  'she',
  'his',
  'her',
  'here',
  'hers',
  'is',
  'if',
  'like',
  'likes',
  'ride',
  'rides',
  'hide',
  'hides',
  'slide',
  'slides',
  'fish',
  'dish',
  'fresh',
  'red',
  'deer',
  'free',
  'sea',
  'see',
  'seek',
  'sled',
  'sleds',
  'glide',
  'glides',
  'giggle',
  'giggles',
  'sell',
  'sells',
  'self',
  'shell',
  'shells',
  'fire',
  'hill',
  'hills',
  'fill',
  'fills',
  'dig',
  'digs',
  'kid',
  'kids',
  'lid',
  'lids',
  'idea',
  'ideas',
  'easel',
  'eagle',
  'eagles',
  // + w o (stage 8)
  'we',
  'who',
  'wow',
  'owl',
  'owls',
  'low',
  'slow',
  'grow',
  'grows',
  'glow',
  'flow',
  'look',
  'looks',
  'hook',
  'hooks',
  'wood',
  'woods',
  'food',
  'foods',
  'good',
  'wool',
  'dog',
  'dogs',
  'log',
  'logs',
  'frog',
  'frogs',
  'fog',
  'hog',
  'go',
  'goes',
  'so',
  'do',
  'does',
  'our',
  'house',
  'houses',
  'world',
  'word',
  'words',
  'work',
  'works',
  'walk',
  'walks',
  'well',
  'wish',
  'wishes',
  'wise',
  'old',
  'gold',
  'hold',
  'holds',
  'follow',
  'follows',
  'wide',
  'flower',
  'flowers',
  'door',
  'doors',
  'rose',
  'roses',
  'shoe',
  'shoes',
  'window',
  // + q p (stage 9)
  'pig',
  'pigs',
  'paper',
  'papers',
  'pup',
  'pups',
  'pal',
  'pals',
  'help',
  'helps',
  'hop',
  'hops',
  'hope',
  'hopes',
  'keep',
  'keeps',
  'deep',
  'sleep',
  'sleeps',
  'sheep',
  'ship',
  'ships',
  'shop',
  'shops',
  'drop',
  'drops',
  'grape',
  'grapes',
  'apple',
  'apples',
  'plus',
  'pool',
  'pools',
  'hoop',
  'soap',
  'sip',
  'sips',
  'squid',
  'quail',
  'equal',
  'up',
  'papa',
  'piles',
  'wiggle',
  'wiggles',
  'are',
  'pulls',
  'puddle',
  'puddles',
  'people',
  // + t y (stage 10)
  'the',
  'they',
  'this',
  'that',
  'try',
  'tries',
  'story',
  'stories',
  'today',
  'type',
  'types',
  'yes',
  'you',
  'your',
  'toy',
  'toys',
  'tree',
  'trees',
  'turtle',
  'turtles',
  'tiger',
  'tigers',
  'water',
  'just',
  'year',
  'years',
  'party',
  'pretty',
  'sweet',
  'fast',
  'sit',
  'sits',
  'stay',
  'stays',
  'stop',
  'stops',
  'top',
  'hat',
  'hats',
  'happy',
  'day',
  'days',
  'play',
  'plays',
  'way',
  'ways',
  'say',
  'says',
  'eat',
  'eats',
  'tell',
  'tells',
  'little',
  'light',
  'lights',
  'right',
  'sight',
  'street',
  'streets',
  'wait',
  'waits',
  'great',
  'quiet',
  'quite',
  'late',
  'gate',
  'gates',
  'kite',
  'kites',
  'star',
  'stars',
  'art',
  'paste',
  'first',
  'spider',
  'spiders',
  'sister',
  // + v m (stage 11)
  'mom',
  'move',
  'moves',
  'my',
  'may',
  'them',
  'team',
  'teams',
  'very',
  'every',
  'give',
  'gives',
  'five',
  'seven',
  'home',
  'homes',
  'game',
  'games',
  'summer',
  'swim',
  'swims',
  'farm',
  'farms',
  'warm',
  'time',
  'times',
  'make',
  'makes',
  'smile',
  'smiles',
  'milk',
  'gem',
  'gems',
  'gleam',
  'gleams',
  'hum',
  'hums',
  'mouse',
  'map',
  'maps',
  'mud',
  'drum',
  'drums',
  'dream',
  'dreams',
  'me',
  'mama',
  'most',
  'more',
  'love',
  'loves',
  'movie',
  'movies',
  'vivid',
  'dive',
  'dives',
  'have',
  'over',
  'river',
  'rivers',
  'silver',
  'velvet',
  // + c (stage 12)
  'cat',
  'cats',
  'car',
  'cars',
  'cool',
  'cake',
  'cakes',
  'ice',
  'race',
  'races',
  'place',
  'places',
  'come',
  'comes',
  'cup',
  'cups',
  'cute',
  'soccer',
  'rock',
  'rocks',
  'rocket',
  'rockets',
  'clock',
  'clocks',
  'duck',
  'ducks',
  'truck',
  'trucks',
  'cocoa',
  'cuddle',
  'cuddles',
  'climb',
  'climbs',
  'close',
  'collect',
  'collects',
  'comic',
  'comics',
  'cape',
  'capes',
  'cloud',
  'clouds',
  'cheer',
  'cheers',
  'clap',
  'claps',
  'juice',
  'mice',
  'voice',
  'cried',
  'circle',
  'circles',
  'castle',
  'castles',
  'cricket',
  'crickets',
  // + x (stage 13)
  'fox',
  'foxes',
  'six',
  'fix',
  'fixes',
  'mix',
  'mixes',
  'exit',
  'exits',
  'extra',
  'taxi',
  'taxis',
  'wax',
  'sixty',
  'relax',
  'expert',
  'experts',
  // + z (stage 14)
  'zoo',
  'zip',
  'zips',
  'zigzag',
  'zero',
  'size',
  'sizes',
  'prize',
  'prizes',
  'puzzle',
  'puzzles',
  'pizza',
  'lizard',
  'lizards',
  'fizzy',
  'jazz',
  'cozy',
  'crazy',
  'lazy',
  'doze',
  'dozes',
  'quiz',
  'fuzzy',
  'zoom',
  'zooms',
  'maze',
  // + b n (stage 15) — finally the everyday words
  'and',
  'can',
  'an',
  'in',
  'on',
  'no',
  'not',
  'new',
  'nine',
  'night',
  'nights',
  'sun',
  'run',
  'runs',
  'fun',
  'banana',
  'bananas',
  'bread',
  'brown',
  'bunny',
  'bunnies',
  'bird',
  'birds',
  'sing',
  'sings',
  'snail',
  'snails',
  'green',
  'fern',
  'ferns',
  'noon',
  'friend',
  'friends',
  'find',
  'finds',
  'panda',
  'pandas',
  'monkey',
  'monkeys',
  'lion',
  'lions',
  'bear',
  'bears',
  'rabbit',
  'rabbits',
  'blue',
  'black',
  'ball',
  'balls',
  'book',
  'books',
  'boat',
  'boats',
  'bike',
  'bikes',
  'big',
  'best',
  'bring',
  'brings',
  'napkin',
  'napkins',
  'number',
  'numbers',
  'nice',
  'nest',
  'nests',
  'nut',
  'nuts',
  'snow',
  'rain',
  'rains',
  'train',
  'trains',
  'plane',
  'planes',
  'plant',
  'plants',
  'bounce',
  'bounces',
  'bake',
  'bakes',
  'blanket',
  'blankets',
  'wind',
  'bends',
  'under',
  'morning',
  'lemonade',
  'picnic',
  'snack',
  'snacks',
  'pine',
  'pines',
  'penguin',
  'penguins',
  'dragon',
  'dragons',
  'wagon',
  'wagons',
  'balloon',
  'balloons',
];

/**
 * Words typeable at this stage: every letter is in the unlocked set.
 * Words are pure lowercase a-z, so only letters are checked.
 */
export function wordPoolForStage(unlocked: readonly string[]): string[] {
  const set = new Set(unlocked);
  return KID_WORDS.filter((w) => [...w].every((ch) => set.has(ch)));
}

// --- Drills -----------------------------------------------------------------

const DRILL_MIN_LEN = 64;

/** Capitalize the first letter — used by the capitals-stage generators. */
function cap(w: string): string {
  return w.charAt(0).toUpperCase() + w.slice(1);
}

const NUMBER_DRILL_TOKENS = [
  '11',
  '22',
  '33',
  '44',
  '55',
  '66',
  '77',
  '88',
  '99',
  '00',
  '12',
  '34',
  '56',
  '78',
  '90',
  '10',
  '25',
  '100',
  '123',
  '456',
];

const PUNCT_DRILL_TOKENS = [
  "don't",
  "can't",
  "won't",
  "it's",
  "he's",
  "she's",
  "isn't",
  "let's",
  'wow!',
  'yes!',
  'go!',
  'why?',
  'who?',
  'ok?',
  '"hi"',
  '"yes!"',
  '"go!"',
];

const SYMBOL_DRILL_TOKENS = [
  '@home',
  '#fun',
  '$5',
  '$10',
  '10%',
  '50%',
  '(yes)',
  '(no)',
  'a&b',
  '#1',
  '*star*',
  '(wow)',
  '$2',
  '25%',
  'me&you',
];

const MIXED_DRILL_TOKENS = [
  'top:',
  'note:',
  're-do',
  'high-five',
  'sing-along',
  'one-two',
  '3:15',
  '9:30',
  'well-fed',
  'up-to-date',
  'tip-top',
  'plan:',
  'go-kart',
];

/**
 * Drill: motor patterns on the newly introduced keys — repetition AND
 * alternation (aabb/abab/aab), which is what actually builds the keystroke,
 * not bare aaaa bbbb runs. Stages 16-20 drill their special character class
 * (capitals, digits, punctuation, symbols, hyphen/colon) instead.
 */
export function drillText(def: StageDefinition, seed: number): string {
  const rng = mulberry32(seed ^ hashString(`drill-${def.stage}`));
  if (def.stage === 16) {
    const pool = wordPoolForStage(def.unlocked).filter((w) => w.length >= 3);
    return fillTokens(rng, sample(rng, pool, 12).map(cap), DRILL_MIN_LEN);
  }
  if (def.stage === 17) return fillTokens(rng, NUMBER_DRILL_TOKENS, DRILL_MIN_LEN);
  if (def.stage === 18) return fillTokens(rng, PUNCT_DRILL_TOKENS, DRILL_MIN_LEN);
  if (def.stage === 19) return fillTokens(rng, SYMBOL_DRILL_TOKENS, DRILL_MIN_LEN);
  if (def.stage === 20) return fillTokens(rng, MIXED_DRILL_TOKENS, DRILL_MIN_LEN);

  const [a, b] = def.keys;
  if (a === undefined) return '';
  if (b === undefined) {
    return fillTokens(rng, [a.repeat(4), a.repeat(3), a.repeat(2)], DRILL_MIN_LEN);
  }
  const units = [
    a.repeat(4),
    b.repeat(4),
    a + b,
    b + a,
    a + a + b,
    b + b + a,
    a + b + a,
    b + a + b,
    a + a + b + b,
    a + b + a + b,
  ];
  return fillTokens(rng, units, DRILL_MIN_LEN);
}

// --- Bigrams ----------------------------------------------------------------

/**
 * The most frequent English bigrams, in rank order. Bigram lessons pull
 * from this list (constrained to unlocked keys) so pair practice transfers
 * to real prose instead of drilling arbitrary letter pairs.
 */
export const COMMON_BIGRAMS: readonly string[] = [
  'th',
  'he',
  'in',
  'er',
  'an',
  're',
  'on',
  'at',
  'en',
  'nd',
  'ti',
  'es',
  'or',
  'te',
  'of',
  'ed',
  'is',
  'it',
  'al',
  'ar',
  'st',
  'to',
  'nt',
  'ng',
  'se',
  'ha',
  'as',
  'ou',
  'io',
  'le',
  've',
  'co',
  'me',
  'de',
  'hi',
  'ri',
  'ro',
  'ic',
  'ne',
  'ea',
  'ra',
  'ce',
  'li',
  'ch',
  'll',
  'be',
  'ma',
  'si',
  'om',
  'ur',
  'el',
  'ul',
  'ho',
  'la',
  'sh',
  'fi',
  'fr',
  'gl',
  'ow',
  'wo',
];

const BIGRAM_MIN_LEN = 60;

/**
 * Bigram lesson: 5-6 high-frequency English bigrams typeable at this stage,
 * preferring ones that use a newly introduced key. Falls back to synthetic
 * new-key pairs in the earliest stages where no common bigram fits.
 * Only generated for stages 1-15 (letter stages).
 */
export function bigramText(def: StageDefinition, seed: number): string {
  if (def.stage > 15) return '';
  const rng = mulberry32(seed ^ hashString(`bigram-${def.stage}`));
  const set = new Set(def.unlocked);
  const newKeys = new Set(def.keys);
  const usable = COMMON_BIGRAMS.filter(
    (bg) => set.has(bg[0] as string) && set.has(bg[1] as string),
  );
  const withNew = usable.filter((bg) => [...bg].some((ch) => newKeys.has(ch)));
  // Prefer bigrams featuring a new key, padded with the highest-frequency rest.
  const chosen = [...withNew.slice(0, 4), ...usable.filter((bg) => !withNew.includes(bg))].slice(
    0,
    6,
  );

  if (chosen.length < 2) {
    const [a, b] = def.keys;
    if (a === undefined || b === undefined) return '';
    const prior = def.unlocked.filter((c) => /[a-z]/.test(c) && !newKeys.has(c));
    const partners = prior.length > 0 ? prior : [a];
    const synth = [a + b, b + a, ...partners.slice(0, 2).flatMap((p) => [a + p, p + b])];
    return fillTokens(rng, synth, BIGRAM_MIN_LEN);
  }

  const groups = sample(rng, chosen, 6).map((bg) => `${bg} ${bg} ${bg}`);
  return fillTokens(rng, groups, BIGRAM_MIN_LEN);
}

// --- Words ------------------------------------------------------------------

/** Pseudo-word tokens for stages 1-3, where too few letters exist for English. */
function pseudoWords(def: StageDefinition, rng: () => number): string {
  const letters = def.unlocked.filter((c) => /[a-z;]/.test(c));
  const makeToken = () => {
    const len = 2 + Math.floor(rng() * 3);
    let t = '';
    for (let i = 0; i < len; i++) t += pick(rng, letters);
    return t;
  };
  const tokens: string[] = [];
  for (let i = 0; i < 16; i++) tokens.push(makeToken());
  return tokens.join(' ');
}

/**
 * Word lesson: real kid words sampled from the stage pool, with length
 * scaling up as stages progress. Stage 16 capitalizes (capitals practice);
 * 17-20 blend in that stage's special tokens.
 */
export function wordText(def: StageDefinition, seed: number): string {
  const rng = mulberry32(seed ^ hashString(`word-${def.stage}`));
  if (def.stage <= 3) return pseudoWords(def, rng);

  const minLen = Math.min(70 + def.stage * 3, 120);
  let pool = wordPoolForStage(def.unlocked);
  if (def.stage === 16) pool = pool.filter((w) => w.length >= 3).map(cap);

  const extras =
    def.stage === 17
      ? NUMBER_DRILL_TOKENS
      : def.stage === 18
        ? PUNCT_DRILL_TOKENS
        : def.stage === 19
          ? SYMBOL_DRILL_TOKENS
          : def.stage === 20
            ? MIXED_DRILL_TOKENS
            : [];
  const tokens = [...sample(rng, pool, 14), ...sample(rng, extras, 5)];
  return fillTokens(rng, tokens, minLen);
}

// --- Sentences --------------------------------------------------------------

/**
 * Curated sentence variants per stage. Hand-written because constrained
 * meaningful English can't be assembled from a word pool alone — but
 * validated by tests against the unlocked set for every stage, so a
 * misplaced letter fails CI rather than reaching a kid.
 * Stages 1-3 have no sentence lesson (too few letters for meaning).
 */
const SENTENCE_VARIANTS: Record<number, string[]> = {
  4: [
    'dad adds a salad; a lad asks; all lads fall',
    'a sad lass asks dad; all flasks fall; alas',
    'dads ask lads; a lass adds salads; all fall',
  ],
  5: [
    'a glad lad has a flag; dad has a glass hall',
    'dad has a flask; a lad adds gas; flags shall fall',
    'a glad gal has a glass flask; all halls flash',
  ],
  6: [
    'a dark shark lurks; gulls rush; a gruff guard shrugs',
    'sugar falls; dad hugs us; a full jug sags; surf falls',
    'a guard has a rug; sharks surf; gulls flash; dusk falls',
  ],
  7: [
    'she likes a free ride; he hides a red dish here',
    'a deer slides; a fish dish is fresh; she giggles',
    'his red sled glides; she sells fresh fish here',
  ],
  8: [
    'a good dog digs; we walk our dog; owls look low',
    'we grow flowers; a slow frog goes; look here',
    'our world is wide; we follow a wise old owl',
  ],
  9: [
    'a squid wiggles; pigs sleep; we keep our hopes up',
    'we help papa; a pig hops; papa keeps a deep pool',
    'drop a paper here; a quail sips; we are equal pals',
  ],
  10: [
    'today we type a story; the turtle is too quiet',
    'they try to type fast; yes you are pretty good at it',
    'a tiger trots; the water is sweet; we play all day',
  ],
  11: [
    'my mom gives me time to move; we make a vivid map',
    'every summer we swim; my team loves a good game',
    'five gems gleam; my mom hums; we love this game',
  ],
  12: [
    'we like cocoa, cake, milk, a cool quick treat',
    'come here, calico cat, let us cuddle up today',
    'we collect rocks, cups, capes, comic art, juice',
  ],
  13: [
    'six foxes exit. we fix it. the mix is exact.',
    'the taxi exits. we relax. life is extra sweet.',
    'i fix six taxis. we mix juice. exit here, please.',
  ],
  14: [
    'the zoo is crazy. we zigzag past size zero crates.',
    'a lizard sizzles jazz. we quiz seal pups at the zoo.',
    'we doze at dusk. cozy quilts feel sleek. zip it up.',
  ],
  15: [
    'a brown bunny bounces in the sun. nine birds sing.',
    'ben and nan bake banana bread. we bring napkins.',
    'the brave snail naps under a green fern by noon.',
  ],
  16: [
    'Ben and Tess take the dog to the park. Sam waves.',
    'Monday we visit Grandma. Tuesday we bake. We rest.',
    'The sun rises. Maple Lane wakes up. Dogs bark loud.',
  ],
  17: [
    'We see 3 cats, 7 dogs, and 12 birds at the park.',
    'My team scored 21 points in 4 games this year.',
    'School starts at 8 15 and ends at 3 30 today.',
  ],
  18: [
    "Don't stop now! Can you type this? Yes, you can!",
    '"Wow!" said Ben. "That was fast! Race me again!"',
    "Isn't it fun? We won't quit. It's a great day!",
  ],
  19: [
    'Buy 3 pears for $2 (a great deal) and save 10%.',
    'Tag it #fun, add a * for luck, and send it @ home.',
    'Mom & I split $5. We kept 50% each (fair & square).',
  ],
  20: [
    "Today's plan: a high-five, a sing-along, and a rest.",
    'Remember this: practice makes progress - one key at a time.',
    'My top three: ice-cream, mini-golf, and a good book.',
  ],
};

export function sentenceText(stage: number, seed: number): string {
  const variants = SENTENCE_VARIANTS[stage];
  if (!variants || variants.length === 0) return '';
  const rng = mulberry32(seed ^ hashString(`sentence-${stage}`));
  return pick(rng, variants);
}

// --- Paragraphs -------------------------------------------------------------

const PARAGRAPH_VARIANTS: Record<number, string[]> = {
  11: [
    'my mom loves summer; we swim at the lake; my team plays a fast game; i give them all my time; we move home quietly; the water is warm; we all smile today',
    'every day we type; we tap away fast; the keys feel easy today; i am very happy here; we make up a great story; mom reads it to me; it is a good day to play',
  ],
  12: [
    'a cute cat comes close, curls up, sleeps all day; we like cocoa, cake, a quick treat; my dog cuddles up too, happy as ever; it is a calm, quiet day at home',
    'we collect cool rocks, red cups, comic art; the clock ticks; a duck quacks at the dock; my cat creeps up the couch, calm as a cloud; we clap, we cheer, we race home',
  ],
  13: [
    'six foxes exit the woods. we fix the old mix. dad makes extra juice. the taxi waits up the street. we relax here, happy at last. it is a sweet, exact day.',
    'we fix six taxis today. the experts help us. extra parts are here. we exit at dusk. mom waits with juice. life feels extra sweet.',
  ],
  14: [
    'the zoo is crazy today. lizards doze at the gate. we zigzag past the seals. a jazz duo plays. fizzy juice sparkles. we quiz the zookeeper. the prize is a puzzle.',
    'we size up the maze. zero exits appear at first. we zip past hazy walls. a lazy lizard sleeps. we squeeze out at last. the quiz prize is pizza today.',
  ],
  15: [
    'a brown bunny bounces in the morning sun. nine little birds sing in the pines. we bring snacks, books, and a big blanket. the wind bends the green ferns. by noon we nap under the trees.',
    'ben and nan bake banana bread for the picnic. the kitchen smells warm and sweet. we bring napkins and lemonade. friends come by at noon. everyone gets a big golden slice.',
  ],
  16: [
    'Ben and Tess walk to Maple Park on Sunday. Their dog Rex runs ahead. Sam and Lena wave from the bridge. The four friends share plums and play tag until the sun sets.',
    'On Monday we visit Grandma June. On Tuesday we bake oat bread. On Friday, Dad takes us to Cedar Lake. Saturday is for naps, books, and one more slice of pie.',
  ],
  17: [
    'Our class has 24 kids. We read 15 books in March and 18 in April. At 8 30 we start math. By 3 15 we pack our bags. The bus ride home takes 12 minutes.',
    'I am 9 years old. My brother is 12. We live at 47 Oak Lane. Our cat naps 16 hours a day. On Sunday we biked 5 miles and saw 3 deer, 7 ducks, and 1 red fox.',
  ],
  18: [
    '"Ready?" asks Mom. "Yes!" we shout. We can\'t wait for the fair. Isn\'t it the best day? The rides spin, the music plays, and we don\'t want to leave at all!',
    'Don\'t quit now! You\'re so close. Can you feel it? Your fingers know the keys. "Practice," says Dad, "and it gets easy." He\'s right, isn\'t he? Keep going!',
  ],
  19: [
    'The bake sale made $85 (a new record). Mom & I sold 42 cookies. Tag your photos #bakesale and add a * for the helpers. About 60% sold out by noon (wow).',
    'Buy 3 pears for $2 & save 10%. The sign says (in big letters) "deal of the day." We spent $6, kept 25%, and gave the rest to Gram & Pops. #fair',
  ],
  20: [
    'Here is my plan for today: a ten-minute warm-up, two fast drills, and one long story. My goal: 30 words a minute - no slip-ups. Practice makes progress: one key, one word, one line at a time.',
    "My top three things: ice-cream on hot days, mini-golf with Dad, and well-worn books at night. Mom says: 'Do your best - then rest.' Today I typed my fastest line ever: this one.",
  ],
};

export function paragraphText(stage: number, seed: number): string {
  const variants = PARAGRAPH_VARIANTS[stage];
  if (!variants || variants.length === 0) return '';
  const rng = mulberry32(seed ^ hashString(`paragraph-${stage}`));
  return pick(rng, variants);
}

// --- Accumulation (mixed practice across ALL learned keys) -------------------

/**
 * Mixed real-word practice over the full unlocked set — interleaving, not
 * blocked drilling of the newest pair. Word groups are joined with the
 * richest separator the stage has unlocked.
 */
export function accumulationText(def: StageDefinition, seed: number): string {
  if (def.stage < 5 || def.stage > 15 || def.stage % 2 === 0) return '';
  const rng = mulberry32(seed ^ hashString(`accumulation-${def.stage}`));
  return groupedWords(def, rng, 130);
}

// --- Consolidation (row-boundary review passages) -----------------------------

/**
 * Long "use everything you know" passage at row boundaries (stages 5, 10,
 * 15) plus a curated everything-mixed passage at stage 20. Passing this
 * lesson is required by the mastery gate to advance past these stages.
 */
export function consolidationText(def: StageDefinition, seed: number): string {
  const rng = mulberry32(seed ^ hashString(`consolidation-${def.stage}`));
  if (def.stage === 20) {
    return pick(rng, [
      "Typing report: this year I learned all 26 letters, the numbers 0-9, and signs like @, #, $, %, &, and *. My best run hit 32 words a minute (a new record)! Can I go faster? Watch me: I'm just getting started - one line at a time.",
      "Field day recap: we ran 4 races, won 2, and tied 1. Score: 18-12! Sam yelled, 'Go team!' We split $10 of snacks (50% each), high-fived, and walked home at 5 30. Best day ever? It's close - top three for sure.",
    ]);
  }
  if (def.stage === 5 || def.stage === 10 || def.stage === 15) {
    return groupedWords(def, rng, 210);
  }
  return '';
}

/**
 * Sample pool words into separator-joined groups of 2-4, until minLen.
 * Separator: '. ' once the period is unlocked (stage 13+), else '; '.
 */
function groupedWords(def: StageDefinition, rng: () => number, minLen: number): string {
  const pool = wordPoolForStage(def.unlocked);
  if (pool.length < 8) return '';
  const sep = def.unlocked.includes('.') ? '. ' : '; ';
  const groups: string[] = [];
  let len = 0;
  let order = shuffle(rng, pool);
  let i = 0;
  const take = () => {
    if (i >= order.length) {
      order = shuffle(rng, pool);
      i = 0;
    }
    return order[i++] as string;
  };
  while (len < minLen) {
    const n = 2 + Math.floor(rng() * 3);
    const words: string[] = [];
    for (let k = 0; k < n; k++) words.push(take());
    const group = words.join(' ');
    groups.push(group);
    len += group.length + sep.length;
  }
  let out = groups.join(sep);
  if (sep === '. ') out += '.';
  return out;
}

// --- Tricky keys (adaptive review) -------------------------------------------

/**
 * Adaptive review text for a learner's weakest keys: short drill bursts on
 * each tricky key interleaved with real words containing it, all within the
 * stage's unlocked set. Punctuation/digit keys get drill bursts only.
 */
export function trickyKeysText(
  trickyKeys: readonly string[],
  unlocked: readonly string[],
  seed: number,
): string {
  if (trickyKeys.length === 0) return '';
  const rng = mulberry32(seed ^ hashString(`tricky-${trickyKeys.join('')}`));
  const pool = wordPoolForStage(unlocked);
  const parts: string[] = [];
  for (const key of shuffle(rng, trickyKeys)) {
    parts.push(`${key}${key}${key}`);
    if (/[a-z]/.test(key)) {
      const withKey = pool.filter((w) => w.includes(key));
      parts.push(...sample(rng, withKey.length >= 3 ? withKey : pool, 4));
    }
  }
  // Interleave a second pass so each key shows up more than once.
  const burst = parts.join(' ');
  let out = burst.length >= 110 ? burst : `${burst} ${shuffle(rng, parts).join(' ')}`;
  if (out.length > 160) out = out.slice(0, 160).replace(/\s+\S*$/, '');
  // Early stages have sparse word pools — pad with alternation units so the
  // lesson is always long enough to be a meaningful (and gate-eligible) run.
  if (out.length < 60) {
    const letters = unlocked.filter((c) => /[a-z]/.test(c));
    const units = trickyKeys.flatMap((k) => [
      k.repeat(4),
      ...sample(rng, letters, 3).map((l) => k + l),
    ]);
    out = `${out} ${fillTokens(rng, units, 60 - out.length)}`;
  }
  return out;
}
