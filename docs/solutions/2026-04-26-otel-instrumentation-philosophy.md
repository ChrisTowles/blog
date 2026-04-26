---
title: OpenTelemetry instrumentation philosophy — spans as wide events
date: 2026-04-26
tags: [observability, opentelemetry, anthropic, new-relic]
type: pattern
---

# Spans-as-wide-events for the Nuxt + Anthropic blog

The blog's OTel layer is built around one thesis: **spans are the primary observability primitive**. Logs are events on spans; metrics are derived from spans by New Relic NRDB. Borrowed from Boris Tané (Baselime, now Cloudflare) — paraphrased: *"OpenTelemetry is just a wide-event factory. If you look at it that way, you're winning."*

## The decision

- **One Nitro plugin** (`server/plugins/00-otel-sdk.ts`) initializes a `NodeSDK` with `getNodeAutoInstrumentations` (HTTP, pg, undici, dns…) and an OTLP/HTTP exporter at the New Relic endpoint. `instrumentation-fs` is explicitly disabled because Nuxt SSR makes it useless noise.
- **One middleware** (`server/middleware/01-trace-enrich.ts`) decorates the auto-generated HTTP server span with high-cardinality business attrs (`request.id`, `user.id`, `session.id`, `route.name`). It does **not** create a new span — auto-instrumentation already gave us a parent.
- **Manual spans** only at the LLM / tool / RAG / MCP seams where there's no auto coverage. `server/utils/observability/anthropic.ts` provides `withAnthropicSpan` and `withAnthropicStreamSpan` for every Anthropic SDK call site. The same helpers wrap Gemini via `{ provider: 'google.gemini' }`.
- **The evlog bridge** (`server/utils/observability/evlog-bridge.ts`) routes every existing `evlog.*` call into `span.addEvent(name, attrs)` when an active span exists. No per-call refactor needed; the 36 existing call sites continue to compile and run.

## The non-obvious rules (most likely to be re-discovered the hard way)

### 1. Sum `gen_ai.usage.input_tokens` with cache fields

Anthropic returns `input_tokens`, `cache_read_input_tokens`, and `cache_creation_input_tokens` separately. The OTel GenAI semconv says `gen_ai.usage.input_tokens` should be the **sum** of all three, with the cache breakdowns also emitted as `gen_ai.usage.cache_read.input_tokens` / `gen_ai.usage.cache_creation.input_tokens` for analysis. Naive instrumentation under-reports prompt-cache-heavy workloads (like the RAG ingest contextual descriptions) by 90%+.

`applyUsageAttrs(span, response.usage)` in `anthropic.ts` enforces this; do not bypass it.

### 2. Stream-span lifetime ≠ HTTP request lifetime

For SSE streams, the span must end when the *stream* emits `finalMessage` / `error` / `end`, not when the synchronous `client.messages.stream(...)` call returns. Otherwise streaming chats look like 50ms requests in NR.

`withAnthropicStreamSpan` attaches all three listeners and uses an `ended` guard so duplicate-firing is idempotent.

### 3. New Relic OTLP limits to respect

- Attribute string values capped at **4095 chars** (truncate to ≤2000 to leave headroom).
- **128 attributes per span**, **64 resource attributes**, **1 MB payload** per OTLP batch.
- Use `api-key: <license_key>` header (NOT `Authorization`).
- Prefer HTTP/protobuf over gRPC — friendlier to Cloud Run egress and explicitly recommended by NR.

### 4. SIGTERM `sdk.shutdown()`, not `forceFlush`

Cloud Run gives ~10s after SIGTERM before SIGKILL. Without `sdk.shutdown()`, the BatchSpanProcessor's last batch dies in the buffer. `forceFlush()` alone leaves the SDK alive. The plugin wires both `nitroApp.hooks.hookOnce('close', shutdown)` and `process.once('SIGTERM', shutdown)`.

### 5. Don't double-log

Boris's anti-pattern: separate `console.log` + `evlog.info` + `span.addEvent` for the same event. Pick one channel. Here, the evlog bridge collapses logs into span events when a span is active. New Relic charges per signal — duplicating costs money and adds query noise.

### 6. `K_REVISION` fallback to `dev-${pid}`

Cloud Run auto-injects `K_REVISION`. In `pnpm dev`, `K_REVISION` is unset and naive code produces the literal string `"undefined"` as `service.instance.id`. The plugin falls back to `dev-${process.pid}` so dev sessions still get a meaningful instance label.

### 7. `gen_ai.*` semconv over custom `ai.*` keys

New Relic and the broader ecosystem render GenAI traces using `gen_ai.provider.name`, `gen_ai.operation.name`, `gen_ai.request.model`, `gen_ai.usage.*`. Rolling custom names loses the AI Monitoring view. Per the current Anthropic semconv: `gen_ai.provider.name = "anthropic"` (not `gen_ai.system`). Span name format: `${operation} ${model}`.

## What's deliberately not in scope

- The standalone `mcp/` package (Cloud Run service `sandbox.towles.dev`) needs its own SDK init.
- No tail-sampling Collector. AlwaysOn at the SDK is fine for current personal-blog traffic.
- No `instrumentation-fs` (turn back on only if a specific file-IO question matters).
- No application-level metrics. Span data → NR-derived metrics is sufficient.

## References

- Boris Tané — *Observability wide events 101* (2024-09-07)
- Baselime — *Logging at scale with canonical log lines*
- OTel — GenAI semantic conventions: `https://opentelemetry.io/docs/specs/semconv/gen-ai/`
- New Relic OTLP best practices: `https://docs.newrelic.com/docs/opentelemetry/best-practices/opentelemetry-otlp/`
- Repo: `packages/blog/server/plugins/00-otel-sdk.ts`, `packages/blog/server/utils/observability/`
