import { createStore } from '../../../../store/create'

export const MenuKeys = {
  CUT: {
    keyboard: 'Ctrl + X',
    eventName: 'ctrl+x,command+x',
    fn: 'tools.cutObject',
    id: 'cutObject'
  },
  COPY: {
    keyboard: 'Ctrl + C',
    eventName: 'ctrl+c,command+c',
    fn: 'tools.copyObject',
    id: 'copyObject'
  },
  PASTE: {
    keyboard: 'Ctrl + V',
    eventName: 'ctrl+v,command+v',
    fn: 'tools.pasteObject',
    id: 'pasteObject'
  },
  DELETE: {
    keyboard: 'Delete',
    eventName: 'delete,backspace',
    fn: 'tools.deleteObject',
    id: 'deleteObject'
  },
  LOCK: {
    keyboard: 'Ctrl + L',
    eventName: 'ctrl+l,command+l',
    fn: 'tools.changeObjectLock',
    id: 'changeObjectLock'
  },
  SHOW: {
    keyboard: 'Ctrl + K',
    eventName: 'ctrl+k,command+k',
    fn: 'tools.changeObjectShow',
    id: 'changeObjectShow'
  }
}

// 点击画布菜单
export const blankMenus = [
  {
    text: '粘贴',
    ...MenuKeys.PASTE
  },
  {
    text: '修改背景色',
    id: 'editPageBg',
    fn: () => createStore.attrActiveKey = 0
  },
  {
    text: '将背景应于所有页面',
    id: 'applyPageBg',
    fn: () => createStore.applyBackground()
  }
]
// 公共菜单
export const shareMenus = [
  {
    text: '剪切',
    ...MenuKeys.CUT
  },
  {
    text: '复制',
    ...MenuKeys.COPY
  },
  {
    text: '粘贴',
    ...MenuKeys.PASTE
  },
  {
    text: '水平居中',
    keyboard: '❯',
    children: [
      {
        text: '左对齐',
        fn: 'align.left',
        id: 'left'
      },
      {
        text: '右对齐',
        fn: 'align.right',
        id: 'right'
      },
      {
        text: '左右居中对齐',
        fn: 'align.alignCenter',
        id: 'alignCenter'
      }
    ]
  },
  {
    text: '垂直居中',
    keyboard: '❯',
    children: [
      {
        text: '顶对齐',
        fn: 'align.top',
        id: 'top'
      },
      {
        text: '底对齐',
        fn: 'align.bottom',
        id: 'bottom'
      },
      {
        text: '上下居中对齐',
        fn: 'align.middleCenter',
        id: 'middleCenter'
      }
    ]
  },
  {
    text: '图层管理',
    keyboard: '❯',
    children: [
      {
        text: '上移一层',
        fn: 'order.up',
        id: 'up'
      },
      {
        text: '下移一层',
        fn: 'order.down',
        id: 'down'
      },
      {
        text: '置于顶层',
        fn: 'order.upTop',
        id: 'upTop'
      },
      {
        text: '置于底层',
        fn: 'order.downTop',
        id: 'downTop'
      }
    ]
  },
  {
    text: '删除',
    ...MenuKeys.DELETE
  },
  {
    text: '锁定/解锁',
    ...MenuKeys.LOCK
  },
  {
    text: '显示/隐藏',
    ...MenuKeys.SHOW
  }
]
// 图片私有菜单
export const imageMenus = [
  {
    text: '替换图片',
    fn: 'clipImage.replaceImage',
    id: 'replaceImage'
  },
  {
    text: '剪裁图片',
    fn: 'clipImage.startClip',
    id: 'startClip'
  }
]
// 文字私有菜单
export const textMenus = [
  // {
  //   text: '加粗',
  //   keyboard: 'Weight'
  // },
  // {
  //   text: '倾斜',
  //   keyboard: 'Incline'
  // },
  // {
  //   text: '下划线',
  //   keyboard: 'Underline'
  // }
]
export const combinationMenus = [
  {
    text: '组合',
    fn: 'tools.combination',
    id: 'combination'
  },
  {
    text: '拆分',
    fn: 'tools.splitCombination',
    id: 'splitCombination'
  }
]

const createMenu = ({ activeObject }) => {
  if (!activeObject) return null
  const beforeMenu = activeObject.type === 'group' ? combinationMenus[1] : combinationMenus[0]
  let menus = [beforeMenu, ...shareMenus]
  if (activeObject.id === 'workspace') {
    menus = blankMenus
  } else if (activeObject.type === 'image') {
    menus = [...shareMenus, ...imageMenus]
  } else if (activeObject.type === 'i-text') {
    menus = [...shareMenus, ...textMenus]
  }
  return menus
}
export default createMenu
