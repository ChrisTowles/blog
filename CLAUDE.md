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

## Multi-Instance Development

Use git worktrees to run multiple Claude instances in parallel, each working on a separate issue with isolated ports and databases.

### Worktree Script

The `scripts/worktree.ts` manager handles creation, slot allocation, and environment setup:

```bash
pnpm worktree                    # Interactive mode — shows slots, issues, prompts for action
pnpm worktree init               # First-time setup — creates config dir and slot definitions
pnpm worktree create <issue#>    # Create worktree from GitHub issue (auto-names branch)
pnpm worktree create <branch>    # Create worktree from branch name
pnpm worktree list               # Show all slots and their status
pnpm worktree delete <issue#>    # Remove worktree and free its slot
pnpm worktree delete <issue#> --stash   # Stash changes before deleting
```

### How It Works

1. **Slots** — Pre-configured in `blog-worktrees/config/slots.config.jsonc` with unique `UI_PORT`, `DB_PORT`, and `DATABASE_URL` per slot (up to 5 parallel worktrees).
2. **Naming** — `pnpm worktree create 108` fetches the issue title from GitHub and creates branch `feature/108-<slug>` with worktree dir `108-<slug>`.
3. **Environment** — `.env.template` in the config dir is processed per slot, substituting slot-specific ports and copying shared secrets (API keys, OAuth) from the root repo's `.env` files.
4. **Location** — Worktrees live in `../blog-worktrees/` (sibling to the main repo), not inside the repo.

### Coordination Guidelines

- Each worktree gets its own Docker Compose stack (unique DB port) so instances don't collide.
- Rebase onto `origin/main` before starting work — the script prompts for this if the branch is behind.
- Avoid editing the same files in multiple worktrees to minimize merge conflicts.
- Run `pnpm worktree list` to see which slots/ports are in use before creating a new one.

## Pre-commit Hooks

- Image compression requires `pngquant` (`sudo apt-get install pngquant`)

## References

- [GCP: Hosting](docs/hosting.md)
- [Worktree Development](scripts/worktree.ts) — `pnpm worktree create <issue#>`
- [Terraform Details](infra/terraform/README.md)
