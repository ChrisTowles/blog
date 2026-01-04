# Braintrust Integration Implementation Plan

**Date:** 2026-01-03
**Goal:** Integrate Braintrust.dev observability wrapper for Anthropic client
**Strategy:** Minimal integration, single project, singleton wrapper, basic monitoring

---

## User Decisions

✅ **Project Structure:** Single project `blog-towles` (use tags for staging/prod)
✅ **Eval Strategy:** Keep Promptfoo only (Braintrust for observability)
✅ **Agent SDK:** Start with singleton wrapper (test auto-capture)
✅ **Monitoring:** Start minimal, add advanced alerts later

---

## Implementation Phases

### Phase 1: Dependencies & Configuration

**Goal:** Add Braintrust package and configure environment variables.

#### 1.1 Install Braintrust SDK
**File:** `packages/blog/package.json`
```bash
cd packages/blog
pnpm add braintrust
```

**Verify version:** Should install latest stable (likely `0.x.x`)

#### 1.2 Update Environment Schema
**File:** `packages/blog/server/utils/env-config.ts`

Add to `envSchema`:
```typescript
BRAINTRUST_API_KEY: z.string().min(1),
```

Add to `SENSITIVE_KEYS`:
```typescript
'BRAINTRUST_API_KEY'
```

#### 1.3 Update Environment Files
**Files:** `.env`, `.env.example`

Add:
```bash
BRAINTRUST_API_KEY=your_key_here
```

For `.env.example`, use placeholder:
```bash
BRAINTRUST_API_KEY=bt-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 1.4 Update Terraform Secrets (Production)
**Files:** `infra/terraform/environments/{staging,prod}/terraform.tfvars`

Add secret to Secret Manager:
```hcl
secrets = {
  # ... existing secrets
  "BRAINTRUST_API_KEY" = "sensitive"
}
```

**Note:** Actual secret value added via `gcloud` or Secret Manager UI, not in tfvars.

---

### Phase 2: Singleton Client Wrapper

**Goal:** Wrap existing Anthropic client with Braintrust observability.

#### 2.1 Modify Anthropic Client Singleton
**File:** `packages/blog/server/utils/ai/anthropic.ts`

**Current code:**
```typescript
import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const result = envSchema.parse(process.env)
    _client = new Anthropic({
      apiKey: result.ANTHROPIC_API_KEY
    })
  }
  return _client
}
```

**New code:**
```typescript
import Anthropic from '@anthropic-ai/sdk'
import { wrapAnthropic, initLogger } from 'braintrust'

let _client: Anthropic | null = null
let _logger: ReturnType<typeof initLogger> | null = null

function getBraintrustLogger() {
  if (!_logger) {
    const result = envSchema.parse(process.env)
    _logger = initLogger({
      projectName: 'blog-towles',
      apiKey: result.BRAINTRUST_API_KEY,
    })
  }
  return _logger
}

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const result = envSchema.parse(process.env)
    const rawClient = new Anthropic({
      apiKey: result.ANTHROPIC_API_KEY
    })

    // Wrap with Braintrust observability
    getBraintrustLogger()
    _client = wrapAnthropic(rawClient)
  }
  return _client
}
```

**Changes:**
1. Import `wrapAnthropic` and `initLogger` from `braintrust`
2. Add logger singleton (lazy initialization like client)
3. Wrap raw client before returning
4. Project name: `blog-towles` (single project per user decision)

**Impact:**
- All downstream code (`chats/[id].post.ts`, `rag/ingest.ts`, `provider-anthropic.ts`) auto-instrumented
- Zero changes required in consuming code

---

### Phase 3: Testing & Validation

**Goal:** Verify observability works across all usage patterns.

#### 3.1 Local Development Testing

**Test 1: Basic Chat (Streaming + Tool Use)**
1. Start local dev server: `pnpm dev:no-remote`
2. Navigate to chatbot UI
3. Send message: "What's the weather like today?"
4. Verify in Braintrust dashboard:
   - Trace appears in Logs section
   - Shows streaming request
   - Shows tool call to `getWeather`
   - Token counts captured (input/output/cached if any)

**Test 2: RAG Ingestion (Prompt Caching)**
1. Trigger content ingestion: `pnpm run ingest` (if command exists) OR use API endpoint
2. Verify in Braintrust dashboard:
   - `messages.create()` call logged
   - Prompt caching metrics visible (cached token counts)
   - System prompt + content blocks captured

**Test 3: Agent SDK Orchestration**
1. Trigger agent flow via `server/utils/ai/agent.ts` (e.g., via chatbot with complex query)
2. Verify in Braintrust dashboard:
   - Check if Agent SDK `query()` calls appear as traces
   - **If YES:** Singleton wrapper auto-captures Agent SDK → no further work
   - **If NO:** Add manual tracing in Phase 4 (deferred)

**Test 4: Evals (Promptfoo)**
1. Run existing evals: `cd packages/evals && pnpm test` (or similar)
2. Verify in Braintrust dashboard:
   - Eval runs appear as traces (from `provider-anthropic.ts`)
   - Tool use loops captured
   - Multi-turn conversations visible

#### 3.2 Validation Checklist

- [ ] Streaming requests logged correctly
- [ ] Tool calls captured (name, args, results)
- [ ] Token metrics accurate (input/output/cached)
- [ ] Prompt caching metrics visible
- [ ] Extended thinking blocks captured (if used)
- [ ] Multi-turn tool loops traced
- [ ] Cost tracking appears in dashboard
- [ ] Latency metrics recorded
- [ ] No performance degradation (compare request times before/after)
- [ ] No errors in logs (Braintrust SDK errors)

---

### Phase 4: Agent SDK Fallback (Conditional)

**Goal:** Add manual tracing if Agent SDK not auto-captured.

**Trigger:** Only if Test 3 (Phase 3.1) shows Agent SDK calls NOT appearing in Braintrust.

#### 4.1 Manual Tracing Wrapper
**File:** `packages/blog/server/utils/ai/agent.ts`

**Current code:**
```typescript
import { query } from '@anthropic-ai/claude-agent-sdk'

