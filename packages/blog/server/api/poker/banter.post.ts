import { z } from 'zod';
import { log } from 'evlog';
import { getAnthropicClient } from '~~/server/utils/ai/anthropic';
import { withAnthropicSpan } from '~~/server/utils/observability/anthropic';
import { MODEL_HAIKU } from '~~/shared/models';
import { getPersona, type BanterEvent } from '~~/shared/poker/personas';

const BANTER_EVENTS: BanterEvent[] = [
  'hand-start',
  'ai-bet',
  'ai-raise',
  'ai-call',
  'ai-check',
  'ai-fold',
  'player-bet',
  'player-raise',
  'player-fold',
  'player-all-in',
  'win-showdown',
  'win-fold',
  'lose-showdown',
  'split',
];

const bodySchema = z.object({
  personaId: z.string(),
  event: z.enum(BANTER_EVENTS),
  situation: z.string().max(400),
});

const SYSTEM_PROMPT_BASE = [
  "You are an AI poker opponent in a heads-up Texas Hold'em game on a personal blog.",
  'A short situation will be given. Reply with ONE in-character line of trash-talk, banter, or commentary.',
  'Hard rules:',
  '- ONE line only. Maximum 18 words. No multiple sentences if you can avoid it.',
  '- Stay in character. Do not break the fourth wall, do not mention being an AI or LLM.',
  "- Do not reveal your hole cards or claim to know the player's.",
  '- Keep it PG-13. No slurs, no harassment, no real-money advice.',
  '- Do not include quotes, prefixes, the persona name, or stage directions. Just the line.',
].join('\n');

export default defineEventHandler(async (event) => {
  await getUserSession(event);

  const body = await readValidatedBody(event, bodySchema.parse);
  const persona = getPersona(body.personaId);
  const client = getAnthropicClient();

  const systemPrompt = `${SYSTEM_PROMPT_BASE}\n\nYour persona:\n${persona.voice}`;
  const userPrompt = `Situation (${body.event}): ${body.situation}\n\nReply with ONE banter line.`;

  try {
    const response = await withAnthropicSpan(
      'chat',
      MODEL_HAIKU,
      () =>
        client.messages.create({
          model: MODEL_HAIKU,
          max_tokens: 80,
          temperature: 0.95,
          system: [
            {
              type: 'text' as const,
              text: systemPrompt,
              // Cache the per-persona system prompt across requests for the same hand.
              cache_control: { type: 'ephemeral' as const },
            },
          ],
          messages: [{ role: 'user', content: userPrompt }],
        }),
      {
        temperature: 0.95,
        max_tokens: 80,
        attributes: { 'poker.persona': persona.id, 'poker.event': body.event },
      },
    );

    const block = response.content.find((b) => b.type === 'text');
    const text = block && 'text' in block ? block.text.trim() : '';
    // Strip surrounding quotes if Haiku adds them despite the instruction.
    const cleaned = text.replace(/^["'`]+|["'`]+$/g, '').slice(0, 200);

    return {
      personaId: persona.id,
      event: body.event,
      text: cleaned,
    };
  } catch (err) {
    log.warn('poker', `banter failed persona=${persona.id} event=${body.event} err=${String(err)}`);
    // Don't fail the game UI if Haiku hiccups — return an empty line.
    return { personaId: persona.id, event: body.event, text: '' };
  }
});
