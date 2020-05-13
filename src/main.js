import Vue from 'vue'
import { rtdbPlugin } from 'vuefire'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'
import PortalVue from 'portal-vue'
import router from './router/index.js'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(PortalVue)
Vue.use(rtdbPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
