<template>
  <div class="board">
    <Row rowId="0"></Row>
    <Row rowId="1"></Row>
    <Row rowId="2"></Row>
    <Row rowId="3"></Row>
    <Row rowId="4"></Row>
    <Row rowId="5"></Row>
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
  //   ...mapActions(['incrementActiveRow', 'resetActiveRow']),
  // },
})
export default class Board extends Vue {}
</script>
