<template>
  <div class="board">
    <Row rowId="1"></Row>
    <Row rowId="2"></Row>
    <Row rowId="3"></Row>
    <Row rowId="4"></Row>
    <Row rowId="5"></Row>
    <Row rowId="6"></Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'
import Row from './Row.vue'

@Component({
  components: {
    Row,
  },
  // methods: {
  //   ...mapGetters(['activeRow']),
  //   ...mapActions(['incrementActiveRow']),
  // },
})
export default class Board extends Vue {}
</script>

<style scoped>
.board {
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
