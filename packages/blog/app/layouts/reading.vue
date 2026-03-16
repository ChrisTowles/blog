<script setup lang="ts">
const route = useRoute();
const { isActive: bedtimeActive, initBedtimeMode } = useBedtimeMode();

onMounted(() => {
  initBedtimeMode();
});

const navItems = [
  { label: 'Home', to: '/reading', icon: 'i-lucide-home', exact: true },
  { label: 'Dashboard', to: '/reading/dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Practice', to: '/reading/practice', icon: 'i-lucide-book-open' },
  { label: 'Words', to: '/reading/words', icon: 'i-lucide-spell-check' },
  { label: 'Bedtime', to: '/reading/bedtime', icon: 'i-lucide-moon' },
  { label: 'Demo', to: '/reading/demo', icon: 'i-lucide-play' },
  { label: 'Settings', to: '/reading/settings', icon: 'i-lucide-settings' },
];

function isNavActive(item: (typeof navItems)[number]): boolean {
  if (item.exact) return route.path === item.to;
  return route.path === item.to || route.path.startsWith(item.to + '/');
}
</script>

<template>
  <div class="reading-theme" :class="{ 'bedtime-active': bedtimeActive }">
    <header
      class="sticky top-0 z-50 bg-[var(--reading-card-bg)]/80 backdrop-blur-md border-b border-[var(--reading-secondary)]/30"
    >
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink
          to="/reading"
          class="flex items-center gap-2 text-[var(--reading-primary)] font-bold text-xl shrink-0"
          style="font-family: var(--reading-font-display)"
        >
          <UIcon name="i-lucide-book-heart" class="text-2xl" />
          <span class="hidden sm:inline">Reading App</span>
        </NuxtLink>

        <nav class="flex items-center gap-1 overflow-x-auto">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :title="item.label"
            :aria-label="item.label"
            class="px-3 py-2 rounded-full text-base font-semibold transition-colors whitespace-nowrap"
            :class="
              isNavActive(item)
                ? 'bg-[var(--reading-primary)] text-white'
                : 'text-[var(--reading-text)] hover:bg-[var(--reading-primary)]/10'
            "
          >
            <UIcon :name="item.icon" class="mr-1" />
            <span class="hidden md:inline">{{ item.label }}</span>
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
