# Implementation Plan: Multi-Agent Chat with WebSocket

## Summary

Replace SSE chat with multi-agent WebSocket architecture based on email-agent pattern. Start fresh (ignore WIP code). Key features: token streaming, model selection (Haiku default), extended thinking, graceful stop, Braintrust telemetry, YAML personas.

---

## Phase 1: WebSocket Infrastructure

### 1.1 Zod Message Schema
- [ ] Create `server/utils/ai/ws/schema.ts`
- [ ] Define client→server messages: `chat`, `stop`, `subscribe`
- [ ] Define server→client messages: `token`, `thinking`, `tool_use`, `tool_result`, `done`, `error`
- [ ] Export shared types for frontend

### 1.2 WebSocket Handler (Orchestrator)
- [ ] Create `server/utils/ai/ws/websocket-handler.ts`
- [ ] Session management: create/retrieve by chat ID from DB
- [ ] Client subscription tracking (multiple tabs = independent sessions)
- [ ] Message routing by type
- [ ] Auto-reconnect support: resume from last message on reconnect

### 1.3 Session Class
- [ ] Create `server/utils/ai/ws/session.ts`
- [ ] One session per chat (DB-backed)
- [ ] Message queue with single-query-at-a-time
- [ ] Streaming callback to WebSocket (token-by-token)
- [ ] Stop support: graceful abort, finish current sentence/tool

### 1.4 Wire Up Nitro Route
- [ ] Update `server/routes/_ws.ts` to use new WebSocketHandler
- [ ] Remove placeholder response logic

---

## Phase 2: Agent SDK Integration

### 2.1 AI Client Wrapper
- [ ] Create `server/utils/ai/ws/ai-client.ts`
- [ ] Wrap Claude Agent SDK
- [ ] Model selection: user-configurable, Haiku default, Haiku for anonymous
- [ ] Extended thinking enabled (stream thinking tokens)
- [ ] Max turns config with partial+warning on limit hit

### 2.2 MCP Tool Integration
- [ ] Wire existing MCP server from `tools/index.ts`
- [ ] Tools: `searchBlogContent`, `getCurrentDateTime`, `getAuthorInfo`, etc.
- [ ] Full snippets in search results (not truncated)

### 2.3 Persona System
- [ ] Create `server/config/personas.yaml`
- [ ] Define persona schema: name, system_prompt, allowed_tools
- [ ] Default persona: blog assistant
- [ ] Load personas on server start
- [ ] Allow per-chat persona selection

---

## Phase 3: Telemetry & Persistence

### 3.1 Braintrust Integration
- [ ] Add trace spans for each agent turn
- [ ] Track: latency, model used, token counts, tool calls
- [ ] Trace errors with context

### 3.2 Database Persistence
- [ ] Store final assistant messages after stream ends
- [ ] Store tool call history (tool_use + tool_result pairs)
- [ ] Link to existing chat/message tables

---

## Phase 4: Frontend Migration

### 4.1 Replace useChat Composable
- [ ] Rewrite `app/composables/useChat.ts` with WebSocket
- [ ] Token-by-token streaming display
- [ ] Handle message types: token, thinking, tool_use, tool_result, done, error
- [ ] Auto-reconnect on disconnect
- [ ] Stop generation button (graceful stop)

### 4.2 Model Selection UI
- [ ] Add model selector to chat interface
- [ ] Options: Haiku (default), Sonnet, Opus
- [ ] Disable selector for anonymous users (Haiku only)
- [ ] Persist selection per chat

### 4.3 UI Updates
- [ ] Inline tool_use/tool_result display (keep current style)
- [ ] Thinking tokens display (keep current style)
- [ ] Connection status indicator
- [ ] Error handling UI

---

## Phase 5: Cleanup

### 5.1 Remove SSE Implementation
- [ ] Delete `server/api/chats/[id].post.ts`
- [ ] Remove SSE-related code from useChat (already replaced)
- [ ] Clean up unused imports/types

### 5.2 Remove WIP Code
- [ ] Delete unused agent types from `server/utils/ai/agents/`
- [ ] Clean up keyword-based routing scaffolding
- [ ] Keep only new WebSocket implementation

---

## Files Summary

**Create:**
```
server/utils/ai/ws/
├── schema.ts           # Zod message types
├── websocket-handler.ts # Orchestrator
├── session.ts          # Per-chat agent session
└── ai-client.ts        # Agent SDK wrapper

server/config/
└── personas.yaml       # Configurable personas
```

**Modify:**
```
server/routes/_ws.ts        # Wire new handler
app/composables/useChat.ts  # WebSocket rewrite
```

**Delete:**
```
server/api/chats/[id].post.ts  # SSE endpoint
server/utils/ai/agents/*       # WIP code
```

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Session persistence | DB-backed (existing) | Chats already in DB |
| Disconnect handling | Auto-reconnect + resume | Best UX |
| Multi-tab | Independent sessions | Simpler, no shared state |
| Model default | Haiku | Cost-effective, fast |
| Streaming | Token-by-token | Real-time feel |
| Stop generation | Graceful | Finish current unit |
| Protocol | Zod-typed | Runtime validation |
| Telemetry | Braintrust | Already configured |
| Personas | YAML config | Easy to edit |
| Tool approval | None | All auto-execute |
| Max turns exceeded | Partial + warning | Don't lose progress |
| Search results | Full snippets | Complete context |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| WebSocket complexity | Follow email-agent patterns closely |
| Token streaming perf | Batch if needed, but start with per-token |
| Reconnect state sync | Store last message ID, resume from there |
| Persona changes mid-chat | Lock persona for chat lifetime |

---

## Testing Requirements

**All tasks must include tests. No task is complete without passing tests.**

- **Red-Green testing**: Write failing test first, then implement to pass
- **No mocking**: Use real dependencies, real DB, real WebSocket connections
- **Frontend testing**: Use Claude in Chrome MCP to test web interface interactions
- **Integration tests**: Test full flow from WebSocket connect → agent response → DB persistence

---

## Out of Scope (Future)

- Listeners (event-driven sub-agents)
- Actions (user-triggered workflows)
- UI State manager
- Rate limiting
- Tool approval flows
