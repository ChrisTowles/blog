# Building an AI-powered reading app for struggling readers

**An AI-personalized reading app can fill the single biggest gap in the children's literacy market: unlimited decodable content precisely matched to each child's phonics level and interests.** No existing app does this well. Reading.com delivers the best pedagogy (systematic synthetic phonics via Direct Instruction) but has zero adaptive technology and only 60 fixed books. Lexia Core5 has sophisticated adaptation but no generative content. By combining reading.com's Science of Reading rigor with AI-generated stories, spaced repetition scheduling, and speech-based assessment, a Nuxt 4 app built in two weeks can deliver a working MVP that demonstrates genuinely novel value. This report covers the pedagogy, the AI pipeline, the architecture, and a day-by-day sprint plan.

---

## How reading.com teaches kids to read — and where it falls short

Reading.com is the current gold standard for structured phonics apps, earning a **4.8/5 from phonics.org** and ranking #1 on LearningReadingHub's 2026 list. It delivers 99 fully scripted lessons based on Direct Instruction methodology — the same approach behind _Teach Your Child to Read in 100 Easy Lessons_ — validated by Project Follow Through as the most effective large-scale instructional model ever tested.

Each 15–20 minute lesson follows a precise sequence: animated alphabet song → new letter/sound introduction → sound stories → letter writing → blending practice with sliding bars → sight words (orange slider bars signal irregular words) → decodable book reading → comprehension questions → rewards. The app enforces a **co-play model** where a parent sits with the child, following on-screen scripts. Children are never asked to guess from pictures — illustrations are hidden until the child successfully decodes each word.

The curriculum progresses through five phases: letter recognition, CVC blending, word reading practice, advanced decoding (long vowels, digraphs), and fluency building. It covers ages 3–8, costs **$12.49/month** (or $6.25/month annually), and supports up to 3 child profiles.

**Where it falls short for the target audience (ages 7–11, behind grade level):**

- No adaptive technology whatsoever — pacing depends entirely on parent judgment
- Only **60 decodable books**, which children exhaust quickly, killing engagement
- Maxes out at roughly 2nd-grade reading level with limited coverage of r-controlled vowels and polysyllabic words
- Requires a literate adult present for every session — no independent use
- No speech recognition, no fluency measurement, no automated error detection
- No personalization by interest (every child reads the same stories in the same order)

These gaps define the opportunity. An AI-powered app can preserve reading.com's pedagogical rigor while adding unlimited personalized content, adaptive pacing, and independent reading capability.

---

## The competitive landscape reveals a clear opening for AI

Nine major apps compete in children's literacy. Each has distinct strengths, but **none combines strong Science of Reading pedagogy with AI-generated personalized content**:

| App                    | Ages    | Approach               | Adaptive?         | Decodable books        | Price              |
| ---------------------- | ------- | ---------------------- | ----------------- | ---------------------- | ------------------ |
| **Reading.com**        | 3–8     | Synthetic phonics + DI | ❌ None           | 60                     | $12.49/mo          |
| **Lexia Core5**        | Pre-K–5 | Structured Literacy    | ✅ Sophisticated  | None                   | ~$40/student/yr    |
| **Teach Your Monster** | 3–6     | Synthetic phonics (UK) | ⚠️ Basic          | None                   | Free (web)         |
| **HOMER**              | 2–8     | Synthetic phonics      | ✅ Adaptive paths | Some                   | $7.99/mo           |
| **ABCmouse**           | 2–8     | General early learning | ⚠️ Basic          | None                   | $14.99/mo          |
| **Raz-Kids**           | K–5     | Leveled library        | ❌ Rule-based     | Leveled, not decodable | $110/yr classroom  |
| **Hooked on Phonics**  | 3–8     | Systematic phonics     | ❌ None           | Physical books         | $12.99/mo          |
| **Reading Eggs**       | 2–13    | Balanced literacy      | ⚠️ Basic          | Some                   | $6/mo              |
| **Headsprout**         | Pre-K–5 | ABA-based instruction  | ✅ Patented       | Printable eBooks       | ~$210/yr classroom |

