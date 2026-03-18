<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { StoryPreview } from '~~/shared/reading-types';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const route = useRoute();
const router = useRouter();
const childId = computed(() => Number(route.params.id));

const initialStep = (['input', 'previews', 'generating'] as const).includes(
  route.query.step as 'input' | 'previews' | 'generating',
)
  ? (route.query.step as 'input' | 'previews' | 'generating')
  : 'input';
const genre = ref('');
const who = ref('');
const idea = ref('');
const step = ref<'input' | 'previews' | 'generating'>(initialStep);

watch(step, (val) => {
  router.replace({ query: { ...route.query, step: val === 'input' ? undefined : val } });
});
const previews = ref<StoryPreview[]>([]);
const loadingPreviews = ref(false);
const generating = ref(false);

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

async function handleSubmit() {
  const hasInput = genre.value || who.value || idea.value;

  if (!hasInput) {
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
      step.value = 'previews';
    } finally {
      loadingPreviews.value = false;
    }
    return;
  }

  await generateWithOptions();
}

async function generateStory(body: Record<string, unknown>) {
  step.value = 'generating';
  generating.value = true;
  startLoadingMessages();
  try {
    await $fetch('/api/reading/stories/generate', {
      method: 'POST',
      body: { childId: childId.value, ...body },
    });
    router.push(`/reading/child/${childId.value}`);
  } finally {
    generating.value = false;
    stopLoadingMessages();
  }
}

function generateFromPreview(preview: StoryPreview) {
  return generateStory({ selectedPreview: preview });
}

function generateWithOptions() {
  return generateStory({
    genre: genre.value || undefined,
    who: who.value || undefined,
    idea: idea.value || undefined,
  });
}
</script>

<template>
  <div class="max-w-lg mx-auto px-4 pb-8 pt-8">
    <!-- Back button -->
    <UButton
      :to="`/reading/child/${childId}`"
      icon="i-heroicons-arrow-left"
      variant="ghost"
      class="!rounded-full !text-[var(--reading-primary)] !font-bold mb-6"
    >
      Story Library
    </UButton>

    <!-- Step 1: Input -->
    <template v-if="step === 'input'">
      <div class="reading-float-in">
        <h1
          class="text-3xl md:text-4xl font-extrabold text-[var(--reading-text)] mb-2"
          style="font-family: var(--reading-font-display)"
        >
          &#x2728; Create a Story
        </h1>
        <p class="text-base text-[var(--reading-text)]/50 mb-8">
          Fill in as much or as little as you like!
        </p>

        <!-- Genre picker -->
        <div class="mb-6">
          <label
            class="block text-sm font-bold text-[var(--reading-text)]/70 mb-3"
            style="font-family: var(--reading-font-display)"
          >
            Pick a genre (optional)
          </label>
          <div :data-testid="TEST_IDS.READING.STORY_WIZARD_GENRE" class="grid grid-cols-4 gap-2">
            <button
              v-for="g in GENRES"
              :key="g.value"
              class="flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all active:scale-95 cursor-pointer"
              :class="
                genre === g.value
                  ? 'border-[var(--reading-primary)] bg-[var(--reading-primary)]/10 scale-105'
                  : 'border-[var(--reading-primary)]/10 bg-[var(--reading-bg)]'
              "
              @click="genre = genre === g.value ? '' : g.value"
            >
              <span class="text-2xl">{{ g.emoji }}</span>
              <span
                class="text-xs font-bold text-[var(--reading-text)]/70"
                style="font-family: var(--reading-font-display)"
              >
                {{ g.label }}
              </span>
            </button>
          </div>
        </div>

        <!-- Who input -->
        <div class="mb-6">
          <label
            class="block text-sm font-bold text-[var(--reading-text)]/70 mb-2"
            style="font-family: var(--reading-font-display)"
          >
            Main character (optional)
          </label>
          <input
            v-model="who"
            :data-testid="TEST_IDS.READING.STORY_WIZARD_WHO"
            type="text"
            placeholder="e.g. a brave cat named Whiskers"
            class="w-full px-5 py-3 rounded-2xl border-2 border-[var(--reading-primary)]/15 bg-[var(--reading-bg)] text-[var(--reading-text)] text-base font-semibold focus:outline-none focus:border-[var(--reading-primary)] focus:ring-2 focus:ring-[var(--reading-primary)]/20 transition-all"
            style="font-family: var(--reading-font-body)"
          />
        </div>

        <!-- Idea input -->
        <div class="mb-8">
          <label
            class="block text-sm font-bold text-[var(--reading-text)]/70 mb-2"
            style="font-family: var(--reading-font-display)"
          >
            Your story idea (optional)
          </label>
          <textarea
            v-model="idea"
            :data-testid="TEST_IDS.READING.STORY_WIZARD_IDEA"
            rows="3"
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
            class="w-full py-4 rounded-2xl text-white text-lg font-bold bg-[var(--reading-primary)] active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-[var(--reading-primary)]/20"
            style="font-family: var(--reading-font-display)"
            @click="handleSubmit"
          >
            <template v-if="loadingPreviews"> Generating ideas... </template>
            <template v-else-if="genre || who || idea"> &#x2728; Generate Story </template>
            <template v-else> &#x2728; Show Me Ideas </template>
          </button>

          <button
            v-if="!genre && !who && !idea"
            :data-testid="TEST_IDS.READING.STORY_WIZARD_SURPRISE"
            :disabled="generating"
            class="w-full py-4 rounded-2xl text-[var(--reading-primary)] text-lg font-bold border-2 border-[var(--reading-primary)] active:scale-95 transition-all disabled:opacity-50"
            style="font-family: var(--reading-font-display)"
            @click="generateWithOptions"
          >
            &#x1F3B2; Surprise Me!
          </button>
        </div>
      </div>
    </template>

    <!-- Step 2: Preview selection -->
    <template v-if="step === 'previews'">
      <div class="reading-float-in">
        <h1
          class="text-3xl font-extrabold text-[var(--reading-text)] mb-2"
          style="font-family: var(--reading-font-display)"
        >
          &#x1F4D6; Pick a Story
        </h1>
        <p class="text-base text-[var(--reading-text)]/50 mb-6">
          Choose the one that sounds most fun!
        </p>

        <div class="space-y-3 mb-6">
          <button
            v-for="(preview, i) in previews"
            :key="i"
            :data-testid="TEST_IDS.READING.STORY_PREVIEW_CARD"
            class="w-full text-left p-5 rounded-2xl border-2 border-[var(--reading-primary)]/15 bg-[var(--reading-card-bg)] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
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
          @click="step = 'input'"
        >
          &#x2190; Back
        </button>
      </div>
    </template>

    <!-- Step 3: Generating -->
    <template v-if="step === 'generating'">
      <div class="text-center py-16 reading-float-in">
        <div class="inline-block mb-6">
          <span class="text-6xl reading-bounce inline-block">&#x2728;</span>
        </div>
        <p
          class="text-2xl font-bold text-[var(--reading-text)] mb-3"
          style="font-family: var(--reading-font-display)"
        >
          {{ LOADING_MESSAGES[loadingMessageIndex] }}
        </p>
        <p class="text-base text-[var(--reading-text)]/50 mb-6">This may take a moment...</p>
        <div class="flex justify-center gap-2">
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
</template>
