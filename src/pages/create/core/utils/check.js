import { fabric } from 'fabric'


const isActiveSelection = (thing) => {
  return thing instanceof fabric.ActiveSelection
}

const isCircle = (thing) => {
  return thing instanceof fabric.Circle
}

const isGroup = (thing) => {
  return thing instanceof fabric.Group
}

const isCollection = (thing)=> {
  return !!thing && Array.isArray((thing)._objects)
}

const isNativeGroup = (thing) => {
  console.log(thing)
  // return thing instanceof fabric.NativeGroup
}

const isGradient = (thing)=> {
  return thing instanceof fabric.Gradient
}

const isPattern = (thing) => {
  return thing instanceof fabric.Pattern
}

const isTextObject = (thing) => {
  return !!thing && thing.isType('Text', 'IText', 'Textbox', 'ArcText')
}


export const check = {
  isCollection,
  isGradient,
  isPattern,
  isActiveSelection,
  isTextObject,
  isGroup,
  isNativeGroup,
  isCircle
}
