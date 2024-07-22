import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { BeatLoader } from 'react-spinners'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../store/create'
import EditLoading from './EditLoading'

const cs = classNames.bind(styles)

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
  }
  
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
            <span onClick={openEditModal}>修改</span>
          </div>
        </div>
        {
          pageList.map((item, index) => {
            return <div
              onClick={() => onChangePage(index)}
              key={item.id}
              className={cs({ 'page-list-item': true, active: index === pageIndex })}
            >
              <div className={cs('page-list-item-left')}>
                <div>{index + 1}</div>
                <span>第{index + 1}页</span>
              </div>
              <div className={cs('page-list-item-center')}>
                <div className={cs('svg-view')}>
                  {item.image ? <img src={item.image} alt=""/> : null}
                </div>
                <div className={cs('page-list-item-add')} onClick={(e) => addPage(e, index)}>
                  <img src="https://ossprod.jrdaimao.com/file/1721198079884595.svg" alt=""/>
                  <img src="https://ossprod.jrdaimao.com/file/1721198303212865.svg" alt=""/>
                </div>
              </div>
              <div className={cs('page-list-item-right')}>
                <span onClick={(e) => copyItem(item, index)}>复制</span>
                {
                  pageList.length > 1 ? <span
                    onClick={(e) => deleteItem(e, index)}
                  >
                    删除
                  </span> : null
                }
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
