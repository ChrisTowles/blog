# Hosting & Deployment

Cloudflare Workers. Moved from GCP Cloud Run + Cloud SQL (see [cloudflare-migration.md](cloudflare-migration.md) for the decisions and [cloudflare-cutover.md](cloudflare-cutover.md) for the runbook).

## Architecture

- **Blog Worker** (`towles-blog`): Nuxt 4 on Nitro `cloudflare_module` with Workers Static Assets and `nodejs_compat`. Config: `packages/blog/wrangler.jsonc`.
- **Sandbox Worker** (`towles-sandbox`): MCP Apps iframe host on `sandbox.towles.dev` / `stage-sandbox.towles.dev`. Isolated origin is required by SEP-1865, and a separate Worker keeps a blog bug away from the iframe surface. Config: `mcp/wrangler.jsonc`.
- **D1**: SQLite database for everything, including FTS5 keyword search.
- **Vectorize**: 1024-dim cosine index for RAG.
- **Workers AI**: embeddings and reranking.
- **AI Gateway** (`towles-blog`): Claude calls go through it (BYOK).
- **R2**: `towles-blog-media` for TTS audio and aviation Parquet.
- **Container** (`AviationContainer`, built from `services/aviation/Dockerfile`): DuckDB reading Parquet from R2 over the S3 API.
- **Rate Limiting binding**: replaces the in-memory MCP limiter.
- **DNS**: Cloudflare zone `towles.dev`. Wrangler creates the custom-domain records when a Worker deploys. Terraform (`infra/terraform-cloudflare`) manages no records today.

## Environments

| Env        | Blog Worker           | Hostname                  | Sandbox host               |
| ---------- | --------------------- | ------------------------- | -------------------------- |
| production | `towles-blog`         | `chris.towles.dev`        | `sandbox.towles.dev`       |
| staging    | `towles-blog-staging` | `stage-chris.towles.dev`  | `stage-sandbox.towles.dev` |
| dev        | `towles-blog-dev`     | `localhost` (local state) | `sandbox.localhost:8081`   |

Staging has its own D1 (`towles-blog-staging`), R2 bucket (`towles-blog-media-staging`) and Vectorize index (`towles-blog-rag-staging`). The `dev` env is local only: it omits AI and Vectorize because wrangler cannot open remote sessions for them offline.

Account `baf9cdac6eb4d8c477d85ceccae6679d` also holds legacy `blog` / `blog-preview` Workers and D1 databases from 2025. Leave them alone.

## Deploy

CI deploys on every merge to `main` (`.github/workflows/deploy.yml`): test, build once, then staging (D1 migrations, blog Worker, sandbox Worker, smoke test), then production the same way. Staging and production are GitHub environments, so production can carry protection rules.

Manual deploy needs Docker running (the container image builds locally) and `CLOUDFLARE_API_TOKEN` in the environment:

```bash
pnpm cf:deploy:staging   # build, blog + sandbox Workers to staging
pnpm cf:deploy           # build, blog + sandbox Workers to production
pnpm cf:migrate:staging  # D1 migrations, remote staging
pnpm cf:migrate          # D1 migrations, remote production
pnpm cf:tail:staging     # live logs
pnpm cf:tail             # live logs
```

`cf:deploy*` does not run migrations. Run `cf:migrate*` first when a migration is part of the change.

## CI credentials

Repo secrets used by `deploy.yml`:

| Secret                  | Used for                                  |
| ----------------------- | ----------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | wrangler deploy, D1 migrations, Terraform |
| `CLOUDFLARE_ACCOUNT_ID` | wrangler account selection                |

```bash
gh secret set CLOUDFLARE_ACCOUNT_ID --body baf9cdac6eb4d8c477d85ceccae6679d
```

The API token needs these permissions (create at dash.cloudflare.com > My Profile > API Tokens):

