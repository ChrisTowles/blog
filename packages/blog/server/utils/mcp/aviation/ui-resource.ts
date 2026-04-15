/**
 * UI resource — `ui://aviation-answer`.
 *
 * TODO(Unit 4): This is a placeholder HTML bundle. Unit 4 builds the real iframe
 * client (ECharts + ui/message handling + AppBridge). Until then, we ship a minimal
 * HTML document that:
 *   - Reads the bundled structuredContent (rendered server-side into a <script> tag)
 *   - Shows the text answer + the SQL + a JSON dump of chart_option
 *   - Links to the dataset schema
 *
 * The final bundle will be built as a separate Vite entry and inlined per Unit 4.
 */

import {
  AVIATION_UI_RESOURCE_URI,
  type AviationToolResult,
} from '../../../../shared/mcp-aviation-types';
import { registerAppResource } from '@modelcontextprotocol/ext-apps/server';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Render the HTML document that will be embedded in the CallToolResult's
 * EmbeddedResource. The document contains the structured payload inline so
 * the iframe is self-contained — per plan line 495 (no side-channel fetches).
 */
export async function renderAviationHtml(result: AviationToolResult): Promise<string> {
  const payload = JSON.stringify(result).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Aviation answer</title>
<style>
  html,body { margin:0; padding:0; font-family: system-ui, -apple-system, sans-serif; color: #111; background: #fff; }
  .wrap { padding: 1rem 1.25rem; }
  h1 { font-size: 1.25rem; margin: 0 0 .5rem; }
  .hero { font-size: 2rem; font-weight: 600; margin: .25rem 0; }
  .answer { font-size: 1rem; line-height: 1.4; margin: .5rem 0 1rem; }
  details { background: #f6f8fa; border-radius: 4px; padding: .5rem .75rem; margin: .5rem 0; font-size: .875rem; }
  details pre { white-space: pre-wrap; word-break: break-all; }
  .chips { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
  .chip { background: #eef2ff; color: #3730a3; border: 1px solid #c7d2fe; padding: .35rem .7rem; border-radius: 999px; font-size: .85rem; cursor: pointer; }
  .truncated { background: #fff7e6; color: #92400e; padding: .5rem .75rem; border-radius: 4px; font-size: .85rem; margin: .5rem 0; }
</style>
</head>
<body>
<div class="wrap">
  <h1>Aviation answer <small>(placeholder bundle — Unit 4)</small></h1>
  ${result.hero_number ? `<div class="hero">${escapeHtml(result.hero_number)}</div>` : ''}
  <p class="answer">${escapeHtml(result.answer)}</p>
  ${result.truncated ? '<div class="truncated">Results were truncated at 10,000 rows.</div>' : ''}
  <details>
    <summary>Show SQL</summary>
    <pre>${escapeHtml(result.sql)}</pre>
  </details>
  <details>
    <summary>Show chart_option JSON</summary>
    <pre id="chart-option"></pre>
  </details>
  <details>
    <summary>Show rows (${result.rows.length})</summary>
    <pre id="rows"></pre>
  </details>
  <div class="chips">
    ${result.followups
      .map((q) => `<button class="chip" data-followup="${escapeHtml(q)}">${escapeHtml(q)}</button>`)
      .join('')}
  </div>
</div>
<script id="aviation-payload" type="application/json">${payload}</script>
<script>
  (function() {
    var el = document.getElementById('aviation-payload');
    if (!el) return;
    try {
      var data = JSON.parse(el.textContent || '{}');
      var opt = document.getElementById('chart-option');
      if (opt) opt.textContent = JSON.stringify(data.chart_option, null, 2);
      var rows = document.getElementById('rows');
      if (rows) rows.textContent = JSON.stringify(data.rows, null, 2);
    } catch (e) {
      // no-op
    }
    // Wire up follow-up chips — Unit 4 replaces this with proper AppBridge ui/message.
    document.querySelectorAll('[data-followup]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-followup');
        try {
          if (window.parent) {
            window.parent.postMessage({ type: 'ui/message', payload: { role: 'user', content: { type: 'text', text: text } } }, '*');
          }
        } catch (e) {}
      });
    });
  })();
</script>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Register the ui://aviation-answer resource. The resource read is a minimal
 * empty-state shell; the real payload comes back inside the ask_aviation
 * CallToolResult's EmbeddedResource. Hosts may still fetch the resource
 * directly (e.g. Claude Desktop's manual inspection), so we return a neutral
 * "ready" document here.
 */
export function registerAviationUiResource(server: McpServer): void {
  registerAppResource(
    server,
    'Aviation answer',
    AVIATION_UI_RESOURCE_URI,
    {
      description:
        'Interactive answer bundle for the ask_aviation tool (ECharts + SQL + follow-ups).',
      _meta: {
        ui: {
          csp: {
            connectDomains: [],
            resourceDomains: ['self'],
            frameDomains: [],
          },
        },
      },
    },
    async () => ({
      contents: [
        {
          uri: AVIATION_UI_RESOURCE_URI,
          mimeType: 'text/html;profile=mcp-app',
          text: await renderAviationHtml({
            sql: '',
            answer: 'Run ask_aviation to populate this view.',
            chart_option: { title: { text: 'Ready' } },
            followups: [
              'Which operators have the oldest Boeing 737 fleets?',
              'What were the 10 busiest US routes in 2025?',
              'Which aircraft models have the most seats on average?',
            ],
            rows: [],
            truncated: false,
          }),
        },
      ],
    }),
  );
}
