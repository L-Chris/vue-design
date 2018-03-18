import Vue from 'vue'
import Vuex from 'vuex'
import {spliceIf, guid, recursiveFind, recursiveSpliceBy} from '@/utils'
import layouts from '@/layouts'
import blocks from '@/blocks'
import widgets from '@/widgets'
import pageModule from './modules/page'
import * as types from './mutation-types'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    project: {
      name: '',
      path: '',
      componentLibrary: 0
    },
    pages: [],
    layouts,
    blocks,
    widgets,
    selectedPage: null,
    selectedLayout: null,
    selectedBlock: null,
    selectedWidget: null
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
    [types.SET_PROJECT] (state, project) {
      state.project = project
    },
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
    [types.SET_COMPONENT] (state, components) {
      state[state.selectedPage.id].components = components
    },
    [types.ADD_COMPONENT] (state, component) {
      state[state.selectedPage.id].components.push(component)
    },
    [types.DEL_COMPONENT] (state, {id}) {
      let {id: pageId} = state.selectedPage
      recursiveSpliceBy(state[pageId].components, _ => _.id === id, 'props.slots')
    },
    [types.UPDATE_COMPONENT] (state, {id, props}) {
      let pageState = state[state.selectedPage.id]
      let component = recursiveFind(pageState.components, _ => _.id === id, 'props.slots')
      if (!component) return
      Object.assign(component, {props})
    },
    [types.ADD_COMPONENT_SLOT] (state, {id, slot}) {
      let pageState = state[state.selectedPage.id]
      let component = recursiveFind(pageState.components, _ => _.id === id, 'props.slots')
      if (!component) return
      component.props.slots.push(slot)
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
    },
    [types.SET_SELECTED_WIDGET] (state, widget) {
      state.selectedWidget = widget
    },
    [types.SET_LAYOUT] (state, layout) {
      let pageState = state[state.selectedPage.id]
      pageState.layout = layout
    },
    [types.SET_SELECTED_LAYOUT] (state, layout) {
      state.selectedLayout = layout
    }
  },
  actions: {
    resetProject ({commit, state}) {
      for (let page of state.pages) {
        this.unregisterModule(page.id)
      }
      commit(types.SET_PAGE, [])
      commit(types.SET_PROJECT, { name: '', path: '', componentLibrary: 0 })
    },
    loadProject ({commit, state}, {name, path, pages, modules}) {
      commit(types.SET_PROJECT, { name, path })
      commit(types.SET_PAGE, pages)
      Object.entries(modules).forEach(([key, val]) => {
        this.registerModule(key, val)
      })
    },
    selectBlock ({commit, state}, block) {
      if (state.selectedComponent) {
        commit(types.SET_SELECTED_COMPONENT, null)
      }
      commit(types.SET_SELECTED_BLOCK, block)
    },
    selectWidget ({commit, state}, widget) {
      if (state.selectedComponent) {
        commit(types.SET_SELECTED_COMPONENT, null)
      }
      commit(types.SET_SELECTED_WIDGET, widget)
    },
    resetPage ({commit, state}) {
      commit(types.SET_COMPONENT, [])
      commit(types.SET_SELECTED_COMPONENT, null)
    },
    addPage ({state, commit}, {id = `page${guid()}`, label = id, children = []} = {}) {
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

export default store
