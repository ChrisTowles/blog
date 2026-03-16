import { test, expect } from '@playwright/test';
import { TEST_IDS } from '~~/shared/test-ids';

test.describe('Reading App', () => {
  test.describe('Landing Page', () => {
    test('loads with feature cards and CTA', async ({ page }) => {
      await page.goto('/reading', { waitUntil: 'networkidle' });

      const landing = page.getByTestId(TEST_IDS.READING.LANDING_PAGE);
      await expect(landing).toBeVisible();

      // Feature cards visible
      await expect(page.getByText('Personalized Stories')).toBeVisible();
      await expect(page.getByText('Spaced Repetition')).toBeVisible();
      await expect(page.getByText('Read Along')).toBeVisible();

      // CTA button visible
      const cta = page.getByTestId(TEST_IDS.READING.LANDING_CTA);
      await expect(cta).toBeVisible();
      await expect(cta).toHaveText('Get Started');
    });

    test('CTA links to onboarding', async ({ page }) => {
      await page.goto('/reading', { waitUntil: 'networkidle' });

      const cta = page.getByTestId(TEST_IDS.READING.LANDING_CTA);
      await expect(cta).toHaveAttribute('href', '/reading/onboarding');
    });

    test('is SSR rendered (has content before JS)', async ({ page }) => {
      // Disable JS to verify SSR
      await page.route('**/*.js', (route) => route.abort());
      await page.goto('/reading', { waitUntil: 'commit' });

      // Core content should be in initial HTML
      const body = await page.content();
      expect(body).toContain('AI-Powered Reading Practice');
      expect(body).toContain('Get Started');
    });
  });

  test.describe('Dashboard (auth required)', () => {
    test('redirects unauthenticated users', async ({ page }) => {
      await page.goto('/reading/dashboard', { waitUntil: 'networkidle' });

      // Auth middleware redirects unauthenticated users
      await expect(page).not.toHaveURL(/\/reading\/dashboard/);
    });
  });

  test.describe('Onboarding (auth required)', () => {
    test('redirects unauthenticated users', async ({ page }) => {
      await page.goto('/reading/onboarding', { waitUntil: 'networkidle' });

      await expect(page).not.toHaveURL(/\/reading\/onboarding/);
    });
  });

  test.describe('Practice (auth required)', () => {
    test('redirects unauthenticated users', async ({ page }) => {
      await page.goto('/reading/practice', { waitUntil: 'networkidle' });

      await expect(page).not.toHaveURL(/\/reading\/practice/);
    });
  });

  test.describe('Story Reader (auth required)', () => {
    test('redirects unauthenticated users', async ({ page }) => {
      await page.goto('/reading/stories/1', { waitUntil: 'networkidle' });

      await expect(page).not.toHaveURL(/\/reading\/stories/);
    });
  });

  test.describe('API Routes', () => {
    test('seed endpoint requires auth', async ({ request }) => {
      const response = await request.post('/api/reading/seed');
      // Should return 401 or redirect (depending on auth config)
      expect([401, 403]).toContain(response.status());
    });

    test('children list requires auth', async ({ request }) => {
      const response = await request.get('/api/reading/children');
      expect([401, 403]).toContain(response.status());
    });

    test('stories list requires auth and childId', async ({ request }) => {
      const response = await request.get('/api/reading/stories?childId=1');
      expect([401, 403]).toContain(response.status());
    });

    test('SRS due cards requires auth', async ({ request }) => {
      const response = await request.get('/api/reading/srs/due?childId=1');
      expect([401, 403]).toContain(response.status());
    });

    test('SRS stats requires auth', async ({ request }) => {
      const response = await request.get('/api/reading/srs/stats?childId=1');
      expect([401, 403]).toContain(response.status());
    });

    test('story generate requires auth', async ({ request }) => {
      const response = await request.post('/api/reading/stories/generate', {
        data: { childId: 1 },
      });
      expect([401, 403]).toContain(response.status());
    });

    test('session recording requires auth', async ({ request }) => {
      const response = await request.post('/api/reading/sessions', {
        data: { childId: 1, storyId: 1, mode: 'listen', duration: 60 },
      });
      expect([401, 403]).toContain(response.status());
    });
  });
});
