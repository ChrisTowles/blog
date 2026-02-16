<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

interface SearchResult {
  title: string;
  url: string;
  slug: string;
  score: number;
  snippet: string;
  context: string;
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalMs: number;
}

const route = useRoute();
const router = useRouter();

const searchInput = ref((route.query.q as string) || '');
const searchQuery = ref((route.query.q as string) || '');
const searching = ref(false);
const searchResponse = ref<SearchResponse | null>(null);
const searchError = ref<string | null>(null);
const hasSearched = ref(false);
const inputRef = ref<{ input: HTMLInputElement } | null>(null);

useSeoMeta({
  title: searchQuery.value ? `Search: ${searchQuery.value}` : 'Search',
  ogTitle: 'Search',
  description: 'Search blog posts using AI-powered semantic search',
  ogDescription: 'Search blog posts using AI-powered semantic search',
});

async function runSearch() {
  const q = searchInput.value.trim();
  if (!q) return;

  searchQuery.value = q;
  searching.value = true;
  searchError.value = null;
  hasSearched.value = true;

  // Update URL without navigation
  router.replace({ query: { q } });

  try {
    searchResponse.value = await $fetch<SearchResponse>('/api/search', {
      method: 'POST',
      body: { query: q, topK: 10 },
    });
  } catch (err) {
    searchError.value = err instanceof Error ? err.message : 'Search failed. Please try again.';
    searchResponse.value = null;
  } finally {
    searching.value = false;
  }
}

// Run search on mount if query param exists
onMounted(() => {
  if (searchInput.value) {
    runSearch();
  }

  // Focus the search input
  nextTick(() => {
    inputRef.value?.input?.focus();
  });
});

function scoreLabel(score: number): string {
  if (score >= 0.8) return 'Excellent match';
  if (score >= 0.5) return 'Strong match';
  if (score >= 0.2) return 'Good match';
  return 'Related';
}

function scoreColor(score: number): 'success' | 'info' | 'warning' | 'neutral' {
  if (score >= 0.8) return 'success';
  if (score >= 0.5) return 'info';
  if (score >= 0.2) return 'warning';
  return 'neutral';
}
</script>

