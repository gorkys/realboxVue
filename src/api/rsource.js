/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function getResource(params) {
  return request({
    method: 'GET',
    url: 'resource/query',
    params
  })
}

export function delResource(params) {
  return request({
    method: 'DELETE',
    url: 'resource/delete',
    params
  })
}
