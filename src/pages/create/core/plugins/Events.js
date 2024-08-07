import hotkeys from 'hotkeys-js'
import Base from './Base'
import { MenuKeys } from '../menu/createMenu'
import { getMenuFunc } from '../utils/utils'
import { createStore } from '../../../../store/create'

/**
 * 绑定一些事件
 */
class Events extends Base {
  mousePointer = null
  
  constructor (...props) {
    super(...props)
    this.initMouseMoveEvent()
    this.initMenuEvents()
    this.initSelectEvent()
  }
  
  // 获取鼠标位置
  initMouseMoveEvent = () => {
    this.canvas.on('mouse:move', e => {
      this.mousePointer = e.absolutePointer
      this.calcRemoveMenu(e)
    })
  }
  // 绑定菜单里的快捷键
  initMenuEvents = () => {
    Object.values(MenuKeys).forEach(item => {
      hotkeys(item.eventName, (e) => {
        e.preventDefault()
        getMenuFunc(this.workspace, item.id)?.()
      })
    })
  }
  calcRemoveMenu = (e) => {
    if (!e.absolutePointer) return
    if (!this.workspace.menu.objectBoundingRect) return
    const { x, y } = e.absolutePointer
    const { left, top, width, height } = this.workspace.menu.objectBoundingRect
    if (x < left || y < top || x > left + width || y > top + height) {
      this.workspace.menu.removeMenu()
    }
  }
  initSelectEvent = () => {
    this.canvas.on('selection:updated', this.selectUpdate)
    this.canvas.on('selection:created', this.selectUpdate)
    this.canvas.on('selection:cleared', this.selectUpdate)
  }
  selectUpdate = (e) => {
    const selected = e.selected || []
    createStore.selectObjects = selected
    createStore.showComSetting = selected.length === 1
  }
}

export default Events
