import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from '../Outline/index.module.less'
import { Slider } from 'antd'
import { observer } from 'mobx-react-lite'
import { useSetState } from 'ahooks'
import { createStore } from '../../../../../../store/create'
import { fabric } from 'fabric'
import PopoverColor from '../../../Attr/components/PopoverColor'

const cs = classNames.bind(styles)

const Shadow = () => {
  const { selectObjects, canvas } = createStore
  const [state, setState] = useSetState({
    offsetX: 0,
    offsetY: 0,
    color: '#000000',
    blur: 0
  })
  useEffect(() => {
    const object = selectObjects[0]
    if (!object.shadow) return
    setState({
      offsetX: object.shadow.offsetX,
      offsetY: object.shadow.offsetY,
      color: object.shadow.color,
      blur: object.shadow.blur
    })
  }, [selectObjects])
  
  const setShadow = (props) => {
    const object = selectObjects[0]
    const params = {
      color: state.color,
      offsetX: state.offsetX,
      offsetY: state.offsetY,
      blur: state.blur,
      ...props
    }
    object.shadow = new fabric.Shadow(params)
    setState(params)
    canvas.renderAll()
    createStore.modifiedCanvas()
  }
  const onChange = (key, value) => {
    setShadow({ [key]: value })
  }
  
  return (
    <div className={cs('item-wrap')}>
      <div className={cs('item')}>
        <span className={cs('label')}>水平阴影</span>
        <Slider
          min={-10}
          max={10}
          value={state.offsetX}
          onChange={(e) => setState({ offsetX: e })}
          onChangeComplete={(e) => onChange('offsetX', e)}
        />
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>垂直阴影</span>
        <Slider
          min={-10}
          max={10}
          value={state.offsetY}
          onChange={(e) => setState({ offsetY: e })}
          onChangeComplete={(e) => onChange('offsetY', e)}
        />
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>模糊距离</span>
        <Slider
          min={0}
          max={20}
          value={state.blur}
          onChange={(e) => setState({ blur: e })}
          onChangeComplete={(e) => onChange('blur', e)}
        />
      </div>
      <div className={cs('item')}>
        <span className={cs('label')}>阴影颜色</span>
        <div className={cs('color')}>
          <PopoverColor
            color={state.color}
            onChange={(e) => onChange('color', e.hex)}
          >
            <div style={{ background: state.color }}></div>
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
