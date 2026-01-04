# Research: Adding Anthropic Agents to Blog Chat

**Date**: 2026-01-04
**Goal**: Replace current SSE-based chat implementation with multi-agent orchestrator system using Anthropic Agent SDK

## Requirements Summary

**User Requirements:**
- Multiple specialized agents with orchestrator routing
- Replace current chat implementation completely
- Maintain existing RAG/search capabilities

---

## 1. Codebase Context

### Current Implementation

**Architecture**: Dual implementation pattern
- **Active**: Legacy SSE-based streaming (`/server/api/chats/[id].post.ts`)
  - Direct Anthropic SDK messages.stream()
  - Extended thinking (4096 tokens)
  - Tool calling loop (max 5 turns)
  - Real-time SSE streaming
- **Reference**: Agent SDK example (`/server/utils/ai/agent.ts`)
  - Uses Claude Agent SDK with MCP servers
  - Not deployed/used in endpoints

**Current Capabilities:**
- Hybrid RAG search (semantic + BM25 + reranker)
- 6 specialized tools via MCP server (`blog-tools`):
  - searchBlogContent - RAG queries
  - getAuthorInfo - Static author data
  - getBlogTopics - Content categories
  - getWeather - Open-Meteo API
  - getCurrentDateTime - Time utilities
  - rollDice - D&D dice rolling
- GitHub OAuth authentication
- Chat persistence (PostgreSQL/Drizzle)
- Model selection (Opus 4.5, Sonnet 4.5)

**Database Schema:**
- `users` - GitHub OAuth profiles
- `chats` - Chat sessions with title/userId
- `messages` - Multi-part message storage (text, reasoning, tool-use, tool-result)
- `documents` - Blog post metadata
- `documentChunks` - RAG chunks with embeddings + search vectors

**Frontend:**
- Vue/Nuxt UI components
- `useChat()` composable for SSE streaming
- Specialized message renderers (reasoning, tools, markdown)

**Key Files:**
- API: `/server/api/chats/[id].post.ts:1`
- Tools: `/server/utils/ai/tools/index.ts:1`
- RAG: `/server/utils/rag/retrieve.ts:1`
- Agent example: `/server/utils/ai/agent.ts:1`
- Frontend: `/app/composables/useChat.ts:1`

### Migration Considerations

**Strengths to preserve:**
- Hybrid RAG with reranking (proven effective)
- Extended thinking capability
- Real-time streaming UX
- Tool calling infrastructure
- Chat persistence

**Limitations to address:**
- Single monolithic agent (no specialization)
- No orchestration/routing logic
- SSE tied to single conversation flow
- Hard-coded system prompts

---

## 2. Expert Recommendations

### Anthropic Multi-Agent Architecture

**Source**: [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)

**Orchestrator-Worker Pattern:**
- **Lead Agent**: Analyzes query, develops strategy, spawns subagents
- **Subagents**: Specialized workers with isolated context windows running in parallel
- **Citation Agent**: Validates claims against sources post-research

**Performance**: Opus 4 lead + Sonnet 4 subagents outperformed single Opus 4 by **90.2%**

**Key Insights:**
- Subagents need: objective, output format, tool guidance, clear boundaries
- Lead agent maintains research state via memory system (200K+ token persistence)
- Subagents execute OODA loop (observe, orient, decide, act)
- Currently sequential coordination (waits for subagents before continuing)

**Trade-offs:**
- Agents: ~4× more tokens than chat
- Multi-agent: ~15× more tokens than chat
- 80% of performance variance explained by token usage
- Best for: parallelizable tasks, large information sets, complex tool interfaces

### Best Practices (2025-2026)

