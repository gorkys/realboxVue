/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function getProgram(params) {
  return request({
    method: 'GET',
    url: 'program/query',
    params
  })
}

export function newProgram(data) {
  return request({
    method: 'POST',
    url: 'program/create',
    data
  })
}

export function putProgram(data) {
  return request({
    method: 'PUT',
    url: 'program/update',
    data
  })
}

export function delProgram(params) {
  return request({
    method: 'DELETE',
    url: 'program/delete',
    params
  })
}
