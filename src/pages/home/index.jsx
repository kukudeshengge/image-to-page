import React from 'react'
import Header from '@/components/Header'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { menuList } from './config'
import { observer } from 'mobx-react-lite'
import { Outlet, useNavigate } from 'react-router-dom'
import { shareStore } from '../../store/share'

const cs = classNames.bind(styles)

const Home = () => {
  const nav = useNavigate()
  const navClick = (item) => {
    shareStore.setActiveKey(item.key)
    nav(item.path)
  }
  return (
    <div className={cs('home')}>
      <Header/>
      <div className={cs('home-content')}>
        <div className={cs('menu')}>
          {
            menuList.map(item => {
              return <div key={item.key} className={cs('menu-item')}>
                <div key={item.key} className={cs('menu-item-title')}>{item.title}</div>
                <div className={cs('menu-item-children')}>
                  {
                    item.children.map(item => {
                      const active = shareStore.activeKey === item.key
                      const src = active ? item.selectedIcon : item.icon
                      return <div className={cs({ 'active': active })} key={item.key} onClick={() => navClick(item)}>
                        <img src={src} alt=""/>
                        <span>{item.title}</span>
                      </div>
                    })
                  }
                </div>
              </div>
            })
          }
        </div>
        <div className={cs('content')}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default observer(Home)
