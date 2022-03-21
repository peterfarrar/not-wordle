<template>
  <div class="tile">
    <div v-if="flipTheTiles">
      {{ rotateTile() }}
    </div>
    <div :id="`row-${rowId}-tile-${tileId}-front`" :class="frontClasses">
      <h1>{{ tileData.value }}</h1>
    </div>
    <div :id="`row-${rowId}-tile-${tileId}-back`" :class="backClasses">
      <h1>{{ tileData.value }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { TileData } from '@/types'

@Component({
  methods: {
    ...mapGetters(['activeRow', 'allWords']),
  },
})
export default class Tile extends Vue {
  activeRow!: () => number
  allWords!: () => TileData[]

  @Prop() private tileData!: TileData
  @Prop() private tileId!: string
  @Prop() private rowId!: string

  rotateTile(): void {
    setTimeout(() => {
      const activeRow = this.activeRow()
      const frontId = `row-${activeRow}-tile-${this.tileId}-front`
      const backId = `row-${activeRow}-tile-${this.tileId}-back`
      if (document) {
        const front = document.getElementById(frontId)
        front && (front.style.transform = 'rotateY(0)')
        const back = document.getElementById(backId)
        back && (back.style.transform = 'rotateY(-180deg)')
      }
    }, 200 * parseInt(this.tileId))
  }

  get tileContent(): string {
    if (!['empty', 'active-entry'].includes(this.tileData.status)) {
      this.rotateTile()
    }
    return this.tileData.value
  }

  get frontClasses(): string {
    return `tile-face front ${this.tileData.status}`
  }

  get backClasses(): string {
    if (this.tileData.status == 'empty') {
      return `tile-face back empty`
    }
    return `tile-face back active-entry`
  }

  get flipTheTiles(): boolean {
    const allWords = this.allWords()
    const thisRowIndex = parseInt(this.rowId) - 1
    return allWords[thisRowIndex] ? true : false
  }
}
</script>

<style scoped>
.tile {
  position: relative;
  width: 4rem;
  height: 4rem;
  align-items: center;
  perspective: 150rem;
  -moz-perspective: 150rem;
}

.tile-face {
  width: 3.7rem;
  height: 3.7rem;
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.8s ease;
  font-size: 1.1rem;
  line-height: 1.2rem;
  font-weight: bold;
  vertical-align: middle;
  box-sizing: border-box;
  color: #ffffff;
  text-transform: uppercase;
  user-select: none;
  border: 2px;
  border-style: solid;
  margin: 0.2rem;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
}

.tile-face.front {
  transform: rotateY(-180deg);
}

.tile-face.active-entry {
  background-color: #ffffff;
  border-color: #878a8c;
  color: #000000;
}

.tile-face.empty {
  background-color: #ffffff;
  border-color: #d3d6da;
}

.tile-face.invalid-letter {
  background-color: #787c7e;
  border-color: #787c7e;
}

.tile-face.wrong-position {
  background-color: #c9b458;
  border-color: #c9b458;
}

.tile-face.right-position {
  background-color: #6aaa64;
  border-color: #6aaa64;
}
</style>
