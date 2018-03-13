import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuetify from 'vuetify'
import 'element-ui/lib/theme-chalk/index.css'
import 'vuetify/dist/vuetify.min.css'
import App from './App'
import router from './router'
import store from './store'
import {installBlocks} from './blocks'
import { sync } from 'vuex-router-sync'
import mixins from './mixins/base'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

sync(store, router)

Vue.use(ElementUI)
Vue.use(Vuetify)
installBlocks(Vue)
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
