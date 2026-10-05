# Plan: Ship evlog `exclude` Fix and Harden the New Relic/OTLP Integration

**Date:** 2026-04-25
**Branch:** `claude/ecstatic-ishizaka-de9d68` (parent: `feat/new-relic-otel`)
**Status:** Phase 1 ready to ship; phases 2–4 follow-up

## Background

`evlog/nuxt`'s `exclude` config (set in `nuxt.config.ts`) was being silently dropped in
Nuxt dev mode. Every request — including high-volume `/api/_nuxt_icon/**` calls — was
exporting to OTLP.

**Root cause:** `evlog`'s Nitro plugin reads its config via dynamic imports of
`nitropack/runtime/internal/config` (and fallbacks). In Nuxt dev mode those imports
fail (`Cannot find package 'nitropack' imported from .nuxt/dev/index.mjs`), so
`evlogConfig` resolves to `undefined`, and `shouldLog(path, undefined, undefined)`
returns `true` for every path.

**Fix applied:** Set `process.env.__EVLOG_CONFIG = JSON.stringify(options)` in
`nuxt.config.ts` before `defineNuxtConfig(...)`. That's the plugin's first
resolution step (env var) and works in both dev and prod. See
`packages/blog/nuxt.config.ts:14-23`.

**Verification (already done in this session):**

- Reproduced with a tiny Node OTLP sink on `:4318`, `OTEL_EXPORTER_OTLP_ENDPOINT`
  pointing at it, and `curl http://localhost:3001/`. Before fix: 5 `_nuxt_icon`
  records hit the sink. After fix: 0.
- Other routes (`/`, `/api/_auth/session`, `/__nuxt_content/*`) continue to log
  normally.
- Service tag flipped from `[app]` (default) to `[blog]` (from `env.service`),
  confirming the env-var path is now the one being read.

---

## Phase 1 — Ship the immediate fix (this branch)

1. **Commit the worktree change** with conventional-commit scope.
   - Subject: `fix(evlog): work around dev-mode config drop so exclude takes effect`
   - Body covers: root cause (broken dynamic imports in `.nuxt/dev/index.mjs`),
     why `__EVLOG_CONFIG` is the workaround, and the verification (sink
     reproduction with before/after counts).
2. **Verify production behavior.** Set `OTEL_*` env, run
   `pnpm build && node .output/server/index.mjs`, curl `/`, confirm icon paths
   still excluded. The `process.env.__EVLOG_CONFIG` path works in prod too, but
   worth proving with the same sink reproducer.
3. **Open PR** with the title above and a body that includes the before/after
   sink output as evidence.

## Phase 2 — Harden the workaround

4. **Add a regression test.** Unit test in `packages/blog/nuxt.config.test.ts`
   that imports the config and asserts `process.env.__EVLOG_CONFIG` is set with
   `JSON.parse` round-tripping the expected `exclude` array. This catches a
   future refactor that moves the config inline back into `defineNuxtConfig`
   and silently re-breaks dev exclude.
5. **Decide the upstream story.** Two options:
   - File an issue at github.com/HugoRCD/evlog with the repro: Nuxt 4 + Nitro 2
     dev mode → `nitropack/runtime/internal/config` not resolvable from
     `.nuxt/dev/index.mjs`. Suggest the plugin fall back to reading
     `useRuntimeConfig()` injected at module setup time, or use
     `addServerImports` to bind config at build time instead of dynamic-import
     at runtime.
   - If accepted upstream, plan a follow-up commit to drop the workaround once
     we bump evlog.
6. **Document the gotcha** in `packages/blog/CLAUDE.md` under Gotchas:
   "evlog `exclude`/`include` are silently dropped in dev unless you set
   `process.env.__EVLOG_CONFIG` from `nuxt.config.ts` — see fix in
   `nuxt.config.ts`."

## Phase 3 — Tie back to the New Relic/OTLP work on `feat/new-relic-otel`

7. **Audit other evlog config fields** (`sampling`, `routes`, `include`, etc.).
   Same dev-mode resolution failure means none of them work either. Confirm
   with the sink whether `routes: { '/api/**': { service: 'api' } }` and
   `sampling.rates` survive the dev path. If they don't, the same
   `__EVLOG_CONFIG` envelope already covers them — just need to add to the
   `evlogOptions` object.
8. **Sweep `packages/blog/server/plugins/evlog-otlp.ts` for quiet failure
   modes.** Missing endpoint logs as `console.error` and silently no-ops; partial
   config could ship the wrong service name. Add a startup log so we can see
   in dev/prod that the OTLP drain attached and which endpoint it's hitting.
9. **Add per-environment routing.** Production should hit New Relic OTLP;
   dev/staging probably shouldn't. Wire via `OTEL_EXPORTER_OTLP_ENDPOINT`
   (already supported) and confirm Cloud Run env vars are configured in
   `infra/terraform/`.

## Phase 4 — Observability follow-ups (optional, surface for choice)

10. **Add dashboards / alerts** in New Relic for: request rate by route,
    p50/p95 latency, error rate, RAG retrieval latency, Anthropic API call
    latency (already tagged via Braintrust — worth correlating).
11. **Trim noisy log fields.** OTLP export stringifies the entire event body
    — large RAG payloads, message contents, etc. could blow up retention costs.
    Add an enricher that drops fields above a size threshold.
12. **Sampling for high-volume routes.** Once `sampling.rates` is verified
    working (Phase 3 step 7), set `info: 10` for `/__nuxt_content/**` so we get
    representative coverage without flooding.

---

## Sequencing recommendation

- **Now:** Phase 1 (commit + PR). Small, unblocks everything else.
- **Next session:** Phases 2–3 together — they share context with the upstream
  evlog investigation and the OTLP plugin sweep.
- **Separate scope:** Phase 4 is dashboard/policy work that warrants its own
  ticket.