The most consistent parent complaints across all apps: **not enough content at each reading level**, rigid pacing that's either too fast or too slow, limited progress tracking, and no real-time pronunciation feedback. HOMER is the only app that personalizes by interest, but its phonics content is pre-tagged by theme — not dynamically generated around the child's specific interests and phonics level.

**The genuine AI differentiator is generating unlimited decodable stories on demand**, constrained to each child's exact set of mastered phonics patterns and sight words, themed around whatever the child loves. A child who loves dinosaurs and has mastered CVC short-a words gets: _"The T-Rex ran and ran. He had a big hat. Dan the T-Rex sat on a flat rock."_ No existing app produces this. Secondary differentiators include AI-powered pronunciation assessment for independent practice, adaptive lesson pacing driven by error pattern analysis, and a parent dashboard that translates raw data into plain-language insights.

---

## The Science of Reading provides the pedagogical foundation

The app must be built on evidence-based reading science, not ed-tech trends. The **Simple View of Reading** (Gough & Tunmer, 1986) provides the theoretical framework: **Decoding × Language Comprehension = Reading Comprehension**. Both factors are necessary — if either is zero, reading comprehension is zero. For children ages 7–11 who are behind, decoding is almost always the bottleneck.

The **National Reading Panel (2000)** meta-analysis identified five pillars that must all be addressed: phonemic awareness (hearing and manipulating individual sounds), phonics (mapping sounds to letters), fluency (accurate reading at appropriate speed), vocabulary (word knowledge), and comprehension (understanding meaning). Scarborough's Reading Rope model further shows these as interweaving strands — weakness in any single strand frays the whole rope.

### Systematic synthetic phonics scope and sequence

For children ages 7–11 who are behind, instruction must start where the child actually is — often at foundational CVC patterns — and progress systematically. The recommended scope and sequence, based on Carreker (2011) and the Orton-Gillingham tradition:

**Phase 1 — Foundations:** Single consonants (b, c, d, f, g, h, k, l, m, n, p, s, t) → short vowels in CVC words (cat, sit, hop) → consonant digraphs (sh, th, ch, ck) → remaining consonants (j, r, v, w, x, y, z, qu).

**Phase 2 — Building complexity:** Initial and final consonant blends (bl-, cr-, st-, -mp, -nk) → FLOSS rule (ff, ll, ss doubling) → silent-e/VCe long vowels (bake, ride, bone) → open syllables (he, my, no).

**Phase 3 — Intermediate patterns:** Vowel teams (ai/ay, ee/ea, oa/oe, oo, ou/ow) → r-controlled vowels (ar, or, er/ir/ur) → diphthongs (oi/oy, ou/ow) → silent letters (kn, wr, mb, igh).

**Phase 4 — Advanced decoding:** Hard/soft c and g → syllable division → prefixes and suffixes (-ed, -ing, re-, un-, -tion) → Latin and Greek roots.

New grapheme-phoneme correspondences should be introduced at **3–6 per week**, gated by mastery. Anna Gillingham's principle applies: _"As fast as you can, but as slow as you must."_ A diagnostic placement test determines where each child enters the sequence.

### Spaced repetition keeps learned patterns from fading

The app should use the **FSRS algorithm** (Free Spaced Repetition Scheduler, the modern successor to SM-2 that now powers Anki) via the `ts-fsrs` npm package. The core SM-2 algorithm works as follows: after a correct response, intervals expand from 1 day → 6 days → (previous interval × ease factor). The ease factor adjusts based on recall quality — perfect recall increases it by +0.10, while failures decrease it sharply. FSRS improves on SM-2 with better modeling of memory decay curves.

**Modifications for children ages 7–11:**

- **Simplified rating:** 3 buttons instead of 6 — "Don't Know" (Again), "Hard" (Hard), "Got It!" (Good) — presented with emoji faces
- **Shorter initial intervals:** 1 day → 3 days → (previous × EF) instead of SM-2's 1 → 6, since children benefit from more frequent review
- **Lower default ease factor:** Start at 2.3 instead of 2.5 for struggling readers
- **Mastery threshold:** 3 consecutive "Got It!" ratings before marking a card as mastered
- **Within-session micro-spacing:** Expanding retrieval practice (show card, then revisit after 1, then 3 intervening items)

