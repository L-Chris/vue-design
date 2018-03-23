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
    }
  },
  created () {
    this.value = this.field
  }
}
