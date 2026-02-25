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
5. `UI_PORT=3000 pnpm test:e2e` — E2E Playwright tests pass against the running dev server
6. Take a screenshot (`npx playwright screenshot http://localhost:3000/<page> /tmp/screenshot.png`) to visually confirm

Don't claim a feature works without steps 4-6. Automated tests miss rendering issues, broken layouts, and SSE streaming bugs that only surface in a real browser.

## Pre-commit Hooks

- Image compression requires `pngquant` (`sudo apt-get install pngquant`)

## References

- [GCP: Hosting](docs/hosting.md)
- [Worktree Development](scripts/worktree.ts) - `./scripts/worktree.ts create <issue#>`
- [Terraform Details](infra/terraform/README.md)
