export function useTTS() {
  const isSpeaking = ref(false);
  const isPaused = ref(false);
  const currentWordIndex = ref(-1);
  const rate = ref(0.8);

  let _currentUtterance: SpeechSynthesisUtterance | null = null;

  function speak(text: string) {
    stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate.value;
    utterance.pitch = 1;
    utterance.volume = 1;
    _currentUtterance = utterance;

    utterance.onboundary = (event: SpeechSynthesisEvent) => {
      if (event.name === 'word') {
        // Calculate word index from char offset
        const textBefore = text.slice(0, event.charIndex);
        currentWordIndex.value = textBefore.split(/\s+/).filter(Boolean).length;
      }
    };

    utterance.onend = () => {
      isSpeaking.value = false;
      isPaused.value = false;
      currentWordIndex.value = -1;
    };

    utterance.onerror = () => {
      isSpeaking.value = false;
      isPaused.value = false;
      currentWordIndex.value = -1;
    };

    speechSynthesis.speak(utterance);
    isSpeaking.value = true;
  }

  function speakWord(word: string) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.6; // Slower for individual words
    speechSynthesis.speak(utterance);
  }

  function pause() {
    speechSynthesis.pause();
    isPaused.value = true;
  }

  function resume() {
    speechSynthesis.resume();
    isPaused.value = false;
  }

  function stop() {
    speechSynthesis.cancel();
    isSpeaking.value = false;
    isPaused.value = false;
    currentWordIndex.value = -1;
    _currentUtterance = null;
  }

  function setRate(newRate: number) {
    rate.value = Math.max(0.5, Math.min(1.2, newRate));
  }

  return {
    isSpeaking: readonly(isSpeaking),
    isPaused: readonly(isPaused),
    currentWordIndex: readonly(currentWordIndex),
    rate: readonly(rate),
    speak,
    speakWord,
    pause,
    resume,
    stop,
    setRate,
  };
}
