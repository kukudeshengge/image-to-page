import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { navList, ComEnum, filterList } from './config'
import { createStore } from '../../../../store/create'
import { observer } from 'mobx-react-lite'
import IScroll from 'iscroll'
import { message } from 'antd'

const cs = classNames.bind(styles)

const Nav = () => {
  const { navActiveKey, filterActiveKey } = createStore
  
  const onChangeNavKey = (item) => {
    createStore.navActiveKey = item.type
  }
  const onFilterChange = (item) => {
    if (item.value === 1) return message.warning('功能正在开发中')
    createStore.filterActiveKey = item.value
  }
  
  useEffect(() => {
    createStore.leftNavScroll = new IScroll('#right-nav-content', {
      mouseWheel: true,
      scrollbars: true,
    })
  }, [])
  
  const Component = ComEnum[navActiveKey]
  
  return (
    <div className={cs('nav')}>
      <div className={cs('left-nav')}>
        {
          navList.map(item => {
            const active = navActiveKey === item.type
            return <div onClick={() => onChangeNavKey(item)} key={item.type} className={cs({ active })}>
              <img draggable={false} src={item.icon} alt=""/>
              <img draggable={false} src={item.activeIcon} alt=""/>
              <span>{item.title}</span>
            </div>
          })
        }
      </div>
      <div className={cs('right-nav')}>
        <div className={cs('right-nav-filter')}>
          {
            filterList.map(item => {
              const active = filterActiveKey === item.value
              return <div
                key={item.value}
                onClick={() => onFilterChange(item)}
                className={cs({ active })}
              >
                {item.title}
              </div>
            })
          }
        </div>
        <div className={cs('right-nav-content')} id="right-nav-content">
          <div className={cs('nav-content')}>
            <div style={{ height: 15 }}></div>
            {Component && <Component/>}
            <div style={{ height: 15 }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Nav)
