<template>
  <v-text-field
    v-model="value"
    :placeholder="config.default"
    :required="config.required"
    single-line
  />
</template>

<script>
import typeBoxMixins from '@/mixins/typeBox'
export default {
  mixins: [typeBoxMixins],
  props: {
    field: {
      type: String,
      default: ''
    }
  }
}
</script>

