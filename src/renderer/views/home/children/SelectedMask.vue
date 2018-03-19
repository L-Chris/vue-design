<template>
  <v-scale-transition>
    <div class="selector" v-show="visible" :style="style"/>
  </v-scale-transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      visible: false,
      style: {}
    }
  },
  computed: {
    ...mapGetters(['selectedComponent'])
  },
  watch: {
    selectedComponent: {
      handler: function (val, oldVal) {
        oldVal && this.hideSelector()
        val && this.$nextTick(() => this.showSelector(document.getElementById(val.id)))
      },
      deep: true
    }
  },
  methods: {
    showSelector (el) {
      if (!el) return
      let {left, top, width, height} = el.getBoundingClientRect()
      this.visible = true
      this.style = {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    },
    hideSelector () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .selector {
    pointer-events: none;
    position: fixed;
    border: 1px dashed #64B5F6;
    z-index: 1;
  }
</style>
