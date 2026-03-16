<script setup lang="ts">
const { themes, activeThemeName, setTheme } = useReadingTheme();
</script>

<template>
  <div class="space-y-3">
    <h3
      class="text-lg font-bold text-[var(--reading-text)]"
      style="font-family: var(--reading-font-display)"
    >
      Choose a Theme
    </h3>
    <div class="flex flex-wrap gap-3">
      <button
        v-for="theme in themes"
        :key="theme.name"
        class="reading-wobble-hover flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all cursor-pointer"
        :class="
          activeThemeName === theme.name
            ? 'border-[var(--reading-primary)] shadow-md scale-105'
            : 'border-transparent hover:border-[var(--reading-primary)]/30'
        "
        :style="{ backgroundColor: theme.cardBackground }"
        @click="setTheme(theme.name)"
      >
        <span class="text-2xl">{{ theme.mascotEmoji }}</span>
        <div class="text-left">
          <p class="font-bold text-sm" :style="{ color: theme.textColor }">{{ theme.label }}</p>
          <div class="flex gap-1 mt-1">
            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: theme.primaryColor }" />
            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: theme.accentColor }" />
            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: theme.successColor }" />
            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: theme.highlightColor }" />
            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: theme.secondaryColor }" />
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
