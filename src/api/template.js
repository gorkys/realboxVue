/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function getTemplate(params) {
  return request({
    method: 'GET',
    url: 'template/query',
    params
  })
}

export function newTemplate(data) {
  return request({
    method: 'POST',
    url: 'template/create',
    data
  })
}

export function putTemplate(data) {
  return request({
    method: 'PUT',
    url: 'template/update',
    data
  })
}
export function delTemplate(params) {
  return request({
    method: 'DELETE',
    url: 'template/delete',
    params
  })
}
