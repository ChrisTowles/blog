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

    <template #right>
      <!-- <UDashboardSearchButton :kbds="['alt', 'O']" /> -->
      <UColorModeButton v-if="!loggedIn" />
      <UserMenu v-if="loggedIn" :collapsed="false" />
      <UButton
        v-if="loggedIn"
        label="Login"
        color="neutral"
        variant="ghost"
        @click="openInPopup('/auth/github')"
      />

      <!-- <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="/signup"
      /> -->
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />
      <!--
      <UButton
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        to="/signup"
        block
      /> -->
    </template>
  </UHeader>
</template>
