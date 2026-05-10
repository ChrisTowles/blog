# Typing App Design Spec

Kid-friendly, game-based typing tutor that replaces the reading app at `/typing`. Inspired by typing.com (lessons, on-screen actions, virtual keyboard) but with much better TTS audio, dynamic topic-themed lessons, **multi-guardian family/classroom logins**, **PixiJS-rendered mini-games**, and **weekly spelling-word import** as a first-class feature.

**Target users:**

- Primary learners: Kids (Logan, ~7yo; Owen later).
- Primary guardians: Parents and teachers — multiple guardians per learner, multiple learners per guardian.
- Anonymous-first: anyone can land on `/typing` and run a lesson without an account.

## Cutover Decisions

- **Hard cutover from reading -> typing.** Rename `packages/layers/reading/` -> `packages/layers/typing/`. No backward compat; no `/reading` redirects beyond a single 301 to `/typing`.
- Drop reading-specific tables (`stories`, `srs_cards`, `phonics_progress`, `child_profiles`, etc.) — replace with typing tables. Migration is destructive; data was demo-only.
- Routes move `/reading/*` -> `/typing/*`.
- Reading-specific public assets (`public/images/reading/`) are deleted.
- The `reading-*` agents and `/reading-team` slash command are replaced by `typing-*` agents and `/typing-team`.

## Groups, Guardians, Learners

typing.com's "one teacher, many students" model is too rigid. We use a **group model** that handles both home and classroom shapes with the same schema.

### Concepts

