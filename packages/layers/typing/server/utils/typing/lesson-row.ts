import { z } from 'zod';
import type { LessonKind, LessonRow } from '../../../../../blog/shared/typing-types';

const lessonKindSchema: z.ZodType<LessonKind> = z.enum([
  'drill',
  'bigram',
  'word',
  'sentence',
  'paragraph',
  'topic',
  'spelling-drill',
  'spelling-sentence',
  'accumulation',
  'consolidation',
]);

const generatedBySchema = z.enum(['system', 'ai']);

export function toLessonRow(
  row: Omit<LessonRow, 'kind' | 'generatedBy' | 'createdAt'> & {
    kind: string;
    generatedBy: string;
    createdAt: Date;
  },
): LessonRow {
  return {
    id: row.id,
    slug: row.slug,
    stage: row.stage,
    kind: lessonKindSchema.parse(row.kind),
    title: row.title,
    text: row.text,
    targetWpm: row.targetWpm,
    targetAccuracy: row.targetAccuracy,
    topic: row.topic,
    spellingListId: row.spellingListId,
    generatedBy: generatedBySchema.parse(row.generatedBy),
    createdAt: row.createdAt.toISOString(),
  };
}
