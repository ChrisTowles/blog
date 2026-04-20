/**
 * `ui://aviation-answer` iframe bundle entry.
 *
 * Frameworkless vanilla TS. Mirrors the ext-apps reference at
 * `@modelcontextprotocol/ext-apps/examples/basic-server-vanillajs/src/mcp-app.ts`.
 *
 * Responsibilities:
 *   1. Connect to the host via `App` (AppBridge + PostMessageTransport).
 *   2. Receive `sendToolInput` + `sendToolResult`; render the answer + chart/table.
 *   3. Route between ECharts chart and HTML table based on `chart_option` shape.
 *   4. Dispatch `ui/message` upward when a follow-up chip is clicked.
 *   5. Re-render with dark/light ECharts palette when HostContext theme changes.
 *   6. Forward-compatible streaming-disable: chips disable if HostContext carries
 *      a `status: 'streaming'` field (local extension defined in Unit 6). Unknown
 *      status values are ignored.
 *
 * TODO(Unit 4 follow-ups, punted per prompt):
 *   - SQL syntax highlighter (currently plain <pre><code>).
 *   - axe-core a11y audit integration.
 *   - `ui/notifications/tool-cancelled` cancellation state with retry affordance.
 *   - `ui/initialize` >5s timeout fallback ("host not responding").
 *   - Additional e2e scenarios: line/scatter/treemap/table, theme toggle, streaming.
 *
 * The chart_option is passed through to `chart.setOption(...)` verbatim — the
 * server is the authority on chart shape. Two routing hints:
 *   - If `chart_option.__table === true` OR `chart_option.series` is missing /
 *     empty, render a table instead of a chart.
 *   - All other shapes: ECharts.
 */

import {
  App,
  applyDocumentTheme,
  applyHostFonts,
  applyHostStyleVariables,
  type McpUiHostContext,
} from '@modelcontextprotocol/ext-apps';

/* --------------------------------------------------------------------------
 * Progress labels — duplicated from shared/mcp-aviation-types.ts. The iframe
 * bundle is a separate build and can't import from the Nuxt module graph.
 * -------------------------------------------------------------------------- */
type AviationProgressStep = 'planning' | 'validating' | 'querying' | 'rendering';

const AVIATION_PROGRESS_MESSAGES: Record<AviationProgressStep, readonly string[]> = {
  planning: [
    'Planning query…',
    'Consulting the flight plan…',
    'Asking the LLM to think in SQL…',
    'Pre-flight checks in progress…',
    'Taxiing to the runway…',
  ],
  validating: [
    'Validating SQL…',
    'Running the safety checklist…',
    'Making sure nobody typed DROP TABLE…',
  ],
  querying: [
    'Running query against DuckDB…',
    'Scanning Parquet at cruising altitude…',
    'Crunching rows from the FAA registry…',
    'Joining BTS with OpenFlights…',
    'Counting tail numbers…',
  ],
  rendering: ['Rendering chart…', 'Painting bars…', 'Laying out axes…'],
};

const LOADING_TICK_MS = 1500;

interface AviationPendingResult {
  pending: true;
  question: string;
  queryUrl: string;
}

interface AviationQueryProgressEvent {
  type: 'progress';
  step: AviationProgressStep;
}
interface AviationQueryResultEvent {
  type: 'result';
  result: AviationToolResult;
}
interface AviationQueryErrorEvent {
  type: 'error';
  message: string;
}
type AviationQueryEvent =
  | AviationQueryProgressEvent
  | AviationQueryResultEvent
  | AviationQueryErrorEvent;
import * as echarts from 'echarts/core';
import { BarChart, LineChart, ScatterChart, PieChart, TreemapChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  ScatterChart,
  PieChart,
  TreemapChart,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
  CanvasRenderer,
]);

/* --------------------------------------------------------------------------
 * Contract — kept in sync with packages/blog/shared/mcp-aviation-types.ts.
 * Duplicated here (not imported) because the iframe is a separate bundle that
 * must not reach into the Nuxt app's module graph.
 * -------------------------------------------------------------------------- */

interface AviationToolResult {
  sql: string;
  answer: string;
  hero_number?: string;
  chart_option: Record<string, unknown>;
  followups: [string, string, string];
  rows: Array<Record<string, unknown>>;
  truncated: boolean;
}

/* --------------------------------------------------------------------------
 * Styles — inlined as a single <style> block. Kept minimal; inherits theme
 * CSS variables from the host per SEP-1865 `applyHostStyleVariables`.
 * -------------------------------------------------------------------------- */

