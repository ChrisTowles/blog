<script setup lang="ts">
/**
 * AlbumVideos — every I Can't Clap video as a poster card, then a big link to the album page.
 *
 * Usage in MDC markdown:
 *
 *   ::album-videos
 *   ::
 *
 * Imports public/i-cant-clap/videos.json, which `bun catalog` in ai-songs writes, so new videos show up without editing posts.
 */

import videos from '../../public/i-cant-clap/videos.json';
</script>

<template>
  <div class="not-prose my-8">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <a
        v-for="v in videos"
        :key="v.slug"
        :href="v.href"
        target="_blank"
        class="group block overflow-hidden rounded-lg border border-default bg-elevated transition hover:border-primary"
      >
        <img
          :src="v.poster"
          :alt="`A frame from the ${v.title} video`"
          loading="lazy"
          class="aspect-video w-full object-cover"
        />
        <div class="p-3">
          <div class="font-semibold text-highlighted group-hover:text-primary">{{ v.title }}</div>
          <div class="text-sm text-muted">{{ v.genre }} · {{ v.length }}</div>
        </div>
      </a>
    </div>
    <UButton
      to="/i-cant-clap"
      target="_blank"
      size="xl"
      block
      trailing-icon="i-lucide-arrow-right"
      class="mt-6"
    >
      Watch every video on the album, new ones included
    </UButton>
  </div>
</template>
