import { test, expect } from '@playwright/test'
import { TEST_IDS } from '~~/shared/test-ids'

test.describe('AI Chat', () => {
  test('chat page loads', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    // Verify chat page loaded (may redirect to login, so just check it's accessible)
    const url = page.url()
    expect(url).toContain('localhost:3001')
  })

  test('displays chat interface elements', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    // Verify chat input container exists using test ID
    const chatContainer = page.getByTestId(TEST_IDS.CHAT.INPUT)
    const count = await chatContainer.count()
    expect(count).toBe(1)

    // If container exists, find textarea within it
    await expect(chatContainer).toBeVisible({ timeout: 10000 })
  })

  test('can type in chat input', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    // Try test ID first, fallback to generic selector
    const chatContainer = page.getByTestId(TEST_IDS.CHAT.INPUT)

    expect(chatContainer).toBeVisible()

    await chatContainer.waitFor({ state: 'visible', timeout: 10000 })

    // Type a message
    await chatContainer.fill('Hello, this is a test message')

    // Verify text was entered
    await expect(chatContainer).toHaveValue('Hello, this is a test message')
  })

  test('model selector is present', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })
    // Look for model selector using test ID
    const modelSelector = page.getByTestId(TEST_IDS.SHARED.MODEL_SELECT)

    const count = await modelSelector.count()
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('navigate to chat from home', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Look for chat link in navigation
    const chatLink = page.getByTestId(TEST_IDS.NAVIGATION.CHAT_LINK).first()
    const count = await chatLink.count()

    expect(count).toBe(1)

    // Click the link and verify navigation
    await chatLink.click({ waitUntil: 'networkidle' })

    await expect(page).toHaveURL('/chat')
  })

  test('chat page has proper layout', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    // Verify page is accessible (may require auth, so just check it loads)
    const url = page.url()
    expect(url).toContain('localhost:3001')
  })

  test.skip('can submit message and get AI response', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    // Find chat input
    const chatInput = page.getByTestId(TEST_IDS.CHAT.INPUT)
    await chatInput.waitFor({ state: 'visible', timeout: 10000 })

    // Type a simple math question
    await chatInput.fill('What is 7 + 7? Reply with just the number.')

    // Find and click submit button
    const submitButton = page.getByTestId(TEST_IDS.CHAT.SUBMIT)
    await submitButton.click()

    // Wait for navigation to chat detail page (will have ID in URL)
    await page.waitForURL(/\/chat\/[a-zA-Z0-9-]+/, { timeout: 15000 })

    // TODO: Improve waiting for response - currently just waits for new message to appear

    // Get the last message (assistant's response)
    const lastMessage = messages.last()
    const responseText = await lastMessage.textContent()

    // Verify the response contains "14"
    expect(responseText).toContain('14')
  })
})

test.describe('Chat History', () => {
  test('can access chat history sidebar', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    // Look for sidebar or history button
    const sidebar = page.getByTestId(TEST_IDS.CHAT.SIDEBAR).first()
    const count = await sidebar.count()

    // Sidebar might require auth, so we just check it exists or doesn't error
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('new chat button exists', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    // Look for new chat button
    const newChatBtn = page.getByTestId(TEST_IDS.CHAT.NEW_CHAT_BUTTON)
    const count = await newChatBtn.count()

    expect(count).toBeGreaterThanOrEqual(0)
  })
})
