import { test, expect } from '@playwright/test';

test('a misspelled album URL redirects to the album', async ({ request }) => {
  const res = await request.get('/i-can-t-clap', { maxRedirects: 0 });

  expect(res.status()).toBe(301);
  expect(res.headers().location).toBe('/i-cant-clap');
});

test('an old numbered song URL redirects to its new slug', async ({ request }) => {
  const res = await request.get('/i-cant-clap/24-the-steep-part', { maxRedirects: 0 });

  expect(res.status()).toBe(301);
  expect(res.headers().location).toBe('/i-cant-clap/the-steep-part');
});

test('an unknown page answers 404', async ({ request }) => {
  const res = await request.get('/no-such-page');

  expect(res.status()).toBe(404);
});
