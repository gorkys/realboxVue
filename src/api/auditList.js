/*
 Created by Gorky on 2018/8/14
*/
import request from '@/utils/request'

export function publishAudit(params) {
  return request({
    method: 'GET',
    url: 'publish/audit',
    params
  })
}
