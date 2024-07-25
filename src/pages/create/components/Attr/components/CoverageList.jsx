import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Empty } from 'antd'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import { fabric } from 'fabric'

const cs = classNames.bind(styles)

const ObjectThumb = ({ object }) => {
  const [image, setImage] = useState('')
  
  useEffect(() => {
    try {
      const name = object.type[0].toUpperCase() + object.type.slice(1)
      fabric[name].fromObject(object, object => {
        object.set({
          visible: true,
          opacity: 1
        })
        setImage(object.toDataURL())
      })
    } catch (err) {
      console.log(err)
    }
  }, [object])
  
  if (!image) return null
  return <img style={{ zoom: '0.5' }} src={image} alt=""/>
}

const CoverageList = () => {
  const { canvas, workspace, selectObjects } = createStore
  const page = createStore.getCurrentPage()
  
  // 高亮id集合
  const activeIdList = useMemo(() => {
    if (!Array.isArray(selectObjects) || !selectObjects.length) return []
    return selectObjects.map(item => item.id)
  }, [selectObjects])
  
  // object list
  const list = useMemo(() => {
    if (!page.canvasData || !page.canvasData.objects) return []
    return page.canvasData.objects.filter(item => {
      return item.id !== 'workspace'
    })
  }, [page.canvasData])
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
    workspace.hoverBorder.clearBorder()
    canvas.setActiveObject(object).renderAll()
  }
  const onMouseLeave = () => {
    workspace.hoverBorder.clearBorder()
  }
  const onMouseEnter = (item) => {
    const object = getObject(item.id)
    workspace.hoverBorder.drawRect(object)
  }
  return (
    <div className={cs('coverage-list')}>
      {
        list.length === 0 ? <div style={{ marginTop: 100 }}>
          <Empty description="空空如也~"/>
        </div> : null
      }
      {
        list.map((item) => {
          return <div
            onMouseEnter={() => onMouseEnter(item)}
            onMouseLeave={onMouseLeave}
            onClick={() => changeSelect(item)}
            key={item.id}
            className={cs({ 'coverage-list-item': true, active: activeIdList.includes(item.id) })}
          >
            <span><ObjectThumb object={item}/></span>
            <span>
              <i onClick={() => changeVisible(item)}>
                {
                  item.visible ?
                    <img src="https://ossprod.jrdaimao.com/file/1690437893570728.svg" alt=""/> :
                    <img src="https://ossprod.jrdaimao.com/file/1690945206225980.svg" alt=""/>
                }
              </i>
              <i onClick={() => changeLock(item)}>
                {
                  item.hasControls ?
                    <img src="https://ossprod.jrdaimao.com/file/1690437902259961.svg" alt=""/> :
                    <img src="https://ossprod.jrdaimao.com/file/1690944574168632.svg" alt=""/>
                }
              </i>
            </span>
          </div>
        })
      }
    </div>
  )
}

export default observer(CoverageList)
