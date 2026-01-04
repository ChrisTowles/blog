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


#### 1.2 Update Environment Schema


The `.env` and `.env.example` files already updated with valid `BRAINTRUST_API_KEY`..

**File:** `packages/blog/server/utils/env-config.ts`

Add to `envSchema`:
```typescript
BRAINTRUST_API_KEY: z.string().min(1),
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


## Success Metrics

**Quantitative:**
- [ ] 100% of Anthropic API calls logged to Braintrust
- [ ] Zero Braintrust SDK errors in logs

**Qualitative:**
- [ ] Can filter traces by environment, model, tool use
- [ ] Can trace multi-turn conversations end-to-end
- [ ] Eval runs distinguishable from prod traffic

