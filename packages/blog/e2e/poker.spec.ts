import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Poker page', () => {
  test('renders the page and reaches a fresh hand', async ({ page }) => {
    // The PixiJS table keeps loading assets, so `networkidle` can outlast the
    // timeout under parallel load. The assertions below auto-wait instead.
    await page.goto('/poker');

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

  test('home page links to poker', async ({ page }) => {
    // No `networkidle` — the home page lazy-loads every post image, so that
    // heuristic is slow and racy here. The assertion below auto-waits.
    await page.goto('/');
    const pokerLinks = page.getByTestId(TEST_IDS.HOME.EXPERIMENT_POKER);
    await expect(pokerLinks.first()).toBeAttached();
  });
});
