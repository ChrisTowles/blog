<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const route = useRoute();
const { loggedIn } = useUserSession();

// Four items, on purpose. The nav used to carry ten, which needed ~1400px to
// sit on one line and forced the header to collapse at `2xl` instead of the
// theme's `lg`. Every route that came out of here is now a card in the
// experiment grid on the home page (see app/utils/experiments.ts), so the
// default breakpoints work again and there is no `:ui` override to maintain.
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
    label: 'Search',
    to: '/search',
    icon: 'i-heroicons-magnifying-glass',
    active: route.path.startsWith('/search'),
    'data-testid': TEST_IDS.NAVIGATION.SEARCH_LINK,
  },
  {
    label: 'About',
    to: '/about',
    icon: 'i-lucide-user',
    active: route.path === '/about',
    'data-testid': TEST_IDS.NAVIGATION.ABOUT_LINK,
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
