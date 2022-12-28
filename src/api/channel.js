import request from "@/utils/request";

// 获取频道下文章列表数据
export function loadArticleList(params) {
  return request({
    url: '/v1_0/articles',
    params: params
  })
}


// 获取所有频道
export function getAllChannels() {
  return request({
    url: '/v1_0/channels'
  })
}

// 新增用户频道
export function addUserChannel(data) {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: data
  })
}

// 删除用户频道
export function deleteUserChannel(channelId) {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE',
  })
}