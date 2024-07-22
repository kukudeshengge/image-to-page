import { makeAutoObservable } from 'mobx'
import { PageItemStore } from './pageItem'

class CreateStore {
  scroll = null
  attrScroll = null
  navActiveKey = 'image-text'
  filterActiveKey = 0
  attrActiveKey = 2
  editPageLoadingModal = false
  canvas = null
  workspace = null
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
    pageItem.image = this.workspace.toImage()
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
    setTimeout(() => this.attrScroll.refresh())
  }
}

export const createStore = new CreateStore()
