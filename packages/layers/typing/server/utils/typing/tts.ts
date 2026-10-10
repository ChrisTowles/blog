/**
 * Google Cloud TTS (Chirp3) client over an R2 cache: `(phrase, voice)` hashes to
 * `audio/typing/<sha256>.mp3` in the `MEDIA` bucket, so a generated phrase never round-trips to
 * Google again. Synthesis is unavailable when `GOOGLE_TTS_KEY` / `TYPING_TTS_PROVIDER` is
 * unset — the route then answers 404 and callers fall back to Web Speech.
 */
import { z } from 'zod';

const synthesizeResponseSchema = z.object({ audioContent: z.string().optional() });

/** The slice of an R2 bucket the cache needs. */
export interface AudioBucket {
  get(key: string): Promise<{ arrayBuffer(): Promise<ArrayBuffer> } | null>;
  put(
    key: string,
    value: ArrayBuffer,
    options: { httpMetadata: { contentType: string } },
  ): Promise<object | null>;
}

export type TTSVoice = string; // e.g. 'chirp3-en-us-Aoede'

export const AUDIO_CONTENT_TYPE = 'audio/mpeg';

export async function audioObjectKey(phrase: string, voice: TTSVoice): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${voice}::${phrase}`),
  );

  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');

  return `audio/typing/${hex}.mp3`;
}

export type TTSProvider = 'google' | null;

export function configuredProvider(): TTSProvider {
  const provider = process.env.TYPING_TTS_PROVIDER?.toLowerCase();

  if (provider === 'google' && process.env.GOOGLE_TTS_KEY) return 'google';

  return null;
}

async function googleSynthesize(phrase: string, voice: TTSVoice): Promise<ArrayBuffer | null> {
  const apiKey = process.env.GOOGLE_TTS_KEY;

  if (!apiKey) return null;
  // Voice naming convention assumes `chirp3-<lang>-<region>-<NAME>`.
  // Map to Google REST shape: `{ languageCode, name }`.
  const parts = voice.split('-');
  // expected: ['chirp3', 'en', 'us', 'Aoede']
  const lang = parts[1] ?? 'en';
  const region = (parts[2] ?? 'us').toUpperCase();
  const languageCode = `${lang}-${region}`;
  const name = `${languageCode}-Chirp3-HD-${parts.slice(3).join('-') || 'Aoede'}`;

  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

  const body = {
    input: { text: phrase },
    voice: { languageCode, name },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) return null;
  const data = synthesizeResponseSchema.parse(await res.json());

  if (!data.audioContent) return null;

  const bytes = Uint8Array.from(atob(data.audioContent), (c) => c.charCodeAt(0));

  return bytes.buffer;
}

/** The cached clip, synthesized and stored on first use. `null` when synthesis fails. */
export async function ensureAudio(
  bucket: AudioBucket,
  phrase: string,
  voice: TTSVoice,
): Promise<ArrayBuffer | null> {
  const key = await audioObjectKey(phrase, voice);
  const cached = await bucket.get(key);

  if (cached) return cached.arrayBuffer();

  const audio = await googleSynthesize(phrase, voice);

  if (!audio) return null;

  await bucket.put(key, audio, { httpMetadata: { contentType: AUDIO_CONTENT_TYPE } });

  return audio;
}
