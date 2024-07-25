import { fabric } from 'fabric'
import { initAligningGuidelines } from './fabricGuide'

export const initConfig = (canvas) => {
  initStyle()
  initControls()
  initAligningGuidelines(canvas)
}

const initStyle = () => {
  fabric.Object.prototype.objectCaching = false
  fabric.Object.prototype.borderColor = 'blue'
  fabric.Object.prototype.cornerColor = 'white'
  fabric.Object.prototype.cornerStrokeColor = '#c0c0c0'
  fabric.Object.prototype.borderOpacityWhenMoving = 1
  fabric.Object.prototype.borderScaleFactor = 1
  fabric.Object.prototype.cornerSize = 8
  fabric.Object.prototype.cornerStyle = 'rect'
  fabric.Object.prototype.centeredScaling = false
  fabric.Object.prototype.centeredRotation = true
  fabric.Object.prototype.transparentCorners = false
  fabric.Object.prototype.padding = 5
}

function noop () {
  return null
}

const initControls = () => {
  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: -0.5,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionName: 'scaling',
    render: noop
  })
  fabric.Textbox.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: -0.5,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionName: 'scaling',
    render: noop
  })
  const changeObjectHeight = (eventData, transform, x, y) => {
    const localPoint = fabric.controlsUtils.getLocalPoint(transform, transform.originX, transform.originY, x, y)
    
    //  make sure the control changes width ONLY from it's side of target
    const { target } = transform
    if ((transform.originY === 'top' && localPoint.y > 0) || (transform.originY === 'bottom' && localPoint.y < 0)) {
      
      const strokeWidth = target.strokeWidth ? target.strokeWidth : 0
      if (!target.scaleY) return false
      const strokePadding = strokeWidth / (target.strokeUniform ? target.scaleY : 1)
      const oldHeight = target.height
      const newHeight = Math.ceil(Math.abs((localPoint.y * 1) / target.scaleY) - strokePadding)
      target.set('height', Math.max(newHeight, 0))
      return oldHeight !== target.height
    }
    return false
  }
  const changeWidth = fabric.controlsUtils.wrapWithFireEvent(
    'scaling',
    fabric.controlsUtils.wrapWithFixedAnchor(fabric.controlsUtils.changeWidth)
  )
  const changeHeight = fabric.controlsUtils.wrapWithFireEvent(
    'scaling',
    fabric.controlsUtils.wrapWithFixedAnchor(changeObjectHeight)
  )
  fabric.Object.prototype.controls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionName: 'scaling',
    render: noop
  })
  
  fabric.Object.prototype.controls.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionName: 'scaling',
    render: noop
  })
  
  fabric.Object.prototype.controls.mb = new fabric.Control({
    x: 0,
    y: 0.5,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionName: 'scaling',
    render: noop
  })
  
  fabric.Object.prototype.controls.mt = new fabric.Control({
    x: 0,
    y: -0.5,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionName: 'scaling',
    render: noop
  })
  fabric.Textbox.prototype.controls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    actionHandler: changeWidth,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    render: noop
  })
  fabric.Textbox.prototype.controls.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    actionHandler: changeWidth,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    render: noop
  })
  fabric.Textbox.prototype.controls.mt = new fabric.Control({
    x: 0,
    y: -0.5,
    actionHandler: changeHeight,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    render: noop
  })
  fabric.Textbox.prototype.controls.mb = new fabric.Control({
    x: 0,
    y: 0.5,
    actionHandler: changeHeight,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    render: noop
  })
}
