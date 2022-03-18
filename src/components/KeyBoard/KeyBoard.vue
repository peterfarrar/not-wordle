<template>
  <div class="keyboard">
    <Row :keysData="row1Data"></Row>
    <Row :keysData="row2Data"></Row>
    <Row :keysData="row3Data"></Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Row from './Row.vue'
import { row1Data, row2Data, row3Data } from './keyBoardRows'

@Component({
  components: {
    Row,
  },
})
export default class KeyBoard extends Vue {
  row1Data = row1Data
  row2Data = row2Data
  row3Data = row3Data
}
</script>

<style scoped>
.keyboard {
  margin: 50px 0 5px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  resize: none;
}
</style>
