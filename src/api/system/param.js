import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/beletech-system/param/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/beletech-system/param/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/beletech-system/param/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/beletech-system/param/submit',
    method: 'post',
    data: row
  })
}
