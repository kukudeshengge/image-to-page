import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import Preview from '../Preview'

const cs = classNames.bind(styles)

const OnePage = () => {
  return (
    <div className={cs('one-page')}>
      {
        [1, 2, 3, 4, 5, 6].map((item, index) => {
          return <Preview key={index}>
            <div>
              <img src="https://q1.itc.cn/images01/20240325/74f1df00de6546d5b5f5cf155a81ccd7.jpeg" alt=""/>
            </div>
          </Preview>
        })
      }
    </div>
  )
}

export default OnePage
