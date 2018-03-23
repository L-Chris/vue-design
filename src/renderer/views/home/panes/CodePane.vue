<template>
  <section class="view">
    <codemirror ref="cm" :value="code" :options="cmOptions"/>
  </section>
</template>

<script>
import pretty from 'pretty'
import {codemirror} from 'vue-codemirror'
import {mapGetters} from 'vuex'
import {stringifyTemplate} from '@/utils/component'
import 'codemirror/lib/codemirror.css'
export default {
  components: {
    codemirror
  },
  data () {
    return {
      cmOptions: {
        tabSize: 2,
        theme: 'base16-dark',
        readOnly: true,
        lineNumbers: true,
        line: true
      }
    }
  },
  computed: {
    ...mapGetters(['components', 'pageCss']),
    code () {
      return pretty(`${this.template}${this.scripts}${this.styles}`)
    },
    template () {
      return `<template>${stringifyTemplate(this.components)}</template>`
    },
    scripts () {
      /* eslint-disable */
      return `<script>export default {}<\/script>`
    },
    styles () {
      return `<style lang="css" scoped>${this.pageCss ? this.pageCss.props.domProps.innerText : ''}</style>`
    }
  },
  activated () {
    this.$refs['cm'].codemirror.refresh()
  }
}
</script>

<style lang="scss">
.CodeMirror {
  height: auto;
}
</style>

