import React from 'react'
import classNames from 'classnames/bind'
import styles from '../Outline/index.module.less'
import PopoverColor from '../../../Attr/components/PopoverColor'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../../store/create'

const cs = classNames.bind(styles)

const BgColor = () => {
  const { objectAttrChange, getCurrentObjectAttr } = createStore
  const textBackgroundColor = getCurrentObjectAttr('textBackgroundColor')
  const onChange = (e) => objectAttrChange({ textBackgroundColor: e.hex })
  
  return (<div className={cs('item')} style={{ marginBottom: 0 }}>
    <span className={cs('label')}>背景颜色</span>
    <div className={cs('color')}>
      <PopoverColor
        color={textBackgroundColor}
        onChange={onChange}
      >
        <div style={{ background: textBackgroundColor }}></div>
      </PopoverColor>
      <div>
        <img src="https://ossprod.jrdaimao.com/file/1722847203274287.svg" alt=""/>
      </div>
    </div>
  </div>)
}

export default observer(BgColor)
