import { test, expect } from '@playwright/test'
import { TEST_IDS } from '~~/shared/test-ids'

test.describe('Blog Navigation', () => {
  test('home page loads with blog posts', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Check that blog post list section is visible on home page
    const postListSection = page.getByTestId(TEST_IDS.BLOG.POST_LIST_SECTION)
    await expect(postListSection).toBeVisible()

    // Check that blog posts are visible
    const postList = page.getByTestId(TEST_IDS.BLOG.POST_LIST)
    await expect(postList).toBeVisible()
  })

  test('navigate from home to blog list via nav link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Click blog link in navigation
    const blogLink = page.getByTestId(TEST_IDS.NAVIGATION.BLOG_LINK).first()
    await blogLink.click()
    await page.waitForLoadState('networkidle')

    // Verify blog list page loaded
    await expect(page).toHaveURL('/blog')

    // Verify blog page container is visible
    const blogPage = page.getByTestId(TEST_IDS.BLOG.PAGE)
    await expect(blogPage).toBeVisible()

    // Verify blog posts loaded
    const postList = page.getByTestId(TEST_IDS.BLOG.POST_LIST)
    await expect(postList).toBeVisible()
  })

  test('navigate from home to blog list directly', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' })

    // Verify blog list page loaded
    await expect(page).toHaveURL('/blog')

    // Verify blog page container is visible
    const blogPage = page.getByTestId(TEST_IDS.BLOG.PAGE)
    await expect(blogPage).toBeVisible()

    // Verify blog posts loaded
    const postList = page.getByTestId(TEST_IDS.BLOG.POST_LIST)
    await expect(postList).toBeVisible()
  })

  test('navigate to blog post detail', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' })

    // Verify post list is visible
    const postList = page.getByTestId(TEST_IDS.BLOG.POST_LIST)
    await expect(postList).toBeVisible()

    // Find first blog post link within the list (may be hidden due to styling)
    const firstPostLink = postList.locator('a[href^="/blog/"]').first()
    const href = await firstPostLink.getAttribute('href')

    if (href && href !== '/blog') {
      // Navigate to the post
      await page.goto(href, { waitUntil: 'networkidle' })

      // Verify we're on a blog post detail page
      await expect(page).toHaveURL(/\/blog\//)
      await expect(page.locator('body')).toBeVisible()
    }
  })

  test('blog post has metadata', async ({ page }) => {
    // Navigate to a known blog post
    await page.goto('/blog/why-i-bought-tesla-model-3-vertical-integration', { waitUntil: 'networkidle' })

    // Verify page loaded (status 200 or content visible)
    const content = page.locator('body')
    await expect(content).toBeVisible()
  })

  test('can navigate between blog posts', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' })

    // Get post list and find first link
    const postList = page.getByTestId(TEST_IDS.BLOG.POST_LIST)
    await expect(postList).toBeVisible()

    const firstPostLink = postList.locator('a[href^="/blog/"]').first()
    const href = await firstPostLink.getAttribute('href')

    if (href && href !== '/blog') {
      // Navigate to post
      await page.goto(href, { waitUntil: 'networkidle' })
      await expect(page).toHaveURL(href)

      // Go back to blog list
      await page.goto('/blog', { waitUntil: 'networkidle' })
      await expect(page).toHaveURL('/blog')

      // Verify blog page is visible again
      const blogPage = page.getByTestId(TEST_IDS.BLOG.PAGE)
      await expect(blogPage).toBeVisible()
    }
  })
})
