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
  if (score >= 0.8) return 'var(--reading-success)';
  if (score >= 0.5) return 'var(--reading-highlight)';
  return 'var(--reading-accent)';
}
</script>

<template>
  <div :data-testid="TEST_IDS.READING.STORY_LIBRARY" class="space-y-8 pb-8">
    <!-- Header with decorative accent -->
    <div class="text-center space-y-3 reading-page-header pt-12">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        &#x1F4DA; Story Library
      </h1>
      <p
        class="text-xl text-[var(--reading-text)]/60 font-semibold"
        style="font-family: var(--reading-font-display)"
      >
        Pick a story to read or create a new one!
      </p>
    </div>

    <!-- Toolbar -->
    <div
      class="max-w-5xl mx-auto flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/10 shadow-sm"
    >
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
        class="rounded-full px-5 py-2.5 border-2 border-[var(--reading-primary)]/20 bg-[var(--reading-bg)] text-[var(--reading-text)] font-bold focus:outline-none focus:border-[var(--reading-primary)] focus:ring-2 focus:ring-[var(--reading-primary)]/20 text-base transition-all cursor-pointer"
        style="font-family: var(--reading-font-display)"
      >
        <option v-for="t in themes" :key="t" :value="t">
          {{ t === 'all' ? '&#x1F3A8; All Themes' : t }}
        </option>
      </select>

      <!-- Favorites filter -->
      <button
        :data-testid="TEST_IDS.READING.STORY_FILTER_FAVORITES"
        class="rounded-full px-5 py-2.5 border-2 font-bold transition-all text-base"
        :class="
          showFavoritesOnly
            ? 'border-[var(--reading-accent)] bg-[var(--reading-accent)] text-white shadow-md shadow-[var(--reading-accent)]/20 scale-105'
            : 'border-[var(--reading-accent)]/30 text-[var(--reading-accent)] hover:bg-[var(--reading-accent)]/10 hover:border-[var(--reading-accent)]/50'
        "
        style="font-family: var(--reading-font-display)"
        @click="showFavoritesOnly = !showFavoritesOnly"
      >
        {{ showFavoritesOnly ? '&#x2764;&#xFE0F; Favorites' : '&#x1F90D; Favorites' }}
      </button>

      <!-- Generate button -->
      <UButton
        :data-testid="TEST_IDS.READING.STORY_GENERATE_BUTTON"
        :loading="generating"
        icon="i-heroicons-sparkles"
        class="!rounded-full !px-6 !py-2.5 !font-bold !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white !text-base !shadow-md !shadow-[var(--reading-primary)]/20"
        style="font-family: var(--reading-font-display)"
        @click="generateNewStory"
      >
        Generate New Story
      </UButton>
    </div>

    <!-- Story Grid -->
    <div class="max-w-5xl mx-auto">
      <!-- Empty state -->
      <div v-if="filteredStories.length === 0" class="text-center py-20 reading-float-in">
        <div
          class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--reading-primary)]/10 mb-6"
        >
          <span class="text-5xl">{{ showFavoritesOnly ? '&#x1F49B;' : '&#x1F4DA;' }}</span>
        </div>
        <p
          class="text-2xl text-[var(--reading-text)]/70 mb-3 font-bold"
          style="font-family: var(--reading-font-display)"
        >
          {{ showFavoritesOnly ? 'No favorite stories yet!' : 'No stories yet!' }}
        </p>
        <p class="text-lg text-[var(--reading-text)]/50 mb-6">
          {{
            showFavoritesOnly
              ? 'Tap the heart on a story to add it here.'
              : 'Generate your first story to get started.'
          }}
        </p>
      </div>

      <!-- Story cards grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reading-stagger">
        <div
          v-for="story in filteredStories"
          :key="story.id"
          :data-testid="TEST_IDS.READING.STORY_CARD"
          class="reading-story-card reading-wobble-hover rounded-3xl border-2 border-[var(--reading-primary)]/15 overflow-hidden"
        >
          <!-- Cover image -->
          <NuxtLink :to="`/reading/stories/${story.id}`" class="block">
            <div class="relative overflow-hidden">
              <div
                v-if="story.illustrationUrls?.length"
                class="h-44 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                :style="{ backgroundImage: `url(${story.illustrationUrls[0]})` }"
              />
              <div
                v-else
                class="h-44 flex items-center justify-center bg-gradient-to-br from-[var(--reading-primary)]/15 via-[var(--reading-primary)]/10 to-[var(--reading-success)]/15"
              >
                <span class="text-7xl opacity-50">&#x1F4D6;</span>
              </div>
              <!-- Gradient overlay at bottom of image -->
              <div
                class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--reading-card-bg)] to-transparent"
              />
            </div>
          </NuxtLink>

          <div class="p-5 space-y-3">
            <!-- Title -->
            <NuxtLink :to="`/reading/stories/${story.id}`" class="block">
              <h3
                class="text-xl font-extrabold text-[var(--reading-text)] line-clamp-2 hover:text-[var(--reading-primary)] transition-colors"
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
                class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-[var(--reading-primary)]/15 text-[var(--reading-primary)]"
              >
                &#x1F3AD; {{ story.theme }}
              </span>

              <!-- Decodability badge -->
              <span
                class="inline-block rounded-full px-3 py-1 text-xs font-bold"
                :style="{
                  backgroundColor: decodabilityColor(story.decodabilityScore) + '22',
                  color: decodabilityColor(story.decodabilityScore),
                }"
              >
                {{ decodabilityLabel(story.decodabilityScore) }} decodability
              </span>
            </div>

            <!-- Heart toggle + Read button -->
            <div class="flex items-center justify-between pt-2">
              <button
                :data-testid="TEST_IDS.READING.STORY_FAVORITE_TOGGLE"
                class="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-125 active:scale-90"
                :class="
                  story.favorited
                    ? 'bg-[var(--reading-secondary)]/20 reading-pop'
                    : 'bg-[var(--reading-bg)] hover:bg-[var(--reading-secondary)]/20'
                "
                :title="story.favorited ? 'Remove from favorites' : 'Add to favorites'"
                @click="toggleFavorite(story.id)"
              >
                {{ story.favorited ? '&#x2764;&#xFE0F;' : '&#x1F90D;' }}
              </button>

              <NuxtLink
                :to="`/reading/stories/${story.id}`"
                class="rounded-full px-6 py-2.5 text-base font-bold bg-[var(--reading-primary)] text-white hover:bg-[var(--reading-primary)]/85 transition-all shadow-md shadow-[var(--reading-primary)]/15 hover:shadow-lg active:scale-95"
                style="font-family: var(--reading-font-display)"
              >
                Read &#x2192;
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
