export default {
  namespaced: true,
  state () {
    return {
      layout: null,
      components: [],
      instances: new Map(),
      selectedComponent: null,
      hoveredComponent: null,
      selectedBlock: null
    }
  }
}
