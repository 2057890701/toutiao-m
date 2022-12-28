import request from '@/utils/request'

// 取消关注
export function deleteFollowed(userId) {
  return request({
    url: `v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 添加关注
export function addFollowed(userId) {
  return request({
    url: 'v1_0/user/followings',
    method: 'POST',
    data: { target: userId, }
  })
}

// 获取用户信息
export function getUserProfile() {
  return request({
    url: 'v1_0/user/profile',
  })
}

// 更新用户资料
export function updateUserProfile(data) {
  return request({
    method: 'PATCH',
    url: 'v1_0/user/profile',
    data
  })
}

// 更新头像
export function updateUserPhoto(data) {
  return request({
    method: 'PATCH',
    url: 'v1_0/user/photo',
    data
  })
}