SRS cards should cover four types: phoneme recognition (see grapheme → produce sound), sight word reading, vocabulary definitions, and phonemic awareness tasks. Meta-analyses confirm spacing improves retention by **200%+** across all age groups, and the effect is robust with children specifically.

### Fluency norms set concrete targets

Reading fluency is measured in **Words Correct Per Minute (WCPM)**. Hasbrouck & Tindal (2017) norms for the 50th percentile: Grade 2 spring = **100 WCPM**, Grade 3 spring = **112 WCPM**, Grade 4 spring = **133 WCPM**, Grade 5 spring = **146 WCPM**. Students scoring **10+ words below the 50th percentile** need fluency intervention.

The app should implement repeated reading — the student reads the same passage 3–4 times, tracking WCPM improvement each time. Meta-analyses show effect sizes of **0.82 to 1.95** for repeated reading interventions. Weekly cold-read assessments on novel passages measure transfer and long-term progress. Expected growth with intervention: **1–2 WCPM per week**.

### Orton-Gillingham multisensory techniques adapted for screens

The OG method uses simultaneous Visual, Auditory, Kinesthetic, and Tactile (VAKT) channels. Digital adaptations that work well: **letter tracing on touchscreen** while hearing the sound, **drag-and-drop letter tiles** (color-coded: vowels red, consonants blue) for word building, **Elkonin sound boxes** where the child taps each phoneme, animated mouth position videos showing articulation, and **audio recording with playback** for self-correction. These activities provide the multisensory engagement that pure text-on-screen apps lack.

---

## The AI content generation pipeline makes personalization possible

### Generating decodable stories with Claude API

The core technical challenge is generating engaging stories that **strictly comply with phonics constraints**. The approach uses a three-stage pipeline: constrained generation → programmatic validation → safety review.

**Stage 1: Constrained prompting.** The system prompt provides Claude with the child's exact allowed phonics patterns, mastered sight words, target new words, and interest theme. Temperature should be set to **0.3–0.4** for vocabulary adherence. Example prompt structure:

```
SYSTEM: You are a decodable story writer. Follow these constraints EXACTLY:
ALLOWED PATTERNS: CVC short-a, CVC short-i, digraphs sh/th/ch
SIGHT WORDS: the, a, is, was, to, and, he, she, said, my
TARGET NEW WORDS (use each 2+ times): chop, thin, ship
INTEREST THEME: dinosaurs
LENGTH: 60-90 words, sentences 3-8 words

Generate a story with a simple problem→attempt→resolution arc.
Output as JSON with title, story text, and complete word list.
```

Existing tools like **LitLab.ai** and **Project Read AI** validate this approach — both already generate curriculum-aligned decodable text using LLMs with phonics constraints.

**Stage 2: Programmatic validation.** LLMs cannot be trusted to follow phonics constraints perfectly. Every generated word must be checked against a deterministic phonics rules engine that decomposes words into grapheme-phoneme correspondences and verifies each mapping exists in the student's learned set. The CMU Pronouncing Dictionary can power this. Target: **≥95% decodability score** (decodable words ÷ total words). Words that violate constraints trigger re-generation or substitution.

**Stage 3: Safety review.** A second Claude call classifies the story as safe/unsafe, checking for violence, scary themes, stereotypes, and age-inappropriate content. A programmatic blocklist scan adds a deterministic safety layer.

**Model selection and costs:** Claude Haiku 4.5 at **$1/$5 per million tokens** is sufficient for constrained story generation. A complete story generation cycle (generation + validation + safety) costs approximately **$0.005 per story**. For 100 active students generating 5 stories/week, monthly Claude API costs are roughly **$40**. Combined with budget image generation via GPT Image Mini ($0.005/image), total AI costs run **$80–200/month** — well within viability.

### Controlling reading level with post-generation verification

