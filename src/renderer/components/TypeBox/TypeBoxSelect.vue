<template>
  <v-select v-model="value" :items="config.data" item-text="label" clearable/>
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
