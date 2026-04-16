# MCP Server Integration for Chat Agent

**Date:** 2026-04-16
**Status:** Draft
**Author:** Chris Towles

## Problem

The blog chat agent (`server/api/chats/[id].post.ts`) uses a hardcoded `chatTools` array and a manual `executeTool()` switch to define and execute tools. MCP servers (echo, aviation) exist at `/mcp/*` but are only accessible via client-side composables that bypass the Anthropic agent loop entirely. There is no way for the AI agent to discover or invoke MCP tools — users must click dedicated UI buttons or use the direct MCP client path.

The goal is to register MCP servers with the chat agent so Claude can discover and call their tools naturally during conversation.

## Approach: Two-Tier MCP Integration

The Anthropic SDK supports two patterns for connecting MCP servers. Both will be used, selected by whether the MCP server is co-hosted (internal) or remote (external).

### Tier 1: Internal MCP Servers (client-side helpers)

**For:** Co-hosted MCP servers running on the same Nuxt/Nitro process (`/mcp/echo`, `/mcp/aviation`).

**Pattern:** Use the SDK's `mcpTools()` helper from `@anthropic-ai/sdk/helpers/beta/mcp`. The Nitro server acts as an MCP client, connecting to its own MCP endpoints via `StreamableHTTPClientTransport`, discovering tools, and converting them for the Anthropic tool runner.

**Why not the MCP Connector (`mcp_servers` API param)?** The MCP Connector requires Anthropic's servers to reach the MCP endpoint over HTTPS at a public URL. Co-hosted servers run at `localhost` during development — unreachable from Anthropic's infrastructure. The client-side helper pattern works identically in dev and prod because the connection is server-to-server on the same host.

**Flow:**

```
1. Chat request arrives at [id].post.ts
2. Server creates MCP client → connects to localhost/mcp/echo (StreamableHTTP)
3. mcpClient.listTools() discovers tools
4. mcpTools(tools, mcpClient) converts to Anthropic format + wires execution
5. Pass converted tools alongside chatTools to beta.messages.stream() or toolRunner()
6. When Claude calls an MCP tool, the helper calls mcpClient.callTool() automatically
7. Tool result flows back through the normal streaming loop
```

**Key details:**

- MCP client connections should be pooled/cached per server (not created per request)
- The `mcpTools()` helper auto-wires execution — no `executeTool()` case needed
- Existing `chatTools` (weather, dice, search, etc.) remain as-is alongside MCP tools
- Response includes `mcp_tool_use` / `mcp_tool_result` content block types (not regular `tool_use`)

### Tier 2: External MCP Servers (MCP Connector API)

**For:** Third-party MCP servers at public HTTPS URLs (GitHub MCP, Linear, Notion, etc.).

**Pattern:** Use the `mcp_servers` + `mcp_toolset` parameters directly on `beta.messages.create()`. Anthropic's servers connect to the remote MCP server, discover tools, and execute them server-side. No client-side MCP client needed.

**Beta header:** `mcp-client-2025-11-20` (current SDK v0.52.0 only has `mcp-client-2025-04-04` — SDK upgrade needed for the new version, or use the deprecated header which still works).

**Flow:**

```
1. Chat request arrives at [id].post.ts
2. Server passes mcp_servers array with external server URLs to beta.messages.create()
3. Anthropic connects to the external MCP server, discovers tools
4. Claude calls tools → Anthropic executes them server-side
5. mcp_tool_use / mcp_tool_result blocks appear in the stream
6. No client-side execution needed — Anthropic handles everything
```

**Key details:**

- Servers must be publicly accessible over HTTPS
- Authentication via `authorization_token` (OAuth bearer token)
- Tool filtering via `mcp_toolset` configs (allowlist/denylist patterns)
- Each `mcp_servers` entry must be referenced by exactly one `mcp_toolset` in `tools`
- Response blocks are `mcp_tool_use` / `mcp_tool_result` (same as Tier 1 from the stream perspective)

## Implementation Scope

