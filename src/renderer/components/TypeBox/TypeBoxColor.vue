<template>
  <el-color-picker v-model="value"/>
</template>

<script>
import typeBoxMixins from '@/mixins/typeBox'
export default {
  mixins: [typeBoxMixins],
  props: {
    field: {
      type: Number | String
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
