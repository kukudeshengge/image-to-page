import Tools from './Tools'
import Align from './Align'
import Events from './Events'

export const plugins = [
  {
    name: 'events',
    plugin: Events
  },
  {
    name: 'align',
    plugin: Align
  },
  // {
  //   name: 'order',
  //   plugin: Order
  // },
  {
    name: 'tools',
    plugin: Tools
  }
  // {
  //   name: 'clipImage',
  //   plugin: ClipImage
  // }
]
