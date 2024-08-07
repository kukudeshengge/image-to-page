import Tools from './Tools'
import Align from './Align'
import Events from './Events'
import Order from './Order'
import HoverBorder from './hoverBorders'
import Add from './Add'
import Animation from "./Animation";

export const plugins = [
    {
        name: 'events',
        plugin: Events
    },
    {
        name: 'align',
        plugin: Align
    },
    {
        name: 'order',
        plugin: Order
    },
    {
        name: 'tools',
        plugin: Tools
    },
    {
        name: 'hoverBorder',
        plugin: HoverBorder
    },
    {
        name: 'animation',
        plugin: Animation
    },
    {
        name: 'add',
        plugin: Add
    }
    // {
    //   name: 'clipImage',
    //   plugin: ClipImage
    // }
]
