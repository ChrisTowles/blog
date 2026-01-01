# Production Fix: Rework Agent loop to use Direct Anthropic API

**Date**: 2026-01-01
**Status**: Spec Complete
**Timeline**: This week
**Scope**: Clean rewrite from Agent SDK to Direct API

---

## Problem Statement

Claude Agent SDK spawns `claude` CLI subprocess via `ProcessTransport`. CLI not installed in Docker container → immediate exit code 1 on all chat requests.

## Solution: Direct Anthropic API with Tool Calling

Replace Agent SDK with direct `@anthropic-ai/sdk` usage. No subprocess dependency.

---

## Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend (Nuxt)                                            │
│  ├── Chat UI with streaming                                 │
│  ├── Collapsible tool call display                          │
│  └── Cloudflare Turnstile integration                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  API Layer (server/api/chat)                                │
│  ├── Rate limiting (per-IP + global)                        │
│  ├── Turnstile verification                                 │
│  ├── Session cookie management                              │
│  └── OpenTelemetry instrumentation                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Chat Service                                               │
│  ├── Direct Anthropic SDK (messages.create)                 │
│  ├── Tool definitions (RAG search, etc)                     │
│  ├── Tool execution loop                                    │
│  ├── Streaming response handler                             │
│  └── Citation injection                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Data Layer                                                 │
│  ├── RAG service (existing, modular)                        │
│  ├── Conversation storage (Cloud SQL)                       │
│  └── Session management                                     │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow

1. User submits message → Turnstile token included
2. Server validates Turnstile, checks rate limits
3. Load conversation history from DB (via session cookie)
4. Build messages array with system prompt + history + new message
5. Call Anthropic API with streaming + tool definitions
6. On tool_use: execute tool (RAG search), continue conversation
7. Stream response chunks to client
8. On complete: persist full context to DB
9. Return final response with citations

---

## Database Schema

### Tables

```sql
-- Conversations table
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(64) NOT NULL,  -- From cookie
  title VARCHAR(255),               -- Auto-generated from first message
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- Messages table (full context)
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,        -- 'user' | 'assistant' | 'tool_use' | 'tool_result'
  content JSONB NOT NULL,           -- Message content or tool call/result
  token_count INTEGER,              -- Input or output tokens
  model VARCHAR(50),                -- Model version used
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversations_session ON chat_conversations(session_id);
CREATE INDEX idx_conversations_expires ON chat_conversations(expires_at);
CREATE INDEX idx_messages_conversation ON chat_messages(conversation_id);
```

### TTL Cleanup

Cron job or Cloud Scheduler: `DELETE FROM chat_conversations WHERE expires_at < NOW()`

---

## Tool Definitions

### RAG Search Tool

```typescript
const ragSearchTool = {
  name: 'search_blog',
  description: 'Search blog posts for relevant content. Always cite sources.',
  input_schema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query for blog content'
      }
    },
    required: ['query']
  }
}
```

### Tool Execution

```typescript
async function executeTool(toolName: string, input: unknown): Promise<string> {
  switch (toolName) {
    case 'search_blog':
      const results = await ragService.search(input.query)
      // Include post URLs for citation
      return JSON.stringify(results.map(r => ({
        title: r.title,
        excerpt: r.content,
        url: r.url,
        score: r.score
      })))
    default:
      throw new Error(`Unknown tool: ${toolName}`)
  }
}
```

---

## Streaming Implementation

```typescript
// server/api/chat.post.ts
import Anthropic from '@anthropic-ai/sdk'

export default defineEventHandler(async (event) => {
  // Validate turnstile, rate limit, get session...

  const anthropic = new Anthropic()
  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: getSystemPrompt(),
    messages: conversationHistory,
    tools: [ragSearchTool]
  })

  // Set SSE headers
  setHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  for await (const event of stream) {
    if (event.type === 'content_block_delta') {
      // Stream text delta
      sendSSE(event.delta)
    } else if (event.type === 'content_block_start' && event.content_block.type === 'tool_use') {
      // Send tool call start (for collapsible UI)
      sendSSE({ type: 'tool_start', name: event.content_block.name })
    }
    // Handle tool execution, continue loop...
  }
})
```

