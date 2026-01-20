<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

interface Stats {
  documents: { indexed: number; onDisk: number; pendingIndex: number };
  chunks: { total: number; withEmbeddings: number; avgPerDocument: number };
  storage: { totalKB: string; contentKB: string; contextKB: string };
  lastIndexed: { title: string; date: string } | null;
  embeddingDimensions: number;
  vectorIndex: string;
  textIndex: string;
}

interface Document {
  id: string;
  slug: string;
  title: string;
  url: string;
  contentHash: string;
  createdAt: string;
  chunkCount: number;
  embeddedChunks: number;
  isFullyEmbedded: boolean;
}

interface IngestResult {
  documentsProcessed: number;
  documentsSkipped: number;
  chunksCreated: number;
  errors: string[];
}

interface SearchResult {
  query: string;
  results: Array<{
    rank: number;
    title: string;
    url: string;
    score: number;
    content: string;
    contextualContent: string;
  }>;
  pipeline: {
    semanticResults: Array<{ rank: number; title: string; distance: string; preview: string }>;
    bm25Results: Array<{ rank: number; title: string; score: string; preview: string }>;
  };
  timings: Record<string, string>;
}

const toast = useToast();
const activeTab = ref('overview');

// Stats
const {
  data: stats,
  refresh: refreshStats,
  status: statsStatus,
} = await useFetch<Stats>('/api/admin/rag/stats');

// Documents
const { data: documentsData, refresh: refreshDocuments } = await useFetch<{
  documents: Document[];
  total: number;
}>('/api/admin/rag/documents');

// Ingestion
const ingesting = ref(false);
const ingestResult = ref<IngestResult | null>(null);

async function runIngestion() {
  ingesting.value = true;
  ingestResult.value = null;
  try {
    const result = await $fetch<IngestResult>('/api/admin/rag/ingest', { method: 'POST' });
    ingestResult.value = result;
    toast.add({
      title: 'Ingestion Complete',
      description: `${result.documentsProcessed} docs processed, ${result.chunksCreated} chunks created`,
      icon: 'i-heroicons-check-circle',
      color: 'success',
    });
    refreshStats();
    refreshDocuments();
  } catch (error) {
    toast.add({
      title: 'Ingestion Failed',
      description: error instanceof Error ? error.message : 'Unknown error',
      icon: 'i-heroicons-x-circle',
      color: 'error',
    });
  } finally {
    ingesting.value = false;
  }
}

// Search Test
const searchQuery = ref('');
const searching = ref(false);
const searchResult = ref<SearchResult | null>(null);
const skipRerank = ref(false);

async function runSearch() {
  if (!searchQuery.value.trim()) return;
  searching.value = true;
  searchResult.value = null;
  try {
    const result = await $fetch<SearchResult>('/api/admin/rag/search-test', {
      method: 'POST',
      body: { query: searchQuery.value, topK: 5, skipRerank: skipRerank.value },
    });
    searchResult.value = result;
  } catch (error) {
    toast.add({
      title: 'Search Failed',
      description: error instanceof Error ? error.message : 'Unknown error',
      icon: 'i-heroicons-x-circle',
      color: 'error',
    });
  } finally {
    searching.value = false;
  }
}

// Document Actions
const selectedDoc = ref<string | null>(null);
const docDetails = ref<{
  document: Document;
  chunks: Array<{
    id: string;
    index: number;
    content: string;
    contentPreview: string;
    contextualContent: string;
    hasEmbedding: boolean;
  }>;
  summary: {
    totalChunks: number;
    totalContentLength: number;
    totalContextLength: number;
    allEmbedded: boolean;
  };
} | null>(null);
const loadingDoc = ref(false);

async function viewDocument(id: string) {
  selectedDoc.value = id;
  loadingDoc.value = true;
  try {
    docDetails.value = await $fetch(`/api/admin/rag/documents/${id}`);
  } catch {
    toast.add({ title: 'Failed to load document', color: 'error' });
  } finally {
    loadingDoc.value = false;
  }
}

async function deleteDocument(id: string) {
  if (!confirm('Delete this document from the index?')) return;
  try {
    await $fetch(`/api/admin/rag/documents/${id}`, { method: 'DELETE' });
    toast.add({ title: 'Document deleted', color: 'success' });
    refreshDocuments();
    refreshStats();
    if (selectedDoc.value === id) {
      selectedDoc.value = null;
      docDetails.value = null;
    }
  } catch {
    toast.add({ title: 'Delete failed', color: 'error' });
  }
}

