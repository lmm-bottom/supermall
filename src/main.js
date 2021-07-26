import Vue from 'vue'

import App from './App.vue'
import router from './router'
// import mitt from "mitt"
Vue.config.productionTip = false
import bus from './bus.js'// mitt 总线程引入
import store from './store'
// 解决移动端300ms延迟
import fastClick from 'fastclick'

import lazyload from 'vue-lazyload'

fastClick.attach(document.body)
Vue.use(lazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
Vue.prototype.$bus = bus