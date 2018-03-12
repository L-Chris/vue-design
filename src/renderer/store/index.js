import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer} from 'electron'
import {spliceIf, guid} from '@/utils'
import blocks from '@/blocks'
import pageModule from './modules/page'
import * as types from './mutation-types'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    pages: [],
    blocks,
    selectedPage: null,
    selectedBlock: null
  },
  getters: {
    pageId (state) {
      return state.route.query.id
    },
    components (state, {pageId}) {
      return state[pageId] ? state[pageId].components : []
    },
    selectedComponent (state, {pageId}) {
      return state[pageId] ? state[pageId].selectedComponent : null
    }
  },
  mutations: {
    [types.ADD_PAGE] (state, page) {
      state.pages.push(page)
    },
    [types.DEL_PAGE] (state, {id}) {
      spliceIf(state.pages, _ => _.id === id)
      this.unregisterModule(id)
    },
    [types.SET_PAGE] (state, pages) {
      state.pages = pages
    },
    [types.ADD_COMPONENT] (state, component) {
      state[state.selectedPage.id].components.push(component)
    },
    [types.DEL_COMPONENT] (state, {id}) {
      let {id: pageId} = state.selectedPage
      spliceIf(state[pageId].components, _ => _.id === id)
    },
    [types.UPDATE_COMPONENT] (state, options) {
      let pageState = state[state.selectedPage.id]
      const {id} = options
      const index = pageState.components.findIndex(_ => _.id === id)
      if (index < 0) return
      pageState.components[index] = Object.assign(pageState.components[index], options)
    },
    [types.SET_SELECTED_PAGE] (state, page) {
      state.selectedPage = page
    },
    [types.SET_SELECTED_COMPONENT] (state, component) {
      let pageState = state[state.selectedPage.id]
      pageState.selectedComponent = component
    },
    [types.SET_SELECTED_BLOCK] (state, block) {
      state.selectedBlock = block
    }
  },
  actions: {
    selectBlock ({commit, state}, block) {
      if (state.selectedComponent) {
        commit(types.SET_SELECTED_COMPONENT, null)
      }
      commit(types.SET_SELECTED_BLOCK, block)
    },
    addPage ({state, commit}, {id = `page${guid()}`, label = `页面${state.pages.length + 1}`, children = []} = {}) {
      this.registerModule(id, pageModule)
      let page = {id, label, children}
      commit(types.ADD_PAGE, page)
      commit(types.SET_SELECTED_PAGE, page)
      return page
    },
    addComponent ({commit}, component) {
      commit(types.ADD_COMPONENT, component)
      commit(types.SET_SELECTED_COMPONENT, component)
    },
    deleteComponent ({commit}, component) {
      commit(types.DEL_COMPONENT, component)
      commit(types.SET_SELECTED_COMPONENT, null)
    }
  }
  // strict: process.env.NODE_ENV !== 'production'
})

ipcRenderer.on('load:project', (event, project) => {
  console.log(project)
})

export default store
