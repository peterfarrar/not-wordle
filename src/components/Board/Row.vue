<template>
  <div class="row" :id="`row-${ourRow}`">
    <div v-if="shakeTheTiles">
      {{ shakeTile() }}
    </div>

    <Tile tileId="1" :rowId="ourRow" :tileData="letters[0]"></Tile>
    <Tile tileId="2" :rowId="ourRow" :tileData="letters[1]"></Tile>
    <Tile tileId="3" :rowId="ourRow" :tileData="letters[2]"></Tile>
    <Tile tileId="4" :rowId="ourRow" :tileData="letters[3]"></Tile>
    <Tile tileId="5" :rowId="ourRow" :tileData="letters[4]"></Tile>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import Tile from './Tile.vue'
import { Char, TileData } from '@/types'

@Component({
  components: {
    Tile,
  },
  methods: {
    ...mapGetters(['activeRow', 'currentLetters', 'allWords', 'badWord']),
  },
})
export default class Row extends Vue {
  currentLetters!: () => Char[]
  allWords!: () => TileData[][]
  activeRow!: () => number
  badWord!: () => boolean

  @Prop() private rowId!: string

  shakeTile(): void {
    if (document) {
      const thisRow = document.getElementById(`row-${this.ourRow}`)
      thisRow && thisRow.classList.add('shake')
      setTimeout(() => {
        thisRow && thisRow.classList.remove('shake')
      }, 600)
    }
  }

  get ourRow(): number {
    return parseInt(this.rowId)
  }

  get letters(): TileData[] {
    const rowId = parseInt(this.rowId) - 1
    const activeRow = this.activeRow()
    const allWords = this.allWords()
    const currentLetters = this.currentLetters()
    if (rowId > activeRow) {
      return [
        { value: '', status: 'empty' },
        { value: '', status: 'empty' },
        { value: '', status: 'empty' },
        { value: '', status: 'empty' },
        { value: '', status: 'empty' },
      ] as TileData[]
    }

    if (rowId == activeRow) {
      return [0, 1, 2, 3, 4].map((i) => {
        return currentLetters[i]
          ? { value: currentLetters[i], status: 'active-entry' }
          : { value: '', status: 'empty' }
      })
    }

    return (
      allWords[rowId] ?? [
        { value: '', status: 'empty' },
        { value: '', status: 'empty' },
        { value: '', status: 'empty' },
        { value: '', status: 'empty' },
        { value: '', status: 'empty' },
      ]
    )
  }

  get shakeTheTiles(): boolean {
    const thisRowIndex = parseInt(this.rowId) - 1
    const activeRow = this.activeRow()
    if (thisRowIndex == activeRow) {
      return this.badWord()
    }
    return false
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  position: relative;
  text-align: left;
}

@keyframes shake {
  0%,
  17% {
    transform: translate(3px);
  }
  8%,
  33% {
    transform: translate(-3px);
  }
  41%,
  58% {
    transform: translate(2px);
  }
  50%,
  67% {
    transform: translateX(-2px);
  }
  75%,
  92% {
    transform: translateX(1px);
  }
  83%,
  100% {
    transform: translateX(-1px);
  }
}

.shake {
  animation: shake 600ms;
  animation-iteration-count: infinite;
  transform: translateX(0px);
}
</style>
