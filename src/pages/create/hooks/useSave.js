import { createStore } from '../../../store/create'
import { base64ConvertFile } from '../../../utils'
import { IMGCLIENT } from '@/utils/ossUtil'
import { message } from 'antd'
import { useSaveImage } from '../hooks'
import { uploadResource } from '../../../api/image'

const useSave = () => {
  const { workspace, canvas, id } = createStore
  const { trigger: saveImage, isMutating: saveImageLoading } = useSaveImage()
  
  const unloadSendBeacon = () => {
    const data = JSON.stringify({
      id: createStore.id,
      authorization: localStorage.getItem('authorization'),
      audio: createStore.audio,
      loadingPage: createStore.loadingPage,
      pageList: createStore.pageList
    })
    const blob = new Blob([data], { type: 'application/json' })
    navigator.sendBeacon('/image_to_h5/image/save', blob)
  }
  
  const getCanvasData = async () => {
    const base64 = workspace.toImage()
    const file = await base64ConvertFile(base64)
    const res = await IMGCLIENT.upload(file)
    return {
      url: res.url,
      canvasData: workspace.toObject()
    }
  }
  // 保存
  const onSave = async () => {
    if (saveImageLoading) return
    try {
      await saveImage({
        id,
        audio: createStore.audio,
        loadingPage: createStore.loadingPage,
        pageList: createStore.pageList
      })
      message.success('保存成功')
    } catch (err) {
      message.success(err.message)
    }
  }
  
  // 上传模板
  const uploadToTemplate = async () => {
    const pageItem = createStore.getCurrentPage()
    if (canvas.getObjects().length === 1) {
      return message.warning('啥也没有，你保存集贸！')
    }
    try {
      const data = await getCanvasData()
      const params = {
        // 页面数据
        data: {
          pageAngle: pageItem.pageAngle,
          showAllFilter: false,
          filterKey: pageItem.filterKey,
          filterStyle: pageItem.filterStyle,
          rectColor: pageItem.rectColor,
          opacity: pageItem.opacity,
          canvasData: data.canvasData
        },
        url: data.url,
        type: 'one-page'
      }
      await uploadResource(params)
      message.success('上传成功')
    } catch (err) {
      message.warning(err.message)
    }
  }
  
  return {
    onSave,
    saveImageLoading,
    uploadToTemplate,
    unloadSendBeacon
  }
}

export default useSave
