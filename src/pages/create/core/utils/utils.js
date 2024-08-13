import { fabric } from 'fabric'
import { blankMenus, combinationMenus, imageMenus, shareMenus, textMenus, uploadMenus } from '../menu/createMenu'

export function cssToFabricGradient (stops, width, height, angle) {
  const gradAngleToCoords = (paramsAngle) => {
    const anglePI = -parseInt(paramsAngle, 10) * (Math.PI / 180)
    return {
      x1: Math.round(50 + Math.sin(anglePI) * 50) / 100,
      y1: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) / 100,
      x2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) / 100,
      y2: Math.round(50 + Math.cos(anglePI) * 50) / 100
    }
  }
  const angleCoords = gradAngleToCoords(angle)
  return new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pencentage',
    coords: {
      x1: angleCoords.x1 * width,
      y1: angleCoords.y1 * height,
      x2: angleCoords.x2 * width,
      y2: angleCoords.y2 * height
    },
    colorStops: [...stops]
  })
}

const menuFnCache = new Map()
const recursionGetFn = (list, id) => {
  for (const item of list) {
    if (item.id === id) {
      return item.fn
    }
    if (item.children) {
      const result = recursionGetFn(item.children, id)
      if (result !== undefined) {
        return result
      }
    }
  }
}

export function getMenuFunc (workspace, id) {
  if (!workspace || !id) return null
  if (menuFnCache.has(id)) {
    return menuFnCache.get(id)
  }
  let func = null
  const menuList = [...blankMenus, ...combinationMenus, ...shareMenus, ...imageMenus, ...textMenus, ...uploadMenus]
  const fn = recursionGetFn(menuList, id)
  if (typeof fn === 'function') {
    func = fn
  } else {
    fn.split('.').forEach(key => {
      func = func ? func[key] : workspace[key]
    })
  }
  menuFnCache.set(id, func)
  return func
}
