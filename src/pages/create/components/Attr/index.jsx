import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import IScroll from 'iscroll'
import { attrTabCom, attrTabList } from './config'
import { createStore } from '../../../../store/create'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'

const cs = classNames.bind(styles)

const Attr = () => {
  const { attrActiveKey } = createStore
  useEffect(() => {
    new IScroll('#attr-right-nav-content', {
      mouseWheel: true,
      scrollbars: true,
      preventDefault: false
    })
  }, [])
  const onChangeTab = (item) => {
    createStore.setAttrActiveKey(item.type)
  }
  
  const Component = attrTabCom[attrActiveKey]
  return (
    <div className={cs('attr')}>
      <div className={cs('attr-left')}>
        {/*撤回*/}
        <div>
          <img src="https://ossprod.jrdaimao.com/file/1721186771584957.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721186756887993.svg" alt=""/>
        </div>
        {/*重做*/}
        <div>
          <img src="https://ossprod.jrdaimao.com/file/1721187049748370.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721187060714775.svg" alt=""/>
        </div>
        {/*复制当前页*/}
        <div>
          <img src="https://ossprod.jrdaimao.com/file/1721187136774408.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721187147036256.svg" alt=""/>
        </div>
        {/*放大*/}
        <div>
          <img src="https://ossprod.jrdaimao.com/file/1721187497059765.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721187504061796.svg" alt=""/>
        </div>
        <div className={cs('scale')}>100%</div>
        {/*缩小*/}
        <div>
          <img src="https://ossprod.jrdaimao.com/file/1721187303958736.svg" alt=""/>
          <img src="https://ossprod.jrdaimao.com/file/1721187321676131.svg" alt=""/>
        </div>
      </div>
      <div className={cs('attr-right')}>
        <div className={cs('right-nav')}>
          {
            attrTabList.map(item => {
              const active = item.type === attrActiveKey
              return <div
                onClick={() => onChangeTab(item)}
                key={item.type}
                className={cs({ active })}
              >
                {item.title}
              </div>
            })
          }
        </div>
        <div className={cs('right-nav-content')} id="attr-right-nav-content">
          <div>
            <Component/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Attr)
