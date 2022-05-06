<template>
  <div :class="classList" id="the-answer">{{ theAnswer }}</div>
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
      theAnswer = 'Close call!'
    }
    if (rowsFilled == 6) {
      theAnswer = this.getTheWord()
    }
    if (rowsFilled == 6 && this.isSolved()) {
      theAnswer = 'Phew!'
    }
    return theAnswer
  }

  get classList(): string {
    if (this.allWords().length == 6 || this.isSolved()) {
      setTimeout(() => {
        const answer = document.getElementById('the-answer')
        answer && answer.classList.add('visible')
        setTimeout(() => {
          answer && answer.classList.add('invisible')
          answer && answer.classList.remove('visible')
          setTimeout(() => {
            answer && answer.classList.remove('invisible')
          }, 1900)
        }, 4800)
      }, 1600)
    }
    return 'end-game'
  }
}
</script>

<style scoped>
.end-game.visible {
  visibility: visible;
  z-index: 100;
  animation: fadeIn ease 2s;
}

.end-game.invisible {
  visibility: visible;
  z-index: 100;
  animation: fadeOut ease 2s;
}

.end-game {
  visibility: hidden;
  position: absolute;
  top: 9%;
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

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
