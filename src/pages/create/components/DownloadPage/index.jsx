import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import { Form, Image, Input, Modal, Radio, Slider } from 'antd'
import { createStore } from '../../../../store/create'
import { observer } from 'mobx-react-lite'
import { saveAs } from 'file-saver'
import { v4 as uuid } from 'uuid'
import { base64ConvertFile, bytesToSize } from '../../../../utils'

const cs = classNames.bind(styles)

const initialFromData = {
  type: 'png',
  dpi: 2,
  quality: 1
}
const DownloadPage = () => {
  const { openSaveModal, workspace } = createStore
  const [form] = Form.useForm()
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabledSlider, setDisabledSlider] = useState(true)
  
  useEffect(() => {
    if (!openSaveModal) return
    reset()
    createImage(initialFromData)
  }, [openSaveModal])
  const onTypeChange = (e) => {
    if (e.target.value === 'png') {
      form.setFieldsValue({ quality: 1 })
      setDisabledSlider(true)
    } else {
      setDisabledSlider(false)
    }
  }
  const reset = () => {
    form.resetFields()
    setImage('')
    setLoading(false)
    setDisabledSlider(true)
  }
  const createImage = (values) => {
    const base64 = workspace.toImage(values)
    const file = base64ConvertFile(base64)
    form.setFieldsValue({
      size: `${workspace.rectWidth * values.dpi} x ${workspace.rectHeight * values.dpi}`,
      weight: `约${bytesToSize(file.size)}`
    })
    setImage(base64)
  }
  const onCancel = () => {
    createStore.openSaveModal = false
  }
  const onOk = () => {
    setLoading(true)
    saveAs(image, uuid())
    setLoading(false)
  }
  const onValuesChange = (_, allValues) => {
    createImage(allValues)
  }
  return (
    <Modal
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={onOk}
      okText="下载"
      width={750}
      open={openSaveModal}
      title="下载当前页面"
    >
      <div className={cs('down-load-page')}>
        {/*  <Radio.Group optionType="button">*/}
        {/*    <Radio value={0}>导出图片</Radio>*/}
        {/*    <Radio value={1}>导出SVG</Radio>*/}
        {/*    <Radio value={2}>导出PDF</Radio>*/}
        {/*  </Radio.Group>*/}
        <div className={cs('setting-left')}>
          <Form
            form={form}
            labelCol={{ span: 8 }}
            onValuesChange={onValuesChange}
            initialValues={{ ...initialFromData }}
          >
            <Form.Item label="图片类型" name="type">
              <Radio.Group optionType="button" onChange={onTypeChange}>
                <Radio value="png">PNG</Radio>
                <Radio value="jpeg">JPEG</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="清晰度" name="dpi">
              <Radio.Group optionType="button">
                <Radio value={1}>普通</Radio>
                <Radio value={2}>高清</Radio>
                <Radio value={3}>超清</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="图片质量" name="quality">
              <Slider disabled={disabledSlider} step={0.1} min={0.1} max={1}/>
            </Form.Item>
            <Form.Item label="文件大小" name="weight">
              <Input disabled/>
            </Form.Item>
            <Form.Item label="尺寸" name="size">
              <Input disabled/>
            </Form.Item>
          </Form>
        </div>
        <div className={cs('preview-right')}>
          <Image src={image}/>
        </div>
      </div>
    </Modal>
  )
}

export default observer(DownloadPage)
