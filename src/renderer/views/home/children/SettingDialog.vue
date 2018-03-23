<template>
  <v-dialog v-model="visible" max-width="480px" persistent lazy>
    <v-card>
      <v-card-title class="body-2">
        Project Setting
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex xs11>
              <v-text-field label="Name" v-model="projectInfo.name" :rules="rules.name" required/>
            </v-flex>
            <v-flex xs11>
              <v-text-field label="Output Path" v-model="projectInfo.path" :rules="rules.path" required/>
            </v-flex>
            <v-flex xs1>
              <v-btn @click="handleBrowse" icon>
                <i class="iconfont icon-import"/>
              </v-btn>
            </v-flex>
            <v-flex xs11>
              <v-select v-model="projectInfo.componentLibrary" :items="componentLibrarys" item-text="label" label="Component Library" append-icon="iconfont icon-arrow_down"/>
            </v-flex>
          </v-layout>          
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="handleCancel">CANCEL</v-btn>
        <v-btn color="blue darken-1" flat @click="handleConfirm">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { remote } from 'electron'
import {mapState} from 'vuex'
import {componentLibrarys} from '@/utils/const'
import {SET_PROJECT} from '@/store/mutation-types'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      componentLibrarys,
      projectInfo: {
        name: '',
        path: '',
        componentLibrary: 0
      },
      rules: {
        name: [
          v => !!v || 'Required!'
        ],
        path: [
          v => !!v || 'Required!'
        ]
      }
    }
  },
  computed: {
    ...mapState(['project'])
  },
  watch: {
    visible (val) {
      if (val) {
        Object.assign(this.projectInfo, this.project)
      }
    }
  },
  methods: {
    handleBrowse () {
      remote.dialog.showOpenDialog({
        properties: ['openDirectory']
      }, paths => {
        if (paths && paths.length) {
          this.projectInfo.path = paths[0]
        }
      })
    },
    handleCancel () {
      this.$emit('update:visible', false)
    },
    handleConfirm () {
      if (!this.$refs.form.validate()) return
      this.$store.commit(SET_PROJECT, this.projectInfo)
      this.$emit('update:visible', false)
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
