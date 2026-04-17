import type { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { defineEventHandler, readBody, getHeader, setResponseStatus } from 'h3';
import { z } from 'zod';
import { log } from 'evlog';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { registerAppTool } from '@modelcontextprotocol/ext-apps/server';
import type {
  CallToolResult,
  EmbeddedResource,
  TextContent,
} from '@modelcontextprotocol/sdk/types.js';
import { pickDadJoke } from '../../../../shared/dad-jokes';
import { ECHO_TOOL_NAMES, ECHO_UI_RESOURCE_URI } from '../../../../shared/mcp-echo-types';
import {
  ECHO_UI_META,
  readEchoBundle,
  registerEchoUiResource,
} from '../../../utils/mcp/echo/ui-resource';

type SessionRecord = {
  server: McpServer;
  transport: StreamableHTTPServerTransport;
};

const sessions = new Map<string, SessionRecord>();

function createMcpServer(): McpServer {
  const server = new McpServer(
    { name: 'echo-mcp', version: '0.1.0' },
    { capabilities: { tools: {}, resources: {}, logging: {} } },
  );

  registerAppTool(
    server,
    ECHO_TOOL_NAMES.ECHO,
    {
      description:
        'Returns a random bad dad joke with a timestamp. Minimal MCP UI test tool — groans guaranteed.',
      inputSchema: {
        message: z.string().min(1).max(500),
      },
      _meta: {
        ui: { resourceUri: ECHO_UI_RESOURCE_URI },
      },
    },
    async (args: Record<string, unknown>) => {
      z.object({ message: z.string().min(1).max(500) }).parse(args);
      const message = pickDadJoke();
      const structured = { message, timestamp: new Date().toISOString() };
      const textContent: TextContent = { type: 'text', text: message };
      const uiContent: EmbeddedResource = {
        type: 'resource',
        resource: {
          uri: ECHO_UI_RESOURCE_URI,
          mimeType: 'text/html;profile=mcp-app',
          text: readEchoBundle(),
          _meta: ECHO_UI_META,
        },
      };
      return {
        content: [textContent, uiContent],
        structuredContent: structured,
      } as CallToolResult & { structuredContent: typeof structured };
    },
  );

  registerEchoUiResource(server);
  return server;
}

async function getOrCreateSession(sessionId: string | undefined): Promise<SessionRecord> {
  if (sessionId && sessions.has(sessionId)) {
    return sessions.get(sessionId)!;
  }
  const server = createMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (id: string) => {
      sessions.set(id, { server, transport });
    },
  });
  transport.onclose = () => {
    if (transport.sessionId) sessions.delete(transport.sessionId);
  };
  await server.connect(transport);
  return { server, transport };
}

export default defineEventHandler(async (event) => {
  const req = event.node.req as IncomingMessage;
  const res = event.node.res as ServerResponse;

  try {
    const sessionId = getHeader(event, 'mcp-session-id');
    const body = req.method === 'POST' ? await readBody(event) : undefined;
    const record = await getOrCreateSession(sessionId);
    await record.transport.handleRequest(req, res, body);
  } catch (e) {
    log.error({
      tag: 'mcp-echo',
      message: 'MCP transport error',
      error: e instanceof Error ? e.message : String(e),
    });
    if (!res.headersSent) {
      setResponseStatus(event, 500);
      return { error: 'internal_error' };
    }
  }
});
