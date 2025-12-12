import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'

// Singleton Bedrock client
let _bedrockClient: BedrockRuntimeClient | null = null

export function getBedrockClient(): BedrockRuntimeClient {
  if (!_bedrockClient) {
    const config = useRuntimeConfig()
    _bedrockClient = new BedrockRuntimeClient({
      region: config.awsRegion as string || 'us-east-1'
    })
  }
  return _bedrockClient
}

// Amazon Titan Text Embeddings v2 - 1024 dimensions
const TITAN_EMBED_MODEL_ID = 'amazon.titan-embed-text-v2:0'

export interface EmbeddingResult {
  embedding: number[]
  inputTextTokenCount: number
}

/**
 * Generate embeddings using Amazon Titan Text v2
 * Supports batching for efficiency
 */
export async function embedTexts(texts: string[]): Promise<EmbeddingResult[]> {
  const client = getBedrockClient()
  const results: EmbeddingResult[] = []

  // Titan processes one text at a time, so we batch sequentially
  // Could parallelize with Promise.all if needed
  for (const text of texts) {
    const command = new InvokeModelCommand({
      modelId: TITAN_EMBED_MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        inputText: text,
        dimensions: 1024, // Titan v2 supports 256, 512, 1024
        normalize: true // L2 normalization for cosine similarity
      })
    })

    const response = await client.send(command)
    const responseBody = JSON.parse(new TextDecoder().decode(response.body))

    results.push({
      embedding: responseBody.embedding,
      inputTextTokenCount: responseBody.inputTextTokenCount
    })
  }

  return results
}

/**
 * Generate a single embedding
 */
export async function embedText(text: string): Promise<number[]> {
  const results = await embedTexts([text])
  if (!results[0]) {
    throw new Error('Failed to generate embedding')
  }
  return results[0].embedding
}

// Cohere Rerank v3 on Bedrock
const COHERE_RERANK_MODEL_ID = 'cohere.rerank-v3-5:0'

export interface RerankResult {
  index: number
  relevanceScore: number
}

/**
 * Rerank documents using Cohere Rerank v3
 */
export async function rerankDocuments(
  query: string,
  documents: string[],
  topN: number = 5
): Promise<RerankResult[]> {
  const client = getBedrockClient()

  const command = new InvokeModelCommand({
    modelId: COHERE_RERANK_MODEL_ID,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      query,
      documents,
      top_n: topN,
      return_documents: false // We just need scores and indices
    })
  })

  const response = await client.send(command)
  const responseBody = JSON.parse(new TextDecoder().decode(response.body))

  return responseBody.results.map((r: { index: number, relevance_score: number }) => ({
    index: r.index,
    relevanceScore: r.relevance_score
  }))
}
