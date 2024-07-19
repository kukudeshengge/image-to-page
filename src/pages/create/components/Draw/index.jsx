import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { fabric } from 'fabric'
import { createStore } from '../../../../store/create'
import { observer } from 'mobx-react-lite'
import Workspace from '../../core/workspace'

const cs = classNames.bind(styles)

const Draw = () => {
  const container = useRef(null)
  useEffect(() => {
    const width = container.current.clientWidth
    const height = container.current.clientHeight
    const canvas = new fabric.Canvas('draw-canvas', {
      width,
      height,
      stopContextMenu: true
    })
    const workspace = new Workspace(canvas, {
      width,
      height
    })
    createStore.canvas = canvas
    createStore.workspace = workspace
  }, [])
  
  return (
    <div className={cs('draw')}>
      <div className={cs('draw-canvas-wrap')} ref={container}>
        <canvas className={cs('draw-canvas')} id="draw-canvas"/>
      </div>
    </div>
  )
}

export default observer(Draw)
