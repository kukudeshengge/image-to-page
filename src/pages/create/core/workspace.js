import { fabric } from 'fabric'
import { cssToFabricGradient } from './utils/utils'
import Menu from './menu/menu'
import { plugins } from './plugins'
import { initConfig } from './share/initConfig'
import { WorkspaceId } from '../../../config/name'

const ExportAttrs = ['id', 'selectable', 'hasControls', 'hoverCursor', 'videoUrl']

class Workspace {
  canvas = null
  canvasWidth = 0
  canvasHeight = 0
  rectWidth = 375
  rectHeight = 667
  
  constructor (canvas) {
    this.canvas = canvas
    this.canvas.share = {}
    this.canvasWidth = canvas.width
    this.canvasHeight = canvas.height
    initConfig(canvas)
    this._initPlugins()
    this.initRect()
  }
  
  _initPlugins () {
    this._use('menu', Menu)
    for (let i = 0; i < plugins.length; i++) {
      this._use(plugins[i].name, plugins[i].plugin)
    }
  }
  
  _use (name, C) {
    this[name] = new C(this.canvas, this)
    this.canvas.share[name] = this[name]
  }
  
  // 初始化rect
  initRect = () => {
    const width = this.rectWidth
    const height = this.rectHeight
    const rect = new fabric.Rect({
      id: WorkspaceId,
      width,
      height,
      fill: '#fff',
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
    this.setCenterFromObject(rect)
  }
  
  // 设置画布中心到指定对象中心点上
  setCenterFromObject (object) {
    const { canvas, canvasWidth, canvasHeight } = this
    const objCenter = object.getCenterPoint()
    const viewportTransform = canvas.viewportTransform
    if (!canvasWidth || !canvasHeight || !viewportTransform) return
    viewportTransform[4] = canvasWidth / 2 - objCenter.x * viewportTransform[0]
    viewportTransform[5] = canvasHeight / 2 - objCenter.y * viewportTransform[3]
    canvas.setViewportTransform(viewportTransform)
    canvas.renderAll()
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
    const el = document.querySelector('#draw-container')
    const style = item.style
    el.style = Object.keys(style).reduce((prev, next) => {
      return `${prev}${next}:${style[next]};`
    }, '')
  }
  
  workspaceSendToBack = () => {
    const rect = this.getRect()
    rect.sendToBack()
  }
  
  // 获取图片
  toImage () {
    const rect = this.getRect()
    const { left, top, width, height } = rect
    const viewportTransform = this.canvas.viewportTransform
    
    const result = this.canvas.toDataURL({
      format: 'jpeg',
      quality: 1,
      left: left + viewportTransform[4],
      top: top + viewportTransform[5],
      width: width,
      height: height
    })
    return result
  }
  
  toObject () {
    return this.canvas.toObject(ExportAttrs)
  }
  
  // 加载json
  loadFromJSON (data) {
    this.setRectFilter({ style: data.filterStyle })
    this.canvas.loadFromJSON(data.canvasData)
  }
}

export default Workspace