export function runAgent(options: AgentOptions): AsyncIterable<AgentMessage> {
  return query({ ... })
}
```

**New code (if needed):**
```typescript
import { query } from '@anthropic-ai/claude-agent-sdk'
import { traced } from 'braintrust' // Or use logger.traced()

export async function* runAgent(options: AgentOptions): AsyncIterable<AgentMessage> {
  // Manual tracing wrapper
  const span = logger.startSpan({
    name: 'agent.query',
    input: { prompt: options.prompt, model: options.model },
  })

  try {
    for await (const message of query({ ... })) {
      yield message
    }
    span.end({ output: { status: 'completed' } })
  } catch (error) {
    span.end({ error })
    throw error
  }
}
```

**Note:** This is a fallback—likely unnecessary if singleton wrapper works.

---

### Phase 5: Tagging & Metadata

**Goal:** Add metadata to traces for filtering/analysis.

#### 5.1 Environment Tags
**File:** `packages/blog/server/utils/ai/anthropic.ts`

Update logger init:
```typescript
_logger = initLogger({
  projectName: 'blog-towles',
  apiKey: result.BRAINTRUST_API_KEY,
  metadata: {
    environment: process.env.NODE_ENV || 'development',
    version: process.env.APP_VERSION || 'unknown',
  },
})
```

#### 5.2 Request-Level Tags (Optional)
**Files:** `server/api/chats/[id].post.ts`, etc.

Add tags to individual requests (if Braintrust supports per-request metadata):
```typescript
// Example: tag chat requests with user ID, topic
await client.messages.stream({
  model,
  // ... other params
  metadata: {
    userId: user.id,
    chatId: chatId,
  },
})
```

**Note:** Research Braintrust docs for per-request tagging API—may differ from above.

---

### Phase 6: Documentation & Rollout

**Goal:** Document integration, deploy to staging/prod.

#### 6.1 Update CLAUDE.md
**File:** `CLAUDE.md`

Add section:
```markdown
## Observability

**Braintrust.dev** integrated for LLM observability:
- All Anthropic API calls auto-logged via `wrapAnthropic()`
- Dashboard: https://www.braintrust.dev/app/blog-towles/logs
- Metrics: tokens, cost, latency, tool use
- Project: `blog-towles` (single project, tagged by environment)

**Local Development:**
- Set `BRAINTRUST_API_KEY` in `.env`
- Traces sent to Braintrust cloud automatically

