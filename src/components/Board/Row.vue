<template>
  <div class="row">
    <Tile :letter="letters[0]"></Tile>
    <Tile :letter="letters[1]"></Tile>
    <Tile :letter="letters[2]"></Tile>
    <Tile :letter="letters[3]"></Tile>
    <Tile :letter="letters[4]"></Tile>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import Tile from './Tile.vue'
import { Char } from '@/types'

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
  allWords!: () => Char[][]
  activeRow!: () => number

  @Prop() private rowId!: string

  get letters(): Char[] {
    const rowId = parseInt(this.rowId)
    const activeRow = this.activeRow()
    const allWords = this.allWords()
    const currentLetters = this.currentLetters()

    if (rowId > activeRow) {
      return ['', '', '', '', ''] as Char[]
    }

    if (rowId == activeRow) {
      return [0, 1, 2, 3, 4].map((i) => {
        return currentLetters[i] ?? ('' as Char)
      })
    }

    return allWords[rowId] ?? []
  }
}
</script>
