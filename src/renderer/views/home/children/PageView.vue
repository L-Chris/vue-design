<template>
  <section>
    <ElTree ref="tree" :data="pages" node-key="id" @node-click="handleSelect" @node-contextmenu="handleDelete" highlight-current empty-text="No Data"/>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import {DEL_PAGE, SET_SELECTED_PAGE} from '@/store/mutation-types'
export default {
  computed: {
    ...mapState(['pages', 'selectedPage'])
  },
  watch: {
    '$route.query.id' (val) {
      this.$nextTick(() => this.setCurrentKey(val))
    }
  },
  methods: {
    handleSelect (e, {data}) {
      this.$store.commit(SET_SELECTED_PAGE, data)
      this.replaceTo(`?id=${data.id}`)
    },
    // 若当前node的key与已选页的id不等，则触发选择
    setCurrentKey (id = this.selectedPage.id) {
      this.$refs['tree'].getCurrentKey() !== id &&
      this.$refs['tree'].setCurrentKey(id)
    },
    handleDelete (e, _) {
      this.selectedPage.id !== _.id && this.$store.commit(DEL_PAGE, _)
    }
  },
  mounted () {
    this.setCurrentKey()
  }
}
</script>

<style lang="scss" scoped>

</style>
