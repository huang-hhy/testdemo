import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import http from '../http'
import { Toast } from 'vant'

Vue.prototype.$msg=Toast
Vue.prototype.$http=http

Vue.use(Vant)
Vue.config.productionTip = false
Vue.config.devtools = true


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
