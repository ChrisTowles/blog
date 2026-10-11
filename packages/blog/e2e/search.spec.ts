import { test, expect } from '@playwright/test';

test('a shared /search?q= link runs that search on load', async ({ page }) => {
  const searchRequest = page.waitForRequest(
    (req) => req.url().endsWith('/api/search') && req.method() === 'POST',
  );

  await page.goto('/search?q=claude%20agents');

  expect((await searchRequest).postDataJSON()).toMatchObject({ query: 'claude agents' });
  await expect(page.getByPlaceholder('Search for topics, concepts, or questions...')).toHaveValue(
    'claude agents',
  );
});
