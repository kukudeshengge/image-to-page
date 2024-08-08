import { createStore } from '../../../store/create'

const useSave = () => {
  // 预览
  const onPreview = () => {
  
  }
  // 保存
  const onSave = () => {
    console.log(createStore.pageList)
  }
  
  // 发布
  const onPublish = () => {
  
  }
  
  return {
    onPreview,
    onSave,
    onPublish
  }
}

export default useSave
