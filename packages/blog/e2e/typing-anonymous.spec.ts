import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Typing app — anonymous flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start with a clean localStorage so progress assertions are deterministic.
    await page.goto('/typing', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('lands on /typing, picks stage 1, types a lesson, sees results', async ({ page }) => {
    await page.goto('/typing', { waitUntil: 'networkidle' });

    // Landing page renders.
    const landing = page.getByTestId(TEST_IDS.TYPING.LANDING_PAGE);
    await expect(landing).toBeVisible();

    // Stage 1 lesson cards visible.
    const cards = page.getByTestId(TEST_IDS.TYPING.LESSON_CARD);
    await expect(cards.first()).toBeVisible();

    // Pick the first stage 1 lesson.
    const firstStartLink = cards.first().getByRole('link', { name: /start lesson/i });
    await firstStartLink.click();

    // Lesson runner visible.
    const runner = page.getByTestId(TEST_IDS.TYPING.LESSON_RUNNER);
    await expect(runner).toBeVisible();

    // Pull the lesson text and type it character-by-character.
    const lessonText = await page.getByTestId(TEST_IDS.TYPING.LESSON_TEXT).textContent();
    expect(lessonText).toBeTruthy();
    // The displayed dot character replaces real spaces; reconstruct by reading
    // the original lesson via a quick inline query against the DOM.
    const text = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="typing-lesson-text"]');
      if (!el) return '';
      const spans = Array.from(el.querySelectorAll('span'));
      return spans
        .map((s) => {
          const t = (s.textContent ?? '').trim();
          return t === '·' ? ' ' : t;
        })
        .join('');
    });
    expect(text.length).toBeGreaterThan(0);

    // Focus the lesson runner so keystrokes go to the hidden input.
    await runner.click();

    // Type each char as a key event. The runner's onKeydown handler reads
    // e.key for length-1 keys and feeds the engine.
    for (const ch of text) {
      const keyName = ch === ' ' ? 'Space' : ch;
      await page.keyboard.press(keyName, { delay: 20 });
    }

    // Lesson complete card appears.
    const complete = page.getByTestId(TEST_IDS.TYPING.LESSON_COMPLETE);
    await expect(complete).toBeVisible({ timeout: 10_000 });
    await expect(complete).toContainText(/Nice work/i);
  });

  test('progress persists across reload via localStorage', async ({ page }) => {
    // Seed localStorage directly with a fake completed attempt, then reload
    // and assert the progress page reflects it.
    await page.goto('/typing', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      const progress = {
        schemaVersion: 1,
        currentStage: 2,
        attempts: [
          {
            lessonId: null,
            gameSlug: null,
            wpm: 18,
            netWpm: 16,
            accuracy: 0.96,
            durationMs: 12_000,
            errorsByKey: {},
            completedAt: new Date().toISOString(),
          },
        ],
        keyStats: {
          f: { attempts: 12, errors: 1, avgMs: 200 },
        },
      };
      localStorage.setItem('typing:progress:v1', JSON.stringify(progress));
    });

    await page.goto('/typing/progress', { waitUntil: 'networkidle' });
    const progressPage = page.getByTestId(TEST_IDS.TYPING.PROGRESS_PAGE);
    await expect(progressPage).toBeVisible();

    // Stage map shows stage 2 active.
    const stageMap = page.getByTestId(TEST_IDS.TYPING.STAGE_MAP);
    await expect(stageMap).toContainText('stage');
    await expect(stageMap).toContainText('2');

    // Reload — progress survives.
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByTestId(TEST_IDS.TYPING.PROGRESS_PAGE)).toBeVisible();
    await expect(page.getByTestId(TEST_IDS.TYPING.STAGE_MAP)).toContainText('2');
  });
});
