import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Typing app — Letter Rain smoke', () => {
  test('mounts the PixiJS canvas without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('/typing/game/letter-rain?stage=5', { waitUntil: 'networkidle' });

    const stageEl = page.getByTestId(TEST_IDS.TYPING.GAME_STAGE);
    await expect(stageEl).toBeVisible();

    const canvas = page.getByTestId(TEST_IDS.TYPING.GAME_LETTER_RAIN);
    await expect(canvas).toBeVisible();

    // Allow a brief settle for the PixiJS app to attach a <canvas>.
    await page.waitForFunction(() => !!document.querySelector('canvas'));

    // No noisy console errors from game code.
    const gameRelated = consoleErrors.filter((e) => /pixi|game|letter rain/i.test(e));
    expect(gameRelated).toEqual([]);
  });
});
