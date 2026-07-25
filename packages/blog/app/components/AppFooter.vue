<script setup lang="ts">
const appConfig = useAppConfig() as {
  author: { github: string; twitter: string; bluesky: string };
};

const columns = [
  {
    label: 'Social',
    children: [
      {
        label: 'GitHub',
        to: appConfig.author.github,
      },
      {
        label: 'X / Twitter',
        to: appConfig.author.twitter,
      },
      {
        label: 'Bluesky',
        to: appConfig.author.bluesky,
      },
    ],
  },
];
</script>

<template>
  <USeparator icon="i-simple-icons-nuxtdotjs" class="h-px" />
  <UFooter :ui="{ top: 'border-b border-[var(--ui-border)]' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns" />
      </UContainer>
    </template>

    <template #left>
      <p class="text-(--ui-text-muted) text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        :to="`${appConfig.author.github}/blog`"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
