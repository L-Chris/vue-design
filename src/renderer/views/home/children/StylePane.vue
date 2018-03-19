<template>
  <section class="view">
    <codemirror ref="cm" v-model="css" :options="cmOptions" @input="handleChange"/>
  </section>
</template>

<script>
import {codemirror} from 'vue-codemirror'
import {mapGetters} from 'vuex'
import {guid} from '@/utils'
import {UPDATE_COMPONENT, ADD_COMPONENT_SLOT} from '@/store/mutation-types'
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
      if (!this.components.length) return
      let {id} = this.components[0]
      let props = {
        domProps: { innerText: innerText.replace(/[\r\n]/g, '') }
      }
      // exsits => change innerText, not exsits => create style slot
      if (this.pageCss) {
        this.$store.commit(UPDATE_COMPONENT, { id: this.pageCss.id, props })
      } else {
        let slot = {
          id: guid(),
          setting: { tag: 'style', label: 'style' },
          props
        }
        this.$store.commit(ADD_COMPONENT_SLOT, { id, slot })
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
