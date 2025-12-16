<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids'

const route = useRoute()
const { loggedIn, openInPopup } = useUserSession()
const items = computed(() => [
  {
    'label': 'Home',
    'to': '/',
    'icon': 'i-heroicons-home',
    'active': route.path === '/',
    'data-testid': TEST_IDS.NAVIGATION.HOME_LINK
  },
  {
    'label': 'Blog',
    'to': '/blog',
    'icon': 'i-lucide-notebook-text',
    'active': route.path.startsWith('/blog'),
    'data-testid': TEST_IDS.NAVIGATION.BLOG_LINK
  },
  {
    'label': 'Apps',
    'to': '/apps',
    'icon': 'i-heroicons-device-phone-mobile',
    'active': route.path.startsWith('/apps'),
    'data-testid': TEST_IDS.NAVIGATION.APPS_LINK
  },
  {
    'label': 'AI Chat',
    'to': '/chat',
    'icon': 'i-heroicons-chat-bubble-left-right',
    'active': route.path.startsWith('/chat'),
    'data-testid': TEST_IDS.NAVIGATION.CHAT_LINK
  },
  ...(loggedIn.value
    ? [{
        label: 'Admin',
        to: '/admin',
        icon: 'i-heroicons-cog-6-tooth',
        active: route.path.startsWith('/admin')
      }]
    : [])])
</script>

<template>
  <UHeader>
    <template #left>
      <LogoAndHeader />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right="slotProps">
      <!-- <UDashboardSearchButton :kbds="['alt', 'O']" /> -->
      <UColorModeButton v-if="!loggedIn" />
      <UserMenu v-if="loggedIn" :collapsed="(slotProps as any)?.collapsed" />

      <UButton
        v-if="!loggedIn"
        :label="(slotProps as any)?.collapsed ? '' : 'Login with GitHub'"
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        @click="openInPopup('/auth/github')"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
