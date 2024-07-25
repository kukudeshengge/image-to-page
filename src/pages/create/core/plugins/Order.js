import Base from './Base'
import { createStore } from '../../../../store/create'

class Order extends Base {
  
  changeOrder = (funcKey, object) => {
    if (!this.canvas) return
    object = object || this.canvas.getActiveObject()
    if (!object) return
    object && object[funcKey]?.()
    this.canvas.renderAll()
    createStore.modifiedCanvas()
    // this.editor?.workspaceSendToBack()
  }
  
  // 上
  up = (object) => {
    this.changeOrder('bringForward', object)
  }
  
  // 上到顶
  upTop = (object) => {
    this.changeOrder('bringToFront', object)
  }
  
  // 下
  down = (object) => {
    this.changeOrder('sendBackwards', object)
  }
  
  // 下到底
  downTop = (object) => {
    this.changeOrder('sendToBack', object)
  }
}

export default Order
