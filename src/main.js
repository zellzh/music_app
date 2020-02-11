import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.scss'
import './assets/icon/iconfont'
import SvgIcon from './components/icons/SvgIcon'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// 移动端console调试插件
// import VConsole from 'vconsole'
// const vConsole = new VConsole()
// Vue.use(vConsole)

Vue.config.productionTip = false

fastClick.attach(document.body)
Vue.component('svg-icon', SvgIcon)
Vue.use(VueLazyload, {
  loading: require('./assets/icon/loading.gif')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
