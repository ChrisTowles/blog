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

// Module-scope so every play* helper (and every component that uses
// useTypingAudio) shares one AudioContext. Browsers cap the number of
// active contexts (~6 in Safari) so creating one per tone causes
// failures during long sessions.
let sharedAudioCtx: AudioContext | null = null;

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

  function getAudioCtx(): AudioContext | null {
    if (!audioOn.value || !import.meta.client) return null;
    if (sharedAudioCtx) return sharedAudioCtx;
    const AudioCtx =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    try {
      sharedAudioCtx = new AudioCtx();
    } catch {
      return null;
    }
    return sharedAudioCtx;
  }

  /** Tiny self-contained synth helper. Returns silently if audio is off. */
  function playTone(
    freq: number,
    durationMs: number,
    opts: { type?: OscillatorType; gain?: number; startOffsetMs?: number } = {},
  ) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = opts.type ?? 'sine';
      osc.frequency.value = freq;
      const startAt = ctx.currentTime + (opts.startOffsetMs ?? 0) / 1000;
      const peak = opts.gain ?? 0.05;
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(peak, startAt + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + durationMs / 1000);
      osc.connect(gain).connect(ctx.destination);
      osc.start(startAt);
      osc.stop(startAt + durationMs / 1000 + 0.01);
      // Don't close the shared context on tone end; reuse it for the
      // next tone. The osc itself disconnects when it ends.
    } catch {
      // best-effort
    }
  }

  /** Soft low buzz on a wrong keystroke. */
  function playWrong() {
    playTone(220, 130, { type: 'square', gain: 0.06 });
  }

  /** Brief positive blip on every correct keystroke — typewriter-feel. */
  function playClick() {
    playTone(880, 50, { type: 'sine', gain: 0.04 });
  }

  /**
   * Ascending chime that pairs with the streak burst. Higher tier =
   * higher final note, so 15-in-a-row genuinely sounds better than 3.
   */
  function playStreakDing(tier: number) {
    const t = Math.max(1, Math.min(tier, 5));
    const base = 523.25; // C5
    const notes = [base, base * 1.25, base * 1.5];
    if (t >= 4) notes.push(base * 2);
    if (t >= 5) notes.push(base * 2.5);
    notes.forEach((freq, i) => {
      playTone(freq * (1 + (t - 1) * 0.05), 140, {
        type: 'triangle',
        gain: 0.045,
        startOffsetMs: i * 75,
      });
    });
  }

  /** Four-note "ta-da" arpeggio on lesson completion. */
  function playFanfare() {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      playTone(freq, 200, {
        type: 'triangle',
        gain: 0.06,
        startOffsetMs: i * 110,
      });
    });
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

  function playEncouragement() {
    const choice = ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)];
    if (choice !== undefined) void play(choice);
  }

  return {
    audioOn,
    setAudioForStage,
    preload,
    play,
    playEncouragement,
    playWrong,
    playClick,
    playStreakDing,
    playFanfare,
  };
}
