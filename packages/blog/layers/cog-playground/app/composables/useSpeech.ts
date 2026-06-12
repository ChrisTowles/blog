/**
 * useSpeech — thin wrapper over the Web Speech APIs.
 *
 * TTS  : window.speechSynthesis (always available in modern browsers).
 * STT  : window.SpeechRecognition / webkitSpeechRecognition.
 *
 * STT is not universal (notably Firefox). `sttSupported` lets callers
 * fall back to a plain text input. All listeners are torn down in
 * onScopeDispose so a mid-recognition unmount can't leak a hot mic.
 */

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

export function useSpeech() {
  const speaking = ref(false);
  const listening = ref(false);
  const transcript = ref('');
  const sttError = ref<string | null>(null);

  const ttsSupported = import.meta.client && typeof window.speechSynthesis !== 'undefined';

  function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
    if (!import.meta.client) return null;
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
  }

  const sttSupported = getRecognitionCtor() !== null;
  let recognition: SpeechRecognitionLike | null = null;

  /** Speak `text`. Resolves when playback ends (or immediately if no TTS). */
  function speak(text: string, opts?: { rate?: number }): Promise<void> {
    if (!ttsSupported) return Promise.resolve();
    return new Promise((resolve) => {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = opts?.rate ?? 0.85;
      u.pitch = 1;
      u.onend = () => {
        speaking.value = false;
        resolve();
      };
      u.onerror = () => {
        speaking.value = false;
        resolve();
      };
      speaking.value = true;
      window.speechSynthesis.speak(u);
    });
  }

  function stopSpeaking() {
    if (ttsSupported) window.speechSynthesis.cancel();
    speaking.value = false;
  }

  /** Start a single-utterance recognition. No-op if STT is unsupported. */
  function startListening() {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      sttError.value = 'unsupported';
      return;
    }
    sttError.value = null;
    transcript.value = '';
    recognition = new Ctor();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e) => {
      let text = '';
      for (let i = 0; i < e.results.length; i++) {
        const alt = e.results[i]?.[0];
        if (alt) text += `${alt.transcript} `;
      }
      transcript.value = text.trim();
    };
    recognition.onerror = (e) => {
      sttError.value = e.error || 'error';
      listening.value = false;
    };
    recognition.onend = () => {
      listening.value = false;
    };
    listening.value = true;
    try {
      recognition.start();
    } catch {
      // start() throws if called while already started — ignore.
    }
  }

  function stopListening() {
    if (recognition) {
      try {
        recognition.stop();
      } catch {
        /* not started */
      }
    }
    listening.value = false;
  }

  onScopeDispose(() => {
    stopSpeaking();
    if (recognition) {
      try {
        recognition.abort();
      } catch {
        /* noop */
      }
      recognition = null;
    }
  });

  return {
    speaking,
    listening,
    transcript,
    sttError,
    ttsSupported,
    sttSupported,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
  };
}
