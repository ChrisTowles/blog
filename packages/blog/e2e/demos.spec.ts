import { test, expect } from '@playwright/test';

test('a static demo loads its own CSS and JS from its trailing-slash-less URL', async ({
  page,
}) => {
  const assets = ['app.css', 'app.js'].map((name) =>
    page.waitForResponse((res) => res.url().endsWith(`/demos/turbofan-explorer/${name}`)),
  );

  // The post links here; Workers Assets 307s it to the trailing-slash-less URL below.
  await page.goto('/demos/turbofan-explorer/index.html');
  await expect(page).toHaveURL(/\/demos\/turbofan-explorer$/);

  const [css, js] = await Promise.all(assets);
  expect(css.headers()['content-type']).toContain('text/css');
  expect(js.headers()['content-type']).toContain('javascript');
});
