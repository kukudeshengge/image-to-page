import { fetch } from './fetch'

export const uploadResource = (data) => {
  return fetch.post('/image_to_h5/resource/upload', data)
}

export const queryResourceList = (data) => {
  return fetch.get('/image_to_h5/resource/resource_list', data)
}

export const addImage = (data) => {
  return fetch.get('/image_to_h5/image/add_image', data)
}

export const imageList = (data) => {
  return fetch.get('/image_to_h5/image/image_list', data)
}

export const getImageDetail = (data) => {
  return fetch.get('/image_to_h5/image/detail', data)
}

export const saveImage = (data) => {
  return fetch.post('/image_to_h5/image/save', data)
}

export const deleteImage =(data) => {
  return fetch.get('/image_to_h5/image/delete', data)
}