const STYLES = /* css */ `
:root {
  color-scheme: light dark;
  --aa-bg: var(--mcp-ui-background, #fff);
  --aa-fg: var(--mcp-ui-foreground, #111);
  --aa-muted: var(--mcp-ui-muted, #6b7280);
  --aa-border: var(--mcp-ui-border, #e5e7eb);
  --aa-chip-bg: var(--mcp-ui-chip-bg, #eef2ff);
  --aa-chip-fg: var(--mcp-ui-chip-fg, #3730a3);
  --aa-chip-border: var(--mcp-ui-chip-border, #c7d2fe);
  --aa-banner-bg: #fff7e6;
  --aa-banner-fg: #92400e;
}
[data-theme='dark'] {
  --aa-bg: #0b0d10;
  --aa-fg: #e5e7eb;
  --aa-muted: #9ca3af;
  --aa-border: #1f2937;
  --aa-chip-bg: #1e1b4b;
  --aa-chip-fg: #c7d2fe;
  --aa-chip-border: #3730a3;
  --aa-banner-bg: #3b2f18;
  --aa-banner-fg: #fcd34d;
}
html, body { margin: 0; padding: 0; background: var(--aa-bg); color: var(--aa-fg); }
body {
  font-family: var(--mcp-ui-font-family, system-ui, -apple-system, sans-serif);
  font-size: 14px;
  line-height: 1.45;
}
.wrap { padding: 1rem 1.25rem 1.5rem; }
.hero { margin: 0 0 .75rem; }
.hero-number { font-size: 2.25rem; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 .35rem; }
.hero-answer { font-size: 1.0625rem; margin: 0; color: var(--aa-fg); }
h2.hero-answer { font-weight: 500; line-height: 1.4; }
.truncated {
  background: var(--aa-banner-bg);
  color: var(--aa-banner-fg);
  padding: .5rem .75rem;
  border-radius: 6px;
  font-size: .8125rem;
  margin: .5rem 0 1rem;
}
.viz { width: 100%; min-height: 320px; margin: 1rem 0; }
.table-wrap { overflow-x: auto; margin: 1rem 0; }
table.aviation-table {
  border-collapse: collapse;
  width: 100%;
  font-size: .875rem;
}
table.aviation-table th,
table.aviation-table td {
  border: 1px solid var(--aa-border);
  padding: .35rem .5rem;
  text-align: left;
  vertical-align: top;
}
table.aviation-table th { background: var(--aa-chip-bg); color: var(--aa-chip-fg); font-weight: 600; }
.chips { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1rem 0 .5rem; }
.chip {
  background: var(--aa-chip-bg);
  color: var(--aa-chip-fg);
  border: 1px solid var(--aa-chip-border);
  padding: .4rem .85rem;
  border-radius: 999px;
  font-size: .8125rem;
  cursor: pointer;
  font-family: inherit;
  transition: opacity .15s ease;
}
.chip:focus-visible { outline: 2px solid var(--aa-chip-fg); outline-offset: 2px; }
.chip[aria-disabled='true'] { opacity: .5; cursor: not-allowed; }
.sql-toggle {
  background: transparent;
  color: var(--aa-muted);
  border: 1px solid var(--aa-border);
  padding: .35rem .65rem;
  border-radius: 4px;
  font-size: .75rem;
  cursor: pointer;
  font-family: inherit;
  margin-top: .75rem;
}
.sql-panel { margin-top: .5rem; display: none; }
.sql-panel[data-open='true'] { display: block; }
.sql-panel pre {
  background: var(--aa-chip-bg);
  color: var(--aa-chip-fg);
  padding: .75rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: .8125rem;
  margin: 0;
}
.empty, .error-state {
  padding: 1.25rem;
  text-align: center;
  color: var(--aa-muted);
  border: 1px dashed var(--aa-border);
  border-radius: 6px;
}
/* ───── flight-progress radar loader ───── */
.av-loader {
  position: relative;
  margin: .5rem 0 1rem;
  padding: 1.5rem 1.25rem 1.1rem;
  border: 1px solid var(--aa-border);
  border-radius: 10px;
  background:
    radial-gradient(ellipse 90% 120% at 50% -20%,
      color-mix(in srgb, var(--aa-chip-fg) 10%, transparent) 0%,
      transparent 60%),
    var(--aa-bg);
  overflow: hidden;
  isolation: isolate;
}
.av-loader-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: .45;
  background-image:
    linear-gradient(to right, var(--aa-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--aa-border) 1px, transparent 1px);
  background-size: 28px 28px;
  -webkit-mask-image: radial-gradient(ellipse 80% 90% at 50% 60%, black 20%, transparent 85%);
          mask-image: radial-gradient(ellipse 80% 90% at 50% 60%, black 20%, transparent 85%);
}
.av-loader-sweep {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--aa-chip-fg) 15%, transparent) 45%,
    color-mix(in srgb, var(--aa-chip-fg) 22%, transparent) 50%,
    color-mix(in srgb, var(--aa-chip-fg) 15%, transparent) 55%,
    transparent 100%
  );
  mix-blend-mode: screen;
  animation: av-sweep 3.2s linear infinite;
  opacity: .5;
}
@keyframes av-sweep {
  0% { transform: translateX(-60%); }
  100% { transform: translateX(60%); }
}
.av-rail {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: .25rem .25rem 1.1rem;
}
.av-rail-track {
  position: absolute;
  left: calc(12.5% + 9px);
  right: calc(12.5% + 9px);
  top: 8px;
  height: 2px;
  background: var(--aa-border);
  border-radius: 2px;
  overflow: hidden;
}
.av-rail-fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0%;
  background: linear-gradient(90deg,
    color-mix(in srgb, var(--aa-chip-fg) 40%, transparent),
    var(--aa-chip-fg));
  border-radius: 2px;
  transition: width .55s cubic-bezier(.2,.7,.2,1);
}
.av-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  z-index: 2;
}
.av-step-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--aa-border);
  background: var(--aa-bg);
  transition: border-color .25s ease, background .25s ease, box-shadow .25s ease, transform .25s ease;
}
.av-step[data-state='done'] .av-step-dot {
  background: var(--aa-chip-fg);
  border-color: var(--aa-chip-fg);
}
.av-step[data-state='active'] .av-step-dot {
  border-color: var(--aa-chip-fg);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--aa-chip-fg) 22%, transparent);
  animation: av-dot-pulse 1.8s ease-in-out infinite;
}
@keyframes av-dot-pulse {
  0%, 100% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--aa-chip-fg) 22%, transparent); }
  50%      { box-shadow: 0 0 0 8px color-mix(in srgb, var(--aa-chip-fg) 6%, transparent); }
}
.av-step-label {
  font-size: .68rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--aa-muted);
  font-weight: 600;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
}
.av-step[data-state='done'] .av-step-label,
.av-step[data-state='active'] .av-step-label {
  color: var(--aa-fg);
}
.av-plane {
  position: absolute;
  top: -7px;
  left: 0%;
  width: 22px;
  height: 22px;
  color: var(--aa-chip-fg);
  transform: translateX(-50%);
  transition: left .55s cubic-bezier(.2,.7,.2,1);
  filter: drop-shadow(0 0 6px color-mix(in srgb, var(--aa-chip-fg) 45%, transparent));
  z-index: 3;
  animation: av-plane-bob 2.4s ease-in-out infinite;
}
@keyframes av-plane-bob {
  0%, 100% { translate: 0 0; }
  50%      { translate: 0 -2px; }
}
.av-status {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: .7rem;
  padding: .6rem .75rem;
  border-top: 1px dashed var(--aa-border);
  margin: 0 -.25rem;
  font-size: .9rem;
}
.av-status-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--aa-chip-fg);
  flex: none;
}
.av-status-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--aa-chip-fg);
  animation: av-ping 1.6s cubic-bezier(0,0,.2,1) infinite;
}
@keyframes av-ping {
  0%   { transform: scale(.6); opacity: .9; }
  80%  { transform: scale(1.7); opacity: 0; }
  100% { transform: scale(1.7); opacity: 0; }
}
.av-status-text {
  color: var(--aa-fg);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: opacity .25s ease;
}
.av-status-timer {
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  font-size: .78rem;
  color: var(--aa-muted);
  font-variant-numeric: tabular-nums;
  letter-spacing: .04em;
  padding: .15rem .45rem;
  border: 1px solid var(--aa-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--aa-chip-fg) 5%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  .av-loader-sweep,
  .av-plane,
  .av-step[data-state='active'] .av-step-dot,
  .av-status-dot::after {
    animation: none;
  }
}
`;

