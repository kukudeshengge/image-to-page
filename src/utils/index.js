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
