# Cloudflare migration brief

Shared contract for every agent working on the GCP → Cloudflare move. Branch: `feat/cloudflare`. Plan: https://claude.ai/artifact/KKuRXwh7aLf8yrEjkmXPpZ

Hard cutover. No dual-write, no Postgres compatibility shims, no feature flags that keep the GCP path alive. Delete what the new path replaces.

## Decisions (final)

| Area                | Choice                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Runtime             | Nitro preset `cloudflare_module`, Workers Static Assets, `nodejs_compat`                                   |
| Database            | D1 (SQLite) via `drizzle-orm/d1` and `drizzle-orm/sqlite-core`; one fresh baseline migration               |
| Vectors             | Vectorize, 1024 dims, cosine                                                                               |
| Keyword search      | D1 FTS5 virtual table with `tokenize='trigram'`, kept in sync by SQLite triggers                           |
| Embeddings / rerank | Workers AI: `@cf/qwen/qwen3-embedding-0.6b` (1024-d) and `@cf/baai/bge-reranker-base` (verify ids in docs) |
| Claude              | Anthropic SDK pointed at AI Gateway (BYOK); fall back to direct Anthropic if streaming breaks              |
| Files               | R2 (TTS cache, aviation Parquet)                                                                           |
| Aviation            | Cloudflare Container running DuckDB, reading Parquet from R2 over the S3 API                               |
| MCP                 | Stateless MCP handlers; Workers Rate Limiting binding replaces the in-memory limiter                       |
| Typing TTS          | Keep Google Chirp3 REST; cache audio in R2                                                                 |
| Typing data         | Single D1 database                                                                                         |
| IaC                 | `wrangler.jsonc` owns app resources; Terraform (Cloudflare provider v5) owns DNS only                      |
| Staging             | Separate `staging` env with its own D1, R2, Vectorize                                                      |

## Resource names

| Resource       | Production                               | Staging                                              |
| -------------- | ---------------------------------------- | ---------------------------------------------------- |
| Blog Worker    | `towles-blog`                            | `towles-blog-staging`                                |
| Sandbox Worker | `towles-sandbox`                         | `towles-sandbox-staging`                             |
| D1             | `towles-blog`                            | `towles-blog-staging`                                |
| R2             | `towles-blog-media`                      | `towles-blog-media-staging`                          |
| Vectorize      | `towles-blog-rag`                        | `towles-blog-rag-staging`                            |
| AI Gateway     | `towles-blog`                            | `towles-blog`                                        |
| Hostnames      | `chris.towles.dev`, `sandbox.towles.dev` | `stage-chris.towles.dev`, `stage-sandbox.towles.dev` |

Account `baf9cdac6eb4d8c477d85ceccae6679d`. The account also holds legacy `blog` / `blog-preview` Workers and D1 databases from 2025: do not touch or reuse them.

## Bindings (same names in every env)

| Binding            | Type                                                 |
| ------------------ | ---------------------------------------------------- |
| `DB`               | D1                                                   |
| `MEDIA`            | R2                                                   |
| `VECTORIZE`        | Vectorize                                            |
| `AI`               | Workers AI                                           |
| `MCP_RATE_LIMITER` | Rate Limiting                                        |
| `AVIATION`         | Container (Durable Object class `AviationContainer`) |
| `ASSETS`           | Static assets                                        |

Read bindings from `event.context.cloudflare.env` (typed via `wrangler types`). `useDrizzle()` keeps its name and resolves the D1 binding from the current event (`useEvent()` with Nitro `experimental.asyncContext`).

## Rules for agents

- Work only inside your assigned scope; list anything you need changed elsewhere in your report instead of editing it.
- `nuxt.config.ts`, root and package `package.json`, `pnpm-lock.yaml` and `wrangler.jsonc` are owned by the foundation agent and then by the orchestrator. Others propose changes in their report.
- All anti-slop rules apply (`pnpm lint`). Never disable a rule or launder types. Prefer zod parsing and inference over casts.
- Comment budget applies (`pnpm lint:comments`): keep the why, delete narration.
- Never run `nuxt typecheck` while a dev server is running. Read-only `tsc --noEmit --incremental false -p packages/blog/.nuxt/tsconfig.server.json` is fine.
- No commands that create, change or delete Cloudflare or GCP resources. The orchestrator provisions and deploys.
- In a worktree, `pnpm install` runs `simple-git-hooks`, which fails with `ENOTDIR`. That failure is expected; ignore it.
- Commit your work on your worktree branch with conventional commits (`feat(cloudflare): ...`) and the `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` trailer.
