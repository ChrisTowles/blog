/**
 * Auto-generate `typing_lessons` rows from a spelling list.
 *
 * Two lessons per list:
 *   1. `spelling-drill` — each word repeated 3x, joined with spaces.
 *   2. `spelling-sentence` — Claude Haiku generates a kid-safe sentence
 *      using all words. Falls back to a deterministic concatenation
 *      if AI is unavailable.
 *
 * Both rows reference the spelling list via `spellingListId`.
 */
import { eq } from 'drizzle-orm';
import { useDrizzle, tables } from '../../../../../server/utils/drizzle';
import { generateLesson, type AnthropicLike } from './lesson-generator';

export type SpellingLessonsResult = {
  drillLessonId: number;
  sentenceLessonId: number;
};

export function buildDrillText(words: string[]): string {
  return words.map((w) => `${w} ${w} ${w}`).join(' ');
}

export function buildFallbackSentence(words: string[]): string {
  // Keep it short and kid-friendly; just join the words into a list.
  if (words.length === 0) return '';
  if (words.length === 1) return `${words[0]} is the word.`;
  return `here are the words: ${words.join(', ')}.`;
}

/**
 * Generate a sentence using Claude Haiku, constrained to
 * (unlocked keys ∪ the spelling words). The unlocked-keys check guards
 * against the model trying to use letters the kid hasn't learned yet.
 */
async function generateSpellingSentence(
  words: string[],
  stage: number,
  client?: AnthropicLike,
): Promise<string> {
  // We pass the list as the topic so the model sees what to weave in.
  const result = await generateLesson(
    {
      stage,
      topic: `a sentence using the words ${words.join(', ')}`,
      kind: 'sentence',
      length: 'short',
      // The lesson targets the spelling words, not the stage's newest keys.
      emphasizeNewKeys: false,
    },
    client,
  );
  if (result.ok) return result.text;
  return buildFallbackSentence(words);
}

export async function autoGenerateSpellingLessons(
  spellingListId: number,
  words: string[],
  stage: number,
  client?: AnthropicLike,
): Promise<SpellingLessonsResult> {
  const db = useDrizzle();

  const drillSlug = `spelling-${spellingListId}-drill`;
  const sentenceSlug = `spelling-${spellingListId}-sentence`;
  const drillText = buildDrillText(words);
  const sentenceText = await generateSpellingSentence(words, stage, client);

  // Idempotent — wipe any previous derived lessons for this list before
  // re-inserting (so callers can re-run after editing the words).
  await db
    .delete(tables.typingLessons)
    .where(eq(tables.typingLessons.spellingListId, spellingListId));

  const inserted = await db
    .insert(tables.typingLessons)
    .values([
      {
        slug: drillSlug,
        stage,
        kind: 'spelling-drill',
        title: `Spelling drill (#${spellingListId})`,
        text: drillText,
        targetWpm: 10,
        targetAccuracy: 0.95,
        spellingListId,
        generatedBy: 'ai',
      },
      {
        slug: sentenceSlug,
        stage,
        kind: 'spelling-sentence',
        title: `Spelling sentence (#${spellingListId})`,
        text: sentenceText,
        targetWpm: 10,
        targetAccuracy: 0.95,
        spellingListId,
        generatedBy: 'ai',
      },
    ])
    .returning({ id: tables.typingLessons.id, slug: tables.typingLessons.slug });

  const drill = inserted.find((row) => row.slug === drillSlug);
  const sentence = inserted.find((row) => row.slug === sentenceSlug);
  if (!drill || !sentence) {
    throw new Error('Failed to insert spelling lessons');
  }
  return { drillLessonId: drill.id, sentenceLessonId: sentence.id };
}
