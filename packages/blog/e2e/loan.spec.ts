import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Loan Page', () => {
  test('redirects unauthenticated users', async ({ page }) => {
    // /loan is ssr:false, so the auth middleware only redirects after the
    // client bundle hydrates. `networkidle` can resolve before that, and on a
    // cold compile the redirect lands after the default assertion timeout —
    // which made the old `not.toHaveURL(/\/loan/)` fail cold and pass warm.
    // Waiting for the destination the middleware actually navigates to ('/')
    // is both the stronger assertion and the stable one.
    await page.goto('/loan');

    await page.waitForURL('/', { timeout: 30000 });
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
