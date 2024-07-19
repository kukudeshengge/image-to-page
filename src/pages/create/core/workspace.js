import { fabric } from 'fabric'
import { cssToFabricGradient } from './utils'

class Workspace {
  canvas = null
  rect = null
  canvasWidth = 0
  canvasHeight = 0
  rectWidth = 375
  rectHeight = 667
  
  constructor (canvas, options) {
    this.canvas = canvas
    this.canvasWidth = options.width
    this.canvasHeight = options.height
    this.initRect()
  }
  
  // 初始化rect
  initRect = () => {
    const width = this.rectWidth
    const height = this.rectHeight
    const left = this.canvasWidth / 2 - this.rectWidth / 2
    const top = this.canvasHeight / 2 - this.rectHeight / 2
    const rect = new fabric.Rect({
      width,
      height,
      fill: '#fff',
      left,
      top,
      selectable: false,
      controls: false,
      hoverCursor: 'default',
      shadow: {
        color: 'rgba(0, 0, 0, 0.16)',
        blur: 10,
        offsetX: 0,
        offsetY: 0
      }
    })
    this.rect = rect
    this.canvas.add(rect)
    this.canvas.renderAll()
  }
  // 修改rect属性
  setRectAttr = (name, value) => {
    this.rect.set(name, value)
    return this.canvas
  }
  // 设置rect渐变色
  setRectLinearColor = (options) => {
    const stops = [
      {
        offset: 0,
        color: options.startColor
      },
      {
        offset: 1,
        color: options.endColor
      }
    ]
    const gradient = cssToFabricGradient(stops, this.rectWidth, this.rectHeight, options.angle || 0)
    this.setRectAttr('fill', gradient).requestRenderAll()
  }
  setRectFilter = (item) => {
    const el = document.querySelector('.canvas-container');
    el.style.filter = item.style.filter
  }
}

export default Workspace
