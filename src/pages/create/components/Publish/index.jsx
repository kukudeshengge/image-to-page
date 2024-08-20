import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { DatePicker, Form, Input, message, Modal, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../store/create'
import { useImageDetail, useSaveImage } from '../../hooks'
import dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'

const cs = classNames.bind(styles)

const Publish = () => {
  const { publishOpen } = createStore
  const { id } = useParams()
  const { data } = useImageDetail({ id })
  const nav = useNavigate()
  const { trigger, isMutating } = useSaveImage()
  const [form] = Form.useForm()
  
  useEffect(() => {
    if (!data) return
    const formData = {
      name: data.name
    }
    if (data.startTime && data.endTime) {
      formData.time = [dayjs(data.startTime), dayjs(data.endTime)]
    }
    form.setFieldsValue(formData)
  }, [data])
  const onOk = async () => {
    if (isMutating) return
    const data = await form.validateFields()
    try {
      const params = {
        id,
        audio: createStore.audio,
        loadingPage: createStore.loadingPage,
        pageList: createStore.pageList,
        name: data.name,
        tag: data.tag,
        startTime: data.time[0].format('YYYY-MM-DD'),
        endTime: data.time[1].format('YYYY-MM-DD'),
        isDraft: false
      }
      await trigger(params)
      message.success('发布成功')
      nav('/')
    } catch (err) {
      message.warning(err.message)
    }
  }
  const onCancel = () => {
    createStore.publishOpen = false
  }
  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      width={500}
      title="发布作品"
      open={publishOpen}
      closable={false}
      onCancel={onCancel}
      onOk={onOk}
    >
      <div className={cs('publish-wrap')}>
        <Form form={form} labelCol={{ span: 6 }} initialValues={{ tag: 'h5' }}>
          <Form.Item
            name="name"
            label="作品名称"
            rules={[{
              required: true,
              message: '请输入作品名称'
            }]}
          >
            <Input maxLength={20} placeholder={'请输入作品名称'}/>
          </Form.Item>
          <Form.Item
            name="time"
            label="作品有效期"
            rules={[{
              required: true,
              message: '请选择有效期'
            }]}
          >
            <DatePicker.RangePicker
              disabledDate={(current) => current && current < dayjs().subtract(1, 'day')}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item name="tag" label="作品类型" required>
            <Select disabled>
              <Select.Option value="h5">H5</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default observer(Publish)
