import { fabric } from 'fabric'
import Base from './Base'
import { WorkspaceId } from '../../../../config/name'

/**
 * 对象获得焦点后在外围显示一个边框
 */
class HoverBorder extends Base {
  canvasEvents = {}
  hoveredTarget
  rect = null
  
  constructor (...props) {
    super(...props)
    this.canvasEvents = {
      'mouse:down': this.clearBorder,
      'mouse:out': this.clearBorder,
      'mouse:over': this.drawBorder
    }
    
    this.canvas.on(this.canvasEvents)
  }
  
  drawBorder = (e) => {
    if (!e) return
    const target = e.e ? e.target : e
    if (!target || target.id === WorkspaceId) return
    if (this.rect) return
    if (target.isType('activeSelection')) return
    const activeObjects = this.canvas.getActiveObjects()
    if (activeObjects.find(item => item === target)) return
    
    this.hoveredTarget = target
    const { left, top, width, height } = this.hoveredTarget.getBoundingRect(true)
    this.rect = new fabric.Rect({
      id: 'hoverBorder',
      width: width + 10,
      height: height + 10,
      left: left - 5,
      top: top - 5,
      stroke: 'rgb(60,126,255)',
      strokeWidth: 1,
      hasControls: false,
      selectable: false,
      strokeDashArray: [3, 2],
      evented: false,
      fill: ''
    })
    this.canvas.add(this.rect)
    this.canvas.renderAll()
  }
  clearBorder = () => {
    this.canvas.remove(this.rect)
    this.rect = null
    this.canvas.renderAll()
  }
  destroy = () => {
    this.canvasEvents = null
    this.hoveredTarget = undefined
    this.rect = null
    this.canvas.off(this.canvasEvents)
  }
}

export default HoverBorder
