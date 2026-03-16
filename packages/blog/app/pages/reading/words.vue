<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const { activeChildId } = useActiveChild();
const { speakWord } = useTTS();

interface MasteredWord {
  id: number;
  front: string;
  back: string;
  cardType: string;
  stability: number;
  reps: number;
}

const { data: words, status } = useFetch<MasteredWord[]>('/api/reading/words', {
  query: { childId: activeChildId },
  default: () => [] as MasteredWord[],
  watch: [activeChildId],
});

const groupedWords = computed(() => {
  const groups: Record<string, MasteredWord[]> = {};
  for (const word of words.value) {
    const key =
      word.cardType === 'sight_word'
        ? 'Sight Words'
        : word.cardType === 'vocab'
          ? 'Vocabulary'
          : 'Phonics';
    if (!groups[key]) groups[key] = [];
    groups[key]!.push(word);
  }
  return groups;
});

function groupIcon(name: string): string {
  if (name === 'Sight Words') return '\u{1F441}\u{FE0F}';
  if (name === 'Vocabulary') return '\u{1F4D6}';
  return '\u{1F524}';
}

function groupColor(name: string): string {
  if (name === 'Sight Words') return 'var(--reading-pink)';
  if (name === 'Vocabulary') return 'var(--reading-yellow)';
  return 'var(--reading-sky-blue)';
}
</script>

<template>
  <div :data-testid="TEST_IDS.READING.WORDS_PAGE" class="space-y-8 pb-8">
    <!-- Header -->
    <div class="text-center space-y-3 reading-page-header pt-12">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        &#x1F48E; My Word Treasure
      </h1>
      <p
        class="text-xl text-[var(--reading-text)]/60 font-semibold"
        style="font-family: var(--reading-font-display)"
      >
        Every word you master is a treasure collected!
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <!-- No child prompt -->
      <div
        v-if="!activeChildId"
        :data-testid="TEST_IDS.READING.NO_CHILD_PROMPT"
        class="text-center py-20 reading-float-in"
      >
        <div
          class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--reading-primary)]/10 mb-6"
        >
          <span class="text-5xl">&#x1F44B;</span>
        </div>
        <p
          class="text-2xl text-[var(--reading-text)]/70 mb-6 font-bold"
          style="font-family: var(--reading-font-display)"
        >
          No child profile selected.
        </p>
        <UButton
          to="/reading/onboarding"
          class="!rounded-full !px-8 !py-3.5 !text-lg !font-bold !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white !shadow-lg !shadow-[var(--reading-accent)]/20"
          style="font-family: var(--reading-font-display)"
        >
          Set Up a Profile
        </UButton>
      </div>

      <div v-else class="space-y-8 reading-stagger">
        <!-- Trophy counter -->
        <div :data-testid="TEST_IDS.READING.WORD_COUNT" class="text-center reading-float-in">
          <div
            class="inline-flex items-center gap-4 rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-green)]/30 px-10 py-5 shadow-xl shadow-[var(--reading-green)]/10"
          >
            <div
              class="w-16 h-16 rounded-full bg-[var(--reading-green)]/15 flex items-center justify-center"
            >
              <span class="text-4xl">&#x1F3C6;</span>
            </div>
            <div class="text-left">
              <span
                class="block text-4xl font-extrabold text-[var(--reading-green)]"
                style="font-family: var(--reading-font-display)"
              >
                {{ words.length }}
              </span>
              <span
                class="text-base text-[var(--reading-text)]/50 font-bold"
                style="font-family: var(--reading-font-display)"
              >
                treasures collected
              </span>
            </div>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="status === 'pending'" class="text-center py-16">
          <div
            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--reading-primary)]/10 mb-4"
          >
            <span class="text-4xl reading-bounce">&#x1F48E;</span>
          </div>
          <p
            class="text-lg text-[var(--reading-text)]/50 font-bold"
            style="font-family: var(--reading-font-display)"
          >
            Opening your treasure chest...
          </p>
        </div>

        <!-- Empty state -->
        <div v-else-if="words.length === 0" class="text-center py-16 reading-float-in">
          <div
            class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--reading-highlight)]/20 mb-6"
          >
            <span class="text-5xl">&#x1F4E6;</span>
          </div>
          <p
            class="text-2xl text-[var(--reading-text)]/70 mb-3 font-bold"
            style="font-family: var(--reading-font-display)"
          >
            Your treasure chest is empty!
          </p>
          <p class="text-lg text-[var(--reading-text)]/50 mb-6">
            Practice your flashcards to start collecting word treasures.
          </p>
          <UButton
            to="/reading/practice"
            class="!rounded-full !px-8 !py-3.5 !text-lg !font-bold !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white !shadow-lg !shadow-[var(--reading-primary)]/20"
            style="font-family: var(--reading-font-display)"
          >
            &#x2728; Start Practice
          </UButton>
        </div>

        <!-- Word groups -->
        <div v-else class="space-y-10">
          <div v-for="(groupWords, groupName) in groupedWords" :key="groupName">
            <div class="reading-group-header mb-5">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                :style="{ backgroundColor: groupColor(String(groupName)) + '20' }"
              >
                {{ groupIcon(String(groupName)) }}
              </div>
              <h2
                class="text-2xl font-extrabold"
                :style="{ color: groupColor(String(groupName)) }"
                style="font-family: var(--reading-font-display)"
              >
                {{ groupName }}
              </h2>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <button
                v-for="word in groupWords"
                :key="word.id"
                :data-testid="TEST_IDS.READING.WORD_CARD"
                class="reading-treasure-card reading-wobble-hover rounded-2xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-sky-blue)]/20 p-5 shadow-sm hover:shadow-lg transition-all text-center cursor-pointer group hover:border-[var(--reading-sky-blue)]/40"
                @click="speakWord(word.front)"
              >
                <div
                  class="text-2xl md:text-3xl font-extrabold text-[var(--reading-text)] mb-2 group-hover:text-[var(--reading-primary)] transition-colors"
                  style="font-family: var(--reading-font-display)"
                >
                  {{ word.front }}
                </div>
                <div
                  class="text-sm text-[var(--reading-text)]/50 font-semibold"
                  style="font-family: var(--reading-font-display)"
                >
                  {{ word.back }}
                </div>
                <div class="mt-3">
                  <span
                    class="inline-block text-xs font-bold px-3 py-1.5 rounded-full"
                    :class="
                      word.cardType === 'sight_word'
                        ? 'bg-[var(--reading-pink)]/20 text-[var(--reading-pink)]'
                        : word.cardType === 'vocab'
                          ? 'bg-[var(--reading-yellow)]/20 text-[var(--reading-orange)]'
                          : 'bg-[var(--reading-sky-blue)]/15 text-[var(--reading-sky-blue)]'
                    "
                  >
                    {{ word.cardType === 'sight_word' ? 'sight word' : word.cardType }}
                  </span>
                </div>
                <div
                  class="text-xs text-[var(--reading-text)]/30 mt-3 font-bold group-hover:text-[var(--reading-primary)]/50 transition-colors"
                >
                  &#x1F50A; tap to hear
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
