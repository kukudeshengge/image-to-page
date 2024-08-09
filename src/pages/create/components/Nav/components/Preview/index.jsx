import React from 'react'
import { Button, Popover } from 'antd'
import styles from './index.module.less'
import classNames from 'classnames/bind'

const cs = classNames.bind(styles)

const loveIcon = <img width='18' height='18' src="https://ossprod.jrdaimao.com/file/1721183774943391.svg" alt=""/>

const Preview = ({ children }) => {
  const content = <div className={cs('preview-content')}>
    <img src="https://q1.itc.cn/images01/20240325/74f1df00de6546d5b5f5cf155a81ccd7.jpeg" alt=""/>
    <div>
      <Button icon={loveIcon}>收藏</Button>
      <Button type='primary'>立即使用</Button>
    </div>
  </div>
  return (
    <Popover
      arrow={false}
      overlayClassName={cs('preview-popover')}
      mouseLeaveDelay={0.5}
      mouseEnterDelay={0.8}
      title=""
      content={content}
      placement="right"
    >
      {children}
    </Popover>
  )
}

export default Preview
