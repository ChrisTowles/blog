<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import videos from '../../../public/i-cant-clap/videos.json';

// Catalog genres are Suno style prompts ("folk-pop stomp anthem (driving acoustic
// strum ...)"); the part before the first aside is the readable genre.
function shortGenre(genre: string) {
  return genre.split(' (')[0]!.split(', ')[0]!;
}
</script>

<template>
  <section aria-labelledby="album-title" :data-testid="TEST_IDS.HOME.ALBUM">
    <div class="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
      <h2 id="album-title" class="album-title text-highlighted lg:col-span-7">I Can't Clap</h2>
      <div class="space-y-5 lg:col-span-5 lg:pb-3">
        <p class="max-w-prose text-lg/7 text-default">
          Comedic songs about working with AI and IT, each with its own music video. Claude Code
          agents write the lyrics and code every three.js video, and Suno sings. I pick the premise,
          leave notes on lines and choose the takes.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="/i-cant-clap"
            external
            size="lg"
            icon="i-lucide-play"
            label="Watch the album"
            :data-testid="TEST_IDS.HOME.EXPERIMENT_I_CANT_CLAP"
          />
          <UButton
            to="/blog/how-i-cant-clap-gets-made"
            size="lg"
            color="neutral"
            variant="outline"
            label="How the videos get made"
          />
        </div>
      </div>
    </div>

    <ul class="mt-10 grid gap-x-6 gap-y-5 lg:grid-cols-3 lg:gap-y-8">
      <li
        v-for="(video, index) in videos"
        :key="video.slug"
        :class="index === 0 && 'lg:col-span-2 lg:row-span-2'"
      >
        <a
          :href="video.href"
          :data-testid="TEST_IDS.HOME.ALBUM_VIDEO"
          class="group grid h-full items-start gap-x-4 gap-y-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ui-primary)"
          :class="
            index === 0
              ? 'lg:grid-rows-[minmax(0,1fr)_auto]'
              : 'grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[11rem_minmax(0,1fr)] lg:grid-cols-1'
          "
        >
          <img
            :src="video.poster"
            :alt="`A frame from the ${video.title} video`"
            :loading="index < 3 ? 'eager' : 'lazy'"
            width="1280"
            height="720"
            class="aspect-video w-full rounded-sm bg-elevated object-cover ring-1 ring-default"
            :class="index === 0 && 'lg:aspect-auto lg:h-full'"
          />
          <span class="grid min-w-0 gap-1">
            <span class="flex items-center gap-2">
              <span
                class="font-semibold text-highlighted group-hover:text-primary"
                :class="index === 0 ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg/6'"
              >
                {{ video.title }}
              </span>
              <UBadge
                v-if="index === 0"
                label="Newest"
                color="primary"
                variant="subtle"
                size="sm"
                class="shrink-0"
              />
            </span>
            <span class="flex items-baseline justify-between gap-3 text-sm text-muted">
              <span class="min-w-0">{{ shortGenre(video.genre) }}</span>
              <span class="shrink-0 tabular-nums text-dimmed">{{ video.length }}</span>
            </span>
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.album-title {
  font-family: 'Anton', Impact, 'Arial Narrow', sans-serif;
  font-size: clamp(4.25rem, 15vw, 10rem);
  line-height: 0.86;
  text-transform: uppercase;
  letter-spacing: 0.005em;
}
</style>
