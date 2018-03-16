<template>
  <v-container class="inspector" fluid>
    <template v-if="component.setting&&component.props">
      <span class="subheading">{{component.setting.label}}</span>
      <v-layout v-for="_ in component.setting.config.Props" :key="_.key" row style="height:48px;">
        <v-flex xs6>
          <v-subheader>{{_.label}}</v-subheader>
        </v-flex>
        <v-flex class="inspector-field" xs6>
          <v-select v-if="_.inputType==='select'" v-model="component.props[_.key]" :items="_.data" item-text="label" item-value="value" @change="handleChange" clearable/>
          <v-switch v-else-if="_.inputType==='switch'" v-model="component.props[_.key]" hide-details @change="handleChange"/>
          <v-text-field
            v-else-if="_.type==='Number'"
            v-model.number="component.props[_.key]"
            :required="_.required"
            @change="handleChange"
            single-line
          />
          <v-text-field
            v-else
            v-model="component.props[_.key]"
            :placeholder="_.default"
            :required="_.required"
            @change="handleChange"
            single-line
          />
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import {UPDATE_COMPONENT} from '@/store/mutation-types'
export default {
  data () {
    return {
      component: {}
    }
  },
  computed: {
    ...mapGetters(['selectedComponent'])
  },
  watch: {
    selectedComponent (val) {
      if (!val) {
        this.component = {}
      } else {
        this.component = JSON.parse(JSON.stringify(this.selectedComponent))
      }
    }
  },
  methods: {
    handleChange () {
      this.$store.commit(UPDATE_COMPONENT, this.component)
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
