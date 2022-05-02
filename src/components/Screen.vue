<template>
  <div class="hello">
    <h1>Not Wordle</h1>
    <Answer />
    <Board />
    <KeyBoard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'
import Answer from '@/components/Answer.vue'
import Board from '@/components/Board/Board.vue'
import KeyBoard from '@/components/KeyBoard/KeyBoard.vue'
import { Char } from '@/types'
import isChar from '@/types/isChar'
// import context from '@/store'

@Component({
  methods: {
    ...mapGetters(['currentLetters', 'allWords']),
    ...mapActions([
      'addCurrentWordToAllWords',
      'addLetterToCurrentLetters',
      'removeLetterFromCurrentLetters',
    ]),
  },
  components: {
    Answer,
    Board,
    KeyBoard,
  },
})
export default class Screen extends Vue {
  addCurrentWordToAllWords!: () => void
  addLetterToCurrentLetters!: (letter: Char) => void
  removeLetterFromCurrentLetters!: () => void
  currentLetters!: () => Char[]
  allWords!: () => Char[][]
  activeRow!: () => number

  handleKeydown(event: KeyboardEvent): void {
    const key = event.key
    const currentLetters = this.currentLetters()
    const allWords = this.allWords()
    if (key.length == 1 || isChar(key)) {
      if (currentLetters.length < 5 && allWords.length < 6) {
        this.addLetterToCurrentLetters(key as Char)
      }
    }
    if (key == 'Backspace') {
      if (currentLetters.length > 0) {
        this.removeLetterFromCurrentLetters()
      }
    }
    if (key == 'Enter') {
      this.addCurrentWordToAllWords()
    }
  }

  created(): void {
    window.addEventListener('keydown', this.handleKeydown)
  }

  destroyed(): void {
    window.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Times New Roman', Times, serif;
  font-size: 37px;
  font-weight: 900;
}
h3 {
  margin: 20px 0 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
