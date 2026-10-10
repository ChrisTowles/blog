/** /mcp/echo — stateless Streamable HTTP MCP endpoint for the MCP UI smoke test. */

import { defineStatelessMcpHandler } from '../../../utils/mcp/handle-request';
import { createEchoMcpServer } from '../../../utils/mcp/echo/server';

export default defineStatelessMcpHandler('mcp-echo', () => createEchoMcpServer());
