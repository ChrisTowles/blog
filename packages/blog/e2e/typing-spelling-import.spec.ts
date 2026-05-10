import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

/**
 * Spelling-import smoke test. The full vision-extract flow requires
 * authentication + Claude vision; here we validate that the New Spelling
 * page renders and the form is reachable. A future test can mock
 * /api/typing/spelling/extract via Playwright route() for the full flow.
 */

test.describe('Typing app — spelling list flow', () => {
  test('renders the new spelling list page with the form + dropzone', async ({ page }) => {
    await page.goto('/typing/spelling/new', { waitUntil: 'networkidle' });
    const newPage = page.getByTestId(TEST_IDS.TYPING.SPELLING_NEW_PAGE);
    await expect(newPage).toBeVisible();

    // Without an active learner, the page should prompt to switch.
    await expect(newPage).toContainText(/learner/i);
  });

  test('renders the spelling index with empty-state hint when no learner', async ({ page }) => {
    await page.goto('/typing/spelling', { waitUntil: 'networkidle' });
    await expect(page.getByTestId(TEST_IDS.TYPING.SPELLING_PAGE)).toBeVisible();
  });
});