---

## OpenTelemetry Integration

### Metrics

```typescript
const chatMetrics = {
  requestDuration: meter.createHistogram('chat.request.duration'),
  tokenCount: meter.createCounter('chat.tokens.total'),
  toolCalls: meter.createCounter('chat.tool_calls'),
  errors: meter.createCounter('chat.errors'),
  ragLatency: meter.createHistogram('chat.rag.latency'),
  ragResultCount: meter.createHistogram('chat.rag.results')
}
```

### Traces

- Span per request: includes conversation_id, session_id
- Child spans: tool execution, RAG search, DB operations
- Attributes: token_count, model, tool_names, error_type

---

## Rate Limiting

```typescript
// Per-IP: 10 requests/minute
// Global: 100 requests/minute (cost protection)
// Per-session: 50 messages/hour

const rateLimiter = createRateLimiter({
  limits: [
    { key: 'ip', max: 10, window: 60_000 },
    { key: 'global', max: 100, window: 60_000 },
    { key: 'session', max: 50, window: 3600_000 }
  ]
})
```

---

## Error Handling

| Scenario | User Message |
|----------|--------------|
| RAG no results | "I don't have information about that topic in my blog posts." |
| API rate limit | "I'm experiencing high demand. Please try again in a moment." |
| API error | "Something went wrong. Please try again." |
| Turnstile fail | "Verification failed. Please refresh and try again." |
| Token limit | "This conversation is getting long. Start a new chat?" |

---

## UI Changes

### Tool Call Display

```vue
<template>
  <div v-for="msg in messages">
    <ChatMessage :message="msg" />

    <!-- Collapsible tool calls -->
    <details v-if="msg.toolCalls?.length" class="tool-calls">
      <summary>🔍 Searched blog ({{ msg.toolCalls.length }} results)</summary>
      <div v-for="call in msg.toolCalls" class="tool-result">
        <pre>{{ call.input }}</pre>
        <pre>{{ call.result }}</pre>
      </div>
    </details>
  </div>
</template>
```

### Citations

Auto-append to responses when RAG used:

```markdown
**Sources:**
- [Post Title](/blog/post-slug)
- [Another Post](/blog/another-slug)
```

---

## System Prompt

```
You are a helpful assistant on Chris Towles's blog.

When answering questions:
1. Search the blog using the search_blog tool when relevant
2. Always cite sources with links when using blog content
3. If no relevant blog content exists, honestly say so
4. Be concise and technical

If asked about topics not covered in the blog, you may use general knowledge but clarify you're not drawing from blog posts.
```

---

## Testing Plan

### E2E Tests (with real API)

1. Basic conversation flow
2. Tool call + citation verification
3. Session persistence across requests
4. Rate limit enforcement
5. Turnstile bypass for tests (test keys)
6. Error handling scenarios
7. Streaming integrity

### Test Environment

- Use staging Cloud SQL
- Real Anthropic API (separate test key with low limits)
- Turnstile test sitekey

---

## Implementation Order

1. **Database**: Add Drizzle schema, migrations
2. **Chat service**: Anthropic SDK integration, tool loop
3. **API endpoint**: Streaming, session handling
4. **Rate limiting**: Implement middleware
5. **OpenTelemetry**: Add instrumentation
6. **Frontend**: Update UI for new response format
7. **Turnstile**: Add verification
8. **E2E tests**: Full integration suite
9. **Deploy staging**: Validate
10. **Deploy production**: Monitor

---

## Future Considerations

- Multiple agent personas (swap system prompts)
- Additional MCP tools (DB read, content listing)
- Conversation export
- Admin dashboard for usage analytics
- WebSocket upgrade for lower latency