**Sources**:
- [Claude Agent SDK Best Practices](https://skywork.ai/blog/claude-agent-sdk-best-practices-ai-agents-2025/)
- [AI Agent Orchestration in 2026](https://kanerika.com/blogs/ai-agent-orchestration/)

**Architecture Principles:**
1. **Keep it simple** - Start small, build modularly, add complexity only when needed
2. **One job per subagent** - Let orchestrator coordinate
3. **Orchestrator owns**: Global planning, delegation, state management
4. **Narrow tool permissions** - Minimum required access first

**When to Use Multi-Agent:**
- Breadth-first queries (multiple independent directions)
- Tasks divisible into parallel research strands
- **Less effective** for tightly interdependent tasks (coding)

**Orchestration Patterns:**
- **Sequential**: Agent A → Agent B → Agent C (deterministic pipelines)
- **Parallel**: Multiple agents execute simultaneously (low dependencies)
- **Conditional**: Dynamic routing based on analysis
- **Hierarchical**: Orchestrator → specialists

**Prompt Engineering:**
- Structured design layer (not manual hacks)
- Define role, guide behavior, ensure consistency
- Detailed task descriptions prevent: duplication, gaps, failed searches
- Embed scaling rules (effort allocation guidelines)

**Production Considerations:**
- Proper prompt design
- Durable recovery mechanisms
- Detailed evaluations
- Cautious deployment
- Monitor decision patterns (not individual conversations)
- Minor changes cascade → large behavioral changes

### Claude Agent SDK Technical Patterns

**Sources**:
- [Agent SDK reference - TypeScript](https://docs.claude.com/en/api/agent-sdk/typescript)
- [Subagents in the SDK](https://platform.claude.com/docs/en/agent-sdk/subagents)
- [GitHub - claude-agent-sdk-demos](https://github.com/anthropics/claude-agent-sdk-demos)

**SDK Features:**
- `query()` - Async generator streaming messages
- `AgentInput` - Includes `subagent_type` for routing
- Agent definitions: description, tools, prompt, model selection
- Automatic delegation based on subagent descriptions
- Separate context per subagent (prevents pollution)
- Concurrent subagent execution

**Project Structure:**
```
agents/
  ├── coordinator.ts     # Orchestrator logic
  └── specialists/
      ├── search-agent.ts
      └── analysis-agent.ts
orchestration/
  ├── workflow.ts        # Task sequences
  ├── routing.ts         # Distribution logic
  └── handoffs.ts        # Agent coordination
tools/
  └── shared-tools.ts
```

**Routing Approaches:**
- **Handoff**: Synchronous transfer with wait-for-completion
- **Assign**: Asynchronous spawning for parallel execution
- **Send Message**: Direct communication with existing agents

**Safety Hooks:**
```typescript
// Pre-tool execution hooks
async function safetyhook(event) {
  if (dangerousCondition) {
    return { error: "Blocked" }
  }
}
```

### Multi-Agent Chatbot Implementations

**Sources**:
- [A Technical Guide to Multi-Agent Orchestration](https://dominguezdaniel.medium.com/a-technical-guide-to-multi-agent-orchestration-5f979c831c0d)
- [Multi-Agent Orchestration Best Practices](https://botpress.com/blog/ai-agent-orchestration)

**Centralized Orchestration:**
- Central controller as parent node
- Routes tasks based on context
- Tracks state
- Prevents agent conflicts

**Event-Driven Architecture:**
- Stream processing for real-time decisions
- Dynamic message routing
- Scalability for multi-agent interactions

**Enterprise Requirements:**
- Auditability
- Confidence scoring
- Human oversight
- Compliance-heavy workflow support

**Security:**
- Minimum required permissions
- Granular access control
- Almost never allow delete access

### GitHub Examples

**Sources**:
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
- [wshobson/agents](https://github.com/wshobson/agents)

**wshobson/agents** (Production-ready system):
- 99 specialized agents
- 15 multi-agent workflow orchestrators
- 107 agent skills
- 71 development tools
- 67 focused plugins

**Common Patterns:**
- Sequential chains for deterministic flows
- Parallel execution with result merging
- Conditional routing based on query analysis
- Review/validation stages

---

## 3. Recommended Approach

### High-Level Architecture

**Orchestrator Agent (Lead):**
- Analyzes incoming chat messages
- Routes to appropriate specialist based on:
  - Query intent (technical question vs casual conversation)
  - Required tools (search vs weather vs general knowledge)
  - Complexity (simple lookup vs multi-step research)
- Aggregates subagent results
- Maintains conversation state
- Generates final response

**Specialist Subagents:**

1. **Blog Search Agent**
   - Tools: searchBlogContent, getBlogTopics
   - Purpose: Technical queries about blog content
   - RAG retrieval + context synthesis

2. **General Assistant Agent**
   - Tools: getAuthorInfo, getCurrentDateTime, rollDice
   - Purpose: General conversation, author questions
   - Lightweight, fast responses

3. **Weather Agent**
   - Tools: getWeather
   - Purpose: Weather queries
   - External API integration

4. **Research Agent** (Future)
   - Tools: Web search, multiple RAG sources
   - Purpose: Deep multi-step research
   - Parallel exploration like Anthropic's system

### Implementation Strategy

**Phase 1: Foundation**
- Create orchestrator agent definition
- Define 3 core subagents (search, general, weather)
- Implement routing logic based on query classification
- Replace SSE streaming with Agent SDK streaming

**Phase 2: Migration**
- Replace `/api/chats/[id].post.ts` to use Agent SDK
- Convert existing tools to subagent format
- Update frontend `useChat()` for Agent SDK streaming
- Preserve extended thinking capability

**Phase 3: Enhancement**
- Add confidence scoring for routing decisions
- Implement parallel subagent execution for complex queries
- Add citation/validation agent for fact-checking
- Monitor and tune routing heuristics

**Phase 4: Optimization**
- Implement caching/memoization for common routes
- Add human feedback loop for routing improvements
- Performance profiling (token usage vs quality)
- Cost optimization (Sonnet for subagents, Opus for orchestrator)

### Technical Decisions

**Model Selection:**
- Orchestrator: Claude Opus 4.5 (strategic reasoning)
- Subagents: Claude Sonnet 4.5 (fast, cost-effective)
- Override to Opus for complex research agent

**Streaming:**
- Agent SDK `query()` async generator
- SSE events for frontend compatibility
- Stream aggregation for multi-agent responses

**Context Management:**
- Orchestrator maintains full conversation history
- Subagents receive only relevant context slices
- Message parts preserve tool-use/result structure

**Routing Algorithm:**
```typescript
// Pseudo-code
function routeQuery(message: string) {
  const intent = classifyIntent(message)

  if (containsBlogKeywords(message)) {
    return 'blog-search-agent'
  } else if (containsWeatherKeywords(message)) {
    return 'weather-agent'
  } else if (requiresDeepResearch(message)) {
    return 'research-agent' // parallel execution
  } else {
    return 'general-assistant-agent'
  }
}
```

**Tool Access:**
- Orchestrator: No direct tools (delegation only)
- Subagents: Scoped tool permissions
- Safety hooks for destructive operations

**Database Schema:**
- Keep existing tables unchanged
- Consider adding `agent_type` field to messages for analytics
- Track routing decisions for improvement

### Migration Path

**Preserve:**
- All existing tools (wrap in subagents)
- RAG pipeline (unchanged)
- Database schema (backward compatible)
- Frontend components (adapt streaming)

**Replace:**
- SSE implementation → Agent SDK streaming
- Single system prompt → Agent definitions
- Tool calling loop → Subagent orchestration

**Add:**
- Orchestrator logic
- Subagent definitions
- Routing algorithm
- Agent coordination

### Risk Mitigation

**Token Costs:**
- Monitor: 15× increase expected
- Mitigation: Use Sonnet for subagents, implement caching
- Fallback: Simple queries bypass orchestration

**Complexity:**
- Start with 3 subagents (not 99)
- Sequential before parallel
- Detailed logging/monitoring
- Gradual rollout (feature flag)

**Debugging:**
- Comprehensive agent decision logging
- Trace routing choices
- Track subagent performance
- A/B test against legacy system

**Performance:**
- Benchmark latency vs legacy
- Optimize common paths
- Cache routing decisions
- Async subagent spawning

### Success Metrics

1. **Quality**: Response accuracy/relevance vs current system
2. **Cost**: Token usage within acceptable range
3. **Latency**: First token time comparable to legacy
4. **User satisfaction**: Feedback on multi-step queries
5. **Routing accuracy**: % correctly routed queries

---

## Next Steps

1. **Planning Phase** (`/tt:02_plan`):
   - Interview user for specific agent roles
   - Define detailed subagent specifications
   - Design routing algorithm
   - Plan database migrations (if needed)
   - Create implementation timeline

2. **Prototype**:
   - Build orchestrator + 1 subagent (blog search)
   - Test streaming compatibility
   - Validate routing logic
   - Measure performance

3. **Iterate**:
   - Add remaining subagents
   - Implement parallel execution
   - Tune prompts and routing
   - Deploy behind feature flag

---

## Citations

### Anthropic Official
- [Building agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
- [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Agent SDK reference - TypeScript](https://docs.claude.com/en/api/agent-sdk/typescript)
- [Subagents in the SDK](https://platform.claude.com/docs/en/agent-sdk/subagents)

### Best Practices & Guides
- [Claude Agent SDK Best Practices (2025)](https://skywork.ai/blog/claude-agent-sdk-best-practices-ai-agents-2025/)
- [AI Agent Orchestration in 2026](https://kanerika.com/blogs/ai-agent-orchestration/)
- [Multi-Agent Orchestration Guide](https://botpress.com/blog/ai-agent-orchestration)
- [How Anthropic Built a Multi-Agent Research System](https://blog.bytebytego.com/p/how-anthropic-built-a-multi-agent)

### Implementation Examples
- [GitHub - claude-agent-sdk-demos](https://github.com/anthropics/claude-agent-sdk-demos)
- [GitHub - wshobson/agents](https://github.com/wshobson/agents)
- [GitHub - VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)

### Architecture Patterns
- [A Technical Guide to Multi-Agent Orchestration](https://dominguezdaniel.medium.com/a-technical-guide-to-multi-agent-orchestration-5f979c831c0d)
- [8 Best Multi-Agent AI Frameworks for 2026](https://www.multimodal.dev/post/best-multi-agent-ai-frameworks)
