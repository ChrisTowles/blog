declare global {
  interface User {
    id: string;
    name?: string;
    username?: string;
    avatar?: string;
  }

  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export {};
