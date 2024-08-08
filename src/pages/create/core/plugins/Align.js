import { isUndef } from '@/utils/type'
import Base from './Base'
import { createStore } from '../../../../store/create'

/**
 * 设置元素对齐方式
 */
class Align extends Base {
  getObject = (target) => {
    let activeObject
    if (target) {
      activeObject = target
    } else {
      activeObject = this.canvas.getActiveObject()
    }
    return activeObject
  }
  setPosition = (activeObject, value) => {
    if (!this.canvas || !activeObject) return
    const { left, top } = value
    const pos = {}
    if (!isUndef(left)) pos.left = left
    if (!isUndef(top)) pos.top = top
    activeObject.set(pos)
    this.canvas.renderAll()
    createStore.modifiedCanvas()
  }
  
  /**
   * 左对齐
   */
  left = () => {
    const activeObject = this.getObject()
    this.setPosition(activeObject, { left: activeObject.getScaledWidth() / 2 })
  }
  
  /**
   * 顶对齐
   */
  top = () => {
    const activeObject = this.getObject()
    this.setPosition(activeObject, { top: activeObject.getScaledHeight() / 2 })
  }
  
  /**
   * 左右居中对齐
   */
  alignCenter = () => {
    const activeObject = this.getObject()
    const width = this.workspace.rectWidth || 0
    this.setPosition(activeObject, { left: width / 2 })
  }
  
  /**
   * 上下居中对齐
   */
  middleCenter = () => {
    const activeObject = this.getObject()
    const height = this.workspace.rectHeight || 0
    this.setPosition(activeObject, { top: height / 2 })
  }
  
  /**
   * 右对齐
   */
  right = () => {
    const activeObject = this.getObject()
    const width = this.workspace.rectWidth || 0
    this.setPosition(activeObject, { left: width - activeObject.getScaledWidth() / 2 })
  }
  
  /**
   * 底对齐
   */
  bottom = () => {
    const activeObject = this.getObject()
    const height = this.workspace.rectHeight || 0
    this.setPosition(activeObject, { top: height - activeObject.getScaledHeight() / 2 })
  }
  
  /**
   * 上下左右居中
   */
  center = () => {
    this.alignCenter()
    this.middleCenter()
  }
}

export default Align
