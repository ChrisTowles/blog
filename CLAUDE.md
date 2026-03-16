# Blog

Personal blog/website - Vue/Nuxt monorepo + AI playground.

## Project Structure

```
packages/
├── blog/           # Main Nuxt 4 and Nuxt UI application (content/, server/database/)
│   ├── app/        # Client-side: components, composables, pages
│   ├── server/     # Server-side: API routes, utils, database
│   └── shared/     # Types shared between client and server
├── slides/         # Slidev presentations
infra/              # infrastructure
    container/       # block docker files
    aws_cloudformation/ # AWS Bedrock and IAM
    terraform/          # GCP Cloud Run and Cloud SQL
```

## Hosting

- **GCP Cloud Run** — production hosting, Cloud SQL (PostgreSQL)
- **Cloudflare** — DNS only (no longer used for Workers/hosting)
- Deploy: `pnpm gcp:prod:deploy` / `pnpm gcp:staging:deploy`

## Commands

```bash
pnpm dev          # Dev server (with remote storage)
pnpm build        # Build all packages
pnpm test         # Vitest
pnpm test:integration  # Integration tests (requires running PostgreSQL)
pnpm lint         # oxlint
pnpm typecheck    # TypeScript checks
pnpm gcp:prod:deploy   # Build container + deploy to GCP prod (needs terraform & gcloud)
pnpm gcp:staging:deploy # Build container + deploy to GCP staging
```

## AI Features

The blog includes several AI-powered features built on the Anthropic SDK:

- **Chat** (`/chat`) — Conversational AI with tool use (search blog, weather, dice), code execution, and document generation (PDF/PPTX/XLSX/DOCX via Skills API). Server-streamed via SSE. See `server/api/chats/`.
- **Artifacts** — Interactive code execution embedded in blog posts via `::code-runner` MDC component. Uses Anthropic's Code Execution Tool (beta) to run code in isolated containers. See `server/api/artifacts/` and `app/components/CodeRunner.vue`.
- **RAG** — Blog content is chunked and embedded for semantic search. See `server/utils/rag/`.
- **Reading** (`/reading`) — AI-powered reading app for struggling readers. Phonics-constrained story generation (Claude Haiku), Gemini illustrated stories, spaced repetition (ts-fsrs), TTS word highlighting, guided reading with speech recognition. See `server/api/reading/`, `server/utils/reading/`, `app/pages/reading/`.

## Printable Worksheets

HTML sources in `packages/blog/public/downloads/kids/`. Generate PDFs:

```bash
cd packages/blog/public/downloads/kids
for f in *.html; do google-chrome --headless=new --print-to-pdf="${f%.html}.pdf" --print-to-pdf-no-header --no-pdf-header-footer --disable-gpu "$f"; done
```

Hero image screenshots (use CLI, not DevTools — avoids dark mode issues):

```bash
google-chrome --headless=new --screenshot=output.png --window-size=1200,800 --default-background-color=ffffffff file.html
```

## Verification

After implementing features, verify with the full stack — not just unit tests:

1. `pnpm test` — unit tests pass
2. `pnpm lint` + `pnpm typecheck` — no errors
3. `pnpm test:integration` — integration tests pass (needs `DATABASE_URL`)
4. **Start dev server** (`pnpm dev`) and verify the feature works in a real browser
5. `pnpm test:e2e` — E2E Playwright tests pass against the running dev server (uses `UI_PORT` from `.env`)
6. Take a screenshot (`npx playwright screenshot http://localhost:$UI_PORT/<page> /tmp/screenshot.png`) to visually confirm

Don't claim a feature works without steps 4-6. Automated tests miss rendering issues, broken layouts, and SSE streaming bugs that only surface in a real browser.

**Always self-verify with Playwright screenshots.** After starting the dev server, use `npx playwright screenshot` to check pages yourself — don't rely on the user to confirm visually. If Nuxt Content shows no blog posts (`_content_posts` table missing), delete `.nuxt` and `.data` directories and restart.

**Never accept pre-existing test failures.** When E2E, integration, or unit tests fail — even if the failures appear unrelated to your current work — fix them immediately. Every test in the suite must pass. Broken tests are not "pre-existing conditions" to work around; they are bugs to fix as soon as discovered.

## Pre-commit Hooks

- Image compression requires `pngquant` (`sudo apt-get install pngquant`)

## References

- [GCP: Hosting](docs/hosting.md)
- [Terraform Details](infra/terraform/README.md)
