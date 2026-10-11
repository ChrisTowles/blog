/**
 * Server-side MCP client pool — maintains connections to internal MCP servers
 * and exposes a high-level `callMcpTool` that extracts any `ui://` resource +
 * text content from a tool call.
 *
 * The Anthropic SDK's `mcpTools()` helper drops `EmbeddedResource` blocks, so
 * the chat streaming handler dispatches through `callMcpTool` instead.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import type { BetaTool } from '@anthropic-ai/sdk/resources/beta/messages/messages';
import {
  CallToolResultSchema,
  type CallToolRequest,
  type CallToolResult,
  type ReadResourceResult,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { log } from 'evlog';
import { z } from 'zod';
import type { McpUiResourceCsp, McpUiResourcePermissions } from '../../../shared/chat-types';
import type { JsonObject } from '../../../shared/json-types';

const jsonObjectSchema = z.record(z.string(), z.json());

const uiMetaSchema = z
  .object({
    ui: z
      .object({
        csp: z
          .looseObject({
            connectDomains: z.array(z.string()).optional(),
            resourceDomains: z.array(z.string()).optional(),
            frameDomains: z.array(z.string()).optional(),
          })
          .optional()
          .catch(undefined),
        permissions: z.record(z.string(), z.json()).optional().catch(undefined),
      })
      .optional()
      .catch(undefined),
  })
  .catch({});

const toolUiMetaSchema = z.object({ ui: z.object({ resourceUri: z.string() }) });

interface CachedMcpClient {
  client: Client;
  rawTools: Tool[];
  resources: Map<string, ExtractedUiResource>;
}

const pool = new Map<string, CachedMcpClient>();

async function callToolParsed(
  client: Client,
  params: CallToolRequest['params'],
): Promise<CallToolResult> {
  return CallToolResultSchema.parse(await client.callTool(params));
}

async function connect(endpointPath: string, baseUrl?: string): Promise<CachedMcpClient | null> {
  const cached = pool.get(endpointPath);

  if (cached) return cached;

  const origin = baseUrl || `http://localhost:${process.env.PORT || 3000}`;
  const url = new URL(endpointPath, origin);

  try {
    const client = new Client({ name: 'blog-chat-mcp-pool', version: '0.1.0' });
    await client.connect(new StreamableHTTPClientTransport(url));
    const { tools: mcpToolList } = await client.listTools();

    const entry: CachedMcpClient = {
      client,
      rawTools: mcpToolList,
      resources: new Map(),
    };

    pool.set(endpointPath, entry);
    log.info({
      tag: 'mcp-pool',
      message: `Connected to ${endpointPath}, discovered ${mcpToolList.length} tool(s)`,
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

export async function getMcpTools(endpointPath: string, baseUrl?: string): Promise<BetaTool[]> {
  const entry = await connect(endpointPath, baseUrl);

  return (entry?.rawTools ?? []).map((tool) => ({
    name: tool.name,
    description: tool.description,
    input_schema: tool.inputSchema,
  }));
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
  structuredContent: JsonObject;
  uiResource?: ExtractedUiResource;
  isError: boolean;
}

function toUiResource(uri: string, html: string, meta: Tool['_meta']): ExtractedUiResource {
  const uiMeta = uiMetaSchema.parse(meta).ui;

  return { uri, html, csp: uiMeta?.csp, permissions: uiMeta?.permissions };
}

/** @internal exported for unit tests */
export function extractUiResource(result: CallToolResult): ExtractedUiResource | undefined {
  for (const block of result.content ?? []) {
    if (block.type !== 'resource') continue;
    const { resource } = block;

    if (!resource.uri.startsWith('ui://')) continue;

    return toUiResource(resource.uri, 'text' in resource ? resource.text : '', resource._meta);
  }

  return undefined;
}

/** @internal exported for unit tests */
export function toolUiResourceUri(tool: Tool | undefined): string | undefined {
  const parsed = toolUiMetaSchema.safeParse(tool?._meta);
  const uri = parsed.data?.ui.resourceUri;

  return uri?.startsWith('ui://') ? uri : undefined;
}

/** @internal exported for unit tests */
export function extractUiResourceFromRead(
  uri: string,
  read: ReadResourceResult,
): ExtractedUiResource | undefined {
  for (const content of read.contents ?? []) {
    if (content.uri !== uri) continue;

    return toUiResource(uri, 'text' in content ? content.text : '', content._meta);
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
    const read = await entry.client.readResource({ uri });
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
    if (block.type === 'text') parts.push(block.text);
  }

  if (parts.length > 0) return parts.join('\n');
  const sc = result.structuredContent;

  return sc ? JSON.stringify(sc) : '';
}

/**
 * Invoke an MCP tool and extract text + any embedded UI resource. Returns an
 * error-shaped outcome (never null / never throws) so callers always have a
 * tool_result string to feed back to the model without tearing down SSE.
 */
export async function callMcpTool(
  endpointPath: string,
  name: string,
  args: JsonObject,
  baseUrl?: string,
): Promise<McpToolCallOutcome> {
  // No dedicated span here — the chat handler wraps every tool dispatch in
  // a `tool ${name}` span with `tool.kind=mcp`, `mcp.endpoint`, and `chat.id`,
  // and the OTLP HTTP exporter's auto-instrumented undici span covers the
  // actual hop. Adding a span here just double-counts in NRQL.
  const entry = await connect(endpointPath, baseUrl);

  if (!entry) {
    return errorOutcome(`MCP endpoint ${endpointPath} is unavailable`);
  }

  try {
    const result = await callToolParsed(entry.client, { name, arguments: args });
    const uiResource = await resolveUiResource(entry, name, extractUiResource(result));

    return {
      text: extractText(result),
      structuredContent: jsonObjectSchema.catch({}).parse(result.structuredContent),
      uiResource,
      isError: Boolean(result.isError),
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
