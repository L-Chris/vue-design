import ElementUI, {ElComponents} from './element-ui'
// import Vuetify from './vuetify'

export default {
  ElementUI
  // Vuetify
}

export function installBlocks (Vue) {
  ElComponents.forEach(_ => {
    Vue.component(_.name, _)
  })
}
