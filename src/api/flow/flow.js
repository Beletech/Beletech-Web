import request from '@/router/axios';

export const modelList = (current, size, params) => {
  return request({
    url: '/api/beletech-flow/model/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const managerList = (current, size, params) => {
  return request({
    url: '/api/beletech-flow/manager/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const followList = (current, size, params) => {
  return request({
    url: '/api/beletech-flow/follow/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


export const removeModel = (ids) => {
  return request({
    url: '/api/beletech-flow/model/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const deployModel = (params) => {
  return request({
    url: '/api/beletech-flow/model/deploy',
    method: 'post',
    params
  })
}

export const changeState = (params) => {
  return request({
    url: '/api/beletech-flow/manager/change-state',
    method: 'post',
    params
  })
}

export const deployUpload = (category, tenantIds, files) => {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('tenantIds', tenantIds);
  files.forEach(file => {
    formData.append('files', file);
  });
  return request({
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: '/api/beletech-flow/manager/deploy-upload',
    method: 'post',
    data: formData
  })
}

export const deleteDeployment = (deploymentIds) => {
  return request({
    url: '/api/beletech-flow/manager/delete-deployment',
    method: 'post',
    params: {
      deploymentIds,
    }
  })
}

export const deleteProcessInstance = (params) => {
  return request({
    url: '/api/beletech-flow/follow/delete-process-instance',
    method: 'post',
    params
  })
}