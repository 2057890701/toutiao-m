import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载 Vant 核心组件库
import Vant from 'vant'
// 加载 Vant 全局样式
import 'vant/lib/index.css'
import 'amfe-flexible'
// 自己写的样式文件放到最后让他覆盖其他第三方的
import './styles/index.less'
import './utils/day'




// 注册使用 Vant 组件库
Vue.use(Vant)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
