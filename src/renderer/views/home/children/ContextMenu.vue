<template>
  <v-menu v-model="contextMenu.visible" absolute offset-y :position-x="contextMenu.x" :position-y="contextMenu.y" max-width="120">
    <v-list subheader dense>
      <v-list-tile v-ripple="true" @click="deleteComponent()">
        <v-list-tile-title>删除</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {SET_CONTEXT_MENU} from '@/store/mutation-types'
export default {
  computed: {
    ...mapState(['contextMenu'])
  },
  watch: {
    selectedComponent (val) {
      !val && this.$store.commit(SET_CONTEXT_MENU, {
        visible: false
      })
    }
  },
  methods: {
    ...mapActions(['deleteComponent'])
  }
}
</script>

<style lang="scss" scoped>
</style>
