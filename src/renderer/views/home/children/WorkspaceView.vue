<template>
  <section id="wrapper" class="workspace view" @mousedown="handleMouseDown" @drop="handleDrop" @dragover.prevent="handleDragOver">
    <!-- 右键菜单 -->
    <div ref="menu" class="menu" :style="menu.style"/>
    <v-menu v-model="menu.visible" :activator="$refs['menu']" max-width="120">
      <v-list>
        <v-list-tile disabled>
          <v-list-tile-title>{{selectedComponent ? selectedComponent.label : ''}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-ripple="true" @click="handleDeleteComponent">
          <v-list-tile-title>删除</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <!-- slot菜单 -->
    <div ref="slotMenu" class="menu" :style="slotMenu.style"/>
    <v-menu v-model="slotMenu.visible" :activator="$refs['slotMenu']" max-width="120">
      <v-list>
        <v-list-tile v-ripple="true" v-for="_ in slotMenu.slots" :key="_.name" @drop.stop="handleDropInSlot(_.name)" @dragover.prevent="()=>{}">
          <v-list-tile-title>{{_.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
import Vue from 'vue'
import throttle from 'lodash.throttle'
import {mapState, mapGetters, mapActions} from 'vuex'
import {SET_SELECTED_COMPONENT, SET_SELECTED_BLOCK, UPDATE_COMPONENT} from '@/store/mutation-types'
import {createElement, guid, recursiveFindBy} from '@/utils'
export default {
  data () {
    return {
      menu: {
        visible: false,
        style: {}
      },
      slotMenu: {
        visible: false,
        style: {}
      }
    }
  },
  computed: {
    ...mapState(['selectedBlock']),
    ...mapGetters(['components', 'selectedComponent'])
  },
  watch: {
    selectedComponent (val) {
      !val && this.resetMenu(this.menu)
    }
  },
  methods: {
    ...mapActions(['addComponent', 'deleteComponent']),
    resetMenu (menu) {
      Object.assign(menu, {
        visible: false,
        style: {
          left: '0px',
          top: '0px'
        }
      })
    },
    showMenu (menu, {x, y, slots}) {
      Object.assign(menu, {
        visible: true,
        slots,
        style: {
          left: `${x - 48}px`,
          top: `${y - 64}px`
        }
      })
    },
    createComponent ({id}) {
      let that = this
      const instance = new Vue({
        el: document.getElementById(id),
        render (h) {
          let component = recursiveFindBy(that.components, _ => _.id === id, 'props.slots')
          // if (!component) return this.$destroy()
          if (!component) return
          let {tag, props} = component
          return h(tag, { props })
        }
      })
      instance.$mount()
      instance.$el.id = id
      return instance
    },
    // 根据所选block创建组件信息
    createComponentInfo (id, parent) {
      let {tag, label, props: $props, setting} = this.selectedBlock
      let props = Object.entries($props).reduce((pre, [key, val]) => {
        pre[key] = val.default
        return pre
      }, {})
      return {id, parent, tag, label, props, setting, slots: []}
    },
    // drop触发组件挂载
    handleDrop ({target}) {
      if (!this.selectedBlock) return
      let {id} = createElement(target)
      let component = this.createComponentInfo(id, target.id)
      this.addComponent(component)
      this.createComponent({id})
      this.$store.commit(SET_SELECTED_BLOCK, null)
    },
    handleDropInSlot (name) {
      if (!this.selectedBlock || !this.selectedComponent) return
      let component = this.createComponentInfo(guid().toString(), this.selectedComponent.id)
      component.slot = name
      let selectedComponent = JSON.parse(JSON.stringify(this.selectedComponent))
      selectedComponent.props.slots.push(component)
      selectedComponent.slots.push(component)
      this.$store.commit(UPDATE_COMPONENT, selectedComponent)
      this.resetMenu(this.slotMenu)
      this.$store.commit(SET_SELECTED_BLOCK, null)
    },
    // dragover触发slot提示
    handleDragOver: throttle(function ({path, x, y}) {
      this.resetMenu(this.slotMenu)
      let component = this.selectComponent(path)
      if (!component) return
      let slots = component.setting.config[2].children
      this.$nextTick(() => this.showMenu(this.slotMenu, {x, y, slots}))
    }, 100),
    // drag移出菜单时将其隐藏
    handleDragleaveFromSlot () {
      this.resetMenu(this.slotMenu)
    },
    // 全局捕获鼠标点击，选择组件
    handleMouseDown ({button, path, x, y}) {
      // left or right click
      if (![0, 2].includes(button) || !path.length) return
      this.resetMenu(this.menu)
      let component = this.selectComponent(path)
      // if right click show menu
      if (!component || button === 0) return
      this.$nextTick(() => this.showMenu(this.menu, {x, y}))
    },
    handleDeleteComponent () {
      this.deleteComponent(this.selectedComponent)
    },
    selectComponent (path) {
      let component = null
      for (let element of path) {
        if (!element.id) continue
        component = recursiveFindBy(this.components, _ => _.id === element.id, 'props.slots')
        if (component) {
          this.$store.commit(SET_SELECTED_COMPONENT, component)
          return component
        }
      }
    }
  }
}
</script>

<style lang="scss">
.menuable__content {
  &__active {
    z-index: 9999!important;
  }
}
</style>

<style lang="scss" scoped>
.workspace {
  .menu {
    position: fixed;
  }
}
</style>

