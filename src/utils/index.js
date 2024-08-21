import { getTypeTitle } from './type'
import { v4 as uuid } from 'uuid'

export function debounce (func, wait) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    
    if (timeout) clearTimeout(timeout)
    
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

export function throttle (func, wait) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
    
  }
}

export function getDocumentSize () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

export function uploadFile (props) {
  const { accept } = props
  return new Promise((resolve, reject) => {
    let input = document.querySelector('#upload-file-el')
    if (!input) {
      input = document.createElement('input')
      input.id = 'upload-file-el'
      input.style.display = 'none'
      input.type = 'file'
    }
    input.accept = accept
    input.click()
    
    input.onchange = (e) => {
      const [file] = e.target.files
      if (file) {
        const suffix = getSuffix(file.name)
        if (accept.indexOf(suffix.toLowerCase()) === -1) {
          reject(new Error(`请选择正确的文件，仅支持${getTypeTitle(accept)}`))
          input.files = undefined
          return
        }
      }
      resolve(e)
      input.files = undefined
    }
    input.onerror = (err) => {
      reject(err)
      input.files = undefined
    }
  })
}

export function getSuffix (name) {
  return name.slice(name.lastIndexOf('.') + 1)
}

/**
 * base64转file
 * @param {string} urlData base64格式图片
 * @returns
 */
export function base64ConvertFile (urlData) {
  const arr = urlData.split(',')
  // @ts-ignore
  const type = arr[0].match(/:(.*?);/)[1]
  const fileExt = type.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${uuid()}.` + fileExt, {
    type: type
  })
}

/**
 * 获取文件大小
 * @param size
 * @return {string}
 */
export const bytesToSize = (size) => {
  if (size < 0.1 * 1024) {
    //小于0.1KB，则转化成B
    size = size.toFixed(2) + 'B'
  } else if (size < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    size = (size / 1024).toFixed(2) + 'KB'
  } else if (size < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    size = (size / (1024 * 1024)).toFixed(2) + 'MB'
  } else {
    // 其他转化成GB
    size = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }
  
  // 转成字符串
  let sizeStr = size + '',
    // 获取小数点处的索引
    index = sizeStr.indexOf('.'),
    // 获取小数点后两位的值
    dou = sizeStr.substr(index + 1, 2)
  
  // 判断后两位是否为00，如果是则删除00
  if (dou == '00')
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  
  return size
}

export const extractUrlCentreSize = (src) => {
  const result = { width: null, height: null, scale: null };
  if (!src) return result;
  const prop = src.slice(src.lastIndexOf('_') + 1, src.lastIndexOf('.'));
  const [width, height] = prop.split('x');
  if (width && height) {
    result.width = width;
    result.height = height;
    result.scale = (width / height).toFixed(2);
  }
  return result;
};

export const getMoveIndex = (array, dragItem) => {
  const { active, over } = dragItem
  const activeIndex = array.findIndex((item) => item.id === active.id)
  const overIndex = array.findIndex((item) => item.id === over?.id)
  
  // 处理未找到索引的情况
  return {
    activeIndex: activeIndex !== -1 ? activeIndex : 0,
    overIndex: overIndex !== -1 ? overIndex : activeIndex
  }
}
