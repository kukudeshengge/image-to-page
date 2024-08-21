import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { observer } from 'mobx-react-lite'
import { Select, Slider } from 'antd'
import { createStore } from '../../../../../../store/create'
import PopoverColor from '../../../Attr/components/PopoverColor'

const cs = classNames.bind(styles)

const Outline = () => {
  const { getCurrentObjectAttr, objectAttrChange } = createStore
  const { strokeWidth, stroke, strokeLineJoin } = getCurrentObjectAttr(['strokeWidth', 'stroke', 'strokeLineJoin'])
  const onChange = (value) => {
    const attrs = {
      strokeWidth,
      stroke,
      strokeLineJoin,
      ...value,
      paintFirst: 'stroke'
    }
    objectAttrChange(attrs)
  }
  return (
    <div className={cs('item-wrap')}>
      <div className={cs('item')}>
        <span className={cs('label')}>描边厚度</span>
        <Slider
          value={strokeWidth}
          min={0}
          max={30}
          onChange={(e) => onChange({ strokeWidth: e })}
        />
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>角落风格</span>
        <Select
          placeholder="请选择"
          value={strokeLineJoin}
          onChange={(e) => onChange({ strokeLineJoin: e })}
        >
          <Select.Option value="miter">斜接</Select.Option>
          <Select.Option value="bevel">斜面</Select.Option>
          <Select.Option value="round">圆形</Select.Option>
        </Select>
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>描边颜色</span>
        <div className={cs('color')}>
          <PopoverColor
            color={stroke || '#ffffff'}
            onChange={(e) => onChange({ stroke: e.hex })}
          >
            <div style={{ background: stroke }}></div>
          </PopoverColor>
          <div>
            <img src="https://ossprod.jrdaimao.com/file/1722847203274287.svg" alt=""/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Outline)
