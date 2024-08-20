import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { WorkspaceId } from '../../../../config/name'

const ProductItemThumb = (props) => {
  const { data } = props
  const canvasEl = useRef()
  
  useEffect(() => {
    if (!data || !data.canvasData) return
    const width = canvasEl.current.clientWidth
    const height = canvasEl.current.clientHeight
    const thumbZoom = height / 667
    const canvas = new fabric.StaticCanvas(canvasEl.current, {
      width,
      height
    })
    canvas.loadFromJSON(data.canvasData, () => {
      const rect = canvas.getObjects().find(item => item.id === WorkspaceId)
      canvas.setZoom(thumbZoom)
      const thumbViewportTransform = canvas.viewportTransform
      thumbViewportTransform[4] = -rect.left + rect.width / 2  * thumbZoom
      thumbViewportTransform[5] = -rect.top * thumbZoom
      canvas.setViewportTransform(thumbViewportTransform)
      canvas.renderAll()
    })
  }, [data])
  if (!data) return null
  return (
    <canvas style={{...data.filterStyle}} ref={canvasEl}/>
  )
}

export default ProductItemThumb
