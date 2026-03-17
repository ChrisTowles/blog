<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { StoryPreview } from '~~/shared/reading-types';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const route = useRoute();
const childId = computed(() => Number(route.params.id));

const filterTheme = ref('all');
const showFavoritesOnly = ref(false);
const generating = ref(false);

// Wizard state
const showWizard = ref(false);
const wizardGenre = ref('');
const wizardWho = ref('');
const wizardIdea = ref('');
const wizardStep = ref<'input' | 'previews' | 'generating'>('input');
const previews = ref<StoryPreview[]>([]);
const loadingPreviews = ref(false);

const GENRES = [
  { value: 'adventure', label: 'Adventure', emoji: '\u{1F3D4}\uFE0F' },
  { value: 'animals', label: 'Animals', emoji: '\u{1F43E}' },
  { value: 'fantasy', label: 'Fantasy', emoji: '\u{1F9DA}' },
  { value: 'school', label: 'School', emoji: '\u{1F3EB}' },
  { value: 'space', label: 'Space', emoji: '\u{1F680}' },
  { value: 'nature', label: 'Nature', emoji: '\u{1F33F}' },
  { value: 'friendship', label: 'Friendship', emoji: '\u{1F91D}' },
  { value: 'mystery', label: 'Mystery', emoji: '\u{1F50D}' },
];

const LOADING_MESSAGES = [
  'Thinking up a story...',
  'Adding magic words...',
  'Building the world...',
  'Drawing the characters...',
  'Making it just right...',
];

const loadingMessageIndex = ref(0);
let loadingInterval: ReturnType<typeof setInterval> | null = null;

function startLoadingMessages() {
  loadingMessageIndex.value = 0;
  loadingInterval = setInterval(() => {
    loadingMessageIndex.value = (loadingMessageIndex.value + 1) % LOADING_MESSAGES.length;
  }, 2500);
}

function stopLoadingMessages() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
}

onUnmounted(() => stopLoadingMessages());

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

function openWizard() {
  wizardGenre.value = '';
  wizardWho.value = '';
  wizardIdea.value = '';
  wizardStep.value = 'input';
  previews.value = [];
  showWizard.value = true;
}

function closeWizard() {
  showWizard.value = false;
  stopLoadingMessages();
}

async function handleWizardSubmit() {
  const hasInput = wizardGenre.value || wizardWho.value || wizardIdea.value;

  if (!hasInput) {
    // No input -- get previews first
    loadingPreviews.value = true;
    try {
      const result = await $fetch<{ previews: StoryPreview[] }>('/api/reading/stories/generate', {
        method: 'POST',
        body: {
          childId: childId.value,
          previewMode: true,
        },
      });
      previews.value = result.previews;
      wizardStep.value = 'previews';
    } finally {
      loadingPreviews.value = false;
    }
    return;
  }

  // Has input -- generate directly
  await generateWithOptions();
}

async function generateFromPreview(preview: StoryPreview) {
  wizardStep.value = 'generating';
  generating.value = true;
  startLoadingMessages();
  try {
    await $fetch('/api/reading/stories/generate', {
      method: 'POST',
      body: {
        childId: childId.value,
        selectedPreview: preview,
      },
    });
    await refresh();
    closeWizard();
  } finally {
    generating.value = false;
    stopLoadingMessages();
  }
}

