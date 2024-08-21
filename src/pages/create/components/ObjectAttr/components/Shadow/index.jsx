import React  from 'react'
import classNames from 'classnames/bind'
import styles from '../Outline/index.module.less'
import { Slider } from 'antd'
import { observer } from 'mobx-react-lite'
import { createStore } from '../../../../../../store/create'
import { fabric } from 'fabric'
import PopoverColor from '../../../Attr/components/PopoverColor'

const cs = classNames.bind(styles)
const DefaultShadow = {
  offsetX: 0,
  offsetY: 0,
  color: '#000000',
  blur: 0
}

const Shadow = () => {
  const { getCurrentObjectAttr, objectAttrChange } = createStore
  const shadow = getCurrentObjectAttr('shadow') || DefaultShadow
  
  const setShadow = (props) => {
    const params = {
      color: shadow.color,
      offsetX: shadow.offsetX,
      offsetY: shadow.offsetY,
      blur: shadow.blur,
      ...props
    }
    const newShadow = new fabric.Shadow(params)
    objectAttrChange({ shadow: newShadow })
  }
  
  return (
    <div className={cs('item-wrap')}>
      <div className={cs('item')}>
        <span className={cs('label')}>水平阴影</span>
        <Slider
          min={-10}
          max={10}
          value={shadow.offsetX}
          onChange={(e) => setShadow({ offsetX: e })}
        />
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>垂直阴影</span>
        <Slider
          min={-10}
          max={10}
          value={shadow.offsetY}
          onChange={(e) => setShadow({ offsetY: e })}
        />
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>模糊距离</span>
        <Slider
          min={0}
          max={20}
          value={shadow.blur}
          onChange={(e) => setShadow({ blur: e })}
        />
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>阴影颜色</span>
        <div className={cs('color')}>
          <PopoverColor
            color={shadow.color}
            onChange={(e) => setShadow({ color: e.hex })}
          >
            <div style={{ background: shadow.color }}></div>
          </PopoverColor>
          <div>
            <img src="https://ossprod.jrdaimao.com/file/1722847203274287.svg" alt=""/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Shadow)
