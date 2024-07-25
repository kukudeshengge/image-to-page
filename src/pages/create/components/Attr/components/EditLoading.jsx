import React, { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import { Col, Input, Modal, Row } from 'antd'
import { loadingList } from '../config'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import PopoverColor from './PopoverColor'
import { useSetState } from 'ahooks'

const cs = classNames.bind(styles)

export const getBg = (value, angle) => {
  if (value.type === 'bg') {
    return value.color
  }
  const { start, end } = value
  return `linear-gradient(${angle}deg, ${start} 0%, ${end} 100%)`
}

const EditLoading = () => {
  const { editPageLoadingModal, pageList, loadingPage } = createStore
  const { rectColor, pageAngle } = pageList[0]
  
  const [state, setState] = useSetState({
    ...loadingPage
  })
  useEffect(() => {
    if (editPageLoadingModal) {
      setState({ ...loadingPage })
    }
  }, [editPageLoadingModal, loadingPage])
  
  const onOk = () => {
    createStore.loadingPage = { ...state }
    createStore.editPageLoadingModal = false
  }
  const onCancel = () => {
    createStore.editPageLoadingModal = false
  }
  const LoadingCom = useMemo(() => {
    const item = loadingList.find(item => item.type === state.dotType)
    const Com = item.com
    return <Com {...item.props} color={state.dotColor} />
  }, [state.dotType, state.dotColor])
  
  const background = getBg(rectColor, pageAngle)
  
  return <Modal
    destroyOnClose
    width={800}
    maskClosable={false}
    onCancel={onCancel}
    onOk={onOk}
    title="编辑加载页"
    open={editPageLoadingModal}
  >
    <div className={cs('page-list-loading-wrap')}>
      <div className={cs('page-list-loading-preview')}>
        <div className={cs('view-wrap')} style={{ background }}>
          {LoadingCom ? LoadingCom : null}
          <span style={{ color: state.textColor }}>{state.text}</span>
        </div>
        <Row align="middle" className={cs('color-view')}>
          <Col span={12}>
            <div className={cs('color-wrap')}>
              <PopoverColor
                color={state.textColor}
                onChange={(e) => setState({ textColor: e.hex })}
              >
                <div style={{ background: state.textColor }}></div>
              </PopoverColor>
              <span>文案</span>
            </div>
          </Col>
          <Col span={12}>
            <div className={cs('color-wrap')}>
              <PopoverColor
                color={state.dotColor}
                onChange={(e) => setState({ dotColor: e.hex })}
              >
                <div style={{ background: state.dotColor }}></div>
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
            <Input
              value={state.text}
              onChange={(e) => setState({ text: e.target.value })}
              maxLength={10}
              placeholder="请输入"
            />
          </Col>
        </Row>
        <Row>
          {
            loadingList.map(item => {
              const Com = item.com
              return <Col
                span={6}
                key={item.type}
                onClick={() => setState({ dotType: item.type })}
              >
                <div className={cs({ 'loading-list-item': true })}>
                  <Com color="#1261ff"/>
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
