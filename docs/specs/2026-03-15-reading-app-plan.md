# Reading App Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an AI-powered reading app at `/reading` within the existing blog, with phonics-constrained story generation, spaced repetition, and TTS word highlighting.

**Architecture:** New pages/components/API routes in the existing Nuxt 4 blog package. PostgreSQL + Drizzle for data, Claude Haiku for story generation, ts-fsrs for SRS scheduling, Web Speech API for TTS. Four feature-sliced workstreams designed for parallel agent team execution.

**Tech Stack:** Nuxt 4, Drizzle ORM, PostgreSQL, ts-fsrs, @anthropic-ai/sdk, Web Speech API, @nuxt/ui v4

**Spec:** `docs/specs/2026-03-15-reading-app-design.md`

---

## Chunk 0: Lead Setup (before spawning teammates)

### Task 0.1: Install dependencies

**Files:**
- Modify: `packages/blog/package.json`

- [ ] **Step 1: Install ts-fsrs**

```bash
cd packages/blog && pnpm add ts-fsrs
```

- [ ] **Step 2: Verify install**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add packages/blog/package.json pnpm-lock.yaml
git commit -m "chore: add ts-fsrs dependency for reading app SRS engine"
```

### Task 0.2: Migrate schema.ts to schema/ directory

The existing codebase uses a single `server/database/schema.ts`. We need a `schema/` directory so the reading app can have its own schema file.

**Files:**
- Move: `packages/blog/server/database/schema.ts` -> `packages/blog/server/database/schema/blog.ts`
- Create: `packages/blog/server/database/schema/index.ts`
- Modify: `packages/blog/drizzle.config.ts`
- Modify: `packages/blog/server/utils/drizzle.ts`

- [ ] **Step 1: Create schema directory and move existing schema**

```bash
mkdir -p packages/blog/server/database/schema
mv packages/blog/server/database/schema.ts packages/blog/server/database/schema/blog.ts
```

- [ ] **Step 2: Create barrel export**

Create `packages/blog/server/database/schema/index.ts`:

```ts
export * from './blog';
```

- [ ] **Step 3: Update drizzle.config.ts**

Change line 18 from:
```ts
schema: './server/database/schema.ts',
```
to:
```ts
schema: './server/database/schema',
```

- [ ] **Step 4: Verify drizzle.ts import still works**

`server/utils/drizzle.ts` imports `from '../database/schema'` — this already resolves to the directory's `index.ts`. No change needed.

- [ ] **Step 5: Run typecheck to verify nothing broke**

```bash
pnpm typecheck
```

- [ ] **Step 6: Run tests**

```bash
pnpm test
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: migrate schema.ts to schema/ directory for multi-feature support"
```

### Task 0.3: Add route rules for /reading

**Files:**
- Modify: `packages/blog/nuxt.config.ts:82-91`

- [ ] **Step 1: Add reading route rules**

Add after the `/loan/**` rule (line 91):

```ts
// Reading app - landing is SSR for SEO, interactive pages are CSR
'/reading/stories/**': { ssr: false },
'/reading/practice': { ssr: false },
'/reading/onboarding': { ssr: false },
'/reading/dashboard': { ssr: false },
'/reading/child/**': { ssr: false },
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/nuxt.config.ts
git commit -m "feat: add reading app route rules (CSR for interactive pages)"
```

---

## Chunk 1: db-architect

All tasks in this chunk must complete before Chunks 2-4 can start (they depend on schema + types).

### Task 1.1: Create shared reading types

**Files:**
- Create: `packages/blog/shared/reading-types.ts`

- [ ] **Step 1: Write the types file**

```ts
export interface StoryWord {
  text: string;
  decodable: boolean;
  pattern: string | null;
  sightWord: boolean;
}

export interface StoryPage {
  words: StoryWord[];
}

export interface StoryContent {
  pages: StoryPage[];
}

export type PhonicsPhase = 1 | 2 | 3 | 4;
export type PhonicsProgressStatus = 'locked' | 'active' | 'mastered';
export type ReadingMode = 'listen' | 'guided' | 'independent';
export type SrsCardType = 'phoneme' | 'sight_word' | 'vocab';

export interface ReadingMiscue {
  wordIndex: number;
  expected: string;
  actual: string;
  type: 'omission' | 'insertion' | 'mispronunciation' | 'substitution';
}

export interface SrsReviewRequest {
  cardId: number;
  rating: 1 | 3 | 4; // Again, Hard, Good (mapped to FSRS Rating enum)
}

export interface SrsStatsResponse {
  due: number;
  newCards: number;
  mastered: number;
  total: number;
}

export interface GenerateStoryRequest {
  childId: number;
  theme?: string;
}
```

- [ ] **Step 2: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add packages/blog/shared/reading-types.ts
git commit -m "feat: add shared reading app types"
```

### Task 1.2: Create Drizzle schema for reading tables

**Files:**
- Create: `packages/blog/server/database/schema/reading.ts`
- Modify: `packages/blog/server/database/schema/index.ts`

- [ ] **Step 1: Write the reading schema**

Create `packages/blog/server/database/schema/reading.ts`:

```ts
import {
  pgTable,
  varchar,
  text,
  integer,
  serial,
  timestamp,
  real,
  boolean,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './blog';
import type { StoryContent, ReadingMiscue } from '~~/shared/reading-types';

// --- Reading App Tables ---

export const childProfiles = pgTable(
  'child_profiles',
  {
    id: serial().primaryKey(),
    userId: varchar({ length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar({ length: 100 }).notNull(),
    avatarUrl: text(),
    birthYear: integer().notNull(),
    currentPhase: integer().notNull().default(1),
    interests: text().array().notNull().default([]),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('child_profiles_user_id_idx').on(table.userId)],
);

export const childProfilesRelations = relations(childProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [childProfiles.userId],
    references: [users.id],
  }),
  phonicsProgress: many(childPhonicsProgress),
  srsCards: many(srsCards),
  stories: many(stories),
  readingSessions: many(readingSessions),
}));

export const phonicsUnits = pgTable('phonics_units', {
  id: serial().primaryKey(),
  phase: integer().notNull(),
  orderIndex: integer().notNull(),
  name: varchar({ length: 100 }).notNull(),
  patterns: text().array().notNull().default([]),
  description: text().notNull().default(''),
});

export const phonicsUnitsRelations = relations(phonicsUnits, ({ many }) => ({
  progress: many(childPhonicsProgress),
}));

export const childPhonicsProgress = pgTable(
  'child_phonics_progress',
  {
    id: serial().primaryKey(),
    childId: integer()
      .notNull()
      .references(() => childProfiles.id, { onDelete: 'cascade' }),
    phonicsUnitId: integer()
      .notNull()
      .references(() => phonicsUnits.id),
    status: varchar({ length: 20 }).notNull().default('locked'),
    masteredAt: timestamp(),
  },
  (table) => [index('child_phonics_progress_child_id_idx').on(table.childId)],
);

export const childPhonicsProgressRelations = relations(childPhonicsProgress, ({ one }) => ({
  child: one(childProfiles, {
    fields: [childPhonicsProgress.childId],
    references: [childProfiles.id],
  }),
  phonicsUnit: one(phonicsUnits, {
    fields: [childPhonicsProgress.phonicsUnitId],
    references: [phonicsUnits.id],
  }),
}));

export const srsCards = pgTable(
  'srs_cards',
  {
    id: serial().primaryKey(),
    childId: integer()
      .notNull()
      .references(() => childProfiles.id, { onDelete: 'cascade' }),
    cardType: varchar({ length: 20 }).notNull(),
    front: text().notNull(),
    back: text().notNull(),
    audioUrl: text(),
    state: integer().notNull().default(0),
    difficulty: real().notNull().default(0),
    stability: real().notNull().default(0),
    due: timestamp().defaultNow().notNull(),
    lastReview: timestamp(),
    reps: integer().notNull().default(0),
    lapses: integer().notNull().default(0),
    relatedPhonicsUnitId: integer().references(() => phonicsUnits.id),
  },
  (table) => [index('srs_cards_child_id_due_idx').on(table.childId, table.due)],
);

export const srsCardsRelations = relations(srsCards, ({ one }) => ({
  child: one(childProfiles, {
    fields: [srsCards.childId],
    references: [childProfiles.id],
  }),
  phonicsUnit: one(phonicsUnits, {
    fields: [srsCards.relatedPhonicsUnitId],
    references: [phonicsUnits.id],
  }),
}));

export const stories = pgTable(
  'stories',
  {
    id: serial().primaryKey(),
    childId: integer().references(() => childProfiles.id, { onDelete: 'set null' }),
    title: varchar({ length: 200 }).notNull(),
    content: jsonb().$type<StoryContent>().notNull(),
    theme: varchar({ length: 100 }).notNull().default(''),
    targetPatterns: text().array().notNull().default([]),
    targetWords: text().array().notNull().default([]),
    decodabilityScore: real().notNull().default(0),
    fleschKincaid: real().notNull().default(0),
    illustrationUrls: text().array().notNull().default([]),
    aiGenerated: boolean().notNull().default(false),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (table) => [index('stories_child_id_idx').on(table.childId)],
);

export const storiesRelations = relations(stories, ({ one, many }) => ({
  child: one(childProfiles, {
    fields: [stories.childId],
    references: [childProfiles.id],
  }),
  sessions: many(readingSessions),
}));

export const readingSessions = pgTable(
  'reading_sessions',
  {
    id: serial().primaryKey(),
    childId: integer()
      .notNull()
      .references(() => childProfiles.id, { onDelete: 'cascade' }),
    storyId: integer()
      .notNull()
      .references(() => stories.id),
    mode: varchar({ length: 20 }).notNull(),
    wcpm: real(),
    accuracy: real(),
    duration: integer().notNull().default(0),
    miscues: jsonb().$type<ReadingMiscue[]>(),
    recordingUrl: text(),
    completedAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    index('reading_sessions_child_id_completed_idx').on(table.childId, table.completedAt),
  ],
);

export const readingSessionsRelations = relations(readingSessions, ({ one }) => ({
  child: one(childProfiles, {
    fields: [readingSessions.childId],
    references: [childProfiles.id],
  }),
  story: one(stories, {
    fields: [readingSessions.storyId],
    references: [stories.id],
  }),
}));
```

- [ ] **Step 2: Add to barrel export**

Update `packages/blog/server/database/schema/index.ts`:

```ts
export * from './blog';
export * from './reading';
```

- [ ] **Step 3: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 4: Commit**

```bash
git add packages/blog/server/database/schema/reading.ts packages/blog/server/database/schema/index.ts
git commit -m "feat: add reading app Drizzle schema (6 tables)"
```

### Task 1.3: Generate and run migrations

**Files:**
- Generated: `packages/blog/server/database/migrations/NNNN_*.sql`

- [ ] **Step 1: Generate migration**

```bash
cd packages/blog && pnpm db:generate
```

- [ ] **Step 2: Review generated SQL**

Check the generated migration file. Verify it creates all 6 tables with correct column types, foreign keys, and indexes.

- [ ] **Step 3: Run migration**

```bash
pnpm db:migrate
```

- [ ] **Step 4: Commit**

```bash
git add packages/blog/server/database/migrations/
git commit -m "feat: add reading app database migration"
```

### Task 1.4: Seed phonics scope & sequence

**Files:**
- Create: `packages/blog/server/utils/reading/phonics-seed.ts`

- [ ] **Step 1: Write the seed data**

Create `packages/blog/server/utils/reading/phonics-seed.ts` with the full Phase 1-4 scope & sequence from the research doc:

```ts
import type { PhonicsPhase } from '~~/shared/reading-types';

export interface PhonicsUnitSeed {
  phase: PhonicsPhase;
  orderIndex: number;
  name: string;
  patterns: string[];
  description: string;
}

export const PHONICS_SEED: PhonicsUnitSeed[] = [
  // Phase 1: Foundations
  {
    phase: 1,
    orderIndex: 1,
    name: 'Single consonants (b, c, d, f, g, h)',
    patterns: ['C-b', 'C-c', 'C-d', 'C-f', 'C-g', 'C-h'],
    description: 'Initial consonant sounds: b, c, d, f, g, h',
  },
  {
    phase: 1,
    orderIndex: 2,
    name: 'Single consonants (k, l, m, n, p, s, t)',
    patterns: ['C-k', 'C-l', 'C-m', 'C-n', 'C-p', 'C-s', 'C-t'],
    description: 'Initial consonant sounds: k, l, m, n, p, s, t',
  },
  {
    phase: 1,
    orderIndex: 3,
    name: 'CVC short-a',
    patterns: ['CVC-short-a'],
    description: 'Consonant-vowel-consonant words with short a (cat, hat, man)',
  },
  {
    phase: 1,
    orderIndex: 4,
    name: 'CVC short-i',
    patterns: ['CVC-short-i'],
    description: 'CVC words with short i (sit, hit, pin)',
  },
  {
    phase: 1,
    orderIndex: 5,
    name: 'CVC short-o',
    patterns: ['CVC-short-o'],
    description: 'CVC words with short o (hot, dog, mop)',
  },
  {
    phase: 1,
    orderIndex: 6,
    name: 'CVC short-u',
    patterns: ['CVC-short-u'],
    description: 'CVC words with short u (cup, bug, sun)',
  },
  {
    phase: 1,
    orderIndex: 7,
    name: 'CVC short-e',
    patterns: ['CVC-short-e'],
    description: 'CVC words with short e (bed, red, pet)',
  },
  {
    phase: 1,
    orderIndex: 8,
    name: 'Digraphs sh, th, ch',
    patterns: ['DG-sh', 'DG-th', 'DG-ch'],
    description: 'Consonant digraphs: sh (ship), th (thin), ch (chop)',
  },
  {
    phase: 1,
    orderIndex: 9,
    name: 'Digraph ck and remaining consonants',
    patterns: ['DG-ck', 'C-j', 'C-r', 'C-v', 'C-w', 'C-x', 'C-y', 'C-z', 'C-qu'],
    description: 'Digraph ck (back) and consonants j, r, v, w, x, y, z, qu',
  },

  // Phase 2: Building complexity
  {
    phase: 2,
    orderIndex: 1,
    name: 'Initial consonant blends',
    patterns: ['BL-bl', 'BL-cr', 'BL-st', 'BL-fl', 'BL-gr', 'BL-tr', 'BL-br', 'BL-cl', 'BL-dr', 'BL-fr', 'BL-gl', 'BL-pl', 'BL-pr', 'BL-sk', 'BL-sl', 'BL-sm', 'BL-sn', 'BL-sp', 'BL-sw'],
    description: 'Initial blends: bl, cr, st, fl, gr, tr, br, cl, dr, fr, gl, pl, pr, sk, sl, sm, sn, sp, sw',
  },
  {
    phase: 2,
    orderIndex: 2,
    name: 'Final consonant blends',
    patterns: ['BL-mp', 'BL-nk', 'BL-nd', 'BL-nt', 'BL-ft', 'BL-lt', 'BL-lp', 'BL-lk', 'BL-sk-f', 'BL-st-f'],
    description: 'Final blends: -mp, -nk, -nd, -nt, -ft, -lt, -lp, -lk, -sk, -st',
  },
  {
    phase: 2,
    orderIndex: 3,
    name: 'FLOSS rule',
    patterns: ['FLOSS-ff', 'FLOSS-ll', 'FLOSS-ss'],
    description: 'Double final consonants after short vowels: ff (puff), ll (bell), ss (miss)',
  },
  {
    phase: 2,
    orderIndex: 4,
    name: 'Silent-e / VCe long vowels',
    patterns: ['VCe-a', 'VCe-i', 'VCe-o', 'VCe-u', 'VCe-e'],
    description: 'Magic e pattern: bake, ride, bone, cute, theme',
  },
  {
    phase: 2,
    orderIndex: 5,
    name: 'Open syllables',
    patterns: ['OPEN-a', 'OPEN-e', 'OPEN-i', 'OPEN-o', 'OPEN-u'],
    description: 'Open syllables ending in vowel: he, my, no, go, be',
  },

  // Phase 3: Intermediate patterns
  {
    phase: 3,
    orderIndex: 1,
    name: 'Vowel teams ai/ay, ee/ea',
    patterns: ['VT-ai', 'VT-ay', 'VT-ee', 'VT-ea'],
    description: 'Vowel teams: ai (rain), ay (day), ee (tree), ea (read)',
  },
  {
    phase: 3,
    orderIndex: 2,
    name: 'Vowel teams oa/oe, oo, ou/ow',
    patterns: ['VT-oa', 'VT-oe', 'VT-oo', 'VT-ou', 'VT-ow'],
    description: 'Vowel teams: oa (boat), oe (toe), oo (moon/book), ou (out), ow (cow/snow)',
  },
  {
    phase: 3,
    orderIndex: 3,
    name: 'R-controlled vowels',
    patterns: ['RC-ar', 'RC-or', 'RC-er', 'RC-ir', 'RC-ur'],
    description: 'R-controlled: ar (car), or (for), er (her), ir (bird), ur (burn)',
  },
  {
    phase: 3,
    orderIndex: 4,
    name: 'Diphthongs oi/oy, ou/ow',
    patterns: ['DI-oi', 'DI-oy', 'DI-ou', 'DI-ow'],
    description: 'Diphthongs: oi (coin), oy (boy), ou (loud), ow (cow)',
  },
  {
    phase: 3,
    orderIndex: 5,
    name: 'Silent letters',
    patterns: ['SL-kn', 'SL-wr', 'SL-mb', 'SL-igh'],
    description: 'Silent letters: kn (knot), wr (write), mb (lamb), igh (night)',
  },

  // Phase 4: Advanced decoding
  {
    phase: 4,
    orderIndex: 1,
    name: 'Hard and soft c and g',
    patterns: ['HS-c-hard', 'HS-c-soft', 'HS-g-hard', 'HS-g-soft'],
    description: 'Hard/soft: c as /k/ (cat) vs /s/ (city), g as /g/ (go) vs /j/ (gem)',
  },
  {
    phase: 4,
    orderIndex: 2,
    name: 'Syllable division',
    patterns: ['SYL-VCCV', 'SYL-VCV', 'SYL-VCCCV', 'SYL-VV'],
    description: 'Syllable division rules: VCCV (rabbit), VCV (tiger), VCCCV (pumpkin)',
  },
  {
    phase: 4,
    orderIndex: 3,
    name: 'Common prefixes and suffixes',
    patterns: ['AFF-ed', 'AFF-ing', 'AFF-re', 'AFF-un', 'AFF-tion', 'AFF-ly', 'AFF-ful', 'AFF-less'],
    description: 'Affixes: -ed, -ing, re-, un-, -tion, -ly, -ful, -less',
  },
  {
    phase: 4,
    orderIndex: 4,
    name: 'Latin and Greek roots',
    patterns: ['ROOT-latin', 'ROOT-greek'],
    description: 'Common Latin/Greek roots and their meanings',
  },
];

// Common sight words by phase (high-frequency words that don't follow phonics rules)
export const SIGHT_WORDS_BY_PHASE: Record<PhonicsPhase, string[]> = {
  1: ['the', 'a', 'is', 'was', 'to', 'and', 'he', 'she', 'said', 'my', 'of', 'I', 'you', 'are', 'they', 'we', 'do', 'no', 'go', 'so'],
  2: ['have', 'were', 'what', 'when', 'your', 'there', 'their', 'would', 'could', 'should', 'come', 'some', 'one', 'two', 'who', 'been', 'from', 'many', 'any', 'again'],
  3: ['through', 'thought', 'because', 'enough', 'though', 'people', 'where', 'friend', 'know', 'world', 'great', 'heart', 'different', 'move', 'water', 'every', 'other', 'laugh', 'answer', 'learn'],
  4: ['knowledge', 'science', 'special', 'certain', 'beautiful', 'imagine', 'important', 'language', 'measure', 'machine', 'believe', 'receive', 'separate', 'rhythm', 'necessary'],
};
```

- [ ] **Step 2: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add packages/blog/server/utils/reading/phonics-seed.ts
git commit -m "feat: add phonics scope & sequence seed data (Phase 1-4)"
```

### Task 1.5: Create seed script and API route

**Files:**
- Create: `packages/blog/server/api/reading/seed.post.ts`

- [ ] **Step 1: Write seed endpoint**

Create `packages/blog/server/api/reading/seed.post.ts`:

```ts
import { PHONICS_SEED } from '../../utils/reading/phonics-seed';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const db = useDrizzle();

  // Check if already seeded
  const existing = await db.query.phonicsUnits.findFirst();
  if (existing) {
    return { message: 'Already seeded', count: 0 };
  }

  const inserted = await db.insert(tables.phonicsUnits).values(PHONICS_SEED).returning();

  return { message: 'Seeded phonics units', count: inserted.length };
});
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/server/api/reading/seed.post.ts
git commit -m "feat: add phonics seed endpoint"
```

### Task 1.6: Add reading test helpers

**Files:**
- Modify: `packages/blog/server/test-utils/db-helper.ts`

- [ ] **Step 1: Add reading test helpers**

Add to the end of `packages/blog/server/test-utils/db-helper.ts`:

```ts
export async function createTestChild(
  userId: string,
  overrides?: Partial<typeof tables.childProfiles.$inferInsert>,
) {
  const db = useDrizzle();
  const [child] = await db
    .insert(tables.childProfiles)
    .values({
      userId,
      name: 'Test Child',
      birthYear: 2018,
      currentPhase: 1,
      interests: ['dinosaurs'],
      ...overrides,
    })
    .returning();
  return child!;
}

export async function createTestStory(
  overrides?: Partial<typeof tables.stories.$inferInsert>,
) {
  const db = useDrizzle();
  const [story] = await db
    .insert(tables.stories)
    .values({
      title: 'Test Story',
      content: {
        pages: [
          {
            words: [
              { text: 'The', decodable: false, pattern: null, sightWord: true },
              { text: 'cat', decodable: true, pattern: 'CVC-short-a', sightWord: false },
              { text: 'sat', decodable: true, pattern: 'CVC-short-a', sightWord: false },
            ],
          },
        ],
      },
      theme: 'animals',
      targetPatterns: ['CVC-short-a'],
      targetWords: ['cat', 'sat'],
      decodabilityScore: 0.67,
      fleschKincaid: 1.0,
      aiGenerated: false,
      ...overrides,
    })
    .returning();
  return story!;
}

export async function createTestSrsCard(
  childId: number,
  overrides?: Partial<typeof tables.srsCards.$inferInsert>,
) {
  const db = useDrizzle();
  const [card] = await db
    .insert(tables.srsCards)
    .values({
      childId,
      cardType: 'phoneme',
      front: 'What sound does "sh" make?',
      back: '/ʃ/ as in "ship"',
      ...overrides,
    })
    .returning();
  return card!;
}
```

- [ ] **Step 2: Update cleanupDatabase to include reading tables**

Add reading table deletions BEFORE the existing user deletion (due to FK constraints). Insert after `await db.delete(tables.documents);`:

```ts
// Reading tables (order matters for FK constraints)
await db.delete(tables.readingSessions);
await db.delete(tables.srsCards);
await db.delete(tables.childPhonicsProgress);
await db.delete(tables.stories);
await db.delete(tables.childProfiles);
await db.delete(tables.phonicsUnits);
```

- [ ] **Step 3: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 4: Commit**

```bash
git add packages/blog/server/test-utils/db-helper.ts
git commit -m "feat: add reading app test helpers and cleanup"
```

---

## Chunk 2: reading-ui

Depends on Chunk 1 (needs types from `shared/reading-types.ts`). This chunk builds pages, components, and composables for the reading experience.

### Task 2.1: useTTS composable

**Files:**
- Create: `packages/blog/app/composables/useTTS.ts`
- Create: `packages/blog/app/composables/useTTS.test.ts`

- [ ] **Step 1: Write useTTS test**

Create `packages/blog/app/composables/useTTS.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTTS } from './useTTS';

// Mock Web Speech API
const mockUtterance = {
  rate: 1,
  pitch: 1,
  volume: 1,
  text: '',
  onboundary: null as ((e: SpeechSynthesisEvent) => void) | null,
  onend: null as (() => void) | null,
};

vi.stubGlobal('SpeechSynthesisUtterance', vi.fn(() => mockUtterance));
vi.stubGlobal('speechSynthesis', {
  speak: vi.fn(),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  speaking: false,
  paused: false,
});

describe('useTTS', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates utterance with child-friendly rate', () => {
    const { speak } = useTTS();
    speak('hello world');
    expect(mockUtterance.rate).toBe(0.8);
  });

  it('exposes speaking state', () => {
    const { isSpeaking } = useTTS();
    expect(isSpeaking.value).toBe(false);
  });

  it('tracks current word index via onboundary', () => {
    const { speak, currentWordIndex } = useTTS();
    speak('the cat sat');
    expect(currentWordIndex.value).toBe(-1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd packages/blog && pnpm vitest run app/composables/useTTS.test.ts
```

- [ ] **Step 3: Write useTTS composable**

Create `packages/blog/app/composables/useTTS.ts`:

```ts
export function useTTS() {
  const isSpeaking = ref(false);
  const isPaused = ref(false);
  const currentWordIndex = ref(-1);
  const rate = ref(0.8);

  let currentUtterance: SpeechSynthesisUtterance | null = null;

  function speak(text: string) {
    stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate.value;
    utterance.pitch = 1;
    utterance.volume = 1;
    currentUtterance = utterance;

    utterance.onboundary = (event: SpeechSynthesisEvent) => {
      if (event.name === 'word') {
        // Calculate word index from char offset
        const textBefore = text.slice(0, event.charIndex);
        currentWordIndex.value = textBefore.split(/\s+/).filter(Boolean).length;
      }
    };

    utterance.onend = () => {
      isSpeaking.value = false;
      isPaused.value = false;
      currentWordIndex.value = -1;
    };

    speechSynthesis.speak(utterance);
    isSpeaking.value = true;
  }

  function speakWord(word: string) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.6; // Slower for individual words
    speechSynthesis.speak(utterance);
  }

  function pause() {
    speechSynthesis.pause();
    isPaused.value = true;
  }

  function resume() {
    speechSynthesis.resume();
    isPaused.value = false;
  }

  function stop() {
    speechSynthesis.cancel();
    isSpeaking.value = false;
    isPaused.value = false;
    currentWordIndex.value = -1;
    currentUtterance = null;
  }

  function setRate(newRate: number) {
    rate.value = Math.max(0.5, Math.min(1.2, newRate));
  }

  return {
    isSpeaking: readonly(isSpeaking),
    isPaused: readonly(isPaused),
    currentWordIndex: readonly(currentWordIndex),
    rate: readonly(rate),
    speak,
    speakWord,
    pause,
    resume,
    stop,
    setRate,
  };
}
```

- [ ] **Step 4: Run tests**

```bash
cd packages/blog && pnpm vitest run app/composables/useTTS.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add packages/blog/app/composables/useTTS.ts packages/blog/app/composables/useTTS.test.ts
git commit -m "feat: add useTTS composable with Web Speech API"
```

### Task 2.2: useActiveChild composable

**Files:**
- Create: `packages/blog/app/composables/useActiveChild.ts`

- [ ] **Step 1: Write useActiveChild**

```ts
export function useActiveChild() {
  const activeChildId = useState<number | null>('activeChildId', () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('reading:activeChildId');
      return stored ? parseInt(stored, 10) : null;
    }
    return null;
  });

  function setActiveChild(childId: number) {
    activeChildId.value = childId;
    if (import.meta.client) {
      localStorage.setItem('reading:activeChildId', String(childId));
    }
  }

  function clearActiveChild() {
    activeChildId.value = null;
    if (import.meta.client) {
      localStorage.removeItem('reading:activeChildId');
    }
  }

  return {
    activeChildId: readonly(activeChildId),
    setActiveChild,
    clearActiveChild,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/app/composables/useActiveChild.ts
git commit -m "feat: add useActiveChild composable for multi-child support"
```

### Task 2.3: WordHighlighter component

**Files:**
- Create: `packages/blog/app/components/reading/WordHighlighter.vue`

- [ ] **Step 1: Write WordHighlighter**

```vue
<script setup lang="ts">
import type { StoryWord } from '~~/shared/reading-types';

const props = defineProps<{
  words: StoryWord[];
  currentWordIndex: number;
}>();

const emit = defineEmits<{
  wordClick: [word: StoryWord, index: number];
}>();
</script>

<template>
  <p class="leading-relaxed text-2xl md:text-3xl">
    <span
      v-for="(word, i) in words"
      :key="i"
      class="cursor-pointer rounded-md px-1 py-0.5 transition-all duration-150 inline-block"
      :class="{
        'bg-yellow-300 dark:bg-yellow-500/40 scale-110': i === currentWordIndex,
        'text-purple-600 dark:text-purple-400 font-bold': word.sightWord,
      }"
      @click="emit('wordClick', word, i)"
    >
      {{ word.text }}
    </span>
  </p>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/app/components/reading/WordHighlighter.vue
git commit -m "feat: add WordHighlighter component with TTS sync"
```

### Task 2.4: StoryReader component

**Files:**
- Create: `packages/blog/app/components/reading/StoryReader.vue`

- [ ] **Step 1: Write StoryReader**

```vue
<script setup lang="ts">
import type { StoryContent, StoryWord } from '~~/shared/reading-types';

const props = defineProps<{
  title: string;
  content: StoryContent;
}>();

const { speak, speakWord, stop, pause, resume, isSpeaking, isPaused, currentWordIndex, rate, setRate } = useTTS();

const currentPage = ref(0);
const totalPages = computed(() => props.content.pages.length);
const currentWords = computed(() => props.content.pages[currentPage.value]?.words ?? []);

function playCurrentPage() {
  const text = currentWords.value.map((w) => w.text).join(' ');
  speak(text);
}

function handleWordClick(word: StoryWord) {
  speakWord(word.text);
}

function nextPage() {
  stop();
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
}

function prevPage() {
  stop();
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-center py-4">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
      <p class="text-sm text-gray-500">Page {{ currentPage + 1 }} of {{ totalPages }}</p>
    </div>

    <div class="flex-1 flex items-center justify-center px-8">
      <ReadingWordHighlighter
        :words="currentWords"
        :current-word-index="currentWordIndex"
        @word-click="handleWordClick"
      />
    </div>

    <div class="flex items-center justify-center gap-4 py-6">
      <UButton icon="i-heroicons-backward" variant="ghost" :disabled="currentPage === 0" @click="prevPage" />

      <UButton
        v-if="!isSpeaking"
        icon="i-heroicons-play"
        size="xl"
        @click="playCurrentPage"
      />
      <UButton
        v-else-if="isPaused"
        icon="i-heroicons-play"
        size="xl"
        @click="resume"
      />
      <UButton
        v-else
        icon="i-heroicons-pause"
        size="xl"
        @click="pause"
      />

      <UButton icon="i-heroicons-stop" variant="ghost" :disabled="!isSpeaking" @click="stop" />

      <UButton icon="i-heroicons-forward" variant="ghost" :disabled="currentPage >= totalPages - 1" @click="nextPage" />
    </div>

    <div class="flex items-center justify-center gap-2 pb-4">
      <span class="text-xs text-gray-500">Speed</span>
      <input type="range" min="0.5" max="1.2" step="0.1" :value="rate" class="w-32" @input="setRate(parseFloat(($event.target as HTMLInputElement).value))" />
      <span class="text-xs text-gray-500 w-8">{{ rate }}x</span>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/app/components/reading/StoryReader.vue
git commit -m "feat: add StoryReader component with TTS controls"
```

### Task 2.5: Reading pages

**Files:**
- Create: `packages/blog/app/pages/reading/index.vue`
- Create: `packages/blog/app/pages/reading/stories/[id].vue`
- Create: `packages/blog/app/pages/reading/dashboard.vue`
- Create: `packages/blog/app/pages/reading/child/[id].vue`
- Create: `packages/blog/app/pages/reading/practice.vue`
- Create: `packages/blog/app/pages/reading/onboarding.vue`

- [ ] **Step 1: Landing page (public)**

Create `packages/blog/app/pages/reading/index.vue`:

```vue
<script setup lang="ts">
definePageMeta({ layout: 'default' });
</script>

<template>
  <UPageHeader
    title="AI-Powered Reading Practice"
    description="Personalized decodable stories matched to your child's phonics level and interests."
  />
  <UPageBody>
    <div class="max-w-2xl mx-auto text-center space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UCard>
          <template #header><h3 class="font-semibold">Personalized Stories</h3></template>
          AI generates stories using only words your child can decode.
        </UCard>
        <UCard>
          <template #header><h3 class="font-semibold">Spaced Repetition</h3></template>
          Science-backed flashcards for phonics patterns and sight words.
        </UCard>
        <UCard>
          <template #header><h3 class="font-semibold">Read Along</h3></template>
          Word-by-word highlighting with text-to-speech at child-friendly pace.
        </UCard>
      </div>
      <UButton to="/reading/onboarding" size="xl">Get Started</UButton>
    </div>
  </UPageBody>
</template>
```

- [ ] **Step 2: Story reader page**

Create `packages/blog/app/pages/reading/stories/[id].vue`:

```vue
<script setup lang="ts">
definePageMeta({ layout: false });

const route = useRoute();
const { data: story } = await useFetch(`/api/reading/stories/${route.params.id}`);
</script>

<template>
  <div class="h-screen bg-white dark:bg-gray-950">
    <div class="absolute top-4 left-4 z-10">
      <UButton to="/reading/dashboard" icon="i-heroicons-arrow-left" variant="ghost" />
    </div>
    <ReadingStoryReader
      v-if="story"
      :title="story.title"
      :content="story.content"
    />
    <div v-else class="flex items-center justify-center h-full">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl" />
    </div>
  </div>
</template>
```

- [ ] **Step 3: Scaffold remaining pages**

Create minimal placeholder pages for `dashboard.vue`, `child/[id].vue`, `practice.vue`, and `onboarding.vue`. Each should:
- Use `definePageMeta({ middleware: 'auth' })` (except landing)
- Have a basic UPageHeader with the page name
- Show placeholder content to be filled in by later tasks

- [ ] **Step 4: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 5: Commit**

```bash
git add packages/blog/app/pages/reading/
git commit -m "feat: add reading app pages (landing, reader, dashboard, practice, onboarding)"
```

### Task 2.6: CardReview component

**Files:**
- Create: `packages/blog/app/components/reading/CardReview.vue`

Depends on srs-engine task (useSRS composable). Build the UI component standalone — wire to useSRS later.

- [ ] **Step 1: Write CardReview**

```vue
<script setup lang="ts">
const props = defineProps<{
  front: string;
  back: string;
  cardType: string;
}>();

const emit = defineEmits<{
  rate: [rating: 1 | 3 | 4];
}>();

const revealed = ref(false);
</script>

<template>
  <UCard class="max-w-md mx-auto text-center">
    <div class="min-h-40 flex items-center justify-center">
      <p class="text-3xl font-bold">{{ front }}</p>
    </div>

    <template v-if="revealed">
      <UDivider />
      <div class="min-h-20 flex items-center justify-center py-4">
        <p class="text-xl">{{ back }}</p>
      </div>
      <div class="flex justify-center gap-4 pt-4">
        <UButton color="red" variant="soft" size="lg" @click="emit('rate', 1)">
          Again
        </UButton>
        <UButton color="yellow" variant="soft" size="lg" @click="emit('rate', 3)">
          Hard
        </UButton>
        <UButton color="green" variant="soft" size="lg" @click="emit('rate', 4)">
          Got It!
        </UButton>
      </div>
    </template>

    <template v-else>
      <div class="pt-4">
        <UButton size="xl" block @click="revealed = true">Show Answer</UButton>
      </div>
    </template>
  </UCard>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/app/components/reading/CardReview.vue
git commit -m "feat: add CardReview component with 3-button SRS rating"
```

---

## Chunk 3: ai-pipeline

Depends on Chunk 1 (schema + types). Builds the phonics validation engine and AI story generation.

### Task 3.1: Phonics validation engine

**Files:**
- Create: `packages/blog/server/utils/reading/phonics-validator.ts`
- Create: `packages/blog/server/utils/reading/phonics-validator.test.ts`

- [ ] **Step 1: Write phonics validator test**

Create `packages/blog/server/utils/reading/phonics-validator.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { validateWord, calculateDecodability } from './phonics-validator';

describe('phonics-validator', () => {
  const knownPatterns = ['CVC-short-a', 'CVC-short-i', 'DG-sh'];
  const sightWords = ['the', 'a', 'is'];

  describe('validateWord', () => {
    it('recognizes CVC short-a words', () => {
      const result = validateWord('cat', knownPatterns);
      expect(result.decodable).toBe(true);
      expect(result.pattern).toBe('CVC-short-a');
    });

    it('recognizes sight words', () => {
      const result = validateWord('the', knownPatterns, sightWords);
      expect(result.sightWord).toBe(true);
    });

    it('rejects words with unknown patterns', () => {
      const result = validateWord('tree', knownPatterns);
      expect(result.decodable).toBe(false);
    });
  });

  describe('calculateDecodability', () => {
    it('returns 1.0 for all decodable words', () => {
      const words = ['cat', 'sat', 'the'];
      const score = calculateDecodability(words, knownPatterns, sightWords);
      expect(score).toBe(1.0);
    });

    it('returns correct ratio with unknown words', () => {
      const words = ['cat', 'tree', 'the'];
      const score = calculateDecodability(words, knownPatterns, sightWords);
      expect(score).toBeCloseTo(0.67, 1);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd packages/blog && pnpm vitest run server/utils/reading/phonics-validator.test.ts
```

- [ ] **Step 3: Write phonics validator**

Create `packages/blog/server/utils/reading/phonics-validator.ts`:

```ts
import type { StoryWord } from '~~/shared/reading-types';

// Phonics rules: maps pattern names to regex matchers
// This is a simplified engine — real implementation will need more rules
const PATTERN_RULES: Record<string, RegExp> = {
  'CVC-short-a': /^[bcdfghjklmnpqrstvwxyz]a[bcdfghjklmnpqrstvwxyz]$/i,
  'CVC-short-i': /^[bcdfghjklmnpqrstvwxyz]i[bcdfghjklmnpqrstvwxyz]$/i,
  'CVC-short-o': /^[bcdfghjklmnpqrstvwxyz]o[bcdfghjklmnpqrstvwxyz]$/i,
  'CVC-short-u': /^[bcdfghjklmnpqrstvwxyz]u[bcdfghjklmnpqrstvwxyz]$/i,
  'CVC-short-e': /^[bcdfghjklmnpqrstvwxyz]e[bcdfghjklmnpqrstvwxyz]$/i,
  'DG-sh': /sh/i,
  'DG-th': /th/i,
  'DG-ch': /ch/i,
  'DG-ck': /ck$/i,
  'VCe-a': /^[bcdfghjklmnpqrstvwxyz]a[bcdfghjklmnpqrstvwxyz]e$/i,
  'VCe-i': /^[bcdfghjklmnpqrstvwxyz]i[bcdfghjklmnpqrstvwxyz]e$/i,
  'VCe-o': /^[bcdfghjklmnpqrstvwxyz]o[bcdfghjklmnpqrstvwxyz]e$/i,
  'VT-ee': /ee/i,
  'VT-ea': /ea/i,
  'VT-ai': /ai/i,
  'VT-ay': /ay/i,
  'VT-oa': /oa/i,
  'RC-ar': /ar/i,
  'RC-or': /or/i,
  'RC-er': /er/i,
  'RC-ir': /ir/i,
  'RC-ur': /ur/i,
};

export function validateWord(
  word: string,
  knownPatterns: string[],
  sightWords: string[] = [],
): StoryWord {
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');

  if (sightWords.includes(cleanWord)) {
    return { text: word, decodable: false, pattern: null, sightWord: true };
  }

  for (const pattern of knownPatterns) {
    const rule = PATTERN_RULES[pattern];
    if (rule && rule.test(cleanWord)) {
      return { text: word, decodable: true, pattern, sightWord: false };
    }
  }

  return { text: word, decodable: false, pattern: null, sightWord: false };
}

export function calculateDecodability(
  words: string[],
  knownPatterns: string[],
  sightWords: string[] = [],
): number {
  if (words.length === 0) return 1.0;

  const validated = words.map((w) => validateWord(w, knownPatterns, sightWords));
  const decodableCount = validated.filter((w) => w.decodable || w.sightWord).length;

  return decodableCount / words.length;
}

export function annotateWords(
  text: string,
  knownPatterns: string[],
  sightWords: string[] = [],
): StoryWord[] {
  return text.split(/\s+/).filter(Boolean).map((word) => validateWord(word, knownPatterns, sightWords));
}
```

- [ ] **Step 4: Run tests**

```bash
cd packages/blog && pnpm vitest run server/utils/reading/phonics-validator.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add packages/blog/server/utils/reading/phonics-validator.ts packages/blog/server/utils/reading/phonics-validator.test.ts
git commit -m "feat: add phonics validation engine with pattern matching"
```

### Task 3.2: Story generator

**Files:**
- Create: `packages/blog/server/utils/reading/story-generator.ts`

- [ ] **Step 1: Write story generator**

Create `packages/blog/server/utils/reading/story-generator.ts`:

```ts
import Anthropic from '@anthropic-ai/sdk';
import { annotateWords, calculateDecodability } from './phonics-validator';
import type { StoryContent } from '~~/shared/reading-types';

interface GenerateOptions {
  allowedPatterns: string[];
  sightWords: string[];
  targetWords: string[];
  theme: string;
  wordCount?: number;
}

interface GeneratedStory {
  title: string;
  content: StoryContent;
  rawText: string;
  decodabilityScore: number;
  fleschKincaid: number;
}

const MAX_RETRIES = 2;

export async function generateStory(options: GenerateOptions): Promise<GeneratedStory> {
  const {
    allowedPatterns,
    sightWords,
    targetWords,
    theme,
    wordCount = 75,
  } = options;

  const client = new Anthropic();

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      temperature: 0.3,
      system: `You are a decodable story writer for children ages 7-11. Follow these constraints EXACTLY:
ALLOWED PATTERNS: ${allowedPatterns.join(', ')}
SIGHT WORDS: ${sightWords.join(', ')}
TARGET NEW WORDS (use each 2+ times): ${targetWords.join(', ')}
INTEREST THEME: ${theme}
LENGTH: ${wordCount - 15}-${wordCount + 15} words, sentences 3-8 words each

Generate a story with a simple problem -> attempt -> resolution arc.
Use ONLY words that match the allowed patterns, sight words, or target words.
Output as JSON: { "title": "...", "text": "..." }`,
      messages: [
        { role: 'user', content: `Write a decodable story about ${theme}.` },
      ],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text in response');
    }

    // Parse JSON from response
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON in response');
    }

    const parsed = JSON.parse(jsonMatch[0]) as { title: string; text: string };
    const words = parsed.text.split(/\s+/).filter(Boolean);

    const decodabilityScore = calculateDecodability(words, allowedPatterns, sightWords);

    if (decodabilityScore >= 0.95 || attempt === MAX_RETRIES) {
      const annotatedWords = annotateWords(parsed.text, allowedPatterns, sightWords);

      // Split into pages (~20 words each)
      const wordsPerPage = 20;
      const pages = [];
      for (let i = 0; i < annotatedWords.length; i += wordsPerPage) {
        pages.push({ words: annotatedWords.slice(i, i + wordsPerPage) });
      }

      const content: StoryContent = { pages };
      const fk = calculateFleschKincaid(parsed.text);

      return {
        title: parsed.title,
        content,
        rawText: parsed.text,
        decodabilityScore,
        fleschKincaid: fk,
      };
    }
  }

  throw new Error('Failed to generate story with sufficient decodability');
}

function calculateFleschKincaid(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  return 0.39 * (words.length / sentences.length) + 11.8 * (syllables / words.length) - 15.59;
}

function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 3) return 1;
  const matches = clean.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  if (clean.endsWith('e') && !clean.endsWith('le')) count--;
  return Math.max(1, count);
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/server/utils/reading/story-generator.ts
git commit -m "feat: add AI story generator with Claude Haiku + decodability retry"
```

### Task 3.3: Story safety review

**Files:**
- Create: `packages/blog/server/utils/reading/story-safety.ts`

- [ ] **Step 1: Write safety reviewer**

Create `packages/blog/server/utils/reading/story-safety.ts`:

```ts
import Anthropic from '@anthropic-ai/sdk';

const BLOCKLIST = [
  'kill', 'murder', 'blood', 'death', 'dead', 'die', 'weapon', 'gun',
  'knife', 'drugs', 'alcohol', 'beer', 'wine', 'hate', 'stupid',
  'dumb', 'ugly', 'fat', 'scary', 'horror', 'ghost', 'monster',
  'devil', 'demon', 'hell', 'damn',
];

interface SafetyResult {
  safe: boolean;
  reason?: string;
}

export async function reviewStorySafety(storyText: string): Promise<SafetyResult> {
  // Stage 1: Blocklist scan
  const lowerText = storyText.toLowerCase();
  for (const word of BLOCKLIST) {
    if (lowerText.includes(word)) {
      return { safe: false, reason: `Contains blocked word: "${word}"` };
    }
  }

  // Stage 2: AI review
  const client = new Anthropic();
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    temperature: 0,
    system: `You are a children's content safety reviewer. Classify the following story as SAFE or UNSAFE for children ages 7-11. Check for: violence, scary themes, stereotypes, age-inappropriate content, bullying.
Reply with JSON: { "safe": true/false, "reason": "..." }`,
    messages: [
      { role: 'user', content: storyText },
    ],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    return { safe: false, reason: 'Safety review failed - no response' };
  }

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { safe: false, reason: 'Safety review failed - invalid response' };
  }

  return JSON.parse(jsonMatch[0]) as SafetyResult;
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/server/utils/reading/story-safety.ts
git commit -m "feat: add story safety reviewer (blocklist + AI classification)"
```

### Task 3.4: Story generation API endpoint

**Files:**
- Create: `packages/blog/server/api/reading/stories/generate.post.ts`
- Create: `packages/blog/server/api/reading/stories/[id].get.ts`
- Create: `packages/blog/server/api/reading/stories/index.get.ts`

- [ ] **Step 1: Write generate endpoint**

Create `packages/blog/server/api/reading/stories/generate.post.ts`:

```ts
import { z } from 'zod';
import { generateStory } from '../../../utils/reading/story-generator';
import { reviewStorySafety } from '../../../utils/reading/story-safety';
import { SIGHT_WORDS_BY_PHASE } from '../../../utils/reading/phonics-seed';
import type { PhonicsPhase } from '~~/shared/reading-types';

const bodySchema = z.object({
  childId: z.number(),
  theme: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  // Verify parent owns child
  const child = await db.query.childProfiles.findFirst({
    where: (c, { eq, and: a }) => a(eq(c.id, body.childId), eq(c.userId, session.user!.id)),
  });
  if (!child) {
    throw createError({ statusCode: 404, message: 'Child not found' });
  }

  // Rate limit: 5 stories/child/day
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStories = await db.query.stories.findMany({
    where: (s, { eq, and: a, gte }) =>
      a(eq(s.childId, body.childId), eq(s.aiGenerated, true), gte(s.createdAt, today)),
  });
  if (todayStories.length >= 5) {
    throw createError({ statusCode: 429, message: 'Daily story limit reached (5/day)' });
  }

  // Get child's mastered patterns
  const progress = await db.query.childPhonicsProgress.findMany({
    where: (p, { eq, and: a, or: o }) =>
      a(eq(p.childId, body.childId), o(eq(p.status, 'mastered'), eq(p.status, 'active'))),
    with: { phonicsUnit: true },
  });

  const allowedPatterns = progress.flatMap((p) => p.phonicsUnit.patterns);
  const phase = (child.currentPhase || 1) as PhonicsPhase;
  const sightWords = SIGHT_WORDS_BY_PHASE[phase] || SIGHT_WORDS_BY_PHASE[1];
  const theme = body.theme || child.interests[0] || 'animals';

  // Generate story
  const generated = await generateStory({
    allowedPatterns,
    sightWords,
    targetWords: [], // TODO: pick from next phonics unit
    theme,
  });

  // Safety review
  const safety = await reviewStorySafety(generated.rawText);
  if (!safety.safe) {
    throw createError({ statusCode: 422, message: `Story failed safety review: ${safety.reason}` });
  }

  // Save to DB
  const [story] = await db
    .insert(tables.stories)
    .values({
      childId: body.childId,
      title: generated.title,
      content: generated.content,
      theme,
      targetPatterns: allowedPatterns,
      targetWords: [],
      decodabilityScore: generated.decodabilityScore,
      fleschKincaid: generated.fleschKincaid,
      aiGenerated: true,
    })
    .returning();

  return story;
});
```

- [ ] **Step 2: Write story GET endpoints**

Create `packages/blog/server/api/reading/stories/[id].get.ts`:

```ts
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.coerce.number() }).parse);
  const db = useDrizzle();

  const story = await db.query.stories.findFirst({
    where: (s, { eq }) => eq(s.id, id),
  });

  if (!story) {
    throw createError({ statusCode: 404, message: 'Story not found' });
  }

  return story;
});
```

Create `packages/blog/server/api/reading/stories/index.get.ts`:

```ts
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { childId } = await getValidatedQuery(event, z.object({ childId: z.coerce.number() }).parse);
  const db = useDrizzle();

  const stories = await db.query.stories.findMany({
    where: (s, { eq }) => eq(s.childId, childId),
    orderBy: (s, { desc }) => [desc(s.createdAt)],
  });

  return stories;
});
```

- [ ] **Step 3: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 4: Commit**

```bash
git add packages/blog/server/api/reading/stories/
git commit -m "feat: add story generation + CRUD API endpoints"
```

---

## Chunk 4: srs-engine

Depends on Chunk 1 (schema + types). Builds SRS scheduling, child management, and phonics progress.

### Task 4.1: Child profile API routes

**Files:**
- Create: `packages/blog/server/api/reading/children/index.post.ts`
- Create: `packages/blog/server/api/reading/children/index.get.ts`
- Create: `packages/blog/server/api/reading/children/[id].get.ts`
- Create: `packages/blog/server/api/reading/children/[id].put.ts`

- [ ] **Step 1: Write child CRUD endpoints**

Create `packages/blog/server/api/reading/children/index.post.ts`:

```ts
import { z } from 'zod';

const bodySchema = z.object({
  name: z.string().min(1).max(100),
  birthYear: z.number().int().min(2010).max(2025),
  interests: z.array(z.string()).default([]),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const [child] = await db
    .insert(tables.childProfiles)
    .values({
      userId: session.user.id,
      name: body.name,
      birthYear: body.birthYear,
      interests: body.interests,
    })
    .returning();

  return child;
});
```

Create `packages/blog/server/api/reading/children/index.get.ts`:

```ts
export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const db = useDrizzle();
  const children = await db.query.childProfiles.findMany({
    where: (c, { eq }) => eq(c.userId, session.user!.id),
  });

  return children;
});
```

Create `packages/blog/server/api/reading/children/[id].get.ts`:

```ts
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.coerce.number() }).parse);
  const db = useDrizzle();

  const child = await db.query.childProfiles.findFirst({
    where: (c, { eq, and: a }) => a(eq(c.id, id), eq(c.userId, session.user!.id)),
  });

  if (!child) {
    throw createError({ statusCode: 404, message: 'Child not found' });
  }

  return child;
});
```

Create `packages/blog/server/api/reading/children/[id].put.ts`:

```ts
import { z } from 'zod';

const bodySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  interests: z.array(z.string()).optional(),
  currentPhase: z.number().int().min(1).max(4).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.coerce.number() }).parse);
  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  // Verify ownership
  const existing = await db.query.childProfiles.findFirst({
    where: (c, { eq, and: a }) => a(eq(c.id, id), eq(c.userId, session.user!.id)),
  });
  if (!existing) {
    throw createError({ statusCode: 404, message: 'Child not found' });
  }

  const [updated] = await db
    .update(tables.childProfiles)
    .set(body)
    .where(eq(tables.childProfiles.id, id))
    .returning();

  return updated;
});
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/server/api/reading/children/
git commit -m "feat: add child profile CRUD API routes"
```

### Task 4.2: SRS API routes

**Files:**
- Create: `packages/blog/server/api/reading/srs/due.get.ts`
- Create: `packages/blog/server/api/reading/srs/review.post.ts`
- Create: `packages/blog/server/api/reading/srs/stats.get.ts`

- [ ] **Step 1: Write SRS due cards endpoint**

Create `packages/blog/server/api/reading/srs/due.get.ts`:

```ts
import { z } from 'zod';
import { lte } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { childId } = await getValidatedQuery(event, z.object({ childId: z.coerce.number() }).parse);
  const db = useDrizzle();

  const cards = await db.query.srsCards.findMany({
    where: (c, { eq, and: a }) =>
      a(eq(c.childId, childId), lte(c.due, new Date())),
    orderBy: (c, { asc }) => [asc(c.due)],
    limit: 20,
  });

  return cards;
});
```

- [ ] **Step 2: Write SRS review endpoint**

Create `packages/blog/server/api/reading/srs/review.post.ts`:

```ts
import { z } from 'zod';
import { FSRS, Rating, createEmptyCard, type Card } from 'ts-fsrs';

const bodySchema = z.object({
  cardId: z.number(),
  rating: z.union([z.literal(1), z.literal(3), z.literal(4)]),
});

const fsrs = new FSRS({
  request_retention: 0.85,
  maximum_interval: 180,
});

const RATING_MAP: Record<1 | 3 | 4, Rating> = {
  1: Rating.Again,
  3: Rating.Hard,
  4: Rating.Good,
};

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const card = await db.query.srsCards.findFirst({
    where: (c, { eq }) => eq(c.id, body.cardId),
  });
  if (!card) {
    throw createError({ statusCode: 404, message: 'Card not found' });
  }

  // Build FSRS card from DB fields
  const fsrsCard: Card = {
    due: card.due,
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    last_review: card.lastReview ?? undefined,
  };

  const rating = RATING_MAP[body.rating];
  const scheduling = fsrs.repeat(fsrsCard, new Date());
  const next = scheduling[rating].card;

  // Update card in DB
  const [updated] = await db
    .update(tables.srsCards)
    .set({
      state: next.state,
      difficulty: next.difficulty,
      stability: next.stability,
      due: next.due,
      lastReview: next.last_review ?? new Date(),
      reps: next.reps,
      lapses: next.lapses,
    })
    .where(eq(tables.srsCards.id, body.cardId))
    .returning();

  return updated;
});
```

- [ ] **Step 3: Write SRS stats endpoint**

Create `packages/blog/server/api/reading/srs/stats.get.ts`:

```ts
import { z } from 'zod';
import { lte, count } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { childId } = await getValidatedQuery(event, z.object({ childId: z.coerce.number() }).parse);
  const db = useDrizzle();

  const allCards = await db.query.srsCards.findMany({
    where: (c, { eq }) => eq(c.childId, childId),
  });

  const now = new Date();
  const due = allCards.filter((c) => new Date(c.due) <= now).length;
  const newCards = allCards.filter((c) => c.reps === 0).length;
  // Mastered = 3+ consecutive good ratings approximated by high stability
  const mastered = allCards.filter((c) => c.stability > 10 && c.reps >= 3).length;

  return {
    due,
    newCards,
    mastered,
    total: allCards.length,
  };
});
```

- [ ] **Step 4: Commit**

```bash
git add packages/blog/server/api/reading/srs/
git commit -m "feat: add SRS API routes (due cards, review, stats)"
```

### Task 4.3: useSRS composable

**Files:**
- Create: `packages/blog/app/composables/useSRS.ts`

- [ ] **Step 1: Write useSRS composable**

```ts
import type { SrsReviewRequest } from '~~/shared/reading-types';

export function useSRS(childId: Ref<number | null>) {
  const dueCards = ref<any[]>([]);
  const currentIndex = ref(0);
  const isLoading = ref(false);

  const currentCard = computed(() => dueCards.value[currentIndex.value] ?? null);
  const remaining = computed(() => Math.max(0, dueCards.value.length - currentIndex.value));

  async function fetchDueCards() {
    if (!childId.value) return;
    isLoading.value = true;
    try {
      const cards = await $fetch('/api/reading/srs/due', {
        params: { childId: childId.value },
      });
      dueCards.value = cards;
      currentIndex.value = 0;
    } finally {
      isLoading.value = false;
    }
  }

  async function submitReview(rating: 1 | 3 | 4) {
    if (!currentCard.value) return;

    await $fetch('/api/reading/srs/review', {
      method: 'POST',
      body: {
        cardId: currentCard.value.id,
        rating,
      } satisfies SrsReviewRequest,
    });

    currentIndex.value++;

    // If no more cards, refresh
    if (currentIndex.value >= dueCards.value.length) {
      await fetchDueCards();
    }
  }

  watch(childId, () => {
    if (childId.value) fetchDueCards();
  }, { immediate: true });

  return {
    dueCards: readonly(dueCards),
    currentCard,
    remaining,
    isLoading: readonly(isLoading),
    fetchDueCards,
    submitReview,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/app/composables/useSRS.ts
git commit -m "feat: add useSRS composable for SRS card review sessions"
```

### Task 4.4: usePhonics composable

**Files:**
- Create: `packages/blog/app/composables/usePhonics.ts`

- [ ] **Step 1: Write usePhonics composable**

```ts
export function usePhonics(childId: Ref<number | null>) {
  const progress = ref<any[]>([]);
  const isLoading = ref(false);

  const masteredUnits = computed(() => progress.value.filter((p) => p.status === 'mastered'));
  const activeUnits = computed(() => progress.value.filter((p) => p.status === 'active'));
  const lockedUnits = computed(() => progress.value.filter((p) => p.status === 'locked'));

  async function fetchProgress() {
    if (!childId.value) return;
    isLoading.value = true;
    try {
      const child = await $fetch(`/api/reading/children/${childId.value}`);
      // TODO: fetch phonics progress from dedicated endpoint
      // For now, return empty until phonics progress API is built
    } finally {
      isLoading.value = false;
    }
  }

  watch(childId, () => {
    if (childId.value) fetchProgress();
  }, { immediate: true });

  return {
    progress: readonly(progress),
    masteredUnits,
    activeUnits,
    lockedUnits,
    isLoading: readonly(isLoading),
    fetchProgress,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/app/composables/usePhonics.ts
git commit -m "feat: add usePhonics composable for tracking phonics progress"
```

### Task 4.5: Reading session API routes

**Files:**
- Create: `packages/blog/server/api/reading/sessions/index.post.ts`
- Create: `packages/blog/server/api/reading/sessions/index.get.ts`

- [ ] **Step 1: Write session endpoints**

Create `packages/blog/server/api/reading/sessions/index.post.ts`:

```ts
import { z } from 'zod';

const bodySchema = z.object({
  childId: z.number(),
  storyId: z.number(),
  mode: z.enum(['listen', 'guided', 'independent']),
  wcpm: z.number().optional(),
  accuracy: z.number().min(0).max(1).optional(),
  duration: z.number().int(),
  miscues: z.array(z.any()).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const [readingSession] = await db
    .insert(tables.readingSessions)
    .values({
      childId: body.childId,
      storyId: body.storyId,
      mode: body.mode,
      wcpm: body.wcpm,
      accuracy: body.accuracy,
      duration: body.duration,
      miscues: body.miscues,
    })
    .returning();

  return readingSession;
});
```

Create `packages/blog/server/api/reading/sessions/index.get.ts`:

```ts
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { childId } = await getValidatedQuery(event, z.object({ childId: z.coerce.number() }).parse);
  const db = useDrizzle();

  const sessions = await db.query.readingSessions.findMany({
    where: (s, { eq }) => eq(s.childId, childId),
    orderBy: (s, { desc }) => [desc(s.completedAt)],
    limit: 50,
  });

  return sessions;
});
```

- [ ] **Step 2: Commit**

```bash
git add packages/blog/server/api/reading/sessions/
git commit -m "feat: add reading session recording API routes"
```

---

## Chunk 5: Integration & Verification

After all 4 workstreams complete, the lead runs verification.

### Task 5.1: Typecheck and lint

- [ ] **Step 1: Run typecheck**

```bash
pnpm typecheck
```

Fix any type errors across all new files.

- [ ] **Step 2: Run lint**

```bash
pnpm lint
```

Fix any lint errors.

- [ ] **Step 3: Run format**

```bash
pnpm format
```

- [ ] **Step 4: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve typecheck and lint errors across reading app"
```

### Task 5.2: Run tests

- [ ] **Step 1: Run unit tests**

```bash
pnpm test
```

- [ ] **Step 2: Run integration tests (if DB available)**

```bash
pnpm test:integration
```

- [ ] **Step 3: Fix any failures and commit**

### Task 5.3: Start dev server and verify

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Seed phonics data**

Call `POST /api/reading/seed` via the dev server.

- [ ] **Step 3: Take screenshots of key pages**

```bash
npx playwright screenshot http://localhost:$UI_PORT/reading /tmp/reading-landing.png
npx playwright screenshot http://localhost:$UI_PORT/reading/onboarding /tmp/reading-onboarding.png
```

- [ ] **Step 4: Verify reading page renders correctly**

Check screenshots for layout issues, broken components, missing styles.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: reading app MVP complete - stories, SRS, TTS, phonics engine"
```
