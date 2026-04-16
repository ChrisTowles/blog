/**
 * Server-side MCP client pool — maintains connections to internal MCP servers.
 *
 * Used by the chat streaming handler to discover and execute MCP tools.
 * Connections are lazily initialized and cached per endpoint path.
 * The `mcpTools()` helper from `@anthropic-ai/sdk/helpers/beta/mcp` converts
 * MCP tools to `BetaRunnableTool` objects with auto-wired execution.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { mcpTools, type MCPClientLike } from '@anthropic-ai/sdk/helpers/beta/mcp';
import type { BetaRunnableTool } from '@anthropic-ai/sdk/lib/tools/BetaRunnableTool';
import { log } from 'evlog';

interface CachedMcpClient {
  client: Client;
  tools: BetaRunnableTool<Record<string, unknown>>[];
}

const pool = new Map<string, CachedMcpClient>();

/**
 * Get MCP tools for a given internal endpoint path (e.g., '/mcp/echo').
 * Lazily creates the MCP client connection and caches it.
 * Returns an empty array if the connection fails (graceful degradation).
 */
export async function getMcpTools(
  endpointPath: string,
  baseUrl?: string,
): Promise<BetaRunnableTool<Record<string, unknown>>[]> {
  const cached = pool.get(endpointPath);
  if (cached) return cached.tools;

  const origin = baseUrl || `http://localhost:${process.env.PORT || 3000}`;
  const url = new URL(endpointPath, origin);

  try {
    const client = new Client({ name: 'blog-chat-mcp-pool', version: '0.1.0' });
    const transport = new StreamableHTTPClientTransport(url);
    await client.connect(transport);

    const { tools: mcpToolList } = await client.listTools();
    const runnableTools = mcpTools(mcpToolList, client as unknown as MCPClientLike);

    pool.set(endpointPath, { client, tools: runnableTools });
    log.info({
      tag: 'mcp-pool',
      message: `Connected to ${endpointPath}, discovered ${runnableTools.length} tool(s)`,
    });
    return runnableTools;
  } catch (err) {
    log.warn({
      tag: 'mcp-pool',
      message: `Failed to connect to MCP server at ${endpointPath}`,
      error: err instanceof Error ? err.message : String(err),
    });
    return [];
  }
}

/**
 * Close all cached MCP clients. Call during hot-reload or shutdown.
 */
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

/**
 * Invalidate a single cached client (e.g., on connection failure).
 */
export function invalidateMcpClient(endpointPath: string): void {
  const cached = pool.get(endpointPath);
  if (cached) {
    void cached.client.close().catch(() => {});
    pool.delete(endpointPath);
  }
}
