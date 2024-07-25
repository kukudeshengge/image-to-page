import { isUndef } from '@/utils/type'
import Base from './Base'
import { createStore } from '../../../../store/create'

/**
 * 设置元素对齐方式
 */
class Align extends Base {
  setPosition = (value, target) => {
    if (!this.canvas) return
    let activeObject
    if (target) {
      activeObject = target
    } else {
      activeObject = this.canvas.getActiveObject()
    }
    if (!activeObject) throw new Error('无元素')
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
    this.setPosition({ left: 0 })
  }
  
  /**
   * 顶对齐
   */
  top = () => {
    this.setPosition({ top: 0 })
  }
  
  /**
   * 左右居中对齐
   */
  alignCenter = () => {
    const activeObject = this.canvas.getActiveObject()
    const width = this.workspace.rectWidth || 0
    this.setPosition({ left: (width - activeObject.width * activeObject.scaleX) / 2 })
  }
  
  /**
   * 上下居中对齐
   */
  middleCenter = () => {
    const activeObject = this.canvas.getActiveObject()
    const height = this.workspace.rectHeight || 0
    this.setPosition({ top: (height - activeObject.height * activeObject.scaleY) / 2 })
  }
  
  /**
   * 右对齐
   */
  right = () => {
    const activeObject = this.canvas.getActiveObject()
    const width = this.workspace.rectWidth || 0
    this.setPosition({ left: width - activeObject.width * activeObject.scaleX })
  }
  
  /**
   * 底对齐
   */
  bottom = () => {
    const activeObject = this.canvas.getActiveObject()
    const height = this.workspace.rectHeight || 0
    this.setPosition({ top: height - activeObject.height * activeObject.scaleY })
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
