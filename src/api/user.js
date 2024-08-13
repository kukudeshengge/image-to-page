import { fetch } from './fetch'

export const login = (data) => {
  return fetch.post('/image_to_h5/user/login', data)
}

export const getUserInfo = (data) => {
  return fetch.get('/image_to_h5/user/info', data)
}
