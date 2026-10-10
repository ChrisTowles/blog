import { z } from 'zod';
import type { SpellingList } from '../../../../../blog/shared/typing-types';

const spellingSourceSchema = z.enum(['paste', 'type', 'image']);

export function toSpellingList(
  row: Omit<SpellingList, 'source' | 'createdAt' | 'updatedAt'> & {
    source: string;
    createdAt: Date;
    updatedAt: Date;
  },
): SpellingList {
  return {
    id: row.id,
    learnerId: row.learnerId,
    weekOf: row.weekOf,
    words: row.words,
    source: spellingSourceSchema.parse(row.source),
    sourceImageUrl: row.sourceImageUrl,
    createdBy: row.createdBy,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
