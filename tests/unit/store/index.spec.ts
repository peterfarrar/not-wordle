import context from '@/store'

describe('words isValidWord', () => {
  it('returns true if word exists', async () => {
    expect(await context.dispatch('isValidWord', 'bongo')).toBe(true)
  })

  it('returns false if word does not exists', async () => {
    expect(await context.dispatch('isValidWord', 'bxngx')).toBe(false)
  })
})

describe('currentLetters', () => {
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
    expect(context.getters.currentLetters.length).toBe(5)
  })

  it('can add no more than five letters', () => {
    context.dispatch('addLetterToCurrentLetters', 'T')
    expect(context.getters.currentLetters.length).toBe(5)
  })

  it('can remove a letter', () => {
    context.commit('removeLetterFromCurrentLetters')
    expect(context.getters.currentLetters.length).toBe(4)
  })

  it('can only remove a letter if at least one exists', () => {
    context.commit('removeLetterFromCurrentLetters')
    context.commit('removeLetterFromCurrentLetters')
    context.commit('removeLetterFromCurrentLetters')
    context.commit('removeLetterFromCurrentLetters')
    context.commit('removeLetterFromCurrentLetters')
    expect(context.getters.currentLetters.length).toBe(0)
  })
})

describe('activeRow', () => {
  it('defaults to zero', () => {
    expect(context.getters.activeRow).toBe(0)
  })

  it('increments by one', () => {
    context.commit('incrementActiveRow')
    expect(context.getters.activeRow).toBe(1)
  })

  it('can increment again', () => {
    context.commit('incrementActiveRow')
    expect(context.getters.activeRow).toBe(2)
  })

  it('can increment from 0 to 5 and no more', () => {
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    context.commit('incrementActiveRow')
    expect(context.getters.activeRow).toBe(5)
  })

  it('can be reset to zero', () => {
    context.commit('resetActiveRow')
    expect(context.getters.activeRow).toBe(0)
  })
})

describe('allWords', () => {
  beforeEach(() => {
    context.state.allWords = []
    context.state.currentLetters = []
  })
  it('defaults to empty array', () => {
    expect(context.getters.allWords).toEqual([])
  })

  it('adds an array of 5 Char to the allWords store', () => {
    context.dispatch('addLetterToCurrentLetters', 'S')
    context.dispatch('addLetterToCurrentLetters', 'T')
    context.dispatch('addLetterToCurrentLetters', 'E')
    context.dispatch('addLetterToCurrentLetters', 'A')
    context.dispatch('addLetterToCurrentLetters', 'M')
    context.commit('addCurrentWordToAllWords')
    expect(context.getters.currentLetters.length).toBe(0)
    expect(context.getters.allWords.length).toBe(1)
    expect(context.getters.allWords).toEqual([['s', 't', 'e', 'a', 'm']])
  })
})
