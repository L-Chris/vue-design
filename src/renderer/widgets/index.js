import ElementUI from './element-ui'
import Vuetify from './vuetify'
import Native from './native'

export default {
  ElementUI,
  Vuetify,
  Native
}

export function installWidgets (Vue) {
  [].concat(ElementUI, Vuetify, Native).forEach(_ => {
    Vue.component(_.setting.tag, _.component)
  })
}
