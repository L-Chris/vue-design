<template>
  <v-app class="home" @contextmenu.native.prevent="()=>{}" tabindex="0" @keydown.native.prevent.ctrl.83="handleSave">
    <v-navigation-drawer app fixed clipped permanent width="240">
      <v-expansion-panel expand>
        <v-expansion-panel-content :value="true">
          <div slot="header">
            <v-flex d-flex justify-space-between align-center>
              <span class="body-2">Sitemap</span>
              <i class="iconfont icon-add" style="flex: 0!important;" @click.stop="handleAddPage"/>
            </v-flex>
          </div>
          <SitemapPane/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="false">
          <div slot="header">
            <v-flex d-flex justify-space-between align-center>
              <span class="body-2">Blocks</span>
              <i class="iconfont icon-download" style="flex: 0!important;" @click.stop="downloadBlocks"/>
            </v-flex>
          </div>
          <BlockPane/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true">
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
        <v-expansion-panel-content :value="true">
          <div slot="header" class="body-2">Inspector</div>
          <InspectorPane/>
        </v-expansion-panel-content>
        <v-expansion-panel-content :value="true">
          <div slot="header" class="body-2">Outline</div>
          <OutlinePane/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <v-content class="home-main">
      <v-container fill-height>
        <v-toolbar class="home-main-bar" dense flat>
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
    <v-footer class="home-foot pr-0" app fixed>
      <div>GreedZone&copy; 2017</div>
    </v-footer>
  </v-app>
</template>

<script>
import opn from 'opn'
import {ipcRenderer} from 'electron'
import WireframePane from './children/WireframePane'
import CodePane from './children/CodePane'
import SitemapPane from './children/SitemapPane'
import BlockPane from './children/BlockPane'
import WidgetPane from './children/WidgetPane'
import InspectorPane from './children/InspectorPane'
import OutlinePane from './children/OutlinePane'
import componentMixins from '@/mixins/component'
import {Project} from '@/services'
import {mapState, mapActions} from 'vuex'
import {SET_PROJECT, SET_PAGE, DEL_PAGE} from '@/store/mutation-types'
export default {
  mixins: [componentMixins],
  components: {
    WireframePane,
    CodePane,
    SitemapPane,
    BlockPane,
    WidgetPane,
    InspectorPane,
    OutlinePane
  },
  data () {
    return {
      views: [
        { id: 0, label: 'Layout', value: 'WireframePane', icon: 'layout', tip: 'view layout' },
        { id: 1, label: 'Code', value: 'CodePane', icon: 'code', tip: 'view code' }
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
    // Todo download blocks and widgets
    downloadBlocks () {},
    downloadWidgets () {},
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
      ipcRenderer.on('load:project', (event, paths) => {
        if (!paths || !paths.length) return
        let [path] = paths
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
  .navigation-drawer {
    padding-bottom: 0;
  }
  &-main {
    &-bar {
      .iconfont {
        font-size: 20px;
      }
    }
    .container {
      padding: 0;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  &-foot {
    align-items: center;
    justify-content: center;
    border-top: 1px solid #bbbbbb;
  }
}
</style>
