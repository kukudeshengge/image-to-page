import React from 'react'
import ShapeItem from './ShapeItem'
import classNames from 'classnames/bind'
import styles from './index.module.less'

const cs = classNames.bind(styles)

const ImageText = () => {
  return (
    <div className={cs('shape-list')}>
      {
        [1].map((item, index) => {
          return <ShapeItem key={index}/>
        })
      }
    </div>
  )
}

export default ImageText
