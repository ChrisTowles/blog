/**
 * Word library for the KidsReader app
 *
 * Each word includes:
 * - The word text
 * - Phoneme breakdown (how to segment for the slider)
 * - Difficulty level (1-5)
 * - Category (for filtering)
 * - Type (decodable vs sight word)
 */

export type WordType = 'decodable' | 'sight'

export interface WordPhoneme {
  letters: string // The letter(s) for this phoneme segment
  phonemeId: string // Reference to phoneme definition
}

export interface Word {
  id: string
  text: string
  phonemes: WordPhoneme[]
  type: WordType
  level: number // 1 (easiest) to 5 (hardest)
  category?: string
}

/**
 * Starter word library for MVP
 * Organized by difficulty level
 */
export const words: Word[] = [
  // Level 1: CVC words (consonant-vowel-consonant)
  {
    id: 'cat',
    text: 'cat',
    type: 'decodable',
    level: 1,
    category: 'animals',
    phonemes: [
      { letters: 'c', phonemeId: 'c' },
      { letters: 'a', phonemeId: 'a-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },
  {
    id: 'sat',
    text: 'sat',
    type: 'decodable',
    level: 1,
    category: 'actions',
    phonemes: [
      { letters: 's', phonemeId: 's' },
      { letters: 'a', phonemeId: 'a-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },
  {
    id: 'mat',
    text: 'mat',
    type: 'decodable',
    level: 1,
    category: 'objects',
    phonemes: [
      { letters: 'm', phonemeId: 'm' },
      { letters: 'a', phonemeId: 'a-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },
  {
    id: 'hat',
    text: 'hat',
    type: 'decodable',
    level: 1,
    category: 'objects',
    phonemes: [
      { letters: 'h', phonemeId: 'h' },
      { letters: 'a', phonemeId: 'a-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },
  {
    id: 'bat',
    text: 'bat',
    type: 'decodable',
    level: 1,
    category: 'animals',
    phonemes: [
      { letters: 'b', phonemeId: 'b' },
      { letters: 'a', phonemeId: 'a-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },
  {
    id: 'rat',
    text: 'rat',
    type: 'decodable',
    level: 1,
    category: 'animals',
    phonemes: [
      { letters: 'r', phonemeId: 'r' },
      { letters: 'a', phonemeId: 'a-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },
  {
    id: 'dog',
    text: 'dog',
    type: 'decodable',
    level: 1,
    category: 'animals',
    phonemes: [
      { letters: 'd', phonemeId: 'd' },
      { letters: 'o', phonemeId: 'o-short' },
      { letters: 'g', phonemeId: 'g' }
    ]
  },
  {
    id: 'log',
    text: 'log',
    type: 'decodable',
    level: 1,
    category: 'objects',
    phonemes: [
      { letters: 'l', phonemeId: 'l' },
      { letters: 'o', phonemeId: 'o-short' },
      { letters: 'g', phonemeId: 'g' }
    ]
  },
  {
    id: 'hog',
    text: 'hog',
    type: 'decodable',
    level: 1,
    category: 'animals',
    phonemes: [
      { letters: 'h', phonemeId: 'h' },
      { letters: 'o', phonemeId: 'o-short' },
      { letters: 'g', phonemeId: 'g' }
    ]
  },
  {
    id: 'hop',
    text: 'hop',
    type: 'decodable',
    level: 1,
    category: 'actions',
    phonemes: [
      { letters: 'h', phonemeId: 'h' },
      { letters: 'o', phonemeId: 'o-short' },
      { letters: 'p', phonemeId: 'p' }
    ]
  },
  {
    id: 'top',
    text: 'top',
    type: 'decodable',
    level: 1,
    category: 'objects',
    phonemes: [
      { letters: 't', phonemeId: 't' },
      { letters: 'o', phonemeId: 'o-short' },
      { letters: 'p', phonemeId: 'p' }
    ]
  },
  {
    id: 'pot',
    text: 'pot',
    type: 'decodable',
    level: 1,
    category: 'objects',
    phonemes: [
      { letters: 'p', phonemeId: 'p' },
      { letters: 'o', phonemeId: 'o-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },
  {
    id: 'dot',
    text: 'dot',
    type: 'decodable',
    level: 1,
    category: 'objects',
    phonemes: [
      { letters: 'd', phonemeId: 'd' },
      { letters: 'o', phonemeId: 'o-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },
  {
    id: 'sun',
    text: 'sun',
    type: 'decodable',
    level: 1,
    category: 'nature',
    phonemes: [
      { letters: 's', phonemeId: 's' },
      { letters: 'u', phonemeId: 'u-short' },
      { letters: 'n', phonemeId: 'n' }
    ]
  },
  {
    id: 'run',
    text: 'run',
    type: 'decodable',
    level: 1,
    category: 'actions',
    phonemes: [
      { letters: 'r', phonemeId: 'r' },
      { letters: 'u', phonemeId: 'u-short' },
      { letters: 'n', phonemeId: 'n' }
    ]
  },
  {
    id: 'fun',
    text: 'fun',
    type: 'decodable',
    level: 1,
    category: 'abstract',
    phonemes: [
      { letters: 'f', phonemeId: 'f' },
      { letters: 'u', phonemeId: 'u-short' },
      { letters: 'n', phonemeId: 'n' }
    ]
  },

  // Level 2: Words with digraphs (sh, ch, th)
  {
    id: 'ship',
    text: 'ship',
    type: 'decodable',
    level: 2,
    category: 'objects',
    phonemes: [
      { letters: 'sh', phonemeId: 'sh' },
      { letters: 'i', phonemeId: 'i-short' },
      { letters: 'p', phonemeId: 'p' }
    ]
  },
  {
    id: 'shop',
    text: 'shop',
    type: 'decodable',
    level: 2,
    category: 'places',
    phonemes: [
      { letters: 'sh', phonemeId: 'sh' },
      { letters: 'o', phonemeId: 'o-short' },
      { letters: 'p', phonemeId: 'p' }
    ]
  },
  {
    id: 'fish',
    text: 'fish',
    type: 'decodable',
    level: 2,
    category: 'animals',
    phonemes: [
      { letters: 'f', phonemeId: 'f' },
      { letters: 'i', phonemeId: 'i-short' },
      { letters: 'sh', phonemeId: 'sh' }
    ]
  },
  {
    id: 'dish',
    text: 'dish',
    type: 'decodable',
    level: 2,
    category: 'objects',
    phonemes: [
      { letters: 'd', phonemeId: 'd' },
      { letters: 'i', phonemeId: 'i-short' },
      { letters: 'sh', phonemeId: 'sh' }
    ]
  },
  {
    id: 'chin',
    text: 'chin',
    type: 'decodable',
    level: 2,
    category: 'body',
    phonemes: [
      { letters: 'ch', phonemeId: 'ch' },
      { letters: 'i', phonemeId: 'i-short' },
      { letters: 'n', phonemeId: 'n' }
    ]
  },
  {
    id: 'chip',
    text: 'chip',
    type: 'decodable',
    level: 2,
    category: 'objects',
    phonemes: [
      { letters: 'ch', phonemeId: 'ch' },
      { letters: 'i', phonemeId: 'i-short' },
      { letters: 'p', phonemeId: 'p' }
    ]
  },
  {
    id: 'chat',
    text: 'chat',
    type: 'decodable',
    level: 2,
    category: 'actions',
    phonemes: [
      { letters: 'ch', phonemeId: 'ch' },
      { letters: 'a', phonemeId: 'a-short' },
      { letters: 't', phonemeId: 't' }
    ]
  },

  // Common sight words (Pre-K and Kindergarten Dolch)
  {
    id: 'the',
    text: 'the',
    type: 'sight',
    level: 1,
    category: 'sight',
    phonemes: [
      { letters: 'the', phonemeId: 'sight' }
    ]
  },
  {
    id: 'a',
    text: 'a',
    type: 'sight',
    level: 1,
    category: 'sight',
    phonemes: [
      { letters: 'a', phonemeId: 'sight' }
    ]
  },
  {
    id: 'and',
    text: 'and',
    type: 'sight',
    level: 1,
    category: 'sight',
    phonemes: [
      { letters: 'and', phonemeId: 'sight' }
    ]
  },
  {
    id: 'is',
    text: 'is',
    type: 'sight',
    level: 1,
    category: 'sight',
    phonemes: [
      { letters: 'is', phonemeId: 'sight' }
    ]
  },
  {
    id: 'it',
    text: 'it',
    type: 'sight',
    level: 1,
    category: 'sight',
    phonemes: [
      { letters: 'it', phonemeId: 'sight' }
    ]
  },
  {
    id: 'to',
    text: 'to',
    type: 'sight',
    level: 1,
    category: 'sight',
    phonemes: [
      { letters: 'to', phonemeId: 'sight' }
    ]
  },
  {
    id: 'in',
    text: 'in',
    type: 'sight',
    level: 1,
    category: 'sight',
    phonemes: [
      { letters: 'in', phonemeId: 'sight' }
    ]
  },
  {
    id: 'you',
    text: 'you',
    type: 'sight',
    level: 1,
    category: 'sight',
    phonemes: [
      { letters: 'you', phonemeId: 'sight' }
    ]
  },
  {
    id: 'said',
    text: 'said',
    type: 'sight',
    level: 2,
    category: 'sight',
    phonemes: [
      { letters: 'said', phonemeId: 'sight' }
    ]
  },
  {
    id: 'was',
    text: 'was',
    type: 'sight',
    level: 2,
    category: 'sight',
    phonemes: [
      { letters: 'was', phonemeId: 'sight' }
    ]
  }
]

/**
 * Get words by difficulty level
 */
export function getWordsByLevel(level: number): Word[] {
  return words.filter(w => w.level === level)
}

/**
 * Get words by type (decodable or sight)
 */
export function getWordsByType(type: WordType): Word[] {
  return words.filter(w => w.type === type)
}

/**
 * Get words by category
 */
export function getWordsByCategory(category: string): Word[] {
  return words.filter(w => w.category === category)
}

/**
 * Get a random selection of words for practice
 */
export function getRandomWords(count: number, filters?: {
  level?: number
  type?: WordType
  category?: string
}): Word[] {
  let filtered = [...words]

  if (filters?.level) {
    filtered = filtered.filter(w => w.level === filters.level)
  }
  if (filters?.type) {
    filtered = filtered.filter(w => w.type === filters.type)
  }
  if (filters?.category) {
    filtered = filtered.filter(w => w.category === filters.category)
  }

  // Shuffle and take count
  const shuffled = filtered.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

/**
 * Get a word by ID
 */
export function getWordById(id: string): Word | undefined {
  return words.find(w => w.id === id)
}
