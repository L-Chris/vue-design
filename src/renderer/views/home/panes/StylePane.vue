<template>
  <section class="view">
    <codemirror ref="cm" v-model="css" :options="cmOptions" @input="handleChange"/>
  </section>
</template>

<script>
import {codemirror} from 'vue-codemirror'
import {mapGetters} from 'vuex'
import {guid} from '@/utils'
import {UPDATE_COMPONENT, ADD_COMPONENT} from '@/store/mutation-types'
export default {
  components: {
    codemirror
  },
  data () {
    return {
      css: '',
      cmOptions: {
        tabSize: 2,
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    }
  },
  computed: {
    ...mapGetters(['components', 'pageCss'])
  },
  watch: {
    '$route.query.id' () {
      this.resetCss()
    }
  },
  methods: {
    handleChange (innerText) {
      let props = {
        domProps: { innerText: innerText.replace(/[\r\n]/g, '') }
      }
      // exsits => change innerText, not exsits => create style slot
      if (this.pageCss) {
        this.$store.commit(UPDATE_COMPONENT, { id: this.pageCss.id, props })
      } else {
        this.$store.commit(ADD_COMPONENT, {
          id: guid(),
          parent: 'wrapper',
          setting: { tag: 'style', label: 'style' },
          props
        })
      }
    },
    resetCss () {
      this.css = this.pageCss ? this.pageCss.props.domProps.innerText : ''
    }
  },
  activated () {
    this.resetCss()
  }
}
</script>

<style lang="scss">
.CodeMirror {
  height: auto;
}
</style>
