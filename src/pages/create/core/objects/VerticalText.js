import { fabric } from 'fabric'

fabric.VerticalText = fabric.util.createClass(fabric.Group, {
  type: 'verticalText',
  
  initialize: function (elements, options) {
    this.callSuper('initialize', elements, options)
  },
  
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      type: 'verticalText'
    })
  }
})

fabric.VerticalText.fromObject = function (object, callback) {
  fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
    delete object.objects
    callback(new fabric.VerticalText(enlivenedObjects, object))
  })
}

fabric.Object.prototype.verticalText = fabric.VerticalText

export function createVerticalText (canvas, textString, options) {
  
  const ignoreRegex = /[･･･…ー（）｛｝「」(){}『』【】[\]]/
  // move a little to the right
  const reverceRegex = /[、。，A-Za-z0-9!"#$%&'()=~{`+*}_?><]/
  
  const chars = textString.split('')
  const groupItems = []
  let offsetX = options.left || 0
  let offsetY = options.top || 0
  const lineHeight = options.fontSize * 1.2
  
  chars.forEach((char, index) => {
    const isIgnored = ignoreRegex.test(char)
    const isReverce = reverceRegex.test(char)
    const text = new fabric.Text(char, {
      left: offsetX,
      top: offsetY,
      fontSize: options.fontSize,
      originX: isIgnored ? 'right' : 'left',
      originY: 'bottom',
      angle: isIgnored ? 90 : 0
    })
    
    canvas.add(text)
    const textWidth = text.width * text.scaleX
    const actualHeight = text.height * text.scaleY
    text.set({ top: offsetY + actualHeight })
    text.set({ left: (isReverce ? offsetX + (textWidth / 2) : offsetX) })
    groupItems.push(text)
    canvas.remove(text)
    
    if (char === '\n') {
      offsetX -= lineHeight
      offsetY = options.top || 0
    } else {
      offsetY += actualHeight
    }
  })
  
  return new fabric.VerticalText(groupItems, {
    selectable: true,
    type: 'verticalText'
  })
}
