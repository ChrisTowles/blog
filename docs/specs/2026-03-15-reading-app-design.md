# Reading App Design Spec

AI-powered reading app for struggling readers (ages 7-11), built as a new area of the blog at `/reading`. Combines systematic synthetic phonics with AI-generated decodable stories personalized to each child's phonics level and interests.

**Target:** Public product. Two-week MVP includes AI story generation. COPPA compliance is a requirement but verifiable parental consent flow is post-MVP — MVP requires parent to acknowledge terms during onboarding.

## Decisions

- Lives inside existing blog package (like `/chat`)
- Existing PostgreSQL + Drizzle stack (not Supabase)
- Better Auth migration tracked separately (replaces nuxt-auth-utils). Build against `nuxt-auth-utils` for now.
- Feature-sliced agent team (4 teammates)
- `feature/reading-app` branch

## Project Structure

```
packages/blog/
  app/
    pages/reading/
      index.vue                 # Landing (public marketing + login CTA)
      dashboard.vue             # Parent dashboard
      child/[id].vue            # Child home (story list, practice)
      stories/[id].vue          # Story reader (full-screen)
      practice.vue              # SRS card review session
      onboarding.vue            # New child setup (name, interests, placement)
    components/reading/
      WordHighlighter.vue       # Per-word TTS highlighting + click-to-hear
      StoryReader.vue           # Full-screen reading layout
      CardReview.vue            # SRS 3-button review UI
      ProgressChart.vue         # Parent dashboard charts
      PhonicsMap.vue            # Visual scope & sequence progress
    composables/
      useTTS.ts                 # Web Speech API wrapper
      useSRS.ts                 # ts-fsrs scheduling
      usePhonics.ts             # Phonics state/progress
  server/
    api/reading/
      stories/
        generate.post.ts        # Generate AI story
        [id].get.ts             # Get story by ID
        index.get.ts            # List stories for child
      srs/
        due.get.ts              # Get due cards
        review.post.ts          # Submit review rating
        stats.get.ts            # Due/new/mastered counts
      children/
        index.post.ts           # Create child profile
        [id].get.ts             # Get child profile
        [id].put.ts             # Update child profile
        index.get.ts            # List children for parent
      sessions/
        index.post.ts           # Record reading session
        index.get.ts            # List sessions for child
        [id].get.ts             # Get session details
    database/
      schema/reading.ts         # All reading app tables
    utils/reading/
      phonics-validator.ts      # Word -> grapheme-phoneme decomposition
      story-generator.ts        # Claude Haiku constrained generation
      story-safety.ts           # Safety review (Claude + blocklist)
      phonics-seed.ts           # Phase 1-4 scope & sequence data
  shared/
    reading-types.ts            # Shared TypeScript types
```

## Database Schema

New file `server/database/schema/reading.ts` — migrating from single `schema.ts` to a `schema/` directory. Move existing schema to `schema/blog.ts` and create barrel `schema/index.ts`. Update `drizzle.config.ts` schema path to `./server/database/schema/`.

Same PostgreSQL database as the blog.

### child_profiles

| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| userId | varchar(36) FK -> users | Parent account (users.id is UUID varchar) |
| name | varchar(100) | |
| avatarUrl | text | nullable |
| birthYear | integer | |
| currentPhase | integer | 1-4, default 1 |
| interests | text[] | e.g. ["dinosaurs", "space"] |
| createdAt | timestamp | |
| updatedAt | timestamp | Application-managed via Drizzle `.$onUpdate()` |

### phonics_units

| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| phase | integer | 1-4 |
| orderIndex | integer | Sort within phase |
| name | varchar(100) | e.g. "CVC short-a" |
| patterns | text[] | e.g. ["CVC-short-a"] |
| description | text | |

Seeded with full Phase 1-4 scope & sequence from the research doc.

### child_phonics_progress

| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| childId | integer FK -> child_profiles | |
| phonicsUnitId | integer FK -> phonics_units | |
| status | varchar(20) | locked / active / mastered |
| masteredAt | timestamp | nullable |

### srs_cards

| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| childId | integer FK -> child_profiles | |
| cardType | varchar(20) | phoneme / sight_word / vocab |
| front | text | |
| back | text | |
| audioUrl | text | nullable |
| state | integer | FSRS card state |
| difficulty | real | FSRS |
| stability | real | FSRS |
| due | timestamp | FSRS |
| lastReview | timestamp | nullable, FSRS |
| reps | integer | FSRS |
| lapses | integer | FSRS |
| relatedPhonicsUnitId | integer FK -> phonics_units | nullable |

### stories

| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| childId | integer FK -> child_profiles | nullable (null = curated) |
| title | varchar(200) | |
| content | jsonb | Word arrays with metadata |
| theme | varchar(100) | |
| targetPatterns | text[] | Phonics patterns used |
| targetWords | text[] | New words introduced |
| decodabilityScore | real | 0-1, target >= 0.95 |
| fleschKincaid | real | Target 1.0-3.0 |
| illustrationUrls | text[] | |
| aiGenerated | boolean | |
| createdAt | timestamp | |

`content` JSONB structure:

```ts
{
  pages: [
    {
      words: [
        { text: "cat", decodable: true, pattern: "CVC-short-a", sightWord: false },
        { text: "the", decodable: false, pattern: null, sightWord: true }
      ]
    }
  ]
}
```

### reading_sessions

| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| childId | integer FK -> child_profiles | |
| storyId | integer FK -> stories | |
| mode | varchar(20) | listen / guided / independent |
| wcpm | real | nullable, Words Correct Per Minute |
| accuracy | real | nullable, 0-1 |
| duration | integer | seconds |
| miscues | jsonb | nullable |
| recordingUrl | text | nullable |
| completedAt | timestamp | |

## AI Story Generation Pipeline

Three-stage pipeline in `server/utils/reading/`.

### Stage 1: Constrained Generation

`story-generator.ts` calls Claude Haiku 4.5 with:

- Child's allowed phonics patterns (from mastered + active units)
- Mastered sight words list
- Target new words (use each 2+ times)
- Interest theme from child profile
- Temperature 0.3-0.4
- Output: structured JSON with title, pages (word arrays), word list

### Stage 2: Phonics Validation

`phonics-validator.ts` — deterministic engine:

- Decomposes each word into grapheme-phoneme correspondences
- Checks every mapping exists in child's learned pattern set
- Returns decodability score (decodable words / total words)
- Target: >= 0.95
- Words outside known set trigger re-generation or substitution
- Uses built-in phonics rules map (not CMU dict)

### Stage 3: Safety Review

`story-safety.ts`:

- Second Claude call classifying safe/unsafe
- Checks: violence, scary themes, stereotypes, age-inappropriate content
- Programmatic blocklist scan as deterministic layer
- Runs in parallel with other post-processing

### API

`POST /api/reading/stories/generate`

- Input: `{ childId: number, theme?: string }`
- Output: Generated story with decodability metadata
- Auth required, parent must own child profile
- Rate limit: 5 stories/child/day
- Retry policy: up to 2 retries if decodability < 0.95, 1 retry if safety fails. 30s total timeout.

## SRS Engine

`ts-fsrs` integration with child-adapted parameters.

### Parameters

```ts
const fsrs = new FSRS({
  request_retention: 0.85,
  maximum_interval: 180,
  // Child-adapted: shorter initial intervals via custom w array
});
```

- 3-button rating: Again (Rating.Again), Hard (Rating.Hard), Good (Rating.Good)
- Mastery threshold: 3 consecutive Good ratings
- Card types: phoneme recognition, sight words, vocabulary

### Auto-Generation

When a phonics unit status changes to `active`:
- Create SRS cards for each pattern in the unit
- Create SRS cards for target sight words at that level

### API

- `GET /api/reading/srs/due?childId=` — due cards for review
- `POST /api/reading/srs/review` — submit rating, returns next schedule
- `GET /api/reading/srs/stats?childId=` — due/new/mastered counts

### Client Composable

`useSRS.ts`:
- Manages review session state (current card, queue)
- Tracks session progress
- Queues offline reviews for later sync

## TTS & Word Highlighting

### useTTS Composable

Wraps Web Speech API:

- `utterance.rate = 0.8` for child-appropriate pacing
- `onboundary` event tracks current word index
- Exposes: `speak(text)`, `speakWord(word)`, `pause()`, `resume()`, `stop()`
- Speed control: 0.5x - 1.2x range

### WordHighlighter Component

