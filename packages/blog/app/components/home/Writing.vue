<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { START_HERE_PATHS, PRINTABLES } from '~/utils/home-picks';

const { data } = await useAsyncData('home-writing', async () => {
  const published = () => queryCollection('posts').where('status', '<>', 'draft');

  const picked: readonly string[] = START_HERE_PATHS;

  const [newest, startHere, total] = await Promise.all([
    published()
      .select('path', 'title', 'date', 'image')
      .order('date', 'DESC')
      .limit(picked.length + 5)
      .all(),
    published()
      .select('path', 'title', 'description', 'date', 'image')
      .where('path', 'IN', [...picked])
      .all(),
    published().count(),
  ]);

  return {
    latest: newest.filter((post) => !picked.includes(post.path)).slice(0, 5),
    startHere: picked.flatMap((path) => startHere.filter((post) => post.path === path)),
    total,
  };
});

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
</script>

<template>
  <section
    v-if="data"
    aria-labelledby="writing-title"
    :data-testid="TEST_IDS.BLOG.POST_LIST_SECTION"
  >
    <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <h2 id="writing-title" class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        Writing
      </h2>
      <ULink to="/blog" class="font-medium text-primary hover:underline">
        All {{ data.total }} posts
      </ULink>
    </div>

    <div class="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-7" :data-testid="TEST_IDS.HOME.START_HERE">
        <h3 class="text-xl font-semibold text-highlighted">Building with Claude</h3>
        <p class="mt-1 text-muted">
          Written while I was working it out, including what didn't work.
        </p>
        <ul class="mt-6 space-y-7">
          <li v-for="post in data.startHere" :key="post.path">
            <NuxtLink
              :to="post.path"
              class="group flex gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ui-primary) sm:gap-5"
            >
              <NuxtImg
                :src="post.image.src"
                :alt="post.image.alt ?? ''"
                width="448"
                height="252"
                sizes="112px sm:224px"
                loading="lazy"
                class="aspect-video w-28 shrink-0 self-start rounded-sm object-cover sm:w-56"
              />
              <span class="grid content-start gap-1">
                <span class="text-lg/snug font-semibold text-highlighted group-hover:text-primary">
                  {{ post.title }}
                </span>
                <span class="line-clamp-2 hidden text-muted sm:block">{{ post.description }}</span>
                <time :datetime="post.date" class="text-sm tabular-nums text-dimmed">
                  {{ formatDate(post.date) }}
                </time>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="space-y-10 rounded-sm bg-elevated/60 p-6 sm:p-8 lg:col-span-5">
        <div>
          <h3 class="text-lg font-semibold text-highlighted">Latest</h3>
          <ol :data-testid="TEST_IDS.BLOG.POST_LIST" class="mt-4 space-y-4">
            <li v-for="post in data.latest" :key="post.path">
              <NuxtLink
                :to="post.path"
                :data-testid="TEST_IDS.BLOG.POST_LINK"
                class="group flex gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ui-primary)"
              >
                <NuxtImg
                  :src="post.image.src"
                  alt=""
                  width="160"
                  height="90"
                  sizes="80px"
                  loading="lazy"
                  class="aspect-video w-20 shrink-0 rounded-sm object-cover"
                />
                <span class="grid content-start gap-0.5">
                  <span class="font-medium leading-snug text-highlighted group-hover:text-primary">
                    {{ post.title }}
                  </span>
                  <time :datetime="post.date" class="text-sm tabular-nums text-dimmed">
                    {{ formatDate(post.date) }}
                  </time>
                </span>
              </NuxtLink>
            </li>
          </ol>
        </div>

        <div :data-testid="TEST_IDS.HOME.PRINTABLES">
          <h3 class="text-lg font-semibold text-highlighted">For my kids</h3>
          <ul class="mt-4 space-y-4">
            <li>
              <ULink
                to="https://farwonder.app"
                target="_blank"
                raw
                class="group flex gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ui-primary)"
              >
                <UIcon name="i-lucide-sparkles" class="mt-0.5 size-5 shrink-0 text-dimmed" />
                <span class="grid gap-0.5">
                  <span
                    class="flex items-center gap-1 font-medium text-highlighted group-hover:text-primary"
                  >
                    Farwonder
                    <UIcon name="i-lucide-arrow-up-right" class="size-4 text-dimmed" />
                  </span>
                  <span class="text-sm text-muted">
                    Early reading and math as short 3D games. I'm building it for them.
                  </span>
                </span>
              </ULink>
            </li>
            <li v-for="sheet in PRINTABLES" :key="sheet.path">
              <NuxtLink
                :to="sheet.path"
                class="group flex gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ui-primary)"
              >
                <UIcon name="i-lucide-printer" class="mt-0.5 size-5 shrink-0 text-dimmed" />
                <span class="grid gap-0.5">
                  <span class="font-medium text-highlighted group-hover:text-primary">
                    {{ sheet.label }} worksheets
                  </span>
                  <span class="text-sm text-muted">{{ sheet.detail }}</span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
