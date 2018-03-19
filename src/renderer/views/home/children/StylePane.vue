<template>
  <section class="view">
    <v-text-field class="pt-0" rows="20" @change="handleChange" textarea auto-grow clearable/>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import {guid} from '@/utils'
import {UPDATE_COMPONENT, ADD_COMPONENT_SLOT} from '@/store/mutation-types'
export default {
  computed: {
    ...mapGetters(['components']),
    rootComponent () {
      return this.components[0]
    }
  },
  methods: {
    handleChange (innerText) {
      if (!this.rootComponent) return
      let {id, props: {slots}} = this.rootComponent
      // text = text
      let props = {
        domProps: { innerText }
      }
      let slot = slots.find(_ => _.setting.tag === 'style')
      // exsits => change innerText, not exsits => create style slot
      if (slot) {
        this.$store.commit(UPDATE_COMPONENT, { id: slot.id, props })
      } else {
        slot = {
          id: guid(),
          setting: { tag: 'style', label: 'style' },
          props
        }
        this.$store.commit(ADD_COMPONENT_SLOT, { id, slot })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
