<template>
  <el-switch v-model="value"/>
</template>

<script>
import typeBoxMixins from '@/mixins/typeBox'
export default {
  mixins: [typeBoxMixins],
  props: {
    field: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
