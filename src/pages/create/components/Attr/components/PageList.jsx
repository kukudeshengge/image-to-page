import React, { useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import EditLoading, { getBg } from './EditLoading'
import { fabric } from 'fabric'
import { Tooltip } from 'antd'
import { loadingList } from '../config'
import { WorkspaceId } from '../../../../../config/name'
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import { arrayMove, useSortable, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { getMoveIndex } from '../../../../../utils'

const cs = classNames.bind(styles)

const ThumbCanvas = observer(({ data }) => {
  const container = useRef()
  const canvas = useRef()
  useEffect(() => {
    canvas.current = new fabric.StaticCanvas(container.current, {
      width: container.current.clientWidth * 2,
      height: container.current.clientHeight * 2
    })
  }, [])
  
  useEffect(() => {
    loadFromJSON()
  }, [data.rectColor, data.canvasData])
  
  const loadFromJSON = () => {
    if (!canvas.current) return
    canvas.current.loadFromJSON(data.canvasData, () => {
      const rect = canvas.current.getObjects().find(item => item.id === WorkspaceId)
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
    })
  }
  
  return <canvas style={{ transform: 'scale(0.5)', transformOrigin: 'left top' }} ref={container}/>
})

const DraggableItem = observer((props) => {
  const { pageIndex, pageList } = createStore
  const { item, index } = props
  const active = index === pageIndex
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: item.id,
      transition: {
        duration: 500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }
    })
  
  const styles = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  
  if (isDragging) {
    styles.borderTop = 'solid 1px #cccccc'
    styles.borderBottom = 'solid 1px #cccccc'
    styles.position = 'relative'
    styles.zIndex = 999
  }
  
  // 切换
  const onChangePage = () => {
    if (index === pageIndex) return
    createStore.changePage(index)
  }
  
  // 新建
  const addPage = (e) => {
    e.stopPropagation()
    createStore.addPage(index + 1)
  }
  
  // 删除
  const deleteItem = (e) => {
    e.stopPropagation()
    createStore.deletePage(index)
  }
  
  // 复制
  const copyItem = (e) => {
    e.stopPropagation()
    createStore.copyPage(index)
  }
  
  // 下载
  const saveItem = (e) => {
    e.stopPropagation()
    createStore.openSaveModal = true
  }
  
  return <div
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={styles}
    onClick={onChangePage}
    className={cs({ 'page-list-item': true, active })}
  >
    <div className={cs('page-list-item-left')}>
      <div>{index + 1}</div>
      <span>第{index + 1}页</span>
    </div>
    <div className={cs('page-list-item-center')}>
      <div className={cs('svg-view')} style={{ ...item.filterStyle }}>
        <ThumbCanvas data={item}/>
      </div>
      <div className={cs('page-list-item-add')} onClick={addPage}>
        <img src="https://ossprod.jrdaimao.com/file/1721198079884595.svg" alt=""/>
        <img src="https://ossprod.jrdaimao.com/file/1721198303212865.svg" alt=""/>
      </div>
    </div>
    <div className={cs('page-list-item-right')}>
      {
        active ? <Tooltip title="下载当前页面" placement="left" overlayClassName={cs('page-list-tip')}>
                <span onClick={(e) => saveItem(e)}>
                  <img src="https://ossprod.jrdaimao.com/file/1721986915927352.svg" alt=""/>
                  <img src="https://ossprod.jrdaimao.com/file/1721986927339843.svg" alt=""/>
                </span>
        </Tooltip> : null
      }
      <Tooltip
        title="复制当前页面"
        placement="left"
        overlayClassName={cs('page-list-tip')}
      >
        <span onClick={copyItem}>
          <img src="https://ossprod.jrdaimao.com/file/1721701429040381.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721701645462222.svg" alt=""/>
        </span>
      </Tooltip>
      {pageList.length > 1 ?
        <Tooltip
          title="删除当前页面"
          placement="left"
          overlayClassName={cs('page-list-tip')}
        >
                <span onClick={deleteItem}>
                    <img src="https://ossprod.jrdaimao.com/file/1721701467925924.svg" alt=""/>
                    <img src="https://ossprod.jrdaimao.com/file/1721701612975153.svg" alt=""/>
                </span>
        </Tooltip>
        : null}
    </div>
  </div>
})

const PageList = () => {
  const { pageList, loadingPage } = createStore
  const startPage = pageList[0]
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )
  
  // 编辑加载页
  const openEditModal = () => {
    createStore.editPageLoadingModal = true
  }
  
  // drag end
  const onDragEnd = (dragItem) => {
    const { active, over } = dragItem
    if (!active || !over) return
    const newList = [...pageList]
    const { activeIndex, overIndex } = getMoveIndex(newList, dragItem)
    createStore.pageList = arrayMove(newList, activeIndex, overIndex)
    createStore.changePage(overIndex)
  }
  
  const LoadingCom = useMemo(() => {
    const item = loadingList.find(item => item.type === loadingPage.dotType)
    const Com = item.com
    return <Com {...item.props} color={loadingPage.dotColor}/>
  }, [loadingPage.dotType, loadingPage.dotColor])
  
  const loadingBg = getBg(startPage.rectColor, startPage.pageAngle)
  
  return (<>
    <div className={cs('page-list')}>
      <div className={cs('page-list-item', 'page-list-item-loading')}>
        <div className={cs('page-list-item-left')}>
          <div>
            <img width="16" height="16" src="https://ossprod.jrdaimao.com/file/1721200164515337.svg" alt=""/>
          </div>
          <span>加载页</span>
        </div>
        <div className={cs('page-list-item-center')}>
          <div className={cs('page-list-item-page')} style={{ background: loadingBg }}>
            <div className={cs('page-loading')}>
              {LoadingCom ? LoadingCom : null}
              <span style={{ color: loadingPage.textColor }}>{loadingPage.text}</span>
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
      <DndContext sensors={sensors} onDragEnd={onDragEnd} modifiers={[restrictToParentElement]}>
        <SortableContext items={pageList.map(item => item.id)} strategy={rectSortingStrategy}>
          {
            pageList.map((item, index) => {
              return <DraggableItem index={index} key={item.id} item={item}/>
            })
          }
        </SortableContext>
      </DndContext>
    </div>
    <EditLoading/>
  </>)
}

export default observer(PageList)