- Account: Workers Scripts (Edit)
- Account: D1 (Edit)
- Account: Workers R2 Storage (Edit)
- Account: Vectorize (Edit)
- Account: Cloudchamber (Edit), required for Containers
- Account: Workers AI (Read)
- Account: AI Gateway (Edit)
- Account: Account Settings (Read)
- Zone `towles.dev`: DNS (Edit), Workers Routes (Edit), Zone (Read). Custom domains write DNS records, and the Terraform stack reads the zone.

## Worker secrets

Secrets are per environment and live in Cloudflare, not in CI. Set them once, from `packages/blog`, with `--env staging` for staging and no flag for production:

```bash
cd packages/blog
for name in ANTHROPIC_API_KEY NUXT_SESSION_PASSWORD NUXT_OG_IMAGE_SECRET \
  NUXT_OAUTH_GITHUB_CLIENT_ID NUXT_OAUTH_GITHUB_CLIENT_SECRET \
  NUXT_OAUTH_GOOGLE_CLIENT_ID NUXT_OAUTH_GOOGLE_CLIENT_SECRET \
  BRAINTRUST_API_KEY OTEL_EXPORTER_OTLP_HEADERS \
  GOOGLE_TTS_KEY ADMIN_SEED_TOKEN; do
  pnpm exec wrangler secret put "$name" --env staging
done
pnpm exec wrangler secret list --env staging
```

| Secret                                       | Notes                                                                 |
| -------------------------------------------- | --------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`                          | Direct fallback if AI Gateway streaming misbehaves                    |
| `NUXT_SESSION_PASSWORD`                      | 32+ characters; `openssl rand -base64 32`                             |
| `NUXT_OG_IMAGE_SECRET`                       | `npx nuxt-og-image generate-secret`                                   |
| `NUXT_OAUTH_GITHUB_*`, `NUXT_OAUTH_GOOGLE_*` | One OAuth app per environment; callback `https://<host>/api/auth/...` |
| `BRAINTRUST_API_KEY`                         | `BRAINTRUST_PROJECT_NAME` is a plain var                              |
| `OTEL_EXPORTER_OTLP_HEADERS`                 | `api-key=<New Relic license key>`                                     |
| `GOOGLE_TTS_KEY`                             | Chirp3 REST key for typing audio                                      |
| `ADMIN_SEED_TOKEN`                           | Guards admin seed/ingest endpoints                                    |

The Anthropic key can also live in AI Gateway as a BYOK provider key; the Worker secret remains the fallback path. Non-secret values (`R2_BUCKET`, public config) are `vars` in `wrangler.jsonc`.

Local dev reads `.env` (see `.env.example`). `wrangler dev --env dev` reads `packages/blog/.dev.vars.dev`, which replaces `.dev.vars` when it exists.

## Rollback

`pnpm --filter @chris-towles/blog exec wrangler rollback` returns to the previous Worker version. GCP hosting was decommissioned on 2026-10-11, so there is no infrastructure to fail back to; the final Cloud SQL exports and GCS buckets are in the private R2 bucket `towles-blog-archive` (`gcp-final-2026-10-11.tar.gz`).

## Terraform

DNS only: `infra/terraform-cloudflare`. It has no resources today because Wrangler owns the Worker custom-domain records, so it keeps local state. Details: [infra/terraform-cloudflare/README.md](../infra/terraform-cloudflare/README.md).

## Analytics

Google Analytics 4 via `nuxt-gtag`. The measurement ID is a build-time value (`NUXT_PUBLIC_GTAG_ID` in `deploy.yml`). See [Analytics docs](analytics.md) for property/stream details and custom events.

## Cost

About $5-8/month for both environments. Workers Paid ($5) covers both blog Workers, the sandbox Workers, D1, Vectorize, R2 and Workers AI at this traffic; the aviation container bills only while it runs (sleeps after idle). Claude usage is billed by Anthropic regardless of host. Check Cloudflare billing after the first month and note any drift here.
