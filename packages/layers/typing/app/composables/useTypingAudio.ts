/**
 * useTypingAudio — preloads and plays per-key + encouragement audio.
 *
 * Strategy:
 *   1. Server route returns a cached MP3 URL when GOOGLE_TTS_KEY is set.
 *   2. If the server returns 404 with `fallback: 'web-speech'`, fall
 *      back to the Web Speech API with rate=0.9 for clarity.
 *   3. The `audioOn` toggle is per-stage default in `useState`:
 *      ON for stages 1-5, OFF after.
 */
const ENCOURAGEMENT = ['good job', 'nice work', 'keep going', 'almost there'] as const;

type CacheEntry = HTMLAudioElement | { kind: 'web-speech' };

export function useTypingAudio() {
  const audioOn = useState<boolean>('typing:audio-on', () => true);
  const cache = useState<Record<string, CacheEntry>>('typing:audio-cache', () => ({}));

  function setAudioForStage(stage: number) {
    audioOn.value = stage <= 5;
  }

  async function ensure(phrase: string): Promise<CacheEntry | null> {
    if (!import.meta.client) return null;
    const c = cache.value[phrase];
    if (c) return c;
    try {
      const result = await $fetch<{ url?: string; fallback?: 'web-speech' }>(
        `/api/typing/audio/${encodeURIComponent(phrase)}`,
      );
      if (result.url) {
        const el = new Audio(result.url);
        cache.value[phrase] = el;
        return el;
      }
    } catch {
      // 404 / network — fall through to Web Speech
    }
    const fallback: CacheEntry = { kind: 'web-speech' };
    cache.value[phrase] = fallback;
    return fallback;
  }

  function playWebSpeech(phrase: string) {
    if (!import.meta.client || typeof window.speechSynthesis === 'undefined') return;
    const utter = new SpeechSynthesisUtterance(phrase);
    utter.rate = 0.9;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  }

  async function play(phrase: string) {
    if (!audioOn.value) return;
    const entry = await ensure(phrase);
    if (!entry) {
      playWebSpeech(phrase);
      return;
    }
    if ('kind' in entry) {
      playWebSpeech(phrase);
      return;
    }
    try {
      entry.currentTime = 0;
      await entry.play();
    } catch {
      playWebSpeech(phrase);
    }
  }

  /** Pre-warm the cache for the alphabet + encouragement phrases. */
  async function preload() {
    if (!import.meta.client) return;
    const phrases: string[] = [];
    for (let i = 0; i < 26; i++) {
      phrases.push(String.fromCharCode(97 + i));
    }
    phrases.push(...ENCOURAGEMENT);
    await Promise.all(phrases.map((p) => ensure(p).catch(() => null)));
  }

  function playKey(key: string) {
    if (key === ' ') return; // space gets no audio cue
    void play(key);
  }

  function playEncouragement() {
    const choice = ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)];
    if (choice !== undefined) void play(choice);
  }

  return {
    audioOn,
    setAudioForStage,
    preload,
    play,
    playKey,
    playEncouragement,
  };
}
