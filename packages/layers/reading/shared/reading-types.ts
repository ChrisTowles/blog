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
export type ReadingMode = 'listen' | 'guided' | 'independent' | 'read-together';
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

export interface StoryPreview {
  title: string;
  summary: string;
}

export interface GenerateStoryRequest {
  childId: number;
  theme?: string;
  genre?: string;
  who?: string;
  idea?: string;
  previewMode?: boolean;
  selectedPreview?: StoryPreview;
}

export interface GenerateStoryPreviewResponse {
  previews: StoryPreview[];
}

// API response shapes for client-side typing
export interface SrsCardResponse {
  id: number;
  childId: number;
  cardType: string;
  front: string;
  back: string;
  audioUrl: string | null;
  state: number;
  difficulty: number;
  stability: number;
  due: string;
  lastReview: string | null;
  reps: number;
  lapses: number;
  relatedPhonicsUnitId: number | null;
}

export interface PhonicsProgressResponse {
  id: number;
  childId: number;
  phonicsUnitId: number;
  status: PhonicsProgressStatus;
  masteredAt: string | null;
}

export type AchievementType =
  | 'first_story'
  | 'ten_words'
  | 'seven_day_streak'
  | 'phase_complete'
  | 'fifty_stories';

export interface AchievementResponse {
  id: number;
  childId: number;
  type: AchievementType;
  earnedAt: string;
  meta: Record<string, unknown> | null;
}

export const ACHIEVEMENT_DEFINITIONS: Record<
  AchievementType,
  { label: string; description: string; emoji: string }
> = {
  first_story: { label: 'First Story', description: 'Read your very first story!', emoji: '📖' },
  ten_words: { label: 'Word Collector', description: 'Mastered 10 words!', emoji: '🔤' },
  seven_day_streak: { label: '7-Day Streak', description: 'Read 7 days in a row!', emoji: '🔥' },
  phase_complete: {
    label: 'Phase Complete',
    description: 'Completed a phonics phase!',
    emoji: '🎓',
  },
  fifty_stories: { label: 'Bookworm', description: 'Read 50 stories!', emoji: '🐛' },
};

export interface PhonicsMapUnit {
  id: number;
  phase: PhonicsPhase;
  orderIndex: number;
  name: string;
  patterns: string[];
  description: string;
  status: PhonicsProgressStatus;
  masteredAt: string | null;
}
