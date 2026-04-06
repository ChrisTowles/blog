<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const route = useRoute();
const { loggedIn } = useUserSession();
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
    label: 'Reading',
    to: '/reading',
    icon: 'i-heroicons-book-open',
    active: route.path.startsWith('/reading'),
    'data-testid': TEST_IDS.NAVIGATION.READING_LINK,
  },
  {
    label: 'AI Chat',
    to: '/chat',
    icon: 'i-heroicons-chat-bubble-left-right',
    active: route.path.startsWith('/chat'),
    'data-testid': TEST_IDS.NAVIGATION.CHAT_LINK,
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
  <UHeader>
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
