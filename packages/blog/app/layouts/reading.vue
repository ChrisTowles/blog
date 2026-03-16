<script setup lang="ts">
const route = useRoute();

const navItems = [
  { label: 'Home', to: '/reading', icon: 'i-lucide-home' },
  { label: 'Dashboard', to: '/reading/dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Practice', to: '/reading/practice', icon: 'i-lucide-book-open' },
  { label: 'Words', to: '/reading/words', icon: 'i-lucide-spell-check' },
  { label: 'Demo', to: '/reading/demo', icon: 'i-lucide-play' },
  { label: 'Settings', to: '/reading/settings', icon: 'i-lucide-settings' },
];
</script>

<template>
  <div class="reading-theme">
    <header
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--reading-pink)]/30"
    >
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink
          to="/reading"
          class="flex items-center gap-2 text-[var(--reading-primary)] font-bold text-xl"
          style="font-family: var(--reading-font-display)"
        >
          <UIcon name="i-lucide-book-heart" class="text-2xl" />
          <span>Reading App</span>
        </NuxtLink>

        <nav class="flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-3 py-2 rounded-full text-sm font-semibold transition-colors"
            :class="
              route.path === item.to
                ? 'bg-[var(--reading-primary)] text-white'
                : 'text-[var(--reading-text)] hover:bg-[var(--reading-primary)]/10'
            "
          >
            <UIcon :name="item.icon" class="mr-1" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="text-center py-6 text-sm text-[var(--reading-text)]/50">
      <NuxtLink to="/" class="hover:text-[var(--reading-primary)]">Back to Blog</NuxtLink>
    </footer>
  </div>
</template>
