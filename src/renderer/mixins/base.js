export default {
  methods: {
    linkTo (path) {
      this.$router.push(path)
    },
    replaceTo (path) {
      this.$router.replace(path)
    }
  }
}
