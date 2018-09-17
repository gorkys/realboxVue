/*
 Created by Gorky on 2018/8/13
*/
import request from '@/utils/request'

export function getUser(params) {
  return request({
    method: 'GET',
    url: 'user/query',
    params
  })
}
export function newUser(data) {
  return request({
    method: 'POST',
    url: 'user/create',
    data
  })
}
export function updateUser(data) {
  return request({
    method: 'PUT',
    url: 'user/update',
    data
  })
}

export function delUser(params) {
  return request({
    method: 'DELETE',
    url: 'user/delete',
    params
  })
}
