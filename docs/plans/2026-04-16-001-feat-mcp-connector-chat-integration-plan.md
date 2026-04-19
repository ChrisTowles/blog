---
title: 'feat: Integrate MCP servers with chat agent via Anthropic SDK'
type: feat
status: active
date: 2026-04-16
origin: docs/brainstorms/2026-04-16-mcp-connector-chat-integration-requirements.md
---

# feat: Integrate MCP servers with chat agent via Anthropic SDK

## Overview

Register internal and external MCP servers with the blog chat agent so Claude can discover and invoke MCP tools naturally during conversation. Uses two tiers: client-side `mcpTools()` helper for co-hosted internal servers, and the `mcp_servers` API param (MCP Connector) for external HTTPS servers. Also upgrades the Anthropic SDK from v0.52.0 to v0.89.0.

## Problem Frame

The chat agent has hardcoded tools (weather, dice, search) but cannot discover or call tools from MCP servers. MCP servers exist at `/mcp/echo` and `/mcp/aviation` but are only accessible via client-side composables that bypass the AI agent loop entirely. Users cannot trigger MCP tools through natural conversation. (see origin: `docs/brainstorms/2026-04-16-mcp-connector-chat-integration-requirements.md`)

## Requirements Trace

- R1. User types "test the mcp echo" → AI agent discovers and calls the echo tool → result appears in chat
- R2. Existing tools (weather, dice, search, code execution) continue working alongside MCP tools
- R3. MCP tool invocations are persisted in message parts and visible on page reload
- R4. No regression in aviation's direct MCP path (client-side composable bypass)
- R5. Support external MCP servers via the MCP Connector API param for future use
- R6. Upgrade `@anthropic-ai/sdk` to v0.89.0 and `@anthropic-ai/claude-agent-sdk` to latest

## Scope Boundaries

- Aviation's client-side bypass path (`useAviationMcp`) is not migrated — it serves a different purpose (direct MCP without the AI loop)
- MCP resources and prompts are not supported (only tools — both approaches are tools-only)
- No generic MCP server registry UI
- No `toolRunner()` migration — the manual stream loop is preserved; `mcpTools()` output is used for tool definitions + execution within the existing loop

### Deferred to Separate Tasks

- Connecting specific external MCP servers (GitHub, Linear, etc.): future iteration after the plumbing is proven with echo

## Context & Research

### Relevant Code and Patterns

- `server/api/chats/[id].post.ts` — Chat streaming handler with manual `while(turnCount < maxTurns)` + `for await` loop. Handles `tool_use`, `server_tool_use`, and code execution result blocks. Tools passed via `chatTools` array; execution via `executeTool()` switch.
- `server/utils/ai/tools.ts` — `chatTools` array (Anthropic SDK format) + `executeTool()` function
- `server/utils/ai/tools/index.ts` — Agent SDK tool definitions + `blogToolsServer` MCP server export
- `server/routes/mcp/echo/index.ts` — Echo MCP server (Streamable HTTP, `registerAppTool`)
- `shared/chat-types.ts` — `MessagePart` union: `TextPart | ReasoningPart | ToolUsePart | ToolResultPart | CodeExecutionPart | FilePart | UiResourcePart`
- `app/pages/chat/[id].vue` — Chat UI renders parts by type, `ToolInvocation` for generic tool results

### SDK Research

- **`@anthropic-ai/sdk` v0.89.0** adds `helpers/beta/mcp` with `mcpTools()` / `mcpTool()`. These return `BetaRunnableTool` objects with `name`, `input_schema`, `description`, and a `run(input)` function that calls `mcpClient.callTool()` automatically.
- **`mcpTools()` with manual loop**: The helper returns tool objects that work as tool definitions (pass `name`/`input_schema`/`description` to the API) AND executors (call `.run(input)` when Claude invokes the tool). No `toolRunner()` migration required — we extract both from the same object.
- **MCP Connector** (`mcp_servers` + `mcp_toolset`): Beta header `mcp-client-2025-11-20`. Anthropic connects to external HTTPS MCP servers and handles tool discovery + execution server-side. Response includes `mcp_tool_use` / `mcp_tool_result` content blocks.
- **`mcp_tool_use` blocks**: Have `type: "mcp_tool_use"`, `id` prefixed `mcptoolu_`, `name`, `server_name`, `input`. These are distinct from regular `tool_use` blocks — the streaming handler must detect both.

## Key Technical Decisions

