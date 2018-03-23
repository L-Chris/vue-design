<template>
  <v-app class="home" @contextmenu.native.prevent="()=>{}" tabindex="0" @keydown.native.prevent.ctrl.83="handleSave">
    <v-navigation-drawer app fixed clipped permanent width="240">
      <v-expansion-panel expand>
        <v-expansion-panel-content :value="true" expand-icon="iconfont icon-arrow_down">
          <div slot="header">
            <v-flex d-flex justify-space-between align-center>
              <span class="body-2">Sitemap</span>
              <i class="iconfont icon-add" style="flex: 0!important;" @click.stop="handleAddPage"/>
            </v-flex>
          </div>
          <SitemapPane/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true" expand-icon="iconfont icon-arrow_down">
          <div slot="header">
            <v-flex d-flex justify-space-between align-center>
              <span class="body-2">Layouts</span>
              <i class="iconfont icon-download" style="flex: 0!important;" @click.stop="downloadLayouts"/>
            </v-flex>
          </div>
          <LayoutPane/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="false" expand-icon="iconfont icon-arrow_down">
          <div slot="header">
            <v-flex d-flex justify-space-between align-center>
              <span class="body-2">Blocks</span>
              <i class="iconfont icon-download" style="flex: 0!important;" @click.stop="downloadBlocks"/>
            </v-flex>
          </div>
          <BlockPane/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true" expand-icon="iconfont icon-arrow_down">
          <div slot="header">
            <v-flex d-flex justify-space-between align-center>
              <span class="body-2">Widgets</span>
              <i class="iconfont icon-download" style="flex: 0!important;" @click.stop="downloadWidgets"/>
            </v-flex>
          </div>
          <WidgetPane/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <v-navigation-drawer app fixed right clipped permanent width="360">
      <v-expansion-panel expand>
        <v-expansion-panel-content :value="true" expand-icon="iconfont icon-arrow_down">
          <div slot="header" class="body-2">Inspector</div>
          <InspectorPane/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true" expand-icon="iconfont icon-arrow_down">
          <div slot="header" class="body-2">Outline</div>
          <OutlinePane/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <v-toolbar class="home-head" height="96px" app fixed clipped-left clipped-right flat>
      <TuTitleBar class="head-bar"/>
      <div class="home-head-menubar head-bar d-flex justify-space-between">
        <div>
          <TuIconButton icon="create" text="create" @click.native="handleCreate"/>
          <TuIconButton icon="import" text="import" @click.native="handleImport"/>
          <TuIconButton icon="save" text="save" @click.native="handleSave"/>
        </div>
        <div style="text-align:right;">
          <TuIconButton icon="setting" text="setting" @click.native="showSettingDialog"/>
          <!-- <TuIconButton icon="user_fill" text="login"/> -->
        </div>
      </div>
    </v-toolbar>
    <v-content class="home-main">
      <v-container fill-height>
        <v-toolbar class="home-main-bar" dense flat>
          <i class="iconfont icon-menu"/>
          <v-toolbar-title>{{activeView.label}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip v-for="_ in views" :key="_.id"  bottom>
            <v-btn slot="activator" @click="activateView(_.id)" icon>
              <i :class="`iconfont icon-${_.icon}`"/>
            </v-btn>
            <span>{{_.tip}}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn slot="activator" @click="openBrowser" icon>
              <i class="iconfont icon-github"/>
            </v-btn>
            <span>Star me ：)</span>
          </v-tooltip>
        </v-toolbar>
        <v-divider />
        <keep-alive>
          <component :is="activeView.value"/>
        </keep-alive>
      </v-container>
    </v-content>
    <SettingDialog :visible.sync="settingDialogVisible" @cancel="handleDialogCancel" @confirm="handleDialogConfirm"/>
  </v-app>
</template>

<script>
import {ipcRenderer} from 'electron'
import TuTitleBar from '@/components/TuTitleBar'
import TuIconButton from '@/components/TuIconButton'
import panes from './panes'
import SettingDialog from './children/SettingDialog'
import componentMixins from '@/mixins/component'
import {Project} from '@/services'
import {mapState, mapActions} from 'vuex'
export default {
  mixins: [componentMixins],
  components: {
    TuTitleBar,
    TuIconButton,
    SettingDialog,
    ...panes
  },
  data () {
    return {
      views: [
        { id: 0, label: 'View', value: 'WireframePane', icon: 'layout', tip: 'edit view' },
        { id: 1, label: 'Css', value: 'StylePane', icon: 'css', tip: 'edit css' },
        { id: 2, label: 'Source', value: 'CodePane', icon: 'code', tip: 'view source' }
      ],
      activeIndex: 0,
      settingDialogVisible: false,
      status: 0
    }
  },
  computed: {
    ...mapState(['pages', 'project']),
    activeView () {
      return this.views[this.activeIndex]
    }
  },
  methods: {
    ...mapActions(['addPage', 'loadProject', 'resetProject']),
    handleImport () {
      ipcRenderer.send('load:project')
    },
    showSettingDialog () {
      this.settingDialogVisible = true
    },
    // workspace pane
    openBrowser () {
      const opn = require('opn')
      opn('https://github.com/L-Chris/vue-design-electron')
    },
    activateView (index) {
      this.activeIndex = index
    },
    // sitemap pane
    async handleAddPage () {
      const {id} = await this.addPage()
      this.replaceTo(`?id=${id}`)
    },
    // Todo download blocks and widgets
    downloadLayouts () {},
    downloadBlocks () {},
    downloadWidgets () {},
    saveProject () {
      let pages = this.pages.map(_ => ({
        ..._,
        components: this.$store.state[_.id].components
      }))
      Project.save(this.project, pages, err => {
        if (err) {
          this.$message.error('保存失败！')
        } else {
          this.$message.success('保存成功！')
        }
      })
    },
    handleCreate () {
      this.resetProject()
      this.settingDialogVisible = true
      this.status = 1
    },
    // if not set projectInfo, set first (use generator function)
    handleSave () {
      if (!this.project.name || !this.project.path) {
        this.settingDialogVisible = true
        this.status = 1
        return
      }
      this.saveProject()
    },
    handleDialogCancel () {
      this.status && (this.status = 0)
    },
    handleDialogConfirm () {
      if (!this.status) return
      this.saveProject()
      this.status = 0
    },
    init () {
      let porjectRE = /(\S+)\\(\S+?)\.vd-project/
      ipcRenderer.on('load:project', (event, paths) => {
        if (!paths || !paths.length) return
        let [projectPath] = paths
        let {pages, modules} = Project.load(projectPath)
        this.resetProject()
        let [, path, name] = projectPath.match(porjectRE)
        this.loadProject({name, path, pages, modules})
        this.replaceTo(`?id=${this.pages[0].id}`)
        this.reRender()
      })
      this.addPage()
      this.replaceTo(`?id=${this.pages[0].id}`)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss">
.home {
  .icon-arrow_down {
    font-size: 12px;
    margin-left: 4px;
  }
  &-head {
    .toolbar__content {
      flex-direction: column;
    }
    &-menubar {
      padding: 0 24px;
      .iconfont {
        font-size: 20px!important;
        color: grey;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.home {
  .navigation-drawer {
    padding-bottom: 0;
  }
  .head-bar {
    width: 100%;
    margin: 0!important;
    .btn {
      margin: 2px;
    }
  }
  &-head {
    border-bottom: 1px solid #bbbbbb;
  }
  &-main {
    &-bar {
      .iconfont {
        font-size: 20px;
        color: grey;
      }
    }
    .container {
      padding: 0;
      align-items: flex-start;
      flex-direction: column;
    }
  }
}
</style>
