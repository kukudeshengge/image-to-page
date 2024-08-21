import { fabric } from 'fabric'
import Base from './Base'

class Animation extends Base {
  
  toDuration = (s) => {
    return s * 1000
  }
  
  sleep = (time) => {
    const timeStamp = new Date().getTime()
    const endTime = timeStamp + time
    while (true) {
      if (new Date().getTime() > endTime) return
    }
  }
  // 执行动画
  carryAnimations = (animateObject, value, callback) => {
    const object = animateObject || this.canvas.getActiveObject()
    let list = null
    if (value) {
      list = Array.isArray(value) ? value : [value]
    } else {
      list = object.animateList
    }
    if (!list || !list.length || !object) return
    
    object.set({
      hasControls: false,
      borderColor: 'transparent'
    })
    const newList = [...list]
    const start = (item) => {
      if (!object || !item) return
      if (item.delay) {
        this.sleep(this.toDuration(item.delay))
      }
      const fn = this[item.animateName]
      fn && fn(object, item.time, item.easing).then(() => {
        if (newList.length === 0) {
          object.set({
            hasControls: true,
            borderColor: 'blue'
          })
          this.canvas.renderAll()
          callback && callback()
        }
        start(newList.shift())
      })
    }
    start(newList.shift())
  }
  createAnimateOptions = (time, onComplete, easing) => {
    return {
      duration: this.toDuration(time),
      onChange: this.canvas.renderAll.bind(this.canvas),
      easing: fabric.util.ease[easing || 'easeInQuad'],
      onComplete
    }
  }
  // 淡入
  fadeIn = (object, time, easing) => {
    return new Promise(resolve => {
      object.set('opacity', 0)
      object.animate('opacity', 1, this.createAnimateOptions(time, resolve, easing))
    })
  }
  // to right
  toRight = (object, time, easing) => {
    return new Promise(resolve => {
      const start = -object.getScaledWidth()
      const end = object.left
      object.set('left', start)
      object.animate('left', end, this.createAnimateOptions(time, resolve, easing))
    })
  }
  // to left
  toLeft = (object, time, easing) => {
    return new Promise(resolve => {
      const start = this.workspace.rectWidth + object.getScaledWidth()
      const end = object.left
      object.set('left', start)
      object.animate('left', end, this.createAnimateOptions(time, resolve, easing))
    })
  }
  // to bottom
  toBottom = (object, time, easing) => {
    return new Promise(resolve => {
      const start = -object.getScaledHeight()
      const end = object.top
      object.set('top', start)
      object.animate('top', end, this.createAnimateOptions(time, resolve, easing))
    })
  }
  // to top
  toTop = (object, time, easing) => {
    return new Promise(resolve => {
      const start = this.workspace.rectHeight + object.getScaledHeight()
      const end = object.top
      object.set('top', start)
      object.animate('top', end, this.createAnimateOptions(time, resolve, easing))
    })
  }
  // 向右移入
  leftToRight = (object, time, easing) => {
    return Promise.all([
      this.fadeIn(object, 0.3),
      this.toRight(object, time, easing)
    ])
  }
  // 向左移入
  rightToLeft = (object, time, easing) => {
    return Promise.all([
      this.fadeIn(object, 0.3),
      this.toLeft(object, time, easing)
    ])
  }
  // 向下移入
  topToBottom = (object, time, easing) => {
    return Promise.all([
      this.fadeIn(object, 0.3),
      this.toBottom(object, time, easing)
    ])
  }
  // 向上移入
  bottomToTop = (object, time, easing) => {
    return Promise.all([
      this.fadeIn(object, 0.3),
      this.toTop(object, time, easing)
    ])
  }
  // 翻开进入
  open = (object, time, easing) => {
    return new Promise(resolve => {
      const end = object.scaleY
      object.set('scaleY', 0)
      object.animate('scaleY', end, this.createAnimateOptions(time, resolve, easing))
    })
  }
  // 翻开进入
  openToIn = (object, time, easing) => {
    return Promise.all([
      this.fadeIn(object, 0.3),
      this.open(object, time, easing)
    ])
  }
  // 从小到大
  scaleToBig = (object, time, easing) => {
    return Promise.all([
      this.fadeIn(object, 0.3),
      new Promise((resolve => {
        const scaleX = object.scaleX
        object.set('scaleX', 0)
        object.animate('scaleX', scaleX, this.createAnimateOptions(time, resolve, easing))
      })),
      new Promise((resolve => {
        const scaleY = object.scaleY
        object.set('scaleY', 0)
        object.animate('scaleY', scaleY, this.createAnimateOptions(time, resolve, easing))
      }))
    ])
  }
  // 从大到小
  scaleToSmall = (object, time, easing) => {
    return Promise.all([
      this.fadeIn(object, 0.3),
      new Promise((resolve => {
        const start = object.scaleX * 2.5
        const end = object.scaleX
        object.set('scaleX', start)
        object.animate('scaleX', end, this.createAnimateOptions(time, resolve, easing))
      })),
      new Promise((resolve => {
        const start = object.scaleY * 2.5
        const end = object.scaleY
        object.set('scaleY', start)
        object.animate('scaleY', end, this.createAnimateOptions(time, resolve, easing))
      }))
    ])
  }
  // 旋转进入
  rotateTo = (object, time, easing) => {
    return Promise.all([
      this.fadeIn(object, 0.3),
      new Promise((resolve => {
        object.set('angle', 180)
        object.animate('angle', 0, this.createAnimateOptions(time, resolve, easing))
      }))
    ])
  }
}

export default Animation
