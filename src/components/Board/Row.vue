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
import { mapActions, mapGetters } from 'vuex'
import Tile from './Tile.vue'

@Component({
  components: {
    Tile,
  },
  methods: {
    ...mapGetters(['currentLetters']),
    ...mapActions(['addLetterToCurrentLetters', 'removeLetterFromCurrentLetters']),
  },
})
export default class Row extends Vue {
  letters = ['', '', '', '', '']
  @Prop() private rowId!: string
}
</script>
