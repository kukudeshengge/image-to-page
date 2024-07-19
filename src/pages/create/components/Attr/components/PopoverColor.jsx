import React from 'react'
import { SketchPicker } from 'react-color'
import { Popover } from 'antd'
import classNames from 'classnames/bind'
import styles from './index.module.less'

const cs = classNames.bind(styles)

const PopoverColor = (props) => {
  const { color, onChange, children } = props
  return <Popover
    trigger="click"
    arrow={false}
    overlayClassName={cs('color-popover')}
    title=""
    content={<SketchPicker color={color} onChange={onChange}/>}
    placement="bottom"
  >
    {children}
  </Popover>
}

export default PopoverColor
