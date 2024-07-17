import React from 'react'
import ShapeItem from './ShapeItem'
import classNames from 'classnames/bind'
import styles from './index.module.less'

const cs = classNames.bind(styles)

const ImageText = () => {
  return (
    <div className={cs('shape-list')}>
      {
        [1].map(item => {
          return <ShapeItem/>
        })
      }
    </div>
  )
}

export default ImageText
