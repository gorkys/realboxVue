/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function newRelease(data) {
  return request({
    method: 'POST',
    url: 'publish/create',
    data
  })
}
export function getRelease(params) {
  return request({
    method: 'GET',
    url: 'publish/query',
    params
  })
}

export function delRelease(params) {
  return request({
    method: 'DELETE',
    url: 'publish/delete',
    params
  })
}