- **Group** — a household or a classroom. `kind: 'family' | 'classroom'`. Display labels adapt ("Your family" vs "Your classroom"). Defaults to `family`.
- **Guardian** — any user with the `guardian` role on a group. Can: switch to ("act as") any learner in the group, view progress dashboards, manage settings, invite other guardians, manage spelling lists. **Both parents** and **teachers** are guardians; the only difference is the group's `kind`.
- **Learner** — a profile representing the kid/student. Has a name, avatar, progress, key heatmap, attempts. Does **not** have its own login — guardians sign in and "switch to" the learner. (Future: optional learner login post-MVP.)
- **Cross-group learners** — a learner can belong to multiple groups (e.g. Logan is in our family and Mrs. Davis's classroom). MVP supports this in the schema; the UI ships single-group-per-learner first and the multi-group UI follows post-MVP.

### Why "Group"?

Schema-level neutral term. Alternatives we considered: Household, Family, Crew, Pod, Team. "Group" + `kind` flag handles both home and school without forking the model. Display strings localize per kind so end-users always see warm language.

### Auth flow

1. Anonymous user lands on `/typing`. Picks a stage and runs a drill. Progress lives in `localStorage`.
2. User signs in via existing nuxt-auth-utils. After sign-in:
   - If they have no group, prompt to **create a family** (single click; group created with them as the sole guardian; one default learner suggested with their first name).
   - If they have a group, show a **learner switcher** (who's typing right now: "You" / "Logan" / "Owen"). The active learner is stored in a session cookie + `useState`.
3. Any attempt while a learner is active is recorded against that learner's `userId=null, learnerId=<id>` row.

### Inviting other guardians

- Each group has an invite link `/typing/join/<token>`. Token is single-use, 7-day TTL. The receiver clicks, signs in, and is auto-added as a guardian.
- Bulk invite for classrooms: a guardian can paste many emails; we send invites via the existing email helper.

## Game-Based Learning (PixiJS)

Lessons stop being "type these words and watch a cursor". They're games. Three starter games — picked to cover different learning modes — with a shared `GameRunner` framework so we can add more.

| Game                  | Skill mode             | Stage range | Input granularity   |
| --------------------- | ---------------------- | ----------- | ------------------- |
| Letter Rain           | Speed key-press        | 1-18        | Single key          |
| Letter Tic-Tac-Toe    | Strategic key-press    | 1-15        | Single key          |
| Lake Leap             | Word/sentence fluency  | 4-20        | Whole word/sentence |

All three reuse the PixiJS `Application`/`Container`/`Graphics`/`Text`/`Sprite` pattern from `components/poker/PokerTable.vue`. The keyboard inside lesson runs is still HTML/SVG (better a11y, crisp at any DPI, simpler input). PixiJS is for the *game* viewport.

### 1. Letter Rain

- Letters fall from the top of the screen at a stage-tuned rate.
- Letters drawn from the unlocked key set for the active learner's current stage.
- Pressing the matching key zaps the letter (particle burst, satisfying sound).
- Letters that hit the bottom = miss; 5 misses end the round.
- Round = 60 seconds. Score = letters zapped. Mastery: zap >= 90% at target rate to advance.
- Scales: easy (1 letter at a time, slow fall) -> hard (3 letters, fast fall, distractor letters).

### 2. Letter Tic-Tac-Toe

- 3x3 grid; each cell shows a letter from the unlocked set.
- Player types a letter to claim that cell. AI opponent plays at a stage-appropriate level (random at stage 1 -> minimax at stage 5+).
- Win = 3 in a row, classic Tic-Tac-Toe rules.
- Mastery: win 3 of 5 games. Tie counts as half a win.
- Single-key practice with strategic context — kids stay engaged longer than pure drill.

### 3. Lake Leap

- Side-scrolling platformer. Character (configurable sprite) stands on a platform. Next 1-2 platforms ahead each show a word.
- Type the word on the next platform to jump there. Type wrong = character wobbles; type too slow = platform sinks.
- Word source:
  - Curriculum lessons: words from the stage's drill set
  - Topic games: AI-generated words constrained to unlocked keys
  - **Spelling lists: the week's actual spelling words** (this is the killer feature)
- 10 platforms = round complete. Mastery: clear the round with <= 2 wrong words.
- Logan (and most 7yos) recognise this as Mario-coded; Owen will too.

### Game Framework

`packages/layers/typing/app/composables/useGameRunner.ts` exposes:

```ts
type GameRunnerOptions<TConfig, TResult> = {
  config: TConfig
  onComplete: (result: TResult) => void
  containerRef: Ref<HTMLDivElement | null>
}
```

Each game implements `defineGame(config) -> { mount(app), unmount() }`. The runner handles PixiJS app lifecycle, resize observation, audio bus, and recording the typing-engine input stream. Games subscribe to keypress events from `useTypingEngine`; they don't reimplement input handling.

## Spelling Lists (Killer Feature)

Parents/teachers enter the week's spelling words; the app turns them into typing exercises and Lake Leap rounds. Tracks mastery per word until each is typed correctly 3 times in a row at >= 90% speed of the learner's current WPM target.

### Entry methods

- **Paste** — comma- or newline-separated list
- **Type** — one word per row, simple form
- **Photograph the worksheet** — drop or upload image; **Claude vision (Sonnet 4)** extracts words from the worksheet image. Returns the extracted list for guardian confirmation before saving.

### Lifecycle

1. Guardian creates a `typing_spelling_lists` row keyed by `(groupId, learnerId, weekOf)`.
2. App auto-generates 3 derived lessons:
   - **Drill** — each word repeated 3x
   - **Mixed sentence** — AI generates a kid-safe sentence using all words (Claude Haiku, constrained to unlocked keys)
   - **Lake Leap round** — words become the next 10 platforms
3. Learner home screen surfaces the active week's list as a top-level "Spelling Words" card with progress: `5 / 10 mastered`.
4. Mastery: each word typed correctly 3 times in a row across any context (drill, sentence, game) flips its `mastered=true` flag. Once all words mastered, the week is complete and the card celebrates.

### Image extraction prompt (typing-ai)

Use `claude-sonnet-4-5-20251022` (vision-capable). System prompt:

> "You are reading a child's spelling worksheet. Extract every spelling word printed on the worksheet, in the order they appear. Output strict JSON: `{ words: string[] }`. Lowercase. No proper nouns unless clearly intended as spelling words. No example sentences, no instructions, no headers."

Validate output: 1-30 words, each 2-15 chars, all `[a-z]`. If invalid, return a 422 with the raw extraction so the guardian can fix it manually.

## Curriculum-Driven Lessons

A fixed progression starting at home row and expanding outward — same as before:

| Stage | Keys introduced                                   |
| ----- | ------------------------------------------------- |
| 1     | `f j` (index fingers, home row)                   |
| 2     | `d k` (middle fingers)                            |
| 3     | `s l` (ring fingers)                              |
| 4     | `a ;` (pinkies) — full home row                   |
| 5     | `g h` (index reach inward)                        |
| 6     | Top row: `r u`                                    |
| 7     | Top row: `e i`                                    |
| 8     | Top row: `w o`                                    |
| 9     | Top row: `q p`                                    |
| 10    | Top row: `t y`                                    |
| 11    | Bottom row: `v m`                                 |
| 12    | Bottom row: `c ,`                                 |
| 13    | Bottom row: `x .`                                 |
| 14    | Bottom row: `z /`                                 |
| 15    | Bottom row: `b n`                                 |
| 16    | Shift + capitals                                  |
| 17    | Numbers row                                       |
| 18    | Common punctuation: `' " ! ?`                     |
| 19    | Symbols: `@ # $ % & * ( )`                        |
| 20    | Mixed prose at speed (WPM/accuracy targets)       |

Each stage has 3-5 lessons (drill / bigram / word / sentence). Stage gating: >= 95% accuracy AND >= target WPM.

## Topic Games (Dynamic AI)

Anywhere from "lesson selection" the user can ask for a game themed on a topic ("Poppy Playtime", "Pokemon", "Minecraft"). The AI generates lesson text constrained to:

- The keys unlocked so far for the active learner (or all keys if anonymous picks "free play")
- Kid-safe content (block list + AI safety review, same pattern as the old reading-app `story-safety`)
- Length appropriate for stage (drill = 30-60 chars, sentence = 80-160 chars, paragraph = 250-400 chars)
- 95%+ characters drawn from unlocked keys

Topic-game text plugs straight into Lake Leap; or runs in the standard lesson runner.

## Audio Voice (Better than typing.com)

- Use Web Speech API only as fallback.
- Primary: **pre-rendered audio per key, key-name, encouragement phrase, and lesson intro** using Google Cloud TTS Chirp3. Cache server-side in `public/audio/typing/<hash>.mp3`. Pay once per phrase, ever.
- Per-key audio plays on key reveal during stage 1-5 drills (configurable; default on for early stages).
- Encouragement audio with multiple variants per phrase to avoid repetition fatigue.

## Anonymous-First Persistence

- All progress works without login. Stored in `localStorage` under `typing:progress:v1` (active learner pseudo-id `'anon'`, stage, attempts, key heatmap, spelling-list shadow).
- "Sign in to save" CTA on the dashboard. On sign-in, server merges localStorage state into the active learner's records.
- Logged-in users get persisted DB profiles; anonymous keeps working off localStorage.
- Same `useTypingProgress` composable abstracts the storage backend — components don't know which it is.

## Project Structure

```
packages/layers/typing/
  app/
    pages/typing/
      index.vue              # Landing + lesson picker (works without login)
      lesson/[id].vue        # Lesson runner (drill / sentence / topic game)
      game/[slug].vue        # Game runner (letter-rain | tic-tac-toe | lake-leap)
      progress.vue           # Stage map + heatmap + WPM history (per active learner)
      topics.vue             # Topic-game generator
      spelling/index.vue     # Active week + history
      spelling/new.vue       # Create list (paste / type / image)
      group/index.vue        # Group settings, members, learners
      group/learners.vue     # Add/edit learners
      join/[token].vue       # Accept guardian invite
      sign-in.vue            # Optional sign-in
    components/typing/
      VirtualKeyboard.vue    # HTML/SVG on-screen keyboard
      HandHint.vue           # Hand outline + correct finger
      LessonRunner.vue       # Text + cursor + input handling
      WPMMeter.vue
      KeyHeatmap.vue
      StageMap.vue
      TopicGameForm.vue
      LearnerSwitcher.vue    # "Acting as: Logan v"
      SpellingListForm.vue
      SpellingImageDropzone.vue
      SpellingMasteryCard.vue
      games/
        GameStage.vue        # PixiJS host wrapper
        LetterRain.ts        # PixiJS scene
        LetterTicTacToe.ts   # PixiJS scene
        LakeLeap.ts          # PixiJS scene
    composables/
      useTypingEngine.ts     # Input handler, WPM/accuracy state machine
      useTypingProgress.ts   # localStorage <-> server progress (per active learner)
      useTypingAudio.ts      # Cached audio + Web Speech fallback
      useVirtualKeyboard.ts  # Next-key + finger calculations
      useActiveLearner.ts    # Who's typing right now (cookie + useState)
      useGameRunner.ts       # PixiJS app lifecycle + game framework
    layouts/typing.vue
  server/
    api/typing/
      lessons/
        index.get.ts
        [id].get.ts
        generate.post.ts
      progress/
        index.get.ts          # ?learnerId=
        index.post.ts
        merge.post.ts
      groups/
        index.get.ts          # groups I'm a guardian of
        index.post.ts         # create group
        [id].get.ts
        [id].put.ts
        [id]/invite.post.ts   # generate invite token
        [id]/join.post.ts     # accept invite token
        [id]/learners/index.get.ts
        [id]/learners/index.post.ts
        [id]/learners/[learnerId].put.ts
      spelling/
        index.get.ts          # ?learnerId=&weekOf=
        index.post.ts         # create list
        [id].put.ts           # update words
        [id].delete.ts
        extract.post.ts       # image -> word list (Claude vision)
      audio/
        [phrase].get.ts
    utils/typing/
      curriculum.ts
      lesson-generator.ts     # Claude Haiku topic generator
      lesson-safety.ts
      spelling-extractor.ts   # Claude Sonnet 4 vision
      spelling-lessons.ts     # Auto-generate drill/sentence/leap lessons from list
      tts.ts
      progress-merge.ts
      groups.ts               # Membership + act-as helpers
      require-guardian.ts     # Auth helper for guardian-only routes

packages/blog/
  server/database/schema/typing.ts
  shared/typing-types.ts
```

## Database Schema (typing.ts)

```ts
typing_groups {
  id: serial PK
  name: varchar(120)
  kind: varchar(16)                   // 'family' | 'classroom'
  createdAt, updatedAt
}

typing_group_members {
  groupId: integer FK typing_groups.id, NOT NULL, ON DELETE CASCADE
  userId: varchar(36) FK users.id, NOT NULL, ON DELETE CASCADE
  role: varchar(16) default 'guardian' // 'guardian' (only role MVP)
  invitedBy: varchar(36) FK users.id, NULLABLE
  joinedAt: timestamp default now
  PK (groupId, userId)
}

typing_group_invites {
  id: serial PK
  groupId: integer FK typing_groups.id ON DELETE CASCADE
  token: varchar(64) UNIQUE
  email: varchar nullable             // null = link-only invite
  expiresAt: timestamp
  acceptedBy: varchar(36) FK users.id NULLABLE
  acceptedAt: timestamp NULLABLE
  createdAt
}

typing_learners {
  id: serial PK
  groupId: integer FK typing_groups.id ON DELETE CASCADE
  displayName: varchar(80)
  avatarUrl: text NULLABLE
  birthYear: integer NULLABLE
  currentStage: integer default 1
  preferredVoice: varchar default 'chirp3-en-us-Aoede'
  createdAt, updatedAt
}

typing_lessons {
  id: serial PK
  slug: varchar UNIQUE
  stage: integer
  kind: varchar                       // 'drill' | 'bigram' | 'word' | 'sentence' | 'paragraph' | 'topic' | 'spelling-drill' | 'spelling-sentence'
  title: varchar
  text: text
  targetWpm: integer
  targetAccuracy: real default 0.95
  topic: varchar NULLABLE
  spellingListId: integer NULLABLE FK typing_spelling_lists.id
  generatedBy: varchar NULLABLE       // 'system' | 'ai'
  createdAt
}

typing_attempts {
  id: serial PK
  learnerId: integer FK typing_learners.id ON DELETE CASCADE
  lessonId: integer NULLABLE FK typing_lessons.id
  gameSlug: varchar(40) NULLABLE      // when attempt came from a game round
  wpm: real
  accuracy: real
  durationMs: integer
  errorsByKey: jsonb $type<Record<string, number>>()
  completedAt: timestamp
}

typing_key_stats {
  id: serial PK
  learnerId: integer FK typing_learners.id ON DELETE CASCADE
  key: varchar(8)
  attempts: integer default 0
  errors: integer default 0
  avgMs: real
  updatedAt
  UNIQUE (learnerId, key)
}

typing_spelling_lists {
  id: serial PK
  learnerId: integer FK typing_learners.id ON DELETE CASCADE
  weekOf: date
  words: text[]                       // ['cat', 'bat', ...]
  source: varchar(16)                 // 'paste' | 'type' | 'image'
  sourceImageUrl: text NULLABLE
  createdBy: varchar(36) FK users.id  // which guardian created it
  createdAt, updatedAt
  UNIQUE (learnerId, weekOf)
}

typing_spelling_progress {
  id: serial PK
  spellingListId: integer FK typing_spelling_lists.id ON DELETE CASCADE
  word: varchar(64)
  consecutiveCorrect: integer default 0
  mastered: boolean default false
  masteredAt: timestamp NULLABLE
  UNIQUE (spellingListId, word)
}
```

Anonymous progress lives in localStorage with `learnerId='anon'`. The merge route writes anonymous attempts to whichever learner is active at sign-in time.

## AI Topic-Game Pipeline

1. Validate request (stage, topic, length).
2. Compose prompt: "Write a typing exercise about <topic> for a child at stage N. Use only these characters: <unlocked set>. Length: <range>. No quotes, no smart punctuation, no emoji."
3. Call `claude-haiku-4-5-20251001` at temp 0.3.
4. Validate output: regex check that every char is in the unlocked set; length within bounds.
5. Run safety review (temp 0). Block if unsafe.
6. Persist as `typing_lessons` row with `generatedBy='ai'`. Return.
7. Rate limit: 10 generations/IP/day for anonymous, 30/user/day for authed.

## Spelling-Words Pipeline

1. Guardian POSTs `extract.post.ts` with image (multipart) **OR** POSTs `index.post.ts` with `{ words: string[] }`.
2. Image flow:
   - Read image -> base64
   - Send to `claude-sonnet-4-5-20251022` with vision content block
   - Strict-JSON output, validated schema
3. Common path: persist `typing_spelling_lists`, then call `spelling-lessons.ts` which:
   - Generates a drill lesson (each word x3) via curriculum util
   - Generates a mixed sentence via Claude Haiku (constrained to known keys + spelling words; safety-reviewed)
   - Tags both as `spelling-drill` / `spelling-sentence` linked to the list
4. Lake Leap auto-uses the list's words when launched in "spelling mode".

## Audio Pipeline

- Server-side: `audio/[phrase].get.ts`
  - Hash `(phrase, voice)` -> path
  - If cached file exists in `public/audio/typing/<hash>.mp3`, serve
  - Otherwise, call provider, write file, serve
- Client: `useTypingAudio` preloads common phrases (a-z, "good job", "try again") on first lesson load
- Provider: Google Cloud TTS Chirp3 default, ElevenLabs alt. Fallback: Web Speech API if `TYPING_TTS_PROVIDER` unset.

## Verification

After each task: `pnpm typecheck && pnpm lint && pnpm test -- --run`.

Full feature verification:

1. Anonymous user can land on `/typing`, pick stage 1 lesson, type, see results, no login.
2. Sign in -> create family -> add Logan as a learner.
3. Switch active learner to Logan, run a Letter Rain round, see attempt recorded against him.
4. Invite spouse via link; spouse signs in, sees Logan, switches to him, runs a Lake Leap round.
5. Photograph this week's spelling list -> Claude extracts words -> guardian confirms -> Logan plays Lake Leap with those words.
6. Logan masters a word (3 correct in a row) -> spelling card shows progress.
7. Topic game: type "Poppy Playtime" -> generated kid-safe Lake Leap round.
8. Sign-in merges anonymous progress into Logan's records.

E2E (`pnpm test:e2e`): anonymous flow, group create + invite, learner switch, spelling import (mocked vision), Lake Leap round.
