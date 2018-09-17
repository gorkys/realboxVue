/*
 Created by Gorky on 2018/8/13
*/
import request from '@/utils/request'
export function getTree(params) {
  return request({
    method: 'GET',
    url: 'tree/query',
    params
  })
}

export function newTree(data) {
  return request({
    method: 'POST',
    url: 'tree/create',
    data
  })
}

export function updateTree(data) {
  return request({
    method: 'PUT',
    url: 'tree/update',
    data
  })
}

export function delTree(params) {
  return request({
    method: 'DELETE',
    url: 'tree/delete',
    params
  })
}
