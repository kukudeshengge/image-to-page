import React from 'react'
import styles from './index.module.less'
import classNames from 'classnames/bind'
import { observer } from 'mobx-react-lite'
import { matterStore } from '@/store/home/myMatter'
import LazyLoad from 'react-lazy-load'
import { Checkbox,Image } from 'antd'

const cs = classNames.bind(styles)

const MatterItem = (props) => {
  const { batchMode, selectIds, activeTypeKey } = matterStore
  const { styles,index } = props
  const checked = selectIds.includes(index)
  const onCheckChange = () => {
    matterStore.onCheckChange(index)
  }
  return (
    <div style={styles} className={cs('matter-item')}>
      {
        batchMode ? <div className={cs('checkbox')}>
          <Checkbox checked={checked} onChange={onCheckChange}/>
        </div> : null
      }
      <div className={cs('matter-img')}>
        {
          activeTypeKey === '1' ? <LazyLoad>
            <Image
              className={cs('img')}
              src="https://img1.baidu.com/it/u=3256140759,1684200872&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
              alt=""/>
          </LazyLoad> : activeTypeKey === '2' ?
            <video
              className={cs('video')}
              controls
              src="https://ossprod.jrdaimao.com/file/1721022262110886.mp4"/> :
            <div className={cs('audio')}>
              <img src="https://ossprod.jrdaimao.com/file/1721027320469165.svg" alt=""/>
              <span>jdiwefj238.mp3</span>
            </div>
        }
      </div>
      <div className={cs('matter-content')}>
        <span>2023-08-22 14:23</span>
        <span>329KB</span>
      </div>
    </div>
  )
}

export default observer(MatterItem)
