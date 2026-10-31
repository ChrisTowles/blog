import { test, expect, type Page } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';
import { readFileSync, readdirSync } from 'node:fs';
import { START_HERE_PATHS } from '../app/utils/home-picks';

const postsDir = new URL('../content/2.blog/', import.meta.url);

const DRAFT_PATHS = readdirSync(postsDir)
  .filter((file) => /^status: draft$/m.test(readFileSync(new URL(file, postsDir), 'utf8')))
  .map((file) => `/blog/${file.replace(/^[\d-]+\./, '').replace(/\.md$/, '')}`);

// The header nav is down to four items, so the home page is the only index of
// the experiment routes. If a link stops rendering, that page becomes
// unreachable by clicking — these tests are what catch that.
const EXPERIMENTS = [
  {
    testId: TEST_IDS.HOME.EXPERIMENT_TOWLES_TOOL,
    href: 'https://github.com/ChrisTowles/towles-tool',
  },
  { testId: TEST_IDS.HOME.EXPERIMENT_CHAT, href: '/chat' },
  { testId: TEST_IDS.HOME.EXPERIMENT_AVIATION, href: '/aviation' },
  { testId: TEST_IDS.HOME.EXPERIMENT_LOAN, href: '/loan' },
  { testId: TEST_IDS.HOME.EXPERIMENT_SEARCH, href: '/search' },
  { testId: TEST_IDS.HOME.EXPERIMENT_TYPING, href: '/typing' },
  { testId: TEST_IDS.HOME.EXPERIMENT_WORKFLOWS, href: '/workflows' },
  { testId: TEST_IDS.HOME.EXPERIMENT_POKER, href: '/poker' },
  { testId: TEST_IDS.HOME.EXPERIMENT_I_CANT_CLAP, href: '/i-cant-clap' },
  { testId: TEST_IDS.HOME.EXPERIMENT_APPS, href: '/apps' },
];

// The home page is slow to compile in dev; gate once rather than per assertion.
async function gotoHome(page: Page) {
  await page.goto('/');
  await expect(page.getByTestId(TEST_IDS.HOME.EXPERIMENTS)).toBeVisible({ timeout: 30_000 });
}

test.describe('Home page', () => {
  test('renders every experiment link with the right href', async ({ page }) => {
    await gotoHome(page);

    for (const { testId, href } of EXPERIMENTS) {
      const link = page.getByTestId(testId).first();
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toBeVisible();
    }
  });

  test('Towles Tool leads the experiment list', async ({ page }) => {
    await gotoHome(page);

    const first = page.getByTestId(TEST_IDS.HOME.EXPERIMENTS).getByRole('link').first();
    await expect(first).toHaveAttribute('href', 'https://github.com/ChrisTowles/towles-tool');
  });

  test('clicking an experiment navigates to it', async ({ page }) => {
    await gotoHome(page);

    await page.getByTestId(TEST_IDS.HOME.EXPERIMENT_TYPING).first().click();

    await expect(page).toHaveURL('/typing');
  });

  test('header nav is trimmed to four items', async ({ page }) => {
    await gotoHome(page);

    for (const testId of [
      TEST_IDS.NAVIGATION.HOME_LINK,
      TEST_IDS.NAVIGATION.BLOG_LINK,
      TEST_IDS.NAVIGATION.SEARCH_LINK,
      TEST_IDS.NAVIGATION.ABOUT_LINK,
    ]) {
      await expect(page.getByTestId(testId).first()).toBeAttached();
    }
  });

  test('picked posts and the latest posts both render', async ({ page }) => {
    await gotoHome(page);

    await expect(page.getByTestId(TEST_IDS.HOME.START_HERE).getByRole('link')).toHaveCount(
      START_HERE_PATHS.length,
    );
    await expect(
      page.getByTestId(TEST_IDS.BLOG.POST_LIST).getByTestId(TEST_IDS.BLOG.POST_LINK),
    ).toHaveCount(5);
  });

  test('the home page never links a draft post', async ({ page }) => {
    await gotoHome(page);

    const hrefs = await page
      .getByTestId(TEST_IDS.HOME.PAGE)
      .locator('a[href^="/blog/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));

    expect(DRAFT_PATHS.length).toBeGreaterThan(0);

    for (const draft of DRAFT_PATHS) {
      expect(hrefs).not.toContain(draft);
    }
  });
});
