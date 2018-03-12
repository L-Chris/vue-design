<template>
  <section>
    <ElTree :data="components" @node-click="handleSelect" @node-contextmenu="handleDelete"/>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {spliceIf} from '@/utils'
import {SET_SELECTED_COMPONENT} from '@/store/mutation-types'
export default {
  computed: {
    ...mapGetters(['components'])
  },
  methods: {
    ...mapActions(['deleteComponent']),
    handleSelect (e, _) {
      this.$store.commit(SET_SELECTED_COMPONENT, _.data)
    },
    handleDelete (e, _, node) {
      const children = node.parent.childNodes
      spliceIf(children, c => c.id === node.id)
      this.deleteComponent(_)
    }
  }
}
</script>
