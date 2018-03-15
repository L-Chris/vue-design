<template>
  <section class="component">
    <v-text-field class="pt-0 pl-3 pr-3" placeholder="name" v-model="name" single-line hide-details>
      <div class="component-search" slot="label">
        <i class="iconfont icon-search client-search-icon"/>
      </div>
    </v-text-field>
    <div v-for="(f, fname) in filteredBlocks" :key="fname">
      <v-list subheader dense>
        <v-list-tile v-for="_ in f" :key="_.id" @click="()=>{}" @dragstart.native="handleDrag(_)" draggable>
          <v-list-tile-content>{{_.label}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
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
    ...mapState(['blocks']),
    filteredBlocks () {
      return Object.entries(this.blocks).reduce((pre, [key, val]) => {
        pre[key] = val.filter(_ => _.label.toLowerCase().includes(this.name))
        return pre
      }, {})
    }
  },
  methods: {
    ...mapActions(['selectBlock']),
    handleDrag (_) {
      this.selectBlock(_)
    }
  }
}
</script>

<style lang="scss">
.component {
  .card__media__content {
    justify-content: center;
  }
}
</style>
