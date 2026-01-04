# Research: Multi-Agent Chat System with WebSocket

## Goal
Replace current SSE chat with multi-agent orchestrator pattern, following the email-agent example from Anthropic's claude-agent-sdk-demos.

## Codebase Context

### Current System Architecture

**SSE Stream Path** (`server/api/chats/[id].post.ts`)
- Direct Anthropic SDK streaming via HTTP SSE
- Tool calling loop (up to 5 turns)
- Extended thinking support (4096 tokens)
- Works but not multi-agent

**Partial Multi-Agent Work** (`server/utils/ai/agents/`)
- Type definitions exist: `orchestrator`, `blog_search`, `general`, `weather`
- Keyword-based routing scaffolded
- WebSocket handler returns placeholder responses only
- Agent SDK wrapper exists in `agent.ts` but not integrated

**Existing Tools** (`server/utils/ai/tools.ts`)
- `searchBlogContent` - RAG-based blog search (main feature)
- `getCurrentDateTime`, `getAuthorInfo`, `getBlogTopics`
- `getWeather`, `rollDice`
- Already wrapped as MCP tools via `createSdkMcpServer`

**Frontend** (`app/composables/useChat.ts`)
- SSE-based streaming with fetch
- Message parts: text, reasoning, tool-use, tool-result
- No WebSocket support yet

---

## Email-Agent Reference Architecture

Source: `/home/ctowles/code/f/claude-agent-sdk-demos/email-agent`

### Core Components

| Component | File | Purpose |
|-----------|------|---------|
| Server | `server/server.ts` | Bun HTTP/WS server |
| WebSocketHandler | `ccsdk/websocket-handler.ts` | Orchestrator - routes messages, manages sessions |
| Session | `ccsdk/session.ts` | Per-conversation agent instance |
| AIClient | `ccsdk/ai-client.ts` | Claude Agent SDK wrapper with tools |
| ListenersManager | `ccsdk/listeners-manager.ts` | Event-driven sub-agents |
| ActionsManager | `ccsdk/actions-manager.ts` | User-triggered action templates |
| UIStateManager | `ccsdk/ui-state-manager.ts` | Persistent UI state |

### Architecture Pattern

```
┌─────────────────────────────────────────────────┐
│         Frontend (React/Vue)                    │
│      Single WebSocket Connection                │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│     WebSocketHandler (Orchestrator)             │
│  - Manages sessions & client subscriptions      │
│  - Routes messages by type                      │
│  - Broadcasts updates to all clients            │
└────────────────────┬────────────────────────────┘
                     │
    ┌────────────────┼────────────────┬───────────┐
    ▼                ▼                ▼           ▼
┌─────────────┐ ┌──────────┐ ┌──────────────┐ ┌────────┐
│   Session   │ │Listeners │ │   Actions    │ │UIState │
│ (Agent SDK) │ │ Manager  │ │   Manager    │ │Manager │
└─────────────┘ └──────────┘ └──────────────┘ └────────┘
```

### WebSocket Message Types

**Client → Server:**
- `chat` - User message → adds to session queue
- `subscribe/unsubscribe` - Session management
- `execute_action` - Trigger action instance

**Server → Client:**
- `assistant_message` - AI response chunks
- `action_instances` - Available actions
- `ui_state_update` - State changes
- `error` - Error messages

### Session Management Pattern

```typescript
// One Session per conversation
class Session {
  id: string
  aiClient: AIClient
  queryPromise: Promise<void> | null  // Prevents concurrent queries

  addUserMessage(content: string) {
    // Queue message, run agent
  }

  async processQueue() {
    // Process one message at a time
    // Stream responses via callback
  }
}
```

### AIClient Configuration

```typescript
const aiClient = new AIClient({
  maxTurns: 100,
  model: "opus",
  allowedTools: [
    "Task", "Bash", "Glob", "Grep", "Read", "Write",
    "WebFetch", "Skill",
    "mcp__email__search_inbox",
    "mcp__email__read_emails"
  ],
  mcpServers: {
    "email": customMcpServer
  },
  appendSystemPrompt: AGENT_PROMPT,
})
```

### Skills Pattern (Actions)