Flesch-Kincaid Grade Level provides a quick readability check: `0.39 × (words/sentences) + 11.8 × (syllables/words) − 15.59`. Target FK **1.0–3.0** for struggling readers ages 7–11. But readability formulas alone are insufficient for decodable text — the critical constraint is phonics pattern compliance, not just word length and sentence complexity. The app must maintain a per-student `known_words` set (mastered phonics patterns + learned sight words) and verify every generated word falls within `known_words ∪ target_new_words`.

### AI illustration at scale

For illustrations, a hybrid approach works best: **pre-generate a library of character illustrations** using LoRA-trained models on Stable Diffusion or FLUX (training 30–40 reference images per character for consistency), then generate scene-specific illustrations on demand using **GPT Image Mini at $0.005–$0.05/image**. Character consistency across story pages requires detailed character description tokens reused in every prompt plus style-locking ("cozy watercolor children's book illustration, warm palette"). At 4 illustrations per story, on-demand generation costs roughly **$0.02–$0.20 per story** depending on quality tier.

### COPPA compliance is non-negotiable

The updated June 2025 COPPA rule (compliance deadline: **April 22, 2026**) expands requirements significantly. Voice recordings are now classified as biometric data requiring verifiable parental consent. AI training on children's data requires **separate consent** beyond standard data collection consent. The app must use Anthropic's **Zero Data Retention (ZDR)** option for all API calls involving student data. Child profiles should use anonymized IDs with PII stored separately. No third-party analytics SDKs that collect device identifiers from children. Penalties reach **$53,088 per violation**.

---

## Technical architecture for Nuxt 4 with Supabase

### Application structure

Nuxt 4.4 (stable since July 2025) provides the foundation. The **@nuxt/ui v4** module — now free with 110+ components — eliminates most UI development. Supabase handles auth, database, and file storage in a single service with a generous free tier. The app uses a hybrid rendering strategy: SSR for the landing page and story listings (SEO, fast load), CSR for the reading interface and practice screens (heavy audio/interaction, offline capability).

The data model centers on five core tables: `child_profiles` (linked to parent auth), `phonics_units` (scope and sequence), `srs_cards` (FSRS scheduling fields: state, difficulty, stability, due date), `stories` (structured content with word arrays, illustration URLs, TTS speech marks), and `reading_sessions` (accuracy, fluency scores, miscues, recording URLs). Supabase Row Level Security enforces that parents can only access their own children's data.

### Text-to-speech with word highlighting

For MVP, the **Web Speech API** is the right choice: free, no API keys, works offline, and provides `onboundary` events for word-level highlighting. Set `utterance.rate = 0.8` for age-appropriate pacing. The component renders each word as a clickable `<span>` — the currently spoken word gets a yellow highlight and slight scale animation, sight words display in purple bold.

For production, **Amazon Polly** offers the best word-level timestamp support via Speech Marks — a JSON array mapping each word to its millisecond offset in the audio file. AWS provides a complete reference implementation for highlight-synchronized playback. The generous free tier covers 1 million neural characters/month.

### Pronunciation assessment for reading aloud

**Azure Speech Services** is the clear winner for assessing children's oral reading. It provides word-level accuracy scores, automatic **miscue detection** (omission, insertion, mispronunciation), fluency and completeness scores, and even prosody evaluation. The SDK explicitly supports softer grading thresholds for child learners. Microsoft's own **Teams Reading Progress** uses the same technology. Pricing is approximately **$1.30/hour** (STT + pronunciation assessment), with a free tier of 5 hours/month.

For MVP, a simpler path: use **OpenAI Whisper** ($0.006/minute) for basic transcription, then compare the transcript against the expected text programmatically to calculate word accuracy and WCPM. Azure assessment integration is a Week 3 upgrade.

### SRS scheduling with ts-fsrs

The `ts-fsrs` npm package implements the FSRS-5 algorithm in TypeScript — the same algorithm powering modern Anki. Two functions handle the core logic: `f.repeat(card, new Date())` returns scheduling options for each rating, and a simple filter on `card.due <= now` retrieves cards due for review. SRS state persists to Supabase for cross-device sync, with Pinia persistence to IndexedDB for offline review sessions. A background sync process reconciles offline reviews when connectivity returns.

---

## A realistic two-week MVP sprint plan