<template>
  <UContainer :data-testid="TEST_IDS.SEARCH.PAGE">
    <UPageHeader
      title="Search"
      description="AI-powered semantic search across all blog posts"
      class="py-[50px]"
    />

    <UPageBody>
      <div class="max-w-3xl mx-auto space-y-8">
        <!-- Search Input -->
        <form :data-testid="TEST_IDS.SEARCH.FORM" @submit.prevent="runSearch">
          <div class="flex gap-3">
            <UInput
              ref="inputRef"
              v-model="searchInput"
              :data-testid="TEST_IDS.SEARCH.INPUT"
              placeholder="Search for topics, concepts, or questions..."
              icon="i-heroicons-magnifying-glass"
              size="xl"
              autofocus
              class="flex-1"
              @keyup.enter="runSearch"
            />
            <UButton
              :data-testid="TEST_IDS.SEARCH.SUBMIT"
              type="submit"
              size="xl"
              :loading="searching"
              :disabled="!searchInput.trim()"
            >
              Search
            </UButton>
          </div>
          <p class="text-sm text-(--ui-text-muted) mt-2">
            Uses hybrid semantic + keyword search with AI reranking for the most relevant results.
          </p>
        </form>

        <!-- Loading State -->
        <div v-if="searching" class="space-y-4">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="h-6 bg-(--ui-bg-elevated) rounded w-2/3 mb-2" />
            <div class="h-4 bg-(--ui-bg-elevated) rounded w-full mb-1" />
            <div class="h-4 bg-(--ui-bg-elevated) rounded w-5/6" />
          </div>
        </div>

        <!-- Error State -->
        <UCard v-else-if="searchError" color="error">
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-(--ui-error)" />
            <div>
              <p class="font-medium">Search failed</p>
              <p class="text-sm text-(--ui-text-muted)">{{ searchError }}</p>
            </div>
          </div>
        </UCard>

        <!-- Results -->
        <div v-else-if="searchResponse" :data-testid="TEST_IDS.SEARCH.RESULTS" class="space-y-6">
          <!-- Results Header -->
          <div class="flex items-center justify-between">
            <p class="text-sm text-(--ui-text-muted)">
              <span v-if="searchResponse.results.length > 0">
                Found <strong>{{ searchResponse.results.length }}</strong>
                {{ searchResponse.results.length === 1 ? 'result' : 'results' }}
                for "<strong>{{ searchResponse.query }}</strong
                >"
              </span>
              <span v-else>
                No results found for "<strong>{{ searchResponse.query }}</strong
                >"
              </span>
            </p>
            <UBadge v-if="searchResponse.totalMs" variant="subtle" color="neutral" size="xs">
              {{ searchResponse.totalMs }}ms
            </UBadge>
          </div>

          <!-- No Results -->
          <div v-if="searchResponse.results.length === 0" class="text-center py-12">
            <UIcon
              name="i-heroicons-magnifying-glass"
              class="w-12 h-12 text-(--ui-text-dimmed) mx-auto mb-4"
            />
            <h3 class="text-lg font-medium mb-2">No results found</h3>
            <p class="text-(--ui-text-muted) max-w-md mx-auto">
              Try different keywords or rephrase your query. Semantic search understands concepts,
              so try describing what you're looking for in natural language.
            </p>
          </div>

          <!-- Result Cards -->
          <div
            v-for="(result, index) in searchResponse.results"
            :key="result.slug"
            :data-testid="TEST_IDS.SEARCH.RESULT_CARD"
          >
            <NuxtLink :to="result.url" class="block group">
              <UCard
                :ui="{
                  root: 'hover:ring-(--ui-primary) transition-all duration-200',
                }"
              >
                <div class="space-y-3">
                  <!-- Title Row -->
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="text-sm font-mono text-(--ui-text-dimmed) shrink-0">
                        {{ index + 1 }}.
                      </span>
                      <h3
                        class="text-lg font-semibold group-hover:text-(--ui-primary) transition-colors truncate"
                      >
                        {{ result.title }}
                      </h3>
                    </div>
                    <UBadge
                      :color="scoreColor(result.score)"
                      variant="subtle"
                      size="xs"
                      class="shrink-0"
                    >
                      {{ scoreLabel(result.score) }}
                    </UBadge>
                  </div>

                  <!-- URL -->
                  <p class="text-xs text-(--ui-primary) font-mono">
                    {{ result.url }}
                  </p>

                  <!-- Context (AI-generated summary of this chunk's relevance) -->
                  <p
                    v-if="result.context"
                    class="text-sm text-(--ui-text-muted) italic border-l-2 border-(--ui-border) pl-3"
                  >
                    {{ result.context }}
                  </p>

                  <!-- Snippet -->
                  <p class="text-sm text-(--ui-text-muted) line-clamp-3">
                    {{ result.snippet }}
                  </p>
                </div>
              </UCard>
            </NuxtLink>
          </div>
        </div>

        <!-- Initial State (no search yet) -->
        <div v-else-if="!hasSearched" class="text-center py-12">
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="w-16 h-16 text-(--ui-text-dimmed) mx-auto mb-4"
          />
          <h3 class="text-lg font-medium mb-2">Search the blog</h3>
          <p class="text-(--ui-text-muted) max-w-md mx-auto mb-6">
            Ask a question or search for a topic. This search uses vector embeddings and AI
            reranking to find the most semantically relevant content.
          </p>

          <!-- Example searches -->
          <div class="flex flex-wrap justify-center gap-2">
            <UButton
              v-for="example in [
                'How to use Claude Code effectively',
                'Nuxt deployment tips',
                'AI tools for developers',
                'TypeScript best practices',
              ]"
              :key="example"
              variant="soft"
              color="neutral"
              size="sm"
              @click="
                searchInput = example;
                runSearch();
              "
            >
              {{ example }}
            </UButton>
          </div>
        </div>
      </div>
    </UPageBody>
  </UContainer>
</template>
