/**
 * Auto-ingest RAG documents on server startup if database is empty.
 * This ensures the searchBlogContent tool has content to work with.
 */
import { ingestBlogPosts } from '../utils/rag/ingest'

export default defineNitroPlugin(async () => {
    // Only run in development mode to avoid production cold start delays
    if (process.env.NODE_ENV !== 'development') {
        console.log('[RAG Auto-Ingest] Skipping in production mode')
        return
    }

    try {
        const db = useDrizzle()

        // Check if any documents exist
        const existingDocs = await db.query.documents.findMany({
            limit: 1
        })

        if (existingDocs.length === 0) {
            console.log('[RAG Auto-Ingest] No documents found, starting ingestion...')
            const result = await ingestBlogPosts()
            console.log(`[RAG Auto-Ingest] Complete: ${result.documentsProcessed} docs, ${result.chunksCreated} chunks`)

            if (result.errors.length > 0) {
                console.warn('[RAG Auto-Ingest] Errors:', result.errors)
            }
        }
        else {
            console.log(`[RAG Auto-Ingest] Found ${existingDocs.length}+ documents, skipping ingestion`)
        }
    }
    catch (error) {
        // Don't fail server startup on RAG errors
        console.error('[RAG Auto-Ingest] Error during startup ingestion:', error)
    }
})