/* --------------------------------------------------------------------------
 * DOM bootstrap + state.
 * -------------------------------------------------------------------------- */

interface IframeState {
  chart?: echarts.ECharts;
  chartResizeObserver?: ResizeObserver;
  theme: 'light' | 'dark';
  streaming: boolean;
  result?: AviationToolResult;
  loadingMessageTicker?: ReturnType<typeof setInterval>;
  loadingTimerTicker?: ReturnType<typeof setInterval>;
  loadingStep?: AviationProgressStep;
  loadingStartedAt?: number;
}

const state: IframeState = {
  theme: 'light',
  streaming: false,
};

function stopLoadingTicker(): void {
  if (state.loadingMessageTicker) {
    clearInterval(state.loadingMessageTicker);
    state.loadingMessageTicker = undefined;
  }
  if (state.loadingTimerTicker) {
    clearInterval(state.loadingTimerTicker);
    state.loadingTimerTicker = undefined;
  }
  state.loadingStep = undefined;
  state.loadingStartedAt = undefined;
}

const STEP_ORDER: readonly AviationProgressStep[] = [
  'planning',
  'validating',
  'querying',
  'rendering',
];
const STEP_SHORT_LABELS: Record<AviationProgressStep, string> = {
  planning: 'Plan',
  validating: 'Validate',
  querying: 'Query',
  rendering: 'Render',
};

