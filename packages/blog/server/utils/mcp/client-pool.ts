/**
 * Server-side MCP client pool — maintains connections to internal MCP servers
 * and exposes a high-level `callMcpTool` that extracts any `ui://` resource +
 * text content from a tool call.
 *
 * The Anthropic SDK's `mcpTools()` helper drops `EmbeddedResource` blocks, so
 * the chat streaming handler can't use it directly when a UI resource matters.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { mcpTools, type MCPClientLike } from '@anthropic-ai/sdk/helpers/beta/mcp';
import type { BetaRunnableTool } from '@anthropic-ai/sdk/lib/tools/BetaRunnableTool';
import type {
  CallToolResult,
  EmbeddedResource,
  ReadResourceResult,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { log } from 'evlog';
import type { McpUiResourceCsp, McpUiResourcePermissions } from '../../../shared/chat-types';

interface CachedMcpClient {
  client: Client;
  tools: BetaRunnableTool<Record<string, unknown>>[];
  rawTools: Tool[];
  resources: Map<string, ExtractedUiResource>;
}

const pool = new Map<string, CachedMcpClient>();

async function connect(endpointPath: string, baseUrl?: string): Promise<CachedMcpClient | null> {
  const cached = pool.get(endpointPath);
  if (cached) return cached;

  const origin = baseUrl || `http://localhost:${process.env.PORT || 3000}`;
  const url = new URL(endpointPath, origin);

  try {
    const client = new Client({ name: 'blog-chat-mcp-pool', version: '0.1.0' });
    await client.connect(new StreamableHTTPClientTransport(url));
    const { tools: mcpToolList } = await client.listTools();
    const tools = mcpTools(mcpToolList, client as unknown as MCPClientLike);
    const entry: CachedMcpClient = {
      client,
      tools,
      rawTools: mcpToolList,
      resources: new Map(),
    };
    pool.set(endpointPath, entry);
    log.info({
      tag: 'mcp-pool',
      message: `Connected to ${endpointPath}, discovered ${tools.length} tool(s)`,
    });
    return entry;
  } catch (err) {
    log.warn({
      tag: 'mcp-pool',
      message: `Failed to connect to MCP server at ${endpointPath}`,
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

export async function getMcpTools(
  endpointPath: string,
  baseUrl?: string,
): Promise<BetaRunnableTool<Record<string, unknown>>[]> {
  const entry = await connect(endpointPath, baseUrl);
  return entry?.tools ?? [];
}

export interface ExtractedUiResource {
  uri: string;
  html: string;
  csp?: McpUiResourceCsp;
  permissions?: McpUiResourcePermissions;
}

export interface McpToolCallOutcome {
  /** Concatenated text content suitable for feeding back to the model. */
  text: string;
  structuredContent: Record<string, unknown>;
  uiResource?: ExtractedUiResource;
  isError: boolean;
}

/** @internal exported for unit tests */
export function extractUiResource(result: CallToolResult): ExtractedUiResource | undefined {
  for (const block of result.content ?? []) {
    if (block.type !== 'resource') continue;
    const resource = (block as EmbeddedResource).resource;
    if (!resource || typeof resource !== 'object') continue;
    const uri = (resource as { uri?: unknown }).uri;
    if (typeof uri !== 'string' || !uri.startsWith('ui://')) continue;
    const text = (resource as { text?: unknown }).text;
    const meta =
      (resource as { _meta?: unknown; meta?: unknown })._meta ??
      (resource as { meta?: unknown }).meta;
    const uiMeta =
      meta && typeof meta === 'object' && 'ui' in meta
        ? (meta as { ui?: { csp?: McpUiResourceCsp; permissions?: McpUiResourcePermissions } }).ui
        : undefined;
    return {
      uri,
      html: typeof text === 'string' ? text : '',
      csp: uiMeta?.csp,
      permissions: uiMeta?.permissions,
    };
  }
  return undefined;
}

