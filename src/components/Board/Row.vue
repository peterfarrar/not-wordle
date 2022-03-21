<template>
  <div class="row" :id="ourRow">
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
    ...mapGetters(['activeRow', 'currentLetters', 'allWords']),
  },
})
export default class Row extends Vue {
  currentLetters!: () => Char[]
  allWords!: () => TileData[][]
  activeRow!: () => number

  @Prop() private rowId!: string

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
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  position: relative;
  text-align: left;
}
</style>
