<template>
  <section id="wrapper" class="workspace view" @mousedown="selectComponent" @drop="handleDrop" @dragover.prevent="()=>{}">
    <div ref="menu" :style="menu.style"/>
    <v-menu v-model="menu.visible" :activator="$refs['menu']">
      <v-list>
        <v-list-tile disabled>
          <v-list-tile-title>{{selectedComponent ? selectedComponent.label : ''}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-ripple="true" @click="handleDeleteComponent">
          <v-list-tile-title>删除</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
import Vue from 'vue'
import {mapState, mapGetters, mapActions} from 'vuex'
import {SET_SELECTED_COMPONENT, SET_SELECTED_BLOCK} from '@/store/mutation-types'
import {guid} from '@/utils'
export default {
  data () {
    return {
      menu: {
        visible: false,
        style: {}
      }
    }
  },
  computed: {
    ...mapState(['selectedBlock']),
    ...mapGetters(['components', 'selectedComponent', 'pageId'])
  },
  watch: {
    selectedComponent (val) {
      if (!val) {
        this.resetMenu()
      }
    },
    '$route.query.id' () {
      this.reRender()
    }
  },
  methods: {
    ...mapActions(['addComponent', 'deleteComponent']),
    resetMenu () {
      this.menu = {
        visible: false,
        style: {}
      }
    },
    createElement (target, id = guid()) {
      let element = document.createElement('div')
      element.id = id
      target.appendChild(element)
      return element
    },
    updateComponent ({id, props}) {
      let that = this
      const instance = new Vue({
        el: document.getElementById(id),
        render (h) {
          let component = that.$store.state[that.pageId].components.find(_ => _.id === id)
          if (!component) return this.$destroy()
          return h(component.tag, {props: props || component.props})
        }
      })
      instance.$mount()
      instance.$el.id = id
      return instance
    },
    reRender (components = this.components) {
      components.forEach(({id, parent}) => {
        let target = document.getElementById(parent)
        this.createElement(target, id)
        this.updateComponent({id})
      })
    },
    handleDrop ({target}) {
      if (!this.selectedBlock) return
      let {tag, label, props: $props, setting} = this.selectedBlock
      let {id} = this.createElement(target)
      let props = Object.entries($props).reduce((pre, [key, val]) => {
        pre[key] = val.default
        return pre
      }, {})
      let component = {id, parent: target.id, tag, label, props, setting}
      this.addComponent(component)
      this.updateComponent({id})
      this.$store.commit(SET_SELECTED_BLOCK, null)
    },
    selectComponent ({button, path, x, y}) {
      // left or right click
      if (![0, 2].includes(button) || !path.length) return
      this.resetMenu()
      let component = null
      for (let element of path) {
        if (!element.id) continue
        component = this.components.find(_ => _.id === element.id)
        if (component) {
          this.$store.commit(SET_SELECTED_COMPONENT, component)
          break
        }
      }
      // if right click show menu
      if (!component || button === 0) return
      this.$nextTick(() => {
        this.menu = {
          visible: true,
          style: {
            position: 'fixed',
            left: `${x + 10}px`,
            top: `${y + 10}px`
          }
        }
      })
    },
    handleDeleteComponent () {
      this.deleteComponent(this.selectedComponent)
    }
  }
}
</script>

<style lang="scss">
.menuable__content__active {
  z-index: 9999!important;
}
</style>
