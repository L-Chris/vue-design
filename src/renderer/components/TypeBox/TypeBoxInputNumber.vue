<template>
  <el-input-number v-model="value" :step="1" size="mini"/>
</template>

<script>
import typeBoxMixins from '@/mixins/typeBox'
export default {
  mixins: [typeBoxMixins],
  props: {
    field: {
      type: Number,
      default: ''
    }
  }
}
</script>

