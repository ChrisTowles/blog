/**
 * Sight word lists for the KidsReader app
 *
 * Includes:
 * - Dolch Pre-K (40 words)
 * - Dolch Kindergarten (52 words)
 * - Dolch First Grade (41 words)
 * - Fry First 100
 */

export interface SightWordList {
  id: string
  name: string
  description: string
  level: number
  words: string[]
}

export const dolchPreK: SightWordList = {
  id: 'dolch-pre-k',
  name: 'Dolch Pre-K',
  description: '40 basic sight words for pre-kindergarten',
  level: 0,
  words: [
    'a', 'and', 'away', 'big', 'blue', 'can', 'come', 'down', 'find', 'for',
    'funny', 'go', 'help', 'here', 'I', 'in', 'is', 'it', 'jump', 'little',
    'look', 'make', 'me', 'my', 'not', 'one', 'play', 'red', 'run', 'said',
    'see', 'the', 'three', 'to', 'two', 'up', 'we', 'where', 'yellow', 'you'
  ]
}

export const dolchKindergarten: SightWordList = {
  id: 'dolch-kindergarten',
  name: 'Dolch Kindergarten',
  description: '52 sight words for kindergarten',
  level: 1,
  words: [
    'all', 'am', 'are', 'at', 'ate', 'be', 'black', 'brown', 'but', 'came',
    'did', 'do', 'eat', 'four', 'get', 'good', 'have', 'he', 'into', 'like',
    'must', 'new', 'no', 'now', 'on', 'our', 'out', 'please', 'pretty', 'ran',
    'ride', 'saw', 'say', 'she', 'so', 'soon', 'that', 'there', 'they', 'this',
    'too', 'under', 'want', 'was', 'well', 'went', 'what', 'white', 'who', 'will',
    'with', 'yes'
  ]
}

export const dolchFirstGrade: SightWordList = {
  id: 'dolch-first-grade',
  name: 'Dolch First Grade',
  description: '41 sight words for first grade',
  level: 2,
  words: [
    'after', 'again', 'an', 'any', 'as', 'ask', 'by', 'could', 'every', 'fly',
    'from', 'give', 'going', 'had', 'has', 'her', 'him', 'his', 'how', 'just',
    'know', 'let', 'live', 'may', 'of', 'old', 'once', 'open', 'over', 'put',
    'round', 'some', 'stop', 'take', 'thank', 'them', 'then', 'think', 'walk',
    'were', 'when'
  ]
}

export const fryFirst100: SightWordList = {
  id: 'fry-first-100',
  name: 'Fry First 100',
  description: 'Top 100 high-frequency words',
  level: 1,
  words: [
    'the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it',
    'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'I',
    'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'words',
    'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said',
    'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if',
    'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so',
    'some', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look',
    'two', 'more', 'write', 'go', 'see', 'number', 'no', 'way', 'could', 'people',
    'my', 'than', 'first', 'water', 'been', 'called', 'who', 'oil', 'sit', 'now',
    'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'
  ]
}

/**
 * All sight word lists
 */
export const sightWordLists: SightWordList[] = [
  dolchPreK,
  dolchKindergarten,
  dolchFirstGrade,
  fryFirst100
]

/**
 * Get all sight words as a Set for fast lookup
 */
export function getAllSightWords(): Set<string> {
  const allWords = new Set<string>()
  sightWordLists.forEach((list) => {
    list.words.forEach(word => allWords.add(word.toLowerCase()))
  })
  return allWords
}

/**
 * Check if a word is a sight word
 */
export function isSightWord(word: string): boolean {
  const sightWords = getAllSightWords()
  return sightWords.has(word.toLowerCase())
}

/**
 * Get sight word list by ID
 */
export function getSightWordList(id: string): SightWordList | undefined {
  return sightWordLists.find(list => list.id === id)
}

/**
 * Get sight words by level
 */
export function getSightWordsByLevel(level: number): string[] {
  const lists = sightWordLists.filter(list => list.level === level)
  return lists.flatMap(list => list.words)
}

/**
 * Get a random selection of sight words
 */
export function getRandomSightWords(count: number, level?: number): string[] {
  let words: string[] = []

  if (level !== undefined) {
    words = getSightWordsByLevel(level)
  } else {
    words = Array.from(getAllSightWords())
  }

  // Shuffle and take count
  const shuffled = words.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
