import FontFaceObserver from 'fontfaceobserver'
import { getFontManage } from '../api/text'
import { maxLoadFontTime } from '../config'

export const loadImage = (src) => {
  if (!src) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      resolve()
    }
    img.onerror = (err) => {
      reject(err)
    }
    img.src = src
  })
}

export const loadImageList = (list) => {
  return Promise.allSettled(list.map(src => loadImage(src)))
}

const filterToText = (list) => {
  return list.filter((item) => item !== 'serif')
}
const Font = new Map()
export const loadFontList = async (list) => {
  if (!Array.isArray(list)) return Promise.resolve()
  // 拿到需要加载字体包的字体
  const textList = filterToText(list)
  if (!textList.length) return Promise.resolve()
  const acTextList = await getFontManage()
  let style = ''
  textList.forEach(item => {
    acTextList.forEach(r => {
      if (item === r.key) {
        style += `@font-face {font-family: ${r.key};src: url('${r.fontlibfile}');}`
      }
    })
  })
  if (style === '') return Promise.resolve()
  const el = document.createElement('style')
  el.innerHTML = style
  document.body.appendChild(el)
  const fontFamiliesAll = textList.map((item) => {
    return new Promise((resolve, reject) => {
      if (Font.has(item)) return resolve()
      const font = new FontFaceObserver(item)
      font.load(item, maxLoadFontTime).then(() => {
        resolve()
        Font.set(item, 'finish')
      }).catch(reject)
    })
  })
  return Promise.allSettled(fontFamiliesAll)
}

const findResource = (object, imageList = [], fontList = []) => {
  if (object.type === 'image') {
    imageList.push(object.src)
  } else if (object.type === 'textbox') {
    fontList.push(object.fontFamily)
  } else if (object.type === 'group') {
    object.objects.forEach((item) => {
      findResource(item, imageList, fontList)
    })
  }
  return {
    imageList,
    fontList
  }
}

export const loadResource = async (data) => {
  const res = {
    imageList: [],
    fontList: []
  }
  if (Array.isArray(data) || data.canvasData) {
    let list = []
    if (Array.isArray(data)) {
      data.forEach(item => {
        item.canvasData?.objects.forEach(item => list.push(item))
      })
    } else {
      list = data.canvasData?.objects
    }
    list.forEach(item => {
      const { imageList, fontList } = findResource(item)
      res.imageList = [...res.imageList, ...imageList]
      res.fontList = [...res.fontList, ...fontList]
    })
  } else if (data.type === 'group') {
    const { imageList, fontList } = findResource(data)
    res.imageList = imageList
    res.fontList = fontList
  }
  await loadImageList(res.imageList)
  await loadFontList(res.fontList)
}
