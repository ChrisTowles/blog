import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Loan Page', () => {
  test('redirects unauthenticated users', async ({ page }) => {
    await page.goto('/loan', { waitUntil: 'networkidle' });

    // Auth middleware redirects unauthenticated users away from /loan
    await expect(page).not.toHaveURL(/\/loan/);
  });

  test.skip('page loads with title when authenticated', async ({ page }) => {
    // Skipped: requires auth session
    await page.goto('/loan', { waitUntil: 'networkidle' });
    await expect(page.getByText('Home Loan Application')).toBeVisible();
  });

  test.skip('start button is visible when authenticated', async ({ page }) => {
    // Skipped: requires auth session
    await page.goto('/loan', { waitUntil: 'networkidle' });

    const startButton = page.getByTestId(TEST_IDS.LOAN.START_BUTTON);
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
    await expect(startButton).toHaveText('Start Application');
  });

  test.skip('clicking start navigates to intake page', async ({ page }) => {
    // Skipped: requires auth session + API call
    await page.goto('/loan', { waitUntil: 'networkidle' });

    const startButton = page.getByTestId(TEST_IDS.LOAN.START_BUTTON);
    await startButton.click();

    // After clicking, should navigate to /loan/[id]
    await expect(page).toHaveURL(/\/loan\/[\w-]+/);

    const progress = page.getByTestId(TEST_IDS.LOAN.PROGRESS);
    await expect(progress).toBeVisible({ timeout: 10000 });

    const chatInput = page.getByTestId(TEST_IDS.LOAN.CHAT_INPUT);
    await expect(chatInput).toBeVisible({ timeout: 10000 });
  });

  test.skip('full intake conversation and review', async ({ page }) => {
    // Skipped: requires auth + live Anthropic API
    await page.goto('/loan', { waitUntil: 'networkidle' });

    const startButton = page.getByTestId(TEST_IDS.LOAN.START_BUTTON);
    await startButton.click();

    // Would navigate to /loan/[id], chat, then /loan/[id]/review
  });
});
