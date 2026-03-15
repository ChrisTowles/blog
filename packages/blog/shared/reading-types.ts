export interface StoryWord {
  text: string;
  decodable: boolean;
  pattern: string | null;
  sightWord: boolean;
}

export interface StoryPage {
  words: StoryWord[];
}

export interface StoryContent {
  pages: StoryPage[];
}

export type PhonicsPhase = 1 | 2 | 3 | 4;
export type PhonicsProgressStatus = 'locked' | 'active' | 'mastered';
export type ReadingMode = 'listen' | 'guided' | 'independent';
export type SrsCardType = 'phoneme' | 'sight_word' | 'vocab';

export interface ReadingMiscue {
  wordIndex: number;
  expected: string;
  actual: string;
  type: 'omission' | 'insertion' | 'mispronunciation' | 'substitution';
}

export interface SrsReviewRequest {
  cardId: number;
  rating: 1 | 3 | 4; // Again, Hard, Good (mapped to FSRS Rating enum)
}

export interface SrsStatsResponse {
  due: number;
  newCards: number;
  mastered: number;
  total: number;
}

export interface GenerateStoryRequest {
  childId: number;
  theme?: string;
}
