import React  from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { BeatLoader } from 'react-spinners'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import EditLoading from './EditLoading'

const cs = classNames.bind(styles)



const PageList = () => {
  const list = new Array(10).fill({})
  return (
    <div>
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
            <span onClick={createStore.openEditPageLoadingModal}>修改</span>
          </div>
        </div>
        {
          list.map((item, index) => {
            return <div key={index} className={cs({ 'page-list-item': true, active: index === 1 })}>
              <div className={cs('page-list-item-left')}>
                <div>{index + 1}</div>
                <span>第{index + 1}页</span>
              </div>
              <div className={cs('page-list-item-center')}>
                <img src="https://ww3.sinaimg.cn/mw690/60ed0cf7ly1hrffurmq0xj21e03081kx.jpg" alt=""/>
                <div className={cs('page-list-item-add')}>
                  <img src="https://ossprod.jrdaimao.com/file/1721198079884595.svg" alt=""/>
                  <img src="https://ossprod.jrdaimao.com/file/1721198303212865.svg" alt=""/>
                </div>
              </div>
              <div className={cs('page-list-item-right')}>
                <span>复制</span>
                <span>删除</span>
              </div>
            </div>
          })
        }
      </div>
      <EditLoading/>
    </div>
  )
}

export default observer(PageList)