function buildLoaderDom(): HTMLElement {
  const loader = document.createElement('div');
  loader.className = 'av-loader';
  loader.setAttribute('data-testid', 'aviation-loading');
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-live', 'polite');

  const grid = document.createElement('div');
  grid.className = 'av-loader-grid';
  loader.appendChild(grid);

  const sweep = document.createElement('div');
  sweep.className = 'av-loader-sweep';
  loader.appendChild(sweep);

  const rail = document.createElement('div');
  rail.className = 'av-rail';

  const track = document.createElement('div');
  track.className = 'av-rail-track';
  const fill = document.createElement('div');
  fill.className = 'av-rail-fill';
  fill.setAttribute('data-role', 'fill');
  track.appendChild(fill);
  rail.appendChild(track);

  const plane = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  plane.setAttribute('class', 'av-plane');
  plane.setAttribute('viewBox', '0 0 24 24');
  plane.setAttribute('data-role', 'plane');
  plane.setAttribute('aria-hidden', 'true');
  const planePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  planePath.setAttribute('fill', 'currentColor');
  // Right-pointing paper-plane/airliner silhouette.
  planePath.setAttribute(
    'd',
    'M2 12l20-7-4.5 17-6.5-7-8.5 2.5L2 12zm7.5 2.6l2.9 3.1 2.6-9.8-5.5 6.7z',
  );
  plane.appendChild(planePath);
  rail.appendChild(plane);

  for (const step of STEP_ORDER) {
    const stepEl = document.createElement('div');
    stepEl.className = 'av-step';
    stepEl.setAttribute('data-step', step);
    stepEl.setAttribute('data-state', 'pending');
    const dot = document.createElement('div');
    dot.className = 'av-step-dot';
    const label = document.createElement('div');
    label.className = 'av-step-label';
    label.textContent = STEP_SHORT_LABELS[step];
    stepEl.appendChild(dot);
    stepEl.appendChild(label);
    rail.appendChild(stepEl);
  }

  loader.appendChild(rail);

  const status = document.createElement('div');
  status.className = 'av-status';
  const statusDot = document.createElement('div');
  statusDot.className = 'av-status-dot';
  statusDot.setAttribute('aria-hidden', 'true');
  const statusText = document.createElement('div');
  statusText.className = 'av-status-text';
  statusText.setAttribute('data-role', 'status-text');
  const statusTimer = document.createElement('div');
  statusTimer.className = 'av-status-timer';
  statusTimer.setAttribute('data-role', 'timer');
  statusTimer.textContent = '0:00';
  status.appendChild(statusDot);
  status.appendChild(statusText);
  status.appendChild(statusTimer);
  loader.appendChild(status);

  return loader;
}

function applyStepToLoader(root: HTMLElement, step: AviationProgressStep): void {
  const activeIndex = STEP_ORDER.indexOf(step);
  // Center of each step column: 12.5%, 37.5%, 62.5%, 87.5%.
  const planeLeftPct = 12.5 + activeIndex * 25;
  // Track spans center-to-center (75% of rail). Fill grows 0 → 100% of track.
  const fillPct = activeIndex === 0 ? 0 : (activeIndex / (STEP_ORDER.length - 1)) * 100;

  const fill = root.querySelector<HTMLElement>('[data-role="fill"]');
  if (fill) fill.style.width = `${fillPct}%`;

  const plane = root.querySelector<SVGElement>('[data-role="plane"]');
  if (plane) (plane as unknown as HTMLElement).style.left = `${planeLeftPct}%`;

  for (const stepEl of Array.from(root.querySelectorAll<HTMLElement>('.av-step'))) {
    const stepName = stepEl.getAttribute('data-step') as AviationProgressStep | null;
    if (!stepName) continue;
    const idx = STEP_ORDER.indexOf(stepName);
    const state = idx < activeIndex ? 'done' : idx === activeIndex ? 'active' : 'pending';
    stepEl.setAttribute('data-state', state);
  }
}

function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function mountStyle(): void {
  const style = document.createElement('style');
  style.textContent = STYLES;
  document.head.appendChild(style);
}

function shouldRenderTable(option: Record<string, unknown>): boolean {
  if ((option as { __table?: unknown }).__table === true) return true;
  const series = (option as { series?: unknown }).series;
  if (Array.isArray(series) && series.length === 0) return true;
  if (series === undefined || series === null) return true;
  return false;
}

function validateChartOption(option: Record<string, unknown>): string | null {
  // Minimal check: ECharts requires `series` (array) when rendering a chart.
  // We already routed table-shaped results elsewhere, so here we just confirm
  // series is usable. An empty series array has already been routed to table.
  const series = (option as { series?: unknown }).series;
  if (!Array.isArray(series)) return 'chart_option.series is not an array';
  return null;
}

