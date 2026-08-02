/**
 * Google Cloud TTS (Chirp3) client over an on-disk cache: `(phrase, voice)` hashes to
 * `packages/blog/public/audio/typing/<hash>.mp3`, which Nuxt then serves as a static
 * asset, so a generated phrase never round-trips again. Synth returns `null` when
 * `GOOGLE_TTS_KEY` / `TYPING_TTS_PROVIDER` is unset — callers fall back to Web Speech.
 */
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const PUBLIC_DIR = (() => {
  // Resolve packages/blog/public/audio/typing relative to this file.
  // This file is at packages/layers/typing/server/utils/typing/tts.ts.
  const here = new URL('.', import.meta.url).pathname;
  return join(here, '..', '..', '..', '..', '..', 'blog', 'public', 'audio', 'typing');
})();

export type TTSVoice = string; // e.g. 'chirp3-en-us-Aoede'

export function hashPhrase(phrase: string, voice: TTSVoice): string {
  return createHash('sha256').update(`${voice}::${phrase}`).digest('hex').slice(0, 32);
}

export function audioCachePath(phrase: string, voice: TTSVoice): string {
  return join(PUBLIC_DIR, `${hashPhrase(phrase, voice)}.mp3`);
}

export function audioPublicUrl(phrase: string, voice: TTSVoice): string {
  return `/audio/typing/${hashPhrase(phrase, voice)}.mp3`;
}

export type TTSProvider = 'google' | null;

export function configuredProvider(): TTSProvider {
  const provider = process.env.TYPING_TTS_PROVIDER?.toLowerCase();
  if (provider === 'google' && process.env.GOOGLE_TTS_KEY) return 'google';
  return null;
}

async function googleSynthesize(phrase: string, voice: TTSVoice): Promise<Buffer | null> {
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
  const data = (await res.json()) as { audioContent?: string };
  if (!data.audioContent) return null;
  return Buffer.from(data.audioContent, 'base64');
}

export async function ensureAudio(
  phrase: string,
  voice: TTSVoice,
): Promise<{ url: string; cached: boolean } | null> {
  const provider = configuredProvider();
  if (!provider) return null;

  const path = audioCachePath(phrase, voice);
  const url = audioPublicUrl(phrase, voice);
  if (existsSync(path)) return { url, cached: true };

  const audio = await googleSynthesize(phrase, voice);
  if (!audio) return null;

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, audio);
  return { url, cached: false };
}
