import React from 'react'
import { Button, Popover } from 'antd'
import styles from './index.module.less'
import classNames from 'classnames/bind'

const cs = classNames.bind(styles)

const loveIcon = <img width='18' height='18' src="https://ossprod.jrdaimao.com/file/1721183774943391.svg" alt=""/>

const Preview = (props) => {
  const { children, item } = props
  
  const content = <div className={cs('preview-content')}>
    <img src={item.url} alt=""/>
    <div className={cs('footer')}>
      <Button icon={loveIcon}>收藏</Button>
      <Button type='primary'>立即使用</Button>
    </div>
  </div>
  return children
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
