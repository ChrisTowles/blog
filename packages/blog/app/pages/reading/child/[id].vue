<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const route = useRoute();
const childId = computed(() => Number(route.params.id));

const filterTheme = ref('all');
const showFavoritesOnly = ref(false);
const generating = ref(false);

const { data: stories, refresh } = await useFetch<
  {
    id: number;
    title: string;
    theme: string;
    decodabilityScore: number;
    favorited: boolean;
    illustrationUrls: string[];
    createdAt: string;
  }[]
>('/api/reading/stories', {
  query: { childId },
});

const themes = computed(() => {
  const set = new Set((stories.value ?? []).map((s) => s.theme).filter(Boolean));
  return ['all', ...Array.from(set).sort()];
});

const filteredStories = computed(() => {
  let list = stories.value ?? [];
  if (showFavoritesOnly.value) {
    list = list.filter((s) => s.favorited);
  }
  if (filterTheme.value !== 'all') {
    list = list.filter((s) => s.theme === filterTheme.value);
  }
  return list;
});

async function toggleFavorite(storyId: number) {
  await $fetch(`/api/reading/stories/${storyId}/favorite`, { method: 'PUT' });
  await refresh();
}

async function generateNewStory() {
  generating.value = true;
  try {
    await $fetch('/api/reading/stories/generate', {
      method: 'POST',
      body: { childId: childId.value },
    });
    await refresh();
  } finally {
    generating.value = false;
  }
}

function decodabilityLabel(score: number) {
  if (score >= 0.8) return 'High';
  if (score >= 0.5) return 'Medium';
  return 'Low';
}

function decodabilityColor(score: number) {
  if (score >= 0.8) return 'var(--reading-green)';
  if (score >= 0.5) return 'var(--reading-yellow)';
  return 'var(--reading-orange)';
}
</script>

<template>
  <div :data-testid="TEST_IDS.READING.STORY_LIBRARY" class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-3">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        Story Library
      </h1>
      <p class="text-xl text-[var(--reading-text)]/70">
        Pick a story to read or generate a new one!
      </p>
    </div>

    <!-- Toolbar -->
    <div class="max-w-5xl mx-auto flex flex-wrap items-center gap-4">
      <UButton
        to="/reading/dashboard"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)] !font-bold"
      >
        Dashboard
      </UButton>

      <div class="flex-1" />

      <!-- Theme filter -->
      <select
        v-model="filterTheme"
        :data-testid="TEST_IDS.READING.STORY_FILTER_THEME"
        class="rounded-full px-4 py-2 border-2 border-[var(--reading-primary)]/20 bg-[var(--reading-card-bg)] text-[var(--reading-text)] font-semibold focus:outline-none focus:border-[var(--reading-primary)]"
        style="font-family: var(--reading-font-body)"
      >
        <option v-for="t in themes" :key="t" :value="t">
          {{ t === 'all' ? 'All Themes' : t }}
        </option>
      </select>

      <!-- Favorites filter -->
      <button
        :data-testid="TEST_IDS.READING.STORY_FILTER_FAVORITES"
        class="rounded-full px-4 py-2 border-2 font-bold transition-colors"
        :class="
          showFavoritesOnly
            ? 'border-[var(--reading-accent)] bg-[var(--reading-accent)] text-white'
            : 'border-[var(--reading-accent)]/30 text-[var(--reading-accent)] hover:bg-[var(--reading-accent)]/10'
        "
        style="font-family: var(--reading-font-body)"
        @click="showFavoritesOnly = !showFavoritesOnly"
      >
        {{ showFavoritesOnly ? '❤️ Favorites' : '🤍 Favorites' }}
      </button>

      <!-- Generate button -->
      <UButton
        :data-testid="TEST_IDS.READING.STORY_GENERATE_BUTTON"
        :loading="generating"
        icon="i-heroicons-sparkles"
        class="!rounded-full !px-6 !font-bold !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white"
        @click="generateNewStory"
      >
        Generate New Story
      </UButton>
    </div>

    <!-- Story Grid -->
    <div class="max-w-5xl mx-auto">
      <div v-if="filteredStories.length === 0" class="text-center py-16 reading-float-in">
        <div class="text-5xl mb-4">📚</div>
        <p
          class="text-2xl text-[var(--reading-text)]/70 mb-4"
          style="font-family: var(--reading-font-display)"
        >
          {{ showFavoritesOnly ? 'No favorite stories yet!' : 'No stories yet!' }}
        </p>
        <p class="text-lg text-[var(--reading-text)]/50">
          {{
            showFavoritesOnly
              ? 'Tap the heart on a story to add it here.'
              : 'Generate your first story to get started.'
          }}
        </p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reading-stagger">
        <div
          v-for="story in filteredStories"
          :key="story.id"
          :data-testid="TEST_IDS.READING.STORY_CARD"
          class="reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/15 shadow-md overflow-hidden transition-shadow hover:shadow-lg"
        >
          <!-- Cover image -->
          <NuxtLink :to="`/reading/stories/${story.id}`" class="block">
            <div
              v-if="story.illustrationUrls?.length"
              class="h-40 bg-cover bg-center"
              :style="{ backgroundImage: `url(${story.illustrationUrls[0]})` }"
            />
            <div
              v-else
              class="h-40 flex items-center justify-center"
              :style="{ backgroundColor: 'var(--reading-primary)', opacity: 0.15 }"
            >
              <span class="text-6xl opacity-60">📖</span>
            </div>
          </NuxtLink>

          <div class="p-5 space-y-3">
            <!-- Title -->
            <NuxtLink :to="`/reading/stories/${story.id}`" class="block">
              <h3
                class="text-lg font-bold text-[var(--reading-text)] line-clamp-2 hover:text-[var(--reading-primary)] transition-colors"
                style="font-family: var(--reading-font-display)"
              >
                {{ story.title }}
              </h3>
            </NuxtLink>

            <!-- Badges row -->
            <div class="flex items-center gap-2 flex-wrap">
              <!-- Theme badge -->
              <span
                v-if="story.theme"
                class="inline-block rounded-full px-3 py-0.5 text-xs font-bold bg-[var(--reading-sky-blue)]/15 text-[var(--reading-sky-blue)]"
              >
                {{ story.theme }}
              </span>

              <!-- Decodability badge -->
              <span
                class="inline-block rounded-full px-3 py-0.5 text-xs font-bold"
                :style="{
                  backgroundColor: decodabilityColor(story.decodabilityScore) + '22',
                  color: decodabilityColor(story.decodabilityScore),
                }"
              >
                {{ decodabilityLabel(story.decodabilityScore) }} decodability
              </span>
            </div>

            <!-- Heart toggle -->
            <div class="flex items-center justify-between pt-1">
              <button
                :data-testid="TEST_IDS.READING.STORY_FAVORITE_TOGGLE"
                class="text-2xl transition-transform hover:scale-125 active:scale-95"
                :title="story.favorited ? 'Remove from favorites' : 'Add to favorites'"
                @click="toggleFavorite(story.id)"
              >
                {{ story.favorited ? '❤️' : '🤍' }}
              </button>

              <NuxtLink
                :to="`/reading/stories/${story.id}`"
                class="rounded-full px-4 py-1.5 text-sm font-bold bg-[var(--reading-primary)] text-white hover:bg-[var(--reading-primary)]/85 transition-colors"
              >
                Read
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