/** @internal exported for unit tests */
export function toolUiResourceUri(tool: Tool | undefined): string | undefined {
  const meta = tool?._meta;
  if (!meta || typeof meta !== 'object') return undefined;
  const ui = (meta as { ui?: unknown }).ui;
  if (!ui || typeof ui !== 'object') return undefined;
  const uri = (ui as { resourceUri?: unknown }).resourceUri;
  return typeof uri === 'string' && uri.startsWith('ui://') ? uri : undefined;
}

/** @internal exported for unit tests */
export function extractUiResourceFromRead(
  uri: string,
  read: ReadResourceResult,
): ExtractedUiResource | undefined {
  for (const content of read.contents ?? []) {
    const cUri = (content as { uri?: unknown }).uri;
    if (typeof cUri !== 'string' || cUri !== uri) continue;
    const text = (content as { text?: unknown }).text;
    const meta = (content as { _meta?: unknown })._meta;
    const uiMeta =
      meta && typeof meta === 'object' && 'ui' in meta
        ? (meta as { ui?: { csp?: McpUiResourceCsp; permissions?: McpUiResourcePermissions } }).ui
        : undefined;
    return {
      uri,
      html: typeof text === 'string' ? text : '',
      csp: uiMeta?.csp,
      permissions: uiMeta?.permissions,
    };
  }
  return undefined;
}

async function resolveUiResource(
  entry: CachedMcpClient,
  toolName: string,
  inline: ExtractedUiResource | undefined,
): Promise<ExtractedUiResource | undefined> {
  if (inline) return inline;
  const tool = entry.rawTools.find((t) => t.name === toolName);
  const uri = toolUiResourceUri(tool);
  if (!uri) return undefined;
  const cached = entry.resources.get(uri);
  if (cached) return cached;
  try {
    const read = (await entry.client.readResource({ uri })) as ReadResourceResult;
    const resolved = extractUiResourceFromRead(uri, read);
    if (resolved) entry.resources.set(uri, resolved);
    return resolved;
  } catch (err) {
    log.warn({
      tag: 'mcp-pool',
      message: `readResource ${uri} failed: ${err instanceof Error ? err.message : String(err)}`,
    });
    return undefined;
  }
}

function extractText(result: CallToolResult): string {
  const parts: string[] = [];
  for (const block of result.content ?? []) {
    if (block.type === 'text' && typeof (block as { text?: unknown }).text === 'string') {
      parts.push((block as { text: string }).text);
    }
  }
  if (parts.length > 0) return parts.join('\n');
  const sc = (result as { structuredContent?: unknown }).structuredContent;
  return sc && typeof sc === 'object' ? JSON.stringify(sc) : '';
}

/**
 * Invoke an MCP tool and extract text + any embedded UI resource. Returns an
 * error-shaped outcome (never null / never throws) so callers always have a
 * tool_result string to feed back to the model without tearing down SSE.
 */
export async function callMcpTool(
  endpointPath: string,
  name: string,
  args: Record<string, unknown>,
  baseUrl?: string,
): Promise<McpToolCallOutcome> {
  const entry = await connect(endpointPath, baseUrl);
  if (!entry) {
    return errorOutcome(`MCP endpoint ${endpointPath} is unavailable`);
  }
  try {
    const result = (await entry.client.callTool({ name, arguments: args })) as CallToolResult;
    const uiResource = await resolveUiResource(entry, name, extractUiResource(result));
    return {
      text: extractText(result),
      structuredContent:
        (result as { structuredContent?: Record<string, unknown> }).structuredContent ?? {},
      uiResource,
      isError: Boolean((result as { isError?: boolean }).isError),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log.warn({ tag: 'mcp-pool', message: `MCP tool ${name} threw: ${message}` });
    return errorOutcome(`MCP tool ${name} failed: ${message}`);
  }
}

function errorOutcome(text: string): McpToolCallOutcome {
  return { text, structuredContent: {}, isError: true };
}

export async function disposeMcpClients(): Promise<void> {
  for (const [path, { client }] of pool.entries()) {
    try {
      await client.close();
    } catch {
      // swallow
    }
    pool.delete(path);
  }
}

export function invalidateMcpClient(endpointPath: string): void {
  const cached = pool.get(endpointPath);
  if (cached) {
    void cached.client.close().catch(() => {});
    pool.delete(endpointPath);
  }
}
