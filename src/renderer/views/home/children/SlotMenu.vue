<template>
  <v-menu v-model="slotMenu.visible" absolute offset-y :position-x="slotMenu.x" :position-y="slotMenu.y" max-width="120">
    <v-list subheader dense>
      <v-list-tile v-ripple="true" v-for="_ in slotMenu.slots" :key="_.name" @drop.stop="handleDrop(_.name)" @dragover.prevent="()=>{}">
        <v-list-tile-title>{{_.name}}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {mountSlot} from '@/utils/mount'
import {SET_SLOT_MENU, ADD_INSTANCE, ADD_COMPONENT_SLOT, SET_SELECTED_WIDGET} from '@/store/mutation-types'
export default {
  computed: {
    ...mapState(['slotMenu', 'selectedWidget']),
    ...mapGetters(['selectedComponent', 'instances'])
  },
  methods: {
    // 根据所选widget创建组件信息
    createComponentInfo (id, parent, slot) {
      let {createProps, setting} = this.selectedWidget
      let props = createProps()
      return {id, parent, slot, props, setting}
    },
    async handleDrop (name) {
      let {id} = this.selectedComponent
      let parentVm = this.instances.get(id)
      const vm = await mountSlot(parentVm, this.selectedWidget.component, this.$store, name)
      let component = this.createComponentInfo(vm._uid, id, name)
      vm.$info = component
      this.$store.commit(ADD_INSTANCE, vm)
      this.$store.commit(ADD_COMPONENT_SLOT, {id, slot: component})
      this.$store.commit(SET_SELECTED_WIDGET, null)
      this.$store.commit(SET_SLOT_MENU, {
        slots: [],
        visible: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
