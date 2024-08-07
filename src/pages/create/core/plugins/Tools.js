import Base from './Base'
import {v4 as uuid} from 'uuid'
import {createStore} from '../../../../store/create'
import {fabric} from 'fabric'

const lockAttrs = [
    'lockMovementX',
    'lockMovementY',
    'lockRotation',
    'lockScalingX',
    'lockScalingY',
    'hasControls',
    'selectable',
    'editable'
]
const copyAttrs = [
    'triggered'
]

/**
 * 一些常用工具
 */
class Tools extends Base {
    cloneObject = null
    /**
     * 复制对象
     */
    copyObject = () => {
        const object = this.canvas.getActiveObject()
        if (!object) return
        object.clone(cloned => {
            this.cloneObject = cloned
        }, copyAttrs)
    }
    /**
     * 剪切对象
     */
    cutObject = () => {
        this.copyObject()
        this.deleteObject()
    }
    changeLock = (object) => {
        lockAttrs.forEach((key) => {
            object[key] = !object[key]
        })
    }
    /**
     * 粘贴对象
     */
    pasteObject = () => {
        if (!this.cloneObject) return
        const {mousePointer} = this.workspace.events
        if (this.cloneObject.type === 'activeSelection') {
            this.cloneObject.clone(cloned => {
                cloned.canvas = this.canvas
                const left = this.cloneObject.left + 10
                const top = this.cloneObject.top + 10
                this.canvas.discardActiveObject()
                cloned.set({left, top, id: uuid()})
                cloned.forEachObject(item => {
                    item.set('id', uuid())
                    this.canvas.add(item)
                })
                cloned.setCoords()
                this.canvas.setActiveObject(cloned).renderAll()
                createStore.modifiedCanvas()
            })
        } else {
            this.cloneObject.clone(cloned => {
                cloned.set({
                    id: uuid(),
                    left: mousePointer.x,
                    top: mousePointer.y
                })
                this.canvas.add(cloned).setActiveObject(cloned).renderAll()
                createStore.modifiedCanvas()
            }, copyAttrs)
        }
    }
    /**
     * 删除对象
     * @param object
     */
    deleteObject = (object) => {
        let targetObjects = [object]
        if (!object) {
            targetObjects = this.canvas.getActiveObjects()
        }
        targetObjects.forEach(object => {
            this.canvas.remove(object)
        })
        this.canvas.discardActiveObject()
        this.canvas.renderAll()
        createStore.modifiedCanvas()
    }
    /**
     * 锁定全部操作 或 解锁全部操作
     * @param object
     */
    changeObjectLock = (object) => {
        if (!object) {
            object = this.canvas.getActiveObject()
        }
        if (object.forEachObject) {
            object.forEachObject(item => {
                this.changeLock(item)
            })
            this.changeLock(object)
        } else {
            this.changeLock(object)
        }
        this.canvas.renderAll()
        createStore.modifiedCanvas()
    }
    /**
     * 显示/隐藏
     * @param object
     */
    changeObjectShow = (object) => {
        if (!object) {
            object = this.canvas.getActiveObject()
        }
        if (object.forEachObject) {
            object.forEachObject(item => {
                item.set('visible', !item.visible)
            })
        } else {
            object.set('visible', !object.visible)
        }
        this.canvas.renderAll()
        createStore.modifiedCanvas()
    }
    // 组合
    combination = () => {
        const activeObjects = this.canvas.getActiveObjects()
        if (!activeObjects || !activeObjects.length) return
        this.canvas.discardActiveObject()
        const group = new fabric.Group(activeObjects, {
            id: uuid(),
            interactive: false,
            subTargetCheck: true
        })
        this.canvas.setActiveObject(group).remove(...activeObjects)
        this.canvas.add(group)
        createStore.modifiedCanvas()
    }
    // 拆分组合
    splitCombination = () => {
        const activeObject = this.canvas.getActiveObject()
        if (!activeObject || activeObject.type !== 'group') return
        const activeObjectList = activeObject.getObjects()
        activeObject.toActiveSelection()
        for (const item of activeObjectList) {
            item.set('id', uuid())
        }
        this.canvas.discardActiveObject().renderAll()
        createStore.modifiedCanvas()
    }
    // 替换图片
    replaceImage = () => {
        const object = this.canvas.getActiveObject()
        // object.setSrc(url, () => {
        //   this.canvas.renderAll()
        //   events.emit(Types.SHOW_LOADING, false)
        // })
    }
}

export default Tools
