import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import './assets/css/base.scss'
import './assets/icon/iconfont'
import SvgIcon from './components/icons/SvgIcon'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.component('svg-icon', SvgIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
