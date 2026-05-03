import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Poker page', () => {
  test('renders the page and reaches a fresh hand', async ({ page }) => {
    await page.goto('/poker', { waitUntil: 'networkidle' });

    // Page container present
    const pokerPage = page.getByTestId(TEST_IDS.POKER.PAGE);
    await expect(pokerPage).toBeVisible();

    // Title rendered
    await expect(page.getByRole('heading', { name: "Heads-Up Hold'em" })).toBeVisible();

    // Start overlay shows initially
    const startButton = page.getByTestId(TEST_IDS.POKER.START_BUTTON);
    await expect(startButton).toBeVisible();

    // Click to deal first hand
    await startButton.click();

    // Action panel must appear (player gets first action: SB on hand 1)
    const actionPanel = page.getByTestId(TEST_IDS.POKER.ACTION_PANEL);
    await expect(actionPanel).toBeVisible();

    // Fold button is always available; clicking it ends the hand
    const foldButton = page.getByTestId(TEST_IDS.POKER.FOLD);
    await expect(foldButton).toBeVisible();
    await foldButton.click();

    // Result overlay appears with "Next hand" button (we still have chips)
    const result = page.getByTestId(TEST_IDS.POKER.RESULT);
    await expect(result).toBeVisible();
    await expect(result).toContainText(/AI won/);

    const nextHand = page.getByTestId(TEST_IDS.POKER.NEXT_HAND);
    await expect(nextHand).toBeVisible();
  });

  test('navigation includes the poker link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const pokerLinks = page.getByTestId(TEST_IDS.NAVIGATION.POKER_LINK);
    await expect(pokerLinks.first()).toBeAttached();
  });
});
