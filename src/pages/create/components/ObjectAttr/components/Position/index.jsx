import React  from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { InputNumber } from 'antd'
import { createStore } from '../../../../../../store/create'
import {observer} from 'mobx-react-lite'

const cs = classNames.bind(styles)

const CustomInputNumber = (props) => <InputNumber min={0} max={9999} precision={2} controls={false} {...props}/>

const Position = () => {
  const { getCurrentObjectAttr, objectAttrChange } = createStore
  const { width, height, left, top, angle } = getCurrentObjectAttr(['width', 'height', 'left', 'top', 'angle'])
  
  const onChange = (attr, e) => {
    if (e === null || e === undefined) return
    objectAttrChange({ [attr]: e })
  }
  
  return (
    <div className={cs('position')}>
      <div className={cs('item')}>
        <CustomInputNumber
          value={width}
          onChange={(e) => onChange('width', e)}
          addonBefore={'W'}
        />
        <CustomInputNumber
          value={height}
          onChange={(e) => onChange('height', e)}
          addonBefore={'H'}
        />
      </div>
      <div className={cs('item')}>
        <CustomInputNumber
          value={left}
          onChange={(e) => onChange('left', e)}
          addonBefore={'X'}
        />
        <CustomInputNumber
          value={top}
          onChange={(e) => onChange('top', e)}
          addonBefore={'Y'}
        />
      </div>
      <div className={cs('item')} style={{ marginBottom: 0 }}>
        <CustomInputNumber
          precision={0}
          value={angle}
          onChange={(e) => onChange('angle', e)}
          addonBefore={'A'}
        />
      </div>
    </div>
  )
}

export default observer(Position)
