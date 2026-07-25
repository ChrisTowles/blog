import { test, expect, type Locator } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

// The header nav is down to four items, so this grid is the only index of the
// experiment routes. If a card stops rendering, that page becomes unreachable
// by clicking — these tests are what catch that.
const EXPERIMENTS = [
  {
    testId: TEST_IDS.HOME.EXPERIMENT_TOWLES_TOOL,
    href: 'https://github.com/ChrisTowles/towles-tool',
  },
  { testId: TEST_IDS.HOME.EXPERIMENT_CHAT, href: '/chat' },
  { testId: TEST_IDS.HOME.EXPERIMENT_AVIATION, href: '/aviation' },
  { testId: TEST_IDS.HOME.EXPERIMENT_SEARCH, href: '/search' },
  { testId: TEST_IDS.HOME.EXPERIMENT_TYPING, href: '/typing' },
  { testId: TEST_IDS.HOME.EXPERIMENT_WORKFLOWS, href: '/workflows' },
  { testId: TEST_IDS.HOME.EXPERIMENT_POKER, href: '/poker' },
  { testId: TEST_IDS.HOME.EXPERIMENT_APPS, href: '/apps' },
];

// UPageCard puts the link attrs on a zero-size <a> whose `span.absolute inset-0`
// child is the actual click target covering the card. So assert on the anchor,
// but click the overlay.
const overlay = (card: Locator) => card.locator('span').first();

test.describe('Home page', () => {
  test('renders every experiment card with the right link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByTestId(TEST_IDS.HOME.EXPERIMENTS)).toBeVisible();

    for (const { testId, href } of EXPERIMENTS) {
      const card = page.getByTestId(testId).first();
      await expect(card).toHaveAttribute('href', href);
      await expect(overlay(card)).toBeVisible();
    }
  });

  test('Towles Tool is the first card', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const first = page.getByTestId(TEST_IDS.HOME.EXPERIMENTS).getByRole('link').first();
    await expect(first).toHaveAttribute('href', 'https://github.com/ChrisTowles/towles-tool');
  });

  test('clicking an experiment card navigates to it', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await overlay(page.getByTestId(TEST_IDS.HOME.EXPERIMENT_TYPING).first()).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL('/typing');
  });

  test('header nav is trimmed to four items', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    for (const testId of [
      TEST_IDS.NAVIGATION.HOME_LINK,
      TEST_IDS.NAVIGATION.BLOG_LINK,
      TEST_IDS.NAVIGATION.SEARCH_LINK,
      TEST_IDS.NAVIGATION.ABOUT_LINK,
    ]) {
      await expect(page.getByTestId(testId).first()).toBeAttached();
    }
  });

  test('blog posts still list below the experiment grid', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByTestId(TEST_IDS.BLOG.POST_LIST)).toBeVisible();
  });
});
