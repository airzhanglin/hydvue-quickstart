import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './assets/scss/main.scss'
import importDirective from '@/directive'

Vue.config.productionTip = false

/**
 * 注册指令
 */
importDirective(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
