/**
 * The phrase travels in the path rather than a body because phrases are short
 * ("a", "good job", "try again"). The response is the MP3 itself, cached in R2, or a JSON 404
 * telling the client to fall back to Web Speech when no TTS provider is configured.
 */
import { z } from 'zod';
import { AUDIO_CONTENT_TYPE, configuredProvider, ensureAudio } from '../../../utils/typing/tts';

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

  const bucket = event.context.cloudflare?.env?.MEDIA;

  if (!bucket) {
    throw createError({
      statusCode: 500,
      statusMessage: 'MEDIA binding is missing from this environment',
    });
  }

  const audio = await ensureAudio(bucket, decoded, voice);

  if (!audio) {
    setResponseStatus(event, 502);

    return { fallback: 'web-speech' as const, error: 'tts provider failed' };
  }

  // The key is a hash of (voice, phrase), so a given URL never changes content.
  setResponseHeader(event, 'Content-Type', AUDIO_CONTENT_TYPE);
  setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(audio);
});
