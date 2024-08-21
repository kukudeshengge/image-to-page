import React, { useEffect, useRef, useState } from 'react'
import { Form, Select, DatePicker, Input, Row, Col, Button, Dropdown, Spin, Modal, message } from 'antd'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import IScroll from 'iscroll'
import { useNavigate } from 'react-router-dom'
import useGetCardStyle from '../../../../hooks/useGetCardStyle'
import { addImage } from '../../../../api/image'
import { useImageDelete, useImageList } from './hooks'
import { useUpdateEffect } from 'ahooks'
// import ProductItemThumb from './ProductItemThumb'

const { RangePicker } = DatePicker
const cs = classNames.bind(styles)

const MyProduct = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()
  const { getItemStyle } = useGetCardStyle()
  const [formParams, setFormParams] = useState({})
  const { data, isLoading, mutate } = useImageList(formParams)
  const { trigger: triggerDelete } = useImageDelete()
  const scroll = useRef()
  
  useEffect(() => {
    scroll.current = new IScroll('#my-product-list-scroll', {
      mouseWheel: true,
      scrollbars: true,
      preventDefault: false
    })
  }, [])
  
  useUpdateEffect(() => {
    setTimeout(() => scroll.current.refresh())
  }, [data])
  
  const create = async () => {
    try {
      const res = await addImage()
      nav(`/create/${res}`)
    } catch (err) {
      message.warning(err.message)
    }
  }
  const reset = () => {
    form.resetFields()
    setFormParams({})
  }
  const search = async () => {
    const data = form.getFieldsValue()
    setFormParams(data)
  }
  const deleteItem = (item) => {
    Modal.confirm({
      title: '确定删除该作品吗？',
      content: '删除后，用户将不可访问此页面',
      cancelText: '取消',
      okText: '确定',
      autoFocusButton: null,
      onOk: async () => {
        try {
          await triggerDelete({ id: item._id })
          await mutate()
        } catch (err) {
          message.warning(err.message)
        }
      }
    })
  }
  const editItem = (item) => {
    nav(`/create/${item._id}`)
  }
  const goDataView = () => {
    message.warning('功能正在开发中')
    // nav('/dataView')
  }
  const preview = (item) => {
    nav(`/preview/${item._id}`)
  }
  const items = (item) => {
    return [
      {
        key: 'edit',
        label: <div onClick={() => editItem(item)} className={cs('drop-item')}>
          <img src="https://ossprod.jrdaimao.com/file/172077797381352.svg" alt=""/>
          <span>编辑</span>
        </div>
      },
      {
        key: 'delete',
        label: <div onClick={() => deleteItem(item)} className={cs('drop-item')}>
          <img src="https://ossprod.jrdaimao.com/file/1720777985608319.svg" alt=""/>
          <span>删除</span>
        </div>
      }
    ]
  }
  
  return (
    <div className={cs('my-product')}>
      <div className={cs('my-product-form')}>
        <Form
          onFinish={search}
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row>
            <Col span={8}>
              <Form.Item label="作品名称" name="name">
                <Input style={{ width: '100%' }} placeholder="请输入名称"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="作品类型" name="tag">
                <Select style={{ width: '100%' }} placeholder="请选择类型">
                  <Select.Option value={'h5'}>H5</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="作品有效期" name="time">
                <RangePicker style={{ width: '100%' }} placeholder="请选择开始和结束日期"/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button onClick={reset} style={{ marginRight: 10 }}>重置</Button>
            <Button htmlType="submit" type="primary">查询</Button>
          </Row>
        </Form>
      </div>
      <div className={cs('my-product-list-scroll')} id="my-product-list-scroll">
        <Spin spinning={isLoading}>
          <div style={{ minHeight: 400 }}>
            <div style={{ height: 25 }}></div>
            <div className={cs('my-product-list')}>
              {
                data.map((item, index) => {
                  const styles = getItemStyle(index)
                  if (item === 'add') {
                    return <div key={index} style={styles} className={cs('add-product')} onClick={create}>
                      <img src="https://ossprod.jrdaimao.com/file/1720767250766286.svg" alt=""/>
                      <div className={cs('add-product-title')}>创建作品</div>
                      <div className={cs('add-product-desc')}>快来开始创作你的作品吧</div>
                    </div>
                  }
                  return <div style={styles} className={cs('product-item')} key={index}>
                    <div className={cs('product-item-top')}>
                      <img src={item.firstPageUrl || 'https://ossprod.jrdaimao.com/file/1724222043671526.jpeg'} alt=""/>
                      {/*<ProductItemThumb data={item.firstPageData}/>*/}
                      <div
                        style={{ background: item.status === 1 ? '#1261ff' : '#999' }}
                        className={cs('product-item-status')}
                      >
                        {item.statusTitle}
                      </div>
                      <div className={cs('product-item-mask-handle', `product-item-mask-handle-${index}`)}>
                        <Dropdown
                          getPopupContainer={() => document.querySelector(`.product-item-mask-handle-${index}`)}
                          overlayClassName={cs('product-dropdown')}
                          menu={{ items: items(item) }}
                          placement="bottomRight"
                        >
                          <img
                            className={cs('more')}
                            src="https://ossprod.jrdaimao.com/file/1720770559192211.svg"
                            alt=""
                          />
                        </Dropdown>
                        <div onClick={() => preview(item)} className={cs('product-item-preview-button')}>预览</div>
                        <div onClick={goDataView} className={cs('product-item-preview-button')}>数据</div>
                      </div>
                    </div>
                    <div className={cs('product-item-content')}>
                      <div className={cs('product-item-tags')}>
                        <div>{item.tag}</div>
                      </div>
                      <div className={cs('product-item-title')}>{item.name}</div>
                      <div className={cs('product-item-time')}>
                        {item.startTime}{item.endTime ? ` ~ ${item.endTime}` : ''}
                      </div>
                    </div>
                    <div className={cs('product-item-statistics')}>
                      <div>
                        <span>0</span>
                        <span>浏览</span>
                      </div>
                      <div>
                        <span>0</span>
                        <span>访客</span>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
            {/*<div className={cs('my-product-pagination')}>*/}
            {/*  <Pagination total={100}/>*/}
            {/*</div>*/}
            <div style={{ height: 25 }}></div>
          </div>
        </Spin>
      </div>
    </div>
  )
}

export default MyProduct
