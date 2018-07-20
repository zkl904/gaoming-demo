import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import user from './modules/user'

Vue.use(Router)

export default new Router({
  mode: 'history',   // history 或者 hash模式
  routes: [
    ...user,
    {
      path: '*',
      redirect: '/'
    }
    // {
    //   path: '/user',
    //   component: HelloWorld
    // }
  ]
})
