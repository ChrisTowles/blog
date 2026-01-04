# Promptfoo Integration Plan - Issue #139

## Goal
Wire up Promptfoo across all AI prompts starting with blog chatbot, with incremental expansion to RAG and agent tools.

## User Requirements (from interview)

### Priorities
- **Approach**: Incremental - start with chatbot, validate, then expand
- **Integration**: CI/CD checks + manual CLI + watch mode
- **Test Coverage**: Functional behavior + model comparison + regression tests
- **Location**: `packages/evals/` (new package)

### Testing Strategy
- **Model**: Claude Haiku 4.5 (cost-optimized baseline)
- **Test Cases**: Hybrid - real user queries + synthetic edge cases
- **Performance**: Fast feedback (<30s, 10-20 test cases)
- **API Keys**: Environment variable `ANTHROPIC_API_KEY`

### Quality Checks
- **Assertions**: Format validation + tool calling accuracy + response quality + context percent
- **Tools**: Real tool execution (not mocked)
- **Isolation**: Fully isolated (separate process from Nuxt)
- **Main Concern**: Learning curve for Promptfoo

---

## Current State Analysis

### Existing AI Prompts (from codebase exploration)

1. **Blog Chatbot System Prompt** (`packages/blog/server/utils/ai/agent.ts:11-38`)
   - Agent SDK main system prompt
   - Key rules: enforce `searchBlogContent` tool usage, no markdown headings, use **bold**

2. **Chat API System Prompt** (`packages/blog/server/api/chats/[id].post.ts:12-26`)
   - Simpler variant for chat endpoint

3. **Chat Title Generation** (`packages/blog/server/api/chats/[id].post.ts:80-85`)
   - Specialized: max 30 chars, no punctuation, plain text

4. **Agent Tool Descriptions** (`packages/blog/server/utils/ai/tools/*.ts`)
   - 6 tools: searchBlogContent, getCurrentDateTime, getAuthorInfo, getBlogTopics, getWeather, rollDice
   - Each has description field for LLM guidance

5. **RAG System** (`packages/blog/server/utils/rag/retrieve.ts`)
   - Hybrid search (semantic + BM25) + Cohere reranking
   - No explicit prompts, but affects context quality

---

## Implementation Plan

### Phase 1: Foundation Setup ✅
**Goal**: Create evals package structure, install Promptfoo, establish baseline

#### 1.1 Create packages/evals package
- [ ] Create `packages/evals/package.json`
  - Dependencies: `promptfoo`, `@anthropic-ai/sdk`
  - Scripts: `eval`, `eval:watch`, `eval:ci`
  - Independent package, not dependent on blog package
- [ ] Add evals to root `pnpm-workspace.yaml`
- [ ] Create directory structure:
  ```
  packages/evals/
  ├── package.json
  ├── promptfooconfig.yaml    # Main config
  ├── prompts/
  │   ├── chatbot-system.txt  # Extracted from agent.ts
  │   └── title-gen.txt       # Extracted from chat API
  ├── test-cases/
  │   ├── chatbot-functional.yaml
  │   └── chatbot-regression.yaml
  ├── tools/                  # Tool implementations for testing
  │   └── blog-tools.ts       # Standalone versions of searchBlogContent etc.
  └── outputs/                # Test results (gitignored)
  ```

#### 1.2 Install and configure Promptfoo
- [ ] `cd packages/evals && pnpm add -D promptfoo @anthropic-ai/sdk`
- [ ] Initialize Promptfoo: `pnpm promptfoo init`
- [ ] Configure `promptfooconfig.yaml` with:
  - Provider: `anthropic:messages:claude-haiku-4-5`
  - Env var: `ANTHROPIC_API_KEY`
  - Default assertions (format, tool calling)

#### 1.3 Extract chatbot system prompt
- [ ] Copy system prompt from `packages/blog/server/utils/ai/agent.ts` to `prompts/chatbot-system.txt`
- [ ] Document prompt version and source in header comment
- [ ] Add extraction script if needed for keeping prompts in sync

---

### Phase 2: Chatbot Test Suite 🎯
**Goal**: Comprehensive testing of blog chatbot prompts

#### 2.1 Create functional behavior tests
**File**: `test-cases/chatbot-functional.yaml`

Test categories:
- [ ] **Tool calling accuracy**
  - Query: "What has Chris written about Claude?" → Must call `searchBlogContent`
  - Query: "What time is it?" → Must call `getCurrentDateTime`
  - Query: "Tell me about the author" → Must call `getAuthorInfo`
  - Query: "What's the weather?" → Must call `getWeather`

