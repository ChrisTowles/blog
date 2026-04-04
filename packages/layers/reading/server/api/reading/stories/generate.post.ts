import { z } from 'zod';
import { count, gte } from 'drizzle-orm';
import { log } from 'evlog';
import type { PhonicsPhase } from '../../../../shared/reading-types';

const bodySchema = z.object({
  childId: z.number(),
  theme: z.string().optional(),
  genre: z.string().optional(),
  who: z.string().optional(),
  idea: z.string().optional(),
  previewMode: z.boolean().optional(),
  selectedPreview: z
    .object({
      title: z.string(),
      summary: z.string(),
    })
    .optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  // Verify parent owns child
  const child = await db.query.childProfiles.findFirst({
    where: (c, { eq, and: a }) => a(eq(c.id, body.childId), eq(c.userId, session.user!.id)),
  });
  if (!child) {
    throw createError({ statusCode: 404, message: 'Child not found' });
  }

  // Rate limit: 5 stories/child/day (use COUNT, not full row fetch)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const countResult = await db
    .select({ value: count() })
    .from(tables.stories)
    .where(
      and(
        eq(tables.stories.childId, body.childId),
        eq(tables.stories.aiGenerated, true),
        gte(tables.stories.createdAt, today),
      ),
    );
  const todayCount = countResult[0]?.value ?? 0;
  if (todayCount >= 5) {
    throw createError({ statusCode: 429, message: 'Daily story limit reached (5/day)' });
  }

  // Get child's mastered patterns
  const progress = await db.query.childPhonicsProgress.findMany({
    where: (p, { eq, and: a, or: o }) =>
      a(eq(p.childId, body.childId), o(eq(p.status, 'mastered'), eq(p.status, 'active'))),
    with: { phonicsUnit: true },
  });

  const allowedPatterns = progress.flatMap((p) => p.phonicsUnit.patterns);
  const phase = (child.currentPhase || 1) as PhonicsPhase;
  const sightWords = SIGHT_WORDS_BY_PHASE[phase] || SIGHT_WORDS_BY_PHASE[1];
  const theme = body.genre || body.theme || child.interests[0] || 'animals';

  // Preview mode: return quick previews without full generation
  if (body.previewMode) {
    const previews = await generateStoryPreviews({
      theme,
      who: body.who,
      idea: body.idea,
      childInterests: child.interests,
    });
    return { previews };
  }

  // Generate story
  const generated = await generateStory({
    allowedPatterns,
    sightWords,
    targetWords: [], // TODO: pick from next phonics unit
    theme,
    who: body.who,
    idea: body.idea,
    selectedPreview: body.selectedPreview,
  });

  // Safety review
  const safety = await reviewStorySafety(generated.rawText);
  if (!safety.safe) {
    throw createError({ statusCode: 422, message: `Story failed safety review: ${safety.reason}` });
  }

  // Save to DB (without illustrations first to get storyId)
  const [story] = await db
    .insert(tables.stories)
    .values({
      childId: body.childId,
      title: generated.title,
      content: generated.content,
      theme,
      targetPatterns: allowedPatterns,
      targetWords: [],
      decodabilityScore: generated.decodabilityScore,
      fleschKincaid: generated.fleschKincaid,
      aiGenerated: true,
    })
    .returning();

  // Generate illustrations (non-critical — story works without images)
  if (process.env.GOOGLE_AI_API_KEY) {
    try {
      const pageTexts = generated.content.pages.map((p) => p.words.map((w) => w.text).join(' '));
      const images = await generateStoryIllustrations(generated.title, theme, pageTexts);
      const illustrationUrls = await saveStoryImages(story!.id, images);

      const [updated] = await db
        .update(tables.stories)
        .set({ illustrationUrls })
        .where(eq(tables.stories.id, story!.id))
        .returning();

      return updated;
    } catch {
      log.warn('reading', 'Image generation failed, returning story without illustrations');
    }
  }

  return story;
});
