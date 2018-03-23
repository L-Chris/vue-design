<template>
  <section class="inspector pl-4 pr-3 pb-3">
    <template v-if="this.selectedComponent">
      <div class="body-2 pb-2">{{this.selectedComponent.setting.label}}</div>
      <!-- native attribute -->
      <div class="body-2">DomProps</div>
      <v-layout row style="height:44px;">
        <v-flex xs6>
          <v-subheader>classList</v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="props.class" single-line/>
        </v-flex>
      </v-layout>
      <!-- compnent attribute -->
      <div class="body-2 pt-2">Props</div>
      <v-layout v-for="_ in selectedComponent.setting.config.Props" :key="_.key" row style="height:44px;">
        <v-flex xs6>
          <v-subheader>{{_.label}}</v-subheader>
        </v-flex>
        <v-flex class="inspector-field" xs6>
          <component :is="`TypeBox${toTypeBoxName(_.inputType,_.type)}`" :key="_.key" :field.sync="props[_.key]" :config="_"/>
        </v-flex>
      </v-layout>
    </template>
  </section>
</template>

<script>
import TypeBoxes from '@/components/TypeBox'
import {mapGetters} from 'vuex'
import {createProps} from '@/utils/component'
import {UPDATE_COMPONENT} from '@/store/mutation-types'
export default {
  components: {
    ...TypeBoxes
  },
  data () {
    return {
      props: {}
    }
  },
  computed: {
    ...mapGetters(['selectedComponent'])
  },
  watch: {
    selectedComponent (val) {
      if (!val) return
      this.props = createProps(this.parsePath('setting.config.Props')(val))(this.selectedComponent.props)
    },
    props (val) {
      this.updateComponentProps()
    }
  },
  methods: {
    toTypeBoxName (inputType, type) {
      if (['switch', 'select', 'color'].includes(inputType)) return this.headUpperCase(inputType)
      return `${this.headUpperCase(inputType)}${this.headUpperCase(type)}`
    },
    headUpperCase (str) {
      if (typeof str !== 'string' || !str) return ''
      return `${str[0].toUpperCase()}${str.slice(1)}`
    },
    updateComponentProps () {
      this.$store.commit(UPDATE_COMPONENT, {
        id: this.selectedComponent.id,
        props: this.props
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inspector {
  .subheader {
    align-items: center;
  }
  &-field {
    display: flex;
    align-items: center;
  }
}
</style>
