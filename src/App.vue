<template>
  <div id="app">
    <Screen />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import Screen from './components/Screen.vue'
import words from './store/words'

@Component({
  components: {
    Screen,
  },
  methods: {
    ...mapActions(['setTheWord']),
  },
})
export default class App extends Vue {
  setTheWord!: (word: string) => void
  getTheWordIndex(): number {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const today: any = new Date()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const epoch: any = new Date('1970-01-01T00:00:00.001Z')
    return Math.floor(Math.abs(today - epoch) / 86400000) - 19081
  }

  created(): void {
    this.setTheWord(words[this.getTheWordIndex()])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