**Production:**
- Secret managed via GCP Secret Manager
- Injected into Cloud Run containers
```

#### 6.2 Staging Deployment
1. Add `BRAINTRUST_API_KEY` to GCP Secret Manager (staging project)
2. Update terraform: `nr gcp:staging:apply`
3. Deploy: `nr gcp:staging:deploy`
4. Verify: Send test chat requests, check Braintrust dashboard
5. Monitor logs: `nr gcp:staging:logs` (check for Braintrust errors)

#### 6.3 Production Deployment
1. Add `BRAINTRUST_API_KEY` to GCP Secret Manager (prod project)
2. Update terraform: `nr gcp:prod:apply`
3. Deploy: `nr gcp:prod:deploy`
4. Verify: Send test chat requests, check Braintrust dashboard
5. Monitor: Watch for errors, performance regressions

---

## Rollback Plan

**If integration causes issues:**

### 6.4 Immediate Rollback (Code)
**File:** `packages/blog/server/utils/ai/anthropic.ts`

Revert to original:
```typescript
export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const result = envSchema.parse(process.env)
    _client = new Anthropic({
      apiKey: result.ANTHROPIC_API_KEY
    })
  }
  return _client
}
```

**Steps:**
1. Remove `wrapAnthropic()` wrapper
2. Remove `initLogger()` calls
3. Redeploy: `nr gcp:{env}:deploy`

### 6.5 Environment Variable Cleanup
- Remove `BRAINTRUST_API_KEY` from `.env`, Secret Manager
- Keep package in `package.json` (harmless if not imported)
- Revert `env-config.ts` changes if desired

---

## Success Metrics

**Quantitative:**
- [ ] 100% of Anthropic API calls logged to Braintrust
- [ ] <50ms latency overhead from wrapper
- [ ] Token usage matches Anthropic billing (verify accuracy)
- [ ] Zero Braintrust SDK errors in logs

**Qualitative:**
- [ ] Dashboard provides actionable insights (cost trends, latency p99)
- [ ] Can filter traces by environment, model, tool use
- [ ] Can trace multi-turn conversations end-to-end
- [ ] Eval runs distinguishable from prod traffic

---

## Future Enhancements (Post-Implementation)

**Phase 7+: Advanced Features (Not in Scope)**
1. **Cost Alerts:** Daily spend > $X → email/Slack
2. **Quality Metrics:** User thumbs up/down → logged to Braintrust
3. **Latency Alerts:** p99 > Xms → notify
4. **RAG Quality:** Track `searchBlogContent` tool call success rates
5. **Eval Pipeline:** Production traces → eval datasets via Braintrust UI
6. **A/B Testing:** Tag traces with model variants, compare in dashboard
7. **OpenTelemetry Export:** Send traces to Datadog/Honeycomb alongside Braintrust

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Braintrust SDK breaks streaming | **High** | Test thoroughly locally; rollback plan ready |
| Agent SDK not auto-captured | **Medium** | Phase 4 fallback (manual tracing) |
| API key leak | **High** | Use Secret Manager, mark sensitive in env schema |
| Free tier exceeded (>1M spans/mo) | **Low** | Monitor usage in Braintrust dashboard; unlikely for personal blog |
| Performance degradation | **Medium** | Benchmark before/after; wrapper should be <50ms overhead |
| Braintrust service outage | **Low** | Observability lost, but app continues (non-blocking) |

---

## Open Questions / Assumptions

**Assumptions:**
1. Braintrust `wrapAnthropic()` supports `@anthropic-ai/sdk` v0.52.0 (verify in Phase 3)
2. Wrapper handles streaming, tool use, prompt caching transparently (verify in tests)
3. Agent SDK calls routed through singleton → auto-captured (verify in Test 3)
4. Free tier 1M spans/month sufficient for blog traffic (monitor post-deployment)

**Questions for User (Post-Implementation):**
1. Want custom dashboard views in Braintrust UI? (e.g., cost by endpoint, latency by model)
2. Should we export traces to other tools (Datadog, etc.) via OpenTelemetry?
3. Set up scheduled reports (weekly usage summary)?

---

## Timeline Estimate

**Phase 1:** Dependencies & Config → 15 minutes
**Phase 2:** Singleton Wrapper → 10 minutes
**Phase 3:** Testing & Validation → 30-60 minutes (thorough testing)
**Phase 4:** Agent SDK Fallback → 0-30 minutes (only if needed)
**Phase 5:** Tagging & Metadata → 15 minutes
**Phase 6:** Documentation & Rollout → 30 minutes (staging) + 30 minutes (prod)

**Total:** ~2-3 hours (including testing, deployment, verification)

---

## Files Modified

| File | Change |
|------|--------|
| `packages/blog/package.json` | Add `braintrust` dependency |
| `packages/blog/server/utils/env-config.ts` | Add `BRAINTRUST_API_KEY` to schema |
| `packages/blog/server/utils/ai/anthropic.ts` | Wrap singleton with `wrapAnthropic()` |
| `.env` | Add `BRAINTRUST_API_KEY` |
| `.env.example` | Add `BRAINTRUST_API_KEY` placeholder |
| `CLAUDE.md` | Document observability setup |
| `infra/terraform/environments/{staging,prod}/terraform.tfvars` | Add secret reference |
| *(Optional)* `server/utils/ai/agent.ts` | Manual tracing (only if Phase 4 needed) |

**Files NOT Modified:**
- `server/api/chats/[id].post.ts` (auto-instrumented)
- `server/utils/rag/ingest.ts` (auto-instrumented)
- `packages/evals/provider-anthropic.ts` (auto-instrumented)
- `server/utils/ai/tools.ts` (no changes needed)

---

## Next Steps

**Ready to implement?**
1. User approval of plan
2. Create feature branch: `git checkout -b feat/braintrust-integration`
3. Execute Phase 1-6
4. Open PR with test results, screenshots from Braintrust dashboard
5. Deploy to staging → verify → deploy to prod

**OR:**
Ask user for clarifications, adjustments before proceeding.
