import { MODEL_HAIKU } from '~~/shared/models';
import { withAnthropicSpan } from '~~/server/utils/observability/anthropic';

export const BLOCKLIST = [
  'kill',
  'murder',
  'blood',
  'death',
  'dead',
  'die',
  'weapon',
  'gun',
  'knife',
  'drugs',
  'alcohol',
  'beer',
  'wine',
  'hate',
  'stupid',
  'dumb',
  'ugly',
  'fat',
  'scary',
  'horror',
  'ghost',
  'monster',
  'devil',
  'demon',
  'hell',
  'damn',
];

interface SafetyResult {
  safe: boolean;
  reason?: string;
}

export async function reviewStorySafety(storyText: string): Promise<SafetyResult> {
  // Stage 1: Blocklist scan
  for (const word of BLOCKLIST) {
    const boundary = new RegExp(`\\b${word}\\b`, 'i');
    if (boundary.test(storyText)) {
      return { safe: false, reason: `Contains blocked word: "${word}"` };
    }
  }

  // Stage 2: AI review
  const client = getAnthropicClient();
  const response = await withAnthropicSpan(
    'chat',
    MODEL_HAIKU,
    () =>
      client.messages.create({
        model: MODEL_HAIKU,
        max_tokens: 256,
        temperature: 0,
        system: `You are a children's content safety reviewer. Classify the following story as SAFE or UNSAFE for children ages 7-11. Check for: violence, scary themes, stereotypes, age-inappropriate content, bullying.
Reply with JSON: { "safe": true/false, "reason": "..." }`,
        messages: [{ role: 'user', content: storyText }],
      }),
    {
      max_tokens: 256,
      temperature: 0,
      attributes: {
        'reading.kind': 'safety-review',
        'reading.story.length': storyText.length,
      },
    },
  );

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    return { safe: false, reason: 'Safety review failed - no response' };
  }

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { safe: false, reason: 'Safety review failed - invalid response' };
  }

  return JSON.parse(jsonMatch[0]) as SafetyResult;
}