async function reindexDocument(id: string) {
  try {
    await $fetch(`/api/admin/rag/documents/${id}/reindex`, { method: 'POST' });
    toast.add({ title: 'Document re-indexed', color: 'success' });
    refreshDocuments();
    if (selectedDoc.value === id) viewDocument(id);
  } catch {
    toast.add({ title: 'Re-index failed', color: 'error' });
  }
}

function closeDocDetails() {
  selectedDoc.value = null;
  docDetails.value = null;
}

const tabs = [
  { label: 'Overview', value: 'overview', icon: 'i-heroicons-chart-bar' },
  { label: 'Documents', value: 'documents', icon: 'i-heroicons-document-text' },
  { label: 'Search Test', value: 'search', icon: 'i-heroicons-magnifying-glass' },
  { label: 'Ingest', value: 'ingest', icon: 'i-heroicons-arrow-path' },
];
</script>

<template>
  <UContainer class="py-8">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-cpu-chip" class="w-8 h-8 text-primary" />
          <div>
            <h1 class="text-2xl font-bold">RAG Admin</h1>
            <p class="text-sm text-muted">Contextual Hybrid Search System</p>
          </div>
        </div>
        <UButton
          icon="i-heroicons-arrow-path"
          variant="ghost"
          :loading="statsStatus === 'pending'"
          @click="
            refreshStats();
            refreshDocuments();
          "
        />
      </div>

      <!-- Tabs -->
      <UTabs v-model="activeTab" :items="tabs" />

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
        <!-- Stats Grid -->
        <div v-if="stats" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">
                {{ stats.documents.indexed }}
              </div>
              <div class="text-sm text-muted">Documents Indexed</div>
              <div v-if="stats.documents.pendingIndex > 0" class="text-xs text-warning mt-1">
                {{ stats.documents.pendingIndex }} pending
              </div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-success">
                {{ stats.chunks.total }}
              </div>
              <div class="text-sm text-muted">Total Chunks</div>
              <div class="text-xs text-muted mt-1">{{ stats.chunks.avgPerDocument }} avg/doc</div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold">
                {{ stats.chunks.withEmbeddings }}
              </div>
              <div class="text-sm text-muted">Embeddings</div>
              <div class="text-xs text-muted mt-1">{{ stats.embeddingDimensions }} dimensions</div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold">
                {{ stats.storage.totalKB }}
              </div>
              <div class="text-sm text-muted">KB Stored</div>
              <div class="text-xs text-muted mt-1">content + context</div>
            </div>
          </UCard>
        </div>

        <!-- System Info -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">System Configuration</h3>
          </template>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div class="text-muted">Vector Index</div>
              <div class="font-mono">
                {{ stats?.vectorIndex }}
              </div>
            </div>
            <div>
              <div class="text-muted">Text Index</div>
              <div class="font-mono">
                {{ stats?.textIndex }}
              </div>
            </div>
            <div>
              <div class="text-muted">Embedding Model</div>
              <div class="font-mono">Titan Text v2</div>
            </div>
            <div>
              <div class="text-muted">Reranker</div>
              <div class="font-mono">Cohere v3</div>
            </div>
            <div>
              <div class="text-muted">Hybrid Weights</div>
              <div class="font-mono">Semantic: 0.7, BM25: 0.3</div>
            </div>
            <div v-if="stats?.lastIndexed">
              <div class="text-muted">Last Indexed</div>
              <div class="font-mono truncate">
                {{ stats.lastIndexed.title }}
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Documents Tab -->
      <div v-if="activeTab === 'documents'" class="space-y-4">
        <div class="flex gap-4">
          <!-- Document List -->
          <UCard class="flex-1">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">Indexed Documents ({{ documentsData?.total || 0 }})</h3>
              </div>
            </template>
            <div class="space-y-2 max-h-[600px] overflow-y-auto">
              <div
                v-for="doc in documentsData?.documents"
                :key="doc.id"
                class="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                :class="{ 'ring-2 ring-primary': selectedDoc === doc.id }"
                @click="viewDocument(doc.id)"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium truncate">
                      {{ doc.title }}
                    </div>
                    <div class="text-xs text-muted truncate">
                      {{ doc.url }}
                    </div>
                  </div>
                  <div class="flex items-center gap-2 ml-2">
                    <UBadge :color="doc.isFullyEmbedded ? 'success' : 'warning'" size="xs">
                      {{ doc.chunkCount }} chunks
                    </UBadge>
                  </div>
                </div>
                <div class="flex items-center gap-4 mt-2 text-xs text-muted">
                  <span>Hash: {{ doc.contentHash }}</span>
                </div>
              </div>
              <div v-if="!documentsData?.documents?.length" class="text-center py-8 text-muted">
                No documents indexed yet. Run ingestion to get started.
              </div>
            </div>
          </UCard>

          <!-- Document Details -->
          <UCard v-if="selectedDoc" class="w-1/2">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">Document Details</h3>
                <div class="flex gap-2">
                  <UButton
                    size="xs"
                    variant="ghost"
                    icon="i-heroicons-arrow-path"
                    @click="reindexDocument(selectedDoc!)"
                  />
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="error"
                    icon="i-heroicons-trash"
                    @click="deleteDocument(selectedDoc!)"
                  />
                  <UButton
                    size="xs"
                    variant="ghost"
                    icon="i-heroicons-x-mark"
                    @click="closeDocDetails"
                  />
                </div>
              </div>
            </template>
            <div v-if="loadingDoc" class="flex justify-center py-8">
              <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin" />
            </div>
            <div v-else-if="docDetails" class="space-y-4">
              <div>
                <div class="font-medium">
                  {{ docDetails.document.title }}
                </div>
                <a :href="docDetails.document.url" class="text-sm text-primary hover:underline">{{
                  docDetails.document.url
                }}</a>
              </div>
              <div class="grid grid-cols-3 gap-2 text-sm">
                <div class="text-center p-2 bg-muted rounded">
                  <div class="font-bold">
                    {{ docDetails.summary.totalChunks }}
                  </div>
                  <div class="text-xs text-muted">Chunks</div>
                </div>
                <div class="text-center p-2 bg-muted rounded">
                  <div class="font-bold">
                    {{ (docDetails.summary.totalContentLength / 1024).toFixed(1) }}KB
                  </div>
                  <div class="text-xs text-muted">Content</div>
                </div>
                <div class="text-center p-2 bg-muted rounded">
                  <div class="font-bold">
                    {{ (docDetails.summary.totalContextLength / 1024).toFixed(1) }}KB
                  </div>
                  <div class="text-xs text-muted">Context</div>
                </div>
              </div>
              <div class="border-t pt-4">
                <h4 class="font-medium mb-2">Chunks</h4>
                <div class="space-y-2 max-h-[300px] overflow-y-auto">
                  <div
                    v-for="chunk in docDetails.chunks"
                    :key="chunk.id"
                    class="p-2 bg-muted/50 rounded text-xs"
                  >
                    <div class="flex justify-between mb-1">
                      <span class="font-medium">Chunk {{ chunk.index + 1 }}</span>
                      <UBadge :color="chunk.hasEmbedding ? 'success' : 'error'" size="xs">
                        {{ chunk.hasEmbedding ? 'Embedded' : 'No embedding' }}
                      </UBadge>
                    </div>
                    <div class="text-muted mb-1">
                      {{ chunk.contentPreview }}
                    </div>
                    <div class="text-primary italic">
                      Context: {{ chunk.contextualContent.slice(0, 100) }}...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Search Test Tab -->
      <div v-if="activeTab === 'search'" class="space-y-4">
        <UCard>
          <template #header>
            <h3 class="font-semibold">Search Playground</h3>
          </template>
          <div class="space-y-4">
            <div class="flex gap-2">
              <UInput
                v-model="searchQuery"
                placeholder="Enter a search query..."
                class="flex-1"
                @keyup.enter="runSearch"
              />
              <UCheckbox v-model="skipRerank" label="Skip Rerank" />
              <UButton :loading="searching" @click="runSearch"> Search </UButton>
            </div>

            <div v-if="searchResult" class="space-y-4">
              <!-- Timings -->
              <div class="flex gap-4 text-sm">
                <span
                  v-for="(time, key) in searchResult.timings"
                  :key="key"
                  class="px-2 py-1 bg-muted rounded"
                >
                  {{ key }}: <span class="font-mono">{{ time }}</span>
                </span>
              </div>

              <!-- Results -->
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Final Results -->
                <div>
                  <h4 class="font-medium mb-2">Final Results (after rerank)</h4>
                  <div class="space-y-2">
                    <div v-for="r in searchResult.results" :key="r.rank" class="p-3 border rounded">
                      <div class="flex justify-between">
                        <span class="font-medium">#{{ r.rank }} {{ r.title }}</span>
                        <UBadge size="xs">
                          {{ r.score.toFixed(3) }}
                        </UBadge>
                      </div>
                      <a :href="r.url" class="text-xs text-primary">{{ r.url }}</a>
                      <p class="text-xs text-muted mt-1 line-clamp-2">
                        {{ r.content.slice(0, 150) }}...
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Pipeline Debug -->
                <div class="space-y-4">
                  <div>
                    <h4 class="font-medium mb-2">Semantic Search (top 5)</h4>
                    <div class="space-y-1 text-xs">
                      <div
                        v-for="r in searchResult.pipeline.semanticResults.slice(0, 5)"
                        :key="r.rank"
                        class="flex justify-between p-2 bg-muted/50 rounded"
                      >
                        <span class="truncate flex-1">{{ r.title }}</span>
                        <span class="font-mono ml-2">{{ r.distance }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 class="font-medium mb-2">BM25 Search (top 5)</h4>
                    <div class="space-y-1 text-xs">
                      <div
                        v-for="r in searchResult.pipeline.bm25Results.slice(0, 5)"
                        :key="r.rank"
                        class="flex justify-between p-2 bg-muted/50 rounded"
                      >
                        <span class="truncate flex-1">{{ r.title }}</span>
                        <span class="font-mono ml-2">{{ r.score }}</span>
                      </div>
                      <div v-if="!searchResult.pipeline.bm25Results.length" class="text-muted p-2">
                        No BM25 matches (query terms not found)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Ingest Tab -->
      <div v-if="activeTab === 'ingest'" class="space-y-4">
        <UCard>
          <template #header>
            <h3 class="font-semibold">Content Ingestion</h3>
          </template>
          <div class="space-y-4">
            <p class="text-sm">
              Scan blog posts, generate contextual embeddings, and store in the vector database.
              Documents with unchanged content (same hash) are automatically skipped.
            </p>

            <div class="flex items-center gap-2 text-sm bg-muted/50 p-3 rounded">
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-primary" />
              <span>
                <strong>{{ stats?.documents.onDisk || 0 }}</strong> files on disk,
                <strong>{{ stats?.documents.indexed || 0 }}</strong> indexed,
                <strong class="text-warning">{{ stats?.documents.pendingIndex || 0 }}</strong>
                pending
              </span>
            </div>

            <UButton
              :loading="ingesting"
              :disabled="ingesting"
              icon="i-heroicons-arrow-path"
              size="lg"
              @click="runIngestion"
            >
              {{ ingesting ? 'Ingesting...' : 'Run Full Ingestion' }}
            </UButton>

            <div v-if="ingestResult" class="mt-4 p-4 bg-muted/50 rounded space-y-2">
              <h4 class="font-medium">Results</h4>
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-primary">
                    {{ ingestResult.documentsProcessed }}
                  </div>
                  <div class="text-xs text-muted">Processed</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-500">
                    {{ ingestResult.documentsSkipped }}
                  </div>
                  <div class="text-xs text-muted">Skipped (unchanged)</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-success">
                    {{ ingestResult.chunksCreated }}
                  </div>
                  <div class="text-xs text-muted">Chunks Created</div>
                </div>
              </div>
              <div v-if="ingestResult.errors.length" class="mt-2 text-xs text-error">
                <div v-for="(err, i) in ingestResult.errors" :key="i">
                  {{ err }}
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">Pipeline Details</h3>
          </template>
          <ol class="text-sm space-y-2 list-decimal list-inside">
            <li>Scan <code class="text-xs bg-muted px-1 rounded">content/2.blog/*.md</code></li>
            <li>Compute SHA-256 hash → skip unchanged files</li>
            <li>Split into ~500 token chunks with 100 token overlap</li>
            <li>Generate contextual descriptions (Claude Haiku + prompt caching)</li>
            <li>Create embeddings (Amazon Titan Text v2, 1024 dims)</li>
            <li>Store in PostgreSQL + pgvector with HNSW index</li>
            <li>Auto-generate tsvector for BM25 full-text search</li>
          </ol>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
