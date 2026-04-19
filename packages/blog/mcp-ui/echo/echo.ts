import {
  App,
  applyDocumentTheme,
  applyHostFonts,
  applyHostStyleVariables,
  type McpUiHostContext,
} from '@modelcontextprotocol/ext-apps';

interface EchoToolResult {
  message: string;
  timestamp: string;
}

const STYLES = /* css */ `
:root {
  color-scheme: light dark;
  --echo-bg: var(--mcp-ui-background, #fff);
  --echo-fg: var(--mcp-ui-foreground, #111);
  --echo-muted: var(--mcp-ui-muted, #6b7280);
  --echo-border: var(--mcp-ui-border, #e5e7eb);
  --echo-accent: #6366f1;
}
[data-theme='dark'] {
  --echo-bg: #0b0d10;
  --echo-fg: #e5e7eb;
  --echo-muted: #9ca3af;
  --echo-border: #1f2937;
  --echo-accent: #818cf8;
}
html, body { margin: 0; padding: 0; background: var(--echo-bg); color: var(--echo-fg); }
body {
  font-family: var(--mcp-ui-font-family, system-ui, -apple-system, sans-serif);
  font-size: 14px;
  line-height: 1.45;
}
.wrap { padding: 1.25rem 1.5rem; }
.badge {
  display: inline-block;
  background: var(--echo-accent);
  color: #fff;
  font-size: .6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .05em;
  padding: .2rem .5rem;
  border-radius: 4px;
  margin-bottom: .75rem;
}
.message {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 .75rem;
  word-break: break-word;
}
.timestamp {
  font-size: .8125rem;
  color: var(--echo-muted);
}
.check {
  color: #22c55e;
  font-weight: 600;
  margin-bottom: .5rem;
  font-size: .875rem;
}
.loading { padding: 1.25rem; text-align: center; color: var(--echo-muted); }
.error-state {
  padding: 1.25rem;
  text-align: center;
  color: var(--echo-muted);
  border: 1px dashed var(--echo-border);
  border-radius: 6px;
}
`;

function mountStyle(): void {
  const style = document.createElement('style');
  style.textContent = STYLES;
  document.head.appendChild(style);
}

function renderLoading(mount: HTMLElement): void {
  mount.replaceChildren();
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.setAttribute('data-testid', 'echo-loading');
  loading.textContent = 'Waiting for echo…';
  wrap.appendChild(loading);
  mount.appendChild(wrap);
}

function renderResult(mount: HTMLElement, result: EchoToolResult): void {
  mount.replaceChildren();
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.setAttribute('data-testid', 'echo-result-root');

  const badge = document.createElement('div');
  badge.className = 'badge';
  badge.textContent = 'MCP Echo';
  wrap.appendChild(badge);

  const check = document.createElement('div');
  check.className = 'check';
  check.setAttribute('data-testid', 'echo-check');
  check.textContent = '✓ UI Resource pipeline working';
  wrap.appendChild(check);

  const msg = document.createElement('div');
  msg.className = 'message';
  msg.setAttribute('data-testid', 'echo-message');
  msg.textContent = result.message;
  wrap.appendChild(msg);

  const ts = document.createElement('div');
  ts.className = 'timestamp';
  ts.setAttribute('data-testid', 'echo-timestamp');
  ts.textContent = `Echoed at ${new Date(result.timestamp).toLocaleString()}`;
  wrap.appendChild(ts);

  mount.appendChild(wrap);
}

function renderError(mount: HTMLElement, message: string): void {
  mount.replaceChildren();
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const box = document.createElement('div');
  box.className = 'error-state';
  box.setAttribute('data-testid', 'echo-error-state');
  box.textContent = message;
  wrap.appendChild(box);
  mount.appendChild(wrap);
}

function handleHostContextChanged(ctx: McpUiHostContext): void {
  if (ctx.theme) applyDocumentTheme(ctx.theme);
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);
}

export interface BootstrapDeps {
  app?: App;
  mount?: HTMLElement;
}

export function createBootstrap(deps: BootstrapDeps = {}) {
  const mount = deps.mount ?? (document.getElementById('app') as HTMLElement);
  const app = deps.app ?? new App({ name: 'echo-result', version: '0.1.0' });

  mountStyle();
  renderLoading(mount);

  function handleToolResult(raw: unknown): void {
    const params = (raw ?? {}) as { structuredContent?: unknown };
    const sc = params.structuredContent;
    if (!sc || typeof sc !== 'object') {
      renderError(mount, 'Tool result missing structuredContent');
      return;
    }
    renderResult(mount, sc as EchoToolResult);
  }

  app.ontoolinput = () => renderLoading(mount);
  app.ontoolresult = (params) => handleToolResult(params);
  app.onhostcontextchanged = (params) => handleHostContextChanged(params as McpUiHostContext);
  app.ontoolcancelled = () => renderError(mount, 'Tool call cancelled.');
  app.onerror = (err: Error) => console.error('[echo] app error:', err);

  return { app, mount, handleToolResult, handleHostContextChanged };
}

declare global {
  interface Window {
    __MCP_UI_TEST__?: boolean;
    __ECHO__?: {
      handleToolResult: (r: unknown) => void;
      handleHostContextChanged: (ctx: McpUiHostContext) => void;
    };
  }
}

if (
  typeof window !== 'undefined' &&
  !window.__MCP_UI_TEST__ &&
  typeof document !== 'undefined' &&
  document.getElementById('app') !== null
) {
  const boot = createBootstrap();
  window.__ECHO__ = {
    handleToolResult: boot.handleToolResult,
    handleHostContextChanged: boot.handleHostContextChanged,
  };
  void boot.app.connect().then(() => {
    const ctx = boot.app.getHostContext();
    if (ctx) handleHostContextChanged(ctx);
  });
}
