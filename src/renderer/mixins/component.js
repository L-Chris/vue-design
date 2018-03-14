import Vue from 'vue'
import {mapGetters} from 'vuex'
import {createElement, recursiveFindBy} from '@/utils'

export default {
  computed: {
    ...mapGetters(['components'])
  },
  methods: {
    createComponent ({id}) {
      let that = this
      const instance = new Vue({
        el: document.getElementById(id),
        render (h) {
          let component = recursiveFindBy(that.components, _ => _.id === id, 'props.slots')
          // if (!component) return this.$destroy()
          if (!component) return
          let {tag, props} = component
          return h(tag, { props, attrs: { id } })
        }
      })
      instance.$mount()
      return instance
    },
    reRender (components = this.components) {
      components.forEach(({id, parent}) => {
        let target = document.getElementById(parent)
        createElement(target, id)
        this.createComponent({id})
      })
    }
  }
}
