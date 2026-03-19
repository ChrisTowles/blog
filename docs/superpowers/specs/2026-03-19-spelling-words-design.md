# Spelling Words Feature Design

Weekly spelling word decks with AI-generated images and two practice modes, integrated into the existing SRS system.

## Problem

Logan gets a weekly spelling word list from school. We need a way to enter these words, practice them with visual aids, and track progress using the existing spaced repetition system.

## Data Model

### New table: `spelling_decks`

| Column    | Type      | Notes                          |
|-----------|-----------|--------------------------------|
| id        | serial PK |                                |
| childId   | int FK    | → childProfiles                |
| name      | text      | e.g. "Week 12 - March 19"     |
| createdAt | timestamp |                                |

### Changes to `srsCards`

| Column   | Type     | Notes                                          |
|----------|----------|-------------------------------------------------|
| deckId   | int FK?  | → spelling_decks, nullable. Null for non-spelling cards. `onDelete: cascade` — deleting a deck removes its cards and SRS history. |
| imageUrl | text?    | GCS URL for AI-generated image. Null for abstract words |

Spelling cards use `cardType: 'spelling'`, `front: word`, `back: auto-generated definition`.

Update `childProfilesRelations` to include `many(spellingDecks)` and `srsCardsRelations` to include `one(spellingDecks)`.

## Word Entry

### Input flow

1. User navigates to `/reading/spelling/new`
2. Enters deck name (default: "Week N - {date}")
3. Enters words via text area — one per line, comma-separated, or free-typed
4. Submit creates deck + SRS cards immediately
5. Image generation runs in background — cards are usable in text-only mode while images generate

### Concrete vs abstract classification

Simple heuristic: check words against a list of common abstract words (prepositions, conjunctions, abstract concepts). Words not in the list are treated as concrete and get AI-generated images.

### Definition generation

Single Claude Haiku batch call with all words in the deck: "Give a simple, kid-friendly one-sentence definition for each word: {words}". Returns JSON mapping word → definition. Cheaper and faster than one call per word.

## Practice Modes

### Image-to-Spell (harder)

- Show AI-generated image (or definition for abstract words)
- Kid types the word
- Check spelling on submit
- Correct first try → Good (4), correct second try → Hard (3), wrong → Again (1)

### Word-to-Image (easier)

- Show the word
- Display 4 images: 1 correct + 3 distractors from the same deck
- Kid taps the matching image
- Same SRS rating mapping
- Abstract words without images are skipped in this mode
- **Minimum threshold:** Requires at least 4 concrete words with images in the deck. If fewer, this mode is disabled with a message ("Need more picture words to play this game").

### Entry points

- "Practice this deck" on deck detail page — filters to that deck's due cards
- Existing "review all" queue — spelling cards appear alongside other card types using image-to-spell mode
- URL state: `/reading/practice?deckId=X&mode=image-to-spell` or `&mode=word-to-image`

## Image Generation

### Pipeline

1. On deck creation, classify each word as concrete or abstract
2. Generate one image per concrete word via Gemini (`gemini-2.5-flash-image`)
3. 1:1 aspect ratio, same flat vector illustration style as story images
4. Upload to GCS at `reading/spelling/{deckId}/{word}.png`
5. Update card's `imageUrl` as each image completes

### Prompt template

```
{ILLUSTRATION_STYLE} A single clear illustration of the concept "{word}".
Simple, centered, no text or letters in the image.
```

### Async behavior

Deck creation API creates cards and generates definitions synchronously (fast Haiku call). Image generation is fire-and-forget — the endpoint calls `generateSpellingImages(deckId, words)` without awaiting, then returns. Cards are immediately usable in text-only mode. Deck detail page polls/refetches to pick up images as they complete.

Reuse `ILLUSTRATION_STYLE` from `server/utils/reading/image-generator.ts`. Add a new exported `generateSpellingImage(word)` function to that module.

### Error handling

Failed image generations leave `imageUrl` as null — card stays in text-only mode permanently. Deck detail page shows a "Retry" button for cards with missing images. One automatic retry per image on first failure.

## API Routes

### New

| Method | Path                              | Purpose                                    |
|--------|-----------------------------------|--------------------------------------------|
| GET    | /api/reading/spelling/decks       | List decks for child                       |
| POST   | /api/reading/spelling/decks       | Create deck (name + word list), trigger image gen |
| GET    | /api/reading/spelling/decks/[id]  | Deck detail with cards                     |
| DELETE | /api/reading/spelling/decks/[id]  | Remove deck and its cards                  |

### Modified

| Route                    | Change                                      |
|--------------------------|---------------------------------------------|
| GET /api/reading/srs/due | Add optional `deckId` query param to filter  |

### Unchanged

`POST /api/reading/srs/review` — works as-is for spelling cards.

## Pages

| Path                        | Purpose                          |
|-----------------------------|----------------------------------|
| /reading/spelling           | List all decks with progress     |
| /reading/spelling/new       | Create new deck with word entry  |
| /reading/spelling/[deckId]  | Deck detail, words, images, practice button |

Practice happens on the existing `/reading/practice` page with `deckId` and `mode` query params.

## Out of Scope

- OCR / photo word entry (future feature)
- Custom image upload
- Sharing decks between children
- Teacher/school integration
