import request from '@/utils/request'

// 对评论点赞
export function addCommentLike(target) {
  return request({
    url: 'v1_0/comment/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 取消对评论点赞
export function deleteCommentLike(target) { 
  return request({
    url: `v1_0/comment/likings/${target}`,
    method: 'DELETE',
  })
}

// 发布评论
export function addComment(data) {
  return request({
    url: 'v1_0/comments',
    method: 'POST',
    data
  })
}