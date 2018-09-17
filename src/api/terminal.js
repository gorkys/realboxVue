/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function getTerminal(params) {
  return request({
    method: 'GET',
    url: 'terminal/query',
    params
  })
}

export function delTerminal(params) {
  return request({
    method: 'DELETE',
    url: 'terminal/delete',
    params
  })
}

export function getTerminalSyn(params) {
  return request({
    method: 'GET',
    url: 'terminal/syn',
    params
  })
}

export function setTerminalWea(params) {
  return request({
    method: 'GET',
    url: 'terminal/wea',
    params
  })
}

export function setTerminalGroupWea(params) {
  return request({
    method: 'GET',
    url: 'terminal/groupWea',
    params
  })
}
