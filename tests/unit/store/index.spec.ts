import context from '@/store'
import { Char, LetterStatus } from '@/types'

describe('currentLetters', () => {
  beforeEach(() => {
    context.state.currentLetters = []
  })

  it('has no letters', () => {
    expect(context.getters.currentLetters.length).toBe(0)
  })

  it('can add letters', () => {
    context.dispatch('addLetterToCurrentLetters', 'T')
    expect(context.getters.currentLetters.length).toBe(1)
  })

  it('can add five letters', () => {
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    expect(context.getters.currentLetters.length).toBe(5)
  })

  it('can add no more than five letters', () => {
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    expect(context.getters.currentLetters.length).toBe(5)
  })

  it('can remove a letter', () => {
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.commit('removeLetterFromCurrentLetters')
    expect(context.getters.currentLetters.length).toBe(4)
  })

  it('can only remove a letter if at least one exists', () => {
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.commit('removeLetterFromCurrentLetters')
    context.commit('removeLetterFromCurrentLetters')
    context.commit('removeLetterFromCurrentLetters')
    context.commit('removeLetterFromCurrentLetters')
    context.commit('removeLetterFromCurrentLetters')
    expect(context.getters.currentLetters.length).toBe(0)
  })

  it('stops excepting letters when the word is guessed', () => {
    context.dispatch('setTheWord', 'steam')
    context.dispatch('addLetterToCurrentLetters', 'S')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'E')
    context.dispatch('addLetterToCurrentLetters', 'A')
    context.dispatch('addLetterToCurrentLetters', 'M')
    context.dispatch('addCurrentWordToAllWords')

    context.dispatch('addLetterToCurrentLetters', 'A')
    expect(context.getters.currentLetters.length).toBe(0)
  })
})

describe('activeRow', () => {
  beforeEach(() => {
    context.state.activeRow = 0
  })
  it('defaults to zero', () => {
    expect(context.getters.activeRow).toBe(0)
  })

  it('increments by one', () => {
    context.commit('incrementActiveRow')
    expect(context.getters.activeRow).toBe(1)
  })

  it('can increment again', () => {
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    expect(context.getters.activeRow).toBe(2)
  })

  it('can increment from 0 to 5 and no more', () => {
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    expect(context.getters.activeRow).toBe(5)
  })
})

describe('allWords', () => {
  beforeEach(() => {
    context.state.allWords = []
    context.state.activeRow = 0
    context.state.currentLetters = []
  })

  it('defaults to empty array', () => {
    expect(context.getters.allWords).toEqual([])
  })

  it('verifies the five letters are a word in the dictionary before adding them', () => {
    context.dispatch('addLetterToCurrentLetters', 'S')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'E')
    context.dispatch('addLetterToCurrentLetters', 'A')
    context.dispatch('addLetterToCurrentLetters', 'X')
    context.commit('addCurrentWordToAllWords')
    expect(context.getters.currentLetters.length).toBe(5)
    expect(context.getters.allWords).toEqual([])
  })

  it('adds a valid word to the allWords store and clears currentLetters', () => {
    context.dispatch('addLetterToCurrentLetters', 'S')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'E')
    context.dispatch('addLetterToCurrentLetters', 'A')
    context.dispatch('addLetterToCurrentLetters', 'M')
    context.dispatch('addCurrentWordToAllWords')
    expect(context.getters.currentLetters.length).toBe(0)
    expect(context.getters.allWords.length).toBe(1)
    expect(context.getters.activeRow).toBe(1)
    expect(context.getters.allWords.length).toBe(1)
  })

  it('determines the proper status for valid each letter', () => {
    context.dispatch('setTheWord', 'shout')
    context.dispatch('addLetterToCurrentLetters', 'S')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'E')
    context.dispatch('addLetterToCurrentLetters', 'A')
    context.dispatch('addLetterToCurrentLetters', 'M')
    context.dispatch('addCurrentWordToAllWords')
    expect(context.getters.allWords).toEqual([
      [
        { value: 's', status: 'right-position' },
        { value: 't', status: 'wrong-position' },
        { value: 'e', status: 'invalid-letter' },
        { value: 'a', status: 'invalid-letter' },
        { value: 'm', status: 'invalid-letter' },
      ],
    ])
  })
})

describe('usedLetters', () => {
  beforeEach(() => {
    context.state.allWords = []
    context.state.activeRow = 0
    context.state.currentLetters = []
    context.state.usedLetters = {} as Record<Char, LetterStatus>
  })

  it('adds a letters to usedLetters when a valid word is added to the allWords store', () => {
    context.dispatch('setTheWord', 'shout')
    context.dispatch('addLetterToCurrentLetters', 'S')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'E')
    context.dispatch('addLetterToCurrentLetters', 'A')
    context.dispatch('addLetterToCurrentLetters', 'M')
    context.dispatch('addCurrentWordToAllWords')
    const usedLetters = context.getters.getUsedLetters

    expect(Object.keys(usedLetters).length).toBe(5)
    expect(usedLetters).toHaveProperty('s')
    expect(usedLetters).toHaveProperty('t')
    expect(usedLetters).toHaveProperty('e')
    expect(usedLetters).toHaveProperty('a')
    expect(usedLetters).toHaveProperty('m')
    expect(usedLetters).toMatchObject({
      a: 'invalid-letter',
      e: 'invalid-letter',
      m: 'invalid-letter',
      s: 'right-position',
      t: 'wrong-position',
    })
  })
})

describe('isSolved', () => {
  beforeEach(() => {
    context.state.currentLetters = []
  })
  it('returns false when the puzzle is not yet solved', () => {
    expect(context.getters.isSolved).toBe(false)
  })

  it('returns true when the puzzle is solved', () => {
    context.dispatch('setTheWord', 'steam')
    context.dispatch('addLetterToCurrentLetters', 'S')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'E')
    context.dispatch('addLetterToCurrentLetters', 'A')
    context.dispatch('addLetterToCurrentLetters', 'M')
    context.dispatch('addCurrentWordToAllWords')

    expect(context.getters.isSolved).toBe(true)
  })
})
