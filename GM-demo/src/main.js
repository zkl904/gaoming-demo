// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import '@/assets/stylus/index.styl'
import '@/assets/stylus/common.styl'
import '@/assets/reset.css'
import '@/assets/common.css'

import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

import filters from '@/filters'
Vue.prototype.$filter = filters

// global filter  全局注册filter
for (let key in filters) {
  Vue.filter(key, filters[key])
}

// cookieStore
import cookieStore from '@/assets/cookie'
window.cookieStore = cookieStore

// validate  验证
import validate from '@/validate'
Vue.prototype.$validate = validate

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
