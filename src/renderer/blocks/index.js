import ElementUI, {ElComponents} from './element-ui'
import Vuetify, {VComponents} from './vuetify'
import Native, {NtComponents} from './native'

export default {
  ElementUI,
  Vuetify,
  Native
}

export function installBlocks (Vue) {
  [...ElComponents, ...VComponents, ...NtComponents].forEach(_ => {
    Vue.component(_.name, _)
  })
}
