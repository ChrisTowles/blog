import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Loan Demo Page', () => {
  test('page loads with title', async ({ page }) => {
    await page.goto('/loan-demo', { waitUntil: 'networkidle' });

    await expect(page.getByText('Home Loan Application')).toBeVisible();
  });

  test('page container has test ID', async ({ page }) => {
    await page.goto('/loan-demo', { waitUntil: 'networkidle' });

    const container = page.getByTestId(TEST_IDS.LOAN.PAGE);
    await expect(container).toBeVisible();
  });

  test('start button is visible and clickable', async ({ page }) => {
    await page.goto('/loan-demo', { waitUntil: 'networkidle' });

    const startButton = page.getByTestId(TEST_IDS.LOAN.START_BUTTON);
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
    await expect(startButton).toHaveText('Start Application');
  });

  test('shows description text on start phase', async ({ page }) => {
    await page.goto('/loan-demo', { waitUntil: 'networkidle' });

    await expect(page.getByText('Start a conversation with our AI loan officer')).toBeVisible();
  });

  test.skip('clicking start transitions to intake phase', async ({ page }) => {
    // Skipped: requires API call to POST /api/loan which needs auth/session
    await page.goto('/loan-demo', { waitUntil: 'networkidle' });

    const startButton = page.getByTestId(TEST_IDS.LOAN.START_BUTTON);
    await startButton.click();

    // After clicking, should show progress and chat
    const progress = page.getByTestId(TEST_IDS.LOAN.PROGRESS);
    await expect(progress).toBeVisible({ timeout: 10000 });

    const chatInput = page.getByTestId(TEST_IDS.LOAN.CHAT_INPUT);
    await expect(chatInput).toBeVisible({ timeout: 10000 });
  });

  test.skip('intake phase shows 0% progress initially', async ({ page }) => {
    // Skipped: requires successful API call to create application
    await page.goto('/loan-demo', { waitUntil: 'networkidle' });

    const startButton = page.getByTestId(TEST_IDS.LOAN.START_BUTTON);
    await startButton.click();

    await expect(page.getByText('0%')).toBeVisible({ timeout: 10000 });
  });

  test.skip('full intake conversation and review', async ({ page }) => {
    // Skipped: requires live Anthropic API for AI chat and review streaming
    // This would test the complete flow: start → chat → submit → review
    await page.goto('/loan-demo', { waitUntil: 'networkidle' });

    const startButton = page.getByTestId(TEST_IDS.LOAN.START_BUTTON);
    await startButton.click();

    // Wait for chat to initialize
    const chatInput = page.getByTestId(TEST_IDS.LOAN.CHAT_INPUT);
    await expect(chatInput).toBeVisible({ timeout: 10000 });

    // Would need to interact with AI chat to fill all fields
    // Then click submit for review button
    // Then verify review cards appear
  });
});
