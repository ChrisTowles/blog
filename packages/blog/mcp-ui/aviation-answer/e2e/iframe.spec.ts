/**
 * Playwright happy-path for the aviation-answer bundle (Unit 4).
 *
 * Drives the built single-file HTML against the real browser, pokes the
 * test-exposed hook with a canned bar-chart fixture, and asserts the DOM.
 *
 * Scope (narrowed per Unit 4 execution plan): bar-chart happy path only.
 * Additional fixtures (line, scatter, treemap, table, theme toggle,
 * tool-cancelled, initialize-timeout, streaming-disable, axe-core) are
 * follow-ups punted to subsequent commits.
 */
import { test, expect } from '@playwright/test';

const PORT = Number(process.env.AVIATION_E2E_PORT || 8182);

const BAR_FIXTURE = {
  sql: "SELECT manufacturer_name, COUNT(*) FROM read_parquet('gs://.../dims/aircraft.parquet') GROUP BY 1 ORDER BY 2 DESC LIMIT 5",
  answer: 'Cessna leads the US FAA registry by aircraft count, followed by Piper and Beech.',
  hero_number: '218,421',
  chart_option: {
    title: { text: 'Top manufacturers in the FAA Registry' },
    tooltip: {},
    xAxis: { type: 'category', data: ['CESSNA', 'PIPER', 'BEECH', 'BOEING', 'AIRBUS'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [218421, 95120, 48220, 7550, 2134] }],
  },
  followups: [
    'Which US operators have the oldest Boeing 737 fleets?',
    'How many Cessna aircraft are registered to Part 135 operators?',
    'What was the busiest US domestic route in 2025 by passengers?',
  ],
  rows: [
    { manufacturer_name: 'CESSNA', count: 218421 },
    { manufacturer_name: 'PIPER', count: 95120 },
    { manufacturer_name: 'BEECH', count: 48220 },
    { manufacturer_name: 'BOEING', count: 7550 },
    { manufacturer_name: 'AIRBUS', count: 2134 },
  ],
  truncated: false,
};

test.describe('aviation-answer iframe bundle', () => {
  test('renders hero, chart, chips, and SQL toggle from a bar fixture', async ({ page }) => {
    await page.goto(`http://127.0.0.1:${PORT}/bundle.html`, { waitUntil: 'domcontentloaded' });

    // The bundle's self-boot path runs; the test hook is published on window.
    await page.waitForFunction(
      () =>
        typeof (window as Window & { __AVIATION_ANSWER__?: object }).__AVIATION_ANSWER__ !==
        'undefined',
    );

    // Drive the tool-result handler directly — same entry the App transport
    // would reach when ui/notifications/tool-result arrives.
    await page.evaluate((fixture) => {
      const w = window as Window & {
        __AVIATION_ANSWER__?: { handleToolResult: (r: unknown) => void };
      };
      w.__AVIATION_ANSWER__!.handleToolResult({ structuredContent: fixture });
    }, BAR_FIXTURE);

    // Hero number + h2 answer.
    await expect(page.getByTestId('aviation-hero-number')).toHaveText('218,421');
    const answer = page.getByTestId('aviation-hero-answer');
    await expect(answer).toBeVisible();
    await expect(answer).toContainText('Cessna');
    expect(await answer.evaluate((el) => el.tagName)).toBe('H2');

    // Chart canvas rendered (ECharts uses a <canvas> in canvas-renderer mode).
    const chart = page.getByTestId('aviation-chart');
    await expect(chart).toBeVisible();
    const canvas = chart.locator('canvas');
    await expect(canvas).toHaveCount(1);

    // Three chips with accessible labels.
    const chips = page.getByTestId('aviation-chips').locator('.chip');
    await expect(chips).toHaveCount(3);
    await expect(chips.nth(0)).toHaveAttribute(
      'aria-label',
      /Which US operators have the oldest Boeing 737 fleets/,
    );

    // Chips are <button> (keyboard-focusable). Focus the first via keyboard.
    await chips.nth(0).focus();
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('BUTTON');

    // SQL toggle starts collapsed.
    const toggle = page.getByTestId('aviation-sql-toggle');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
