// @ts-nocheck
import { useCallback } from 'react'
import useAttr from './useAttr'
import FontFaceObserver from 'fontfaceobserver'
import { createStore } from '../../../store/create'

// 通用字体，不需要加载字体包
const GeneralTextList = ['serif']
// 缓存已经加载过的字体包名称，有重复的引用无需再次引入了
const Font = new Map()

/**
 * 过滤出非通用字体
 * @param list
 */
export const filterToText = (list) => {
  if (!Array.isArray(list)) return []
  return list.filter((item) => item.type === 'textbox' && !GeneralTextList.includes(item.fontFamily))
}

const useChangeFontFamily = () => {
  const { setAttr } = useAttr()
  
  /**
   * 字体修改
   */
  const runChange = useCallback((item) => {
    // 已经加载过不需要重新加载 直接设置字体
    if (Font.has(item.key)) {
      setAttr({ fontFamily: item.key })
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
        setAttr({ fontFamily: name })
        createStore.modifiedCanvas()
        resolve()
      }, function (e) {
        document.body.removeChild(style)
        reject()
      })
    })
    
  }, [setAttr])
  /**
   * 加载多个字体
   */
  const loadFont = useCallback((objectsData) => {
    if (!objectsData) return Promise.resolve()
    // 拿到需要加载字体包的字体
    const textList = filterToText(objectsData)
    let style = ''
    textList.forEach(item => {
      [].forEach(r => {
        if (item.fontFamily === r.value && !Font.has(r.value)) {
          style += `@font-face {font-family: ${r.value};src: url('${r.url}');}`
        }
      })
    })
    if (style === '') return Promise.resolve()
    // 组装一下font-face，放到body中
    const el = document.createElement('style')
    el.innerHTML = style
    document.body.appendChild(el)
    // 加载多个字体
    const fontFamiliesAll = textList.map((item) => {
      return new Promise((resolve, reject) => {
        const font = new FontFaceObserver(item.fontFamily)
        font.load(item.fontFamily, 2000000).then(() => {
          Font.set(item.fontFamily, true)
          resolve()
        }).catch(err => {
          reject()
          console.log('loadFont', err)
        })
      })
    })
    return Promise.all(fontFamiliesAll)
  }, [])
  
  return {
    runChange,
    loadFont
  }
}

export default useChangeFontFamily
