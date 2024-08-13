import { createStore } from '../../../store/create'
import { base64ConvertFile } from '../../../utils'
import { IMGCLIENT } from '@/utils/ossUtil'
import { message } from 'antd'
import { useAddImage } from '../ssr'
import { uploadResource } from '../../../api/image'

const useSave = () => {
  const { workspace } = createStore
  const { trigger, isMutating } = useAddImage()
  const getCanvasData = async () => {
    const base64 = workspace.toImage()
    const file = await base64ConvertFile(base64)
    const res = await IMGCLIENT.upload(file)
    return {
      url: res.url,
      canvasData: workspace.toObject()
    }
  }
  // 预览
  const onPreview = () => {
  
  }
  // 保存
  const onSave = () => {
    // trigger({
    //   a: 1,
    //   base64ConvertFile: 2
    // })
  }
  
  // 发布
  const onPublish = () => {
  
  }
  
  // 上传模板
  const uploadToTemplate = async () => {
    const pageItem = createStore.getCurrentPage()
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
          canvasData: data.canvasData,
          audio: pageItem.audio
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
    onPreview,
    onSave,
    onPublish,
    uploadToTemplate
  }
}

export default useSave
