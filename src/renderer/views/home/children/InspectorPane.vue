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
          <v-text-field v-model="props.class" @change="handleChange" single-line/>
        </v-flex>
      </v-layout>
      <!-- compnent attribute -->
      <div class="body-2 pt-2">Props</div>
      <v-layout v-for="_ in selectedComponent.setting.config.Props" :key="_.key" row style="height:44px;">
        <v-flex xs6>
          <v-subheader>{{_.label}}</v-subheader>
        </v-flex>
        <v-flex class="inspector-field" xs6>
          <v-select v-if="_.inputType==='select'" v-model="props[_.key]" :items="_.data" item-text="label" @change="handleChange" clearable/>
          <v-switch v-else-if="_.inputType==='switch'" v-model="props[_.key]" hide-details @change="handleChange"/>
          <v-text-field
            v-else-if="_.type==='Number'"
            v-model.number="props[_.key]"
            :required="_.required"
            @change="handleChange"
            single-line
          />
          <v-text-field
            v-else
            v-model="props[_.key]"
            :placeholder="_.default"
            :required="_.required"
            @change="handleChange"
            single-line
          />
        </v-flex>
      </v-layout>
    </template>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import {createProps} from '@/utils/component'
import {UPDATE_COMPONENT} from '@/store/mutation-types'
export default {
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
    }
  },
  methods: {
    handleChange () {
      this.$store.commit(UPDATE_COMPONENT, {
        id: this.selectedComponent.id,
        props: this.props
      })
    }
  }
}
</script>

<style lang="scss">
.inspector {
  &-field {
    .switch {
      .input-group__details {
        display: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.inspector {
  .subheader {
    align-items: flex-end;
  }
  &-field {
    .switch {
      height: 100%;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
