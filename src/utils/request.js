import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// axios 的请求拦截器: 任何请求都走这个拦截器, 等拦截器处理完成后再发起请求
request.interceptors.request.use(
  config => {
    if (store?.state?.UserToken?.token) {
      config.headers['Authorization'] = 'Bearer ' + store?.state?.UserToken?.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
export default request
