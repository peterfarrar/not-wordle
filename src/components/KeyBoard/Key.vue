<template>
  <button :id="id" v-bind:class="classes">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { Char, LetterStatus } from '@/types'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  methods: {
    ...mapGetters(['getUsedLetters']),
  },
})
export default class Key extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUsedLetters!: any
  @Prop() private label!: string
  @Prop() private type!: string
  size = this.type || 'letter'
  id = `${this.label.toUpperCase()}-key`

  get classes(): string {
    const usedLetters: Record<Char, LetterStatus> = this.getUsedLetters()
    const status = usedLetters[this.label.toLowerCase() as Char] || 'empty'
    const bgcolor = this.label.length != 1 ? 'empty' : status
    const classes = `key ${this.size} ${bgcolor}`
    if (status == 'empty') {
      return classes
    }
    const key = document.getElementById(`${this.label}-key`)
    if (key) {
      setTimeout(() => {
        key.className = classes
      }, 1500)
      return key.className
    }
    return ''
  }
}
</script>

<style scoped>
.key {
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
.key.invalid-letter {
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

.key.enter,
.key.delete {
  width: 68px;
  color: #000000;
}
</style>
