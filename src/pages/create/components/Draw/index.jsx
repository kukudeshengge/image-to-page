import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { fabric } from 'fabric'
import { createStore } from '../../../../store/create'
import { observer } from 'mobx-react-lite'
import Workspace from '../../core/workspace'
import { getDocumentSize } from '../../../../utils'
import { v4 as uuid } from 'uuid'

const cs = classNames.bind(styles)

const Draw = () => {
  useEffect(() => {
    const { width, height } = getDocumentSize()
    const canvas = new fabric.Canvas('draw-canvas', {
      width: width - 660,
      height: height - 56,
      fireRightClick: true,
      stopContextMenu: true,
      controlsAboveOverlay: true,
      preserveObjectStacking: true
    })
    const workspace = new Workspace(canvas)
    workspace.createStore = createStore
    createStore.init(canvas, workspace)
    tooClick(canvas)
  }, [])
  const tooClick = (canvas) => {
    const text = new fabric.Textbox('你好啊', {
      fontSize: 14,
      left: 20,
      top: 300,
      id: uuid()
    })
    const text2 = new fabric.Textbox('你好啊', {
      fontSize: 20,
      fontWeight: '600',
      left: 20,
      top: 200,
      id: uuid()
    })
    canvas.add(text).add(text2)
    canvas.renderAll()
    createStore.modifiedCanvas()
  }
  return (
    <div className={cs('draw')} id="draw-container">
      <div className={cs('draw-canvas-wrap')}>
        <canvas id="draw-canvas"/>
      </div>
    </div>
  )
}

export default observer(Draw)
