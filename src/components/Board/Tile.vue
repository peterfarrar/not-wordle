<template>
  <div :class="classes">
    <h1>{{ letter }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Tile extends Vue {
  bgcolor = 'empty'
  classes = `tile ${this.bgcolor}`
  @Prop() private letter!: string
}
</script>

<style scoped>
.tile {
  width: 4rem;
  height: 4rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
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
}

.tile.empty {
  background-color: #ffffff;
  border-color: #d3d6da;
}

.tile.not-a-letter {
  background-color: #787c7e;
  border-color: #787c7e;
}

.tile.wrong-position {
  background-color: #c9b458;
  border-color: #c9b458;
}

.tile.right-position {
  background-color: #6aaa64;
  border-color: #6aaa64;
}
</style>