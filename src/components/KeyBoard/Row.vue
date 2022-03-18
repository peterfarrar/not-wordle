<template>
  <div class="row">
    <Key
      v-for="keyData in keysData"
      :key="keyData.label"
      :label="keyData.label"
      :type="keyData.type"
    ></Key>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Key from './Key.vue'
import { KeyData } from '@/types'

@Component({
  components: {
    Key,
  },
})
export default class Row extends Vue {
  @Prop() private keysData!: KeyData[]
}
</script>
