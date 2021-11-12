import request from '@/router/axios';

export const getList = (current, size, params, deptId) => {
  return request({
    url: '/api/beletech-user/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
      deptId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/beletech-user/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/beletech-user/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/beletech-user/update',
    method: 'post',
    data: row
  })
}

export const updatePlatform = (userId, userType, userExt) => {
  return request({
    url: '/api/beletech-user/update-platform',
    method: 'post',
    params: {
      userId,
      userType,
      userExt,
    }
  })
}

export const getUser = (id) => {
  return request({
    url: '/api/beletech-user/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getUserPlatform = (id) => {
  return request({
    url: '/api/beletech-user/platform-detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/beletech-user/info',
    method: 'get',
  })
}

export const resetPassword = (userIds) => {
  return request({
    url: '/api/beletech-user/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
}

export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: '/api/beletech-user/update-password',
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    }
  })
}

export const updateInfo = (row) => {
  return request({
    url: '/api/beletech-user/update-info',
    method: 'post',
    data: row
  })
}

export const grant = (userIds, roleIds) => {
  return request({
    url: '/api/beletech-user/grant',
    method: 'post',
    params: {
      userIds,
      roleIds,
    }
  })
}
