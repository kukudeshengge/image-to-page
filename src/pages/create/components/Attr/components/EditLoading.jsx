import React from 'react'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import { Col, Input, Modal, Row } from 'antd'
import { BarLoader } from 'react-spinners'
import { loadingList } from '../config'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import PopoverColor from './PopoverColor'

const cs = classNames.bind(styles)

const getBg = (value, angle) => {
  if (value.type === 'bg') {
    return value.color
  }
  const { start, end } = value
  return `linear-gradient(${angle}deg, ${start} 0%, ${end} 100%)`
}

const EditLoading = () => {
  const { editPageLoadingModal, pageList, pageAngle } = createStore
  const {rectColor} = pageList[0]
  
  const onOk = () => {
  
  }
  const onCancel = () => {
    createStore.editPageLoadingModal = false
  }
  const background = getBg(rectColor, pageAngle)
  return <Modal
    destroyOnClose
    width={800}
    maskClosable={false}
    onCancel={onCancel}
    onOk={onOk}
    title="编辑加载页"
    // open={true}
    open={editPageLoadingModal}
  >
    <div className={cs('page-list-loading-wrap')}>
      <div className={cs('page-list-loading-preview')}>
        <div className={cs('view-wrap')} style={{ background }}>
          <BarLoader size={5} color="#1261ff"/>
          <span>加载中</span>
        </div>
        <Row align="middle" className={cs('color-view')}>
          <Col span={12}>
            <div className={cs('color-wrap')}>
              <PopoverColor>
                <div></div>
              </PopoverColor>
              <span>文案</span>
            </div>
          </Col>
          <Col span={12}>
            <div className={cs('color-wrap')}>
              <PopoverColor>
                <div></div>
              </PopoverColor>
              <span>色块</span>
            </div>
          </Col>
        </Row>
      </div>
      <div className={cs('page-list-loading-list')}>
        <Row align="middle" style={{ marginBottom: 20 }}>
          <Col span={3}>提示文案</Col>
          <Col span={20}>
            <Input maxLength={10} placeholder="请输入"/>
          </Col>
        </Row>
        <Row>
          {
            loadingList.map(item => {
              const Com = item.com
              return <Col span={6} key={item.type}>
                <div className={cs('loading-list-item')}>
                  <Com size={10} color="#1261ff"/>
                </div>
              </Col>
            })
          }
        </Row>
      </div>
    </div>
  </Modal>
}

export default observer(EditLoading)
