import { getTypeTitle } from './type'

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
