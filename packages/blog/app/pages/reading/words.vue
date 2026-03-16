<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const { activeChildId } = useActiveChild();
const { speakWord } = useTTS();

const { data: words, status } = useFetch('/api/reading/words', {
  query: { childId: activeChildId },
  default: () => [],
  watch: [activeChildId],
});

type MasteredWord = (typeof words.value)[number];

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
</script>

<template>
  <div :data-testid="TEST_IDS.READING.WORDS_PAGE" class="space-y-8">
    <div class="text-center space-y-3">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        My Word Bank
      </h1>
      <p class="text-xl text-[var(--reading-text)]/70">All the words you've mastered!</p>
    </div>

    <div class="max-w-4xl mx-auto">
      <div
        v-if="!activeChildId"
        :data-testid="TEST_IDS.READING.NO_CHILD_PROMPT"
        class="text-center py-16 reading-float-in"
      >
        <div class="text-5xl mb-4">👋</div>
        <p
          class="text-2xl text-[var(--reading-text)]/70 mb-6"
          style="font-family: var(--reading-font-display)"
        >
          No child profile selected.
        </p>
        <UButton
          to="/reading/onboarding"
          class="!rounded-full !px-8 !py-3 !text-lg !font-bold !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
        >
          Set Up a Profile
        </UButton>
      </div>

      <div v-else class="space-y-8 reading-stagger">
        <!-- Total word count -->
        <div :data-testid="TEST_IDS.READING.WORD_COUNT" class="text-center reading-float-in">
          <div
            class="inline-flex items-center gap-3 rounded-full bg-[var(--reading-card-bg)] border-2 border-[var(--reading-green)]/40 px-8 py-4 shadow-md shadow-[var(--reading-green)]/10"
          >
            <span class="text-4xl">🏆</span>
            <span
              class="text-3xl font-extrabold text-[var(--reading-green)]"
              style="font-family: var(--reading-font-display)"
            >
              {{ words.length }}
            </span>
            <span class="text-xl text-[var(--reading-text)]/70 font-semibold">
              words mastered
            </span>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="status === 'pending'" class="text-center py-12">
          <div class="text-4xl reading-bounce">📖</div>
          <p class="text-lg text-[var(--reading-text)]/50 mt-4">Loading your words...</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="words.length === 0" class="text-center py-12 reading-float-in">
          <div class="text-5xl mb-4">📚</div>
          <p
            class="text-2xl text-[var(--reading-text)]/70 mb-3"
            style="font-family: var(--reading-font-display)"
          >
            No words yet!
          </p>
          <p class="text-lg text-[var(--reading-text)]/50 mb-6">
            Practice your flashcards to start building your word bank.
          </p>
          <UButton
            to="/reading/practice"
            class="!rounded-full !px-8 !py-3 !text-lg !font-bold !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white"
          >
            Start Practice
          </UButton>
        </div>

        <!-- Word groups -->
        <div v-else class="space-y-10">
          <div v-for="(groupWords, groupName) in groupedWords" :key="groupName">
            <h2
              class="text-2xl font-bold text-[var(--reading-primary)] mb-4"
              style="font-family: var(--reading-font-display)"
            >
              {{ groupName }}
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <button
                v-for="word in groupWords"
                :key="word.id"
                :data-testid="TEST_IDS.READING.WORD_CARD"
                class="reading-wobble-hover rounded-2xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-sky-blue)]/20 p-5 shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer"
                @click="speakWord(word.front)"
              >
                <div
                  class="text-2xl md:text-3xl font-bold text-[var(--reading-text)] mb-2"
                  style="font-family: var(--reading-font-display)"
                >
                  {{ word.front }}
                </div>
                <div class="text-sm text-[var(--reading-text)]/50">
                  {{ word.back }}
                </div>
                <div class="mt-2">
                  <span
                    class="inline-block text-xs font-bold px-3 py-1 rounded-full"
                    :class="
                      word.cardType === 'sight_word'
                        ? 'bg-[var(--reading-pink)]/30 text-[var(--reading-pink)]'
                        : word.cardType === 'vocab'
                          ? 'bg-[var(--reading-yellow)]/30 text-[var(--reading-orange)]'
                          : 'bg-[var(--reading-sky-blue)]/20 text-[var(--reading-sky-blue)]'
                    "
                  >
                    {{ word.cardType === 'sight_word' ? 'sight word' : word.cardType }}
                  </span>
                </div>
                <div class="text-xs text-[var(--reading-text)]/30 mt-2">🔊 tap to hear</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
