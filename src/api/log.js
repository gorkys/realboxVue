/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function getUserLog(params) {
  return request({
    method: 'GET',
    url: 'log/query/user',
    params
  })
}
export function exportUserLog(params) {
  return request({
    method: 'GET',
    url: 'log/export/user',
    params
  })
}

export function getSystemLog(params) {
  return request({
    method: 'GET',
    url: 'log/query/system',
    params
  })
}
export function exportSystemLog(params) {
  return request({
    method: 'GET',
    url: 'log/export/system',
    params
  })
}
