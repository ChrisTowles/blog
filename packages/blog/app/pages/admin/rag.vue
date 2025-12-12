<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

interface IngestResult {
  documentsProcessed: number
  documentsSkipped: number
  chunksCreated: number
  errors: string[]
}

const toast = useToast()
const loading = ref(false)
const result = ref<IngestResult | null>(null)

async function runIngestion() {
  loading.value = true
  result.value = null

  try {
    const data = await $fetch<IngestResult>('/api/admin/rag/ingest', {
      method: 'POST'
    })
    result.value = data
    toast.add({
      title: 'Ingestion Complete',
      description: `Processed ${data.documentsProcessed} docs, created ${data.chunksCreated} chunks`,
      icon: 'i-heroicons-check-circle',
      color: 'success'
    })
  } catch (error) {
    console.error('Ingestion error:', error)
    toast.add({
      title: 'Ingestion Failed',
      description: error instanceof Error ? error.message : 'Unknown error',
      icon: 'i-heroicons-x-circle',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="py-8">
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="flex items-center gap-3">
        <UIcon name="i-heroicons-cog-6-tooth" class="w-8 h-8 text-primary" />
        <h1 class="text-2xl font-bold">
          RAG Admin
        </h1>
      </div>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-semibold">
                Content Ingestion
              </h2>
              <p class="text-sm text-muted">
                Index blog posts for RAG search
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-sm">
            This will scan all published blog posts, generate contextual embeddings using Claude + Bedrock,
            and store them in the vector database for semantic search.
          </p>

          <div class="flex items-center gap-2 text-sm text-muted">
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4" />
            <span>Unchanged documents are automatically skipped (incremental updates).</span>
          </div>

          <UButton
            :loading="loading"
            :disabled="loading"
            icon="i-heroicons-arrow-path"
            size="lg"
            @click="runIngestion"
          >
            {{ loading ? 'Ingesting...' : 'Run Ingestion' }}
          </UButton>
        </div>

        <template v-if="result" #footer>
          <div class="space-y-3">
            <h3 class="font-medium">
              Results
            </h3>

            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-3 bg-muted rounded-lg">
                <div class="text-2xl font-bold text-primary">
                  {{ result.documentsProcessed }}
                </div>
                <div class="text-xs text-muted">
                  Processed
                </div>
              </div>
              <div class="text-center p-3 bg-muted rounded-lg">
                <div class="text-2xl font-bold text-gray-500">
                  {{ result.documentsSkipped }}
                </div>
                <div class="text-xs text-muted">
                  Skipped
                </div>
              </div>
              <div class="text-center p-3 bg-muted rounded-lg">
                <div class="text-2xl font-bold text-success">
                  {{ result.chunksCreated }}
                </div>
                <div class="text-xs text-muted">
                  Chunks
                </div>
              </div>
            </div>

            <div v-if="result.errors.length > 0" class="mt-4">
              <h4 class="text-sm font-medium text-error mb-2">
                Errors ({{ result.errors.length }})
              </h4>
              <ul class="text-xs space-y-1 text-error">
                <li v-for="(error, idx) in result.errors" :key="idx" class="truncate">
                  {{ error }}
                </li>
              </ul>
            </div>
          </div>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="font-semibold">
            How it works
          </h2>
        </template>

        <ol class="text-sm space-y-2 list-decimal list-inside">
          <li>Scans <code class="text-xs bg-muted px-1 rounded">content/2.blog/*.md</code> files</li>
          <li>Splits content into ~500 token chunks with overlap</li>
          <li>Generates contextual descriptions using Claude Haiku</li>
          <li>Creates embeddings via Amazon Titan Text v2</li>
          <li>Stores in PostgreSQL with pgvector for semantic search</li>
          <li>BM25 full-text search index created automatically</li>
        </ol>
      </UCard>
    </div>
  </UContainer>
</template>
