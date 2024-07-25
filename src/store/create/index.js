import { makeAutoObservable } from 'mobx'
import { PageItemStore } from './pageItem'
import { message } from 'antd'

class CreateStore {
  scroll = null
  attrScroll = null
  navActiveKey = 'image-text'
  filterActiveKey = 0
  attrActiveKey = 1
  editPageLoadingModal = false
  canvas = null
  workspace = null
  loadingPage = {
    text: '',
    textColor: '#333333',
    dotType: 'BeatLoader',
    dotColor: '#1261ff'
  }
  selectObjects = []
  pageList = [
    new PageItemStore()
  ]
  pageIndex = 0
  
  constructor () {
    makeAutoObservable(this)
    // this.createThumbImage = throttle(this.createThumbImage, 50)
  }
  
  init = (canvas, workspace) => {
    this.canvas = canvas
    this.workspace = workspace
    this.render()
  }
  render = () => {
    this.modifiedCanvas()
    this.canvas.on('object:modified', this.modifiedCanvas)
    // const that = this
    // fabric.util.requestAnimFrame(function render () {
    //   that.canvas.renderAll()
    //   that.createThumbImage()
    //   fabric.util.requestAnimFrame(render)
    // })
  }
  modifiedCanvas = () => {
    console.log('modifiedCanvas')
    const pageItem = this.getCurrentPage()
    pageItem.canvasData = this.workspace.toObject()
  }
  getCurrentPage = () => {
    return this.pageList[this.pageIndex]
  }
  // 切换页面
  changePage = (index) => {
    this.pageIndex = index
    const pageItem = this.getCurrentPage()
    this.workspace.loadFromJSON(pageItem)
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
}

export const createStore = new CreateStore()
