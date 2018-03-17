<template>
  <section class="layouts">
    <v-text-field class="pt-0 pl-3 pr-3" placeholder="name" v-model="name" single-line hide-details>
      <div class="layouts-search" slot="label">
        <i class="iconfont icon-search client-search-icon"/>
      </div>
    </v-text-field>
    <v-list subheader dense>
      <v-list-tile v-for="_ in filteredLayouts" :key="_.id" @click="()=>{}" @dragstart.native="handleDrag(_)" draggable>
        <v-list-tile-content>{{_.label}}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['layouts']),
    filteredLayouts () {
      return this.layouts.filter(_ => _.label.toLowerCase().includes(this.name))
    }
  },
  methods: {
    ...mapActions(['selectWidget']),
    handleDrag (_) {
      this.selectWidget(_)
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
