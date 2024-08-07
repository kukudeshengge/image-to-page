import {fabric} from "fabric";
import Base from "./Base";

fabric.Object.prototype.animateList = []

class Animation extends Base {
    sleep = (time) => {
        const timeStamp = new Date().getTime()
        const endTime = timeStamp + time
        while (true) {
            if (new Date().getTime() > endTime) return
        }
    }
    // 执行动画
    carryAnimations = (value) => {
        const object = this.canvas.getActiveObject()
        let list = null
        if (value) {
            list = Array.isArray(value) ? value : [value]
        } else {
            list = object.animateList
        }
        if (!list) return;

        let index = 0
        while (index < list.length) {
            if (!object) return
            const item = list[index]
            if (item.delay) {
                this.sleep(item.delay * 1000)
            }
            object.set(item.attr, item.start)
            object.animate(item.attr, item.end, {
                duration: item.time * 1000,
                onChange: this.canvas.renderAll.bind(this.canvas),
                onComplete: () => {
                    console.log('finish')
                }
            })
            index++
        }
    }
}

export default Animation
