# Kids Reading App - Implementation Plan

Phonics-based learn-to-read app for ages 3-8. Parent-child co-play model.

## Core Concept

Digital tactile slider teaching sound blending. Child drags handle across word, sounds activate sequentially, creating the "click" moment for decoding.

---

## Sprint 1: Core Slider ✅

- [x] Create `app/layouts/learn.vue` - fullscreen layout, lavender bg, no header/footer
- [x] Create `app/components/learn/SoundIndicator.vue` - blue oval (continuous) / red dot (stop)
- [x] Create `app/components/learn/WordSlider.vue` - main slider with drag interaction
- [x] Create `app/pages/learn/lesson/[id].vue` - lesson page hosting slider
- [x] Add touch event handling (horizontal drag detection)
- [x] Test with hardcoded word data
- [x] Add unit tests for sound classification and word parsing

## Sprint 2: Progress System (Partial)

- [x] Create `app/composables/useLearnProgress.ts` - localStorage via `@vueuse/core`
- [x] Progress dots integrated in lesson page
- [x] Nav arrows (up/down) integrated in lesson page
- [x] Implement word completion flow (slider end → next word)
- [ ] Implement lesson completion flow (all words → lesson done)

## Sprint 3: Lesson Map & Navigation (Partial)

- [x] Create `app/pages/learn/index.vue` - landing with lesson map (simple version)
- [ ] Create `app/components/learn/LessonMap.vue` - stepping stones visual (fancy)
- [ ] Add locked/unlocked lesson states (using composable)
- [ ] Create `app/components/learn/TipsButton.vue` - parent hints modal
- [ ] Create `app/pages/learn/settings.vue` - parent controls (reset, stats)

## Sprint 4: Content & Polish

- [ ] Create `content/5.learn/lessons.yml` - lesson data structure
- [ ] Write lessons 1-25 (CVC words, short vowels)
- [ ] Add `Learn` link to `app/components/AppHeader.vue`
- [ ] Add animations (slider, completion, page transitions)
- [ ] Test on iPad/tablet viewport

---

## File Structure

```
app/
├── layouts/
│   └── learn.vue
├── pages/
│   └── learn/
│       ├── index.vue
│       ├── settings.vue
│       └── lesson/
│           └── [id].vue
├── components/
│   └── learn/
│       ├── WordSlider.vue
│       ├── SoundIndicator.vue
│       ├── LessonMap.vue
│       ├── ProgressDots.vue
│       ├── NavArrows.vue
│       └── TipsButton.vue
└── composables/
    └── useLearnProgress.ts

content/
└── 5.learn/
    └── lessons.yml
```

---

## Data Types

```typescript
interface Sound {
  letter: string         // "c", "sh", "th"
  type: 'continuous' | 'stop'
}

interface Word {
  text: string
  sounds: Sound[]
}

interface Lesson {
  id: number
  title: string
  words: Word[]
  hint?: string
}

interface LearnProgress {
  currentLesson: number
  completedLessons: number[]
  wordMastery: Record<string, number>
  lastActivity: string
}
```

---

## Sound Classification

```yaml
continuous: [a, e, i, o, u, f, l, m, n, r, s, v, w, y, z]
stop: [b, c, d, g, h, j, k, p, q, t, x]
```

---

## MVP Lessons (25 total)

| Lessons | Focus | Example Words |
|---------|-------|---------------|
| 1-5 | Short A | cat, sat, mat, hat, bat, can, man, pan, fan, rat |
| 6-10 | Short E | get, set, wet, pet, let, bed, red, fed, hen, pen |
| 11-15 | Short I | sit, hit, bit, fit, pit, dig, big, pig, wig, fig |
| 16-20 | Short O | hot, pot, not, dot, got, dog, log, fog, hog, jog |
| 21-25 | Short U | cup, pup, sun, run, fun, bug, rug, hug, tug, mud |

---

## Design Tokens

| Element | Color | Hex |
|---------|-------|-----|
| Background | Lavender | `#b8a9e8` |
| Text | Dark Navy | `#1a1a2e` |
| Continuous Sound | Blue | `#4a7bc9` |
| Stop Sound | Red | `#e85d5d` |
| Slider Track | Light Purple | `#d4c9f0` |
| Handle | White | `#ffffff` |
| Success | Green | `#5cb85c` |

---

## Notes

- No database/API - localStorage only
- VueUse already installed (`useLocalStorage`)
- Touch-first design (iPad primary target)
- Parent hints shown on request only
- Images revealed AFTER reading (prevents guessing)

## Future (Not MVP)

- [ ] Audio playback for sounds
- [ ] Co-reading books section
- [ ] Games for reinforcement
- [ ] Database sync for authenticated users
- [ ] Animated mascot characters
