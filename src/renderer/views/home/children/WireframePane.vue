<template>
  <section id="wrapper" class="workspace view" @mousedown="handleMouseDown" @drop="handleDrop" @dragover.prevent="handleDragOver">
    <!-- context menu -->
    <v-menu v-model="menu.visible" absolute offset-y :position-x="menu.x" :position-y="menu.y" max-width="120">
      <v-list subheader dense>
        <v-list-tile v-ripple="true" @click="handleDeleteComponent">
          <v-list-tile-title>删除</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <!-- slots menu -->
    <v-menu v-model="slotMenu.visible" absolute offset-y :position-x="slotMenu.x" :position-y="slotMenu.y" max-width="120">
      <v-list subheader dense>
        <v-list-tile v-ripple="true" v-for="_ in slotMenu.slots" :key="_.name" @drop.stop="handleDropInSlot(_.name)" @dragover.prevent="()=>{}">
          <v-list-tile-title>{{_.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <SelectedMask/>
  </section>
</template>

<script>
import SelectedMask from './SelectedMask'
import throttle from 'lodash.throttle'
import {mapState, mapGetters, mapActions} from 'vuex'
import componentMixins from '@/mixins/component'
import {SET_SELECTED_COMPONENT, SET_SELECTED_WIDGET, UPDATE_COMPONENT} from '@/store/mutation-types'
import {createElement, guid, recursiveFindBy} from '@/utils'
export default {
  components: {
    SelectedMask
  },
  mixins: [componentMixins],
  data () {
    return {
      menu: {
        visible: false,
        x: 0,
        y: 0
      },
      slotMenu: {
        visible: false,
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    ...mapState(['selectedWidget']),
    ...mapGetters(['selectedComponent'])
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
        x: 0,
        y: 0
      })
    },
    showMenu (menu, {x, y, slots}) {
      Object.assign(menu, {
        visible: true,
        slots,
        x,
        y
      })
    },
    // 根据所选widget创建组件信息
    createComponentInfo (id, parent) {
      let {createProps, setting} = this.selectedWidget
      let props = createProps()
      return {id, parent, props, setting}
    },
    // drop触发组件挂载
    handleDrop ({target}) {
      if (!this.selectedWidget) return
      let {id} = createElement(target)
      let component = this.createComponentInfo(id, target.id)
      this.addComponent(component)
      this.createComponent({id})
      this.$store.commit(SET_SELECTED_WIDGET, null)
    },
    handleDropInSlot (name) {
      if (!this.selectedWidget || !this.selectedComponent) return
      let component = this.createComponentInfo(guid().toString(), this.selectedComponent.id)
      component.slot = name
      let selectedComponent = JSON.parse(JSON.stringify(this.selectedComponent))
      selectedComponent.props.slots.push(component)
      this.$store.commit(UPDATE_COMPONENT, selectedComponent)
      this.$store.commit(SET_SELECTED_WIDGET, null)
      this.resetMenu(this.slotMenu)
    },
    // dragover触发slot提示
    handleDragOver: throttle(function ({path, x, y}) {
      this.resetMenu(this.slotMenu)
      let component = this.selectComponent(path)
      if (!component) return
      let slots = component.setting.config.Slots
      this.$nextTick(() => this.showMenu(this.slotMenu, {x, y, slots}))
    }, 150),
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

