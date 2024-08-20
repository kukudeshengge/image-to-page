import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { observer } from 'mobx-react-lite'
import { Select, Slider } from 'antd'
import { useSetState } from 'ahooks'
import { createStore } from '../../../../../../store/create'
import PopoverColor from '../../../Attr/components/PopoverColor'

const cs = classNames.bind(styles)

const Outline = () => {
  const { canvas, selectObjects } = createStore
  const [state, setState] = useSetState({
    strokeWidth: 0,
    stroke: '#000000',
    strokeLineJoin: 'bevel'
  })
  
  useEffect(() => {
    const object = selectObjects[0]
    setState({
      strokeWidth: object.strokeWidth || 0,
      stroke: object.stroke || '#000000',
      strokeLineJoin: object.strokeLineJoin || 'bevel'
    })
  }, [selectObjects])
  
  const asyncData = (value) => {
    const object = selectObjects[0]
    if (!object) return
    const attrs = {
      ...state,
      ...value,
      paintFirst: 'stroke'
    }
    setState(attrs)
    object.set(attrs)
    canvas.renderAll()
    createStore.modifiedCanvas()
  }
  
  const onChange = (key, value) => {
    asyncData({ [key]: value })
  }
  
  return (
    <div className={cs('item-wrap')}>
      <div className={cs('item')}>
        <span className={cs('label')}>描边厚度</span>
        <Slider
          value={state.strokeWidth}
          min={0}
          max={30}
          onChangeComplete={(e) => onChange('strokeWidth', e)}
          onChange={(e) => setState({ strokeWidth: e })}
        />
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>角落风格</span>
        <Select
          placeholder="请选择"
          value={state.strokeLineJoin}
          onChange={(e) => onChange('strokeLineJoin', e)}
        >
          <Select.Option value="bevel">斜面</Select.Option>
          <Select.Option value="round">圆形</Select.Option>
          <Select.Option value="miter">斜接</Select.Option>
        </Select>
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>描边颜色</span>
        <div className={cs('color')}>
          <PopoverColor
            color={state.stroke}
            onChange={(e) => onChange('stroke', e.hex)}
          >
            <div style={{ background: state.stroke }}></div>
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
