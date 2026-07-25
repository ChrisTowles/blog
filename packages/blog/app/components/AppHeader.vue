<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const route = useRoute();
const { loggedIn } = useUserSession();

// The nav carries 10 top-level items, which need ~1400px to sit on one line.
// Nuxt UI collapses to the mobile menu at `lg` (1024px), so between 1024 and
// that width the desktop nav overflowed and clipped the Sign in button. Move
// the switch to `2xl` (1536px): below it the existing #body menu lists every
// item vertically, so nothing is lost.
//
// Two constraints forced `2xl` specifically. These classes are *merged* with
// the theme defaults rather than replacing them, so each must restate the
// `lg:` variant to override it. And the override must use a named breakpoint —
// an arbitrary `min-[1400px]:` variant sorts before the named ones in the
// generated CSS, so `lg:hidden` would win at wide viewports and hide the nav
// entirely (verified: it did).
const headerUi = {
  left: 'flex items-center gap-1.5 lg:flex-none 2xl:flex-1',
  center: 'hidden lg:hidden 2xl:flex',
  right: 'flex items-center justify-end gap-1.5 lg:flex-none 2xl:flex-1',
  toggle: 'block lg:block 2xl:hidden',
  content: 'block lg:block 2xl:hidden',
  overlay: 'block lg:block 2xl:hidden',
};
const items = computed(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home',
    active: route.path === '/',
    'data-testid': TEST_IDS.NAVIGATION.HOME_LINK,
  },
  {
    label: 'Blog',
    to: '/blog',
    icon: 'i-lucide-notebook-text',
    active: route.path.startsWith('/blog'),
    'data-testid': TEST_IDS.NAVIGATION.BLOG_LINK,
  },
  {
    label: 'About',
    to: '/about',
    icon: 'i-lucide-user',
    active: route.path === '/about',
    'data-testid': TEST_IDS.NAVIGATION.ABOUT_LINK,
  },
  {
    label: 'Apps',
    to: '/apps',
    icon: 'i-lucide-layout-grid',
    active: route.path.startsWith('/apps'),
    'data-testid': TEST_IDS.NAVIGATION.APPS_LINK,
  },
  {
    label: 'Workflows',
    to: '/workflows',
    icon: 'i-lucide-workflow',
    active: route.path.startsWith('/workflows'),
    'data-testid': TEST_IDS.NAVIGATION.WORKFLOWS_LINK,
  },
  {
    label: 'Search',
    to: '/search',
    icon: 'i-heroicons-magnifying-glass',
    active: route.path.startsWith('/search'),
    'data-testid': TEST_IDS.SEARCH.PAGE,
  },
  {
    label: 'Typing',
    to: '/typing',
    icon: 'i-lucide-keyboard',
    active: route.path.startsWith('/typing'),
    'data-testid': TEST_IDS.NAVIGATION.TYPING_LINK,
  },
  {
    label: 'AI Chat',
    to: '/chat',
    icon: 'i-heroicons-chat-bubble-left-right',
    active: route.path.startsWith('/chat'),
    'data-testid': TEST_IDS.NAVIGATION.CHAT_LINK,
  },
  {
    label: 'Aviation MCP',
    to: '/aviation',
    icon: 'i-heroicons-paper-airplane',
    active: route.path.startsWith('/aviation'),
    'data-testid': TEST_IDS.NAVIGATION.AVIATION_LINK,
  },
  {
    label: 'Poker',
    to: '/poker',
    icon: 'i-lucide-spade',
    active: route.path.startsWith('/poker'),
    'data-testid': TEST_IDS.NAVIGATION.POKER_LINK,
  },
  ...(loggedIn.value
    ? [
        {
          label: 'Admin',
          to: '/admin',
          icon: 'i-heroicons-cog-6-tooth',
          active: route.path.startsWith('/admin'),
        },
      ]
    : []),
]);
</script>

<template>
  <UHeader :ui="headerUi">
    <template #left>
      <LogoAndHeader />
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right="slotProps">
      <!-- <UDashboardSearchButton :kbds="['alt', 'O']" /> -->
      <UColorModeButton v-if="!loggedIn" />
      <UserMenu
        v-if="loggedIn"
        :collapsed="(slotProps as Record<string, unknown>)?.collapsed as boolean | undefined"
      />

      <UButton
        v-if="!loggedIn"
        :label="(slotProps as Record<string, unknown>)?.collapsed ? '' : 'Sign in'"
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
