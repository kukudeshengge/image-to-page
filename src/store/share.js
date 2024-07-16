import { makeAutoObservable } from 'mobx'

class ShareStore {
  activeKey
  
  constructor () {
    this.activeKey = sessionStorage.getItem('ShareStore-activeKey') || 'mine-works'
    makeAutoObservable(this)
  }
  
  setActiveKey (key) {
    sessionStorage.setItem('ShareStore-activeKey', key)
    this.activeKey = key
  }
}

export const shareStore = new ShareStore()
