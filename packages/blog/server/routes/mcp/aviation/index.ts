/** /mcp/aviation — stateless Streamable HTTP MCP endpoint for the aviation demo. */

import { useRuntimeConfig } from '#imports';
import { z } from 'zod';
import { log } from 'evlog';
import { extractErrorMessage } from '../../../../shared/error-util';
import { defineStatelessMcpHandler } from '../../../utils/mcp/handle-request';
import { createAviationMcpServer } from '../../../utils/mcp/aviation/server';
import { warmAviationContainer } from '../../../utils/mcp/aviation/duckdb';

export default defineStatelessMcpHandler('mcp-aviation', (event) => {
  const serverOrigin = z.string().catch('').parse(useRuntimeConfig(event).public.siteUrl);

  // A client is about to list or call tools; wake the container while it does.
  warmAviationContainer().catch((e) => {
    log.warn({
      tag: 'mcp-aviation',
      message: 'container warm-up failed',
      error: extractErrorMessage(e),
    });
  });

  return createAviationMcpServer(serverOrigin);
});
