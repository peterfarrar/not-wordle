<template>
  <div class="row">
    <Tile :tileData="letters[0]"></Tile>
    <Tile :tileData="letters[1]"></Tile>
    <Tile :tileData="letters[2]"></Tile>
    <Tile :tileData="letters[3]"></Tile>
    <Tile :tileData="letters[4]"></Tile>
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

  get letters(): TileData[] {
    const rowId = parseInt(this.rowId)
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
