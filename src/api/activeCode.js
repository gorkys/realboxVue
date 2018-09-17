/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function newActivate(params) {
  return request({
    method: 'GET',
    url: 'activate/create',
    params
  })
}

export function getActivate(params) {
  return request({
    method: 'GET',
    url: 'activate/query',
    params
  })
}

export function delActivate(params) {
  return request({
    method: 'DELETE',
    url: 'activate/delete',
    params
  })
}

export function exportActivate(params) {
  return request({
    method: 'GET',
    url: 'activate/export',
    params
  })
}

export function unbundledActivate(params) {
  return request({
    method: 'GET',
    url: 'activate/unbundled',
    params
  })
}
