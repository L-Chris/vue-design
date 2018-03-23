<template>
  <v-text-field
    v-model="value"
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

