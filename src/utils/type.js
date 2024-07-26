export const isNumber = (value) => typeof value === 'number'
export const isUndef = (value) => typeof value === 'undefined'

export const imageTypes = '.png,.jpg,.jpeg,.gif'
export const audioTypes = '.mp3'
export const videoTypes = '.mp4'

export const getTypeTitle = (str) => {
  str = str.replaceAll('.','')
  return str.toUpperCase()
}