The honest assessment: a principal architect with 20 years of experience can deliver a **functional, impressive reading app MVP in 14 days** — but AI story generation and pronunciation assessment are post-MVP features. The MVP proves the core experience; the AI pipeline comes in weeks 3–4.

### What's achievable vs. what's deferred

**Week 1–2 MVP includes:** Parent authentication via Supabase, child profile management (name, avatar, reading level, interests), a story reader with word-by-word TTS highlighting using Web Speech API, 5–10 hand-curated decodable stories, SRS flashcard review for sight words and phonics patterns using ts-fsrs, reading session tracking, a parent dashboard with progress visualization, and PWA installability on tablets.

**Deferred to weeks 3–6:** AI story generation pipeline, Azure pronunciation assessment, illustration generation, robust offline sync, gamification (streaks, badges, rewards), letter tracing, and admin content management.

### Day-by-day execution plan

**Days 1–3 (Foundation):** Scaffold Nuxt 4 project with all modules configured (@nuxt/ui, @nuxtjs/supabase, @vite-pwa/nuxt, @pinia/nuxt). Stand up Supabase project with complete schema migrations. Build login/signup flow and child profile CRUD. Seed phonics_units table with scope and sequence data. Create 5–8 structured stories in the database.

**Days 4–7 (Core reading experience):** Build the `useTTS` composable wrapping Web Speech API with `onboundary` word tracking. Implement the `WordHighlighter` component with per-word click-to-hear, sight word color coding, and animated highlighting. Create the full-screen reading layout with play/pause/restart, speed control, and page navigation. Integrate `ts-fsrs` for SRS scheduling. Build the card review UI (front → reveal → rate with 3 emoji buttons). Wire SRS cards to phonics data and sight word lists.

**Days 8–10 (Progress and recording):** Implement reading session tracking (start, complete, duration, mode). Build the parent dashboard with streak display, weekly session chart, SRS progress (due/new/mastered counts), and current reading level indicator. Add basic audio recording via MediaRecorder API with save to Supabase Storage.

**Days 11–14 (Polish and ship):** Configure PWA manifest, service worker caching for viewed stories and TTS audio. Polish child-facing UX with large touch targets, encouraging feedback animations, and avatar selection. Test extensively on iPad (the primary device). Fix audio edge cases across Chrome and Safari. Deploy to Vercel with Supabase production configuration.

### Time-saving technology choices

Five specific choices save days of development time: **@nuxt/ui v4** eliminates all component development (forms, modals, tables, charts — all free), **@nuxtjs/supabase** provides zero-config auth with built-in composables, **ts-fsrs** delivers production-grade SRS scheduling with a single import, **@vite-pwa/nuxt** adds installability with minimal configuration, and **Supabase itself** consolidates auth, database, storage, and realtime subscriptions into one service with a free tier sufficient for MVP.

---

## Conclusion: the intersection nobody has built yet

The children's literacy app market has a clean split: apps with strong pedagogy (reading.com, Lexia) lack AI personalization, while apps with adaptive technology (HOMER, Headsprout) lack true generative content. **The intersection — systematic synthetic phonics with AI-generated decodable stories personalized to each child's exact phonics level and interests — is unoccupied.**

The two-week MVP demonstrates the core reading experience: structured stories with synchronized TTS highlighting, SRS-powered phonics and sight word practice, and a parent dashboard with real progress data. This foundation is architecturally designed to absorb the AI generation pipeline in weeks 3–4, when Claude Haiku generates unlimited decodable stories at $0.005 each and Azure Speech Services enables independent read-aloud practice with automated miscue detection.

Three insights from this research deserve emphasis. First, the **programmatic validation layer** for AI-generated stories is more important than the generation itself — an LLM that produces a single word outside the child's learned phonics patterns teaches guessing, which is exactly what the Science of Reading movement exists to prevent. Second, **FSRS with child-adapted parameters** (3-button rating, shorter initial intervals, lower default ease factor) applies spacing science to reading in a way no current app implements. Third, the **decodable content exhaustion problem** — children reading the same 60 books repeatedly until engagement collapses — is the market's most consistent parent complaint and the problem AI generation is uniquely positioned to solve.
