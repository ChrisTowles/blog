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
    COPY_BUTTON: 'copy-message',
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
    PAGE: 'blog-page',
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
    THEME_TOGGLE: 'theme-toggle',
  },
  SEARCH: {
    PAGE: 'search-page',
    FORM: 'search-form',
    INPUT: 'search-input',
    SUBMIT: 'search-submit',
    RESULTS: 'search-results',
    RESULT_CARD: 'search-result-card',
  },
  LOAN: {
    PAGE: 'loan-page',
    START_BUTTON: 'loan-start-button',
    CHAT_INPUT: 'loan-chat-input',
    CHAT_MESSAGES: 'loan-chat-messages',
    SUBMIT_REVIEW_BUTTON: 'loan-submit-review',
    PROGRESS: 'loan-progress',
    PROGRESS_BAR: 'loan-progress-bar',
    REVIEW_CARD: 'loan-review-card',
    REVIEW_DECISION: 'loan-review-decision',
    OVERALL_RESULT: 'loan-overall-result',
  },
  ADMIN: {
    GITHUB_DASHBOARD: 'admin-github-dashboard',
    GITHUB_SUMMARY_CARDS: 'admin-github-summary-cards',
    GITHUB_CHARTS: 'admin-github-charts',
    GITHUB_ISSUES_TABLE: 'admin-github-issues-table',
  },
  SHARED: {
    MODEL_SELECT: 'model-select',
    SEARCH_BUTTON: 'search-button',
    LOADING_INDICATOR: 'loading-indicator',
  },
} as const;

// Type helper to ensure test IDs are used correctly
export type TestId =
  (typeof TEST_IDS)[keyof typeof TEST_IDS][keyof (typeof TEST_IDS)[keyof typeof TEST_IDS]];
