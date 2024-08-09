import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Empty } from 'antd'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import { fabric } from 'fabric'
import { HoverBorderId, WorkspaceId } from '../../../../../config/name'
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import { arrayMove, useSortable, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

const cs = classNames.bind(styles)

const ObjectThumb = ({ object }) => {
  const [image, setImage] = useState('')
  const [isVideo, setIsVideo] = useState(false)
  
  useEffect(() => {
    if (object.videoUrl) {
      return setIsVideo(true)
    }
    try {
      const name = object.type[0].toUpperCase() + object.type.slice(1)
      fabric[name].fromObject(object, object => {
        object.set({
          visible: true, opacity: 1
        })
        setImage(object.toDataURL())
      })
    } catch (err) {
      console.log(err)
    }
  }, [object])
  if (isVideo) {
    return '视频'
  }
  if (!image) return null
  return <img style={{ zoom: '0.5' }} src={image} alt=""/>
}

const DraggableItem = (props) => {
  const { item, activeIdList } = props
  const { canvas, workspace } = createStore
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
    styles.background = '#1261ff'
    styles.position = 'relative'
    styles.zIndex = 999
  }
  
  // get object
  const getObject = (id) => canvas.getObjects().find(v => v.id === id)
  // 可见/不可见
  const changeVisible = (item) => {
    const object = getObject(item.id)
    if (!object) return
    workspace.tools.changeObjectShow(object)
  }
  // 锁定/解锁
  const changeLock = (item) => {
    const object = getObject(item.id)
    if (!object) return
    workspace.tools.changeObjectLock(object)
  }
  // 选择
  const changeSelect = (item) => {
    const object = getObject(item.id)
    if (!object) return
    workspace.hoverBorder.clearBorder()
    canvas.setActiveObject(object).renderAll()
  }
  // 鼠标提出清空border
  const onMouseLeave = () => {
    workspace.hoverBorder.clearBorder()
  }
  // 鼠标移入增加border
  const onMouseEnter = (item) => {
    const object = getObject(item.id)
    if (!object) return
    workspace.hoverBorder.drawBorder(object)
  }
  
  return <div
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={styles}
    onMouseEnter={() => onMouseEnter(item)}
    onMouseLeave={onMouseLeave}
    onClick={() => changeSelect(item)}
    key={item.id}
    className={cs({ 'coverage-list-item': true, active: activeIdList.includes(item.id) })}
  >
    <span><ObjectThumb object={item}/></span>
    <span>
      <i onClick={() => changeVisible(item)}>
        {item.visible ? <img src="https://ossprod.jrdaimao.com/file/1690437893570728.svg" alt=""/> : <img
          src="https://ossprod.jrdaimao.com/file/1690945206225980.svg" alt=""/>}
      </i>
      <i onClick={() => changeLock(item)}>
        {item.hasControls ? <img src="https://ossprod.jrdaimao.com/file/1690437902259961.svg" alt=""/> : <img
          src="https://ossprod.jrdaimao.com/file/1690944574168632.svg" alt=""/>}
      </i>
    </span>
  </div>
}

const CoverageList = () => {
  const { selectObjects, attrScroll } = createStore
  const page = createStore.getCurrentPage()
  const [list, setList] = useState([])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )
  // object list
  useEffect(() => {
    if (!page.canvasData || !page.canvasData.objects) return []
    const list = page.canvasData.objects.filter(item => {
      return item.id !== WorkspaceId && item.id !== HoverBorderId
    })
    setList(list)
    setTimeout(() => attrScroll?.refresh())
  }, [page.canvasData])
  // get index
  const getMoveIndex = (array, dragItem) => {
    const { active, over } = dragItem
    const activeIndex = array.findIndex((item) => item.id === active.id)
    const overIndex = array.findIndex((item) => item.id === over?.id)
    
    // 处理未找到索引的情况
    return {
      activeIndex: activeIndex !== -1 ? activeIndex : 0,
      overIndex: overIndex !== -1 ? overIndex : activeIndex
    }
  }
  // drag end
  const onDragEnd = (dragItem) => {
    const { active, over } = dragItem
    if (!active || !over) return
    const newList = [...list]
    const { activeIndex, overIndex } = getMoveIndex(newList, dragItem)
    
    if (activeIndex !== overIndex) {
      setList(arrayMove(newList, activeIndex, overIndex))
    }
  }
  
  // 高亮id集合
  const activeIdList = selectObjects?.map(item => item.id) || []
  
  return (<div className={cs('coverage-list')}>
    {list.length === 0 ? <div style={{ marginTop: 100 }}>
      <Empty description="空空如也~"/>
    </div> : null}
    <DndContext sensors={sensors} onDragEnd={onDragEnd} modifiers={[restrictToParentElement]}>
      <SortableContext items={list.map(item => item.id)} strategy={rectSortingStrategy}>
        {list.map((item) => {
          return <DraggableItem activeIdList={activeIdList} key={item.id} item={item}/>
        })}
      </SortableContext>
    </DndContext>
  </div>)
}

export default observer(CoverageList)
