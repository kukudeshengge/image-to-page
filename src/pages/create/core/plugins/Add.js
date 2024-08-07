import Base from './Base'
import { fabric } from 'fabric'
import { v4 as uuid } from 'uuid'
import { uploadFile } from '../../../../utils'
import { message } from 'antd'
import { IMGCLIENT } from '@/utils/ossUtil'
import { audioTypes, imageTypes, videoTypes } from '../../../../utils/type'
import { createStore } from '../../../../store/create'

class Add extends Base {
  uploading = false
  // 新增文字元素
  addText = (fontSize = 14, textValue = '双击编辑文本') => {
    const text = new fabric.Textbox(textValue, {
      id: uuid(),
      fontSize,
      // fontFamily: systemFonts.value[0].value,
      fillType: 0,
      hasControls: true,
      hasBorders: true,
      fontWeight: 'normal',
      originX: 'left',
      originY: 'top',
      textAlign: 'justify-center'
    })
    this.canvas.add(text).setActiveObject(text)
    this.workspace.align.center()
    this.canvas.renderAll()
  }
  /**
   * 获取图片比例
   */
  getImageScale = (img, leaveValue = 100) => {
    const rect = this.workspace.getRect()
    if (!rect || !img) return
    if (img.width < rect.width && img.height < rect.height) {
      return {
        scaleX: 1,
        scaleY: 1
      }
    } else if (img.width >= img.height) {
      const s = (rect.width - leaveValue) / img.width
      const w = img.width * s
      const h = img.height * s
      if (w < rect.width && h < rect.height) {
        return {
          scaleX: s,
          scaleY: s
        }
      } else {
        return this.getImageScale(img, leaveValue + 20)
      }
    } else if (img.height >= img.width) {
      const s = (rect.height - leaveValue) / img.height
      const w = img.height * s
      const h = img.height * s
      if (w < rect.width && h < rect.height) {
        return {
          scaleX: s,
          scaleY: s
        }
      } else {
        return this.getImageScale(img, leaveValue + 20)
      }
    }
  }
  openUploadLoading = () => {
    message.open({
      type: 'loading',
      content: '上传中...',
      duration: 0
    })
    this.uploading = true
  }
  closeUploadLoading = () => {
    message.destroy()
    this.uploading = false
  }
  // 新增图片
  uploadImage = async () => {
    if (this.uploading) return
    try {
      const e = await uploadFile({ accept: imageTypes })
      const [file] = e.target.files
      if (!file) return
      this.openUploadLoading()
      const { url } = await IMGCLIENT.upload(file)
      fabric.Image.fromURL(url, img => {
        const { scaleX, scaleY } = this.getImageScale(img)
        img.set({
          id: uuid(),
          scaleY,
          scaleX
        })
        this.canvas.add(img).setActiveObject(img)
        this.workspace.align.center()
        this.closeUploadLoading()
      }, { crossOrigin: 'anonymous' })
    } catch (err) {
      console.log(err)
      this.closeUploadLoading()
      message.warning(err.message)
    }
  }
  // 新增音频
  uploadAudio = async () => {
    if (this.uploading) return
    try {
      const e = await uploadFile({ accept: audioTypes })
      const [file] = e.target.files
      if (!file) return
      this.openUploadLoading()
      const { url } = await IMGCLIENT.upload(file)
      const pageItem = createStore.getCurrentPage()
      pageItem.audio = {
        name: file.name,
        src: url
      }
      this.closeUploadLoading()
      message.success('上传成功，已设置为当前页面背景音乐')
    } catch (err) {
      console.log(err)
      this.closeUploadLoading()
      message.warning(err.message)
    }
  }
  // 上传视频
  uploadVideo = async () => {
    if (this.uploading) return
    try {
      // const e = await uploadFile({ accept: videoTypes })
      // const [file] = e.target.files
      // if (!file) return
      // this.openUploadLoading()
      // const { url } = await IMGCLIENT.upload(file)
      const url = 'https://osstest.jrdaimao.com/file/dm_edit_image/1721982477322573.mp4'
      this.addVideo(url, (video) => {
        this.canvas.add(video).setActiveObject(video)
        this.workspace.align.center()
        this.closeUploadLoading()
      })
    } catch (err) {
      console.log(err)
      this.closeUploadLoading()
      message.warning(err.message)
    }
  }
  // 新增视频
  addVideo = (url, callback) => {
    if (!url) return
    const videoEl = document.createElement('video')
    videoEl.loop = true
    videoEl.crossOrigin = 'anonymous'
    videoEl.controls = true
    videoEl.style.display = 'none'
    
    const sourceEl = document.createElement('source')
    sourceEl.src = url
    videoEl.appendChild(sourceEl)
    videoEl.addEventListener('loadeddata', () => {
      videoEl.width = videoEl.videoWidth
      videoEl.height = videoEl.videoHeight
      const { scaleX, scaleY } = this.getImageScale(videoEl)
      const video = new fabric.Image(videoEl, {
        id: uuid(),
        videoUrl: url,
        objectCaching: false,
        scaleX,
        scaleY
      })
      const videoSource = video.getElement()
      videoSource.play()
      const that = this
      callback && callback(video)
      fabric.util.requestAnimFrame(function render () {
        that.canvas.renderAll()
        fabric.util.requestAnimFrame(render)
      })
    })
  }
}

export default Add
