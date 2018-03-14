<template>
  <v-app class="home" @contextmenu.native.prevent="()=>{}" tabindex="0" @keydown.native.prevent.ctrl.83="handleSave">
    <v-navigation-drawer app fixed clipped permanent width="240">
      <v-expansion-panel expand>
        <v-expansion-panel-content :value="true">
          <div slot="header">
            <v-flex d-flex justify-space-between align-center>
              <span>Pages</span>
              <v-icon style="flex: 0!important;" @click.stop="handleAddPage">add</v-icon>
            </v-flex>
          </div>
          <PageView/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true">
          <div slot="header">Blocks</div>
          <BlockView/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <v-navigation-drawer app fixed right clipped permanent width="360">
      <v-expansion-panel expand>
        <v-expansion-panel-content :value="true">
          <div slot="header">Inspector</div>
          <InspectorView/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true">
          <div slot="header">Outline</div>
          <OutlineView/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <v-content class="home-main">
      <v-container  fill-height>
        <v-toolbar dense flat>
          <v-toolbar-side-icon></v-toolbar-side-icon>
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
  </v-app>
</template>

<script>
import opn from 'opn'
import {ipcRenderer} from 'electron'
import WorkspaceView from './children/WorkspaceView'
import CodeView from './children/CodeView'
import PageView from './children/PageView'
import BlockView from './children/BlockView'
import InspectorView from './children/InspectorView'
import OutlineView from './children/OutlineView'
import componentMixins from '@/mixins/component'
import {Project} from '@/services'
import {mapState, mapActions} from 'vuex'
import {SET_PROJECT, SET_PAGE, DEL_PAGE} from '@/store/mutation-types'
export default {
  mixins: [componentMixins],
  components: {
    WorkspaceView,
    CodeView,
    PageView,
    BlockView,
    InspectorView,
    OutlineView
  },
  data () {
    return {
      views: [
        { id: 0, label: 'Layout', value: 'WorkspaceView', icon: 'layout', tip: 'view layout' },
        { id: 1, label: 'Code', value: 'CodeView', icon: 'code', tip: 'view code' }
      ],
      activeIndex: 0
    }
  },
  computed: {
    ...mapState(['pages']),
    activeView () {
      return this.views[this.activeIndex]
    }
  },
  methods: {
    ...mapActions(['addPage']),
    openBrowser () {
      opn('https://github.com/L-Chris/vue-design-electron')
    },
    activateView (index) {
      this.activeIndex = index
    },
    async handleAddPage () {
      const {id} = await this.addPage()
      this.replaceTo(`?id=${id}`)
    },
    handleSave () {
      let pages = this.pages.map(_ => ({
        ..._,
        components: this.$store.state[_.id].components
      }))
      Project.save('project.json', pages, err => err
        ? this.$message.error('保存失败！')
        : this.$message.success('保存成功！')
      )
    },
    init () {
      // 加载项目
      ipcRenderer.on('load:project', (event, [path]) => {
        let {pages, modules} = Project.load(path)
        // reset
        for (let page of this.pages) {
          this.$store.commit(DEL_PAGE, page)
        }
        this.$store.commit(SET_PROJECT, path)
        this.$store.commit(SET_PAGE, pages)
        Object.entries(modules).forEach(([key, val]) => {
          this.$store.registerModule(key, val)
        })
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

<style lang="scss" scoped>
.home {
  &-main {
    .container {
      padding: 0;
      align-items: flex-start;
      flex-direction: column;
    }
  }
}
</style>
