import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import { triggeredList } from './config'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../../store/create'
import { Input } from 'antd'

const cs = classNames.bind(styles)

const Handle = () => {
  const { canvas, pageList, selectObjects } = createStore
  const [cache, setCache] = useState({ triggeredType: 0 })
  
  useEffect(() => {
    if (!canvas) return
    const activeObject = canvas.getActiveObject() || {}
    if (!activeObject) return
    setCache(activeObject.triggered || { triggeredType: 0 })
  }, [selectObjects])
  
  const changeTriggered = item => {
    const activeObject = canvas.getActiveObject()
    if (!activeObject || !activeObject.id) return
    const value = {
      title: item.title,
      triggeredType: item.value,
      type: item.type,
      inputProps: item.inputProps,
      value: null
    }
    activeObject.triggered = value
    setCache(value)
    createStore.modifiedCanvas()
  }
  
  const onChange = e => {
    const activeObject = canvas.getActiveObject()
    if (!activeObject || !activeObject.triggered) return
    activeObject.triggered.value = e
    setCache(prevState => ({
      ...prevState,
      value: e
    }))
    createStore.modifiedCanvas()
  }
  
  return (
    <div className={styles.handle}>
      <div className={styles.handleList}>
        {
          triggeredList.map(item => {
            return <div
              onClick={() => changeTriggered(item)}
              className={cs({ active: item.value === cache.triggeredType })}
              key={item.value}
            >
              <img src={item.icon} alt=""/>
              <img src={item.selectIcon} alt=""/>
              <span>{item.title}</span>
            </div>
          })
        }
      </div>
      <div className={cs('content')}>
        {
          cache.triggeredType ? <div className={cs('content-item')}>
            <div className={cs('content-item-title')}>
              <span>{cache.title}</span>
            </div>
            {
              cache.type === 'input' ?
                <Input
                  value={cache.value}
                  onChange={e => onChange(e.target.value)}
                  {...cache.inputProps}
                /> :
                cache.type === 'jumpPage' ?
                  <div className={styles.pages}>
                    {
                      pageList.map((item, index) => {
                          return <span
                            className={cs({ active: index === cache.value })}
                            key={item.id}
                            onClick={() => onChange(index)}
                          >
                                                        {index + 1}
                                                    </span>
                        }
                      )
                    }
                  </div> :
                  null
            }
          </div> : null
        }
      </div>
    </div>
  )
}

export default observer(Handle)
