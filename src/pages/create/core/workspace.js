import { fabric } from 'fabric'
import { cssToFabricGradient } from './utils'
import { filterList } from '../components/Attr/config'

const ExportAttrs = ['id', 'selectable', 'hasControls', 'hoverCursor']

class Workspace {
  canvas = null
  canvasWidth = 0
  canvasHeight = 0
  rectWidth = 375
  rectHeight = 667
  
  constructor (canvas) {
    this.canvas = canvas
    this.canvasWidth = canvas.width
    this.canvasHeight = canvas.height
    this.initRect()
  }
  
  // 初始化rect
  initRect = () => {
    const width = this.rectWidth
    const height = this.rectHeight
    const left = this.canvasWidth / 2 - this.rectWidth / 2
    const top = this.canvasHeight / 2 - this.rectHeight / 2
    const rect = new fabric.Rect({
      id: 'workspace',
      width,
      height,
      fill: '#fff',
      left,
      top,
      selectable: false,
      controls: false,
      hoverCursor: 'default'
      // shadow: {
      //   color: 'rgba(0, 0, 0, 0.16)',
      //   blur: 10,
      //   offsetX: 0,
      //   offsetY: 0
      // }
    })
    this.canvas.add(rect)
    this.canvas.renderAll()
  }
  // 修改rect属性
  setRectAttr = (name, value) => {
    this.getRect().set(name, value)
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
    this.setRectAttr('fill', gradient).renderAll()
  }
  getRect = () => {
    return this.canvas.getObjects().find(item => item.id === 'workspace')
  }
  setRectFilter = (item) => {
    const el = document.querySelector('.canvas-container')
    el.style.filter = item.style.filter
  }
  
  // 获取图片
  toImage () {
    const rect = this.getRect()
    const { left, top, width, height } = rect
    const option = {
      format: 'png',
      quality: 1,
      left,
      top,
      width,
      height
    }
    return this.canvas.toDataURL(option)
  }
  
  toObject () {
    return this.canvas.toObject(ExportAttrs)
  }
  
  // 加载json
  loadFromJSON (data) {
    const filterItem = filterList.find(item => item.type === data.filterKey)
    this.setRectFilter(filterItem)
    this.canvas.loadFromJSON(data.canvasData)
  }
}

export default Workspace
