<template>
  <section id="wrapper" class="workspace view" @drop="handleDrop" @dragover.prevent="()=>{}">
    <ContextMenu/>
    <SlotMenu/>
    <SelectedMask/>
  </section>
</template>

<script>
import ContextMenu from '../children/ContextMenu'
import SlotMenu from '../children/SlotMenu'
import SelectedMask from '../children/SelectedMask'
import {mapState, mapActions} from 'vuex'
import {createElement} from '@/utils'
import {mount} from '@/utils/mount'
import {SET_SELECTED_WIDGET, ADD_INSTANCE} from '@/store/mutation-types'
export default {
  components: {
    ContextMenu,
    SlotMenu,
    SelectedMask
  },
  computed: {
    ...mapState(['selectedWidget'])
  },

  methods: {
    ...mapActions(['addComponent', 'deleteComponent']),
    // 根据所选widget创建组件信息
    createComponentInfo (id, parent, slot) {
      let {createProps, setting} = this.selectedWidget
      let props = createProps()
      return {id, parent, slot, props, setting}
    },
    // drop触发组件挂载
    handleDrop ({target}) {
      if (!this.selectedWidget) return
      let el = createElement(target)
      const vm = mount(el, this.selectedWidget.component, this.$store)
      let component = this.createComponentInfo(vm._uid, target.id)
      vm.$info = component
      this.$store.commit(ADD_INSTANCE, vm)
      this.addComponent(component)
      this.$store.commit(SET_SELECTED_WIDGET, null)
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

