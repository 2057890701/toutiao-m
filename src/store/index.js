import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)


const tokenUser = 'tokenUser'

export default new Vuex.Store({
  state: {
    UserToken: getItem(tokenUser) // 存储用户的token, refresh_token等登录信息
  },
  getters: {
  },
  mutations: {
    setUserToken(state, payload) {
      console.log(payload);
      state.UserToken = payload // 把token, refresh_token等登录信息存入UserToken
      setItem(tokenUser, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
