import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { useRuntimeConfig } from '#imports';
import { z } from 'zod';

async function createServer(endpointPath: string): Promise<McpServer> {
  switch (endpointPath) {
    case '/mcp/echo': {
      const { createEchoMcpServer } = await import('./echo/server');

      return createEchoMcpServer();
    }

    case '/mcp/aviation': {
      const { createAviationMcpServer } = await import('./aviation/server');
      const siteUrl = z.string().catch('').parse(useRuntimeConfig().public.siteUrl);

      return createAviationMcpServer(siteUrl);
    }

    default:
      throw new Error(`No in-process MCP server at ${endpointPath}`);
  }
}

/** A client wired straight to a fresh instance of the MCP server behind `endpointPath`. */
export async function connectInProcess(endpointPath: string): Promise<Client> {
  const server = await createServer(endpointPath);
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: 'blog-chat-mcp', version: '0.1.0' });

  await server.connect(serverTransport);
  await client.connect(clientTransport);

  return client;
}
