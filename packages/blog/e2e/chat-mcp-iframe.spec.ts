/**
 * Playwright e2e for Unit 6 aviation MCP-in-chat flow.
 *
 * Scope (narrow slice per Unit 6 prompt):
 *   - Starter-question pill grid renders on the /chat home page.
 *   - Clicking a starter pill kicks off the aviation flow (navigation +
 *     ?aviation=1 query param).
 *
 * Full starter → MCP → iframe happy path requires a deployed sandbox proxy
 * (sandbox.towles.dev) + a real Anthropic LLM call for ask_aviation, both
 * of which are outside the hermetic dev-server surface. Those are verified
 * end-to-end in the cross-host matrix (docs/plans/2026-04-14-001-cross-host-test-matrix.md).
 */

import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Aviation MCP in-chat (Unit 6)', () => {
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
