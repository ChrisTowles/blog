# Implementation Plan: Multi-Agent Chat System

**Date**: 2026-01-04
**Task**: Replace SSE chat with Anthropic Agent SDK multi-agent orchestrator

---

## Summary

Replace the current SSE-based chat implementation with a multi-agent system using the Anthropic Agent SDK. An orchestrator routes queries to 3 specialized subagents (Blog Search, General Assistant, Weather). Communication via WebSockets instead of SSE.

---

## Key Decisions

| Decision              | Choice                                             |
| --------------------- | -------------------------------------------------- |
| Agent count           | 3 (Blog Search, General Assistant, Weather)        |
| Orchestrator behavior | Hybrid - handles simple queries, delegates complex |
| Routing strategy      | Hybrid - keywords first, LLM fallback              |
| Execution model       | Sequential (parallel later)                        |
| Models                | Haiku 4.5 for everything                           |
| Streaming             | WebSockets (Nuxt useWebSocket)                     |
| Extended thinking     | Enabled for both orchestrator and subagents        |
| RAG handling          | Raw chunks to agent for synthesis                  |
| Uncertainty fallback  | Default to General Assistant                       |
| Caching               | None initially                                     |
| Schema changes        | Add agent_type + routing_decision columns          |
| Prompts storage       | Code (version controlled)                          |
| Auth                  | Token in WS query param                            |
| Message format        | JSON with type field                               |
| Fallback              | None - clean cutover                               |
| Rollout               | Big bang (no feature flag)                         |

---

## Phase 1: WebSocket Infrastructure

### TODO 1.1: Set up Nitro WebSocket support

- [ ] Configure `nuxt.config.ts` for experimental WebSocket support
- [ ] Create `/server/routes/_ws.ts` WebSocket handler
- [ ] Implement connection authentication (token query param)
- [ ] Add connection lifecycle management (connect/disconnect/error)

### TODO 1.2: Create WebSocket message protocol

- [ ] Define message types: `chunk`, `done`, `error`, `thinking`, `tool_use`, `tool_result`
- [ ] Create TypeScript interfaces for all message types
- [ ] Implement message serialization/deserialization helpers

### TODO 1.3: Frontend WebSocket composable

- [ ] Create `useAgentChat()` composable using Nuxt's `useWebSocket`
- [ ] Handle reconnection logic
- [ ] Parse incoming message types
- [ ] Manage chat state (messages, loading, error)
- [ ] Replace `useChat()` calls in components

---

## Phase 2: Agent SDK Integration

### TODO 2.1: Install and configure Agent SDK

- [ ] Add `@anthropic-ai/agent-sdk` dependency
- [ ] Create agent configuration types
- [ ] Set up Anthropic client with runtime config

### TODO 2.2: Create orchestrator agent

- [ ] Define orchestrator system prompt (routing logic)
- [ ] Implement hybrid routing:
  - Keyword detection for obvious cases (blog, weather)
  - Handle greetings/simple queries directly
  - Classify ambiguous queries with LLM
- [ ] Configure Haiku 4.5 model
- [ ] Enable extended thinking

### TODO 2.3: Create Blog Search subagent

- [ ] Define system prompt for technical blog queries
- [ ] Attach tools: `searchBlogContent`, `getBlogTopics`
- [ ] Configure to receive raw RAG chunks
- [ ] Enable extended thinking

### TODO 2.4: Create General Assistant subagent

- [ ] Define system prompt for general conversation
- [ ] Attach tools: `getAuthorInfo`, `getCurrentDateTime`, `rollDice`
- [ ] Configure as default fallback
- [ ] Enable extended thinking

### TODO 2.5: Create Weather subagent

- [ ] Define system prompt for weather queries
- [ ] Attach tool: `getWeather`
- [ ] Enable extended thinking

---

## Phase 3: Message Handling & Streaming

### TODO 3.1: Implement agent-to-WebSocket bridge

- [ ] Create streaming handler for Agent SDK `query()` output
- [ ] Map agent events to WebSocket message types
- [ ] Handle multi-turn tool calling
- [ ] Stream thinking tokens when available

