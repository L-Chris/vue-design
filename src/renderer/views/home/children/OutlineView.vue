<template>
  <section>
    <ElTree ref="tree" :data="components" node-key="id" @node-click="handleSelect" @node-contextmenu="handleDelete" empty-text="No Data" highlight-current/>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {spliceIf} from '@/utils'
import {SET_SELECTED_COMPONENT} from '@/store/mutation-types'
export default {
  computed: {
    ...mapGetters(['components', 'selectedComponent'])
  },
  watch: {
    'selectedComponent' (component) {
      component && this.$nextTick(() => this.setCurrentKey(component.id))
    }
  },
  methods: {
    ...mapActions(['deleteComponent']),
    handleSelect (e, _) {
      this.$store.commit(SET_SELECTED_COMPONENT, _.data)
    },
    // 若当前node的key与已选页的id不等，则触发选择
    setCurrentKey (id = this.selectedComponent.id) {
      this.$refs['tree'].setCurrentKey(id)
    },
    handleDelete (e, _, node) {
      const children = node.parent.childNodes
      spliceIf(children, c => c.id === node.id)
      this.deleteComponent(_)
    }
  },
  activated () {
    this.setCurrentKey()
  }
}
</script>
