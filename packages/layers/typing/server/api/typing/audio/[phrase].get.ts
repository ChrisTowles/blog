/**
 * GET /api/typing/audio/:phrase
 *
 * Content-addressed audio endpoint. Returns either:
 *   - a redirect to the cached static audio file (after synthesis), or
 *   - 404 with `{ fallback: 'web-speech' }` if the provider is unset.
 *
 * The phrase is the URL-encoded text. The voice is taken from `?voice=`
 * with a default. Phrases are short ("a", "good job", "try again", etc.)
 * so query-encoding is fine.
 */
import { z } from 'zod';
import { configuredProvider, ensureAudio } from '../../../utils/typing/tts';

const paramsSchema = z.object({
  phrase: z.string().min(1).max(160),
});

const querySchema = z.object({
  voice: z.string().min(1).max(80).default('chirp3-en-us-Aoede'),
});

export default defineEventHandler(async (event) => {
  const { phrase } = await getValidatedRouterParams(event, paramsSchema.parse);
  const { voice } = await getValidatedQuery(event, querySchema.parse);

  const decoded = decodeURIComponent(phrase);

  const provider = configuredProvider();
  if (!provider) {
    setResponseStatus(event, 404);
    return { fallback: 'web-speech' as const };
  }

  const result = await ensureAudio(decoded, voice);
  if (!result) {
    setResponseStatus(event, 502);
    return { fallback: 'web-speech' as const, error: 'tts provider failed' };
  }

  return {
    url: result.url,
    cached: result.cached,
  };
});
