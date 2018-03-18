import {parsePath} from '@/utils'

export default {
  methods: {
    linkTo (path) {
      this.$router.push(path)
    },
    replaceTo (path) {
      this.$router.replace(path)
    },
    parsePath
  }
}
