import { makeAutoObservable } from 'mobx'
import { PageItemStore } from './pageItem'
import { message } from 'antd'
import { v4 as uuid } from 'uuid'
import { loadResource } from '../../utils/load'

class CreateStore {
  id = null
  leftNavScroll = null // 左侧导航scroll
  attrScroll = null // 右侧属性scroll
  comScroll = null // 组件设置scroll
  navActiveKey = 'image-text' // 左侧导航高亮key
  filterActiveKey = 0 // 滤镜高亮key
  attrActiveKey = 0 // 右侧属性高亮key
  comSettingActiveKey = 0 // 组件设置高亮key
  canvasLoading = true
  editPageLoadingModal = false
  publishOpen = false
  canvas = null
  workspace = null
  loadingPage = {
    text: '',
    textColor: '#333333',
    dotType: 'BeatLoader',
    dotColor: '#1261ff'
  }
  selectObjects = []
  pageList = [new PageItemStore()]
  pageIndex = 0
  openSaveModal = false
  showComSetting = false
  audio = {
    name: '',
    src: ''
  }
  
  constructor () {
    makeAutoObservable(this)
  }
  
  init = (canvas, workspace) => {
    this.canvas = canvas
    this.workspace = workspace
    this.render()
  }
  render = () => {
    this.modifiedCanvas()
    this.canvas.on('object:modified', this.modifiedCanvas)
  }
  modifiedCanvas = () => {
    const pageItem = this.getCurrentPage()
    pageItem.canvasData = this.workspace.toObject()
  }
  getCurrentPage = () => {
    return this.pageList[this.pageIndex]
  }
  // 切换页面
  changePage = (index, callback) => {
    this.pageIndex = index
    const pageItem = this.getCurrentPage()
    this.workspace.loadFromJSON(pageItem, callback)
  }
  // 插入页面
  addPage = (index) => {
    const newPage = new PageItemStore()
    const currentPageItem = this.getCurrentPage()
    const rect = currentPageItem.canvasData.objects.find(item => item.id === 'workspace')
    newPage.canvasData = {
      version: currentPageItem.canvasData.version,
      objects: [{ ...rect, fill: '#fff' }]
    }
    if (index !== 0 && !index) {
      this.pageList.push(newPage)
    } else {
      this.pageList.splice(index, 0, newPage)
    }
    this.pageIndex = index
    this.workspace.loadFromJSON(newPage)
    setTimeout(() => this.attrScroll.refresh())
  }
  // 删除页面
  deletePage = (index) => {
    this.pageList.splice(index, 1)
    this.pageIndex = 0
    const currentPageItem = this.getCurrentPage()
    this.workspace.loadFromJSON(currentPageItem)
    setTimeout(() => this.attrScroll.refresh())
  }
  // 复制页面
  copyPage = (index) => {
    const page = this.pageList[index]
    const copyPage = new PageItemStore()
    Object.keys(page).forEach(key => {
      if (key !== 'id') {
        copyPage[key] = JSON.parse(JSON.stringify(page[key]))
      }
    })
    this.pageList.splice(index, 0, copyPage)
    this.pageIndex = index + 1
    this.workspace.loadFromJSON(copyPage)
    setTimeout(() => this.attrScroll.refresh())
  }
  // 应用背景到所有页面
  applyBackground = () => {
    const currentPage = this.getCurrentPage()
    const currentRectFill = currentPage.canvasData.objects.find(item => item.id === 'workspace').fill
    this.pageList.forEach(page => {
      page.rectColor = { ...currentPage.rectColor }
      page.pageAngle = currentPage.pageAngle
      page.opacity = currentPage.opacity
      const rect = page.canvasData.objects.find(item => item.id === 'workspace')
      rect.fill = JSON.parse(JSON.stringify(currentRectFill))
    })
    message.success('应用背景成功')
  }
  // 使用模板
  echoTemplate = (data) => {
    return new Promise(resolve => {
      const pageItem = this.getCurrentPage()
      pageItem.pageAngle = data.pageAngle
      pageItem.canvasData = data.canvasData
      pageItem.filterKey = data.filterKey
      pageItem.filterStyle = data.filterStyle
      pageItem.opacity = data.opacity
      pageItem.rectColor = data.rectColor
      this.workspace.loadFromJSON(pageItem, resolve)
    })
  }
  createPageItemStore = (data) => {
    const page = new PageItemStore()
    page.id = data.id || uuid()
    page.pageAngle = data.pageAngle || 0
    page.showAllFilter = data.showAllFilter || false
    page.filterKey = data.filterKey || 'normal'
    page.filterStyle = data.filterStyle || {}
    page.rectColor = data.rectColor || {
      type: 'bg',
      color: '#fff'
    }
    page.opacity = data.opacity || 0
    page.canvasData = data.canvasData || null
    return page
  }
  setDetail = async (data) => {
    this.audio = data.audio
    this.loadingPage = data.loadingPage
    if (data.pageList && data.pageList.length) {
      this.pageList = data.pageList.map(item => {
        return this.createPageItemStore(item)
      })
    } else {
      this.pageList = [new PageItemStore()]
    }
    await loadResource(this.pageList)
    this.changePage(0, () => {
      this.canvasLoading = false
    })
  }
  clearStore = () => {
    this.id = null
    this.leftNavScroll = null
    this.attrScroll = null
    this.comScroll = null
    this.navActiveKey = 'image-text'
    this.filterActiveKey = 0
    this.attrActiveKey = 0
    this.comSettingActiveKey = 0
    this.canvasLoading = true
    this.editPageLoadingModal = false
    this.publishOpen = false
    this.canvas = null
    this.workspace = null
    this.loadingPage = {
      text: '',
      textColor: '#333333',
      dotType: 'BeatLoader',
      dotColor: '#1261ff'
    }
    this.selectObjects = []
    this.pageList = [new PageItemStore()]
    this.pageIndex = 0
    this.openSaveModal = false
    this.showComSetting = false
    this.audio = {
      name: '',
      src: ''
    }
  }
  objectAttrChange = (attrs) => {
    const [object] = this.selectObjects
    if (!object) return
    object.set(attrs)
    this.canvas.renderAll()
    this.modifiedCanvas()
  }
  getCurrentObjectAttr = (attr) => {
    const page = this.getCurrentPage()
    const activeObject = this.selectObjects[0]
    if (!activeObject) return
    if (!page.canvasData || !page.canvasData.objects) return
    const list = page.canvasData.objects
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === activeObject.id) {
        if (typeof attr === 'string') {
          return list[i][attr]
        } else if (Array.isArray(attr)) {
          const obj = {}
          attr.forEach(key => {
            obj[key] = list[i][key]
          })
          return obj
        }
      }
    }
  }
}

export const createStore = new CreateStore()
