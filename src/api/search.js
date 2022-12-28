import request from '@/utils/request'

export function getSearchSuggestions(params) {
  return request({
    url: 'v1_0/suggestion',
    params
  })
}

export function getSearchResults(params) { 
  return request({
    url: 'v1_0/search',
    params
  })
}
