/*
 Created by Gorky on 2018/8/13
*/
import request from '@/utils/request'

export function getRole(params) {
  return request({
    method: 'GET',
    url: '/role/query',
    params
  })
}

export function newRole(data) {
  return request({
    method: 'POST',
    url: 'role/create',
    data
  })
}

export function updateRole(data) {
  return request({
    method: 'PUT',
    url: 'role/update',
    data
  })
}

export function delRole(params) {
  return request({
    method: 'DELETE',
    url: 'role/delete',
    params
  })
}

export function getPrivilege(params) {
  return request({
    method: 'GET',
    url: 'privilege/query',
    params
  })
}

export function newPrivilege(data) {
  return request({
    method: 'POST',
    url: 'privilege/create',
    data
  })
}

export function updatePrivilege(data) {
  return request({
    method: 'PUT',
    url: 'privilege/update',
    data
  })
}
