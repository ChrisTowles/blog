import type { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { defineEventHandler, readBody, getHeader, setResponseStatus } from 'h3';
import { z } from 'zod';
import { log } from 'evlog';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { registerAppTool } from '@modelcontextprotocol/ext-apps/server';
import { ECHO_TOOL_NAMES, ECHO_UI_RESOURCE_URI } from '../../../../shared/mcp-echo-types';
import { registerEchoUiResource } from '../../../utils/mcp/echo/ui-resource';

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
      description: 'Echoes a message back with a timestamp. Minimal MCP UI test tool.',
      inputSchema: {
        message: z.string().min(1).max(500),
      },
      _meta: {
        ui: { resourceUri: ECHO_UI_RESOURCE_URI },
      },
    },
    async (args: Record<string, unknown>) => {
      const parsed = z.object({ message: z.string().min(1).max(500) }).parse(args);
      const message = parsed.message;
      return {
        content: [{ type: 'text' as const, text: message }],
        structuredContent: {
          message,
          timestamp: new Date().toISOString(),
        },
      };
    },
  );

  registerEchoUiResource(server);
  return server;
}

async function getOrCreateSession(sessionId: string | undefined): Promise<SessionRecord> {
  if (sessionId && sessions.has(sessionId)) {
    return sessions.get(sessionId)!;
  }
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (id: string) => {
      sessions.set(id, { server, transport });
    },
  });
  transport.onclose = () => {
    if (transport.sessionId) sessions.delete(transport.sessionId);
  };
  const server = createMcpServer();
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
