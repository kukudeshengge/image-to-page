import { makeAutoObservable } from 'mobx'

class HomeStore {
  activeKey = 'mine-works'
  
  constructor () {
    this.activeKey = sessionStorage.getItem('HomeStore-activeKey')
    makeAutoObservable(this)
  }
  
  setActiveKey (key) {
    sessionStorage.setItem('HomeStore-activeKey', key)
    this.activeKey = key
  }
}

export const homeStore = new HomeStore()
