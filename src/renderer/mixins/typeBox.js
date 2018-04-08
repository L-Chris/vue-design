export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      value: null
    }
  },
  watch: {
    value (val) {
      this.$emit('update:field', val)
    },
    field (val) {
      if (val !== this.value) {
        this.value = this.field
      }
    }
  },
  created () {
    this.value = this.field
  }
}
