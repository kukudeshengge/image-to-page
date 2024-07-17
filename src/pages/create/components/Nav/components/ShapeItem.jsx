import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import Preview from './Preview'

const cs = classNames.bind(styles)

const ShapeItem = () => {
  return (
    <Preview>
      <div className={cs('shape-item')}>
        <img src="https://img0.baidu.com/it/u=1929577121,3484200313&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" alt=""/>
      </div>
    </Preview>
  )
}

export default ShapeItem
