<template>
  <button :class="classes">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Key extends Vue {
  @Prop() private label!: string
  @Prop() private type!: string
  bgcolor = 'empty'
  size = this.type || 'letter'
  classes = `key ${this.size} ${this.bgcolor}`
}
</script>

<style scoped>
button.key {
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  flex: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  margin: 0.2rem;
}

.key.empty {
  background-color: #d3d6da;
  border-color: #d3d6da;
  color: #000000;
}

.key.letter {
  width: 44px;
}
.key.not-a-letter {
  background-color: #787c7e;
  border-color: #787c7e;
  color: #ffffff;
}

.key.wrong-position {
  background-color: #c9b458;
  border-color: #c9b458;
  color: #ffffff;
}

.key.right-position {
  background-color: #6aaa64;
  border-color: #6aaa64;
  color: #ffffff;
}

.key.enter, .key.delete {
  width: 68px;
  color: #000000;
}
</style>
