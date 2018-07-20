const My = () => import(/* webpackChunkName:"My" */'@/pages/user/My')
const Home = () => import(/* webpackChunkName:"Home" */'@/pages/user/Home')
export default [
  {
    name: 'My',
    path: '/my',
    component: My,
    meta: {
      title: '我的',
      displayControl: {
        header: false,
        tabBar: true
      }
    }
  },
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      title: 'home主页',
      displayControl: {
        header: false,
        tabBar: true
      }
    }
  }
]
