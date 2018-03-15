<template>
  <section>
    <ElTree ref="tree" :data="componentTree" node-key="id" children="children" @node-click="handleSelect" @node-contextmenu="handleDelete" empty-text="No Data" highlight-current/>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {spliceIf, recursiveMap} from '@/utils'
import {SET_SELECTED_COMPONENT} from '@/store/mutation-types'
export default {
  computed: {
    ...mapGetters(['components', 'selectedComponent']),
    componentTree () {
      return recursiveMap(JSON.parse(JSON.stringify(this.components)), 'props.slots')
    }
  },
  watch: {
    'selectedComponent' (component) {
      component && this.$nextTick(() => this.setCurrentKey(component.id))
    }
  },
  methods: {
    ...mapActions(['deleteComponent']),
    handleSelect (e, {data}) {
      this.$store.commit(SET_SELECTED_COMPONENT, data)
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
