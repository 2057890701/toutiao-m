import request from "@/utils/request";
export function getArticleById(articleId) {
  return request({
    // method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

// 获取评论
export function getComments(params) {
  return request({
    url: 'v1_0/comments',
    params: params
  })
}

// 收藏文章
export function addCollect(target) {
  return request({
    url: 'v1_0/article/collections',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 取消收藏文章id
export function deleteCollect(target) {
  return request({
    url: `v1_0/article/collections/${target}`,
    method: 'DELETE',
  })
}

// 对文章点赞
export function addLike(target) {
  return request({
    url: 'v1_0/article/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 取消文章点赞
export function deleteLike(target) {
  return request({
    url: `v1_0/article/likings/${target}`,
    method: 'DELETE',
  })
}

