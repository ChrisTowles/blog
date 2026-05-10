/**
 * POST /api/typing/spelling/extract
 *
 * Multipart image upload. Caller must be a guardian of the target
 * learner. Returns the extracted words for guardian confirmation
 * before saving — does NOT persist anything.
 *
 * Body shape (multipart/form-data):
 *   - learnerId: text field (number)
 *   - image: file field
 */
import { extractSpellingWords } from '../../../utils/typing/spelling-extractor';
import { requireGuardian } from '../../../utils/typing/require-guardian';

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  if (!parts) {
    throw createError({ statusCode: 400, statusMessage: 'Multipart body required' });
  }
  const learnerIdPart = parts.find((p) => p.name === 'learnerId');
  const imagePart = parts.find((p) => p.name === 'image');
  const learnerId = Number(learnerIdPart?.data.toString('utf8'));
  if (!Number.isFinite(learnerId) || learnerId <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Missing learnerId' });
  }
  if (!imagePart || !imagePart.data) {
    throw createError({ statusCode: 400, statusMessage: 'Missing image' });
  }
  if (imagePart.data.length > MAX_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Image too large' });
  }
  const mediaType = imagePart.type ?? 'image/png';
  if (!/^image\/(png|jpe?g|webp)$/.test(mediaType)) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported image type' });
  }

  await requireGuardian(event, { learnerId });

  const base64 = imagePart.data.toString('base64');
  const result = await extractSpellingWords(base64, mediaType);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  return { ok: true as const, words: result.words };
});
