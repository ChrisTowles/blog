/**
 * Phoneme definitions for the KidsReader app
 *
 * Categories:
 * - slow: Continuous sounds that can be stretched (blue sliders)
 * - fast: Stop sounds that are quick bursts (red sliders)
 * - sight: Sight word marker (orange sliders)
 */

export type PhonemeCategory = 'slow' | 'fast' | 'sight'

export interface Phoneme {
  id: string
  symbol: string // The letter(s) representing this phoneme
  category: PhonemeCategory
  color: 'blue' | 'red' | 'orange'
  sound: string // IPA or description
  examples: string[] // Example words
}

export const phonemes: Phoneme[] = [
  // Vowels (all slow sounds - can be stretched)
  {
    id: 'a-short',
    symbol: 'a',
    category: 'slow',
    color: 'blue',
    sound: '/æ/',
    examples: ['cat', 'mat', 'sat', 'hat']
  },
  {
    id: 'e-short',
    symbol: 'e',
    category: 'slow',
    color: 'blue',
    sound: '/ɛ/',
    examples: ['bed', 'red', 'pet', 'net']
  },
  {
    id: 'i-short',
    symbol: 'i',
    category: 'slow',
    color: 'blue',
    sound: '/ɪ/',
    examples: ['sit', 'hit', 'bit', 'lit']
  },
  {
    id: 'o-short',
    symbol: 'o',
    category: 'slow',
    color: 'blue',
    sound: '/ɒ/',
    examples: ['hot', 'pot', 'dot', 'got']
  },
  {
    id: 'u-short',
    symbol: 'u',
    category: 'slow',
    color: 'blue',
    sound: '/ʌ/',
    examples: ['cup', 'run', 'sun', 'fun']
  },

  // Consonants - Slow sounds (continuous)
  {
    id: 'm',
    symbol: 'm',
    category: 'slow',
    color: 'blue',
    sound: '/m/',
    examples: ['mom', 'mat', 'man', 'map']
  },
  {
    id: 's',
    symbol: 's',
    category: 'slow',
    color: 'blue',
    sound: '/s/',
    examples: ['sun', 'sat', 'sit', 'sap']
  },
  {
    id: 'f',
    symbol: 'f',
    category: 'slow',
    color: 'blue',
    sound: '/f/',
    examples: ['fan', 'fish', 'fun', 'fat']
  },
  {
    id: 'l',
    symbol: 'l',
    category: 'slow',
    color: 'blue',
    sound: '/l/',
    examples: ['lip', 'lot', 'lap', 'lit']
  },
  {
    id: 'n',
    symbol: 'n',
    category: 'slow',
    color: 'blue',
    sound: '/n/',
    examples: ['net', 'not', 'nap', 'nut']
  },
  {
    id: 'r',
    symbol: 'r',
    category: 'slow',
    color: 'blue',
    sound: '/r/',
    examples: ['run', 'rat', 'red', 'rip']
  },
  {
    id: 'v',
    symbol: 'v',
    category: 'slow',
    color: 'blue',
    sound: '/v/',
    examples: ['van', 'vet', 'vat']
  },
  {
    id: 'z',
    symbol: 'z',
    category: 'slow',
    color: 'blue',
    sound: '/z/',
    examples: ['zip', 'zap', 'zoo']
  },
  {
    id: 'w',
    symbol: 'w',
    category: 'slow',
    color: 'blue',
    sound: '/w/',
    examples: ['wet', 'win', 'wag']
  },
  {
    id: 'y',
    symbol: 'y',
    category: 'slow',
    color: 'blue',
    sound: '/j/',
    examples: ['yes', 'yet', 'yam']
  },

  // Consonants - Fast sounds (stop consonants)
  {
    id: 'b',
    symbol: 'b',
    category: 'fast',
    color: 'red',
    sound: '/b/',
    examples: ['bat', 'bit', 'bug', 'bus']
  },
  {
    id: 'c',
    symbol: 'c',
    category: 'fast',
    color: 'red',
    sound: '/k/',
    examples: ['cat', 'cap', 'cup', 'cop']
  },
  {
    id: 'd',
    symbol: 'd',
    category: 'fast',
    color: 'red',
    sound: '/d/',
    examples: ['dog', 'dig', 'dad', 'dot']
  },
  {
    id: 'g',
    symbol: 'g',
    category: 'fast',
    color: 'red',
    sound: '/g/',
    examples: ['got', 'gap', 'gum', 'get']
  },
  {
    id: 'h',
    symbol: 'h',
    category: 'fast',
    color: 'red',
    sound: '/h/',
    examples: ['hat', 'hot', 'hit', 'hop']
  },
  {
    id: 'j',
    symbol: 'j',
    category: 'fast',
    color: 'red',
    sound: '/dʒ/',
    examples: ['jet', 'jog', 'jam']
  },
  {
    id: 'k',
    symbol: 'k',
    category: 'fast',
    color: 'red',
    sound: '/k/',
    examples: ['kit', 'kid', 'ken']
  },
  {
    id: 'p',
    symbol: 'p',
    category: 'fast',
    color: 'red',
    sound: '/p/',
    examples: ['pat', 'pot', 'pit', 'pup']
  },
  {
    id: 'q',
    symbol: 'q',
    category: 'fast',
    color: 'red',
    sound: '/kw/',
    examples: ['quit', 'quiz', 'queen']
  },
  {
    id: 't',
    symbol: 't',
    category: 'fast',
    color: 'red',
    sound: '/t/',
    examples: ['top', 'tap', 'tip', 'tug']
  },
  {
    id: 'x',
    symbol: 'x',
    category: 'fast',
    color: 'red',
    sound: '/ks/',
    examples: ['box', 'fox', 'tax']
  },

  // Common digraphs - Slow sounds
  {
    id: 'sh',
    symbol: 'sh',
    category: 'slow',
    color: 'blue',
    sound: '/ʃ/',
    examples: ['ship', 'shop', 'fish', 'dish']
  },
  {
    id: 'th-voiced',
    symbol: 'th',
    category: 'slow',
    color: 'blue',
    sound: '/ð/',
    examples: ['this', 'that', 'them']
  },
  {
    id: 'th-unvoiced',
    symbol: 'th',
    category: 'slow',
    color: 'blue',
    sound: '/θ/',
    examples: ['thin', 'thick', 'math']
  },

  // Common digraphs - Fast sounds
  {
    id: 'ch',
    symbol: 'ch',
    category: 'fast',
    color: 'red',
    sound: '/tʃ/',
    examples: ['chin', 'chip', 'chat', 'chop']
  },
  {
    id: 'ck',
    symbol: 'ck',
    category: 'fast',
    color: 'red',
    sound: '/k/',
    examples: ['back', 'kick', 'neck', 'duck']
  },

  // Sight word marker (used for words that don't follow phonics rules)
  {
    id: 'sight',
    symbol: '•',
    category: 'sight',
    color: 'orange',
    sound: 'sight word',
    examples: ['the', 'said', 'was', 'could']
  }
]

/**
 * Get a phoneme by its ID
 */
export function getPhonemeById(id: string): Phoneme | undefined {
  return phonemes.find(p => p.id === id)
}

/**
 * Get phonemes by category
 */
export function getPhonemesByCategory(category: PhonemeCategory): Phoneme[] {
  return phonemes.filter(p => p.category === category)
}

/**
 * Get the color for a phoneme symbol
 */
export function getPhonemeColor(symbol: string): 'blue' | 'red' | 'orange' {
  const phoneme = phonemes.find(p => p.symbol === symbol)
  return phoneme?.color ?? 'blue'
}
