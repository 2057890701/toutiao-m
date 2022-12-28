import request from '@/utils/request'
// import store from '@/store'
export function login(data) {
  return request({
    url: 'v1_0/authorizations',
    method: 'POST',
    data: data
  })
}

export function getSmsCode(mobile) {
  return request({
    url: `v1_0/sms/codes/${mobile}`
  })
}

export function getUserInfo() {
  return request({
    // method: 'GET',
    url: 'v1_0/user',
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: 'Bearer ' + store?.state?.UserToken?.token
    // }
  })
}

export function getUserChannels() { 
  return request({
    url: 'v1_0/user/channels'
  })
}