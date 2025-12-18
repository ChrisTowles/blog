/**
 * Shared test IDs for E2E tests and UI components
 *
 * Usage in Vue:
 *
 * import { TEST_IDS } from '~~/shared/test-ids'
 *   <div :data-testid="TEST_IDS.CHAT.INPUT">
 *
 * Usage in Playwright:
 *   page.getByTestId(TEST_IDS.CHAT.INPUT)
 */
export const TEST_IDS = {
  CHAT: {
    INPUT: 'chat-input',
    SUBMIT: 'chat-submit',
    QUICK_ACTIONS: 'quick-actions',
    QUICK_ACTION_BUTTON: 'quick-action-button',
    MESSAGE_LIST: 'chat-messages',
    MESSAGE: 'chat-message',
    SIDEBAR: 'chat-sidebar',
    NEW_CHAT_BUTTON: 'new-chat-button',
    DELETE_CHAT_BUTTON: 'delete-chat-button',
    DELETE_ALL_BUTTON: 'delete-all-chats-button',
    STOP_BUTTON: 'stop-generation',
    RELOAD_BUTTON: 'reload-message',
    COPY_BUTTON: 'copy-message'
  },
  BLOG: {
    POST_LIST: 'blog-post-list',
    POST_LIST_SECTION: 'blog-post-list-section',
    POST_CARD: 'blog-post-card',
    POST_LINK: 'blog-post-link',
    POST_CONTENT: 'post-content',
    POST_TITLE: 'post-title',
    POST_META: 'post-metadata',
    PREV_POST: 'prev-post-link',
    NEXT_POST: 'next-post-link',
    PAGE: 'blog-page'
  },
  NAVIGATION: {
    HEADER: 'app-header',
    FOOTER: 'app-footer',
    HOME_LINK: 'nav-home',
    BLOG_LINK: 'nav-blog',
    APPS_LINK: 'nav-apps',
    CHAT_LINK: 'nav-chat',
    USER_MENU: 'user-menu',
    LOGIN_BUTTON: 'login-button',
    THEME_TOGGLE: 'theme-toggle'
  },
  SHARED: {
    MODEL_SELECT: 'model-select',
    SEARCH_BUTTON: 'search-button',
    LOADING_INDICATOR: 'loading-indicator'
  },
  LEARN: {
    WORD_SLIDER: 'learn-word-slider',
    SLIDER_TRACK: 'learn-slider-track',
    SLIDER_HANDLE: 'learn-slider-handle',
    SOUND_INDICATOR: 'learn-sound-indicator',
    WORD_DISPLAY: 'learn-word-display',
    LESSON_MAP: 'learn-lesson-map',
    LESSON_BUTTON: 'learn-lesson-button',
    PROGRESS_DOTS: 'learn-progress-dots',
    NAV_PREV: 'learn-nav-prev',
    NAV_NEXT: 'learn-nav-next',
    CLOSE_BUTTON: 'learn-close',
    TIPS_BUTTON: 'learn-tips'
  }
} as const

// Type helper to ensure test IDs are used correctly
export type TestId = typeof TEST_IDS[keyof typeof TEST_IDS][keyof typeof TEST_IDS[keyof typeof TEST_IDS]]
