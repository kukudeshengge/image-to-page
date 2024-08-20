import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useQueryResourceList } from './hooks'
import { createStore } from '../../../../../../store/create'
import { observer } from 'mobx-react-lite'
import Preview from '../Preview'
import Image from '../../../../../../components/Image'
import { hideLoading, showLoading } from '../../../../../../utils/msgLoading'

const cs = classNames.bind(styles)

const ImageText = () => {
  const { workspace, leftNavScroll } = createStore
  const { data, isLoading } = useQueryResourceList({
    type: 'image-text'
  })
  useEffect(() => {
    leftNavScroll?.refresh()
  }, [data])
  const onClick = async (item) => {
    showLoading('正在使用图文')
    await workspace.add.jsonGroupToObject(item.data)
    hideLoading()
  }
  
  if (isLoading) return null
  
  return (
    <div className={cs('shape-list')}>
      {
        data.map((item) => {
          return <Preview key={item._id} item={item}>
            <div onClick={() => onClick(item)} className={cs('shape-item')}>
              <Image src={item.url}/>
            </div>
          </Preview>
        })
      }
    </div>
  )
}

export default observer(ImageText)