- **Keep manual stream loop**: The `mcpTools()` helper is designed for `toolRunner()`, but the existing manual loop handles code execution, skills, container reuse, and thinking — all of which would need reimplementation in `toolRunner()`. Instead, use `mcpTools()` output within the existing loop: pass tool definitions to the API, call `.run()` for execution.
- **Server-side MCP client pool**: Create MCP client connections lazily (first request), cache per endpoint path, reconnect on failure. Module-scoped Map, similar to the MCP server session map pattern in `server/routes/mcp/aviation/index.ts`.
- **Unified `mcp_tool_use` handling**: Both tiers produce `mcp_tool_use` / `mcp_tool_result` blocks. Internal MCP tools (via `mcpTools()`) appear as regular `tool_use` blocks since they're passed as regular tools. External MCP tools (via `mcp_servers`) appear as `mcp_tool_use` blocks. The streaming handler must handle both.
- **No separate `McpToolUsePart` type**: Reuse the existing `ToolUsePart` / `ToolResultPart` types for MCP tool persistence. The tool name contains enough context.

## Open Questions

### Resolved During Planning

- **Can `mcpTools()` work with the manual loop?** Yes — the returned `BetaRunnableTool` objects have `name`/`input_schema`/`description` for API definitions and `.run(input)` for execution. No `toolRunner()` needed.
- **Does SDK v0.89.0 have breaking changes?** The `beta.messages.stream()` API surface is stable. Key change: `BetaRunnableTool` and helper types are additive. The `thinking` param now supports `{type: "adaptive"}` on Opus/Sonnet 4.6 (current code uses `{type: "enabled", budget_tokens: 4096}` which still works but is deprecated for 4.6 models).

### Deferred to Implementation

- **Exact SDK upgrade breakage**: There may be type-level breaking changes between v0.52.0 and v0.89.0 that only surface during `pnpm typecheck`. Address during the upgrade unit.
- **MCP client connection lifecycle**: Reconnect behavior when the co-hosted MCP server restarts (e.g., during hot reload in dev). Will test empirically.

## Implementation Units

- [ ] **Unit 1: Upgrade Anthropic SDKs**

**Goal:** Upgrade `@anthropic-ai/sdk` from 0.52.0 to 0.89.0 and `@anthropic-ai/claude-agent-sdk` from 0.1.76 to latest. Fix any breaking changes.

**Requirements:** R6

**Dependencies:** None

**Files:**

- Modify: `packages/blog/package.json`
- Modify: `package.json` (root, if lockfile changes)
- Modify: any files with type errors after upgrade
- Test: `pnpm typecheck`, `pnpm test`, `pnpm lint`

**Approach:**

- Bump versions in `package.json`, run `pnpm install`
- Run `pnpm typecheck` and fix any breaking type changes
- Run `pnpm test` and fix any test failures
- The `thinking: {type: "enabled", budget_tokens: 4096}` in `[id].post.ts` still works on 4.6 models but is deprecated — update to `thinking: {type: "adaptive"}` as part of this unit
- Check if `beta.messages.stream()` call signature changed

**Patterns to follow:**

- Existing `betaClient.beta.messages.stream()` pattern in `server/api/chats/[id].post.ts`

**Test scenarios:**

- Happy path: `pnpm typecheck` passes with zero errors after upgrade
- Happy path: `pnpm test` — all existing tests pass
- Happy path: `pnpm lint` — no new errors
- Integration: start dev server, send a chat message, verify streaming works with weather/dice tools

**Verification:**

- All CI checks pass (typecheck, lint, test)
- Chat streaming works end-to-end in the dev server

---

- [ ] **Unit 2: Create server-side MCP client pool**

**Goal:** Build a utility that maintains MCP client connections to internal MCP servers, keyed by endpoint path. Used by the chat handler to discover and execute MCP tools.

**Requirements:** R1

**Dependencies:** Unit 1

**Files:**

- Create: `server/utils/mcp/client-pool.ts`
- Test: `server/utils/mcp/client-pool.test.ts`

**Approach:**

