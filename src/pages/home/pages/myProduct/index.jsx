import React, { useEffect } from 'react'
import { Form, Select, DatePicker, Input, Row, Col, Button, Pagination, Dropdown, Spin, Modal } from 'antd'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import Iscroll from 'iscroll'
import { useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker
const cs = classNames.bind(styles)

const MyProduct = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()
  
  useEffect(() => {
    setTimeout(() => {
      new Iscroll('#my-product-list-scroll', {
        mouseWheel: true,
        scrollbars: true,
        click: true
      })
    })
  }, [])
  const create = () => {
    nav('/create')
  }
  const reset = () => {
  
  }
  const search = () => {
    console.log('search')
  }
  const deleteItem = () => {
    Modal.confirm({
      title: '确定删除该作品吗？',
      content: '删除后，用户将不可访问此页面',
      cancelText: '取消',
      okText: '确定',
      autoFocusButton: null,
      onOk: () => {
      
      }
    })
  }
  const editItem = () => {
    nav('/create')
  }
  const items = [
    {
      key: 'edit',
      label: <div onClick={editItem} className={cs('drop-item')}>
        <img src="https://ossprod.jrdaimao.com/file/172077797381352.svg" alt=""/>
        <span>编辑</span>
      </div>
    },
    {
      key: 'delete',
      label: <div onClick={deleteItem} className={cs('drop-item')}>
        <img src="https://ossprod.jrdaimao.com/file/1720777985608319.svg" alt=""/>
        <span>删除</span>
      </div>
    }
  ]
  return (
    <div className={cs('my-product')}>
      <div className={cs('my-product-form')}>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row>
            <Col span={8}>
              <Form.Item label="作品名称">
                <Input style={{ width: '100%' }} placeholder="请输入名称"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="作品类型">
                <Select style={{ width: '100%' }} placeholder="请选择类型">
                  <Select.Option value={1}>123</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="作品有效期">
                <RangePicker style={{ width: '100%' }} placeholder="请选择开始和结束日期"/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button onClick={reset} style={{ marginRight: 10 }}>重置</Button>
            <Button onClick={search} type="primary">查询</Button>
          </Row>
        </Form>
      </div>
      {/*<Spin spinning={false} style={{ background:'red' }}>*/}
      <div className={cs('my-product-list-scroll')} id="my-product-list-scroll">
        <div>
          <div style={{ height: 25 }}></div>
          <div className={cs('my-product-list')}>
            <div className={cs('add-product')} onClick={create}>
              <img src="https://ossprod.jrdaimao.com/file/1720767250766286.svg" alt=""/>
              <div className={cs('add-product-title')}>创建作品</div>
              <div className={cs('add-product-desc')}>快来开始创作你的作品吧</div>
            </div>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                return <div className={cs('product-item')}>
                  <div className={cs('product-item-top')}>
                    <img
                      src="https://img1.baidu.com/it/u=1875615239,1754113072&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=584"
                      alt=""/>
                    <div className={cs('product-item-status')}>未发布</div>
                    <div className={cs('product-item-mask-handle', `product-item-mask-handle-${index}`)}>
                      <Dropdown
                        getPopupContainer={() => document.querySelector(`.product-item-mask-handle-${index}`)}
                        overlayClassName={cs('product-dropdown')}
                        menu={{ items }}
                        placement="bottomRight"
                      >
                        <img className={cs('more')} src="https://ossprod.jrdaimao.com/file/1720770559192211.svg"
                             alt=""/>
                      </Dropdown>
                      <div className={cs('product-item-preview-button')}>预览</div>
                      <div className={cs('product-item-preview-button')}>数据</div>
                    </div>
                  </div>
                  <div className={cs('product-item-content')}>
                    <div className={cs('product-item-tags')}>
                      <div>H5</div>
                    </div>
                    <div className={cs('product-item-title')}>蓝色商务医院医疗函蓝色商务医院医疗邀请函医学技术论坛峰会展会邀请函
                    </div>
                    <div className={cs('product-item-time')}>2024-07-12 ~ 2024-07-22</div>
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
          <div className={cs('my-product-pagination')}>
            <Pagination total={100}/>
          </div>
          <div style={{ height: 25 }}></div>
        </div>
      </div>
      {/*</Spin>*/}
    </div>
  )
}

export default MyProduct
