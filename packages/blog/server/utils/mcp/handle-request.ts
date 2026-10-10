/**
 * Stateless Streamable HTTP for the co-hosted MCP servers. A Worker isolate can be recycled or
 * duplicated between any two requests, so there is no `Mcp-Session-Id`: every request builds
 * its own server and transport, answers with plain JSON, and is done.
 */

import { defineEventHandler, setResponseHeader, setResponseStatus, toWebRequest } from 'h3';
import type { H3Event } from 'h3';
import { log } from 'evlog';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { extractErrorMessage } from '../../../shared/error-util';

export function defineStatelessMcpHandler(
  tag: string,
  createServer: (event: H3Event) => McpServer | Promise<McpServer>,
) {
  return defineEventHandler(async (event) => {
    // Without sessions there is no standalone SSE stream to open and nothing to terminate.
    if (event.method !== 'POST') {
      setResponseStatus(event, 405);
      setResponseHeader(event, 'Allow', 'POST');

      return { error: 'method_not_allowed' };
    }

    try {
      const server = await createServer(event);

      const transport = new WebStandardStreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
      });

      await server.connect(transport);

      const response = await transport.handleRequest(toWebRequest(event));

      await server.close();

      return response;
    } catch (e) {
      log.error({ tag, message: 'MCP transport error', error: extractErrorMessage(e) });
      setResponseStatus(event, 500);

      return { error: 'internal_error' };
    }
  });
}
