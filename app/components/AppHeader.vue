<script setup lang="ts">
const route = useRoute()
const { loggedIn, openInPopup } = useUserSession()
const items = computed(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home',
    active: route.path === '/'
  },
  {
    label: 'Blog',
    to: '/blog',
    icon: 'i-lucide-notebook-text',
    active: route.path.startsWith('/blog')
  },
  {
    label: 'Apps',
    to: '/apps',
    icon: 'i-heroicons-device-phone-mobile',
    active: route.path.startsWith('/apps')
  },
  {
    label: 'AI Chat',
    to: '/chat',
    icon: 'i-heroicons-chat-bubble-left-right',
    active: route.path.startsWith('/apps')
  }])
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

    <template #right="{ collapsed }">
      <!-- <UDashboardSearchButton :kbds="['alt', 'O']" /> -->
      <UColorModeButton v-if="!loggedIn" />
      <UserMenu v-if="loggedIn" :collapsed="collapsed" />

      <UButton
        v-if="!loggedIn"
        :label="collapsed ? '' : 'Login with GitHub'"
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
