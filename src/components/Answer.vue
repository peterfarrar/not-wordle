<template>
  <div :class="classList">{{ theAnswer }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { TileData } from '@/types'

@Component({
  methods: {
    ...mapGetters(['getTheWord', 'isSolved', 'allWords']),
  },
})
export default class Answer extends Vue {
  getTheWord!: () => string
  isSolved!: () => boolean
  allWords!: () => TileData[][]

  get theAnswer(): string {
    let theAnswer = 'Lucky!'
    const rowsFilled = this.allWords().length
    if (rowsFilled == 2) {
      theAnswer = 'Wow!'
    }
    if (rowsFilled == 3) {
      theAnswer = 'Amazing!'
    }
    if (rowsFilled == 4) {
      theAnswer = 'Great!'
    }
    if (rowsFilled == 5) {
      theAnswer = 'Close!'
    }
    if (rowsFilled == 6) {
      theAnswer = this.getTheWord()
    }
    if (rowsFilled == 6 && this.isSolved()) {
      theAnswer = 'Phew'
    }
    return theAnswer
  }

  get classList(): string {
    return this.allWords().length == 6 || this.isSolved() ? 'end-game visible' : 'end-game'
  }
}
</script>

<style scoped>
.end-game.visible {
  visibility: visible;
  z-index: 100;
}

.end-game {
  visibility: hidden;
  position: absolute;
  top: 8%;
  left: 50%;
  background-color: #000000;
  color: #fff;
  font-size: 1.8vh;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1.5vh;
  border-radius: 0.4vh;
  width: fit-content;
  transform: translate(-50%, 0);
}
</style>
