import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'

export class PageItemStore {
  id = uuid() // 唯一id
  pageAngle = 0  // 渐变旋转角度
  showAllFilter = false // 是否展示全部滤镜
  filterKey = 'normal' // 滤镜
  filterStyle = {}
  rectColor = { // 背景类型 bg-纯色背景 bg-linear 渐变背景
    type: 'bg',
    color: '#fff'
  }
  opacity = 0 // 透明度
  canvasData = null // 画布data
  audio = {
    name: '',
    src: ''
  }
  constructor () {
    makeAutoObservable(this)
  }
}
