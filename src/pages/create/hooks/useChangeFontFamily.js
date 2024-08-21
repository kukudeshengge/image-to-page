// @ts-nocheck
import { useCallback } from 'react'
import FontFaceObserver from 'fontfaceobserver'
import { createStore } from '../../../store/create'

// 缓存已经加载过的字体包名称，有重复的引用无需再次引入了
const Font = new Map()

const useChangeFontFamily = () => {
  const {objectAttrChange} = createStore
  
  /**
   * 字体修改
   */
  const runChange = useCallback((item) => {
    // 已经加载过不需要重新加载 直接设置字体
    if (Font.has(item.key)) {
      objectAttrChange({ fontFamily: item.key })
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      const { key: name, fontlibfile: src } = item
      const styleContent = `@font-face { font-family: ${name}; src: url('${src}'); }`
      const style = document.createElement('style')
      style.innerHTML = styleContent
      document.body.appendChild(style)
      const font = new FontFaceObserver(name)
      return font.load(name, 2000000).then(function () {
        Font.set(name, true)
        objectAttrChange({ fontFamily: name })
        createStore.modifiedCanvas()
        resolve()
      }, function (e) {
        document.body.removeChild(style)
        reject()
      })
    })
    
  }, [])
  
  return {
    runChange,
  }
}

export default useChangeFontFamily
