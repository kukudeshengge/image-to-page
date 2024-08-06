import {createStore} from "../../../store/create";

const useAttr = () => {
    const {canvas} = createStore
    /**
     * 获取已选中的元素
     */
    const getActiveObject = () => {
        if (!canvas) return
        const activeObject = canvas?.getActiveObject()
        if (!activeObject) return
        return activeObject
    }
    /**
     * 设置属性
     * @param attr
     */
    const setAttr = (attr) => {
        if (!canvas) return
        const activeObject = getActiveObject()
        if (!activeObject) return
        activeObject.set(attr)
        canvas.renderAll()
    }
    return {
        getActiveObject,
        setAttr
    }
}

export default useAttr
