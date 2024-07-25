import { fabric } from 'fabric'
import Base from './Base'

/**
 * 对象获得焦点后在外围显示一个边框
 */
class HoverBorder extends Base{
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
    if (!e.target || e.target.id === 'workspace') return
    if (this.rect) return
    if (e.target.isType('activeSelection')) return
    this.drawRect(e.target)
  }
  drawRect = (target) => {
    const activeObjects = this.canvas.getActiveObjects()
    if (activeObjects.find(item => item === target)) return
    this.hoveredTarget = target
    const { left, top, width, height } = this.hoveredTarget.getBoundingRect(true)
    this.rect = new fabric.Rect({
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
}

export default HoverBorder
