export type WordFeedback = 'pending' | 'correct' | 'incorrect';

interface SpeechRecognitionOptions {
  /** Expected words to match against */
  expectedWords: Ref<string[]>;
  /** Called when a word is recognized and matched */
  onWordMatch?: (wordIndex: number, feedback: WordFeedback) => void;
}

export function useSpeechRecognition(options: SpeechRecognitionOptions) {
  const isSupported = ref(false);
  const isListening = ref(false);
  const spokenWords = ref<string[]>([]);
  const currentExpectedIndex = ref(0);
  const wordFeedbacks = ref<WordFeedback[]>([]);
  const startTime = ref(0);
  const miscues = ref<
    Array<{
      wordIndex: number;
      expected: string;
      actual: string;
      type: 'mispronunciation' | 'substitution';
    }>
  >([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recognition: any = null;

  function initFeedbacks() {
    wordFeedbacks.value = options.expectedWords.value.map(() => 'pending');
    currentExpectedIndex.value = 0;
    spokenWords.value = [];
    miscues.value = [];
  }

  function normalizeWord(word: string): string {
    return word.toLowerCase().replace(/[^a-z']/g, '');
  }

  function matchWord(spoken: string): boolean {
    const expected = options.expectedWords.value[currentExpectedIndex.value];
    if (!expected) return false;
    return normalizeWord(spoken) === normalizeWord(expected);
  }

  function processTranscript(transcript: string) {
    const words = transcript.trim().split(/\s+/).filter(Boolean);
    const latestWord = words[words.length - 1];
    if (!latestWord) return;

    // Skip if we've already matched all words
    if (currentExpectedIndex.value >= options.expectedWords.value.length) return;

    const normalized = normalizeWord(latestWord);
    if (!normalized) return;

    // Avoid processing duplicates
    if (
      spokenWords.value.length > 0 &&
      normalizeWord(spokenWords.value[spokenWords.value.length - 1]!) === normalized
    ) {
      return;
    }

    spokenWords.value.push(latestWord);

    const idx = currentExpectedIndex.value;
    if (matchWord(latestWord)) {
      wordFeedbacks.value[idx] = 'correct';
      options.onWordMatch?.(idx, 'correct');
    } else {
      wordFeedbacks.value[idx] = 'incorrect';
      miscues.value.push({
        wordIndex: idx,
        expected: options.expectedWords.value[idx]!,
        actual: latestWord,
        type: 'substitution',
      });
      options.onWordMatch?.(idx, 'incorrect');
    }
    currentExpectedIndex.value++;
  }

  function start() {
    if (!isSupported.value || isListening.value) return;

    initFeedbacks();
    startTime.value = Date.now();

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      // Process only the latest final result
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result?.isFinal) {
          processTranscript(result[0]?.transcript ?? '');
        }
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('Speech recognition error:', event.error);
      }
    };

    recognition.onend = () => {
      // Auto-restart if still listening (browser may stop after silence)
      if (isListening.value && currentExpectedIndex.value < options.expectedWords.value.length) {
        recognition?.start();
      } else {
        isListening.value = false;
      }
    };

    recognition.start();
    isListening.value = true;
  }

  function stop() {
    if (recognition) {
      isListening.value = false;
      recognition.stop();
      recognition = null;
    }
  }

  function getElapsedSeconds(): number {
    if (!startTime.value) return 0;
    return (Date.now() - startTime.value) / 1000;
  }

  const accuracy = computed(() => {
    const total = wordFeedbacks.value.filter((f) => f !== 'pending').length;
    if (total === 0) return 0;
    const correct = wordFeedbacks.value.filter((f) => f === 'correct').length;
    return correct / total;
  });

  function getWcpm(): number {
    const seconds = getElapsedSeconds();
    if (seconds === 0) return 0;
    const wordsRead = wordFeedbacks.value.filter((f) => f !== 'pending').length;
    return Math.round((wordsRead / seconds) * 60);
  }

  const isComplete = computed(() => {
    return (
      currentExpectedIndex.value >= options.expectedWords.value.length &&
      options.expectedWords.value.length > 0
    );
  });

  // Check browser support on mount
  if (import.meta.client) {
    isSupported.value = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  // Clean up microphone on component unmount
  onUnmounted(() => stop());

  return {
    isSupported: readonly(isSupported),
    isListening: readonly(isListening),
    wordFeedbacks: readonly(wordFeedbacks),
    spokenWords: readonly(spokenWords),
    currentExpectedIndex: readonly(currentExpectedIndex),
    miscues: readonly(miscues),
    accuracy,
    getWcpm,
    getElapsedSeconds,
    isComplete,
    start,
    stop,
  };
}
