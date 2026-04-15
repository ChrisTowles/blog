/**
 * useAviationMcp — blog-side MCP client for /mcp/aviation.
 *
 * One connection per page/chat-session, reused across starter-question clicks
 * and follow-up chips. `Mcp-Session-Id` is managed automatically by the SDK's
 * `StreamableHTTPClientTransport`.
 *
 * Reconnect semantics (per plan Key Decisions + SEP research): expired sessions
 * return 404 not 400. On the first 404 we silently open a fresh client; a
 * second 404 bubbles up so the caller can surface a retry.
 *
 * This composable bypasses the Anthropic agent loop entirely (plan line 114).
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import type { CallToolResult, EmbeddedResource } from '@modelcontextprotocol/sdk/types.js';
import {
  AVIATION_TOOL_NAMES,
  AVIATION_UI_RESOURCE_URI,
  type AviationToolResult,
} from '~~/shared/mcp-aviation-types';
import type { McpUiResourceCsp, McpUiResourcePermissions } from '~~/shared/chat-types';

const IMPLEMENTATION = { name: 'blog-chat-mcp-client', version: '0.1.0' };

/** The payload every call to `callAsk` resolves with. */
export interface AviationAskPayload {
  toolCallId: string;
  uiResourceUri: string;
  structuredContent: AviationToolResult;
  csp?: McpUiResourceCsp;
  permissions?: McpUiResourcePermissions;
  /** Inline iframe HTML (from the EmbeddedResource returned by ask_aviation). */
  html: string;
  /** True if the tool result was an error shape (still usable — structuredContent is the fallback). */
  error: boolean;
}

interface Internals {
  client: Client | null;
  connecting: Promise<Client> | null;
}

function looksLikeSessionExpired(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const msg = 'message' in err ? String((err as { message: unknown }).message) : '';
  // SDK surfaces HTTP 404 as "HTTP 404" / "Session expired" depending on version.
  return /404|session expired|not found/i.test(msg);
}

function extractUiResource(
  result: CallToolResult,
): { html: string; csp?: McpUiResourceCsp; permissions?: McpUiResourcePermissions } | null {
  const content = result.content ?? [];
  for (const block of content) {
    if (block.type !== 'resource') continue;
    const embedded = block as EmbeddedResource;
    const resource = embedded.resource;
    if (!resource || typeof resource !== 'object') continue;
    if (resource.uri !== AVIATION_UI_RESOURCE_URI) continue;
    const textField = (resource as { text?: unknown }).text;
    const html = typeof textField === 'string' ? textField : '';
    // CSP + permissions live on the resource's _meta.ui (spec) or .meta (python quirk).
    // biome-ignore lint: spec-level escape hatch.
    const meta =
      (resource as { _meta?: unknown; meta?: unknown })._meta ??
      (resource as { meta?: unknown }).meta;
    const uiMeta =
      meta && typeof meta === 'object' && 'ui' in meta
        ? (meta as { ui?: { csp?: McpUiResourceCsp; permissions?: McpUiResourcePermissions } }).ui
        : undefined;
    return { html, csp: uiMeta?.csp, permissions: uiMeta?.permissions };
  }
  return null;
}

export interface UseAviationMcpOptions {
  /**
   * Base URL of the MCP endpoint. Defaults to `/mcp/aviation` (same-origin).
   * Tests inject an absolute URL.
   */
  endpoint?: string;
  /**
   * Injected for tests. Defaults to `StreamableHTTPClientTransport`.
   * Typed loosely because the SDK's transport surface varies by version.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createTransport?: (url: URL) => any;
}

export function useAviationMcp(options: UseAviationMcpOptions = {}) {
  const endpoint = options.endpoint ?? '/mcp/aviation';
  const state: Internals = { client: null, connecting: null };

  async function connect(): Promise<Client> {
    if (state.client) return state.client;
    if (state.connecting) return state.connecting;

    state.connecting = (async () => {
      const url = new URL(
        endpoint,
        typeof window !== 'undefined' ? window.location.href : 'http://localhost',
      );
      const client = new Client(IMPLEMENTATION);
      const transport = options.createTransport
        ? options.createTransport(url)
        : new StreamableHTTPClientTransport(url);
      await client.connect(transport);
      state.client = client;
      return client;
    })();

    try {
      return await state.connecting;
    } finally {
      state.connecting = null;
    }
  }

  function disposeClient(): void {
    const prev = state.client;
    state.client = null;
    if (prev) {
      // Close is best-effort; swallow errors.
      void prev.close().catch(() => undefined);
    }
  }

  async function callAskOnce(question: string): Promise<AviationAskPayload> {
    const client = await connect();
    const toolCallId = crypto.randomUUID();
    const result = (await client.callTool({
      name: AVIATION_TOOL_NAMES.ASK,
      arguments: { question },
    })) as CallToolResult & { structuredContent?: AviationToolResult };

    const structuredContent = (result.structuredContent ?? {}) as AviationToolResult;
    const ui = extractUiResource(result);

    return {
      toolCallId,
      uiResourceUri: AVIATION_UI_RESOURCE_URI,
      structuredContent,
      csp: ui?.csp,
      permissions: ui?.permissions,
      html: ui?.html ?? '',
      error: Boolean(result.isError),
    };
  }

  /**
   * Call ask_aviation with a user question. On a 404 session-expired error,
   * silently reconnect and retry once; a second failure propagates.
   */
  async function callAsk(question: string): Promise<AviationAskPayload> {
    try {
      return await callAskOnce(question);
    } catch (err) {
      if (!looksLikeSessionExpired(err)) throw err;
      disposeClient();
      return await callAskOnce(question);
    }
  }

  async function dispose(): Promise<void> {
    const prev = state.client;
    state.client = null;
    if (prev) await prev.close().catch(() => undefined);
  }

  return { callAsk, dispose };
}

export type UseAviationMcpReturn = ReturnType<typeof useAviationMcp>;
