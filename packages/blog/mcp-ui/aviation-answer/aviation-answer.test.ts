/**
 * Unit tests for the iframe client logic.
 *
 * Scope (narrowed per Unit 4 plan):
 *   - Bar fixture renders hero, chart container, chips, collapsed SQL.
 *   - Table fixture renders a table (and NOT a chart container).
 *   - Empty rows renders the empty-state copy.
 *   - Truncated banner appears when `truncated: true`.
 *   - Broken chart_option falls back to answer-as-text.
 *   - SQL toggle flips aria-expanded.
 *   - Chip click calls the stubbed App.sendMessage with correct params.
 *   - HostContext with status: 'streaming' disables chips; 'idle' re-enables.
 *   - Unknown status values do not toggle streaming.
 *
 * We mock `App` with a minimal object: the bootstrap module assigns
 * `ontoolinput`, `ontoolresult`, `onhostcontextchanged`, `ontoolcancelled`,
 * `onerror` as properties, and calls `app.connect()` (only when not under test).
 * Our fake App exposes those as writable fields.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import type { App } from '@modelcontextprotocol/ext-apps';
import { createBootstrap } from './aviation-answer';
import {
  BAR_FIXTURE,
  BROKEN_CHART_FIXTURE,
  EMPTY_FIXTURE,
  TABLE_FIXTURE,
  TRUNCATED_FIXTURE,
} from './test-fixture';

function makeFakeApp(): {
  app: App;
  sends: Array<unknown>;
} {
  const sends: Array<unknown> = [];
  // We use `as unknown as App` because we only touch the public surface the
  // bootstrap actually exercises: the `on*` setters + sendMessage.
  const app = {
    ontoolinput: undefined,
    ontoolresult: undefined,
    onhostcontextchanged: undefined,
    ontoolcancelled: undefined,
    onerror: undefined,
    sendMessage(params: unknown) {
      sends.push(params);
      return Promise.resolve({ isError: false });
    },
    connect() {
      return Promise.resolve();
    },
    getHostContext() {
      return undefined;
    },
  } as unknown as App;
  return { app, sends };
}

function makeMount(): HTMLElement {
  // Use a fresh mount per test; happy-dom persists document between tests.
  document.body.innerHTML = '';
  const el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);
  return el;
}

describe('aviation-answer iframe bundle', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders hero + chart container + chips + SQL toggle for a bar fixture', async () => {
    const { app, sends } = makeFakeApp();
    const mount = makeMount();
    const boot = createBootstrap({ app, mount });

    boot.handleToolResult({ structuredContent: BAR_FIXTURE });
    await Promise.resolve(); // let microtask hop settle

    expect(mount.querySelector('[data-testid="aviation-hero-number"]')!.textContent).toBe(
      '218,421',
    );
    expect(mount.querySelector('[data-testid="aviation-hero-answer"]')!.tagName).toBe('H2');
    expect(mount.querySelector('[data-testid="aviation-hero-answer"]')!.textContent).toContain(
      'Cessna',
    );
    // Chart container OR fallback — happy-dom's canvas stub makes ECharts init
    // throw; the fallback path kicks in here. Playwright (real browser) proves
    // the canvas is rendered. What we assert here is that the routing decided
    // "chart path" (not table).
    expect(mount.querySelector('[data-testid="aviation-table"]')).toBeNull();
    const chartOrFallback =
      mount.querySelector('[data-testid="aviation-chart"]') ??
      mount.querySelector('[data-testid="aviation-chart-fallback"]');
    expect(chartOrFallback).toBeTruthy();

    const chipEls = mount.querySelectorAll<HTMLButtonElement>('.chip');
    expect(chipEls.length).toBe(3);
    expect(chipEls[0].getAttribute('aria-label')).toContain('Which US operators');

    // SQL toggle is collapsed.
    const toggle = mount.querySelector<HTMLButtonElement>('[data-testid="aviation-sql-toggle"]')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    // Chip click dispatches ui/message.
    chipEls[0].click();
    expect(sends.length).toBe(1);
    const sent = sends[0] as {
      role: string;
      content: Array<{ type: string; text: string }>;
    };
    expect(sent.role).toBe('user');
    expect(sent.content[0].type).toBe('text');
    expect(sent.content[0].text).toContain('Which US operators');
  });

  it('routes table-shaped results to a table (no chart)', async () => {
    const { app } = makeFakeApp();
    const mount = makeMount();
    const boot = createBootstrap({ app, mount });

    boot.handleToolResult({ structuredContent: TABLE_FIXTURE });
    await Promise.resolve();

    expect(mount.querySelector('[data-testid="aviation-chart"]')).toBeNull();
    const table = mount.querySelector<HTMLTableElement>('[data-testid="aviation-table"]');
    expect(table).toBeTruthy();
    expect(table!.querySelectorAll('tbody tr').length).toBe(3);
  });

  it('renders empty-state for an empty rows table', async () => {
    const { app } = makeFakeApp();
    const mount = makeMount();
    const boot = createBootstrap({ app, mount });

    boot.handleToolResult({ structuredContent: EMPTY_FIXTURE });
    await Promise.resolve();

    expect(mount.querySelector('[data-testid="aviation-empty"]')).toBeTruthy();
  });

  it('shows truncation banner when truncated is true', async () => {
    const { app } = makeFakeApp();
    const mount = makeMount();
    const boot = createBootstrap({ app, mount });

    boot.handleToolResult({ structuredContent: TRUNCATED_FIXTURE });
    await Promise.resolve();

    expect(mount.querySelector('[data-testid="aviation-truncated"]')).toBeTruthy();
  });

  it('falls back to answer-as-text when chart_option is broken', async () => {
    const { app } = makeFakeApp();
    const mount = makeMount();
    const boot = createBootstrap({ app, mount });

    boot.handleToolResult({ structuredContent: BROKEN_CHART_FIXTURE });
    await Promise.resolve();

    const fallback = mount.querySelector('[data-testid="aviation-chart-fallback"]');
    expect(fallback).toBeTruthy();
    expect(fallback!.textContent).toContain('Cessna');
  });

  it('disables chips on streaming=streaming, re-enables on streaming=idle', async () => {
    const { app } = makeFakeApp();
    const mount = makeMount();
    const boot = createBootstrap({ app, mount });

    boot.handleToolResult({ structuredContent: BAR_FIXTURE });
    await Promise.resolve();

    // Initially no streaming — chips are enabled.
    for (const c of mount.querySelectorAll<HTMLButtonElement>('.chip')) {
      expect(c.getAttribute('aria-disabled')).toBeNull();
    }

    // Host sends streaming=streaming (Unit 6 extension).
    boot.handleHostContextChanged({ status: 'streaming' } as never);
    for (const c of mount.querySelectorAll<HTMLButtonElement>('.chip')) {
      expect(c.getAttribute('aria-disabled')).toBe('true');
    }

    // Host sends streaming=idle.
    boot.handleHostContextChanged({ status: 'idle' } as never);
    for (const c of mount.querySelectorAll<HTMLButtonElement>('.chip')) {
      expect(c.getAttribute('aria-disabled')).toBeNull();
    }

    // Unknown status — no change.
    boot.handleHostContextChanged({ status: 'weird' } as never);
    for (const c of mount.querySelectorAll<HTMLButtonElement>('.chip')) {
      expect(c.getAttribute('aria-disabled')).toBeNull();
    }
  });

  it('renders the truncation banner with semantic role=note', async () => {
    const { app } = makeFakeApp();
    const mount = makeMount();
    const boot = createBootstrap({ app, mount });
    boot.handleToolResult({ structuredContent: TRUNCATED_FIXTURE });
    await Promise.resolve();
    const banner = mount.querySelector('[data-testid="aviation-truncated"]');
    expect(banner!.getAttribute('role')).toBe('note');
  });
});
