import { useLocalStorage } from '@vueuse/core'

export interface Sound {
  letter: string
  type: 'continuous' | 'stop'
}

export interface Word {
  text: string
  sounds: Sound[]
}

export interface Lesson {
  id: number
  title: string
  words: string[]
}

export interface LearnProgress {
  currentLesson: number
  completedLessons: number[]
  wordMastery: Record<string, number>
  lastActivity: string
}

// Sound classification - continuous sounds can be held, stop sounds are quick
const CONTINUOUS_SOUNDS = new Set(['a', 'e', 'i', 'o', 'u', 'f', 'l', 'm', 'n', 'r', 's', 'v', 'w', 'y', 'z'])

export function getSoundType(letter: string): 'continuous' | 'stop' {
  return CONTINUOUS_SOUNDS.has(letter.toLowerCase()) ? 'continuous' : 'stop'
}

export function parseWord(text: string): Word {
  return {
    text,
    sounds: text.split('').map(letter => ({
      letter,
      type: getSoundType(letter)
    }))
  }
}

// Hardcoded lessons for MVP
export const LESSONS: Record<number, Lesson> = {
  1: { id: 1, title: 'Short A', words: ['cat', 'sat', 'mat', 'hat', 'bat'] },
  2: { id: 2, title: 'Short A', words: ['can', 'man', 'pan', 'fan', 'rat'] },
  3: { id: 3, title: 'Short E', words: ['get', 'set', 'wet', 'pet', 'let'] },
  4: { id: 4, title: 'Short E', words: ['bed', 'red', 'fed', 'hen', 'pen'] },
  5: { id: 5, title: 'Short I', words: ['sit', 'hit', 'bit', 'fit', 'pit'] }
}

const DEFAULT_PROGRESS: LearnProgress = {
  currentLesson: 1,
  completedLessons: [],
  wordMastery: {},
  lastActivity: new Date().toISOString()
}

export function useLearnProgress() {
  const progress = useLocalStorage<LearnProgress>('learn-progress', DEFAULT_PROGRESS)

  function markLessonComplete(lessonId: number) {
    if (!progress.value.completedLessons.includes(lessonId)) {
      progress.value.completedLessons.push(lessonId)
    }
    progress.value.lastActivity = new Date().toISOString()
  }

  function incrementWordMastery(word: string) {
    const current = progress.value.wordMastery[word] || 0
    progress.value.wordMastery[word] = current + 1
    progress.value.lastActivity = new Date().toISOString()
  }

  function setCurrentLesson(lessonId: number) {
    progress.value.currentLesson = lessonId
    progress.value.lastActivity = new Date().toISOString()
  }

  function resetProgress() {
    progress.value = { ...DEFAULT_PROGRESS, lastActivity: new Date().toISOString() }
  }

  function isLessonUnlocked(lessonId: number): boolean {
    // First lesson always unlocked
    if (lessonId === 1) return true
    // Other lessons unlocked if previous is completed
    return progress.value.completedLessons.includes(lessonId - 1)
  }

  return {
    progress: readonly(progress),
    markLessonComplete,
    incrementWordMastery,
    setCurrentLesson,
    resetProgress,
    isLessonUnlocked
  }
}
