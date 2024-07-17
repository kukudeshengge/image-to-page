import React from 'react'
import ShapeItem from './ShapeItem'
import classNames from 'classnames/bind'
import styles from './index.module.less'

const cs = classNames.bind(styles)

const Decorate = () => {
  return (
    <div className={cs('shape-list')}>
      {
        [1, 2, 3, 4, 5, 6, 7, 9].map(item => {
          return <ShapeItem/>
        })
      }
    </div>
  )
}

export default Decorate
