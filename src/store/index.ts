import Vue from 'vue'
import Vuex from 'vuex'
import { Char, TileData } from '@/types'
import words from './words'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    words: words,
    currentLetters: [] as Char[],
    activeRow: 0 as number,
    allWords: [] as TileData[][],
  },
  mutations: {
    addLetterToCurrentLetters: (state, payload: Char) => {
      if (state.currentLetters.length < 5) {
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
    resetActiveRow: (state) => {
      state.activeRow = 0
    },
    addCurrentWordToAllWords: (state) => {
      if (state.allWords.length < 6 && state.currentLetters.length == 5) {
        state.allWords = [
          ...state.allWords,
          [
            ...state.currentLetters.map((letter: Char): TileData => {
              return { value: letter, status: 'invalid-letter' }
            }),
          ],
        ]
        state.currentLetters = []
      }
    },
  },

  actions: {
    addLetterToCurrentLetters: (context, payload: string) => {
      context.commit('addLetterToCurrentLetters', payload.toLowerCase())
    },
    removeLetterFromCurrentLetters: (context) => {
      context.commit('removeLetterToCurrentLetters')
    },
    clearCurrentLetters: (context) => {
      context.commit('clearCurrentLetters')
    },
    incrementActiveRow: (context) => {
      context.commit('IncrementActiveRow')
    },
    resetActiveRow: (context) => {
      context.commit('resetActiveRow')
    },
    isValidWord: (context, payload): boolean => {
      return context.state.words.has(payload)
    },
    addCurrentWordToAllWords: (context) => {
      context.commit('addCurrentWordToAllWords')
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