- Module-scoped `Map<string, { client: Client; tools: BetaRunnableTool[] }>` keyed by endpoint path (e.g., `/mcp/echo`)
- `getMcpTools(endpointPath: string)` function: if cached, return tools; if not, create `Client`, connect via `StreamableHTTPClientTransport` to `http://localhost:${port}${endpointPath}`, call `listTools()`, convert via `mcpTools()`, cache and return
- Port discovery: use the request's own origin (available from the H3 event) or `process.env.PORT || 3000`
- Handle connection errors gracefully — log and return empty tools array (don't block chat if MCP server is down)
- Export a `disposeMcpClients()` for cleanup during hot reload

**Patterns to follow:**

- MCP server session map in `server/routes/mcp/aviation/index.ts` (module-scoped Map pattern)
- `useAviationMcp.ts` composable (MCP client connection + reconnect pattern, but server-side)

**Test scenarios:**

- Happy path: `getMcpTools('/mcp/echo')` returns an array with the echo tool definition
- Happy path: calling `getMcpTools` twice returns the cached client (no reconnect)
- Error path: connection failure returns empty array and logs a warning
- Edge case: `disposeMcpClients()` closes all cached clients

**Verification:**

- Unit tests pass
- Importing the module doesn't cause side effects (lazy initialization)

---

- [ ] **Unit 3: Wire MCP tools into the chat streaming handler**

**Goal:** Merge MCP tools from internal servers alongside existing `chatTools` in the `beta.messages.stream()` call, and handle MCP tool execution in the streaming loop.

**Requirements:** R1, R2, R3

**Dependencies:** Unit 2

**Files:**

- Modify: `server/api/chats/[id].post.ts`
- Modify: `server/utils/ai/tools.ts` (if MCP tool execution path needed there)

**Approach:**

- At the top of the handler (before the stream loop), call `getMcpTools('/mcp/echo')` to get `BetaRunnableTool[]`
- Extract tool definitions from `BetaRunnableTool` objects: `{ name, description, input_schema }` — pass these alongside `chatTools` in the `tools` array to `beta.messages.stream()`
- In the `content_block_stop` handler, when a `tool_use` block arrives: check if the tool name matches an MCP tool (from the `BetaRunnableTool` array), if so call `.run(toolArgs)` instead of `executeTool()`
- MCP tool results flow through the existing `toolResults` array and multi-turn loop
- Persist MCP tool calls as `ToolUsePart` / `ToolResultPart` in message parts (same as existing tools)
- Stream MCP tool invocations to the client as `tool_start` / `tool_end` SSE events (same as existing tools)

**Patterns to follow:**

- Existing tool handling in `[id].post.ts` lines 338-388 (content_block_stop → executeTool → toolResults)
- Existing SSE event emission pattern (sendSSE with tool_start/tool_end)

**Test scenarios:**

- Happy path: user sends "test the mcp echo" → AI calls echo tool → echo result streamed back → assistant references the result
- Happy path: user sends "what's the weather" → existing weather tool still works alongside MCP tools
- Happy path: MCP tool result persisted in message parts, visible on page reload
- Error path: MCP tool execution failure → error result sent back to Claude, conversation continues
- Edge case: MCP server unavailable at request time → chat works with only regular tools (graceful degradation)

**Verification:**

- Start dev server, create new chat, type "test the mcp echo" — echo tool invoked and result displayed
- Existing tool tests still pass
- Reload chat page — MCP tool result visible in history

---

- [ ] **Unit 4: Add MCP Connector support for external servers**

**Goal:** Add `mcp_servers` + `mcp_toolset` params to the chat API call for external MCP servers. Handle `mcp_tool_use` / `mcp_tool_result` content blocks in the stream.

**Requirements:** R5

**Dependencies:** Unit 3

**Files:**

- Modify: `server/api/chats/[id].post.ts`
- Modify: `shared/chat-types.ts` (add `McpToolUsePart` if needed for external tool rendering)
- Create: `server/utils/ai/mcp-servers-config.ts` (external MCP server registry)

**Approach:**

- Create a config utility that reads external MCP server definitions from runtime config or env vars: `MCP_EXTERNAL_SERVERS` as JSON array of `{name, url, authorization_token?}`
- In the chat handler, if external servers are configured, add `mcp_servers` array and `mcp_toolset` entries to the `beta.messages.stream()` call
- Add beta header `mcp-client-2025-11-20` to the betas array
- Handle new content block types in the streaming loop:
  - `mcp_tool_use` in `content_block_start` → emit `tool_start` SSE event
  - `mcp_tool_result` in `content_block_start` → emit `tool_end` SSE event (these are server-side, so result arrives as a block, not via our execution)
- External MCP tools are executed server-side by Anthropic — no `.run()` call needed
- Persist `mcp_tool_use` as `ToolUsePart`, `mcp_tool_result` as `ToolResultPart`

**Patterns to follow:**

- Existing `server_tool_use` handling (code execution) — server-side tools that we don't execute locally
- Runtime config pattern in `server/utils/env-config.ts`

**Test scenarios:**

- Happy path: configure an external MCP server URL in env → tools from that server appear in Claude's tool set → Claude can invoke them
- Happy path: `mcp_tool_use` and `mcp_tool_result` blocks stream correctly as SSE events
- Edge case: no external MCP servers configured → `mcp_servers` param omitted, no change in behavior
- Error path: external MCP server unreachable → Anthropic returns error, chat continues with other tools

**Verification:**

- With echo deployed to staging (`https://staging.chris.towles.dev/mcp/echo`), configure it as external → verify AI can call it
- Without external servers configured, existing behavior unchanged

---

- [ ] **Unit 5: Clean up echo dev-test artifacts**

**Goal:** Remove the `/echo` chat input intercept and the echo test button from the chat page. MCP tools are now invocable via the AI agent naturally — no special UI needed.

**Requirements:** R1

**Dependencies:** Unit 3

**Files:**

- Modify: `app/pages/chat/[id].vue`

**Approach:**

- Remove the `handleEchoTest()` function and echo-related state (`echoPending`, `echoInFlight`)
- Remove the "Echo Test (MCP UI)" button from the template
- Remove the `/echo` command intercept from `handleSubmit()`
- Remove the `useEchoMcp` import
- Keep the `echoPending` HTML lookup in `ToolUiResource` `:html` prop removed (no longer needed)
- Aviation bypass path remains untouched

**Patterns to follow:**

- N/A — removal only

**Test scenarios:**

- Happy path: chat page renders without echo button
- Happy path: typing "test the mcp echo" routes through the AI agent (not a special handler)
- Regression: aviation starter questions and follow-up chips still work

**Verification:**

- Chat page loads cleanly, no echo-specific UI
- Aviation path unaffected

## System-Wide Impact

- **Interaction graph:** The chat streaming handler (`[id].post.ts`) gains a new dependency on the MCP client pool (`client-pool.ts`) and the `mcpTools()` SDK helper. MCP client connections are module-scoped and lazily initialized.
- **Error propagation:** MCP tool failures return error results to Claude (same as existing tool errors). MCP client connection failures are caught and logged — chat degrades gracefully to non-MCP tools only.
- **State lifecycle risks:** MCP client connections are cached module-scoped. During hot reload in dev, stale connections may fail — `disposeMcpClients()` should be called on module teardown.
- **API surface parity:** The chat SSE event format (`tool_start` / `tool_end`) is unchanged — MCP tools emit the same events as existing tools.
- **Unchanged invariants:** Aviation's client-side MCP bypass path (`useAviationMcp`, `useEchoMcp`) is not affected. The MCP servers themselves (`/mcp/echo`, `/mcp/aviation`) are not modified.

## Risks & Dependencies

| Risk                                                                           | Mitigation                                                                 |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| SDK upgrade (0.52 → 0.89) may have breaking type changes                       | Unit 1 isolates the upgrade; typecheck + full test suite before proceeding |
| MCP client connecting to localhost may have port mismatches in dev             | Use request origin or `PORT` env var; test in dev server                   |
| External MCP Connector requires HTTPS — can't test locally without tunnel      | Unit 4 is additive; internal MCP (Unit 3) works in dev without it          |
| `thinking: {type: "adaptive"}` may change response behavior vs `budget_tokens` | Test chat quality after upgrade; can revert to `budget_tokens` if needed   |

## Sources & References

- **Origin document:** [docs/brainstorms/2026-04-16-mcp-connector-chat-integration-requirements.md](docs/brainstorms/2026-04-16-mcp-connector-chat-integration-requirements.md)
- **MCP Connector docs:** `https://platform.claude.com/docs/en/agents-and-tools/mcp-connector.md`
- **SDK MCP helpers source:** `anthropic-sdk-typescript/src/helpers/beta/mcp.ts` — `mcpTools()`, `mcpTool()`, `BetaRunnableTool` with `.run()` method
- **SDK MCP example:** `anthropic-sdk-typescript/examples/mcp.ts`
- Related chat handler: `server/api/chats/[id].post.ts`
- Related tool definitions: `server/utils/ai/tools.ts`, `server/utils/ai/tools/index.ts`
