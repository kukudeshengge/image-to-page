import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { InputNumber } from 'antd'
import { useSetState } from 'ahooks'
import { createStore } from '../../../../../../store/create'

const cs = classNames.bind(styles)

const CustomInputNumber = (props) => <InputNumber min={0} max={9999} precision={2} controls={false} {...props}/>

const Position = () => {
  const { selectObjects, canvas } = createStore
  const [state, setState] = useSetState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    angle: 0
  })
  
  useEffect(() => {
    getPosition()
    canvas.on('object:modified', getPosition)
    return () => {
      canvas.off('object:modified', getPosition)
    }
  }, [selectObjects, canvas])
  
  const getPosition = () => {
    const [object] = selectObjects
    if (!object) return
    setState({
      width: object.width.toFixed(2),
      height: object.height.toFixed(2),
      left: object.left.toFixed(2),
      top: object.top.toFixed(2),
      angle: object.angle
    })
  }
  
  const onChange = (attr, e) => {
    if (e === null || e === undefined) return
    const [object] = selectObjects
    if (!object) return
    setState({ [attr]: e })
    object.set(attr, e)
    canvas.renderAll()
    createStore.modifiedCanvas()
  }
  
  return (
    <div className={cs('position')}>
      <div className={cs('item')}>
        <CustomInputNumber
          value={state.width}
          onChange={(e) => onChange('width', e)}
          addonBefore={'W'}
        />
        <CustomInputNumber
          value={state.height}
          onChange={(e) => onChange('height', e)}
          addonBefore={'H'}
        />
      </div>
      <div className={cs('item')}>
        <CustomInputNumber
          value={state.left}
          onChange={(e) => onChange('left', e)}
          addonBefore={'X'}
        />
        <CustomInputNumber
          value={state.top}
          onChange={(e) => onChange('top', e)}
          addonBefore={'Y'}
        />
      </div>
      <div className={cs('item')} style={{ marginBottom: 0 }}>
        <CustomInputNumber
          value={state.angle}
          onChange={(e) => onChange('angle', e)}
          addonBefore={'A'}
        />
      </div>
    </div>
  )
}

export default Position
