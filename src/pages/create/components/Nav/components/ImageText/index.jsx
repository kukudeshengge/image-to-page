import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useQueryResourceList } from './hooks'
import { createStore } from '../../../../../../store/create'
import { observer } from 'mobx-react-lite'
import Preview from '../Preview'
import Image from '../../../../../../components/Image'

const cs = classNames.bind(styles)

const ImageText = () => {
  const { workspace } = createStore
  const { data, isLoading } = useQueryResourceList({
    type: 'image-text',
    onSuccess: () => {
      setTimeout(() => createStore.leftNavScroll?.refresh())
    }
  })
  const onClick = (item) => {
    workspace.add.jsonGroupToObject(item.data)
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
