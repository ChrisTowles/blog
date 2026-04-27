import { z } from 'zod';
import { MODEL_HAIKU } from '~~/shared/models';
import { withAnthropicSpan } from '~~/server/utils/observability/anthropic';

const bodySchema = z.object({
  prompt: z.string().min(1).max(200),
});

const responseSchema = z.object({
  label: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  successColor: z.string(),
  highlightColor: z.string(),
  mascotEmoji: z.string(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { prompt } = await readValidatedBody(event, bodySchema.parse);

  const client = getAnthropicClient();
  const response = await withAnthropicSpan(
    'chat',
    MODEL_HAIKU,
    () =>
      client.messages.create({
        model: MODEL_HAIKU,
        max_tokens: 256,
        messages: [
          {
            role: 'user',
            content: `Generate a kid-friendly reading app color theme based on: "${prompt}"

Return ONLY a JSON object with these fields:
- label: A fun theme name (2-3 words)
- primaryColor: Main color (hex)
- secondaryColor: Secondary color (hex)
- accentColor: Accent color (hex)
- successColor: A green-ish success color (hex)
- highlightColor: A warm highlight color (hex)
- mascotEmoji: A single emoji that fits the theme

Colors must be vibrant and kid-friendly. No dark or muted colors.
Return ONLY the JSON, no markdown fences.`,
          },
        ],
      }),
    {
      max_tokens: 256,
      attributes: { 'reading.kind': 'theme-gen' },
    },
  );

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
  const parsed = JSON.parse(text);
  return responseSchema.parse(parsed);
});
