import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { BeatLoader } from 'react-spinners'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import EditLoading from './EditLoading'
import { fabric } from 'fabric'
import { Tooltip } from 'antd'

const cs = classNames.bind(styles)

const ThumbCanvas = observer(({ data }) => {
  const container = useRef()
  const canvas = useRef()
  
  useEffect(() => {
    canvas.current = new fabric.StaticCanvas(container.current, {
      width: container.current.clientWidth,
      height: container.current.clientHeight
    })
  }, [])
  
  useEffect(() => {
    loadFromJSON()
  }, [data])
  
  const loadFromJSON = async () => {
    if (!canvas.current) return
    await canvas.current.loadFromJSON(data)
    const rect = canvas.current.getObjects().find(item => item.id === 'workspace')
    const width = container.current.clientWidth
    const height = container.current.clientHeight
    const thumbZoom = width / 375
    canvas.current.setDimensions({
      width,
      height
    })
    canvas.current.setZoom(thumbZoom)
    const thumbViewportTransform = canvas.current.viewportTransform
    thumbViewportTransform[4] = -rect.left * thumbZoom
    thumbViewportTransform[5] = -rect.top * thumbZoom
    canvas.current.setViewportTransform(thumbViewportTransform)
    canvas.current.renderAll()
  }
  
  return <canvas ref={container}/>
})

const PageList = () => {
  const { pageIndex, pageList } = createStore
  
  const openEditModal = () => {
    createStore.editPageLoadingModal = true
  }
  
  const onChangePage = (index) => {
    createStore.changePage(index)
  }
  
  const addPage = (e, index) => {
    e.stopPropagation()
    createStore.addPage(index + 1)
  }
  
  const deleteItem = (e, index) => {
    e.stopPropagation()
    createStore.deletePage(index)
  }
  
  const copyItem = (e, index) => {
    e.stopPropagation()
    createStore.copyPage(index)
  }
  return (<div>
    <div className={cs('page-list')}>
      <div className={cs('page-list-item', 'page-list-item-loading')}>
        <div className={cs('page-list-item-left')}>
          <div>
            <img width="16" height="16" src="https://ossprod.jrdaimao.com/file/1721200164515337.svg" alt=""/>
          </div>
          <span>加载页</span>
        </div>
        <div className={cs('page-list-item-center')}>
          <div className={cs('page-list-item-page')}>
            <div className={cs('page-loading')}>
              <BeatLoader size={4} color="#1261ff"/>
              <span>加载中</span>
            </div>
          </div>
          <div className={cs('page-list-item-add')}>
            <img src="https://ossprod.jrdaimao.com/file/1721198079884595.svg" alt=""/>
            <img src="https://ossprod.jrdaimao.com/file/1721198303212865.svg" alt=""/>
          </div>
        </div>
        <div className={cs('page-list-item-right')}>
          <Tooltip title="编辑加载页" placement="left" overlayClassName={cs('page-list-tip')}>
            <span onClick={openEditModal}>
              <img src="https://ossprod.jrdaimao.com/file/1721703417137701.svg" alt=""/>
              <img src="https://ossprod.jrdaimao.com/file/1721703426355400.svg" alt=""/>
            </span>
          </Tooltip>
        </div>
      </div>
      {pageList.map((item, index) => {
        return <div
          onClick={() => onChangePage(index)}
          key={item.id}
          className={cs({ 'page-list-item': true, active: index === pageIndex })}
        >
          <div className={cs('page-list-item-left')}>
            <div>{index + 1}</div>
            <span>第{index + 1}页</span>
          </div>
          <div className={cs('page-list-item-center')}
          >
            <div className={cs('svg-view')} style={{ ...item.filterKeyStyle }}>
              <ThumbCanvas data={item.canvasData}/>
              {/*{item.image ? <img src={item.image} alt=""/> : null}*/}
            </div>
            <div className={cs('page-list-item-add')} onClick={(e) => addPage(e, index)}>
              <img src="https://ossprod.jrdaimao.com/file/1721198079884595.svg" alt=""/>
              <img src="https://ossprod.jrdaimao.com/file/1721198303212865.svg" alt=""/>
            </div>
          </div>
          <div className={cs('page-list-item-right')}>
            <Tooltip title="复制当前页面" placement="left" overlayClassName={cs('page-list-tip')}>
                <span onClick={(e) => copyItem(e, index)}>
                  <img src="https://ossprod.jrdaimao.com/file/1721701429040381.svg" alt=""/>
                  <img src="https://ossprod.jrdaimao.com/file/1721701645462222.svg" alt=""/>
                </span>
            </Tooltip>
            {pageList.length > 1 ? <Tooltip title="删除当前页面" placement="left"
                                            overlayClassName={cs('page-list-tip')}>
                <span onClick={(e) => deleteItem(e, index)}>
                    <img src="https://ossprod.jrdaimao.com/file/1721701467925924.svg" alt=""/>
                    <img src="https://ossprod.jrdaimao.com/file/1721701612975153.svg" alt=""/>
                </span>
            </Tooltip> : null}
          </div>
        </div>
      })}
    </div>
    <EditLoading/>
  </div>)
}

export default observer(PageList)
