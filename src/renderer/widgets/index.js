import wrapWidget from './wrapWidget'
import {partition} from '@/utils'
const files = require.context('.', true, /\.(\/[^/]+){3}\.(js|vue)$/)
const modules = {}
const widgetList = []
const prefixRE = /\.\/(.+?)\//

function classifyModule (key, file) {
  let prefix = key.match(prefixRE)[1]
  if (!modules[prefix]) modules[prefix] = []
  modules[prefix].push(file)
  widgetList.push(file)
}

let [customList, defaultList] = partition(files.keys(), _ => _.includes('index'))
defaultList = defaultList.filter(_ => !customList.includes(_.replace('/type', '/index')))

// use custom config or wrap it with wrapWidget for default
customList.forEach(key => classifyModule(key, wrapWidget(files(key.replace('/index', '/type')).default, files(key).default)))
defaultList.forEach(key => classifyModule(key, wrapWidget(files(key).default)))

export function installWidgets (Vue) {
  widgetList.forEach(_ => {
    Vue.component(_.setting.tag, _.component)
  })
}
export {widgetList}
export default modules