function renderTable(rows: Array<Record<string, unknown>>): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'table-wrap';
  if (rows.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.setAttribute('data-testid', 'aviation-empty');
    empty.textContent = 'No rows returned. Try a different date range or question.';
    wrap.appendChild(empty);
    return wrap;
  }
  const table = document.createElement('table');
  table.className = 'aviation-table';
  table.setAttribute('data-testid', 'aviation-table');
  const cols = Object.keys(rows[0]);
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (const col of cols) {
    const th = document.createElement('th');
    th.textContent = col;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  for (const row of rows.slice(0, 500)) {
    const tr = document.createElement('tr');
    for (const col of cols) {
      const td = document.createElement('td');
      const v = row[col];
      td.textContent = v === null || v === undefined ? '' : String(v);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

function applyChartDefaults(option: Record<string, unknown>): Record<string, unknown> {
  // We OWN the outer layout — title position, grid box, pie/treemap framing.
  // The LLM is unreliable at leaving room for the title, so our layout keys
  // win. Caller-supplied style keys (text, textStyle, itemStyle, label, …)
  // still bleed through because we spread the caller FIRST, then override
  // only the position keys we care about.
  const caller = option as {
    grid?: Record<string, unknown>;
    title?: Record<string, unknown>;
    series?: unknown;
  };
  const merged: Record<string, unknown> = {
    ...option,
    grid: {
      ...(caller.grid ?? {}),
      top: 64,
      left: 8,
      right: 24,
      bottom: 48,
      containLabel: true,
    },
  };
  if (caller.title) {
    merged.title = {
      ...caller.title,
      top: 12,
      left: 'center',
      textStyle: {
        fontSize: 14,
        fontWeight: 600,
        ...((caller.title as { textStyle?: Record<string, unknown> }).textStyle ?? {}),
      },
    };
  }
  // Pie/treemap ignore `grid`, so their bounding box must be pushed down at
  // the series level. We force `top` (and null out `center` on pie so `top`
  // actually applies — ECharts ignores `top` when `center` is set).
  if (Array.isArray(caller.series)) {
    merged.series = caller.series.map((s) => {
      if (!s || typeof s !== 'object') return s;
      const series = s as Record<string, unknown>;
      if (series.type === 'pie') {
        return { ...series, center: ['50%', '58%'] };
      }
      if (series.type === 'treemap') {
        return { ...series, top: 56, bottom: 12, left: 8, right: 8 };
      }
      return s;
    });
  }
  return merged;
}

function renderChart(container: HTMLElement, option: Record<string, unknown>): void {
  // Dispose prior instance + observer if re-rendering (theme change).
  if (state.chartResizeObserver) {
    state.chartResizeObserver.disconnect();
    state.chartResizeObserver = undefined;
  }
  if (state.chart) {
    state.chart.dispose();
    state.chart = undefined;
  }
  const chart = echarts.init(container, state.theme === 'dark' ? 'dark' : undefined, {
    renderer: 'canvas',
  });
  state.chart = chart;
  chart.setOption(applyChartDefaults(option), true);

  const ro = new ResizeObserver(() => chart.resize());
  ro.observe(container);
  state.chartResizeObserver = ro;
}

function renderFallback(answer: string, reason: string): HTMLElement {
  const box = document.createElement('div');
  box.className = 'error-state';
  box.setAttribute('data-testid', 'aviation-chart-fallback');
  box.textContent = answer;
  if (reason) {
    const small = document.createElement('div');
    small.style.fontSize = '.75rem';
    small.style.marginTop = '.5rem';
    small.textContent = `(chart unavailable: ${reason})`;
    box.appendChild(small);
  }
  return box;
}

function renderSqlBlock(sql: string): HTMLElement {
  const container = document.createElement('div');
  const btn = document.createElement('button');
  btn.className = 'sql-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('data-testid', 'aviation-sql-toggle');
  btn.textContent = 'Show SQL';
  const panel = document.createElement('div');
  panel.className = 'sql-panel';
  panel.setAttribute('data-open', 'false');
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = sql || '';
  pre.appendChild(code);
  panel.appendChild(pre);
  btn.addEventListener('click', () => {
    const open = panel.getAttribute('data-open') === 'true';
    panel.setAttribute('data-open', open ? 'false' : 'true');
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    btn.textContent = open ? 'Show SQL' : 'Hide SQL';
  });
  container.appendChild(btn);
  container.appendChild(panel);
  return container;
}

function renderChips(
  followups: [string, string, string],
  onClick: (text: string) => void,
): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'chips';
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', 'Follow-up questions');
  wrap.setAttribute('data-testid', 'aviation-chips');
  for (const q of followups) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip';
    btn.textContent = q;
    btn.setAttribute('aria-label', `Ask follow-up: ${q}`);
    if (state.streaming) btn.setAttribute('aria-disabled', 'true');
    btn.addEventListener('click', () => {
      if (btn.getAttribute('aria-disabled') === 'true') return;
      // Belt-and-suspenders: optimistically disable chips on first click.
      for (const child of Array.from(wrap.querySelectorAll<HTMLButtonElement>('.chip'))) {
        child.setAttribute('aria-disabled', 'true');
      }
      onClick(q);
    });
    wrap.appendChild(btn);
  }
  return wrap;
}

function renderLoading(mount: HTMLElement, step: AviationProgressStep = 'planning'): void {
  const messages = AVIATION_PROGRESS_MESSAGES[step];

  // Reuse the loader DOM if it's already mounted (from index.html or a prior
  // renderLoading call); otherwise build fresh. This keeps the plane's CSS
  // transition alive as the step advances.
  let loader = mount.querySelector<HTMLElement>('[data-testid="aviation-loading"]');
  if (!loader || !loader.classList.contains('av-loader')) {
    mount.replaceChildren();
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    loader = buildLoaderDom();
    wrap.appendChild(loader);
    mount.appendChild(wrap);
  }

  const textEl = loader.querySelector<HTMLElement>('[data-role="status-text"]');
  const timerEl = loader.querySelector<HTMLElement>('[data-role="timer"]');

  applyStepToLoader(loader, step);

  // Ensure elapsed timer is running (starts on first renderLoading call).
  if (!state.loadingStartedAt) state.loadingStartedAt = Date.now();
  if (!state.loadingTimerTicker && timerEl) {
    const el = timerEl;
    const start = state.loadingStartedAt;
    el.textContent = formatElapsed(0);
    state.loadingTimerTicker = setInterval(() => {
      el.textContent = formatElapsed(Date.now() - start);
    }, 500);
  }

  // If the step is unchanged and the message ticker is already running, let
  // it keep cycling — no need to reset the phase.
  if (state.loadingStep === step && state.loadingMessageTicker) return;

  if (state.loadingMessageTicker) {
    clearInterval(state.loadingMessageTicker);
    state.loadingMessageTicker = undefined;
  }
  state.loadingStep = step;
  if (textEl) textEl.textContent = messages[0] ?? '';
  if (messages.length > 1 && textEl) {
    let index = 0;
    const el = textEl;
    state.loadingMessageTicker = setInterval(() => {
      index = (index + 1) % messages.length;
      el.textContent = messages[index] ?? '';
    }, LOADING_TICK_MS);
  }
}

function isPendingResult(sc: object): sc is AviationPendingResult {
  return (
    (sc as { pending?: unknown }).pending === true &&
    typeof (sc as { question?: unknown }).question === 'string' &&
    typeof (sc as { queryUrl?: unknown }).queryUrl === 'string'
  );
}

/**
 * Stream an aviation query from the MCP server. Updates the loading label on
 * each progress event and resolves to the final `AviationToolResult`. Rejects
 * on transport / protocol errors with a user-facing message.
 */
async function streamAviationQuery(
  mount: HTMLElement,
  pending: AviationPendingResult,
  signal: AbortSignal,
): Promise<AviationToolResult> {
  renderLoading(mount, 'planning');

  const response = await fetch(pending.queryUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify({ question: pending.question }),
    signal,
  });
  if (!response.ok || !response.body) {
    throw new Error(`Query endpoint returned ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finalResult: AviationToolResult | null = null;
  let errorMessage: string | null = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let sep: number;
    while ((sep = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      const dataLine = frame
        .split('\n')
        .map((l) => l.trim())
        .find((l) => l.startsWith('data:'));
      if (!dataLine) continue;
      const payload = dataLine.slice('data:'.length).trim();
      if (!payload) continue;

      let parsed: AviationQueryEvent;
      try {
        parsed = JSON.parse(payload) as AviationQueryEvent;
      } catch {
        continue;
      }

      if (parsed.type === 'progress') {
        renderLoading(mount, parsed.step);
      } else if (parsed.type === 'result') {
        finalResult = parsed.result;
      } else if (parsed.type === 'error') {
        errorMessage = parsed.message;
      }
    }
  }

  if (errorMessage) throw new Error(errorMessage);
  if (!finalResult) throw new Error('query stream ended without a result');
  return finalResult;
}

function renderResult(
  mount: HTMLElement,
  result: AviationToolResult,
  onFollowup: (text: string) => void,
): void {
  stopLoadingTicker();
  state.result = result;
  mount.replaceChildren();
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.setAttribute('data-testid', 'aviation-answer-root');

  // Hero (hero_number + answer as h2).
  const hero = document.createElement('div');
  hero.className = 'hero';
  if (result.hero_number) {
    const big = document.createElement('div');
    big.className = 'hero-number';
    big.setAttribute('data-testid', 'aviation-hero-number');
    big.textContent = result.hero_number;
    hero.appendChild(big);
  }
  const h2 = document.createElement('h2');
  h2.className = 'hero-answer';
  h2.setAttribute('data-testid', 'aviation-hero-answer');
  h2.textContent = result.answer;
  hero.appendChild(h2);
  wrap.appendChild(hero);

  // Truncation banner.
  if (result.truncated) {
    const banner = document.createElement('div');
    banner.className = 'truncated';
    banner.setAttribute('data-testid', 'aviation-truncated');
    banner.setAttribute('role', 'note');
    banner.textContent = 'Results truncated at 10,000 rows.';
    wrap.appendChild(banner);
  }

  // Visualization: chart OR table OR fallback.
  if (!result.chart_option || typeof result.chart_option !== 'object') {
    wrap.appendChild(renderFallback(result.answer, 'chart_option missing'));
  } else if (shouldRenderTable(result.chart_option)) {
    wrap.appendChild(renderTable(result.rows));
  } else {
    const err = validateChartOption(result.chart_option);
    if (err) {
      wrap.appendChild(renderFallback(result.answer, err));
    } else {
      const viz = document.createElement('div');
      viz.className = 'viz';
      viz.setAttribute('data-testid', 'aviation-chart');
      wrap.appendChild(viz);
      // ECharts needs the container to be laid out, so we append first and
      // call init after the DOM commit. Two microtask hops to be safe.
      mount.appendChild(wrap);
      queueMicrotask(() => {
        try {
          renderChart(viz, result.chart_option);
        } catch (e) {
          viz.replaceWith(renderFallback(result.answer, String((e as Error)?.message ?? e)));
        }
      });
      // Still need chips + SQL appended — but wrap is already in DOM; append to wrap.
      wrap.appendChild(renderChips(result.followups, onFollowup));
      wrap.appendChild(renderSqlBlock(result.sql));
      return;
    }
  }

  wrap.appendChild(renderChips(result.followups, onFollowup));
  wrap.appendChild(renderSqlBlock(result.sql));
  mount.appendChild(wrap);
}

/* --------------------------------------------------------------------------
 * Host context — theme, streaming, style variables.
 * -------------------------------------------------------------------------- */

function handleHostContextChanged(ctx: McpUiHostContext): void {
  if (ctx.theme) {
    applyDocumentTheme(ctx.theme);
    state.theme = ctx.theme === 'dark' ? 'dark' : 'light';
    // Re-render chart with new theme if currently showing one.
    if (state.result && state.chart) {
      const opt = state.result.chart_option;
      if (opt && typeof opt === 'object' && !shouldRenderTable(opt)) {
        const viz = document.querySelector<HTMLElement>('[data-testid="aviation-chart"]');
        if (viz) renderChart(viz, opt);
      }
    }
  }
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);

  // Forward-compatible streaming-disable signal (Unit 6 defines the exact
  // extension shape). Accept ctx.status === 'streaming'; ignore unknown values.
  const status = (ctx as { status?: unknown }).status;
  const nextStreaming = status === 'streaming';
  if (nextStreaming !== state.streaming) {
    state.streaming = nextStreaming;
    const chips = document.querySelectorAll<HTMLButtonElement>('.chip');
    for (const chip of Array.from(chips)) {
      if (state.streaming) chip.setAttribute('aria-disabled', 'true');
      else chip.removeAttribute('aria-disabled');
    }
  }
}

/* --------------------------------------------------------------------------
 * Public bootstrap. Exported for testability; also self-runs in the browser.
 * -------------------------------------------------------------------------- */

export interface BootstrapDeps {
  /** Inject a pre-built App (tests use a fake; prod uses the real thing). */
  app?: App;
  /** Mount node override for tests. */
  mount?: HTMLElement;
}

export function createBootstrap(deps: BootstrapDeps = {}): {
  app: App;
  mount: HTMLElement;
  handleToolResult: (r: unknown) => void;
  handleHostContextChanged: (ctx: McpUiHostContext) => void;
} {
  const mount = deps.mount ?? (document.getElementById('app') as HTMLElement);
  const app = deps.app ?? new App({ name: 'aviation-answer', version: '0.1.0' });

  mountStyle();
  // Note: the inline HTML skeleton in index.html already shows the loading
  // state before this bundle parses — no need to re-render it on boot. We
  // only re-render loading on subsequent tool inputs (ontoolinput below).

  // In-flight SSE fetch for the current pending question, if any. Cancelled
  // on teardown / new tool result so a stale stream can't overwrite a newer
  // render.
  let pendingAbort: AbortController | null = null;

  function onFollowup(text: string): void {
    // Optimistic: chip click already disabled the grid; the streaming signal
    // from host (Unit 6) will keep them disabled until the next result.
    void app.sendMessage({
      role: 'user',
      content: [{ type: 'text', text }],
    });
  }

  function abortPending(): void {
    if (pendingAbort) {
      pendingAbort.abort();
      pendingAbort = null;
    }
  }

  function handleToolResult(raw: unknown): void {
    // The App SDK's `ontoolresult` passes the notification's `params`; spec
    // says `params` contains `content` + `structuredContent`. Be defensive.
    const params = (raw ?? {}) as {
      structuredContent?: unknown;
      content?: unknown;
    };
    const sc = params.structuredContent;
    if (!sc || typeof sc !== 'object') {
      renderFallbackShell(mount, 'Tool result missing structuredContent');
      return;
    }

    abortPending();

    // Fresh tool calls: the server returns a pending pointer and the iframe
    // drives the slow work via SSE. Persisted replays bypass this — their
    // structuredContent is already the final AviationToolResult.
    if (isPendingResult(sc)) {
      const controller = new AbortController();
      pendingAbort = controller;
      void streamAviationQuery(mount, sc, controller.signal)
        .then((result) => {
          if (controller.signal.aborted) return;
          renderResult(mount, result, onFollowup);
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return;
          const message = err instanceof Error ? err.message : String(err);
          renderFallbackShell(mount, `Query failed: ${message}`);
        })
        .finally(() => {
          if (pendingAbort === controller) pendingAbort = null;
        });
      return;
    }

    renderResult(mount, sc as AviationToolResult, onFollowup);
  }

  app.ontoolinput = () => {
    /* A new tool call is starting. Any previous in-flight SSE stream is now
     * stale — abort it and return to the neutral loading state. The subsequent
     * `ontoolresult` will either drive a new stream or render directly. */
    abortPending();
    state.loadingStartedAt = undefined;
    renderLoading(mount);
  };

  app.ontoolresult = (params) => handleToolResult(params);

  app.onhostcontextchanged = (params) => {
    handleHostContextChanged(params as McpUiHostContext);
  };

  app.ontoolcancelled = () => {
    abortPending();
    renderFallbackShell(mount, 'Tool call cancelled.');
  };

  app.onerror = (err: Error) => {
    abortPending();
    const message = err instanceof Error ? err.message : String(err);
    renderFallbackShell(mount, `Error: ${message}`);
    // eslint-disable-next-line no-console
    console.error('[aviation-answer] app error:', err);
  };

  return { app, mount, handleToolResult, handleHostContextChanged };
}

function renderFallbackShell(mount: HTMLElement, message: string): void {
  stopLoadingTicker();
  mount.replaceChildren();
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const box = document.createElement('div');
  box.className = 'error-state';
  box.setAttribute('data-testid', 'aviation-error-state');
  box.textContent = message;
  wrap.appendChild(box);
  mount.appendChild(wrap);
}

/* --------------------------------------------------------------------------
 * Self-boot when loaded in the iframe. Skipped in tests by setting
 * `window.__MCP_UI_TEST__ = true` before module eval (vitest does via setup).
 * -------------------------------------------------------------------------- */

declare global {
  interface Window {
    __MCP_UI_TEST__?: boolean;
    __AVIATION_ANSWER__?: {
      handleToolResult: (r: unknown) => void;
      handleHostContextChanged: (ctx: McpUiHostContext) => void;
    };
  }
}

// Self-boot only when:
//   (a) we're in a browser,
//   (b) #app mount exists (prod bundle ships with it),
//   (c) __MCP_UI_TEST__ is NOT set (vitest can set this if needed).
// The vitest unit suite doesn't mount #app, so the self-boot naturally no-ops.
if (
  typeof window !== 'undefined' &&
  !window.__MCP_UI_TEST__ &&
  typeof document !== 'undefined' &&
  document.getElementById('app') !== null
) {
  // Bypass the ext-apps `autoResize` gate: the library only sends
  // `ui/notifications/size-changed` AFTER the `ui/initialize` handshake
  // resolves. Some hosts (observed in Claude Desktop for pending tool results)
  // don't respond to `ui/initialize` in a timely way, leaving the iframe at 0
  // height and invisible to the user. Post size-changed directly via
  // `window.parent.postMessage` on load + on every resize so the host renders
  // us regardless of whether the App handshake completes.
  const notifySize = (): void => {
    try {
      const root = document.documentElement;
      const prevHeight = root.style.height;
      root.style.height = 'max-content';
      const height = Math.ceil(root.getBoundingClientRect().height);
      root.style.height = prevHeight;
      const width = Math.ceil(window.innerWidth);
      window.parent.postMessage(
        {
          jsonrpc: '2.0',
          method: 'ui/notifications/size-changed',
          params: { width, height },
        },
        '*',
      );
    } catch {
      /* best-effort; postMessage rarely throws but a pinned parent origin could */
    }
  };
  // Initial size ping before the App handshake fires.
  notifySize();
  // Observe both elements ext-apps observes, so when content arrives (loader
  // -> chart) the host grows the iframe. The ext-apps autoResize path will
  // additionally re-observe after connect; the duplicate notifications are
  // harmless (host coalesces by value).
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => notifySize());
    ro.observe(document.documentElement);
    ro.observe(document.body);
  }

  const boot = createBootstrap();
  // Expose a tiny hook so the Playwright harness can deliver tool-results
  // directly when an App-level transport isn't present in the local test env.
  window.__AVIATION_ANSWER__ = {
    handleToolResult: boot.handleToolResult,
    handleHostContextChanged: boot.handleHostContextChanged,
  };
  void boot.app.connect().then(() => {
    const ctx = boot.app.getHostContext();
    if (ctx) handleHostContextChanged(ctx);
  });
}
