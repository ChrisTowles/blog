import { test, expect } from '@playwright/test';

test('a static demo loads its own CSS and JS from its trailing-slash-less URL', async ({
  page,
}) => {
  const assets = ['app.css', 'app.js'].map((name) =>
    page.waitForResponse((res) => res.url().endsWith(`/demos/turbofan-explorer/${name}`)),
  );

  // Workers Assets (CI's wrangler dev) 307s to the slash-less URL; `nuxt dev` doesn't.
  await page.goto('/demos/turbofan-explorer/index.html');
  await expect(page).toHaveURL(
    process.env.CI ? /\/demos\/turbofan-explorer$/ : /\/demos\/turbofan-explorer(\/index\.html)?$/,
  );

  const [css, js] = await Promise.all(assets);
  expect(css.headers()['content-type']).toContain('text/css');
  expect(js.headers()['content-type']).toContain('javascript');
});
