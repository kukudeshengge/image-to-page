import { fetch } from './fetch'

// upload
export const uploadResource = (data) => {
  return fetch.post('/image_to_h5/resource/upload', data)
}

// 列表
export const queryResourceList = (data) => {
  return fetch.get('/image_to_h5/resource/resource_list', data)
}


export const addImage = (data) => {
  return fetch.post('/image_to_h5/image/add_image', data)
}
