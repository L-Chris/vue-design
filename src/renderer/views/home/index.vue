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
    <v-content>
      <v-container fill-height>
        <WorkspaceView/>
        <!-- <iframe id="preview" src="preview.html" style="width:100%;height:100%;" frameborder="0"/> -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import WorkspaceView from './children/WorkspaceView'
import PageView from './children/PageView'
import BlockView from './children/BlockView'
import InspectorView from './children/InspectorView'
import OutlineView from './children/OutlineView'
import {mapState, mapActions} from 'vuex'
import {Project} from '@/services'
export default {
  components: {
    WorkspaceView,
    PageView,
    BlockView,
    InspectorView,
    OutlineView
  },
  computed: {
    ...mapState(['pages'])
  },
  methods: {
    ...mapActions(['addPage']),
    async handleAddPage () {
      const {id} = await this.addPage()
      this.replaceTo(`?id=${id}`)
    },
    handleSave () {
      // todo save changes to file
      Project.save('project.json', this.pages, err => err
        ? this.$message.error('保存失败！')
        : this.$message.success('保存成功！')
      )
    }
  },
  created () {
    this.addPage()
    this.replaceTo(`?id=${this.pages[0].id}`)
  }
}
</script>

<style lang="scss" scoped>
.home {
}
</style>
