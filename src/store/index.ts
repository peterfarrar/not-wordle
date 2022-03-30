import Vue from 'vue'
import Vuex from 'vuex'
import { Char, TileData } from '@/types'
import words from './words'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    words: new Set<string>(words),
    currentLetters: [] as Char[],
    activeRow: 0 as number,
    allWords: [] as TileData[][],
    theWord: 'place' as string,
    solved: false as boolean,
  },
  mutations: {
    addLetterToCurrentLetters: (state, payload: Char) => {
      if (state.currentLetters.length < 5 && state.solved == false) {
        state.currentLetters = [...state.currentLetters, payload]
      }
    },
    removeLetterFromCurrentLetters: (state) => {
      if (state.currentLetters.length > 0) {
        state.currentLetters = [...state.currentLetters].slice(0, -1)
      }
    },
    incrementActiveRow: (state) => {
      if (state.activeRow < 5) {
        state.activeRow++
      }
    },
    addCurrentWordToAllWords: (state) => {
      if (state.allWords.length < 6 && state.currentLetters.length == 5) {
        if (state.words.has(state.currentLetters.join(''))) {
          const theseLetters = state.theWord.split('')
          state.allWords = [
            ...state.allWords,
            [
              ...state.currentLetters.map((value: Char, i: number): TileData => {
                let status = 'invalid-letter'
                if (theseLetters.includes(value)) {
                  status = 'wrong-position'
                }
                if (theseLetters[i] == value) {
                  status = 'right-position'
                }
                return { value, status } as TileData
              }),
            ],
          ]
          if (
            state.allWords[state.activeRow].reduce((acc, val): boolean => {
              if (acc == true && val.status != 'right-position') {
                return false
              }
              return acc
            }, true)
          ) {
            state.solved = true
          }
          state.currentLetters = []
          state.activeRow++
        }
      }
    },
    setTheWord: (state, theWord: string) => {
      state.theWord = theWord
    },
  },

  actions: {
    addLetterToCurrentLetters: (context, payload: string) => {
      context.commit('addLetterToCurrentLetters', payload.toLowerCase())
    },
    removeLetterFromCurrentLetters: (context) => {
      context.commit('removeLetterFromCurrentLetters')
    },
    incrementActiveRow: (context) => {
      context.commit('IncrementActiveRow')
    },
    addCurrentWordToAllWords: (context) => {
      context.commit('addCurrentWordToAllWords')
    },
    setTheWord: (context, theWord: string) => {
      context.commit('setTheWord', theWord)
    },
  },
  modules: {},
  getters: {
    currentLetters: (store) => {
      return store.currentLetters
    },
    activeRow: (store) => {
      return store.activeRow
    },
    allWords: (store) => {
      return store.allWords
    },
  },
})