- [ ] **Format validation**
  - Assert: No markdown headings (# ## ###)
  - Assert: Uses **bold** instead of headings
  - Assert: No quotes in title generation
  - Assert: Titles ≤30 chars

- [ ] **Response quality** (LLM-as-judge)
  - Relevance to query
  - Coherence and professionalism
  - Correct tool result interpretation

- [ ] **Context usage** (context percent check)
  - Verify context window efficiency
  - Track token usage patterns

#### 2.2 Create regression test dataset
**File**: `test-cases/chatbot-regression.yaml`

- [ ] Extract 10-15 real user queries from chat history (privacy-safe)
  - Example: "How do I set up Nuxt Content?"
  - Example: "What's the difference between Nuxt 3 and 4?"
- [ ] Add synthetic edge cases:
  - Off-topic queries (should politely decline or redirect)
  - Multi-turn context (if applicable)
  - Ambiguous queries (test clarification behavior)
- [ ] Establish "golden" responses or quality thresholds

#### 2.3 Implement real tool execution
**File**: `tools/blog-tools.ts`

- [ ] Create standalone versions of tools for testing:
  - `searchBlogContent`: Connect to postgres DB (needs connection string)
  - `getCurrentDateTime`: Simple Date() wrapper
  - `getAuthorInfo`: Static author data
  - `getBlogTopics`: Query DB or static list
  - `getWeather`: Real API call or mock (decide based on cost)
  - `rollDice`: Pure function, no mocking needed

- [ ] Configure Promptfoo to enable function calling:
  ```yaml
  providers:
    - id: anthropic:messages:claude-haiku-4-5
      config:
        tools: ./tools/blog-tools.ts
        toolChoice: auto
  ```

---

### Phase 3: CI/CD Integration 🔄
**Goal**: Automate eval tests in GitHub Actions

#### 3.1 Add CI workflow
**File**: `.github/workflows/eval-tests.yml`

- [ ] Create workflow triggered on:
  - Push to main (for tracking)
  - Pull requests (for validation)
  - Manual dispatch (for ad-hoc runs)

- [ ] Workflow steps:
  1. Checkout code
  2. Setup pnpm + node
  3. Install dependencies (`pnpm install`)
  4. Set `ANTHROPIC_API_KEY` from GitHub Secrets
  5. Run evals: `cd packages/evals && pnpm eval:ci`
  6. Upload results as artifact
  7. Comment PR with pass/fail summary

- [ ] **CI Behavior Decision Needed**: Block merge on failure vs warning only?
  - Recommendation: Start with **warning only** (informational)
  - Upgrade to **block merge** after confidence in test stability

#### 3.2 Add local development scripts
**File**: `packages/evals/package.json`

```json
{
  "scripts": {
    "eval": "promptfoo eval",
    "eval:watch": "promptfoo eval --watch",
    "eval:ci": "promptfoo eval --output outputs/ci-results.json",
    "eval:view": "promptfoo view"
  }
}
```

- [ ] Add root-level convenience scripts in main `package.json`:
  ```json
  {
    "scripts": {
      "eval": "pnpm --filter @chris-towles/evals eval",
      "eval:watch": "pnpm --filter @chris-towles/evals eval:watch"
    }
  }
  ```

#### 3.3 Configure watch mode for iteration
- [ ] Set up `--watch` flag to re-run on prompt/test file changes
- [ ] Document workflow: edit prompt → auto-run → see results in terminal

---

### Phase 4: Model Comparison & Cost Tracking 📊
**Goal**: Compare Haiku 4.5 against other models, track costs

#### 4.1 Add model comparison config
**File**: `promptfooconfig.yaml` (multi-provider setup)

```yaml
providers:
  - id: anthropic:messages:claude-haiku-4-5
    label: Haiku 4.5 (baseline)
  - id: anthropic:messages:claude-sonnet-4-5
    label: Sonnet 4.5 (current prod)
  - id: anthropic:messages:claude-opus-4-5
    label: Opus 4.5 (quality ceiling)
```

- [ ] Run comparative evals: `pnpm eval --provider-filter "anthropic:*"`
- [ ] Document cost per test run (approx. tokens × model pricing)
- [ ] Establish quality/cost tradeoffs:
  - Haiku: fastest, cheapest → good enough for chatbot?
  - Sonnet: current choice → establish baseline quality
  - Opus: premium → only if Haiku/Sonnet insufficient

#### 4.2 Track results over time
**Decision Needed**: How to store/track results?

Options:
- [ ] **Git-tracked snapshots** (simple, version controlled)
- [ ] **Promptfoo Cloud** (dashboard, visualization)
- [ ] **Local only** (ephemeral, no persistence)

Recommendation: Start with **local only** for speed, add git snapshots once stable.

---

### Phase 5: Documentation & Maintenance 📚
**Goal**: Make it easy for future you (and collaborators) to understand and maintain

#### 5.1 Create README
**File**: `packages/evals/README.md`

- [ ] Purpose and goals
- [ ] Quick start:
  ```bash
  # Install
  pnpm install

  # Set API key
  export ANTHROPIC_API_KEY=sk-...

  # Run tests
  pnpm eval

  # Watch mode
  pnpm eval:watch
  ```
- [ ] Test categories and what they validate
- [ ] How to add new test cases
- [ ] How to update prompts (and keep in sync with blog package)
- [ ] Troubleshooting guide

#### 5.2 Document learning curve mitigation
**File**: `packages/evals/docs/promptfoo-guide.md`

- [ ] Promptfoo basics: providers, test cases, assertions
- [ ] Advanced: custom assertions, LLM-as-judge, tool calling
- [ ] Examples from this project with explanations
- [ ] Links to official Promptfoo docs
- [ ] Common pitfalls and solutions

#### 5.3 Create prompt sync strategy
**Problem**: Prompts duplicated between `packages/blog` and `packages/evals`

Options:
1. **Manual sync** - copy/paste, comment with version/date
2. **Export script** - `pnpm sync:prompts` extracts from blog to evals
3. **Shared source** - blog imports prompts from evals (or vice versa)

Recommendation: Start with **manual sync + comments**, add script if it becomes a pain point.

- [ ] Document in README when/how to sync
- [ ] Add comments to prompts with source location and date

---

### Phase 6: Future Expansion 🚀
**Goal**: Extend beyond chatbot to RAG, tools, agents

#### 6.1 RAG prompt testing (post-chatbot validation)
- [ ] Extract RAG-related prompts (if any implicit in retrieve.ts)
- [ ] Test hybrid search quality: semantic + BM25 + reranking
- [ ] Validate context relevance (are retrieved chunks useful?)
- [ ] Compare with/without Cohere reranker

#### 6.2 Tool description testing
- [ ] Validate tool descriptions guide LLM correctly
- [ ] Test edge cases: ambiguous queries, incorrect tool selection
- [ ] A/B test tool description variations

#### 6.3 Agent tool accuracy
- [ ] Standalone tests for each tool (searchBlogContent, getWeather, etc.)
- [ ] Validate outputs match expectations
- [ ] Test error handling and edge cases

#### 6.4 Family automation agents (future)
- [ ] Once built, add evals for automation prompts
- [ ] Security testing: prompt injection, jailbreak attempts
- [ ] Use Promptfoo's red-team feature

---

## Success Metrics

### Immediate (Phase 1-2)
- [ ] Promptfoo successfully runs chatbot tests locally
- [ ] 10-20 test cases covering functional behavior
- [ ] Fast feedback loop (<30s per run)
- [ ] Clear pass/fail output

### Short-term (Phase 3-4)
- [ ] CI/CD pipeline runs evals on every PR
- [ ] Model comparison data available (Haiku vs Sonnet vs Opus)
- [ ] Cost tracking per test run
- [ ] Regression tests catch breaking changes

### Long-term (Phase 5-6)
- [ ] Comprehensive eval coverage: chatbot, RAG, tools, agents
- [ ] Security testing via red-team feature
- [ ] Documented process for adding new tests
- [ ] Minimal maintenance overhead (learning curve addressed)

---

## Dependencies & Blockers

### External Dependencies
- Promptfoo npm package (stable, well-maintained)
- Anthropic API (existing, just needs key in CI)
- PostgreSQL connection (for real tool execution)

### Potential Blockers
1. **Learning curve**: Mitigate with good docs, examples, incremental approach
2. **Cost**: Fast feedback = small test set = <$1/run, monitor in CI
3. **Test data privacy**: Only use sanitized/synthetic queries, no PII
4. **Tool mocking complexity**: Using real tools = simpler but needs DB access

---

## Open Questions / Decisions Needed

1. **CI behavior**: Block merge on failure or warning only?
   - **Recommendation**: Warning only initially, block after stable

2. **Results storage**: Git snapshots, Promptfoo Cloud, or local only?
   - **Recommendation**: Local only initially, add git snapshots later

3. **Prompt sync**: Manual, script, or shared source?
   - **Recommendation**: Manual + comments, script if needed

4. **Package dependency**: Should evals import from blog or stay independent?
   - **Current plan**: Fully independent, copy prompts
   - **Tradeoff**: DRY vs isolation (choosing isolation)

5. **PostgreSQL in tests**: Local docker, cloud staging DB, or mock?
   - **Recommendation**: Local docker for `searchBlogContent` tool
   - **Needs**: Connection string in env or test config

---

## Estimated Effort

| Phase | Tasks | Effort |
|-------|-------|--------|
| 1. Foundation | 3 tasks | 1-2 hours |
| 2. Chatbot tests | 3 tasks | 2-3 hours |
| 3. CI/CD | 3 tasks | 1-2 hours |
| 4. Model comparison | 2 tasks | 1 hour |
| 5. Documentation | 3 tasks | 1-2 hours |
| **Total (MVP)** | **14 tasks** | **6-10 hours** |
| 6. Future expansion | 4 tasks | TBD (post-MVP) |

**Critical path**: Phase 1 → Phase 2 → Phase 3 (CI)
**Optional/parallel**: Phase 4 (model comparison), Phase 5 (docs)

---

## Next Steps

1. **Confirm plan**: Review this plan, ask questions, clarify decisions
2. **Create GitHub issue**: Convert this plan to issue #139 (or new issue)
3. **Setup worktree**: `nr worktree create 139` for isolated development
4. **Start Phase 1**: Create evals package, install Promptfoo
5. **Iterate**: Work through phases, test incrementally, adjust as needed

---

## References
- Promptfoo docs: https://www.promptfoo.dev/
- Anthropic public repos (for best practices)
- Issue #139: https://github.com/ChrisTowles/blog/issues/139