### Phase 1: Internal MCP via client-side helpers (echo test)

1. **Upgrade `@anthropic-ai/sdk`** — ensure `mcpTools` helper is available (check current version supports `@anthropic-ai/sdk/helpers/beta/mcp`)
2. **Create server-side MCP client pool** — a utility that maintains MCP client connections to internal servers, keyed by endpoint path
3. **Wire into `[id].post.ts`** — discover tools from internal MCP servers, convert via `mcpTools()`, merge with existing `chatTools`, pass to the streaming call
4. **Handle `mcp_tool_use` / `mcp_tool_result` in the streaming loop** — these are new content block types that need to be streamed to the client as SSE events and persisted as message parts
5. **Update chat UI** — render MCP tool invocations in the chat thread (may reuse `ToolInvocation` component or create a new one)
6. **Test with echo MCP server** — verify the AI agent can discover and call the echo tool when user types "test the mcp echo"

### Phase 2: External MCP via MCP Connector (future)

1. **Add `mcp_servers` config** — runtime config or env vars for external MCP server URLs + auth tokens
2. **Pass `mcp_servers` + `mcp_toolset` to `beta.messages.create()`** — alongside existing tools
3. **Add beta header** — `mcp-client-2025-11-20` (or upgrade SDK)
4. **No execution handling needed** — Anthropic handles tool execution server-side

### Non-Goals

- Migrating aviation's client-side bypass path (it serves a different purpose — direct MCP without the AI agent loop)
- Supporting MCP resources or prompts (only tools are supported by either approach)
- Building a generic MCP server registry UI

## Streaming Implications

Both tiers produce `mcp_tool_use` and `mcp_tool_result` content blocks in the stream, which differ from regular `tool_use` / `tool_result`:

```json
// mcp_tool_use (in stream)
{
  "type": "mcp_tool_use",
  "id": "mcptoolu_...",
  "name": "echo",
  "server_name": "echo-mcp",
  "input": { "message": "hello" }
}

// mcp_tool_result (in stream)
{
  "type": "mcp_tool_result",
  "tool_use_id": "mcptoolu_...",
  "is_error": false,
  "content": [{ "type": "text", "text": "..." }]
}
```

The streaming handler in `[id].post.ts` needs to:

- Detect `mcp_tool_use` blocks (content_block_start with type `mcp_tool_use`)
- Stream them to the client as tool_start SSE events
- Detect `mcp_tool_result` blocks
- Stream them as tool_end SSE events
- For Tier 1 (client-side helpers with `toolRunner`): the tool runner handles the loop, so the manual `while(turnCount < maxTurns)` loop may need to be replaced or adapted

## SDK Requirements

- `@anthropic-ai/sdk` — needs version with `mcpTools` helper in `helpers/beta/mcp`. Check if v0.52.0 has it; if not, upgrade.
- `@modelcontextprotocol/sdk` — already installed (used by aviation MCP). Provides `Client` and `StreamableHTTPClientTransport`.
- Beta header `mcp-client-2025-11-20` needed for Tier 2 (external). Tier 1 (client-side helpers) does not require a beta header since tool conversion happens locally.

## Success Criteria

- User types "test the mcp echo" in chat → AI agent discovers and calls the echo tool → echo result appears in the chat thread
- Existing tools (weather, dice, search) continue to work alongside MCP tools
- MCP tool invocations are persisted in message parts and visible on page reload
- No regression in aviation's direct MCP path (client-side composable bypass)

## Open Questions

1. **Tool runner migration** — The `mcpTools()` helper is designed for `toolRunner()`, but the current chat uses a manual stream loop. Can we use `mcpTools()` with the manual loop, or do we need to migrate to `toolRunner()`? Research the helper's API surface.
2. **MCP client lifecycle** — Should MCP clients be created once at server startup, or lazily per-chat? Need to handle connection drops and reconnection.
3. **UI rendering for MCP tools** — Should MCP tool results render differently from regular tools? The echo MCP has a `ui://` resource — should that render as an iframe (like aviation) or as a simple tool result card?
