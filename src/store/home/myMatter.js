import { makeAutoObservable } from 'mobx'

class MatterStore {
  activeTypeKey
  batchMode = false
  selectIds = []
  matterList = []
  uploadVisible = false
  
  constructor () {
    this.activeTypeKey = sessionStorage.getItem('MatterStore-activeKey') || '1'
    makeAutoObservable(this)
    this.matterList = new Array(30).fill({})
  }
  
  resetStore = () => {
    this.activeTypeKey = '1'
    this.batchMode = false
    this.selectIds = []
  }
  setActiveTypeKey = (key) => {
    this.activeTypeKey = key
    sessionStorage.setItem('MatterStore-activeKey',key)
  }
  openBatchMode = () => {
    this.selectIds = []
    this.batchMode = true
  }
  closeBatchMode = () => {
    this.batchMode = false
  }
  onCheckChange = (id) => {
    const index = this.selectIds.indexOf(id)
    if (index > -1) {
      this.selectIds.splice(index, 1)
    } else {
      this.selectIds.push(id)
    }
  }
  onChangeCheckAll = (checked) => {
    if (checked) {
      this.selectIds = []
    } else {
      this.selectIds = this.matterList.map((item, index) => index)
    }
  }
  openUpload = () => {
    this.uploadVisible = true
  }
  closeUpload =() => {
    this.uploadVisible = false
  }
}

export const matterStore = new MatterStore()
