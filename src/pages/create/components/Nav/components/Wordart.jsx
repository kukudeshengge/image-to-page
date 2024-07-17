import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'

const cs = classNames.bind(styles)

const Wordart = () => {
  return (
    <div className={cs('word-dart')}>
      {
        [1, 2, 3, 4, 5].map(item => {
          return <div>
            <img src="https://ossprod.jrdaimao.com/file/1721126001961320.jpg" alt=""/>
          </div>
        })
      }
    </div>
  )
}

export default Wordart
