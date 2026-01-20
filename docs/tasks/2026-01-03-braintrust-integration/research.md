# Braintrust.dev Integration Research

**Date:** 2026-01-03
**Goal:** Integrate Braintrust.dev observability wrapper around Anthropic client for insights and monitoring

---

## 1. Codebase Context

### Current Anthropic SDK Usage

**Client Instantiation:**

- Singleton pattern in `packages/blog/server/utils/ai/anthropic.ts`
- Single instance created lazily, reused throughout app
- Configured with `ANTHROPIC_API_KEY` from environment

**SDK Versions:**

- `@anthropic-ai/sdk`: `^0.52.0` (Core SDK)
- `@anthropic-ai/claude-agent-sdk`: `^0.1.76` (Agent orchestration)

**Key Usage Patterns:**

| Location                               | Pattern                      | Features Used                                                               |
| -------------------------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| `server/api/chats/[id].post.ts`        | Streaming chat with tool use | `messages.stream()`, extended thinking (4096 tokens), multi-turn tool loops |
| `server/utils/rag/ingest.ts`           | Content ingestion            | `messages.create()`, prompt caching (`cache_control: ephemeral`)            |
| `server/utils/ai/agent.ts`             | Agent orchestration          | `query()` from Agent SDK, MCP servers, session resumption                   |
| `packages/evals/provider-anthropic.ts` | Evals                        | Custom provider, tool use loops, multi-turn conversations                   |

**Advanced Features in Use:**

- **Streaming:** Primary interaction mode for chat
- **Extended Thinking:** Budget tokens configurable (default 4096)
- **Tool Use:** Multi-turn loops (up to 5 turns), signature verification for thinking blocks
- **Prompt Caching:** Used in RAG ingestion to reduce costs
- **Session Resumption:** Agent SDK supports resuming via session ID

**Tool Registry:**

- Centralized in `server/utils/ai/tools.ts`
- MCP server wrapper in `server/utils/ai/tools/index.ts`
- Includes: `searchBlogContent`, `getDateTime`, `getAuthor`, `getTopics`, `getWeather`, `rollDice`

**No Existing Middleware/Wrappers:**

- Clean singleton client, no interceptors or custom wrappers
- Stream adapter converts Agent SDK → SSE for frontend
- Tool execution wrapper for error handling

---

## 2. Expert Recommendations

### Braintrust Overview

