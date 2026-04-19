import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import type { CallToolResult, EmbeddedResource } from '@modelcontextprotocol/sdk/types.js';
import {
  ECHO_TOOL_NAMES,
  ECHO_UI_RESOURCE_URI,
  type EchoToolResult,
} from '~~/shared/mcp-echo-types';
import type { McpUiResourceCsp, McpUiResourcePermissions } from '~~/shared/chat-types';

const IMPLEMENTATION = { name: 'blog-chat-echo-client', version: '0.1.0' };

export interface EchoPayload {
  toolCallId: string;
  uiResourceUri: string;
  structuredContent: EchoToolResult;
  csp?: McpUiResourceCsp;
  permissions?: McpUiResourcePermissions;
  html: string;
  error: boolean;
}

interface Internals {
  client: Client | null;
  connecting: Promise<Client> | null;
}

function looksLikeSessionExpired(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const msg = 'message' in err ? String((err as { message: unknown }).message) : '';
  return /404|session expired|not found/i.test(msg);
}

function extractUiResource(
  result: CallToolResult,
): { html: string; csp?: McpUiResourceCsp; permissions?: McpUiResourcePermissions } | null {
  for (const block of result.content ?? []) {
    if (block.type !== 'resource') continue;
    const embedded = block as EmbeddedResource;
    const resource = embedded.resource;
    if (!resource || typeof resource !== 'object') continue;
    if (resource.uri !== ECHO_UI_RESOURCE_URI) continue;
    const textField = (resource as { text?: unknown }).text;
    const html = typeof textField === 'string' ? textField : '';
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

export interface UseEchoMcpOptions {
  endpoint?: string;
  createTransport?: (url: URL) => unknown;
}

export function useEchoMcp(options: UseEchoMcpOptions = {}) {
  const endpoint = options.endpoint ?? '/mcp/echo';
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
      await client.connect(transport as Parameters<Client['connect']>[0]);
      state.client = client;
      return client;
    })();

    try {
      return await state.connecting;
    } finally {
      state.connecting = null;
    }
  }

  async function dispose(): Promise<void> {
    const prev = state.client;
    state.client = null;
    if (prev) await prev.close().catch(() => undefined);
  }

  async function callEchoOnce(message: string): Promise<EchoPayload> {
    const client = await connect();
    const toolCallId = crypto.randomUUID();
    const result = (await client.callTool({
      name: ECHO_TOOL_NAMES.ECHO,
      arguments: { message },
    })) as CallToolResult & { structuredContent?: EchoToolResult };

    const structuredContent = (result.structuredContent ?? {}) as EchoToolResult;
    const ui = extractUiResource(result);

    return {
      toolCallId,
      uiResourceUri: ECHO_UI_RESOURCE_URI,
      structuredContent,
      csp: ui?.csp,
      permissions: ui?.permissions,
      html: ui?.html ?? '',
      error: Boolean(result.isError),
    };
  }

  async function callEcho(message: string): Promise<EchoPayload> {
    try {
      return await callEchoOnce(message);
    } catch (err) {
      if (!looksLikeSessionExpired(err)) throw err;
      await dispose();
      return await callEchoOnce(message);
    }
  }

  return { callEcho, dispose };
}

export type UseEchoMcpReturn = ReturnType<typeof useEchoMcp>;
