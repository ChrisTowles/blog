import { eq } from 'drizzle-orm';
import { documentChunks, documents } from '../../database/schema';
import type { RagRuntime } from './runtime';
import { deleteChunkVectors } from './vectors';

/**
 * Drops a document's chunks from Vectorize first, then D1. Clearing `embeddedAt` up front means a
 * failure part-way leaves rows the next ingest re-embeds, never a vector pointing at nothing.
 */
export async function deleteChunksOf(
  { db, vectorize }: Pick<RagRuntime, 'db' | 'vectorize'>,
  documentId: string,
) {
  const rows = await db
    .select({ id: documentChunks.id })
    .from(documentChunks)
    .where(eq(documentChunks.documentId, documentId));

  await db
    .update(documentChunks)
    .set({ embeddedAt: null })
    .where(eq(documentChunks.documentId, documentId));
  await deleteChunkVectors(
    vectorize,
    rows.map((r) => r.id),
  );
  await db.delete(documentChunks).where(eq(documentChunks.documentId, documentId));
}

export async function deleteDocument(runtime: Pick<RagRuntime, 'db' | 'vectorize'>, id: string) {
  await deleteChunksOf(runtime, id);
  await runtime.db.delete(documents).where(eq(documents.id, id));
}