[Braintrust](https://www.braintrust.dev/docs/providers/anthropic) is an AI observability platform purpose-built for **evals tied to CI/CD** with unified workflows for PMs and engineers.

**Key Differentiators (vs Langfuse/Helicone):**

- **High-performance search:** Brainstore up to 86× faster for full-text search ([Best AI observability platforms](https://www.braintrust.dev/articles/best-ai-observability-platforms-2025))
- **Evaluation focus:** Production traces → eval cases with 1-click, eval results in PRs
- **Generous free tier:** 1M free spans/month (vs Langfuse 50k)
- **Pricing:** $249/mo Pro tier vs Langfuse $59/mo
- **OpenTelemetry-based:** Standard OTLP spans, not proprietary ([Observability quickstart](https://www.braintrust.dev/docs/observability))

**When to Choose Braintrust:**

- Need evals integrated with CI/CD
- Want unified PM + engineer workflow
- High-volume production logging (free tier covers 1M spans)
- Value advanced search and eval capabilities

**Alternatives:**

- **Langfuse:** Best for open-source requirements, self-hosting ([Langfuse vs Braintrust](https://www.braintrust.dev/articles/langfuse-vs-braintrust))
- **Helicone:** Best for fast proxy setup, cost tracking, operational focus ([Helicone vs Braintrust](https://www.braintrust.dev/articles/helicone-vs-braintrust))

### Integration Patterns

**Installation:**

```bash
npm install braintrust @anthropic-ai/sdk
```

**Environment Variables:**

- `ANTHROPIC_API_KEY` (existing)
- `BRAINTRUST_API_KEY` (new)

**Wrapper Pattern (TypeScript):**

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { wrapAnthropic, initLogger } from 'braintrust';

const logger = initLogger({
  projectName: 'My Project',
  apiKey: process.env.BRAINTRUST_API_KEY,
});

const client = wrapAnthropic(new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }));
```

**Automatic Instrumentation:**
All API calls automatically logged after wrapping—no additional code required.

**What Gets Captured:**

- **Streaming support:** Built-in handling of streaming responses
- **Token metrics:** Including cached token counts (prompt caching metrics)
- **Tool use:** Full support for Anthropic's function calling
- **Request/response:** Full message history, system prompts
- **Cost tracking:** Automatic cost calculation
- **Latency monitoring:** Request timing

**Built on OpenTelemetry:**

- Standard OTLP spans/traces
- Export to Braintrust, Datadog, Honeycomb, or any OTLP backend
- No vendor lock-in

### Best Practices for 2025

**Key Trends ([Top 10 LLM observability tools](https://www.braintrust.dev/articles/top-10-llm-observability-tools-2025)):**

- **Deeper agent tracing:** Multi-step workflows, structured outputs
- **Tool use monitoring:** Not just text, but tool calls and multi-modal
- **Production-to-eval pipeline:** Convert prod traces → eval cases

**LLM Observability Requirements:**

- Monitor output **quality**, not just system health
- Track user feedback → model improvements
- Detect prompt injection, hallucinations, cost spikes
- Evaluate against benchmarks in CI/CD

---

## 3. Recommended Approach

### Phase 1: Minimal Integration (Wrap Singleton)

**Goal:** Add observability with minimal code changes.

**Strategy:**

1. Wrap existing singleton client in `server/utils/ai/anthropic.ts`
2. Initialize Braintrust logger once at app startup
3. All downstream code (chats, RAG, evals) auto-instrumented

**Changes Required:**

- Add `braintrust` to dependencies
- Add `BRAINTRUST_API_KEY` to `.env`, `env-config.ts`
- Modify `getAnthropicClient()` to wrap client with `wrapAnthropic()`
- Initialize logger with project name (e.g., "blog-towles")

**Benefits:**

- Zero changes to existing API endpoints or agent code
- Automatic streaming + tool use + prompt caching tracking
- Immediate visibility into production usage

**Risks:**

- Agent SDK (`@anthropic-ai/claude-agent-sdk`) compatibility unknown—may need separate instrumentation

### Phase 2: Agent SDK Instrumentation (If Needed)

**Goal:** Extend observability to Agent SDK orchestration layer.

**Strategy:**

- Test if Agent SDK `query()` calls are auto-captured via wrapper
- If not, add manual logging via `logger.traced()` wrapper
- Capture session resumption, MCP server interactions, multi-turn loops

**Consideration:**
Agent SDK likely uses Core SDK under the hood—wrapping singleton _may_ suffice.

### Phase 3: Evaluation Pipeline

**Goal:** Convert production traces → eval cases for CI/CD.

**Strategy:**

1. Tag production traces with metadata (user feedback, topic, model version)
2. Create eval datasets from high-quality/low-quality traces
3. Run evals in CI/CD on PRs (integrate with Promptfoo or Braintrust evals)
4. Block PRs if quality regresses

**Integration Points:**

- Existing `packages/evals/` with Promptfoo
- Braintrust UI for trace → eval conversion
- GitHub Actions for CI/CD eval runs

### Phase 4: Advanced Observability

**Goal:** Custom metrics, dashboards, alerts.

**Features:**

- User satisfaction scoring (thumbs up/down → logged to Braintrust)
- Token usage alerts (notify if daily costs spike)
- Latency p99 tracking per endpoint
- RAG retrieval quality monitoring (track `searchBlogContent` tool calls)

---

## 4. Open Questions

1. **Agent SDK Compatibility:** Does `wrapAnthropic()` auto-capture Agent SDK `query()` calls, or need manual tracing?
2. **Project Naming:** Use single project "blog-towles" or separate by environment (staging/prod)?
3. **Eval Strategy:** Integrate Braintrust evals or keep Promptfoo? (Both? Migration?)
4. **Cost:** 1M spans/month free—estimate current prod volume vs free tier?
5. **OpenTelemetry Export:** Send traces to other tools (e.g., Datadog) alongside Braintrust?

---

## 5. Next Steps

**Before Planning:**

1. **Verify compatibility:** Test `wrapAnthropic()` with Agent SDK in local env
2. **Estimate volume:** Count prod API calls/month → ensure free tier sufficient
3. **Decide project structure:** Single vs multi-project Braintrust setup
4. **Review eval strategy:** Align Braintrust evals with existing Promptfoo setup

**Proceed to 02_plan when:**

- Open questions resolved via user input
- Technical feasibility confirmed (Agent SDK compatibility)
- Clear decision on eval integration (Braintrust vs Promptfoo vs both)

---

## Sources

- [Braintrust Anthropic Integration](https://www.braintrust.dev/docs/providers/anthropic)
- [Observability Quickstart](https://www.braintrust.dev/docs/observability)
- [Best AI Observability Platforms 2025](https://www.braintrust.dev/articles/best-ai-observability-platforms-2025)
- [Braintrust vs Langfuse](https://www.braintrust.dev/articles/langfuse-vs-braintrust)
- [Braintrust vs Helicone](https://www.braintrust.dev/articles/helicone-vs-braintrust)
- [Top 10 LLM Observability Tools 2025](https://www.braintrust.dev/articles/top-10-llm-observability-tools-2025)
