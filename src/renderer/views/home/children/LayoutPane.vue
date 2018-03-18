<template>
  <section class="layouts">
    <v-list subheader dense>
      <v-list-tile v-for="_ in layouts" :key="_.id" @click="handleSelect(_)">
        <v-list-tile-content>{{_.label}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import componentMixins from '@/mixins/component'
import {createElement} from '@/utils'
import {SET_SELECTED_LAYOUT} from '@/store/mutation-types'
export default {
  mixins: [componentMixins],
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['layouts', 'selectedLayout'])
  },
  methods: {
    ...mapActions(['addComponent', 'resetPage']),
    handleSelect (_) {
      this.$store.commit(SET_SELECTED_LAYOUT, _)
      this.resetPage()
      this.createLayout()
    },
    createLayout () {
      const parent = 'wrapper'
      const {id} = this.selectedLayout
      createElement(document.getElementById(parent), id)
      let layout = { parent, ...this.selectedLayout }
      this.addComponent(layout)
      this.createComponent(layout)
      this.$store.commit(SET_SELECTED_LAYOUT, null)
    }
  }
}
</script>

<style lang="scss">
.layouts {
  .card__media__content {
    justify-content: center;
  }
}
</style>