### TODO 3.2: Conversation context management

- [ ] Load chat history from database on connect
- [ ] Pass conversation context to orchestrator
- [ ] Handle context window limits (summarize if needed)

### TODO 3.3: Error handling

- [ ] Catch agent errors and send via WebSocket
- [ ] Handle tool execution failures gracefully
- [ ] Implement timeout handling for slow agents

---

## Phase 4: Database & Persistence

### TODO 4.1: Schema migration

- [ ] Add `agent_type` column to messages table (nullable string)
- [ ] Add `routing_decision` column to messages table (nullable JSON)
- [ ] Create and run Drizzle migration

### TODO 4.2: Message persistence

- [ ] Save messages with agent_type metadata
- [ ] Log routing decisions for analytics
- [ ] Preserve existing message part structure

---

## Phase 5: Frontend Migration

### TODO 5.1: Update ChatMessage component

- [ ] Handle new WebSocket message types
- [ ] Display agent attribution (optional)
- [ ] Show routing info in debug mode

### TODO 5.2: Update chat pages

- [ ] Replace SSE-based `useChat()` with `useAgentChat()`
- [ ] Update loading states for WebSocket
- [ ] Handle connection state UI

### TODO 5.3: Remove legacy SSE code

- [ ] Delete `/server/api/chats/[id].post.ts` SSE handler
- [ ] Remove old `useChat()` composable (or mark deprecated)
- [ ] Clean up unused SSE utilities

---

## Phase 6: Testing & Validation

### TODO 6.1: Unit tests

- [ ] Test routing keyword detection
- [ ] Test message type serialization
- [ ] Test agent configuration loading

### TODO 6.2: Integration tests

- [ ] Test WebSocket connection lifecycle
- [ ] Test full chat flow through agents
- [ ] Test each subagent with sample queries

### TODO 6.3: Manual testing

- [ ] Test blog search queries
- [ ] Test weather queries
- [ ] Test general conversation
- [ ] Test edge cases (long queries, special characters)
- [ ] Test reconnection behavior

---

## File Structure

```
packages/blog/
├── server/
│   ├── routes/
│   │   └── _ws.ts                    # WebSocket handler (NEW)
│   ├── utils/
│   │   └── ai/
│   │       ├── agents/
│   │       │   ├── orchestrator.ts   # Lead agent (NEW)
│   │       │   ├── blog-search.ts    # Blog subagent (NEW)
│   │       │   ├── general.ts        # General subagent (NEW)
│   │       │   ├── weather.ts        # Weather subagent (NEW)
│   │       │   └── types.ts          # Agent types (NEW)
│   │       ├── ws/
│   │       │   ├── protocol.ts       # Message types (NEW)
│   │       │   └── bridge.ts         # Agent-to-WS bridge (NEW)
│   │       └── agent.ts              # Existing (update)
│   └── database/
│       └── schema.ts                 # Add columns
├── app/
│   ├── composables/
│   │   └── useAgentChat.ts           # New WS composable (NEW)
│   └── components/
│       └── chat/                     # Update existing
└── nuxt.config.ts                    # Add WS config
```

---

## Risk Mitigation

| Risk                          | Mitigation                               |
| ----------------------------- | ---------------------------------------- |
| WebSocket complexity          | Start with basic implementation, iterate |
| Token costs (multi-agent)     | Using Haiku everywhere, monitor usage    |
| Breaking change               | No fallback, but thorough testing first  |
| Context loss on WS disconnect | Reload history on reconnect              |

---

## Success Criteria

- [ ] Chat works end-to-end via WebSockets
- [ ] Queries correctly route to appropriate agents
- [ ] Blog search returns relevant RAG results
- [ ] Weather queries work
- [ ] Extended thinking visible in UI
- [ ] Messages persist with agent metadata
- [ ] No regression in response quality

---

## Estimated Token Usage

- Current (single agent): ~1x baseline
- Multi-agent (Haiku everywhere): ~4-8x baseline
- With extended thinking: Additional ~20% overhead

Monitor with `routing_decision` logging to optimize later.