async function generateWithOptions() {
  wizardStep.value = 'generating';
  generating.value = true;
  startLoadingMessages();
  try {
    await $fetch('/api/reading/stories/generate', {
      method: 'POST',
      body: {
        childId: childId.value,
        genre: wizardGenre.value || undefined,
        who: wizardWho.value || undefined,
        idea: wizardIdea.value || undefined,
      },
    });
    await refresh();
    closeWizard();
  } finally {
    generating.value = false;
    stopLoadingMessages();
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
            : 'border-[var(--reading-accent)]/30 text-[var(--reading-accent)]'
        "
        style="font-family: var(--reading-font-display)"
        @click="showFavoritesOnly = !showFavoritesOnly"
      >
        {{ showFavoritesOnly ? '&#x2764;&#xFE0F; Favorites' : '&#x1F90D; Favorites' }}
      </button>

      <!-- Generate button (opens wizard) -->
      <UButton
        :data-testid="TEST_IDS.READING.STORY_GENERATE_BUTTON"
        icon="i-heroicons-sparkles"
        class="!rounded-full !px-6 !py-2.5 !font-bold !bg-[var(--reading-primary)] !text-white !text-base !shadow-md !shadow-[var(--reading-primary)]/20 active:!scale-95"
        style="font-family: var(--reading-font-display)"
        @click="openWizard"
      >
        New Story
      </UButton>
    </div>

    <!-- Story Wizard Modal -->
    <Teleport to="body">
      <Transition name="reading-flip">
        <div
          v-if="showWizard"
          :data-testid="TEST_IDS.READING.STORY_WIZARD"
          class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeWizard" />

          <!-- Wizard panel -->
          <div
            class="relative w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/20 shadow-2xl p-6 sm:p-8"
          >
            <!-- Close button -->
            <button
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--reading-bg)] flex items-center justify-center text-lg text-[var(--reading-text)]/60 active:scale-90 transition-transform"
              @click="closeWizard"
            >
              &#x2715;
            </button>

            <!-- Step 1: Input -->
            <template v-if="wizardStep === 'input'">
              <h2
                class="text-2xl md:text-3xl font-extrabold text-[var(--reading-text)] mb-6"
                style="font-family: var(--reading-font-display)"
              >
                &#x2728; Create a Story
              </h2>

              <!-- Genre picker -->
              <div class="mb-5">
                <label
                  class="block text-sm font-bold text-[var(--reading-text)]/70 mb-2"
                  style="font-family: var(--reading-font-display)"
                >
                  Pick a genre (optional)
                </label>
                <div
                  :data-testid="TEST_IDS.READING.STORY_WIZARD_GENRE"
                  class="grid grid-cols-4 gap-2"
                >
                  <button
                    v-for="genre in GENRES"
                    :key="genre.value"
                    class="flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all active:scale-95 cursor-pointer"
                    :class="
                      wizardGenre === genre.value
                        ? 'border-[var(--reading-primary)] bg-[var(--reading-primary)]/10 scale-105'
                        : 'border-[var(--reading-primary)]/10 bg-[var(--reading-bg)]'
                    "
                    @click="wizardGenre = wizardGenre === genre.value ? '' : genre.value"
                  >
                    <span class="text-2xl">{{ genre.emoji }}</span>
                    <span
                      class="text-xs font-bold text-[var(--reading-text)]/70"
                      style="font-family: var(--reading-font-display)"
                    >
                      {{ genre.label }}
                    </span>
                  </button>
                </div>
              </div>

              <!-- Who input -->
              <div class="mb-5">
                <label
                  class="block text-sm font-bold text-[var(--reading-text)]/70 mb-2"
                  style="font-family: var(--reading-font-display)"
                >
                  Main character (optional)
                </label>
                <input
                  v-model="wizardWho"
                  :data-testid="TEST_IDS.READING.STORY_WIZARD_WHO"
                  type="text"
                  placeholder="e.g. a brave cat named Whiskers"
                  class="w-full px-5 py-3 rounded-2xl border-2 border-[var(--reading-primary)]/15 bg-[var(--reading-bg)] text-[var(--reading-text)] text-base font-semibold focus:outline-none focus:border-[var(--reading-primary)] focus:ring-2 focus:ring-[var(--reading-primary)]/20 transition-all"
                  style="font-family: var(--reading-font-body)"
                />
              </div>

              <!-- Idea input -->
              <div class="mb-6">
                <label
                  class="block text-sm font-bold text-[var(--reading-text)]/70 mb-2"
                  style="font-family: var(--reading-font-display)"
                >
                  Your story idea (optional)
                </label>
                <textarea
                  v-model="wizardIdea"
                  :data-testid="TEST_IDS.READING.STORY_WIZARD_IDEA"
                  rows="2"
                  placeholder="e.g. The cat finds a hidden treasure map..."
                  class="w-full px-5 py-3 rounded-2xl border-2 border-[var(--reading-primary)]/15 bg-[var(--reading-bg)] text-[var(--reading-text)] text-base font-semibold focus:outline-none focus:border-[var(--reading-primary)] focus:ring-2 focus:ring-[var(--reading-primary)]/20 transition-all resize-none"
                  style="font-family: var(--reading-font-body)"
                />
              </div>

              <!-- Action buttons -->
              <div class="flex flex-col gap-3">
                <button
                  :data-testid="TEST_IDS.READING.STORY_WIZARD_SUBMIT"
                  :disabled="loadingPreviews"
                  class="w-full py-4 rounded-2xl text-white text-lg font-bold bg-[var(--reading-primary)] active:scale-95 transition-all disabled:opacity-50"
                  style="font-family: var(--reading-font-display)"
                  @click="handleWizardSubmit"
                >
                  <template v-if="loadingPreviews"> Generating ideas... </template>
                  <template v-else-if="wizardGenre || wizardWho || wizardIdea">
                    &#x2728; Generate Story
                  </template>
                  <template v-else> &#x2728; Show Me Ideas </template>
                </button>

                <button
                  v-if="!wizardGenre && !wizardWho && !wizardIdea"
                  :data-testid="TEST_IDS.READING.STORY_WIZARD_SURPRISE"
                  :disabled="generating"
                  class="w-full py-4 rounded-2xl text-[var(--reading-primary)] text-lg font-bold border-2 border-[var(--reading-primary)] active:scale-95 transition-all disabled:opacity-50"
                  style="font-family: var(--reading-font-display)"
                  @click="generateWithOptions"
                >
                  &#x1F3B2; Surprise Me!
                </button>
              </div>
            </template>

            <!-- Step 2: Preview selection -->
            <template v-if="wizardStep === 'previews'">
              <h2
                class="text-2xl font-extrabold text-[var(--reading-text)] mb-2"
                style="font-family: var(--reading-font-display)"
              >
                &#x1F4D6; Pick a Story
              </h2>
              <p class="text-sm text-[var(--reading-text)]/50 mb-5">
                Choose the one that sounds most fun!
              </p>

              <div class="space-y-3 mb-5">
                <button
                  v-for="(preview, i) in previews"
                  :key="i"
                  :data-testid="TEST_IDS.READING.STORY_PREVIEW_CARD"
                  class="w-full text-left p-4 rounded-2xl border-2 border-[var(--reading-primary)]/15 bg-[var(--reading-bg)] active:scale-[0.98] transition-all cursor-pointer"
                  @click="generateFromPreview(preview)"
                >
                  <h3
                    class="text-lg font-bold text-[var(--reading-text)] mb-1"
                    style="font-family: var(--reading-font-display)"
                  >
                    {{ preview.title }}
                  </h3>
                  <p class="text-sm text-[var(--reading-text)]/60">
                    {{ preview.summary }}
                  </p>
                </button>
              </div>

              <button
                class="w-full py-3 rounded-2xl text-[var(--reading-text)]/60 text-base font-bold border-2 border-[var(--reading-primary)]/15 active:scale-95 transition-all"
                @click="wizardStep = 'input'"
              >
                &#x2190; Back
              </button>
            </template>

            <!-- Step 3: Generating -->
            <template v-if="wizardStep === 'generating'">
              <div class="text-center py-8">
                <div class="inline-block mb-6">
                  <span class="text-6xl reading-bounce inline-block">&#x2728;</span>
                </div>
                <p
                  class="text-2xl font-bold text-[var(--reading-text)] mb-3"
                  style="font-family: var(--reading-font-display)"
                >
                  {{ LOADING_MESSAGES[loadingMessageIndex] }}
                </p>
                <div class="flex justify-center gap-2 mt-4">
                  <span
                    v-for="n in 3"
                    :key="n"
                    class="w-3 h-3 rounded-full bg-[var(--reading-primary)] animate-pulse"
                    :style="{ animationDelay: `${n * 200}ms` }"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>

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
                class="h-44 bg-cover bg-center transition-transform duration-500"
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
                class="text-xl font-extrabold text-[var(--reading-text)] line-clamp-2 transition-colors"
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
                class="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all active:scale-90"
                :class="
                  story.favorited
                    ? 'bg-[var(--reading-secondary)]/20 reading-pop'
                    : 'bg-[var(--reading-bg)]'
                "
                :title="story.favorited ? 'Remove from favorites' : 'Add to favorites'"
                @click="toggleFavorite(story.id)"
              >
                {{ story.favorited ? '&#x2764;&#xFE0F;' : '&#x1F90D;' }}
              </button>

              <NuxtLink
                :to="`/reading/stories/${story.id}`"
                class="rounded-full px-6 py-2.5 text-base font-bold bg-[var(--reading-primary)] text-white transition-all shadow-md shadow-[var(--reading-primary)]/15 active:scale-95"
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
