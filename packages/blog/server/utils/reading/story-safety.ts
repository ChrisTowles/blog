import Anthropic from '@anthropic-ai/sdk';

const BLOCKLIST = [
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
  const lowerText = storyText.toLowerCase();
  for (const word of BLOCKLIST) {
    if (lowerText.includes(word)) {
      return { safe: false, reason: `Contains blocked word: "${word}"` };
    }
  }

  // Stage 2: AI review
  const client = new Anthropic();
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    temperature: 0,
    system: `You are a children's content safety reviewer. Classify the following story as SAFE or UNSAFE for children ages 7-11. Check for: violence, scary themes, stereotypes, age-inappropriate content, bullying.
Reply with JSON: { "safe": true/false, "reason": "..." }`,
    messages: [{ role: 'user', content: storyText }],
  });

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
