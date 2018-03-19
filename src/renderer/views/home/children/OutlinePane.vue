<template>
  <section>
    <ElTree
      ref="tree"
      :data="componentTree"
      @node-click="handleSelect"
      @node-contextmenu="handleDelete"
      :filter-node-method="filterNode"
      node-key="id"
      empty-text="No Data"
      highlight-current
      default-expand-all
    />
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {spliceIf, recursiveMap, recursiveFind} from '@/utils'
import {SET_SELECTED_COMPONENT} from '@/store/mutation-types'
export default {
  computed: {
    ...mapGetters(['components', 'selectedComponent']),
    componentTree () {
      return recursiveMap(
        this.components,
        _ => ({
          id: _.id,
          label: _.setting.label
        }),
        'props.slots'
      )
    }
  },
  watch: {
    selectedComponent (component) {
      component && this.$nextTick(() => this.setCurrentKey(component.id))
    },
    components: {
      handler (val) {
        val && this.$nextTick(() => this.$refs['tree'].filter())
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['deleteComponent']),
    filterNode (val, data) {
      return data.label !== 'style'
    },
    handleSelect (e, {data}) {
      let component = recursiveFind(this.components, _ => _.id === data.id, 'props.slots')
      this.$store.commit(SET_SELECTED_COMPONENT, component)
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
  }
}
</script>
