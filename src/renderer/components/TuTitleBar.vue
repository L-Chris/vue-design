<template>
  <div class="tu-title-bar d-flex justify-space-between">
    <div class="white--text pl-3 d-flex align-center">
      vue-design
    </div>
    <div style="text-align:right;">
      <v-btn class="no-drag" @click="handleMinimize" flat dark icon>
        <i class="iconfont icon-minimize"/>
      </v-btn>
      <v-btn class="no-drag" @click="handleMaximize" flat dark icon>
        <TuStatusIcon :status="iconStatus" :statusList="[{id: 0, value: 'maximize'}, {id: 1, value: 'windowed'}]"/>
      </v-btn>
      <v-btn class="no-drag" @click="handleClose" flat dark icon>
        <i class="iconfont icon-close"/>
      </v-btn>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import TuStatusIcon from '@/components/TuStatusIcon'
export default {
  components: {
    TuStatusIcon
  },
  data () {
    return {
      iconStatus: 0
    }
  },
  methods: {
    init () {
      ipcRenderer.on('window:maximize', () => {
        this.iconStatus = 1
      })
      ipcRenderer.on('window:unmaximize', () => {
        this.iconStatus = 0
      })
    },
    handleMinimize () {
      ipcRenderer.send('window:minimize')
    },
    handleMaximize () {
      ipcRenderer.send('window:maximize')
    },
    handleClose () {
      ipcRenderer.send('window:closed')
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.tu-title-bar {
  .no-drag {
    -webkit-app-region: no-drag; 
  }
  width: 100%;
  height: 48px!important;
  background-color: #0747a6;
  -webkit-app-region: drag;
  .btn {
    margin: 4px;
  }
}
</style>
