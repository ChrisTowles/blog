# Blog

Personal blog/website - Vue/Nuxt monorepo + AI playground.

## Project Structure

```
packages/
├── blog/           # Main Nuxt 4 and Nuxt UI application (content/, server/database/)
│   ├── app/        # Client-side: components, composables, pages
│   ├── server/     # Server-side: API routes, utils, database
│   └── shared/     # Types shared between client and server
├── layers/         # Nuxt layers (typing, workflows)
mcp/                # MCP Apps (SEP-1865) iframe host — separate Cloud Run service at sandbox.towles.dev
infra/              # infrastructure
    container/       # block docker files (blog.Dockerfile, mcp.Dockerfile)
    aws_cloudformation/ # AWS Bedrock and IAM
    terraform/          # GCP Cloud Run, Cloud SQL, and Cloudflare DNS (blog hosting stack)
    gcp-billing/        # GCP spend-cap kill-switch + BigQuery export (separate stack)
```

## Hosting

- **GCP Cloud Run** — production hosting, Cloud SQL (PostgreSQL)
- **Cloudflare** — DNS only (no longer used for Workers/hosting)
- **CI deploys automatically** on merge to `main` — no manual deploy needed
- Manual deploy (if needed): `pnpm gcp:prod:deploy` / `pnpm gcp:staging:deploy`

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
pnpm etl:aviation      # Download aviation datasets → Parquet → GCS (loads .env)
```

## CLI Scripts

Scripts in `packages/blog/scripts/` use **citty** for CLI structure (args, help, subcommands) and **consola** for formatted output (icons, colors, boxes). When adding new scripts:

- Wrap the entrypoint with `defineCommand` + `runMain` from `citty`
- Use `consola.start()`, `consola.success()`, `consola.warn()`, `consola.error()`, `consola.info()`, `consola.box()` instead of raw `console.log`
- Both are unjs ecosystem packages — citty for structure, consola for output

## AI Features

The blog includes several AI-powered features built on the Anthropic SDK:

- **Chat** (`/chat`) — Conversational AI with tool use (search blog, weather, dice), code execution, and document generation (PDF/PPTX/XLSX/DOCX via Skills API). Server-streamed via SSE. See `server/api/chats/`.
- **Artifacts** — Interactive code execution embedded in blog posts via `::code-runner` MDC component. Uses Anthropic's Code Execution Tool (beta) to run code in isolated containers. See `server/api/artifacts/` and `app/components/CodeRunner.vue`.
- **RAG** — Blog content is chunked and embedded for semantic search. See `server/utils/rag/`.
- **Typing** (`/typing`) — Kid-friendly, game-based typing tutor. 20-stage curriculum, virtual keyboard with finger hints, PixiJS games (Letter Rain, Letter Tic-Tac-Toe, Lake Leap), AI topic-themed lessons (Claude Haiku), weekly spelling-list import with Claude vision. Multi-guardian families/classrooms, anonymous-first progress with localStorage merge on sign-in. Optional Google Cloud TTS Chirp3 audio with on-disk cache + Web Speech fallback. Curriculum mastery gates advance the stage at >= 95% accuracy + target WPM. See `packages/layers/typing/`.

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

**Always self-verify with Playwright screenshots.** After starting the dev server, use `npx playwright screenshot` to check pages yourself — don't rely on the user to confirm visually.

If Nuxt Content serves an empty page (`no such table: _content_index` / `_content_posts` in the dev log), clear the caches and regenerate types before restarting:

```bash
rm -rf packages/blog/.nuxt packages/blog/.data
pnpm --filter @chris-towles/blog exec nuxt prepare  # regenerates .nuxt/tsconfig.app.json
pnpm dev
```

The `nuxt prepare` step is not optional. `pnpm dev` runs `ui-bundle:build` first, and that Vite build reads `.nuxt/tsconfig.app.json` — which the `rm -rf` just deleted. Skip it and the dev server dies with `Tsconfig not found`, which looks unrelated to the cache clear that caused it.

**What actually causes it: running `nuxt typecheck` while a dev server is up.** Typecheck regenerates `.nuxt`; the dev server reloads mid-write and a native addon (better-sqlite3 / duckdb) aborts the process — `terminate called after throwing an instance of 'Napi::Error'`, core dumped. It comes back missing the content tables, and because `index.vue` is wrapped in `v-if="page"` the home page renders blank, so it looks like a content bug rather than a crash.

Pre-commit used to run `pnpm typecheck` on every commit, which killed the dev server routinely. It now runs `pnpm typecheck:precommit` (`scripts/typecheck-precommit.ts`), which skips typecheck when something is listening on `UI_PORT`. CI typechecks every push and PR, so this stays enforced. Two approaches were tried and rejected, both documented in that script: detecting the server by process name (`pgrep -f "nuxt.mjs dev"` matches the hook's own shell), and giving typecheck its own `buildDir` (a fresh build dir makes nuxt-og-image emit an empty template union, so `defineOgImage('SaaS', ...)` fails as `never`).

So: don't run `pnpm typecheck` by hand with `pnpm dev` running. Stop the server first, or let CI do it.

**Never accept pre-existing test failures.** When E2E, integration, or unit tests fail — even if the failures appear unrelated to your current work — fix them immediately. Every test in the suite must pass. Broken tests are not "pre-existing conditions" to work around; they are bugs to fix as soon as discovered.

## Pre-commit Hooks

- Image compression requires `pngquant` (`sudo apt-get install pngquant`)
- `oxfmt --write` + `nuxt typecheck` run pre-commit and can modify working-tree files after `git commit`
- `oxlint --fix` + `oxfmt --write` run via lint-staged on staged JS/TS/MD files. They reformat markdown tables, emphasis (`*x*` → `_x_`), and string quotes. Expect a follow-up commit to reach formatter fixed-point after edits to docs.
- Shell quoting: paths with `[param]` (Nitro routes) need quotes or `--` in git/bash commands — `git add -- 'path/[id].ts'`
- Use conventional commits with scopes: `feat(scope):`, `fix(scope):`, `style(scope):`, `chore(scope):`. Match existing scopes from `git log` (e.g., `gcp-billing`, `og-image`, `workflows`, `terraform`).

## References

- [GCP: Hosting](docs/hosting.md)
- [Terraform Details](infra/terraform/README.md)
- [GCP Spend-Cap Kill-Switch](infra/gcp-billing/README.md)

## Terraform

- Terraform state lives in GCS bucket `blog-towles-production-tfstate`, keyed per stack via `prefix` (e.g., `terraform/state` for blog hosting, `terraform/gcp-billing` for the kill-switch). New stacks should pick a new unique prefix rather than creating another bucket.
- Cloud Function source convention: upload zips to `${project_id}-functions` GCS bucket (each stack creates its own objects keyed by content hash). See `infra/terraform/modules/cost-scheduler/` and `infra/gcp-billing/pubsub_function.tf` for examples.