- Each word rendered as clickable `<span>`
- Active word (during TTS): yellow highlight + scale animation
- Sight words: purple bold always
- Click any word: hear it spoken in isolation
- Reads word metadata from story JSONB content

### StoryReader Layout

- Full-screen reading mode
- Controls: play/pause/restart, speed slider
- Page navigation (swipe or buttons)
- Mode toggle: listen / guided / independent

## Routes & Auth

```
/reading              -> Landing (public, SSR for SEO)
/reading/dashboard    -> Parent dashboard (auth)
/reading/child/:id    -> Child home (auth)
/reading/stories/:id  -> Story reader (auth, CSR)
/reading/practice     -> SRS card review (auth, CSR, uses activeChildId from useActiveChild())
/reading/onboarding   -> New child setup (auth)
```

- Middleware `reading-auth.ts`: checks user has >= 1 child profile (except onboarding)
- Route rules in `nuxt.config.ts`: SSR for `/reading` landing, CSR for `/reading/stories/**` and `/reading/practice`
- `useActiveChild()` composable: stores selected child ID in localStorage, auto-selects if only one child. Used by practice and child-scoped pages.

### Key Indexes

- `srs_cards(childId, due)` — due card queries
- `child_phonics_progress(childId)` — progress lookups
- `stories(childId)` — story listing
- `reading_sessions(childId, completedAt)` — dashboard charts

## Agent Team Structure

Four feature-sliced teammates. Lead coordinates via shared task list with dependencies.

### Teammate 1: db-architect

**Owns:** `server/database/schema/reading.ts`, migrations, `shared/reading-types.ts`, seed data

Tasks:
1. Create Drizzle schema with all 6 tables
2. Generate and run migrations
3. Seed phonics_units with full Phase 1-4 scope & sequence
4. Create shared TypeScript types
5. Add DB test helpers (createTestChild, createTestStory, etc.)

**Blocks all other teammates on tasks 1 + 4.**

### Teammate 2: reading-ui

**Owns:** `app/pages/reading/`, `app/components/reading/`, `useTTS.ts`, `useActiveChild.ts`

Note: `useSRS.ts` and `usePhonics.ts` live in `app/composables/` but are owned by srs-engine.

Tasks:
1. Story reader page with WordHighlighter component
2. useTTS composable (Web Speech API, onboundary word tracking)
3. SRS card review UI (3-button emoji rating)
4. Reading landing/dashboard page
5. Parent dashboard with progress charts
6. Responsive layout, large touch targets

### Teammate 3: ai-pipeline

**Owns:** `server/utils/reading/`, `server/api/reading/stories/`

Tasks:
1. Phonics validation engine (word -> grapheme-phoneme decomposition)
2. Story generation prompt + Claude Haiku integration
3. Decodability scoring (verify words against child's known patterns)
4. Safety review pass (second Claude call + blocklist)
5. POST /api/reading/stories/generate endpoint

### Teammate 4: srs-engine

**Owns:** `useSRS.ts`, `usePhonics.ts`, `server/api/reading/srs/`, `server/api/reading/children/`

Tasks:
1. ts-fsrs integration with child-adapted parameters
2. useSRS composable (due cards, schedule review, sync)
3. SRS API routes (due, review, stats)
4. usePhonics composable (child progress, unlock next unit)
5. Auto-generate SRS cards when phonics unit unlocked

### Task Dependencies

- db-architect tasks 1 + 4 block all other teammates' task 1
- srs-engine task 5 depends on ai-pipeline task 1 (phonics validation)
- reading-ui task 3 depends on srs-engine task 2 (useSRS composable)

### Lead Responsibilities

- Require plan approval from all teammates before implementation
- Install ts-fsrs dependency
- Create initial file structure scaffolding
- Resolve cross-cutting issues
- Run verification after teammates complete (pnpm typecheck, pnpm test)

## Deferred (Post-MVP)

- Azure Speech Services pronunciation assessment
- AI illustration generation (GPT Image Mini)
- Robust offline sync with IndexedDB
- Gamification (streaks, badges, rewards)
- Letter tracing on touchscreen
- Admin content management
- Full COPPA verifiable parental consent flow (MVP uses terms acknowledgment)
- Placement diagnostic test
- Repeated reading fluency tracking