Actions are template-based user-triggered workflows:

```typescript
// agent/custom_scripts/actions/create-task.ts
export const config: ActionTemplate = {
  id: 'create_task',
  name: 'Create Task',
  parameterSchema: { /* JSON schema */ }
}

export async function handler(params, context: ActionContext) {
  // context provides:
  // - callAgent<T>(options) - spawn sub-agent
  // - uiState.get/set - persistent state
  // - notify() - send notifications

  const analysis = await context.callAgent<T>({
    prompt: "...",
    schema: responseSchema,
    model: "haiku"
  })

  return { success: true, components: [...] }
}
```

### Sub-Agent Pattern (callAgent)

```typescript
// Spawn a sub-agent for specific tasks
const result = await context.callAgent<AnalysisResult>({
  prompt: "Analyze this content for topics...",
  schema: {
    type: 'object',
    properties: {
      topics: { type: 'array', items: { type: 'string' } },
      sentiment: { type: 'string' }
    }
  },
  model: "haiku"  // Use smaller model for sub-tasks
})
```

### Listeners Pattern (Event-Driven)

```typescript
// agent/custom_scripts/listeners/blog-event.ts
export const config: ListenerConfig = {
  id: "blog_event_listener",
  event: "content_updated"  // Custom event type
}

export async function handler(data: EventData, context: ListenerContext) {
  // React to events asynchronously
  // Can call sub-agents, update state, notify
}
```

---

## Recommended Approach

### Phase 1: WebSocket Infrastructure

1. **Create WebSocketHandler** (adapt from email-agent)
   - Session management with client subscriptions
   - Message routing by type
   - Broadcast mechanism

2. **Create Session class**
   - Wraps AIClient for per-conversation state
   - Message queue with single-query-at-a-time
   - Streaming callback to WebSocket

3. **Adapt AIClient**
   - Configure for blog tools (not email)
   - Use existing MCP server from `tools/index.ts`
   - Add blog-specific system prompt

### Phase 2: Tool Integration

1. **Use existing MCP tools**
   - `mcp__blog-tools__searchBlogContent` (main feature)
   - Other blog tools already defined

2. **Add Skill support** (optional, for future)
   - Follow actions pattern from email-agent
   - Could add blog-specific skills later

### Phase 3: Frontend Migration

1. **Create useWebSocket composable**
   - Replace SSE fetch with WebSocket
   - Handle message types: chunk, done, error, tool_use, tool_result

2. **Update useChat**
   - Use WebSocket for streaming
   - Keep message parts structure

### Key Differences from Email-Agent

| Email-Agent | Blog System |
|-------------|-------------|
| Email MCP tools | Blog search MCP tools |
| IMAP listeners | None initially (add later) |
| Email actions | None initially (add later) |
| React frontend | Vue/Nuxt frontend |
| Bun server | Nuxt/Nitro server |

### Files to Create/Modify

**New files:**
- `server/utils/ai/ws/websocket-handler.ts` - Main orchestrator
- `server/utils/ai/ws/session.ts` - Per-conversation agent
- `server/utils/ai/ws/ai-client.ts` - Agent SDK wrapper
- `app/composables/useWebSocket.ts` - Frontend WS hook

**Modify:**
- `server/routes/_ws.ts` - Wire up WebSocketHandler
- `app/composables/useChat.ts` - Use WebSocket instead of SSE

**Keep:**
- `server/utils/ai/tools/` - Existing MCP tools
- `server/utils/rag/` - RAG pipeline unchanged

---

## Decisions

1. **Listeners**: Skip for now - focus on WebSocket chat first
2. **Actions/Skills**: Skip for now - simple chat only
3. **Multi-model routing**: Yes - haiku for sub-tasks, larger model for main agent
4. **UI State**: Skip - not needed without actions
5. **Session persistence**: Yes - resume sessions across page reloads

## Scope

**In scope:**
- WebSocketHandler orchestrator
- Session class with persistence
- AIClient with multi-model support
- Frontend WebSocket composable
- Blog search as main tool

**Out of scope (future):**
- Listeners (event-driven sub-agents)
- Actions (user-triggered workflows)
- UI State manager
