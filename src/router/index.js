import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  { path: '/login', component: () => import('@/views/login'), name: 'login' },
  {
    path: '/',
    component: () => import('@/views/layout'),
    // name: 'layout', // 如果父路由有默认子路由，那他的name就没有意义，可以省略
    children: [
      {
        path: '',  // 默认子路由，只能有一个，当访问/的时候，显示home组件
        component: () => import('@/views/home'),
        name: 'home'
      },
      {
        path: '/qa',
        component: () => import('@/views/qa'),
        name: 'qa'
      },
      {
        path: '/video',
        component: () => import('@/views/video'),
        name: 'video'
      },
      {
        path: '/my',
        component: () => import('@/views/my'),
        name: 'my'
      },
    ]
  },
  { path: '/search', component: () => import('@/views/search'), name: 'search' },
  {
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    name: 'article',
    props: true // 通过声明props: true 就把路径的动态参数作为父子通信props传递给article组件
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
  }
]

const router = new VueRouter({
  routes
})

export default router
