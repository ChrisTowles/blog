// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { getSoundType, parseWord, LESSONS } from './useLearnProgress'

describe('getSoundType', () => {
  it('should classify vowels as continuous', () => {
    expect(getSoundType('a')).toBe('continuous')
    expect(getSoundType('e')).toBe('continuous')
    expect(getSoundType('i')).toBe('continuous')
    expect(getSoundType('o')).toBe('continuous')
    expect(getSoundType('u')).toBe('continuous')
  })

  it('should classify continuous consonants correctly', () => {
    expect(getSoundType('f')).toBe('continuous')
    expect(getSoundType('l')).toBe('continuous')
    expect(getSoundType('m')).toBe('continuous')
    expect(getSoundType('n')).toBe('continuous')
    expect(getSoundType('r')).toBe('continuous')
    expect(getSoundType('s')).toBe('continuous')
    expect(getSoundType('v')).toBe('continuous')
    expect(getSoundType('w')).toBe('continuous')
    expect(getSoundType('y')).toBe('continuous')
    expect(getSoundType('z')).toBe('continuous')
  })

  it('should classify stop consonants correctly', () => {
    expect(getSoundType('b')).toBe('stop')
    expect(getSoundType('c')).toBe('stop')
    expect(getSoundType('d')).toBe('stop')
    expect(getSoundType('g')).toBe('stop')
    expect(getSoundType('h')).toBe('stop')
    expect(getSoundType('j')).toBe('stop')
    expect(getSoundType('k')).toBe('stop')
    expect(getSoundType('p')).toBe('stop')
    expect(getSoundType('q')).toBe('stop')
    expect(getSoundType('t')).toBe('stop')
    expect(getSoundType('x')).toBe('stop')
  })

  it('should handle uppercase letters', () => {
    expect(getSoundType('A')).toBe('continuous')
    expect(getSoundType('B')).toBe('stop')
    expect(getSoundType('M')).toBe('continuous')
    expect(getSoundType('T')).toBe('stop')
  })
})

describe('parseWord', () => {
  it('should parse a CVC word with stop-continuous-stop pattern', () => {
    const result = parseWord('cat')
    expect(result.text).toBe('cat')
    expect(result.sounds).toHaveLength(3)
    expect(result.sounds[0]).toEqual({ letter: 'c', type: 'stop' })
    expect(result.sounds[1]).toEqual({ letter: 'a', type: 'continuous' })
    expect(result.sounds[2]).toEqual({ letter: 't', type: 'stop' })
  })

  it('should parse a word with all continuous sounds', () => {
    const result = parseWord('sun')
    expect(result.sounds[0]).toEqual({ letter: 's', type: 'continuous' })
    expect(result.sounds[1]).toEqual({ letter: 'u', type: 'continuous' })
    expect(result.sounds[2]).toEqual({ letter: 'n', type: 'continuous' })
  })

  it('should parse a word starting with continuous sound', () => {
    const result = parseWord('man')
    expect(result.sounds[0]).toEqual({ letter: 'm', type: 'continuous' })
    expect(result.sounds[1]).toEqual({ letter: 'a', type: 'continuous' })
    expect(result.sounds[2]).toEqual({ letter: 'n', type: 'continuous' })
  })

  it('should parse a word ending with continuous sound', () => {
    const result = parseWord('him')
    expect(result.sounds[0]).toEqual({ letter: 'h', type: 'stop' })
    expect(result.sounds[1]).toEqual({ letter: 'i', type: 'continuous' })
    expect(result.sounds[2]).toEqual({ letter: 'm', type: 'continuous' })
  })
})

describe('LESSONS', () => {
  it('should have lessons 1-5 defined', () => {
    expect(LESSONS[1]).toBeDefined()
    expect(LESSONS[2]).toBeDefined()
    expect(LESSONS[3]).toBeDefined()
    expect(LESSONS[4]).toBeDefined()
    expect(LESSONS[5]).toBeDefined()
  })

  it('should have correct structure for each lesson', () => {
    Object.values(LESSONS).forEach((lesson) => {
      expect(lesson.id).toBeTypeOf('number')
      expect(lesson.title).toBeTypeOf('string')
      expect(Array.isArray(lesson.words)).toBe(true)
      expect(lesson.words.length).toBeGreaterThan(0)
    })
  })

  it('should have CVC words in lesson 1', () => {
    const lesson1 = LESSONS[1]!
    expect(lesson1.title).toContain('Short A')
    lesson1.words.forEach((word) => {
      expect(word.length).toBe(3) // CVC words are 3 letters
      expect(word).toMatch(/[aeiou]/) // Contains a vowel
    })
  })

  it('lesson 1 words should all contain short a', () => {
    const lesson1Words = LESSONS[1]!.words
    lesson1Words.forEach((word) => {
      expect(word.toLowerCase()).toContain('a')
    })
  })

  it('lesson 3 words should all contain short e', () => {
    const lesson3Words = LESSONS[3]!.words
    lesson3Words.forEach((word) => {
      expect(word.toLowerCase()).toContain('e')
    })
  })
})
