<script setup lang="ts">
const route = useRoute()


const title = "Chris Towles\'s Blog"

const items = computed(() => [{
  label: 'Blog',
  to: '/blog',
  icon: 'i-heroicons-device-phone-mobile',
  active: route.path.startsWith('/blog')
},
{
  label: 'Apps',
  to: '/app',
  active: route.path.startsWith('/app')
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        {{ title }}
      </NuxtLink>
      <TemplateMenu />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
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
