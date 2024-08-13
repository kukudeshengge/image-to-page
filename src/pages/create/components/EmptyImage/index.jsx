import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Empty } from 'antd'

const cs = classNames.bind(styles)

const EmptyImage = () => {
  return (
    <div className={cs('empty-image')}>
      <Empty description={'作品不见了'}/>
    </div>
  )
}

export default EmptyImage
