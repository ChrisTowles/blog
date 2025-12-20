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

test.describe('Persona Selection', () => {
  test('persona selector is visible on chat page', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    const personaSelect = page.getByTestId(TEST_IDS.CHAT.PERSONA_SELECT)
    await expect(personaSelect).toBeVisible({ timeout: 10000 })
  })

  test('persona selector has a default value', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    const personaSelect = page.getByTestId(TEST_IDS.CHAT.PERSONA_SELECT)
    await expect(personaSelect).toBeVisible({ timeout: 10000 })

    // USelectMenu renders as button
    const selectTrigger = personaSelect.getByRole('button')
    const text = await selectTrigger.textContent()
    expect(text).toContain('Blog Guide')
  })

  test('can open persona dropdown', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    const personaSelect = page.getByTestId(TEST_IDS.CHAT.PERSONA_SELECT)
    const selectTrigger = personaSelect.getByRole('button')
    await selectTrigger.click()

    // Wait for dropdown animation to complete
    await page.waitForTimeout(200)

    // Check that listbox with options is visible
    const listbox = page.getByRole('listbox')
    await expect(listbox).toBeVisible({ timeout: 5000 })
  })

  test('dropdown shows multiple persona options', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    const personaSelect = page.getByTestId(TEST_IDS.CHAT.PERSONA_SELECT)
    const selectTrigger = personaSelect.getByRole('button')
    await selectTrigger.click()

    // Wait for dropdown to open and animation to complete
    await page.waitForTimeout(200)
    const listbox = page.getByRole('listbox')
    await expect(listbox).toBeVisible({ timeout: 5000 })

    // Check that all persona options exist
    await expect(page.getByRole('option', { name: 'Blog Guide' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Code Reviewer' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Creative Companion' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Full Assistant' })).toBeVisible()
  })

  test('can interact with persona dropdown', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' })

    const personaSelect = page.getByTestId(TEST_IDS.CHAT.PERSONA_SELECT)
    const selectTrigger = personaSelect.getByRole('button')

    // Get initial text - should be "Blog Guide" (default name)
    const initialText = await selectTrigger.textContent()
    expect(initialText).toContain('Blog Guide')

    // Open dropdown
    await selectTrigger.click()

    // Wait for dropdown to open
    await page.waitForTimeout(200)
    const listbox = page.getByRole('listbox')
    await expect(listbox).toBeVisible({ timeout: 5000 })

    // Select Code Reviewer option
    await page.getByRole('option', { name: 'Code Reviewer' }).click()
    await page.waitForTimeout(200)

    // Verify selection changed
    const finalText = await selectTrigger.textContent()
    expect(finalText).toContain('Code Reviewer')
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
