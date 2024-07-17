import { makeAutoObservable } from 'mobx'

class CreateStore {
  navActiveKey = 'image-text'
  filterActiveKey = 0
  scroll = null
  canvas = null
  attrActiveKey = 0
  editPageLoadingModal = false
  
  constructor () {
    makeAutoObservable(this)
  }
  
  setNavActiveKey = (key) => {
    this.navActiveKey = key
    this.scroll.scrollTo(0, 0)
  }
  setFilterActiveKey = (key) => {
    this.filterActiveKey = key
  }
  setScrollLiving = (scroll) => {
    this.scroll = scroll
  }
  setAttrActiveKey = key => {
    this.attrActiveKey = key
  }
  openEditPageLoadingModal = () => {
    this.editPageLoadingModal = true
  }
  closeEditPageLoadingModal = () => {
    this.editPageLoadingModal = false
  }
}

export const createStore = new CreateStore()
