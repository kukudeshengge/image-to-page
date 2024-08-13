import Base from './Base'
import { createStore } from '../../../../store/create'

class Order extends Base {
  
  changeOrder = (funcKey, object, modified = true) => {
    if (!this.canvas) return
    object = object || this.canvas.getActiveObject()
    if (!object) return
    object && object[funcKey]?.()
    this.canvas.renderAll()
    if (modified) {
      createStore.modifiedCanvas()
    }
    this.workspace.workspaceSendToBack()
  }
  
  // 上
  up = (object, modified = true) => {
    this.changeOrder('bringForward', object, modified)
  }
  
  // 上到顶
  upTop = (object, modified = true) => {
    this.changeOrder('bringToFront', object, modified)
  }
  
  // 下
  down = (object, modified = true) => {
    this.changeOrder('sendBackwards', object, modified)
  }
  
  // 下到底
  downTop = (object, modified = true) => {
    this.changeOrder('sendToBack', object, modified)
  }
}

export default Order
