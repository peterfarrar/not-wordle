import context from '@/store'

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
    context.commit('addCurrentWordToAllWords')
    expect(context.getters.currentLetters.length).toBe(0)
    expect(context.getters.allWords.length).toBe(1)
    expect(context.getters.activeRow).toBe(1)
    expect(context.getters.allWords).toEqual([
      [
        { value: 's', status: 'invalid-letter' },
        { value: 't', status: 'invalid-letter' },
        { value: 'e', status: 'invalid-letter' },
        { value: 'a', status: 'invalid-letter' },
        { value: 'm', status: 'invalid-letter' },
      ],
    ])
  })
})
