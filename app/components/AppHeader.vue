<script setup lang="ts">
const route = useRoute()

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
    label: 'Chat',
    to: '/chat',
    icon: 'i-heroicons-device-phone-mobile',
    active: route.path.startsWith('/apps')
  }])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex items-end gap-0.5">

        <Logo />
        <span class="text-xl font-bold text-(--ui-text-highlighted)">
          Chris Towles's
          <span style="color: var(--ui-primary)">Blog</span>
        </span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <!-- <UDashboardSearchButton :kbds="['alt', 'O']" /> -->
      <UColorModeButton />

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
