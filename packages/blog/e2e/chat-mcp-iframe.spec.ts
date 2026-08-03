/**
 * Stops short of the iframe: the full starter → MCP → iframe path needs the deployed sandbox
 * proxy and a real Anthropic call, neither of which is hermetic against the dev server.
 * That remainder is verified by hand against the deployed sandbox.
 */

import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Aviation MCP in-chat', () => {
  test('starter-question pill grid renders on /chat home', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });

    const starters = page.getByTestId(TEST_IDS.AVIATION.STARTER_QUESTIONS);
    await expect(starters).toBeVisible({ timeout: 10_000 });

    const buttons = page.getByTestId(TEST_IDS.AVIATION.STARTER_QUESTION_BUTTON);
    await expect(buttons.first()).toBeVisible();

    // At least the curated 10 questions render (compile-time mirror).
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('aviation starters list contains the canonical 737 question', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });

    // The canonical starter driving CH-01 in the cross-host matrix.
    const expected = 'Which operators have the oldest Boeing 737 fleets?';
    const pill = page.locator(`[data-testid="${TEST_IDS.AVIATION.STARTER_QUESTION_BUTTON}"]`, {
      hasText: expected,
    });
    await expect(pill).toBeVisible();
  });
});
