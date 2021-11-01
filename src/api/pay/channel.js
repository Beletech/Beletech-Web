import request from '@/router/axios'

export function getList(query) {
  return request({
    url: '/api/beletech-payment/pay-channel/page',
    method: 'get',
    params: query
  })
}

export function add(obj) {
  return request({
    url: '/api/beletech-payment/pay-channel',
    method: 'post',
    data: obj
  })
}

export function getDetail(id) {
  return request({
    url: '/api/beletech-payment/pay-channel/' + id,
    method: 'get'
  })
}

export function remove(id) {
  return request({
    url: '/api/beletech-payment/pay-channel/' + id,
    method: 'delete'
  })
}

export function update(obj) {
  return request({
    url: '/api/beletech-payment/pay-channel',
    method: 'put',
    data: obj
  })
}
