<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();

// Force light mode in reading app — the blog uses dark mode globally,
// but the reading app has its own warm/kid-friendly theme
const previousColorMode = ref(colorMode.preference);
onMounted(() => {
  previousColorMode.value = colorMode.preference;
  colorMode.preference = 'light';
});
onUnmounted(() => {
  colorMode.preference = previousColorMode.value;
});

const navItems = [
  { label: 'Home', to: '/reading', icon: 'i-lucide-home', exact: true },
  { label: 'Dashboard', to: '/reading/dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Practice', to: '/reading/practice', icon: 'i-lucide-book-open' },
  { label: 'Words', to: '/reading/words', icon: 'i-lucide-spell-check' },
  { label: 'Demo', to: '/reading/demo', icon: 'i-lucide-play' },
  { label: 'About', to: '/reading/about', icon: 'i-lucide-info' },
  { label: 'Settings', to: '/reading/settings', icon: 'i-lucide-settings' },
];

function isNavActive(item: (typeof navItems)[number]): boolean {
  if (item.exact) return route.path === item.to;
  return route.path === item.to || route.path.startsWith(item.to + '/');
}
</script>

<template>
  <div class="reading-theme">
    <header
      class="sticky top-0 z-50 bg-[var(--reading-card-bg)]/80 backdrop-blur-md border-b border-[var(--reading-secondary)]/30"
    >
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3 shrink-0">
          <NuxtLink
            to="/"
            class="flex items-center gap-1 text-[var(--reading-text)]/50 hover:text-[var(--reading-primary)] text-sm transition-colors"
            title="Back to Blog"
          >
            <UIcon name="i-lucide-arrow-left" class="text-lg" />
            <span class="hidden sm:inline">Blog</span>
          </NuxtLink>
          <span class="text-[var(--reading-text)]/20">|</span>
          <NuxtLink
            to="/reading"
            class="flex items-center gap-2 text-[var(--reading-primary)] font-bold text-xl"
            style="font-family: var(--reading-font-display)"
          >
            <UIcon name="i-lucide-book-heart" class="text-2xl" />
            <span class="hidden sm:inline">Reading App</span>
          </NuxtLink>
        </div>

        <nav class="flex items-center gap-1 overflow-x-auto">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :title="item.label"
            :aria-label="item.label"
            class="px-3 py-2 rounded-full text-base font-semibold transition-colors whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center"
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
      <NuxtLink to="/" class="hover:text-[var(--reading-primary)]">christowles.com</NuxtLink>
    </footer>
  </div>
</template>
