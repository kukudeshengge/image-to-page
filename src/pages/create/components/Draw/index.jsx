import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { fabric } from 'fabric'
import { createStore } from '../../../../store/create'
import { observer } from 'mobx-react-lite'
import Workspace from '../../core/workspace'
import { getDocumentSize } from '../../../../utils'

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
    return () => {
      workspace.destroy()
      createStore.clearStore()
    }
  }, [])
  
  return (
    <div className={cs('draw')} id="draw-container">
      <div className={cs('draw-canvas-wrap')}>
        <canvas id="draw-canvas"/>
      </div>
    </div>
  )
}

export default observer(Draw)
