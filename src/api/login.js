/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: 'login',
    data
  })
}
export function setLanguage(params) {
  return request({
    method: 'GET',
    url: 'system/language',
    params
  })
}
export function checkStatus(data) {
  return request({
    method: 'GET',
    url: 'system/check',
    data
  })
}
