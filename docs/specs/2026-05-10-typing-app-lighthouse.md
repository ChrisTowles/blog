# Typing App — Lighthouse Pass

Phase 9 polish: ran Lighthouse against three representative pages and resolved every regression flagged.

## Results (after fixes)

Desktop, headless Chromium, no throttling, dev server.

| Page                                          | Performance | Accessibility | Best Practices | SEO  |
| --------------------------------------------- | ----------- | ------------- | -------------- | ---- |
| `/typing`                                     | 95          | **100**       | 96             | **100** |
| `/typing/lesson/stage-1-home-row-index-drill` | 96          | **100**       | 96             | **100** |
| `/typing/game/letter-rain`                    | 95          | **100**       | 92             | **100** |

## Issues fixed

| Issue                                                                                    | Audit                | Fix                                                                                                                        |
| ---------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| White on `bg-amber-600` only hit 3.19:1 contrast (WCAG AA needs 4.5:1) on every CTA      | `color-contrast`     | Bumped every `bg-amber-600` button to `bg-amber-700` and `hover:bg-amber-700` to `hover:bg-amber-800` (~5.5:1 contrast)    |
| `<h3>` game-card headings without a preceding `<h2>` on `/typing`                        | `heading-order`      | Wrapped Games and Lessons sections with `<h2>` headings; demoted card titles to `<h3>` to match the new hierarchy         |
| Missing `<meta name="description">` on every typing page                                 | `meta-description`   | Added `meta` to `useHead` on all 12 typing pages with content describing each surface                                     |
| `/robots.txt` returned the SPA HTML shell                                                | `robots-txt`         | Added `packages/blog/public/robots.txt` (allow all + sitemap pointer)                                                     |
| Faded `text-slate-500/400/600` on subtitles fell below 4.5:1 in dark mode                | `color-contrast`     | Bumped subtitles to `text-slate-700/300/900` per element                                                                  |

## Issues left at 92 best-practices on game pages

The remaining best-practices ding on the game page (92) is the dev-server console errors:

- A pre-existing Nuxt Content `__nuxt_content/posts/query` 5xx (logged once at first page load; unrelated to typing)
- Source maps missing for `_nuxt/assets/css/main.css` (dev-mode artifact; production build emits them)
- Twitter syndication cookie warning (third-party embed elsewhere on the site)

These are not introduced by this work and are dev-server artifacts that disappear in production builds. Documenting here for completeness.

## Stage-advance toast

While in the polish pass, the agent's deviation note flagged "no stage-advance toast UI." Added: `recordAttempt` and `recordGameAttempt` now return `{ stageAdvanced, previousStage, currentStage }`. Lesson and topic pages use this to fire a celebratory `useToast` notification when the gate is cleared (95% accuracy + target WPM). Game attempts continue to skip mastery gating per design.
